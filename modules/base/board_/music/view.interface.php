<?php

	interface viewInterface 
	{
		
		public function init($args);
		public function dispBoardModify();
		public function dispOriginContent();
		public function dispAlbumContent();
		public function dispBoardWrite();
		public function dispBoardSetup();
		public function dispBoardExtraSetup();
		public function dispBoardCategorySetup();
		public function dispBoardSkinSetup();
		public function dispBoardPlaylist();
		public function dispBoardPopular();
		public function dispBoardAuthor();
		public function dispBoardOrigin();
		public function dispBoardAlbum();
		public function dispBoardTag();
		public function dispBoardTagList();
		//private function ajaxCall();
		//private function getPagination();
		//private function CheckDocument();
		public function getCommentPage();
		//private function CheckPage();
		public function dispBoardContent();
		
	}

?>