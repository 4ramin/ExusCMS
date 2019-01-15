<?php if(!defined("__FLOWER__")) exit(); ?>

<div style="<?php echo $this->board->config->tmp_hide_related==1 ? 'display:none':''?>" id="rel_ar">
	<div id="relatedDocumentList">
		<?php echo html::element('div', $this->board->lang['related_doc']."(".$this->board->relatedTagList->page_count.")", [
			'class' => 'title'
		]);?>
		<div id="related_list">
			<?php foreach($this->board->relatedTagList->related_tag_list as $tags): ?>
				<li class="relatedDocumentItem">
					<?php echo html::element('a', $tags->getTitle(), 
					$tags->isCurrentItem() ? [
						'class' => 'view_bd',
						'style' => 'color:red',
						'href' => $tags->getTagLink()
					]:[
						'class' => 'view_bd',
						'href' => $tags->getTagLink()
					]);?>
					
					 <div class="fr wrapper">	
						<a href="<?php echo $tags->getAudioLink();?>" class="sm2_button" ></a><div class="tooltip">재생</div>
					</div>
				</li>
			<?php endforeach; ?>
		</div>
		<div class="relatedNavigation">
			<span id="prev_nav">
				<?php echo html::element('a', "◀", [
					'onclick' => 'proc.lst_related('.html::generateParameter([
						request::encodeBinaryNumberic($this->board->relatedTagList->currentTagIndex - 5), $this->board->document['tag'], $_GET[__MODULEID], $_GET['srl']
					]).")"
				]);?>
			</span>
			
			<span id="related_nav_page">
				<?php foreach($this->board->relatedTagList->pagenation as $key=>$pageNum): ?>
					<?php echo html::element('a', $pageNum, $this->board->relatedTagList->current_page == $pageNum ?
					[
						'onclick' => 'proc.lst_related('.html::generateParameter([
							request::encodeBinaryNumberic(($pageNum - 1) * 5), $this->board->document['tag'], $_GET[__MODULEID], request::encodeBinaryNumberic($_GET['srl'])
						]).")",
						'style' => 'color:red'
					]:
					[
						'onclick' => 'proc.lst_related('.html::generateParameter([
							request::encodeBinaryNumberic(($pageNum - 1) * 5), $this->board->document['tag'], $_GET[__MODULEID], request::encodeBinaryNumberic($_GET['srl'])
						]) .")"
					]);?>
					
					<span class="bar">|</span> 
				<?php endforeach; ?>
			</span>
			
			<span id="next_nav">
				<?php echo html::element('a', "▶", [
					'onclick' => 'proc.lst_related('.html::generateParameter([
						request::encodeBinaryNumberic($this->board->relatedTagList->currentTagIndex + 5), $this->board->document['tag'], $_GET[__MODULEID], $_GET['srl']
					]) .")"
				]);?>
			</span>
		</div>
	</div>
</div>

<div style="padding: 10px;"></div>