<?php

	if(!defined("__FLOWER__")) exit();

	class comment_view extends comment
	{
		
		function __construct()
		{
			$this->comment = new stdClass();
			$this->comment->model = new comment_model();
		}
		
	}
?>