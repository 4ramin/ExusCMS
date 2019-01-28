<?php

	if(!defined("__FLOWER__")) exit();

	if($position == 'init' && $status == 'before')
	{
		header("X-XSS-Protection: 1; mode=block");
	}

?>