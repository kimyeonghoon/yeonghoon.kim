package kim.yeonghoon.www.menu.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;

import kim.yeonghoon.www.menu.service.IBoardService;

@Controller
public class BoardController {
	
	@Autowired
	IBoardService iBoardService;
	
	@RequestMapping(value = "/board")
	public ModelAndView board(@RequestParam HashMap<String,String> params, ModelAndView mav, HttpSession session) {
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		if(currentUser.equals("1")) {
			mav.addObject("addBtn", "<div id='addBtn' class='btn btn-secondary d-inline-block float-right'>등록</div>");
		}
		return mav;
	}
	
	@RequestMapping(value = "/boardAdd")
	public ModelAndView boardAdd(ModelAndView mav, HttpSession session) {
	
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		String currentUserName = String.valueOf(session.getAttribute("sMember_name"));
		
		if(!currentUser.equals("1")) {
			mav.setViewName("redirect:/board");
		} else {
			mav.addObject("member_no", currentUser);
			mav.addObject("member_name", currentUserName);
			mav.setViewName("boardAdd");
		}
		return mav;
	}
	
	@RequestMapping(value = "/boardMod")
	public ModelAndView boardMod(@RequestParam HashMap<String,String> params, ModelAndView mav, HttpSession session) {
		
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("boardNo", params.get("bNo"));
		
		if(!currentUser.equals("1")) {
			mav.setViewName("redirect:/board");
		} else {
			
			try {
				HashMap<String, String> contentMap = iBoardService.getBoardContent(params);
				mav.addAllObjects(contentMap);
				mav.setViewName("boardMod");
				
			} catch (Throwable e) {
				e.printStackTrace();
				mav.setViewName("redirect:/board");
			}

		}
		return mav;
	}
	
	@RequestMapping(value = "boardAddAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String boardAddAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		params.put("boardNo", "1");
		
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
			int getBoardContentNo = iBoardService.getBoardContentNo();
			params.put("autoIncrement", Integer.toString(getBoardContentNo));
			int boardAddCnt = iBoardService.boardAdd(params);
			modelMap.put("boardAddCnt", boardAddCnt);
			modelMap.put("boardNo", getBoardContentNo);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}


	@RequestMapping(value = "/boardDetail")
	public ModelAndView boardDetail(@RequestParam HashMap<String,String> params, ModelAndView mav, HttpSession session) {
		
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		
		if(currentUser.equals(params.get("authNo"))) {
			mav.addObject("modBtn", "<div class='btn btn-secondary  float-right mr-2' style='display: inline-block;' id='modifyBtn'>수정</div>");
			mav.addObject("delBtn", "<div class='btn btn-secondary  float-right' style='display: inline-block;' id='deleteBtn'>삭제</div>");
		}

		mav.setViewName("boardDetail");
		
		return mav;
	}
	
	@RequestMapping(value = "getBoardListAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String getBoardListAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		
		// 페이지값을 못받아올 경우 1페이지로 지정(최초 접속)
		if(params.get("page") == null) {
			params.put("page", "1");
		}
		
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
			
			
			HashMap<String,Integer> paging = new HashMap<String,Integer>();
			paging.put("startPageCount", startPageCount);
			paging.put("endPageCount", endPageCount);
			paging.put("maxPageCount", maxPageCount);
			paging.put("currentPage", currentPage);
			
			modelMap.put("pagingMap", paging);

			List<HashMap<String,String>> boardList = iBoardService.getBoardList(params);
			modelMap.put("boardList", boardList);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	@RequestMapping(value = "getBoardListCntAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String getBoardListCntAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		
		try {
			int getBoardListCnt = iBoardService.getBoardListCnt(params);
			modelMap.put("getBoardListCnt", getBoardListCnt);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	@RequestMapping(value = "getBoardContentAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String getBoardContentAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		try {
			HashMap<String,String> getBoardContent = iBoardService.getBoardContent(params);
			iBoardService.boardContentHit(params);
			
			modelMap.put("getBoardContent", getBoardContent);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	@RequestMapping(value = "getCommentAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String getCommentAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		try {
			List<HashMap<String,String>> getComment = iBoardService.getComment(params);
			modelMap.put("getComment", getComment);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}

	@RequestMapping(value = "commentAddAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String commentAddAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		
		try {
			if(currentUser.equals(params.get("userNo"))) {
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
	
	@RequestMapping(value = "commentDelAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String commentDelAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		
		try {
			if(currentUser.equals(params.get("uNo"))) {
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
	
	@RequestMapping(value = "commentModAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String commentModAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		
		
		try {
			if(currentUser.equals(params.get("uNo"))) {
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
	
	@RequestMapping(value = "contentDelAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String contentDelAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		
		try {
			if(currentUser.equals(params.get("uNo"))) {
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
	
	@RequestMapping(value = "boardModAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String boardModAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
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
			int contentFileCheck = iBoardService.contentFileCheck(params);
			params.put("contentFileCheck", Integer.toString(contentFileCheck));
			
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
