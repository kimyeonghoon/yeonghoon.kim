package kim.yeonghoon.www.menu.dao;


import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BoardDao implements IBoardDao {

	@Autowired
	SqlSession sqlSession;

	
	/**
	 * getBoardListAjax - board 접속 시 게시물 리스트를 불러오는 ajax
	 */
	@Override
	// 총 게시물 수 구하기
	public int getBoardListCnt(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectOne("board.getBoardListCnt", params);
	}
	
	@Override
	// 게시글 리스트 조회
	public List<HashMap<String, String>> getBoardList(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectList("board.getBoardList", params);
	}

	
	/**
	 * getBoardContentAjax - 상세보기 글 내용 조회 ajax
	 */
	@Override
	// 게시글 조회
	public HashMap<String, String> getBoardContent(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectOne("board.getBoardContent", params);
	}

	@Override
	// 히트 수 증가
	public void boardContentHit(HashMap<String, String> params) throws Throwable {
		sqlSession.update("board.boardContentHit",params);
	}

	
	/**
	 * getCommentAjax - 상세보기 댓글 조회 ajax
	 */
	@Override
	public List<HashMap<String, String>> getComment(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectList("board.getComment", params);
	}

	
	/**
	 * commentAddAjax - 댓글 추가 ajax
	 */
	@Override
	public int commentAdd(HashMap<String, String> params) throws Throwable {
		return sqlSession.insert("board.commentAdd", params);
	}
	
	
	/**
	 * commentModAjax - 댓글 수정 ajax
	 */
	@Override
	public int commentMod(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("board.commentMod",params);
	}

	
	/**
	 * commentDelAjax - 댓글 삭제 ajax
	 */
	@Override
	public int commentDel(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("board.commentDel",params);
	}

	/**
	 * boardAddAjax - 게시글 등록 버튼 클릭 시 동작
	 */
	@Override
	// autoIncrement값 조회
	public int getBoardContentNo() throws Throwable {
		return sqlSession.selectOne("board.getBoardContentNo");
	}

	@Override
	// 게시글 등록
	public int boardAdd(HashMap<String, String> params) throws Throwable {
		return sqlSession.insert("board.boardAdd", params);
	}

	
	/**
	 * boardModAjax - 게시글 수정 버튼 클릭 시 동작
	 */
	@Override
	// 첨부파일 체크
	public int contentFileCheck(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectOne("board.contentFileCheck", params);
	}

	@Override
	// 글 수정
	public int boardMod(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("board.boardMod", params);
	}
	
	
	/**
	 * contentDelAjax - 게시글 삭제 버튼 클릭 시 동작
	 */
	@Override
	public int contentDel(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("board.contentDel", params);
	}
}
