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
	public ModelAndView board(ModelAndView mav, HttpSession session) {
	
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
		if(params.get("originalName1") == "") {
			params.put("originalName2", null);
		}
		
		System.out.println(params);
		
		try {
			int getBoardContentNo = iBoardService.getBoardContentNo();
			params.put("autoIncrement", Integer.toString(getBoardContentNo));
			int boardAddCnt = iBoardService.boardAdd(params);
			modelMap.put("boardAddCnt", boardAddCnt);
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
		if(params.get("userNo").equals(currentUser)) {
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
		
		try {
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
			int getBoardListCnt = iBoardService.getBoardListCnt();
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
		System.out.println(mapper.writeValueAsString(modelMap));
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
		System.out.println(mapper.writeValueAsString(modelMap));
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
		System.out.println(mapper.writeValueAsString(modelMap));
		return mapper.writeValueAsString(modelMap);
	}
	
	@RequestMapping(value = "commentDelAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String commentDelAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		System.out.println(params);
		
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
		System.out.println(mapper.writeValueAsString(modelMap));
		return mapper.writeValueAsString(modelMap);
	}
	
	@RequestMapping(value = "commentModAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String commentModAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		
		System.out.println(params);
		
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
		System.out.println(mapper.writeValueAsString(modelMap));
		return mapper.writeValueAsString(modelMap);
	}
	
}
