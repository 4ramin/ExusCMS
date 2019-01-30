<?php

abstract class controller_abstract extends board 
{
	
	abstract function procBoardCategoryMoveFolder();
	abstract function procBoardCategoryFolderOut();
	abstract function procBoardCategoryMove();
	abstract function getAudiolyrics();
	abstract function procAddPlaylist();
	abstract function insertDocument();
	abstract function procBoardCategoryRename();
	abstract function procBoardCategoryRemove();
	abstract function procInsertCategory();
	abstract function deleteDocument();
	abstract function procBoardBlame();
	abstract function procBoardStar();
	abstract function procBoardVote();
	abstract function procBoardRelatedList();
	abstract function procRandomDocument();
	abstract function procRandomMusic();
	abstract function procBoardUpdateSinger();
	abstract function procBoardUpdateGenre();
	abstract function procBoardSetup();
	
	public function setMessage($msg)
	{
		return $this->base->response("type", "success", "html", $msg);
	}
	
	public function redirectToCategorySetup()
	{
		$args = va::args();
		$args->location = str::getUrl('', __MODULEID, $this->post_data->module, 'act', 'dispBoardCategorySetup');
		header::move($args);
	}
	
	public function setError($errorMsg)
	{
		return $this->base->response("type", "error", "html", $errorMsg);
	}
	
	public function deleteCategory()
	{
		$this->board->query->deleteCategory($this->post_data->category_srl, $this->post_data->module);
	}
	
	public function redirectToModule()
	{
		$args = va::args();
		$args->location = str::getUrl('', __MODULEID, $this->post_data->mid);
		header::move($args);
	}
	
	public function deleteAttachmentFiles()
	{
		$oFilesModel = $this->base->getModel('files');
		$oFilesModel->deleteAllAttachmentFiles($this->post_data->srl);
	}
	
	public function deleteDocument()
	{
		$this->board->query->deleteDocument($this->post_data->srl, $this->post_data->mid);
	}
	
	public function getUserId()
	{
		return $this->base->getUserId();
	}
	
	public function isLogged()
	{
		return $this->base->isLogged();
	}
	
	public function hasGrant($hasAdmin)
	{
		return $this->base->hasGrant($hasAdmin);
	}
	
	public function updateArtist()
	{
		$this->board->query->UpdateArtist($this->post_data->srl, $this->post_data->md, $this->post_data->singer);
	}
	
	public function redirectToDocumentPage()
	{
		$args = va::args();
		$args->location = str::getUrl('', __MODULEID, $this->post_data->mid, 'srl', $this->post_data->srl);
		header::move($args);
	}
	
	public function getVotedCount()
	{
		return $this->board->query->getVotedCount($this->post_data->srl);
	}
	
	public function updateGenre()
	{
		$this->board->query->UpdateGenre($this->post_data->srl, $this->post_data->md, $this->post_data->genre);
	}
	
	public function getFileList($srl)
	{
		$oFilesModel = $this->base->getModel('files');
		$srl = $oFilesModel->getDocumentFileSequence($srl);
		return $oFilesModel->getFileList($srl);
	}
	
	public function getModuleConfigCount($module_setup)
	{
		$oModuleModel = $this->base->getModel('module');
		return $oModuleModel->getModuleConfigCount($module_setup);
	}
	
	public function getModuleConfig($module_setup)
	{
		$oModuleModel = $this->base->getModel('module');
		return $oModuleModel->getModuleConfig($module_setup);
	}
	
	public function insertModuleConfig($module_setup)
	{
		$oModuleModel = $this->base->getModel('module');
		$oModuleModel->insertModuleConfig($module_setup);
	}
	
	public function updateModuleConfig($module_setup, $config)
	{
		$oModuleModel = $this->base->getModel('module');
		$oModuleModel->updateModuleConfig($module_setup, $config);
	}
	
	public function updateModuleLayout($module_setup, $config)
	{
		$oModuleModel = $this->base->getModel('module');
		$oModuleModel->updateModuleLayout($module_setup, $config);
	}
	
	public function updateModuleTitle($module_setup, $config)
	{
		$oModuleModel = $this->base->getModel('module');
		$oModuleModel->updateModuleTitle($module_setup, $config);
	}
	
	public function viewLoginPage()
	{
		$oMemberView = $this->base->getView('member');
		return $oMemberView->dispMemberLogin();
	}
	
	public function getParam($var) 
	{
		return $this->base->post_params($var);
	}
	
}

?>