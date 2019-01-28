<?php

class editor_model extends editor 
{
	
	protected $pdo;
	
	function __construct() 
	{
		$this->base = new base();
		$this->pdo = $this->base->getPDO();
	}
	
	function generateHTML($content, $ret) 
	{
		$content = preg_replace_callback('!<(?:([A-Za-z]{1,20}))([^>]*)>(.*?)+<\/(?:([A-Za-z]{1,20}))>!is', array($this,'transHTML'), $content);
		return $content;
	}
	
	function transHTML($content) 
	{
		if ($content[1] != $content[4]) return $content[0];
		
		preg_match_all('/ ([A-Za-z][^"]{0,})$/is', $content[2], $matches2);
		preg_match_all('/([a-z0-9_-]+)=[\'"]([^"]*.)[\'"]/is', $content[2], $matches);
		
		if (!$matches)
		{
			return $content[0];
		}
		
		$transCode = new stdClass;
		if (isset($content[1]))
		{
			$transCode->object = $content[1];
		}
		
		if (isset($content[0]))
		{
			$transCode->src = $content[0];
		}
		
		if (isset($matches[4]))
		{
			$transCode->body = $matches[4];
		}
		
		if (isset($content[2]))
		{
			$transCode->attrs_body = $content[2];
		}
		
		if (isset($matches[0]))
		{
			$length = count($matches[0]);
		}
		else
		{
			$length = 0;
		}
		
		if (is_array($length)) 
		{
			$prefix = 'attrs';
			for ($i=0,$c = $length; $i < $c; $i++) 
			{
				if (!isset($transCode->{$prefix})) 
				{
					$transCode->{$prefix} = new stdClass;
				}
				
				$transCode->{$prefix}->{$matches[1][$i]} = $matches[2][$i];
			}
		}

		$length = count($matches2[0]);
		
		if ($length) 
		{
			$transCode->sub_attrs = new stdClass;
			$transCode->sub_attrs->body = trim($matches2[0][0]);
			$transCode->sub_attrs->params = explode(" ", $transCode->sub_attrs->body);
		}
		
		$oEditorController = $this->base->getController('editor');
		$code = $oEditorController->runComponent($transCode, 'before', $content[0]);
		
		if ($code == $transCode) 
		{
			return $content[0];
		} 
		else 
		{
			return $code;
		}
	}
	
	function getComponent($type) 
	{
		return db::Query('SELECT', 'def_editor_component', [
			['', 'type', '=', ':type', $type]
		], '*', 'all');
	}
	
}

?>