-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.5.5-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- yeonghoon.kim 데이터베이스 구조 내보내기
DROP DATABASE IF EXISTS `yeonghoon.kim`;
CREATE DATABASE IF NOT EXISTS `yeonghoon.kim` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `yeonghoon.kim`;

-- 테이블 yeonghoon.kim.academy 구조 내보내기
DROP TABLE IF EXISTS `academy`;
CREATE TABLE IF NOT EXISTS `academy` (
  `academy_no` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '교육번호',
  `member_no` int(11) unsigned NOT NULL COMMENT '회원번호',
  `academy_course` varchar(50) NOT NULL COMMENT '교육과정',
  `academy_content` text NOT NULL COMMENT '교육내용',
  `academy_academy` varchar(20) NOT NULL COMMENT '학원명',
  `academy_startdate` date NOT NULL COMMENT '시작년월',
  `academy_enddate` date NOT NULL COMMENT '종료년월',
  `academy_upload_path` tinytext DEFAULT NULL COMMENT '증명서류경로',
  `academy_delete_yn` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT '삭제여부',
  PRIMARY KEY (`academy_no`),
  KEY `academy_member.FK` (`member_no`),
  CONSTRAINT `academy_member.FK` FOREIGN KEY (`member_no`) REFERENCES `member` (`member_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='교육에 대한 정보를 담는 테이블';

-- 테이블 데이터 yeonghoon.kim.academy:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `academy` DISABLE KEYS */;
/*!40000 ALTER TABLE `academy` ENABLE KEYS */;

-- 테이블 yeonghoon.kim.base_transceiver_station 구조 내보내기
DROP TABLE IF EXISTS `base_transceiver_station`;
CREATE TABLE IF NOT EXISTS `base_transceiver_station` (
  `bts_no` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '기지국정보번호',
  `bts_name` varchar(10) NOT NULL COMMENT '기지국명',
  `bts_station_no` tinyint(2) unsigned NOT NULL COMMENT '기지국번호',
  PRIMARY KEY (`bts_no`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COMMENT='기지국 정보를 담은 테이블';

-- 테이블 데이터 yeonghoon.kim.base_transceiver_station:~24 rows (대략적) 내보내기
/*!40000 ALTER TABLE `base_transceiver_station` DISABLE KEYS */;
REPLACE INTO `base_transceiver_station` (`bts_no`, `bts_name`, `bts_station_no`) VALUES
	(1, '모바일공통\r\n', 10),
	(2, 'SKT', 11),
	(3, 'KT\r\n', 16),
	(4, 'SKT(신세기)\r\n', 17),
	(5, 'KT(한솔)\r\n', 18),
	(6, 'LG\r\n', 19),
	(7, '서울특별시\r\n', 2),
	(8, '경기도\r\n', 31),
	(9, '인천광역시\r\n', 32),
	(10, '강원도\r\n', 33),
	(11, '충청남도\r\n', 41),
	(12, '대전광역시\r\n', 42),
	(13, '충청북도\r\n', 43),
	(14, '세종특별자치시\r\n', 44),
	(15, '부산광역시\r\n', 51),
	(16, '울산광역시\r\n', 52),
	(17, '대구광역시\r\n', 53),
	(18, '경상북도\r\n', 54),
	(19, '경상남도\r\n', 55),
	(20, '전라남도\r\n', 61),
	(21, '광주광역시\r\n', 62),
	(22, '전라북도\r\n', 63),
	(23, '제주특별자치도\r\n', 64),
	(24, 'VOIP\r\n', 70);
/*!40000 ALTER TABLE `base_transceiver_station` ENABLE KEYS */;

-- 테이블 yeonghoon.kim.board 구조 내보내기
DROP TABLE IF EXISTS `board`;
CREATE TABLE IF NOT EXISTS `board` (
  `board_no` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '게시판번호',
  `board_type_no` int(11) unsigned NOT NULL COMMENT '게시판구분번호',
  `board_name` varchar(20) NOT NULL COMMENT '게시판명',
  `board_category` tinyint(1) unsigned NOT NULL COMMENT '게시판유형',
  `board_delete_yn` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT '삭제여부',
  PRIMARY KEY (`board_no`),
  KEY `board_board_type.FK` (`board_type_no`),
  CONSTRAINT `board_board_type.FK` FOREIGN KEY (`board_type_no`) REFERENCES `board_type` (`board_type_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='게시판 정보를 담는 테이블';

-- 테이블 데이터 yeonghoon.kim.board:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
/*!40000 ALTER TABLE `board` ENABLE KEYS */;

-- 테이블 yeonghoon.kim.board_content 구조 내보내기
DROP TABLE IF EXISTS `board_content`;
CREATE TABLE IF NOT EXISTS `board_content` (
  `board_content_no` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '게시글번호',
  `board_no` int(11) unsigned NOT NULL COMMENT '게시판번호',
  `member_no` int(11) unsigned NOT NULL COMMENT '회원번호',
  `board_content_name` varchar(50) NOT NULL COMMENT '제목',
  `board_content_detail` varchar(1000) NOT NULL COMMENT '내용',
  `board_content_reg_time` datetime NOT NULL DEFAULT current_timestamp() COMMENT '등록시간',
  `board_content_mod_time` datetime DEFAULT NULL COMMENT '수정시간',
  `board_content_hit` int(11) unsigned NOT NULL COMMENT '조회수',
  `board_content_del_time` datetime DEFAULT NULL COMMENT '삭제시간',
  PRIMARY KEY (`board_content_no`),
  KEY `board_content_board.FK` (`board_no`),
  KEY `board_content_member.FK` (`member_no`),
  CONSTRAINT `board_content_board.FK` FOREIGN KEY (`board_no`) REFERENCES `board` (`board_no`),
  CONSTRAINT `board_content_member.FK` FOREIGN KEY (`member_no`) REFERENCES `member` (`member_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='게시글 정보를 담는 테이블';

-- 테이블 데이터 yeonghoon.kim.board_content:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `board_content` DISABLE KEYS */;
/*!40000 ALTER TABLE `board_content` ENABLE KEYS */;

-- 테이블 yeonghoon.kim.board_content_file 구조 내보내기
DROP TABLE IF EXISTS `board_content_file`;
CREATE TABLE IF NOT EXISTS `board_content_file` (
  `board_content_file_no` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '첨부파일번호',
  `board_content_no` int(11) unsigned NOT NULL COMMENT '게시글번호',
  `board_content_file_path` tinytext NOT NULL COMMENT '첨부파일경로',
  `board_content_file_ext` varchar(10) NOT NULL COMMENT '확장자',
  PRIMARY KEY (`board_content_file_no`),
  KEY `board_content_no.FK` (`board_content_no`),
  CONSTRAINT `board_content_no.FK` FOREIGN KEY (`board_content_no`) REFERENCES `board_content` (`board_content_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='게시글 첨부파일 정보를 담는 테이블';

-- 테이블 데이터 yeonghoon.kim.board_content_file:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `board_content_file` DISABLE KEYS */;
/*!40000 ALTER TABLE `board_content_file` ENABLE KEYS */;

-- 테이블 yeonghoon.kim.board_type 구조 내보내기
DROP TABLE IF EXISTS `board_type`;
CREATE TABLE IF NOT EXISTS `board_type` (
  `board_type_no` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '게시판구분번호',
  `board_type_delete_yn` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT '삭제여부',
  PRIMARY KEY (`board_type_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='게시판 구분에 대한 정보를 담는 테이블';

-- 테이블 데이터 yeonghoon.kim.board_type:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `board_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `board_type` ENABLE KEYS */;

-- 테이블 yeonghoon.kim.brief_history 구조 내보내기
DROP TABLE IF EXISTS `brief_history`;
CREATE TABLE IF NOT EXISTS `brief_history` (
  `brief_history_no` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '약력번호',
  `member_no` int(11) unsigned NOT NULL COMMENT '회원번호',
  `brief_history_education` varchar(20) DEFAULT NULL COMMENT '학력',
  `brief_history_career` varchar(20) DEFAULT NULL COMMENT '경력',
  `brief_history_certificate` varchar(20) DEFAULT NULL COMMENT '자격',
  `brief_history_upload_path` tinytext DEFAULT NULL COMMENT '사진경로',
  PRIMARY KEY (`brief_history_no`),
  KEY `brief_hisotry_member.FK` (`member_no`),
  CONSTRAINT `brief_hisotry_member.FK` FOREIGN KEY (`member_no`) REFERENCES `member` (`member_no`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='약력에 대한 정보를 담는 테이블';

-- 테이블 데이터 yeonghoon.kim.brief_history:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `brief_history` DISABLE KEYS */;
REPLACE INTO `brief_history` (`brief_history_no`, `member_no`, `brief_history_education`, `brief_history_career`, `brief_history_certificate`, `brief_history_upload_path`) VALUES
	(1, 1, '동아대학교(4년) 사학과', '인프라엔지니어 4년 5개월', '정보처리기사 외 3', NULL);
/*!40000 ALTER TABLE `brief_history` ENABLE KEYS */;

-- 테이블 yeonghoon.kim.career 구조 내보내기
DROP TABLE IF EXISTS `career`;
CREATE TABLE IF NOT EXISTS `career` (
  `career_no` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '경력번호',
  `company_no` int(11) unsigned NOT NULL COMMENT '회사번호',
  `career_responsibility` varchar(50) NOT NULL COMMENT '주요업무',
  `career_description` text NOT NULL COMMENT '경력기술',
  `career_delete_yn` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT '삭제여부',
  PRIMARY KEY (`career_no`),
  KEY `career_company.FK` (`company_no`),
  CONSTRAINT `career_company.FK` FOREIGN KEY (`company_no`) REFERENCES `company` (`company_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='경력에 대한 정보를 담는 테이블';

-- 테이블 데이터 yeonghoon.kim.career:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `career` DISABLE KEYS */;
/*!40000 ALTER TABLE `career` ENABLE KEYS */;

-- 테이블 yeonghoon.kim.certificate 구조 내보내기
DROP TABLE IF EXISTS `certificate`;
CREATE TABLE IF NOT EXISTS `certificate` (
  `certificate_no` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '자격증번호',
  `member_no` int(11) unsigned NOT NULL COMMENT '회원번호',
  `certificate_organization` varchar(20) NOT NULL COMMENT '발급기관',
  `certificate_pass_yn` tinyint(1) unsigned NOT NULL COMMENT '합격여부',
  `certificati_issue_date` date NOT NULL COMMENT '발급일자',
  `certificate_upload_path` tinytext DEFAULT NULL COMMENT '증명서류경로',
  `certificate_delete_yn` tinyint(3) unsigned NOT NULL DEFAULT 1 COMMENT '삭제여부',
  PRIMARY KEY (`certificate_no`),
  KEY `certificate_member.FK` (`member_no`),
  CONSTRAINT `certificate_member.FK` FOREIGN KEY (`member_no`) REFERENCES `member` (`member_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='자격증에 대한 정보를 담는 테이블';

-- 테이블 데이터 yeonghoon.kim.certificate:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `certificate` DISABLE KEYS */;
/*!40000 ALTER TABLE `certificate` ENABLE KEYS */;

-- 테이블 yeonghoon.kim.comment 구조 내보내기
DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `comment_no` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '댓글번호',
  `board_content_no` int(11) unsigned NOT NULL COMMENT '게시글번호',
  `comment_content` text NOT NULL COMMENT '내용',
  `comment_reg_time` datetime NOT NULL DEFAULT current_timestamp() COMMENT '등록시간',
  `comment_mod_time` datetime DEFAULT NULL COMMENT '수정시간',
  `comment_del_time` datetime DEFAULT NULL COMMENT '삭제시간',
  PRIMARY KEY (`comment_no`),
  KEY `comment_board_content_no.FK` (`board_content_no`),
  CONSTRAINT `comment_board_content_no.FK` FOREIGN KEY (`board_content_no`) REFERENCES `board_content` (`board_content_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='댓글 정보를 담는 테이블';

-- 테이블 데이터 yeonghoon.kim.comment:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;

-- 테이블 yeonghoon.kim.company 구조 내보내기
DROP TABLE IF EXISTS `company`;
CREATE TABLE IF NOT EXISTS `company` (
  `company_no` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '회사번호',
  `member_no` int(11) unsigned NOT NULL COMMENT '회원번호',
  `company_name` varchar(20) NOT NULL COMMENT '회사명',
  `company_startdate` date NOT NULL COMMENT '입사년월',
  `company_enddate` date NOT NULL COMMENT '퇴사년월',
  `company_upload_path` tinytext DEFAULT NULL COMMENT '증명서류경로',
  `company_delete_yn` tinyint(1) unsigned DEFAULT 1 COMMENT '삭제여부',
  PRIMARY KEY (`company_no`),
  KEY `member.fk` (`member_no`),
  CONSTRAINT `member.fk` FOREIGN KEY (`member_no`) REFERENCES `member` (`member_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='회사에 대한 정보를 담는 테이블';

-- 테이블 데이터 yeonghoon.kim.company:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
/*!40000 ALTER TABLE `company` ENABLE KEYS */;

-- 테이블 yeonghoon.kim.education 구조 내보내기
DROP TABLE IF EXISTS `education`;
CREATE TABLE IF NOT EXISTS `education` (
  `education_no` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '학력번호',
  `member_no` int(11) unsigned NOT NULL COMMENT '회원번호',
  `education_name` varchar(20) NOT NULL COMMENT '학교명',
  `education_department` varchar(20) NOT NULL COMMENT '학과명',
  `education_status` tinyint(1) unsigned NOT NULL COMMENT '상태',
  `education_startdate` date NOT NULL COMMENT '입학년월',
  `education_enddate` date NOT NULL COMMENT '졸업년월',
  `education_etc` varchar(20) DEFAULT NULL COMMENT '기타사항',
  `education_upload_path` tinytext DEFAULT NULL COMMENT '증명서류경로',
  `education_delete_yn` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT '삭제여부',
  PRIMARY KEY (`education_no`),
  KEY `education_member.FK` (`member_no`),
  CONSTRAINT `education_member.FK` FOREIGN KEY (`member_no`) REFERENCES `member` (`member_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='학력에 대한 정보를 담는 테이블';

-- 테이블 데이터 yeonghoon.kim.education:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
/*!40000 ALTER TABLE `education` ENABLE KEYS */;

-- 테이블 yeonghoon.kim.member 구조 내보내기
DROP TABLE IF EXISTS `member`;
CREATE TABLE IF NOT EXISTS `member` (
  `member_no` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '회원번호',
  `member_email` varchar(50) NOT NULL COMMENT '이메일',
  `member_password` tinytext NOT NULL COMMENT '패스워드',
  `member_name` varchar(5) NOT NULL COMMENT '이름',
  `member_address` varchar(40) DEFAULT NULL COMMENT '주소',
  `member_address_detail` varchar(10) DEFAULT NULL COMMENT '상세주소',
  `member_gender` tinyint(1) unsigned DEFAULT NULL COMMENT '성별',
  `member_tel` varchar(15) DEFAULT NULL COMMENT '전화번호',
  `member_birthday` smallint(4) unsigned DEFAULT NULL COMMENT '생일',
  `member_delete_yn` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT '삭제여부',
  PRIMARY KEY (`member_no`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COMMENT='회원에 대한 정보를 담는 테이블';

-- 테이블 데이터 yeonghoon.kim.member:~2 rows (대략적) 내보내기
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
REPLACE INTO `member` (`member_no`, `member_email`, `member_password`, `member_name`, `member_address`, `member_address_detail`, `member_gender`, `member_tel`, `member_birthday`, `member_delete_yn`) VALUES
	(1, 'me@yeonghoon.kim', '$2a$10$rf8DyZyWJiMjD7Yru/oiGOiW3p3F7.E3QXjNpCxVye1Za/Mj8F2xe', '김영훈', '서울특별시 금천구 독산동', '동흥빌라 303호', NULL, '01051661219', 1987, 1),
	(14, 'test@test.com', '$2a$10$sDPXqM4BivIIPLS1WWDBCu.NLcTQhI8cx5MdUiUQIGGN9wxjkkCia', '테스트', NULL, '1', 0, '05422222222', NULL, 1);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;

-- 테이블 yeonghoon.kim.tech 구조 내보내기
DROP TABLE IF EXISTS `tech`;
CREATE TABLE IF NOT EXISTS `tech` (
  `tech_no` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '기술번호',
  `member_no` int(11) unsigned NOT NULL COMMENT '회원번호',
  `tech_category_no` int(11) unsigned NOT NULL COMMENT '기술분류번호',
  `tech_name` varchar(20) NOT NULL COMMENT '기술명',
  `tech_delete_yn` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT '삭제여부',
  PRIMARY KEY (`tech_no`),
  KEY `tech_member.FK` (`member_no`),
  KEY `tech_category.FK` (`tech_category_no`),
  CONSTRAINT `tech_category.FK` FOREIGN KEY (`tech_category_no`) REFERENCES `tech_category` (`tech_category_no`),
  CONSTRAINT `tech_member.FK` FOREIGN KEY (`member_no`) REFERENCES `member` (`member_no`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COMMENT='기술에 대한 정보를 담는 테이블';

-- 테이블 데이터 yeonghoon.kim.tech:~28 rows (대략적) 내보내기
/*!40000 ALTER TABLE `tech` DISABLE KEYS */;
REPLACE INTO `tech` (`tech_no`, `member_no`, `tech_category_no`, `tech_name`, `tech_delete_yn`) VALUES
	(3, 1, 1, 'Java', 1),
	(4, 1, 1, 'Javascript', 1),
	(5, 1, 1, 'HTML', 1),
	(6, 1, 1, 'CSS', 1),
	(7, 1, 2, 'Spring', 1),
	(9, 1, 2, 'MyBatis', 1),
	(10, 1, 2, 'Bootstrap', 1),
	(11, 1, 3, 'jQuery', 1),
	(12, 1, 3, 'jQueryUi', 1),
	(13, 1, 4, 'Oracle', 1),
	(14, 1, 4, 'MariaDB', 1),
	(15, 1, 5, 'Tomcat', 1),
	(16, 1, 5, 'Nginx', 1),
	(17, 1, 5, 'Apache', 1),
	(18, 1, 6, 'Git', 1),
	(19, 1, 6, 'Subversion', 1),
	(20, 1, 7, '카카오 우편번호 서비스', 1),
	(21, 1, 8, 'Eclipse', 1),
	(22, 1, 8, 'SQLDeveloper', 1),
	(23, 1, 8, 'HeidiSQL', 1),
	(24, 1, 8, 'TortoiseSVN', 1),
	(25, 1, 8, 'Git for Windows', 1),
	(26, 1, 4, '배고파', 0),
	(27, 1, 5, 'dasdsadas', 0),
	(28, 1, 3, 'zzzzzzzzzzzzzzzzzz', 0),
	(30, 1, 2, 'edsad', 0),
	(31, 1, 4, 'wqeqweqw', 0),
	(32, 1, 3, '', 0),
	(33, 1, 4, '가나다라', 0);
/*!40000 ALTER TABLE `tech` ENABLE KEYS */;

-- 테이블 yeonghoon.kim.tech_category 구조 내보내기
DROP TABLE IF EXISTS `tech_category`;
CREATE TABLE IF NOT EXISTS `tech_category` (
  `tech_category_no` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tech_category_name` varchar(20) NOT NULL,
  `tech_category_delete_yn` tinyint(3) unsigned NOT NULL DEFAULT 1,
  PRIMARY KEY (`tech_category_no`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COMMENT='기술분류에 대한 정보를 담는 테이블';

-- 테이블 데이터 yeonghoon.kim.tech_category:~8 rows (대략적) 내보내기
/*!40000 ALTER TABLE `tech_category` DISABLE KEYS */;
REPLACE INTO `tech_category` (`tech_category_no`, `tech_category_name`, `tech_category_delete_yn`) VALUES
	(1, '언어', 1),
	(2, '프레임워크', 1),
	(3, '라이브러리', 1),
	(4, '데이터베이스', 1),
	(5, '서버', 1),
	(6, '형상관리', 1),
	(7, 'API', 1),
	(8, '그외 사용도구', 1);
/*!40000 ALTER TABLE `tech_category` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
