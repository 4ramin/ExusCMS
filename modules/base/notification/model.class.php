<?php

	if(!defined("__FLOWER__")) exit();

	class notification_model extends notification{
		
		protected $pdo;
		
		function __construct(){
			parent::getHandler(TRUE);
		}
		
		function getNotification($target_member_srl){
			return db::Query('SELECT','def_notification',
			[
				['AND', 'is_valid', '=', TRUE],
				['', 'target_member_srl', '=', "args1", $target_member_srl]
			],'*', 'all');
		}
			
		function unsetAllNotification(){
		}
		
		function unsetNotification(){
			
		}
		
		function insertNotification($target_document_srl, $is_valid, $message, $target_member_srl, $sender_member_srl){
			$sth = $this->pdo->prepare("INSERT INTO def_notification (target_document_srl, is_valid, message, target_member_srl, sender_member_srl) VALUES (:target_document_srl, :is_valid, :message, :target_member_srl, :sender_member_srl)");
			$sth->bindParam(':target_document_srl', $is_valid, PDO::PARAM_INT);
			$sth->bindParam(':is_valid', $is_valid, PDO::PARAM_INT);
			$sth->bindParam(':message', $message, PDO::PARAM_STR);
			$sth->bindParam(':target_member_srl', $target_member_srl, PDO::PARAM_INT);
			$sth->bindParam(':sender_member_srl', $sender_member_srl, PDO::PARAM_INT);
			$sth->execute();
		}
		
	}
?>