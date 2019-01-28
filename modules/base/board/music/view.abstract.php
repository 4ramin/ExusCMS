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
		
		public function getCurrentCommentListCount() 
		{
			return ($this->board->cpage - 1) * $this->board->comment_listcount;
		}
		
		public function getAllOriginAlbum() 
		{
			return $this->board->model->getAllOriginAlbum($this->board->album);
		}
		
		public function getOriginAlbumbysrl() 
		{
			return $this->board->model->getOriginAlbumbysrl($this->board->related);
		}
		
		public function updateReadedCount() 
		{
			$this->board->model->UpdateReadedCount($this->board->readed_count, $this->board->srl);
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
			return $this->board->model->getDocumentCountbyCategory($this->board->module_id, $this->getParam('category'));
		}
		
		public function getDocumentlistBetweenbyCategory()
		{
			return $this->board->model->getDocumentlistBetweenbyCategory($this->board->module_id, $this->board->page_start, $this->board->list_count, $this->getParam('category'));
		}
		
		public function getDocumentlistBetweenbyCategoryArticle()
		{
			return $this->board->model->getDocumentlistBetweenbyCategoryArticle($this->board->module_id, $this->board->page_start, $this->board->list_count, $this->board->category, $this->board->keyword, $this->board->type);
		}
	
		public function getDocumentItem()
		{
			return $this->board->model->getDocumentItem($this->board->srl);
		}
		
		public function getTagList()
		{
			return $this->board->model->getTagList();
		}
		
		public function getDocumentCountbyTag()
		{
			return $this->board->model->getDocumentCountbyTag($this->board->module_id, $this->board->tag);
		}
		
		public function getDocumentCountbyBoardId()
		{
			return $this->board->model->getDocumentCountbyBoardId($this->board->module_id);
		}
		
		public function getPopularDocumentList()
		{
			return $this->board->model->getPopularDocumentList($this->board->module_id, 0, $this->board->page_start, $this->board->list_count);
		}
		
		public function getDocumentlistBetweenbyGenre()
		{
			return $this->board->model->getDocumentlistBetweenbyGenre($this->board->module_id, $this->board->page_start, $this->board->list_count, $this->board->genre);
		}
		
		public function getDocumentlistBetweenbyOriginTitle()
		{
			return $this->board->model->getDocumentlistBetweenbyOriginTitle($this->board->module_id, $this->board->page_start, $this->board->keyword);
		}
		
		public function getDocumenCountbyOriginTitle()
		{
			return $this->board->model->getDocumenCountbyOriginTitle($this->board->module_id, $this->board->page_start, $this->board->keyword);
		}
		
		public function getDocumentlistBetweenbyOriginAlbum()
		{
			return $this->board->model->getDocumentlistBetweenbyOriginAlbum($this->board->module_id, $this->board->page_start, $this->board->keyword);
		}
		
		public function getDocumenCountbyOriginAlbum()
		{
			return $this->board->model->getDocumenCountbyOriginAlbum($this->board->module_id, $this->board->page_start, $this->board->keyword);
		}
		
		public function getDocumentlistBetweenbyAuthor()
		{
			return $this->board->model->getDocumentlistBetweenbyAuthor($this->board->module_id, $this->board->page_start, $this->board->keyword);
		}
		
		public function getDocumenCountbyAuthor()
		{
			return $this->board->model->getDocumenCountbyAuthor($this->board->module_id, $this->board->page_start, $page_end, $this->board->keyword);
		}
		
		public function getDocumentlistBetweenbyTag()
		{
			return $this->board->model->getDocumentlistBetweenbyTag($this->board->module_id, $this->board->page_start, $this->board->keyword);
		}
		
		public function getDocumenCountbyTag()
		{
			return $this->board->model->getDocumenCountbyTag($this->board->module_id, $this->board->page_start, $page_end, $this->board->keyword);
		}
		
		public function getDocumentlistBetweenbyTitle()
		{
			return $this->board->model->getDocumentlistBetweenbyTitle($this->board->module_id, $this->board->page_start, $this->board->keyword);
		}
		
		public function getDocumenCountbyTitle()
		{
			return $this->board->model->getDocumenCountbyTitle($this->board->module_id, $this->board->page_start, $this->board->keyword);
		}
		
		public function getDocumentListbyColumn()
		{
			return $this->board->model->getDocumentListbyColumn($this->board->module_id, $this->board->page_start, $this->board->keyword, $this->board->type);
		}
		
		public function getDocumenCountbyColumn()
		{
			return $this->board->model->getDocumenCountbyColumn($this->board->module_id, $this->board->page_start, $this->board->keyword, $this->board->type);
		}
		
		public function getDocumentCountbyGenre()
		{
			return $this->board->model->getDocumentCountbyGenre($this->board->module_id, $this->board->genre);
		}
		
		public function getDocumentListbyArticle($article)
		{
			return $this->board->model->getDocumentListbyArticle($this->board->module_id, $this->board->page_start, $this->board->list_count, $article);
		}
		
		public function getVotedCommentList($moduleid, $srl, $cpage, $ccount) 
		{
			$oCommentModel = $this->base->getModel('comment');
			
			return $oCommentModel->getVotedCommentList($moduleid, $srl, $cpage, $ccount);
		}
		
		public function getDocumentlistBetweenCategory()
		{
			return $this->board->model->getDocumentlistBetweenCategory($this->board->module_id, $this->board->page_start, $page_end, $this->board->tag);
		}
		
		public function getTagRelatedDocumentSrl()
		{
			return $this->board->model->getTagRelatedDocumentSrl($this->board->module_id, $this->board->document['tag']);
		}
		
		public function getDocumentListInDocumentSrls($documentSrls)
		{
			return $this->board->model->getDocumentListInDocumentSrls($documentSrls, $this->board->module_id, $this->board->page_start);
		}
		
		public function getRelatedTagList($list_count)
		{
			return $this->board->model->getRelatedTagList($this->board->module_id, $this->board->relatedTagList->currentTagIndex, $list_count, $this->board->document['tag']);
		}
		
		public function getBlamedCommentList($moduleid, $srl, $cpage, $ccount) 
		{
			$oCommentModel = $this->base->getModel('comment');
			
			return $oCommentModel->getBlamedCommentList($moduleid, $srl, $cpage, $ccount);
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
			$this->base->set('skin', sprintf("%s/delete.php", $this->board->skin_tpl_path));
		}
		
		public function getAlbum()
		{
			return $this->board->model->getAlbum($this->board->page_start);
		}
		
		public function getCategoryList()
		{
			return $this->board->model->getCategoryList($this->board->module_id);
		}
		
		public function getOriginAlbum()
		{
			return $this->board->model->getOriginAlbum($this->board->page_start);
		}
		
		public function setAuthorTplPath()
		{
			$this->base->set('skin', sprintf("%s/author.php", $this->board->skin_tpl_path));
		}
		
		public function setBoardTplPath()
		{
			$this->base->set('skin', sprintf("%s/board.php", $this->board->skin_tpl_path));
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
			return $this->board->model->getCategoryListWithoutSubCategory($this->board->module_id);
		}
		
		public function getCurrentRelatedTagListPage()
		{
			return (int)ceil(($this->board->relatedTagList->currentTagIndex + $this->board->relatedTagList->list_count) / $this->board->relatedTagList->list_count);
		}
		
		public function getCommentListCount()
		{
			return $this->board->config->comment_count ? $this->board->config->comment_count : 20;
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