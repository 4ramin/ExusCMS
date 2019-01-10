<?php if(!defined("__FLOWER__")) exit(); ?>
<?php
	$this->base->addJS("/modules/base/member/tpl/js/base.js");
	$this->base->addCSS("/modules/base/member/tpl/css/login.css");
?>

<div class="list_area login_form">
	<form action="index.php" method="post">
		<input type="hidden" name="act" value="procBoardLogin">
		<input type="hidden" name="return_url" value="<?php echo $this->member->return_url; ?>">
		<input type="hidden" name="md" value="<?php echo $_GET['md']; ?>">
		<div class="login_title">로그인</div>
		<div class="ctr_area">
			<div class="controls">
				<input type="text" name="user_id" id="user_id" placeholder="아이디" value="" required="">
			</div>
		</div>
		
		<div class="ctr_area">
			<div class="controls">
				<input type="password" name="password" id="password" placeholder="비밀번호" value="" required="">
			</div>
		</div>
	</form>
	<div class="submit">
		<input type="submit" onclick="javascript:login_instance();" value="로그인">
	</div>
</div>