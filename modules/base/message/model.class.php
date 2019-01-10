<?php

	if(!defined("__FLOWER__")) exit();

	class message_model extends message
	{
		
		function __construct()
		{
		}
		
		function getMenu()
		{
			
			$this->menu = array(
				array(
					__MODULEID=>"home",
					"title"=>"메인페이지",
					"link"=>str::getUrl('',__MODULEID,'home')
				),
				array(
					__MODULEID=>"musicvideo",
					"title"=>"뮤직비디오",
					"link"=>str::getUrl('',__MODULEID,'musicvideo')
				),
				array(
					__MODULEID=>"index",
					"title"=>"JPOP",
					"link"=>str::getUrl('',__MODULEID,'index'),
					"submenu"=>array(
						array(
							"link"=>str::getUrl('',__MODULEID,'index','act','dispBoardAlbum'),
							"title"=>"앨범"
						),
						array(
							"link"=>str::getUrl('',__MODULEID,'index','act','dispBoardOrigin'),
							"title"=>"오리지널 앨범"
						)
					)
				)
			);
			
			return $this->menu;
		}
		
	}
?>