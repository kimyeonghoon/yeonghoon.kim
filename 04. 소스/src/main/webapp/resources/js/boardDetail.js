// 게시글 그리기
function redrawContent() {
	$("#actionForm").attr("action", "getBoardContentAjax");
	var params = $("#actionForm").serialize();
	console.log(params);
	$.ajax({
		type : "post",			  
		url : "getBoardContentAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				var html = "";
				html += "<tr class=\"table-secondary\"><td class=\"font-weight-bold text-center\">작성일</td><td>";
				html += res.getBoardContent.reg_time
				html += "</td></tr><tr class=\"table-secondary\"><td class=\"font-weight-bold text-center\">작성자</td><td>";
				html += res.getBoardContent.member_name;
				html += "</td></tr><tr class=\"table-secondary\"><td class=\"font-weight-bold text-center\">제목</td><td>";
				html += res.getBoardContent.content_name;
				html += "</td></tr><tr><td class=\"p-3\" colspan=\"2\"><div class=\"row\"><div class=\"col-sm-1\"></div><div class=\"col-sm-10 pt-5 pb-5\" >";
				html += res.getBoardContent.content_detail;
				html += "</div><div class=\"col-sm-1\"></div></div></td></tr>";
				
				$("#boardDetail").prepend(html);
				
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