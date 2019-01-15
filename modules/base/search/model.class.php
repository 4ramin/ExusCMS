<?php

	if(!defined("__FLOWER__")) exit();

	class search_model extends search 
	{
		
		protected $pdo;
		
		function __construct($args) 
		{
			$this->base = new base();
			$this->pdo = $this->base->getPDO();
		}
		
	}
?>