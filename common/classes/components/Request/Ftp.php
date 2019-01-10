<?php

class ftp
{
	
	/**
	 * unzip
	 *
	 * @param  string args->from
	 * @param  string args->to
	 *
	 */
	public static function connect($args){
		$ip = $args->ip;
		$id = $args->id;
		$pw = $args->pw;
		
		$connector = ftp_connect($ip);
		$login_result = ftp_login($connector, $id, $pw);
		$self->connector = $login_result;
	}
	
	public static function close(){
		ftp_close(self->connector);
	}
}

?>