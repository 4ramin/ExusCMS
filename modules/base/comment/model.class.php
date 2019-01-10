<?php

	if(!defined("__FLOWER__")) exit();

	class comment_model extends comment 
	{
		
		protected $pdo;
		
		function __construct() 
		{
			parent::getHandler(TRUE);
		}
		
		/**
		 * 댓글 총개수를 가져온다.
		 *
		 * @param str $board
		 * @param int $document_srl
		 */
		function getCommentAllCount() 
		{
			return db::Query('SELECT','def_comment',[
			],'count(*)', 'one');
		}
	
		function getCommentListbySelect($count) 
		{
			$sth = $this->pdo->prepare("SELECT * FROM def_comment LIMIT :int");
			$sth->bindParam(':int', $count, PDO::PARAM_INT);
			$sth->execute();
			return $sth->fetchAll();
		}
		
	/* Comment */
	
		/**
		 * 댓글의 시퀀서를 가져온다.
		 *
		 * @param int $document_srl
		 */
		function getCommentSequence($document_srl) 
		{
			return db::Query('SELECT','def_comment',
			[
				['', 'document_srl', '=', ':document_srl', $document_srl],
				['ORDER', 'comment_srl', 'desc']
			],'comment_srl', 'one') + 1;
		}
			
		/**
		 * 자식 댓글의 stp을 가져온다.
		 *
		 * @param int $comment_srl
		 */
		function getParentCommentStep($comment_srl) 
		{
			return db::Query('SELECT','def_comment',
			[
				['', 'comment_srl', '=', ':comment_srl', $comment_srl]
			],'step', 'one');
		}
			
		/**
		 * 댓글의 Depth를 업데이트한다.
		 *
		 * @param int $step
		 * @param int $pos
		 */
		function updateCommentDepth($step, $pos) 
		{
			$sth = $this->pdo->prepare("UPDATE def_comment SET step = step +1 WHERE step > :step AND absolute_pos = :absolute_pos");
			$sth->bindParam(':step', $step, PDO::PARAM_INT);
			$sth->bindParam(':absolute_pos', $pos, PDO::PARAM_INT);
			$sth->execute();
		}
	
		/**
		 * 댓글 Step을 입력한다. (루트의 자식 srl)
		 *
		 * @param int $absolute_pos
		 * @param int $document_srl
		 */
		function getCommentStep($absolute_pos, $document_srl) 
		{
			return db::Query('SELECT','def_comment',
			[
				['AND', 'absolute_pos', '=', ':args1', $absolute_pos],
				['AND', 'module', '=', ':args2', $document_srl],
				['', 'parent_srl', '!=', ':args3', "0"]
			],'count(*)', 'one')+1;
		}
		
		/**
		 * 부모 댓글의 comment_srl 값을 가져온다.
		 *
		 * @param int $parent_srl
		 */
		function getCommentParentSrl($parent_srl) 
		{
			return db::Query('SELECT','def_comment',
			[
				['', 'comment_srl', '=', ':parent_srl', $parent_srl]
			],'comment_srl', 'one');
		}
		
		/**
		 * 부모 댓글의 comment_srl 값을 가져온다.
		 *
		 * @param int $parent_srl
		 */
		function getParentCommentCount($parent_srl) 
		{
			return db::Query('SELECT','def_comment',
			[
				['', 'parent_srl', '=', ':parent_srl', $parent_srl]
			],'count(*)', 'one');
		}
		
		/**
		 * 부모 댓글의 absolute_pos 값을 가져온다.
		 *
		 * @param int $parent_srl
		 */
		function getCommentAbsolutePos($parent_srl) 
		{
			return db::Query('SELECT','def_comment',
			[
				['', 'comment_srl', '=', ':parent_srl', $parent_srl]
			],'absolute_pos', 'one');
		}
			
		/**
		 * 대댓글을 입력한다.
		 *
		 * @param str $get_board
		 * @param str $post_content
		 * @param str $post_nick
		 * @param int $post_serial
		 * @param int $parent_srl
		 * @param int $depth
		 * @param int $absolute_pos
		 * @param int $step
		 */
		function insertParentCommentList($get_board, $post_content, $post_nick, $post_serial, $parent_srl, $depth, $absolute_pos, $step, $regdate, $member_srl) 
		{
			$sth = $this->pdo->prepare("INSERT INTO def_comment (content, module, document_srl, nick_name, parent_srl, depth, absolute_pos, step, regdate, member_srl) VALUES (:content, :module, :srl, :nickname, :parent_srl, :depth, :absolute_pos, :step, :regdate, :member_srl)");
			$sth->bindParam(':module', $get_board, PDO::PARAM_STR);
			$sth->bindParam(':content', $post_content, PDO::PARAM_STR);
			$sth->bindParam(':nickname', $post_nick, PDO::PARAM_STR);
			$sth->bindParam(':srl', $post_serial, PDO::PARAM_INT);
			$sth->bindParam(':parent_srl', $parent_srl, PDO::PARAM_INT);
			$sth->bindParam(':depth', $depth, PDO::PARAM_INT);
			$sth->bindParam(':absolute_pos', $absolute_pos, PDO::PARAM_INT);
			$sth->bindParam(':step', $step, PDO::PARAM_INT);
			$sth->bindParam(':regdate', $regdate, PDO::PARAM_STR);
			$sth->bindParam(':member_srl', $member_srl, PDO::PARAM_INT);
			$sth->execute();
		}
		
		/**
		 * 댓글을 입력한다.
		 *
		 * @param str $get_board
		 * @param str $post_content
		 * @param str $post_nick
		 * @param int $post_serial
		 * @param int $absolute_pos
		 */
		function insertCommentList($get_board, $post_content, $post_nick, $post_serial, $absolute_pos, $regdate, $member_srl) 
		{
			$sth = $this->pdo->prepare("INSERT INTO def_comment (content, module, document_srl, nick_name, absolute_pos, regdate, member_srl) VALUES (:content, :module, :srl, :nickname, :absolute_pos, :regdate, :member_srl)");
			$sth->bindParam(':module', $get_board, PDO::PARAM_STR);
			$sth->bindParam(':content', $post_content, PDO::PARAM_STR);
			$sth->bindParam(':nickname', $post_nick, PDO::PARAM_STR);
			$sth->bindParam(':srl', $post_serial, PDO::PARAM_INT);
			$sth->bindParam(':absolute_pos', $absolute_pos, PDO::PARAM_INT);
			$sth->bindParam(':regdate', $regdate, PDO::PARAM_STR);
			$sth->bindParam(':member_srl', $member_srl, PDO::PARAM_INT);
			$sth->execute();
		}
		
		/**
		 * 댓글 업데이트
		 *
		 * @param str $content
		 * @param int $comment_srl
		 */
		function UpdateComment($content, $comment_srl) 
		{
			return db::Query('UPDATE','def_comment',
			[
				['WHERE', 'content', '=', ':args1', $content],
				['', 'comment_srl', '=', ':args2', $comment_srl]
			],'', 'boolean');
		}
		
		function getCommentListWidget($get_board) 
		{
			return db::Query('SELECT','def_comment',
			[
				['', 'module', '=', ':args1', $get_board],
				['LIMIT', '5']
			],'*', 'all');
			
			$sth = $this->pdo->prepare("SELECT * FROM def_comment WHERE module = :bd LIMIT 5");
			$sth->bindParam(':bd', $get_board);
			$sth->execute();
			return $sth->fetchAll();
		}
	
		/**
		 * 댓글 총개수를 가져온다.
		 *
		 * @param str $board
		 * @param int $document_srl
		 */
		function getCommentCount($board, $document_srl) 
		{
			return db::Query('SELECT','def_comment',
			[
				['AND', 'module', '=', ':args1', $board],
				['', 'document_srl', '=', ':args2', $document_srl],
			],'count(*)', 'one');
		}
	
		function getCommentItem($board, $comment_srl) 
		{
			return db::Query('SELECT','def_comment',
			[
				['AND', 'module', '=', ':args1', $board],
				['', 'comment_srl', '=', ':args2', $comment_srl]
			],'*', 'all');
		}
	
		function getParentCommentDepth($board, $comment_srl) 
		{
			return db::Query('SELECT','def_comment',
			[
				['AND', 'module', '=', ':args1', $board],
				['', 'comment_srl', '=', ':args2', $comment_srl]
			],'depth', 'one');
		}
	
		/**
		 * 댓글 목록을 가져온다.
		 *
		 * @param str $board
		 * @param int $document_srl
		 * @param int $cpage
		 * @param int $ccount
		 */
		function getCommentList($board, $document_srl, $cpage, $ccount) 
		{
			$sth = $this->pdo->prepare("SELECT * FROM def_comment WHERE module = :bd AND document_srl = :srl ORDER by absolute_pos asc, step asc LIMIT :cpage, :ccount");
			$sth->bindParam(':bd', $board);
			$sth->bindParam(':srl', $document_srl, PDO::PARAM_INT);
			$sth->bindParam(':cpage', $cpage, PDO::PARAM_INT);
			$sth->bindParam(':ccount', $ccount, PDO::PARAM_INT);
			$sth->execute();
			return $sth->fetchAll();
		}
	
		/**
		 * 일정 반대 수 이상을 받은 댓글 목록을 가져온다.
		 *
		 * @param str $board
		 * @param int $document_srl
		 * @param int $cpage
		 * @param int $ccount
		 */
		function getBlamedCommentList($board, $document_srl, $cpage, $ccount) 
		{
			$sth = $this->pdo->prepare("SELECT * FROM def_comment WHERE module = :bd AND document_srl = :srl AND blame > 3 ORDER by absolute_pos asc, step asc LIMIT :cpage, :ccount");
			$sth->bindParam(':bd', $board);
			$sth->bindParam(':srl', $document_srl, PDO::PARAM_INT);
			$sth->bindParam(':cpage', $cpage, PDO::PARAM_INT);
			$sth->bindParam(':ccount', $ccount, PDO::PARAM_INT);
			$sth->execute();
			return $sth->fetchAll();
		}
	
		/**
		 * 일정 추천 수 이상을 받은 댓글 목록을 가져온다.
		 *
		 * @param str $board
		 * @param int $document_srl
		 * @param int $cpage
		 * @param int $ccount
		 */
		function getVotedCommentList($board, $document_srl, $cpage, $ccount) 
		{
			$sth = $this->pdo->prepare("SELECT * FROM def_comment WHERE module = :bd AND document_srl = :srl AND vote > 3 ORDER by absolute_pos asc, step asc LIMIT :cpage, :ccount");
			$sth->bindParam(':bd', $board);
			$sth->bindParam(':srl', $document_srl, PDO::PARAM_INT);
			$sth->bindParam(':cpage', $cpage, PDO::PARAM_INT);
			$sth->bindParam(':ccount', $ccount, PDO::PARAM_INT);
			$sth->execute();
			return $sth->fetchAll();
		}
	
		/**
		 * 댓글 추천 값을 가져온다.
		 *
		 * @param int $get_serial
		 */
		function getCommentVotedCount($comment_srl) 
		{
			return db::Query('SELECT','def_comment',
			[
				['', 'comment_srl', '=', ':args1', $comment_srl]
			],'vote', 'one');
		}
		
		/**
		 * 댓글 추천 값을 가져온다.
		 *
		 * @param int $get_serial
		 */
		function getCommentBlamedCount($comment_srl) 
		{
			return db::Query('SELECT','def_comment',
			[
				['', 'comment_srl', '=', ':args1', $comment_srl]
			],'blame', 'one');
		}
		
		/**
		 * 댓글 추천 업데이트
		 *
		 * @param int $voted_count
		 * @param int $comment_srl
		 */
		function UpdateCommentVotedCount($voted_count, $comment_srl) 
		{
			return db::Query('UPDATE','def_comment',
			[
				['WHERE', 'vote', '=', ':args1', $voted_count],
				['', 'comment_srl', '=', ':args2', $comment_srl]
			],'', 'boolean');
		}
		
		/**
		 * 댓글 추천 업데이트
		 *
		 * @param int $voted_count
		 * @param int $comment_srl
		 */
		function UpdateCommentBlamedCount($voted_count, $comment_srl) 
		{
			return db::Query('UPDATE','def_comment',
			[
				['WHERE', 'blame', '=', ':args1', $voted_count],
				['', 'comment_srl', '=', ':args2', $comment_srl]
			],'', 'boolean');
		}
		
		/**
		 * 비추천 업데이트
		 *
		 * @param int $voted_count
		 * @param int $get_serial
		 */
		function UpdateBlamedCount($voted_count, $get_serial) 
		{
			return db::Query('UPDATE','def_document_music',
			[
				['WHERE', 'blamed', '=', ':args1', $voted_count],
				['', 'srl', '=', ':args2', $get_serial]
			],'', 'boolean');
		}
	
	}
?>