<?php if(!defined("__FLOWER__")) exit(); ?>
<div class="btn_line">
	<span style="margin-left:10px">
		<i class="fa fa-file"></i>
		<?php echo $this->board->lang['download']; ?> :
		<?php foreach($this->board->file_list as $key=>$fileInfo): ?>
			<?php
				$fileCaption = $this->board->model->getFileCaption($fileInfo);
				
				if(maya::execute('@\||/@!mp3||wav!', $fileInfo['files'],'boolean')){
					echo html::element('a', html::element('i', '', ['class'=>'fa fa-file-audio-o']).' '.$fileCaption, [
						'class' => 'down_btn',
						'href' => $this->board->model->getFileDownloadLink($fileInfo)
					]);
				}elseif(maya::execute('@\||/@!jpg||jpeg||png||gif!', $fileInfo['files'],'boolean')){
					echo html::element('a', html::element('i', '', ['class'=>'fa fa-file-picture-o']).' '.$fileCaption, [
						'class' => 'down_btn',
						'href' => $this->board->model->getFileDownloadLink($fileInfo)
					]);
				}elseif(maya::execute('@\||/@!mp4||avi||mpg||mpeg!', $fileInfo['files'],'boolean')){
					echo html::element('a', html::element('i', '', ['class'=>'fa fa-file-video-o']).' '.$fileCaption, [
						'class' => 'down_btn',
						'href' => $this->board->model->getFileDownloadLink($fileInfo)
					]);
				}else{
					echo html::element('a', html::element('i', '', ['class'=>'fa fa-file-video-o']).' '.$fileCaption, [
						'class' => 'down_btn',
						'href' => $this->board->model->getFileDownloadLink($fileInfo)
					]);
				}
			?>
		<?php endforeach; ?>
		
		<?php if($this->board->document['album_only']):?>
			<?php
				echo html::element('a', html::element('i', '', ['class'=>'fa fa-file-archive-o', 'aria-hidden'=>'true']).' '.$this->board->lang['albumdownload'], [
					'style' => 'float:right;margin-right:10px',
					'href' => str::getUrl(__MODULEID, 'files', __ACTION, 'AlbumDownload', 'target', $this->board->query->getOriginalAlbumSrlbyAlbum($this->board->document['album_only']))
				]);
			?>
		<?php endif;?>
	</span>
</div>
