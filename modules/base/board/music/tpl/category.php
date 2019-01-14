<?php
	if(!defined("__FLOWER__")) exit();
	$this->base->addJS("/modules/base/board/music/tpl/function.js", 'body');
	$this->base->addJS("/modules/base/board/music/tpl/event.js", 'body');
	$this->base->addJS("/common/js/jstree.js", 'head');
	$this->base->addCSS("/common/css/jquery.simple.tree.css");
	$this->base->addCSS("/common/js/themes/default/style.css");
	
	$tab = $this->base->get('tab');
?>

<?php if(file_exists($tab)) include($tab); ?>

<input type="text" id="plugins4_q" value="" class="input">

<div id="data" class="demo"></div>

<div class="x_modal-backdrop" style="z-index: 1040; display: none;"></div>

<section class="x_modal x" id="__category_info" hidden="" style="display: none; z-index: 1041;">
	<div class="x_modal-header">
			<h1>분류</h1>
		</div>
	<form id="fo_category" action="./" method="post" class="x_form x_form-horizontal" style="margin:0">
		<input name="act" type="hidden" value="procInsertCategory"></input>
		<input name="<?php echo __MODULEID; ?>" type="hidden" value="<?php echo $_GET[__MODULEID]; ?>"></input>
		<div class="x_modal-body">
			<div id="__parent_category_info" class="x_control-group" style="display: none;">
				<label class="x_control-label">상위 카테고리 명</label>
				<div class="x_controls">
					<span id="__parent_category_title" style="display:inline-block;padding:3px 0 0 0"></span>
				</div>
			</div>
			<div class="x_control-group" style="border-top: 0px;">
				<label class="x_control-label" for="name">분류 명</label>
				<div class="x_controls">
					<span class="g11n x_input-append">
						<input type="text" class="lang_code" name="name" id="name" value="">
					</span>
				</div>
			</div>
			<div class="x_control-group" style="border-top: 0px;">
				<label class="x_control-label" for="type">분류 유형</label>
				<div class="x_controls">
					<span class="g11n x_input-append">
						<input type="text" class="lang_code" name="type" id="type" value="">
					</span>
				</div>
			</div>
		</div>
		<div class="x_modal-footer">
			<button id="closeCategoryNodes" type="button" class="x_btn x_pull-left" data-hide="#__category_info">닫기</button>
			<button type="submit" class="x_btn x_btn-primary x_pull-right">저장</button>
		</div>
	</form>
</section>

<div class="submit_section">
	<button type="button" class="x_btn" id="addCategoryNodes">추가</button>
</div>