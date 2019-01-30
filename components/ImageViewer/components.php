<?php

class ImageViewer
{
	
	function transHTML($status, $args, $script)
	{
		if(!defined("__FLOWER__")) exit();

		if($status !== 'before') return;
		
		if(!isset($script->object)) return;
		
		if($script->object == 'img' && isset($script->attrs->src))
		{
			$args->base->addJS("/components/ImageViewer/resource/imageviewer.min.js");
			$args->base->addCSS("/components/ImageViewer/resource/imageviewer.css");
			$args->base->addJS("/components/ImageViewer/resource/viewer.js");
			$img_tag = '<img class="imageviewer" src="' . $script->attrs->src . '"/>';
			return $img_tag;
		}
		
		return;
	}
}

?>