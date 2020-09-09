package kim.yeonghoon.www.menu.dao;

import java.util.HashMap;
import java.util.List;

public interface IBoardDao {

	public List<HashMap<String, String>> getBoardList(HashMap<String, String> params) throws Throwable;

	public int getBoardListCnt() throws Throwable;

	public HashMap<String, String> getBoardContent(HashMap<String, String> params) throws Throwable;



}
