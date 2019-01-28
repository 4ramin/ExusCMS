<?php

class editor_controller extends editor 
{
	
	function __construct() 
	{
		$this->base = new base();
	}
	
	function runComponent($script, $status, $originCode, array $args = array()) 
	{
		if (!isset($args))
		{
			$args = new stdClass();
		}
		
		if (!isset($args->isMobile))
		{
			$isMobile = false;
		}
		else
		{
			$isMobile = $args->isMobile;
		}
		
		$transCode = $script;
		$method = 'transHTML';
		
		$oEditorModel = $this->base->getModel('editor');
		$componentObject = $oEditorModel->getComponent($isMobile === true ? 'MOBILE' : 'PC');
		if (isset($componentObject))
		{
			$componentList = array_shift($componentObject);
		}
		
		$activatedComponent = json_decode($componentList['activate_component']);
		
		if (is_array($activatedComponent)) 
		{
			foreach($activatedComponent as $key => $component) 
			{
				$componentClass = sprintf('%s/components/%s/components.php', __ROOT, $component);
				if (file_exists($componentClass)) 
				{
					include_once $componentClass;
					
					if (class_exists($component)) 
					{
						$oComponent = new $component;
					} 
					else 
					{
						continue;
						return $script;
					}
					
					if (!is_object($oComponent)||!method_exists($oComponent, $method)) 
					{
						continue;
					} 
					else 
					{
						if (method_exists($oComponent, $method)) 
						{
							$args = new stdClass();
							$args->base = $this->base;
							$componentScript = $oComponent->{$method}($status, $args, $transCode, $originCode);
							if (!$componentScript) 
							{
								continue;
							} 
							else 
							{
								$transCode = $componentScript;
							}
						}
					}
				}
			}
			
			return $transCode;
		} 
		else 
		{
			return $script;
		}
	}
	
}

?>