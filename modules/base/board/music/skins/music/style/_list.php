<?php if(!defined("__FLOWER__")) exit(); ?>
<style>
.foobar{background: url(foobar.jpg);width:14px;height:16px;display: block;float: left;margin-right:5px}
</style>
<table class="boardListStyle bd_tb">
	<caption class="blind">List of Articles</caption>
		<thead class="bg_f_f9">
			<tr>
				<?php foreach($this->board->column as $val):?>
					<?php if($val=='no'):?>
						<th scope="col"><span><a>번호</a></span></th>
					<?php elseif($val=='category'):?>
						<th scope="col">
							<span>
								<a href="<?php echo str::getUrl('',__MODULEID,$_GET[__MODULEID],'sort_index','category','bdstyle',$_GET['bdstyle']); ?>">카테고리</a>
							</span>
						</th>
					<?php elseif($val=='singer'):?>
						<th scope="col"><span><a href="<?php echo str::getUrl('',__MODULEID,'index','bdstyle',$_GET['bdstyle']);?>">가수</a></span></th>
					<?php elseif($val=='title'):?>
						<th scope="col" class="title"><span><a href="<?php echo str::getUrl('',__MODULEID,'index','bdstyle',$_GET['bdstyle']);?>">제목</a></span></th>
					<?php elseif($val=='download'):?>
						<th scope="col">
							<span>
								<a href="<?php echo str::getUrl('',__MODULEID,$_GET[__MODULEID],'sort_index','download_count','bdstyle',$_GET['bdstyle']); ?>">다운로드</a>
							</span>
						</th>
					<?php elseif($val=='cart'):?>
						<th scope="col"><span><a>담기</a></span></th>
					<?php elseif($val=='play'):?>
						<th scope="col"><span><a>재생</a></span></th>
					<?php elseif($val=='regdate'):?>
						<th scope="col">
							<span>
								<a href="<?php echo str::getUrl('',__MODULEID,$_GET[__MODULEID],'sort_index','regdate','bdstyle',$_GET['bdstyle']); ?>">날짜</a>
							</span>
						</th>
					<?php elseif($val=='nick_name'):?>
						<th scope="col">
							<span>
								<a>글쓴이</a>
							</span>
						</th>
					<?php elseif($val=='readed'):?>
						<th scope="col">
							<span>
								<a href="<?php echo str::getUrl('',__MODULEID,$_GET[__MODULEID],'sort_index','readed_count','bdstyle',$_GET['bdstyle']); ?>">조회</a>
							</span>
						</th>
					<?php elseif($val=='voted'):?>
						<th scope="col" class="m_no">
							<span>
								<a href="<?php echo str::getUrl('',__MODULEID,$_GET[__MODULEID],'sort_index','voted_count','bdstyle',$_GET['bdstyle']);?>">추천 수</a>
							</span>
						</th>
					<?php endif;?>
					
				<?php endforeach;?>
			</tr>
		</thead>
	<tbody>
		<?php foreach($this->board->document_list as $key=>$document): ?>
			<tr>
			
			<?php foreach($this->board->column as $val):?>
				<?php if($val=='no'):?>
					<td class="time">
						<a style="font-family:sans-serif"><?php echo $document->query['no'] ?></a>
					</td>
				<?php elseif($val=='category'):?>
					<td class="time">
						<?php if($document->isCategoryExists() && $this->board->config->category_view!=1): ?>
							<?php echo $document->getCategoryName();?>
						<?php endif;?>
					</td>
				<?php elseif($val=='artist'):?>
					<td class="time">
						<a href="<?php echo str::getUrl(__MODULEID,$_GET[__MODULEID],'act','search','type','artist','keyword',$document->query['artist'],'page',1); ?>"><?php echo mb_substr($document->get['artist'],0,10); ?></a>
					</td>
				<?php elseif($val=='nick_name'):?>
					<td class="time">
						<a><?php echo mb_substr($document->query['nick_name'],0,10); ?></a>
					</td>
				<?php elseif($val=='title'):?>
					<td class="title">
						<?php $index_img = $this->board->model->getIndexThumbnail($document->getFileList(), $document->query); ?>
				
						<?php if($index_img['img']): ?>
							<style>.tmp_<?php echo $index_img['index'];?>{background-image: url('<?php echo $index_img['img'];?>')}</style>
						<?php endif;?>
						
						<div>
							<a data-img="tmp_<?php echo $index_img['index'];?>" href="<?php echo $document->getLink(); ?>" class="hx bubble no_bubble view_bd only_img" >
								<?php echo $document->getTitle($this->board->config->title_length); ?>
								<a class="replyNum" title="댓글"><?php echo $document->getCommentCount();?></a>
								<?php echo $document->getExtraImages(); ?>
							</a>
						</div>
					</td>
				<?php elseif($val=='download'):?>
					<td class="time">
						<?php if($document->isAudioExists()):?>
							<a href="<?php echo $document->getAudioDownloadLink(); ?>">
								<i class="fa fa-file-picture-o"></i>
							</a>
						<?php endif;?>
					</td>
				<?php elseif($val=='cart'):?>
					<td class="time">
						<?php if($this->board->config->playlist_btn_view!=1): ?>
							<a target_srl="<?php echo $document->query['srl'];?>" onclick=proc.playlist(this)>
								<i class="fa fa-cloud-upload"></i>
							</a>
						<?php endif;?>
					</td>
				<?php elseif($val=='play'):?>
					<td class="time">
						<?php if($document->isAudioExists()):?>
							<?php if($this->board->config->list_player=="btn"): ?>
								<div class="wrapper"><a href="<?php echo $document->getAudioLink(); ?>" class="sm2_button" ></a><div class="tooltip"><?php echo $this->board->lang['play'];?></div></div>
							<?php elseif($this->board->config->list_player=="360"):?>
								<div class="ui360"><a href="<?php echo $document->getAudioLink();?>"></a></div>';
							<?php endif;?>
						<?php endif;?>
					</td>
				<?php elseif($val=='regdate'):?>
					<td class="time"><?php echo date("Y.m.d",strtotime($document->getRegdate())); ?></td>
				<?php elseif($val=='readed'):?>
					<td class="time"><?php echo $document->getReadedCount(); ?></td>
				<?php elseif($val=='voted'):?>
					<td class="m_no"><?php echo $document->getVotedCount(); ?></td>
				<?php endif;?>
				
			<?php endforeach;?>
		</tr>
		<?php endforeach; ?>
	</tbody>
</table>