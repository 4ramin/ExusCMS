<?php

	class plugin_view extends plugin{
		
		function __construct(){
			$this->init = new stdClass();
			$this->init->model = new init_model();
		}
		
		function init($args){
			$this->base = new base();
			$this->pdo = $this->base->getPDO();

			$this->plugin = new stdClass;
			$this->plugin->module = $args->module;
			
			return $this->plugin;
		}
		
	}
?>