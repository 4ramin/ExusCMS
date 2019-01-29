<style>
.bd_tmb_lst li {width: <?php echo ($this->board->config->thumbnail_width)+10;?>px;height: <?php echo ($this->board->config->thumbnail_height)+80;?>px;}
</style>

<script>
jQuery(function($){
	board('#bd_3190_0');
});
</script>

<ol class="bd_lst bd_tmb_lst gall_style img_load tmb_bg clear">
   <?php foreach($this->board->result as $key=>$document): ?>
   <?php $this_file = $this->board->model->getFileList($document['srl']); ?>
   <li>
      <div class="tmb_wrp ribbon_v fin_load">
		<i class="bg fixed"></i>
		<i class="bg2 fixed"></i>
		<img class="ie8_only shadow" src="module/base/board/music/skins/music/img/ie/shadow.png" alt="">
		<?php foreach($this_file as $key=>$flst): ?>
			<?php if(maya::execute('@\@+.+!jpg||png||gif||jpeg!', $flst['files'],'boolean')):?>
				<img class="tmb" src="<?php echo $this->base->makeThumbnail($flst['files'], $document['srl'], $this->board->config->thumbnail_width, $this->board->config->thumbnail_height)?>" alt="">	
			<?php endif;?>
		<?php endforeach; ?>	 
		<span class="ribbon nnu new">
			<i><?php echo $this->board->model->getCategoryNamebysrl($document['category']); ?></i>
		</span>
		<div class="trans_window fixed"></div>
		<a class="hx fixed" href="<?php echo str::getUrl(__MODULEID, $_GET[__MODULEID], 'srl', $document['srl'], 'cpage', '') ?>">
			<span class="info_wrp">
				<span class="info st3">
					<span class="padding">
					by <b><?php echo $document['nick_name'];?></b><br>
					in <b><?php echo $this->board->model->getCategoryNamebysrl($document['category']);?></b><br>
						<span>
							Views <b><?php echo $document['readed']; ?></b>&nbsp;
							Likes <b><?php echo $document['voted']; ?></b>
						</span>
					Replies <b>16</b>
					</span>
				</span>
			</span>		
		</a>
         <i class="ico_32px deco1 fixed"></i>
		 <i class="ico_32px deco2 fixed"></i>					
      </div>
      <p>
         <b><?php echo mb_substr($document['title'], 0, $this->board->config->title_length); ?></b>
      </p>
   </li>
   <?php endforeach; ?>
</ol>