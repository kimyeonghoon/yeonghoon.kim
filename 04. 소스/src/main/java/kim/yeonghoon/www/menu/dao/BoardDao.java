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

	
}
