package kim.yeonghoon.www.menu.service;

import java.util.HashMap;

public interface IProfileService {

	public HashMap<String, String> getBriefHistory(HashMap<String, String> params) throws Throwable;

	public int updateBriefHistory(HashMap<String, String> params) throws Throwable;

}
