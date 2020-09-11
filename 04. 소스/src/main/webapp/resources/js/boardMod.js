// 게시글 수정
function boardMod() {
	$("#actionForm").attr("action", "boardModAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "boardModAjax", 
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
				
				var html = "";
				for(var i = 0; i < res.fileName.length; i++) {
					if(res.fileName[i] != undefined) {
						html += "<div>업로드된 첨부파일 " + i + " - <a href=\"" + res.fileName[i] + "\" target=\"_blank\">" + res.originalName[i] + "</a></div>";
					} else {
						html += "<div>업로드된 첨부파일 " + i + " - 없음</div>";
					}
				}

				$("#file1").val(null);
				$("#file2").val(null);
				
				$("#uploadedFile").html(html);
				
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