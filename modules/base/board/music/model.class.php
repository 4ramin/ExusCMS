<?php

	if (!defined("__FLOWER__")) exit();

	class board_model extends board 
	{
		
		protected $pdo;
		private static $mConfig;
		
		function __construct() 
		{
			$this->board = new stdClass;
			$this->base = new base();
			$this->pdo = $this->base->getPDO();
			
			//GET 메소드에서만 설정값을 불러옴
			if ($this->base->getReq() == "GET") {
				$this->board->module_id = $this->base->get_params(__MODULEID, 'string');
				
				if (isset($_SESSION['__BOARD_CONFIG__'.$this->board->module_id])) 
				{
					$this->board->config = $_SESSION['__BOARD_CONFIG__'.$this->board->module_id];
				}
				else
				{
					$this->board->config = json_decode($this->getModuleConfig($this->board->module_id));
				}
				
				$_SESSION['__BOARD_CONFIG__'.$this->board->module_id] = $this->board->config;
				
				/*TODO*///$this->board->config = json_decode($this->getModuleConfig($this->board->module_id));
			}
			
		}

		function getCommentDepthLevel($depth) 
		{
			return ($depth > $this->board->config->comment_depth) ? $this->board->config->comment_depth : ($depth * 2);
		}
		
		function getFileCaption($fileInfo) 
		{
			$fileCaption = $fileInfo['origin'];
				
			if ($this->board->config->hide_filesize != 1) 
			{
				$fileCaption .= '('.file::filesize_format(__DIR.__FILE__ATTACH.$fileInfo['target'].'/'.$fileInfo['files']).')';
			}
			
			if ($this->board->config->hide_downcnt != 1) 
			{
				$fileCaption .= '('.$fileInfo['down'].')';
			}
			
			return $fileCaption;
		}
		
		function getFileDownloadLink($fileInfo) 
		{
			return str::getUrl('',__MODULEID,'files',__ACTION,'FileDownload','download',$fileInfo['target'],'target',$fileInfo['files'],'key',$fileInfo['keyres'],'session',$_SESSION['token']);
		}
		
		function getCategoryLink($category_srl) 
		{
			return str::getUrl('', __MODULEID, $this->base->get_params(__MODULEID), 'category', $category_srl, 'bdstyle', $this->base->get_params('bdstyle'), 'keyword', $this->base->get_params('keyword'), 'type', $this->base->get_params('type'));
		}
		
		function getSortIndexLink($sort_index):string
		{
			return str::getUrl('', __MODULEID, $this->base->get_params(__MODULEID), 'sort_index', $sort_index, 'bdstyle', $this->base->get_params('bdstyle'));
		}
		
		function getListCountLink($sort_index):string
		{
			return str::getUrl('', __MODULEID, $this->base->get_params(__MODULEID), 'list_count', $sort_index, 'bdstyle', $this->base->get_params('bdstyle'));
		}
		
		function getExtraVarsHTML($val) 
		{
			$type = $this->getExtraVarTypebyName($val['name'], 'type');
			$variable = $val['val'];
			
			switch($type) 
			{
				case 'text':
					$output = $variable;
				default:
					break;
			}
			
			return $output;
		}
		
		function isThumbnailExist($documentSrl):bool
		{
			$fp = sprintf("%s%s%s/%sx%s.jpg", __DIR, __THUMB__ATTACH, $documentSrl, $this->board->config->thumbnail_width, $this->board->config->thumbnail_height);
			if (file_exists($fp)) {
				if (filesize($fp) < 1) {
					return false;
				}
				
				return true;
			}
			
			return false;
		}
		
		function getIndexThumbnail($fileList, $value) 
		{
			foreach($fileList as $fileInfo) 
			{
				if (maya::execute('@\@+.+!jpg||png||gif||jpeg!', $fileInfo['files'],'boolean') && $this->board->config->image_ignore_overlab == "1") 
				{
					$oFilesModel = $this->base->getModel('files');
					$srl = $value['file_sequence'];//$oFilesModel->getDocumentFileSequence($value['file_sequence']);
					$thumbnail = $this->base->makeThumbnail($fileInfo['files'], $value['file_sequence'], $this->board->config->thumbnail_width, $this->board->config->thumbnail_height);
					
					if (!isset($this->img_index)) 
					{
						$this->img_index = 0;
					}
					
					if (!isset($this->tmp_md5)) 
					{
						$this->tmp_md5 = null;
					}
					
					if ($value['thumbmd5'] !== $this->tmp_md5) 
					{
						$this->img_index++;
						$this->tmp_md5 = $value['thumbmd5'];
						$thumbArray = array(
							'index' => $this->img_index, 
							'img' => $thumbnail."?".substr(md5(date("YmdHis", (filemtime(__DIR.$thumbnail)))),0,7)
						);
					} 
					else if ($value['thumbmd5'] === $this->tmp_md5) 
					{
						if ($this->img_index === 1) 
						{
							$this->tmp_md5 = $value['thumbmd5'];
							$thumbArray = array(
								'index' => $this->img_index,
								'img' => $thumbnail."?".substr(md5(date("YmdHis", (filemtime(__DIR.$thumbnail)))),0,7)
							);
						} 
						else 
						{
							$thumbArray = array('index'=>$this->img_index);
						}
					}
					
					if ($value['thumbmd5'] === null) 
					{
						$image = __DIR.__THUMB__ATTACH.$srl.'/'.$this->board->config->thumbnail_width.'x'.$this->board->config->thumbnail_height.'.jpg';
						if (file_exists($image)) 
						{
							$this->UpdateThumbMd5($value['srl'], $value['module'], md5(file_get_contents($image)));
						}
					} 
					else 
					{
						$this->tmp_md5 = $value['thumbmd5'];
					}
				}
			}
			
			return $thumbArray;
		}
		
		/**
		 * Update Member Info
		 *
		 * @param String $user_id
		 * @param String $minfo
		 */
		function UpdateMemberInfo($user_id, $minfo):bool
		{
			$sth = $this->pdo->prepare("UPDATE def_member SET minfo = :minfo WHERE user_id = :user_id");
			$sth->bindParam(':user_id', $user_id, PDO::PARAM_STR);
			$sth->bindParam(':minfo', $minfo, PDO::PARAM_STR);
			$sth->execute();
			
			return true;
		}
	
		function updateCategoryCaption($list_order, $caption):bool 
		{
			$sth = $this->pdo->prepare("UPDATE def_category SET name = :caption WHERE list_order = :list_order");
			$sth->bindParam(':list_order', $list_order, PDO::PARAM_INT);
			$sth->bindParam(':caption', $caption, PDO::PARAM_STR);
			$sth->execute();
			
			return true;
		}
		
		/**
		 * Get Member Extravars
		 *
		 * @param String $user_id
		 */
		function getMemberExvar($user_id):string
		{
			$sth = $this->pdo->prepare("SELECT minfo FROM def_member WHERE user_id = :user_id");
			$sth->bindParam(':user_id', $user_id, PDO::PARAM_STR);
			$sth->execute();
			$std_count = $sth->fetch();
			
			return $std_count[0];
		}
	
		function getBoardSequence($module)
		{
			return db::Query('SELECT','def_document_music',
			[
				['', 'module', '=', ':module', $module],
				['ORDER', 'srl_bd', 'desc']
			],'srl_bd', 'one')+1;
		}
	
		/**
		 * Get All Board Count
		 *
		 * @param string $module
		 */
		function getBoardAllCount():int
		{
			return db::Query('SELECT', 'def_module', [], 'count(*)', 'one');
		}

		/**
		 * Get All Document Count
		 *
		 * @param string $module
		 */
		function getDocumentAllCount():int
		{
			return db::Query('SELECT','def_document_music',[
			],'count(*)', 'one');
		}

		function getDocumentListbySelect($count):array
		{
			$sth = $this->pdo->prepare("SELECT title FROM def_document_music ORDER by srl_bd desc LIMIT 0, :int");
			$sth->bindParam(':int', $count, PDO::PARAM_INT);
			$sth->execute();
			return $sth->fetchAll();
		}
		
		function getMemberListbySelect($count):array
		{
			$sth = $this->pdo->prepare("SELECT * FROM def_member LIMIT :int");
			$sth->bindParam(':int', $count, PDO::PARAM_INT);
			$sth->execute();
			return $sth->fetchAll();
		}
		
		function dispMemberLogin() 
		{
			$oMemberView = $this->base->getView('member');
			return $oMemberView->dispMemberLogin();
		}
		
		function getID3vContext($target_file) 
		{
			if (!$this->getID3) 
			{
				include_once(__DIR."/common/libraries/getid3/getid3.php");
				$this->getID3 = new getID3;
			}
			
			if (file_exists($target_file)) 
			{
				$finfo = $this->getID3->analyze($target_file);
				getid3_lib::CopyTagsToComments($finfo); 
				getid3_lib::IncludeDependency(GETID3_INCLUDEPATH.'module.tag.id3v1.php', __FILE__);
				getid3_lib::IncludeDependency(GETID3_INCLUDEPATH.'module.tag.id3v2.php', __FILE__);
				
				return $finfo;
			} 
			else 
			{
				return false;
			}
		}
		
		function chkId3Tags($mediaInfo, $fileInfo, $fileSequence) 
		{
			if ($this->board->config->none_id3 == 1) 
			{
				return;
			}
			
			if (!isset($this->board->config->artist_length)) 
			{
				$this->board->config->artist_length = (int)15;
			}
			
			if ($mediaInfo['album_only'] != null || $mediaInfo['album_only'] == 'None') 
			{
				if ($this->getOriginAlbumCountbyAlbum($mediaInfo['album_only']) == 0) 
				{
					$this->insertOriginAlbum($mediaInfo['album_only']);
				}
			}
			
			$target_file = sprintf("%s%s%s/%s", __DIR, __FILE__ATTACH, $fileSequence, $fileInfo);
			if (!file_exists($target_file)) return;
			
			$id3Info = null;
			if (!$id3Info) 
			{
				$id3Info = $this->getID3vContext($target_file);
			}
			
			if (!$id3Info) 
			{
				$id3Info = $this->getID3->analyze($target_file);
				getid3_lib::CopyTagsToComments($id3Info); 
				getid3_lib::IncludeDependency(GETID3_INCLUDEPATH.'module.tag.id3v1.php', __FILE__);
				getid3_lib::IncludeDependency(GETID3_INCLUDEPATH.'module.tag.id3v2.php', __FILE__);
			}
			
			if (!$id3Info) return;
			
			if ($mediaInfo['title_only'] == null || $mediaInfo['title_only'] == 'None') 
			{
				$id3_title = $id3Info['comments']['title'][0];
				if (!$id3_title) 
				{
					$id3_title = 'None';
				}
				
				$this->UpdateTitleOnly($mediaInfo['srl'], $mediaInfo['module'], $id3_title);
				$mediaInfo['title_only'] = $id3_title;
				
				$id3_album = $id3Info['comments']['album'][0];
				if (!$id3_album) 
				{
					$id3_album = 'None';
				}
				
				$this->UpdateAlbumOnly($mediaInfo['srl'], $mediaInfo['module'], $id3_album);
				$mediaInfo['album_only'] = $id3_album;
			}
			
			if ($mediaInfo['bitrate'] == null) 
			{
				$bitrate = $id3Info['bitrate'];
				if (!$bitrate)
				{
					$bitrate = "Unknown";
				}
				
				$this->UpdateBitrate($mediaInfo['srl'], $bitrate);
			}
		
			if ($mediaInfo['playtime'] == null || $mediaInfo['playtime'] == 0) 
			{
				if ($this->board->config->none_id3!=1) 
				{
					$artist = $id3Info['playtime_seconds'];
					if (!$artist) 
					{
						$artist = 0;
					}
					
					$this->UpdatePlayTime($mediaInfo['srl'], $mediaInfo['module'], $artist);
			   }
			}
			
			if ($mediaInfo['artist'] == null  || $mediaInfo['artist'] == 'None') 
			{
				$artist = $id3Info['comments']['artist'][0];
				if (!$artist) 
				{
					$artist = 'None';
				}
				
				$this->UpdateArtist($mediaInfo['srl'], $mediaInfo['module'], $artist);
			} 
			else 
			{
				$oAuthorCnt = $this->getAuthorCount($mediaInfo['artist']);
				if ($oAuthorCnt == 0) 
				{
					$this->insertAuthor($mediaInfo['artist']);
				}
			}
			
		}

		/**
		 * 가사 업데이트
		 *
		 * @param string $genre
		 * @param int $get_serial
		 */
		function getLysicsbyArtist($title, $artist) 
		{
			$string = '<?xml version="1.0" encoding="UTF-8"?>
			<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://www.w3.org/2003/05/soap-envelope" xmlns:SOAP-ENC="http://www.w3.org/2003/05/soap-encoding" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:ns2="ALSongWebServer/Service1Soap" xmlns:ns1="ALSongWebServer" xmlns:ns3="ALSongWebServer/Service1Soap12"><SOAP-ENV:Body><ns1:GetResembleLyric2><ns1:stQuery><ns1:strTitle>'.$title.'</ns1:strTitle><ns1:strArtistName>'.$artist.'</ns1:strArtistName><ns1:nCurPage>0</ns1:nCurPage></ns1:stQuery></ns1:GetResembleLyric2></SOAP-ENV:Body></SOAP-ENV:Envelope>';
			
			$client = new HttpClient('lyrics.alsong.co.kr');
			$client->post('/alsongwebservice/service1.asmx', $string);
			return $client->getContent();
		}
		
		/*
		 * 인기 키워드를 가져온다
		 */
		function getLysicsCount($module, $target_srl) 
		{
			return db::Query('SELECT','def_lysics',[
				['AND', 'target_srl', '=', ':args1', $target_srl],
				['', 'module', '=', ':args2', $module]
			],'count(*)', 'one', '', 'object');
		}
	
		function getLysicsFull($module, $srl) 
		{
			if ($this->getLysicsCount($module, $srl)->data() > 0)
			{
				return db::Query('SELECT', 'def_lysics', [
					['AND', 'target_srl', '=', ':args1', $srl],
					['', 'module', '=', ':args2', $module]
				],'lysics', 'one');
			}
		}
	
		function deleteDocument($documentSrl, $module) 
		{
			return db::Query('DELETE','def_document_music', [
				['AND', 'srl', '=', ':args1', $documentSrl],
				['', 'module', '=', ':args2', $module]
			],'', 'boolean');
		}
	
		function deleteCategory($list_order, $module) 
		{
			return db::Query('DELETE','def_category', [
				['AND', 'list_order', '=', ':list_order', $list_order],
				['', 'module', '=', ':module', $module]
			],'', 'boolean');
		}
	
		function getLysics($md5) 
		{
			$string = '<?xml version="1.0" encoding="UTF-8"?><SOAP-ENV:Envelope xmlns:SOAP-ENV="http://www.w3.org/2003/05/soap-envelope" xmlns:SOAP-ENC="http://www.w3.org/2003/05/soap-encoding" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:ns2="ALSongWebServer/Service1Soap" xmlns:ns1="ALSongWebServer" xmlns:ns3="ALSongWebServer/Service1Soap12"><SOAP-ENV:Body><ns1:GetLyric5><ns1:stQuery><ns1:strChecksum>'.$md5.'</ns1:strChecksum><ns1:strVersion>2.0 beta2</ns1:strVersion><ns1:strMACAddress>ffffffffffff</ns1:strMACAddress><ns1:strIPAddress>255.255.255.0</ns1:strIPAddress></ns1:stQuery></ns1:GetLyric5></SOAP-ENV:Body></SOAP-ENV:Envelope>';
			
			$client = new HttpClient('lyrics.alsong.co.kr');
			$client->post('/alsongwebservice/service1.asmx', $string);
			return $client->getContent();
		}
		
		function getAutoIncrement($column)
		{
			$sth = $this->pdo->prepare("SELECT `auto_increment` FROM INFORMATION_SCHEMA.TABLES WHERE table_name = :column");
			$sth->bindParam(':column', $column, PDO::PARAM_STR);
			$sth->execute();
			
			$std_count = $sth->fetchAll();
			return array_shift($std_count)['auto_increment'];
		}
		
		function insertCategory($list_order, $type, $module, $name) 
		{
			$sth = $this->pdo->prepare("INSERT INTO def_category (list_order, type, module, name) VALUES (:list_order, :type, :module, :name)");
			$sth->bindParam(':list_order', $list_order, PDO::PARAM_INT);
			$sth->bindParam(':type', $type, PDO::PARAM_STR);
			$sth->bindParam(':module', $module, PDO::PARAM_STR);
			$sth->bindParam(':name', $name, PDO::PARAM_STR);
			$sth->execute();
		}
		
		function insertLysics($module, $target_srl, $lysics) 
		{
			$sth = $this->pdo->prepare("INSERT INTO def_lysics (target_srl, lysics, module) VALUES (:target_srl, :lysics, :module)");
			$sth->bindParam(':target_srl', $target_srl, PDO::PARAM_INT);
			$sth->bindParam(':lysics', $lysics, PDO::PARAM_STR);
			$sth->bindParam(':module', $module, PDO::PARAM_STR);
			$sth->execute();
		}
		
		/*http://www.zedwood.com/article/php-calculate-duration-of-mp3*/
		function getMD5Hash($filename) 
		{
			$fd = fopen($filename, "rb");
	 
			$block = fread($fd, 100);
			$offset = $this->skipID3v2Tag($block);
			fseek($fd, $offset, SEEK_SET);
			return md5(fread($fd, 163840));
		}
		
		/*http://www.zedwood.com/article/php-calculate-duration-of-mp3*/
		function skipID3v2Tag(&$block) 
		{
			if (substr($block, 0,3)=="ID3") 
			{
				$id3v2_flags = ord($block[5]);
				$flag_footer_present = $id3v2_flags & 0x10 ? 1 : 0;
				$z0 = ord($block[6]);
				$z1 = ord($block[7]);
				$z2 = ord($block[8]);
				$z3 = ord($block[9]);
				if ((($z0&0x80) == 0) && (($z1&0x80) == 0) && (($z2&0x80) == 0) && (($z3&0x80) == 0)) 
				{
					$header_size = 10;
					$tag_size = (($z0&0x7f) * 2097152) + (($z1&0x7f) * 16384) + (($z2&0x7f) * 128) + ($z3&0x7f);
					$footer_size = $flag_footer_present ? 10 : 0;
					
					return $header_size + $tag_size + $footer_size;
				}
			}
			return 0;
		}	

		function UpdateBitrate($get_serial, $bitrate):bool
		{
			$sth = $this->pdo->prepare("UPDATE def_document_music SET bitrate = :bitrate WHERE srl = :srl");
			$sth->bindParam(':bitrate', $bitrate, PDO::PARAM_STR);
			$sth->bindParam(':srl', $get_serial, PDO::PARAM_INT);
			$sth->execute();
			return TRUE;
		}
		
		/**
		 * Upload Document Artist
		 *
		 * @param string $artist
		 * @param string $get_board
		 * @param int $get_serial
		 */
		function UpdateAlbumOnly($srl, $mid, $album):bool
		{
			$sth = $this->pdo->prepare("UPDATE def_document_music SET album_only = :album WHERE srl = :srl AND module = :mid");
			$sth->bindParam(':album', $album, PDO::PARAM_STR);
			$sth->bindParam(':srl', $srl, PDO::PARAM_INT);
			$sth->bindParam(':mid', $mid, PDO::PARAM_STR);
			$sth->execute();
			return TRUE;
		}
		
		/**
		 * upload document artist
		 *
		 * @param string $artist
		 * @param string $get_board
		 * @param int $get_serial
		 */
		function UpdateTitleOnly($get_serial, $get_board, $title):bool
		{
			$sth = $this->pdo->prepare("UPDATE def_document_music SET title_only = :title WHERE srl = :srl AND module = :mid");
			$sth->bindParam(':title', $title, PDO::PARAM_STR);
			$sth->bindParam(':srl', $get_serial, PDO::PARAM_INT);
			$sth->bindParam(':mid', $get_board, PDO::PARAM_STR);
			$sth->execute();
			return TRUE;
		}
	
		/**
		 * upload file key
		 *
		 * @param int $get_serial
		 */
		function UpdateFileKey($get_serial):bool
		{
			$sth = $this->pdo->prepare("UPDATE def_file SET keyres = :rndkey WHERE target = :srl");
			$sth->bindParam(':rndkey', md5(str::getRandomString(10)), PDO::PARAM_STR);
			$sth->bindParam(':srl', $get_serial, PDO::PARAM_INT);
			$sth->execute();
			
			return true;
		}
	
		/**
		 * insert author
		 *
		 * @param string $author
		 */
		function insertAuthor($author) 
		{
			$sth = $this->pdo->prepare("INSERT INTO def_artist (artist) VALUES (:author)");
			$sth->bindParam(':author', $author, PDO::PARAM_STR);
			$sth->execute();
		}
	
		/**
		 * update genre
		 *
		 * @param string $genre
		 * @param int $get_serial
		 */
		function insertOriginAlbum($album) 
		{
			$sth = $this->pdo->prepare("INSERT INTO def_origin (album) VALUES (:album)");
			$sth->bindParam(':album', $album, PDO::PARAM_STR);
			$sth->execute();
		}
	
		/**
		 * 중복 썸네일을 한번만 요청할 수 있도록 MD5를 생성한다.
		 *
		 * @param string $md5
		 * @param string $module
		 * @param int $srl
		 */
		function UpdateThumbMd5($srl, $module, $md5) 
		{
			return db::Query('UPDATE', 'def_document_music', [
				['WHERE', 'thumbmd5', '=', ':args1', $md5],
				['AND', 'srl', '=', ':args2', $srl],
				['', 'module', '=', ':args3', $module]
			],'', 'boolean');
		}
	
		/**
		 * 댓글 추천 값을 가져온다.
		 *
		 * @param int $get_serial
		 */
		function insertExtraVar($target_srl, $name, $val) 
		{
			$sth = $this->pdo->prepare("INSERT INTO def_extravar (target_srl, name, val) VALUES (:target_srl, :name, :val)");
			$sth->bindParam(':target_srl', $target_srl, PDO::PARAM_INT);
			$sth->bindParam(':name', $name, PDO::PARAM_STR);
			$sth->bindParam(':val', $val, PDO::PARAM_STR);
			$sth->execute();
		}
		
		function updateDocument($post_title, $post_content, $post_date, $nickname, $post_board, $get_category, $board_serial, $file_sequence, $tag) 
		{
			return db::Query('UPDATE','def_document_music', [
				[',', 'title', '=', ':args1', $post_title],
				[',', 'file_sequence', '=', ':args2', $file_sequence],
				[',', 'tag', '=', ':args3', $tag],
				['WHERE', 'content', '=', ':args4', $post_content],
				['', 'srl', '=', ':args5', $board_serial]
			],'', 'boolean');
		}
		
		/**
		 * 문서를 입력한다
		 *
		 * @param string $post_title
		 * @param string $post_content
		 * @param string $post_date
		 * @param string $nickname
		 * @param string $post_board
		 * @param int $get_category
		 * @param int $board_serial
		 */
		function insertDocument($post_title, $post_content, $post_date, $nickname, $post_board, $get_category, $board_serial, $file_sequence, $tag, $membersrl) 
		{
			$sth = $this->pdo->prepare("INSERT INTO def_document_music (title, content, nick_name, module, regdate, category_srl, srl_bd, file_sequence, tag, member_srl) VALUES (:title, :content, :nick_name, :module, :date, :category_srl, :srlbd, :file_sequence, :tag, :member_srl)");
			$sth->bindParam(':title', $post_title, PDO::PARAM_STR);
			$sth->bindParam(':content', $post_content, PDO::PARAM_STR);
			$sth->bindParam(':nick_name', $nickname, PDO::PARAM_STR);
			$sth->bindParam(':module', $post_board, PDO::PARAM_STR);
			$sth->bindParam(':date', $post_date, PDO::PARAM_STR);
			$sth->bindParam(':category_srl', $get_category, PDO::PARAM_INT);
			$sth->bindParam(':srlbd', $board_serial, PDO::PARAM_INT);
			$sth->bindParam(':file_sequence', $file_sequence, PDO::PARAM_INT);
			$sth->bindParam(':tag', $tag, PDO::PARAM_STR);
			$sth->bindParam(':member_srl', $membersrl, PDO::PARAM_INT);
			
			$sth->execute();
		}
		
		/**
		 * 페이지 네비게이션 배열을 가져온다
		 *
		 * @param int $board_count
		 * @param int $page_start
		 * @param int $page_end
		 */
		function getPageArray($board_count, $get_page, $page_count=10):array 
		{
			$arr_page = array();
			$pg_x = 0;
			$pg_x = 0;
			
			$page_count_rel = ceil($page_count / 2);
			$board_count = ($board_count < 0) ? 1 : $board_count;

			if ($get_page > $board_count - ($page_count - 1)) 
			{
				$pg_index = $board_count - $page_count;
				$pg_x = $pg_index < $page_count ? 0 : -1;
			}
			else if ($get_page > $page_count_rel) 
			{
				$pg_index = $get_page - ($page_count_rel);
				$pg_x = $pg_index > $page_count ? 0 : -1;
			}
			
			while($pg_x < $page_count) 
			{
				$pg_x++;
				if (isset($pg_index)) 
				{
					$pg_insert = $pg_x + $pg_index;
					if ($pg_insert > 0) 
					{
						array_push($arr_page, $pg_insert);
					}
				} 
				else 
				{
					array_push($arr_page,$pg_x);
				}
			}
			
			return $arr_page;
		}
	
	/* Tag, ETC */
	
		/*
		 * 인기 키워드를 가져온다
		 */
		function getKeywordPopular():string
		{
			return db::Query('SELECT', 'popular_keyword', [
				['ORDER', 'count', 'desc'],
				['LIMIT', '10']
			],'keyword', 'one');
		}
	
		/**
		 * get author count
		 *
		 * @param string $author\
		 */
		function getAuthorCount($author):int
		{
			return db::Query('SELECT', 'def_artist', [
				['', 'artist', '=', ':args1', $author]
			],'count(*)', 'one');
		}
	
		/*
		 * get Author List
		 */
		function getAuthor() 
		{
			return db::Query('!SELECT', 'def_artist', [
				['ORDER', 'artist', 'asc']
			],'*', 'all');
		}
		
		/**
		 * get original album
		 *
		 * @param int $pgx
		 */
		function getCategoryUnique($target, $destiny, $substr) 
		{
			$sth = $this->pdo->prepare("SELECT category_srl FROM def_category WHERE category_srl > :args2 AND category_srl < :args1 AND sub_srl IS null");
			$sth->bindParam(':args1', $target);
			$sth->bindParam(':args2', $destiny);
			$sth->execute();
			$std_count = $sth->fetchAll();
			return $std_count;
		}
		
		/**
		 * get original album
		 *
		 * @param int $pgx
		 */
		function getBetweenCategoryCount($target, $destiny) 
		{
			return db::Query('SELECT','def_category',[
				['AND', 'list_order', '>', ':args1', $target],
				['AND', 'list_order', '<', ':args2', $destiny],
				['', 'sub_srl', 'IS', 'NULL']
			],'count(list_order)', 'one', '', 'object');
		}
		
		/**
		 * get original album
		 *
		 * @param int $pgx
		 */
		function getCountInTargetDocument($moduleId, $srlbd) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':args1', $moduleId],
				['', 'srl_bd', '<', ':args2', $srlbd]
			],'count(*)', 'one', '', 'object');
		}
		
		function getCategoryNamebysrl($srl) 
		{
			return db::Query('SELECT','def_category',[
				['', 'category_srl', '=', ':args1', $srl]
			],'name', 'one');
		}
		
		function updateCategorySrl($target, $value) 
		{
			return db::Query('UPDATE','def_category',[
				['WHERE', 'category_srl', '=', ':args1', $value],
				['', 'category_srl', '=', ':args2', $target]
			],'', 'boolean');
		}
		
		function updateCategoryParentSrl($target, $value) 
		{
			$sth = $this->pdo->prepare("UPDATE def_category SET sub_srl = :args2 WHERE category_srl = :args1");
			$sth->bindParam(':args1', $target);
			$sth->bindParam(':args2', $value);
			$sth->execute();
			$std_count = $sth->fetchAll();
			return $std_count;
			
			return db::Query('UPDATE','def_category',[
				['WHERE', 'category_srl', '=', ':args1', $value],
				['', 'sub_srl', '=', ':args2', $target]
			],'', 'boolean');
		}
		
		function updateCategoryOrders($target, $destination) 
		{
			$sql = "UPDATE def_category a inner join def_category b on a.list_order <> b.list_order set a.list_order = b.list_order where a.list_order in ( :args1, :args2 ) and b.list_order in ( :args3, :args4 )";
			$sth = $this->pdo->prepare($sql);
			$sth->bindParam(':args1', $target, PDO::PARAM_INT);
			$sth->bindParam(':args2', $destination, PDO::PARAM_INT);
			$sth->bindParam(':args3', $destination, PDO::PARAM_INT);
			$sth->bindParam(':args4', $target, PDO::PARAM_INT);
			$sth->execute();
		}
		
		function exchangeCategory($target, $destiny) 
		{
			
			//$sql = "UPDATE def_category old JOIN def_category new USING (id) SET old.category_srl = new.category_srl, new.category_srl = old.category_srl, new.name = old.name WHERE  old.category_srl = :args1, new.category_srl = :args2";
			
			$sql = "UPDATE def_category a inner join def_category b on a.category_srl <> b.category_srl set a.type = b.type, a.name = b.name, a.sub_srl = b.sub_srl where a.category_srl in ( :args1, :args2 ) and b.category_srl in ( :args3, :args4 )";
			$sth = $this->pdo->prepare($sql);
			$sth->bindParam(':args1', $target, PDO::PARAM_INT);
			$sth->bindParam(':args2', $destiny, PDO::PARAM_INT);
			$sth->bindParam(':args3', $target, PDO::PARAM_INT);
			$sth->bindParam(':args4', $destiny, PDO::PARAM_INT);
			$sth->execute();
		}
		
		function insertBeforeKey($array, $key, $data = null) 
		{
			// if the key doesn't exist
			if (($offset = array_search($key, array_keys($array))) === false)
			{
				$offset = 0; // should we prepend $array with $data?
				$offset = count($array); // or should we append $array with $data? lets pick this one...
			}

			return array_merge(array_slice($array, 0, $offset), (array) $data, array_slice($array, $offset));
		}

		function getModuleCategoryList($module) 
		{
			
			$category_list = $this->getCategoryListAndCount($module);
			return $category_list;
			/*echo print_r(($category_list)->data());
			
			$category_list = $this->getCategoryList($module);
			$i = 0;
			
			foreach($category_list as $key=>$val) 
			{
				$i++;
				$sub_category_list = $this->getCategorySubList($val['category_srl']);
				if (count($sub_category_list)>0) 
				{
					array_splice($category_list, $i, 0, $sub_category_list);
					$i = $i + count($sub_category_list);
				}
			}
			
			return $category_list;*/
		}
		
		
		/**
		 * get original album
		 *
		 * @param int $pgx
		 */
		function getCategoryListWithoutSub($module) 
		{
			return  db::Query('SELECT','def_category',[
				['AND', 'module', '=', ':args1', $module],
				['', 'sub_srl', 'IS', 'null'],
				['ORDER', 'list_order', 'asc']
			],'*', 'all');
		}
	
		function getGapInModule($start, $end, $target)
		{
			//$sql = "SELECT count(seq2.seq), count(seq.seq) FROM seq_{$startA}_to_{$endA} seq, seq_{$startB}_to_{$endB} seq2 where seq.seq not in (select c.srl_bd from def_document_music c WHERE c.module = 'index') AND seq2.seq not in (select d.srl_bd from def_document_music d WHERE d.module = :args1)";
			$sql = "SELECT count(seq.seq) FROM seq_{$start}_to_{$end} seq where seq.seq not in (select c.srl_bd from def_document_music c WHERE c.module = :args1)";
			$sth = db::Compile($sql);
			db::BindParams($sth, [
				"args1" => $target
			], "");
			
			$output = db::getOutput($sth, 'one', "object");
			return $output;
		}
	
		/**
		 * get original album
		 *
		 * @param int $pgx
		 */
		function getSubCategoryList($module, $subsrl) 
		{
			return  db::Query('SELECT','def_category',[
				['AND', 'module', '=', ':args1', $module],
				['', 'sub_srl', '=', ':args2', $subsrl],
				['ORDER', 'list_order', 'asc']
			],'*', 'all');
		}
	
		function getCategoryListAndCount($module) 
		{
			if (!isset($_SESSION['__BOARD__CATEGORY__'.$module])) 
			{
				$sql = "SELECT DISTINCT a.name as 'name', a.category_srl as 'category_srl', (SELECT count(c.category_srl) FROM def_document_music c WHERE a.category_srl = c.category_srl) as 'count' FROM def_category a LEFT outer join def_document_music b on b.category_srl = a.category_srl WHERE a.module = :args1";
				$sth = db::Compile($sql);
				db::BindParams($sth, ["args1"=>$module], "");
				$output = db::getOutput($sth, 'all', "object");
				$_SESSION['__BOARD__CATEGORY__'.$module] = $output->data();
			}
			
			return $_SESSION['__BOARD__CATEGORY__'.$module];
		}
	
	
		/**
		 * get original album
		 *
		 * @param int $pgx
		 */
		function getCategoryList($module) 
		{
			return  db::Query('SELECT','def_category',[
				['', 'module', '=', ':args1', $module],
				['ORDER', 'list_order', 'asc']
			],'*', 'all');
		}
	
		/**
		 * get original album
		 *
		 * @param int $pgx
		 */
		function getCategorySubList($module) 
		{
			return db::Query('SELECT','def_category',[
				['', 'sub_srl', '=', ':args1', $module]
			],'*', 'all');
		}
	
	/* Album */
	
		/**
		 * get album files
		 *
		 * @param string $album
		 */
		function getAlbumFilesAll($album) 
		{
			return db::Query('SELECT','def_document_music',[
				['', 'album_sort_target', '=', ':args1', $album],
				['ORDER', 'album_sort_target', 'asc']
			],'srl', 'all');
		}
		
		/**
		 * get album files
		 *
		 * @param string $album
		 */
		function getOriginAlbumFilesAll($album) 
		{
			return db::Query('SELECT','def_document_music',[
				['', 'album_only', '=', ':args1', $album],
				['ORDER', 'album_only', 'asc']
			],'srl', 'all');
		}
	
		function getOriginAlbumFilesLIKEAll($album) 
		{
			return db::Query('SELECT','def_document_music',[
				['', 'album_only', 'LIKE', ':args1', "%$album%"],
				['ORDER', 'album_only', 'asc']
			],'srl', 'all');
		}
	
		function getOriginAlbumbysrl($srl) 
		{
			return db::Query('SELECT','def_origin',[
				['', 'srl', '=', ':args1', $srl]
			],'album', 'one');
		}
	
		/**
		 * get original album
		 *
		 * @param int $pgx
		 */
		function getAlbumbysrl($srl) 
		{
			return db::Query('SELECT','def_album',[
				['', 'srl', '=', ':args1', $srl]
			],'album', 'one');
		}
		
		/**
		 * get album count
		 */
		function getOriginAlbumCount() 
		{
			return db::Query('SELECT','def_origin',[],'count(*)', 'one');
		}
			
		/**
		 * get album count
		 */
		function getOriginAlbumCountbyAlbum($album) 
		{
			return db::Query('SELECT','def_origin',[
				['', 'album', '=', ':args1', $album]
			]
			,'count(*)', 'one');
		}
			
		/**
		 * get original album
		 *
		 * @param int $pgx
		 */
		function getOriginalAlbumSrlbyAlbum($album) 
		{
			return db::Query('SELECT','def_origin',[
				['', 'album', '=', ':args1', $album]
			],'srl', 'one');
		}
	
		/**
		 * get original album
		 *
		 * @param int $pgx
		 */
		function getOriginAlbum($pgx) 
		{
			return db::Query('!SELECT','def_origin',[
				['ORDER', 'album', 'asc'],
				['LIMIT', ':pgx', $pgx, ':pgy',20]
			],'*', 'all');
		}
	
		function getAlbumFiles($album) 
		{
			return db::Query('SELECT','def_document_music',[
				['', 'album_sort_target', '=', ':args1', $album],
				['LIMIT', '1']
			],'srl', 'one');
		}
	
		/**
		 * 앨범 개수를 가져온다
		 */
		function getAlbumCount() 
		{
			return db::Query('SELECT','def_album',[],'count(*)', 'one');
		}
		
		function getdef_albumumentlistBetween($module, $page_start, $page_end) 
		{
			return db::Query('SELECT','album_bd',[
				['AND', 'module', '=', ':module', $module],
				['AND', 'srl_bd', 'BETWEEN', ':args2', $page_start],
				['ORDER', 'srl_bd', 'asc', ':page_end', $page_end]
			],'*', 'all');
		}

	/* Module */
	
		/**
		 * 스킨값을 가져온다
		 *
		 * @param string $module
		 */
		function get_skin($module) 
		{
			return db::Query('SELECT','def_module',[
				['', 'module', '=', ':args1', $module]
			],'skin', 'one');
		}
		
		/**
		 * 스킨값을 가져온다
		 *
		 * @param string $module
		 */
		function getModuleLayoutbyBoard($module) 
		{
			return db::Query('SELECT','def_module',[
				['', 'bdname', '=', ':args1', $module]
			],'layout', 'one');
		}
		
		function getModuleConfig($module) 
		{
			return db::Query('SELECT','def_module_config',[
				['', 'module', '=', ':module', $module]
			],'config', 'one');
		}
		
	/* File */
	
		/**
		 * 배열에서 파일목록을 뽑아온다.
		 *
		 * @param array $array
		 */
		function getFileItemsArray($array) 
		{
			return db::Query('SELECT','def_file',[
				['', 'target', 'IN', '[]', $array]
			],'*', 'all');
		}
	
		function getFileListPopularCount($module, $down_count) 
		{
			return db::Query('SELECT','def_file',[
				['AND', 'module', '=', ':args1', $module],
				['AND', 'down', '>=', ':args2', $down_count],
				['', 'origin', 'LIKE', "'%.mp3'"],
				['ORDER', 'down', 'desc']
			],'count(*)', 'one');
		}
	
	/* Album */
	
		function getOriginAlbumFiles($album) 
		{
			$sth = $this->pdo->prepare("SELECT srl FROM def_document_music WHERE album_only = :album ORDER BY album_sort_target asc LIMIT 1");
			$sth->bindParam(':album', $album, PDO::PARAM_STR);
			$sth->execute();
			$std_count = $sth->fetch();
			return $std_count[0];
		}
		
		function getOriginAlbumLIKEFiles($album) 
		{
			$album = "%$album%";
			$sth = $this->pdo->prepare("SELECT srl FROM def_document_music WHERE album_only LIKE :album ORDER BY album_sort_target asc LIMIT 1");
			$sth->bindParam(':album', $album);
			$sth->execute();
			$std_count = $sth->fetch();
			return $std_count[0];
		}
		
		/**
		 * upload album
		 *
		 * @param int $pgx
		 */
		function getAlbum($pgx) 
		{
			return db::Query('!SELECT','def_album',[
				['LIMIT', ':pgx', $pgx, ':pgy', 20],
			],'*', 'all');
		}
		
	/* Vote */

		/**
		 * 비추천 값을 가져온다.
		 *
		 * @param int $get_serial
		 */
		function getBlamedCount($get_serial) 
		{
			return db::Query('SELECT','def_document_music',[
				['', 'srl', '=', ':srl', $get_serial]
			],'blamed', 'one');
		}
	
		/**
		 * 댓글 추천 값을 가져온다.
		 *
		 * @param int $get_serial
		 */
		function getDocumentStarCount($srl) 
		{
			return db::Query('SELECT','def_document_music',[
				['', 'srl', '=', ':args1', $srl]
			],'star', 'one');
		}
		
		/**
		 * 댓글 추천 값을 가져온다.
		 *
		 * @param int $get_serial
		 */
		function getDocumentStarVotedCount($srl) 
		{
			return db::Query('SELECT','def_document_music',[
				['', 'srl', '=', ':args1', $srl]
			],'star_cnt', 'one');
		}
		
		/**
		 * 댓글 추천 값을 가져온다.
		 *
		 * @param int $get_serial
		 */
		function getExtraVar($module) 
		{
			return db::Query('SELECT','def_extra',[
				['', 'module', '=', ':args1', $module]
			],'*', 'all');
		}
		
		/**
		 * 댓글 추천 값을 가져온다.
		 *
		 * @param int $get_serial
		 */
		function getExtraVarTypebyName($name, $type) 
		{
			return db::Query('SELECT','def_extra',[
				['', 'val', '=', ':args1', $name]
			],$type, 'one');
		}
		
		/**
		 * 댓글 추천 값을 가져온다.
		 *
		 * @param int $get_serial
		 */
		function getExtraVars($target_srl) 
		{
			return db::Query('SELECT','def_extravar',[
				['', 'target_srl', '=', ':args1', $target_srl]
			],'*', 'all');
		}
		
		/**
		 * 댓글 추천 업데이트
		 *
		 * @param int $voted_count
		 * @param int $comment_srl
		 */
		function UpdateDocumentStarCount($voted_count, $comment_srl) 
		{
			return db::Query('UPDATE','def_document_music',[
				['WHERE', 'star', '=', ':args1', $voted_count],
				['', 'srl', '=', ':args2', $comment_srl]
			],'', 'boolean');
		}
		
		/**
		 * 댓글 추천 업데이트
		 *
		 * @param int $voted_count
		 * @param int $comment_srl
		 */
		function UpdateDocumentStarVotedCount($voted_count, $comment_srl) 
		{
			return db::Query('UPDATE','def_document_music',[
				['WHERE', 'star_cnt', '=', ':args1', $voted_count],
				['', 'srl', '=', ':args2', $comment_srl]
			],'', 'boolean');
		}
		
		/**
		 * 추천 값을 가져온다.
		 *
		 * @param int $get_serial
		 */
		function getVotedCount($get_serial) 
		{
			return db::Query('SELECT','def_document_music',[
				['', 'srl', '=', ':srl', $get_serial]
			],'voted', 'one');
		}
	
		/**
		 * 추천 업데이트
		 *
		 * @param int $voted_count
		 * @param int $get_serial
		 */
		function UpdateVotedCount($voted_count, $get_serial) 
		{
			return db::Query('UPDATE','def_document_music',[
				['WHERE', 'voted', '=', ':args1', $voted_count],
				['', 'srl', '=', ':args2', $get_serial]
			],'', 'boolean');
		}
			
	/* Document Count */
	
		function getDocumentCountbyBoardbyAuthor($module, $author) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':args1', $module],
				['', 'artist', '=', ':args2', $author]
			],'count(*)', 'one');
		}
		
		function getDocumentCountbyBoardbyGenre($get_board, $genre) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':args1', $get_board],
				['', 'genre', '=', ':args2', $genre]
			],'count(*)', 'one');
		}
		
		/**
		 * 일정 태그값을 갖는 문서 개수를 가져온다.
		 *
		 * @param string $module
		 * @param string $tag
		 */
		function getDocumentCountbyBoardbyTag($module, $tag) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':args1', $module],
				['', 'tag', '=', ':tag', $tag]
			],'count(*)', 'one');
		}
	
		function getDocumentCountbyBoardbyCategory($module, $category) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':module', $module],
				['', 'category_srl', '=', ':category', $category]
			],'count(*)', 'one');
		}
	
		function getDocumentCountbyBoardbyCategoryAndArticle($module, $category, $keyword, $target) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':args1', $module],
				['AND', 'category_srl', '=', ':args2', $category],
				['', $target, 'LIKE', ':args3', "%$keyword%"]
			],'count(*)', 'one');
		}
	
		function getDocumenCountbyAuthor($module, $page_start, $page_end, $author) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':bd', $module],
				['', 'artist', 'LIKE', ':author', "%$author%"],
				['ORDER', 'srl_bd', 'desc']
			],'count(*)', 'one');
		}
			
		function getDocumenCountbyalborigin($module, $page_start, $author) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':bd', $module],
				['', 'album_only', 'LIKE', ':author', "%$author%"],
				['ORDER', 'srl_bd', 'desc']
			],'count(*)', 'one');
		}
		
		/**
		 * 특정 제목 오리지널을 갖는 문서 개수를 가져온다
		 *
		 * @param string $module
		 * @param string $title_origin
		 * @param   int  $page_start
		 */
		function getDocumenCountbytitorigin($module, $page_start, $title_only) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':module', $module],
				['', 'title_only', 'LIKE', ':author', "%$title_only%"],
				['ORDER', 'srl_bd', 'desc']
			],'count(*)', 'one');
		}
		
		/**
		 * 특정 제목을 갖는 문서 개수를 가져온다
		 *
		 * @param string $module
		 * @param string $title
		 * @param   int  $page_start
		 */
		function getDocumenCountbyColumn($module, $page_start, $title, $type) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':module', $module],
				['', $type, 'LIKE', ':title', "%$title%"],
				['ORDER', 'srl_bd', 'desc']
			],'count(*)', 'one');
		}
			
		/**
		 * 특정 제목을 갖는 문서 개수를 가져온다
		 *
		 * @param string $module
		 * @param string $title
		 * @param   int  $page_start
		 */
		function getDocumenCountbyTitle($module, $page_start, $title) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':module', $module],
				['', 'title', 'LIKE', ':title', "%$title%"],
				['ORDER', 'srl_bd', 'desc']
			],'count(*)', 'one');
		}
			
		/**
		 * 특정 태그값을 갖는 문서개수를 가져온다
		 *
		 * @param string $module
		 * @param string $tag
		 * @param   int  $page_start
		 */
		function getDocumenCountbyTag($module, $page_start, $page_end, $tag) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':args1', $module],
				['', 'tag', 'LIKE', ':args2', "%$tag%"],
				['ORDER', 'srl_bd', 'desc']
			],'count(*)', 'one');
		}
		
		/**
		 * 특정 모듈값을 갖는 문서 개수를 가져온다
		 *
		 * @param string $module
		 */
		function getDocumentCountbyBoard($module) 
		{
			if (!isset($_SESSION['__DOCUMENT__COUNT__QUERY__'.$module])) 
			{
				$_SESSION['__DOCUMENT__COUNT__QUERY__'.$module] = db::Query('SELECT','def_document_music',[
					['', 'module', '=', ':args1', $module]
				],'count(*)', 'one');
			}
			
			return $_SESSION['__DOCUMENT__COUNT__QUERY__'.$module];
		}
		
	/* Document List */
	
		/**
		 * 일정 카테고리값을 갖는 문서를 가져온다.
		 *
		 * @param string $module
		 * @param string $tag
		 */
		function getDocumentlistBetweenCategory($module, $page_start, $page_end, $tag) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':args1', $module],
				['', 'tag', '=', ':args2', $tag],
				['ORDER', 'srl_bd', 'desc'],
				['LIMIT', ':pgx', $page_start, ':pgy', 20],
			],'*', 'all');
		}
	
		function getDocumentlistBetweenAuthor($module, $page_start, $page_end, $tag) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':args1', $get_board],
				['', 'artist', 'LIKE', ':args2', "%$tag%"],
				['ORDER', 'srl_bd', 'desc'],
				['LIMIT', ':pgx', $page_start],
			],'*', 'all');
		}
	
		function getDocumentlistTagRelatedSrlCount($module, $tag) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':args1', $module],
				['', 'tag', 'LIKE', ':args2', "%$tag%"],
				['ORDER', 'srl_bd', 'desc']
			],'count(*)', 'one');
		}
		
		function getDocumentlistTagRelatedSrl($module, $tag) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':args1', $module],
				['', 'tag', 'LIKE', ':args2', "%$tag%"],
				['ORDER', 'srl_bd', 'desc']
			],'srl', 'all');
		}
		
		/**
		 * 태그 연관글 문서 리스트를 가져온다.
		 *
		 * @param str $get_board
		 * @param int $page_start
		 * @param int $page_end
		 * @param str $tag
		 */
		function getDocumentlistTagRelated($get_board, $page_start, $page_end, $tag) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':args1', $get_board],
				['', 'tag', 'LIKE', ':args2', "%$tag%"],
				['ORDER', 'srl_bd', 'desc'],
				['LIMIT', ':pgx', $page_start ? $page_start : 0, ':pgy', 5],
			],'*', 'all');
		}
	
		/**
		 * 임의의 문서를 가져온다.
		 *
		 * @param str $get_board
		 * @param int $page_start
		 */
		function getRandomDocumentList($get_board, $page_start) 
		{
			$sth = $this->pdo->prepare("SELECT * FROM def_document_music WHERE module = :bd ORDER BY srl_bd desc LIMIT :pgx, 1");
			$sth->bindParam(':bd', $get_board, PDO::PARAM_STR);
			$sth->bindParam(':pgx', $page_start, PDO::PARAM_INT);
			$sth->execute();
			return $sth->fetchAll();
		}
	
		/**
		 * 임의의 문서를 가져온다.
		 *
		 * @param str $get_board
		 * @param int $page_start
		 */
		function getRandomDocumentListbySrl($array, $get_board, $page_start) 
		{
			return db::Query('SELECT','def_document_music',[
				['', 'srl', 'IN', '[]', $array]
			],'*', 'all');
		}
	
		/* LIKE */
		
		/**
		 * Author 태그(LIKE) 값을 갖는 문서 목록을 가져온다
		 *
		 * @param string $module
		 * @param string $tag
		 * @param   int  $page_start
		 */
		function getDocumentlistBetweenAuthorLIKE($module, $page_start, $author) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':args1', $module],
				['', 'artist', 'LIKE', ':args2', "%$author%"],
				['ORDER', 'srl_bd', 'desc'],
				['LIMIT', ':pgx', $page_start, ':pgy', 20],
			],'*', 'all');
		}
			
		/**
		 * 앨범 태그(LIKE) 값을 갖는 문서 목록을 가져온다
		 *
		 * @param string $module
		 * @param string $tag
		 * @param   int  $page_start
		 */
		function getDocumentlistBetweenAlbOriginLIKE($module, $page_start, $author) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':args1', $module],
				['', 'album_only', 'LIKE', ':args2', "%$author%"],
				['ORDER', 'srl_bd', 'desc'],
				['LIMIT', ':pgx', $page_start, ':pgy', 20],
			],'*', 'all');
		}
		
		/**
		 * 제목 오리지널(LIKE) 값을 갖는 문서 목록을 가져온다
		 *
		 * @param string $module
		 * @param string $tag
		 * @param   int  $page_start
		 */
		function getDocumentlistBetweenTitOriginLIKE($module, $page_start, $author) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':args1', $module],
				['', 'title_only', 'LIKE', ':args2', "%$author%"],
				['ORDER', 'srl_bd', 'desc'],
				['LIMIT', ':pgx', $page_start, ':pgy', 20],
			],'*', 'all');
		}
		
		/**
		 * 태그(LIKE) 값을 갖는 문서 목록을 가져온다
		 *
		 * @param string $module
		 * @param string $tag
		 * @param   int  $page_start
		 */
		function getDocumentlistBetweenTagLIKE($module, $page_start, $tag) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':args1', $module],
				['', 'tag', 'LIKE', ':args2', "%$tag%"],
				['ORDER', 'srl_bd', 'desc']
			],'*', 'all');
		}

		/* * */
		
		function getDocumentlistBetweenbyCategory($get_board, $page_start, $page_end, $get_category) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':args1', $get_board],
				['', 'category_srl', '=', ':args2', $get_category],
				['ORDER', 'srl_bd', 'desc'],
				['LIMIT', ':pgx', $page_start, ':pgy', $page_end],
			],'*', 'all');
		}

		function getDocumentlistBetweenbyCategoryAndArticle($get_board, $page_start, $page_end, $get_category, $keyword, $target) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':args1', $get_board],
				['AND', 'category_srl', '=', ':args2', $get_category],
				['', $target, 'LIKE', ':args3', "%$keyword%"],
				['ORDER', 'srl_bd', 'desc'],
				['LIMIT', ':pgx', $page_start, ':pgy', $page_end],
			],'*', 'all');
		}

		/**
		 * 태그 리스트를 가져온다.
		 */
		function getTagList() 
		{
			return db::Query('SELECT','def_tag',[
			],'*', 'all');
		}
		
		/**
		 * 특정 문서번호값을 갖는 문서를 가져온다.
		 *
		 * @param int $srl
		 */
		function getDocumentItems($srl) 
		{
			return db::Query('SELECT','def_document_music',[
				['', 'srl', '=', ':srl', $srl]
			],'*', 'self');
		}
		
		
		/**
		 * 인기글을 가져온다.
		 *
		 * @param str $module
		 * @param int $down_count
		 * @param int $page_start
		 * @param int $list_count
		 */
		function getPopularQueryByJoin($module, $down_count, $page_start, $list_count) 
		{
			$sth = $this->pdo->prepare("SELECT def_document_music.*, 
				(SELECT count(b.srl) FROM def_file b WHERE b.target = def_document_music.file_sequence) as `file_count`,
				(SELECT count(c.comment_srl) FROM def_comment c WHERE c.document_srl = def_document_music.srl_bd) as `comment_count`, 
				(SELECT name FROM def_category d WHERE d.category_srl = def_document_music.category_srl) as `category_caption` 
				FROM def_document_music JOIN def_file ON def_document_music.file_sequence = def_file.target WHERE down >= :down AND def_document_music.module = :module AND origin LIKE '%.mp3' ORDER by down desc LIMIT :px, :pgy");
			$sth->bindParam(':module', $module,PDO::PARAM_INT);
			$sth->bindParam(':px', $page_start,PDO::PARAM_INT);
			$sth->bindParam(':down', $down_count,PDO::PARAM_INT);
			$sth->bindParam(':pgy', $list_count,PDO::PARAM_INT);
			$sth->execute();
			return $sth->fetchAll();
		}
		/**
		 * 인기글을 가져온다.
		 *
		 * @param str $module
		 * @param int $down_count
		 * @param int $page_start
		 * @param int $list_count
		 */
		function getPopularQuery($module, $down_count, $page_start, $list_count) 
		{
			$sth = $this->pdo->prepare("SELECT * FROM def_document_music AS BD, (SELECT target AS FD FROM def_file WHERE down >= :down AND module = :module AND origin LIKE '%.mp3' ORDER by down desc LIMIT :px, :pgy) AS temp WHERE BD.srl = FD");
			$sth->bindParam(':module', $module,PDO::PARAM_INT);
			$sth->bindParam(':px', $page_start,PDO::PARAM_INT);
			$sth->bindParam(':down', $down_count,PDO::PARAM_INT);
			$sth->bindParam(':pgy', $list_count,PDO::PARAM_INT);
			$sth->execute();
			return $sth->fetchAll();
		}
	
		/**
		 * get document list between title
		 *
		 * @param string $module
		 * @param string $title
		 * @param   int  $page_start
		 */
		function getAllDocumentListbyColumn($page_start, $title, $type) 
		{
			return db::Query('SELECT','def_document_music',[
				['', $type, 'LIKE', ':args1', "%$title%"],
				['ORDER', 'srl_bd', 'desc'],
				['LIMIT', ':pgx', $page_start, ':pgy', 20],
			],'*', 'all');
		}
		
		/**
		 * get document list between title
		 *
		 * @param string $module
		 * @param string $title
		 * @param   int  $page_start
		 */
		function getAllDocumentListbyColumnCount($title, $type) 
		{
			return db::Query('SELECT','def_document_music',[
				['', $type, 'LIKE', ':args1', "%$title%"]
			],'count(*)', 'one');
		}
		
		/**
		 * Get Document List between title
		 *
		 * @param string $module
		 * @param string $title
		 * @param   int  $page_start
		 */
		function getDocumentListbyColumn($module, $page_start, $title, $type) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':args1', $module],
				['', $type, 'LIKE', ':args2', "%$title%"],
				['ORDER', 'srl_bd', 'desc'],
				['LIMIT', ':pgx', $page_start, ':pgy', 20],
			],'*', 'all');
		}
		
		/**
		 * get document list between title
		 *
		 * @param string $module
		 * @param string $title
		 * @param   int  $page_start
		 */
		function getDocumentlistBetweenbyTitle($module, $page_start, $title) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':args1', $module],
				['', 'title', 'LIKE', ':args2', "%$title%"],
				['ORDER', 'srl_bd', 'desc'],
				['LIMIT', ':pgx', $page_start, ':pgy', 20],
			],'*', 'all');
		}
		
		function UpdateReadedCount($readed_count, $get_serial) {
			if (!isset($_SESSION['readed_document'][$get_serial.$_SERVER['REMOTE_ADDR']])) 
			{
				$_SESSION['readed_document'][$get_serial.$_SERVER['REMOTE_ADDR']] = TRUE;
				db::Query('UPDATE','def_document_music',
				[
					['WHERE', 'readed', '=', ':args1', $readed_count],
					['', 'srl', '=', ':args2', $get_serial]
				],'', 'boolean');
			}
		}
	
		/**
		 * 문서 목록을 가져온다(정렬)
		 *
		 * @param string $module
		 * @param   str  $get_board
		 * @param   int  $page_start
		 * @param   int  $list_count
		 * @param   str  $article
		 */
		function getDocumentListbyArticle($get_board, $page_start, $list_count, $article) 
		{
			return db::Query('SELECT','def_document_music',[
				['', 'module', '=', ':args1', $get_board],
				['ORDER', $article, 'desc'],
				['LIMIT', ':pgx', $page_start, ':pgy', $list_count],
			],'*', 'all');
		}

		function getDocumentlistBetweenGenre($get_board, $page_start, $list_count, $genre) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':args1', $get_board],
				['', 'genre', '=', ':args2', $genre],
				['ORDER', 'srl_bd', 'desc'],
				['LIMIT', ':pgx', $page_start, ':pgy', $list_count],
			],'*', 'all');
		}
	
		/**
		 * 문서 목록을 가져온다(BETWEEN)
		 *
		 * @param string $module
		 * @param   int  $page_start
		 * @param   int  $page_end
		 */
		function getDocumentList($module, $page_start, $page_end) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':args1', $module],
				['AND', 'srl', '>', ':args2', ($page_start-1)],
				['AND', 'srl_bd', 'BETWEEN', ':args3', ($page_start)],
				['ORDER', 'srl_bd', 'asc', ':page_end', $page_end]
			],'def_document_music.*, (SELECT count(c.comment_srl) FROM def_comment c WHERE c.document_srl = def_document_music.srl_bd) as `comment_count`, (SELECT count(b.srl) FROM def_file b WHERE b.target = def_document_music.file_sequence) as `file_count`', 'all');
		}
		
		function getDocumentlistJOIN2($module, $page_start, $board_count) 
		{
			$sth = $this->pdo->prepare("SELECT t.*, (SELECT count(c.comment_srl) FROM def_comment c WHERE c.document_srl = t.srl_bd) as `comment_count`, (SELECT count(b.srl) FROM def_file b WHERE b.target = t.file_sequence) as `file_count` FROM (SELECT srl FROM def_document_music WHERE module = :module ORDER BY srl LIMIT :page_start, :page_end) q JOIN def_document_music t ON t.srl = q.srl");
			$sth->bindParam(':module', $module, PDO::PARAM_STR);
			$sth->bindParam(':page_start', $page_start, PDO::PARAM_INT);
			$sth->bindParam(':page_end', $board_count, PDO::PARAM_INT);
			$sth->execute();
			return $sth->fetchAll();
		}
		
		function getDocumentlistJOIN($module, $page_start, $board_count) 
		{
			$sth = $this->pdo->prepare("SELECT def_document_music.*, (SELECT count(c.comment_srl) FROM def_comment c WHERE c.document_srl = def_document_music.srl_bd) as `comment_count`, (SELECT count(b.srl) FROM def_file b WHERE b.target = def_document_music.file_sequence) as `file_count` FROM def_document_music JOIN (SELECT srl FROM def_document_music WHERE module = :module ORDER BY srl LIMIT :page_start, :page_end) AS t ON t.srl = def_document_music.srl; ");
			$sth->bindParam(':module', $module, PDO::PARAM_STR);
			$sth->bindParam(':page_start', $page_start, PDO::PARAM_INT);
			$sth->bindParam(':page_end', $board_count, PDO::PARAM_INT);
			$sth->execute();
			return $sth->fetchAll();
		}
		
		/**
		 * 문서 목록을 가져온다(LIMIT)
		 *
		 * @param string $module
		 * @param   int  $page_start
		 * @param   int  $page_end
		 */
		function getDocumentListLIMIT($module, $page_start, $board_count) 
		{
			return array_reverse(db::Query('SELECT','def_document_music',[
				['', 'module', '=', ':args1', $module],
				['ORDER', 'srl_bd', 'asc'],
				['LIMIT', ':pgx', $page_start ? $page_start : 0, ':pgy', $board_count],
			],'
				def_document_music.*, 
				(SELECT count(b.srl) FROM def_file b WHERE b.target = def_document_music.file_sequence) as `file_count`,
				(SELECT count(c.comment_srl) FROM def_comment c WHERE c.document_srl = def_document_music.srl_bd) as `comment_count`, 
				(SELECT name FROM def_category d WHERE d.category_srl = def_document_music.category_srl) as `category_caption`
			', 'all'));
		}
		
		/**
		 * 문서의 아티스트를 업데이트한다.
		 *
		 * @param string $artist
		 * @param string $get_board
		 * @param int $get_serial
		 */
		function UpdateArtist($get_serial, $get_board, $artist) 
		{
			return db::Query('UPDATE','def_document_music',[
				['WHERE', 'artist', '=', ':args1', $artist],
				['AND', 'module', '=', ':args2', $get_board],
				['', 'srl', '=', ':args3', $get_serial]
			],'', 'boolean');
		}
		
		/**
		 * 문서의 아티스트를 업데이트한다.
		 *
		 * @param string $artist
		 * @param string $get_board
		 * @param int $get_serial
		 */
		function UpdatePlayTime($get_serial, $get_board, $artist) 
		{
			return db::Query('UPDATE','def_document_music',[
				['WHERE', 'playtime', '=', ':args1', $artist],
				['AND', 'module', '=', ':args2', $get_board],
				['', 'srl', '=', ':args3', $get_serial]
			],'', 'boolean');
		}
		
		/**
		 * upload document artist
		 *
		 * @param string $artist
		 * @param string $get_board
		 * @param int $get_serial
		 */
		function UpdateGenreOnly($get_serial, $get_board, $album) 
		{
			return db::Query('UPDATE','def_document_music',[
				['WHERE', 'srl', '=', ':args1', $get_serial],
				['AND', 'module', '=', ':args2', $get_board],
				['', 'genre_only', '=', ':args3', $album]
			],'', 'boolean');
		}
	
		/**
		 * upload document artist
		 *
		 * @param string $artist
		 * @param string $get_board
		 * @param int $get_serial
		 */
		function UpdateGenre($get_serial, $get_board, $album) 
		{
			return db::Query('UPDATE','def_document_music',[
				['WHERE', 'genre', '=', ':args1', $album],
				['AND', 'module', '=', ':args2', $get_board],
				['', 'srl', '=', ':args3', $get_serial]
			],'', 'boolean');
		}
	
	}
	
?>