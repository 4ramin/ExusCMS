<?php
	if(!defined("__FLOWER__")) exit();
	$this->base->addJS("/module/base/board/music/tpl/setup.js", 'body');
	$this->base->addCSS("/module/base/board/music/tpl/setup.css");
	$this->base->addCSS("/module/base/tpl/css/setup.css");
	$tab = $this->base->get('tab');
?>

<?php if(file_exists($tab)) include($tab); ?>

<table id="documentListTable" class="x_table x_table-striped x_table-hover">
	<thead>
		<tr>
			<th scope="col" class="title">사용자 정의 이름</th>
			<th scope="col" class="title">입력항목 이름</th>
			<th scope="col" class="nowr">형식</th>
			<th scope="col" class="nowr">기본값</th>
			<th scope="col" class="nowr">필수항목</th>
		</tr>
	</thead>
	<tbody>
		<?php foreach($this->board->extralist as $key=>$val): ?>
		<tr>
			<td>
				<?php echo $val['title']; ?>
			</td>
			<td>
				<?php echo $val['val']; ?>
			</td>
			<td>
				<?php echo $val['type']; ?>
			</td>
			<td>
				<?php echo $val['default']; ?>
			</td>
			<td>
				<?php echo $val['is_need']; ?>
			</td>
		</tr>
		<?php endforeach; ?>
	</tbody>
</table>

<div class="submit_section">
	<a class="x_btn" href="/rhymix/index.php?mid=board&amp;act=dispBoardAdminExtraVars&amp;type=insertExtraForm">추가</a>
</div>