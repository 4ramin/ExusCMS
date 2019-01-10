<?php

	if(!defined("__FLOWER__")) exit();

	class naturalsearch
	{
		
		public $_base;
		
		function __construct()
		{
		}
		
		function getHandler($usePDO = false)
		{
			
			$this->base = new base();
			if (!is_object($_base))
			{
				$this->base = new base();
				$_base = $this->base;
			}
			else
			{
				$this->base = $_base;
			}
			
			if ($usePDO) 
			{
				$this->pdo = $this->base->getPDO();
			}
		}
		
	}
?>