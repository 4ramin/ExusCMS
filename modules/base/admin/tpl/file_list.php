<?php if(!defined("__FLOWER__")) exit(); ?>
<?php
	$this->base->addJS("/modules/base/admin/tpl/js/button.js");
	$this->base->addCSS("/modules/base/admin/tpl/css/button.css");
	$this->base->addCSS("/modules/base/admin/tpl/css/login.css");
	$this->base->addCSS("/modules/base/admin/tpl/css/playlist.css");
?>

<div class="list_area">
	<div class="content">
	
	<?php include('_header.php'); ?>
	
	<div class="admin_content list_content newclearfix">
		<?php include('gnb.php'); ?>
		
		<table id="documentListTable" class="x_table x_table-striped x_table-hover">
			<thead>
				<tr>
					<th scope="col" class="title">제목</th>
					<th scope="col" class="nowr">다운로드</th>
					<th scope="col"><input type="checkbox" title="Check All"></th>
				</tr>
			</thead>
			<tbody>
				<?php foreach($this->admin->query as $key=>$val): ?>
				<?php $this_file = $this->admin->model->getFileListbySrl($val['srl']); ?>
				<tr>
					<td>
						<?php foreach($this_file as $key=>$flst): ?>
							<?php
								if(maya::execute('@\||/@+.+!jpg||gif!', $flst['files'],'boolean')){
									echo '<a data-title="'.$flst['origin'].'" data-lightbox="cover_image" href="'.__SUB.__FILE__ATTACH.$flst['target'].'/'.$flst['files'].'"><img class="img-fluid" style="width:50px;height:50px" src='.__SUB.__FILE__ATTACH.$flst['target'].'/'.$flst['files'].'></a>';
								}elseif(maya::execute('@\||/@+.+!mp3||wav!', $flst['files'],'boolean')){
									echo '<a href="'.__SUB.__FILE__ATTACH.$flst['target'].'/'.$flst['files'].'" class="sm2_button" ></a>';
							   }
							?>
						<?php endforeach; ?>
						<a href="<?php echo str::getUrl('','srl',$val['target']);?>"><?php echo mb_substr($val['origin'],0,150); ?>...</a>
					</td>
					<td>
						<?php echo $val['down']; ?>
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
</div>