<?php if(!defined("__FLOWER__")) exit(); ?>
<?php
	$this->base->addJS("/module/base/board/music/tpl/setup.js", 'body');
	$this->base->addCSS("/module/base/board/music/tpl/setup.css");
	$xml = $this->board->xml;
	include('setup_tab.php');
?>

<div class="bd_setup">

	<div class="top_bookmark">
		<?php foreach($xml->option->group as $key=>$group): ?>
				<a class="<?php echo $group->var->attributes()->name; ?>" href="#<?php echo $group->title; ?>"><?php echo $group->title; ?></a>
		<?php endforeach; ?>
	</div>
	
	<form action="" method="post" id="form">
		<input name="<?php echo __MODULEID; ?>" type="hidden" value="<?php echo $_GET[__MODULEID]; ?>"></input>
		<input name="act" type="hidden" value="procBoardSetup"></input>
		<input name="afteract" type="hidden" value="<?php echo $_GET['act'];?>"></input>
			
			<?php if($_GET['act']=='dispBoardSetup'):?>
			<h1 data-bar="<?php echo $group->var->attributes()->name; ?>" class="title_setup">게시판 모듈 설정</h1>
			<div class="subtitle_setup">게시판 모듈의 기능들을 수정합니다.</div>
			<section>
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
			<?php elseif($_GET['act']=='dispBoardExtraSetup'):?>
			<h1 data-bar="<?php echo $group->var->attributes()->name; ?>" class="title_setup">게시판 확장변수 설정</h1>
			<div class="subtitle_setup">게시판 모듈의 확장변수를 수정합니다.</div>
			<section>
				<ul>
				<?php foreach($this->board->extralist as $key=>$val): ?>
					<li>
						<a><?php echo $val['title'];?></a><a onclick="delExtra(<?php echo $val['srl'];?>)">X</a>
					</li>
				<?php endforeach;?>
				</ul>
				<button onclick="addExtra()">추가</button>
			</section>
			
			<?php endif;?>
			
		<?php foreach($xml->option->group as $key=>$group):?>
			<h1 data-bar="<?php echo $group->var->attributes()->name; ?>" id="<?php echo $group->title; ?>" class="title_setup"><?php echo $group->title; ?></h1>
			<div class="subtitle_setup"><?php echo $group->description; ?></div>
			<?php foreach($group->var as $key=>$var):?>
				<section>
					<?php if(isset($var->toggle) && isset($var->attributes()->name)): ?>
					<!--toggle script-->
					<script>
						$(document).ready(function(){
							function _toggle_<?php echo $var->attributes()->name; ?>(){
								$('<?php echo $var->toggle->attributes()->target; ?>').toggleBool($('input[value=<?php echo $var->toggle->attributes()->value; ?>]').is(":checked"));
							}
							
							$('#opt_<?php echo $var->attributes()->name; ?>').find('<?php echo $var->attributes()->type; ?>').click(function(){
								$('<?php echo $var->toggle->attributes()->target; ?>').toggleBool($(this).val()=='<?php echo $var->toggle->attributes()->value; ?>');
							})

							_toggle_<?php echo $var->attributes()->name; ?>();
						})
					</script>
					<!--//toggle script-->
					<?php endif; ?>
					<div id="set_<?php echo $var->attributes()->name; ?>" class="section_value">
						<div class="label_setup">
							<label class="label_view"><?php echo $var->title; ?></label>
						</div>
						<div id="opt_<?php echo $var->attributes()->name; ?>" style="margin-left:250px">
							<?php if($var->attributes()->type=='text'):?>
								<acronym title="<?php echo $var->description; ?>">
									<label>
										<input name="post_area[<?php echo $var->attributes()->name; ?>]" type="<?php echo $var->attributes()->type; ?>" value="<?php echo $this->board->config->{$var->attributes()->name} ?>">
											<?php echo $var->attributes()->description; ?>
										</input>
									</label>
								</acronym>
							<?php endif;?>
							<?php if($var->attributes()->type=='textarea'):?>
								<acronym title="<?php echo $var->description; ?>">
									<label>
										<textarea name="post_area[<?php echo $var->attributes()->name; ?>]" type="<?php echo $var->attributes()->type; ?>"><?php echo $this->board->config->{$var->attributes()->name} ?></textarea><?php echo $var->attributes()->description; ?>
									</label>
								</acronym>
							<?php endif;?>
							<?php if($var->attributes()->type=='radio' || $var->attributes()->type=='checkbox'):?>
								<?php foreach($var->options as $key=>$options):?>
									<acronym title="<?php echo $var->description; ?>">
										<label>
											<input name="post_area[<?php echo $var->attributes()->name; ?>]" type="<?php echo $var->attributes()->type; ?>" <?php echo $this->board->config->{$var->attributes()->name}==$options->attributes()->value ? 'checked' : ''; ?> value="<?php echo $options->attributes()->value; ?>">
												<?php echo $options->title; ?>
											</input>
										</label>
									</acronym>
								<?php endforeach; ?>
							<?php elseif($var->attributes()->type=='select'):?>
								<acronym title="<?php echo $var->description; ?>">
									<!--//image -->
									<?php foreach($var->options as $key=>$options):?>
										<?php echo $this->board->config->{$var->attributes()->name}==$options->attributes()->value ? '<div><img src="'.$options->attributes()->image.'"/></div>' : ''; ?>
									<?php endforeach; ?>
									<select name="post_area[<?php echo $var->attributes()->name; ?>]">
									<?php foreach($var->options as $key=>$options):?>
											<option data-image="<?php echo $options->attributes()->dataimage; ?>" value="<?php echo $options->attributes()->value; ?>" <?php echo $this->board->config->{$var->attributes()->name}==$options->attributes()->value ? 'selected="selected"' : ''; ?>>
												<?php echo $options->title; ?>
											</option>
									<?php endforeach; ?>
									</select>
								</acronym>
							<?php endif;?>
							<a onclick="$('#help_<?php echo $var->attributes()->name; ?>').toggle(500)"><span class="help_btn">?</span></a>
						</div>
					<div id="help_<?php echo $var->attributes()->name; ?>" style="margin:10px 0px 15px 250px;display:none;font-size:11px">
						<?php echo $var->description; ?>
					</div>
					</div>
				</section>
			<?php endforeach; ?>
		<?php endforeach; ?>
		<div class="submit_section">
			<input value ="확인" type="submit"></input>
		</div>
	</form>
</div>