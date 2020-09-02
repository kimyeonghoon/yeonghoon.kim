package kim.yeonghoon.www.menu.dao;

import java.util.HashMap;
import java.util.List;

public interface IProfileDao {

	public HashMap<String, String> getBriefHistory(HashMap<String, String> params) throws Throwable;

	public int updateBriefHistory(HashMap<String, String> params) throws Throwable;

	public List<HashMap<String, String>> getTechCategory() throws Throwable;

	public int getTechCategoryCnt() throws Throwable;

	public List<String> getTech(int i) throws Throwable;

	public int techAdd(HashMap<String, String> params) throws Throwable;

}
