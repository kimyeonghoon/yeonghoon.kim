/**
 * profile 페이지 로딩 시 실행 script 정의
 */
function init_profile() {

	var businessCard1 = "<img src='../image/giftm.jpg' width='100%' />";
	var businessCard2 = "<img src='../image/smileserv.jpg' width='100%' />";
	var dongauniv = "<img src='../image/dongauniv.jpg' width='100%' />";
	var gdi = "<img src='../image/gdi.jpg' width='100%' />";
	var itwillbs = "<img src='../image/itwillbs.jpg' width='100%' />";
	var eip = "<img src='../image/eip.jpg' width='100%' />";
	var csisdl2 = "<img src='../image/csisdl2.jpg' width='100%' />";
	var ieoa = "<img src='../image/ieoa.jpg' width='100%' />";
	var pc1 = "<img src='../image/pc1.jpg' width='100%' />";
	
	$("#businessCard1").popover({
		content: businessCard1, html: true
	});
	$("#businessCard2").popover({
		content: businessCard2, html: true
	});
	$("#dongauniv").popover({
		content: dongauniv, html: true
	});
	$("#gdi").popover({
		content: gdi, html: true
	});
	$("#itwillbs").popover({
		content: itwillbs, html: true
	});
	$("#eip").popover({
		content: eip, html: true
	});
	$("#csisdl2").popover({
		content: csisdl2, html: true
	});
	$("#ieoa").popover({
		content: ieoa, html: true
	});
	$("#pc1").popover({
		content: pc1, html: true
	});
}
