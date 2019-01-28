<?php

	if(!defined("__FLOWER__")) exit();
	
	$this->notice = new stdClass();
	$this->base = new base();

	if($position == 'init' && $status == 'after')
	{
		if($this->base->isLogged())
		{
			
		}
		
		$document_srl = $this->base->get_params('srl');
		
		if($document_srl){
			$this->notice->document_srl = request::encodeBinaryNumbericPassword('30'.$document_srl, 'a17wx');
		}
	}
	else
	{
		return;
	}
?>

<script type="text/javascript">
//<![CDATA[
jQuery(function($)
{
	if("WebSocket" in window){
		window.ws = new WebSocket('ws://127.0.0.1:2082');
		ws.onopen = function()
		{
			<?php if($this->notice->document_srl): ?>
			ws.send('<?php echo $this->notice->document_srl; ?>');
			<?php endif;?>
			ws.onmessage = function(msg) {
				console.log(msg);
			}
		}
	}
});
//]]>
</script>