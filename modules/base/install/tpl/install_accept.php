<div class="Body_install">
	<div class="box_top">
		설치 동의
	</div>
	
	<div class="Readme">
		<?php
			$args = va::args();
			$args->from = __SYS."/".__COMPONENTS__.'/install/tpl/readme.txt';
			echo file::get($args);
		?>
	</div>
	
	<div class="btn_area">
		<form method="get">
			<input type="hidden" name="act" value="dispInstallAccept">
			<input class="btn_accept" type="submit" value="동의">
		</form>
	</div>
</div>