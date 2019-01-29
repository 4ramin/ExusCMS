<?php if(!defined("__FLOWER__")) exit(); ?>
<?php $this->base->addCSS("/module/base/board/music/skins/music/css/author.css"); ?>

<div class="list_area" style="background-color:#fff !important">
<?php foreach($this->board->result as $key=>$value): ?>
	<div class="tags">
		<?php echo html::element('a', $value['artist'], [
			'style' => 'color:black;margin:auto',
			'href' => str::getUrl('',__MODULEID,$_GET[__MODULEID],__ACTION,'search','type','artist','keyword',$value['artist'],'page',1)
		]);?>
	</div>
<?php endforeach; ?>
</div>