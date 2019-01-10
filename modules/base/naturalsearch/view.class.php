<?php

	if(!defined("__FLOWER__")) exit();

	class naturalsearch_view extends naturalsearch
	{
		
		function __construct()
		{
			parent::getHandler(TRUE);
		}
		
		function init($args)
		{
			$this->naturalsearch = new stdClass;
			$this->naturalsearch->module = $args->module;
			
			return $this->naturalsearch;
		}
		
	}
?>