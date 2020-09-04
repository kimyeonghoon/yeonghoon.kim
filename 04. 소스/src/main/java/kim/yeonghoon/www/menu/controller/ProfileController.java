package kim.yeonghoon.www.menu.controller;

import java.util.ArrayList;
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

	@RequestMapping(value = "redrawTechAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String redrawTechAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		params.put("member_no", "1");
		try {
			
			// 기술 카테고리 개수 추출
			int getTechCategoryCnt = iProfileService.getTechCategoryCnt();
			
			List<HashMap<String,String>> getTechCategory = iProfileService.getTechCategory();
			
			// 기술 리스트 뽑기
			for(int i = 1; i <= getTechCategoryCnt; i++) {
				List<String> getTech = new ArrayList<String>();
				if(getTech.size() > 0) {
					getTech.clear();
				}
				getTech = iProfileService.getTech(i);
				String techName = "tech" + (i - 1);
				modelMap.put(techName, getTech);

			}
			modelMap.put("getTechCategory", getTechCategory);
			modelMap.put("getTechCategoryCnt", getTechCategoryCnt);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		System.out.println(mapper.writeValueAsString(modelMap));
		return mapper.writeValueAsString(modelMap);
	}
	
	@RequestMapping(value = "techAddAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String techAddAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		params.put("member_no", "1");
		System.out.println(params);
		
		try {
			int techAdd = iProfileService.techAdd(params);
			
			if(techAdd > 0) {
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
	
	@RequestMapping(value = "techListAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String techListAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		System.out.println(params);
		
		try {
			List<HashMap<String,String>> techList = iProfileService.techList(params);
			modelMap.put("techList", techList);
			modelMap.put("result", "success");
			
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
	
		System.out.println(mapper.writeValueAsString(modelMap));
		return mapper.writeValueAsString(modelMap);
	}
		
	@RequestMapping(value = "techCategoryListAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String techCategoryListAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		System.out.println(params);
		
		try {
			List<HashMap<String,String>> getTechCategory = iProfileService.getTechCategory();
			modelMap.put("techCategoryList", getTechCategory);
			modelMap.put("result", "success");
			
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
	
		System.out.println(mapper.writeValueAsString(modelMap));
		return mapper.writeValueAsString(modelMap);
	}
	
	@RequestMapping(value = "techDelAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String techDelAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		params.put("member_no", "1");
		
		try {
			
			int techDel = iProfileService.techDel(params);
			
			if(techDel > 0) {
				modelMap.put("techDel", techDel);
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
	
	@RequestMapping(value = "redrawEducationAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String redrawEducationAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		params.put("member_no", "1");
		try {
			
			List<HashMap<String,String>> getEducation = iProfileService.getEducation(params);
			
			modelMap.put("getEducation", getEducation);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		System.out.println(mapper.writeValueAsString(modelMap));
		return mapper.writeValueAsString(modelMap);
	}
	
	@RequestMapping(value = "educationAdd", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String educationAdd(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		// 공백으로 서버로 들어올 경우 null 처리
		if(params.get("graduatedInput") == "") {
			params.put("graduatedInput", null);
		}
		if(params.get("etcInput") == "") {
			params.put("etcInput", null);
		}
		if(params.get("departmentInput") == "") {
			params.put("departmentInput", null);
		}
		
			
		params.put("member_no", "1");
		try {
			
			int educationAddCnt = iProfileService.educationAdd(params);

			if(educationAddCnt > 0) {
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
