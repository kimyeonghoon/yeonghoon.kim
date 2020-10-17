-- --------------------------------------------------------
-- 호스트:                          49.247.128.165
-- 서버 버전:                        10.4.13-MariaDB-log - MariaDB Server
-- 서버 OS:                        Linux
-- HeidiSQL 버전:                  11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 테이블 yeonghoon.kim.academy 구조 내보내기
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
  `academy_status_yn` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT '수료여부',
  PRIMARY KEY (`academy_no`),
  KEY `academy_member.FK` (`member_no`),
  CONSTRAINT `academy_member.FK` FOREIGN KEY (`member_no`) REFERENCES `member` (`member_no`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COMMENT='교육에 대한 정보를 담는 테이블';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 yeonghoon.kim.base_transceiver_station 구조 내보내기
CREATE TABLE IF NOT EXISTS `base_transceiver_station` (
  `bts_no` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '기지국정보번호',
  `bts_name` varchar(10) NOT NULL COMMENT '기지국명',
  `bts_station_no` tinyint(2) unsigned NOT NULL COMMENT '기지국번호',
  PRIMARY KEY (`bts_no`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COMMENT='기지국 정보를 담은 테이블';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 yeonghoon.kim.board 구조 내보내기
CREATE TABLE IF NOT EXISTS `board` (
  `board_no` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '게시판번호',
  `board_type_no` int(11) unsigned NOT NULL COMMENT '게시판구분번호',
  `board_name` varchar(20) NOT NULL COMMENT '게시판명',
  `board_category` tinyint(1) unsigned NOT NULL COMMENT '게시판유형',
  `board_delete_yn` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT '삭제여부',
  PRIMARY KEY (`board_no`),
  KEY `board_board_type.FK` (`board_type_no`),
  CONSTRAINT `board_board_type.FK` FOREIGN KEY (`board_type_no`) REFERENCES `board_type` (`board_type_no`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COMMENT='게시판 정보를 담는 테이블';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 yeonghoon.kim.board_content 구조 내보내기
CREATE TABLE IF NOT EXISTS `board_content` (
  `board_content_no` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '게시글번호',
  `board_no` int(11) unsigned NOT NULL COMMENT '게시판번호',
  `member_no` int(11) unsigned NOT NULL COMMENT '회원번호',
  `board_content_name` varchar(200) NOT NULL COMMENT '제목',
  `board_content_detail` text NOT NULL DEFAULT '0' COMMENT '내용',
  `board_content_reg_time` datetime NOT NULL COMMENT '등록시간',
  `board_content_mod_time` datetime DEFAULT NULL COMMENT '수정시간',
  `board_content_hit` int(11) unsigned NOT NULL DEFAULT 0 COMMENT '조회수',
  `board_content_del_time` datetime DEFAULT NULL COMMENT '삭제시간',
  PRIMARY KEY (`board_content_no`),
  KEY `board_no.FK` (`board_no`),
  KEY `member_no.FK` (`member_no`),
  CONSTRAINT `board_no.FK` FOREIGN KEY (`board_no`) REFERENCES `board` (`board_no`),
  CONSTRAINT `member_no.FK` FOREIGN KEY (`member_no`) REFERENCES `member` (`member_no`)
) ENGINE=InnoDB AUTO_INCREMENT=257 DEFAULT CHARSET=utf8mb4 COMMENT='게시글 정보를 담는 테이블';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 yeonghoon.kim.board_content_file 구조 내보내기
CREATE TABLE IF NOT EXISTS `board_content_file` (
  `board_content_file_no` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '첨부파일번호',
  `board_content_no` int(11) unsigned NOT NULL COMMENT '게시글번호',
  `board_content_file_path1` tinytext DEFAULT NULL COMMENT '첨부파일경로1',
  `board_content_file_path2` tinytext DEFAULT NULL COMMENT '첨부파일경로2',
  `board_content_file_name1` tinytext DEFAULT NULL COMMENT '첨부파일1 이름',
  `board_content_file_name2` tinytext DEFAULT NULL COMMENT '첨부파일2 이름',
  PRIMARY KEY (`board_content_file_no`),
  KEY `board_content.FK` (`board_content_no`),
  CONSTRAINT `board_content.FK` FOREIGN KEY (`board_content_no`) REFERENCES `board_content` (`board_content_no`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COMMENT='게시글 첨부파일 정보를 담는 테이블';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 yeonghoon.kim.board_type 구조 내보내기
CREATE TABLE IF NOT EXISTS `board_type` (
  `board_type_no` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '게시판구분번호',
  `board_type_delete_yn` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT '삭제여부',
  PRIMARY KEY (`board_type_no`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COMMENT='게시판 구분에 대한 정보를 담는 테이블';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 yeonghoon.kim.brief_history 구조 내보내기
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

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 yeonghoon.kim.career 구조 내보내기
CREATE TABLE IF NOT EXISTS `career` (
  `career_no` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '경력번호',
  `company_no` int(11) unsigned NOT NULL COMMENT '회사번호',
  `career_responsibility` varchar(50) NOT NULL COMMENT '주요업무',
  `career_description` text NOT NULL COMMENT '경력기술',
  `career_delete_yn` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT '삭제여부',
  `career_department` varchar(50) NOT NULL COMMENT '근무부서',
  PRIMARY KEY (`career_no`),
  KEY `career_company.FK` (`company_no`),
  CONSTRAINT `career_company.FK` FOREIGN KEY (`company_no`) REFERENCES `company` (`company_no`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COMMENT='경력에 대한 정보를 담는 테이블';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 yeonghoon.kim.certificate 구조 내보내기
CREATE TABLE IF NOT EXISTS `certificate` (
  `certificate_no` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '자격증번호',
  `member_no` int(11) unsigned NOT NULL COMMENT '회원번호',
  `certificate_name` varchar(20) NOT NULL COMMENT '자격증명',
  `certificate_organization` varchar(20) NOT NULL COMMENT '발급기관',
  `certificate_pass_yn` tinyint(1) unsigned NOT NULL COMMENT '합격여부',
  `certificate_issue_date` date NOT NULL COMMENT '발급일자',
  `certificate_upload_path` tinytext DEFAULT NULL COMMENT '증명서류경로',
  `certificate_delete_yn` tinyint(3) unsigned NOT NULL DEFAULT 1 COMMENT '삭제여부',
  PRIMARY KEY (`certificate_no`),
  KEY `certificate_member.FK` (`member_no`),
  CONSTRAINT `certificate_member.FK` FOREIGN KEY (`member_no`) REFERENCES `member` (`member_no`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COMMENT='자격증에 대한 정보를 담는 테이블';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 yeonghoon.kim.comment 구조 내보내기
CREATE TABLE IF NOT EXISTS `comment` (
  `comment_no` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '댓글번호',
  `board_content_no` int(11) unsigned NOT NULL COMMENT '게시글번호',
  `member_no` int(11) unsigned NOT NULL COMMENT '회원번호',
  `comment_content` text NOT NULL COMMENT '내용',
  `comment_reg_time` datetime NOT NULL DEFAULT current_timestamp() COMMENT '등록시간',
  `comment_mod_time` datetime DEFAULT NULL COMMENT '수정시간',
  `comment_del_time` datetime DEFAULT NULL COMMENT '삭제시간',
  PRIMARY KEY (`comment_no`),
  KEY `comment_board_content_no.FK` (`board_content_no`),
  CONSTRAINT `comment_board_content_no.FK` FOREIGN KEY (`board_content_no`) REFERENCES `board_content` (`board_content_no`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COMMENT='댓글 정보를 담는 테이블';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 yeonghoon.kim.company 구조 내보내기
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COMMENT='회사에 대한 정보를 담는 테이블';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 yeonghoon.kim.education 구조 내보내기
CREATE TABLE IF NOT EXISTS `education` (
  `education_no` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '학력번호',
  `member_no` int(11) unsigned NOT NULL COMMENT '회원번호',
  `education_name` varchar(20) NOT NULL COMMENT '학교명',
  `education_department` varchar(20) DEFAULT NULL COMMENT '학과명',
  `education_status` int(1) unsigned NOT NULL COMMENT '상태',
  `education_startdate` date NOT NULL COMMENT '입학년월',
  `education_enddate` date DEFAULT NULL COMMENT '졸업년월',
  `education_etc` varchar(20) DEFAULT NULL COMMENT '기타사항',
  `education_upload_path` tinytext DEFAULT NULL COMMENT '증명서류경로',
  `education_delete_yn` tinyint(3) unsigned NOT NULL DEFAULT 1 COMMENT '삭제여부',
  PRIMARY KEY (`education_no`),
  KEY `education_member.FK` (`member_no`),
  CONSTRAINT `education_member.FK` FOREIGN KEY (`member_no`) REFERENCES `member` (`member_no`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COMMENT='학력에 대한 정보를 담는 테이블';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 yeonghoon.kim.gallery_thumbnail 구조 내보내기
CREATE TABLE IF NOT EXISTS `gallery_thumbnail` (
  `gallery_thumbnail_no` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '갤러리 섬네일 번호',
  `board_content_no` int(10) unsigned NOT NULL COMMENT '게시판 컨텐츠 번호',
  `gallery_thumbnail_path` tinytext DEFAULT NULL COMMENT '갤러리 섬네일 경로',
  PRIMARY KEY (`gallery_thumbnail_no`) USING BTREE,
  KEY `thumnail_board_content.FK` (`board_content_no`),
  CONSTRAINT `thumnail_board_content.FK` FOREIGN KEY (`board_content_no`) REFERENCES `board_content` (`board_content_no`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COMMENT='갤러리 썸네일 생성';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 yeonghoon.kim.member 구조 내보내기
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COMMENT='회원에 대한 정보를 담는 테이블';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 yeonghoon.kim.tech 구조 내보내기
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
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COMMENT='기술에 대한 정보를 담는 테이블';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 yeonghoon.kim.tech_category 구조 내보내기
CREATE TABLE IF NOT EXISTS `tech_category` (
  `tech_category_no` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tech_category_name` varchar(20) NOT NULL,
  `tech_category_delete_yn` tinyint(3) unsigned NOT NULL DEFAULT 1,
  PRIMARY KEY (`tech_category_no`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COMMENT='기술분류에 대한 정보를 담는 테이블';

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
