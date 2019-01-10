<?php 
	if(!defined("__FLOWER__")) exit(); 
?>

<form action="./" method="POST" class="context_message">
	<input type="hidden" name="<?php echo __MODULEID; ?>" value="<?php echo $_GET[__MODULEID]?>">
	<input type="hidden" name="srl" value="<?php echo $_GET['srl']?>">
	<input type="hidden" name="act" value="deleteDocument">
	<h1>이 게시물을 삭제하시겠습니까?</h1>
	<div class="btnArea">
		<input class="bd_btn blue" type="submit" value="삭제">
		<button class="bd_btn" type="button" onclick="history.back()">취소</button>
	</div>
</form>