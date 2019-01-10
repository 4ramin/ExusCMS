<?php

	if (!defined("__FLOWER__")) exit();

	class files_controller extends files
	{
		
		function __construct() 
		{
			parent::getHandler(TRUE);
		}
		
		function init($args) 
		{
			$this->files = new stdClass;
			$this->files->module = $args->module;
			$this->files->model = new files_model($this);
			
			return $this->files;
		}
		
		function makeUploadPath($fileSequence) 
		{
			$args = va::args();
			$args->path = array(
				__DIR.__FILE__ATTACH.$fileSequence,
				__DIR.__THUMB__ATTACH.$fileSequence
			);
			$args->mode = 0755;
			dir::make($args);
		}
		
		function getFileList() 
		{
			$fileSequence = $this->base->post_params('sequence');
			$moduleId = $this->base->post_params('module');
			$memberSrl = $this->base->getMemberSrl();
			if ($fileSequence) 
			{
				$oFileList = $this->files->model->getFileList($fileSequence);
				if (is_array($oFileList)) 
				{
					echo json_encode($oFileList);
				}
			}
		}
		
		function deleteFile() 
		{
			$fileSrl = $this->base->post_params('target');
			$moduleId = $this->base->post_params('module');
			$oFile = $this->files->model->getSingleFile($moduleId, $fileSrl);
			if (is_array($oFile)) 
			{
				$oFile = $oFile[0];
			}
			
			$oFileSrl = $oFile['target'];
			$fileName = $oFile['files'];
			$path_file = sprintf('%s%s%s/%s', __DIR, __FILE__ATTACH, $oFileSrl, $fileName);
			
			if (file_exists($path_file)) 
			{
				unlink($path_file);
				$this->files->model->deleteFileColumn($fileSrl);
				
				$request_params = array(
					"type" => "success",
					"fileSrl" => $fileSrl
				);
				header::file_json();
				echo json_encode($request_params);
			}
		}
		
		function uploadAjaxFile() 
		{
			$fileSequence = $this->base->post_params('sequence');
			$moduleId = $this->base->post_params('module');
			$memberSrl = $this->base->getMemberSrl();
			
			if (!$fileSequence) 
			{
				if (isset($_SESSION['target_srl'])) 
				{
					$fileSequence = $_SESSION['target_srl'];
				} 
				else 
				{
					$this->files->model->insertFileSequence($memberSrl);
					$fileSequence = $this->files->model->getFileSequence();
					
					$_SESSION['target_srl'] = $fileSequence;
				}
			}
			
			if ($fileSequence) 
			{
				$this->makeUploadPath($fileSequence);
				
				$postFiles = $_FILES['upload'];
				$fileName = $postFiles['name'];
				$tmpName = $postFiles['tmp_name'];
				
				
				$targetFileName = md5($fileName);
				$ext = substr(strrchr($fileName, '.'), 1);
				$uploadPath = sprintf('%s%s%s/%s.%s', __DIR, __FILE__ATTACH, $fileSequence, $targetFileName, $ext);
				if (preg_match('/\.(png|jpe?g|gif|svg|mp3|mp4|zip|gz)(\?.*)?$/i', $fileName, $matches)) 
				{
					if (move_uploaded_file($tmpName, $uploadPath)) 
					{
						$pathFile = sprintf(".%s%s/%s.%s", __FILE__ATTACH, $fileSequence, $targetFileName, $ext);
					}
				}
				
				if ($pathFile) 
				{
					$postFiles = $_FILES['upload'];
					$fileName = $postFiles['name'];
					
					$oFilesModel = $this->base->getModel('files');
					$oFilesModel->insertFileList($fileSequence, $targetFileName.'.'.$ext, $fileName, $moduleId);
					
					$fileSrl = $oFilesModel->getRecentFileSrl($moduleId, $fileSequence);
					
					$request_params = array(
						"type" => "success",
						"uploaded" =>1,
						"fileName" => $fileName, 
						"url" => $pathFile, 
						"sequence" => $fileSequence, 
						"memberSrl" => $memberSrl,
						"fileSrl" => $fileSrl
					);
					
					header::file_json();
					echo json_encode($request_params);
				}
			}
		}
		
		function insertFileManual($get_lastid) 
		{
			$postFiles = $_FILES['file'];
			if (isset($postFiles)) 
			{
				$file_count = count($postFiles['name']);
				if ($file_count > 0) 
				{
					$args = va::args();
					$args->path = array(
						__DIR.__FILE__ATTACH.$get_lastid,
						__DIR.__THUMB__ATTACH.$get_lastid
					);
					$args->mode = 0755;
					dir::make($args);
					
					$file_count = count($postFiles['name'])-1;
					$j = -1;
					while($j < $file_count) 
					{
						$filen = $postFiles['name'][++$j];
						if ($filen!="") 
						{
							$ext = str_replace('.', '', strrchr($filen, '.'));
							$path_file = __DIR.__FILE__ATTACH.$get_lastid.'/'.md5($filen).'.'.$ext;
						
							if (!maya::execute('@\||/@!php||html||cgi||jsp||php3||htm||war||asa||cdx||cer||asp||txt!', $filen,'boolean')) 
							{
								if (maya::execute('@\||/@!jpg||gif||png||mp3||mkv||mp4||avi||zip||7z||rar!', $filen,'boolean')) 
								{
									if (move_uploaded_file($_FILES["file"]['tmp_name']["$j"],$path_file)){
										$this->files->model->insertFileList($get_lastid, md5($filen).'.'.$ext, $filen, $this->post_data->md);
									}
								} 
								else 
								{
									exit();
								}
							} 
							else 
							{
								exit();
							}
						}	
					}
				}
			}
		}
		
	}
?>