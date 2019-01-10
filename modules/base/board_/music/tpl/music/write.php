<?php
	if(!defined("__FLOWER__")) exit();
	$editor = $this->base->get('editor');
?>
<div class="list_area">
	<div style="padding:15px" class="content">
		<div id="bd" class="bd">
			<div class="bd_hd clear"></div>
			<form id="form_doc" action="index.php" onsubmit="return submitFilter(this)" enctype="multipart/form-data" class="bd_wrt bd_wrt_main clear" method="post">
				<input type="hidden" name="<?php echo __MODULEID; ?>" value="<?php echo $_GET[__MODULEID]?>">
				<input type="hidden" name="srl" value="<?php echo $_GET['srl']?>">
				<input type="hidden" name="act" value="insertDocument">
				<input type="hidden" name="file_sequence" value="<?php echo $this->board->fileSequence; ?>">
				<input type="hidden" name="content" value="<?php echo htmlentities($this->board->document['content'], ENT_QUOTES); ?>">
			
				<div style="margin:0;padding:0" class="content_document">
					<table class="bd_tb" style="display: table;">
						<tbody>
						<?php foreach($this->board->extra_var as $key=>$evar):?>
							<tr>
								<th style="background-color:#fff" scope="row"><?php echo $evar['title']; ?></th>
								<td style="background-color:#fff">
									<span class="itx_wrp">
										<input style="width:100%" type="<?php echo $evar['type']; ?>" class="text itx" name="<?php echo $evar['val']; ?>" value=""></input>
									</span>
								</td>
							</tr>
						<?php endforeach;?>
						</tbody>
					</table>
				</div>
				
				<table class="bd_wrt_hd bd_tb">
					<tbody>
						<tr>
							<td>
								<span class="itx_wrp">
									<select style="padding: 4px 6px;" name="category">
									<?php foreach($this->board->category_list as $key=>$val):?>
										<?php echo html::element('option', $val['name'], [
											$this->board->document['category'] == $val['category_srl'] ?? 'selected' => 'selected',
											'value' => $val['category_srl']
										]);?>
									<?php endforeach;?>
									</select>
								</span>
							</td>
							<td width="100%">
								<span class="itx_wrp">
									<input type="text" name="title" class="itx" id="postTitle" value="<?php echo $this->board->document['title']; ?>" placeholder="제목" title="제목">
								</span>
							</td>
						</tr>
					</tbody>
				</table>
				
				<div class="get_editor"><?php echo $editor;?></div>

				<div><input style="width:100%" placeholder="태그" type="input" name="tag" value="<?php echo $this->board->document['tag']; ?>"></input></div>
				
				<div class="regist">
					<input type="submit" value="등록" class="bd_btn blue">
					<button type="button" onclick="history.back()" class="bd_btn cancle">돌아가기</button>
				</div>
			</form>
		</div>
	</div>
</div>