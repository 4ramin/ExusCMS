<?php if(!defined("__FLOWER__")) exit(); ?>

<!--related tag-->

<?php
$oFilesModel = $this->base->getModel('files');
	if($this->board->document['tag']){
		$arr_related = array();
		$oTagSrl = $this->board->model->getDocumentlistTagRelatedSrl($_GET[__MODULEID],$this->board->document['tag']);
		foreach($oTagSrl as $val){
			array_push($arr_related, $val['srl']);
		}
		
		$oTagi = array_search($this->board->document['srl'], $arr_related)-2;
		if($oTagi<0){
			$oTagi = 0;
		}
		
		$oTagDocument = $this->board->model->getDocumentlistTagRelated($_GET[__MODULEID],$oTagi,5,$this->board->document['tag']);
		$page_count_rel = count($oTagSrl);
		$list_count = 5;
		$cur_page_related = (int)ceil(($oTagi+5)/$list_count);
		$board_count_rel = (int)ceil($page_count_rel/$list_count);
		$arr_page_related = $this->board->model->getPageArray($board_count_rel, $cur_page_related);
	}
?>

<div style="<?php echo $this->board->config->tmp_hide_related==1 ? 'display:none':''?>" id="rel_ar">
	<div id="relatedDocumentList">
		<div class="title">
			<?php echo $this->board->lang['related_doc']; ?>(<?php echo $page_count_rel; ?>)
		</div>
		<div id="related_list">
			<?php foreach($oTagDocument as $key=>$tdoc): ?>
				<li class="relatedDocumentItem">
					<a class="view_bd" <?php echo $this->board->document['srl']==$tdoc['srl'] ? 'style="color:red"':''?> href="<?php echo str::getUrl('srl',$tdoc['srl']) ?>">
						<?php echo $tdoc['title']?>
					</a>
					<?php $this_file = $oFilesModel->getFileList($tdoc['srl']); ?>
					 <div class="fr wrapper">	
					<?php foreach($this_file as $key=>$flst): ?>
						<?php
							//if(preg_match('/\.(mp3|wav)(?:[\?\#].*)?$/i', $flst['files'], $matches)){
							if(maya::execute('@\||/@!mp3||wav!', $flst['files'],'boolean')){
								echo '<a href="/attach/file/'.$tdoc['srl'].'/'.$flst['files'].'" class="sm2_button" ></a><div class="tooltip">재생</div>';
								break;
							}
						   ?>
					 <?php endforeach; ?>
					</div>
				</li>
			<?php endforeach; ?>
		</div>
		<div class="relatedNavigation">
			<span id="prev_nav">
				<a onclick="proc.lst_related('<?php echo request::encodeBinaryNumberic($oTagi-5); ?>','<?php echo $this->board->document['tag'] ?>','<?php echo $_GET[__MODULEID]?>','<?php echo $_GET['srl']?>')">◀</a>
			</span>
			
			<span id="related_nav_page">
				<?php foreach($arr_page_related as $key=>$value_lst): ?>
					<a onclick="proc.lst_related('<?php echo request::encodeBinaryNumberic(($value_lst-1)*5); ?>','<?php echo $this->board->document['tag'] ?>','<?php echo $_GET[__MODULEID]?>','<?php echo request::encodeBinaryNumberic($_GET['srl']); ?>')" <?php echo $cur_page_related==$value_lst ? 'style="color:red"':'' ?>><?php echo $value_lst?></a> <span class="bar">|</span> 
				<?php endforeach; ?>
			</span>
			
			<span id="next_nav">
				<a onclick="proc.lst_related('<?php echo request::encodeBinaryNumberic($oTagi+5); ?>','<?php echo $this->board->document['tag'] ?>','<?php echo $_GET[__MODULEID]?>','<?php echo $_GET['srl']?>')">▶</a>
			</span>
		</div>
	</div>
</div>

<div style="padding: 10px;"></div>