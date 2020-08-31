package kim.yeonghoon.www.menu.dao;

import java.util.HashMap;

public interface ILoginDao {

	public int getEmailExistCheck(HashMap<String, String> params) throws Throwable;

	public HashMap<String, String> getUserInfo(HashMap<String, String> params) throws Throwable;

	public int getUserCheck(HashMap<String, String> params) throws Throwable;



}
