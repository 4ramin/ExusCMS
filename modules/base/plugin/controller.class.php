<?php

class plugin_controller extends plugin
{
	
	protected $pdo;
	
	function __construct()
	{
		$this->base = new base();
		$this->pdo = $this->base->getPDO();
	}
	
	function runPlugin($status, $position, $args)
	{
		if(!is_object($args))
		{
			$args = new stdClass();
		}
		
		if(!isset($args->isMobile))
		{
			$args->isMobile = false;
		}
		
		$oPluginModel = $this->base->getModel('plugin');
		$pluginType = $oPluginModel->getPlugin($args->isMobile === true ? 'MOBILE' : 'PC');
		
		if (isset($pluginType))
		{
			$pluginType = array_shift($pluginType);
			if (isset($pluginType['activate_addon']))
			{
				$activatedPlugin = json_decode($pluginType['activate_addon']);
			}
			else
			{
				return;
			}
		}
		
		if(is_array($activatedPlugin))
		{
			foreach($activatedPlugin as $plugin)
			{
				$plugin = sprintf('%s/plugin/%s/plugin.php', __ROOT, $plugin);
				
				if(file_exists($plugin))
				{
					require $plugin;
				}
			}
		}
	
		return $args;
	}
	
}
?>