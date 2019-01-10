<?php

class mail
{
	
	
	public static function send($args){
		$to      = 'kdp7584@gmail.com';
		$subject = 'the subject';
		$message = 'hello';
		$headers = 'From: torinoyume@naver.com' . "\r\n" .
			'Reply-To: webmaster@example.com' . "\r\n" .
			'X-Mailer: PHP/' . phpversion();

		mail($to, $subject, $message, $headers);
	}
}