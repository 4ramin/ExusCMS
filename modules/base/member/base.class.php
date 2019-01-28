<?php

class member
{
	
	function __construct()
	{
	}
	
	function getHandler($usePDO = false)
	{
		
		$this->base = new base();
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
			$this->pdo = $this->base->getPDO();
		}
	}
}

?>