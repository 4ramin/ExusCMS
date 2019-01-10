<?php 
	if(!defined("__FLOWER__")) exit(); 
	$this->base->addCSS("/module/base/page/tpl/zone.css");
?>
인기 게시글
<div style="margin:15px !important" id="zonePageContent">
	<div class="widgetOutput " style="float: left; width: 500px; height: 159px;" draggable="false" id="widget_0">
		<div class="widgetResize" draggable="false" id="widget_0"></div>
		<div class="widgetResizeLeft"></div>
		<div class="widgetBorder">
			<div style="padding:0px 0px 0px 0px !important;">
				<div class="widgetContainer">
					<?php $this->base->display_widget('infiniteCarousel', 'index'); ?>
				</div>
			</div>
		</div>
	</div>
</div>

<?php if($this->base->isAdmin()):?>
<input type="submit" value="페이지 수정">
<?php endif; ?>

<script>
$('#zonePageContent').on('mousedown', resizeHandler);
widgetHandler = {};
function resizeHandler(event) {
	console.log('test');
	$.core.dragDrop.Resize.startEvent(event, 'widgetResize', 'zonePageContent');
}
</script>