<?php
	if (!defined("__FLOWER__")) exit();

	$this->base->addJS($this->board->skin_tpl_url_path."/js/board/board.gamepad.js", 'body');
	$this->base->addJS($this->board->skin_tpl_url_path."/js/board/board.prefix.js", 'body');
	$this->base->addJS($this->board->skin_tpl_url_path."/js/board/board.instanceTemplate.js", 'body');
	$this->base->addJS($this->board->skin_tpl_url_path."/js/board/board.function.js", 'body');
	$this->base->addJS($this->board->skin_tpl_url_path."/js/board/board.register.js", 'body');
	$this->base->addJS($this->board->skin_tpl_url_path."/js/board/board.process.js", 'body');
	$this->base->addJS($this->board->skin_tpl_url_path."/js/board/board.js", 'body');
	$this->base->addJS($this->board->skin_tpl_url_path."/js/ZeroClipboard.min.js");
	$this->base->addCSS($this->board->skin_tpl_url_path."/css/board.css");
	
	if (empty($this->board->config->star_max) && isset($this->board->config->star_max)) 
	{
		$this->board->config->star_max = 5;
	}
	
	if (empty($this->board->config->comment_depth) && isset($this->board->config->comment_depth)) 
	{
		$this->board->config->comment_depth = 5;
	}

	if (empty($this->board->config->thumbnail_width) && isset($this->board->config->thumbnail_width)) 
	{
		$this->board->config->thumbnail_width = 150;
	}

	if (empty($this->board->config->title_length) && isset($this->board->config->title_length)) 
	{
		$this->board->config->title_length = 50;
	}
		
	if (empty($this->board->config->thumbnail_height) && isset($this->board->config->thumbnail_height)) 
	{
		$this->board->config->thumbnail_height = 5;
	}

	if ($this->board->config->list_player=="btn") 
	{
		$this->base->addJS($this->board->skin_tpl_url_path."/js/audio/button.js", 'body');
		$this->base->addCSS($this->board->skin_tpl_url_path."/css/button.css");
	} 
	else if ($this->board->config->list_player=="360") 
	{
		$this->base->addJS($this->board->skin_tpl_url_path."/js/audio/360.js", 'body');
		$this->base->addCSS($this->board->skin_tpl_url_path."/css/360.css");
	}
		$this->base->addJS($this->board->skin_tpl_url_path."/js/lazad.js", 'body');
		$this->base->addJS($this->board->skin_tpl_url_path."/js/intersection-observer.js", 'body');
	
	$bdstyle = $this->base->get_params('bdstyle');
	
	if (($bdstyle=='flat' && isset($bdstyle)) || $this->board->config->gallery_skin == 'flat') 
	{
	}
	
	if (($bdstyle=='flat' && isset($bdstyle) || $bdstyle=='webzine') && isset($bdstyle)) 
	{
		$this->base->addJS($this->board->skin_tpl_url_path."/js/imagesloaded.pkgd.min.js", 'body');
		$this->base->addJS($this->board->skin_tpl_url_path."/js/jquery.masonry.min.js", 'body');
	}
	
?>