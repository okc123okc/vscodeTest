$(function(){
	mini.parse();
	
	var userData = {};
	var url = '/bomc/data/common/iusermanager.jsp?callMethod=getUserInfo&id='+global.loginUserId;
	$.ajax({
		url: url,//jsp��web�˵Ĵ��Ŀ¼
		type: 'GET',
		dataType: 'json',
		async:false,
		success:function(result) {
			userData=result.data;
		}
	});
	
	var taskID = "act11_2109_1";
	var task_audit_result = mini.getbyName("task_audit_result", taskID);
	task_audit_result.on("valuechanged",function(){
		
		var tValue = task_audit_result.getText();
        var tValue1 = task_audit_result.getValue();
			console.log(tValue);
            console.log(tValue1);
		if(tValue != "ͨ��"){
			//itsmTask.hiddenField("#auditer");
			$("#task_execute_user").val($("#task_create_by").val());
            $("#task_execute_user").next().val($("#task_create_by").next().val());
            $("#task_execute_user").attr("disabled","true");
			
		}else if(tValue == "��ͨ��"){
			//itsmTask.showField("#auditer");
            console.log("ͨ�������ѡ����Ϊ��һ��ִ����");
           $("#task_execute_user").attr("disabled","false");a
		}
		var next_u = $("#task_execute_user").val();
			console.log(next_u);
			
   });

});