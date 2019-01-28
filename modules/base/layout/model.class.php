<?php

class layout_model extends layout{
	
	function __construct(){
	}
	
	function getMenu(){
		$this->menu = array(
			array(
				__MODULEID=>"home",
				"title"=>"메인페이지",
				"link"=>str::getUrl('',__MODULEID,'home')
			),
			array(
				__MODULEID=>"humor",
				"title"=>"유머 게시판",
				"link"=>str::getUrl('',__MODULEID,'humor'),
				"submenu" => array(
					array(
						__MODULEID=>"index",
						"link"=>str::getUrl('',__MODULEID,'index'),
						"title"=>"공지사항"
					),
					array(
						__MODULEID=>"nonogram",
						"title"=>"노노그램",
						"link"=>str::getUrl('',__MODULEID,'nonogram')
					)
				)
			)
		);
		
		return $this->menu;
	}
	
}

?>