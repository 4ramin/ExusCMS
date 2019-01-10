<?php if(!defined("__FLOWER__")) exit(); ?>
<?php
	$this->base->addCSS("/modules/base/member/tpl/css/memberInfo.css");
?>

<div class="table">
	<table width="100%" border="1" cellspacing="0">
		<tbody>
			<tr>
				<th scope="row" style="width:150px"><em>*</em> 아이디</th>
				<td class="text">
				<?php echo $this->member->userId;?></td>
			</tr>
			<tr>
				<th scope="row" style="width:150px"><em>*</em> 닉네임</th>
				<td class="text">
					<?php echo $this->member->nickname;?>
				</td>
			</tr>
			<tr>
				<th scope="row" style="width:150px"><em>*</em> 이메일 주소</th>
				<td class="text">
					<?php echo $this->member->email;?>
				</td>
			</tr>
		</tbody>
	</table>
</div>