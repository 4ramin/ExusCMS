<?php

	if(!defined("__FLOWER__")) exit();

	class rss_view extends rss
	{
		
		var $args = array();
		
		function __construct()
		{
			$this->base = new base();
		}
		
		function init($args)
		{
			$this->rss = new stdClass;
			
			return $this->rss;
		}
		
		function rss()
		{
			header('Content-Type: text/xml; charset=utf-8');
			$this->rss->result = $this->rss->model->getDocumentListLIMIT(0);
			echo $this->getContentRet(sprintf("%s/rss.php", $this->rss->tpl_path), true);
			exit();
		}
		
	}
?>