<?php if(!defined("__FLOWER__")) exit(); ?>
<?php 
	if(is_object($this->base)){
		$msg = $this->base->get('msg');
	}
?>
<?php echo $msg ?>