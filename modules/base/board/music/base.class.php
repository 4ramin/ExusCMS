<?php

class board extends ModuleObject 
{
	
	var $_base;
	
	function __construct()
	{
		parent::__construct();
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
			$this->pdo = $this->base->getPDO();
		}
	}
	
}

?>