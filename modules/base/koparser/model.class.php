<?php

	if(!defined("__FLOWER__")) exit();

	class koparser_model extends koparser
	{
		
		protected $pdo;
		
		function __construct()
		{
			$this->koparser = new stdClass;
			$this->base = new base();
			$this->pdo = $this->base->getPDO();
		}

	}
	
?>