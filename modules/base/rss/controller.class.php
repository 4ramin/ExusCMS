<?php

	if(!defined("__FLOWER__")) exit();

	class rss_controller extends rss
	{
		
		function __construct($args)
		{
			$this->pdo = $args->pdo;
		}
		
	}
?>