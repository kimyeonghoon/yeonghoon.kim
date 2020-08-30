package kim.yeonghoon.www.menu.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class JoinDao implements IJoinDao {
	
	@Autowired
	public SqlSession sqlSession;

}
