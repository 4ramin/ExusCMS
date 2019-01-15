<?php

	if (!defined("__FLOWER__")) exit();

	class search_item extends ModuleObject
	{
		
		function __construct($args, $query) 
		{
			$this->query = $query;
			$this->base = $args->base;
			$this->search = $args->search;
		}
		
		function getPlayTime() 
		{
			return $this->query['playtime'] ? date('i:s',$this->query['playtime']) : 0;
		}
		
		function getFileList($srl) 
		{
			$oFilesModel = $this->base->getModel('files');
			
			if ($srl) 
			{
				$this->file_list = $oFilesModel->getFileList($srl);
			}
			else if ($this->query['srl']) 
			{
				$this->file_list = $oFilesModel->getFileList($this->query['srl']);
			}
			
			return $this->file_list;
		}
		
		function isImageExists() 
		{
			if ($this->query['srl']) 
			{
				$this->file_list = $this->getFileList($this->query['srl']);
			}
			
			foreach ($this->file_list as $key => $fileInfo) 
			{
				if (maya::execute('@\||/@+.+!jpg||png!', $fileInfo['files'],'boolean')) 
				{
					return true;
				}
			}
			
			return false;
		}
		
		function getFormatRegdate() 
		{
			return date("Y.m.d H:i:s",strtotime($this->query['regdate']));
		}
		
		function makeThumbnail($thumbnail_width, $thumbnail_height) 
		{
			if ($this->query['srl']) 
			{
				$this->file_list = $this->getFileList($this->query['srl']);
			}
			
			foreach($this->file_list as $key=>$flst) 
			{
				if (maya::execute('@\@+.+!jpg||png||gif||jpeg!', $flst['files'],'boolean'))
				{
					return $this->base->makeThumbnail($flst['files'],$this->query['srl'], $thumbnail_width, $thumbnail_height);
				}
			}
		}
		
		function isThumbnailExists() 
		{
			$oFilesModel = $this->base->getModel('files');
			$thumbnail_exists = $oFilesModel->isThumbnailExist($this->query['srl']);
			if (!$thumbnail_exists) 
			{
				$this->makeThumbnail();
			} 
			else 
			{
				return true;
			}
	
			return $thumbnail_exists;
		}
		
		function getTitle($cut) 
		{
			if ($cut) 
			{
				return $this->base->cut_str($this->query['title'], $cut);
			} 
			else 
			{
				return $this->query['title'];
			}
		}
		
	}
?>