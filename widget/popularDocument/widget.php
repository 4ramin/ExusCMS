<?php if(!defined("__FLOWER__")) exit(); ?>
<?php
	class widgetPopularList
	{
		
		function __construct()
		{
		}
		
		function getItem()
		{
			$this->base = new base();
			
			$oBoardQuery = $this->base->getQuery('music');
			$commentList = $oBoardQuery->getPopularDocumentList("index", 2, 1, 20);
			
			$oBoardItem = $this->base->getItem('music');
			$oCommentItem = $oBoardItem->__registry($this, $commentList);
			
			$document_list = array();
			foreach($oBoardItem->query as $key=>$val)
			{
				$boarditem = new board_item($this, $val);
				$document_list[$val['srl']] = $boarditem;
			}
			
			return $document_list;
		}
	}

	$i = 0;
	$itemListCount = 2;
	$widgetClass = new widgetPopularList();
	$commentList = $widgetClass->getItem($this);
?>

<div class="widget_box">
	<div class="widget_title">인기 게시글
	
		<a href="javascript:popularLeft()">
			<i class="fa fa-angle-left"></i>
		</a>
		<a href="javascript:popularRight()">
			<i class="fa fa-angle-right"></i>
		</a>
	</div>
	<?php if(is_array($commentList)): ?>
		<div style="display: inline-flex;">
		<?php foreach($commentList as $key=>$value): ?>
			<?php $i = $i+1; ?>
			<div style="position: relative;float:left;margin: 0px;padding: 0px;overflow:hidden;<?php echo (ceil($i/$itemListCount) > 1) ? 'display:none' : ''?>" class="ca-sub1 off popularItem _el<?php echo ceil($i/$itemListCount); ?>">
				<a href="<?php echo $value->getLink(); ?>" class="no-sub">
					<img style="float:left" src="<?php echo $value->makeThumbnail(159, 130); ?>"/>
					<span style="position: absolute;color: #fff;overflow: hidden;bottom: 0px;left:0px;background-color: #000000;text-align: center;opacity: 0.7;"><?php echo $value->getTitle(25); ?></span>
				</a>
			</div>
		<?php endforeach;?>
		</div>
	<?php endif;?>
</div>


<script>
$el = 1;
function popularLeft(){
	if($el > 1){
		$el = $el -1;
		$('.popularItem').css('display','none');
		$('._el'+$el).css('display','block');
	}
};

function popularRight(){
	if($el < (Math.ceil($('.popularItem').length/<?php echo $itemListCount;?> ))){
		$el = $el +1;
		$('.popularItem').css('display','none');
		$('._el'+$el).css('display','block');
	}
};
</script>
