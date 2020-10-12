<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>yeonghoon.kim :: 회원가입</title>
<!-- 헤더 영역 -->
<c:import url="/header"></c:import>
<!-- 다음지도 주소 API -->
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<!-- 회원가입 js -->
<script src="resources/js/join.js"></script>
<!-- 공통 js -->
<script src="resources/js/common.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		// nav에 표시될 내용을 위해 사용(로그인, 비로그인 상태에 따라 표시되는 것이 다름)
		loginStatusMenu('${sMember_no}');
		
		// 기지국 번호를 못받아올 경우(디비 문제 발생)
		if($("#telFirstNo").attr("name") != "telFirstNo") {
			joinModalPopup(97);
		}
		
		// 버튼 이벤트 할당
		joinButtonEvent();
	});
</script>
</head>
<body>
<!-- nav 영역 -->
<c:import url="/nav"></c:import>
<!-- 본문 영역 -->
<div class="p-3 border border border-top-0 border-bottom-0 border-dark contents_area" id="contentsArea">
	<div class="row">
		<div class="col-xl-3 col-lg-3 col-md-2 col-sm-1"></div>
		<div class="col-xl-6 col-lg-6 col-md-8 col-sm-10 card border-0">
			<div class="card-header bg-secondary text-light font-weight-bold">
				회원가입
			</div>
			<div class="card-body border">
				<input type="hidden" name="popupCheck" />
				<form action="#" method="post" id="joinCheck" autocomplete="off">
					<div class="form-group row">
						<label class="col-sm-4 text-sm-right font-weight-bold">이메일</label>
						<div class="col-sm-8">
							<input type="email" name="emailInput" id="emailInput" class="form-control" />
						</div>
					</div>
					<div class="form-group row">
						<label class="col-sm-4 text-sm-right font-weight-bold">비밀번호</label>
						<div class="col-sm-8">
							<input type="password" name="passwordInput" id="passwordInput" class="form-control" />
						</div>
					</div>
					<div class="form-group row">
						<label class="col-sm-4 text-sm-right font-weight-bold">비밀번호 확인</label>
						<div class="col-sm-8">
							<input type="password" name="passwordCheckInput" id="passwordCheckInput" class="form-control" />
						</div>
					</div>
					<div class="form-group row">
						<label class="col-sm-4 text-sm-right font-weight-bold">이름</label>
						<div class="col-sm-8">
							<input type="text" name="nameInput" id="nameInput" class="form-control" />
						</div>
					</div>
					<div class="form-group row">
						<div id="addressSearchForm" class="embed-responsive"></div>
						<label class="col-sm-4 text-sm-right font-weight-bold">주소</label>
						<div class="col-sm-8">
							<button type="button" class="btn btn-secondary" id="searchAddress">주소 검색</button>
							<input type="text" name="addressInput" id="addressInput" class="form-control" disabled="disabled" />
							<input type="text" name="detailAddressInput" id="detailAddressInput" class="form-control" disabled="disabled" />
						</div>
					</div>
					<div class="form-group row">
						<label class="col-sm-4 text-sm-right font-weight-bold">성별</label>
						<div class="col-sm-8">
							<div class="form-check-inline">
								<label class="form-check-label">
									<input type="radio" class="form-check-input" name="gender" value="0" />남자
								</label> 
							</div>
							<div class="form-check-inline">
								<label class="form-check-label">
									<input type="radio" class="form-check-input" name="gender" value="1" />여자
								</label> 
							</div>
						</div>
					</div>
					<div class="form-group row">
						<label class="col-sm-4 text-sm-right font-weight-bold">전화번호</label>
						<div class="col-sm-8">
							<div class="form-check-inline row m-0">
								<span class="col-sm-4 p-0">
									<select class="form-control" id="telFirstNo" name="${result}">
										<option value="notSelected" selected="selected">국번</option>
										<c:forEach var="data" items="${list}">
											<option value="${data.bts}">${data.bts}</option>
										</c:forEach>
									</select>
								</span>
								<span class="col-sm-8 p-0"> 
									<input type="text" class="form-control" name="telNo" id="telNo" maxlength="8" />
								</span>
							</div>
						</div>
					</div>
				<div class="btn btn-secondary" style="display: block" id="joinBtn">가입하기</div>	
				</form>
			</div>
		</div>
		<div class="col-xl-3 col-lg-3 col-md-2 col-sm-10"></div>
	</div>
</div>
<!-- 푸터영역 -->
<c:import url="/footer"></c:import>
</body>
</html>