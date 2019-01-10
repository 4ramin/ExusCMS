<?php if(!defined("__FLOWER__")) exit(); ?>
<?php include('_header.php'); ?>
<?php
	$xml = $this->admin->xml;
?>

<div class="admin_content list_content content newclearfix">
<?php include('gnb.php'); ?>
	<div class="top_bookmark">
		<?php foreach($xml->option->group as $key=>$group): ?>
				<a href="#<?php echo $group->title; ?>"><?php echo $group->title; ?></a>
		<?php endforeach; ?>
	</div>
	
	<form action="" method="post" id="form">
		<input name="<?php echo __MODULEID; ?>" type="hidden" value="<?php echo $_GET[__MODULEID]; ?>"></input>
		<input name="act" type="hidden" value="procAdminSetup"></input>
			
		<?php foreach($xml->option->group as $key=>$group):?>
			<h1 id="<?php echo $group->title; ?>" class="title_setup"><?php echo $group->title; ?></h1>
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
										<input name="post_area[<?php echo $var->attributes()->name; ?>]" type="<?php echo $var->attributes()->type; ?>" value="<?php echo $this->admin->config->{$var->attributes()->name} ?>">
											<?php echo $var->attributes()->description; ?>
										</input>
									</label>
								</acronym>
							<?php endif;?>
							<?php if($var->attributes()->type=='textarea'):?>
								<acronym title="<?php echo $var->description; ?>">
									<label>
										<textarea name="post_area[<?php echo $var->attributes()->name; ?>]" type="<?php echo $var->attributes()->type; ?>"><?php echo $this->admin->config->{$var->attributes()->name} ?></textarea><?php echo $var->attributes()->description; ?>
									</label>
								</acronym>
							<?php endif;?>
							<?php if($var->attributes()->type=='radio' || $var->attributes()->type=='checkbox'):?>
								<?php foreach($var->options as $key=>$options):?>
									<acronym title="<?php echo $var->description; ?>">
										<label>
											<input name="post_area[<?php echo $var->attributes()->name; ?>]" type="<?php echo $var->attributes()->type; ?>" <?php echo $this->admin->config->{$var->attributes()->name}==$options->attributes()->value ? 'checked' : ''; ?> value="<?php echo $options->attributes()->value; ?>">
												<?php echo $options->title; ?>
											</input>
										</label>
									</acronym>
								<?php endforeach; ?>
							<?php elseif($var->attributes()->type=='select'):?>
								<acronym title="<?php echo $var->description; ?>">
									<!--//image -->
									<?php foreach($var->options as $key=>$options):?>
										<?php echo $this->admin->config->{$var->attributes()->name}==$options->attributes()->value ? '<div><img src="'.$options->attributes()->image.'"/></div>' : ''; ?>
									<?php endforeach; ?>
									<select name="post_area[<?php echo $var->attributes()->name; ?>]">
									<?php foreach($var->options as $key=>$options):?>
											<option data-image="<?php echo $options->attributes()->dataimage; ?>" value="<?php echo $options->attributes()->value; ?>" <?php echo $this->admin->config->{$var->attributes()->name}==$options->attributes()->value ? 'selected="selected"' : ''; ?>>
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