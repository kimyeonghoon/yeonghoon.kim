<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>yeonghoon.kim :: 게시판</title>
<!-- 헤더 영역 -->
<c:import url="/header"></c:import>
<!-- 공통 js -->
<script src="resources/js/common.js"></script>
<!-- boardDetail js -->
<script src="resources/js/boardDetail.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		// nav에 표시될 내용을 위해 사용(로그인, 비로그인 상태에 따라 표시되는 것이 다름)
		loginStatusMenu(${sMember_no});
		
		// boardNo의 값이 없을 경우 board로 이동시킴
		if($("#boardNo").val() == '') {
			location.href="board";
		}
		
		// 내용 그리기
		redrawContent();
		
		// 코멘트 그리기
		redrawComment();

		// 게시물 삭제 버튼 클릭 이벤트
		$("#deleteBtn").on("click", function() {
			$("[name='popupCheck']").val("1");
			modalPopup(1, 1);
		});
		// 게시물 수정 버튼 클릭 이벤트
		$("#modifyBtn").on("click", function() {
			$("[name='popupCheck']").val("2");
			modalPopup(2, 1);
		});
		
		// 목록 버튼 클릭 이벤트
		$("#listBtn").on("click", function() {
			location.href="board.html";
		});
		
		// nav메뉴에서 현재 위치 표시(게시판)
		$("#board").attr("class", "nav-link active");
	});
</script>
<!-- boardDetail css -->
<link rel="stylesheet" type="text/css" href="resources/css/boardDetail.css" />
<style type="text/css">
a {
	color: black;
}
</style>
</head>
<body>
<!-- nav 영역 -->
<c:import url="/nav"></c:import>
<!-- 본문 영역 -->
<form id="actionForm" action="#" method="post">
	<input type="hidden" name="popupCheck" />
	<input type=hidden id="authNo" name="authNo" value="${param.authNo}" />
	<input type=hidden id="userNo" name="userNo" value="${param.userNo}" />
	<input type=hidden id="boardNo" name="boardNo" value="${param.boardNo}" />
	<input type=hidden id="commentNo" name="commentNo" />
	<div class="p-3 border border border-top-0 border-bottom-0 border-dark contents_area" id="contentsArea">
		<table class="table table-sm table-borderless border">
			<colgroup>
				<col width="20%"></col>
				<col width="*"></col>
			</colgroup>
			<tbody id="boardDetail">
			</tbody>
			<tfoot id="boardComment">
			</tfoot>
		</table>
		<div>
		<div class="btn btn-secondary" style="display: inline-block;" id="listBtn">목록</div>
		${delBtn}
		${modBtn}
		</div>
	</div>
</form>
<!-- 푸터영역 -->
<c:import url="/footer"></c:import>
</body>
</html>