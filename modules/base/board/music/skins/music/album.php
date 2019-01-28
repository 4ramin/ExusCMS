<?php if(!defined("__FLOWER__")) exit(); ?>

<div class="list_area">
	<div id="bd_167325_0" class="bd boardListWrap bd_tmb_lst small_lst_btn" data-default_style="gallery" data-bdfilestype="">
		<?php foreach($this->board->document_list as $key => $document): ?>
		<div class="album">
			<a style="color:black;margin:auto" href="<?php echo str::getUrl('', __MODULEID, $_GET[__MODULEID], __ACTION, 'dispAlbumContent', 'related', $document->query['srl'], 'page', $_GET['page']) ?>">
				<div style="flat:left">
					<?php if($document->isThumbnailExists()): ?>
						<img class="tmb" src="<?php echo $document->makeAlbumThumbnail(); ?>">	
					<?php else: ?>
						<div class="tmb notmb" style="width:<?php echo $this->board->config->thumbnail_width?>px;height:<?php echo $this->board->config->thumbnail_height?>px;"></div>
					<?php endif; ?>
				</div>
				<?php echo $document->query['album']; ?>
			</a>
		</div>
	<?php endforeach; ?>
	<div>
		<div class="btm_mn clear">
		   <div class="fl">
				<form method="get" onsubmit="return procFilter(this, search)" class="boardSearchForm on">
					<input type="hidden" name="bd" value="<?php echo $get_arr['bd']?>">
					<input type="hidden" name="mode" value="search_album">
					<input type="hidden" name="act" value="album">
					<span class="btn_img itx_wrp" method="get" no-error-return-url="true">
						<button type="submit" onclick="jQuery(this).parents('form.boardSearchForm').submit();return false;" class="ico_16px search">검색</button>
						<label for="bd_srch_btm_itx_167325">Search</label>
						<input type="text" name="search_keyword" id="search_keyword" onkeyup="proc.autocomplet()" class="bd_srch_btm_itx srch_itx acInput" value="<?php echo $get_arr['search_keyword']?>" autocomplete="off">
						<div class="input_container">
							<ul id="search_keyword_list"></ul>
						</div>
					</span>
					<span class="btn_img select">
						<select name="search_target">
							<option <?php echo $get_arr['search_target']=='title' ? 'selected="selected"' : ''?> value="title">제목</option>
						</select>
					</span>
				</form>
		   </div>
		   <div class="fr">
				<audio id="audioplayer" autoplay=""></audio>	
				<a class="btn_img fr" onclick="proc.rand_music()"id="randmusic"><i class="fa fa-play"></i> 무작위 음악</a>		
				<a style="display:none" class="btn_img fr" id="randdownload"><i class="fa fa-download"></i> 다운로드</a>	
				<a class="btn_img fr" href="<?php echo str::getUrl('',__MODULEID,$_GET[__MODULEID],__ACTION,'','bdstyle',$get_arr['bdstyle']); ?>"><i class="fa fa-random"></i> 무작위 목록</a>		
				<audio id="song_play" autoplay></audio>
			</div>
		</div>
	
		<form action="./" method="get" class="bd_pg clear">
			<input type="hidden" name="error_return_url" value="<?php echo str::getUrl(__MODULEID,$_GET[__MODULEID]); ?>">
			<fieldset method="get" no-error-return-url="true">
				<legend class="blind">Board Pagination</legend>
				<input type="hidden" name="md" value="<?php echo $_GET[__MODULEID]?>">
				<input type="hidden" name="category" value="">
				<input type="hidden" name="search_keyword" value="" autocomplete="off" class="acInput">
				<input type="hidden" name="search_target" value="">
				<strong class="direction"><i class="fa fa-angle-left"></i> Prev</strong>	
				<a class="frst_last bubble this" href="<?php echo str::getUrl(__MODULEID,$_GET[__MODULEID],'page',1,__ACTION, 'dispBoardAlbum','srl',''); ?>" title="첫 페이지">1</a>
					<?php foreach($this->board->page_navigation as $key=>$page): ?>
						<a class="<?php echo $_GET['page'] == $page ?  "current_page": "" ?>" href="<?php echo str::getUrl(__MODULEID,$_GET[__MODULEID],'page',$page,__ACTION, 'dispBoardAlbum','srl',''); ?>"><?php echo $page?></a>
					<?php endforeach; ?>
				<span class="bubble">
					<a href="#" class="tg_btn2" data-href=".bd_go_page" title="페이지 직접 이동">...</a>
				</span>
				<a class="navi_page" href="<?php echo str::getUrl(__MODULEID,$_GET[__MODULEID],'page',$this->board->page_count,__ACTION, 'dispBoardAlbum','srl',''); ?>">
					<?php echo $this->board->page_count?>
				</a> 
				<a href="/index.php?mid=free&amp;listStyle=gallery&amp;page=2" class="direction">Next <i class="fa fa-angle-right"></i></a>
			</fieldset>
		</form>
	</div>
	</div>
</div>