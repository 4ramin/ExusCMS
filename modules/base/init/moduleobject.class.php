<?php

	class ModuleObject extends BaseObject 
	{
		
		function __construct()
		{
			$this->base = new base();
		}
		
		function getCommonTpl($tpl)
		{
			return sprintf("%s/tpl/%s", __MOD, $tpl);
		}
		
		function getTpl($tpl)
		{
			$reflectClass = new ReflectionClass($this);
			$directory = dirname($reflectClass->getFilename());
			return sprintf("%s/tpl/%s", $directory, $tpl);
		}
		
		function setTpl($tpl)
		{
			$reflectClass = new ReflectionClass($this);
			$directory = dirname($reflectClass->getFilename());
			$this->base->set('skin', sprintf("%s/tpl/%s", $directory, $tpl));
		}
		
	}
	
?>