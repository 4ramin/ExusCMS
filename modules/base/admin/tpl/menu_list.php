<?php if(!defined("__FLOWER__")) exit(); ?>
<div class="list_area">
	<div class="content">
	
	<?php include('_header.php'); ?>
	
	<div class="admin_content list_content newclearfix">
		<?php include('gnb.php'); ?>
		
			
		<table id="documentListTable" class="x_table x_table-striped x_table-hover">
			<thead>
				<tr>
					<th scope="col" class="title">모듈</th>
					<th scope="col" class="nowr">버전</th>
					<th scope="col" class="nowr">작성자</th>
					<th scope="col" class="nowr">설치 경로</th>
				</tr>
			</thead>
			<tbody>
				<?php foreach($this->admin->plugin_list as $key=>$val):?>
				<tr>
					<td>
						<div>
							<?php echo $val['title']?>
						</div>
						<?php echo $val['description']?>
					</td>
					<td>
						<?php echo $val['version']?>
					</td>
					<td>
						<?php echo $val['author']?>
					</td>
					<td>
						<?php echo $val['installed_dir']?>
					</td>
				</tr>
				<?php endforeach; ?>
			</tbody>
		</table>
	</div>
	</div>
</div>