<?php

	if (!defined("__FLOWER__")) exit();

	function load_php($target_include) {
		if (file_exists($target_include)) {
			include_once($target_include);
		} else {
			$required[] = "Fatal Error : Could not found $target_include";
		}
	}
	
	function load_extension($className) {
		$_CLASS = ucfirst($className);
		$_GLOBALS = isset($GLOBALS['CLSARR_' . $_CLASS]) ? $GLOBALS['CLSARR_' . $_CLASS] : null;
		
		if (isset($_GLOBALS)) {
			$_Include = $_GLOBALS;
		} else {
			$_Include = array(
				__ROOT . '/common/classes/components/Cache/' . $_CLASS . '.php',
				__ROOT . '/common/classes/components/Compress/' . $_CLASS . '.php',
				__ROOT . '/common/classes/components/Database/' . $_CLASS . '.php',
				__ROOT . '/common/classes/components/ETC/' . $_CLASS . '.php',
				__ROOT . '/common/classes/components/FileSystem/' . $_CLASS . '.php',
				__ROOT . '/common/classes/components/Id3/' . $_CLASS . '.php',
				__ROOT . '/common/classes/components/Image/' . $_CLASS . '.php',
				__ROOT . '/common/classes/components/Maya/' . $_CLASS . '.php',
				__ROOT . '/common/classes/components/Request/' . $_CLASS . '.php',
				__ROOT . '/common/classes/components/Stream/' . $_CLASS . '.php',
				__ROOT . '/common/classes/' . $_CLASS . '.class.php',
				
				'dir' => __ROOT . '/common/classes/components/FileSystem/Directory.php',
				'session' => __ROOT . '/common/classes/components/Request/Session.php',
				'str' => __ROOT . '/common/classes/components/Request/String.php',
				'va' => __ROOT . '/common/classes/components/Request/Variables.php',
			);
			
			$GLOBALS['CLSARR_' . $_CLASS] = $_Include;
		}
	
		foreach ($_Include as $targetFile) {
			if (isset($_Include[$className]) && file_exists($_Include[$className])) {
			    load_php($_Include[$className]);
			} else if (file_exists($targetFile)) {
			    load_php($targetFile);
			}
		}
	}
	
	if (function_exists('spl_autoload_register')) {
		spl_autoload_register('load_extension');
	} else {
		throw("Can not use spl_autoload_register function");
	}
	
	load_php(__ROOT . '/common/libraries/htmlpurifier/library/HTMLPurifier.includes.php');
	load_php(__ROOT . '/common/classes/system/Defined.php');
	
	if (defined('__SYSCHK') && __SYSCHK === true) {
		request::load_php(__ROOT . '/common/classes/system/Syschk.php');
	}
	
	if (defined('__MINIFY') && __MINIFY === true) {
		clearstatcache();
		request::zip_output();
	}
	
	if (defined("__CMS__")) {
		session::on();
		load_php(__ROOT . '/common/classes/base/base.php');
		$base = new base();
		$base->call();
	}
?>