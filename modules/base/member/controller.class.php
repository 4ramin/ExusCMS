<?php

class member_controller extends member 
{
	
	function __construct() 
	{
		$this->base = new base();
		$this->pdo = $this->base->getPDO();
	}
	
	function init($args) 
	{
		$this->member = new stdClass;
		$this->member->module = $args->module;
		$this->member->model = new Member_Model($this);
		
		return $this->member;
	}
	
	function removePlaylist() 
	{
		$this->member->oBoardModel = $this->base->getModel('music');
		
		$target_srl = $this->base->post_params('target');
		$mExvar = unserialize($this->member->oBoardModel->getMemberExvar($_SESSION['logged_info']['user_id']));
		if (!$mExvar) 
		{
			$mExvar = Array();
			$mExvar['playlist'] = Array();
		}
		else
		{
			if (!in_array($target_srl, $mExvar['playlist'])) {
				return $this->base->response("type", "error", "html", "등록되지 않는 음악입니다.");
			}
			$mExvar['playlist'] = array_diff($mExvar['playlist'], array($target_srl));
		}
		
		if ($this->member->oBoardModel->UpdateMemberInfo($_SESSION['logged_info']['user_id'], serialize($mExvar))) 
		{
			return $this->base->response("type", "success", "html", "등록이 완료되었습니다.", "item", $target_srl);
		}
		else
		{
			return $this->base->response("type", "error", "html", "등록을 실패하였습니다.");
		}
	}
	
	function procBoardLogout() 
	{
		if ($this->base->isLogged()) 
		{
			$_SESSION = array();
			unset($_SESSION);
			session_unset();
			session_destroy();
			return $this->base->response("type", "sucess", "message", "성공적으로 로그아웃하였습니다.", "RToken", request::encodeBinaryNumbericPassword(date('His'),'001'));
		}
		else
		{
			return $this->base->response("type", "error", "message", "현재 로그인되어있지 않습니다.");
		}
	}
	
	function procBoardOAuthSignin() 
	{
		$args = va::args();
		$args->name = "oAuthType";
		$oAuthType = session::get($args);
		
		$args = va::args();
		$args->name = "oAuthInfo";
		$oAuthInfo = session::get($args);
		
		$this->post_data = new stdClass();
		$this->post_data->user_id = $oAuthInfo['userID'];
		$this->post_data->email = sprintf("%s@naver.com", $oAuthInfo['userID']);
		$this->post_data->password = $this->base->post_params('password');
		$this->post_data->nickname = $this->base->post_params('nickname');
		$this->member->model->insertOAuthMember(
			$this->post_data->user_id,
			$this->post_data->password,
			$this->post_data->nickname,
			FALSE,
			'',
			$this->post_data->email,
			$oAuthType,
			true
		);
		
		$_SESSION['is_logged'] = true;
		$_SESSION['logged_info'] = array(
			'user_id' => $this->post_data->user_id, 
			'nickname' => $this->post_data->nickname
		);
	}
	
	function procBoardLogin() 
	{
		if ($this->base->isLogged() === true) 
		{
			return $this->base->response("type", "error", "message", "이미 로그인중입니다.");
		}
		
		$this->post_data = new stdClass();
		$this->post_data->return_url = $this->base->post_params('return_url');
		$this->post_data->user_id = $this->base->post_params('user_id');
		$this->post_data->password = $this->base->post_params('password');
		$password_hash = $this->member->model->getPasswordHash($this->post_data->user_id);
		
		if (!$this->post_data->user_id) 
		{
			return $this->base->response("type", "error", "message", "아이디를 입력하세요");
		}
		elseif (!$this->post_data->password) 
		{
			return $this->base->response("type", "error", "message", "비밀번호를 입력하세요");
		}
		
		if (password_verify($this->post_data->password,$password_hash) && $password_hash!=NULL) 
		{
			$logged_info = $this->member->model->getMemberInfo($this->post_data->user_id);
			$_SESSION['is_logged'] = true;
			$_SESSION['logged_info'] = array('member_srl'=>$logged_info[0]['srl'],'user_id'=>$logged_info[0]['user_id'],'nickname'=>$logged_info[0]['nick_name'],'is_admin'=>$logged_info[0]['is_admin']);
			if (!empty($this->post_data->return_url)) 
			{
				return $this->base->response("type", "redirect", "html", $this->post_data->return_url);
			}
			else
			{
				return $this->base->response("type", "sucess", "message", "성공적으로 로그인하였습니다.", "RToken", request::encodeBinaryNumbericPassword(date('His'),'001'));
			}
		}
		else
		{
			return $this->base->response("type", "error", "message", "로그인을 실패하였습니다.");
		}
	}
	
	function procBoardSignin() 
	{
		$this->post_data = new stdClass();
		$this->post_data->email = $this->base->post_params('email');
		$this->post_data->user_id = $this->base->post_params('user_id');
		$this->post_data->password = $this->base->post_params('password');
		$this->post_data->nickname = $this->base->post_params('nickname');
		
		$can_signin = true;
		$nickname_cnt = $this->member->model->getisSinginedNickname($this->post_data->nickname);
		if ($nickname_cnt != 0) 
		{
			$can_signin = FALSE;
		}
		
		$userid_cnt = $this->member->model->getisSingined($this->post_data->user_id);
		
		if ($userid_cnt != 0) $can_signin = FALSE;
		
		if ($can_signin == true) 
		{
			$this->member->model->insertMember(
				$this->post_data->user_id,
				$this->post_data->password,
				$this->post_data->nickname,
				FALSE,
				'',
				$this->post_data->email
			);
			
			$_SESSION['is_logged'] = true;
			$_SESSION['logged_info'] = array('user_id'=>$this->post_data->user_id,'nickname'=>$this->post_data->nickname);
		}
		
		$args = va::args();
		$args->location = str::getUrl('');
		header::move($args);
		
	}
	
}
?>