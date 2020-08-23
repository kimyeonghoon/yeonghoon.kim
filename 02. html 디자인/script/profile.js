/**
 * profile 페이지 로딩 시 실행 script 정의
 */

// 프로파일 초기화
function init_profile() {
	// 이미지 변수화
	var businessCard1 = "<img src='../image/giftm.jpg' width='100%' />";
	var businessCard2 = "<img src='../image/smileserv.jpg' width='100%' />";
	var dongauniv = "<img src='../image/dongauniv.jpg' width='100%' />";
	var gdi = "<img src='../image/gdi.jpg' width='100%' />";
	var itwillbs = "<img src='../image/itwillbs.jpg' width='100%' />";
	var eip = "<img src='../image/eip.jpg' width='100%' />";
	var csisdl2 = "<img src='../image/csisdl2.jpg' width='100%' />";
	var ieoa = "<img src='../image/ieoa.jpg' width='100%' />";
	var pc1 = "<img src='../image/pc1.jpg' width='100%' />";

	// 팝오버 정의
	$("#businessCard1").popover({
		content: businessCard1, html: true
	});
	$("#businessCard2").popover({
		content: businessCard2, html: true
	});
	$("#dongauniv").popover({
		content: dongauniv, html: true
	});
	$("#gdi").popover({
		content: gdi, html: true
	});
	$("#itwillbs").popover({
		content: itwillbs, html: true
	});
	$("#eip").popover({
		content: eip, html: true
	});
	$("#csisdl2").popover({
		content: csisdl2, html: true
	});
	$("#ieoa").popover({
		content: ieoa, html: true
	});
	$("#pc1").popover({
		content: pc1, html: true
	});
}


// 팝업창 생성
function modalPopup(id) {
	// 기존 모달 삭제
	$("#notifyModal").remove();
	var html = "";
	html += "<div class=\"modal fade\" id=\"notifyModal\">";
	html += "<div class=\"modal-dialog modal-sm p-3 \">";
	html += "<div class=\"modal-content\">";
	html += "<div class=\"modal-header\">";
	html += "<h4 class=\"modal-title\">수정</h4>";
	html += "</div>";
	html += "<div class=\"modal-body\">";
	switch (id) {
		case 1: html += "<div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">이름</span></div><input type=\"text\" class=\"form-control\" id=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">생년</span></div><input type=\"text\" class=\"form-control\" id=\"yearInput\" maxlength=\"4\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">성별</span></div><select class=\"form-control\" id=\"gender\"><option value=\"0\">남</option><option value=\"1\">여</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">주소</span></div><input type=\"text\" class=\"form-control\" id=\"addressInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">학력</span></div><input type=\"text\" class=\"form-control\" id=\"educationInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">경력</span></div><input type=\"text\" class=\"form-control\" id=\"careerInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">자격</span></div><input type=\"text\" class=\"form-control\" id=\"certificateInput\"></div>";
				  break;
	}
	html += "</div>";
	html += "<div class=\"modal-footer\">";
	html += "<button type=\"button\" class=\"btn btn-danger\">수정</button>";
	html += "<button type=\"button\" class=\"btn btn-dark\" data-dismiss=\"modal\">취소</button>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	$("#contentsArea").prepend(html);
	$("#notifyModal").modal("show");
}