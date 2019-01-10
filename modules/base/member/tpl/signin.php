<?php if(!defined("__FLOWER__")) exit(); ?>
<?php
	$this->base->addCSS("/modules/base/member/tpl/css/signin.css");
?>

<div class="list_area signinform">
	<div class="signin_title">회원가입</div>
	<form action="index.php" method="POST">
		<input type="hidden" name="mid" value="member">
		<input type="hidden" name="act" value="procBoardSignin">
		
		<div class="alert_title">
		개인정보취급방침	(필수)
		</div>
		<div class="pad_alert">
			<div class="alert_area">
				<div class="alert">
				정보주체와 법정대리인의 권리∙의무 및 행사방법<br/><br/>
	① 정보주체는 Exus CMS에 대해 언제든지 개인정보 열람,정정,삭제,처리정지 요구 등의 권리를 행사할 수 있습니다.<br/>
	② 제1항에 따른 권리 행사는 Exus CMS에 대해 개인정보 보호법 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 Exus CMS은(는) 이에 대해 지체 없이 조치하겠습니다.<br/>
	③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.<br/>
	④ 개인정보 열람 및 처리정지 요구는 개인정보보호법 제35조 제5항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.<br/>
	⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.<br/>
	⑥ Exus CMS은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.<br/><br/>
	마. 개인정보의 파기<br/><br/>
1. 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.<br/>
2. 정보 주체로부터 동의 받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음 에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.<br/>
3. 개인정보 파기의 절차 및 방법은 다음과 같습니다.<br/>
(1) 파기절차<br/><br/>
회사는 파기 사유가 발생한 개인정보를 선정하고, 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.<br/><br/>

(2) 파기방법<br/>
회사는 전자적 파일 형태로 기록․저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록․저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.<br/><br/>

				</div>
				
				<label for="accept_agreement_1">
					<input type="checkbox" name="accept_agreement[1]" value="Y" id="accept_agreement_1">
					위의 내용을 모두 읽었으며 동의합니다.
				</label>
			</div>
		</div>
		
		<div class="alert_title">
		회원 가입 약관	(필수)
		</div>
		<div class="pad_alert">
			<div class="alert_area">
				<div class="alert">
				① 서비스 약관(이하 "본 약관"이라 합니다)은 이용자가 본 사이트에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 합니다)를 이용함에 있어 이용자와 상호 권리·의무 및 책임사항을 규정함을 목적으로 합니다. <br/>
② 이용자가 되고자 하는 자가 "개드립"에서 정한 소정의 절차를 거쳐서 "약관동의" 단추를 누르면 본 약관에 동의하는 것으로 간주합니다. 본 약관에 정하는 이외의 이용자와 상호 권리, 의무 및 책임사항에 관해서는 전기통신사업법 기타 대한민국의 관련 법령과 상관습에 의합니다. <br/><br/>

	입력한 이메일로 ﻿인증 메일이 발송 되니 정확하게 입력해 주세요.<br/>
인스턴트 메일과 중복 가입은 허용하지 않습니다.<br/><br/>재판관할<br/>
이용자간에 발생한 서비스 이용에 관한 분쟁에 대하여는 대한민국 법을 적용하며, 본 분쟁으로 인한 소는 민사소송법상의 관할을 가지는 대한민국의 법원에 제기합니다.
				</div>
				
				<label for="accept_agreement_2">
					<input type="checkbox" name="accept_agreement[2]" value="Y" id="accept_agreement_2">
					위의 내용을 모두 읽었으며 동의합니다.
				</label>
			</div>
		</div>
		
		<div class="alert_title">
		회원 가입 정보
		</div>
		
		<div class="mInfoArea">
			<div class="ctr_area">
				<label for="email"><em style="color:red">*</em> 이메일 </label>
				<div class="controls">
					<input type="text" name="email" id="email" value="" required="">
				</div>
				<span class="help_line">인증 메일이 발송되오니 정확하게 입력해 주시기 바랍니다.</span>
			</div>
			
			<div class="ctr_area">
				<label for="user_id"><em style="color:red">*</em> 아이디 </label>
				<div class="controls">
					<input type="text" name="user_id" id="user_id" value="" required="">
				</div>
			</div>
			
			<div class="ctr_area">
				<label for="password"><em style="color:red">*</em> 비밀번호 </label>
				<div class="controls">
					<input type="password" name="password" id="password" value="" required="">
				</div>
			</div>
			
			<div class="ctr_area">
				<label for="passwordchk"><em style="color:red">*</em> 비밀번호 확인 </label>
				<div class="controls">
					<input type="password" name="passwordchk" id="passwordchk" value="" required="">
				</div>
			</div>
			
			<div class="ctr_area">
				<label for="user_id"><em style="color:red">*</em> 닉네임 </label>
				<div class="controls">
					<input type="text" name="nickname" id="nickname" value="" required="">
				</div>
			</div>
		</div>
		
		<div class="submit">
			<input type="submit" value="가입">
		</div>
	</form>
</div>