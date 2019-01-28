<?php

	class TemplateException extends Exception
	{
		
		public function __construct($message, $code = 0, $errFile, $errLine) {
			parent::__construct($message, $code);
			echo $this->__toString();
		}
		
		public function __toString() {
			return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
		}
		
	}

?>