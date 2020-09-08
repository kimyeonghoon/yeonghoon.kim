<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>FileUpload Test</title>
<script type="text/javascript" 
		src="resources/script/jquery/jquery-1.12.4.min.js"></script>
<script type="text/javascript" 
		src="resources/script/jquery/jquery.form.js"></script>

<script type="text/javascript">
$(document).ready(function() {
	$("#uploadBtn").on("click", function(){
		var fileForm = $("#fileForm");
		// ajaxForm : 해당 객체(form)를 ajax 전송형태로 변환
		// submit() : action에 있는 주소로 데이터를 가지고 이동
		//            -> action에 있는 주소로 데이터를 가지고 ajax 통신 
		//            이동이 아니라 ajax로 데이터를 전송하겠다는 의미
		fileForm.ajaxForm({ 
			//보내기전 validation check가 필요할경우 
			beforeSubmit: function (data, frm, opt) { 
				alert("전송전!!");
				//return false이면  수행 종료
				return true;
			}, //submit이후의 처리
			success: function(res){
				if(res.result =="SUCCESS"){
//					var resData = eval("(" + removePre(data) + ")");
//					alert("저장완료");
//					alert(data);
//					alert(resData.fileName[0]);
//					alert(resData.fileName[1]);
//					alert(resData.fileName[2]);
//					var resData = eval("(" + removePre(data) + ")");
					
					console.log(res);
					alert(res.fileName[0]);
					alert(res.fileName[1]);
					alert(res.fileName[2]);
				} else {
					alert("저장실패");
				} 
			}, //ajax error
			error: function(){
				alert("에러발생!!"); 
			}
		});  // ajaxForm 할당
		
		fileForm.submit(); // ajaxForm 실행
	});
});

function uploadResultCallBack(result){
	if(result.result =="SUCCESS"){
//		var resData = eval("(" + removePre(data) + ")");
//		alert("저장완료");
//		alert(data);
//		alert(resData.fileName[0]);
//		alert(resData.fileName[1]);
//		alert(resData.fileName[2]);
//		var resData = eval("(" + removePre(data) + ")");
		alert("저장완료");
		alert(result.fileName[0]);
		alert(result.fileName[1]);
		alert(result.fileName[2]);
	} else {
		alert("저장실패");
	}
}

function removePre(data) {
	if(data.indexOf("<pre>") > -1) {
		var st = data.indexOf(">"); 
		var ed = data.indexOf("<", st);
		
		return data.substring(st + 1, ed);
	} else {
		return data;
	}
}
</script>
</head>
<body>
<!-- enctype="form-data" : 기본값 -->

<form id="fileForm" name="fileForm" action="fileUploadAjax" method="post" enctype="multipart/form-data">
<h3> 첨부파일</h3>
<table width="770" border="0" cellspacing="0" cellpadding="0" class="table_1">
	<colgroup>
		<col width="150px" />
		<col width="600px" />
	</colgroup>
	<tr>
		<th>첨부파일1</th>
		<td><input type="file" name="attFile1" size="85" /></td>
	</tr>
	<tr>
		<th>첨부파일2</th>
		<td><input type="file" name="attFile2" size="85" /></td>
	</tr>
	<tr>
		<th class="th_bot">첨부파일3</th>
		<td class="th_bot"><input type="file" name="attFile3" size="85" /></td>
	</tr>
</table>
</form>
<input type="button" value="저장" id="uploadBtn" />
</body>
</html>