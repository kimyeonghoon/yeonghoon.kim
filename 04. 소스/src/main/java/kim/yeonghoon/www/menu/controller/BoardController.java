package kim.yeonghoon.www.menu.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;

import kim.yeonghoon.www.menu.service.IBoardService;

@Controller
public class BoardController {
	/**
	 *  의존성 주입
	 */
	@Autowired
	IBoardService iBoardService;
	
	
	/**
	 * [board] board - board Request
	 */
	@RequestMapping(value = "/board")
	public ModelAndView board(@RequestParam HashMap<String,String> params, ModelAndView mav, HttpSession session) {
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		// 만약 관리자가 로그인 했다면 등록 버튼 관련 값을 view로 보냄
		if(currentUser.equals("1")) {
			mav.addObject("addBtn", "<div id='addBtn' class='btn btn-secondary d-inline-block float-right'>등록</div>");
		}
		mav.setViewName("board");
		return mav;
	}
	
	
	/**
	 * [board] getBoardListAjax - board 접속 시 게시물 리스트를 불러오는 ajax
	 */
	@RequestMapping(value = "/getBoardListAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String getBoardListAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
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
			int getBoardListCnt = iBoardService.getBoardListCnt(params);
			// [paging - 3] 페이지당 게시글 수 지정(10개) : (취득한 현재 페이지 - 1) * 10
			int viewCount = 10;
			params.put("limitCnt", Integer.toString(viewCount));
			params.put("limitStart", Integer.toString(((currentPage - 1) * 10)));
			// [paging - 4] 페이징 개수 지정(5개)
			int pageCount = 5;
			/*
			 	[paging - 5] 총 페이지 계산
			 	1) 총게시물 수 % 페이지당 게시글의 결과가 0일 아닐 경우 : 총 게시물 수 / 페이지당 게시글 수 
			 	2) 총게시물 수 % 페이지당 게시글의 결과가 0일 경우 : 총게시물 수 / 페이지당 게시글 수  + 1
			 */ 
			int maxPageCount = 0;
			if(getBoardListCnt % viewCount > 0) {
				maxPageCount = (getBoardListCnt / viewCount) + 1;
			} else {
				maxPageCount = getBoardListCnt / viewCount;
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
			List<HashMap<String,String>> boardList = iBoardService.getBoardList(params);
			modelMap.put("boardList", boardList);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [board] getBoardListCntAjax - board 접속 시 총 게시물 수를 불러오는 ajax
	 */
	@RequestMapping(value = "/getBoardListCntAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String getBoardListCntAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션 번호 취득 후 현재 유저의 값을 member_no 키에 넣음
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		
		try {
			// 총 게시물 수 조회
			int getBoardListCnt = iBoardService.getBoardListCnt(params);
			// 조회 성공
			if(getBoardListCnt > 0) {
				modelMap.put("getBoardListCnt", getBoardListCnt);
				modelMap.put("result", "success");
			// 조회 실패
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
	 * [boardDetail] boardDetail - boardDetail Request
	 */
	
	@RequestMapping(value = "/boardDetail")
	public ModelAndView boardDetail(@RequestParam HashMap<String,String> params, ModelAndView mav, HttpSession session) {
		// 세션번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		// 세션번호와 글 작성자 번호가 일치할 경우 수정, 삭제 버튼 관련 값을 view로 넘김
		if(currentUser.equals(params.get("authNo"))) {
			mav.addObject("modBtn", "<div class='btn btn-secondary  float-right mr-2' style='display: inline-block;' id='modifyBtn'>수정</div>");
			mav.addObject("delBtn", "<div class='btn btn-secondary  float-right' style='display: inline-block;' id='deleteBtn'>삭제</div>");
		}
		mav.setViewName("boardDetail");
		return mav;
	}
	
	
	/**
	 *  [boardDetail] boardDetail - PathVariable이용해서 접속 할 경우(검색엔진 표시용)
	 */
	@RequestMapping(value = "/boardDetail/{boardNo}")
	public ModelAndView boardDetail(@PathVariable String boardNo, @RequestParam HashMap<String,String> params, ModelAndView mav, HttpSession session) {
		params.put("boardNo", boardNo);
		mav.addAllObjects(params);
		mav.setViewName("redirect:/boardDetail");
		return mav;
	}
	
	
	/**
	 * [boardDetail] getBoardContentAjax - 상세보기 글 내용 조회 ajax
	 */
	@RequestMapping(value = "/getBoardContentAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String getBoardContentAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		try {
			// 게시글 조회 후 map에 담음
			HashMap<String,String> getBoardContent = iBoardService.getBoardContent(params);
			// hit 수 1 증가
			iBoardService.boardContentHit(params);
			// 게시글 map을 modelMap에 담음
			modelMap.put("getBoardContent", getBoardContent);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [boardDetail] getCommentAjax - 상세보기 댓글 조회 ajax(commentNo가 넘어오지 않을 경우 전체 조회, commentNo가 넘어올 경우 단건조회<댓글 수정>)
	 */
	@RequestMapping(value = "/getCommentAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String getCommentAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		try {
			// 코멘트 조회 modelMap에 담음
			List<HashMap<String,String>> getComment = iBoardService.getComment(params);
			modelMap.put("getComment", getComment);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [boardDetail] commentAddAjax - 댓글 추가 ajax
	 */
	@RequestMapping(value = "/commentAddAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String commentAddAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		try {
			// 로그인한 사용자와 userNo로 넘어온 값 비교(같으면 댓글 추가, 틀리면 해당 유저 로그아웃 처리)
			if(currentUser.equals(params.get("userNo"))) {
				// 댓글 추가
				int commentAdd = iBoardService.commentAdd(params);
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
	 * [boardDetail] commentModAjax - 댓글 수정 ajax
	 */
	@RequestMapping(value = "/commentModAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String commentModAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		try {
			// 로그인한 사용자와 uNo(댓글 작성자 번호 비교)로 넘어온 값 비교(같으면 댓글 추가, 틀리면 해당 유저 로그아웃 처리)
			if(currentUser.equals(params.get("uNo"))) {
				//댓글 수정
				int commentMod = iBoardService.commentMod(params);
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
	 * [boardDetail] commentDelAjax - 댓글 삭제 ajax
	 */
	@RequestMapping(value = "/commentDelAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String commentDelAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		try {
			// 로그인한 사용자와 uNo(댓글 작성자 번호 비교)로 넘어온 값 비교(같으면 댓글 삭제, 틀리면 해당 유저 로그아웃 처리)
			if(currentUser.equals(params.get("uNo"))) {
				// 댓글 삭제
				int commentDel = iBoardService.commentDel(params);
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
	 * [boardDetail] contentDelAjax - 게시글 삭제 버튼 클릭 시 동작
	 */
	@RequestMapping(value = "/contentDelAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String contentDelAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		try {
			// 세션번호와 작성자 번호 비교 후 일치하지 않으면 로그아웃, 일치한다면 삭제
			if(currentUser.equals(params.get("uNo"))) {
				// 게시글 삭제
				int contentDel = iBoardService.contentDel(params);
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
	 * [boardAdd] boardAdd - boardAdd Request
	 */
	@RequestMapping(value = "/boardAdd")
	public ModelAndView boardAdd(ModelAndView mav, HttpSession session) {
		// 세션 번호 및 이름 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		String currentUserName = String.valueOf(session.getAttribute("sMember_name"));
		// 만약 관리자가 아닌 사람이 해당 주소로 들어왔을 경우 /board로 리다이렉트
		if(!currentUser.equals("1")) {
			mav.setViewName("redirect:/board");
		} else {
			// 맴버번호와 이름을 view로 넘김
			mav.addObject("member_no", currentUser);
			mav.addObject("member_name", currentUserName);
			mav.setViewName("boardAdd");
		}
		return mav;
	}
	
	
	/**
	 * [boardAdd] boardAddAjax - 게시글 등록 버튼 클릭 시 동작
	 */
	@RequestMapping(value = "/boardAddAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String boardAddAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 게시판 번호(board - 1, gallery - 2) 넣어줌
		params.put("boardNo", "1");
		// 첨부파일명, 첨부파일 원래 이름 빈값으로 들어오는 경우 null 처리(처리하지 않을 경우 DB 등록 시 공백으로 들어감)
		if(params.get("attach1") == "") {
			params.put("attach1", null);
		}
		if(params.get("attach2") == "") {
			params.put("attach2", null);
		}
		if(params.get("originalName1") == "") {
			params.put("originalName1", null);
		}
		if(params.get("originalName2") == "") {
			params.put("originalName2", null);
		}
		try {
			// autoincrement값 조회
			int getBoardContentNo = iBoardService.getBoardContentNo();
			// 조회한 값을 autoIncrement 키에 넣음
			params.put("autoIncrement", Integer.toString(getBoardContentNo));
			// 게시글 등록
			int boardAddCnt = iBoardService.boardAdd(params);
			// 게시글 등록 성공하면 게시글 번호를 view로 전달
			if(boardAddCnt > 0) {
				modelMap.put("boardNo", getBoardContentNo);
				modelMap.put("result", "success");
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
	 * [boardMod] boardMod - boardMod Request
	 */
	@RequestMapping(value = "/boardMod")
	public ModelAndView boardMod(@RequestParam HashMap<String,String> params, ModelAndView mav, HttpSession session) {
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		// boardNo에 view로부터 전달받은 bNo 값을 넣음 
		params.put("boardNo", params.get("bNo"));
		// 만약 관리자가 아닌 사람이 해당 주소로 들어왔을 경우 /board로 리다이렉트
		if(!currentUser.equals("1")) {
			mav.setViewName("redirect:/board");
		} else {
			try {
				// 수정할 게시글의 내용 조회 후 해당 내용을 view로 넘김
				HashMap<String, String> contentMap = iBoardService.getBoardContent(params);
				mav.addAllObjects(contentMap);
				mav.setViewName("boardMod");
			} catch (Throwable e) {
				// 조회 불가시 board로 리다이렉트
				e.printStackTrace();
				mav.setViewName("redirect:/board");
			}
		}
		return mav;
	}
	
	
	/**
	 * [boardMod] boardModAjax - 게시글 수정 버튼 클릭 시 동작
	 */
	@RequestMapping(value = "/boardModAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String boardModAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 첨부파일명, 첨부파일 원래 이름 빈값으로 들어오는 경우 null 처리(처리하지 않을 경우 DB 등록 시 공백으로 들어감)
		if(params.get("attach1") == "") {
			params.put("attach1", null);
		}
		if(params.get("attach2") == "") {
			params.put("attach2", null);
		}
		if(params.get("originalName1") == "") {
			params.put("originalName1", null);
		}
		if(params.get("originalName2") == "") {
			params.put("originalName2", null);
		}
		try {
			// 기존 게시글에 첨부파일이 있는지 체크 후 contentFileCheck에 값을 넣어줌
			int contentFileCheck = iBoardService.contentFileCheck(params);
			params.put("contentFileCheck", Integer.toString(contentFileCheck));
			// 게시글 수정 
			int boardModCnt = iBoardService.boardMod(params);
			if(boardModCnt > 0) {
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
