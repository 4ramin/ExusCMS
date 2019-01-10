<?php

	if (!defined("__FLOWER__")) exit();

	class admin_model extends admin
	{
		
		function __construct($args) 
		{
			$this->base = new base();
			$this->pdo = $this->base->getPDO();
		}
		
		function getSubPlugins() 
		{
			$plugin_arr = array();
			$args = va::args();
			$args->path = __PLUGIN;
			$args->show_sub = FALSE;
			$args->show_path = FALSE;
			$tmp_convert = dir::_list($args);
			$oPluginModel = $this->base->getModel('plugin');
			
			$pcPlugin = $oPluginModel->getPlugin('PC');
			
			if (isset($pcPlugin)) 
			{
				if (isset($pcPlugin[0]['activate_addon'])) 
				{
					$onPC = json_decode($pcPlugin[0]['activate_addon']);
				}
			}
			
			$mobilePlugin = $oPluginModel->getPlugin('MOBILE');
			
			if (isset($mobilePlugin)) 
			{
				if (isset($mobilePlugin[0]['activate_addon'])) 
				{
					$onMobile = json_decode($mobilePlugin[0]['activate_addon']);
				}
			}
			
			if (!isset($onPC)) 
			{
				$onPC = array();
			}
			
			if (!isset($onMobile)) 
			{
				$onMobile = array();
			}
			
			foreach($tmp_convert as $key=>$val) 
			{
				$plugin_path = sprintf("%s/%s",__PLUGIN,$val);
				if (is_dir($plugin_path)) 
				{
					$plugin_info_dir = sprintf("%s/info.php",$plugin_path);
					if (file_exists($plugin_info_dir)) 
					{
						include($plugin_info_dir);
						array_push($plugin_arr,
							array(
								"plugin_name"=>$val,
								"title" => $plugin_info['title'],
								"description" => $plugin_info['description'],
								"version" => $plugin_info['version'],
								"author" => $plugin_info['author'],
								"installed_dir" => sprintf("./plugin/%s",$val),
								"onPC" => in_array($val,$onPC) ? 'TRUE' : 'FALSE',
								"onMOBILE" => in_array($val,$onMobile) ? 'TRUE' : 'FALSE'
							)
						);
					}
				}
			}
			
			return $plugin_arr;
		}
		
		function getComponents() 
		{
			$plugin_arr = array();
			$args = va::args();
			$args->path = __COMPONENTS;
			$args->show_sub = FALSE;
			$args->show_path = FALSE;
			$tmp_convert = dir::_list($args);
			$oEditorModel = $this->base->getModel('editor');
			
			$pcComponent = $oEditorModel->getComponent('PC');
			
			if (isset($pcComponent)) 
			{
				if (isset($pcComponent[0]['activate_component'])) 
				{
					$onPC = json_decode($pcComponent[0]['activate_component']);
				}
			}
			
			$mobileComponent = $oEditorModel->getComponent('MOBILE');
			
			if (isset($mobileComponent)) 
			{
				if (isset($mobileComponent[0]['activate_component'])) 
				{
					$onMobile = json_decode($mobileComponent[0]['activate_component']);
				}
			}
			
			if (!isset($onPC)) 
			{
				$onPC = array();
			}
			
			if (!isset($onMobile)) 
			{
				$onMobile = array();
			}
			
			foreach($tmp_convert as $key=>$val) 
			{
				$plugin_path = sprintf("%s/%s",__COMPONENTS,$val);
				if (is_dir($plugin_path)) 
				{
					$plugin_info_dir = sprintf("%s/info.php",$plugin_path);
					
					if (file_exists($plugin_info_dir)) 
					{
						include($plugin_info_dir);
						array_push($plugin_arr,
							array(
								"plugin_name"=>$val,
								"title"=>$plugin_info['title'],
								"description"=>$plugin_info['description'],
								"version"=>$plugin_info['version'],
								"author"=>$plugin_info['author'],
								"installed_dir"=>sprintf("./plugin/%s",$val),
								"onPC"=>in_array($val,$onPC) ? 'TRUE' : 'FALSE',
								"onMOBILE"=>in_array($val,$onMobile) ? 'TRUE' : 'FALSE'
							)
						);
					}
				}
			}
			
			return $plugin_arr;
		}
		
		function getPlugins() 
		{
			$plugin_arr = array();
			$args = va::args();
			$args->path = __MOD;
			$args->show_sub = FALSE;
			$args->show_path = FALSE;
			$pluginPath = dir::_list($args);
			
			foreach($pluginPath as $key=>$val) 
			{
				$plugin_path = sprintf("%s/%s",__MOD,$val);
				
				if (is_dir($plugin_path)) 
				{
					$plugin_info_dir = sprintf("%s/info.php",$plugin_path);
					if (file_exists($plugin_info_dir)) 
					{
						include($plugin_info_dir);
						array_push($plugin_arr,
							array(
								"plugin_name"=>$val,
								"title"=>$plugin_info['title'],
								"description"=>$plugin_info['description'],
								"version"=>$plugin_info['version'],
								"author"=>$plugin_info['author'],
								"installed_dir"=>sprintf("./module/%s/%s",__COMPONENTS__,$val)
							)
						);
					}
				}
			}
			
			return $plugin_arr;
		}
		
		/**
		 * get original album
		 *
		 * @param int $pgx
		 */
		function getCategoryNamebysrl($srl) 
		{
			return db::Query('SELECT','def_category',
			[
				['', 'category_srl', '=', ':args1', $srl]
			],'name', 'one');
		}
		
		function getComponentsCount($type) 
		{
			return db::Query('SELECT','def_editor_component',
			[
				['', 'type', '=', ':type', $type]
			],'count(*)', 'one');
		}
		
		function getPluginCount($type) 
		{
			return db::Query('SELECT','def_addon',
			[
				['', 'type', '=', ':type', $type]
			],'count(*)', 'one');
		}
		
		/**
		 * 중복 썸네일을 한번만 요청할 수 있도록 MD5를 생성한다.
		 *
		 * @param string $md5
		 * @param string $module
		 * @param int $srl
		 */
		function updateComponents($plugin, $type) 
		{
			return db::Query('UPDATE','def_editor_component',
			[
				['WHERE', 'activate_component', '=', ':args1', $plugin],
				['', 'type', '=', ':args2', $type]
			],'', 'boolean');
		}
	
		/**
		 * 모듈의 값이 비어있을 경우 설정값을 입력한다.
		 *
		 * @param str $module
		 * @param str $config
		 */
		function insertComponents($plugin, $config) 
		{
			$sth = $this->pdo->prepare("INSERT INTO def_editor_component (activate_component, type) VALUES (:plugin, :config)");
			$sth->bindParam(':plugin', $plugin, PDO::PARAM_STR);
			$sth->bindParam(':config', $config, PDO::PARAM_STR);
			$sth->execute();
		}

		/**
		 * 중복 썸네일을 한번만 요청할 수 있도록 MD5를 생성한다.
		 *
		 * @param string $md5
		 * @param string $module
		 * @param int $srl
		 */
		function updatePlugin($plugin, $type) 
		{
			return db::Query('UPDATE','def_addon',
			[
				['WHERE', 'activate_addon', '=', ':args1', $plugin],
				['', 'type', '=', ':args2', $type]
			],'', 'boolean');
		}
	
		/**
		 * 모듈의 값이 비어있을 경우 설정값을 입력한다.
		 *
		 * @param str $module
		 * @param str $config
		 */
		function insertPlugin($plugin, $config) 
		{
			$sth = $this->pdo->prepare("INSERT INTO def_addon (activate_addon, type) VALUES (:plugin, :config)");
			$sth->bindParam(':plugin', $plugin, PDO::PARAM_STR);
			$sth->bindParam(':config', $config, PDO::PARAM_STR);
			$sth->execute();
		}

		/**
		 * 파일 개수를 가져온다
		 *
		 * @param string $module
		 */
		function getFileCount() 
		{
			return db::Query('SELECT','def_file',[
			],'count(*)', 'one');
		}

		function getFileListbySrl($srl) 
		{
			return db::Query('SELECT','def_file',[
				['', 'srl', '=', ':srl', $srl]
			],'*', 'all');
		}
	
		function getFileList($srl) 
		{
			return db::Query('SELECT','def_file',[
				['', 'target', '=', ':srl', $srl]
			],'*', 'all');
		}
	
		function getBoardList() 
		{
			return db::Query('SELECT','def_module',[
			],'*', 'all');
		}
	
		function getFileListLIMIT($page_start) 
		{
			$sth = $this->pdo->prepare("SELECT * FROM def_file ORDER by target desc LIMIT :page_start, 20");
			$sth->bindParam(':page_start', $page_start, PDO::PARAM_INT);
			$sth->execute();
			return $sth->fetchAll();
		}
		
		function getCommentListLIMIT($page_start) 
		{
			$sth = $this->pdo->prepare("SELECT * FROM def_comment LIMIT :page_start, 20");
			$sth->bindParam(':page_start', $page_start, PDO::PARAM_INT);
			$sth->execute();
			return $sth->fetchAll();
		}
		
		function getMemberListLIMIT($page_start) 
		{
			$sth = $this->pdo->prepare("SELECT * FROM def_member LIMIT :page_start, 20");
			$sth->bindParam(':page_start', $page_start, PDO::PARAM_INT);
			$sth->execute();
			return $sth->fetchAll();
		}
		
		function getDocumentListLIMIT($page_start) 
		{
			$sth = $this->pdo->prepare("SELECT * FROM def_document_music ORDER by srl_bd desc LIMIT :page_start, 20");
			$sth->bindParam(':page_start', $page_start, PDO::PARAM_INT);
			$sth->execute();
			return $sth->fetchAll();
		}
		
		/**
		 * 페이지 네비게이션 배열을 가져온다
		 *
		 * @param int $board_count
		 * @param int $page_start
		 * @param int $page_end
		 */
		function getPageArray($board_count, $get_page, $page_count=10) 
		{
			$arr_page = array();
			$pg_x = 0;
			
			$page_count_rel = ceil($page_count / 2);
			$board_count = ($board_count < 0) ? 1 : $board_count;

			if ($get_page > $board_count - ($page_count - 1)) 
			{
				$pg_index = $board_count - $page_count;
			} 
			else if ($get_page > $page_count_rel) 
			{
				$pg_index = $get_page - ($page_count_rel);
			}
			
			while ($pg_x<$page_count) 
			{
				++$pg_x;
				if (isset($pg_index)) 
				{
					$pg_insert = $pg_x + $pg_index;
					if ($pg_insert > 0) 
					{
						array_push($arr_page,$pg_insert);
					}
				} 
				else 
				{
					array_push($arr_page,$pg_x);
				}
			}
			
			return $arr_page;
		}
	
	}
?>