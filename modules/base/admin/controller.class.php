<?php

	if (!defined("__FLOWER__")) exit();

	class admin_controller extends admin 
	{
		
		function init($args) 
		{
			$this->base = new base();
			$this->pdo = $this->base->getPDO();

			$this->admin = new stdClass;
			$this->admin->module = $args->module;
		
			$this->admin->model = new Admin_Model($this);
			
			return $this->admin;
		}
		
		function procAdminComponentsActivate() 
		{
			$this->admin->pc_components = $this->base->post_params('pc');
			$this->admin->mobile_components = $this->base->post_params('mobile');
			$this->admin->pc_exists = $this->admin->model->getComponentsCount('pc') > 0 ? true : false;
			$this->admin->mobile_exists = $this->admin->model->getComponentsCount('mobile') > 0 ? true : false;
			
			if (is_array($this->admin->pc_components)) 
			{
				if (isset($this->admin->pc_components)) 
				{
					$pc_components = json_encode($this->admin->pc_components);
				}
				else 
				{
					$pc_components = '';
				}
				
				if ($this->admin->pc_exists) 
				{
					$this->admin->model->updateComponents($pc_components, 'PC');
				}
				else 
				{
					$this->admin->model->insertComponents($pc_components, 'PC');
				}
			}
			
			if (is_array($this->admin->mobile_components)) 
			{
				if (isset($this->admin->mobile_components)) 
				{
					$mobile_components = json_encode($this->admin->mobile_components);
				} 
				else 
				{
					$mobile_components = '';
				}
				
				if ($this->admin->mobile_exists) 
				{
					$this->admin->model->updateComponents($mobile_components, 'MOBILE');
				} 
				else 
				{
					$this->admin->model->insertComponents($mobile_components, 'MOBILE');
				}
			}
			
			$args = va::args();
			$args->location = str::getUrl('', __MODULEID, 'admin', __ACTION, 'dispAdminComponentList');
			header::move($args);
		}
		
		function procAdminPluginActivate() 
		{
			$this->admin->pc_plugin = $this->base->post_params('pc');
			$this->admin->mobile_plugin = $this->base->post_params('mobile');
			$this->admin->pc_exists = $this->admin->model->getPluginCount('pc') > 0 ? true : false;
			$this->admin->mobile_exists = $this->admin->model->getPluginCount('mobile') > 0 ? true : false;
			
			if (is_array($this->admin->pc_plugin)) 
			{
				if (isset($this->admin->pc_plugin)) 
				{
					$pc_plugin = json_encode($this->admin->pc_plugin);
				} 
				else 
				{
					$pc_plugin = '';
				}
				
				if ($this->admin->pc_exists) 
				{
					$this->admin->model->updatePlugin($pc_plugin, 'PC');
				} 
				else 
				{
					$this->admin->model->insertPlugin($pc_plugin, 'PC');
				}
			}
			
			if (is_array($this->admin->mobile_plugin)) 
			{
				if (isset($this->admin->mobile_plugin)) 
				{
					$mobile_plugin = json_encode($this->admin->mobile_plugin);
				}
				else 
				{
					$mobile_plugin = '';
				}
				
				if ($this->admin->mobile_exists) 
				{
					$this->admin->model->updatePlugin($mobile_plugin, 'MOBILE');
				}
				else 
				{
					$this->admin->model->insertPlugin($mobile_plugin, 'MOBILE');
				}
			}
			
			$args = va::args();
			$args->location = str::getUrl('', __MODULEID, 'admin', __ACTION, 'dispAdminPluginAdmin');
			header::move($args);
		}
		
		function procAdminisPluginInstalled() 
		{
			if (!$this->base->isAdmin()) 
			{
				exit();
			}
			
			$this->admin->module = $this->base->post_params('module');
			
			$oModuleModel = $this->base->getModel('module');
			if ($oModuleModel->isModuleInstalled($this->admin->module)) 
			{
				return $this->base->response("type", "success", "html", "설치되어 있습니다.");
			}
			
			return $this->base->response("type", "error", "html", "설치되어 있지 않습니다.");
		}
		
		function procAdminSetup() 
		{
			if (!$this->base->isAdmin()) 
			{
				exit();
			}
			
			$oModuleModel = $this->base->getModel('module');
			
			$this->admin->config_post = $this->base->post_params('post_area');
			if ($this->admin->config_post) 
			{
				$module_setup = $this->base->post_params(__MODULEID);
				$is_module_config = $oModuleModel->getModuleConfigCount($module_setup);
				
				if ($is_module_config === 0) 
				{
					$oModuleModel->insertModuleConfig($module_setup, json_encode($this->admin->config_post));
				} 
				else 
				{
					$oModuleModel->updateModuleConfig($module_setup, json_encode($this->admin->config_post));
				}
				
				$this->admin->module_post = $this->base->post_params('module_post');
				if ($this->admin->module_post) 
				{
					$oModuleModel->updateModuleLayout($module_setup, $this->admin->module_post['layout']);
					$oModuleModel->updateModuleTitle($module_setup, $this->admin->module_post['browser_title']);
				}
			}
			
			$args = va::args();
			$args->location = str::getUrl('', __MODULEID, $module_setup, __ACTION, 'dispAdminSystemConfig');
			header::move($args);
		}
		
	}