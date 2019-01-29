<?php if(!defined("__FLOWER__")) exit(); ?>
<style>
.tmb{
	background-size: cover;
	width:<?php echo $this->board->config->thumbnail_width; ?>px;
	height:<?php echo $this->board->config->thumbnail_height-2; ?>px;
}
.bd_tmb_lst .tmb_wrp{border-right:0px}
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
.bd_tmb_lst li p{ 
	padding-left: <?php echo $this->board->config->thumbnail_width+10; ?>px;
}
.bd_tmb_lst li,.frame{
	width:<?php echo $this->board->config->thumbnail_width+249; ?>px;
	height:<?php echo $this->board->config->thumbnail_height;?>px;
}
.bd_tmb_lst li{
	margin:8px 5px 8px 5px;
	background-color:#fff;
	border: 0px solid #D5D5D5;
	border-radius: 3px;
}
.bd_tmb_lst li:hover{
	border:0px solid #6966C5
}
.tmb_wrp a,.autor_search{
	max-width:<?php echo $this->board->config->thumbnail_width-30; ?>px;
}
.sm2_btn{
	top: <?php echo $this->board->config->thumbnail_height-20; ?>px !important;
}
.sm360_btn{
	top: <?php echo $this->board->config->thumbnail_height-20; ?>px !important;
}
.dbt,.dbt2,.dbt3,.dbt4{
	top: <?php echo $this->board->config->thumbnail_height-22; ?>px !important;
}
.frame {
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    border: 1px solid #000;
    opacity: 0.1;
    filter: alpha(opacity=10);
}
.ui360{
	top: -40px
}
.caption_bar{
	width: 0px;
    position: absolute;
    right: 0px;
    height: 0px;
    border-top: 10px solid #c1d4ff;
    border-left: 100px solid transparent;
}
</style>
	<ol class="bd_lst bd_tmb_lst gall_style img_load tmb_bg clear">
	<?php foreach($this->board->result as $key=>$document): ?>
		<li>
		<div class="caption_bar"></div>
		<span class="frame"></span>
		<div style="position: absolute;left: 1px;" class="tmb_wrp ribbon_v fin_load">
			
			<?php $index_img = $this->board->model->getIndexThumbnail($document); ?>
			
			<?php $this_file = $this->board->model->getFileList($document['srl']); ?>
			
			<?php if($index_img['img']): ?>
				<style>.tmp_<?php echo $index_img['index'];?>{background-image: url('<?php echo $index_img['img'];?>')}</style>
			<?php endif;?>
			
			<div class="tmb tmp_<?php echo $index_img['index'];?>" alt=""></div>
			<div class="genre_ech">
			<?php
				if($document['genre']==1){
					echo '팝';
				}elseif($document['genre']==2){
					echo '댄스';
				}elseif($document['genre']==3){
					echo '발라드';
				}elseif($document['genre']==4){
					echo '클래식';
				}elseif($document['genre']==5){
					echo '재즈';
				}elseif($document['genre']==6){
					echo '일렉';
				}elseif($document['genre']==7){
					echo '락';
				}elseif($document['genre']==8){
					echo '헤비메탈';
				}elseif($document['genre']==9){
					echo '보사노바';
				}
			?>
			</div>
			<?php
				$cate_target = $this->board->model->getCategoryNamebysrl($document['category']);
				if($this->board->config->category_view!=1) echo $cate_target ? '<div class="cate_ech">'.$cate_target.'</div>' : '';
			?>
			<?php if($this->board->config->hz_view==1): ?>
				<?php foreach($this_file as $key=>$flst): ?>
					<?php //if(preg_match('/\.(mp3|wav)(?:[\?\#].*)?$/i', $flst['files'], $matches)) $this->board->model->UpdateBitrate($value, $flst); 
						if(maya::execute('@\||/@+.+!mp3||wav!', $flst['files'],'boolean')) $this->board->model->UpdateBitrate($document, $flst); 
					?>
				<?php endforeach; ?>
			<?php endif; ?>
			
			<a class="hx fixed" href="<?php echo str::getUrl(__MODULEID,$_GET[__MODULEID],'srl', $document['srl'],'cpage','') ?>"></a>	
		</div>
		
		<p>
			<a href="<?php echo str::getUrl(__MODULEID,$_GET[__MODULEID],'srl',$document['srl'],'cpage','') ?>">
				<p style="text-align:left;white-space: nowrap;">
					<b style="font-weight:bold"><?php echo mb_substr($document['album_only'],0,25); ?></b>
				</p>
				<p>
					<span style="word-break: break-all;word-wrap: break-word;color: #908f8f;"><?php echo mb_substr($document['title'],0,$this->board->config->title_length); ?></span>
				</p>
				<p style="text-align:left;white-space: nowrap;">
					<b style="font-weight:bold;color: #b32b2b;font-size:15px"><?php echo mb_substr($document['artist'],0,25); ?></b>
				</p>
			</a>
		</p>
		
		<div class="sm2_btn wrapper">	
			<?php foreach($this_file as $key=>$flst): ?>
				<?php
					if($this->board->config->play_btn_view!=1){
					   if(maya::execute('@\||/@+.+!mp3||wav!', $flst['files'],'boolean')){
					   //if(preg_match('/\.(mp3|wav)(?:[\?\#].*)?$/i', $flst['files'], $matches)){
						   if($this->board->config->list_player=="btn"){
								echo '<a href="'.__SUB.__FILE__ATTACH.$document['srl'].'/'.$flst['files'].'" class="sm2_button" ></a><div class="tooltip">'.$this->board->lang['play'].'</div>';
						   }elseif($this->board->config->list_player=="360"){
								echo '<div class="ui360"><a href="'.__SUB.__FILE__ATTACH.$document['srl'].'/'.$flst['files'].'"></a></div>';
						   }
						break;
					   }
					}
				?>
			 <?php endforeach; ?>
		</div>
		
		<!--Download-->
		<?php foreach($this_file as $key=>$flst): ?>
			<?php
				if($flst['keyres']==NULL) $this->board->model->UpdateFileKey($document['srl']);
				//if(preg_match('/\.(mp3|wav)(?:[\?\#].*)?$/i', $flst['files'], $matches)){
				if(maya::execute('@\@+.+!mp3||wav!', $flst['files'],'boolean')){
					if($this->board->config->playlist_btn_view!=1) echo '<div class="dbt3 wrapper"><a target_music='.__SUB.__FILE__ATTACH.$document['srl'].'/'.$flst['files'].' target_srl='.$document['srl'].' target_origin="'.$flst['origin'].'" onclick=proc.playlist(this)>
					<i style="color:#fff" class="fa fa-plus"></i></a><div class="tooltip">'.$this->board->lang['playlistpush'].'</div></div>';
					if($this->board->config->mdown_btn_view!=1) echo '<div class="dbt wrapper"><a href='.str::getUrl('',__MODULEID,'files','act','FileDownload','download',$document['srl'],'target',$flst['files'],'key',$flst['keyres'].'>
					<i style="color:#fff" class="fa fa-music"></i></a><div class="tooltip">'.$this->board->lang['musicdownload'].' : '.$flst['down'].'</div></div>');
				}elseif(maya::execute('@\@+.+!jpg||png!', $flst['files'],'boolean')){
				//}elseif(preg_match('/\.(jpg|png)(?:[\?\#].*)?$/i', $flst['files'], $matches)){
					if($this->board->config->cdown_btn_view!=1) echo '<div class="dbt2 wrapper"><a href='.str::getUrl('',__MODULEID,'files','act','FileDownload','download',$document['srl'],'target',$flst['files'],'key',$flst['keyres'].'>
					<i style="color:#fff" class="fa fa-camera"></i></a><div class="tooltip">'.$this->board->lang['coverdownload'].' : '.$flst['down'].'</div></div>');
				}
			?>
		<?php endforeach; ?>
		</li>
	<?php endforeach; ?>
</ol>