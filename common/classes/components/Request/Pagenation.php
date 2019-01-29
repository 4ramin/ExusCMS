<?php

class Pagenation
{
	
	var $point;
	var $page_margin;
	var $first_page = 0;
	var $total_count;
	
	function __construct($total_count, $current_page = 1, $list_count = 10) 
	{
		$page_margin = 0;
		$first_page = 0;
		$list_count_rel = ceil($list_count / 2);
		$total_count = ($total_count < 0) ? 1 : $total_count;
		
		if ($current_page > $total_count - ($list_count - 1)) 
		{
			$page_margin = $total_count - $list_count;
			$first_page = $page_margin < $list_count ? 0 : -1;
		}
		else if ($current_page > $list_count_rel) 
		{
			$page_margin = $current_page - ($list_count_rel);
			$first_page = $page_margin > $list_count ? 0 : -1;
		}
		
		if ($current_page > $total_count - ($list_count - 1) && $current_page < $total_count - ($list_count_rel - 1)) 
		{
			echo 'test';
			$page_margin = $current_page - $list_count_rel;
			$first_page = $page_margin > $list_count ? 0 : -1;
		}
		
		$this->page_margin = $page_margin;
		$this->first_page = $first_page;
		$this->total_count = $total_count;
		$this->current_page = $current_page;
		$this->list_count = $list_count;
		echo print_r($this)."/".$current_page."/".($total_count - ($list_count - 1));
		
	}
	
	function getLastPage()
	{
		return $this->board->page_count;
	}
	
	function getLastPageLink()
	{
		return str::getUrl(__MODULEID, $_GET[__MODULEID], 'page', $this->getLastPage(), 'srl', '');
	}
	
	function getCommentPageLink()
	{
		return str::getUrl(__MODULEID, $_GET[__MODULEID], 'cpage', $value, 'act', 'getCommentPage');
	}
	
	function getPageLink()
	{
		return str::getUrl(__MODULEID, $_GET[__MODULEID], 'page', $this->getCurrentPage(), 'srl', '');
	}
	
	function isCurrentPage()
	{
		return ($_GET['page'] == $this->getCurrentPage()) ? true : false;
	}
	
	function isCurrentCPage()
	{
		return ($_GET['cpage'] == $this->getCurrentPage()) ? true : false;
	}
	
	function hasNextPage()
	{
		$page = ($this->first_page + ++$this->point);
		if ($page > $this->list_count)
		{
			$this->point = 0;
			return false;
		}
		else
		{
			return true;
		}
	}
	
	function getCurrentPage()
	{
		return ($this->page_margin + $this->first_page + $this->point);
	}
	
}