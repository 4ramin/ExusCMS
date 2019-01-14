<?php

	if (!defined("__FLOWER__")) exit();

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
			$this->board->model = new Board_Model($this);
			
			return $this->board;
		}

		function procBoardCategoryMoveFolder() 
		{
			if (!$this->hasGrant(true)) 
			{
				return $this->base->response("type", "error", "html", $this->board->lang['notpermit']);
			}
			
			$module = $this->base->post_params(__MODULEID);
			$category_srl = $this->base->post_params('category_srl');
			$parent_srl = $this->base->post_params('parent_srl');
			
			// Update parent_srl of category to root_srl
			$this->board->model->updateCategoryParentSrl($category_srl, $parent_srl);
		}
		
		function procBoardCategoryFolderOut() 
		{
			if (!$this->hasGrant(true)) 
			{
				return $this->base->response("type", "error", "html", $this->board->lang['notpermit']);
			}
			
			$module = $this->base->post_params(__MODULEID);
			$category_srl = $this->base->post_params('category_srl');
			
			// Update parent_srl of category to null
			$this->board->model->updateCategoryParentSrl($category_srl, null);
		}
		
		function procBoardCategoryRename() 
		{
			if (!$this->hasGrant(true)) 
			{
				return $this->base->response("type", "error", "html", $this->board->lang['notpermit']);
			}
			
			$module = $this->base->post_params(__MODULEID);
			$category_srl = $this->base->post_params('category_srl');
			$text = $this->base->post_params('text');
			
			// Update category caption
			$this->board->model->updateCategoryCaption($category_srl, $text);
		}
		
		function procBoardCategoryMove() 
		{
			if (!$this->hasGrant(true)) 
			{
				return $this->base->response("type", "error", "html", $this->board->lang['notpermit']);
			}
			
			$module = $this->base->post_params(__MODULEID);
			$category_srl = $this->base->post_params('category_srl');
			$parent_srl = $this->base->post_params('parent_srl');
			
			// Just exchange listorder of two items
			$this->board->model->updateCategoryOrders($category_srl, $parent_srl);
			
			// Get a list order index
			$categoryList = $this->board->model->getCategoryListWithoutSub($module);
			$listOrderArray = array_column($categoryList, "list_order");
			$key = (array_search($category_srl, $listOrderArray) + 1);
			
			if ($category_srl > $parent_srl) 
			{
				// Get a prev listorder
				$prevParent = array_search($parent_srl, $listOrderArray) - 1;
				$uniquesrl = $this->board->model->getBetweenCategoryCount($categoryList[$prevParent]['list_order'], $category_srl, null);
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
						$this->board->model->updateCategoryOrders($target, $dest);
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
						$this->board->model->updateCategoryOrders($target, $dest);
					}
				}
			}
			else if ($category_srl < $parent_srl) 
			{
				// Get a next listorder
				$nextParent = array_search($parent_srl, $listOrderArray) + 1;
				$uniquesrl = $this->board->model->getCategoryUniqueReverse($category_srl, $categoryList[$nextParent]['list_order'], null);
				
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
						$this->board->model->updateCategoryOrders($target, $dest);
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
						$this->board->model->updateCategoryOrders($target, $dest);
					}
				}
			}
			
			$msg = "<ts moveType='$moveType' startKey='$startKey' endKey='$endKey' key='$key'></ts>";
			
			return $this->base->response("type", "success", "msg", $msg, "html", $this->board->lang['categorymovesuccess']);
		}
		
		function procBoardCategoryRemove() 
		{
			if (!$this->hasGrant(true)) 
			{
				return $this->base->response("type", "error", "html", $this->board->lang['notpermit']);
			}
			
			$module = $this->base->post_params(__MODULEID);
			$category_srl = $this->base->post_params("category_srl");
			$this->board->model->deleteCategory($category_srl, $module);
			
			// Redirect to Page
			$args = va::args();
			$args->location = str::getUrl('', __MODULEID, $module, 'act', 'dispBoardCategorySetup');
			header::move($args);
		}
		
		function procInsertCategory() 
		{
			if (!$this->hasGrant(true)) 
			{
				return $this->base->response("type", "error", "html", $this->board->lang['notpermit']);
			}
			
			$module = $this->base->post_params(__MODULEID);
			$type = $this->base->post_params("type");
			$name = $this->base->post_params("name");
			$ai = $this->board->model->getAutoIncrement("def_category");
			
			// Insert new category
			$this->board->model->insertCategory($ai, $type, $module, $name);
			
			// Redirect to Page
			$args = va::args();
			$args->location = str::getUrl('', __MODULEID, $module, 'act', 'dispBoardCategorySetup');
			header::move($args);
		}
		
		function getAudiolyrics() 
		{
			$module = $this->base->post_params(__MODULEID);
			$request = new request();
			$srl = $request::decodeBinaryNumberic($this->base->post_params('srl'));
			$lyrics = htmlspecialchars_decode($this->board->model->getLysicsFull($module, $srl));
			
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
					
					return $this->base->response("type", "success", "html", $lyrics);
				}
				else 
				{
					// Get file list in document srl
					$file_list = $this->getFileList($srl);
					
					foreach ($file_list as $key=>$value) 
					{
						// If extension type of file is audio
						if (maya::execute('@\@!mp3||wav!', $value['files'],'boolean')) 
						{
							$filename = __DIR.__FILE__ATTACH.$value['target'].'/'.$value['files'];
							// If file exists
							if (file_exists($filename)) 
							{
								// Get md5 hash of audio file
								$md5 = $this->board->model->getMD5Hash($filename);
								if ($md5) 
								{
									// insert lyrics if found md5 hash
									$lysics = $this->board->model->getLysics($md5);
									$this->board->model->insertLysics('index', $srl, $lysics);
								}
							}
						}
					}
					
					return $this->base->response("type", "error", "html", $this->board->lang['notfoundlyrics']);
				}
			}
		}
		
		function deleteDocument()
		{
			$this->post_data->mid = $this->base->post_params(__MODULEID);
			$this->post_data->srl = $this->base->post_params('srl');
			
			$this->board->model->deleteDocument($this->post_data->srl, $this->post_data->mid);
			
			$oFilesModel = $this->base->getModel('files');
			$oFilesModel->deleteAllAttachmentFiles($this->post_data->srl);
			
			// Redirect to document
			$args = va::args();
			$args->location = str::getUrl('', __MODULEID, $this->post_data->mid);
			header::move($args);
		}
		
		function insertDocument() 
		{
			if ($this->isLogged() !== true) 
			{
				return $this->base->response("type", "error", "html", $this->board->lang['notlogged']);
			}
			
			if (!session::isExistToken()) 
			{
				return $this->base->response("type", "error", "html", $this->board->lang['invalidtoken']);
			}
			
			$this->post_data = new stdClass();
			$this->post_data->mid = $this->base->post_params(__MODULEID);
			$this->post_data->srl = $this->base->post_params('srl');
			$this->post_data->fileSequence = $this->base->post_params('file_sequence');
			$this->post_data->category_srl = $this->base->post_params('category');
			$this->post_data->title = $this->base->post_params('title');
			$this->post_data->title = strip_tags($this->post_data->title);
			$this->post_data->tag_list = $this->base->post_params('tag');
			$this->post_data->tag_list = strip_tags($this->post_data->tag_list);
			$this->post_data->content = ($this->base->post_params('content'));
			$this->post_data->content = $this->base->cleanPurifier($this->post_data->content);
			$this->post_data->ExtraVars = array();
			$this->post_data->title = urldecode($this->base->post_params('title'));
			$this->post_data->memberSrl = $this->base->getMemberSrl();
			
			$this->board->extra_var = $this->board->model->getExtraVar($this->base->post_params(__MODULEID));
			
			if (is_int($this->post_data->srl)) 
			{
				$this->board->document = $this->board->model->getDocumentItems($this->board->srl);
				$memberSrl = $this->board->document['member_srl'];
				
				if ($this->post_data->memberSrl !== $memberSrl) 
				{
					return $this->base->response("type", "error", "html", $this->board->lang['notpermit']);
				}
			}
			
			if (isset($memberSrl))
			{
				$this->post_data->nickname = "익명";
			}
			
			if ($_SESSION['target_srl'] != $this->post_data->fileSequence) 
			{
				$this->post_data->fileSequence = null;
			}
			
			if (!isset($this->post_data->category_srl)) $this->post_data->category_srl = 0;
			
			if (!isset($this->post_data->title)) 
			{
				return $this->base->response("type", "error", "html", $this->board->lang['inserttitle']);
			}
			
			if (!isset($this->post_data->content)) 
			{
				return $this->base->response("type", "error", "html", $this->board->lang['insertcontent']);
			}
			
			if ($this->post_data->srl) 
			{
				// Update document
				$this->board->model->updateDocument(
					$this->post_data->title,
					$this->post_data->content,
					date("Ymdhis"),
					$this->post_data->nickname,
					$this->post_data->mid,
					$this->post_data->category_srl,
					$this->post_data->srl,
					$this->post_data->fileSequence,
					$this->post_data->tag_list
				);
				
				if (isset($_SESSION['target_srl']))
				{
					unset($_SESSION['target_srl']);
				}
				
				// Redirect to document
				$args = va::args();
				$args->location = str::getUrl('', __MODULEID, $this->post_data->mid, 'srl', $this->post_data->srl);
				header::move($args);
			} 
			else 
			{
				// Get Board Sequence
				$lastId = $this->board->model->getBoardSequence($this->post_data->mid);
				
				// Insert Document
				$this->board->model->insertDocument
				(
					$this->post_data->title,
					$this->post_data->content,
					date("Ymdhis"),
					$this->post_data->nickname,
					$this->post_data->mid,
					$this->post_data->category_srl,
					$lastId,
					$this->post_data->fileSequence,
					$this->post_data->tag_list,
					$this->post_data->memberSrl
				);
				
				$this->board->lastID = $this->pdo->lastInsertId('srl');

				// Insert Extravars to doucment
				foreach ($this->board->extra_var as $key=>$val) 
				{
					if (isset($_POST[$val['val']])) 
					{
						$extra_vars_key = $val['val'];
						$extra_vars_val = $_POST[$val['val']];
						$this->board->model->insertExtraVar($lastId, $extra_vars_key, $extra_vars_val);
					}
				}
			}
			
			if (isset($this->post_data->mid)) 
			{
				unset($GLOBALS['__DOCUMENT__COUNT__QUERY__'.$this->post_data->mid]);
			}
			
			$this->board->redirectSrl = 0;
			if (isset($this->board->lastID)) 
			{
				$this->board->redirectSrl = $this->board->lastID;
			}
			else
			{
				$this->board->redirectSrl = $this->post_data->srl;
			}
			
			// Redirect to document
			$args = va::args();
			$args->location = str::getUrl('', __MODULEID, $this->post_data->mid, 'srl', $this->board->redirectSrl);
			header::move($args);
		}
		
		function procBoardBlame() 
		{
			if (!$this->isLogged()) 
			{
				return $this->base->response("type", "error", "html", $this->board->lang['notpermit']);
			}
			
			$this->post_data = new stdClass();
			$this->post_data->srl = $this->base->post_params('srl');
			
			// Get blamed count
			$blamed_count = $this->board->model->getBlamedCount($this->post_data->srl);
			if (isset($blamed_count['blamed']))
			{
				$blamed_count = $blamed_count['blamed'] + 1;
			}
			else
			{
				return $this->base->response("type", "error", "html", $this->board->lang['notpermit']);
			}
			
			// Update blamed count
			if ($this->board->model->UpdateBlamedCount($blamed_count, $this->post_data->srl)) 
			{
				$this->base->response("type", "sucess", "html", $blamed_count);
			} 
			else 
			{
				$this->base->response("type", "sucess", "html", $blamed_count['blamed']);
			}
		}
		
		function procAddPlaylist() 
		{
			if ($this->isLogged() !== true) 
			{
				return $this->base->response("type", "error", "html", $this->board->lang['notlogged']);
			}
			
			$target_srl = $this->base->post_params('target');
			
			// Get extravars in member
			$mExvar = unserialize($this->board->model->getMemberExvar($_SESSION['logged_info']['user_id']));
			if (!$mExvar || !is_array($mExvar['playlist'])) 
			{
				// Set extra info to empty array if not found extravars in member
				$mExvar = $mExvar['playlist'] = Array();
			} 
			else 
			{
				// If found playlist target in extravars in member
				if (is_array($mExvar['playlist']) && in_array($target_srl, $mExvar['playlist'])) 
				{
					return $this->base->response("type", "error", "html", $this->board->lang['alreadyinsertedmusic']);
				}
				
				array_push($mExvar['playlist'],$target_srl);
			}
			
			if ($this->board->model->UpdateMemberInfo($_SESSION['logged_info']['user_id'], serialize($mExvar))) 
			{
				return $this->base->response("type", "success", "html", "등록이 완료되었습니다.");
			} 
			else 
			{
				return $this->base->response("type", "error", "html", "등록을 실패하였습니다.");
			}
		}
		
		function procBoardStar() 
		{
			if (!$this->isLogged()) 
			{
				return $this->base->response("type", "error", "html", $this->board->lang['notpermit']);
			}
			
			$this->post_data = new stdClass();
			$this->post_data->md = $this->base->post_params(__MODULEID);
			$this->post_data->srl = $this->base->post_params('srl');
			$this->post_data->point = $this->base->post_params('star');
			$this->post_data->star = $this->board->model->getDocumentStarCount($this->post_data->srl);
			$this->post_data->star_cnt = $this->board->model->getDocumentStarVotedCount($this->post_data->srl) + 1;
			
			$current_star_count = ($this->post_data->star + $this->post_data->point);
			
			// Update doucment star count
			if ($this->board->model->UpdateDocumentStarCount($star_count, $this->post_data->srl)) 
			{
				$starCount = round($current_star_count / $this->post_data->star_cnt);
				$this->base->response("type", "sucess", "html", $starCount);
				$this->board->model->UpdateDocumentStarVotedCount($this->post_data->star_cnt, $this->post_data->srl);
			}
			else 
			{
				$this->base->response("type", "error", "html", $this->board->lang['notpermit']);
			}
		}
		
		function procBoardVote() 
		{
			if (!$this->isLogged()) 
			{
				return $this->base->response("type", "error", "html", $this->board->lang['notpermit']);
			}
			
			$this->post_data = new stdClass();
			$this->post_data->srl = $this->base->post_params('srl');
			
			// Get voted count
			$voted_count = $this->board->model->getVotedCount($this->post_data->srl);
			
			if (isset($voted_count->result))
			{
				$voted_count = $voted_count->result + 1;
			}
			else
			{
				return $this->base->response("type", "error", "html", $this->board->lang['notpermit']);
			}
			
			// Update voted count
			if ($this->board->model->UpdateVotedCount($voted_count, $this->post_data->srl)) 
			{
				$this->base->response("type", "sucess", "html", $voted_count);
			}
			else 
			{
				$this->base->response("type", "sucess", "html", $voted_count['voted']);
			}
		}
		
		function procBoardRelatedList() 
		{
			if ($this->board->config->related_view=="1") 
			{
				exit();
			}
			
			$this->post_data = new stdClass();
			$this->post_data->target = $this->base->post_params('target');
			$this->post_data->pos = request::decodeBinaryNumberic($this->base->post_params('pos'));
			$this->post_data->tag = $this->base->post_params('tag');
			$this->post_data->module_id = $this->base->post_params(__MODULEID);
			$this->post_data->srl = request::decodeBinaryNumberic($this->base->post_params('srl'));
			$this->list_count = 5;
		
			if (isset($this->post_data->pos) && isset($this->post_data->tag)) 
			{
				if($this->post_data->pos < 0) $this->post_data->pos = 0;
				
				$oTagi = $this->post_data->pos+3;
				$this->board_count = $this->board->model->getDocumentlistTagRelatedSrlCount($this->post_data->module_id,$this->post_data->tag);
				$this->page = (int)ceil($oTagi/$this->list_count);
				$this->page_count = (int)ceil($this->board_count/$this->list_count);
				$this->page_navigation = $this->board->model->getPageArray($this->page_count,  $this->page);
				
				$oTagDocument = $this->board->model->getDocumentlistTagRelated($this->post_data->module_id,$this->post_data->pos,$this->list_count,$this->post_data->tag);
				
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
			$lastId = $this->board->model->getBoardSequence('index');
			$srl = mt_rand(1, $lastId);
			
			$files = $this->getFileList($srl);
			foreach ($files as $key => $val) 
			{
				if (preg_match('/\.(mp3|mp4|wav)(?:[\?\#].*)?$/i', $val['files'], $matches)) 
				{
					return $this->base->response("type", "success", "html", str::getUrl('', 'srl', $srl, 'RToken', request::encodeBinaryNumbericPassword(date('His'),'001')));
					exit();
				}
			}
		}
		
		function procRandomMusic() 
		{
			$lastId = $this->board->model->getBoardSequence('index');
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
				return $this->base->response("type", "error", "html", $this->board->lang['notpermit']);
			}
			
			$this->post_data = new stdClass();
			$this->post_data->md = $this->base->post_params(__MODULEID);
			$this->post_data->srl = $this->base->post_params('srl');
			$this->post_data->singer = $this->base->post_params('singer');
			
			// Update singer info
			if ($this->hasGrant(true)) 
			{
				$this->board->model->UpdateArtist($this->post_data->srl, $this->post_data->md, $this->post_data->singer);
				return $this->base->response("type", "success", "html", "성공적으로 변경했습니다.");
			} 
			else 
			{
				return $this->base->response("type", "error", "html", $this->board->lang['notpermit']);
			}
		}
		
		function procBoardUpdateGenre() 
		{
			if (!$this->hasGrant(true)) 
			{
				return $this->base->response("type", "error", "html", $this->board->lang['notpermit']);
			}
			
			$this->post_data = new stdClass();
			$this->post_data->md = $this->base->post_params(__MODULEID);
			$this->post_data->srl = $this->base->post_params('srl');
			$this->post_data->genre = $this->base->post_params('genre');
			
			// Update genre info
			if ($this->hasGrant(true)) 
			{
				$this->board->model->UpdateGenre($this->post_data->srl, $this->post_data->md, $this->post_data->genre);
				return $this->base->response("type", "success", "html", "성공적으로 변경했습니다.");
			} 
			else 
			{
				return $this->base->response("type", "error", "html", $this->board->lang['notpermit']);
			}
		}
		
		function procBoardSetup() 
		{
			if (!$this->hasGrant(true)) 
			{
				return $this->base->response("type", "error", "html", $this->board->lang['notpermit']);
			}
			
			$this->board->config_post = $this->base->post_params('post_area');
			
			// If exists config parameter
			if ($this->board->config_post) 
			{
				$act = $this->base->post_params('afteract');
				$module_setup = $this->base->post_params(__MODULEID);
				
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
					$this->board->multiorder_option = $this->base->post_params('multiorder_option');
					if ($this->board->multiorder_option) 
					{
						$this->board->config_base->multiorder_option = $this->board->multiorder_option;
					}
				
					// Update board configuration
					$this->updateModuleConfig($module_setup, json_encode($this->board->config_base));
				}
				
				$this->board->module_post = $this->base->post_params('module_post');
				
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