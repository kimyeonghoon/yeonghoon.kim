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
		// nav에 표시될 내용을 위해 사용(로그인, 비로그인 상태에 따라 표시되는 것이 다름)
		loginStatusMenu(${sMember_no});
		
		// nav메뉴에서 현재 위치 표시(게시판)
		$("#board").attr("class", "nav-link active");
		
		// 현재 로그인한 유저의 정보를 할당
		$("#userNo").val(${sMember_no});
		
		// page 값을 전달받은 경우 #page의 value를 전달받은 값으로 변경
		if("${param.page}" != "") {
			$("#page").val("${param.page}");
		}
		
		// search 값을 전달받은 경우 #search의 value를 전달받은 값으로 변경
		if("${param.searchTxt}" != "") {
			$("#searchTxt").val("${param.searchTxt}");
		}
		
		// search 값을 전달받은 경우 #search의 value를 전달받은 값으로 변경
		if("${param.searchGbn}" != "") {
			$("#searchGbn").val("${param.searchGbn}");
		}
		
		// 검색 버튼 이벤트 할당
		searchBtnEvent();
		
		// 게시글, 페이징, 총게시물 수 그리기
		reloadList();
		
		// 등록 버튼 클릭 이벤트
		$("#addBtn").on("click", function() {
			$("#actionForm").attr("action", "boardAdd");
			$("#actionForm").submit();
		});
	});
</script>
<!-- board css -->
<link rel="stylesheet" type="text/css" href="resources/css/board.css" />
</head>
<body>
<!-- nav 영역 -->
<c:import url="/nav"></c:import>
<!-- 본문 영역 -->
<div class="p-3 border border border-top-0 border-bottom-0 border-dark contents_area">
	<form id="actionForm" action="#" method="post">
		<input type=hidden id="userNo" name="userNo" value="${param.userNo}" />
		<input type=hidden id="boardNo" name="boardNo" value="${param.boardNo}" />
		<input type="hidden" name="page" id="page" value="1" />
		<input type=hidden id="authNo" name="authNo" />
		<div class="row mb-3">
			<div id="boardCnt" class="col-md-4 d-none d-sm-block">총 게시물 수<span id="boardListCnt"></span></div>
			<div class="col-md-8 p-0 pl-3">
				<div class="float-right form-check-inline">
					<select class="form-control" id="searchGbn" name="searchGbn">
						<option value="0">구분</option>
						<option value="1">제목</option>
						<option value="2">내용</option>
						<option value="3">제목+내용</option>
					</select>
					<input type="text" class="form-control" id="searchTxt" name="searchTxt">
					<button type="button" class="btn btn-secondary form-control" id="searchBtn">&#x1F50E;</button>
				</div>
			</div>
		</div>
		<table id="contentTable" class="table table-hover text-center table-sm">
			<colgroup class="d-none">
				<col class="d-xl-table-cell" width="10%"></col>
				<col width="*"></col>
				<col class="d-xl-table-cell" width="10%"></col>
				<col width="10%"></col>
				<col class="d-xl-table-cell" width="10%"></col>
			</colgroup>
			<thead class="thead-light">
				<tr>
					<th class="d-none d-xl-table-cell">NO</th>
					<th>TITLE</th>
					<th class="d-none d-xl-table-cell">AUTHOR</th>
					<th>DATE</th>
					<th class="d-none d-xl-table-cell">HIT</th>
				</tr>
			</thead>
			<tbody id ="boardList">
			</tbody>
		</table>
		<div>
			<div>
				${addBtn}
				<ul class="pagination justify-content-center" id="paging">
				</ul>
			</div>
		</div>
	</form>
</div>
<!-- 푸터영역 -->
<c:import url="/footer"></c:import>
</body>
</html>