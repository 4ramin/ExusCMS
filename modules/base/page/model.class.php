<?php

	if(!defined("__FLOWER__")) exit();

	class Page_Model extends page{
		
		protected $pdo;
		
		function __construct(){
			$this->base = new base();
			$this->pdo = $this->base->getPDO();
		}
		
	}
?>