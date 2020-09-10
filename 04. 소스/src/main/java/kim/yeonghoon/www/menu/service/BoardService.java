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

	@Override
	public HashMap<String, String> getBoardContent(HashMap<String, String> params) throws Throwable {
		return iBoardDao.getBoardContent(params);
	}

	@Override
	public void boardContentHit(HashMap<String, String> params) throws Throwable {
		iBoardDao.boardContentHit(params);
	}

	@Override
	public List<HashMap<String, String>> getComment(HashMap<String, String> params) throws Throwable {
		return iBoardDao.getComment(params);
	}

	@Override
	public int commentAdd(HashMap<String, String> params) throws Throwable {
		return iBoardDao.commentAdd(params);
	}

	@Override
	public int commentDel(HashMap<String, String> params) throws Throwable {
		return iBoardDao.commentDel(params);
	}

	@Override
	public int commentMod(HashMap<String, String> params) throws Throwable {
		return iBoardDao.commentMod(params);
	}

	@Override
	public int boardAdd(HashMap<String, String> params) throws Throwable {
		return iBoardDao.boardAdd(params);
	}

	@Override
	public int getBoardContentNo() throws Throwable {
		return iBoardDao.getBoardContentNo();
	}


	
}
