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
	
	public function getLyrics()
	{
		return htmlspecialchars_decode($this->board->query->getLysicsFull($this->post_data->module, $this->post_data->srl));
	}
	
	public function insertCategory()
	{
		$this->board->query->insertCategory($this->post_data->ai, $this->post_data->type, $this->post_data->module, $this->post_data->name);
	}
	
	public function setError($errorMsg)
	{
		return $this->base->response("type", "error", "html", $errorMsg);
	}
	
	public function deleteCategory()
	{
		$this->board->query->deleteCategory($this->post_data->category_srl, $this->post_data->module);
	}
	
	public function getDecodedSrl()
	{
		return $request::decodeBinaryNumberic($this->getParam('srl'));
	}
	
	public function getNextSequence()
	{
		return $this->board->query->getBoardSequence($this->post_data->mid);
	}
	
	public function setRedirectSrl()
	{
		$this->board->redirectSrl = 0;
		if (isset($this->board->lastID)) 
		{
			$this->board->redirectSrl = $this->board->lastID;
		}
		else
		{
			$this->board->redirectSrl = $this->post_data->srl;
		}
	}
	
	public function clearCache()
	{
		if (isset($this->post_data->mid)) 
		{
			unset($GLOBALS['__DOCUMENT__COUNT__QUERY__'.$this->post_data->mid]);
		}
	}
	
	public function unsetFileSequence()
	{
		if (isset($_SESSION['target_srl']))
		{
			unset($_SESSION['target_srl']);
		}
	}
	
	public function hasCategory()
	{
		if (isset($this->post_data->category_srl))
		{
			return true;
		}
		
		return false;
	}
	
	public function hasContent()
	{
		if (isset($this->post_data->content))
		{
			return true;
		}
		
		return false;
	}
	
	public function hasTitle()
	{
		if (isset($this->post_data->title))
		{
			return true;
		}
		
		return false;
	}
	
	public function hasSrl()
	{
		if (!is_int($this->post_data->srl))
		{
			return false;
		}
		
		if (isset($this->post_data->srl))
		{
			return true;
		}
		
		return false;
	}
	
	public function insertExtraVars()
	{
		foreach ($this->board->extra_var as $val) 
		{
			if (isset($_POST[$val['val']])) 
			{
				$extra_vars_key = $val['val'];
				$extra_vars_val = $_POST[$val['val']];
				$this->board->query->insertExtraVar($this->board->lastID, $extra_vars_key, $extra_vars_val);
			}
		}
	}
	
	public function redirectBySrl()
	{
		$args = va::args();
		$args->location = str::getUrl('', __MODULEID, $this->post_data->mid, 'srl', $this->board->redirectSrl);
		header::move($args);
	}
	
	public function insertDocumentItem()
	{
		$this->board->query->insertDocument(
			$this->post_data->title,
			$this->post_data->content,
			date("Ymdhis"),
			$this->post_data->nickname,
			$this->post_data->mid,
			$this->post_data->category_srl,
			$this->board->lastID,
			$this->post_data->fileSequence,
			$this->post_data->tag_list,
			$this->post_data->memberSrl
		);
	}
	
	public function updateDocument()
	{
		$this->board->query->updateDocument(
			$this->post_data->title,
			$this->post_data->content,
			date("Ymdhis"),
			$this->post_data->nickname,
			$this->post_data->mid,
			$this->post_data->category_srl,
			$this->post_data->srl,
			$this->post_data->fileSequence,
			$this->post_data->tag_list
		);
	}
	
	public function isValidFileSequence()
	{
		if (!isset($_SESSION['target_srl']))
		{
			return true;
		}
		
		if ($_SESSION['target_srl'] === $this->post_data->fileSequence)
		{
			return true;
		}
		
		return false;
	}
	
	public function isDocumentAuthor()
	{
		$oDocument = $this->board->query->getDocumentItem($this->post_data->srl);
		$memberSrl = $this->base->getMemberSrl();
		$documentMemberSrl = $oDocument['member_srl'];
		
		if ($memberSrl === $documentMemberSrl)
		{
			return true;
		}
		
		return false;
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
	
	public function deleteDocumentItem()
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