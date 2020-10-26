package kim.yeonghoon.www.menu.controller;

import java.awt.image.BufferedImage;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpSession;

import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;

import kim.yeonghoon.www.menu.service.IGalleryService;

@Controller
public class GalleryController {
	/**
	 *  의존성 주입
	 */
	@Autowired
	IGalleryService iGalleryService;
	
	
	/**
	 * [gallery] gallery - gallery Request
	 */
	@RequestMapping(value = "/gallery")
	public ModelAndView gallery(@RequestParam HashMap<String,String> params, ModelAndView mav, HttpSession session) {
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		// 만약 관리자가 로그인 했다면 등록 버튼 관련 값을 view로 보냄
		if(currentUser.equals("1")) {
			mav.addObject("addBtn", "<div id='addBtn' class='btn btn-secondary d-inline-block float-right'>등록</div>");
		}
		mav.setViewName("gallery");
		return mav;
	}
	
	
	/**
	 * [gallery] getGalleryListAjax - gallery 접속 시 게시물 리스트를 불러오는 ajax
	 */
	@RequestMapping(value = "/getGalleryListAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String getGalleryListAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션 번호 취득 후 현재 유저의 값을 member_no 키에 넣음
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		// 페이지값을 못받아올 경우 1페이지로 지정(최초 접속)
		if(params.get("page") == null) {
			params.put("page", "1");
		}
		// 글 내용 및 페이징 조회
		try {
			// [paging - 1] 현재 페이지 취득
			int currentPage = Integer.parseInt(params.get("page"));
			
			// [paging - 2] 총 게시물 수를 구함
			int getGalleryListCnt = iGalleryService.getGalleryListCnt(params);
			
			// [paging - 3] 페이지당 게시글 수 지정(6개) : (취득한 현재 페이지 - 1) * 6
			int viewCount = 6;
			params.put("limitCnt", Integer.toString(viewCount));
			params.put("limitStart", Integer.toString(((currentPage - 1) * 6)));
			
			// [paging - 4] 페이징 개수 지정(5개)
			int pageCount = 5;

			/*
			 	[paging - 5] 총 페이지 계산
			 	1) 총게시물 수 % 페이지당 게시글의 결과가 0일 아닐 경우 : 총 게시물 수 / 페이지당 게시글 수 
			 	2) 총게시물 수 % 페이지당 게시글의 결과가 0일 경우 : 총게시물 수 / 페이지당 게시글 수  + 1
			 */ 
			int maxPageCount = 0;
			if(getGalleryListCnt % viewCount > 0) {
				maxPageCount = (getGalleryListCnt / viewCount) + 1;
			} else {
				maxPageCount = getGalleryListCnt / viewCount;
			}
			/*
			 	[paging - 6] 현재 페이지 기준 시작 페이지 번호 계산
			 	1) 현재 페이지 % 페이징 개수의 결과가 0이 아닐 경우 : (현재 페이지 / 페이징 개수) + 1 
			 	2) 현재 페이지 % 페이징 개수의 결과가 0일 경우 : 현재 페이지 - 페이징 개수 + 1
			 */
			int startPageCount = 0;
			if(currentPage % pageCount != 0) {
				startPageCount = (currentPage / pageCount) * pageCount + 1;
			} else {
				startPageCount = currentPage - pageCount + 1;
			}
			/*
			 	[paging - 7] 현재 페이지 기준 종료 페이지 번호 계산
			 	시작 페이지 + 페이징 개수 - 1(단, 최대 페이지보다 클 경우  종료페이지는 최대페이지로...)
			 */
			int endPageCount = startPageCount + pageCount - 1;
			
			if(endPageCount >= maxPageCount) {
				endPageCount = maxPageCount;
			}
			// 위에서 계산한 값을 담을 맵을 생성한 후 값을 넣음
			HashMap<String,Integer> paging = new HashMap<String,Integer>();
			paging.put("startPageCount", startPageCount);
			paging.put("endPageCount", endPageCount);
			paging.put("maxPageCount", maxPageCount);
			paging.put("currentPage", currentPage);
			// 위에 생성한 hashmap을 modalMap에 담음
			modelMap.put("pagingMap", paging);
			// 게시글 리스트 조회
			List<HashMap<String,String>> galleryList = iGalleryService.getGalleryList(params);
			modelMap.put("galleryList", galleryList);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [board] getGalleryListCntAjax - gallery 접속 시 총 게시물 수를 불러오는 ajax
	 */
	@RequestMapping(value = "/getGalleryListCntAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String getGalleryListCntAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션 번호 취득 후 현재 유저의 값을 member_no 키에 넣음
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		
		try {
			// 총 게시물 수 조회
			int getGalleryListCnt = iGalleryService.getGalleryListCnt(params);
			// 성공
			if(getGalleryListCnt > 0) {
				modelMap.put("getGalleryListCnt", getGalleryListCnt);
				modelMap.put("result", "success");
			// 실패
			} else {
				modelMap.put("result", "fail");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [galleryDetail] galleryDetail - galleryDetail Request
	 */
	@RequestMapping(value = "/galleryDetail")
	public ModelAndView galleryDetail(@RequestParam HashMap<String,String> params, ModelAndView mav, HttpSession session) {
		// 세션번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		// 세션번호와 글 작성자 번호가 일치할 경우 수정, 삭제 버튼 관련 값을 view로 넘김
		if(currentUser.equals(params.get("authNo"))) {
			mav.addObject("modBtn", "<div class='btn btn-secondary  float-right mr-2' style='display: inline-block;' id='modifyBtn'>수정</div>");
			mav.addObject("delBtn", "<div class='btn btn-secondary  float-right' style='display: inline-block;' id='deleteBtn'>삭제</div>");
		}
		mav.setViewName("galleryDetail");
		return mav;
	}
	
	
	/**
	 *  [galleryDetail] galleryDetail - PathVariable이용해서 접속 할 경우(검색엔진 표시용)
	 */
	@RequestMapping(value = "/galleryDetail/{boardNo}")
	public ModelAndView galleryDetail(@PathVariable String boardNo, @RequestParam HashMap<String,String> params, ModelAndView mav, HttpSession session) {
		params.put("boardNo", boardNo);
		mav.addAllObjects(params);
		mav.setViewName("redirect:/galleryDetail");
		return mav;
	}
	
	
	/**
	 * [galleryDetail] getGalleryContentAjax - 상세보기 글 내용 조회 ajax
	 */
	@RequestMapping(value = "/getGalleryContentAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String getGalleryContentAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		try {
			// 게시글 조회 후 map에 담음
			HashMap<String,String> getGalleryContent = iGalleryService.getGalleryContent(params);
			// hit 수 1 증가
			iGalleryService.galleryContentHit(params);
			// 게시글 map을 modelMap에 담음
			modelMap.put("getGalleryContent", getGalleryContent);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [galleryDetail] getGalleryCommentAjax - 상세보기 댓글 조회 ajax(commentNo가 넘어오지 않을 경우 전체 조회, commentNo가 넘어올 경우 단건조회<댓글 수정>)
	 */
	@RequestMapping(value = "/getGalleryCommentAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String getGalleryCommentAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		try {
			// 코멘트 조회 modelMap에 담음
			List<HashMap<String,String>> getComment = iGalleryService.getComment(params);
			modelMap.put("getComment", getComment);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [galleryDetail] galleryCommentAddAjax - 댓글 추가 ajax
	 */
	@RequestMapping(value = "galleryCommentAddAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String galleryComentddAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		try {
			// 로그인한 사용자와 userNo로 넘어온 값 비교(같으면 댓글 추가, 틀리면 해당 유저 로그아웃 처리)
			if(currentUser.equals(params.get("userNo"))) {
				// 댓글 추가
				int commentAdd = iGalleryService.commentAdd(params);
				if(commentAdd > 0) {
					modelMap.put("result", "success");
				} else {
					modelMap.put("result", "fail");
				}
			} else {
				session.invalidate();
				params.put("userNo", null);
				modelMap.put("result", "abnormal");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [galleryDetail] galleryCommentModAjax - 댓글 수정 ajax
	 */
	@RequestMapping(value = "/galleryCommentModAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String galleryCommentModAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		try {
			// 로그인한 사용자와 uNo(댓글 작성자 번호 비교)로 넘어온 값 비교(같으면 댓글 추가, 틀리면 해당 유저 로그아웃 처리)
			if(currentUser.equals(params.get("uNo"))) {
				//댓글 수정
				int commentMod = iGalleryService.commentMod(params);
				if(commentMod > 0) {
					modelMap.put("result", "success");
				} else {
					modelMap.put("result", "fail");
				}
			} else {
				session.invalidate();
				modelMap.put("result", "abnormal");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [galleryDetail] galleryCommentDelAjax - 댓글 삭제 ajax
	 */
	@RequestMapping(value = "/galleryCommentDelAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String galleryCommentDelAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		try {
			// 로그인한 사용자와 uNo(댓글 작성자 번호 비교)로 넘어온 값 비교(같으면 댓글 삭제, 틀리면 해당 유저 로그아웃 처리)
			if(currentUser.equals(params.get("uNo"))) {
				// 댓글 삭제
				int commentDel = iGalleryService.commentDel(params);
				if(commentDel > 0) {
					modelMap.put("result", "success");
				} else {
					modelMap.put("result", "fail");
				}
			} else {
				session.invalidate();
				modelMap.put("result", "abnormal");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [galleryDetail] galleryContentDelAjax - 게시글 삭제 버튼 클릭 시 동작
	 */
	@RequestMapping(value = "/galleryContentDelAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String galleryContentDelAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		try {
			// 세션번호와 작성자 번호 비교 후 일치하지 않으면 로그아웃, 일치한다면 삭제
			if(currentUser.equals(params.get("uNo"))) {
				// 게시글 삭제
				int contentDel = iGalleryService.contentDel(params);
				if(contentDel > 0) {
					modelMap.put("result", "success");
				} else {
					modelMap.put("result", "fail");
				}
			} else {
				session.invalidate();
				modelMap.put("result", "abnormal");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [galleryAdd] galleryAdd - galleryAdd Request
	 */
	@RequestMapping(value = "/galleryAdd")
	public ModelAndView galleryAdd(ModelAndView mav, HttpSession session) {
		// 세션 번호 및 이름 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		String currentUserName = String.valueOf(session.getAttribute("sMember_name"));
		// 만약 관리자가 아닌 사람이 해당 주소로 들어왔을 경우 /gallery로 리다이렉트
		if(!currentUser.equals("1")) {
			mav.setViewName("redirect:/gallery");
		} else {
			// 맴버번호와 이름을 view로 넘김
			mav.addObject("member_no", currentUser);
			mav.addObject("member_name", currentUserName);
			mav.setViewName("galleryAdd");
		}
		return mav;
	}
	
	
	/**
	 * [galleryAdd] galleryAddAjax - 게시글 등록 버튼 클릭 시 동작
	 */
	@RequestMapping(value = "/galleryAddAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String galleryAddAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 게시판 번호(board - 1, gallery - 2) 넣어줌
		params.put("boardNo", "2");
		try {
			// autoincrement값 조회
			int getGalleryContentNo = iGalleryService.getGalleryContentNo();
			// 조회한 값을 autoIncrement 키에 넣음
			params.put("autoIncrement", Integer.toString(getGalleryContentNo));
			// 게시글 등록
			int galleryAddCnt = iGalleryService.galleryAdd(params);
			modelMap.put("galleryAddCnt", galleryAddCnt);
			// 게시글 등록 성공하면 게시글 번호를 view로 전달
			modelMap.put("boardNo", getGalleryContentNo);
			modelMap.put("result", "success");
			// 썸네일 등록
			if(params.get("thumbnail") != null && params.get("thumbnail") != "") {
				// 썸네일 업로드 경로 및 파일명 지정
				String uploadPath = "/usr/local/tomcat/webapps/yeonghoonkim/yeonghoonkim/resources/upload/";
				String uploadFileName = params.get("thumbnail");
				String fileInput = uploadPath + uploadFileName;
				String fileExt = uploadFileName.substring(uploadFileName.length()-3, uploadFileName.length());
				// 원본 이미지 로드
				BufferedImage sourceImage = ImageIO.read(new File(fileInput));
				// 이미지 리사이즈
				BufferedImage thumnailImage = Scalr.resize(sourceImage, 200, 200);
				// 썸네일 파일명 지정
				String thumnailImgName = "s_" + uploadFileName;
				// 파일 생성
				File newFile = new File(uploadPath + thumnailImgName);
				ImageIO.write(thumnailImage, fileExt, newFile);
				// 디비에 썸네일 주소 넘김
				params.put("thumbnailPath", "resources/upload/" + thumnailImgName);
				iGalleryService.addThumbnail(params);
			}
			
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	
	/**
	 * [galleryMod] galleryMod - galleryMod Request
	 */
	@RequestMapping(value = "/galleryMod")
	public ModelAndView galleryMod(@RequestParam HashMap<String,String> params, ModelAndView mav, HttpSession session) {
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		// boardNo에 view로부터 전달받은 bNo 값을 넣음 
		params.put("boardNo", params.get("bNo"));
		// 만약 관리자가 아닌 사람이 해당 주소로 들어왔을 경우 /board로 리다이렉트
		if(!currentUser.equals("1")) {
			mav.setViewName("redirect:/gallery");
		} else {
			try {
				// 수정할 게시글의 내용 조회 후 해당 내용을 view로 넘김
				HashMap<String, String> contentMap = iGalleryService.getGalleryContent(params);
				// 썸네일명을 placeholder 처리하기 위해 값 변형
				contentMap.put("thumbAddress", contentMap.get("thumbnail_path").replace("resources/upload/s_", ""));
				mav.addAllObjects(contentMap);
				mav.setViewName("galleryMod");
			} catch (Throwable e) {
				// 조회 불가시 gallery로 리다이렉트
				e.printStackTrace();
				mav.setViewName("redirect:/gallery");
			}
		}
		return mav;
	}

	
	/**
	 * [galleryMod] galleryModAjax - 게시글 수정 버튼 클릭 시 동작
	 */
	@RequestMapping(value = "galleryModAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String galleryModAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		try {
			// 썸네일 변경X
			if(params.get("thumbnail") == null || params.get("thumbnail") == "") {
				params.put("fileStatus", "thumㅠnailNotModify");
			// 썸네일 등록/수정
			} else {
				// 썸네일 업로드 경로 및 파일명 지정
				String uploadPath = "/usr/local/tomcat/webapps/yeonghoonkim/yeonghoonkim/resources/upload/";
				String uploadFileName = params.get("thumbnail");
				String fileInput = uploadPath + uploadFileName;
				String fileExt = fileInput.substring(fileInput.length()-3, fileInput.length());
				// 원본 이미지 로드
				BufferedImage sourceImage = ImageIO.read(new File(fileInput));
				// 이미지 리사이즈
				BufferedImage thumnailImage = Scalr.resize(sourceImage, 200, 200);
				// 썸네일 파일명 지정
				String thumbnailImgName = "s_" + uploadFileName;
				// 파일 생성
				File newFile = new File(uploadPath + thumbnailImgName);
				ImageIO.write(thumnailImage, fileExt, newFile);
				// 썸네일 수정
				if(params.get("prevThumbnail") != null && params.get("prevThumbnail") != "") {
					params.put("fileStatus", "modFile");
				// 썸네일 신규등록
				} else {
					params.put("fileStatus", "newFile");
				}
				params.put("thumbnailPath", "resources/upload/" + thumbnailImgName);
			}
			// 게시글 수정 
			int galleryModCnt = iGalleryService.galleryMod(params);
			if(galleryModCnt > 0) {
				modelMap.put("result", "success");
			} else {
				modelMap.put("result", "error");
			}
			
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
}
