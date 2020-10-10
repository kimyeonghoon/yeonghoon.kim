package kim.yeonghoon.www.utils.controller;

import java.io.File;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.fasterxml.jackson.databind.ObjectMapper;

import kim.yeonghoon.www.menu.service.IGalleryService;

@Controller
public class FileUploadController {

	@Autowired
	IGalleryService iGalleryService;
	
	@RequestMapping(value = "/fileUploadAjax", method = RequestMethod.POST,  produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String fileUploadAjax(HttpServletRequest request, ModelAndView modelAndView) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		
		// 업로드 허용 확장자 지정
		final String uploadExt = "show|zip|xls|ppt|doc|xlsx|pptx|docx|hwp|csv|jpg|jpeg|png|gif|bmp|txt|pdf";
		// 업로드 경로
		String uploadPath = "C:\\\\Devel\\workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp1\\wtpwebapps\\www\\resources\\upload\\";
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
		List<String> originalName = new ArrayList<String>();
		
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
						String originalFileName = file.getOriginalFilename();
						fileFullName = fileTempName.toLowerCase() + "." + fileExt;
						file.transferTo(new File(new File(uploadPath), fileFullName));
						
						String saveName = "https://kr.object.iwinv.kr/yeonghoon.kim/" + fileFullName;
						fileName.add(saveName);
						originalName.add(originalFileName);
						
				        final AmazonS3 s3 = AmazonS3ClientBuilder.standard()
				        .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(
				        		"kr.object.iwinv.kr", "default"))
				        .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials("D3TASI07A7SINONC023P", "gMGepzuwX1a2e6AnrsHOWQMtQ9EnPc7goxGnQ3sN")))
				        .build();
						
						
						s3.putObject(new PutObjectRequest("yeonghoon.kim", fileFullName, new File(new File(uploadPath), fileFullName)));
					}
				}
			}
			modelMap.put("result", "success");
		} catch (Exception e) {
			e.printStackTrace();
			modelMap.put("result","error");
		}
		
		modelMap.put("fileName", fileName);
		modelMap.put("originalName", originalName);
	
		return mapper.writeValueAsString(modelMap);
	}
	
	// ck editor 이미지 업로드용
	@RequestMapping(value = "/imageUpload", method = RequestMethod.POST)
	public void editorImageUpload(HttpServletRequest request, HttpServletResponse response,
		@RequestParam MultipartFile upload, ModelAndView modelAndView) throws Throwable {
		PrintWriter printWriter = null;
		Calendar c =  Calendar.getInstance();
		Long unixtime = c.getTimeInMillis() / 1000;
		RandomStringUtils rs = new RandomStringUtils();
		
		try {
			String uploadExts = "jpg|jpeg|png|gif|bmp"; // 확장자
			String uploadPath = "C:\\\\Devel\\workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp1\\wtpwebapps\\www\\resources\\upload\\";
			String fileFullName = "";

			File fileDir = new File(uploadPath);

			if (!fileDir.exists()) {
				fileDir.mkdirs(); // 디렉토리가 존재하지 않는다면 생성
			}

			if (upload.getSize() > 0) {
				String fileTempName = unixtime + "_" + rs.randomAlphabetic(8);
				String fileExt = FilenameUtils.getExtension(upload.getOriginalFilename()).toLowerCase(); // 파일

				if (uploadExts.toLowerCase().indexOf(fileExt) >= 0) {
					fileFullName = fileTempName.toLowerCase() + "." + fileExt;
					upload.transferTo(new File(fileDir, fileFullName));
					
					
					String saveName = "https://kr.object.iwinv.kr/yeonghoon.kim/" + fileFullName;
					
			        final AmazonS3 s3 = AmazonS3ClientBuilder.standard()
			        .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(
			        		"kr.object.iwinv.kr", "default"))
			        .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials("D3TASI07A7SINONC023P", "gMGepzuwX1a2e6AnrsHOWQMtQ9EnPc7goxGnQ3sN")))
			        .build();
					
					
					s3.putObject(new PutObjectRequest("yeonghoon.kim", fileFullName, new File(new File(uploadPath), fileFullName)));

				} else {
					// 파일 확장자가 틀릴 경우
					printWriter = response.getWriter();

					printWriter.println("<script type='text/javascript'>alert('파일 확장자가 지원을 하지 않습니다.');</script>");
					printWriter.flush();
					printWriter.close();
				}

				// 성공 시
				String callback = request.getParameter("CKEditorFuncNum");
				
				printWriter = response.getWriter();

				printWriter.println("<script type='text/javascript'>" + "window.parent.CKEDITOR.tools.callFunction("
						+ callback + ",'" + "https://kr.object.iwinv.kr/yeonghoon.kim/" + fileFullName + "','이미지를 업로드 하였습니다.'" + ")</script>");
				printWriter.flush();
				printWriter.close();

			} else {
				// 파일 크기가 0이거나 없는 경우
				printWriter = response.getWriter();

				printWriter.println("<script type='text/javascript'>alert('파일 업로드에 실패하였습니다.');</script>");
				printWriter.flush();
				printWriter.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (printWriter != null) {
				printWriter.close();
			}
		}
	}

}
