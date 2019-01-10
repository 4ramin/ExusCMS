<?php if(!defined("__FLOWER__")) exit(); ?>
<?php
	$this->base->addJS("/modules/base/member/tpl/js/base.js");
	$this->base->addJS("/modules/base/member/tpl/js/button.js");
	$this->base->addCSS("/modules/base/member/tpl/css/button.css");
	$this->base->addCSS("/modules/base/member/tpl/css/login.css");
	$this->base->addCSS("/modules/base/member/tpl/css/playlist.css");
?>

<ul id="playlist">
<?php foreach($this->member->playlist as $data):?>
	<li data-item="<?php echo $data['srl'];?>">
		<?php foreach($data['file'] as $key => $fileInfo):?>
			<?php if(preg_match('/\.(mp3|mp4|wav)(?:[\?\#].*)?$/i', $fileInfo['files'], $matches)):?>
				<?php echo $fileInfo['origin']; ?>
			<?php endif;?>
		<?php endforeach;?>
			<div class="sm2_btn wrapper">	
				<?php foreach($data['file'] as $key=>$fileInfo): ?>
					<?php if(maya::execute('@\||/@+.+!mp3||wav!', $fileInfo['files'],'boolean')):?>
						<?php echo html::element('a', '', [
							'href' => sprintf("%s%s%s/%s", __SUB, __FILE__ATTACH, $fileInfo['target'], $fileInfo['files']),
							'class' => 'sm2_button'
						]);?>
						<?php echo html::element('div', $this->board->lang['play'], [
							'href' => sprintf("%s%s%s/%s", __SUB, __FILE__ATTACH, $fileInfo['target'], $fileInfo['files']),
							'class' => 'tooltip'
						]);?>
					<?php endforeach;?>
				 <?php endforeach; ?>
			</div>
		<div class="left_zone">
			<a class="c_pointer" onclick="removePlaylist(<?php echo $data['srl']; ?>)"><i class="fa fa-eraser" aria-hidden="true"></i> 삭제</a>
		</div>
	</li>
<?php endforeach;?>
</ul>