<?php

	if (!defined("__FLOWER__")) exit();

	class board_item extends BaseObject
	{
		
		function __construct($args = array(), $query = array()) 
		{
			$this->query = $query;
			$this->base = new base();
			$this->board = $args->board;
			$this->documentSrl = $this->query['srl'];
			$this->fileSequence = $this->query['file_sequence'];
			$oBoardModel = $this->base->getModel('music');
		}
		
		function __registry($args, $query) 
		{
			$this->query = $query;
			$this->base = new base();
			$this->board = $args->board;
			$this->documentSrl = $this->query['srl'];
		}
		
		function getSrl() 
		{
			$srl = (int)$this->documentSrl;
			
			if ($srl) 
			{
				return $srl;
			} 
			else 
			{
				return 0;
			}
		}
		
		function isTagExists() 
		{
			$tag = $this->query['tag'];
			
			if ($tag) 
			{
				return TRUE;
			} 
			else 
			{
				return FALSE;
			}
		}
		
		function getStarRateCount() 
		{
			$star_rate = $this->board->star_rate;
			
			if (isset($star_rate)) 
			{
				return $star_rate;
			} 
			else 
			{
				return 0;
			}
		}
		
		function isStarRateCountExists() 
		{
			$star_rate = $this->board->star_rate;
			
			if (isset($star_rate)) 
			{
				return true;
			} 
			else 
			{
				return false;
			}
		}
		
		function getTag() 
		{
			$tag = $this->query['tag'];
			
			if ($tag) 
			{
				return $tag;
			} 
			else 
			{
				return NULL;
			}
		}
		
		function getSNSLink() 
		{
			return str::getUrl(__MODULEID, $_GET[__MODULEID], 'page', $_GET['page'], 'srl', $this->board->oDocument->query['srl'], 'category', $_GET['category'], 'tag', $_GET['tag'], 'mode', $_GET['mode']);
		}
		
		function getTagLink() 
		{
			return str::getUrl('', __MODULEID, $_GET[__MODULEID], __ACTION, 'dispBoardTagList', 'page', 1, 'tag', $this->query['tag'], 'page' ,1);
		}
		
		function getModifyLink():string
		{
			return str::getUrl('', __MODULEID, $_GET[__MODULEID], 'act', 'dispBoardModify', 'srl',  $this->documentSrl);
		}
		
		function getArtistLink():string
		{
			return str::getUrl(__MODULEID, $_GET[__MODULEID], __ACTION, 'search', 'type', 'artist', 'keyword', $this->query['artist'], 'page', '');
		}
		
		function getIPAddress() 
		{
			return request::get_ip();
		}
		
		function getDocumentLink():string
		{
			return str::getUrl(__MODULEID, $_GET[__MODULEID], 'page', $_GET['page'], 'srl',  $this->documentSrl, 'category', $_GET['category'], 'tag', $_GET['tag'], 'mode', $_GET['mode']);
		}
		
		function getLink():string
		{
			return str::getUrl(__MODULEID, $_GET[__MODULEID], 'srl', $this->documentSrl);
		}
		
		function getFormatRegdate():string
		{
			return date("Y.m.d H:i:s", strtotime($this->query['regdate']));
		}
		
		function isImageExists():bool
		{
			$this->getFileList($this->fileSequence);
			
			foreach ($this->file_list as $key=>$fileInfo) 
			{
				if (preg_match('/\.(jpe?g|jpg|png)(?:[\?\#].*)?$/i', $fileInfo['files'], $matches)) 
				{
					return true;
				}
			}
			
			return false;
		}
		
		function getCommentCount() 
		{
			return $this->query['comment_count'];
			
			/*
			$oCommentModel = $this->base->getModel('comment');
			$commentCount = $oCommentModel->getCommentCount($this->board->module_id,$this->documentSrl);
			return $commentCount ? $commentCount : 0;*/
		}
		
		function isUploadedFileExists() 
		{
			if ($this->query['file_count'] > 0) 
			{
				return true;
			}
			
			return false;
			
			/*if ($this->documentSrl) 
			{
				$this->file_list = $this->getFileList($this->documentSrl);
			}
			
			if (is_array($this->file_list) && count($this->file_list) > 0) 
			{
				return true;
			}
			
			return false;*/
		}
		
		function getImageDownloadLink() 
		{
			if (!$this->isUploadedFileExists()) 
			{
				return '';
			}
			
			$this->file_list = $this->getFileList($this->fileSequence);
			
			foreach ($this->file_list as $key=>$fileInfo) 
			{
				if (maya::execute('@\||/@+.+!jpg||png!', $fileInfo['files'],'boolean')) 
				{
					return str::getUrl('', __MODULEID, 'files', 'act', 'FileDownload', 'download', $this->fileSequence, 'target', $fileInfo['files'], 'key', $fileInfo['keyres']);
				}
			}
		}
		
		function isAudioExists() 
		{
			if (!$this->isUploadedFileExists()) 
			{
				return '';
			}
			
			$this->file_list = $this->getFileList($this->fileSequence);
			
			foreach ($this->file_list as $key=>$fileInfo) 
			{
				if (maya::execute('@\||/@+.+!mp3||wav!', $fileInfo['files'],'boolean')) 
				{
					$this->board->model->chkId3Tags($this->query, $fileInfo['files'], $fileSequence);
					return true;
				}
			}
			
			return false;
		}
		
		function getAudioFilename() 
		{
			if (!$this->isUploadedFileExists()) 
			{
				return '';
			}
			
			$this->file_list = $this->getFileList($this->fileSequence);
			
			foreach ($this->file_list as $key=>$fileInfo) 
			{
				if (maya::execute('@\||/@+.+!mp3||wav!', $fileInfo['files'], 'boolean')) 
				{
					return $fileInfo['origin'];
				}
			}
		}
		
		function getAudioListenLink() 
		{
			if (!$this->isUploadedFileExists()) 
			{
				return '';
			}
			
			$this->file_list = $this->getFileList($this->fileSequence);
			
			foreach ($this->file_list as $key=>$fileInfo) 
			{
				if (maya::execute('@\||/@+.+!mp3||wav!', $fileInfo['files'],'boolean')) 
				{
					return sprintf("%s%s%s/%s", __SUB, __FILE__ATTACH, $fileInfo['target'], $fileInfo['files']);
				}
			}
		}
		
		function getAudioDownloadLink() 
		{
			if (!$this->isUploadedFileExists()) 
			{
				return '';
			}
			
			$this->file_list = $this->getFileList($this->fileSequence);
			
			foreach ($this->file_list as $key=>$fileList) 
			{
				if (maya::execute('@\||/@+.+!mp3||wav!', $fileList['files'],'boolean')) 
				{
					return str::getUrl('', __MODULEID, 'files', 'act', 'FileDownload', 'download', $this->fileSequence, 'target', $fileList['files'], 'key', $fileList['keyres']);
				}
			}
		}
		
		function getAudioLink() 
		{
			if (!$this->isUploadedFileExists()) 
			{
				return '';
			}
			
			$this->file_list = $this->getFileList($this->fileSequence);
			
			foreach ($this->file_list as $key=>$fileList) 
			{
				if (maya::execute('@\||/@+.+!mp3||wav!', $fileList['files'],'boolean')) 
				{
					if ($fileList['keyres'] == NULL) 
					{
						$this->board->model->UpdateFileKey($this->fileSequence);
					}
					
					$link = sprintf("%s%s%d/%s", __SUB, __FILE__ATTACH, $this->fileSequence, $fileList['files']);
					if (file_exists($link)) 
					{
						return $link;
					} 
					else 
					{
						return "";
					}
				}
			}
		}
		
		function setContent($content) 
		{
			$this->query['content'] = $content;
		}
		
		function getContent():string
		{
			$content = $this->query['content'];
			if ($content) 
			{
				return $content;
			} 
			else 
			{
				return "";
			}
		}
		
		function get($args):stdclass
		{
			return $this->query[$args];
		}
		
		function getArtist($cut):string
		{
			$artist = $this->base->htmlsc($this->query['artist']);
			
			if ($cut) 
			{
				return $this->base->cut_str($artist, $cut);
			} 
			else 
			{
				return $artist;
			}
		}
		
		function getAlbumTitle($cut):string
		{
			$albumTitle = $this->base->htmlsc($this->query['title_only']);
			
			if ($cut) 
			{
				return $this->base->cut_str($albumTitle, $cut);
			} 
			else 
			{
				return $albumTitle;
			}
		}
		
		function isCurrent():bool
		{
			if (isset($this->board->document['srl']) && $this->board->document['srl'] == $document->query['srl']) 
			{
				return true;
			}
			else 
			{
				return false;
			}
		}
		
		function setOriginTitle($title) 
		{
			$this->query['title_only'] = $title;
		}
		
		function setTitle($title) 
		{
			$this->query['title'] = $title;
		}
		
		function getTitle($cut = null):string
		{
			$title = $this->base->htmlsc($this->query['title']);
			
			if ($cut) 
			{
				return $this->base->cut_str($title, $cut);
			} 
			else 
			{
				return $title;
			}
		}
		
		function getThumbnail() 
		{
			$fp = sprintf("./%s%s/%sx%s.jpg",  __THUMB__ATTACH, $this->fileSequence, $this->board->config->thumbnail_width, $this->board->config->thumbnail_height);
			return $fp;
		}
		
		function makeAlbumThumbnail():string
		{
			if (!$this->isUploadedFileExists()) 
			{
				return '';
			}
			
			$oFileAlbum = $this->board->model->getOriginAlbumFiles($this->query['album']);
			$oThumbAlbum = $this->getFileList($oFileAlbum);
			
			foreach ($oThumbAlbum as $fileInfo) 
			{
				if (preg_match('/\.(jpe?g|jpg|png)(?:[\?\#].*)?$/i', $fileInfo['files'], $matches)) 
				{
					return $this->base->makeThumbnail($fileInfo['files'], $fileInfo['target'], $this->board->config->thumbnail_width, $this->board->config->thumbnail_height);
				}
			}
		}
		
		function makeThumbnail($thumbnailWidth = null, $thumbnailHeight = null) 
		{
			if (!$this->isUploadedFileExists()) 
			{
				return false;
			}
			
			if ($this->board->config) 
			{
				if (!$thumbnailWidth) 
				{
					$thumbnailWidth = (int)$this->board->config->thumbnail_width;
				}
				
				if (!$thumbnailHeight) 
				{
					$thumbnailHeight = (int)$this->board->config->thumbnail_height;
				}
			}
			
			$this->file_list = $this->getFileList($this->fileSequence);
			
			foreach ($this->file_list as $fileList) 
			{
				if (preg_match('/\.(jpe?g|jpg|png)(?:[\?\#].*)?$/i', $fileList['files'], $matches)) 
				{
					return $this->base->makeThumbnail($fileList['files'], $this->fileSequence, $thumbnailWidth, $thumbnailHeight);
				}
			}
		}
		
		function getExtraImages():string
		{
			$type = array();
			
			if (!$this->isUploadedFileExists())
			{
				return '';
			}				
			
			if ($this->isThumbnailExists()) 
			{
				$type[] = 'image';
			}
			
			if ($this->isUploadedFileExists()) 
			{
				$type[] = 'file';
			}
			
			if ($this->isAudioExists()) 
			{
				$type[] = 'audio';
			}
			
			$buff = array();
			if (is_array($type)) 
			{
				foreach ($type as $extraImage) 
				{
					$buff[] = sprintf('<img src="%s%s.gif" style="margin-right:2px;" />', 'module/base/board/music/img/', $extraImage);
				}
			}
			
			return implode('', $buff);
		}
		
		function isViewingDocument():bool
		{
			if (isset($this->board->document['srl']) && $this->board->document['srl'] == $document->query['srl']) 
			{
				return true;
			}
			
			return false;
		}
		
		function isThumbnailExists() 
		{
			$isThumbnailExists = $this->board->model->isThumbnailExist($this->fileSequence);
			
			if (!$isThumbnailExists) 
			{
				return $this->makeThumbnail();
			} 
			else 
			{
				return true;
			}
	
			return $isThumbnailExists;
		}
		
		function getCategoryName() 
		{
			$categoryCaption = $this->query['category_caption'];
			if ($categoryCaption) 
			{
				return $categoryCaption;
			} 
			
			return "";
		}
		
		function getCategory():string
		{
			if ($this->isCategoryExists()) 
			{
				return $this->query['category_srl'];
			} 
			else 
			{
				return NULL;
			}
		}
		
		function isCategoryExists():bool
		{
			if ($this->query['category_srl']) 
			{
				return true;
			}
			
			return false;
		}
		
		function getRegdate():string
		{
			return $this->query['regdate'];
		}
		
		function getReadedCount():int
		{
			return (int)$this->query['readed'];
		}
		
		function getVotedCount():int
		{
			return $this->query['voted'] ? (int)$this->query['voted'] : 0;
		}
		
		function getBlamedCount():int
		{
			return $this->query['blamed'] ? (int)$this->query['blamed'] : 0;
		}
		
		function getPlayTime() 
		{
			return $this->query['playtime'] ? date('i:s',$this->query['playtime']) : 0;
		}
		
		function getGenre() 
		{
			if ($this->query['genre']==1) 
			{
				return '팝';
			} 
			else if ($this->query['genre']==2) 
			{
				return '댄스';
			} 
			else if ($this->query['genre']==3) 
			{
				return '발라드';
			} else if ($this->query['genre']==4) {
				return '클래식';
			} else if ($this->query['genre']==5) {
				return '재즈';
			} else if ($this->query['genre']==6) {
				return '일렉';
			} else if ($this->query['genre']==7) {
				return '락';
			} else if ($this->query['genre']==8) {
				return '헤비메탈';
			} else if ($this->query['genre']==9) {
				return '보사노바';
			}
		}
		
		function getFileList() 
		{
			if (!$this->isUploadedFileExists()) 
			{
				return array();
			}
			
			if ($this->fileSequence) 
			{
				$oFilesModel = $this->base->getModel('files');
				$this->file_list = $oFilesModel->getFileList($this->fileSequence);
			}
			
			return $this->file_list;
		}
		
		function getIndexImage() 
		{
			return $this->ret_str;
		}

		function subordinat($args) 
		{
			$this->args = $args;
			return $this;
		}
		
	}
	
?>