<?php

class editor_view extends editor 
{
	
	var $args = array();
	
	function __construct() 
	{
		parent::getHandler();
	}
	
	function init($args):stdClass
	{
		$this->editor = new stdClass;
		if (isset($args->module)) {
			$this->editor->module = $args->module;
		}
		
		return $this->editor;
	}
	
	function getContentRet($skin, $ret, $required=true) 
	{
		ob_start();
		
		if (isset($skin)) 
		{
			if (file_exists($skin)) 
			{
				@include($skin);
			} 
			else 
			{
				if ($required)
				{
					die("invalid skin");
				}
			}
		} 
		else 
		{
			die("invalid skin");
		}
		
		$include = ob_get_clean();
		
		$this->base->set($ret, $include);
	}
	
	function getEditor() 
	{
		$this->editor->skin_path = sprintf("%s/editor/tpl/%s",__MOD, 'ckeditor4');
		$this->editor->tpl_path = sprintf("%s/editor.php", $this->editor->skin_path);
		if (file_exists($this->editor->tpl_path)) 
		{
			$this->getContentRet($this->editor->tpl_path, 'content');
			return $this->base->get('content');
		}
	}
	
}

?>