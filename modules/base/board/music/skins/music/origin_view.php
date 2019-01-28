<?php
	if(!defined("__FLOWER__")) exit();
	$this->base->addCSS('/module/base/board/music/skins/music/css/album.css');
	$this->base->addCSS('/module/base/board/music/skins/music/css/button.css');
	$this->base->addJS('/module/base/board/music/skins/music/js/jwplayer/jwplayer.js');
?>
<div class="list_area albumbox">
	<div class="albuminfo">
		<?php foreach($this->board->file_list as $key=>$value): ?>
		<?php
			if(preg_match('/\.(jpg|png)(?:[\?\#].*)?$/i', $value['files'], $matches)){
				echo '<img style="float: left;width:176px;max-height:176px;display: block;margin-right:15px" src='.__SUB.__FILE__ATTACH.$value['target'].'/'.$value['files'].'></img>';
				break;
			}
			?>
		<?php endforeach; ?>
		<div class="title_top">
			<div>
				<a class="album_title"><?php echo($this->board->album); ?></a>
			</div>
			<div>
				<a class="artist"><?php echo ($this->board->document['artist']);?></a>
			</div>
		</div>
	</div>
	<!--<div style="position: relative;padding-bottom: 20px;margin: 0 auto;">
		<div id="jwplayer"></div>
	</div>
	<script type="text/javascript">
		function setupAll(){
			player = jwplayer("jwplayer").setup({
				modes: settings.modes["html5"],
				width: 512,
				height: 412,
				listbar: {
					position: 'bottom',
					size: 150
				},
				playlist: [
				<?php foreach($this->board->file_list as $key=>$value): ?>
					<?php if(preg_match('/\.(mp3)(?:[\?\#].*)?$/i', $value['files'], $matches)):?>{
						"file": "<?php echo __SUB.__FILE__ATTACH.$value['target'].'/'.$value['files']; ?>",
						"image" : <?php foreach($this->board->file_list as $key=>$value): ?><?php if(preg_match('/\.(jpg)(?:[\?\#].*)?$/i', $value['files'], $matches)):?>
						"<?php echo __SUB.__FILE__ATTACH.$value['target'].'/'.$value['files']; ?>"<?php break;?>
						<?php endif;?>
						<?php endforeach; ?>
					},<?php endif;?>
				<?php endforeach; ?>
				],
				"controlbar.position": "over",
				'logo.file': "library/img/icn_home.png",
				'logo.prefix': "",
				'logo.hide':true,
				'logo.position':'top-right'
			});
		}
		setupAll();
	</script>-->
	<div>
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
				<?php foreach($this->board->sub_list as $key=>$value){ ?>
					<?php
						echo '<tr class="bg">';
						echo '<td class="t_left">';
						echo '<img style="margin-right:10px" src="'.$value->makeThumbnail(60,60).'"></img>';
						echo $value->getAudioFilename().'</td>';
						echo '<td class="ctr t_left">';
						echo '<a href="'.$value->getAudioListenLink().'" class="sm2_button" ></a>';
						echo '</td>';
						
						echo '<td class="ctr t_left">';
						echo '<a href='.$value->getAudioDownloadLink().'>다운로드</a>';
						echo '</td>';
						
						echo '</tr>';
					?>
				<?php } ?>
			</tbody>
		</table>
	</div>
</div>
<?php include('origin.php'); ?>