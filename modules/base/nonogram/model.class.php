<?php

	if(!defined("__FLOWER__")) exit();

	class nonogram_Model extends nonogram
	{
		
		function __construct($args)
		{
		}
		
		/**
		 * JSON 출력
		 *
		 * @param str $type
		 * @param str $message
		 */
		function response_json($kind_type, $kind, $message_type, $message)
		{
			$response = array();
			$response[$kind_type] = $kind;
			$response[$message_type] = $message;
			echo json_encode($response);
		}
	}
?>