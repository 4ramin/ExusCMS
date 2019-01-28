<?php

	if(!defined("__FLOWER__")) exit();

	if($position == 'content' && $status == 'after')
	{
		$this->base = new base();
		$output = $this->base->get('content');

		$output = str_replace('<div style="" id="rel_ar', '<p>test</p>'.'<div style="" id="rel_ar', $output);
		$this->base->set('content', $output);
	}

?>