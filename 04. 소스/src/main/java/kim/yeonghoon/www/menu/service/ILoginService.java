package kim.yeonghoon.www.menu.service;

import java.util.HashMap;

public interface ILoginService {

	public int getEmailExistCheck(HashMap<String, String> params) throws Throwable;

	public String getEncryptPassword(HashMap<String, String> params) throws Throwable;


}
