<?php

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
		$this->board->srl = $this->getSrl();
		$this->board->mid = $this->getModuleID();
		
		if (isset($this->board->srl)) 
		{
			$this->board->document = $this->getDocumentItem();
			
			$this->setDeleteDocumentTplPath();
		}
	}
	
	function dispBoardModify() 
	{
		if (!$this->hasGrant(FALSE)) 
		{
			return $this->board->model->dispMemberLogin();
		}
		
		$this->board->srl = $this->getSrl();
		$this->board->mid = $this->getModuleID();
		
		if (isset($this->board->srl)) 
		{
			$this->board->document = $this->getDocumentItem();
			
			// Document not found
			if (!$this->isDocumentExists()) 
			{
				return $this->base->set_error("게시글이 존재하지 않습니다.");
			}
			
			// Logged user hasn't permission to modify document
			if (!$this->isDocumentAuthor()) 
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
			$this->board->document = $this->getDocumentItem();
			
			// If cannot found document Items
			if (!is_array($this->board->document) || !isset($this->board->document)) 
			{
				echo __SCRIPT_DOCUMENT_NOT_FOUND__;
			} 
			// If found document Items
			else 
			{
				$this->setEditor();
				$this->setDocumentWriteTplPath();
			}
		}
	}
	
	function dispOriginContent() 
	{
		$this->board->list_count = $this->getListCount();
		$this->board->related = $this->getParam('related');
		$this->board->module_id = $this->getModuleID();
		$this->board->page = $this->getPage();
		$this->board->page_start = $this->getCurrentListCount();
		$this->board->album = $this->getOriginAlbumbysrl();
		$this->board->item_popular = $this->getAllOriginAlbum();
		
		if ($this->board->item_popular == NULL) 
		{
			$this->board->file_list = array();
		} 
		else 
		{
			$this->board->file_list = $this->board->query->getFileItemsArray($this->board->item_popular);
		}
		
		$this->board->result = $this->getDocumentListInDocumentSrls($this->board->item_popular);
		
		$this->setDocumentSubItem();
		
		$this->board->document = $this->board->query->getDocumentItem($this->board->item_popular[0]['srl']);
		
		$this->dispBoardOrigin();
		$this->getPagination();
		
		$this->base->set('skin', sprintf(__ORIGIN_VIEW_TPL__, $this->board->skin_tpl_path));
	}
	
	function dispAlbumContent() 
	{
		$this->board->list_count = $this->getListCount();
		$this->board->related = $this->getParam('related');
		$this->board->page = $this->getPage();
		
		$this->board->page_start = $this->getCurrentListCount();
		$this->board->album = $this->board->query->getAlbumbysrl($this->board->related);
		$this->board->item_popular = $this->board->query->getAlbumFilesAll($this->board->album);
		
		if ($this->board->item_popular == NULL) 
		{
			$this->board->file_list = array();
		} 
		else 
		{
			$this->board->file_list = $this->board->query->getFileItemsArray($this->board->item_popular);
		}
		
		$this->setAlbumViewTplPath();
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
		
		$this->board->extra_var = $this->board->query->getExtraVar($this->getParam(__MODULEID));
		$this->board->srl = $this->getSrl();
		$this->board->fileSequence = '';
		
		$this->setWriteTplPath();
		$this->setEditor();
	}
	
	function dispBoardSetup() 
	{
		
		if (!$this->hasGrant(true)) 
		{
			return $this->board->query->dispMemberLogin();
		}
		
		$this->board->module_id = $this->getModuleID();
		$this->board->skin = $this->board->query->getModuleLayoutbyBoard($this->board->module_id);
		$this->board->xml_path = $this->getTpl('xml/default.xml');
		
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
			
			$this->board->xmlContent = $this->getSkinXmlContents();
			
			$this->base->set('act', 'procBoardSetup');
			$this->base->set('config', $this->board->config);
			$this->base->set('xml', $this->board->xmlContent);
			$this->base->set('tab', $this->getTpl("setup_tab.php"));
			$this->base->set('attr', $this->getTpl('setup.board.php'));
			$this->base->set('skin', $this->getCommonTpl("setup.php"));
		}
	}
	
	protected function getChildCategory($subSrl, $toChildren = false) 
	{
		if (!$subSrl) return array();
	
		$retArr = array();
		
		$this->board->module_id = $this->getModuleID();
		$subCategory = $this->board->query->getSubCategoryList($this->board->module_id, $subSrl);
		$subCategoryArr = $subCategory;
		
		if (empty(array_shift($subCategory))) 
		{
			return $retArr;
		}
		
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
		$this->board->module_id = $this->getModuleID();
		$this->board->extralist = $this->getCategoryListWithoutSubCategory();
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
		
		$this->board->module_id = $this->getModuleID();
		$this->board->extralist = $this->board->query->getExtraVar($this->board->module_id);
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
		
		$this->board->module_id = $this->getModuleID();
		$this->board->extralist = $this->getCategoryList();
		
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
		
		$this->board->module_id = $this->getModuleID();
		$this->board->skin = $this->board->query->getModuleLayoutbyBoard($this->board->module_id);
		$this->board->xml_path = sprintf(__SKIN_XML__, $this->board->skin_tpl_path);
		
		$this->board->xmlContent = $this->getSkinXmlContents();
		
		if (isset($this->board->xmlContent)) 
		{
			$this->base->set('act', 'procBoardSetup');
			$this->base->set('config', $this->board->config);
			$this->base->set('xml', $this->board->xmlContent);
			$this->base->set('tab', $this->getTpl("setup_tab.php"));
			$this->base->set('skin', $this->getCommonTpl("setup.php"));
		}
	}
	
	function dispBoardPlaylist() 
	{
		$this->board->page = $this->getPage();
		$this->board->module_id = $this->getModuleID();
		$this->board->list_count = $this->getListCount();
		$this->board->page_start = $this->getCurrentListCount();
		
		if ($this->isLogged())
		{
			$extraVars = $this->getCurrentUserExtraVars();
			if (array_key_exists("playlist", $extraVars)) 
			{
				$playlist = $extraVars['playlist'];
			}
			else
			{
				$playlist = array();
			}
			
			$this->board->document_count = count($playlist);
			$this->board->result = $this->board->query->getDocumentListInDocumentSrls(array_slice($playlist, $this->board->page_start, $this->board->config->list_count));
		}
		
		if (isset($this->board->query)) 
		{
			$this->setDocumentItem();
			
			$this->setBoardTplPath();
			
			$this->getPagination();
			$this->CheckDocument();
			
			$this->ajaxCall();
		}
	}
	
	//인기 다운로드
	function dispBoardPopular() 
	{
		$this->board->popular_count = $this->board->config->popular_count ? $this->board->config->popular_count : 15;
		$this->board->list_count = $this->getListCount();
		$this->board->module_id = $this->getModuleID();
		$this->board->page = $this->getPage();
		$this->board->document_count = $this->getPopularFilesCount();
		
		$this->board->page_start = $this->getCurrentListCount();
		$this->board->result = $this->board->query->getPopularQueryByJoin($this->board->module_id, $this->board->popular_count, $this->board->page_start, $this->board->list_count);
		
		$this->setDocumentItem();
		
		$this->setBoardTplPath();
		
		
		$this->getPagination();
		$this->CheckDocument();
		
		$this->ajaxCall();
	}
	
	//가수
	function dispBoardAuthor() 
	{
		$this->board->result = $this->board->query->getAuthor();
		$this->setAuthorTplPath();
	}
	
	/** 
	 * @brief display music original list
	 **/
	function dispBoardOrigin() 
	{
		$this->board->page = $this->getPage();
		$this->board->list_count = $this->getListCount();
		
		$this->board->document_count = $this->board->query->getOriginAlbumCount();
		$this->board->page_start = $this->getCurrentListCount();
		$this->board->result = $this->getOriginAlbum();
		
		$this->setDocumentItem();
		
		$this->setOriginTplPath();
		
		$this->getPagination();
		$this->ajaxCall();
	}
	
	/** 
	 * @brief display music album list
	 **/
	function dispBoardAlbum() 
	{
		$this->board->page = $this->getPage();
		$this->board->list_count = $this->getListCount();
		
		$this->board->document_count = $this->board->query->getAlbumCount();
		$this->board->page_start = $this->getCurrentListCount();
		$this->board->result = $this->getAlbum();
		
		$this->setDocumentItem();
		
		$this->setAlbumTplPath();
		
		$this->getPagination();
		$this->ajaxCall();
	}
	
	/** 
	 * @brief display tag
	 **/
	function dispBoardTag() 
	{
		$this->board->tag_list = $this->getTagList();
		$this->setTagTplPath();
	}
	
	/** 
	 * @brief display tag list
	 **/
	function dispBoardTagList() 
	{
		$this->board->module_id = $this->getModuleID();
		$this->board->page = $this->getPage();
		$this->board->list_count = $this->getListCount();
		$this->board->tag = $this->getParam('tag');
		
		$this->board->document_count = $this->getDocumentCountbyTag();
		$this->board->page_start = $this->getCurrentListCount();
		$this->board->result = $this->getDocumentlistBetweenCategory();
		
		$this->setDocumentItem();
		
		$this->setBoardTplPath();
		
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
		$this->board->page_navigation = $this->getPagenation();
	}
	
	/** 
	 * @brief check document
	 **/
	protected function CheckDocument() 
	{
		$this->board->srl = $this->getSrl();
		$this->board->module_id = $this->getModuleID();
		
		if (isset($this->board->srl)) 
		{
			$this->board->document = $this->getDocumentItem();
			$this->board->extra_vars = $this->board->query->getExtraVars($this->board->srl);
			
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
				
				$this->board->readed_count = $this->getReadedCount();
				$this->updateReadedCount();
				$this->board->file_list = $this->getFileList($this->board->srl);
				
				$this->document_item = new board_item($this, $this->board->document);
				$this->board->oDocument = $this->document_item;
				unset($this->document_item);
				
				//댓글 목록
				$this->board->cpage = $this->getCommentCPage();
				$this->board->comment_listcount = $this->getCommentListCount();
				$this->board->comment_count = $this->getDocumentCommentCounts();
				
				if ($this->board->comment_listcount > 0) 
				{
					$this->board->comment_count_rel = ceil($this->board->comment_count / $this->board->comment_listcount);
					$this->board->comment_navigation = $this->board->model->getPageArray($this->board->comment_count_rel, $this->board->cpage);
					$this->board->comment_page = $this->getCurrentCommentListCount();
					$this->board->comment_list = $this->getCommentList();
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
					$this->setViewTplPath();
				}
				
				$this->setDocumentTitle();
			}
			
			if ($this->board->document['tag'])
			{
				include_once(__MOD."/board/music/tag.item.class.php");
				
				$relatedTagList = array();
				$tagList = $this->getTagRelatedDocumentSrl();
				foreach($tagList as $tags)
				{
					array_push($relatedTagList, $tags['srl']);
				}
				
				$this->board->relatedTagList = new stdClass();
				$this->board->relatedTagList->list_count = 5;
				$this->board->relatedTagList->currentTagIndex = array_search($this->board->document['srl'], $relatedTagList) - 2;
				if ($this->board->relatedTagList->currentTagIndex<0)
				{
					$this->board->relatedTagList->currentTagIndex = 0;
				}
				
				$this->board->relatedTagList->tag_list = $this->getRelatedTagList($this->board->relatedTagList->list_count);
				$this->board->relatedTagList->page_count = count($tagList);
				$this->board->relatedTagList->current_page = $this->getCurrentRelatedTagListPage();
				$this->board->relatedTagList->page_count = (int)ceil($this->board->relatedTagList->page_count / $this->board->relatedTagList->list_count);
				$this->board->relatedTagList->pagenation = $this->board->model->getPageArray($this->board->relatedTagList->page_count, $this->board->relatedTagList->current_page);
				
				//쿼리가 존재하지 않는다면 빈 쿼리를 반환
				if (!is_array($this->board->relatedTagList->tag_list)) 
				{
					$this->board->document_count = 0;
					$this->board->relatedTagList->tag_list = array();
				}
				
				if (is_array($this->board->relatedTagList->tag_list) && count($this->board->relatedTagList->tag_list)) 
				{
					$query = $this->board->relatedTagList->tag_list;
					unset($this->board->relatedTagList->tag_list);
					
					foreach ($query as $data) 
					{
						$this->board->relatedTagList->tag_list[] = $data;
					}
				}
				
				foreach ($this->board->relatedTagList->tag_list as $tagItem) 
				{
					$this->relatedTagItem = new tag_item($this, $tagItem);
					$this->board->relatedTagList->related_tag_list[$tagItem['srl']] = $this->relatedTagItem;
				}
				
			}
		}
	}
	
	function getCommentPage() 
	{
		if ($this->board->isAjax ==	TRUE) 
		{
			//댓글 목록
			$this->board->srl = $this->getSrl();
			$this->board->module_id = $this->getModuleID();
			$this->board->cpage = $this->getCommentCPage();
			$this->board->comment_listcount = $this->getCommentListCount();
			$this->board->comment_count = $this->getCommentCount($this->board->module_id, $this->board->srl);
			
			if ($this->board->comment_listcount > 0) 
			{
				$this->board->comment_count_rel = ceil($this->board->comment_count / $this->board->comment_listcount);
				$this->board->comment_navigation = $this->board->model->getPageArray($this->board->comment_count_rel, $this->board->cpage);
				$this->board->comment_page = $this->getCurrentCommentCPage();
				$this->board->comment_list = $this->getCommentList();
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
		if (!isset($this->board->document['srl_bd']))
		{
			return 0;
		}
		
		if ($this->board->config->bd_query !== "LIMIT") 
		{
			$targetDocumentCount = $this->board->document['srl_bd'];
		} 
		else if ($this->board->config->bd_query == "LIMIT") 
		{
			$targetDocumentCount = $this->board->query->getCountInTargetDocument($this->board->document['module'], $this->board->document['srl_bd'])->data();
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
		$this->board->srl = $this->getSrl();
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
		if (!is_array($this->board->result)) 
		{
			$this->board->document_count = 0;
			$this->board->result = array();
		}
		
		if (is_array($this->board->result) && count($this->board->result)) 
		{
			$query = $this->board->result;
			
			$vid = ($this->board->document_count) - ($this->board->list_count * ($this->board->page - 1));
			unset($this->board->result);
			
			foreach ($query as $data) 
			{
				$data['no'] = $vid;
				$this->board->result[] = $data;
				$vid--;
			}
		}
		
		foreach ($this->board->result as $documentItem) 
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
		if (!is_array($this->board->result)) 
		{
			$this->board->document_count = 0;
			$this->board->result = array();
		}
		
		if (is_array($this->board->result) && count($this->board->result)) 
		{
			$query = $this->board->result;
			
			$vid = ($this->board->document_count) - ($this->board->list_count * ($this->board->page-1));
			unset($this->board->result);
			
			foreach ($query as $data) 
			{
				$data['no'] = $vid;
				$this->board->result[] = $data;
				$vid--;
			}
		}
		
		foreach ($this->board->result as $documentItem) 
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
		$this->board->srl = $this->getSrl();
		$this->board->list_count = $this->getListCount();
		$this->board->page = $this->getPage();
		$this->board->genre = $this->getParam('genre');
		$this->board->category = $this->getCategorySrl();
		$this->board->sortIndex = $this->getParam('sort_index');
		$this->board->module_id = $this->getModuleID();
		$this->board->keyword = $this->getParam('keyword');
		$this->board->type = $this->getParam('type');
		
		//스킨 설정
		$this->setBoardTplPath();
		
		if ((isset($this->board->keyword) && isset($this->board->srl)) || !isset($this->board->keyword)) 
		{
			$this->CheckDocument();
		}
		
		//카테고리
		if (isset($this->board->category)) 
		{
			$this->board->page_start = $this->getCurrentListCount();
		
			if ($this->board->keyword) 
			{
				if (!isset($GLOBALS['DOCUMENT_COUNT_KEYWORD'][$this->board->module_id])) 
				{
					$this->board->document_count = $this->getDocumentCountbyCategoryArticle();
					$GLOBALS['DOCUMENT_COUNT_KEYWORD'][$this->board->module_id] = $this->board->document_count;
				} 
				else 
				{
					$this->board->document_count = $GLOBALS['DOCUMENT_COUNT_KEYWORD'][$this->board->module_id];
				}
				
				$this->board->result = $this->getDocumentlistBetweenbyCategoryArticle();
			}
			else 
			{
				if (!isset($GLOBALS['DOCUMENT_COUNT_LIST'][$this->board->module_id])) 
				{
					$this->board->document_count = $this->getDocumentCountbyCategory();
					$GLOBALS['DOCUMENT_COUNT_LIST'][$this->board->module_id] = $this->board->document_count;
				} 
				else 
				{
					$this->board->document_count = $GLOBALS['DOCUMENT_COUNT_LIST'][$this->board->module_id];
				}
				
				$this->board->result = $this->getDocumentlistBetweenbyCategory();
			}
			
			$this->CheckPage('category');
		} 
		else if (isset($this->board->sortIndex)) 
		{
			if (!isset($GLOBALS['DOCUMENT_COUNT_SORT'][$this->board->module_id])) 
			{
				$this->board->document_count = $this->getDocumentCountbyBoardId();
				$GLOBALS['DOCUMENT_COUNT_SORT'][$this->board->module_id] = $this->board->document_count;
			} 
			else 
			{
				$this->board->document_count = $GLOBALS['DOCUMENT_COUNT_SORT'][$this->board->module_id];
			}
			
			switch($this->board->sortIndex):
				//다운로드 수 정렬
				case "download_count":
					$this->sortByDownloadCount();
					break;
				case "playtime":
					$this->sortByPlaytime();
					break;
				//조회수 정렬
				case "readed_count":
					$this->sortByReadedCount();
					break;
				//가수 정렬
				case "artist":
					$this->sortByArtist();
					break;
				//추천수 정렬
				case "voted_count":
					$this->sortByVotedCount();
					break;
				case "category":
					$this->sortByCategory();
					break;
				case "regdate":
					$this->sortByRegdate();
					break;
				case "star_count":
					$this->sortByStarCount();
					break;
			endswitch;
			
			$this->CheckPage('sort');
		//장르
		} 
		else if (isset($this->board->genre)) 
		{
			if (!isset($GLOBALS['DOCUMENT_COUNT_GENRE'][$this->board->module_id])) 
			{
				$this->board->document_count = $this->getDocumentCountbyGenre();
				$GLOBALS['DOCUMENT_COUNT_GENRE'][$this->board->module_id] = $this->board->document_count;
			} 
			else 
			{
				$this->board->document_count = $GLOBALS['DOCUMENT_COUNT_GENRE'][$this->board->module_id];
			}
			
			$this->board->page_start = ($this->board->page-1) * ($this->board->list_count);
			$this->board->result = $this->getDocumentlistBetweenbyGenre();
			
			$this->CheckPage('genre');
		} 
		else if (isset($this->board->keyword)) 
		{
			if ($this->board->config->search_type==='Y') 
			{
				switch($this->board->type):
					//제목
					case "title":
						$this->setTitleList();
						break;
					//태그
					case "tag":
						$this->setTagList();
						break;
					//가수
					case "artist":
						$this->setArtistList();
						break;
					//앨범 오리지널
					case "albumorigin":
						$this->setAlbumOriginList();
						break;
					//제목 오리지널
					case "titleorigin":
						$this->setTitleOriginList();
						break;
					default:
						break;
				endswitch;
			}
			else 
			{
				$this->board->page_start = $this->getCurrentListCount();
				$this->board->document_count = $this->getDocumenCountbyColumn();
				$this->board->result = $this->getDocumentListbyColumn();
			}
		} 
		else 
		{
			if (isset($this->board->config->list_view_on) && empty($this->board->config->list_view_on)) 
			{
				$this->board->config->list_view_on = 0;
			}
			
			//일반 문서
			if (($this->board->config->list_view_on | 1) || !isset($this->board->srl)) 
			{
				//카운트 조회
				if (!isset($GLOBALS['DOCUMENT_COUNT_ALL'][$this->board->module_id])) 
				{
					$this->board->document_count = $this->getDocumentCountbyBoardId();
					$GLOBALS['DOCUMENT_COUNT_ALL'][$this->board->module_id] = (int)$this->board->document_count;
				} 
				else 
				{
					$this->board->document_count = $GLOBALS['DOCUMENT_COUNT_ALL'][$this->board->module_id];
				}
				
				$this->CheckPage('normal');
					
				if ($this->board->config->bd_query=="LIMIT") 
				{
					$this->setDocumentRange();
					$this->board->result = $this->getDocumentListLIMIT();
					
				} 
				else if ($this->board->config->bd_query=="JOIN") 
				{
					$this->setDocumentRange();
					$this->board->result = $this->getDocumentListJOIN();
				} 
				else if ($this->board->config->bd_query=="LEFTJOIN") 
				{
					$this->setDocumentRange();
					$this->board->result = $this->getDocumentListLEFTJOIN();
				} 
				else 
				{
					$this->board->page_start = (int)$this->board->document_count - ($this->board->page * $this->board->list_count) + 1;
					$this->board->page_end = (int)$this->board->page_start + $this->board->list_count - 1;
					
					// Check not include srl in end page
					/*$this->getDocumentListGAP();*/
					
					$this->board->result = array_reverse($this->board->query->getDocumentList($this->getParam(__MODULEID), $this->board->page_start, $this->board->page_end));
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