package kim.yeonghoon.www.menu.dao;

import java.util.HashMap;

public interface IProfileDao {

	public HashMap<String, String> getBriefHistory(HashMap<String, String> params) throws Throwable;

	public int updateBriefHistory(HashMap<String, String> params) throws Throwable;

}
