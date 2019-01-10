<?php

	class module_Model extends module
	{
		
		function __construct() 
		{
			$this->base = new base();
			$this->pdo = $this->base->getPDO();
		}
		
		function isModuleInstalled($module) 
		{
			$module_count = $this->getModuleCount($module);
			if ($module_count > 0) 
			{
				return true;
			}
			
			return false;
		}
		
		function getModuleCount($module) 
		{
			return db::Query('SELECT','def_module',[
				['', 'module', '=', ':module', $module]
			],'count(*)', 'one');
		}
	
		function getModuleConfig($module) 
		{
			return db::Query('SELECT','def_module_config',[
				['', 'module', '=', ':module', $module]
			],'config', 'one');
		}
	
		function getModuleConfigCount($module) 
		{
			return db::Query('SELECT','def_module_config',
			[
				['', 'module', '=', ':module', $module]
			],'count(*)', 'one');
		}
		
		/**
		 * 모듈의 값이 비어있을 경우 설정값을 입력한다.
		 *
		 * @param str $module
		 * @param str $config
		 */
		function insertModuleConfig($module, $config) 
		{
			$sth = $this->pdo->prepare("INSERT INTO def_module_config (module, config) VALUES (:module, :config)");
			$sth->bindParam(':module', $module, PDO::PARAM_STR);
			$sth->bindParam(':config', $config, PDO::PARAM_STR);
			$sth->execute();
		}

		/**
		 * 모듈의 설정을 업데이트한다.
		 *
		 * @param str $module
		 * @param str $config
		 */
		function updateModuleConfig($module, $config) 
		{
			return db::Query('UPDATE','def_module_config',
			[
				['WHERE', 'config', '=', ':args1', $config],
				['', 'module', '=', ':args2', $module]
			],'', 'boolean');
		}
	
		/**
		 * 모듈의 설정을 업데이트한다.
		 *
		 * @param str $module
		 * @param str $layout
		 */
		function updateModuleLayout($module, $layout) 
		{
			return db::Query('UPDATE','def_module',
			[
				['WHERE', 'layout', '=', ':args1', $layout],
				['', 'bdname', '=', ':args2', $module]
			],'', 'boolean');
		}
	
		/**
		 * 모듈의 설정을 업데이트한다.
		 *
		 * @param str $module
		 * @param str $layout
		 */
		function updateModuleTitle($module, $title) 
		{
			return db::Query('UPDATE','def_module',
			[
				['WHERE', 'title', '=', ':args1', $title],
				['', 'bdname', '=', ':args2', $module]
			],'', 'boolean');
		}
	
	}
?>