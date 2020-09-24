/**
 * gallery 페이지에서 사용하는 function을 모아둔 js 파일
 */


/**
 * board 페이지의 요소(게시글, 페이징, 게시글 수)를 다시 로딩할 때 사용
 * 
 * @param params 전송되어 영향을 미치는 params은 현재 페이지 번호(page)이다.
 * @see redrawList(galleryList)
 * @see redrawPaging(pagingMap)
 * @see redrawListCnt()
 */
function reloadList() { 
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "getGalleryListAjax", 	  
		dataType : "json",  	 
		data : params,    		  
		success : function(res) { 
			if(res.result == "success") {
				redrawList(res.galleryList);
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
 * galleryList - content_no(글 번호), auth_no(작성자 번호), thumbnail_path(썸네일 경로),
 * 				 content_name(제목), commentCnt(게시글에 달린 코멘트 개수),
 * 				 member_name(작성자명), reg_time(등록일/시간), hit(조회수)
 * 
 * @param galleryList 현재 페이지에 해당하는 값들이 넘어옴
 * @see reloadList()
 * 
 */
function redrawList(galleryList) {
	// 갤러리 리스트를 그림
	var html = "";
	if(galleryList.length > 0) {
		for(var i = 0; i < galleryList.length; i++) {
			html += "<div class=\"col-md-4 mb-5\" data-bNo=\"" + galleryList[i].content_no + "\"data-authNo=\"" + galleryList[i].auth_no + "\">";
			html += "<div class=\"card shadow-sm\">";
			html += "<div class=\"card-img-top d-flex\">";
			html += "<img style=\"width:100%\" class=\"justify-content-center\" src=\"";
			html += galleryList[i].thumbnail_path + "\" />";
			html += "</div><div class=\"card-body bg-dark text-light\">";
			html += galleryList[i].content_name;
			if(galleryList[i].commentCnt != undefined) {
				html += " [<b>" + galleryList[i].commentCnt + "</b>]";
			}
			html += "</div><div class=\"card-footer font-weight-bold\"><span class=\"mr-2\">";
			html += galleryList[i].member_name;
			html += "</span>&nbsp;<span class=\"mr-2\">";
			html += galleryList[i].reg_time;
			html += "</span>&nbsp;<span>";
			html += galleryList[i].hit
			html += "</span></div></div></div>";
		}
	} else {
		alert("갤러리를 불러올 수 없습니다.");
	}
	
	// 변수에 담긴 내용을 가지고 html 게시글 부분 재생성
	$("#galleryList").html(html);
	
	// 갤러리 클릭 이벤트 걸어줌
	$("#galleryList > div").on("click", function() {
		if($(this).attr("data-bNo") != null) {
			$("#boardNo").val($(this).attr("data-bNo"));
			$("#authNo").val($(this).attr("data-authNo"));
			$("#actionForm").attr("action", "galleryDetail");
			$("#actionForm").submit();
		} else {
			return false;
		}
	});
}

/**
 * 현재 갤러리의 총 게시물 수를 표시. 불러오지 못할 경우 아무 것도 표시하지 않음
 */
function redrawListCnt() {
	$.ajax({
		type : "post",			  
		url : "getGalleryListCntAjax", 
		dataType : "json",
		success : function(res) {
			var html = "";
			if(res.result == "success") {
				html += " - " + res.getGalleryListCnt + "개";
			}
			$("#galleryListCnt").html(html);
		},
		error : function(request, status, error) {
			console.log("text : " + request.responseTxt);
			console.log("error : " + error);
		}			
	});
}
