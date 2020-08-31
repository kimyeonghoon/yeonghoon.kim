package kim.yeonghoon.www.menu.dao;

import java.util.HashMap;

public interface ILoginDao {

	public int getEmailExistCheck(HashMap<String, String> params) throws Throwable;

	public String getEncryptPassword(HashMap<String, String> params) throws Throwable;


}
