<?php if($message):?>
	<div class="message"><?php echo $message; ?></div>
<?php endif; ?>	

<div class="Body_install">
	<div class="box_top">
		DB 정보 입력
	</div>
	
	<form method="get">
	
		<input type="hidden" name="act" value="install">
		
		<div class="input_area">
			<label>DB 종류</label>
			<input style="color:#DDD" type="text" name="admin_id" value="PDO" readonly>
		</div>
		
		<div class="input_area">
			<label>관리자 아이디</label>
			<input type="text" name="admin_id" value="<?php echo $db_conn['admin_id']; ?>">
		</div>
		
		<div class="input_area">
			<label>관리자 암호</label>
			<input type="password" name="admin_password" value="<?php echo $db_conn['admin_password']; ?>">
		</div>
		
		<div class="input_area">
			<label>관리자 닉네임</label>
			<input type="text" name="admin_nickname" value="<?php echo $db_conn['admin_nickname']; ?>">
		</div>
		
		<div class="input_area">
			<label>DB 로컬호스트</label>
			<input type="text" name="localhost" value="127.0.0.1">
		</div>
		
		<div class="input_area">
			<label>DB 아이디</label>
			<input type="text" name="id" value="<?php echo $db_conn['id']; ?>">
		</div>
		
		<div class="input_area">
			<label>DB 암호</label>
			<input type="password" name="password" value="<?php echo $db_conn['password']; ?>">
		</div>
		
		<div class="input_area">
			<label>DB 이름</label>
			<input type="text" name="db" value="<?php echo $db_conn['db']; ?>">
		</div>
		
		<input class="btn_install" type="submit" value="설치">
		
	</form>
	
</div>