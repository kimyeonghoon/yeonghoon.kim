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

function init() {
	// 검색 버튼 동작
	$("#searchBtn").on("click", function() {
		if($("#searchGbn").val() == '0' || $("#searchGbn").val() == null) {
			alert("검색 구분을 선택해주세요.");
		} else if($("#searchTxt").val() == '' || $("#searchTxt").val() == null) {
			alert("검색어를 입력해주세요.");
		} else {
			$("#page").val("1");
			reloadList();
		}
	});
	
	// 검색창에서 엔터키 무력화
	$("[name='searchTxt']").on("keypress", function() {
		if(event.keyCode == 13) {
			$("#searchBtn").click();
			return false;
		}		
	});
}


/**
 * 페이징을 그릴 때 사용하는 function
 * 
 * pagingMap - startPageCount(첫 페이지), endPageCount(마지막 페이지), maxPageCount(페이지 총 갯수)
 * 
 * @param pagingMap 현재 페이지에 해당하는 값들이 넘어옴
 * @see reloadList()
 * 
 */
function redrawPaging(pagingMap) {
	var html = "";
	
	// 첫 페이지는 무조건 1페이지이므로 1 고정
	html += "<li class=\"page-item\"><div class=\"page-link\" data-no=\"1\"><<</div></li>";
	
	// 이전 페이지
	if($("#page").val() == 1) {
		html += "<li class=\"page-item\"><div class=\"page-link\" data-no=\"1\"><</div></li>";
	} else {
		html += "<li class=\"page-item\"><div class=\"page-link\" data-no=\"" + ($("#page").val() * 1 - 1) + "\"><</div></li>";
	}
	
	// 페이지 넘버
	for(var i = pagingMap.startPageCount ; i <= pagingMap.endPageCount ; i++) {
		if(i == $("#page").val()) {
			html += "<li class=\"page-item active\"><div class=\"page-link\" data-no=\"" + i + "\"><b>" + i + "</b></div>";
		} else {
			html += "<li class=\"page-item\"><div class=\"page-link\" data-no=\"" + i + "\">" + i + "</div>";
		}
	}
	
	// 다음 페이지
	if($("#page").val() == pagingMap.maxPageCount) {
		html += "<li class=\"page-item\"><div class=\"page-link\" data-no=\"" + pagingMap.maxPageCount + "\">></div></li>";
	} else {
		html += "<li class=\"page-item\"><div class=\"page-link\" data-no=\"" + ($("#page").val() * 1 + 1) + "\">></div></li>";
	}
	
	// 마지막 페이지
	html += "<li class=\"page-item\"><div class=\"page-link\" data-no=\"" + pagingMap.maxPageCount + "\">>></div></li>";

	$("#paging").html(html);
	
	// 페이징 버튼 동작
	$("#paging").on("click", ".page-link", function() {
		$("#page").val($(this).attr("data-no"));
		reloadList();
	});
}