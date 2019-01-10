<?php

	if(!defined("__FLOWER__")) exit();
	
	$required = array();

	disk_total_space("/");
		
	return [
		'includecomposer' => function() {
			$composerAutoloader = __ROOT.'/vendor/autoload.php';
			if(file_exists($composerAutoloader)){
				require_once($composerAutoloader);
			}
		},
		'includesystemlang' => function() {
			$sysLang = __ROOT.'/class/lang/'.__SYSLANG.'.php';
			if(file_exists($sysLang)){
				require_once($sysLang);
			}
		},
		'fileupload' => function() {
			if (!ini_get('file_uploads')){
				$required[] = "PHP does't have file uploads enabled";
			}
		},
		'shortopentag' => function() {
			if (!ini_get('short_open_tag')){
				$required[] = "Please set short_open_tag to On in php.ini";
			}
		},
		'requirefreedisk' => function() {
			$bytes = disk_free_space(".");
			if(($bytes/1024) < __REQUIREFREEDISK * 1000) {
				$required[] = "Disk capacity is less than ".__REQUIREFREEDISK."MB";
			}
		},
		'requiretotaldisk' => function() {
			$bytes = disk_free_space(".");
			if(($bytes/1024) < __REQUIRETOTALDISK * 1000) {
				$required[] = "Disk capacity is less than ".__REQUIRETOTALDISK."MB";
			}
		},
		'writable_directory' => function() {
			if (!is_writable(".")){
				$required[] = "Please make the current directory writable";
			}
		},
		'version_required' => function ($data, $ver, $prefix) {
			if (version_compare($data, $ver, $prefix)){
				$required[] = "Requires PHP 7.0 or higher to run properly";
			}
		},
		'extended_check' => function ($ext) {
			if (!extension_loaded($ext)){
				$required[] = "Please install $ext extension";
			}
		},
		'reporterror' => function () {
			$cntRequired = (!empty($required)) ? count($required) : 0;
			if ($cntRequired > 0){
				for ($i = 0; $i < $cntRequired; $i++){
					printf('<p class="error">%d) %s</p>', $i+1, $required[$i]);
				}
				
				exit(1);
			}
			
			unset($required);
		}
	];
	
	includecomposer();
	includesystemlang();
	fileupload();
	shortopentag();
	requirefreedisk();
	requiretotaldisk();
	writable_directory();
	version_required(PHP_VERSION, '7.0', '<');
	extended_check('ctype');
	extended_check('json');
	extended_check('pdo_mysql');
	extended_check('mbstring');
	extended_check('curl_init');
	extended_check('gd');
	
	reporterror();
?>