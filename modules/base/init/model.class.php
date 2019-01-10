<?php

	if(!defined("__FLOWER__")) exit();

	final class init_model extends init 
	{
		
		protected $pdo;
		
		function __construct() 
		{
			parent::getHandler(true);
		}
		
		/**
		 * 스킨값을 가져온다
		 *
		 * @param string $module
		 */
		function getDefaultModule() 
		{
			return db::Query('SELECT', 'def_module', [
				['', 'isdef', '!=', ':args1', 'NULL']
			], 'bdname', 'one');
		}
		
		/**
		 * 스킨값을 가져온다
		 *
		 * @param string $module
		 */
		function getMobileSkin($module) 
		{
			return db::Query('SELECT', 'def_module', [
				['', 'bdname', '=', ':args1', $module]
			], 'mlayout', 'one');
		}
		
		/**
		 * 스킨값을 가져온다
		 *
		 * @param string $module
		 */
		function getSkin($module) 
		{
			$output = db::Query('SELECT', 'def_module', [
				['', 'bdname', '=', ':args1', $module]
			], 'layout', 'one', '', 'object');
			
			return $output->data();
		}
		
		function getModulebysrl($srl) 
		{
			$output = db::Query('SELECT', 'def_document_music', [
				['', 'srl', '=', ':args1', $srl]
			], 'module', 'one');
			
			return $output->data();
		}
		
		function getModule($module) 
		{
			$output = db::Query('SELECT', 'def_module', [
				['', 'bdname', '=', ':args1', $module]
			], 'module', 'one', '', 'object');
			
			return $output->data();
		}
		
		function isModuleExits($module) 
		{
			$isModuleExists = db::Query('SELECT', 'def_module', [
				['', 'bdname', '=', ':args1', $module]
			], '1 as `Exists`', 'alias');
			
			return ($isModuleExists['Exists'] === 1) ? true : false;
		}
		
		function getModuleConfig($module) 
		{
			return db::Query('SELECT', 'def_module_config', [
				['', 'module', '=', ':module', $module]
			],'config', 'one');
		}
	
		function getModuleTitle($module) 
		{
			return db::Query('SELECT', 'def_module', [
				['', 'bdname', '=', ':args1', $module]
			], 'title', 'one');
		}

	}
	
?>