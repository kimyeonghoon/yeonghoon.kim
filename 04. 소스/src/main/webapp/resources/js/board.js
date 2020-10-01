/**
 * board 페이지에서 사용하는 function을 모아둔 js 파일
 */


/**
 * board 페이지의 요소(게시글, 페이징, 게시글 수)를 다시 로딩할 때 사용
 * 
 */
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
				redrawListCnt();
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


/**
 * 게시글 리스트를 그릴 때 사용하는 function
 * 
 * boardList - content_no(글 번호), auth_no(작성자 번호), content_name(제목), commentCnt(게시글에 달린 코멘트 개수),
 * 				  member_name(작성자명), reg_time(등록일/시간), hit(조회수)
 * 
 */
function redrawList(boardList) {
	// 게시물 리스트를 그림
	var html = "";
	if(boardList.length > 0) {
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
	} else {
		html += "<tr><td colspan=\"5\">게시글이 존재하지 않습니다.</td></tr>";
	}

	// 변수에 담긴 내용을 가지고 html 게시글 부분 재생성
	$("#boardList").html(html);
	
	// 게시글 클릭 이벤트 걸어줌
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


/**
 * 현재 게시판의 총 게시물 수를 표시. 불러오지 못할 경우 아무 것도 표시하지 않음
 */
function redrawListCnt() {
	$.ajax({
		type : "post",			  
		url : "getBoardListCntAjax", 
		dataType : "json",
		success : function(res) {
			var html = "";
			if(res.result == "success") {
				html += " - " + res.getBoardListCnt + "개";
			}
			$("#boardListCnt").html(html);
		},
		error : function(request, status, error) {
			console.log("text : " + request.responseTxt);
			console.log("error : " + error);
		}			
	});
}
