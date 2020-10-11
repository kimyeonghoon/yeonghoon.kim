package kim.yeonghoon.www.menu.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class GalleryDao implements IGalleryDao {

	@Autowired
	SqlSession sqlSession;

	
	
	/**
	 * getGalleryListAjax - gallery 접속 시 게시물 리스트를 불러오는 ajax
	 */
	@Override
	// 총 게시물 수 구하기
	public int getGalleryListCnt(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectOne("gallery.getGalleryListCnt", params);
	}
	
	@Override
	// 게시글 리스트 조회
	public List<HashMap<String, String>> getGalleryList(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectList("gallery.getGalleryList", params);
	}


	
	/**
	 * getGalleryContentAjax - 상세보기 글 내용 조회 ajax
	 */
	@Override
	// 게시글 조회
	public HashMap<String, String> getGalleryContent(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectOne("gallery.getGalleryContent", params);
	}

	@Override
	// 히트 수 증가	
	public void galleryContentHit(HashMap<String, String> params) throws Throwable {
		sqlSession.update("gallery.galleryContentHit",params);
	}

	
	
	/**
	 * getCommentAjax - 상세보기 댓글 조회 ajax
	 */
	@Override
	public List<HashMap<String, String>> getComment(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectList("gallery.getComment", params);
	}

	
	
	/**
	 * commentAddAjax - 댓글 추가 ajax
	 */
	@Override
	public int commentAdd(HashMap<String, String> params) throws Throwable {
		return sqlSession.insert("gallery.commentAdd", params);
	}
	
	
	
	/**
	 * commentModAjax - 댓글 수정 ajax
	 */
	@Override
	public int commentMod(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("gallery.commentMod",params);
	}

	
	
	/**
	 * commentDelAjax - 댓글 삭제 ajax
	 */
	@Override
	public int commentDel(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("gallery.commentDel",params);
	}

	
	

	/**
	 * galleryAddAjax - 게시글 등록 버튼 클릭 시 동작
	 */
	@Override
	// autoIncrement값 조회
	public int getGalleryContentNo() throws Throwable {
		return sqlSession.selectOne("gallery.getGalleryContentNo");
	}
	
	@Override
	// 썸네일 추가
	public int addThumbnail(HashMap<String, String> params) throws Throwable {
		return sqlSession.insert("gallery.addThumbnail", params);
	}
	
	@Override
	// 게시글 등록
	public int galleryAdd(HashMap<String, String> params) throws Throwable {
		return sqlSession.insert("gallery.galleryAdd", params);
	}



	/**
	 * galleryModAjax - 게시글 수정 버튼 클릭 시 동작
	 */
	@Override
	public int galleryMod(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("gallery.galleryMod", params);
	}
	
	
	
	/**
	 * galleryContentDelAjax - 게시글 삭제 버튼 클릭 시 동작
	 */
	@Override
	public int contentDel(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("gallery.contentDel", params);
	}
}