<?php

	class plugin_model extends plugin{
		
		protected $pdo;
		
		function __construct(){
			$this->base = new base();
			$this->pdo = $this->base->getPDO();
		}
		
		
		function getPlugin($type){
			return db::Query('SELECT','def_addon',[
				['', 'type', '=', ':type', $type]
			],'*', 'all');
		}
	
	}
?>