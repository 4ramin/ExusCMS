<?php

	class infiniteCarousel
	{
		
		function __construct()
		{
			$this->base = new base();
			$this->pdo = $this->base->getPDO();
		}

		function addCSS($css)
		{
			$this->base->addCSS($css);
		}
		
		function addJS($css)
		{
			$this->base->addJS($css);
		}
		
		function getFileListPopular_main($page_start)
		{
			$sth = $this->pdo->prepare("SELECT target FROM def_file WHERE down >= 0 AND origin LIKE '%.mp3' ORDER by down desc LIMIT :px, 30");
			$sth->bindParam(':px', $page_start,PDO::PARAM_INT);
			$sth->execute();
			return $sth->fetchAll();
		}
		
		function getDocumentItemsArray($get_serial, $array)
		{
			$i = 0;
			foreach($array as $key=>$value)
			{
				$i++;
				$in_query = $in_query . ' :' .$i . ', ';
			}
			$in_query = substr($in_query, 0, -2);
			
			if($in_query)
			{
				$sth = $this->pdo->prepare("SELECT * FROM def_document_music WHERE srl IN ($in_query)");
				
				$i = 0;
				foreach ($array as $key=>$value) {
					$i++;
					$sth->bindParam(":" . $i, $value['target']);
				}
				
				$sth->execute();
				return $sth->fetchAll();
			}
		}
		
		function getFileList($get_serial)
		{
			$sth = $this->pdo->prepare("SELECT * FROM def_file WHERE target = :url");
			$sth->bindParam(':url', $get_serial,PDO::PARAM_INT);
			$sth->execute();
			return $sth->fetchAll();
		}

		/**
		 * 썸네일을 생성한다
		 *
		 * @param string $file
		 * @param   int  $srl
		 * @param   int  $thumbnail_width
		 * @param   int  $thumbnail_height
		 */
		function makeThumbnail($file, $srl, $thumbnail_width, $thumbnail_height)
		{
			//if(preg_match('/\.(jpg|png|bmp|jpeg)(?:[\?\#].*)?$/i', $file, $matches))
			if(maya::execute('@\@!jpg||png||bmp||gif||jpeg!', $file,'boolean')){
				$fp = __DIR.__THUMB__ATTACH.$srl.'/'.$thumbnail_width.'x'.$thumbnail_height.'.jpg';
				if(!file_exists($fp)){
					$ff = __DIR.__THUMB__ATTACH.$srl;
					if(!file_exists($ff)) return $ff;
					$path_file = __DIR.__FILE__ATTACH.$srl.'/'.$file;
					
					if(!is_dir($ff)) mkdir($ff,755);
					
					$resize_width = $thumbnail_width;
					$resize_height = $thumbnail_height;
					
					//썸네일 리사이즈
					$args = va::args();
					$args->source = $path_file;
					$args->width = $resize_width;
					$args->height = $resize_height;
					$virtual_image = image::resize($args);
										
					$args_image = va::args();
					$args_image->source = $path_file;
					$args_image->dest = $fp;
					$args_image->image = $virtual_image;
					image::make($args_image);
					
					$file = __THUMB__ATTACH.$srl.'/'.$thumbnail_width.'x'.$thumbnail_height.'.jpg';
					return __SUB.$file;
				}else{
					$file = __THUMB__ATTACH.$srl.'/'.$thumbnail_width.'x'.$thumbnail_height.'.jpg';
					return __SUB.$file;
				}
			}
		}
		
		function getPopularFileList($module, $down_count)
		{
			return db::Query('SELECT','def_file',[
				['AND', 'down', '>=', ':down', $down_count],
				['AND', 'module', '=', ':module', $module],
				['', 'origin', 'LIKE', "'%.mp3'"],
				['ORDER', 'down', 'desc'],
				['LIMIT',1,50]
			],'*', 'all');
		}
	}
	
?>
<?php
	$infiniteCarousel = new infiniteCarousel();
	$item_popular = $infiniteCarousel->getFileListPopular_main($page_start);
	$board_list = $infiniteCarousel->getDocumentItemsArray($item_list, $item_popular);
	$infiniteCarousel->addCSS('/widget/infiniteCarousel/css/infiniteCarousel.css');
	$infiniteCarousel->addJS('/widget/infiniteCarousel/js/infiniteCarousel.js');
?>
<?php if(is_array($board_list)): ?>
	<div class="infiniteCarousel">
		<div class="wrapper" style="overflow-x: hidden; overflow-y: hidden; ">
			<ul>
				<?php foreach($board_list as $key=>$value): ?>
				<?php $this_file = $infiniteCarousel->getFileList($value['srl']); ?>
					<?php foreach($this_file as $key=>$flst): ?>
						<?php if(maya::execute('@\@+.+!jpg||png||gif||jpeg!', $flst['files'],'boolean')):?>
						<?php $i++; ?>
							<li <?php if($i<12 || $i>20) echo " class=cloned "; ?>>
								<a href="<?php echo str::getUrl('','srl',$flst['target']); ?>"><img alt="" src="<?php echo $infiniteCarousel->makeThumbnail($flst['files'],$value['srl'],70,70); ?>"></a>
							</li>
						<?php endif; ?>
					<?php endforeach; ?>
				<?php endforeach; ?>
			</ul>
		</div>
		<a class="icon-angle-left"></a>
		<a class="icon-angle-right"></a>
	</div>
<?php endif; ?>
