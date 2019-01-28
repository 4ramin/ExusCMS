<?php

class BaseObject 
{
	
	function __construct()
	{
		
	}
	
	function getContentRet($skin, $ret, $required=true)
	{
		ob_start();
		
		if(isset($skin))
		{
			if(file_exists($skin))
			{
				@include($skin);
			}
			else
			{
				if($required) die("invalid skin");
			}
		}
		else
		{
			die("invalid skin");
		}
		
		$include = ob_get_clean();
		
		$this->base->set($ret, $include);
	}
	
}

?>