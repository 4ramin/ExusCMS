<?php if(!defined("__FLOWER__")) exit(); ?>
<div id="comment_padding">
	<div id="comment_page">
		<span onclick="$('#comment_padding ul').toggle();" class="commentCount">
			<i class="fa fa-comments-o"></i> <?php echo $this->board->lang['comment']; ?> (<?php echo $this->board->comment_count; ?>)
		</span>
	</div>

	<ul style="border: 1px solid #eee;margin:0;padding:0;<?php echo $this->board->config->tmp_hide_comment==1 ? 'display:none':''?>">
	<?php if($this->board->config->best_comment==1):?>
		<?php foreach($this->board->voted_comment_list as $key=>$value): ?>
			<li style="position:relative" id="cmt_<?php echo $value['comment_srl'] ?>" class="commentItem">
				<div class="commentAuthorIcon media-object"><i class="fa fa-at"></i></div>
				<div class="commentAuthor">
					<div>
						<?php echo $value['nick_name'] ?>
						<span class="regdate_cmt"><?php echo date("Y.m.d H:i:s",strtotime($value['regdate'])); ?></span> 
					</div>
					<div style="color: #417edc;" id="comment_content_<?php echo $value['comment_srl'] ?>"><?php echo htmlentities($value['content']) ?></div>
					<div style="float:right">
						<?php if($_SESSION['logged_info']['member_srl']==$value['member_srl']):?>
							<a onclick="disp.reply_modify('<?php echo $_GET[__MODULEID] ?>','<?php echo $value['srl'] ?>','<?php echo $value['comment_srl'] ?>','#cmt_<?php echo $value['comment_srl'] ?>', '<?php echo $_GET['srl']; ?>')">
								<i class="fa fa-comments-o" aria-hidden="true"></i> 수정
							</a>
						<?php endif;?>
						<a onclick="disp.reply('<?php echo $_GET[__MODULEID] ?>','<?php echo $value['srl'] ?>','<?php echo $value['comment_srl'] ?>','#cmt_<?php echo $value['comment_srl'] ?>', '<?php echo $_GET['srl']; ?>')">
							<i class="fa fa-comments-o" aria-hidden="true"></i> 댓글
						</a>
						<a onclick="proc.comment_vote('<?php echo $value['comment_srl'] ?>','#cmt_<?php echo $value['comment_srl'] ?>', '<?php echo $_GET['srl']; ?>')">
							<i class="fa fa-thumbs-o-up"></i> 추천 <span class="cmt_vote_<?php echo $value['comment_srl'] ?>"><?php echo $value['vote'] ?></span>
						</a>
						<a onclick="proc.comment_blame('<?php echo $value['comment_srl'] ?>','#cmt_<?php echo $value['comment_srl'] ?>', '<?php echo $_GET['srl']; ?>')">
							<i class="fa fa-thumbs-o-down"></i> 비추천 <span class="cmt_blame_<?php echo $value['comment_srl'] ?>"><?php echo $value['blame'] ?></span>
						</a>
					</div>
					<div id="reply"></div>
				</div>
			</li>
		<?php endforeach; ?>
	<?php endif; ?>
	
	<?php if($this->board->config->worst_comment==1):?>
		<?php foreach($this->board->blamed_comment_list as $key=>$value): ?>
		<li style="position:relative" id="cmt_<?php echo $value['comment_srl'] ?>" class="commentItem">
			<div class="commentAuthorIcon media-object">
				<i class="fa fa-at"></i>
			</div>
			<div class="commentAuthor">
				<div>
					<?php echo $value['nick_name'] ?>
					<span class="regdate_cmt"><?php echo date("Y.m.d H:i:s",strtotime($value['regdate'])); ?></span> 
				</div>
				
				
				<?php echo html::element('div', htmlentities($value['content']), [
					'style' => "color: #c52228;",
					'id' => "comment_content_".$value['comment_srl']
				]);?>
				
				<div style="float:right">
					<?php if($this->base->getMemberSrl()==$value['member_srl']):?>
						<?php echo html::element('a', html::element('i', '', ['class'=>'fa fa-comments-o'])." 수정", [
							'onclick' => "disp.reply_modify(" . html::generateParameter([$_GET[__MODULEID], $value['srl'], $value['comment_srl'], "#cmt_".$value['comment_srl'], $_GET['srl']]). ")"
						]);?>
					<?php endif;?>
					<a onclick="disp.reply(<?php echo html::generateParameter([$_GET[__MODULEID],$value['srl'],$value['comment_srl'],'#cmt_'.$value['comment_srl'], $_GET['srl']]);?>)">
						<i class="fa fa-comments-o" aria-hidden="true"></i> 댓글
					</a>
					<a onclick="proc.comment_vote(<?php echo html::generateParameter([$value['comment_srl'],'#cmt_'.$value['comment_srl'],$_GET['srl']]);?>)">
						<i class="fa fa-thumbs-o-up"></i> 추천 <span class="cmt_vote_<?php echo $value['comment_srl'] ?>"><?php echo $value['vote'] ?></span>
					</a>
					<a onclick="proc.comment_blame(<?php echo html::generateParameter([$value['comment_srl'],'#cmt_'.$value['comment_srl'],$_GET['srl']]); ?>)">
						<i class="fa fa-thumbs-o-down"></i> 비추천 <span class="cmt_blame_<?php echo $value['comment_srl'] ?>"><?php echo $value['blame'] ?></span>
					</a>
				</div>
				<div id="reply"></div>
			</div>
		</li>
		<?php endforeach; ?>
	<?php endif; ?>
	
	<?php foreach($this->board->comment_list as $key=>$value): ?>
	<li style="margin-left:<?php echo $this->board->model->getCommentDepthLevel($value['depth']); ?>%;position:relative" id="cmt_<?php echo $value['comment_srl'] ?>" class="commentItem">
		<div class="commentAuthorIcon media-object">
			<?php if($value['depth'] != 0):?><i class="ico_16px re"></i><?php endif;?>
			<i class="fa fa-at"></i>
		</div>
		<div class="commentAuthor">
			<div>
				<span style="font-weight:bold"><?php echo $value['nick_name'] ?></span>
				<span class="regdate_cmt"><i class="fa fa-clock-o fa-fw"></i> <?php echo date("Y.m.d H:i:s",strtotime($value['regdate'])); ?></span> 
			</div>
			<div id="comment_content_<?php echo $value['comment_srl'] ?>"><?php echo htmlentities($value['content']) ?></div>
			<div style="float:right">
				<?php if($this->base->getMemberSrl()==$value['member_srl']):?>
					<?php echo html::element('a', html::element('i', '', ['class'=>'fa fa-comments-o'])." 수정", [
						'onclick' => "disp.reply_modify(" . html::generateParameter([$_GET[__MODULEID], $value['srl'], $value['comment_srl'], "#cmt_".$value['comment_srl'], $_GET['srl']]). ")"
					]);?>
				<?php endif;?>
				
				<?php echo html::element('a', html::element('i', '', ['class'=>'fa fa-comments-o'])." 댓글", [
					'onclick' => "disp.reply(" . html::generateParameter([$_GET[__MODULEID], $value['srl'], $value['comment_srl'], "#cmt_".$value['comment_srl'], $_GET['srl']]). ")"
				]);?>
				
				<?php echo html::element('a', html::element('i', '', ['class'=>'fa fa-thumbs-o-up'])."추천 ".html::element('span', $value['vote'], ['class'=>'cmt_vote_'.$value['comment_srl']]), [
					'onclick' => "proc.comment_vote(" . html::generateParameter([$value['comment_srl'], '#cmt_'.$value['comment_srl'], $_GET['srl']]). ")"
				]);?>
				
				<?php echo html::element('a', html::element('i', '', ['class'=>'fa fa-thumbs-o-down'])."비추천 ".html::element('span', $value['blame'], ['class'=>'cmt_blame_'.$value['comment_srl']]), [
					'onclick' => "proc.comment_blame(" . html::generateParameter([$value['comment_srl'], '#cmt_'.$value['comment_srl'], $_GET['srl']]). ")"
				]);?>
			</div>
			<div id="reply"></div>
		</div>
	</li>
	<?php endforeach; ?>
	</ul>
	
	<form id="form_cmt" method="post" enctype="multipart/form-data" action="index.php">
		<input type="hidden" name="comment_srl" value="">
		<input type="hidden" name="srl" value="<?php echo $_GET['srl']?>">
		<input type="hidden" name="module" value="<?php echo $_GET[__MODULEID];?>">
		<input type="hidden" name="<?php echo __MODULEID; ?>" value="comment">
		<input type="hidden" name="act" value="insertComment">
		<?php if($this->base->isLogged()):?>
		<div class="commentArea">
			<div style="position:relative">
				<textarea id="content" name="content" class="commentContent" placeholder=""></textarea>
				<div style="margin-top:3px">
					<input type="submit" class="bd_btn commentSubmitButton" name="postcomment" value="<?php echo $this->board->lang['comment']; ?>">
				</div>
			</div>
		</div>
		<?php else:?>
		<div style="background: #FCFCFC;text-align: center;">
			<a href="<?php echo str::getUrl(__MODULEID, 'member', 'act', 'dispMemberLogin'); ?>">
				<div class="notlogged"><?php echo $this->board->lang['logincomment']; ?></div>
			</a>
		</div>
		<?php endif;?>
	</form>
	
	<form action="./" method="get" class="bd_pg clear">
		<input type="hidden" name="error_return_url" value="<?php echo str::getUrl(__MODULEID,$_GET[__MODULEID]); ?>">
		<fieldset method="get">
			<input type="hidden" name="<?php echo __MODULEID; ?>" value="<?php echo $_GET[__MODULEID]?>">
			<input type="hidden" name="category" value="">
			<input type="hidden" name="keyword" value="" autocomplete="off" class="acInput">
			<input type="hidden" name="search_target" value="">
			<?php echo html::element('a', '1', [
				'class' => 'frst_last comment_navi this',
				'href' => str::getUrl(__MODULEID, $_GET[__MODULEID], 'cpage', 1, 'act', 'getCommentPage')." #comment_padding",
				'title' => "첫 페이지"
			]);?>
			
			<?php foreach($this->board->comment_navigation as $key=>$value): ?>
				<?php echo html::element('a', $value, [
					'class' => 'comment_navi '.(($_GET['cpage'] == $value) ? "current_page": ""),
					'href' => str::getUrl(__MODULEID, $_GET[__MODULEID], 'cpage', $value, 'act', 'getCommentPage')
				]);?>
			<?php endforeach; ?>
			<a>...</a>
			
			<?php echo html::element('a', $this->board->comment_count_rel, [
				'class' => 'comment_navi',
				'href' => str::getUrl(__MODULEID, $_GET[__MODULEID], 'cpage', $this->board->comment_count_rel, 'act', 'getCommentPage')." #comment_padding"
			]);?>
	   </fieldset>
	</form>
	
</div>