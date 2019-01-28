<?php
	if(!defined("__FLOWER__")) exit();
	$this->base->addJS("/modules/base/board/music/tpl/js/setup.js", 'body');
	$column = $this->base->get('column');
	$column_index = $this->base->get('column_index');
?>
<h1 data-bar="<?php echo $group->var->attributes()->name; ?>" class="title_setup">게시판 모듈 설정</h1>
	<div class="subtitle_setup">게시판 모듈의 기능들을 수정합니다.</div>
	<section>
		
		<div id="set_layout" class="section_value">
			<div class="label_setup">
				<label class="label_view">목록 설정</label>
			</div>
			<div style="display:inline-block">
				<select id="multiorder_show" class="multiorder_show" size="8" multiple="multiple" style="width:220px;vertical-align:top;margin-bottom:8px">
					<?php foreach($column as $val):?>
						<option value="<?php echo $val;?>"><?php echo $this->board->lang[$val];?></option>
					<?php endforeach;?>
				</select><br>
				<button type="button" class="x_btn multiorder_add" style="vertical-align:top">추가</button>
			</div>
			<div class="left_margin" style="display:inline-block">
				<select id="multiorder_selected" class="multiorder_selected" size="8" multiple="multiple" style="width:220px;vertical-align:top;margin-bottom:8px">
					<?php foreach($column_index as $val):?>
						<option value="<?php echo $val;?>"><?php echo $this->board->lang[$val];?></option>
					<?php endforeach;?>
				</select><br>
				<span class="x_btn-group">
					<button type="button" class="x_btn right_margin multiorder_up" style="vertical-align:top">위로</button>
					<button type="button" class="x_btn right_margin multiorder_down" style="vertical-align:top">아래로</button>
					<button type="button" class="x_btn right_margin multiorder_del" style="vertical-align:top">삭제</button>
					<button type="button" class="x_btn right_margin multiorder_top" style="vertical-align:top">맨위로</button>
					<button type="button" class="x_btn right_margin multiorder_bottom" style="vertical-align:top">맨아래로</button>
				</span>
			</div>
		</div>
		
		<div id="set_layout" class="section_value">
			<div class="label_setup">
				<label class="label_view">레이아웃</label>
			</div>
			<div id="opt_layout" style="margin-left:250px">
				<acronym title="사이트의 디자인을 수정합니다.">
					<select name="module_post[layout]">
						<?php foreach($this->base->getLayoutList() as $key=>$val):?>
							<option <?php echo $this->board->skin==$val ? 'selected="selected"' : ''; ?> value="<?php echo $val; ?>">
								<?php echo $val; ?>
							</option>
						<?php endforeach; ?>
					</select>
				</acronym>
			</div>
			
		</div>
		<div id="set_layout" class="section_value">
			<div class="label_setup">
				<label class="label_view">브라우져 제목</label>
			</div>
			<div id="opt_layout" style="margin-left:250px">
				<acronym title="사이트의 디자인을 수정합니다.">
					<input name="module_post[browser_title]" type="text" value="<?php echo $this->module_title ?>">
				</acronym>
			</div>
		</div>
	</section>