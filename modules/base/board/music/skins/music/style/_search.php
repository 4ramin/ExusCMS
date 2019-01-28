<style>
.item-section li {margin: 10px 0px;}
.box_content {
    line-height: 1.3em;
    position: relative;
}
.thumbnail_area {
    float: left;
    text-align: center;
    width: <?php echo ($this->board->config->thumbnail_width)+20;?>px;
}
li {list-style: none;}
.title_sub {line-height: 1.3;}
.title_sub p {margin:0}
.title_sub p a {color:#969292}
.thumb {position: relative;}
.box_content{clear: left;}
.box_content .title_area {overflow: hidden;position: relative}
.item-section .clearfix:after {content: '.';display: block;height: 0;visibility: hidden;clear: both;}
.item-section .title a {color: #167ac6;font-size: 17px;font-weight: normal;line-height: 1.5;}
ol {padding: 3px 0;}
</style>

<ol class="item-section">
	<?php foreach($this->board->document_list as $key=>$document): ?>
	<li>
	   <div class="box_content">
		  <div>
			 <div class="thumbnail_area">
				<a href="<?php echo str::getUrl(__MODULEID,$_GET[__MODULEID],'srl',$document->query['srl'],'cpage','') ?>">
				   <div class="thumb">
						<span>
							<img class="tmb" src="<?php echo $document->makeThumbnail(); ?>">	
						</span>
				   </div>
				</a>
			 </div>
			 <div class="title_area">
				<h3 class="title">
					<a href="<?php echo str::getUrl(__MODULEID,$_GET[__MODULEID],'srl',$document->query['srl'],'cpage','') ?>">
						<?php echo $document->query['title']; ?>
					</a>
				</h3>
				<span class="title_sub">
					<p><a><?php echo $document->getCategoryName(); ?></a></p>
					<p><a><?php echo mb_substr($document->query['album_only'],0,125); ?></a></p>
					<p><a><?php echo mb_substr($document->query['artist'],0,125); ?></a></p>
				</span>
			 </div>
		  </div>
	   </div>
	</li>
	<?php endforeach; ?>
</ol>