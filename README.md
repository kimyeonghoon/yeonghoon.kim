# yeonghoon.kim


### 프로젝트 정보
1. 프로젝트 명 : yeonghoon.kim
2. 개발기간 : 2020/08/12 ~ 2020/10/17
3. 참여인원 : 1명
4. 담당업무 : 기획, 설계, 디자인, 개발, 테스트, 인프라구축
5. 실제 페이지 : https://yeonghoon.kim
5. 데모 페이지 : https://demo.yeonghoon.kim - 아이디 : demo@yeonghoon.kim / 패스워드 : demo


### 개발환경
1. 개발환경 : Windows 10, CentOS8(web), CentOS7(was, db)
2. 사용도구 : eclipse, heidiSQL, nginx, tomcat, svn(배포용), git(소스 버전 관리)
3. 사용기술 : Java 1.8, MariaDB 10.3, jQuery, JSON, Ajax, HTML, CSS, JSP, XML, bootstrap, SSL


### 개발 기간 상세
1. 기획 및 디자인
    + 기획 및 html 디자인(8월 12일 ~ 8월 25일/ 14일)
    + 스프링 maven 프로젝트생성(8월 26일/ 1일)
    + erd 및 테이블정의서 1차 완성(8월27일 ~ 8월 28일 / 2일)
    + erd 및 테이블정의서 수정(10월 17일 / 1일)
2. 개발 및 테스트
    + 1차 개발 - 기본 레이아웃 및 공통(8월 28일 ~ 8월 31일 / 4일)
    + 2차 개발 - 프로필(9월 1일 ~ 9월 8일 / 8일)
    + 3차 개발 - 게시판(9월 9일 ~ 9월 12일 / 4일)
    + 4차 개발 - 갤러리(9월 13일 ~ 9월 14일 / 2일)
    +  알파테스트(9월 15일 ~ 9월 18일 / 4일)
    + 5차 개발 - 알파테스트 중 발견한 버그 수정 및 기능 추가(9월 19일 ~ 9월 22일 / 4일)
    + 코드정리(9월 24일 ~ 10월 5일 / 11일)
    + 베타테스트(10월 6일 ~ 10월 11일 / 6일)
    + 테스트케이스 작성 및 버그 수정(10월 12일 ~ 10월 15일 / 4일)


### 개발 상세
1. 기획 및 디자인
    + 개인 홈페이지 구성
    + 기존에 운형했던 그누보드 게시판의 DB를 마이그레이션 해서 사용
    + 메뉴 - 프로필, 게시판, 갤러리, 포트폴리오
    + 프로필 - 관리자 로그인 시 항목 추가/수정/삭제 기능 활성화
    + 게시판 - 관리자만 글 추가/수정/삭제하도록 설정. 검색, 파일 첨부, 에디터 기능
    + 갤러리 - 관리자만 글 추가/수정/삭제하도록 설정. 검색, 에디터, 썸네일 기능
    + 로그인, 회원가입 기능
    + 로그인한 상태에 따라 상단 메뉴바 내용 다르게 함
    + 상단 네비바, 중단 본문, 하단 연락처
2. DB 설계
    + 데이터 모델링(물리, 논리) [
물리논리ERD.png](https://github.com/kimyeonghoon/yeonghoon.kim/blob/master/03.%20erd%20%EB%B0%8F%20%ED%85%8C%EC%9D%B4%EB%B8%94%EC%A0%95%EC%9D%98%EC%84%9C/%EB%AC%BC%EB%A6%AC%EB%85%BC%EB%A6%ACERD.png)
    + 데이터 모델링을 기반으로 테이블 정의서 작성 [테이블정의서.xlsx](https://github.com/kimyeonghoon/yeonghoon.kim/blob/master/03.%20erd%20%EB%B0%8F%20%ED%85%8C%EC%9D%B4%EB%B8%94%EC%A0%95%EC%9D%98%EC%84%9C/%ED%85%8C%EC%9D%B4%EB%B8%94%EC%A0%95%EC%9D%98%EC%84%9C.xlsx)
3. Framework 설계
    + Spring 4.3.28 - Annotation Driven을 통한 컨트롤러 호출, Resource Mapping을 통한 리소스 폴더 관리, AOP, jstl, aws-java-sdk(Object Storage), imgscalr-lib(thumbnail), Spring Security(bcrypt 암호화)
    + Mybatis 3.5.5 - Mybatis와 MariaDB 연동
    + bootstrap 4.5.2
4. 서버 구성 [구조도.jpg](https://raw.githubusercontent.com/kimyeonghoon/yeonghoon.kim/master/01.%20%EA%B8%B0%ED%9A%8D/%EA%B5%AC%EC%A1%B0%EB%8F%84.JPG)
    + WebServer - CentOS8, nginx 1.14.1(리버스 프록시 구성), let's encrypt(SSL)
    + WasServer & DBServer - CentOS7, tomcat 8.5.55, jdk 1.8.0_251, MariaDB 10.4.13
5. 개발
    + Ajax를 통한 동적 WEB 구현 : 로딩된 페이지 상에서 동적으로 웹을 구현.
    + bootstrap을 이용해서 반응형 웹페이지 구현.
    + git을 통한 버전 관리
6. 테스트
    + UI테스트(테스트 수행 - 2회, 테스트 항목 - 204건, 정상완료 169건, 오류발생 35건, 조치 35건)
    [UI테스트 보고서.xlsx](https://github.com/kimyeonghoon/yeonghoon.kim/blob/master/05.%20%ED%85%8C%EC%8A%A4%ED%8A%B8%EC%BC%80%EC%9D%B4%EC%8A%A4/UI%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EB%B3%B4%EA%B3%A0%EC%84%9C.xlsx)
    + 애플리케이션 테스트(테스트 수행 - 1회, 테스트 항목 - 145건, 정상완료 145건)
    [애플리케이션 테스트 보고서.xlsx](https://github.com/kimyeonghoon/yeonghoon.kim/blob/master/05.%20%ED%85%8C%EC%8A%A4%ED%8A%B8%EC%BC%80%EC%9D%B4%EC%8A%A4/%EC%95%A0%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EB%B3%B4%EA%B3%A0%EC%84%9C.xlsx)
