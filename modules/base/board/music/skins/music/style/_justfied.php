<div class="justed_galler">
   <?php foreach($this->board->result as $key=>$value): ?>
   <?php $this_file = $this->board->model->getFileList($value['srl']); ?>
   <div class="justified">
		<div>
			<a class="hx fixed" href="<?php echo str::getUrl(__MODULEID,$_GET[__MODULEID],'srl',$value['srl'],'cpage','') ?>">
				<?php foreach($this_file as $key=>$flst): ?>
					<?php if(maya::execute('@\@+.+!jpg||png||gif||jpeg!', $flst['files'],'boolean')):?>
						<img class="tmb" src="<?php echo $this->base->makeThumbnail($flst['files'],$value['srl'],$this->board->config->thumbnail_width, $this->board->config->thumbnail_height,'ratio')?>" alt="">	
					<?php endif;?>
					
				<?php endforeach; ?>	
			</a>		
		</div>
   </div>
   <?php endforeach; ?>
</div>
<script>
$(".justed_galler").justifiedGallery({rowHeight: <?php echo ($this->board->config->thumbnail_height);?>, margins: 0});
</script>