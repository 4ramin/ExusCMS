<?php

	abstract class controller_abstract extends board 
	{
		
		abstract function procBoardCategoryMoveFolder();
		
		abstract function procBoardCategoryFolderOut();
		
		abstract function procBoardCategoryMove();
		
		abstract function getAudiolyrics();
		
		abstract function pushPlaylist();
		
		abstract function insertDocument();
		
		abstract function procBoardBlame();
		
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
		
	}
	
?>