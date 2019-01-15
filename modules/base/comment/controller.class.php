<?php

	if (!defined("__FLOWER__")) exit();

	class comment_controller extends comment 
	{
		
		function __construct() 
		{
			parent::getHandler(TRUE);
		}
		
		function init($args):stdClass
		{
			$this->comment = new stdClass;
			$this->comment->module = $args->module;
			$this->comment->model = new comment_model($this);
			
			return $this->comment;
		}
		
		function insertComment() 
		{
			if (!$this->base->isLogged()) 
			{
				return $this->base->response("type", "error", "html", "댓글 작성 권한이 없습니다.");
			}
			
			$this->postData = new stdClass();
			$this->postData->srl = $this->base->post_params('srl');
			$this->postData->module_id = $this->base->post_params('module');
			$this->postData->content = $this->base->post_params('content');
			$this->postData->comment_srl = $this->base->post_params('comment_srl');
			$this->postData->parent_srl = $this->base->post_params('parent_srl');
			
			if (!isset($this->postData->content)) 
			{
				return $this->base->response("type", "error", "html", "내용을 입력하세요.");
			}
			
			if (mb_strlen($this->postData->content) < 5) 
			{
				return $this->base->response("type", "error", "html", "내용은 5자 이상을 적어야합니다.");
			}
			
			//댓글 수정
			if ($this->postData->comment_srl != null) 
			{
				$this->comment->child_comment_count = $this->comment->model->getParentCommentCount($this->postData->comment_srl);
				if ($this->comment->child_comment_count == 0) 
				{
					$this->comment->model->UpdateComment($this->postData->content, $this->postData->comment_srl);
					return $this->base->response("type", "success", "html", "댓글이 정상적으로 수정되었습니다.");
				} 
				else 
				{
					return $this->base->response("type", "error", "html", "대댓글이 달린 댓글은 수정할 수 없습니다.");
				}
			} 
			else 
			{
				//일반 댓글
				if (!isset($this->postData->parent_srl)) 
				{
					$lastid = $this->comment->model->getCommentSequence($this->postData->srl);
					$this->comment->model->insertCommentList
					(
						$this->postData->module_id,
						$this->postData->content,
						$_SESSION['logged_info']['nickname'],
						$this->postData->srl,
						$lastid,
						date("Ymdhis"),
						$_SESSION['logged_info']['member_srl']
					);
					
					$this->base->response("type", "success", "html", "댓글이 정상적으로 등록되었습니다.");
				} 
				//대댓글
				else 
				{
					$this->postData->absolute_pos = $this->comment->model->getCommentAbsolutePos($this->postData->parent_srl);
					$this->postData->comment_depth = $this->comment->model->getParentCommentDepth($this->postData->module_id, $this->postData->parent_srl);
					$this->postData->step = $this->comment->model->getCommentStep($this->postData->absolute_pos, $this->postData->module_id);
					
					$parentCommentItem = $this->comment->model->getCommentItem($this->postData->module_id, $this->postData->parent_srl);
					//$oNotificationController = $this->base->getController('notification');
					//$oNotificationController->insertNotification($parentCommentItem[0]['document_srl'], TRUE, $this->postData->content, $this->base->getMemberSrl(), $parentCommentItem[0]['member_srl']);
					
					//Depth가 존재한다면 추적
					if ($this->postData->comment_depth > 0) 
					{
						$escape_step = $this->comment->model->getParentCommentStep($this->postData->parent_srl);
						$this->comment->model->updateCommentDepth($escape_step, $this->postData->absolute_pos);
						$this->postData->step = $escape_step+1;
					}
					
					$this->postData->parent_srl = $this->comment->model->getCommentParentSrl($this->postData->parent_srl);
					$this->comment->model->insertParentCommentList
					(
						$this->postData->module_id, 
						$this->postData->content, 
						$_SESSION['logged_info']['nickname'], 
						$this->postData->srl, 
						$this->postData->parent_srl, 
						$this->postData->comment_depth+1, 
						$this->postData->absolute_pos,
						$this->postData->step,
						date("Ymdhis"),
						$_SESSION['logged_info']['member_srl']
					);
					
					return $this->base->response("type", "success", "html", "댓글이 정상적으로 등록되었습니다.");
				}
			}
		}
		
		function procCommentVote() 
		{
			if (!$this->base->isLogged()) 
			{
				return $this->base->response("type", "error", "html", "권한이 없습니다.");
			}
			
			$this->postData = new stdClass();
			$this->postData->srl = $this->base->post_params('srl');
			
			$voted_count = $this->comment->model->getCommentVotedCount($this->postData->srl);
			$voted_count = $voted_count +1;
			if ($this->comment->model->UpdateCommentVotedCount($voted_count, $this->postData->srl)) 
			{
				$this->base->response("type", "sucess", "html", $voted_count);
			}
		}
	
		function procCommentBlame() 
		{
			if (!$this->base->isLogged()) 
			{
				return $this->base->response("type", "error", "html", "권한이 없습니다.");
			}
			
			$this->postData = new stdClass();
			$this->postData->srl = $this->base->post_params('srl');
					
			$blamed_count = $this->comment->model->getCommentBlamedCount($this->postData->srl);
			$blamed_count = $blamed_count +1;
			if ($this->comment->model->UpdateCommentBlamedCount($blamed_count, $this->postData->srl)) 
			{
				$this->base->response("type", "sucess", "html", $blamed_count);
			}
		}
		
	}
?>