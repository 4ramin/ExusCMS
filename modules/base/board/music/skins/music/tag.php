<?php if(!defined("__FLOWER__")) exit(); ?>
<?php
	$this->base->addCSS("/module/base/board/music/skins/music/css/tag.css");
?>
<div class="list_area" style="background-color:#fff !important">
	<?php foreach($this->board->tag_list as $key=>$value): ?>
		<div class="tags">
			<a style="color:black;margin:auto" href="<?php echo str::getUrl('',__MODULEID,$_GET[__MODULEID],__ACTION,'dispBoardTagList','page',1,'tag',$value['tag'],'page',1) ?>">
			<div style="float:left;">
			<?php
			if($value['thumb']!=""){
				echo '<img src=library/image/thumb/'.$value['thumb'].'></img>';
			}else{
				echo '<div class=none></div>';
			}
			?>
			</div>
			
			<?php echo $value['tag']; ?>
			</a>
		</div>
	<?php endforeach; ?>
</div>
