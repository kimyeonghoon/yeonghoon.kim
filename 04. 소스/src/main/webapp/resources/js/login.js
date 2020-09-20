/**
 * login js 파일
 */

// 팝업창 생성
function modalPopup() {
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
	if($("[name='popupCheck']").val() == "1") {
		html += "메일을 입력해주세요."
	} else if($("[name='popupCheck']").val() == "2") {
		html += "패스워드를 입력해주세요."
	} else if($("[name='popupCheck']").val() == "3") {
		html += "아이디나 패스워드가 일치하지 않습니다."
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
	
// 로그인 AJAX
function loginUser() {
	var params = $("#loginCheck").serialize();
	$.ajax({
		type : "post",			  
		url : "loginUserAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				history.back();
			} else if(res.result == "fail"){
				$("[name='popupCheck']").val("3");
				modalPopup();
			}
		},
		error : function(request, status, error) {
			console.log("text : " + request.responseTxt);
			console.log("error : " + error);
		}			
	});
}