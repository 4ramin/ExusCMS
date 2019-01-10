<?php

	if(!defined("__FLOWER__")) exit();

	class message_view extends message
	{
		
		function __construct()
		{
			parent::getHandler();
		}
		
		function init($args)
		{
			$this->message = new stdClass;
			$this->message->module = $args->module;
			
			return $this->message;
		}
		
		/**
		 * get popular keyword count
		 *
		 * @param string $keyword
		 */
		function dispMessage()
		{
			$this->message->message = $this->base->get('errorMsg');
			$this->base->set('layout', sprintf("%s/error.php", $this->message->tpl_path));
			$this->base->set('skin', sprintf("%s/error.php", $this->message->tpl_path));
		} 
		
	}
?>