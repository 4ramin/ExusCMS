<?php

class member_model extends member 
{
	
	function __construct() 
	{
		$this->base = new base();
		$this->pdo = $this->base->getPDO();
	}
	
	/**
	 * get member info
	 *
	 * @param string $user_id
	 */
	function getMemberInfo($user_id) 
	{
		$sth = $this->pdo->prepare("SELECT * FROM def_member WHERE user_id = :user_id");
		$sth->bindParam(':user_id', $user_id, PDO::PARAM_STR);
		$sth->execute();
		return $sth->fetchAll();
	}

	/**
	 * insert member
	 *
	 * @param string $user_id
	 * @param string $password
	 * @param string $nickname
	 * @param string $isadmin
	 * @param string $minfo
	 */
	function insertMember($user_id, $password, $nickname, $isadmin, $minfo, $email) 
	{
		$password =  password_hash($password, PASSWORD_DEFAULT); 
		$sth = $this->pdo->prepare("INSERT INTO def_member (user_id, password, nick_name, is_admin, minfo, email) VALUES (:userid, :password, :nickname, :isadmin, :minfo, :email)");
		$sth->bindParam(':userid', $user_id ,PDO::PARAM_STR);
		$sth->bindParam(':password', $password, PDO::PARAM_STR);
		$sth->bindParam(':nickname', $nickname, PDO::PARAM_STR);
		$sth->bindParam(':isadmin', $isadmin, PDO::PARAM_INT);
		$sth->bindParam(':minfo', $minfo, PDO::PARAM_STR);
		$sth->bindParam(':email', $email, PDO::PARAM_STR);
		$sth->execute();
	}
		
	/**
	 * insert member
	 *
	 * @param string $user_id
	 * @param string $password
	 * @param string $nickname
	 * @param string $isadmin
	 * @param string $minfo
	 */
	function insertOAuthMember($user_id, $password, $nickname, $isadmin, $minfo, $email, $oauth_type, $is_oauth) 
	{
		$password =  password_hash($password, PASSWORD_DEFAULT); 
		$sth = $this->pdo->prepare("INSERT INTO def_member (user_id, password, nick_name, is_admin, minfo, email, oauth_type, is_oauth) VALUES (:userid, :password, :nickname, :isadmin, :minfo, :email, :oauth_type, :is_oauth)");
		$sth->bindParam(':userid', $user_id ,PDO::PARAM_STR);
		$sth->bindParam(':password', $password, PDO::PARAM_STR);
		$sth->bindParam(':nickname', $nickname, PDO::PARAM_STR);
		$sth->bindParam(':isadmin', $isadmin, PDO::PARAM_INT);
		$sth->bindParam(':minfo', $minfo, PDO::PARAM_STR);
		$sth->bindParam(':email', $email, PDO::PARAM_STR);
		$sth->bindParam(':oauth_type', $oauth_type, PDO::PARAM_STR);
		$sth->bindParam(':is_oauth', $is_oauth, PDO::PARAM_INT);
		$sth->execute();
	}
		
	/**
	 * get member sign count
	 *
	 * @param string $user_id
	 */
	function getisSingined($user_id) 
	{
		if (isset($user_id)) 
		{
			$sth = $this->pdo->prepare("SELECT count(*) FROM def_member WHERE user_id = :user_id");
			$sth->bindParam(':user_id', $user_id, PDO::PARAM_STR);
			$sth->execute();
			$std_count = $sth->fetch();
			return $std_count[0];
		}
	}
		
	/**
	 * 배열에서 파일목록을 뽑아온다.
	 *
	 * @param array $array
	 */
	function isExistOAuthMember($oauth_type, $email) 
	{
		return db::Query('SELECT', 'def_member',
		[
			['AND', 'oauth_type', '=', ':args1', $oauth_type],
			['AND', 'is_oauth', '=', ':args2', 1],
			['', 'email', '=', ':args3', $email]
		],'*', 'all', 'data');
	}
		
	/**
	 * get password hash
	 *
	 * @param string $user_id
	 */
	function getPasswordHash($user_id) 
	{
		$sth = $this->pdo->prepare("SELECT password FROM def_member WHERE user_id = :user_id");
		$sth->bindParam(':user_id', $user_id, PDO::PARAM_STR);
		$sth->execute();
		$std_count = $sth->fetch();
		return $std_count[0];
	}

	/**
	 * get sign in nickname count
	 *
	 * @param string $nickname
	 */
	function getisSinginedNickname($nickname) 
	{
		if (isset($nickname)) 
		{
			$sth = $this->pdo->prepare("SELECT count(*) FROM def_member WHERE nick_name = :nickname");
			$sth->bindParam(':nickname', $nickname, PDO::PARAM_STR);
			$sth->execute();
			$std_count = $sth->fetch();
			return $std_count[0];
		}
	}
	
	/**
	 * 스킨값을 가져온다
	 *
	 * @param string $module
	 */
	function get_skin($module) 
	{
		if ($module) 
		{
			$sth = $this->pdo->prepare("SELECT skin FROM def_module WHERE module = :module");
			$sth->bindParam(':module', $module, PDO::PARAM_STR);
			$sth->execute();
			$result = $sth->fetch();
			if ($result) 
			{
				return $result[0];
			} 
			else 
			{
				return false;
			}
		} 
		else 
		{
			return false;
		}
	}
	
}
?>