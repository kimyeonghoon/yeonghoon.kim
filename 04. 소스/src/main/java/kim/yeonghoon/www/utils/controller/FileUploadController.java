package kim.yeonghoon.www.utils.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class FileUploadController {

	@RequestMapping(value = "/fileUploadAjax", method = RequestMethod.POST,  produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String fileUploadAjax(HttpServletRequest request, ModelAndView modelAndView) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		
		// 업로드 허용 확장자 지정
		final String uploadExt = "xls|ppt|doc|xlsx|pptx|docx|hwp|csv|jpg|jpeg|png|gif|bmp|txt|pdf";
		// 업로드 경로
		final String uploadPath = "C:\\Devel\\workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp1\\wtpwebapps\\www\\resources\\upload\\";
		// fileFullName 초기화
		String fileFullName = "";
		
		Calendar c =  Calendar.getInstance();
		Long unixtime = c.getTimeInMillis() / 1000;
		RandomStringUtils rs = new RandomStringUtils();
		
		File folder = new File(uploadPath);
		
		if (!folder.exists()) {
			folder.mkdir();
		}
		
		// 파일이 여러 개 들어올 수 있어서 리스트로 담음
		List<String> fileName = new ArrayList<String>();
		
		try {
			@SuppressWarnings("rawtypes")
			Map files = multipartRequest.getFileMap();
			Iterator<String> iterator = multipartRequest.getFileNames();
			
			while (iterator.hasNext()) {
				String key = iterator.next();
				MultipartFile file = (MultipartFile) files.get(key);
				
				if(file.getSize() > 0) {
					// 파일명 변경
					String fileTempName = unixtime + "_" + rs.randomAlphabetic(8);
					// 파일 확장자 추출
					String fileExt = FilenameUtils.getExtension(file.getOriginalFilename());
					
					
					if (uploadExt.toLowerCase().indexOf(fileExt) < 0) {
						throw new Exception("Not allowded file extension : " + fileExt.toLowerCase());
					} else {
						fileFullName = fileTempName.toLowerCase() + "." + fileExt;
						file.transferTo(new File(new File(uploadPath), fileFullName));
						
						String saveName = "resources/upload/" + fileFullName;
						fileName.add(saveName);
					}
				}
			}
			modelMap.put("result", "success");
		} catch (Exception e) {
			e.printStackTrace();
			modelMap.put("result","error");
		}
		
		modelMap.put("fileName", fileName);
	
		return mapper.writeValueAsString(modelMap);
	}

}
