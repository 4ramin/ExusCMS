<?php

class files_view extends files 
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
	
	function getCoverStream() 
	{
		if (empty($_SERVER)) return;
		
		if (substr($_SERVER['HTTP_ACCEPT'],0,5)!="image" || $_SERVER['HTTP_CACHE_CONTROL']=='no-cache') 
		{
			$this->files->audio_srl = $this->base->get_params('srl');
			$this->files->file_obj = $this->files->model->getFilebySrl($this->files->audio_srl);
			
			$image_args = new stdClass();
			$image_args->source = __DIR.__SYSTEM__ATTACH.'/nocover.png';
			$image_args->image = image::virtualimage($image_args);
			
			image::draw($image_args);
			exit();
		} 
		else 
		{
			$this->files->audio_srl = $this->base->get_params('srl');
			$this->files->file_obj = $this->files->model->getFilebySrl($this->files->audio_srl);
			
			
			$image_args = new stdClass();
			$image_args->source = __DIR.__FILE__ATTACH.'/'.$this->files->file_obj[0]['target'].'/'.$this->files->file_obj[1]['files'];
			$image_args->text = 'test';
			$image_args->red = 255;
			$image_args->green = 255;
			$image_args->blue = 255;
			$image_args->font = 125;
			$image_args->x = 15;
			$image_args->y = 15;
			$image_args->image = image::text_image($image_args);
			
			image::draw($image_args);
			exit();
			
			$this->board = new stdClass();
			
			$this->init = new stdClass();
			$this->init->model = new init_model();
			
			if ($this->files->file_obj[0]['module']) 
			{
				$this->board->config = json_decode($this->init->model->getModuleConfig($this->files->file_obj[0]['module']));
			} 
			else if ($this->files->file_obj[0]['target']) 
			{
				$this->get_module = $this->init->model->getModulebysrl($this->files->file_obj[0]['target']);
				$this->board->config = json_decode($this->init->model->getModuleConfig($this->get_module));
			} 
			else 
			{
				exit();
			}
			
			if ($this->board->config->convert_watermark=="Y") 
			{
				$image_args = new stdClass();
				$image_args->x = 50;
				$image_args->y = 50;
				$image_args->source = sprintf("%s%s/%s/%s", __DIR, __FILE__ATTACH, $this->files->file_obj[0]['target'], $this->files->file_obj[1]['files']);
				$rgb = image::pick($image_args);
				
				$image_args = new stdClass();
				$image_args->source = sprintf("%s%s/%s/%s", __DIR, __FILE__ATTACH, $this->files->file_obj[0]['target'], $this->files->file_obj[1]['files']);
				$image_args->text = $this->board->config->image_watermark;
				$image_args->red = $rgb[0] - 100;
				$image_args->green = $rgb[1] - 100;
				$image_args->blue = $rgb[2] - 100;
				$image_args->font = 125;
				$image_args->x = $this->board->config->x_watermark;;
				$image_args->y = $this->board->config->y_watermark;;
				$image_args->image = image::text_image($image_args);
				
				image::draw($image_args);
				exit();
			} 
			else 
			{
				$image_args = new stdClass();
				$image_args->source = sprintf("%s%s/%s/%s", __DIR, __FILE__ATTACH, $this->files->file_obj[0]['target'], $this->files->file_obj[1]['files']);
				$image_args->text = $this->board->config->image_watermark;
				$image_args->red = $this->board->config->r_watermark;
				$image_args->green = $this->board->config->g_watermark;
				$image_args->blue = $this->board->config->b_watermark;
				$image_args->font = 125;
				$image_args->x = $this->board->config->x_watermark;
				$image_args->y = $this->board->config->y_watermark;
				$image_args->image = image::text_image($image_args);
				
				image::draw($image_args);
				exit();
			}
		}
	}
	
	function getAudioStream() 
	{
		if (substr($_SERVER['HTTP_ACCEPT_ENCODING'], 0, 8)!="identity" || $_SERVER['HTTP_ACCEPT'] != '*/*' || $_SERVER['HTTP_CACHE_CONTROL'] == 'no-cache') 
		{
			$image_args = new stdClass();
			$image_args->source = __DIR.__SYSTEM__ATTACH.'/nocover.png';
			$image = image::virtualimage($image_args);
			$image_args->image = $image;
			
			image::draw($image_args);
			exit();
		} 
		else 
		{
			$this->files->audio_srl = $this->base->get_params('srl');
			$this->files->range = $this->base->get_params('range');
			$this->files->file_obj = $this->files->model->getFilebySrl($this->files->audio_srl);
			$this->files->target = sprintf("%s%s/%s/%s", __DIR, __FILE__ATTACH, $this->files->file_obj[0]['target'], $this->files->file_obj[0]['files']);
			
			$audio_args = new stdClass();
			$audio_args->name = 'stream.mp3';
			$audio_args->from = $this->files->target;
			stream::audio($audio_args);
		
			exit();
		}
	}
	
	function AlbumDownload() 
	{
		$this->files->target = $this->base->get_params('target');
		$this->files->album = $this->files->model->getOriginAlbumbysrl($this->files->target);
		$this->files->item_popular = $this->files->model->getOriginAlbumFilesAll($this->files->album);
		$this->files->file_list = $this->files->model->getFileItemsArray(($this->files->item_popular));
		
		$zip_path = sprintf("%s/file/zip_output", __DIR);
		if (is_dir($zip_path))
		{
			$this->files->zip_file = sprintf("%s/album_%s.zip", $zip_path, $this->files->target);
		}
		
		if (!$this->files->zip_file)
		{
			return;
		}
		
		$zipFileList = array();
		
		foreach ($this->files->file_list as $key => $fileInfo) 
		{
			array_push($zipFileList, 
				array(
					'filename' => $fileInfo['origin'], 
					'file' => sprintf("%s%s%s/%s", __DIR, __FILE__ATTACH, $fileInfo['target'], $fileInfo['files'])
				)
			);
		}
		
		if (empty($zipFileList)) 
		{
			return '다운로드 할 수 없습니다.';
		}
		
		if (!file_exists($this->files->zip_file)) 
		{
			$args = new StdClass();
			$args->target = $this->files->zip_file;
			$args->content = $zipFileList;
			zip::zip_file($args);
		}
		
		$fp = fopen($this->files->zip_file, 'rb');
		if (!$fp)
		{
			return '파일이 존재하지 않음';
		}
		
		$args_download = va::args();
		$args_download->source = $this->files->zip_file;
		$args_download->name = $this->files->album.'.zip';
		file::download($args_download);
		exit();
	}
	
	function FileDownload() 
	{
		$this->files->download = $this->base->get_params('download');
		$this->files->md5 = $this->base->get_params('target');
		
		$filename = $this->files->model->getAttachOrigin($this->files->download, $this->files->md5);
		$down_count = $this->files->model->getFileDownCount($this->files->download, $this->files->md5);
		
		foreach ($filename as $value) 
		{
			$uploaded_filename = sprintf("%s%s%s/%s", __DIR, __FILE__ATTACH, $this->files->download, $this->files->md5);
			
			if (!file_exists($uploaded_filename)) 
			{
				return $this->base->set_error('파일이 존재하지 않음');
			}
			
			if (preg_match('/\.(jpg|gif|png|mp3|mp4|mkv|avi|zip|7z|rar|gz)(?:[\?\#].*)?$/i', $uploaded_filename, $matches)) 
			{
				$fp = fopen($uploaded_filename, 'rb');
				if (!$fp)
				{
					return '파일이 존재하지 않음';
				}
				
				$args_download = va::args();
				$args_download->source = $uploaded_filename;
				$args_download->name = $value['origin'];
				file::download($args_download);
				
				$this->files->model->UpdateDownCount($down_count + 1, $this->files->download, $this->files->md5);
				exit();
			}
		}
	}
	
}

?>