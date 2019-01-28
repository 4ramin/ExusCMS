<?php

	if(!defined("__FLOWER__")) exit();

	if($position == 'content' && $status == 'after')
	{
		$this->base = new base();
		$output = $this->base->get('content');
		
		$replace = array(
			"#<!--.*?-->#s" => "",
			"#>\s+<#"       => "><",
			"#\s+<#"      => " <",
			"#>\s+#"      => ">"
		);
		
		$search = array_keys($replace);
		$output = preg_replace($search, $replace, $output);
		$content = $this->base->set('content', $output);
	}

?>