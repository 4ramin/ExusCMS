<?php if(!defined("__FLOWER__")) exit(); ?>
<?php
class widgetCommentList{
	
	function __construct()
	{
	}
	
	function getCommentListWidget($get_board)
	{
		return db::Query('SELECT','def_comment',[
			['', 'module', '=', ':args1', $get_board],
			['LIMIT', '1', '10']
		],'*', 'all');
	}
	
	function getFileListPopular_main()
	{
		$commentList = $this->getCommentListWidget("index");
		return $commentList;
	}
}
?>
<?php
	$widgetCommentList = new widgetCommentList();
	$commentList = $widgetCommentList->getFileListPopular_main();
	if(!is_array($commentList) || !$commentList) return;
?>
<div class="widget_box">
	<div class="widget_title">
		댓글 목록
	</div>
	<?php foreach($commentList as $key=>$value): ?>
		<div class="ca-sub1 off">
			<?php echo html::element('a', mb_substr($value['content'],0,15), [
				'href' => sprintf("%s #cmt_%s", str::getUrl('',__MODULEID,'index','srl',$value['document_srl']), $value['comment_srl'])
			]);?>
		</div>
	<?php endforeach; ?>
</div>