<?php if(!defined("__FLOWER__")) exit(); ?>
<?php
	$this->base->addCSS("/modules/base/member/tpl/css/signin.css");
?>

<div class="list_area signinform">
	<div class="signin_title">회원가입</div>
	<form action="index.php" method="POST">
		<input type="hidden" name="mid" value="member">
		<input type="hidden" name="act" value="procBoardOAuthSignin">
		<div class="pad_alert">
			<div class="alert_area">
				<div class="alert">
	① 정보주체는 Exus CMS에 대해 언제든지 개인정보 열람,정정,삭제,처리정지 요구 등의 권리를 행사할 수 있습니다.<br/>
	② 제1항에 따른 권리 행사는 Exus CMS에 대해 개인정보 보호법 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 Exus CMS은(는) 이에 대해 지체 없이 조치하겠습니다.<br/>
	③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.<br/>
	④ 개인정보 열람 및 처리정지 요구는 개인정보보호법 제35조 제5항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.<br/>
	⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.<br/>
	⑥ Exus CMS은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.<br/>
				</div>
			</div>
		</div>
		
		<div class="ctr_area">
			<label for="email"><em style="color:red">*</em> 이메일 </label>
			<div class="controls">
				<input type="text" name="email" id="email" value="<?php echo $this->member->email; ?>" required="" readonly>
			</div>
		</div>
		
		<div class="ctr_area">
			<label for="user_id"><em style="color:red">*</em> 닉네임 </label>
			<div class="controls">
				<input type="text" name="nickname" id="nickname" value="<?php echo $this->member->nickname; ?>" required="">
			</div>
		</div>
		
		<div class="ctr_area">
			<label for="password"><em style="color:red">*</em> 비밀번호 </label>
			<div class="controls">
				<input type="password" name="password" id="password" value="" required="">
			</div>
		</div>
		
		<div class="submit">
			<input type="submit" value="가입">
		</div>
	</form>
</div>