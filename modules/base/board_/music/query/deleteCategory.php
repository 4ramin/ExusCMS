<?php

	function Query($list_order, $module) 
	{
		return db::Query('DELETE','def_category', [
			['AND', 'list_order', '=', ':list_order', $list_order],
			['', 'module', '=', ':module', $module]
		],'', 'boolean');
	}
	
?>