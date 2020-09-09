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
<!-- board js -->
<script src="resources/js/board.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		loginStatusMenu(${sMember_no});
		redrawList();
		redrawListCnt();
		// 등록 버튼 클릭 이벤트
		$("#addBtn").on("click", function() {
			location.href="board_add.html"
		});
		
		$("tr").on("click", function() {
			if($(this).attr("data-bNo") != null) {
				location.href="board_detail.html";			
			} else {
				return false;
			}
		});
	});
</script>
<style type="text/css">
.page-link {
	color: black;
}
</style>
</head>
<body>
<!-- nav 영역 -->
<c:import url="/nav"></c:import>
<!-- 본문 영역 -->
<div class="p-3 border border border-top-0 border-bottom-0 border-dark contents_area">
	<div class="row mb-3">
		<div class="col-md-4 d-none d-sm-block">총 게시물 수<span id="boardListCnt"></span></div>
		<div class="col-md-8 p-0 pl-3">
			<div class="float-right form-check-inline">
				<select class="form-control">
					<option value="0">구분</option>
					<option value="1">제목</option>
					<option value="2">내용</option>
					<option value="3">제목+내용</option>
				</select>
				<input type="text" class="form-control">
				<button type="button" class="btn btn-secondary form-control">검색</button>
			</div>
		</div>
	</div>
	<table class="table table-hover text-center table-sm">
		<colgroup class="d-none">
			<col class="d-xl-table-cell" width="10%"></col>
			<col width="*"></col>
			<col class="d-xl-table-cell" width="10%"></col>
			<col width="10%"></col>
			<col class="d-xl-table-cell" width="10%"></col>
		</colgroup>
		<thead class="thead-light">
			<tr>
				<th class="d-none d-xl-table-cell">번호</th>
				<th>제목</th>
				<th class="d-none d-xl-table-cell">작성자</th>
				<th>날짜</th>
				<th class="d-none d-xl-table-cell">조회수</th>
			</tr>
		</thead>
		<tbody id ="boardList">
			<tr data-bNo="6">
				<td class="d-none d-xl-table-cell">6</td>
				<td class="text-left">가나다라마바사아아아아아아아ㅏㅏㅏㅏㅏ</td>
				<td class="d-none d-xl-table-cell">김영훈</td>
				<td>2020-08-17</td>
				<td class="d-none d-xl-table-cell">300</td>
			</tr>
		</tbody>
	</table>
	<div>
		<div>
			<div id="addBtn" class="btn btn-secondary d-inline-block float-right">등록</div>
			<ul class="pagination justify-content-center">
				<li class="page-item disabled"><a class="page-link" href="http://google.com">이전</a></li>
				<li class="page-item"><a class="page-link" href="#">1</a></li>
				<li class="page-item active"><a class="page-link" href="#">2</a></li>
				<li class="page-item"><a class="page-link" href="#">3</a></li>
				<li class="page-item"><a class="page-link" href="#">다음</a></li>
			</ul>
		</div>
	</div>
</div>
<!-- 푸터영역 -->
<c:import url="/footer"></c:import>
</body>
</html>