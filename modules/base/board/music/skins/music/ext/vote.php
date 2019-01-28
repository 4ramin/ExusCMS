<?php if(!defined("__FLOWER__")) exit(); ?>
<div class="vote_area_box">
	<?php if($this->board->config->voted_show!=1): ?>
	<button style="background-color: #3188e2;color: #fff;" title="<?php echo $this->board->lang['vote']; ?>" class="vote_area href_cursor" onclick="proc.vote(<?php echo $this->board->oDocument->getSrl(); ?>)">
		<i class="fa fa-thumbs-o-up"> <?php echo $this->board->lang['vote']; ?></i>
		<span class="voted_count"><?php echo $this->board->oDocument->getVotedCount(); ?></span>
	</button>
	<?php endif; ?>
	<?php if($this->board->config->blamed_show!=1): ?>
	<button style="background-color: #ff3636;color: #fff;margin-left:3px" title="<?php echo $this->board->lang['blame']; ?>" class="vote_area href_cursor" onclick="proc.blame(<?php echo $this->board->oDocument->getSrl(); ?>)">
		<i class="fa fa-thumbs-o-down"> <?php echo $this->board->lang['blame']; ?></i>
		<span class="blamed_count"><?php echo $this->board->oDocument->getBlamedCount(); ?></span>
	</button>
	<?php endif; ?>
</div>

<?php if($this->board->config->user_starrate == 1): ?>
	<div class="vote_area_box">
		<span class="rating">
			<?php for($i=($this->board->config->star_max); $i > -1; $i--){?>
				<input type="radio" value="<?php echo $i;?>" class="rating-input" id="rating-input-1-<?php echo $i;?>" name="rating-input-1"/>
				<label title="<?php echo $i;?>" for="rating-input-1-<?php echo $i;?>" class="rating-star"></label>
			<?php };?>
		</span>
	</div>
	<?php if($this->board->oDocument->isStarRateCountExists()): ?>
		<script>$('.rating-input[value=' + <?php echo $this->board->oDocument->getStarRateCount(); ?> + ']')[0].checked = true;</script>
	<?php endif;?>
<?php endif;?>
