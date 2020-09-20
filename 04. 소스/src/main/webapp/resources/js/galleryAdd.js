// 게시글 등록
function galleryAdd() {
	$("#actionForm").attr("action", "boardAddAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "galleryAddAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				location.href="gallery";
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