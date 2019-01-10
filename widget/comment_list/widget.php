<?php if(!defined("__FLOWER__")) exit(); ?>
<?php
class widget_cmt_list{
	
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
		$comment_list = $this->getCommentListWidget("index");
		return $comment_list;
	}
}
?>
<?php
	$widget_cmt_list = new widget_cmt_list();
	$comment_list = $widget_cmt_list->getFileListPopular_main();
?>
<div class="widget_box">
	<div class="widget_title">댓글 목록</div>
	<?php if(is_array($comment_list)): ?>
		<?php foreach($comment_list as $key=>$value): ?>
			<?php echo '<div class="ca-sub1 off"><a href="'.str::getUrl('', __MODULEID, 'index', 'srl', $value['document_srl']).' #cmt_'.$value['comment_srl'].'" class="no-sub">'.mb_substr($value['content'],0,25).'</a></div>' ?>
		<?php endforeach; ?>
	<?php endif; ?>
</div>