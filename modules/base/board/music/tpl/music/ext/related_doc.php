<?php if(!defined("__FLOWER__")) exit(); ?>

<!--related tag-->
<?php
	$oFilesModel = $this->base->getModel('files');
?>


<div style="<?php echo $this->board->config->tmp_hide_related==1 ? 'display:none':''?>" id="rel_ar">
	<div id="relatedDocumentList">
		<div class="title">
			<?php echo $this->board->lang['related_doc']; ?>(<?php echo $this->board->relatedTagList->page_count; ?>)
		</div>
		<div id="related_list">
			<?php foreach($this->board->relatedTagList->related_tag_list as $tags): ?>
				<li class="relatedDocumentItem">
					<a class="view_bd" <?php echo $tags->isCurrentItem() ? 'style="color:red"':''?> href="<?php echo $tags->getTagLink() ?>">
						<?php echo $tags->getTitle()?>
					</a>
					
					 <div class="fr wrapper">	
						<a href="<?php echo $tags->getAudioLink();?>" class="sm2_button" ></a><div class="tooltip">재생</div>
					</div>
				</li>
			<?php endforeach; ?>
		</div>
		<div class="relatedNavigation">
			<span id="prev_nav">
				<a onclick="proc.lst_related('<?php echo request::encodeBinaryNumberic($oTagi-5); ?>','<?php echo $this->board->document['tag'] ?>','<?php echo $_GET[__MODULEID]?>','<?php echo $_GET['srl']?>')">◀</a>
			</span>
			
			<span id="related_nav_page">
				<?php foreach($this->board->relatedTagList->pagenation as $key=>$pageNum): ?>
					<a onclick="proc.lst_related('<?php echo request::encodeBinaryNumberic(($pageNum-1)*5); ?>','<?php echo $this->board->document['tag'] ?>','<?php echo $_GET[__MODULEID]?>','<?php echo request::encodeBinaryNumberic($_GET['srl']); ?>')" <?php echo ($this->board->relatedTagList->current_page==$pageNum) ? 'style="color:red"':'' ?>><?php echo $pageNum?></a> <span class="bar">|</span> 
				<?php endforeach; ?>
			</span>
			
			<span id="next_nav">
				<a onclick="proc.lst_related('<?php echo request::encodeBinaryNumberic($oTagi+5); ?>','<?php echo $this->board->document['tag'] ?>','<?php echo $_GET[__MODULEID]?>','<?php echo $_GET['srl']?>')">▶</a>
			</span>
		</div>
	</div>
</div>

<div style="padding: 10px;"></div>