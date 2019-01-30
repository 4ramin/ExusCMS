<?php 

class board_query extends BaseObject
{
	
	function __construct()
	{
		$this->board = new stdClass;
		$this->base = new base();
		$this->pdo = $this->base->getPDO();
	}
	
	/**
	 * Update Member Info
	 *
	 * @param String $user_id
	 * @param String $minfo
	 */
	function UpdateMemberInfo($user_id, $minfo):bool
	{
		$sth = $this->pdo->prepare("UPDATE def_member SET minfo = :minfo WHERE user_id = :user_id");
		$sth->bindParam(':user_id', $user_id, PDO::PARAM_STR);
		$sth->bindParam(':minfo', $minfo, PDO::PARAM_STR);
		$sth->execute();
		
		return true;
	}

	function updateCategoryCaption($list_order, $caption):bool 
	{
		$sth = $this->pdo->prepare("UPDATE def_category SET name = :caption WHERE list_order = :list_order");
		$sth->bindParam(':list_order', $list_order, PDO::PARAM_INT);
		$sth->bindParam(':caption', $caption, PDO::PARAM_STR);
		$sth->execute();
		
		return true;
	}
	
	/**
	 * Get Member Extravars
	 *
	 * @param String $user_id
	 */
	function getMemberExvar($user_id):string
	{
		$sth = $this->pdo->prepare("SELECT minfo FROM def_member WHERE user_id = :user_id");
		$sth->bindParam(':user_id', $user_id, PDO::PARAM_STR);
		$sth->execute();
		$std_count = $sth->fetch();
		
		return $std_count[0];
	}

	function getBoardSequence($module)
	{
		return db::Query('SELECT','def_document_music',
		[
			['', 'module', '=', ':module', $module],
			['ORDER', 'srl_bd', 'desc'],
			['LIMIT', ':pgx', 0, ':pgy', 1]
		],'srl_bd', 'one')+1;
	}

	/**
	 * Get All Board Count
	 *
	 * @param string $module
	 */
	function getBoardAllCount():int
	{
		return db::Query('SELECT', 'def_module', [], 'count(*)', 'one');
	}

	/**
	 * Get All Document Count
	 *
	 * @param string $module
	 */
	function getDocumentAllCount():int
	{
		return db::Query('SELECT','def_document_music',[
		],'count(*)', 'one');
	}

	function getDocumentListbySelect($count):array
	{
		$sth = $this->pdo->prepare("SELECT title FROM def_document_music ORDER by srl_bd desc LIMIT 0, :int");
		$sth->bindParam(':int', $count, PDO::PARAM_INT);
		$sth->execute();
		return $sth->fetchAll();
	}
	
	function getMemberListbySelect($count):array
	{
		$sth = $this->pdo->prepare("SELECT * FROM def_member LIMIT :int");
		$sth->bindParam(':int', $count, PDO::PARAM_INT);
		$sth->execute();
		return $sth->fetchAll();
	}
	
	/*
	 * 인기 키워드를 가져온다
	 */
	function getLysicsCount($module, $target_srl) 
	{
		return db::Query('SELECT','def_lysics',[
			['AND', 'target_srl', '=', ':args1', $target_srl],
			['', 'module', '=', ':args2', $module]
		],'count(*)', 'one', '', 'object');
	}

	function getLysicsFull($module, $srl) 
	{
		if ($this->getLysicsCount($module, $srl)->data() > 0)
		{
			return db::Query('SELECT', 'def_lysics', [
				['AND', 'target_srl', '=', ':args1', $srl],
				['', 'module', '=', ':args2', $module]
			],'lysics', 'one');
		}
	}

	function deleteDocument($documentSrl, $module) 
	{
		return db::Query('DELETE','def_document_music', [
			['AND', 'srl', '=', ':args1', $documentSrl],
			['', 'module', '=', ':args2', $module]
		],'', 'boolean');
	}

	function deleteCategory($list_order, $module) 
	{
		return db::Query('DELETE','def_category', [
			['AND', 'list_order', '=', ':list_order', $list_order],
			['', 'module', '=', ':module', $module]
		],'', 'boolean');
	}

	function getAutoIncrement($column)
	{
		$sth = $this->pdo->prepare("SELECT `auto_increment` FROM INFORMATION_SCHEMA.TABLES WHERE table_name = :column");
		$sth->bindParam(':column', $column, PDO::PARAM_STR);
		$sth->execute();
		
		$std_count = $sth->fetchAll();
		return array_shift($std_count)['auto_increment'];
	}
	
	function insertCategory($list_order, $type, $module, $name) 
	{
		$sth = $this->pdo->prepare("INSERT INTO def_category (list_order, type, module, name) VALUES (:list_order, :type, :module, :name)");
		$sth->bindParam(':list_order', $list_order, PDO::PARAM_INT);
		$sth->bindParam(':type', $type, PDO::PARAM_STR);
		$sth->bindParam(':module', $module, PDO::PARAM_STR);
		$sth->bindParam(':name', $name, PDO::PARAM_STR);
		$sth->execute();
	}
	
	function insertLysics($module, $target_srl, $lysics) 
	{
		$sth = $this->pdo->prepare("INSERT INTO def_lysics (target_srl, lysics, module) VALUES (:target_srl, :lysics, :module)");
		$sth->bindParam(':target_srl', $target_srl, PDO::PARAM_INT);
		$sth->bindParam(':lysics', $lysics, PDO::PARAM_STR);
		$sth->bindParam(':module', $module, PDO::PARAM_STR);
		$sth->execute();
	}
	
	function UpdateBitrate($get_serial, $bitrate):bool
	{
		$sth = $this->pdo->prepare("UPDATE def_document_music SET bitrate = :bitrate WHERE srl = :srl");
		$sth->bindParam(':bitrate', $bitrate, PDO::PARAM_STR);
		$sth->bindParam(':srl', $get_serial, PDO::PARAM_INT);
		$sth->execute();
		return TRUE;
	}
	
	/**
	 * Upload Document Artist
	 *
	 * @param string $artist
	 * @param string $get_board
	 * @param int $get_serial
	 */
	function UpdateAlbumOnly($srl, $mid, $album):bool
	{
		$sth = $this->pdo->prepare("UPDATE def_document_music SET album_only = :album WHERE srl = :srl AND module = :mid");
		$sth->bindParam(':album', $album, PDO::PARAM_STR);
		$sth->bindParam(':srl', $srl, PDO::PARAM_INT);
		$sth->bindParam(':mid', $mid, PDO::PARAM_STR);
		$sth->execute();
		return TRUE;
	}
	
	/**
	 * upload document artist
	 *
	 * @param string $artist
	 * @param string $get_board
	 * @param int $get_serial
	 */
	function UpdateTitleOnly($get_serial, $get_board, $title):bool
	{
		$sth = $this->pdo->prepare("UPDATE def_document_music SET title_only = :title WHERE srl = :srl AND module = :mid");
		$sth->bindParam(':title', $title, PDO::PARAM_STR);
		$sth->bindParam(':srl', $get_serial, PDO::PARAM_INT);
		$sth->bindParam(':mid', $get_board, PDO::PARAM_STR);
		$sth->execute();
		return TRUE;
	}

	/**
	 * upload file key
	 *
	 * @param int $get_serial
	 */
	function UpdateFileKey($get_serial):bool
	{
		$sth = $this->pdo->prepare("UPDATE def_file SET keyres = :rndkey WHERE target = :srl");
		$sth->bindParam(':rndkey', md5(str::getRandomString(10)), PDO::PARAM_STR);
		$sth->bindParam(':srl', $get_serial, PDO::PARAM_INT);
		$sth->execute();
		
		return true;
	}

	/**
	 * insert author
	 *
	 * @param string $author
	 */
	function insertAuthor($author) 
	{
		$sth = $this->pdo->prepare("INSERT INTO def_artist (artist) VALUES (:author)");
		$sth->bindParam(':author', $author, PDO::PARAM_STR);
		$sth->execute();
	}

	/**
	 * update genre
	 *
	 * @param string $genre
	 * @param int $get_serial
	 */
	function insertOriginAlbum($album) 
	{
		$sth = $this->pdo->prepare("INSERT INTO def_origin (album) VALUES (:album)");
		$sth->bindParam(':album', $album, PDO::PARAM_STR);
		$sth->execute();
	}

	/**
	 * 중복 썸네일을 한번만 요청할 수 있도록 MD5를 생성한다.
	 *
	 * @param string $md5
	 * @param string $module
	 * @param int $srl
	 */
	function UpdateThumbMd5($srl, $module, $md5) 
	{
		return db::Query('UPDATE', 'def_document_music', [
			['WHERE', 'thumbmd5', '=', ':args1', $md5],
			['AND', 'srl', '=', ':args2', $srl],
			['', 'module', '=', ':args3', $module]
		],'', 'boolean');
	}

	/**
	 * 댓글 추천 값을 가져온다.
	 *
	 * @param int $get_serial
	 */
	function insertExtraVar($target_srl, $name, $val) 
	{
		$sth = $this->pdo->prepare("INSERT INTO def_extravar (target_srl, name, val) VALUES (:target_srl, :name, :val)");
		$sth->bindParam(':target_srl', $target_srl, PDO::PARAM_INT);
		$sth->bindParam(':name', $name, PDO::PARAM_STR);
		$sth->bindParam(':val', $val, PDO::PARAM_STR);
		$sth->execute();
	}
	
	function updateDocument($post_title, $post_content, $post_date, $nickname, $post_board, $get_category, $board_serial, $file_sequence, $tag) 
	{
		return db::Query('UPDATE','def_document_music', [
			[',', 'title', '=', ':args1', $post_title],
			[',', 'file_sequence', '=', ':args2', $file_sequence],
			[',', 'tag', '=', ':args3', $tag],
			['WHERE', 'content', '=', ':args4', $post_content],
			['', 'srl', '=', ':args5', $board_serial]
		],'', 'boolean');
	}
	
	/**
	 * 문서를 입력한다
	 *
	 * @param string $post_title
	 * @param string $post_content
	 * @param string $post_date
	 * @param string $nickname
	 * @param string $post_board
	 * @param int $get_category
	 * @param int $board_serial
	 */
	function insertDocument($post_title, $post_content, $post_date, $nickname, $post_board, $get_category, $board_serial, $file_sequence, $tag, $membersrl) 
	{
		$sth = $this->pdo->prepare("INSERT INTO def_document_music (title, content, nick_name, module, regdate, category_srl, srl_bd, file_sequence, tag, member_srl) VALUES (:title, :content, :nick_name, :module, :date, :category_srl, :srlbd, :file_sequence, :tag, :member_srl)");
		$sth->bindParam(':title', $post_title, PDO::PARAM_STR);
		$sth->bindParam(':content', $post_content, PDO::PARAM_STR);
		$sth->bindParam(':nick_name', $nickname, PDO::PARAM_STR);
		$sth->bindParam(':module', $post_board, PDO::PARAM_STR);
		$sth->bindParam(':date', $post_date, PDO::PARAM_STR);
		$sth->bindParam(':category_srl', $get_category, PDO::PARAM_INT);
		$sth->bindParam(':srlbd', $board_serial, PDO::PARAM_INT);
		$sth->bindParam(':file_sequence', $file_sequence, PDO::PARAM_INT);
		$sth->bindParam(':tag', $tag, PDO::PARAM_STR);
		$sth->bindParam(':member_srl', $membersrl, PDO::PARAM_INT);
		
		$sth->execute();
	}
	
/* Tag, ETC */

	/*
	 * 인기 키워드를 가져온다
	 */
	function getKeywordPopular():string
	{
		return db::Query('SELECT', 'popular_keyword', [
			['ORDER', 'count', 'desc'],
			['LIMIT', '10']
		],'keyword', 'one');
	}

	/**
	 * get author count
	 *
	 * @param string $author\
	 */
	function getAuthorCount($author):int
	{
		return db::Query('SELECT', 'def_artist', [
			['', 'artist', '=', ':args1', $author]
		],'count(*)', 'one');
	}

	/*
	 * get Author List
	 */
	function getAuthor() 
	{
		return db::Query('!SELECT', 'def_artist', [
			['ORDER', 'artist', 'asc']
		],'*', 'all');
	}
	
	/**
	 * get original album
	 *
	 * @param int $pgx
	 */
	function getCategoryUnique($target, $destiny, $substr) 
	{
		$sth = $this->pdo->prepare("SELECT category_srl FROM def_category WHERE category_srl > :args2 AND category_srl < :args1 AND sub_srl IS null");
		$sth->bindParam(':args1', $target);
		$sth->bindParam(':args2', $destiny);
		$sth->execute();
		$std_count = $sth->fetchAll();
		return $std_count;
	}
	
	/**
	 * get original album
	 *
	 * @param int $pgx
	 */
	function getBetweenCategoryCount($target, $destiny) 
	{
		return db::Query('SELECT','def_category',[
			['AND', 'list_order', '>', ':args1', $target],
			['AND', 'list_order', '<', ':args2', $destiny],
			['', 'sub_srl', 'IS', 'NULL']
		],'count(list_order)', 'one', '', 'object');
	}
	
	/**
	 * get original album
	 *
	 * @param int $pgx
	 */
	function getCountInTargetDocument($moduleId, $srlbd) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':args1', $moduleId],
			['', 'srl_bd', '<', ':args2', $srlbd]
		],'count(*)', 'one', '', 'object');
	}
	
	function getCategoryNamebysrl($srl) 
	{
		return db::Query('SELECT','def_category',[
			['', 'category_srl', '=', ':args1', $srl]
		],'name', 'one');
	}
	
	function updateCategorySrl($target, $value) 
	{
		return db::Query('UPDATE','def_category',[
			['WHERE', 'category_srl', '=', ':args1', $value],
			['', 'category_srl', '=', ':args2', $target]
		],'', 'boolean');
	}
	
	function updateCategoryParentSrl($target, $value) 
	{
		$sth = $this->pdo->prepare("UPDATE def_category SET sub_srl = :args2 WHERE category_srl = :args1");
		$sth->bindParam(':args1', $target);
		$sth->bindParam(':args2', $value);
		$sth->execute();
		$std_count = $sth->fetchAll();
		return $std_count;
		
		return db::Query('UPDATE','def_category',[
			['WHERE', 'category_srl', '=', ':args1', $value],
			['', 'sub_srl', '=', ':args2', $target]
		],'', 'boolean');
	}
	
	function updateCategoryOrders($target, $destination) 
	{
		$sql = "UPDATE def_category a inner join def_category b on a.list_order <> b.list_order set a.list_order = b.list_order where a.list_order in ( :args1, :args2 ) and b.list_order in ( :args3, :args4 )";
		$sth = $this->pdo->prepare($sql);
		$sth->bindParam(':args1', $target, PDO::PARAM_INT);
		$sth->bindParam(':args2', $destination, PDO::PARAM_INT);
		$sth->bindParam(':args3', $destination, PDO::PARAM_INT);
		$sth->bindParam(':args4', $target, PDO::PARAM_INT);
		$sth->execute();
	}
	
	function exchangeCategory($target, $destiny) 
	{
		
		//$sql = "UPDATE def_category old JOIN def_category new USING (id) SET old.category_srl = new.category_srl, new.category_srl = old.category_srl, new.name = old.name WHERE  old.category_srl = :args1, new.category_srl = :args2";
		
		$sql = "UPDATE def_category a inner join def_category b on a.category_srl <> b.category_srl set a.type = b.type, a.name = b.name, a.sub_srl = b.sub_srl where a.category_srl in ( :args1, :args2 ) and b.category_srl in ( :args3, :args4 )";
		$sth = $this->pdo->prepare($sql);
		$sth->bindParam(':args1', $target, PDO::PARAM_INT);
		$sth->bindParam(':args2', $destiny, PDO::PARAM_INT);
		$sth->bindParam(':args3', $target, PDO::PARAM_INT);
		$sth->bindParam(':args4', $destiny, PDO::PARAM_INT);
		$sth->execute();
	}
	
	/**
	 * get original album
	 *
	 * @param int $pgx
	 */
	function getCategoryListWithoutSubCategory($module) 
	{
		return  db::Query('SELECT','def_category',[
			['AND', 'module', '=', ':args1', $module],
			['', 'sub_srl', 'IS', 'null'],
			['ORDER', 'list_order', 'asc']
		],'*', 'all');
	}

	function getGapInModule($start, $end, $target)
	{
		//$sql = "SELECT count(seq2.seq), count(seq.seq) FROM seq_{$startA}_to_{$endA} seq, seq_{$startB}_to_{$endB} seq2 where seq.seq not in (select c.srl_bd from def_document_music c WHERE c.module = 'index') AND seq2.seq not in (select d.srl_bd from def_document_music d WHERE d.module = :args1)";
		$sql = "SELECT count(seq.seq) FROM seq_{$start}_to_{$end} seq where seq.seq not in (select c.srl_bd from def_document_music c WHERE c.module = :args1)";
		$sth = db::Compile($sql);
		db::BindParams($sth, [
			"args1" => $target
		], "");
		
		$output = db::getOutput($sth, 'one', "object");
		return $output;
	}

	/**
	 * get original album
	 *
	 * @param int $pgx
	 */
	function getSubCategoryList($module, $subsrl) 
	{
		return  db::Query('SELECT','def_category',[
			['AND', 'module', '=', ':args1', $module],
			['', 'sub_srl', '=', ':args2', $subsrl],
			['ORDER', 'list_order', 'asc']
		],'*', 'all');
	}

	function getCategoryListAndCount($module) 
	{
		if (!isset($_GLOBALS['__BOARD__CATEGORY__'.$module])) 
		{
			$sql = "SELECT DISTINCT a.name as 'name', a.category_srl as 'category_srl', (SELECT count(c.category_srl) FROM def_document_music c WHERE a.category_srl = c.category_srl) as 'count' FROM def_category a LEFT outer join def_document_music b on b.category_srl = a.category_srl WHERE a.module = :args1";
			$sth = db::Compile($sql);
			db::BindParams($sth, ["args1"=>$module], "");
			$output = db::getOutput($sth, 'all', "object");
			$_GLOBALS['__BOARD__CATEGORY__'.$module] = $output->data();
		}
		
		return $_GLOBALS['__BOARD__CATEGORY__'.$module];
	}


	/**
	 * get original album
	 *
	 * @param int $pgx
	 */
	function getCategoryList($module) 
	{
		return  db::Query('SELECT','def_category',[
			['', 'module', '=', ':args1', $module],
			['ORDER', 'list_order', 'asc']
		],'*', 'all');
	}

	/**
	 * get original album
	 *
	 * @param int $pgx
	 */
	function getCategorySubList($module) 
	{
		return db::Query('SELECT','def_category',[
			['', 'sub_srl', '=', ':args1', $module]
		],'*', 'all');
	}

/* Album */

	/**
	 * get album files
	 *
	 * @param string $album
	 */
	function getAlbumFilesAll($album) 
	{
		return db::Query('SELECT','def_document_music',[
			['', 'album_sort_target', '=', ':args1', $album],
			['ORDER', 'album_sort_target', 'asc']
		],'srl', 'all');
	}
	
	/**
	 * get album files
	 *
	 * @param string $album
	 */
	function getAllOriginAlbum($album) 
	{
		return db::Query('SELECT','def_document_music',[
			['', 'album_only', '=', ':args1', $album],
			['ORDER', 'album_only', 'asc']
		],'srl', 'all');
	}

	function getOriginAlbumFilesLIKEAll($album) 
	{
		return db::Query('SELECT','def_document_music',[
			['', 'album_only', 'LIKE', ':args1', "%$album%"],
			['ORDER', 'album_only', 'asc']
		],'srl', 'all');
	}

	function getOriginAlbumbysrl($srl) 
	{
		return db::Query('SELECT','def_origin',[
			['', 'srl', '=', ':args1', $srl]
		],'album', 'one');
	}

	/**
	 * get original album
	 *
	 * @param int $pgx
	 */
	function getAlbumbysrl($srl) 
	{
		return db::Query('SELECT','def_album',[
			['', 'srl', '=', ':args1', $srl]
		],'album', 'one');
	}
	
	/**
	 * get album count
	 */
	function getOriginAlbumCount() 
	{
		return db::Query('SELECT','def_origin',[],'count(*)', 'one');
	}
		
	/**
	 * get album count
	 */
	function getOriginAlbumCountbyAlbum($album) 
	{
		return db::Query('SELECT','def_origin',[
			['', 'album', '=', ':args1', $album]
		]
		,'count(*)', 'one');
	}
		
	/**
	 * get original album
	 *
	 * @param int $pgx
	 */
	function getOriginalAlbumSrlbyAlbum($album) 
	{
		return db::Query('SELECT','def_origin',[
			['', 'album', '=', ':args1', $album]
		],'srl', 'one');
	}

	/**
	 * get original album
	 *
	 * @param int $pgx
	 */
	function getOriginAlbum($pgx) 
	{
		return db::Query('!SELECT','def_origin',[
			['ORDER', 'album', 'asc'],
			['LIMIT', ':pgx', $pgx, ':pgy',20]
		],'*', 'all');
	}

	function getAlbumFiles($album) 
	{
		return db::Query('SELECT','def_document_music',[
			['', 'album_sort_target', '=', ':args1', $album],
			['LIMIT', '1']
		],'srl', 'one');
	}

	/**
	 * 앨범 개수를 가져온다
	 */
	function getAlbumCount() 
	{
		return db::Query('SELECT','def_album',[],'count(*)', 'one');
	}
	
	function getdef_albumumentlistBetween($module, $page_start, $page_end) 
	{
		return db::Query('SELECT','album_bd',[
			['AND', 'module', '=', ':module', $module],
			['AND', 'srl_bd', 'BETWEEN', ':args2', $page_start],
			['ORDER', 'srl_bd', 'asc', ':page_end', $page_end]
		],'*', 'all');
	}

/* Module */

	/**
	 * 스킨값을 가져온다
	 *
	 * @param string $module
	 */
	function get_skin($module) 
	{
		return db::Query('SELECT','def_module',[
			['', 'module', '=', ':args1', $module]
		],'skin', 'one');
	}
	
	/**
	 * 스킨값을 가져온다
	 *
	 * @param string $module
	 */
	function getModuleLayoutbyBoard($module) 
	{
		return db::Query('SELECT','def_module',[
			['', 'bdname', '=', ':args1', $module]
		],'layout', 'one');
	}
	
	function getModuleConfig($module) 
	{
		return db::Query('SELECT','def_module_config',[
			['', 'module', '=', ':module', $module]
		],'config', 'one');
	}
	
/* File */

	/**
	 * 배열에서 파일목록을 뽑아온다.
	 *
	 * @param array $array
	 */
	function getFileItemsArray($array) 
	{
		return db::Query('SELECT','def_file',[
			['', 'target', 'IN', '[]', $array]
		],'*', 'all');
	}

	function getPopularFilesCount($module, $down_count) 
	{
		return db::Query('SELECT','def_file',[
			['AND', 'module', '=', ':args1', $module],
			['AND', 'down', '>=', ':args2', $down_count],
			['', 'origin', 'LIKE', "'%.mp3'"],
			['ORDER', 'down', 'desc']
		],'count(*)', 'one');
	}

/* Album */

	function getOriginAlbumFiles($album) 
	{
		$sth = $this->pdo->prepare("SELECT srl FROM def_document_music WHERE album_only = :album ORDER BY album_sort_target asc LIMIT 1");
		$sth->bindParam(':album', $album, PDO::PARAM_STR);
		$sth->execute();
		$std_count = $sth->fetch();
		return $std_count[0];
	}
	
	function getOriginAlbumLIKEFiles($album) 
	{
		$album = "%$album%";
		$sth = $this->pdo->prepare("SELECT srl FROM def_document_music WHERE album_only LIKE :album ORDER BY album_sort_target asc LIMIT 1");
		$sth->bindParam(':album', $album);
		$sth->execute();
		$std_count = $sth->fetch();
		return $std_count[0];
	}
	
	/**
	 * upload album
	 *
	 * @param int $pgx
	 */
	function getAlbum($pgx) 
	{
		return db::Query('!SELECT','def_album',[
			['LIMIT', ':pgx', $pgx, ':pgy', 20],
		],'*', 'all');
	}
	
/* Vote */

	/**
	 * 비추천 값을 가져온다.
	 *
	 * @param int $get_serial
	 */
	function getBlamedCount($get_serial) 
	{
		return db::Query('SELECT','def_document_music',[
			['', 'srl', '=', ':srl', $get_serial]
		],'blamed', 'one');
	}

	/**
	 * 댓글 추천 값을 가져온다.
	 *
	 * @param int $get_serial
	 */
	function getDocumentStarCount($srl) 
	{
		return db::Query('SELECT','def_document_music',[
			['', 'srl', '=', ':args1', $srl]
		],'star', 'one');
	}
	
	/**
	 * 댓글 추천 값을 가져온다.
	 *
	 * @param int $get_serial
	 */
	function getDocumentStarVotedCount($srl) 
	{
		return db::Query('SELECT','def_document_music',[
			['', 'srl', '=', ':args1', $srl]
		],'star_cnt', 'one');
	}
	
	/**
	 * 댓글 추천 값을 가져온다.
	 *
	 * @param int $get_serial
	 */
	function getExtraVar($module) 
	{
		return db::Query('SELECT','def_extra',[
			['', 'module', '=', ':args1', $module]
		],'*', 'all');
	}
	
	/**
	 * 댓글 추천 값을 가져온다.
	 *
	 * @param int $get_serial
	 */
	function getExtraVarTypebyName($name, $type) 
	{
		return db::Query('SELECT','def_extra',[
			['', 'val', '=', ':args1', $name]
		],$type, 'one');
	}
	
	/**
	 * 댓글 추천 값을 가져온다.
	 *
	 * @param int $get_serial
	 */
	function getExtraVars($target_srl) 
	{
		return db::Query('SELECT','def_extravar',[
			['', 'target_srl', '=', ':args1', $target_srl]
		],'*', 'all');
	}
	
	/**
	 * 댓글 추천 업데이트
	 *
	 * @param int $voted_count
	 * @param int $comment_srl
	 */
	function UpdateDocumentStarCount($voted_count, $comment_srl) 
	{
		return db::Query('UPDATE','def_document_music',[
			['WHERE', 'star', '=', ':args1', $voted_count],
			['', 'srl', '=', ':args2', $comment_srl]
		],'', 'boolean');
	}
	
	/**
	 * 댓글 추천 업데이트
	 *
	 * @param int $voted_count
	 * @param int $comment_srl
	 */
	function UpdateDocumentStarVotedCount($voted_count, $comment_srl) 
	{
		return db::Query('UPDATE','def_document_music',[
			['WHERE', 'star_cnt', '=', ':args1', $voted_count],
			['', 'srl', '=', ':args2', $comment_srl]
		],'', 'boolean');
	}
	
	/**
	 * 추천 값을 가져온다.
	 *
	 * @param int $srl
	 */
	function getVotedCount($srl) 
	{
		return db::Query('SELECT','def_document_music',[
			['', 'srl', '=', ':srl', $srl]
		],'voted', 'one', '', 'object');
	}

	/**
	 * 추천 업데이트
	 *
	 * @param int $voted_count
	 * @param int $get_serial
	 */
	function UpdateVotedCount($voted_count, $get_serial) 
	{
		return db::Query('UPDATE','def_document_music',[
			['WHERE', 'voted', '=', ':args1', $voted_count],
			['', 'srl', '=', ':args2', $get_serial]
		],'', 'boolean');
	}
		
/* Document Count */

	function getDocumentCountbyBoardbyAuthor($module, $author) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':args1', $module],
			['', 'artist', '=', ':args2', $author]
		],'count(*)', 'one');
	}
	
	function getDocumentCountbyGenre($get_board, $genre) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':args1', $get_board],
			['', 'genre', '=', ':args2', $genre]
		],'count(*)', 'one');
	}
	
	/**
	 * 일정 태그값을 갖는 문서 개수를 가져온다.
	 *
	 * @param string $module
	 * @param string $tag
	 */
	function getDocumentCountbyTag($module, $tag) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':args1', $module],
			['', 'tag', '=', ':tag', $tag]
		],'count(*)', 'one');
	}

	function getDocumentCountbyCategory($module, $category) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':module', $module],
			['', 'category_srl', '=', ':category', $category]
		],'count(*)', 'one');
	}

	function getDocumentCountbyCategoryArticle($module, $category, $keyword, $target) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':args1', $module],
			['AND', 'category_srl', '=', ':args2', $category],
			['', $target, 'LIKE', ':args3', "%$keyword%"]
		],'count(*)', 'one');
	}

	function getDocumenCountbyAuthor($module, $page_start, $page_end, $author) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':bd', $module],
			['', 'artist', 'LIKE', ':author', "%$author%"],
			['ORDER', 'srl_bd', 'desc']
		],'count(*)', 'one');
	}
		
	function getDocumenCountbyOriginAlbum($module, $page_start, $author) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':bd', $module],
			['', 'album_only', 'LIKE', ':author', "%$author%"],
			['ORDER', 'srl_bd', 'desc']
		],'count(*)', 'one');
	}
	
	/**
	 * 특정 제목 오리지널을 갖는 문서 개수를 가져온다
	 *
	 * @param string $module
	 * @param string $title_origin
	 * @param   int  $page_start
	 */
	function getDocumenCountbyOriginTitle($module, $page_start, $title_only) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':module', $module],
			['', 'title_only', 'LIKE', ':author', "%$title_only%"],
			['ORDER', 'srl_bd', 'desc']
		],'count(*)', 'one');
	}
	
	/**
	 * 특정 제목을 갖는 문서 개수를 가져온다
	 *
	 * @param string $module
	 * @param string $title
	 * @param   int  $page_start
	 */
	function getDocumenCountbyColumn($module, $page_start, $title, $type) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':module', $module],
			['', $type, 'LIKE', ':title', "%$title%"],
			['ORDER', 'srl_bd', 'desc']
		],'count(*)', 'one');
	}
		
	/**
	 * 특정 제목을 갖는 문서 개수를 가져온다
	 *
	 * @param string $module
	 * @param string $title
	 * @param   int  $page_start
	 */
	function getDocumenCountbyTitle($module, $page_start, $title) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':module', $module],
			['', 'title', 'LIKE', ':title', "%$title%"],
			['ORDER', 'srl_bd', 'desc']
		],'count(*)', 'one');
	}
		
	/**
	 * 특정 태그값을 갖는 문서개수를 가져온다
	 *
	 * @param string $module
	 * @param string $tag
	 * @param   int  $page_start
	 */
	function getDocumenCountbyTag($module, $page_start, $page_end, $tag) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':args1', $module],
			['', 'tag', 'LIKE', ':args2', "%$tag%"],
			['ORDER', 'srl_bd', 'desc']
		],'count(*)', 'one');
	}
	
	/**
	 * 특정 모듈값을 갖는 문서 개수를 가져온다
	 *
	 * @param string $module
	 */
	function getDocumentCountbyBoardId($module) 
	{
		$prefix = sprintf('__DOCUMENT__COUNT__QUERY__%s', $module);
		
		if (!isset($_GLOBALS[$prefix])) 
		{
			$count = db::Query('SELECT','def_document_music',[
				['', 'module', '=', ':args1', $module]
			],'count(*) as `count`', 'one');
			
			$_GLOBALS[$prefix] = $count;
			
			return $_GLOBALS[$prefix];
		}
		else
		{
			echo $module.$_GLOBALS[$prefix];
			return $_GLOBALS[$prefix];
		}
	}
	
/* Document List */

	/**
	 * 일정 카테고리값을 갖는 문서를 가져온다.
	 *
	 * @param string $module
	 * @param string $tag
	 */
	function getDocumentlistBetweenCategory($module, $page_start, $page_end, $tag) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':args1', $module],
			['', 'tag', '=', ':args2', $tag],
			['ORDER', 'srl_bd', 'desc'],
			['LIMIT', ':pgx', $page_start, ':pgy', 20],
		],'*', 'all');
	}

	function getDocumentlistBetweenAuthor($module, $page_start, $page_end, $tag) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':args1', $get_board],
			['', 'artist', 'LIKE', ':args2', "%$tag%"],
			['ORDER', 'srl_bd', 'desc'],
			['LIMIT', ':pgx', $page_start],
		],'*', 'all');
	}

	function getDocumentlistTagRelatedSrlCount($module, $tag) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':args1', $module],
			['', 'tag', 'LIKE', ':args2', "%$tag%"],
			['ORDER', 'srl_bd', 'desc']
		],'count(*)', 'one');
	}
	
	function getTagRelatedDocumentSrl($module, $tag) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':args1', $module],
			['', 'tag', 'LIKE', ':args2', "%$tag%"],
			['ORDER', 'srl_bd', 'desc']
		],'srl', 'all');
	}
	
	/**
	 * 태그 연관글 문서 리스트를 가져온다.
	 *
	 * @param str $get_board
	 * @param int $page_start
	 * @param int $page_end
	 * @param str $tag
	 */
	function getRelatedTagList($get_board, $page_start, $page_end, $tag) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':args1', $get_board],
			['', 'tag', 'LIKE', ':args2', "%$tag%"],
			['ORDER', 'srl_bd', 'desc'],
			['LIMIT', ':pgx', $page_start ? $page_start : 0, ':pgy', 5],
		],'*', 'all');
	}

	/**
	 * 임의의 문서를 가져온다.
	 *
	 * @param str $get_board
	 * @param int $page_start
	 */
	function getRandomDocumentList($get_board, $page_start) 
	{
		$sth = $this->pdo->prepare("SELECT * FROM def_document_music WHERE module = :bd ORDER BY srl_bd desc LIMIT :pgx, 1");
		$sth->bindParam(':bd', $get_board, PDO::PARAM_STR);
		$sth->bindParam(':pgx', $page_start, PDO::PARAM_INT);
		$sth->execute();
		return $sth->fetchAll();
	}

	/**
	 * 임의의 문서를 가져온다.
	 *
	 * @param str $get_board
	 * @param int $page_start
	 */
	function getDocumentListInDocumentSrls($array, $get_board, $page_start) 
	{
		return db::Query('SELECT','def_document_music',[
			['', 'srl', 'IN', '[]', $array]
		],'*', 'all');
	}

	/* LIKE */
	
	/**
	 * Author 태그(LIKE) 값을 갖는 문서 목록을 가져온다
	 *
	 * @param string $module
	 * @param string $tag
	 * @param   int  $page_start
	 */
	function getDocumentlistBetweenbyAuthor($module, $page_start, $author) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':args1', $module],
			['', 'artist', 'LIKE', ':args2', "%$author%"],
			['ORDER', 'srl_bd', 'desc'],
			['LIMIT', ':pgx', $page_start, ':pgy', 20],
		],'*', 'all');
	}
		
	/**
	 * 앨범 태그(LIKE) 값을 갖는 문서 목록을 가져온다
	 *
	 * @param string $module
	 * @param string $tag
	 * @param   int  $page_start
	 */
	function getDocumentlistBetweenbyOriginAlbum($module, $page_start, $author) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':args1', $module],
			['', 'album_only', 'LIKE', ':args2', "%$author%"],
			['ORDER', 'srl_bd', 'desc'],
			['LIMIT', ':pgx', $page_start, ':pgy', 20],
		],'*', 'all');
	}
	
	/**
	 * 제목 오리지널(LIKE) 값을 갖는 문서 목록을 가져온다
	 *
	 * @param string $module
	 * @param string $tag
	 * @param   int  $page_start
	 */
	function getDocumentlistBetweenbyOriginTitle($module, $page_start, $author) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':args1', $module],
			['', 'title_only', 'LIKE', ':args2', "%$author%"],
			['ORDER', 'srl_bd', 'desc'],
			['LIMIT', ':pgx', $page_start, ':pgy', 20],
		],'*', 'all');
	}
	
	/**
	 * 태그(LIKE) 값을 갖는 문서 목록을 가져온다
	 *
	 * @param string $module
	 * @param string $tag
	 * @param   int  $page_start
	 */
	function getDocumentlistBetweenbyTag($module, $page_start, $tag) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':args1', $module],
			['', 'tag', 'LIKE', ':args2', "%$tag%"],
			['ORDER', 'srl_bd', 'desc']
		],'*', 'all');
	}

	/* * */
	
	function getDocumentlistBetweenbyCategory($get_board, $page_start, $page_end, $get_category) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':args1', $get_board],
			['', 'category_srl', '=', ':args2', $get_category],
			['ORDER', 'srl_bd', 'desc'],
			['LIMIT', ':pgx', $page_start, ':pgy', $page_end],
		],'*', 'all');
	}

	function getDocumentlistBetweenbyCategoryArticle($get_board, $page_start, $page_end, $get_category, $keyword, $target) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':args1', $get_board],
			['AND', 'category_srl', '=', ':args2', $get_category],
			['', $target, 'LIKE', ':args3', "%$keyword%"],
			['ORDER', 'srl_bd', 'desc'],
			['LIMIT', ':pgx', $page_start, ':pgy', $page_end],
		],'*', 'all');
	}

	/**
	 * 태그 리스트를 가져온다.
	 */
	function getTagList() 
	{
		return db::Query('SELECT','def_tag',[
		],'*', 'all');
	}
	
	/**
	 * 특정 문서번호값을 갖는 문서를 가져온다.
	 *
	 * @param int $srl
	 */
	function getDocumentItem($srl) 
	{
		return db::Query('SELECT','def_document_music',[
			['', 'srl', '=', ':srl', $srl]
		],'*', 'self');
	}
	
	
	/**
	 * 인기글을 가져온다.
	 *
	 * @param str $module
	 * @param int $down_count
	 * @param int $page_start
	 * @param int $list_count
	 */
	function getPopularQueryByJoin($module, $down_count, $page_start, $list_count) 
	{
		$sth = $this->pdo->prepare("SELECT def_document_music.*, 
			(SELECT count(b.srl) FROM def_file b WHERE b.target = def_document_music.file_sequence) as `file_count`,
			(SELECT count(c.comment_srl) FROM def_comment c WHERE c.document_srl = def_document_music.srl_bd) as `comment_count`, 
			(SELECT name FROM def_category d WHERE d.category_srl = def_document_music.category_srl) as `category_caption` 
			FROM def_document_music JOIN def_file ON def_document_music.file_sequence = def_file.target WHERE down >= :down AND def_document_music.module = :module AND origin LIKE '%.mp3' ORDER by down desc LIMIT :px, :pgy");
		$sth->bindParam(':module', $module,PDO::PARAM_INT);
		$sth->bindParam(':px', $page_start,PDO::PARAM_INT);
		$sth->bindParam(':down', $down_count,PDO::PARAM_INT);
		$sth->bindParam(':pgy', $list_count,PDO::PARAM_INT);
		$sth->execute();
		return $sth->fetchAll();
	}
	/**
	 * 인기글을 가져온다.
	 *
	 * @param str $module
	 * @param int $down_count
	 * @param int $page_start
	 * @param int $list_count
	 */
	function getPopularDocumentList($module, $down_count, $page_start, $list_count) 
	{
		$sth = $this->pdo->prepare("SELECT * FROM def_document_music AS BD, (SELECT target AS FD FROM def_file WHERE down >= :down AND module = :module AND origin LIKE '%.mp3' ORDER by down desc LIMIT :px, :pgy) AS temp WHERE BD.srl = FD");
		$sth->bindParam(':module', $module,PDO::PARAM_INT);
		$sth->bindParam(':px', $page_start,PDO::PARAM_INT);
		$sth->bindParam(':down', $down_count,PDO::PARAM_INT);
		$sth->bindParam(':pgy', $list_count,PDO::PARAM_INT);
		$sth->execute();
		return $sth->fetchAll();
	}

	/**
	 * get document list between title
	 *
	 * @param string $module
	 * @param string $title
	 * @param   int  $page_start
	 */
	function getAllDocumentListbyColumn($page_start, $title, $type) 
	{
		return db::Query('SELECT','def_document_music',[
			['', $type, 'LIKE', ':args1', "%$title%"],
			['ORDER', 'srl_bd', 'desc'],
			['LIMIT', ':pgx', $page_start, ':pgy', 20],
		],'*', 'all');
	}
	
	/**
	 * get document list between title
	 *
	 * @param string $module
	 * @param string $title
	 * @param   int  $page_start
	 */
	function getAllDocumentListbyColumnCount($title, $type) 
	{
		return db::Query('SELECT','def_document_music',[
			['', $type, 'LIKE', ':args1', "%$title%"]
		],'count(*)', 'one');
	}
	
	/**
	 * Get Document List between title
	 *
	 * @param string $module
	 * @param string $title
	 * @param   int  $page_start
	 */
	function getDocumentListbyColumn($module, $page_start, $title, $type) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':args1', $module],
			['', $type, 'LIKE', ':args2', "%$title%"],
			['ORDER', 'srl_bd', 'desc'],
			['LIMIT', ':pgx', $page_start, ':pgy', 20],
		],'*', 'all');
	}
	
	/**
	 * get document list between title
	 *
	 * @param string $module
	 * @param string $title
	 * @param   int  $page_start
	 */
	function getDocumentlistBetweenbyTitle($module, $page_start, $title) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':args1', $module],
			['', 'title', 'LIKE', ':args2', "%$title%"],
			['ORDER', 'srl_bd', 'desc'],
			['LIMIT', ':pgx', $page_start, ':pgy', 20],
		],'*', 'all');
	}
	
	function UpdateReadedCount($readed_count, $get_serial) {
		if (!isset($_SESSION['readed_document'][$get_serial.$_SERVER['REMOTE_ADDR']])) 
		{
			$_SESSION['readed_document'][$get_serial.$_SERVER['REMOTE_ADDR']] = TRUE;
			db::Query('UPDATE','def_document_music',
			[
				['WHERE', 'readed', '=', ':args1', $readed_count],
				['', 'srl', '=', ':args2', $get_serial]
			],'', 'boolean');
		}
	}

	/**
	 * 문서 목록을 가져온다(정렬)
	 *
	 * @param string $module
	 * @param   str  $get_board
	 * @param   int  $page_start
	 * @param   int  $list_count
	 * @param   str  $article
	 */
	function getDocumentListbyArticle($get_board, $page_start, $list_count, $article) 
	{
		return db::Query('SELECT','def_document_music',[
			['', 'module', '=', ':args1', $get_board],
			['ORDER', $article, 'desc'],
			['LIMIT', ':pgx', $page_start, ':pgy', $list_count],
		],'*', 'all');
	}

	function getDocumentlistBetweenbyGenre($get_board, $page_start, $list_count, $genre) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':args1', $get_board],
			['', 'genre', '=', ':args2', $genre],
			['ORDER', 'srl_bd', 'desc'],
			['LIMIT', ':pgx', $page_start, ':pgy', $list_count],
		],'*', 'all');
	}

	/**
	 * 문서 목록을 가져온다(BETWEEN)
	 *
	 * @param string $module
	 * @param   int  $page_start
	 * @param   int  $page_end
	 */
	function getDocumentList($module, $page_start, $page_end) 
	{
		return db::Query('SELECT','def_document_music',[
			['AND', 'module', '=', ':args1', $module],
			['AND', 'srl', '>', ':args2', ($page_start-1)],
			['AND', 'srl_bd', 'BETWEEN', ':args3', ($page_start)],
			['ORDER', 'srl_bd', 'asc', ':page_end', $page_end]
		],'def_document_music.*, (SELECT count(c.comment_srl) FROM def_comment c WHERE c.document_srl = def_document_music.srl_bd) as `comment_count`, (SELECT count(b.srl) FROM def_file b WHERE b.target = def_document_music.file_sequence) as `file_count`', 'all');
	}
	
	// EXPLAIN SELECT def_document_music.* , (SELECT count(c.comment_srl) FROM def_comment c WHERE c.document_srl = def_document_music.srl_bd AND c.module = 'index' ORDER BY c.comment_srl) as `comment_count`, (SELECT count(b.srl) FROM def_file b WHERE b.target = def_document_music.file_sequence AND b.module = 'index' AND b.srl = def_document_music.srl) as `file_count` FROM def_document_music JOIN (SELECT srl_bd FROM def_document_music WHERE module = 'index' ORDER BY srl_bd LIMIT 1000000, 20) AS t ON t.srl_bd = def_document_music.srl_bd
	function getDocumentlistJOIN($module, $page_start, $board_count) 
	{
		$sth = $this->pdo->prepare("SELECT def_document_music.*, (SELECT count(c.comment_srl) FROM def_comment c WHERE c.document_srl = def_document_music.srl_bd) as `comment_count`, (SELECT count(b.srl) FROM def_file b WHERE b.target = def_document_music.file_sequence) as `file_count` FROM def_document_music JOIN (SELECT srl_bd FROM def_document_music WHERE module = :module ORDER BY srl LIMIT :page_start, :page_end) AS t ON t.srl_bd = def_document_music.srl_bd; ");
		$sth->bindParam(':module', $module, PDO::PARAM_STR);
		$sth->bindParam(':page_start', $page_start, PDO::PARAM_INT);
		$sth->bindParam(':page_end', $board_count, PDO::PARAM_INT);
		$sth->execute();
		return $sth->fetchAll();
	}
	
	// EXPLAIN SELECT def_document_music.*, count(def_file.srl), count(def_comment.comment_srl), def_category.name FROM def_document_music LEFT JOIN def_file ON def_document_music.file_sequence = def_file.target AND def_file.module = 'index' LEFT JOIN def_comment ON def_comment.comment_srl = def_document_music.srl_bd AND def_comment.module = 'index' LEFT JOIN def_category ON def_category.category_srl = def_document_music.category_srl WHERE def_document_music.module = 'index' GROUP BY def_document_music.srl_bd ORDER BY def_document_music.srl_bd asc LIMIT 0, 20;
	function getDocumentListLeftJOIN($module, $page_start, $board_count) 
	{
		$sth = $this->pdo->prepare("SELECT def_document_music.*, count(def_file.srl), count(def_comment.comment_srl), def_category.name FROM def_document_music LEFT JOIN def_file ON def_document_music.file_sequence = def_file.target AND def_file.module = :module1 LEFT JOIN def_comment ON def_comment.comment_srl = def_document_music.srl_bd AND def_comment.module = :module2 LEFT JOIN def_category ON def_category.category_srl = def_document_music.category_srl WHERE def_document_music.module = :module3 GROUP BY def_document_music.srl_bd ORDER BY def_document_music.srl_bd asc LIMIT :pgx, :pgy; ");
		$sth->bindParam(':module1', $module, PDO::PARAM_STR);
		$sth->bindParam(':module2', $module, PDO::PARAM_STR);
		$sth->bindParam(':module3', $module, PDO::PARAM_STR);
		$sth->bindParam(':pgx', $page_start, PDO::PARAM_INT);
		$sth->bindParam(':pgy', $board_count, PDO::PARAM_INT);
		$sth->execute();
		return $sth->fetchAll();
	}
	
	/**
	 * 문서 목록을 가져온다(LIMIT)
	 *
	 * @param string $module
	 * @param   int  $page_start
	 * @param   int  $page_end
	 */
	function getDocumentListLIMIT($module, $page_start, $board_count) 
	{
		return array_reverse(db::Query('SELECT','def_document_music',[
			['', 'module', '=', ':args1', $module],
			['ORDER', 'srl_bd', 'asc'],
			['LIMIT', ':pgx', $page_start ? $page_start : 0, ':pgy', $board_count],
		],'
			def_document_music.*, 
			(SELECT count(b.srl) FROM def_file b WHERE b.target = def_document_music.file_sequence) as `file_count`,
			(SELECT count(c.comment_srl) FROM def_comment c WHERE c.document_srl = def_document_music.srl_bd) as `comment_count`, 
			(SELECT name FROM def_category d WHERE d.category_srl = def_document_music.category_srl) as `category_caption`
		', 'all'));
	}
	
	/**
	 * 문서의 아티스트를 업데이트한다.
	 *
	 * @param string $artist
	 * @param string $get_board
	 * @param int $get_serial
	 */
	function UpdateArtist($get_serial, $get_board, $artist) 
	{
		return db::Query('UPDATE','def_document_music',[
			['WHERE', 'artist', '=', ':args1', $artist],
			['AND', 'module', '=', ':args2', $get_board],
			['', 'srl', '=', ':args3', $get_serial]
		],'', 'boolean');
	}
	
	/**
	 * 문서의 아티스트를 업데이트한다.
	 *
	 * @param string $artist
	 * @param string $get_board
	 * @param int $get_serial
	 */
	function UpdatePlayTime($get_serial, $get_board, $artist) 
	{
		return db::Query('UPDATE','def_document_music',[
			['WHERE', 'playtime', '=', ':args1', $artist],
			['AND', 'module', '=', ':args2', $get_board],
			['', 'srl', '=', ':args3', $get_serial]
		],'', 'boolean');
	}
	
	/**
	 * upload document artist
	 *
	 * @param string $artist
	 * @param string $get_board
	 * @param int $get_serial
	 */
	function UpdateGenreOnly($get_serial, $get_board, $album) 
	{
		return db::Query('UPDATE','def_document_music',[
			['WHERE', 'srl', '=', ':args1', $get_serial],
			['AND', 'module', '=', ':args2', $get_board],
			['', 'genre_only', '=', ':args3', $album]
		],'', 'boolean');
	}

	/**
	 * upload document artist
	 *
	 * @param string $artist
	 * @param string $get_board
	 * @param int $get_serial
	 */
	function UpdateGenre($get_serial, $get_board, $album) 
	{
		return db::Query('UPDATE','def_document_music',[
			['WHERE', 'genre', '=', ':args1', $album],
			['AND', 'module', '=', ':args2', $get_board],
			['', 'srl', '=', ':args3', $get_serial]
		],'', 'boolean');
	}

}

?>