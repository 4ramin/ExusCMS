<?php

	if (!defined("__FLOWER__")) exit();

	class board_query extends board 
	{
		
		function getDocumentItem($srl) 
		{
			return db::Query('SELECT','def_document_music',[
				['', 'srl', '=', ':srl', $srl]
			],'*', 'self');
		}
		
		function getDocumentList($module, $page_start, $page_end) 
		{
			return db::Query('SELECT','def_document_music',[
				['AND', 'module', '=', ':args1', $module],
				['AND', 'srl', '>', ':args2', ($page_start-1)],
				['AND', 'srl_bd', 'BETWEEN', ':args3', ($page_start)],
				['ORDER', 'srl_bd', 'asc', ':page_end', $page_end]
			],'def_document_music.*, (SELECT count(c.comment_srl) FROM def_comment c WHERE c.document_srl = def_document_music.srl_bd) as `comment_count`, (SELECT count(b.srl) FROM def_file b WHERE b.target = def_document_music.file_sequence) as `file_count`', 'all');
		}
		
	}
	
?>