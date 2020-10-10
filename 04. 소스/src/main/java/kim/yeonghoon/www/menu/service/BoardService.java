package kim.yeonghoon.www.menu.service;


import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kim.yeonghoon.www.menu.dao.IBoardDao;

@Service
public class BoardService implements IBoardService {
	/**
	 *  의존성 주입
	 */
	@Autowired
	IBoardDao iBoardDao;

	
	/**
	 * getBoardListAjax - board 접속 시 게시물 리스트를 불러오는 ajax
	 */
	@Override
	// 총 게시물 수 구하기
	public int getBoardListCnt(HashMap<String, String> params) throws Throwable {
		return iBoardDao.getBoardListCnt(params);
	}
	
	@Override
	// 게시글 리스트 조회
	public List<HashMap<String, String>> getBoardList(HashMap<String, String> params) throws Throwable {
		return iBoardDao.getBoardList(params);
	}


	/**
	 * getBoardContentAjax - 상세보기 글 내용 조회 ajax
	 */
	@Override
	// 게시글 조회
	public HashMap<String, String> getBoardContent(HashMap<String, String> params) throws Throwable {
		return iBoardDao.getBoardContent(params);
	}
	
	@Transactional
	@Override
	// 히트 수 증가
	public void boardContentHit(HashMap<String, String> params) throws Throwable {
		iBoardDao.boardContentHit(params);
	}

	
	/**
	 * getCommentAjax - 상세보기 댓글 조회 ajax
	 */
	@Override
	public List<HashMap<String, String>> getComment(HashMap<String, String> params) throws Throwable {
		return iBoardDao.getComment(params);
	}

	
	/**
	 * commentAddAjax - 댓글 추가 ajax
	 */
	@Transactional
	@Override
	public int commentAdd(HashMap<String, String> params) throws Throwable {
		return iBoardDao.commentAdd(params);
	}

	
	/**
	 * commentModAjax - 댓글 수정 ajax
	 */
	@Transactional
	@Override
	public int commentMod(HashMap<String, String> params) throws Throwable {
		return iBoardDao.commentMod(params);
	}
	
	
	/**
	 * commentDelAjax - 댓글 삭제 ajax
	 */
	@Transactional
	@Override
	public int commentDel(HashMap<String, String> params) throws Throwable {
		return iBoardDao.commentDel(params);
	}


	/**
	 * boardAddAjax - 게시글 등록 버튼 클릭 시 동작
	 */
	@Transactional
	@Override
	// autoIncrement값 조회
	public int getBoardContentNo() throws Throwable {
		return iBoardDao.getBoardContentNo();
	}
	
	@Override
	// 게시글 등록
	public int boardAdd(HashMap<String, String> params) throws Throwable {
		return iBoardDao.boardAdd(params);
	}

	
	/**
	 * boardModAjax - 게시글 수정 버튼 클릭 시 동작
	 */
	@Override
	// 첨부파일 체크
	public int contentFileCheck(HashMap<String, String> params) throws Throwable {
		return iBoardDao.contentFileCheck(params);
	}
	
	@Transactional
	@Override
	// 글 수정
	public int boardMod(HashMap<String, String> params) throws Throwable {
		return iBoardDao.boardMod(params);
	}


	/**
	 * contentDelAjax - 게시글 삭제 버튼 클릭 시 동작
	 */
	@Transactional
	@Override
	public int contentDel(HashMap<String, String> params) throws Throwable {
		return iBoardDao.contentDel(params);
	}
}
