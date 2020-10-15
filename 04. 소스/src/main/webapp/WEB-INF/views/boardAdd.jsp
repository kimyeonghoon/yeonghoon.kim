<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>yeonghoon.kim :: 메인</title>
<!-- 헤더 영역 -->
<c:import url="/header"></c:import>
<!-- 공통 js -->
<script src="resources/js/common.js"></script>
<!-- ckeditor Form -->
<script src="resources/ckeditor/ckeditor.js"></script>
<!-- boardAddAndMod js -->
<script src="resources/js/boardAddAndMod.js"></script>
<!-- jQuery Form -->
<script src="resources/jquery/jquery.form.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		// nav에 표시될 내용을 위해 사용(로그인, 비로그인 상태에 따라 표시되는 것이 다름)
		loginStatusMenu(${sMember_no});
		
		// ckeditor 추가
		ckeditorAdd(1);
		
		// 버튼 이벤트 할당
		buttonEvent(1);
		
		// nav메뉴에서 현재 위치 표시(게시판)
		$("#board").attr("class", "nav-link active");
	});
	
</script>
<!-- boardAddAndMod css -->
<link rel="stylesheet" type="text/css" href="resources/css/boardAddAndMod.css" />
</head>
<body>
<!-- nav 영역 -->
<c:import url="/nav"></c:import>
<!-- 본문 영역 -->
<div class="p-3 border border border-top-0 border-bottom-0 border-dark contents_area">
	<form action="boardDetail" method="post" id="prevPage">
		<input type="hidden" id="uNo" name="userNo" value="${member_no}">
		<input type="hidden" id="bNo" name="boardNo">
		<input type="hidden" id="aNo" name="authNo" value="${member_no}">
	</form>
	<form action="#" method="post" id="actionForm" enctype="multipart/form-data">
		<input type="hidden" id="userNo" name="userNo" value="${member_no}">
		<input type="hidden" id="authNo" name="authNo" value="${member_no}">
		<input type="hidden" id="attach1" name="attach1">
		<input type="hidden" id="attach2" name="attach2">
		<input type="hidden" id="attachOriginal1" name="attachOriginal1">
		<input type="hidden" id="attachOriginal2" name="attachOriginal2">
		
		<table class="table table-sm table-borderless border">
			<colgroup>
				<col width="25%"></col>
				<col width="*"></col>
			</colgroup>
			<tbody>
				<tr>
					<td class="font-weight-bold cursor-defualt">작성자</td>
					<td class="cursor-defualt">${member_name}</td>
				</tr>
				<tr>
					<td class="font-weight-bold cursor-defualt">제목</td>
					<td><input type="text" id="contentName" name="contentName" class="form-control"></td>
				</tr>
				<tr class="table-secondary">
					<td class="p-3" colspan="2">
						<textarea id="contentDetail" name="contentDetail"></textarea>					
					</td>
				</tr>
				<tr class="table-warning">
					<td class="p-0" colspan="2" id="uploadedFile">
					</td>
				</tr>
				<tr>
					<td class="font-weight-bold">첨부파일1
						<input type="file" class="cursor-pointer" id="file1" name="file1" />
					</td>
					<td rowspan="2" class="p-3">
						<button id="fileUpload" type="button" class="btn btn-primary">파일 업로드</button>
					</td>
				</tr>
				<tr>
					<td class="font-weight-bold">첨부파일2
						<input type="file" id="file2" class="cursor-pointer" name="file2" />
					</td>
				</tr>
			</tbody>
		</table>
		<div id="addBtn" class="btn btn-secondary" style="display: inline-block;">등록</div>
		<div id="cancelBtn" class="btn btn-secondary float-right" style="display: inline-block;">취소</div>
	</form>
</div>
<!-- 푸터영역 -->
<c:import url="/footer"></c:import>
</body>
</html>