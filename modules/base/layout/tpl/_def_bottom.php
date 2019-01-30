<?php
	$js_body_list = $this->base->getBodyJS();
?>

	<!--//JS-->
<?php foreach($js_body_list as $jsLink):?>
	<?php echo html::element('script', '', [
		'src' => $jsLink
	]);?>
<?php endforeach;?>

<!--

Database Info
================

	- Database Query Count : <?php echo count($this->base->getSlowQuery()); ?>
	
	
Database Queries
================
<?php foreach ($this->base->getSlowQuery() as $key=>$val): ?>
<?php echo $key;?>. <?php echo $val['query']; ?>

	- Query Time : <?php echo $val['time']; ?>
	
	- Query Caller : <?php echo $val['caller']; ?>
	
<?php endforeach;?>
-->