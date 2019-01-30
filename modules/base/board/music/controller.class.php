<?php

class board_controller extends controller_abstract implements controllerInterface 
{
	
	function __construct() 
	{
		parent::getHandler(true);
	}
	
	function init($args) 
	{
		$this->board = new stdClass;
		$this->board->module = $args->module;
		$this->board->model = new board_model($this);
		
		return $this->board;
	}

	function procBoardCategoryMoveFolder() 
	{
		if (!$this->hasGrant(true)) 
		{
			return $this->setError($this->board->lang['notpermit']);
		}
		
		$module = $this->getParam(__MODULEID);
		$category_srl = $this->getParam('category_srl');
		$parent_srl = $this->getParam('parent_srl');
		
		// Update parent_srl of category to root_srl
		$this->board->query->updateCategoryParentSrl($category_srl, $parent_srl);
	}
	
	function procBoardCategoryFolderOut() 
	{
		if (!$this->hasGrant(true)) 
		{
			return $this->setError($this->board->lang['notpermit']);
		}
		
		$module = $this->getParam(__MODULEID);
		$category_srl = $this->getParam('category_srl');
		
		// Update parent_srl of category to null
		$this->board->query->updateCategoryParentSrl($category_srl, null);
	}
	
	function procBoardCategoryRename() 
	{
		if (!$this->hasGrant(true)) 
		{
			return $this->setError($this->board->lang['notpermit']);
		}
		
		$module = $this->getParam(__MODULEID);
		$category_srl = $this->getParam('category_srl');
		$text = $this->getParam('text');
		
		// Update category caption
		$this->board->query->updateCategoryCaption($category_srl, $text);
	}
	
	function procBoardCategoryMove() 
	{
		if (!$this->hasGrant(true)) 
		{
			return $this->setError($this->board->lang['notpermit']);
		}
		
		$module = $this->getParam(__MODULEID);
		$category_srl = $this->getParam('category_srl');
		$parent_srl = $this->getParam('parent_srl');
		
		// Just exchange listorder of two items
		$this->board->query->updateCategoryOrders($category_srl, $parent_srl);
		
		// Get a list order index
		$categoryList = $this->board->query->getCategoryListWithoutSub($module);
		$listOrderArray = array_column($categoryList, "list_order");
		$key = (array_search($category_srl, $listOrderArray) + 1);
		
		if ($category_srl > $parent_srl) 
		{
			// Get a prev listorder
			$prevParent = array_search($parent_srl, $listOrderArray) - 1;
			$uniquesrl = $this->board->query->getBetweenCategoryCount($categoryList[$prevParent]['list_order'], $category_srl, null);
			$startKey = ($key - $uniquesrl->data());
			$endKey = ($key - 1);
			
			// Move to Top
			if ($startKey > $endKey && $endKey < $key) 
			{
				$moveType = "toTop";
				for ($i = $startKey - $endKey; $i <= $endKey; $i++)
				{
					$target = $categoryList[$i]['list_order'];
					$dest = $categoryList[$endKey]['list_order'];
					$this->board->query->updateCategoryOrders($target, $dest);
				}
				
			} 
			else if ($startKey > $endKey && $endKey < $key) 
			{
				// do not stuff
			}
			// Move to Up
			else 
			{
				$moveType = "Up";
				for ($i = $startKey; $i < $key; $i++) 
				{
					$target = $categoryList[$i]['list_order'];
					$dest = $categoryList[$key-1]['list_order'];
					$this->board->query->updateCategoryOrders($target, $dest);
				}
			}
		}
		else if ($category_srl < $parent_srl) 
		{
			// Get a next listorder
			$nextParent = array_search($parent_srl, $listOrderArray) + 1;
			$uniquesrl = $this->board->query->getCategoryUniqueReverse($category_srl, $categoryList[$nextParent]['list_order'], null);
			
			$startKey = $key;
			$endKey = ($key - 1) + count($uniquesrl);
			
			// Move to Bottom
			if ($startKey > $endKey && $endKey == $key) 
			{
				$moveType = "toBottom";
				for ($i = ($endKey + 1); $i <= ($startKey + $endKey); $i++) 
				{
					$target = $categoryList[$i]['list_order'];
					$dest = $categoryList[$i-1]['list_order'];
					$this->board->query->updateCategoryOrders($target, $dest);
				}
			} 
			else if ($startKey > $endKey && $endKey < $key) 
			{
				// do not stuff
			}
			// Move to Down
			else 
			{
				$moveType = "down";
				for ($i = $key; $i < ($key - 1) + count($uniquesrl); $i++) 
				{
					$target = $categoryList[$i]['list_order'];
					$dest = $categoryList[$i - 1]['list_order'];
					$this->board->query->updateCategoryOrders($target, $dest);
				}
			}
		}
		
		$msg = "<ts moveType='$moveType' startKey='$startKey' endKey='$endKey' key='$key'></ts>";
		
		return $this->setMessage($this->board->lang['categorymovesuccess']);
	}
	
	function procBoardCategoryRemove() 
	{
		if (!$this->hasGrant(true)) 
		{
			return $this->setError($this->board->lang['notpermit']);
		}
		
		$this->post_data->module = $this->getParam(__MODULEID);
		$this->post_data->category_srl = $this->getParam("category_srl");
		
		$this->deleteCategory();
		
		// Redirect to Page
		$this->redirectToCategorySetup();
	}
	
	function procInsertCategory() 
	{
		if (!$this->hasGrant(true)) 
		{
			return $this->setError($this->board->lang['notpermit']);
		}
		
		$this->post_data->module = $this->getParam(__MODULEID);
		$this->post_data->type = $this->getParam("type");
		$this->post_data->name = $this->getParam("name");
		$this->post_data->ai = $this->board->query->getAutoIncrement("def_category");
		
		// Insert new category
		$this->insertCategory();
		
		// Redirect to Page
		$this->redirectToCategorySetup();
	}
	
	function getAudiolyrics() 
	{
		$request = new request();
		
		$this->post_data = new stdClass();
		$this->post_data->module = $this->getParam(__MODULEID);
		$this->post_data->srl = $this->getDecodedSrl();
		
		$lyrics = $this->getLyrics();
		
		// If has lyric
		if ($lyrics) 
		{
			// Check XML (strLyric) Attributes
			preg_match_all(
				'|(?:<strLyric>)([[\/]?[\d]{2}:[\d]{2}.[\d]{2}\].*)(?:<br>)(?:</strLyric>)|U', 
				$lyrics, 
				$output
			);
			
			if (!isset($output) || !isset($output[1][0]))
			{
				return;
			}
			
			if ($output[1][0]) 
			{
				// Remove Empty Items
				$lyrics = preg_replace(
					"/[[\/]?(00):(00).(00)\]<br>/U",
					'', 
					$output[1][0].'<br>'
				);
				
				// Convert time
				$lyrics = preg_replace(
					"/[[\/]?([\d]{2}):([\d]{2}).([\d]{2})\](.*)<br>/U",
					'<div ms="$3" timestamp="$1:$2">$4</div>', 
					$lyrics.'<br>'
				);
				
				// Convert Seconds
				$lyrics = preg_replace_callback(
					'/"([\d]{2}):([\d]{2})"/', 
					function($m) 
					{
						return date($m[1] * 60 + $m[2]);
					}, $lyrics
				);
				
				// Convert Minutes
				$lyrics = preg_replace_callback(
					'/"([\d]{2})"/', 
					function($m) 
					{
						return (int)($m[1]);
					}, $lyrics
				);
				
				return $this->setMessage($lyrics);
			}
			else 
			{
				// Get file list in document srl
				$file_list = $this->getFileList($srl);
				
				foreach ($file_list as $fileInfo) 
				{
					// If extension type of file is audio
					if (maya::execute('@\@!mp3||wav!', $fileInfo['files'],'boolean')) 
					{
						$filename = sprintf("%s%s%s/%s", __DIR, __FILE__ATTACH, $fileInfo['target'], $fileInfo['files']);
						
						// If file exists
						if (file_exists($filename)) 
						{
							// Get md5 hash of audio file
							$md5 = $this->board->model->getMD5Hash($filename);
							if ($md5) 
							{
								// insert lyrics if found md5 hash
								$lysics = $this->board->model->getLysics($md5);
								$this->board->query->insertLysics('index', $srl, $lysics);
							}
						}
					}
				}
				
				return $this->setError($this->board->lang['notfoundlyrics']);
			}
		}
	}
	
	function deleteDocument()
	{
		$this->post_data->mid = $this->getParam(__MODULEID);
		$this->post_data->srl = $this->getParam('srl');
		
		db::begin();
		
		$this->deleteDocumentItem();
		
		$this->deleteAttachmentFiles();
		
		db::commit();
			
		// Redirect to document
		$this->redirectToModule();
	}
	
	function insertDocument() 
	{
		if (!$this->isLogged()) 
		{
			return $this->setError($this->board->lang['notlogged']);
		}
		
		if (!session::isExistToken()) 
		{
			return $this->setError($this->board->lang['invalidtoken']);
		}
		
		// Start database transaction
		db::begin();
		
		$this->post_data = new stdClass();
		$this->post_data->mid = $this->getParam(__MODULEID);
		$this->post_data->srl = $this->getParam('srl');
		$this->post_data->fileSequence = $this->getParam('file_sequence');
		$this->post_data->category_srl = $this->getParam('category');
		$this->post_data->title = $this->getParam('title');
		$this->post_data->title = strip_tags($this->post_data->title);
		$this->post_data->tag_list = $this->getParam('tag');
		$this->post_data->tag_list = strip_tags($this->post_data->tag_list);
		$this->post_data->content = ($this->getParam('content'));
		$this->post_data->content = $this->base->cleanPurifier($this->post_data->content);
		$this->post_data->ExtraVars = array();
		$this->post_data->title = urldecode($this->getParam('title'));
		$this->post_data->memberSrl = $this->base->getMemberSrl();
		
		$this->board->extra_var = $this->board->query->getExtraVar($this->getParam(__MODULEID));
		
		// If update document, make sure that user is document author
		if ($this->hasSrl()) 
		{
			if (!$this->isDocumentAuthor()) 
			{
				return $this->setError($this->board->lang['notpermit']);
			}
		}
		
		if (isset($memberSrl))
		{
			$this->post_data->nickname = $this->base->getNickName();
		}
		else
		{
			$this->post_data->nickname = "익명";
		}
		
		if (!$this->isValidFileSequence()) 
		{
			$this->post_data->fileSequence = null;
		}
		
		// If not set category_srl, set category_srl value 0
		if (!$this->hasCategory())
		{
			$this->post_data->category_srl = 0;
		}
		
		if (!$this->hasTitle()) 
		{
			return $this->setError($this->board->lang['inserttitle']);
		}
		
		if (!$this->hasContent()) 
		{
			return $this->setError($this->board->lang['insertcontent']);
		}
		
		// Update document
		if ($this->hasSrl()) 
		{
			$this->updateDocument();
			
			$this->unsetFileSequence();
			
			db::commit();
			
			// Redirect to document
			$this->redirectToDocumentPage();
		} 
		// Insert Document
		else 
		{
			$this->board->lastId = $this->getNextSequence();
			
			$this->insertDocumentItem();
			
			// Get a last srl
			$this->board->lastID = $this->pdo->lastInsertId('srl');

			$this->insertExtraVars();
			
			db::commit();
			
			// Clear board cache
			$this->clearCache();
			
			$this->setRedirectSrl();
			
			$this->redirectBySrl();
		}
	}
	
	function procBoardBlame() 
	{
		if (!$this->isLogged()) 
		{
			return $this->setError($this->board->lang['notpermit']);
		}
		
		$this->post_data = new stdClass();
		$this->post_data->srl = $this->getParam('srl');
		
		// Get blamed count
		$blamed_count = $this->board->query->getBlamedCount($this->post_data->srl);
		if (isset($blamed_count['blamed']))
		{
			$blamed_count = $blamed_count['blamed'] + 1;
		}
		else
		{
			return $this->setError($this->board->lang['notpermit']);
		}
		
		// Update blamed count
		if ($this->board->query->UpdateBlamedCount($blamed_count, $this->post_data->srl)) 
		{
			$this->setMessage($blamed_count);
		} 
		else 
		{
			$this->setMessage($blamed_count['blamed']);
		}
	}
	
	function procAddPlaylist() 
	{
		if ($this->isLogged() !== true) 
		{
			return $this->setError($this->board->lang['notlogged']);
		}
		
		$target_srl = $this->getParam('target');
		
		// Get extravars in member
		$userExtraVars = unserialize($this->board->query->getMemberExvar($_SESSION['logged_info']['user_id']));
		if (!isset($userExtraVars))
		{
			// Set extra info to empty array if not found extravars in member
			$userExtraVars = $userExtraVars['playlist'] = Array();
		} 
		else 
		{
			// If found playlist target in extravars in member
			if (is_array($userExtraVars['playlist']) && in_array($target_srl, $userExtraVars['playlist'])) 
			{
				return $this->setError($this->board->lang['alreadyinsertedmusic']);
			}
			
			array_push($userExtraVars['playlist'], $target_srl);
		}
		
		if ($this->board->query->UpdateMemberInfo($_SESSION['logged_info']['user_id'], serialize($userExtraVars))) 
		{
			return $this->setMessage("등록이 완료되었습니다.");
		} 
		else 
		{
			return $this->setError("등록을 실패하였습니다.");
		}
	}
	
	function procBoardStar() 
	{
		if (!$this->isLogged()) 
		{
			return $this->setError($this->board->lang['notpermit']);
		}
		
		$this->post_data = new stdClass();
		$this->post_data->md = $this->getParam(__MODULEID);
		$this->post_data->srl = $this->getParam('srl');
		$this->post_data->point = $this->getParam('star');
		$this->post_data->star = $this->board->query->getDocumentStarCount($this->post_data->srl);
		$this->post_data->star_cnt = $this->board->query->getDocumentStarVotedCount($this->post_data->srl) + 1;
		
		$current_star_count = ($this->post_data->star + $this->post_data->point);
		
		// Update doucment star count
		if ($this->board->query->UpdateDocumentStarCount($star_count, $this->post_data->srl)) 
		{
			$starCount = round($current_star_count / $this->post_data->star_cnt);
			$this->setMessage($starCount);
			$this->board->query->UpdateDocumentStarVotedCount($this->post_data->star_cnt, $this->post_data->srl);
		}
		else 
		{
			$this->setError($this->board->lang['notpermit']);
		}
	}
	
	function procBoardVote() 
	{
		if (!$this->isLogged()) 
		{
			return $this->setError($this->board->lang['notpermit']);
		}
		
		$this->post_data = new stdClass();
		$this->post_data->srl = $this->getParam('srl');
		
		// Get voted count
		$voted_count = $this->getVotedCount();
		
		if (isset($voted_count->result))
		{
			$voted_count = $voted_count->result + 1;
		}
		else
		{
			return $this->setError($this->board->lang['notpermit']);
		}
		
		// Update voted count
		if ($this->board->query->UpdateVotedCount($voted_count, $this->post_data->srl)) 
		{
			$this->setMessage($voted_count);
		}
		else 
		{
			$this->setMessage($voted_count['voted']);
		}
	}
	
	function procBoardRelatedList() 
	{
		if ($this->board->config->related_view=="1") 
		{
			exit();
		}
		
		$this->post_data = new stdClass();
		$this->post_data->target = $this->getParam('target');
		$this->post_data->pos = request::decodeBinaryNumberic($this->getParam('pos'));
		$this->post_data->pos = $this->post_data->pos ? $this->post_data->pos : 0;
		$this->post_data->tag = $this->getParam('tag');
		$this->post_data->module_id = $this->getParam(__MODULEID);
		$this->post_data->srl = request::decodeBinaryNumberic($this->getParam('srl'));
		$this->list_count = 5;
	
		if (isset($this->post_data->pos) && isset($this->post_data->tag)) 
		{
			if($this->post_data->pos < 0) $this->post_data->pos = 0;
			
			$oTagi = $this->post_data->pos+3;
			$this->board_count = $this->board->query->getDocumentlistTagRelatedSrlCount($this->post_data->module_id,$this->post_data->tag);
			$this->page = (int)ceil($oTagi/$this->list_count);
			$this->page_count = (int)ceil($this->board_count/$this->list_count);
			$this->page_navigation = $this->board->model->getPageArray($this->page_count,  $this->page);
			
			$oTagDocument = $this->board->query->getDocumentlistTagRelated($this->post_data->module_id, $this->post_data->pos, $this->list_count,$this->post_data->tag);
			
			$json = array();
			if ($this->post_data->target=='Related') 
			{
				$json['navigator'] = array();
				$json['item_count'] = $this->board_count;
				$json['prev_navi'] = array(
					'item_pos' => request::encodeBinaryNumberic($this->post_data->pos - 5),
					'item_tag' => $this->post_data->tag,
					'item_module_id' => $this->post_data->module_id,
					'item_srl' => $this->post_data->srl,
					'item_text' => '◀'
				);
				
				$json['next_navi'] = array(
					'item_pos' => request::encodeBinaryNumberic($this->post_data->pos + 5),
					'item_tag' => $this->post_data->tag,
					'item_module_id' => $this->post_data->module_id,
					'item_srl' => $this->post_data->srl,
					'item_text' => '▶'
				);
				
				foreach ($this->page_navigation as $key=>$value_lst) 
				{
					array_push($json['navigator'], array(
						'page' =>  request::encodeBinaryNumberic(($value_lst-1)*5),
						'cur_page' =>  $value_lst,
						'page_count' =>  $this->page,
						'item_tag' => $this->post_data->tag,
						'item_pos' => request::encodeBinaryNumberic($this->post_data->pos),
						'item_module_id' => $this->post_data->module_id,
						'item_srl' => $this->post_data->srl
					));
				}
			}
			
			$json['tag_list'] = array();
			
			foreach ($oTagDocument as $key=>$tdoc) 
			{
				if ($this->post_data->target=='Related') 
				{
					$oFilesModel = $this->base->getModel('files');
					$fileSequence = $oFilesModel->getDocumentFileSequence($tdoc['srl']);
					$this_file = $this->getFileList($fileSequence);
					
					if (isset($this_file) && is_array($this_file))
					{
						foreach ($this_file as $key=>$flst) 
						{
							if (maya::execute('@\||/@!mp3||wav!', $flst['files'],'boolean')) 
							{
								$file_link = sprintf("%s%s%d/%s", __SUB, __FILE__ATTACH, $tdoc['srl'], $flst['files']);
								break;
							}
						}
					}
				}
				
				if ($this->post_data->target=='Related') 
				{
					array_push($json['tag_list'], array(
						'item_srl' =>  $tdoc['srl'],
						'item_link' => str::getUrl(__MODULEID, $this->post_data->module_id, 'srl', $tdoc['srl'], __ACTION, 'view'),
						'file_link' => isset($file_link) ? $file_link : "",
						'title' => $tdoc['title'],
						'item_tag' => $this->post_data->tag,
						'item_pos' => request::encodeBinaryNumberic($this->post_data->pos),
						'item_module_id' => $this->post_data->module_id,
						'current_srl' => $this->post_data->srl
					));
				} else {
					array_push($json['tag_list'], array(
						'item_srl' =>  $tdoc['srl'],
						'item_link' => str::getUrl(__MODULEID,$this->post_data->module_id, 'srl', $tdoc['srl'], __ACTION, 'view'),
						'title' => $tdoc['title'],
						'item_tag' => $this->post_data->tag,
						'item_pos' => request::encodeBinaryNumberic($this->post_data->pos),
						'item_module_id' => $this->post_data->module_id
					));
				}
				
			}
			
			echo json_encode($json);
		}
	}
	
	function procRandomDocument() 
	{
		$lastId = $this->board->query->getBoardSequence('index');
		$srl = mt_rand(1, $lastId);
		
		$files = $this->getFileList($srl);
		foreach ($files as $key => $val) 
		{
			if (preg_match('/\.(mp3|mp4|wav)(?:[\?\#].*)?$/i', $val['files'], $matches)) 
			{
				return $this->setMessage(str::getUrl('', 'srl', $srl, 'RToken', request::encodeBinaryNumbericPassword(date('His'),'001')));
				exit();
			}
		}
	}
	
	function procRandomMusic() 
	{
		$lastId = $this->board->query->getBoardSequence('index');
		$srl = mt_rand(1, $lastId);
		
		$files = $this->getFileList($srl);
		foreach ($files as $key => $val) 
		{
			if (preg_match('/\.(mp3|mp4|wav)(?:[\?\#].*)?$/i', $val['files'], $matches)) 
			{
				echo __SUB.__FILE__ATTACH.$srl."/".$val['files'].'||'.$val['origin'].'||'.str::getUrl(__MODULEID, 'files', __ACTION, 'FileDownload', 'download', $srl, 'target', $val['files']).'||'.$srl;
				exit();
			}
		}
	}
	
	function procBoardUpdateSinger() 
	{
		if (!$this->hasGrant(true)) 
		{
			return $this->setError($this->board->lang['notpermit']);
		}
		
		$this->post_data = new stdClass();
		$this->post_data->md = $this->getParam(__MODULEID);
		$this->post_data->srl = $this->getParam('srl');
		$this->post_data->singer = $this->getParam('singer');
		
		// Update singer info
		if ($this->hasGrant(true)) 
		{
			$this->updateArtist();
			return $this->setMessage("성공적으로 변경했습니다.");
		} 
		else 
		{
			return $this->setError($this->board->lang['notpermit']);
		}
	}
	
	function procBoardUpdateGenre() 
	{
		if (!$this->hasGrant(true)) 
		{
			return $this->setError($this->board->lang['notpermit']);
		}
		
		$this->post_data = new stdClass();
		$this->post_data->md = $this->getParam(__MODULEID);
		$this->post_data->srl = $this->getParam('srl');
		$this->post_data->genre = $this->getParam('genre');
		
		// Update genre info
		if ($this->hasGrant(true)) 
		{
			$this->updateGenre();
			
			return $this->setMessage("성공적으로 변경했습니다.");
		} 
		else 
		{
			return $this->setError($this->board->lang['notpermit']);
		}
	}
	
	function procBoardSetup() 
	{
		if (!$this->hasGrant(true)) 
		{
			return $this->setError($this->board->lang['notpermit']);
		}
		
		$this->board->config_post = $this->getParam('post_area');
		
		// If exists config parameter
		if ($this->board->config_post) 
		{
			$act = $this->getParam('afteract');
			$module_setup = $this->getParam(__MODULEID);
			
			// Get that board configuration is exists
			if ($module_setup) 
			{
				$isModuleConfigExists = $this->getModuleConfigCount($module_setup);
			} 
			else 
			{
				$isModuleConfigExists = 0;
			}
			
			// Insert board configuration if board configuration is not found
			if ($isModuleConfigExists === 0) 
			{
				$this->insertModuleConfig($module_setup, json_encode($this->board->config_post));
			} 
			else 
			{
				// Get board configuration
				$this->board->config_base = json_decode($this->getModuleConfig($module_setup));
			
				// Move board configuration to update parameter
				foreach ($this->board->config_post as $key => $val) 
				{
					$this->board->config_base->$key = $val;
				}
				
				// Move multiorder option to board configuration if multiorder is exists
				$this->board->multiorder_option = $this->getParam('multiorder_option');
				if ($this->board->multiorder_option) 
				{
					$this->board->config_base->multiorder_option = $this->board->multiorder_option;
				}
			
				// Update board configuration
				$this->updateModuleConfig($module_setup, json_encode($this->board->config_base));
			}
			
			$this->board->module_post = $this->getParam('module_post');
			
			// Update board layout and title
			if ($this->board->module_post) 
			{
				$this->updateModuleLayout($module_setup, $this->board->module_post['layout']);
				$this->updateModuleTitle($module_setup, $this->board->module_post['browser_title']);
			}
		}
		
		// Redirect to setup page
		$args = va::args();
		$args->location = str::getUrl('', __MODULEID, $module_setup, __ACTION, $act);
		header::move($args);
	}

}

?>