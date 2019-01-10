<?php

	class files_model extends files 
	{
		
		protected $pdo;
		
		function __construct() 
		{
			$this->base = new base();
			$this->pdo = $this->base->getPDO();
		}
		
		function getRecentFileSrl($module, $fileSequence) 
		{
			return db::Query('SELECT','def_file',
			[
				['AND', 'module', '=', ':module', $module],
				['', 'target', '=', ':target', $fileSequence],
				['ORDER', 'srl', 'desc']
			],'srl', 'one');
		}
		
		function deleteAllAttachmentFiles($srl)
		{
			$thumbnailFolder = sprintf("%s%s%s", __DIR, __THUMB__ATTACH, $srl);
			$attachFolder = sprintf("%s%s%s", __DIR, __FILE__ATTACH, $srl);
			dir::emptyFolder($thumbnailFolder);
			dir::emptyFolder($attachFolder);
		}
		
		function getSingleFile($module, $fileSrl) 
		{
			return db::Query('SELECT','def_file',
			[
				['AND', 'module', '=', ':module', $module],
				['', 'srl', '=', ':srl', $fileSrl],
				['ORDER', 'srl', 'desc']
			],'*', 'all');
		}
		
		function isThumbnailExist($srl) 
		{
			$fp = sprintf("%s%s%s/%sx%s.jpg", __DIR, __THUMB__ATTACH, $srl, $this->board->config->thumbnail_width, $this->board->config->thumbnail_height);
			
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
		
		/**
		 * insert filelist sql
		 *
		 * @param int $target
		 * @param string $files
		 */
		function insertFileSequence($member_srl) 
		{
			$sth = $this->pdo->prepare("INSERT INTO def_file_sequence (member_srl) VALUES (:member_srl)");
			$sth->bindParam(':member_srl', $member_srl, PDO::PARAM_INT);
			$sth->execute();
		}
	
		/**
		 * insert filelist sql
		 *
		 * @param int $target
		 * @param string $files
		 */
		function insertFileList($target, $files, $origin, $module) 
		{
			$sth = $this->pdo->prepare("INSERT INTO def_file (target, files, origin, module) VALUES (:target, :files, :origin, :module)");
			$sth->bindParam(':target', $target, PDO::PARAM_INT);
			$sth->bindParam(':files', $files, PDO::PARAM_STR);
			$sth->bindParam(':module', $module, PDO::PARAM_STR);
			$sth->bindParam(':origin', $origin, PDO::PARAM_STR);
			$sth->execute();
		}
		
		function getFileSequence() 
		{
			return db::Query('SELECT','def_file_sequence',
			[
				['ORDER', 'srl', 'desc']
			],'srl', 'one');
		}
		
		function getFilebySrl($srl) 
		{
			$sth = $this->pdo->prepare("SELECT * FROM def_file WHERE target = :srl");
			$sth->bindParam(':srl', $srl,PDO::PARAM_INT);
			$sth->execute();
			return $sth->fetchAll();
		}
				
		function getAttachOrigin($get_target, $files) 
		{
			$sth = $this->pdo->prepare("SELECT origin FROM def_file WHERE target = :srl AND files = :files");
			$sth->bindParam(':srl', $get_target, PDO::PARAM_INT);
			$sth->bindParam(':files', $files, PDO::PARAM_STR);
			$sth->execute();
			return $sth->fetchAll();
		}
	
		/**
		 * get album files
		 *
		 * @param string $album
		 */
		function getOriginAlbumFilesAll($album) 
		{
			$sth = $this->pdo->prepare("SELECT srl FROM def_document_music WHERE album_only = :album ORDER BY album_only asc");
			$sth->bindParam(':album', $album, PDO::PARAM_STR);
			$sth->execute();
			return $sth->fetchAll();
		}
	
		function getOriginAlbumbysrl($srl) 
		{
			$sth = $this->pdo->prepare("SELECT album FROM def_origin WHERE srl = :srl");
			$sth->bindParam(':srl', $srl, PDO::PARAM_INT);
			$sth->execute();
			$std_count = $sth->fetch();
			return $std_count[0];
		}
	
		function getFileItemsArray($array) 
		{
			$i = 0;
			foreach($array as $key=>$value) 
			{
				$in_query = $in_query . ' :' .++$i . ', ';
			}
			
			$in_query = substr($in_query, 0, -2);
			
			$sth = $this->pdo->prepare("SELECT * FROM def_file WHERE target IN ($in_query)");

			$i = 0;
			foreach ($array as $key=>$value) 
			{
				$sth->bindParam(":" . ++$i, $value['srl']);
			}
			
			$sth->execute();
			return $sth->fetchAll();
		}
	
		function getDocumentFileSequence($srl) 
		{
			return db::Query('SELECT','def_document_music',
			[
				['', 'srl', '=', ':srl', $srl]
			],'file_sequence', 'one');
		}
	
		function deleteFileColumn($srl) 
		{
			return db::Query('DELETE','def_file',
			[
				['', 'srl', '=', ':srl', $srl]
			],'', 'boolean');
		}
	
		function getFileList($srl) 
		{
			if (!$srl) return false;
			return db::Query('SELECT','def_file',
			[
				['', 'target', '=', ':srl', $srl],
				['ORDER', 'srl', 'asc']
			],'*', 'all');
		}
	
		/**
		 * upload document download count
		 *
		 * @param string $get_file
		 * @param int $down_count
		 * @param int $get_serial
		 */
		function UpdateDownCount($down_count, $get_serial, $get_file) 
		{
			$sth = $this->pdo->prepare("UPDATE def_file SET down = :count WHERE target = :srl AND files = :file");
			$sth->bindParam(':count', $down_count, PDO::PARAM_INT);
			$sth->bindParam(':srl', $get_serial, PDO::PARAM_INT);
			$sth->bindParam(':file', $get_file, PDO::PARAM_STR);
			$sth->execute();
			return TRUE;
		}
	
		function getFileDownCount($get_serial, $get_files) 
		{
			$sth = $this->pdo->prepare("SELECT down FROM def_file WHERE target = :url AND files = :url2");
			$sth->bindParam(':url', $get_serial,PDO::PARAM_INT);
			$sth->bindParam(':url2', $get_files,PDO::PARAM_STR);
			$sth->execute();
			$result = $sth->fetch();
			return $result['down'];
		}
	
	}
	
?>