<ol class=" bd_lst bd_zine zine zine1 img_load">
	<?php foreach($this->board->document_list as $key=>$document): ?>
		<li class="clear">
			<div class="rt_area">
				<h3 class="ngeb">
					<?php echo $document->getTitle($this->board->config->title_length); ?>
				</h3>
				<div class="info">
					<?php foreach($this->board->column as $val):?>
						<?php if($val=='regdate'):?>
						<span>
							<i class="fa fa-clock-o"></i>
							<span>Date</span>
							<b>
								<?php echo date("Y.m.d",strtotime($document->getRegdate())); ?>
							</b>
						</span>
						<?php elseif($val=='nick_name'):?>
						<span>
							<i class="fa fa-user"></i>
							<span>By</span>
							<b>
								<a><?php echo mb_substr($document->get['nick_name'],0,10); ?></a>
							</b>
						</span>
						<?php elseif($val=='readed'):?>
						<span>
							<i class="fa fa-eye"></i>
							<span>Views</span>
							<b>
								<?php echo $document->getReadedCount(); ?>
							</b>
						</span>
						<?php elseif($val=='voted'):?>
						<span>
							<i class="fa fa-heart"></i>
							<span>Votes</span>
							<b><?php echo $document->getVotedCount(); ?></b>
						</span>	
						<?php endif;?>	
					<?php endforeach;?>			
				</div>
			</div>
			<a class="hx" href="<?php echo $document->getLink();?>">
				<span class="blind">Read More</span>
			</a>
		</li>
	<?php endforeach; ?>
</ol>