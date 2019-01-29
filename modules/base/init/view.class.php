<?php

/**
 * Exuscms
 *
 * @author exuscms
 * @copyright (c) Copyright exuscms
 * @license GPLv3 (http://www.gnu.org/licenses/gpl-3.0.html)
 */
final class init_view
{
	protected $acceptedModuleType = array('view', 'controller');
	protected $exceptModule = array('music', 'document');
	protected $isAcceptAttacker = false;
	
	public $isAjax = null;
	public $requestModuleID = null;
	public $is_modified = null;
	public $requestMethod = null;
	public $module = null;
	public $languageFile = null;
	public $langType = null;
	
	function __construct() 
	{
		ob_clean();
		
		if (class_exists('base')) 
		{
			$this->base = new base();
		}
		else 
		{
			return $this->setError($this->lang['notfoundbaseresource']);
		}
		
		$this->init = new stdClass();
		$this->init->model = $this->base->getModel('init');
	}
	
	function jsMinify() 
	{
		$jsBuff = '';
		$js_list = $this->base->getJS();
		$jsRule = sha1(serialize($js_list));

		$jsFile = __DIR.'/file/cache/'.$jsRule.'.js';
		$jsWebFile = '/file/cache/'.$jsRule.'.js';
		
		if (file_exists($jsFile) && !maya::execute('$http||https$', $jsWebFile, 'boolean', false)) 
		{
			$this->base->emptyJS();
			$this->base->addJS($jsWebFile);
		} 
		else 
		{
			foreach ($js_list as $val) 
			{
				$filename = preg_replace('/(\?[a-z0-9]{1,500})/', '', $val);
				$localJS = __ROOT_DIR. preg_replace('/(\?\d{1,500})/', '', $filename);
				if (file_exists($localJS)) 
				{
					$this->getContentRetFile($localJS, 'jsbuffer');
				} 
				else 
				{
					//$this->getContentRetFile($val, 'jsbuffer');
				}
				
				$jsBuff .= "\n\n";
				
				$jsBuff .= "/* #".str_repeat("■", strlen($filename))."# */";
				$jsBuff .= "\n\n";
				$jsBuff .= "/* Original File : ";
				$jsBuff .= $filename;
				$jsBuff .= " */";
				$jsBuff .= "\n\n";
				$jsBuff .= "/* #".str_repeat("■", strlen($filename))."# */";
				$jsBuff .= "\n\n";
				$jsBuff .= $this->base->get('jsbuffer');
				
				file_put_contents($jsFile, $jsBuff);
			}
		}
	}
	
	function jsBodyMinify() 
	{
		$jsBuff = '';
		$js_list = $this->base->getBodyJS();
		$jsRule = sha1(serialize($js_list));

		$jsFile = sprintf("%s/file/cache/%s.js", __DIR, $jsRule);
		$jsWebFile = sprintf("/file/cache/%s.js", $jsRule);
		
		if (file_exists($jsFile) && !maya::execute('$http||https$', $jsWebFile, 'boolean', false)) 
		{
			$this->base->emptyBodyJS();
			$this->base->addJS($jsWebFile, 'body');
		} 
		else 
		{
			foreach ($js_list as $val) 
			{
				$filename = preg_replace('/(\?[a-z0-9]{1,500})/', '', $val);
				$localJS = __ROOT_DIR . preg_replace('/(\?\d{1,500})/', '', $filename);
				if (file_exists($localJS)) 
				{
					$this->getContentRetFile($localJS, 'jsbuffer');
				} 
				else 
				{
					//$this->getContentRetFile($val, 'jsbuffer');
				}
				
				$jsBuff .= "\n\n";
				$jsBuff .= "/* #".str_repeat("■", strlen($filename))."# */";
				$jsBuff .= "\n\n";
				$jsBuff .= "/* Original File : ";
				$jsBuff .= $filename;
				$jsBuff .= " */";
				$jsBuff .= "\n\n";
				$jsBuff .= "/* #".str_repeat("■", strlen($filename))."# */";
				$jsBuff .= "\n\n";
				$jsBuff .= $this->base->get('jsbuffer');
				
				file_put_contents($jsFile, $jsBuff);
			}
		}
	}
	
	function cssMinify() 
	{
		$cssBuff = '';
		$css_list = $this->base->getCSS();
		$cssRule = sha1(serialize($css_list));
		
		$cssFile = __DIR.'/file/cache/'.$cssRule.'.css';
		$cssWebFile = '/file/cache/'.$cssRule.'.css';
		
		if (file_exists($cssFile) && !maya::execute('$http||https$', $cssWebFile, 'boolean', false)) 
		{
			$this->base->emptyCSS();
			$this->base->addCSS($cssWebFile);
		} 
		else 
		{
			foreach ($css_list as $val) 
			{
				$filename = preg_replace('/(\?[a-z0-9]{1,500})/', '', $val);
				$localCSS = __ROOT_DIR. preg_replace('/(\?\d{1,500})/', '', $filename);
				
				if (file_exists($localCSS)) 
				{
					$this->getContentRetFile($localCSS, 'cssbuffer');
				} 
				else 
				{
					$this->getContentRetFile($val, 'cssbuffer');
				}
				
				$cssBuff .= $this->base->get('cssbuffer');
				
				$cssBuff = preg_replace_callback('/url\(([^\)]+)\)/i', function($matches) use($filename) 
				{
					$url = trim($matches[1], '\'"');
					
					if (!preg_match("/^\//i", $url)) 
					{
						return sprintf('url("%s/%s");', dirname($filename), $url);
					} 
					else if (preg_match("/^data:/i", $url)) 
					{
						return sprintf('url("%s");', $url);
					} 
					else if (preg_match("/^\\//i", $url)) 
					{
						return sprintf('url("%s");', $url);
					}
				}, $cssBuff);
				
				$cssBuff = preg_replace("@/\s*\*.*?\*/\s*|\s+@s", " ", $cssBuff);
				
				file_put_contents($cssFile, $cssBuff);
			}
		}
	}
	
	function setMaintenance($message) 
	{
		$this->getPlugin('after', 'setMaintenance', $this);
		$this->base->set('skin', sprintf("%s/tpl/setMaintenance.php", __MOD));
		$this->base->set('msg', $message);
		include($this->base->get('skin'));
		exit();
	}
	
	function setError($message) 
	{
		//if ($this->error == 1) 
		//{
			//exit($message);
		//}
		
		$this->accept_type = $_SERVER['HTTP_ACCEPT'];
		
		if (substr($this->accept_type, 0, 5) == "image") 
		{
			$image_args = new stdClass();
			$image_args->source = sprintf("%s%s/invalid.png", __DIR, __SYSTEM__ATTACH);
			$image_args->image = image::virtualimage($image_args);
			
			image::draw($image_args);
			exit();
		} 
		else 
		{
			if ($this->requestMethod == 'GET') 
			{
				$mid = $this->base->get_params(__MODULEID, 'string');
				if ($mid == 'message') 
				{
					exit($message);
				}
				
				//unset($this);
				
				$backtrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS); //DEBUG_BACKTRACE_PROVIDE_OBJECT
				$this->base->set_params(__MODULEID, 'message', $this->requestMethod);
				$this->base->set_params(__ACTION, 'dispMessage', $this->requestMethod);
				$this->base->set('errorMsg', $message);
				$this->base->set('backTrace', $backtrace);
				$this->error = 1;
				$this->httpRequest();
				
				return false;
			} 
			else if ($this->requestMethod == 'POST') 
			{
				return $this->base->response("type", "error", "html", $msg);
			}
		}
		
		return false;
	}
	
	//Apply rule-sets.
	function applyRuleset() 
	{
		$ruleset = sprintf("%s/ruleset/%s.php", $this->moduleDirectory, $this->requestMethod);
		
		if (file_exists($ruleset) && $this->requestMethod != 'REQUEST') 
		{
			include($ruleset);
			
			foreach ($_ruleset as $key => $val) 
			{
				if (isset($_ruleset[$key])) 
				{
					$vars = ($this->requestMethod === "GET") ? $this->base->get_params($key, 'string') : ($this->requestMethod === "POST" ? $this->base->post_params($key) : null);
					
					if ($vars) 
					{
						$vars = str::filterVars($_ruleset[$key], $vars);
						$this->base->set_params($key, $vars, $this->requestMethod);
					}
				}
			}
		}
	}
	
	//Import the module language file.
	function loadModuleLanguage() 
	{
		$this->languageFile = sprintf("%s/lang/%s.php", $this->moduleDirectory, $this->langType);
		
		if (file_exists($this->languageFile) && is_file($this->languageFile) && is_readable($this->languageFile)) 
		{
			include $this->languageFile;
			$this->{$this->moduleID}->lang = $lang;
		} 
		else 
		{
			$this->languageFile = sprintf("%s/lang/%s.php", $this->moduleDirectory, $this->defaultLanguage);
			
			if (file_exists($this->languageFile)) 
			{
				include $this->languageFile;
				$this->{$this->moduleID}->lang = $lang;
			}
		}
	}
	
	//Specify module default properties.
	function setModuleBasicProperty() 
	{
		if (in_array($this->module, $this->exceptModule) && is_array($this->exceptModule)) 
		{
			$this->moduleDirectory = sprintf("%s/board/%s", __MOD, $this->module);
			$this->moduleID = "board";
		} 
		else if (!empty($this->module)) 
		{
			$this->moduleDirectory = sprintf("%s/%s", __MOD, $this->module);
			$this->moduleID = $this->module;
		} 
		else 
		{
			return $this->setError($this->lang['invalid']);
		}
	}
	
	//Get the module class.
	function loadModuleClass($baseComponent, $requestType) 
	{
		$prefixHandler = $this->requestMethod === "GET" ? 'view' : ($this->requestMethod === "POST" ? 'controller' : null);

		if ($prefixHandler !== null) 
		{
			$this->requestHandler = sprintf("%s_%s", $this->moduleID, $prefixHandler);
			
			$abstractbaseComponent = sprintf("%s/%s.abstract.php", $this->moduleDirectory, $requestType);
			$requestHandlerAbstract = sprintf("%s_%s%s", $this->moduleID, $prefixHandler, '.abstract');
			$this->base->includeFile($abstractbaseComponent, $requestHandlerAbstract, false);
			
			$interfacebaseComponent = sprintf("%s/%s.interface.php", $this->moduleDirectory, $requestType);
			$requestHandlerInterface = sprintf("%s_%s%s", $this->moduleID, $prefixHandler, '.interface');
			$this->base->includeFile($interfacebaseComponent, $requestHandlerInterface, false);
			$this->base->includeFile($baseComponent, $this->requestHandler);
			
			$requestHandlerQuery = sprintf("%s_%s", $this->moduleID, 'query');
			$queryComponent = sprintf("%s/query.class.php", $this->moduleDirectory, $requestType);
			$this->base->includeFile($queryComponent, $requestHandlerQuery, false);
			
			$baseDefined = sprintf("%s/base.defined.php", $this->moduleDirectory, $requestType);
			
			if (file_exists($baseDefined)) 
			{
				include($baseDefined);
			}
		}
	}
	
	//Create a module class.
	function makeModuleClass() 
	{
		$this->{$this->moduleID} = new stdClass();
		
		if (method_exists($this->moduleHandler, 'init')) 
		{
			$initializeConcat = $this->moduleHandler->init($this);
			$this->{$this->moduleID} = $initializeConcat ? $initializeConcat : new stdClass();
		} 
		else 
		{
			$this->{$this->moduleID} = new stdClass();
		}
		
		$this->{$this->moduleID}->module = $this->module;
		$this->{$this->moduleID}->module_id = $this->base->get_params(__MODULEID, 'string');
	}
	
	//Specifies bulletin board default properties.
	function setBoardProperty() 
	{
		if (class_exists("board_query"))
		{
			$this->{$this->moduleID}->query = new board_query($this);
		}
		else
		{
			return $this->setError($this->lang['notfoundbaseresource']);
		}
		
		if (class_exists("board_model"))
		{
			$this->{$this->moduleID}->model = new board_model($this);
		}
		else
		{
			return $this->setError($this->lang['notfoundbaseresource']);
		}
		
		if (method_exists($this->{$this->moduleID}->model, "getModuleCategoryList"))
		{
			$this->{$this->moduleID}->category_list = (array)$this->{$this->moduleID}->model->getModuleCategoryList($this->{$this->moduleID}->module_id);
		}
			
		$this->{$this->moduleID}->tpl_path = sprintf("%s/board/%s/skins", __MOD, $this->module);
		$this->{$this->moduleID}->skin_tpl_path = sprintf("%s/%s", $this->{$this->moduleID}->tpl_path, $this->board->query->get_skin($this->module));
		
		$this->{$this->moduleID}->tpl_url_path = sprintf("%s/board/%s/skins", __PATH, $this->module);
		$this->{$this->moduleID}->skin_tpl_url_path = sprintf("%s/%s", $this->{$this->moduleID}->tpl_url_path, $this->board->query->get_skin($this->module));
	}
	
	//Specifies the model handler.
	function setModel() 
	{
		$this->modelObject = sprintf("%s_model", $this->moduleID);
		
		if (class_exists($this->modelObject)) 
		{
			$this->{$this->moduleID}->model = new $this->modelObject($this);
		}
		
		$this->queryObject = sprintf("%s_query", $this->moduleID);
		
		if (class_exists($this->queryObject))
		{
			$this->{$this->moduleID}->query = new $this->queryObject($this);
		}
		
	}
	
	//Import the configuration file.
	function loadSettingFile() 
	{
		$this->settingFile = sprintf("%s/skins/%s/_setting.php", $this->moduleDirectory, $this->module);
		
		if (file_exists($this->settingFile) && is_readable($this->settingFile)) 
		{
			include $this->settingFile;
		}
	}
	
	//Check that the page has been changed.
	function checkModified() 
	{
		$this->{$this->moduleID}->isAjax = (request::isAjax() === true) ? true : false;
		$this->{$this->moduleID}->hasReferer = (request::hasReferer() === true) ? true : false;
		
		if ($this->requestMethod === "GET" && $this->{$this->moduleID}->hasReferer) 
		{
			$this->referer = request::get_ref();
			parse_str(parse_url($this->referer, PHP_URL_QUERY), $this->referer_param);
			
			if (request::decodeBinaryNumbericPassword($this->base->get_params('RToken'), '001') === date('His')) 
			{
				$this->{$this->moduleID}->is_modified = true;
				$this->base->set_params('RToken', '', $this->requestMethod);
			} 
			else 
			{
				$this->{$this->moduleID}->is_modified = ($this->referer_param === $_GET) ? false : true;
			}
		} 
		else 
		{
			$this->{$this->moduleID}->is_modified = true;
		}
	}
	
	//Initialize the module handler.
	function initializeModuleHandler() 
	{
		if (class_exists($this->requestHandler)) 
		{
			$this->moduleHandler = new $this->requestHandler();
		} 
		else 
		{
			return $this->setError($this->lang['notfoundbaseresource']);
		}
	}
	
	//Get the instance object.
	function getInstanceObject() 
	{
		if (class_exists($this->moduleID)) 
		{
			$this->requestmoduleID = new $this->moduleID();
		} 
		else 
		{
			return $this->setError($this->lang['notfoundbaseresource']);
		}
	}
	
	function setBaseBoardProperty()
	{
		if (class_exists("board_query"))
		{
			$this->{$this->moduleID}->query = new board_query($this);
		}
		
		$this->{$this->moduleID}->tpl_path = sprintf("%s/board/%s/skins", __MOD, $this->module);
		$this->{$this->moduleID}->skin_tpl_path = sprintf("%s/%s", $this->{$this->moduleID}->tpl_path, $this->board->query->get_skin($this->module));
		
		$this->{$this->moduleID}->tpl_url_path = sprintf("%s/board/%s/skins", __PATH, $this->module);
		$this->{$this->moduleID}->skin_tpl_url_path = sprintf("%s/%s", $this->{$this->moduleID}->tpl_url_path, $this->board->query->get_skin($this->module));
	}
	
	//Specify the module property.
	function setModuleProperty($requestType) 
	{
		if (isset($requestType)) 
		{
			if (in_array($requestType, $this->acceptedModuleType)) 
			{
				if ($this->base->isInstalled()) 
				{
					$moduleConfig = json_decode($this->init->model->getModuleConfig($this->requestModuleID));
					$this->{$this->moduleID}->config = $moduleConfig ? $moduleConfig : array();
				} 
				else 
				{
					$this->{$this->moduleID}->config = new stdClass();
				}
				
				if ($requestType == 'view') 
				{
					if ($this->moduleID == 'board' && class_exists('board_model')) 
					{
						$this->setBoardProperty();
					} 
					else 
					{
						$this->setModel();
						$this->{$this->moduleID}->tpl_path = sprintf("%s/%s/tpl/", __MOD, $this->module);
					}
				}
				else 
				{
					if ($this->moduleID == 'board' && class_exists('board_model')) 
					{
						$this->setBaseBoardProperty();
					}
					
					$this->setModel();
				}
			} 
			else 
			{
				return $this->setError($this->lang['invalid']);
			}
		} 
		else 
		{
			return $this->setError($this->lang['invalid']);
		}
	}
	
	//Import the modeling module.
	function loadModelingModule() 
	{
		$itemObject = sprintf("%s/item.class.php", $this->moduleDirectory);
		$modelObject = sprintf("%s/model.class.php", $this->moduleDirectory);
		
		$this->base->includeFile(
			false, 
			$modelObject, sprintf("%s_model", $this->moduleID), 
			$itemObject, sprintf("%_item", $this->moduleID)
		);
	}
	
	//Invoke the object class.
	function loadObjectClass() 
	{
		$objectClass = sprintf("%s/init/object.class.php", __MOD);
		$moduleObjectClass = sprintf("%s/init/moduleobject.class.php", __MOD);
		
		$this->base->includeFile(
			true, 
			$objectClass, "Object", 
			$moduleObjectClass, "ModuleObject"
		);
	}
	
	//Method request
	function method() 
	{
		if (!isset($this->{$this->moduleID}->private_action)) 
		{
			$this->{$this->moduleID}->private_action = array();
		}
		
		if (!isset($this->{$this->moduleID}->default_action)) 
		{
			$this->{$this->moduleID}->default_action = array();
		}
		
		if (class_exists($this->requestHandler)) 
		{
			$this->callMethod
			(
				$this->module, 
				$this->moduleHandler, 
				($this->{$this->moduleID}->default_action ? $this->{$this->moduleID}->default_action : []), 
				($this->{$this->moduleID}->private_action ? $this->{$this->moduleID}->private_action : [])
			);
		}
	}
	
	//Module initialization
	function initializeModule($requestType = 'view') 
	{
		$this->getPlugin('before', 'initializeModule', $this);
		if (!in_array($requestType, $this->acceptedModuleType)) 
		{
			return $this->setError($this->lang['invalid']);
		}
		
		$this->loadObjectClass();
		$this->setModuleBasicProperty();
		
		if (is_dir($this->moduleDirectory) && is_string($this->moduleID)) 
		{
			$this->applyRuleset();
			$baseComponent = sprintf("%s/%s.class.php", $this->moduleDirectory, $requestType);
			
			if (file_exists($baseComponent) && is_file($baseComponent) && is_readable($baseComponent)) 
			{
				$class = sprintf("%s/%s.class.php", $this->moduleDirectory, 'base');
				if (file_exists($class) && is_file($class) && is_readable($class)) 
				{
					$this->base->includeFile($class, $this->moduleID);
					$this->getInstanceObject();
					
					if (is_object($this->requestmoduleID) && class_exists($this->moduleID)) 
					{
						$this->loadModuleClass($baseComponent, $requestType);
						$this->initializeModuleHandler();
						$this->loadModelingModule();
						$this->makeModuleClass();
					} 
					else 
					{
						return $this->setError($this->lang['invalid']);
					}
			
					$this->checkModified();
					$this->loadModuleLanguage();
					
					$this->setModuleProperty($requestType);
					
					$this->loadSettingFile();
					
					$this->method();
				} 
				else 
				{
					return $this->setError($this->lang['invalid']);
				}
			} 
			else 
			{
				return $this->setError($this->lang['invalid']);
			}
			
			$this->getPlugin('after', 'initializeModule', $this);
		}
	}
	
	//POST Request
	function processPOST() 
	{
		$this->getPlugin('post', 'execute', $this);
		
		$this->requestModuleID = $this->base->post_params(__MODULEID);
		
		if (preg_match("/^[a-zA-Z0-9\_\-]{1,50}+$/", $this->requestModuleID) && is_string($this->requestModuleID)) 
		{
			if (isset($this->requestModuleID)) 
			{
				$this->module = $this->init->model->getModule($this->requestModuleID);
				
				if ($this->module) 
				{
					$this->initializeModule('controller');
				} 
				else 
				{
					return $this->setError($this->lang['invalid']);
				}
			}
			else 
			{
				return $this->setError($this->lang['invalid']);
			}
		}
		
		exit();
	}
	
	//GET Request
	function processGET() 
	{
		$this->getPlugin('get', 'execute', $this);
		$this->requestModuleID = $this->base->get_params(__MODULEID, 'string');
		
		if (isset($this->requestModuleID)) 
		{
			if (preg_match("/^[a-zA-Z0-9\_\-]{1,50}+$/", $this->requestModuleID) && is_string($this->requestModuleID)) 
			{
				
				if ($this->base->isInstalled()) 
				{
					$this->moduleExists = $this->init->model->isModuleExits($this->requestModuleID);
					
					if (!$this->moduleExists) 
					{
						if (!isset($this->systemConfig->request_invalid_page)) 
						{
							$this->requestModuleID = $this->init->model->getDefaultModule();
						} 
						else 
						{
							return $this->setError($this->lang['modulenotexists']);
						}
					}
					
					$this->module = $this->init->model->getModule($this->requestModuleID);
				} 
				else 
				{
					$this->module = 'install';
				}
				
				$srl = $this->base->get_params('srl', 'int');
				
				if (isset($this->module) && is_string($this->module)) 
				{
					$this->initializeModule('view');
				} 
				else 
				{
					$this->findModulebySrl();
				}
			}
			else 
			{
				return $this->setError($this->lang['invalid']);
			}
		}
		else 
		{
			$this->findModulebySrl();
		}
		
		$this->initializeView();
	}
	
	//If there is no module value, find the module with the SRL value.
	function findModulebySrl() 
	{
		$this->getSrl = (int)$this->base->get_params('srl', 'int');
		
		if (preg_match("/^[1-9][0-9]{1,25}$/", $this->getSrl) && isset($this->getSrl) && ctype_digit($this->getSrl) && $this->getSrl >= 0) 
		{
			$this->requestModuleID = $this->init->model->getModulebysrl($this->getSrl);
			
			if (preg_match("/^[a-zA-Z0-9\_\-]{1,50}+$/", $this->requestModuleID) && isset($this->requestModuleID) && is_string($this->requestModuleID)) 
			{
				$this->moduleExists = $this->init->model->isModuleExits($this->requestModuleID);
				
				if (!$this->moduleExists) 
				{
					return $this->setError($this->lang['modulenotexists']);
				}
				
				$this->module = $this->init->model->getModule($this->requestModuleID);
				$this->base->set_params(__MODULEID, $this->requestModuleID);
				
				if ($this->module) 
				{
					return $this->initializeModule('view');
				} 
				else 
				{
					return $this->setError($this->lang['invalid']);
				}
			} 
			else 
			{
				return $this->setError($this->lang['modulenotexists']);
			}
		} 
		else 
		{
			$this->requestModuleID = $this->init->model->getDefaultModule();
			
			if (preg_match("/^[a-zA-Z0-9\_\-]{1,50}+$/", $this->requestModuleID) && isset($this->requestModuleID) && is_string($this->requestModuleID)) 
			{
				$this->module = $this->init->model->getModule($this->requestModuleID);
				$this->base->set_params(__MODULEID, $this->requestModuleID);
				
				if (isset($this->module) && !empty($this->module)) 
				{
					return $this->initializeModule('view');
				} 
				else 
				{
					return $this->setError($this->lang['invalid']);
				}
			} 
			else 
			{
				return $this->setError($this->lang['invalid']);
			}
		}
	}
	
	//Initialize the view.
	function initializeView() 
	{
		if (isset($this->requestModuleID) && is_string($this->requestModuleID) && preg_match("/^[a-zA-Z0-9\_\-]{1,50}+$/", $this->requestModuleID)) 
		{
			if ($this->base->isInstalled()) 
			{
				$this->base->set('module_title', $this->init->model->getModuleTitle($this->requestModuleID));
				$this->skin = $this->isMobile ? $this->init->model->getMobileSkin($this->requestModuleID) : 
												$this->init->model->getSkin($this->requestModuleID);
			}
			
			if (empty($this->skin)) 
			{
				$this->layout = $this->isMobile ? $this->base->getLayoutList(true) : //Mobile
								$this->base->getLayoutList(); 						 //PC
				
				if (is_array($this->layout)) 
				{
					$this->skin = $this->layout[0];
				} 
				else 
				{
					return $this->setError($this->lang['layoutnotexists']);
				}
			}
			
			if (empty($this->base->get('layout'))) 
			{
				if ($this->base->isInstalled()) 
				{
					if ($this->isMobile) 
					{
						$this->base->set('layout', sprintf("%s/layout/m.tpl/%s/skin.php", __MOD, $this->skin));
						$this->base->set('layout_setting', sprintf("%s/layout/m.tpl/%s/_setting.php", __MOD, $this->skin));
					} 
					else 
					{
						$this->base->set('layout', sprintf("%s/layout/tpl/%s/skin.php", __MOD, $this->skin));
						$this->base->set('layout_setting', sprintf("%s/layout/tpl/%s/_setting.php", __MOD, $this->skin));
					}
				} 
				else 
				{
					$this->base->set('layout', sprintf("%s/layout/tpl/install.php", __MOD, $this->skin));
				}
			}
		}
		
		if ($this->base->get('skin') && !file_exists($this->base->get('skin'))) 
		{
			return $this->setError(sprintf($this->lang['target_cannotfoundskin'], $this->base->get('skin')));
		}
		
		define('__EndTime__', request::getMicroTime());
		define('__RequireTime__', defined('__EndTime__') - defined('__StartTime__'));
		
		$this->dispContentView();
	}
	
	//Specify the title.
	function setTitle() 
	{
		$this->module_title = $this->base->get('module_title');
		$this->document_title = $this->base->get('document_title');
		
		if (isset($this->document_title)) 
		{
			$this->base->set('title', sprintf("%s - %s", $this->module_title, $this->document_title));
			$this->base->addMeta('title', $this->document_title);
		} 
		else 
		{
			$this->base->set('title', $this->module_title);
		}
		
	}
		
	function getContentRetFile($skin, $ret, $required=true) 
	{
		if (isset($skin)) 
		{
			if (file_exists($skin)) 
			{
				$include = @file_get_contents($skin);
			} 
			else 
			{
				//stream_get_contents($skin);
			}
		}
		
		//$include = ob_get_clean();
		if (empty($include)) 
		{
			$include = null;
		}
		
		$this->base->set($ret, $include);
	}
	
	/**
	 * Content output
	 **/
	function dispContent() 
	{
		if (isset($this->systemConfig))
		{
			if ($this->systemConfig->css_minify === 'Y') 
			{
				$this->cssMinify();
			}
			
			if ($this->systemConfig->js_minify === 'Y') 
			{
				$this->jsMinify();
			}
			
			if ($this->systemConfig->jsbody_minify === 'Y') 
			{
				$this->jsBodyMinify();
			}
		}
		
		$this->getContentRet($this->base->get('skin'), 'article', true);
		$this->base->set('article', $this->article);
		
		$this->getContentRet($this->base->get('layout_setting'), 'layout_set', false);
		$this->getContentRet($this->base->get('layout'), 'layout');
		$this->getContentRet(sprintf("%s/layout/tpl/_def.php", __MOD), 'def_layout');
		$this->getContentRet(sprintf("%s/layout/tpl/_def_bottom.php", __MOD), 'def_bottom_layout');
		header::file_html();
		
		$content = "";
		$content .= $this->def_layout;
		$content .= $this->layout;
		$content .= $this->def_bottom_layout;
		
		$this->base->set('content', $content);
		$this->getPlugin('after', 'content', $this);
		
		echo $this->base->get('content');
	}
	
	/**
	 * Retrieves the contents of the skin file.
	 *
	 * @public String $skin
	 * @public String $ret
	 * @public Boolean $required
	 **/
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
				if ($required) die("invalid skin");
			}
		}
		
		$include = ob_get_contents();
		
		ob_end_clean();
		
		$this->$ret = $include;
	}
	
	function dispContentView() 
	{
		if (isset($this->board)) 
		{
			if (isset($this->board->srl)) 
			{
				$oBoardQuery = $this->base->getQuery('music');
				$this->board->document = $oBoardQuery->getDocumentItem($this->board->srl);
				
				$this->document_item = new board_item($this, $this->board->document);
				$this->board->oDocument = $this->document_item;
				$content = $this->board->oDocument->getContent();
				
				$oEditorModel = $this->base->getModel('editor');
				$this->board->oDocument->setContent($oEditorModel->generateHTML($content, $this));
			}
		}
		
		$oLayoutViewModule = $this->base->getModel('layout');
		$this->menu = $oLayoutViewModule->getMenu();
		
		if ($this->base->isInstalled()) 
		{
			$this->isDefaultPage = $this->init->model->getDefaultModule() == $this->base->get_params(__MODULEID) ? true : false;
		}
		
		$this->setTitle();
		$this->dispContent();
	}
	
	/**
	 * Specify default resource file.
	 **/
	function setBaseResource() 
	{
		$this->base->addJS(
			'head',
			"/common/js/jquery/jquery-3.2.1.min.js",
			"/common/js/jquery/jquery.migrate-1.2.1.js",
			"/common/js/jquery/jquery-ui.min.js",
			"/common/js/jquery/jquery-jtemplates.js",
			"/common/js/swfobject.js",
			
			"/common/js/coreJS/dist/config.js",
			"/common/js/coreJS/dist/variables.js",
			"/common/js/coreJS/dist/coreJS.js",
			"/common/js/coreJS/dist/extend.js",
			"/common/js/coreJS/dist/Global Event.js",
			
			"/common/js/messenger/notify.js",
			"/common/js/messenger/messenger.js",
			"/common/js/messenger/messenger-theme-future.js",
			"/common/js/messenger/messenger-theme-flat.js",
			"/common/js/messenger/messenger.option.js"
		);
		
		$this->base->addCSS(
			'head',
			"/common/css/reset.css",
			"/common/css/fontawesome.css",
			"/common/css/messenger/messenger.css",
			"/common/css/messenger/messenger-spinner.css",
			"/common/css/messenger/messenger-theme-flat.css",
			"/common/css/messenger/messenger-theme-future.css",
			"/common/css/messenger/messenger-theme-ice.css",
			"/common/css/messenger/messenger-theme-block.css",
			"/common/css/messenger/messenger-theme-air.css"
		);
	
		$this->base->addMeta("theme-color", "#1A70DC");
		$this->base->addMeta("generator", "exuscms");
		$this->base->addMeta("viewport", "width=device-width, initial-scale=1");
		$this->base->addMeta("apple-mobile-web-app-title", "exuscms");
	}
	
	/**
	 * Generate a token.
	 **/
	function generateToken() 
	{
		if (session::isExistToken() === false) 
		{
			$args = va::args();
			$args->name = "token";
			$args->val = session::getToken();
			session::set($args);
		}
	}
	
	/**
	 * Get cookie information and set the language.
	 **/
	function setLanguageByCookie() 
	{
		if (isset($this->lang_cookie)) 
		{
			if (preg_match("/^[a-z]{2}$/", $this->lang_cookie)) 
			{
				$this->langType = $this->lang_cookie;
			}
			else if ($this->isAcceptAttacker === false) 
			{
				header::_400();
			}
		}
		else if (isset($this->requestMethod)) 
		{
			if (preg_match("/^[A-Za-z]{1,7}$/", $this->requestMethod)) 
			{
				$this->langType = $this->requestMethod;
			}
			else if ($this->isAcceptAttacker === false && $this->systemConfig->deny_forbid_access === 'Y') 
			{
				header::_400();
			}
		}
	}
	
	/**
	 * Load a language file
	 **/
	function loadLanguage() 
	{
		$this->languageFile = sprintf("%s/init/lang/%s.php", __MOD, $this->langType);
		
		if (file_exists($this->languageFile) && is_readable($this->languageFile) && isset($this->langType)) 
		{
			include($this->languageFile);
			if (is_array($lang)) 
			{
				$this->lang = $lang;
			} 
			else 
			{
				return $this->setError($this->lang['langisempty']);
			}
		}
		else 
		{
			$this->languageFile = sprintf("%s/init/lang/%s.php", __MOD, $this->defaultLanguage);
			
			if (file_exists($this->languageFile) && is_readable($this->languageFile)) 
			{
				include($this->languageFile);
				
				if (is_array($lang)) 
				{
					$this->lang = $lang;
				} 
				else 
				{
					return $this->setError($this->lang['langisempty']);
				}
			} 
			else 
			{
				return $this->setError($this->lang['langfileexists']);
			}
		}
	}
	
	/**
	 * HTTP Request (GET/POST)
	 **/
	function httpRequest() 
	{
		if (is_string($this->requestMethod) && !empty($this->requestMethod)) 
		{
			if ($this->requestMethod === "POST") 
			{
				$this->processPOST();
			} 
			else if ($this->requestMethod === "GET") 
			{
				$this->processGET();
			} 
			else 
			{
				header('HTTP/1.1 405 Method Not Allowed');
				header('Content-Type: text/plain');
				exit();
			}
		} 
		else 
		{
			header('HTTP/1.1 405 Method Not Allowed');
			header('Content-Type: text/plain');
			exit();
		}
	}
	
	
	/**
	 * Initialize
	 **/
	function init() 
	{
		$this->getPlugin('before', 'init', $this);
		
		$this->isMobile = request::is_mobile();
		$this->generateToken();
		$this->setBaseResource();
		$this->langType = NULL;
		$this->defaultLanguage = "jp";
		$this->accept_lang = request::get_lang();
		$this->requestMethod = strtoupper($this->base->getReq());
		
		if ($this->base->isInstalled()) 
		{
			$this->systemConfig = json_decode($this->init->model->getModuleConfig('admin'));
			
			if ($this->systemConfig->system_lang) 
			{
				$this->defaultLanguage = $this->systemConfig->system_lang;
			}
			
			if ($this->systemConfig->lock_site === 'Y' && ($this->base->get_params(__MODULEID, 'string') != 'admin') && ($this->base->get_params('act', 'string') != 'admin')) 
			{
				$this->setMaintenance($this->systemConfig->lock_content);
			}
		}
		
		if (isset($_COOKIE['langType'])) 
		{
			$this->lang_cookie = strtolower($_COOKIE['langType']);
		}
		
		$this->setLanguageByCookie();
		$this->loadLanguage();
		$this->httpRequest();
		
		$this->getPlugin('after', 'init', $this);
		define('__PHPTime__',request::getMicroTime() - __StartTime__);
	}
	
	/**
	 * Setting plug-in properties
	 *
	 * @public String $prop
	 **/
	function setPropertyPlugin($prop) 
	{
		if (isset($prop) && isset($prop->moduleHandler)) 
		{
			$this->moduleHandler = $prop->moduleHandler;
			
			if (isset($this->{$this->moduleID})) 
			{
				$this->{$this->moduleID} = $prop->{$this->moduleID};
			}
		}
	}
	
	/**
	 * Run the plugin
	 *
	 * @public String $status
	 * @public String $position
	 * @public String $args
	 **/
	function getPlugin($status, $position, $args) 
	{
		if ($this->base->isInstalled()) 
		{
			$oPluginController = $this->base->getController('plugin');
			$prop = $oPluginController->runPlugin($status, $position, $args);
			$this->setPropertyPlugin($prop);
		}
	}
	
	/**
	 * Method request
	 *
	 * @public String $module
	 * @public Method $oModule
	 * @public String $default_action
	 * @public String $private_action
	 **/
	function callMethod($module, $oModule, $default_action, $private_action) 
	{
		$this->getPlugin('before', 'method', $this);
		
		if (((empty($_GET) && $this->requestMethod === "GET") || (empty($_POST) && $this->requestMethod === "POST")))
		{
			if (isset($default_action) && method_exists($oModule, $default_action)) 
			{
				call_user_func(array($oModule, $default_action));
			}
			else 
			{
				throw new Exception(sprintf($this->lang['nonexistentmodule'], $module));
			}
		} 
		else 
		{
			$this->action = ($this->requestMethod === "POST") ? (string)$this->base->post_params(__ACTION) : 
							(($this->requestMethod === "GET") ? (string)$this->base->get_params(__ACTION, 'string') : null);
			
			if ($this->action === null) 
			{
				header('HTTP/1.1 405 Method Not Allowed');
				header('Content-Type: text/plain');
				exit();
			}
			
			if (isset($this->action) && method_exists($oModule, $this->action) && !in_array($this->action, $private_action)) 
			{
				call_user_func(array($oModule, $this->action));
			}
			else if (isset($default_action) && !empty($default_action) && is_object($oModule)) 
			{
				if (method_exists($oModule, $default_action) && !in_array($this->action, $private_action)) 
				{
					call_user_func(array($oModule, $default_action));
				}
			} 
			else 
			{
				throw new Exception(sprintf($this->lang['nonexistentmodule'], $module));
			}
			
		}
		
		$this->getPlugin('after', 'method', $this);
	}
	
}

?>