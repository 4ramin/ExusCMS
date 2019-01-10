<?php if(!defined("__FLOWER__")) exit();?>
<?php $this->base->addCSS("/modules/base/board/music/tpl/music/css/board.css"); ?>
<style>
.thumb{
	position:relative;
}
.item{
    position: relative;
    float: left;
    display: flow-root;
    width: 300px;
    height: 320px;
    margin: 3px 5px;
}
.title{
	font-size:12px;
	color:#383838;
	font-weight:bold;
}
.description{
	font-size:12px;
	color:#144fda;
}
.author{
	font-size:12px;
	color:#8c1313;
}
.regdate{
	font-size:12px;
	color:#000000;
}.tmb{
	width:210px;
	height:117px
}
.boardStyleGallery .thumbnailWrap,
.boardStyleGallery .gall_style2 .thumbnailWrap{
	position:relative;
	max-width:225px;
    vertical-align: text-bottom;
}
.boardStyleGallery li{
	width:210px;
	height:100px;
	margin: 1px 1px;
}
.autor_search{
	max-width:205px;
}
.sm2_btn{
	top: 125px !important;
}
.dbt,.dbt2,.dbt3,.dbt4{
	top: 125px !important;
}
.sm360_btn{
	top: 100px !important;
}
.title_album{
	max-height: 3.2rem;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    -webkit-line-clamp: 2;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1.6rem;
}
</style>

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
