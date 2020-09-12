package kim.yeonghoon.www.menu.service;

import java.util.HashMap;
import java.util.List;

public interface IBoardService {

	public List<HashMap<String, String>> getBoardList(HashMap<String, String> params) throws Throwable;

	public int getBoardListCnt(HashMap<String, String> params) throws Throwable;

	public HashMap<String, String> getBoardContent(HashMap<String, String> params) throws Throwable;

	public void boardContentHit(HashMap<String, String> params) throws Throwable;

	public List<HashMap<String, String>> getComment(HashMap<String, String> params) throws Throwable;

	public int commentAdd(HashMap<String, String> params) throws Throwable;

	public int commentDel(HashMap<String, String> params) throws Throwable;

	public int commentMod(HashMap<String, String> params) throws Throwable;

	public int boardAdd(HashMap<String, String> params) throws Throwable;

	public int getBoardContentNo() throws Throwable;

	public int contentDel(HashMap<String, String> params) throws Throwable;

	public int boardMod(HashMap<String, String> params) throws Throwable;

	public int contentFileNew(HashMap<String, String> params) throws Throwable;

	public int contentFileCheck(HashMap<String, String> params) throws Throwable;

}
