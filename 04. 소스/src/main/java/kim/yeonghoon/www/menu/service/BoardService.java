package kim.yeonghoon.www.menu.service;


import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kim.yeonghoon.www.menu.dao.IBoardDao;

@Service
public class BoardService implements IBoardService {
	
	@Autowired
	IBoardDao iBoardDao;

	@Override
	public List<HashMap<String, String>> getBoardList(HashMap<String, String> params) throws Throwable {
		return iBoardDao.getBoardList(params);
	}

	@Override
	public int getBoardListCnt() throws Throwable {
		return iBoardDao.getBoardListCnt();
	}


	
}
