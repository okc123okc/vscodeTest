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
		mini.alert("����֯��Ա�޷��ύ����,����ϵ����Ա������֯");
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
						row["goer_name"] = gridData["name"];//����
						row["goer_pinyin"] = gridData["pinyin"];//����ȫƴ
						row["in_time"] = gridData["admission_time"];//�볡ʱ��
						row["out_time"] = gridData["departure_time"];//�볡ʱ��
						row["oper_content"] = gridData["specific_operation_content"];//��������
						row["ip_address"] = gridData["ip"];//IP��ַ
						row["work_place"] = gridData["work_place"];//�����ص�
						row["goer_sex"] = gridData["sex"];//�Ա�
						row["goer_cardnum"] = gridData["id_no"];//֤������
						row["goer_phone"] = gridData["phone"];//�ֻ�����
						row["sys_edition"] = gridData["system_version"];//�ն�ϵͳ�汾
						row["mac_address"] = gridData["mac"];//�ն�mac��ַ
						row["main_acount"] = gridData["account_number"];//���˺�
						row["csid"] = id;//��Ա�б�Ψһid��������Ա����״̬�ӿ�ʹ��
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
    
  //"��������"������Ӱ�����������ҳ��
  $("#act9_1383_0_app_form #addRow_goerinfo").click(function () {
  //  var applyType = mini.get("applyType").getValue();
  //  if (applyType == 'machineroom_access_5') {
        // var computer_room_access = mini.get("computer_room_access").getText();
        // if (computer_room_access == "") {
        //     mini.alert("����ѡ����������");
        //     return;
        // }
        console.log("����")
        fnItsmDialogShow({
            url: global.getUrl + 'data/local/xj/itsm/manufacturerPersonnelStatus.jsp?callMethod=queryManufacturerPersonnelList' ,
            multiSelect: true,
            parGrid: {},
            key: 'name',
            keywordName: '����',
            //�������ؼ����ֶ���
            ajaxType: 'get',
            total: 'totalSize',
            pageSize: 'pageSize',
            pageIndex: 'pageIndex',
            columnsJson: {
                //���չʾ
                "type": ["checkcolumn"],
                "field": ["", "manufacturer_name","name", "admission_time", "departure_time", "specific_operation_content", "ip", "work_place"],
                "header": [di18n.serial_number, '����','��Ա����', '�볡ʱ��', '�볡ʱ��', '��������', 'IP��ַ', '�����ص�'],
                "headerAlign": ["center"],
                "align": ["center"],
                "width": ["30", "40", "40", "40", "40", "40", "40"]

            },
            width: 900,
            callback: function (dialogName, selData) {
                //����д����ѡ�����ݺ󣬵��ȷ����Ҫ���Ĵ���selData����ѡ���������Ϣ
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