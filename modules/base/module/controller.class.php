<?php

	class module_controller extends module
	{
		
		function __construct()
		{
			$this->init = new stdClass();
			$this->init->model = new init_model();
		}
		
		function init($args)
		{
			$this->base = new base();
			$this->pdo = $this->base->getPDO();

			$this->files = new stdClass;
			$this->files->module = $args->module;
			$this->files->model = new Files_Model($this);
			
			return $this->files;
		}
		
	}
?>