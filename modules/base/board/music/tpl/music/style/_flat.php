<?php if(!defined("__FLOWER__")) exit(); ?>
<style>
.tmb{
	width:<?php echo $this->board->config->thumbnail_width; ?>px;
	height:<?php echo $this->board->config->thumbnail_height; ?>px
}
.boardStyleGallery .thumbnailWrap,
.boardStyleGallery .gall_style2 .thumbnailWrap{
	position:relative;
	max-width:<?php echo $this->board->config->thumbnail_width; ?>px;
    vertical-align: text-bottom;
}
.boardStyleGallery li{
	width:<?php echo $this->board->config->thumbnail_width+10; ?>px;
	height:<?php echo $this->board->config->thumbnail_height + 50;?>px;
	margin: <?php echo $this->board->config->thumbnail_top_margin ? $this->board->config->thumbnail_top_margin : 10;?>px <?php echo $this->board->config->thumbnail_lr_margin ? $this->board->config->thumbnail_lr_margin : 15;?>px;
}
.autor_search{
	max-width:<?php echo $this->board->config->thumbnail_width - 20; ?>px;
}
.sm2_btn{
	top: <?php echo $this->board->config->thumbnail_height - 25; ?>px !important;
}
.dbt,.dbt2,.dbt3,.dbt4{
	top: <?php echo $this->board->config->thumbnail_height - 25; ?>px !important;
}
.sm360_btn{
	top: <?php echo $this->board->config->thumbnail_height - 50; ?>px !important;
}
</style>

<ol style="margin-top: 30px;" class="bd_lst boardStyleGallery img_load clear">
<?php foreach($this->board->document_list as $document): ?>
	<li>
		<a href="<?php echo $document->getLink(); ?>">
			<div class="thumbnailWrap">
				<?php $indexImage = $this->board->model->getIndexThumbnail($document->getFileList(), $document->query); ?>
				<?php if($this->board->config->image_ignore_overlab == "1"):?>
					<?php if(isset($indexImage['img'])): ?>
						<?php echo html::element('style', sprintf(".tmp_%s{background-image: url('%s')}", $indexImage['index'], $indexImage['img']), []);?>
					<?php endif;?>
					
					<?php echo html::element('div', ($document->isThumbnailExists()) ? '' : 'No Thumb', 
						($document->isThumbnailExists() ? [
							'data-srl' => $document->query['srl'],
							'class' => 
								('view_bd tmb '.
								($document->isThumbnailExists() ? sprintf("tmp_%s", $indexImage['index']) : '').
								($document->isViewingDocument() ? 'viewing_g2' : '')),
							'alt' => 'Thumbnail',
							'style' => (!$document->isThumbnailExists()) ?? 'background-color: #efeeee;line-height: 10;font-size: 15px;'
						]:[
							'class' => 'view_bd tmb no_img',
							'alt' => 'No Image'
						]));?>
				<?php else:?>
					<?php echo html::element('img', ($document->isThumbnailExists()) ? '' : '',
						($document->isThumbnailExists() ? [
							'class' => 'view_bd tmb',
							'src' => $document->getThumbnail(),
							'alt' => 'image'
						]:[
							'src' => './common/img/blank_thumbnail.jpg',
							'class' => 'view_bd tmb no_img',
							'alt' => 'No Image'
						])
					);?>
				<?php endif;?>
				
				<div class="genre_ech"><?php echo $document->getGenre();?></div>
				<div class="playtime_ech"><?php echo $document->getPlayTime();?></div>
				
				<?php if($document->isCategoryExists() && $this->board->config->category_view!=1): ?>
					<div class="navi_page cate_ech"><i class="fa fa-folder-open" aria-hidden="true"></i> <?php echo $document->getCategoryName();?></div>
				<?php endif;?>
				
				<?php if($document->isAudioExists()):?>
					<div style="display:none" class="sm2_btn wrapper">	
						<?php if($this->board->config->list_player=="btn"): ?>
							<a href="<?php echo $document->getAudioLink(); ?>" class="sm2_button"></a>
							<div class="tooltip"><?php echo $this->board->lang['play'];?></div>
						<?php elseif($this->board->config->list_player=="360"):?>
							<div class="ui360">
								<a href="<?php echo $document->getAudioLink();?>"></a>
							</div>
						<?php endif;?>
					</div>
				<?php endif;?>
				
				<?php if($document->isThumbnailExists() && $this->board->config->cdown_btn_view!=1): ?>
					<div style="display:none" class="dbt2 mp3_btn wrapper">
						<a href="<?php echo $document->getImageDownloadLink();?>"><i style="color:#fff" class="fa fa-camera"></i></a>
						<div class="tooltip"><?php echo $this->board->lang['coverdownload'];?></div>
					</div>
				<?php endif; ?>
				
				<?php if($document->isAudioExists()):?>
					<?php if($this->board->config->playlist_btn_view!=1): ?>
						<div style="display:none" class="dbt3 mp3_btn wrapper">
							<a target_srl="<?php echo $document->query['srl'];?>" onclick="proc.playlist(this)"><i style="color:#fff" class="fa fa-plus"></i></a>
							<div class="tooltip"> <?php echo $this->board->lang['playlistpush'];?></div>
						</div>
					<?php endif;?>
				
					<?php if($this->board->config->mdown_btn_view!=1):?>
						<div style="display:none" class="dbt mp3_btn wrapper">
							<a href="<?php echo $document->getAudioDownloadLink(); ?>"><i style="color:#fff" class="fa fa-music"></i></a>
							<div class="tooltip"><?php echo $this->board->lang['musicdownload'];?></div>
						</div>
					<?php endif;?>
				<?php endif;?>
			</div>
		</a>	
		
		<p>
			<a title="<?php echo $document->getTitle(); ?>" href="<?php echo $document->getLink(); ?>">
			<?php echo html::element('b', $this->board->config->show_only_title != 1 ? 
			$document->getTitle($this->board->config->title_length) : $document->getAlbumTitle($this->board->config->title_length), [
				'class' => 'title_album'
			]);?>
			</a><br/>
			<?php echo html::element('a', $document->getArtist(12), [
				'class' => 'autor navi_page',
				'href' => $document->getArtistLink()
			]);?>
		</p>
		
	</li>
<?php endforeach; ?>
</ol>