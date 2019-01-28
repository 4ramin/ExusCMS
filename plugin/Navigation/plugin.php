<?php

	if(!defined("__FLOWER__")) exit();

	if($position == 'init' && $status == 'after' && $args->base->request_method === 'GET')
	{
		include "html.php";
	}
	else if($position == 'init' && $status == 'before')
	{
		$this->base = new base();
		$this->base->addCSS('/plugin/Navigation/navigator.css');
	}
	else
	{
		return;
	}
	
?>