<?php if(!defined("__FLOWER__")) exit(); ?>
<div class="list_area">
	<div class="content">
	
	<?php include('_header.php'); ?>
		
		<div class="admin_content list_content newclearfix">
			<?php include('gnb.php'); ?>
			<form action="./" method="post">
				<input name="<?php echo __MODULEID; ?>" type="hidden" value="<?php echo $_GET[__MODULEID]; ?>"></input>
				<input type="hidden" name="act" value="procAdminComponentsActivate">
				<table id="documentListTable" class="x_table x_table-striped x_table-hover">
					<thead>
						<tr>
							<th scope="col" class="title">플러그인</th>
							<th scope="col" class="nowr">버전</th>
							<th scope="col" class="nowr">작성자</th>
							<th scope="col" class="nowr">설치 경로</th>
							<th scope="col" class="nowr">PC</th>
							<th scope="col" class="nowr">모바일</th>
						</tr>
					</thead>
					<tbody>
						<?php foreach($this->admin->component_list as $key=>$val):?>
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
							<td>
								<input type="checkbox" name="pc[]" <?php echo $val['onPC'] == 'TRUE' ? 'checked="checked"' : ''?> value="<?php echo $val['plugin_name']?>" />
							</td>
							<td>
								<input type="checkbox" name="mobile[]" <?php echo $val['onMOBILE'] == 'TRUE' ? 'checked="checked"' : ''?> value="<?php echo $val['plugin_name']?>" />
							</td>
						</tr>
						<?php endforeach; ?>
					</tbody>
				</table>
				<button type="submit" class="x_btn x_btn-primary">저장</button>
			</form>
		</div>
	</div>
</div>