<?php

	if(!defined("__FLOWER__")) exit();

	class search_controller extends search 
	{
		
		function __construct($args) 
		{
			$this->pdo = $args->pdo;
		}
		
	}
?>