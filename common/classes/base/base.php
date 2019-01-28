<?php 

	/**
	 * 요청값과 자원을 관리합니다.
	 */
 
	if (!defined("__FLOWER__")) exit();
	
	class base 
	{
		
		/*
		 * 자바스크립트 자원 배열
		 * @var array
		 */
		public $js_array = array();
		public $js_body_array = array();
		public $db_info;
		
		/*
		 * 스타일시트 자원 배열
		 * @var array
		 */
		public $css_array = array();
		
		/*
		 * 설치 여부
		 * @var bool
		 */
		public $isInstalled = false;
		
		/*
		 * 메타 배열
		 * @var array
		 */
		public $meta_array = array();
		
		public $slowQuery = array();
		
		/*
		 * 따로 관리되는 모듈
		 * @var array
		 */
		private $except_moduler = array('music','document');
		
		/*
		 * 정적 GET 파라미터
		 * @var static
		 */
		private $getVars;
		
		private $sessVars;
		
		public $slowQueryIndex;
		
		protected static $instance = false;
		protected static $purifier;
		
		function cut_str($string, $length) 
		{
			if (mb_strlen($string) > $length) 
			{
				return mb_substr($string, 0, $length).'...';
			} 
			else 
			{
				return mb_substr($string, 0, $length);
			}
		}
		
		/**
		 * JSON 출력
		 *
		 * @param str $type
		 * @param str $message
		 */
		function response() 
		{
			$self = static::$instance;
			
			$request_params = array();
			$func_num = func_num_args();
			$func_get = func_get_args();
			$i = 0;
			
			while($i < $func_num) 
			{
				if (isset($func_get[$i + 1])) 
				{
					$request_params[$func_get[$i]] = $func_get[$i + 1];
				}
				
				$i = $i + 2;
			}
			
			if ($self->isAjax) 
			{
				header::file_json();
				echo json_encode($request_params);
			} 
			else 
			{
				if ($request_params['type'] === 'success') 
				{
					if (isset($request_params['html'])) 
					{
						echo $request_params['html'];
					} 
					elseif (isset($request_params['msg'])) 
					{
						echo $request_params['msg'];
					}
				} 
				else 
				{
					if (isset($request_params['html'])) 
					{
						echo $request_params['html'];
					} 
					elseif (isset($request_params['msg'])) 
					{
						echo $request_params['msg'];
					}
				}
			}
			
		}
		
		/*
		 * 에러메시지
		 */
		function set_error($message) 
		{
			$this->set('skin', sprintf("%s/tpl/error_msg.php", __MOD));
			$error_message = $message;
			include($this->get('skin'));
			exit();
		}
		
		/**
		 * 로그인 확인
		 *
		 * @return bool
		 */
		function isLogged() 
		{
			$isLogged = $this->get_session('is_logged');
			
			$isExist = (!empty($isLogged) || $isLogged == true) ? true : false;
			
			if ($isExist) 
			{
				return (bool)$isLogged;
			} 
			else 
			{
				return false;
			}
		}
	
		/**
		 * 로그인 확인
		 *
		 * @return bool
		 */
		function isAdmin($checkLogin = false):bool 
		{
			$loggedInfo = $this->get_session('logged_info');
			if ($loggedInfo === null) 
			{
				return false;
			}
			
			if ($checkLogin) 
			{
				if ($this->isLogged()) 
				{
					$isAdmin = (bool)$loggedInfo['is_admin'];
					if ($isAdmin !== true) 
					{
						//$isAdmin = false;
					}
					
					if (isset($isAdmin)) 
					{
						return $isAdmin;
					} 
					else 
					{
						return false;
					}
				} 
				else 
				{
					return false;
				}
			} 
			else 
			{
				$isAdmin = $loggedInfo['is_admin'];
				
				if (isset($isAdmin)) 
				{
					return $isAdmin;
				} 
				else 
				{
					return false;
				}
			}
		}
	
		/**
		 * 닉네임 확인
		 *
		 * @return string
		 */
		function getNickName():string
		{
			if ($this->isLogged()) 
			{
				$nick_name = (string)$this->get_session('logged_info')['nickname'];
				$nick_name = $this->htmlsc($nick_name);
				return $nick_name;
			} 
			else 
			{
				return null;
			}
		}

		function htmlsc($str) 
		{
			return htmlspecialchars($str, ENT_COMPAT | ENT_HTML401, 'UTF-8', false);
		}
		
		/**
		 * 닉네임 확인
		 *
		 * @return string
		 */
		function getUserId():string
		{
			if ($this->isLogged()) 
			{
				$user_id = (string)$this->get_session('logged_info')['user_id'];
				$user_id = $this->htmlsc($user_id);
				return $user_id;
			} 
			else 
			{
				return null;
			}
		}
		
		function getRootMenuTitle($menuData) 
		{
			foreach($menuData as $menuKey => $menu) 
			{
				if (is_array($menu)) 
				{
					foreach($menu as $submenuKey => $submenu) 
					{
						if ($menuData[$menuKey]['link'] == $_SERVER['REQUEST_URI']) 
						{
							return $menuData[$menuKey]['title'];
						} 
						else 
						{
							foreach ($menuData[$menuKey]['submenu'] as $submenuMapKey => $submenuMap) 
							{
								if ($submenuMap['link'] == $_SERVER['REQUEST_URI']) 
								{
									return $menuData[$menuKey]['title'];
								}
							}
						}
					}
				} 
				else 
				{
					if ($menu['link'] == $_SERVER['REQUEST_URI']) 
					{
						return $menu['title'];
					}
				}
			}
		}
		
		function getSubMenu($menuData) 
		{
			foreach($menuData as $menuKey => $menu) 
			{
				if (is_array($menu)) 
				{
					foreach($menu as $submenuKey => $submenu) 
					{
						if ($menuData[$menuKey]['link'] == $_SERVER['REQUEST_URI']) 
						{
							return $menuData[$menuKey]['submenu'];
						}
						else 
						{
							foreach ($menuData[$menuKey]['submenu'] as $submenuMapKey => $submenuMap) 
							{
								if ($submenuMap['link'] == $_SERVER['REQUEST_URI']) 
								{
									return $menuData[$menuKey]['submenu'];
								}
							}
						}
					}
				} 
				else 
				{
					if ($menu['link'] == $_SERVER['REQUEST_URI']) 
					{
						return $menu['submenu'];
					}
				}
			}
		}
		
		function cleanPurifier($value) 
		{
			return self::getPurifier()->purify($value);
		}
		
		function getPurifier() 
		{
			if (is_null(self::$purifier)) 
			{
				// 기본 설정을 불러온 후 적당히 커스터마이징을 해줍니다.
				$config = HTMLPurifier_Config::createDefault();

				$config->set('URI.AllowedSchemes', array('http' => true, 'https' => true, 'data' => true));

				$config->set('Attr.AllowedFrameTargets', array('_blank'));
				$config->set('Attr.EnableID', false);
				$config->set('Attr.DefaultImageAlt', '');

				// 인터넷 주소를 자동으로 링크로 바꿔주는 기능
				$config->set('AutoFormat.Linkify', true);

				// 이미지 크기 제한 해제 (한국에서 많이 쓰는 웹툰이나 짤방과 호환성 유지를 위해)
				$config->set('HTML.MaxImgLength', null);
				$config->set('CSS.MaxImgLength', null);

				// 다른 인코딩 지원 여부는 확인하지 않았습니다. EUC-KR인 경우 iconv로 UTF-8 변환후 사용하시는 게 좋습니다.
				$config->set('Core.Encoding', 'UTF-8');

				// 필요에 따라 DOCTYPE 바꿔쓰세요.
				$config->set('HTML.Doctype', 'XHTML 1.0 Transitional');
				$config->set('HTML.Allowed', 'a[href],audio[src|controls],video[src|controls],img[src|data-file-srl|alt]');
				$config->set('HTML.AllowedAttributes', 'src, height, width, alt, data-file-srl');
				
				// 플래시 삽입 허용
				$config->set('HTML.FlashAllowFullScreen', true);
				$config->set('HTML.SafeEmbed', true);
				$config->set('HTML.SafeIframe', true);
				$config->set('HTML.SafeObject', true);
				$config->set('Output.FlashCompat', true);
				// 최근 많이 사용하는 iframe 동영상 삽입 허용
				$config->set('URI.SafeIframeRegexp', '#^(?:https?:)?//(?:'.implode('|', array
				(
					'www\\.youtube(?:-nocookie)?\\.com/',
					'maps\\.google\\.com/',
					'player\\.vimeo\\.com/video/',
					'www\\.microsoft\\.com/showcase/video\\.aspx',
					'(?:serviceapi\\.nmv|player\\.music)\\.naver\\.com/',
					'(?:api\\.v|flvs|tvpot|videofarm)\\.daum\\.net/',
					'v\\.nate\\.com/',
					'play\\.mgoon\\.com/',
					'channel\\.pandora\\.tv/',
					'www\\.tagstory\\.com/',
					'play\\.pullbbang\\.com/',
					'tv\\.seoul\\.go\\.kr/',
					'ucc\\.tlatlago\\.com/',
					'vodmall\\.imbc\\.com/',
					'www\\.musicshake\\.com/',
					'www\\.afreeca\\.com/player/Player\\.swf',
					'static\\.plaync\\.co\\.kr/',
					'video\\.interest\\.me/',
					'player\\.mnet\\.com/',
					'sbsplayer\\.sbs\\.co\\.kr/',
					'img\\.lifestyler\\.co\\.kr/',
					'c\\.brightcove\\.com/',
					'www\\.slideshare\\.net/',
				)).')#');
				
				//|| $def = $config->maybeGetRawHTMLDefinition(true)
				
				if ($def = $config->getHTMLDefinition(true)) 
				{
					$def->addElement('video', 'Block', 'Optional: (source, Flow) | (Flow, source) | Flow', 'Common', array
					(
					  'src' => 'URI',
					  'type' => 'Text',
					  'width' => 'Length',
					  'height' => 'Length',
					  'poster' => 'URI',
					  'preload' => 'Enum#auto,metadata,none',
					  'controls' => 'Bool',
					));
					
					$def->addElement('audio', 'Block', 'Optional: (source, Flow) | (Flow, source) | Flow', 'Common', array
					(
					  'src' => 'URI',
					  'type' => 'Text',
					  'width' => 'Length',
					  'height' => 'Length',
					  'poster' => 'URI',
					  'preload' => 'Enum#auto,metadata,none',
					  'controls' => 'Bool',
					));
					
					$def->addElement('img', 'Block', 'Optional: (source, Flow) | (Flow, source) | Flow', 'Common', array
					(
					  'src' => 'URI',
					  'type' => 'Text',
					  'data-file-srl' => 'Text',
					  'width' => 'Length',
					  'height' => 'Length',
					  'poster' => 'URI',
					  'preload' => 'Enum#auto,metadata,none',
					  'controls' => 'Bool',
					));
				}
				
				// 설정을 저장하고 필터링 라이브러리 초기화
				 self::$purifier = new HTMLPurifier($config);
			}
			
			return self::$purifier;
		}
		
		/**
		 * 닉네임 확인
		 *
		 * @return string
		 */
		function getMemberSrl() 
		{
			if ((bool)$this->isLogged()) 
			{
				$memberSrl = (int)$this->get_session('logged_info')['member_srl'];
				if ($memberSrl) 
				{
					return $memberSrl;
				} 
				else 
				{
					return 0;
				}
			} 
			else 
			{
				return 0;
			}
		}

		function hasGrant($only_admin = false) 
		{
			$isLogged = (bool)$this->isLogged();
			$isAdmin = (bool)$this->isAdmin();
			
			if ($isLogged) 
			{
				if ($only_admin === true) 
				{
					if ($isAdmin === true) 
					{
						return true;
					} 
					else 
					{
						return false;
					}
				} 
				else 
				{
					return true;
				}
			} 
			else 
			{
				return false;
			}
		}
		
		function includeFile($object_system, $object, $required = true) 
		{
			$func_num = func_num_args();
			$func_get = func_get_args();
			if (is_bool($func_get[0])) 
			{
				$i = 1;
				while($i < $func_num) 
				{
					if (!class_exists($func_get[$i+1])) 
					{
						$object_system = $func_get[$i];
						if (file_exists($object_system) && is_file($object_system) && is_readable($object_system)) 
						{
							include_once $object_system;
						}
					}
					
					$i = $i+2;
				}
			} 
			elseif (!class_exists($object)) 
			{
				if (file_exists($object_system) && is_file($object_system) && is_readable($object_system)) 
				{
					include_once $object_system;
				} 
				else 
				{
					if ($required) 
					{
						$this->setError($object_system.''.$this->lang['notfoundbaseresource']);
					}
				}
			}
		}
		
		function getExtension($type, $module) 
		{
			static $instance_extension = null;

			if (in_array($module, $this->except_moduler)) 
			{
				$this->module_dir = sprintf("%s/board/%s", __MOD, $module);
				$this->moduler = "board";
			} 
			else 
			{
				$this->module_dir = sprintf("%s/%s", __MOD, $module);
				$this->moduler = $module;
			}
			
			$base_class = sprintf("%s/%s.class.php", $this->module_dir, 'base');
			$components = sprintf("%s/%s.class.php", $this->module_dir, $type);
			$model_class = sprintf("%s/%s.model.php", $this->module_dir, 'model');
			
			if (file_exists($components) && is_file($components) && file_exists($base_class)) 
			{
				if (!class_exists($this->moduler)) 
				{
					include_once $base_class;
				}
				
				if (file_exists($model_class)) 
				{
					exit($model_class);
					include_once($model_class);
					$this->modelObject = $this->moduler.'_model';
					$this->{$this->moduler}->model = new $this->modelObject($this);
				}
				
				include_once $components;
				
				$this->request_method = strtoupper($this->getReq());
				$request_handler_interface = $this->moduler.'_'.$this->request_method.'.interface';
				$request_handler_abstract = $this->moduler.'_'.$this->request_method.'.abstract';
				$request_handler_model = $this->moduler.'_'.$this->request_method.'.interface';
			
				$abstractComponents = sprintf("%s/%s.abstract.php", $this->module_dir, $type);
				$this->includeFile($abstractComponents, $request_handler_abstract, false);
				
				$interfaceComponents = sprintf("%s/%s.interface.php", $this->module_dir, $type);
				$this->includeFile($interfaceComponents, $request_handler_interface, false);
				
				$extend = sprintf("%s_%s",$this->moduler, $type);
				
				if ($extend) 
				{
					$this->moduler_handler = (object)new $extend();
				}
				
				$this->{$this->moduler} = new stdClass();
				if (method_exists($this->moduler_handler,'init') && $this->moduler != 'init') 
				{
					$this->{$this->moduler} = $this->moduler_handler->init($this);
					
					if (!empty($this->moduler)) 
					{
						$this->{$this->moduler}->module = $this->moduler;
					}
					
					$this->{$this->moduler}->module_id = $this->get_params(__MODULEID, 'string');
				}
				
				if ($type === 'view') 
				{
					if ($this->moduler === 'board') 
					{
						$this->{$this->moduler}->tpl_path = sprintf("%s/board/%s/tpl",__MOD, $this->moduler);
					} 
					else 
					{
						$this->{$this->moduler}->tpl_path = sprintf("%s/%s/tpl/",__MOD, $this->moduler);
					}
				}
				
				if (!is_object($this->moduler_handler)) 
				{
					return new stdClass();
				} 
				else 
				{
					return (object)$this->moduler_handler;
				}
			} 
			else 
			{
				exit("can't found extension $components");
			}
		}
		
		function getView($module) 
		{
			return (object)$this->getExtension('view', $module);
		}
		function isInstalled():bool
		{
			$self = static::$instance;
			
			if (isset($self->isInstalled)) 
			{
				return (bool)$self->isInstalled;
			}
		}
		
		function getItem($module) 
		{
			return (object)$this->getExtension('item', $module);
		}
		
		function getModel($module) 
		{
			return (object)$this->getExtension('model', $module);
		}
		
		function getController($module) 
		{
			return (object)$this->getExtension('controller', $module);
		}
		
		/**
		 * 정적 Context
		 *
		 * @return string
		 */
		function &getInstance() 
		{
			static $obj = null;
			if (!$obj) $obj = new base();

			return $obj;
		}
		
		/**
		 * 위젯 버퍼 출력
		 *
		 * @return buff
		 */
		function display_widget($widget) 
		{
			$skin = sprintf("%s/widget/%s/widget.php", __DIR, $widget);
			
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
			
			$include = ob_get_contents();
			ob_end_clean();
			
			echo $include;
		}
		
		/**
		 * 레이아웃 리스트 불러오기
		 *
		 * @return string
		 */
		function getLayoutList($isMobile = false):array{
			$layout_arr = array();
			$args = va::args();
			
			if ($isMobile) 
			{
				$args->path = sprintf("%s/%s",__MOD,'layout/m.tpl');
			} 
			else 
			{
				$args->path = sprintf("%s/%s",__MOD,'layout/tpl');
			}
			
			$args->show_sub = false;
			$args->show_path = false;
			$tmp_convert = dir::_list($args);
			
			foreach($tmp_convert as $key=>$val) 
			{
				if (is_dir(sprintf("%s/%s",$args->path, $val))) 
				{
					$layout_filie = sprintf("%s/%s/skin.php", $args->path, $val);
					
					if (file_exists($layout_filie)) 
					{
						array_push($layout_arr, $val);
					}
				}
			}
			
			return $layout_arr;
		}
		
		/**
		 * 메타 추가
		 */
		function addMeta($name, $content) 
		{
			$self = static::$instance;
			$self->meta_array[] = array
			(
				'name'=>$name,
				'content'=>$content
			);
		}
		
		/**
		 * 메타값 가져오기
		 *
		 * @return array
		 */
		function getMeta() 
		{
			$self = static::$instance;
			return $self->meta_array;
		}
		
		protected function liftCSS($css) 
		{
			$self = static::$instance;
			if (preg_match('/\.css(\?.*)?$/i', $css)) 
			{
				if (!maya::execute('$http||https$', $css, 'boolean', false) && file_exists(sprintf("%s%s", __DIR, $css))) 
				{
					$cssFile = sprintf("%s%s", __SUB, $css);
					if (in_array($cssFile, $self->css_array)) 
					{
						return;
					}
					
					$self->css_array[] = sprintf("%s?%s", $cssFile, substr(md5(date("YmdHis", (filemtime(__DIR.$css)))), 0, 7));
					clearstatcache();
				}
				elseif (maya::execute('$http||https$', $css, 'boolean', false)) 
				{
					if (in_array($css, $self->css_array)) 
					{
						return;
					}
					
					$self->css_array[] = $css;
				}
			}
		}
		
		protected function liftJS($js, $type='head') 
		{
			$self = static::$instance;
			if (preg_match('/\.js(\?.*)?$/i', $js)) 
			{
				if (!maya::execute('$http||https$', $js, 'boolean', false) && file_exists(__DIR.$js)) 
				{
					$jsFile = sprintf("%s%s", __SUB, $js);
					
					if (in_array($jsFile, $self->js_array)) 
					{
						return;
					}
					
					$jsTarget = sprintf("%s?%s", $jsFile, substr(md5(date("YmdHis", (filemtime(__DIR.$js)))),0,7));
					
					if ($type === 'head') 
					{
						$self->js_array[] = $jsTarget;
						clearstatcache();
					} 
					else 
					{
						$self->js_body_array[] = $jsTarget;
						clearstatcache();
					}
				} 
				elseif (maya::execute('$http||https$', $js, 'boolean', false)) 
				{
					if (in_array($js, $self->js_array)) 
					{
						return;
					}
					
					if ($type === 'head') 
					{
						$self->js_array[] = $js;
					} 
					else 
					{
						$self->js_body_array[] = $jsFile."?".substr(md5(date("YmdHis", (filemtime(__DIR.$js)))),0,7);
					}
				}
			}
		}
		
		/**
		 * 스타일시트 추가
		 */
		function addCSS($css) 
		{
			$i = 0;;
			$func_num = func_num_args();
			$func_get = func_get_args();
			
			if ($func_num > 2) 
			{
				while($i < $func_num) 
				{
					$this->liftCSS($func_get[$i++]);
				}
			} 
			else 
			{
				$this->liftCSS($css);
			}
		}
		
		/**
		 * 자바스크립트 자원 추가
		 */
		function addJS($js, $type='head') 
		{
			$func_num = func_num_args();
			$func_get = func_get_args();
			
			if ($func_num > 2) 
			{
				$i = 1;
				$type = $func_get[0];
				
				while ($i < $func_num) 
				{
					$this->liftJS($func_get[$i++], $type);
				}
			} 
			else 
			{
				$this->liftJS($js, $type);
			}
		}
		
		/**
		 * 자바스크립트 자원 가져오기
		 *
		 * @return array
		 */
		function getJS() 
		{
			$self = static::$instance;
			return $self->js_array;
		}
		
		function getBodyJS() 
		{
			$self = static::$instance;
			return $self->js_body_array;
		}
		
		/**
		 * 스타일시트 자원 가져오기
		 *
		 * @return array
		 */
		function getCSS() 
		{
			$self = static::$instance;
			return $self->css_array;
		}
		
		function emptyJS() 
		{
			$self = static::$instance;
			foreach($self->js_array as $key=>$val) 
			{
				if (!maya::execute('$http||https$', $val, 'boolean', false)) 
				{
					unset($self->js_array[$key]);
				}
			}
		}
		
		function emptyBodyJS() 
		{
			$self = static::$instance;
			foreach($self->js_body_array as $key=>$val) 
			{
				if (!maya::execute('$http||https$', $val, 'boolean', false)) 
				{
					unset($self->js_body_array[$key]);
				}
			}
		}
		
		function emptyCSS() 
		{
			$self = static::$instance;
			foreach($self->css_array as $key=>$val) 
			{
				if (!maya::execute('$http||https$', $val, 'boolean', false)) 
				{
					unset($self->css_array[$key]);
				}
			}
		}
		
		function set($key, $val) 
		{
			$self = static::$instance;
			$self->{$key} = $val;
		}
		
		function get($key) 
		{
			$self = static::$instance;
			
			if (isset($self->{$key})) 
			{
				return $self->{$key};
			} 
			else 
			{
				return null;
			}
		}
		
		function getReq() 
		{
			$self = static::$instance;
			return $self->req;
		}
		
		function getPDO() 
		{
			$self = static::$instance;
			return $self->pdo;
		}
		
		function getHost() 
		{
			$self = static::$instance;
			return $self->host;
		}
		
		function initHost() 
		{
			$self = static::$instance;
			if ($self !== false) 
			{
				$self->host = request::get_host();
			}
		}
		
		function unsetReq($key) 
		{
			$self = static::$instance;
			unset($self->get[$key]);
		}
		
		function initReq() 
		{
			$self = static::$instance;
			if ($self !== false) 
			{
				$self->get = request::get_req_get();
			}
		}
		
		function getGlobalParams($key) 
		{
			$self = static::$instance;
			
			if (array_key_exists($key, $self->globalParams)) 
			{
				if (isset($self->globalParams[$key])) 
				{
					return $self->globalParams[$key];
				} 
				else 
				{
					return null;
				}
			} 
			else 
			{
				return null;
			}
		}
		
		function setGlobalParams() 
		{
			$self = static::$instance;
			$hash = request::get_req_method();
			
			switch (strtoupper($hash)) 
			{
				case 'GET':
					$_vars = $_GET;
					break;
				case 'POST':
					$_vars = $_POST;
					break;
				case 'FILES':
					$_vars = $_FILES;
					break;
				default:
			}
			
			if ($self !== false) 
			{
				$self->globalParams = $_vars;
			}
		}
		
		function getRewriteParams($vars) 
		{
			$self = static::$instance;
			if (is_object($vars)) 
			{
				$get_vars = get_object_vars($vars);
			}
			else 
			{
				$get_vars = $vars;
			}
			
			$var_keys = array_keys($get_vars);
			sort($var_keys);
			$target = join('.', $var_keys);
			return $target;
		}
		
		function getSlowQuery()
		{
			$self = static::$instance;
			
			return $self->slowQuery;
		}
		
		function setSlowQuery($query, $time, $caller) 
		{
			$self = static::$instance;
			++$self->slowQueryIndex;
			
			$self->slowQuery[$self->slowQueryIndex] = array(
				"time" => number_format($time, 8, ".", "."),
				"query" => $query,
				"caller" => $caller
			);
		}
		
		function set_params($key, $val, $method = 'GET') 
		{
			$self = static::$instance;
			if ($method === 'GET') 
			{
				$self->getVars[$key] = $val;
				$_GET[$key] = $val;
			}
			else
			{
				$this->post[$key] = $val;
				$_POST[$key] = $val;
			}
		}
		
		function getall() 
		{
			$self = static::$instance;
			return $self->getVars;
		}
		
		function filterByType($val, $type) 
		{
			switch ($type) 
			{
				case 'int':
					if (!is_int($val) || !ctype_digit($val)) 
					{
						$val = 0;
					} 
					else 
					{
						$val = (int)$val;
					}
					
					break;
				case 'bool':
					if (!is_bool($val)) 
					{
						$val = false;
					} 
					else 
					{
						$val = (bool)$val;
					}
					
					break;
				case 'string':
					if (!is_string($val)) 
					{
						$val = null;
					} 
					else 
					{
						$val = (string)$val;
					}
					
					break;
			}
			
			return $val;
		}
		
		function get_params($key, $type = null) 
		{
			$self = static::$instance;
			$type = isset($type) ? $type : 'string';
			
			if (isset($self->getVars[$key])) 
			{
				$value = $self->getVars[$key];
				$value = $self->filterByType($value, $type);
				return $value;
			}
			else 
			{
				return null;
			}
		}
		
		function get_session_instance($key, $type = null) 
		{
			$self = static::$instance;
			if (isset($self->sessVars)) 
			{
				return $self->sessVars;
			} 
			else 
			{
				return new stdClass();
			}
		}
		
		function get_session($key) 
		{
			$self = static::$instance;
			$type = isset($type) ? $type : 'string';
			
			if (isset($self->sessVars[$key]) && array_key_exists($key, $self->sessVars)) 
			{
				$value = $self->sessVars[$key];
				return $value;
			} 
			else 
			{
				return null;
			}
		}
		
		function post_params($key) 
		{
			$self = static::$instance;
			if (!isset($self->post)) 
			{
				$self->post = (string)request::get_req_post();
			}
			
			if (!isset($self->post[$key])) 
			{
				$self->post[$key] = null;
			}
			
			return $self->post[$key];
		}
		
		protected function ImageResize($file, $srl, $thumbnail_width, $thumbnail_height, $root, $mode='crop') 
		{
			if (maya::execute('@\@!jpg||png||bmp||gif||jpeg!', $file, 'boolean')) 
			{
				$resize_target = sprintf('%s%s/%sx%s.jpg', $root, $srl, $thumbnail_width, $thumbnail_height);
				
				$ff = sprintf('%s%s%s', __DIR, $root, $srl);
				if (!is_dir($ff)) mkdir($ff,755);
				
				$fp = __DIR.$resize_target;
				if (!file_exists($fp)) 
				{
					$path_file = sprintf('%s%s%s/%s', __DIR, __FILE__ATTACH, $srl, $file);
					
					if (filesize($path_file) === 0) 
					{
						unlink($path_file);
						
						return;
					}
					
					$resize_width = (int)$thumbnail_width;
					$resize_height = (int)$thumbnail_height;
					
					$args = va::args();
					$args->source = $path_file;
					$args->width = $resize_width;
					$args->height = $resize_height;
					$virtual_image = image::resize($args);
					
					if ($virtual_image) 
					{
						$args_image = va::args();
						$args_image->source = $path_file;
						$args_image->dest = $fp;
						$args_image->image = $virtual_image;
						image::make($args_image);
						$fp = sprintf('%s%s', __SUB, $resize_target);
						return $fp;
					}
					else 
					{
						return false;
					}
				} 
				else 
				{
					return __SUB.$resize_target;
				}
			}
		}
		
		/**
		 * Make Thumbnail
		 *
		 * @param string $file
		 * @param   int  $srl
		 * @param   int  $thumbnail_width
		 * @param   int  $thumbnail_height
		 */
		function makeThumbnail($file, $srl, $thumbnail_width, $thumbnail_height, $mode='crop') 
		{
			return $this->ImageResize($file, $srl, $thumbnail_width, $thumbnail_height, __THUMB__ATTACH, $mode);
		}
		
		/**
		 * Make Resize
		 *
		 * @param string $file
		 * @param   int  $srl
		 * @param   int  $thumbnail_width
		 * @param   int  $thumbnail_height
		 */
		function makeResize($file, $srl, $thumbnail_width, $thumbnail_height, $mode='crop') 
		{
			return $this->ImageResize($file, $srl, $thumbnail_width, $thumbnail_height, __RESIZE__ATTACH, $mode);
		}
		
		function printHeader() 
		{
			header("Server: FLOWER");
			header("Access-Control-Allow-Credentials:true");
			header("Access-Control-Allow-Origin: *.".__SERVERNAME);
			header("X-Frame-Options: SAMEORIGIN");
			header("X-Content-Type-Options: nosniff");
			header("X-EdgeConnect-Origin-MEX-Latency: 16");
			header("X-Powered-By: FLOWER");
			header("X-Content-Type-Options: nosniff");
			header("Content-Security-Policy:form-action 'self' ; base-uri 'self'; connect-src 'self' *.".__SERVERNAME.";  frame-ancestors 'self' *.youtube.com *.".__SERVERNAME." ; object-src 'self';");
			header('Cache-Control: no-store, no-cache, private, max-age=0, must-revalidate, post-check=0, pre-check=0; Pragma: no-cache; Expires: Sat, 26 jul 1997 05:00:00 GMT; ');
		}
		
		function makeDir() 
		{
			$dirList = array
			(
				__DIR.'/file',
				__DIR.'/file/attach',
				__DIR.'/file/cache',
				__DIR.'/file/config',
				__DIR.'/file/image',
				__DIR.'/file/resize',
				__DIR.'/file/thumbnail',
				__DIR.'/file/zlib'
			);
			
			$args = va::args();
			$args->mode = 757;
			$args->path = $dirList;
			dir::make($args);
		}
		
		/**
		 * 요청
		 *
		 * @return string
		 */
		function call() 
		{
			libxml_disable_entity_loader(false);

			$this->initReq();
			$this->initHost();
			$this->printHeader();
			$this->makeDir();
			
			$self = self::getInstance();
			$self->isInstalled = false;
			$self->setGlobalParams();
			$self->req = request::get_req_method();
			$self->isAjax = request::isAjax();
			$self->get = request::get_req_get();
			$self->getVars = request::get_req_get();
			$self->post = request::get_req_post();
			$self->sessVars = session::getSessionInstance();
			$self->slowQueryIndex = 0;
			
			static::$instance = $self;
			
			$dbFilePath = sprintf("%s/file/config/db.php", __DIR);
			
			$args = va::args();
			$args->from = $dbFilePath;
			$isDatabaseFileExists = file::exist($args);
			
			if ($isDatabaseFileExists) 
			{
				$self->isInstalled = true;
				
				$databasePermit = substr(sprintf('%o', fileperms($dbFilePath)), -4);
				if ($databasePermit === '0777') 
				{
					exit('Database config file permit is 0777');
				}
				
				include($dbFilePath);
				
				if (!count(${$_prefix})) 
				{
					exit("Database prefix isn't exists");
				}
				
				$args = va::args();
				$args->localhost = ${$_prefix}['localhost'];
				$args->db = ${$_prefix}['db'];
				$args->user = ${$_prefix}['user'];
				$args->password = ${$_prefix}['password'];
				$args->catch_err = true;
				$self->pdo = db::run($args);
				$self->db_info = ${$_prefix};
				unset(${$_prefix});
				
				$init = $self->getView('init');
				$init->init();
			} 
			else 
			{
				$self->set_params(__MODULEID, 'install');
				$init = $self->getView('init');
				$init->init();
			}
		}
		
	}

?>