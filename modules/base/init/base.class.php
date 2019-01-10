<?php

	class init 
	{
		
		public $_base;
		public $_pdo;
		
		function __construct() 
		{
		}
		
		function getHandler($usePDO = false) 
		{
			if (!isset($_base)) 
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
				if (!isset($_pdo)) 
				{
					$this->pdo = $this->base->getPDO();
					$_pdo = $this->pdo;
				} 
				else 
				{
					$this->pdo = $_pdo;
				}
			}
		}
		
	}
?>