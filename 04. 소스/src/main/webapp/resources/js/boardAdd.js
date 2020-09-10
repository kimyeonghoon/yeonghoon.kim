// 게시글 그리기
function boardAdd() {
	$("#actionForm").attr("action", "boardAddAjax");
	var params = $("#actionForm").serialize();
	console.log(params);
	$.ajax({
		type : "post",			  
		url : "boardAddAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				location.href="board";
			} else if(res.result == "fail") {
				alert("error");
			}
		},
		error : function(request, status, error) {
			console.log("text : " + request.responseTxt);
			console.log("error : " + error);
		}			
	});
}

//파일 업로드
function fileUpload() {
	$("#actionForm").attr("action", "fileUploadAjax");
	var fileForm = $("#actionForm");
	fileForm.ajaxForm({ 
		success: function(res){
			if(res.result =="success"){
				$("#attach1").val(res.fileName[0]);
				$("#attachOriginal1").val(res.originalName[0]);
				$("#attach2").val(res.fileName[1]);
				$("#attachOriginal2").val(res.originalName[1]);
				alert("업로드가 완료되었습니다.");
			} else {
				alert("저장실패");
			} 
		},
		error: function(){
			alert("에러발생!!"); 
		}
	});
	fileForm.submit();
}