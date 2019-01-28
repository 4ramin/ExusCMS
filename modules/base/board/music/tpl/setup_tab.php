<?php
	if(!defined("__FLOWER__")) exit();
	$this->base->addCSS("/modules/base/board/music/tpl/css/setup.css");
	$this->base->addCSS("/modules/base/tpl/css/setup.css");
?>
<div id="tabHolder">
	<ul class="setup_tabs">
	   <li class="tabs<?php if($_GET['act']=='dispBoardSetup'):?> tab_selected<?php endif;?>"><a href="<?php echo str::getUrl('act','dispBoardSetup'); ?>">게시판 기본설정</a></li>
	   <li class="tabs<?php if($_GET['act']=='dispBoardSkinSetup'):?> tab_selected<?php endif;?>"><a href="<?php echo str::getUrl('act','dispBoardSkinSetup'); ?>">스킨 설정</a></li>
	   <li class="tabs<?php if($_GET['act']=='dispBoardCategorySetup'):?> tab_selected<?php endif;?>"><a href="<?php echo str::getUrl('act','dispBoardCategorySetup'); ?>">분류 설정</a></li>
	   <li class="tabs<?php if($_GET['act']=='dispBoardExtraSetup'):?> tab_selected<?php endif;?>"><a href="<?php echo str::getUrl('act','dispBoardExtraSetup'); ?>">확장변수 설정</a></li>
	   <li class="tabs<?php if($_GET['act']=='dispBoardGrantSetup'):?> tab_selected<?php endif;?>"><a href="<?php echo str::getUrl('act','dispBoardGrantSetup'); ?>">권한 설정</a></li>
	</ul>
</div>