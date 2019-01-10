<?php if(!defined("__FLOWER__")) exit(); ?>
<div class="list_area">

	<?php include('_header.php'); ?>

	<div class="admin_content list_content content newclearfix">
	
		<?php include('gnb.php'); ?>
		
		<div class="dashboard">
		<div class="top_dash">
			<p><?php echo $this->admin->lang['newupdate']; ?></p>
			<p><?php echo $this->admin->lang['core']; ?> 1.12 [<a href=""><?php echo $this->admin->lang['download']; ?></a>]</a>
		</div>
			<div class="widget_content">
				<section class="admin_widget ">
					<div class="widget_title">
						<i class="fa fa-user" aria-hidden="true"></i> <?php echo $this->admin->lang['member']; ?>
					</div>
					<ul class="_mul">
						<?php foreach($this->admin->member_list as $key=>$val): ?>
							<li class="widget_list"><?php echo $val['nick_name']; ?></li>
						<?php endforeach; ?>
					</ul>
				</section>
			</div>
			
			<div class="widget_content_r">
				<section class="admin_widget ">
					<div class="widget_title">
						<i class="fa fa-book" aria-hidden="true"></i> <?php echo $this->admin->lang['document']; ?> <?php echo $this->admin->document_count; ?>
					</div>
					<ul class="_mul">
						<?php foreach($this->admin->document_list as $key=>$val): ?>
							<li class="widget_list"><?php echo mb_substr($val['title'],0,50); ?>...</li>
						<?php endforeach; ?>
					</ul>
				</section>
			</div>
			
			<div class="widget_content_m">
				<section class="admin_widget ">
					<div class="widget_title">
						<i class="fa fa-comment" aria-hidden="true"></i> <?php echo $this->admin->lang['comment']; ?> <?php echo $this->admin->comment_count; ?>
					</div>
					<ul class="_mul">
						<?php foreach($this->admin->comment_list as $key=>$val): ?>
							<li class="widget_list"><?php echo mb_substr($val['content'],0,70); ?>...</li>
						<?php endforeach; ?>
					</ul>
				</section>
			</div>
		</div>
	</div>
</div>