<?php if(!defined("__FLOWER__")) exit(); ?>

<style>
.tmb{
	object-fit: contain;
	background-size: cover;
	width:<?php echo $this->board->config->thumbnail_width; ?>px;
	height:<?php echo $this->board->config->thumbnail_height; ?>px
}
.tmb_list{
	width:50px;height:50px
}
.tmb_wrp:hover{
	-webkit-box-shadow:inset 0px 0px 0px 10px #4D76E6;
	-moz-box-shadow:inset 0px 0px 0px 10px #4D76E6;
	box-shadow:inset 0px 0px 0px 10px #4D76E6;
}
.bd_tmb_lst .tmb_wrp,
.bd_tmb_lst .gall_style2 .tmb_wrp{
	position:relative;
	max-width:<?php echo $this->board->config->thumbnail_width; ?>px
}
.bd_tmb_lst li{
	width:<?php echo $this->board->config->thumbnail_width; ?>px;
	height:<?php echo $this->board->config->thumbnail_height + 60;?>px;
	margin: <?php echo $this->board->config->thumbnail_top_margin ? $this->board->config->thumbnail_top_margin : 10;?>px <?php echo $this->board->config->thumbnail_lr_margin ? $this->board->config->thumbnail_lr_margin : 15;?>px <?php echo $this->board->config->thumbnail_bottom_margin ? $this->board->config->thumbnail_bottom_margin : 25;?>px <?php echo $this->board->config->thumbnail_lr_margin ? $this->board->config->thumbnail_lr_margin : 15;?>px;
	background-color:#fff;
	border: 0px solid #D5D5D5;
	border-radius: 3px;
}
.bd_tmb_lst li:hover{
	border:0px solid #6966C5
}
.autor_search{
	max-width:<?php echo $this->board->config->thumbnail_width - 20; ?>px;
}
.sm2_btn{
	top: <?php echo $this->board->config->thumbnail_height - 25; ?>px !important;
}
.dbt,.dbt2,.dbt3,.dbt4{
	top: <?php echo $this->board->config->thumbnail_height - 47; ?>px !important;
}
.sm360_btn{
	top: <?php echo $this->board->config->thumbnail_height - 50; ?>px !important;
}
</style>

<ol style="margin-top: 15px;" class="bd_lst bd_tmb_lst img_load clear">
	<?php foreach($this->board->document_list as $key=>$document): ?>
		<li>
			<div class="tmb_wrp ribbon_v fin_load">
				<!-- Thumbnail -->
				<?php $index_img = $this->board->model->getIndexThumbnail($document->getFileList(), $document->query); ?>
				
				<?php if($this->board->config->image_ignore_overlab == "1"):?>
					<?php if(isset($index_img['img'])): ?>
						<style>.tmp_<?php echo $index_img['index'];?>{background-image: url('<?php echo $index_img['img'];?>')}</style>
					<?php endif;?>
					<div class="<?php if(isset($this->board->document['srl']) && $this->board->document['srl'] == $document->query['srl']): ?>viewing_g2<?php endif;?> tmb <?php if($document->isThumbnailExists()): ?>tmp_<?php echo $index_img['index'];?>" alt="">
					<?php else:?>" style="background-color: #efeeee;line-height: 10;font-size: 15px;" alt="">No Thumb<?php endif;?>
					</div>
				<?php else:?>
					<img class="tmb" src="<?php echo $document->makeThumbnail(); ?>">	
				<?php endif;?>
				
				<!-- Genre -->
				<div class="genre_ech">
					<?php echo $document->getGenre();?>
				</div>
				
				<!-- Category -->
				<?php if($document->isCategoryExists() && $this->board->config->category_view!=1): ?>
					<div class="navi_page cate_ech">
						<i class="fa fa-folder-open" aria-hidden="true"></i> <?php echo $document->getCategoryName();?>
					</div>
				<?php endif;?>
				
				<!-- Link -->
				<a class="hx fixed view_bd" data-pjax="true" href="<?php echo $document->getLink(); ?>"></a>	
			</div>
			
			<!-- Title -->
			<p>
				<a href="<?php echo $document->getLink(); ?>">
					<b class="title_album"><?php echo $document->getTitle($this->board->config->title_length); ?></b>
				</a>
			</p>
			
			<!-- Audio Preview -->
			<?php if($document->isAudioExists()):?>
				<div style="display:none" class="sm2_btn wrapper">	
					<?php if($this->board->config->list_player=="btn"): ?>
						<a href="<?php echo $document->getAudioLink(); ?>" class="sm2_button"></a>
						<div class="tooltip">
							<?php echo $this->board->lang['play'];?>
						</div>
					<?php elseif($this->board->config->list_player=="360"):?>
						<div class="ui360">
							<a href="<?php echo $document->getAudioLink();?>"></a>
						</div>
					<?php endif;?>
				</div>
			<?php endif;?>
			
			<!-- Image Download -->
			<?php if($document->isThumbnailExists() && $this->board->config->cdown_btn_view!=1): ?>
				<div style="display:none" class="dbt2 mp3_btn wrapper">
					<a href="<?php echo $document->getImageDownloadLink();?>">
						<i style="color:#fff" class="fa fa-camera"></i>
					</a>
					<div class="tooltip">
						<?php echo $this->board->lang['coverdownload'];?>
					</div>
				</div>
			<?php endif; ?>
			
			<!-- Audio Download, Push Playlist -->
			<?php if($document->isAudioExists()):?>
				<?php if($this->board->config->playlist_btn_view!=1): ?>
					<div style="display:none" class="dbt3 mp3_btn wrapper">
						<a target_srl="<?php echo $document->query['srl'];?>" onclick=proc.playlist(this)>
							<i style="color:#fff" class="fa fa-plus"></i>
						</a>
						<div class="tooltip"> <?php echo $this->board->lang['playlistpush'];?></div>
					</div>
				<?php endif;?>
			
				<?php if($this->board->config->mdown_btn_view!=1):?>
					<div style="display:none" class="dbt mp3_btn wrapper">
						<a href="<?php echo $document->getAudioDownloadLink(); ?>">
							<i style="color:#fff" class="fa fa-music"></i>
						</a>
						<div class="tooltip">
							<?php echo $this->board->lang['musicdownload'];?>
						</div>
					</div>
				<?php endif;?>
			<?php endif;?>
		</li>
	<?php endforeach; ?>
</ol>