<?php

class tag_item extends BaseObject
{
	
	function __construct($args = array(), $query = array()) 
	{
		$this->query = $query;
		$this->base = new base();
	}
	
	function isCurrentItem() 
	{
		$doucmentSrl = $this->base->get_params('srl');
		if ($doucmentSrl == $this->query['srl'])
		{
			return true;
		}
		
		return false;
	}
	
	function getTagLink()
	{
		return str::getUrl('srl', $this->query['srl']);
	}
	
	function getTitle()
	{
		return $this->query['title'];
	}
	
	function getAudioLink()
	{
		$audioSource = "";
		$oFilesModel = $this->base->getModel('files');
		$fileList = $oFilesModel->getFileList($this->query['srl']);
		
		foreach($fileList as $key=>$flst)
		{
			if(maya::execute('@\||/@!mp3||wav!', $flst['files'],'boolean')){
				$audioSource = sprintf("/attach/file/%s/%s", $tdoc['srl'], $flst['files']);
				break;
			}
		}
		
		return $audioSource;
	}
}

?>
