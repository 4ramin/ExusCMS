<?php

	if (!defined("__FLOWER__")) exit();

	class install_view extends install{
		
		function __construct() {
			$this->base = new base();
		}
		
		function init() {
			$this->base->addCSS("/common/css/install_accept.css");
			$this->install = new stdClass;
			$this->install->default_action = "dispInstallLicense";
			
			return $this->install;
		}
		
		function dispInstallLicense() {
			$this->base->set('skin', sprintf("%s/install_accept.php", $this->install->tpl_path));
		}
		
		function dispInstallAccept() {
			$this->base->set('skin', sprintf("%s/db_info.php", $this->install->tpl_path));
		}
		
		function install() {
			$base = new base();
			$db_conn = array();
			$db_conn['localhost'] = $this->base->get_params('localhost');
			$db_conn['id'] = $this->base->get_params('id');
			$db_conn['password'] = $this->base->get_params('password');
			$db_conn['db'] = $this->base->get_params('db');
			$db_conn['admin_id'] = $this->base->get_params('admin_id');
			$db_conn['admin_password'] = $this->base->get_params('admin_password');
			$db_conn['admin_nickname'] = $this->base->get_params('admin_nickname');
			
			$args = va::args();
			$args->path = __DIR.'/file';
			
			$pdo_args = va::args();
			$pdo_args->db = $db_conn['db'];
			$pdo_args->user = $db_conn['id'];
			$pdo_args->password = $db_conn['password'];
			$pdo_args->catch_err = TRUE;
			$pdo = db::run($pdo_args);
			
			if (!$db_conn['localhost']) {
				$message = 'DB 로컬호스트를 입력하세요.';
			} else if (!$db_conn['db']) {
				$message = 'DB 이름을 입력하세요.';
			} else if (!$db_conn['id']) {
				$message = 'DB 아이디를 입력하세요.';
			} else if (!$db_conn['password']) {
				$message = 'DB 암호를 입력하세요.';
			} else if (!$db_conn['admin_id']) {
				$message = '관리자 아이디를 입력하세요.';
			} else if (!$db_conn['admin_password']) {
				$message = '관리자 아이디를 입력하세요.';
			} else if (!$db_conn['admin_nickname']) {
				$message = '관리자 닉네임을 입력하세요.';
			}
			
			if ($message) {
				include 'tpl/db_info.php';
				exit();
			} elseif (!$message) {
				if ($pdo)
				{
					$message = $pdo;
				}
			}
			
			if (dir::make($args)) {
				
				$DefineAddon = Db::getCreateQuery("def_addon", [
					[
						"column" => "activate_addon",
						"type" => "varchar",
						"size" => "250",
						"default" => "NULL"
					], [
						"column" => "type",
						"type" => "varchar",
						"size" => "250",
						"notnull" => "NOT NULL"
					]
				]);
				
				$sth = db::Compile($DefineAddon);
				db::getOutput($sth, 'boolean', '');
				
				$DefineAlbum = Db::getCreateQuery("def_album", [
					[
						"column" => "srl",
						"type" => "bigint",
						"size" => "11",
						"notnull" => "NOT NULL",
						"autoincrement" => true
					], [
						"column" => "album",
						"type" => "varchar",
						"size" => "250",
						"notnull" => "NOT NULL"
					]
				], 'srl', ["key" => "album", "name" => "album"]);
				
				$sth = db::Compile($DefineAlbum);
				db::getOutput($sth, 'boolean', '');
				
				$DefineArtist = Db::getCreateQuery("def_artist", [
					[
						"column" => "artist",
						"type" => "varchar",
						"size" => "250",
						"notnull" => "NOT NULL"
					]
				]);
				
				$sth = db::Compile($DefineArtist);
				db::getOutput($sth, 'boolean', '');
				
				$args = va::args();
				$args->append = TRUE;
				$args->from = __DIR.'/file/config/db.php';
				
				$args->content = "<?php\n".'if (!defined("__FLOWER__")) exit();'."\n".'$_prefix = \'db_conn\';';
				file::put($args);
				
				$args->content = '$db_conn[\'localhost\'] = "'.$db_conn['localhost'].'"'.";\n";
				file::put($args);
				
				$args->content = '$db_conn[\'user\'] = "'.$db_conn['id'].'"'.";\n";
				file::put($args);
				
				$args->content = '$db_conn[\'password\'] = "'.$db_conn['password'].'"'.";\n";
				file::put($args);
				
				$args->content = '$db_conn[\'db\'] = "'.$db_conn['db'].'"'.";\n";
				file::put($args);
				
				$args = va::args();
				$args->location = "http://www.naver.com";
				header::move($args);
			}
		}
		
	}
	
?>