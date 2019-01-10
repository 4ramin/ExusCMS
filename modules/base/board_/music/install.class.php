<?php

	if(!defined("__FLOWER__")) exit();

	final class board_install 
	{
		
		function isInstalled()
		{
			$oModuleModel = $this->base->getModel('module');
			return $oModuleModel->isModuleInstalled;
		}
		
	}
	
?>