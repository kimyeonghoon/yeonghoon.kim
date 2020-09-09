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
	public ModelAndView board(ModelAndView mav, HttpSession session) {
		
		mav.setViewName("board");
		
		return mav;
	}

	@RequestMapping(value = "/boardDetail")
	public ModelAndView boardDetail(ModelAndView mav, HttpSession session) {
		
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
			modelMap.put("getBoardContent", getBoardContent);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		System.out.println(mapper.writeValueAsString(modelMap));
		return mapper.writeValueAsString(modelMap);
	}

}
