<?php

final class board_install 
{
	
	function isInstalled()
	{
		$oModuleModel = $this->base->getModel('module');
		return $oModuleModel->isModuleInstalled;
	}
	
}

?>