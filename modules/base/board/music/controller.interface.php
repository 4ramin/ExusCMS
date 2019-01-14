<?php

	interface controllerInterface 
	{
		
		public function __construct();
		public function init($args);
		public function procBoardCategoryMoveFolder();
		public function procBoardCategoryFolderOut();
		public function procBoardCategoryMove();
		public function getAudiolyrics();
		public function procAddPlaylist();
		public function insertDocument();
		public function procBoardBlame();
		public function procBoardStar();
		public function procBoardVote();
		public function procRandomDocument();
		public function procRandomMusic();
		public function procBoardUpdateSinger();
		public function procBoardUpdateGenre();
		public function procBoardSetup();
		public function procBoardRelatedList();
		
	}

?>