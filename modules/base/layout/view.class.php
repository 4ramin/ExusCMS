<?php

class layout_view extends layout{
	
	function __construct(){
	}
		
	/**
	 * get popular keyword count
	 *
	 * @param string $keyword
	 */
	function getPopularKeywordCount($keyword){
		$sth = $this->pdo->prepare("SELECT count FROM popular_keyword WHERE keyword = :keyword");
		$sth->bindParam(':keyword', $keyword, PDO::PARAM_STR);
		$sth->execute();
		$std_count = $sth->fetch();
		return $std_count[0];
	} 
	
}

?>