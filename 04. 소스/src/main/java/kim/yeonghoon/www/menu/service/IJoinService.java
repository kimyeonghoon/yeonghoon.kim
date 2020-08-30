package kim.yeonghoon.www.menu.service;

import java.util.HashMap;
import java.util.List;

public interface IJoinService {

	public List<HashMap<String, String>> getBTS() throws Throwable;

	public int getDuplicationCheck(HashMap<String, String> params) throws Throwable;

	public void addUser(HashMap<String, String> params) throws Throwable;


}
