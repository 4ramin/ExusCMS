<?php 
	if(!defined("__FLOWER__")) exit(); 
	if(!isset($this->board->config->image_viewer) || $this->board->config->image_viewer=='lightbox'){
		$this->base->addJS("/module/base/board/music/tpl/music/js/lightbox/lightbox.js");
		$this->base->addCSS("/module/base/board/music/tpl/music/css/lightbox/lightbox.css");
	}elseif($this->board->config->image_viewer=='imageviewer'){
		$this->base->addJS("/module/base/board/music/tpl/music/js/imageviewer/imageviewer.min.js");
		$this->base->addCSS("/module/base/board/music/tpl/music/css/imageviewer/imageviewer.css");
	}elseif($this->board->config->image_viewer=='fancybox'){
		$this->base->addJS("/module/base/board/music/tpl/music/js/Fancybox/jquery.fancybox.js");
		$this->base->addCSS("/module/base/board/music/tpl/music/css/Fancybox/fancybox.css");
	}elseif($this->board->config->image_viewer=='viewer'){
		$this->base->addJS("/module/base/board/music/tpl/music/js/viewer/viewer.js");
		$this->base->addCSS("/module/base/board/music/tpl/music/css/viewer/viewer.css");
	}
?>
<div class="documentAjax">
	<div class="bd_hd">
		<div class="bd_bc">
			<strong>
				<?php echo html::element('a', 'Home', [
					'href' => '/'
				]);?>
			</strong>
			<?php echo html::element('i', '', [
				'class' => 'fa fa-angle-right'
			]);?>
			<em>
				<?php echo html::element('a', $this->module_title, [
					'href' => str::getUrl('', __MODULEID, $_GET[__MODULEID], 'srl', $this->query['srl'])
				]);?>
			</em>
			<?php echo html::element('i', '', [
				'class' => 'fa fa-angle-right'
			]);?>
		</div>
	</div>
	<div id="content_view" class="list_area contentArea">
		<div class="documentContent">
			<div class="documentArea">
				<h1 class="h1_title">
					<?php echo html::element('a', $this->board->oDocument->getTitle(), [
						'href' => $this->board->oDocument->getDocumentLink(),
						'data-pjax' => 'true'
					]);?>
					
					<?php echo html::element('span', html::element('a', $this->board->oDocument->getFormatRegdate(), []), [
						'class' => 'regdateArea'
					]);?>
				</h1>
				
				<div class="title title_top">
					<span class="side">
						<?php echo html::element('span', $this->board->oDocument->getNickName(), [
							'class' => 'highlight'
						]);?>
						<span><a onclick="$('.extra_vars').Toggle();"><i class="fa fa-folder-open" aria-hidden="true"></i> <?php echo $this->board->lang['extravar']; ?></a></span>
						<span><a onclick="$('#rel_ar').Toggle();"><i class="fa fa-ticket" aria-hidden="true"></i> <?php echo $this->board->lang['related_doc']; ?></a></span>
					</span>
					<span class="side fr">
						<span><b>조회 수</b></span>
						<?php echo html::element('span', $this->board->oDocument->getReadedCount(), [
							'class' => 'highlight'
						]);?>
						<span><b>추천 수</b></span>
						<?php echo html::element('span', $this->board->oDocument->getVotedCount(), [
							'class' => 'highlight'
						]);?>
					</span>
				</div>
			</div>
			
			<div class="linkableArea">
				<?php echo html::element('a', $this->board->oDocument->getDocumentLink(), [
					'href' => $this->board->oDocument->getDocumentLink(),
					'class' => 'documentLink'
				]);?>
			</div>
			
			<?php include('ext/extravar.php'); ?>
			
			<?php echo html::element('article', $this->board->oDocument->getContent(), [
				'id' => 'flower_space'
			]);?>
			
			<?php
				if($this->board->config->related_view!=1){
					if($this->board->oDocument->isTagExists()){
						include('ext/related_doc.php');
					}
				}
			?>
			
			<?php 
				include('ext/vote.php');
				if($this->board->config->tag_show!=1){
					include('ext/tag_list.php');
				}
				
				if($this->board->config->download_show!=1){
					include('ext/file_list.php');
				}
			?>
			
			<div style="display: inline-block;width: 100%;" class="">
				<?php if($this->board->config->show_sns==1):?>
					<div style="padding: 18px 0px;height: 55px;float:left">
						<a style="float:left" onclick="$.core.SNS.twitter(<?php echo http::generateParameter($this->board->oDocument->getSNSLink(), $this->board->oDocument->getTitle()); ?>)">
							<div class="twitter_sns"><i class="fa fa-twitter"></i></div>
						</a>
						<a style="float:left" onclick="$.core.SNS.googlePlus(<?php echo http::generateParameter($this->board->oDocument->getSNSLink(), $this->board->oDocument->getTitle()); ?>)">
							<div class="googleplus_sns"><i class="fa fa-google-plus"></i></div>
						</a>
						<a style="float:left" onclick="$.core.SNS.pinterest(<?php echo http::generateParameter($this->board->oDocument->getSNSLink(), $this->board->oDocument->getTitle()); ?>)">
							<div class="pinterest_sns"><i class="fa fa-pinterest" aria-hidden="true"></i></div>
						</a>
					</div>
				<?php endif;?>
				
				<div style="display: inline-flex;" class="navigation">
					<?php echo html::element('a', '수정', [
						'href' => str::getUrl('', __ACTION, 'dispBoardModify', __MODULEID, $_GET[__MODULEID], 'srl', $this->board->oDocument->query['srl'])
					]);?>
					<?php echo html::element('a', '삭제', [
						'href' => str::getUrl('', __ACTION, 'dispBoardDelete', __MODULEID, $_GET[__MODULEID], 'srl', $this->board->oDocument->query['srl'])
					]);?>
				</div>
				
			</div>
			
			<?php 
				if($this->board->config->hide_comment!=1){
					include('ext/comment.php');
				}
			?>
			<div style="padding: 10px;"></div>
		</div>
	</div>
</div>