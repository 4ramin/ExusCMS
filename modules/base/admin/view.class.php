<?php

	class admin_view extends admin 
	{
		
		function __construct() 
		{
			$this->base = new base();
			$this->pdo = $this->base->getPDO();
			$this->base->addJS("/modules/base/admin/tpl/js/admin.js");
		}
		
		function init($args) 
		{
			if (!$this->base->hasGrant(true)) 
			{
				$this->base->set_error('권한이 없습니다.');
			}
			
			$this->admin = new stdClass;
			$this->admin->default_action = "dispAdminPage";
			$this->admin->model = new Admin_Model($this);
			
			$this->base->set('layout',__MOD."/admin/tpl/admin_page.php");
			$this->base->addCSS("/common/css/combination.css");
			$this->base->addCSS("/modules/base/admin/tpl/css/admin.css");
			
			return $this->admin;
		}
		
		function dispAdminCommentList() 
		{
			$this->admin->list_count = 20;
			$this->admin->page = $this->base->get_params('page') ? $this->base->get_params('page') : 1;
			$this->admin->query = $this->admin->model->getCommentListLIMIT(($this->admin->page-1)*$this->admin->list_count);
			$this->base->set('skin', sprintf("%s/comment_list.php", $this->admin->tpl_path));
		}
		
		function dispAdminBoardList() 
		{
			$oBoardQuery = $this->base->getQuery('music');
			
			$this->admin->list_count = 20;
			$this->admin->page = $this->base->get_params('page') ? $this->base->get_params('page') : 1;
			$this->admin->document_count = $oBoardQuery->getBoardAllCount();
			$this->admin->page_count = (int)ceil($this->admin->document_count / $this->admin->list_count);
			$this->admin->page_start = $this->admin->document_count - ($this->admin->page * $this->admin->list_count) + 1;
			$this->admin->page_end = $this->admin->page_start + $this->admin->list_count - 1;
			$this->admin->page_navigation = $this->admin->model->getPageArray($this->admin->page_count, $this->admin->page);
			$this->admin->query = $this->admin->model->getBoardList();
			
			$this->base->set('skin', sprintf("%s/board_list.php", $this->admin->tpl_path));
		}
		
		function dispAdminComponentList() 
		{
			$this->admin->component_list = $this->admin->model->getComponents();
			$this->base->set('skin', sprintf("%s/component_list.php", $this->admin->tpl_path));
		}
		
		function dispAdminPluginList() 
		{
			$this->admin->plugin_list = $this->admin->model->getPlugins();
			$this->base->set('skin', sprintf("%s/plugin_list.php", $this->admin->tpl_path));
		}
		
		function dispAdminMemberList() 
		{
			$this->admin->list_count = 20;
			$this->admin->page = $this->base->get_params('page') ? $this->base->get_params('page') : 1;
			$this->admin->query = $this->admin->model->getMemberListLIMIT(($this->admin->page-1)*$this->admin->list_count);
			$this->base->set('skin', sprintf("%s/member_list.php", $this->admin->tpl_path));
		}
		
		function dispAdminPluginAdmin() 
		{
			$this->admin->plugin_list = $this->admin->model->getSubPlugins();
			$this->base->set('skin', sprintf("%s/subplugin_list.php", $this->admin->tpl_path));
		}
		
		function dispAdminFileList() 
		{
			$this->admin->list_count = 20;
			$this->admin->page = $this->base->get_params('page') ? $this->base->get_params('page') : 1;
			$this->admin->document_count = $this->admin->model->getFileCount();
			$this->admin->page_count = (int)ceil($this->admin->document_count / $this->admin->list_count);
			$this->admin->page_start = $this->admin->document_count - ($this->admin->page * $this->admin->list_count) + 1;
			$this->admin->page_end = $this->admin->page_start + $this->admin->list_count - 1;
			$this->admin->page_navigation = $this->admin->model->getPageArray($this->admin->page_count, $this->admin->page);
			$this->admin->query = $this->admin->model->getFileListLIMIT(($this->admin->page-1)*20);
			
			$this->base->set('skin', sprintf("%s/file_list.php", $this->admin->tpl_path));
		}
		
		function dispAdminSystemConfig() 
		{
			$this->base->addCSS("/modules/base/admin/tpl/css/setup.css");
			
			$this->admin->module_id = $this->base->get_params(__MODULEID);
			$this->admin->xml_path = sprintf("%s/setup.xml", $this->admin->tpl_path);
			
			if (file_exists($this->admin->xml_path)) 
			{
				$this->base->set('config', $this->admin->config);
				$this->base->set('act', 'procAdminSetup');
				$this->base->set('gnbtab', sprintf("%s/gnb.php", $this->admin->tpl_path));
				$this->base->set('tab', sprintf("%s/_header.php", $this->admin->tpl_path));
				$this->base->set('xml', simplexml_load_string(file_get_contents($this->admin->xml_path)));
				$this->base->set('skin', sprintf("%s/tpl/setup.php", __MOD));
			}
		}
		
		function dispAdminDocumentList() 
		{
			$oBoardQuery = $this->base->getQuery('music');
			$this->admin->list_count = 20;
			$this->admin->page = $this->base->get_params('page') ? $this->base->get_params('page') : 1;
			$this->admin->document_count = $oBoardQuery->getDocumentAllCount();
			$this->admin->page_count = (int)ceil($this->admin->document_count / $this->admin->list_count);
			$this->admin->page_start = $this->admin->document_count - ($this->admin->page * $this->admin->list_count) + 1;
			$this->admin->page_end = $this->admin->page_start + $this->admin->list_count - 1;
			$this->admin->page_navigation = $this->admin->model->getPageArray($this->admin->page_count, $this->admin->page);
			$this->admin->query = $this->admin->model->getDocumentListLIMIT(($this->admin->page-1)*20);
			
			if (!is_array($this->admin->query)) 
			{
				$this->admin->query = array();
			}
			else
			{
				$this->base->getItem('music');
			}
			
			if (is_array($this->admin->query) && count($this->admin->query)) 
			{
				$query = $this->admin->query;
				unset($this->board->query);
				
				foreach ($query as $data) 
				{
					$this->admin->query[] = $data;
				}
			}
			
			foreach ($this->admin->query as $documentItem) 
			{
				$this->boarditem = new board_item($this, $documentItem);
				$this->admin->document_list[$documentItem['srl']] = $this->boarditem;
			}
			
			$this->base->set('skin', sprintf("%s/document_list.php", $this->admin->tpl_path));
		}
		
		function dispAdminPage() 
		{
			$oBoardQuery = $this->base->getQuery('music');
			$this->admin->member_list = $oBoardQuery->getMemberListbySelect(5);
			$this->admin->document_list = $oBoardQuery->getDocumentListbySelect(5);
			$this->admin->document_count = $oBoardQuery->getDocumentAllCount();
			
			$oCommentModel = $this->base->getModel('comment');
			$this->admin->comment_list = $oCommentModel->getCommentListbySelect(5);
			$this->admin->comment_count = $oCommentModel->getCommentAllCount();
			
			$this->base->set('skin', sprintf("%s/admin_panel.php", $this->admin->tpl_path));
		}
		
	}
	
?>