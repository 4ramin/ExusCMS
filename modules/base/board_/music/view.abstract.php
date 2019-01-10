<?php

	abstract class view_abstract extends board 
	{
		
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
		
		public function setBoardSkin() 
		{
			$skin = $this->base->get('skin');
			$this->getContentRet($skin, 'board');
		}
				
		public function getVotedCommentList($moduleid, $srl, $cpage, $ccount) 
		{
			$oCommentModel = $this->base->getModel('comment');
			
			return $oCommentModel->getVotedCommentList($moduleid, $srl, $cpage, $ccount);
		}
		
		public function getBlamedCommentList($moduleid, $srl, $cpage, $ccount) 
		{
			$oCommentModel = $this->base->getModel('comment');
			
			return $oCommentModel->getBlamedCommentList($moduleid, $srl, $cpage, $ccount);
		}
				
		public function getCommentList($moduleid, $srl, $cpage, $listcount) 
		{
			$oCommentModel = $this->base->getModel('comment');
			
			return $oCommentModel->getCommentList($moduleid, $srl, $cpage, $listcount);
		}
				
		public function getCommentCount($moduleid, $srl) 
		{
			$oCommentModel = $this->base->getModel('comment');
			
			return $oCommentModel->getCommentCount($moduleid, $srl);
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