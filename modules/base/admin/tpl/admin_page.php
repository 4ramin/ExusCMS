<?php if(!defined("__FLOWER__")) exit(); ?>

<body>

<!--content-->
<div>
	<div class="content_pad">
		<div class="list_box content">
			<?php
				$skin = $this->base->get('skin');
				if(isset($skin)) include($skin);
			?>
		</div>
	</div>
</div>
</body>
