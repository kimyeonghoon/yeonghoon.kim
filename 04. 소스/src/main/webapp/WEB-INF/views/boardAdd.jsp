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
<!-- boardAdd js -->
<script src="resources/js/boardAdd.js"></script>
<!-- jQuery Form -->
<script src="resources/jquery/jquery.form.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		loginStatusMenu(${sMember_no});
		$(document).ready(function() {
			// CKEDITOR 붙이기
			CKEDITOR.replace("contentDetail", {
				language : "ko",
				enterMode : "2",
				resize_enabled : false,
				width : "100%",
				height : "450px"
			});
			
			// 등록 버튼 클릭 이벤트
			$("#addBtn").on("click", function() {
				$("#contentDetail").val(CKEDITOR.instances['contentDetail'].getData());
				boardAdd();
			});
			// 파일 업로드 버튼 클릭 이벤트
			$("#fileUpload").on("click", function() {
				fileUpload();
			});
			// 취소 버튼 클릭 이벤트
			$("#cancelBtn").on("click", function() {
				location.href="board";
			});
		});
	});
	
</script>
</head>
<body>
<!-- nav 영역 -->
<c:import url="/nav"></c:import>
<!-- 본문 영역 -->
<div class="p-3 border border border-top-0 border-bottom-0 border-dark contents_area">
	<form action="#" method="post" id="actionForm" enctype="multipart/form-data">
		<input type="hidden" id="userNo" name="userNo" value="${member_no}">
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
					<td class="font-weight-bold">작성자</td>
					<td>${member_name}</td>
				</tr>
				<tr>
					<td class="font-weight-bold">제목</td>
					<td><input type="text" name="contentName" class="form-control"></td>
				</tr>
				<tr class="table-secondary">
					<td class="p-3" colspan="2">
						<textarea id="contentDetail" name="contentDetail"></textarea>					
					</td>
				</tr>
				<tr>
					<td class="font-weight-bold">첨부파일1
						<input type="file" id="file1" name="file1" />
					</td>
					<td rowspan="2" class="p-3">
						<button id="fileUpload" type="button" class="btn btn-primary">파일 업로드</button>
					</td>
				</tr>
				<tr>
					<td class="font-weight-bold">첨부파일2
						<input type="file" id="file2" name="file2" />
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