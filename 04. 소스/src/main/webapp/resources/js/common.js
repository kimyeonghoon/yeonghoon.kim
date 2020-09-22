/**
 * 	공통
 */

function loginStatusMenu(no) {
	var html = "";
	html += "<li class=\"nav-item\">";  
	if(no == null || no == '') {
		html += "<a href=\"login\" class=\"nav-link text-warning\">로그인</a>";
		html += "</li>";
		html += "<li class=\"nav-item\">";
		html += "<a href=\"join\" class=\"nav-link text-danger\">회원가입</a>";
	} else {
		html += "<li class=\"nav-item\">";
		html += "<a href=\"logout\" class=\"nav-link text-danger\">로그아웃</a>";
	}
	html += "</li>";
	$("#loginStatus").prepend(html);
}