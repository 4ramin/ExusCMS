<?php

	if(!defined("__FLOWER__")) exit();

	class notification_controller extends notification{
		
		function __construct(){
			parent::getHandler(TRUE);
		}
		
		function init($args):stdClass{
			$this->notification = new stdClass;
			
			if(isset($args->module)){
				$this->notification->module = $args->module;
			}
			
			return $this->notification;
		}
		
		function insertNotification($target_document_srl, $is_valid, $message, $target_member_srl, $sender_member_srl){
			$this->notification->model->insertNotification($target_document_srl, $is_valid, $message, $target_member_srl, $sender_member_srl);
		}
		
	}
?>