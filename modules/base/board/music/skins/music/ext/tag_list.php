<?php if(!defined("__FLOWER__")) exit(); ?>
<div style="margin:1px 5px 10px 5px;">
	<span style="margin-left:10px">
		<i style="background:url(common/img/ico_tag.gif);width: 25px;height: 12px;display: block;float: left;"></i>
		<?php
			echo html::element('a', $this->board->oDocument->getTag(), [
				'class' => 'tag_relative',
				'href' => $this->board->oDocument->getTagLink()
			]);
		?>
	</span>
</div>