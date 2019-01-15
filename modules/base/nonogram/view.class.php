<?php

	if(!defined("__FLOWER__")) exit();

	class nonogram_view extends nonogram
	{
		
		function __construct()
		{
		}
		
		function init($args)
		{
			$this->base = new base();
			$this->pdo = $this->base->getPDO();

			$this->nonogram = new stdClass;
			$this->nonogram->module = $args->module;
			$this->nonogram->default_action = "dispBitcoinContent";
			
			$this->nonogram->model = new Nonogram_Model($this);
			
			return $this->nonogram;
		}
		
		function dispBitcoinContent()
		{
			$this->base->set('skin', sprintf("%s/game.php", $this->nonogram->tpl_path));
		}
		
	}
?>