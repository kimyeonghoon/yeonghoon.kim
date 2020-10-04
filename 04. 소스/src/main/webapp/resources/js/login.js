/**
 * login js 파일
 */


/**
 * 팝업창 생성
 */
function loginModalPopup(no) {
	// 기존 모달 삭제
	$("#notifyModal").remove();
	var html = "";
	html += "<div class=\"modal fade\" id=\"notifyModal\">";
	html += "<div class=\"modal-dialog modal-sm p-3 \">";
	html += "<div class=\"modal-content\">";
	html += "<div class=\"modal-header\">";
	html += "<h4 class=\"modal-title\">알림</h4>";
	html += "</div>";
	html += "<div class=\"modal-body\">";
	if(no == 1) {
		html += "메일을 입력해주세요.";
	} else if(no == 2) {
		html += "패스워드를 입력해주세요.";
	} else if(no == 3) {
		html += "아이디나 패스워드가 일치하지 않습니다.";
	}
	html += "</div>";
	html += "<div class=\"modal-footer\">";
	html += "<button type=\"button\" class=\"btn btn-dark\" data-dismiss=\"modal\">닫기</button>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	$("#contentsArea").prepend(html);
	$("#notifyModal").modal("show");
}
	

/**
 * login Ajax
 */
function loginUser() {
	var params = $("#loginCheck").serialize();
	$.ajax({
		type : "post",			  
		url : "loginUserAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				location.href ="profile"
			} else if(res.result == "fail"){
				loginModalPopup(3);
			}
		},
		error : function(request, status, error) {
			console.log("text : " + request.responseTxt);
			console.log("error : " + error);
		}			
	});
}

