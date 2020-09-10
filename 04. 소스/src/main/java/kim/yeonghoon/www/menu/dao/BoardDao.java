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

	@Override
	public List<HashMap<String, String>> getBoardList(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectList("board.getBoardList", params);
	}

	@Override
	public int getBoardListCnt() throws Throwable {
		return sqlSession.selectOne("board.getBoardListCnt");
	}

	@Override
	public HashMap<String, String> getBoardContent(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectOne("board.getBoardContent", params);
	}

	@Override
	public void boardContentHit(HashMap<String, String> params) throws Throwable {
		sqlSession.update("board.boardContentHit",params);
	}

	@Override
	public List<HashMap<String, String>> getComment(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectList("board.getComment", params);
	}

	@Override
	public int commentAdd(HashMap<String, String> params) throws Throwable {
		return sqlSession.insert("board.commentAdd", params);
	}

	@Override
	public int commentDel(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("board.commentDel",params);
	}

	@Override
	public int commentMod(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("board.commentMod",params);
	}

	
}
