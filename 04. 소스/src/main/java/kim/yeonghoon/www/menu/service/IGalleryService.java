package kim.yeonghoon.www.menu.service;

import java.util.HashMap;
import java.util.List;

public interface IGalleryService {
	/**
	 * getGalleryListAjax - gallery 접속 시 게시물 리스트를 불러오는 ajax
	 */
	// 총 게시물 수 구하기
	public int getGalleryListCnt(HashMap<String, String> params) throws Throwable;
	// 게시글 리스트 조회
	public List<HashMap<String, String>> getGalleryList(HashMap<String, String> params) throws Throwable;

	
	/**
	 * getGalleryContentAjax - 상세보기 글 내용 조회 ajax
	 */
	// 게시글 조회
	public HashMap<String, String> getGalleryContent(HashMap<String, String> params) throws Throwable;
	// 히트 수 증가
	public void galleryContentHit(HashMap<String, String> params) throws Throwable;

	
	/**
	 * getCommentAjax - 상세보기 댓글 조회 ajax
	 */
	public List<HashMap<String, String>> getComment(HashMap<String, String> params) throws Throwable;

	
	/**
	 * commentAddAjax - 댓글 추가 ajax
	 */
	public int commentAdd(HashMap<String, String> params) throws Throwable;

	
	/**
	 * commentModAjax - 댓글 수정 ajax
	 */
	public int commentMod(HashMap<String, String> params) throws Throwable;
	
	
	/**
	 * commentDelAjax - 댓글 삭제 ajax
	 */
	public int commentDel(HashMap<String, String> params) throws Throwable;


	/**
	 * galleryAddAjax - 게시글 등록 버튼 클릭 시 동작
	 */
	// autoIncrement값 조회
	public int getGalleryContentNo() throws Throwable;
	// 썸네일 추가
	public int addThumbnail(HashMap<String, String> params) throws Throwable;
	// 게시글 등록
	public int galleryAdd(HashMap<String, String> params) throws Throwable;

	
	/**
	 * galleryModAjax - 게시글 수정 버튼 클릭 시 동작
	 */
	public int galleryMod(HashMap<String, String> params) throws Throwable;
	
	
	
	/**
	 * galleryContentDelAjax - 게시글 삭제 버튼 클릭 시 동작
	 */
	public int contentDel(HashMap<String, String> params) throws Throwable;
}
