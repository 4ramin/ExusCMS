<?php

final class member_view extends member 
{
	
	function __construct() 
	{
		parent::getHandler(TRUE);
	}
	
	function init($args) {
		$this->member = new stdClass;
		if (!isset($args)) 
		{
			$args = new stdClass;
		}
		
		if (isset($args->module)) 
		{
			$this->member->module = $args->module;
		}
		
		return $this->member;
	}
	
	function dispMemberNaverOAuth() 
	{
		require 'naver.oauth.php';$nid_ClientID = "5JNNbiHDWxDylRg3Qv2m";
		
		$nid_ClientSecret = "X1t5e1a9lb";
		$nid_RedirectURL = "http://dm1527508376787.fun25.co.kr/index.php?mid=member&act=dispMemberNaverOAuth";
		$request = new OAuthRequest( $nid_ClientID, $nid_ClientSecret, $nid_RedirectURL );
		$request -> call_accesstoken();
		$request -> get_user_profile();
		
		$this->member->userID = $request->get_userID();
		$this->member->email = sprintf("%s@naver.com", $request->get_userID());
		$this->member->nickname = $request->get_nickname();
		
		$isMemberExists = $this->member->model->isExistOAuthMember("Naver", $this->member->email);
		
		if (is_array($isMemberExists)) 
		{
			$_SESSION['is_logged'] = true;
			$_SESSION['logged_info'] = array(
				'user_id'=>$this->member->userID, 
				'nickname'=>$this->member->nickname
			);
			
			$args = va::args();
			$args->location = str::getUrl('');
			header::move($args);
		} 
		else 
		{
			$args = va::args();
			$args->name = "oAuthType";
			$args->val = "Naver";
			session::set($args);
			
			$args = va::args();
			$args->name = "oAuthInfo";
			$args->val = $request->get_userInfo();
			session::set($args);
			
			$this->base->set('skin', sprintf('%s/naversignin.php', $this->member->tpl_path));
		}
	}
	
	function dispMemberNaverLogin() 
	{
		require 'naver.oauth.php';
		$nid_ClientID = "5JNNbiHDWxDylRg3Qv2m";
		$nid_ClientSecret = "X1t5e1a9lb";
		$nid_RedirectURL = "http://dm1527508376787.fun25.co.kr/index.php?mid=member&act=dispMemberNaverOAuth";
		$request = new OAuthRequest( $nid_ClientID, $nid_ClientSecret, $nid_RedirectURL );
		$request -> set_state();
		$request -> request_auth();
	}
	
	function dispMemberSignin() 
	{
		$this->base->set('skin', sprintf('%s/signin.php', $this->member->tpl_path));
	}
	
	function dispMemberInfo() 
	{
		$memberInfo = $this->member->model->getMemberInfo($this->base->getUserId());
		$this->member->email = $memberInfo[0]['email'];
		$this->member->nickname = $memberInfo[0]['nick_name'];
		$this->member->userId = $memberInfo[0]['user_id'];
		$this->base->set('skin', sprintf('%s/memberinfo.php', $this->member->tpl_path));
	}
	
	function dispMemberPlaylist() 
	{
		$oMusicModel = $this->base->getModel('music');
		$member_extravars = $oMusicModel->getMemberExvar($this->base->getUserId());
		
		$oFilesModel = $this->base->getModel('files');
		$extravars = unserialize($member_extravars);
		$playlist = $extravars['playlist'];
		
		$buff = array();
		foreach($playlist as $val) 
		{
			array_push(
				$buff, 
				array(
					'srl'=>$val,
					'file'=>$oFilesModel->getFileList($val)
				)
			);
		}
		
		$this->member->playlist = $buff;
		$this->base->set('skin', sprintf('%s/playlist.php', $this->member->tpl_path));
	}
	
	function dispMemberLogin() 
	{
		if (request::get_ref()) 
		{
			$this->member->return_url = request::get_ref();
		} 
		else 
		{
			$this->member->return_url = null;
		}
		
		$this->base->set('skin', sprintf('%s/login.php', $this->member->tpl_path));
	}
	
}

?>