package kim.yeonghoon.www.menu.controller;

import java.util.HashMap;
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

import kim.yeonghoon.www.menu.service.IProfileService;

@Controller
public class ProfileController {

	@Autowired
	IProfileService iProfileService;
	
	@RequestMapping(value = "profile")
	public ModelAndView profile(@RequestParam HashMap<String,String> params, ModelAndView mav, HttpSession session) throws Throwable {
		mav.setViewName("profile");
		return mav;
	}
	
	
	@RequestMapping(value = "briefHistoryAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String briefHistoryAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		params.put("member_no", "1");
		try {
			HashMap<String,String> briefHistory = iProfileService.getBriefHistory(params);
			modelMap.put("briefHistory", briefHistory);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
		
	
	@RequestMapping(value = "getBriefHistoryAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String getBriefHistoryAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		// 관리자만 수정가능하도록 하는 기능 필요

		// 현재 세션값 숫자로 변환 후 값 전달
		params.put("member_no", "1");
		
		try {
			HashMap<String,String> list = iProfileService.getBriefHistory(params);
			modelMap.put("list", list);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	@RequestMapping(value = "briefHistoryModifyAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String briefHistoryModifyAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 현재 세션값 숫자로 변환 후 값 전달
		params.put("member_no", "1");
		
		// 날짜타입이 공백으로 들어왔을 경우 null 처리
		if(params.get("yearInput").equals("")) {
			params.put("yearInput", null); 
		}
		
		try {
			int updateBriefHistory = iProfileService.updateBriefHistory(params);
			if(updateBriefHistory > 0) {
				modelMap.put("result", "success");
			} else {
				modelMap.put("result", "fail");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		System.out.println(mapper.writeValueAsString(modelMap));
		return mapper.writeValueAsString(modelMap);
	}


}
