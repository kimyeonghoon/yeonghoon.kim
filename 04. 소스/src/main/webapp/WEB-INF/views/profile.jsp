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
<!-- profile js -->
<script src="resources/js/profile.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	loginStatusMenu('${sMember_no}');
	// 프로필 초기화
	init_profile();

	// 학력 추가버튼 동작
	$("#educationAddBtn").on("click", function(){
		modalPopup("2-1");
	});
	// 학력 수정버튼 동작
	$("#educationModBtn").on("click", function(){
		modalPopup("2-2");
	});
	// 학력 삭제버튼 동작
	$("#educationDelBtn").on("click", function(){
		modalPopup("2-3");
	});
	// 회사 추가버튼 동작
	$("#companyAddBtn").on("click", function(){
		modalPopup("3-1");
	});
	// 회사 수정버튼 동작
	$("#companyModBtn").on("click", function(){
		modalPopup("3-2");
	});
	// 회사 삭제버튼 동작
	$("#companyDelBtn").on("click", function(){
		modalPopup("3-3");
	});
	// 경력 추가버튼 동작
	$("#careerAddBtn").on("click", function(){
		modalPopup("3-4");
	});
	// 경력 수정버튼 동작
	$("#careerModBtn").on("click", function(){
		modalPopup("3-5");
	});
	// 경력 삭제버튼 동작
	$("#careerDelBtn").on("click", function(){
		modalPopup("3-6");
	});
	// 보유기술 추가버튼 동작
	$("#skillAddBtn").on("click", function(){
		modalPopup("4-1");
	});
	// 보유기술 삭제버튼 동작
	$("#skillDelBtn").on("click", function(){
		modalPopup("4-3");
	});
	// 교육 추가버튼 동작
	$("#studyAddBtn").on("click", function(){
		modalPopup("5-1");
	});
	// 교육 삭제버튼 동작
	$("#studyModBtn").on("click", function(){
		modalPopup("5-2");
	});
	// 교육 삭제버튼 동작
	$("#studyDelBtn").on("click", function(){
		modalPopup("5-3");
	});
	// 자격증 등록버튼 동작
	$("#certificationAddBtn").on("click", function(){
		modalPopup("6-1");
	});
	// 자격증 수정버튼 동작
	$("#certificationModBtn").on("click", function(){
		modalPopup("6-2");
	});
	// 자격증 삭제버튼 동작
	$("#certificationDelBtn").on("click", function(){
		modalPopup("6-3");
	});
});
</script>
</head>
<body>
<!-- nav 영역 -->
<c:import url="/nav"></c:import>
<div class="p-3 border border border-top-0 border-bottom-0 border-dark contents_area" id="contentsArea">
	<div class="container">
		<!-- 약력  -->
		<div id="briefHistory">
		</div>
	</div>
	<div id="accordion">
		<div class="card">
			<div class="card-header font-weight-bold bg-secondary">
				<a class="card-link text-light" data-toggle="collapse" href="#education">학력</a>
				<span id="educationAddBtn" class="btn btn-light float-right">추가</span>
			</div>
			<div class="collapse show" id="education" data-parent="#accordion">
				<div class="card-body p-0">
					<div class="card">
						<table class="card-body table table-sm table-borderless bg-light m-0">
							<colgroup>
								<col width="40%"></col>
								<col width="*"></col>
							</colgroup>
							<tbody>
								<tr class="border border-top-0 border-left-0 border-right-0">
									<td>
										<H6>2006. 03 ~ 2013. 02</H6>
										<span class="text-primary" id="dongauniv" data-toggle="popover" data-trigger="hover">졸업 &#x1F4C7;</span>
										<span id="educationModBtn">&#x1F6E0;</span>
										<span id="educationDelBtn">&#x1F5D1;</span>
									</td>
									<td>
										<H6>동아대학교 사학과</H6>
										<span class="text-secondary">평점 : 3.0 / 4.5</span>
									</td>
								</tr>
								<tr>
									<td>
										<H6>2003. 03 ~ 2006. 02</H6>
										<span class="text-primary">졸업</span>
										<span>&#x1F6E0;</span>
										<span>&#x1F5D1;</span>
									</td>
									<td>
										<H6>오천고등학교</H6>
										<span class="text-secondary">인문계열</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="card">
			<div class="card-header font-weight-bold bg-secondary">
				<a class="card-link text-light" data-toggle="collapse" href="#career">경력</a>
				<span class="btn btn-light ml-3 float-right" id="careerAddBtn">경력추가</span>
				<span class="btn btn-light float-right" id="companyAddBtn">회사추가</span>
			</div>
			<div class="collapse" id="career" data-parent="#accordion">
				<div class="card-body p-0">
					<div class="card">
						<table class="card-body table table-sm table-borderless bg-light m-0">
							<colgroup>
								<col width="40%"></col>
								<col width="*"></col>
							</colgroup>
							<tbody>
								<tr class="border border-top-0 border-left-0 border-right-0">
									<td>
										<H6>기프트엠</H6>
										<h6>2019. 01 ~ 2019. 12</h6>
										<span class="text-primary" id="businessCard1" data-toggle="popover" data-trigger="hover">1년 &#x1F4C7;</span>
										<span id="companyModBtn">&#x1F6E0;</span>
										<span id="companyDelBtn">&#x1F5D1;</span>
									</td>
									<td>
										<H6>
											개발팀
											<span id="careerModBtn">&#x1F6E0;</span>
											<span id="careerDelBtn">&#x1F5D1;</span>
										</H6>
										
										<h6 class="text-primary mb-5">주요 업무 : 인프라 관리 및 정보보호 관리</h6>
									</td>
								</tr>
								<tr class="border border-top-0 border-left-0 border-right-0">
									<td>
										<H6>스마일서브</H6>
										<h6>2015. 07 ~ 2018. 11</h6>
										<span class="text-primary" id="businessCard2" data-toggle="popover" data-trigger="hover">3년 5개월 &#x1F4C7;</span>
										<span id="companyModBtn">&#x1F6E0;</span>
										<span id="compayDelBtn">&#x1F5D1;</span>
									</td>
									<td>
										<H6>
											제2연구소(2018. 07 ~ 2018. 11)
											<span>&#x1F6E0;</span>
											<span>&#x1F5D1;</span>
										</H6>
										<h6 class="text-primary mb-5">주요 업무 : 웹호스팅 기술지원 및 서버 운영</h6>
										<H6>
											웹호스팅팀(2018. 01 ~ 2018. 06)
											<span>&#x1F6E0;</span>
											<span>&#x1F5D1;</span>
										</H6>
										<h6 class="text-primary mb-5">주요 업무 : 웹호스팅 기술지원 및 서버 운영, 공공기관 클라우드 개발 초기 인프라 구축</h6>
										<H6>
											기술지원팀(2015. 07 ~ 2017. 12)
											<span>&#x1F6E0;</span>
											<span>&#x1F5D1;</span>
										</H6>
										<h6 class="text-primary mb-5">주요 업무 : 호스팅 기술지원, IDC 보안 관제, 네트워크 장애처리</h6>
									</td>
								</tr>
								<tr class="border border-top-0 border-left-0 border-right-0">
									<td>
										<H6>경력기술서</H6>
									</td>
									<td>
										<H6>기프트엠</H6>
										<h6 class="text-primary">개발팀(2019. 01 ~ 2019. 12)</h6>
										<div class="text-secondary">
											- 웹하드(쉐어박스, 파일함, 미투디스크) 인프라 운영<br/>
											- IDC 인프라 자산 관리<br/>
											- 시스템 구축 및 관리(윈도우, CentOS, Apache, Nginx, PHP, MySQL, SVN, SSL, 도메인, proftpd, sphinx, raid)<br/>
											- 시스템 모니터링 및 자동화(nagios, ansible)<br/>
											- 시스템 장애 대응 처리<br/>
											- 신규 개발 관련 인프라 구축(kvm 가상화)<br/>
											- 사내 방화벽 관리(FortiGate-300D)<br/>
											- ISMS 심사 대응(보안 조치 및 문서작업)<br/>
										</div>
										<br/>
										<hr/>
										<H6>스마일서브</H6>
										<h6 class="text-primary">제2연구소(2018. 07 ~ 2018. 11)</h6>
										<div class="text-secondary">
											- 아이비호스팅, iwinv 웹호스팅 서비스 운영(Apache, PHP, MySQL, BIND, SSL, 도메인)<br/>
											- 웹호스팅 고객 응대(문의사항 처리, 사이트 이전, DB 마이그레이션 등)<br/>
											- 서버 모니터링 및 장애 대응<br/>
											- 서버 로그 분석<br/>
										</div>
										<h6 class="text-primary mt-5">웹호스팅팀(2018. 01 ~ 2018. 06)</h6>
										<div class="text-secondary">
											- 아이비호스팅, iwinv 웹호스팅 서비스 운영(Apache, PHP, MySQL, BIND, QMAIL, SSL, 도메인)<br/>
											- 웹호스팅 고객 응대(문의사항 처리, 사이트 이전, DB 마이그레이션 등)<br/>
											- 서버 모니터링 및 장애 대응<br/>
											- 서버 로그 분석<br/>
											- 프로젝트 초기 인프라 구축(서버 초기 세팅 및 프로그램 설치, 서버 이중화)<br/>
											- 프로그램 초기 세팅 및 설정(16대 - Apache, PHP, MySQL, PDNS, Sendmail, MongoDB, Node.js)<br/>
											- 서버 이중화 설정(bonding, MySQL Replication, Corosync, DRBD)<br/>
											- TLS 통신 설정(MySQL, MongoDB, Sendmail)<br/>
										</div>
										<h6 class="text-primary mt-5">기술지원팀(2015. 07 ~ 2017. 12)</h6>
										<div class="text-secondary">
											- cloudv, iwinv 서버 부분 기술지원<br/>
											- 서버 조립 및 OS 설치(CentOS, Ubuntu, Windows Server)<br/>
											- 프로그램 설치 및 설정(Apache, Nginx, IIS, PHP, Tomcat, MySQL, MariaDB, MS-SQL, Sendmail, Dovecot, BIND, PDNS 등)<br/>
											- 간단한 shell script 작성(백업, 모니터링 스크립트 등)<br/>
											- 고객 서버 장애처리(하드웨어 교체, 시스템 점검, 시스템 복구)<br/>
											- PLANET, Edgecore L2, L3 스위치 세팅<br/>
											- 해킹 사고 및 DDoS 탐지 및 대응<br/>
										</div> 
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="card">
			<div class="card-header font-weight-bold bg-secondary">
				<a class="card-link text-light" data-toggle="collapse" href="#skill">보유기술</a>
				<span class="btn btn-light ml-3 float-right" id="skillDelBtn">항목 삭제</span>
				<span class="btn btn-light float-right" id="skillAddBtn">항목 추가</span>
			</div>
			<div class="collapse" id="skill" data-parent="#accordion">
				<div class="card-body p-0" id="skillList">
				</div>
			</div>
		</div>
		<div class="card">
			<div class="card-header font-weight-bold bg-secondary">
				<a class="card-link text-light" data-toggle="collapse" href="#study">교육</a>
				<span class="btn btn-light float-right" id="studyAddBtn">추가</span>
			</div>
			<div class="collapse" id="study" data-parent="#accordion">
				<div class="card-body p-0">
					<div class="card">
						<table class="card-body table table-sm table-borderless bg-light m-0">
							<colgroup>
								<col width="40%"></col>
								<col width="*"></col>
							</colgroup>
							<tbody>
								<tr class="border border-top-0 border-left-0 border-right-0">
									<td>
										<H6>2020. 02 ~ 2020. 08</H6>
										<span class="text-primary" id="gdi" data-toggle="popover" data-trigger="hover">수료 &#x1F4C7;</span>
										<span id="studyModBtn">&#x1F6E0;</span>
										<span id="studyDelBtn">&#x1F5D1;</span>
									</td>
									<td>
										<H6>구디아카데미</H6>
										<p class="text-primary">교육과정 : 자바기반 스마트 웹&콘텐츠 개발자 양성과정</p>
										<div class="text-secondary">
											1. Web Front-End (UI) : html, CSS, JavaScript, jQuery, JSP<br/>
											2. DataBase : Oracle DB<br/>
											3. Web Back-End : JAVA, SpringFramework, MyBatis<br/>
											4. Team Project
										</div>
									</td>
								</tr>
								<tr class="border border-top-0 border-left-0 border-right-0">
									<td>
										<H6>2014. 12 ~ 2015. 07</H6>
										<span class="text-primary" id="itwillbs" data-toggle="popover" data-trigger="hover">수료 &#x1F4C7;</span>
										<span>&#x1F6E0;</span>
										<span>&#x1F5D1;</span>
									</td>
									<td>
										<H6>아이티윌 부산교육센터</H6>
										<p class="text-primary">교육과정 : 자바기반 스마트 웹&콘텐츠 개발자 양성과정</p>
										<div class="text-secondary">
											1. Windows Server/Linux Server 실무 및 보안<br/>
											2. 네트워크 인프라 솔루션(CCNA, CCNP)<br/>
											3. 가상사설망 VPN<br/>
											4. 오라클 데이터베이스<br/>
											5. 실전 클라우드 가상화 구축 기술<br/>
											6. 실무 Project<br/>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="card">
			<div class="card-header font-weight-bold bg-secondary">
				<a class="card-link text-light" data-toggle="collapse" href="#certification">자격증</a>
				<span class="btn btn-light float-right" id="certificationAddBtn">추가</span>
			</div>
			<div class="collapse" id="certification" data-parent="#accordion">
				<div class="card-body p-0">
					<div class="card">
						<table class="card-body table table-sm table-borderless bg-light m-0">
							<colgroup>
								<col width="40%"></col>
								<col width="*"></col>
							</colgroup>
							<tbody>
								<tr class="border border-top-0 border-left-0 border-right-0">
									<td>
										<H6>2015. 05</H6>
										<span class="text-primary" id="eip" data-toggle="popover" data-trigger="hover">합격 &#x1F4C7;</span>
										<span id="certificationModBtn">&#x1F6E0;</span>
										<span id="certificationDelBtn">&#x1F5D1;</span>
									</td>
									<td>
										<H6>정보처리기사</H6>
										<div class="text-secondary">
											한국산업인력공단
										</div>
									</td>
								</tr>
								<tr class="border border-top-0 border-left-0 border-right-0">
									<td>
										<H6>2013. 11</H6>
										<span class="text-primary" id="pc1" data-toggle="popover" data-trigger="hover">합격 &#x1F4C7;</span>
										<span>&#x1F6E0;</span>
										<span>&#x1F5D1;</span>
									</td>
									<td>
										<H6>PC정비사1급</H6>
										<div class="text-secondary">
											한국정보통신자격협회
										</div>
									</td>
								</tr>
								<tr class="border border-top-0 border-left-0 border-right-0">
									<td>
										<H6>2012. 08</H6>
										<span class="text-primary" id="ieoa" data-toggle="popover" data-trigger="hover">합격 &#x1F4C7;</span>
										<span>&#x1F6E0;</span>
										<span>&#x1F5D1;</span>
									</td>
									<td>
										<H6>사무자동화산업기사</H6>
										<div class="text-secondary">
											한국산업인력공단
										</div>
									</td>
								</tr>
								<tr class="border border-top-0 border-left-0 border-right-0">
									<td>
										<H6>2012. 08</H6>
										<span class="text-primary" id="csisdl2" data-toggle="popover" data-trigger="hover">합격 &#x1F4C7;</span>
										<span>&#x1F6E0;</span>
										<span>&#x1F5D1;</span>
									</td>
									<td>
										<H6>컴퓨터활용능력2급</H6>
										<div class="text-secondary">
											대한상공회의소
										</div>
									</td>
								</tr>
								<tr class="border border-top-0 border-left-0 border-right-0">
									<td colspan="2">
										<div class="text-secondary">*기타 - 1종보통운전면허, 워드프로세서1급, 전산회계1급, OCA(만료), CCNP(만료)</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- 푸터영역 -->
<c:import url="/footer"></c:import>
</body>
</html>