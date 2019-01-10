<?php

	if(!defined("__FLOWER__")) exit();

	class rss_model extends rss
	{
		
		protected $pdo;
		
		function __construct($args)
		{
			$this->base = new base();
			$this->pdo = $this->base->getPDO();
		}
		
		
		function getDocumentListLIMIT($page_start)
		{
			$sth = $this->pdo->prepare("SELECT * FROM def_document_music ORDER by srl_bd desc LIMIT :page_start, 10");
			$sth->bindParam(':page_start', $page_start, PDO::PARAM_INT);
			$sth->execute();
			return $sth->fetchAll();
		}
	
	}
?>