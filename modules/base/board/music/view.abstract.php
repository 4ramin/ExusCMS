<?php

abstract class view_abstract extends board 
{
	
	abstract function init($args);
	abstract function dispBoardModify();
	abstract function dispOriginContent();
	abstract function dispAlbumContent();
	abstract function dispBoardWrite();
	abstract function dispBoardSetup();
	abstract function dispBoardExtraSetup();
	abstract function dispBoardCategorySetup();
	abstract function dispBoardSkinSetup();
	abstract function dispBoardPlaylist();
	abstract function dispBoardPopular();
	abstract function dispBoardAuthor();
	abstract function dispBoardOrigin();
	abstract function dispBoardAlbum();
	abstract function dispBoardTag();
	abstract function dispBoardTagList();
	abstract function getCommentPage();
	abstract function dispBoardContent();
	
	public function getProperty() 
	{
		$this->property = new stdClass;
		$this->property->default_action = "dispBoardContent";
		$this->property->private_action = array("CheckDocument", "CheckPage", "ajaxCall");
		$this->property->column_list = array('content', 'nick_name', 'no', 'title', 'category', 'readed', 'voted', 'download', 'cart', 'play', 'regdate');
		$this->property->column = array('no', 'category', 'title', 'play', 'regdate', 'readed', 'nick_name', 'voted');
		$this->property->sort_index_list = array('voted_count', 'readed_count', 'download_count', 'playtime', 'star_count', 'artist');
		$this->property->list_count_list = array('5', '10', '20', '40', '60', '100');
		
		return $this->property;
	}
	
	public function isDocumentAuthor()
	{
		$memberSrl = $this->base->getMemberSrl();
		$oDocumentMemberSrl = $this->board->document['member_srl'];
		if ($memberSrl === $oDocumentMemberSrl)
		{
			return true;
		}
		
		return false;
	}
	
	public function setDocumentTitle()
	{
		$this->base->set('document_title', $this->board->document['title']);
	}
	
	public function getCurrentCommentListCount() 
	{
		return ($this->board->cpage - 1) * $this->board->comment_listcount;
	}
	
	public function getAllOriginAlbum() 
	{
		return $this->board->query->getAllOriginAlbum($this->board->album);
	}
	
	public function getOriginAlbumbysrl() 
	{
		return $this->board->query->getOriginAlbumbysrl($this->board->related);
	}
	
	public function updateReadedCount() 
	{
		$this->board->query->UpdateReadedCount($this->board->readed_count, $this->board->srl);
	}
	
	public function getSkinXmlContents()
	{
		if (file_exists($this->board->xml_path)) 
		{
			return simplexml_load_string(file_get_contents($this->board->xml_path));
		}
		
		return null;
	}
	
	public function getCurrentListCount()
	{
		return ($this->board->page - 1) * $this->board->list_count;
	}
	
	public function getReadedCount() 
	{
		return ++$this->board->document['readed'];
	}
	
	public function setBoardSkin() 
	{
		$skin = $this->base->get('skin');
		$this->getContentRet($skin, 'board');
	}
	
	public function getDocumentCountbyCategory()
	{
		return $this->board->query->getDocumentCountbyCategory($this->board->module_id, $this->getParam('category'));
	}
	
	public function getDocumentlistBetweenbyCategory()
	{
		return $this->board->query->getDocumentlistBetweenbyCategory($this->board->module_id, $this->board->page_start, $this->board->list_count, $this->getParam('category'));
	}
	
	public function getDocumentlistBetweenbyCategoryArticle()
	{
		return $this->board->query->getDocumentlistBetweenbyCategoryArticle($this->board->module_id, $this->board->page_start, $this->board->list_count, $this->board->category, $this->board->keyword, $this->board->type);
	}

	public function getDocumentItem()
	{
		return $this->board->query->getDocumentItem($this->board->srl);
	}
	
	public function getTagList()
	{
		return $this->board->query->getTagList();
	}
	
	public function getDocumentCountbyTag()
	{
		return $this->board->query->getDocumentCountbyTag($this->board->module_id, $this->board->tag);
	}
	
	public function getDocumentCountbyBoardId()
	{
		return $this->board->query->getDocumentCountbyBoardId($this->board->module_id);
	}
	
	public function getPopularDocumentList()
	{
		return $this->board->query->getPopularDocumentList($this->board->module_id, 0, $this->board->page_start, $this->board->list_count);
	}
	
	public function getDocumentlistBetweenbyGenre()
	{
		return $this->board->query->getDocumentlistBetweenbyGenre($this->board->module_id, $this->board->page_start, $this->board->list_count, $this->board->genre);
	}
	
	public function getDocumentlistBetweenbyOriginTitle()
	{
		return $this->board->query->getDocumentlistBetweenbyOriginTitle($this->board->module_id, $this->board->page_start, $this->board->keyword);
	}
	
	public function getDocumenCountbyOriginTitle()
	{
		return $this->board->query->getDocumenCountbyOriginTitle($this->board->module_id, $this->board->page_start, $this->board->keyword);
	}
	
	public function getDocumentlistBetweenbyOriginAlbum()
	{
		return $this->board->query->getDocumentlistBetweenbyOriginAlbum($this->board->module_id, $this->board->page_start, $this->board->keyword);
	}
	
	public function getDocumenCountbyOriginAlbum()
	{
		return $this->board->query->getDocumenCountbyOriginAlbum($this->board->module_id, $this->board->page_start, $this->board->keyword);
	}
	
	public function getDocumentlistBetweenbyAuthor()
	{
		return $this->board->query->getDocumentlistBetweenbyAuthor($this->board->module_id, $this->board->page_start, $this->board->keyword);
	}
	
	public function getDocumenCountbyAuthor()
	{
		return $this->board->query->getDocumenCountbyAuthor($this->board->module_id, $this->board->page_start, $page_end, $this->board->keyword);
	}
	
	public function getDocumentlistBetweenbyTag()
	{
		return $this->board->query->getDocumentlistBetweenbyTag($this->board->module_id, $this->board->page_start, $this->board->keyword);
	}
	
	public function getDocumenCountbyTag()
	{
		return $this->board->query->getDocumenCountbyTag($this->board->module_id, $this->board->page_start, $page_end, $this->board->keyword);
	}
	
	public function getDocumentlistBetweenbyTitle()
	{
		return $this->board->query->getDocumentlistBetweenbyTitle($this->board->module_id, $this->board->page_start, $this->board->keyword);
	}
	
	public function getDocumenCountbyTitle()
	{
		return $this->board->query->getDocumenCountbyTitle($this->board->module_id, $this->board->page_start, $this->board->keyword);
	}
	
	public function getDocumentListbyColumn()
	{
		return $this->board->query->getDocumentListbyColumn($this->board->module_id, $this->board->page_start, $this->board->keyword, $this->board->type);
	}
	
	public function getDocumenCountbyColumn()
	{
		return $this->board->query->getDocumenCountbyColumn($this->board->module_id, $this->board->page_start, $this->board->keyword, $this->board->type);
	}
	
	public function getDocumentCountbyGenre()
	{
		return $this->board->query->getDocumentCountbyGenre($this->board->module_id, $this->board->genre);
	}
	
	public function getDocumentListbyArticle($article)
	{
		return $this->board->query->getDocumentListbyArticle($this->board->module_id, $this->board->page_start, $this->board->list_count, $article);
	}
	
	public function getVotedCommentList($moduleid, $srl, $cpage, $ccount) 
	{
		$oCommentModel = $this->base->getModel('comment');
		
		return $oCommentModel->getVotedCommentList($moduleid, $srl, $cpage, $ccount);
	}
	
	public function getDocumentlistBetweenCategory()
	{
		return $this->board->query->getDocumentlistBetweenCategory($this->board->module_id, $this->board->page_start, $page_end, $this->board->tag);
	}
	
	public function getTagRelatedDocumentSrl()
	{
		return $this->board->query->getTagRelatedDocumentSrl($this->board->module_id, $this->board->document['tag']);
	}
	
	public function getDocumentListInDocumentSrls($documentSrls)
	{
		return $this->board->query->getDocumentListInDocumentSrls($documentSrls, $this->board->module_id, $this->board->page_start);
	}
	
	public function getRelatedTagList($list_count)
	{
		return $this->board->query->getRelatedTagList($this->board->module_id, $this->board->relatedTagList->currentTagIndex, $list_count, $this->board->document['tag']);
	}
	
	public function getBlamedCommentList($moduleid, $srl, $cpage, $ccount) 
	{
		$oCommentModel = $this->base->getModel('comment');
		
		return $oCommentModel->getBlamedCommentList($moduleid, $srl, $cpage, $ccount);
	}
	
	public function getDocumentListGAP()
	{
		$startPage = 1;
		$endPage = $this->board->page_start > 1 ? $this->board->page_start : 1;
		$gapPagePrev = $this->board->model->getGapInModule($startPage, $endPage, $this->board->module_id)->data();
		$this->board->page_start = $this->board->page_start + ($gapPagePrev);
	
		$startPage = $this->board->page_start > 1 ? $this->board->page_start : 1;
		$endPage = $this->board->page_end;
		$gapPageNext = $this->board->model->getGapInModule($startPage, $endPage, $this->board->module_id)->data();
		$this->board->page_end = $this->board->page_end + ($gapPageNext) + ($gapPagePrev);
	}
	
	public function getDocumentListLEFTJOIN()
	{
		return array_reverse($this->board->query->getDocumentListLEFTJOIN($this->getParam(__MODULEID), $this->board->page_start, $this->board->board_count));
	}
	
	public function getDocumentListJOIN()
	{
		return array_reverse($this->board->query->getDocumentListJOIN($this->getParam(__MODULEID), $this->board->page_start, $this->board->board_count));
	}
			
	public function getDocumentListLIMIT()
	{
		return $this->board->query->getDocumentListLIMIT($this->getParam(__MODULEID), $this->board->page_start, $this->board->board_count);
	}
	
	public function getCommentList() 
	{
		$oCommentModel = $this->base->getModel('comment');
		
		return $oCommentModel->getCommentList($this->board->module_id, $this->board->srl, $this->board->comment_page, $this->board->comment_listcount);
	}
			
	public function getCommentCount($moduleid, $srl) 
	{
		$oCommentModel = $this->base->getModel('comment');
		
		return $oCommentModel->getCommentCount($moduleid, $srl);
	}
	
	public function getDocumentCountbyCategoryArticle()
	{
		return $this->board->query->getDocumentCountbyCategoryArticle($this->board->module_id, $this->getParam('category'), $this->board->keyword, $this->board->type);
	}
	
	public function setEditor()
	{
		$this->base->set('editor', $this->getEditor());
	}
	
	public function setDocumentWriteTplPath()
	{
		$this->base->set('skin', sprintf(__WRITE_TPL__, $this->board->skin_tpl_path));
	}
	
	public function setDeleteDocumentTplPath()
	{
		$this->base->set('skin', sprintf(__DELETE_TPL__, $this->board->skin_tpl_path));
	}
	
	public function getSrl()
	{
		return $this->getParam('srl');
	}
	
	public function getAlbum()
	{
		return $this->board->query->getAlbum($this->board->page_start);
	}
	
	public function getCategoryList()
	{
		return $this->board->query->getCategoryList($this->board->module_id);
	}
	
	public function getOriginAlbum()
	{
		return $this->board->query->getOriginAlbum($this->board->page_start);
	}
	
	public function getModuleID()
	{
		return $this->getParam(__MODULEID);
	}
		
	public function getPopularFilesCount()
	{
		return $this->board->query->getPopularFilesCount($this->board->module_id, $this->board->popular_count);
	}
	
	public function setTagTplPath()
	{
		$this->base->set('skin', sprintf(__TAG_TPL__, $this->board->skin_tpl_path));
	}
	
	public function setAuthorTplPath()
	{
		$this->base->set('skin', sprintf(__AUTHOR_TPL__, $this->board->skin_tpl_path));
	}
	
	public function getCurrentUserExtraVars()
	{
		$memberExtraVars = $this->board->query->getMemberExvar($this->getUserId());
		return unserialize($memberExtraVars);
	}
	
	public function setBoardTplPath()
	{
		$this->base->set('skin', sprintf(__BOARD_TPL__, $this->board->skin_tpl_path));
	}
	
	public function setWriteTplPath()
	{
		$this->base->set('skin', sprintf(__WRITE_TPL__, $this->board->skin_tpl_path));
	}
	
	public function setAlbumViewTplPath()
	{
		$this->base->set('skin', sprintf(__ALBUM_VIEW_TPL__, $this->board->skin_tpl_path));
	}
	
	public function setAlbumTplPath()
	{
		$this->base->set('skin', sprintf(__ALBUM_TPL__, $this->board->skin_tpl_path));
	}
	
	public function setOriginTplPath()
	{
		$this->base->set('skin', sprintf(__ORIGIN_TPL__, $this->board->skin_tpl_path));
	}
	
	public function getCategoryListWithoutSubCategory()
	{
		return $this->board->query->getCategoryListWithoutSubCategory($this->board->module_id);
	}
	
	public function getCurrentRelatedTagListPage()
	{
		return (int)ceil(($this->board->relatedTagList->currentTagIndex + $this->board->relatedTagList->list_count) / $this->board->relatedTagList->list_count);
	}
	
	public function getCommentListCount()
	{
		return $this->board->config->comment_count ? $this->board->config->comment_count : 20;
	}
	
	public function getCurrentCommentCPage()
	{
		return ($this->board->cpage - 1) * $this->board->comment_listcount;
	}
	
	public function getCommentCPage()
	{
		return $this->getParam('cpage') ? $this->getParam('cpage') : 1;
	}
	
	public function getPage()
	{
		return $this->getParam('page') ? $this->getParam('page') : 1;
	}
	
	public function getCategorySrl()
	{
		return $this->getParam('category') ? $this->getParam('category') : null;
	}
	
	public function getListCount()
	{
		$list_count = $this->board->config->list_count ? $this->board->config->list_count : 20;
		$list_count = $this->getParam('list_count') ? $this->getParam('list_count') : $list_count;
		
		return $list_count;
	}
	
	public function sortByStarCount()
	{
		$this->board->page_start = $this->getCurrentListCount();
		$this->board->result = $this->getDocumentListbyArticle("star");
	}
	
	public function sortByRegdate()
	{
		$this->board->page_start = $this->getCurrentListCount();
		$this->board->result = $this->getDocumentListbyArticle("regdate");
	}
	
	public function sortByCategory()
	{
		$this->board->page_start = $this->getCurrentListCount();
		$this->board->result = $this->getDocumentListbyArticle("category");
	}
	
	public function sortByVotedCount()
	{
		$this->board->page_start = $this->getCurrentListCount();
		$this->board->result = $this->getDocumentListbyArticle("voted");
	}
	
	public function sortByArtist()
	{
		$this->board->page_start = $this->getCurrentListCount();
		$this->board->result = $this->getDocumentListbyArticle("artist");
	}
	
	public function sortByDownloadCount()
	{
		$this->board->page_start = $this->getCurrentListCount();
		$this->board->result = $this->getPopularDocumentList();
	}
	
	public function sortByPlaytime()
	{
		$this->board->page_start = $this->getCurrentListCount();
		$this->board->result = $this->getDocumentListbyArticle("playtime");
	}
	
	public function sortByReadedCount()
	{
		$this->board->page_start = $this->getCurrentListCount();
		$this->board->result = $this->getDocumentListbyArticle("readed");
	}
	
	public function setTitleOriginList()
	{
		$this->board->document_count = $this->getDocumenCountbyOriginTitle();
		$this->board->page_start = $this->getCurrentListCount();
		$this->board->result = $this->getDocumentlistBetweenbyOriginTitle();
	}
	
	public function setAlbumOriginList()
	{
		$this->board->document_count = $this->getDocumenCountbyOriginAlbum();
		$this->board->page_start = $this->getCurrentListCount();
		$this->board->result = $this->getDocumentlistBetweenbyOriginAlbum();
	}
	
	public function setArtistList()
	{
		$this->board->document_count = $this->getDocumenCountbyAuthor();
		$this->board->page_start = $this->getCurrentListCount();
		$this->board->result = $this->getDocumentlistBetweenbyAuthor();
	}
	
	public function setTagList()
	{
		$this->board->document_count = $this->getDocumenCountbyTag();
		$this->board->page_start = $this->getCurrentListCount();
		$this->board->result = $this->getDocumentlistBetweenbyTag();
	}
	
	public function setTitleList()
	{
		$this->board->document_count = $this->getDocumenCountbyTitle();
		$this->board->page_start = $this->getCurrentListCount();
		$this->board->result = $this->getDocumentlistBetweenbyTitle();
	}
	
	public function setDocumentRange()
	{
		$query_count = $this->board->document_count - ($this->board->page * $this->board->list_count);
		
		$this->board->page_start = (int)$query_count > 0 ? $query_count : 0;
		$this->board->page_end = (int)$this->board->page_start + $this->board->list_count - 1;
		$this->board->board_count = (int)$query_count > 0 ? $this->board->list_count : $this->board->list_count + $query_count;
	}
	
	public function getFileList($srl) 
	{
		$oFilesModel = $this->base->getModel('files');
		$fileSequence = $oFilesModel->getDocumentFileSequence($srl);
		$fileList = $oFilesModel->getFileList($fileSequence);
		
		return $fileList;
	}
	
	public function getUserId() 
	{
		return $this->base->getUserId();
	}
	
	public function isLogged() 
	{
		return $this->base->isLogged();
	}
	
	public function getEditor() 
	{
		$oEditorView = $this->base->getView('editor');
		$editorContent = $oEditorView->getEditor();
		
		return $editorContent;
	}
	
	public function hasGrant($hasAdmin) 
	{
		return $this->base->hasGrant($hasAdmin);
	}
	
	public function getParam($var) 
	{
		return $this->base->get_params($var);
	}
	
}

?>