<?php if(!defined("__FLOWER__")) exit(); ?>
<div class="list_area"><?php include('_header.php'); ?>
	<div class="admin_content list_content content newclearfix">
		<?php include('gnb.php'); ?>
		
		<table id="documentListTable" class="x_table x_table-striped x_table-hover">
			<thead>
				<tr>
					<th scope="col" class="title">게시판</th>
					<th scope="col" class="nowr">기본 모듈</th>
					<th scope="col" class="nowr">스킨</th>
					<th scope="col" class="nowr">모바일 스킨</th>
					<th scope="col"><input type="checkbox" title="Check All"></th>
				</tr>
			</thead>
			<tbody>
				<?php foreach($this->admin->query as $key=>$val): ?>
				<tr>
					<td>
						<a href="<?php echo str::getUrl('',__MODULEID,$val['bdname'],'srl');?>"><?php echo mb_substr($val['title'],0,150); ?></a>
					</td>
					<td>
						<?php echo $val['isdef']; ?>
					</td>
					<td>
						<?php echo $val['skin']; ?>
					</td>
					<td>
						<?php echo $val['m.skin']; ?>
					</td>
					<td>
						<input type="checkbox" name="cart" value="<?php echo $val['srl']; ?>">
					</td>
				</tr>
				<?php endforeach; ?>
			</tbody>
		</table>
		
		<div style="float:right">
			<a class="x_btn modalAnchor xe-modal-window" data-value="delete">삭제</a>
		</div>
		
		<form method="get" onsubmit="return procFilter(this, search)" class="bd_pg clear">
			<input type="hidden" name="md" value="<?php echo $_GET[__MODULEID]?>">
			<input type="hidden" name="act" value="search">
			<span class="btn_img itx_wrp" method="get" no-error-return-url="true">
				<button type="submit" onclick="jQuery(this).parents('form.bd_srch_btm').submit();return false;" class="ico_16px search"><?php echo $this->board->lang['search']; ?></button>
				<label for="bd_srch_btm_itx_167325">Search</label>
				<input type="text" name="keyword" id="keyword" onkeyup="proc.autocomplet()" class=" srch_itx acInput" value="<?php echo $_GET['keyword']?>" autocomplete="off">
				<div class="input_container">
					<ul id="search_keyword_list"></ul>
				</div>
			</span>
			<span class="select">
				<select name="type">
					<option <?php echo $_GET['type']=='title' ? 'selected="selected"' : ''?> value="title"><?php echo $this->board->lang['title']; ?></option>
					<option <?php echo $_GET['type']=='tag' ? 'selected="selected"' : ''?> value="tag"><?php echo $this->board->lang['tag']; ?></option>
					<option <?php echo $_GET['type']=='author' ? 'selected="selected"' : ''?> value="author"><?php echo $this->board->lang['singer']; ?></option>
				</select>
			</span>
		</form>
						
		<form action="./" method="get" class="bd_pg clear">
			<input type="hidden" name="error_return_url" value="<?php echo str::getUrl(__MODULEID,$_GET[__MODULEID]); ?>">
			<fieldset method="get" no-error-return-url="true">
				<legend class="blind">Board Pagination</legend>
				<input type="hidden" name="md" value="<?php echo $_GET[__MODULEID]?>">
				<input type="hidden" name="category" value="">
				<input type="hidden" name="keyword" value="" autocomplete="off" class="acInput">
				<input type="hidden" name="search_target" value="">
				<a class="frst_last bubble this" href="<?php echo str::getUrl(__MODULEID,$_GET[__MODULEID],'page',1,'srl',''); ?>" title="첫 페이지">
					1
				</a>
				<?php foreach($this->admin->page_navigation as $key=>$value): ?>
					<a class="<?php echo $_GET['page'] == $value ?  "current_page": "" ?>" href="<?php echo str::getUrl(__MODULEID,$_GET[__MODULEID],'page',$value,'srl',''); ?>"><?php echo $value?></a>
				<?php endforeach; ?>
				<span class="bubble">
					<a href="#" class="tg_btn2" data-href=".bd_go_page" title="페이지 직접 이동">
						...
					</a>
				</span>
				<a href="<?php echo str::getUrl(__MODULEID,$_GET[__MODULEID],'page',$this->admin->page_count,'srl',''); ?>">
					<?php echo $this->admin->page_count?>
				</a> 
		   </fieldset>
		</form>
	</div>
</div>