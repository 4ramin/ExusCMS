<?php

class board_model extends board 
{
	
	protected $pdo;
	private static $mConfig;
	
	function __construct() 
	{
		$this->board = new stdClass;
		$this->base = new base();
		$this->pdo = $this->base->getPDO();
		$this->board->query = new board_query();
		
		//GET 메소드에서만 설정값을 불러옴
		if ($this->base->getReq() == "GET") {
			$this->board->module_id = $this->base->get_params(__MODULEID, 'string');
			
			if (isset($_SESSION['__BOARD_CONFIG__'.$this->board->module_id])) 
			{
				$this->board->config = $_SESSION['__BOARD_CONFIG__'.$this->board->module_id];
			}
			else
			{
				$this->board->config = json_decode($this->board->query->getModuleConfig($this->board->module_id));
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
		$type = $this->board->query->getExtraVarTypebyName($val['name'], 'type');
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
		if (file_exists($fp)) 
		{
			if (filesize($fp) < 1) 
			{
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
						'img' => sprintf("%s?%s", $thumbnail, substr(md5(date("YmdHis", (filemtime(__DIR.$thumbnail)))),0,7))
					);
				} 
				else if ($value['thumbmd5'] === $this->tmp_md5) 
				{
					if ($this->img_index === 1) 
					{
						$this->tmp_md5 = $value['thumbmd5'];
						$thumbArray = array(
							'index' => $this->img_index,
							'img' => sprintf("%s?%s", $thumbnail, substr(md5(date("YmdHis", (filemtime(__DIR.$thumbnail)))),0,7))
						);
					} 
					else 
					{
						$thumbArray = array('index'=>$this->img_index);
					}
				}
				
				if ($value['thumbmd5'] === null) 
				{
					$image = sprintf("%s%s%d/%dx%d.jpg", __DIR, __THUMB__ATTACH, $srl, $this->board->config->thumbnail_width, $this->board->config->thumbnail_height);
					
					if (file_exists($image)) 
					{
						$this->board->query->UpdateThumbMd5($value['srl'], $value['module'], md5(file_get_contents($image)));
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
			if ($this->board->query->getOriginAlbumCountbyAlbum($mediaInfo['album_only']) == 0) 
			{
				$this->board->query->insertOriginAlbum($mediaInfo['album_only']);
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
			
			$this->board->query->UpdateTitleOnly($mediaInfo['srl'], $mediaInfo['module'], $id3_title);
			$mediaInfo['title_only'] = $id3_title;
			
			$id3_album = $id3Info['comments']['album'][0];
			if (!$id3_album) 
			{
				$id3_album = 'None';
			}
			
			$this->board->query->UpdateAlbumOnly($mediaInfo['srl'], $mediaInfo['module'], $id3_album);
			$mediaInfo['album_only'] = $id3_album;
		}
		
		if ($mediaInfo['bitrate'] == null) 
		{
			$bitrate = $id3Info['bitrate'];
			if (!$bitrate)
			{
				$bitrate = "Unknown";
			}
			
			$this->board->query->UpdateBitrate($mediaInfo['srl'], $bitrate);
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
				
				$this->board->query->UpdatePlayTime($mediaInfo['srl'], $mediaInfo['module'], $artist);
		   }
		}
		
		if ($mediaInfo['artist'] == null  || $mediaInfo['artist'] == 'None') 
		{
			$artist = $id3Info['comments']['artist'][0];
			if (!$artist) 
			{
				$artist = 'None';
			}
			
			$this->board->query->UpdateArtist($mediaInfo['srl'], $mediaInfo['module'], $artist);
		} 
		else 
		{
			$oAuthorCnt = $this->board->query->getAuthorCount($mediaInfo['artist']);
			if ($oAuthorCnt == 0) 
			{
				$this->board->query->insertAuthor($mediaInfo['artist']);
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
	
	function getLysics($md5) 
	{
		$string = '<?xml version="1.0" encoding="UTF-8"?><SOAP-ENV:Envelope xmlns:SOAP-ENV="http://www.w3.org/2003/05/soap-envelope" xmlns:SOAP-ENC="http://www.w3.org/2003/05/soap-encoding" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:ns2="ALSongWebServer/Service1Soap" xmlns:ns1="ALSongWebServer" xmlns:ns3="ALSongWebServer/Service1Soap12"><SOAP-ENV:Body><ns1:GetLyric5><ns1:stQuery><ns1:strChecksum>'.$md5.'</ns1:strChecksum><ns1:strVersion>2.0 beta2</ns1:strVersion><ns1:strMACAddress>ffffffffffff</ns1:strMACAddress><ns1:strIPAddress>255.255.255.0</ns1:strIPAddress></ns1:stQuery></ns1:GetLyric5></SOAP-ENV:Body></SOAP-ENV:Envelope>';
		
		$client = new HttpClient('lyrics.alsong.co.kr');
		$client->post('/alsongwebservice/service1.asmx', $string);
		return $client->getContent();
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
		$category_list = $this->board->query->getCategoryListAndCount($module);
		
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
	
}

?>