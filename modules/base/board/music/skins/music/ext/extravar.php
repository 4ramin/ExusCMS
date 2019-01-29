<?php if(!defined("__FLOWER__")) exit(); ?>

<div class="extra_vars" style="display: table;<?php echo $this->board->config->tmp_hide_extravars==1 ? 'display:none':''?>">
	<table id="extravars" class="bd_tb">
		<tbody>
			<?php foreach($this->board->extra_vars as $key=>$val): ?>
				<tr class="bg1">
					<th style="background-color:#fbfbfb" scope="row"><?php echo $this->board->query->getExtraVarTypebyName($val['name'], 'title'); ?></th>
					<td style="background-color:#fefefe"><?php echo $this->board->model->getExtraVarsHTML($val); ?></td>
				</tr>
			<?php endforeach; ?>
			<tr class="bg0">
				<th scope="row"><?php echo $this->board->lang['copy']; ?></th>
				<td>
					<?php foreach($this->board->file_list as $key=>$value): ?>
						<?php
							//if(preg_match('/\.(mp3)(?:[\?\#].*)?$/i', $value['files'], $matches)){
							if(maya::execute('@\||/@!mp3||wav!', $value['files'],'boolean')){
								echo '<i class="fa fa-clipboard" id="copy-button" data-clipboard-text="<audio autoplay controls src='.$sub_directory.'/attach/file/'.$value['target'].'/'.$value['files'].'></audio></br>주소 : '.'<a href=/'.str::getUrl('bd',$_GET['bd'],__ACTION,'view','srl',$this->board->document['srl'],'mode',$_GET['mode'],'category',$_GET['category'],'genre',$_GET['genre']).'>/'.str::getUrl('bd',$_GET['bd'],__ACTION,'view','srl',$this->board->document['srl'],'mode',$_GET['mode'],'category',$_GET['category'],'genre',$_GET['genre']).'</a>"</i>';
							}
						?>
					<?php endforeach; ?>
				</td>
			</tr>
		</tbody>
	</table>
</div>