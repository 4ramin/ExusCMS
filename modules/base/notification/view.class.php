<?php

	if(!defined("__FLOWER__")) exit();

	class notification_view extends notification
	{
		
		function __construct()
		{
			$this->notification = new stdClass();
			$this->notification->model = new notification_model();
		}
		
	}
?>