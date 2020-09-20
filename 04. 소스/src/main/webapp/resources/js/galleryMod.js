// 갤러리 수정
function galleryMod() {
	$("#actionForm").attr("action", "galleryModAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "galleryModAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				$("#actionForm").attr("action", "galleryDetail");
				$("#actionForm").submit();
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