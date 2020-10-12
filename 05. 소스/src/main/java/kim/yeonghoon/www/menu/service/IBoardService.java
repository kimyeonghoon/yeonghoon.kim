package kim.yeonghoon.www.menu.service;

import java.util.HashMap;
import java.util.List;

public interface IBoardService {
	/**
	 * getBoardListAjax - board 접속 시 게시물 리스트를 불러오는 ajax
	 */
	// 총 게시물 수 구하기
	public int getBoardListCnt(HashMap<String, String> params) throws Throwable;
	// 게시글 리스트 조회
	public List<HashMap<String, String>> getBoardList(HashMap<String, String> params) throws Throwable;


	/**
	 * getBoardContentAjax - 상세보기 글 내용 조회 ajax
	 */
	// 게시글 조회
	public HashMap<String, String> getBoardContent(HashMap<String, String> params) throws Throwable;
	// 히트 수 증가
	public void boardContentHit(HashMap<String, String> params) throws Throwable;

	
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
	 * boardAddAjax - 게시글 등록 버튼 클릭 시 동작
	 */
	// autoIncrement값 조회
	public int getBoardContentNo() throws Throwable;
	// 게시글 등록
	public int boardAdd(HashMap<String, String> params) throws Throwable;

	
	/**
	 * boardModAjax - 게시글 수정 버튼 클릭 시 동작
	 */
	// 첨부파일 체크
	public int contentFileCheck(HashMap<String, String> params) throws Throwable;
	// 글 수정
	public int boardMod(HashMap<String, String> params) throws Throwable;
	
	/**
	 * contentDelAjax - 게시글 삭제 버튼 클릭 시 동작
	 */
	public int contentDel(HashMap<String, String> params) throws Throwable;

}
