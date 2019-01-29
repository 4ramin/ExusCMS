<?php if(!defined("__FLOWER__")) exit(); ?>

<script>
core_flower.bdstyle = "<?php echo $_GET['bdstyle'] ? $_GET['bdstyle'] : $this->board->config->gallery_skin; ?>";
</script>

<div class="list_area">
	<div class="content newclearfix">
		<div id="bd_3190_0" class="bd hover_effect small_lst_btn" data-default_style="<?php echo $_GET['bdstyle']; ?>" data-bdfilestype="">
			<div class="minimalizeWindow"></div>
			
			<?php if(isset($this->board->document) && is_array($this->board->document)) include('view.php');?>
			
			<div class="documentAjax">
				<div id="content_view" class="list_area contentArea"></div>
			</div>
			
			<div id="boardListWrap" class="boardListWrap">
				<?php include('category.php') ?>
				<?php if(!isset($_GET['bdstyle'])):?>
					<?php empty($this->board->config->gallery_skin) ? include('style/_gallery3.php') : include('style/_'.$this->board->config->gallery_skin.'.php');?>
				<?php elseif($_GET['bdstyle']=='list'):?>
					<?php include('style/_list.php');?>
				<?php elseif($_GET['bdstyle']=='webzine'):?>
					<?php include('style/_webzine.php');?>
				<?php elseif($_GET['bdstyle']=='flat'):?>
					<?php include('style/_flat.php');?>
				<?php elseif($_GET['bdstyle']=='search'):?>
					<?php include('style/_search.php');?>
				<?php endif;?>
					
				<div class="btm_mn clear">
				   <div class="fl">
						<a class="btn_img fl navi_page pad" href="<?php echo str::getUrl('',__MODULEID,$this->base->get_params(__MODULEID),__ACTION,'dispBoardPopular','bdstyle',$this->base->get_params('bdstyle')); ?>">
							<i class="fa fa-thumbs-o-up"></i> <?php echo $this->board->lang['popular']; ?>
						</a>
						<a class="btn_img fl navi_page pad" href="<?php echo str::getUrl('',__MODULEID,$this->base->get_params(__MODULEID),__ACTION,'dispBoardPlaylist','bdstyle',$this->base->get_params('bdstyle')); ?>">
							<i class="fa fa-outdent"></i> <?php echo $this->board->lang['playlist']; ?>
						</a>
						<a class="btn_img fl navi_page pad" href="<?php echo str::getUrl('',__MODULEID,$this->base->get_params(__MODULEID),'bdstyle',$this->base->get_params('bdstyle')); ?>">
							<i class="fa fa-bars"></i> <?php echo $this->board->lang['list']; ?>
						</a>
						<?php if($this->board->config->tag_view|1): ?>
							<a class="btn_img fl" href="<?php echo str::getUrl('',__MODULEID,$this->base->get_params(__MODULEID),__ACTION,'dispBoardTag','page',$this->base->get_params('page'),'bdstyle',$_GET['bdstyle']); ?>">
								<i class="fa fa-tag"></i> <?php echo $this->board->lang['taglist']; ?>
							</a>
						<?php endif; ?>
						<?php if(isset($this->board->config->singer_view) && $this->board->config->singer_view|1): ?>
							<a class="btn_img fl" href="<?php echo str::getUrl('',__MODULEID,$this->base->get_params(__MODULEID),__ACTION,'dispBoardAuthor','page',$_GET['page'],'bdstyle',$this->base->get_params('bdstyle')); ?>">
								<i class="fa fa-user"></i> <?php echo $this->board->lang['singer']; ?>
							</a>
						<?php endif; ?>
						<form method="GET" onsubmit="return procSearch(this, event)" class="boardSearchForm on">
							<input type="hidden" name="<?php echo __MODULEID; ?>" value="<?php echo $_GET[__MODULEID]?>">
							<input type="hidden" name="category" value="<?php echo $_GET['category']; ?>">
							<input type="hidden" name="page" value="1">
							<span class="btn_img itx_wrp" method="GET" no-error-return-url="true">
								<button type="submit" onclick="jQuery(this).parents('form.boardSearchForm').submit();return false;" class="ico_16px search">
									<?php echo $this->board->lang['search']; ?>
								</button>
								<label for="bd_srch_btm_itx_167325">Search</label>
								<input type="text" name="keyword" id="keyword" onkeyup="proc.autocomplete(this)" class="bd_srch_btm_itx srch_itx acInput" value="<?php echo $this->base->get_params('keyword')?>" autocomplete="off">
									<div id="autoload_related_area">
										<div id="autoload_related_list"></div>
										<div class="autoload_related_nav">
											<span id="autoload_prev_nav"></span>
											<span id="autoload_related_nav_page"></span>
											<span id="autoload_next_nav"></span>
										</div>
									</div>
								<div class="input_container">
									<ul id="search_keyword_list"></ul>
								</div>
							</span>
							<span class="btn_img select">
								<select name="type">
									<?php echo html::element('option', $this->board->lang['title'], 
									$this->base->get_params('type') == 'title' ? [
										'value' => 'title',
										'selected' => 'selected'
									]:[
										'value' => 'title'
									]);?>
									<?php echo html::element('option', $this->board->lang['tag'], 
									$this->base->get_params('type') == 'tag' ? [
										'value' => 'tag',
										'selected' => 'selected'
									]:[
										'value' => 'tag'
									]);?>
									<?php echo html::element('option', $this->board->lang['singer'], 
									$this->base->get_params('type') == 'singer' ? [
										'value' => 'artist',
										'selected' => 'selected'
									]:[
										'value' => 'artist'
									]);?>
								</select>
							</span>
						</form>
				   </div>
				   <div class="fr">
						<a class="btn_img fr" href="<?php echo str::getUrl('',__MODULEID,$_GET[__MODULEID],__ACTION,'dispBoardWrite','bdstyle',$_GET['bdstyle']); ?>">
							<i class="fa fa-pencil"></i> <?php echo $this->board->lang['write']; ?>
						</a>		
						<?php if($this->base->isAdmin()):?>
						<a class="btn_img fr" href="<?php echo str::getUrl('',__MODULEID,$_GET[__MODULEID],__ACTION,'dispBoardSetup'); ?>">
							<i class="fa fa-cog"></i> <?php echo $this->board->lang['setup']; ?>
						</a>		
						<?php endif;?>
						<a class="btn_img fr pad" onclick="proc.rand_document()"id="randmusic">
							<i class="fa fa-random" aria-hidden="true"></i> <?php echo $this->board->lang['rnddocument']; ?>
						</a>		
						<a class="btn_img fr pad" onclick="proc.rand_music()"id="randmusic">
							<i class="fa fa-play"></i> <?php echo $this->board->lang['rndsong']; ?>
						</a>		
						<a style="display:none" class="btn_img fr" id="randdownload">
							<i class="fa fa-download"></i> <?php echo $this->board->lang['download']; ?>
						</a>
						<a style="display:none" onclick="proc.playlist(this)" class="btn_img fr" id="playlist">
							<i class="fa fa-plus"></i> <?php echo $this->board->lang['playlist']; ?>
						</a>
					</div>
				</div>
				<form action="./" method="get" class="bd_pg clear">
					<input type="hidden" name="error_return_url" value="<?php echo str::getUrl(__MODULEID,$_GET[__MODULEID]); ?>">
					<fieldset method="get">
						<input type="hidden" name="md" value="<?php echo $_GET[__MODULEID]?>">
						<input type="hidden" name="category" value="">
						<input type="hidden" name="keyword" value="" autocomplete="off" class="acInput">
						<input type="hidden" name="search_target" value="">
						<a class="navi_page frst_last this" href="<?php echo str::getUrl(__MODULEID,$_GET[__MODULEID],'page',1,'srl',''); ?>" title="첫 페이지">
							1
						</a>
						<span class="pg_area">
							<?php while($this->board->page_navigation->hasNextPage()):?>
								<?php echo html::element('a', $this->board->page_navigation->getCurrentPage(), [
									'class' => sprintf("navi_page%s", ($this->board->page_navigation->isCurrentPage() ?  " current_page": "")),
									'href' => $this->board->page_navigation->getPageLink()
								]);?>
							<?php endwhile;?>
						</span>
						<a>...</a>
						<a class="navi_page" href="<?php echo str::getUrl(__MODULEID,$_GET[__MODULEID],'page',$this->board->page_count,'srl',''); ?>">
							<?php echo $this->board->page_count?>
						</a> 
				   </fieldset>
				</form>
			</div>
      </div>
   </div>
</div>