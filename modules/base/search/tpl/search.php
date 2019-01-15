<?php 
	if(!defined("__FLOWER__")) exit();
	$this->base->addCSS('/modules/base/search/tpl/css/search.css');
?>

<a class="result">검색결과 약 <?php echo $this->search->count; ?>개</a>

<ol class="item-section">
<?php foreach($this->search->search_list as $key=>$document): ?>
	<li>
	   <div class="box_content">
		  <div>
			 <div class="title_area">
				<div class="search_list">
					<?php if($document->isImageExists()):?>
						<div class="item">
							<img class="tmb_img" src="<?php echo $document->makeThumbnail('245', '125'); ?>">
							<div class="playtime">▶ <?php echo $document->getPlayTime(); ?></div>
						</div>
					<?php endif;?>
					<div>
						<h3 class="title">
							<a target="blank" href="<?php echo str::getUrl('',__MODULEID,$document->query['module'],'srl',$document->query['srl']) ?>">
								<?php echo $document->getTitle(185); ?>
							</a>
						</h3>
					</div>
					<span class="title_sub">
						<p><a class="search_info" style="color:#808080 !important"><?php echo $document->getFormatRegdate();?>. - 업로더 : 익명</a> <br/><a><?php echo strip_tags(mb_substr($document->query['content'],0,125)); ?></a></p>
					</span>
				</div>
			 </div>
		  </div>
	   </div>
	</li>
	<?php endforeach; ?>
</ol>

<form action="./" method="get" class="bd_pg clear">
	<input type="hidden" name="error_return_url" value="<?php echo str::getUrl(__MODULEID,$_GET[__MODULEID]); ?>">
	<fieldset method="get">
		<input type="hidden" name="mid" value="search">
		<input type="hidden" name="category" value="">
		<input type="hidden" name="keyword" value="" autocomplete="off" class="acInput">
		<input type="hidden" name="search_target" value="">
		<a class="navi_page frst_last this" href="<?php echo str::getUrl(__MODULEID,$_GET[__MODULEID],'page',1,'srl',''); ?>" title="첫 페이지">
			1
		</a>
		<span class="pg_area">
		<?php if(is_array($this->search->page_navigation)): ?>
			<?php foreach($this->search->page_navigation as $key=>$value): ?>
				<a class="navi_page<?php echo $_GET['page'] == $value ?  " current_page": "" ?>" href="<?php echo str::getUrl(__MODULEID,$_GET[__MODULEID],'page',$value,'srl',''); ?>"><?php echo $value?></a>
			<?php endforeach; ?>
		<?php endif;?>
		</span>
		<a>...</a>
		<a class="navi_page" href="<?php echo str::getUrl(__MODULEID,$_GET[__MODULEID],'page',$this->search->page_count,'srl',''); ?>">
			<?php echo $this->search->page_count?>
		</a> 
   </fieldset>
</form>