package kim.yeonghoon.www.menu.service;

import java.util.HashMap;
import java.util.List;

public interface IGalleryService {

	public List<HashMap<String, String>> getGalleryList(HashMap<String, String> params) throws Throwable;

	public int getGalleryListCnt(HashMap<String, String> params) throws Throwable;

	public HashMap<String, String> getGalleryContent(HashMap<String, String> params) throws Throwable;

	public void galleryContentHit(HashMap<String, String> params) throws Throwable;

	public List<HashMap<String, String>> getComment(HashMap<String, String> params) throws Throwable;

	public int commentAdd(HashMap<String, String> params) throws Throwable;

	public int commentDel(HashMap<String, String> params) throws Throwable;

	public int commentMod(HashMap<String, String> params) throws Throwable;

	public int galleryAdd(HashMap<String, String> params) throws Throwable;

	public int getGalleryContentNo() throws Throwable;

	public int contentDel(HashMap<String, String> params) throws Throwable;

	public int galleryMod(HashMap<String, String> params) throws Throwable;

	public int contentFileNew(HashMap<String, String> params) throws Throwable;

	public int contentFileCheck(HashMap<String, String> params) throws Throwable;

	public int addThumbnail(HashMap<String, String> params) throws Throwable;

	
}
