<?php

	if (!defined("__FLOWER__")) exit();

	class board_view extends view_abstract implements viewInterface
	{
		
		var $args = array();
		
		function __construct() 
		{
			parent::getHandler();
		}
		
		function init($args):stdClass
		{
			$this->board = $this->getProperty();
			
			$this->board->sort_index = $this->board->sort_index_list;
			$this->board->list_index = $this->board->list_count_list;
			
			return $this->board;
		}
		
		function dispBoardDelete()
		{
			$this->board->srl = $this->getParam('srl');
			$this->board->mid = $this->getParam(__MODULEID);
			
			if (isset($this->board->srl)) 
			{
				$this->board->document = $this->board->model->getDocumentItems($this->board->srl);
				
				$this->base->set('skin', sprintf("%s/delete.php", $this->board->skin_tpl_path));
			}
		}
		
		function dispBoardModify() 
		{
			if (!$this->hasGrant(FALSE)) 
			{
				return $this->board->model->dispMemberLogin();
			}
			
			$this->board->srl = $this->getParam('srl');
			$this->board->mid = $this->getParam(__MODULEID);
			
			if (isset($this->board->srl)) 
			{
				$this->board->document = $this->board->model->getDocumentItems($this->board->srl);
				
				// Document not found
				if (!$this->board->document) 
				{
					return $this->base->set_error("게시글이 존재하지 않습니다.");
				}
				
				$memberSrl = $this->base->getMemberSrl();
				$oDocumentMemberSrl = $this->board->document['member_srl'];
				
				// Logged user hasn't permission to modify document
				if ($oDocumentMemberSrl !== $memberSrl) 
				{
					return $this->base->set_error("권한이 없습니다.");
				}
				
				$oFilesModel = $this->base->getModel('files');
				$fileSequence = $oFilesModel->getDocumentFileSequence($this->board->srl);
				
				// Set file Sequence
				if ($fileSequence) 
				{
					$_SESSION['target_srl'] = $fileSequence;
					$this->board->fileSequence = $fileSequence;
				}
				
				// Get document Items
				$this->board->document = $this->board->model->getDocumentItems($this->board->srl);
				
				// If cannot found document Items
				if (!is_array($this->board->document) || !isset($this->board->document)) 
				{
					echo __SCRIPT_DOCUMENT_NOT_FOUND__;
				} 
				// If found document Items
				else 
				{
					$this->base->set('editor', $this->getEditor());
					$this->base->set('skin', sprintf(__WRITE_TPL__, $this->board->skin_tpl_path));
				}
			}
		}
		
		function dispOriginContent() 
		{
			$this->board->list_count = $this->board->config->list_count ? $this->board->config->list_count : 20;
			$this->board->related = $this->getParam('related');
			$this->board->module_id = $this->getParam(__MODULEID);
			$this->board->page = $this->getParam('page') ? $this->getParam('page') : 1;
			$this->board->page_start = ($this->board->page-1) * $this->board->list_count;
			$this->board->album = $this->board->model->getOriginAlbumbysrl($this->board->related);
			$this->board->item_popular = $this->board->model->getOriginAlbumFilesAll($this->board->album);
			
			if ($this->board->item_popular == NULL) 
			{
				$this->board->file_list = array();
			} 
			else 
			{
				$this->board->file_list = $this->board->model->getFileItemsArray($this->board->item_popular);
			}
			
			$this->board->query = $this->board->model->getRandomDocumentListbySrl($this->board->item_popular, $this->board->module_id, $this->board->page_start);
			
			$this->setDocumentSubItem();
			
			$this->board->document = $this->board->model->getDocumentItems($this->board->item_popular[0]['srl']);
			
			$this->dispBoardOrigin();
			$this->getPagination();
			
			$this->base->set('skin', sprintf(__ORIGIN_VIEW_TPL__, $this->board->skin_tpl_path));
		}
		
		function dispAlbumContent() 
		{
			$this->board->list_count = $this->board->config->list_count ? $this->board->config->list_count : 20;
			$this->board->related = $this->getParam('related');
			$this->board->page = $this->getParam('page') ? $this->getParam('page') : 1;
			
			$this->board->page_start = ($this->board->page-1) * $this->board->list_count;
			$this->board->album = $this->board->model->getAlbumbysrl($this->board->related);
			$this->board->item_popular = $this->board->model->getAlbumFilesAll($this->board->album);
			
			if ($this->board->item_popular == NULL) 
			{
				$this->board->file_list = array();
			} 
			else 
			{
				$this->board->file_list = $this->board->model->getFileItemsArray($this->board->item_popular);
			}
			
			$this->base->set('skin', sprintf(__ALBUM_VIEW_TPL__, $this->board->skin_tpl_path));
		}
		
		function dispBoardWrite() 
		{
			if (!$this->hasGrant(false)) 
			{
				return $this->board->model->dispMemberLogin();
			}
			
			if (!$this->hasGrant(true)) 
			{
				return $this->base->set_error("권한이 없습니다.");
			}
			
			unset($_SESSION['target_srl']);
			$this->board->extra_var = $this->board->model->getExtraVar($this->getParam(__MODULEID));
			$this->board->srl = $this->getParam('srl');
			$this->board->fileSequence = '';
			$this->base->set('skin', sprintf(__WRITE_TPL__, $this->board->skin_tpl_path));
			$this->base->set('editor', $this->getEditor());
		}
		
		function dispBoardSetup() 
		{
			
			if (!$this->hasGrant(true)) 
			{
				return $this->board->model->dispMemberLogin();
			}
			
			$this->board->module_id = $this->getParam(__MODULEID);
			$this->board->skin = $this->board->model->getModuleLayoutbyBoard($this->board->module_id);
			$this->board->xml_path = $this->getTpl('default.xml');
			
			if (file_exists($this->board->xml_path)) 
			{
				if (isset($this->board->config->multiorder_option)) 
				{
					$this->base->set('column_index', explode(",", $this->board->config->multiorder_option));
					$this->base->set('column', array_diff($this->board->column_list, explode(",", $this->board->config->multiorder_option)));
				}
				else 
				{
					$this->base->set('column_index', $this->board->column_list);
					$this->base->set('column', array_diff($this->board->column_list, $this->board->column));
				}
				
				$xmlContent = simplexml_load_string(file_get_contents($this->board->xml_path));
				
				$this->base->set('act', 'procBoardSetup');
				$this->base->set('config', $this->board->config);
				$this->base->set('xml', $xmlContent);
				$this->base->set('tab', $this->getTpl("setup_tab.php"));
				$this->base->set('attr', $this->getTpl('setup.board.php'));
				$this->base->set('skin', $this->getCommonTpl("setup.php"));
			}
		}
		
		protected function getChildCategory($subSrl, $toChildren = false) 
		{
			if (!$subSrl) return array();
		
			$retArr = array();
			
			$this->board->module_id = $this->getParam(__MODULEID);
			$subCategory = $this->board->model->getSubCategoryList($this->board->module_id, $subSrl);
			$subCategoryArr = $subCategory;
			
			if(empty(array_shift($subCategory))) return $retArr;
			
			foreach ($subCategoryArr as $val) 
			{
				if (!is_array($val)) {
					continue;
				}
				
				array_push($retArr, 
					array(
						"text" => $val['name'],
						"category_srl" => $val['list_order'],
						"module" => $val['module'],
						"sub_srl" => $val['sub_srl'],
						"type" => $val['type'],
						"children" => $this->getChildCategory($val['category_srl'], true)
					)
				);
			}
			
			return $retArr;
		}
		
		function getCategory()
		{
			$this->board->children = array();
			$this->board->module_id = $this->getParam(__MODULEID);
			$this->board->extralist = $this->board->model->getCategoryListWithoutSub($this->board->module_id);
			foreach($this->board->extralist as $key=>$val)
			{
				array_push($this->board->children, 
					array(
						"text" => $val['name'],
						"category_srl" => $val['list_order'],
						"module" => $val['module'],
						"sub_srl" => $val['sub_srl'],
						"type" => $val['type'],
						"children" => $this->getChildCategory($val['category_srl'])
					)
				);
			}
			
			exit(json_encode($this->board->children));
		}
		
		function dispBoardExtraSetup() 
		{
			if (!$this->hasGrant(TRUE)) 
			{
				return $this->board->model->dispMemberLogin();
			}
			
			$this->board->module_id = $this->getParam(__MODULEID);
			$this->board->extralist = $this->board->model->getExtraVar($this->board->module_id);
			$this->base->set('config', $this->board->config);
			$this->base->set('tab', $this->getTpl('setup_tab.php'));
			$this->setTpl('extravars.php');
		}
		
		function dispBoardCategorySetup() 
		{
			if (!$this->hasGrant(TRUE)) 
			{
				return $this->board->model->dispMemberLogin();
			}
			
			$this->board->module_id = $this->getParam(__MODULEID);
			$this->board->extralist = $this->board->model->getCategoryList($this->board->module_id);
			
			$this->base->set('config', $this->board->config);
			$this->base->set('tab', $this->getTpl('setup_tab.php'));
			$this->base->set('skin', $this->getTpl("category.php"));
		}
		
		function dispBoardSkinSetup() 
		{
			if (!$this->hasGrant(TRUE)) 
			{
				return $this->board->model->dispMemberLogin();
			}
			
			$this->board->module_id = $this->getParam(__MODULEID);
			$this->board->skin = $this->board->model->getModuleLayoutbyBoard($this->board->module_id);
			$this->board->xml_path = sprintf(__SKIN_XML__, $this->board->skin_tpl_path);
			
			if (file_exists($this->board->xml_path)) 
			{
				$xmlContent = simplexml_load_string(file_get_contents($this->board->xml_path));
			}
			
			if (isset($xmlContent)) 
			{
				$this->base->set('act', 'procBoardSetup');
				$this->base->set('config', $this->board->config);
				$this->base->set('xml', $xmlContent);
				$this->base->set('tab', $this->getTpl("setup_tab.php"));
				$this->base->set('skin', $this->getCommonTpl("setup.php"));
			}
		}
		
		function dispBoardPlaylist() 
		{
			$this->board->page = $this->getParam('page') ? $this->getParam('page') : 1;
			$this->board->module_id = $this->getParam(__MODULEID);
			$this->board->list_count = $this->board->config->list_count ? $this->board->config->list_count : 20;
			$this->board->page_start = ($this->board->page-1) * $this->board->list_count;
			
			if ($this->isLogged())
			{
				$MemberExtraVar = $this->board->model->getMemberExvar($this->getUserId());
				$mExvar = unserialize($MemberExtraVar);
				$pListArr = $mExvar['playlist'];
				$this->board->document_count = count($pListArr);
				$this->board->query = $this->board->model->getRandomDocumentListbySrl(
					array_slice($pListArr, $this->board->page_start, $this->board->config->list_count), $this->board->module_id, $this->board->page_start
				);
			}
			
			if (isset($this->board->query)) 
			{
				$this->setDocumentItem();
				
				$this->base->set('skin', sprintf("%s/board.php", $this->board->skin_tpl_path));
				
				$this->getPagination();
				$this->CheckDocument();
				
				$this->ajaxCall();
			}
		}
		
		//인기 다운로드
		function dispBoardPopular() 
		{
			$this->board->popular_count = $this->board->config->popular_count ? $this->board->config->popular_count : 15;
			$this->board->list_count = $this->board->config->list_count ? $this->board->config->list_count : 20;
			$this->board->module_id = $this->getParam(__MODULEID);
			$this->board->page = $this->getParam('page') ? $this->getParam('page') : 1;
			$this->board->document_count = $this->board->model->getFileListPopularCount($this->board->module_id, $this->board->popular_count);
			
			$this->board->page_start = ($this->board->page-1) * $this->board->list_count;
			$this->board->query = $this->board->model->getPopularQueryByJoin($this->board->module_id, $this->board->popular_count, $this->board->page_start, $this->board->list_count);
			
			$this->setDocumentItem();
			
			$this->base->set('skin', sprintf("%s/board.php", $this->board->skin_tpl_path));
			
			
			$this->getPagination();
			$this->CheckDocument();
			
			$this->ajaxCall();
		}
		
		//가수
		function dispBoardAuthor() 
		{
			$this->board->query = $this->board->model->getAuthor();
			$this->base->set('skin', sprintf("%s/author.php", $this->board->skin_tpl_path));
		}
		
		//오리지널
		function dispBoardOrigin() 
		{
			$this->board->page = $this->getParam('page') ? $this->getParam('page') : 1;
			$this->board->list_count = $this->board->config->list_count ? $this->board->config->list_count : 20;
			
			$this->board->document_count = $this->board->model->getOriginAlbumCount();
			$this->board->page_start = ($this->board->page-1) * $this->board->list_count;
			$this->board->query = $this->board->model->getOriginAlbum($this->board->page_start);
			
			$this->setDocumentItem();
			
			$this->base->set('skin', sprintf(__ORIGIN_TPL__, $this->board->skin_tpl_path));
			
			$this->getPagination();
			$this->ajaxCall();
		}
		
		//앨범
		function dispBoardAlbum() 
		{
			$this->board->page = $this->getParam('page') ? $this->getParam('page') : 1;
			$this->board->list_count = $this->board->config->list_count ? $this->board->config->list_count : 20;
			
			$this->board->document_count = $this->board->model->getAlbumCount();
			$this->board->page_start = ($this->board->page-1) * $this->board->list_count;
			$this->board->query = $this->board->model->getAlbum($this->board->page_start);
			
			$this->setDocumentItem();
			
			$this->base->set('skin', sprintf(__ALBUM_TPL__, $this->board->skin_tpl_path));
			
			$this->getPagination();
			$this->ajaxCall();
		}
		
		//태그
		function dispBoardTag() 
		{
			$this->board->tag_list = $this->board->model->getTagList();
			$this->base->set('skin', sprintf(__TAG_TPL__, $this->board->skin_tpl_path));
		}
		
		//태그 목록
		function dispBoardTagList() 
		{
			$this->board->module_id = $this->getParam(__MODULEID);
			$this->board->page = $this->getParam('page') ? $this->getParam('page') : 1;
			$this->board->list_count = $this->board->config->list_count ? $this->board->config->list_count : 20;
			$this->board->tag = $this->getParam('tag');
			
			$this->board->document_count = $this->board->model->getDocumentCountbyBoardbyTag($this->board->module_id, $this->board->tag);
			$this->board->page_start = ($this->board->page-1) * $this->board->config->list_count;
			$this->board->query = $this->board->model->getDocumentlistBetweenCategory($this->board->module_id, $this->board->page_start, $page_end, $this->board->tag);
			
			$this->setDocumentItem();
			
			$this->base->set('skin', sprintf("%s/board.php", $this->board->skin_tpl_path));
			
			$this->getPagination();
			$this->CheckDocument();
			
			$this->ajaxCall();
		}
		
		protected function ajaxCall() 
		{
			if ($this->board->isAjax == TRUE) 
			{
				if (!isset($this->board->srl)) 
				{
					$this->setBoardSkin();
				} 
				else 
				{
					$this->setBoardSkin();
				}
			}
		}
		
		//generate Pagenation
		protected function getPagination() 
		{
			$this->board->page_count = ceil($this->board->document_count / $this->board->list_count);
			$this->board->page_navigation = $this->board->model->getPageArray($this->board->page_count, $this->board->page);
		}
		
		//읽기 문서 조회
		protected function CheckDocument() 
		{
			$this->board->srl = $this->getParam('srl');
			$this->board->module_id = $this->getParam(__MODULEID);
			
			if (isset($this->board->srl)) 
			{
				$this->board->document = $this->board->model->getDocumentItems($this->board->srl);
				$this->board->extra_vars = $this->board->model->getExtraVars($this->board->srl);
				
				if (!is_array($this->board->document)) 
				{
					echo __SCRIPT_DOCUMENT_NOT_FOUND__;
				} 
				else 
				{
					if ($this->board->document['star_cnt'] > 0) 
					{
						$this->board->star_rate = round($this->board->document['star'] / $this->board->document['star_cnt']);
					}
					
					$readed_count = $this->board->document['readed'] + 1;
					$this->board->model->UpdateReadedCount($readed_count, $this->board->srl);
					$this->board->file_list = $this->getFileList($this->board->srl);
					
					$this->document_item = new board_item($this, $this->board->document);
					$this->board->oDocument = $this->document_item;
					unset($this->document_item);
					
					//댓글 목록
					$this->board->cpage = $this->getParam('cpage') ? $this->getParam('cpage') : 1;
					$this->board->comment_listcount = $this->board->config->comment_count ? $this->board->config->comment_count : 20;
					$this->board->comment_count = $this->getCommentCount($this->board->module_id, $this->board->srl);
					
					if ($this->board->comment_listcount > 0) 
					{
						$this->board->comment_count_rel = ceil($this->board->comment_count / $this->board->comment_listcount);
						$this->board->comment_navigation = $this->board->model->getPageArray($this->board->comment_count_rel, $this->board->cpage);
						$this->board->comment_page = ($this->board->cpage - 1) * $this->board->comment_listcount;
						$this->board->comment_list = $this->getCommentList($this->board->module_id, $this->board->srl, $this->board->comment_page, $this->board->comment_listcount);
						$this->board->voted_comment_list = $this->getVotedCommentList($this->board->module_id, $this->board->srl, 1, 1);
						$this->board->blamed_comment_list = $this->getBlamedCommentList($this->board->module_id, $this->board->srl, 1, 1);
					} 
					else 
					{
						$this->board->comment_navigation = $this->board->model->getPageArray($this->board->comment_count_rel, $this->board->cpage);
						$this->board->comment_list = array();
					}
					
					//읽기문서에서 목록을 보여주지 않도록 설정하였다면
					if ($this->board->config->list_view_on == 1) 
					{
						$this->base->set('skin', sprintf("%s/view.php", $this->board->skin_tpl_path));
					}
					
					$this->base->set('document_title', $this->board->document['title']);
				}
			}
		}
		
		function getCommentPage() 
		{
			if ($this->board->isAjax ==	TRUE) 
			{
				//댓글 목록
				$this->board->srl = $this->getParam('srl');
				$this->board->module_id = $this->getParam(__MODULEID);
				$this->board->cpage = $this->getParam('cpage') ? $this->getParam('cpage') : 1;
				$this->board->comment_listcount = $this->board->config->comment_count ? $this->board->config->comment_count : 20;
				$this->board->comment_count = $this->getCommentCount($this->board->module_id, $this->board->srl);
				
				if ($this->board->comment_listcount > 0) 
				{
					$this->board->comment_count_rel = ceil($this->board->comment_count / $this->board->comment_listcount);
					$this->board->comment_navigation = $this->board->model->getPageArray($this->board->comment_count_rel, $this->board->cpage);
					$this->board->comment_page = ($this->board->cpage - 1) * $this->board->comment_listcount;
					$this->board->comment_list = $this->getCommentList($this->board->module_id, $this->board->srl, $this->board->comment_page, $this->board->comment_listcount);
					$this->board->voted_comment_list = $this->getVotedCommentList($this->board->module_id, $this->board->srl, 1, 5);
					$this->board->blamed_comment_list = $this->getBlamedCommentList($this->board->module_id, $this->board->srl, 1, 5);
				} 
				else 
				{
					$this->board->comment_navigation = $this->board->model->getPageArray($this->board->comment_count_rel, $this->board->cpage);
					$this->board->comment_list = array();
				}
				
				$this->base->set('skin', sprintf(__COMMENT_TPL__, $this->board->skin_tpl_path));
				$this->ajaxCall();
			}
			else 
			{
				$this->dispBoardContent();
			}
		}
		
		protected function getCurrentPage():int
		{
			if ($this->board->config->bd_query !== "LIMIT") 
			{
				$targetDocumentCount = $this->board->document['srl_bd'];
			} 
			else if ($this->board->config->bd_query == "LIMIT") 
			{
				$targetDocumentCount = $this->board->model->getCountInTargetDocument($this->board->document['module'], $this->board->document['srl_bd'])->data();
			}
			
			$possibleDocumentCount = floor($this->board->document_count / $this->board->list_count) * $this->board->list_count;
			$remaindDocumentCount = $this->board->document_count - $possibleDocumentCount;
			$pageDocumentCount = $this->board->document_count + $remaindDocumentCount;
			$diffDocumentCount = ($this->board->page_count * $this->board->list_count) - $pageDocumentCount;
			$marginDocumentCount = ($remaindDocumentCount + $diffDocumentCount);
			$currentPage = (int)(($this->board->page_count + 1) - ceil(($targetDocumentCount + $marginDocumentCount) / $this->board->list_count));
			
			return $currentPage;
		}
		
		//올바르지 않는 페이지 교정(크롤링->접속->게시글 페이지값이 잘못되었다면 교정)
		protected function CheckPage($called_position) 
		{
			$this->board->srl = $this->getParam('srl');
			$this->board->page_count = (int)ceil($this->board->document_count / $this->board->list_count);
			$hasDocumentSrl = isset($this->board->srl) && $this->board->srl > 0;
			
			if ($called_position == 'normal' && $hasDocumentSrl) 
			{
				$paging_diff = $this->getCurrentPage();
				$this->board->page = $paging_diff > 1 ? $paging_diff : 1;
				$_GET['page'] = $this->board->page;
			}
		}

		protected function setDocumentSubItem($type = 'none') 
		{
			//쿼리가 존재하지 않는다면 빈 쿼리를 반환
			if (!is_array($this->board->query)) 
			{
				$this->board->document_count = 0;
				$this->board->query = array();
			}
			
			if (is_array($this->board->query) && count($this->board->query)) 
			{
				$query = $this->board->query;
				
				$vid = ($this->board->document_count) - ($this->board->list_count * ($this->board->page-1));
				unset($this->board->query);
				
				foreach ($query as $data) 
				{
					$data['no'] = $vid;
					$this->board->query[] = $data;
					$vid--;
				}
			}
			
			foreach ($this->board->query as $documentItem) 
			{
				$this->boarditem = new board_item($this, $documentItem);
				$this->board->sub_list[$documentItem['srl']] = $this->boarditem;
			}
		}
	
		protected function setDocumentItem($type = 'none') 
		{
			if (isset($this->board->config->multiorder_option)) 
			{
				$this->board->column = explode(",", $this->board->config->multiorder_option);
			} 
			else 
			{
				$this->board->column = array('no', 'category', 'title', 'play', 'regdate', 'readed', 'voted');
			}
			
			//쿼리가 존재하지 않는다면 빈 쿼리를 반환
			if (!is_array($this->board->query)) 
			{
				$this->board->document_count = 0;
				$this->board->query = array();
			}
			
			if (is_array($this->board->query) && count($this->board->query)) 
			{
				$query = $this->board->query;
				
				$vid = ($this->board->document_count) - ($this->board->list_count * ($this->board->page-1));
				unset($this->board->query);
				
				foreach ($query as $data) 
				{
					$data['no'] = $vid;
					$this->board->query[] = $data;
					$vid--;
				}
			}
			
			foreach ($this->board->query as $documentItem) 
			{
				$this->boarditem = new board_item($this, $documentItem);
				$this->board->document_list[$documentItem['srl']] = $this->boarditem;
			}
		}
	
		function dispBoardContent() 
		{
			if (!isset($this->board->config)) 
			{
				$this->board->config = new stdClass();
			}
			
			//파라미터
			$this->board->srl = $this->getParam('srl');
			$this->board->list_count = $this->board->config->list_count ? $this->board->config->list_count : 20;
			$this->board->list_count = $this->getParam('list_count') ? $this->getParam('list_count') : $this->board->list_count;
			$this->board->page = $this->getParam('page') ? $this->getParam('page') : 1;
			$this->board->genre = $this->getParam('genre');
			$this->board->category = $this->getParam('category') ? $this->getParam('category') : null;
			$this->board->sort_index = $this->getParam('sort_index');
			$this->board->module_id = $this->getParam(__MODULEID);
			$this->board->keyword = $this->getParam('keyword');
			$this->board->type = $this->getParam('type');
			
			//스킨 설정
			$this->base->set('skin', sprintf("%s/board.php", $this->board->skin_tpl_path));
			
			if ((isset($this->board->keyword) && isset($this->board->srl)) || !isset($this->board->keyword)) 
			{
				$this->CheckDocument();
			}
			
			//카테고리
			if (isset($this->board->category)) 
			{
				$this->board->page_start = ($this->board->page - 1) * $this->board->list_count;
			
				if ($this->board->keyword) 
				{
					if (!isset($GLOBALS['DOCUMENT_COUNT_KEYWORD'][$this->board->module_id])) 
					{
						$this->board->document_count = $this->board->model->getDocumentCountbyBoardbyCategoryAndArticle($this->board->module_id, $this->getParam('category'), $this->board->keyword, $this->board->type);
						$GLOBALS['DOCUMENT_COUNT_KEYWORD'][$this->board->module_id] = $this->board->document_count;
					} 
					else 
					{
						$this->board->document_count = $GLOBALS['DOCUMENT_COUNT_KEYWORD'][$this->board->module_id];
					}
					
					$this->board->query = ($this->board->model->getDocumentlistBetweenbyCategoryAndArticle($this->board->module_id, $this->board->page_start, $this->board->list_count, $this->board->category, $this->board->keyword, $this->board->type));
				}
				else 
				{
					if (!isset($GLOBALS['DOCUMENT_COUNT_LIST'][$this->board->module_id])) 
					{
						$this->board->document_count = $this->board->model->getDocumentCountbyBoardbyCategory($this->board->module_id, $this->getParam('category'));
						$GLOBALS['DOCUMENT_COUNT_LIST'][$this->board->module_id] = $this->board->document_count;
					} 
					else 
					{
						$this->board->document_count = $GLOBALS['DOCUMENT_COUNT_LIST'][$this->board->module_id];
					}
					
					$this->board->query = ($this->board->model->getDocumentlistBetweenbyCategory($this->board->module_id, $this->board->page_start, $this->board->list_count, $this->getParam('category')));
				}
				
				$this->CheckPage('category');
			} 
			else if (isset($this->board->sort_index)) 
			{
				if (!isset($GLOBALS['DOCUMENT_COUNT_SORT'][$this->board->module_id])) 
				{
					$this->board->document_count = $this->board->model->getDocumentCountbyBoard($this->board->module_id);
					$GLOBALS['DOCUMENT_COUNT_SORT'][$this->board->module_id] = $this->board->document_count;
				} 
				else 
				{
					$this->board->document_count = $GLOBALS['DOCUMENT_COUNT_SORT'][$this->board->module_id];
				}
				
				switch($this->board->sort_index):
					//다운로드 수 정렬
					case "download_count":
						$this->board->page_start = ($this->board->page-1) * $this->board->list_count;
						$this->board->query = $this->board->model->getPopularQuery($this->board->module_id, 0, $this->board->page_start, $this->board->list_count);
						break;
					case "playtime":
						$this->board->page_start = ($this->board->page-1) * $this->board->list_count;
						$this->board->query = $this->board->model->getDocumentListbyArticle($this->board->module_id, $this->board->page_start, $this->board->list_count, "playtime");
						break;
					//조회수 정렬
					case "readed_count":
						$this->board->page_start = ($this->board->page-1) * $this->board->list_count;
						$this->board->query = $this->board->model->getDocumentListbyArticle($this->board->module_id, $this->board->page_start, $this->board->list_count, "readed");
						break;
					//가수 정렬
					case "artist":
						$this->board->page_start = ($this->board->page-1) * $this->board->list_count;
						$this->board->query = $this->board->model->getDocumentListbyArticle($this->board->module_id, $this->board->page_start, $this->board->list_count, "artist");
						break;
					//추천수 정렬
					case "voted_count":
						$this->board->page_start = ($this->board->page-1) * $this->board->list_count;
						$this->board->query = $this->board->model->getDocumentListbyArticle($this->board->module_id, $this->board->page_start, $this->board->list_count, "voted");
						break;
					case "category":
						$this->board->page_start = ($this->board->page-1) * $this->board->list_count;
						$this->board->query = $this->board->model->getDocumentListbyArticle($this->board->module_id, $this->board->page_start, $this->board->list_count, "category");
						break;
					case "regdate":
						$this->board->page_start = ($this->board->page-1) * $this->board->list_count;
						$this->board->query = $this->board->model->getDocumentListbyArticle($this->board->module_id, $this->board->page_start, $this->board->list_count, "regdate");
						break;
					case "star_count":
						$this->board->page_start = ($this->board->page-1) * $this->board->list_count;
						$this->board->query = $this->board->model->getDocumentListbyArticle($this->board->module_id, $this->board->page_start, $this->board->list_count, "star");
						break;
				endswitch;
				
				$this->CheckPage('sort');
			//장르
			} 
			else if (isset($this->board->genre)) 
			{
				if (!isset($GLOBALS['DOCUMENT_COUNT_GENRE'][$this->board->module_id])) 
				{
					$this->board->document_count = $this->board->model->getDocumentCountbyBoardbyGenre($this->board->module_id, $this->board->genre);
					$GLOBALS['DOCUMENT_COUNT_GENRE'][$this->board->module_id] = $this->board->document_count;
				} 
				else 
				{
					$this->board->document_count = $GLOBALS['DOCUMENT_COUNT_GENRE'][$this->board->module_id];
				}
				
				$this->board->page_start = ($this->board->page-1) * ($this->board->list_count);
				$this->board->query = $this->board->model->getDocumentlistBetweenGenre($this->board->module_id, $this->board->page_start, $this->board->list_count, $this->board->genre);
				
				$this->CheckPage('genre');
			} 
			else if (isset($this->board->keyword)) 
			{
				if ($this->board->config->search_type==='Y') 
				{
					switch($this->board->type):
						//제목
						case "title":
							$this->board->document_count = $this->board->model->getDocumenCountbyTitle($this->board->module_id, $this->board->page_start, $this->board->keyword);
							$this->board->page_start = ($this->board->page-1) * $this->board->list_count;
							$this->board->query = $this->board->model->getDocumentlistBetweenbyTitle($this->board->module_id, $this->board->page_start, $this->board->keyword);
							break;
						//태그
						case "tag":
							$this->board->document_count = $this->board->model->getDocumenCountbyTag($this->board->module_id, $this->board->page_start, $page_end, $this->board->keyword);
							$this->board->page_start = ($this->board->page-1) * $this->board->list_count;
							$this->board->query = $this->board->model->getDocumentlistBetweenTagLIKE($this->board->module_id, $this->board->page_start, $this->board->keyword);
							break;
						//가수
						case "artist":
							$this->board->document_count = $this->board->model->getDocumenCountbyAuthor($this->board->module_id, $this->board->page_start, $page_end, $this->board->keyword);
							$this->board->page_start = ($this->board->page-1) * $this->board->list_count;
							$this->board->query = $this->board->model->getDocumentlistBetweenAuthorLIKE($this->board->module_id, $this->board->page_start, $this->board->keyword);
							break;
						//앨범 오리지널
						case "albumorigin":
							$this->board->document_count = $this->board->model->getDocumenCountbyalborigin($this->board->module_id, $this->board->page_start, $this->board->keyword);
							$this->board->page_start = ($this->board->page-1) * $this->board->list_count;
							$this->board->query = $this->board->model->getDocumentlistBetweenAlbOriginLIKE($this->board->module_id, $this->board->page_start, $this->board->keyword);
							break;
						//제목 오리지널
						case "titleorigin":
							$this->board->document_count = $this->board->model->getDocumenCountbytitorigin($this->board->module_id, $this->board->page_start, $this->board->keyword);
							$this->board->page_start = ($this->board->page-1) * $this->board->list_count;
							$this->board->query = $this->board->model->getDocumentlistBetweenTitOriginLIKE($this->board->module_id, $this->board->page_start, $this->board->keyword);
							break;
						default:
							break;
					endswitch;
				}
				else 
				{
					$this->board->page_start = ($this->board->page - 1) * $this->board->list_count;
					$this->board->document_count = $this->board->model->getDocumenCountbyColumn($this->board->module_id, $this->board->page_start, $this->board->keyword, $this->board->type);
					$this->board->query = $this->board->model->getDocumentListbyColumn($this->board->module_id, $this->board->page_start, $this->board->keyword, $this->board->type);
				}
			} 
			else 
			{
				if (isset($this->board->config->list_view_on) && empty($this->board->config->list_view_on)) 
				{
					$this->board->config->list_view_on = 0;
				}
				
				//일반 문서
				if (($this->board->config->list_view_on|1) || !isset($this->board->srl)) 
				{
					//카운트 조회
					if (!isset($GLOBALS['DOCUMENT_COUNT_ALL'][$this->board->module_id])) 
					{
						$this->board->document_count = $this->board->model->getDocumentCountbyBoard($this->board->module_id);
						$GLOBALS['DOCUMENT_COUNT_ALL'][$this->board->module_id] = (int)$this->board->document_count;
					} 
					else 
					{
						$this->board->document_count = $GLOBALS['DOCUMENT_COUNT_ALL'][$this->board->module_id];
					}
					
					$this->CheckPage('normal');
						
					if ($this->board->config->bd_query=="LIMIT") 
					{
						$query_count = $this->board->document_count - ($this->board->page * $this->board->list_count);
						$this->board->page_start = (int)$query_count > 0 ? $query_count : 0;
						$this->board->page_end = (int)$this->board->page_start + $this->board->list_count - 1;
						$this->board->board_count = (int)$query_count > 0 ? $this->board->list_count : $this->board->list_count + $query_count;
						$this->board->query = ($this->board->model->getDocumentListLIMIT($this->getParam(__MODULEID), $this->board->page_start, $this->board->board_count));
						
					} 
					else if ($this->board->config->bd_query=="JOIN") 
					{
						$query_count = $this->board->document_count - ($this->board->page * $this->board->list_count);
						$this->board->page_start = (int)$query_count > 0 ? $query_count : 0;
						$this->board->page_end = (int)$this->board->page_start + $this->board->list_count - 1;
						$this->board->board_count = (int)$query_count > 0 ? $this->board->list_count : $this->board->list_count + $query_count;
						$this->board->query = array_reverse($this->board->model->getDocumentListJOIN($this->getParam(__MODULEID), $this->board->page_start, $this->board->board_count));
					} 
					else if ($this->board->config->bd_query=="JOIN2") 
					{
						$query_count = $this->board->document_count - ($this->board->page * $this->board->list_count);
						$this->board->page_start = (int)$query_count > 0 ? $query_count : 0;
						$this->board->page_end = (int)$this->board->page_start + $this->board->list_count - 1;
						$this->board->board_count = (int)$query_count > 0 ? $this->board->list_count : $this->board->list_count + $query_count;
						$this->board->query = array_reverse($this->board->model->getDocumentListJOIN2($this->getParam(__MODULEID), $this->board->page_start, $this->board->board_count));
					} 
					else 
					{
						$this->board->page_start = (int)$this->board->document_count - ($this->board->page * $this->board->list_count) + 1;
						$this->board->page_end = (int)$this->board->page_start + $this->board->list_count - 1;
						
						// Check not include srl in end page
						/*$startPage = 1;
						$endPage = $this->board->page_start > 1 ? $this->board->page_start : 1;
						$gapPagePrev = $this->board->model->getGapInModule($startPage, $endPage, $this->board->module_id)->data();
						$this->board->page_start = $this->board->page_start + ($gapPagePrev);
					
						$startPage = $this->board->page_start > 1 ? $this->board->page_start : 1;
						$endPage = $this->board->page_end;
						$gapPageNext = $this->board->model->getGapInModule($startPage, $endPage, $this->board->module_id)->data();
						$this->board->page_end = $this->board->page_end + ($gapPageNext) + ($gapPagePrev);*/
						
						$this->board->query = array_reverse($this->board->model->getDocumentList($this->getParam(__MODULEID), $this->board->page_start, $this->board->page_end));
					}
					
				}
			}
			
			$this->setDocumentItem('document');
			
			if ((isset($this->board->config->list_view_on) && $this->board->config->list_view_on!=1) || !isset($this->board->srl)) 
			{
				$this->getPagination();
			}
			
			$this->ajaxCall();
		}
		
	}
?>