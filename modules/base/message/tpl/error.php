<?php if(!defined("__FLOWER__")) exit(); ?>
<?php
	if(!defined("__FLOWER__")) exit();
	$this->base->addCSS("/modules/base/message/tpl/css/message.css");
?>

<script type="text/javascript">
function goback() {
    history.go(-1);
}
</script>

<div class="errorMsg">
	<img src="library\img\cmt.png">
	<?php echo html::element('h1',
		$this->base->get('errorMsg')
	, []);?>
	<div class="backTrace">
	<?php foreach($this->base->get('backTrace') as $key=>$val): ?>
		<?php echo html::element('p',
			$val['file'].'('.$val['line'].') > '.$val['function']
		, []);?>
	<?php endforeach;?>
	</div>
	<a href="javascript:goback();" class="e_btn"><span>뒤로가기</span></a>
</div>
