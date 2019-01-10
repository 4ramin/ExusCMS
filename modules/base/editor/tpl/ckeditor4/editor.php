<?php
	$this->base->addCSS("/modules/base/editor/tpl/ckeditor4/editor.css", 'head');
	$this->base->addJS("/modules/base/editor/tpl/ckeditor4/ckeditor.js", 'head');
	$this->base->addJS("/modules/base/editor/tpl/ckeditor4/autogrow.min.js", 'head');
	$this->base->addJS("/modules/base/editor/tpl/ckeditor4/js/init.js", 'body');
	$this->base->addJS("/modules/base/editor/tpl/ckeditor4/js/callback.js", 'body');
	$this->base->addJS("/modules/base/editor/tpl/ckeditor4/js/function.js", 'body');
	$this->base->addJS("/modules/base/editor/tpl/ckeditor4/js/fileuploader.js", 'body');
	$this->base->addJS("/common/js/fileuploadJS/js/jquery.fileupload.js", 'head');
?>

<?php echo html::element('textarea', '', [
	'name' => 'editor',
	'id' => 'editor',
]);?>

<div id="progress">
	<span class="progress-bar" style="display:none;"></span>
</div>

<div class="uploadZone">
	<span class="fileUploadArea">
		파일 업로드
		<?php echo html::element('input', '', [
			'id' => 'fileupload',
			'type' => 'file',
			'name' => 'upload',
			'multiple' => '',
		]);?>
	</span>
	
	<span id="fileList" style="display:none">
		<?php echo html::element('ul', '', [
			'id' => 'uploadedFile',
		]);?>
	</span>
</div>

<div class="editOpt" style="display:none">
	<?php echo html::element('input', '', [
		'class' => 'removeAllFiles',
		'type' => 'button',
		'name' => 'upload',
		'value' => '전체 삭제',
	]);?>
	<?php echo html::element('input', '', [
		'class' => 'insertAllImageToContent',
		'type' => 'button',
		'name' => 'upload',
		'value' => '전체 삽입',
	]);?>
	<?php echo html::element('input', '', [
		'class' => 'unsetSelectedItem',
		'type' => 'button',
		'name' => 'upload',
		'value' => '전체 선택 해제',
	]);?>
	<?php echo html::element('input', '', [
		'class' => 'insertImageToContent',
		'type' => 'button',
		'name' => 'upload',
		'value' => '본문 삽입',
	]);?>
</div>