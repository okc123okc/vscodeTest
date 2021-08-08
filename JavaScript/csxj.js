$(function() {
	mini.parse();
    mini.get("creater_phone").setValue(_defaults.currentUserMobile);
	mini.get("creater_phone").setText(_defaults.currentUserMobile);
	var userData = {};
	var url = '/bomc/data/common/iusermanager.jsp?callMethod=getUserInfo&id=' + global.loginUserId;
	var form = "act9_1383_0_app_form";

    var grid = mini.getbyName("goerinfo", form);
	grid.getColumn("goer_name").readOnly = true;
	grid.getColumn("goer_pinyin").readOnly = true;
	grid.getColumn("goer_sex").readOnly = true;
	grid.getColumn("goer_cardnum").readOnly = true;
	grid.getColumn("goer_phone").readOnly = true;
	grid.getColumn("in_time").readOnly = true;
	grid.getColumn("out_time").readOnly = true;
	grid.getColumn("oper_content").readOnly = true;
	grid.getColumn("sys_edition").readOnly = true;
	grid.getColumn("mac_address").readOnly = true;
	grid.getColumn("work_place").readOnly = true;
	grid.getColumn("ip_address").readOnly = true;
	grid.getColumn("main_acount").readOnly = true;

	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'json',
		async: false,
		success: function(result) {
			userData = result.data;
		}
	});

	if(!userData.org[0]) {
		mini.alert("无组织人员无法提交工单,请联系管理员分配组织");
	} else {
		mini.get("creater_dept").setValue(userData.org[0].orgName);
		mini.get("creater_dept").setText(userData.org[0].orgName);
	}

	if(global.itsmParamData && global.itsmParamData != 'null'){
		//global.itsmParamData = '{"ids":["34b684ea-b471-42b9-8ac2-48ebc8a1d6a7","34b684ea-b471-42b9-8ac2-48ebc8a1d6a7","34b684ea-b471-42b9-8ac2-48ebc8a1d6a7","34b684ea-b471-42b9-8ac2-48ebc8a1d6a7"]}';
		var ids = JSON.parse(global.itsmParamData);
		var idArr = ids["ids"];
		var rows = [];
		$.each(idArr,function(i,id){
			$.ajax({
				url: "/bomc/data/local/xj/itsm/manufacturerPersonnel.jsp?callMethod=queryManufacturerPersonnel&id="+id,
				type: 'GET',
				dataType: 'json',
				async: false,
				success: function(result) {
					if(result && result.status == 'success' && result.data){
						var gridData = result.data;
						var row = {};
						row["goer_name"] = gridData["name"];//姓名
						row["goer_pinyin"] = gridData["pinyin"];//姓名全拼
						row["in_time"] = gridData["admission_time"];//入场时间
						row["out_time"] = gridData["departure_time"];//离场时间
						row["oper_content"] = gridData["specific_operation_content"];//操作内容
						row["ip_address"] = gridData["ip"];//IP地址
						row["work_place"] = gridData["work_place"];//工作地点
						row["goer_sex"] = gridData["sex"];//性别
						row["goer_cardnum"] = gridData["id_no"];//证件号码
						row["goer_phone"] = gridData["phone"];//手机号码
						row["sys_edition"] = gridData["system_version"];//终端系统版本
						row["mac_address"] = gridData["mac"];//终端mac地址
						row["main_acount"] = gridData["account_number"];//主账号
						row["csid"] = id;//人员列表唯一id，更新人员立场状态接口使用
						rows.push(row);
					}
				},
			});
		});
		
		var datagrid = mini.get("goerinfo");
		datagrid.on("load",function(e){
			datagrid.addRows(rows);
			mini.get("go_count").setValue(rows.length);
			mini.get("go_count").setText(rows.length);
			$("#addRow_goerinfo").hide();
			$("#copyRow_goerinfo").hide();
		});
	}
    
  //"机房出入"表格增加按键新增弹出页面
  $("#act9_1383_0_app_form #addRow_goerinfo").click(function () {
  //  var applyType = mini.get("applyType").getValue();
  //  if (applyType == 'machineroom_access_5') {
        // var computer_room_access = mini.get("computer_room_access").getText();
        // if (computer_room_access == "") {
        //     mini.alert("请先选择出入机房！");
        //     return;
        // }
        console.log("新增")
        fnItsmDialogShow({
            url: global.getUrl + 'data/local/xj/itsm/manufacturerPersonnelStatus.jsp?callMethod=queryManufacturerPersonnelList' ,
            multiSelect: true,
            parGrid: {},
            key: 'name',
            keywordName: '姓名',
            //弹窗表格关键字字段名
            ajaxType: 'get',
            total: 'totalSize',
            pageSize: 'pageSize',
            pageIndex: 'pageIndex',
            columnsJson: {
                //表格展示
                "type": ["checkcolumn"],
                "field": ["", "manufacturer_name","name", "admission_time", "departure_time", "specific_operation_content", "ip", "work_place"],
                "header": [di18n.serial_number, '厂商','人员姓名', '入场时间', '离场时间', '工作内容', 'IP地址', '工作地点'],
                "headerAlign": ["center"],
                "align": ["center"],
                "width": ["30", "40", "40", "40", "40", "40", "40"]

            },
            width: 900,
            callback: function (dialogName, selData) {
                //这里写的是选择数据后，点击确定后要做的处理，selData返回选择的数据信息
                var oldData = grid.getData();
				console.log(oldData);
				console.log(selData);
                var oldList = [];
                var info_xj_datas = [];
                if (oldData.length != 0) {
                    for (var i = 0; i < oldData.length; i++) {

                        if (oldData[i].name) {
                            oldList.add(oldData[i].name);
                            info_xj_datas.push(oldData[i]);
                        }
                    }
                }

                for (var i = 0; i < selData.length; i++) {

                    if (oldList.contains(selData[i].name)) {
                        continue;
                    }
                    var choose_data = {};
                    choose_data.goer_name = selData[i].name;
                    choose_data.in_time = selData[i].admission_time;
                    choose_data.out_time = selData[i].departure_time;
                    choose_data.oper_content = selData[i].specific_operation_content;
                    choose_data.ip_address = selData[i].ip;
                    choose_data.work_place = selData[i].work_place;

					choose_data.goer_pinyin = selData[i].pinyin;
					choose_data.goer_sex = selData[i].sex;
					choose_data.goer_cardnum = selData[i].id_no;
					choose_data.goer_phone = selData[i].phone;
					choose_data.sys_edition = selData[i].system_version;
					choose_data.mac_address = selData[i].mac;
					choose_data.main_acount = selData[i].account_number;
					choose_data.csid = selData[i].id;

                    info_xj_datas.push(choose_data);
                }
                grid.setData(info_xj_datas);

            }

        });
 //   }
});


});