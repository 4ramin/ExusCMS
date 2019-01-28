<?php
	if(!defined("__FLOWER__")) exit();
	$this->base->addCSS('/module/base/board/music/skins/music/css/album.css');
	$this->base->addCSS('/module/base/board/music/skins/music/css/button.css');
	$this->base->addJS('/module/base/board/music/skins/music/js/audio/button.js');
?>

<div class="list_area" style="margin-top:10px;padding:10px">
	<div style="padding:15px;display: block;">
		<?php foreach($this->board->file_list as $key=>$value): ?>
			<?php
			if(preg_match('/\.(jpg|png)(?:[\?\#].*)?$/i', $value['files'], $matches)){
				echo '<img style="float: left;width:216px;display: block;margin-right:15px" src='.__SUB.__FILE__ATTACH.$value['target'].'/'.$value['files'].'></img>';
				break;
			}
			?>
		<?php endforeach; ?>
		<div class="title_top"><a style="float: left;font-weight:bold;height: 226px;"><? echo $get_arr['related'] ?></a></div>
	</div>

	<div style="padding:10px">
		<table border="1" style="width:100%">
		   <caption>CD1 <span class="none">트랙 리스트</span></caption>
		   <colgroup>
			  <col>
			  <col style="width:39px">
			  <col style="width:148px">
		   </colgroup>
		   <thead>
			  <tr>
				 <th scope="col">
					<div class="wrap">곡명</div>
				 </th>
				 <th scope="col" class="t_left">
					<div class="wrap">재생</div>
				 </th>
				 <th scope="col" class="t_left">
					<div class="wrap right_none">다운로드</div>
				 </th>
			  </tr>
		   </thead>
		   <tbody>
				<?php foreach($this->board->file_list as $key=>$value): ?>
					<?php
					if(preg_match('/\.(mp3)(?:[\?\#].*)?$/i', $value['files'], $matches)){
						echo '<tr class="bg'.$i.'">';
						$i++;
						if($i>1) $i=0;
						
						echo '<td class="t_left">';
						echo $value['origin'];
						echo '</td>';
						
						echo '<td class="ctr t_left">';
						
						if($_SESSION['deny_content']!=TRUE) echo '<a href="'.__SUB.__FILE__ATTACH.$value['target'].'/'.$value['files'].'" class="sm2_button" ></a>';
						echo '</td>';
						
						echo '<td class="ctr t_left">';
						echo '<a href='.str::getUrl('',__MODULEID,'files',__ACTION,'FileDownload','download',$value['target'],'target',$value['files'].'>다운로드</a>');
						echo '</td>';
						
						echo '</tr>';
					}
					?>
				<?php endforeach; ?>
		   </tbody>
		</table>
	</div>
</div>