<?php

/**
 * Exuscms
 *
 * @author exuscms
 * @copyright (c) Copyright exuscms
 * @license GPLv3 (http://www.gnu.org/licenses/gpl-3.0.html)
 */

define('__FLOWER__', TRUE);
define('__ROOT', realpath(dirname(__FILE__)) . DIRECTORY_SEPARATOR);
define('__DIR', dirname(__FILE__));

try 
{
	$target_include = __ROOT . '/common/classes/load.components.php';
	if (file_exists($target_include)) 
	{
		include($target_include);
	}
	else 
	{
		throw new Exception("File not found : " . $target_include, 1);
	}
} 
catch(Exception $e) 
{
	$error_message = request::critialErr($e);
	$errorTpl = __MOD.'/tpl/critical_msg.php';
	if (file_exists($errorTpl)) 
	{
		include(__MOD.'/tpl/critical_msg.php');
	} 
	else 
	{
		print_r($e);
	}
}
?>
