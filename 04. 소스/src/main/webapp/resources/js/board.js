// 게시판을 다시 그리는 function
function reloadList() { 
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "getBoardListAjax", 	  
		dataType : "json",  	 
		data : params,    		  
		success : function(res) { 
			if(res.result == "success") {
				redrawList(res.boardList);
				redrawPaging(res.pagingMap);
			} else {
				alert("에러 발생");
			}
		},
		error : function(reqsuest, status, error) {  
			console.log("text : " + reqsuest.responseTxt);
			console.log("error : " + error);
		}
	});
}


// 게시글 그리기
function redrawList(boardList) {
	var html = "";
	for(var i = 0; i < boardList.length; i++) {
		html += "<tr data-bNo=\"" + boardList[i].content_no + "\"data-authNo=\"" + boardList[i].auth_no + "\">";
		html += "<td class=\"d-none d-xl-table-cell\">" + boardList[i].content_no + "</td>";
		html += "<td class=\"text-left\">" + boardList[i].content_name;
		if(boardList[i].commentCnt != undefined) {
			html += " [<b>" + boardList[i].commentCnt + "</b>]";
		}
		html += "</td>";
		html += "<td class=\"d-none d-xl-table-cell\">" + boardList[i].member_name + "</td>";
		html += "<td>" + boardList[i].reg_time + "</td>";
		html += "<td class=\"d-none d-xl-table-cell\">" + boardList[i].hit + "</td>";
		html += "</tr>";
	}
	$("#boardList").html(html);
	
	$("#boardList > tr").on("click", function() {
		if($(this).attr("data-bNo") != null) {
			$("#boardNo").val($(this).attr("data-bNo"));
			$("#authNo").val($(this).attr("data-authNo"));
			$("#actionForm").attr("action", "boardDetail");
			$("#actionForm").submit();
		} else {
			return false;
		}
	});
}

//총 글 갯수 그리기
function redrawListCnt() {
	$.ajax({
		type : "post",			  
		url : "getBoardListCntAjax", 
		dataType : "json",
		success : function(res) {
			var html = "";
			if(res.result == "success") {
				html += " - " + res.getBoardListCnt + "개";
			} else if(res.result == "fail") {
				html += "게시글이 존재하지 않습니다.";
			}
			$("#boardListCnt").prepend(html);
		},
		error : function(request, status, error) {
			console.log("text : " + request.responseTxt);
			console.log("error : " + error);
		}			
	});
}

// 페이징 그리기
function redrawPaging(pagingMap) {
	var html = "";
	
	html += "<li class=\"page-item\"><div class=\"page-link\" name=\"1\"><<</div></li>";
	
	if($("#page").val() == 1) {
		html += "<li class=\"page-item\"><div class=\"page-link\" name=\"1\"><</div></li>";
	} else {
		html += "<li class=\"page-item\"><div class=\"page-link\" name=\"" + ($("#page").val() * 1 - 1) + "\"><</div></li>";
	}
	
	for(var i = pagingMap.startPageCount ; i <= pagingMap.endPageCount ; i++) {
		if(i == $("#page").val()) {
			html += "<li class=\"page-item active\"><div class=\"page-link\" name=\"" + i + "\"><b>" + i + "</b></div>";
		} else {
			html += "<li class=\"page-item\"><div class=\"page-link\" name=\"" + i + "\">" + i + "</div>";
		}
	}
	
	if($("#page").val() == pagingMap.maxPageCount) {
		html += "<li class=\"page-item\"><div class=\"page-link\" name=\"" + pagingMap.maxPageCount + "\">></div></li>";
	} else {
		html += "<li class=\"page-item\"><div class=\"page-link\" name=\"" + ($("#page").val() * 1 + 1) + "\">></div></li>";
	}
	html += "<li class=\"page-item\"><div class=\"page-link\" name=\"" + pagingMap.maxPageCount + "\">>></div></li>";

	console.log("pagingMap.startPageCount : " + pagingMap.startPageCount);
	console.log("pagingMap.endPageCount : " + pagingMap.endPageCount);
	console.log("pagingMap.maxPageCount : " + pagingMap.maxPageCount);
	$("#paging").html(html);
}
