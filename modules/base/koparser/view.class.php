<?php

	if(!defined("__FLOWER__")) exit();

	class koparser_view extends koparser
	{
		
		var $args = array();
		
		function __construct(){
			$this->base = new base();
		}
		
		function init($args){
			$this->koparser = new stdClass;
			return $this->koparser;
		}
		
	}
?>