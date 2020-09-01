<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>yeonghoon.kim :: 로그인</title>
<!-- 헤더 영역 -->
<c:import url="/header"></c:import>
<!-- 공통 js -->
<script src="resources/js/common.js"></script>
<!-- 로그인 js -->
<script src="resources/js/login.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		loginStatusMenu('${sMember_no}');

		// 약력 수정버튼 클릭(팝업)
		$("#briefHistoryModifyBtn").on("click", function(){
			modalPopup("1-2");
			getBriefHistory();
		});
		
		// 로그인 버튼 클릭 이벤트
		$("#loginBtn").on("click", function() {
			if($("#emailInput").val() == '' || $("#emailInput").val() == null) {
				$("[name='popupCheck']").val("1");
				modalPopup();
			} else if($("#passwordInput").val() == '' || $("#passwordInput").val() == null) {
				$("[name='popupCheck']").val("2");
				modalPopup();
			} else {
				$("#loginCheck").attr("loginCheckAjax");
				loginUser();
			}
		});
	});
</script>
</head>
<body>
<!-- nav 영역 -->
<c:import url="/nav"></c:import>
<!-- 본문 영역 -->
<div class="p-3 border border border-top-0 border-bottom-0 border-dark contents_area" id="contentsArea">
	<div class="row">
		<div class="col-xl-4 col-lg-3 col-md-2 col-sm-1"></div>
		<div class="col-xl-4 col-lg-6 col-md-8 col-sm-10 card border-0">
			<div class="card-header bg-secondary text-light font-weight-bold">
				로그인
			</div>
			<form action="#" method="post" id="loginCheck">
				<div class="card-body border">
					<input type="hidden" name="popupCheck" />
					<div class="input-group" style="padding-bottom: 15px">
						<div class="input-group-prepend">
							<span class="input-group-text">&#x1F4E7;</span>
						</div>
						<input type="email" class="form-control" name="emailInput" id="emailInput" placeholder="이메일을 입력해주세요.">
					</div>
					<div class="input-group" style="padding-bottom: 15px">
						<div class="input-group-prepend">
							<span class="input-group-text">&#x1F510;</span>
						</div>
						<input type="password" class="form-control" name="passwordInput" id="passwordInput" placeholder="패스워드를 입력해주세요.">
					</div>
					<div class="btn btn-secondary" style="display: block" id="loginBtn">로그인</div>
				</div>
			</form>
		</div>
		<div class="col-xl-4 col-lg-3 col-md-2 col-sm-10"></div>
	</div>
</div>
<!-- 푸터영역 -->
<c:import url="/footer"></c:import>
</body>
</html>