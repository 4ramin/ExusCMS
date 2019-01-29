<?php if(!defined("__FLOWER__")) exit();?>
<?php $this->base->addCSS("/modules/base/youtube/tpl/css/board.css"); ?>

<div>조회수 : <?php echo number_format($this->youtube->data->channelViewCounts);?></div>

<div>좋아요수 : <?php echo $this->youtube->data->channelLikeCounts;?></div>

<div>댓글수 : <?php echo $this->youtube->data->channelCommentCounts;?></div>

<div>구독자 : <?php echo number_format($this->youtube->data->channelSubscriberCounts);?></div>

<div>영상수 : <?php echo number_format($this->youtube->data->channelVideoCounts);?></div>

<ol style="margin-top: 30px;" class="bd_lst boardStyleGallery img_load clear">
<?php foreach($this->youtube->data->videoList->items as $val): ?>
	<li>
		<a href="https://www.youtube.com/watch?v=<?php echo $val->id->videoId;?>">
			<div class="thumbnailWrap">
				<?php echo html::element('img', '',
					[
						'class' => 'view_bd tmb',
						'src' => $val->snippet->thumbnails->medium->url,
						'alt' => 'image',
						'width' => $val->snippet->thumbnails->medium->width - 100,
						'height' => $val->snippet->thumbnails->medium->height - 300,
						
				]);?>
			</div>
		</a>
		<p>
			<a title="<?php echo $val->snippet->title; ?>" href="https://www.youtube.com/watch?v=<?php echo $val->id->videoId;?>">
			<?php echo html::element('b', $val->snippet->title, [
				'class' => 'title_album'
			]);?>
			</a>
		</p>
	</li>
<?php endforeach; ?>
</ol>
