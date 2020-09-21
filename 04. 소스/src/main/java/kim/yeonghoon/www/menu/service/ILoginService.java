package kim.yeonghoon.www.menu.service;

import java.util.HashMap;

public interface ILoginService {

	public int getEmailExistCheck(HashMap<String, String> params) throws Throwable;

	public HashMap<String, String> getUserInfo(HashMap<String, String> params) throws Throwable;

	public int getUserCheck(HashMap<String, String> params) throws Throwable;

}
