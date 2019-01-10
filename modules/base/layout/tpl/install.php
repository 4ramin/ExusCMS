<?php if(!defined("__FLOWER__")) exit(); ?>

<body>
		<div class="content_pad" class="clearfix">
			<article class="list_box flower_content">
				<?php
					$skin = $this->base->get('skin');
					if(isset($skin)) include($skin);
				?>
			</article>
		</div>
</body>
