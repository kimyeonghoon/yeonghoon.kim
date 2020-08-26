package kim.yeonghoon.www.common.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;

import kim.yeonghoon.www.common.service.ITestService;

@Controller
public class TestController {

	@Autowired
	public ITestService iTestService;

	
	@RequestMapping (value = "/")
	public ModelAndView test(ModelAndView mav) {
		mav.setViewName("index");
		return mav;
	}
	
	@RequestMapping(value = "/DBTEST", produces = "text/json;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String dbTest(ModelAndView mav) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		
		
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		try {
			
			List<HashMap<String,String>> test = iTestService.getTime();
			
			modelMap.put("test", test);
			modelMap.put("result", "성공");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "실패");
		}
		
		return mapper.writeValueAsString(modelMap);
	}
	
}
