<?php

	if(!defined("__FLOWER__")) exit();

	if($position == 'content' && $status == 'after')
	{
		$this->base = new base();
		$output = $this->base->get('content');

		$output = str_replace('<div style="" id="rel_ar', '<img src="https://ncache.ilbe.com/files/attach/new/20151012/28622079/2871294061/6737531752/e1ec3bbda91db28ef5de341330d40b50.jpg"/>'.'<div style="" id="rel_ar', $output);
		$this->base->set('content', $output);
	}
	
?>