<?php if(!defined("__FLOWER__")) exit(); ?>
<?php
	$base = new base();
	$base->addCSS('/widget/admin/css/basic.css');
?>
<?php if($_SESSION['is_logged']):?>
	<div class="widget_box">
		<p class="admin_widget"><i class="fa fa-database" aria-hidden="true"></i> 메모리 점유율 : <?php echo file::filesize_format(memory_get_usage(true)); ?></p>
		<p class="admin_widget"><i class="fa fa-file" aria-hidden="true"></i> 디스크 여유공간 : <?php echo file::filesize_format(disk_free_space("/")); ?></p>
		<p class="admin_widget"><i class="fa fa-tasks" aria-hidden="true"></i> 요청속도 : <?php echo __RequireTime__; ?> Seconds</p>
	</div>
<?php endif;?>