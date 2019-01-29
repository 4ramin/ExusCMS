<?php
/**
 * @class PageNation
 *
 * @Generate Pagenation
 */
class Pagenation
{
	
	var $point;           // goted page count
	var $page_margin = 0; // page margin for center align
	var $first_page = 0;  // first page number
	var $last_page;     // number of total items
	
	/**
	 * Constructor
	 *
	 * @param int $last_page  : number of total items
	 * @param int $current_page : current page number
	 * @param int $list_count   : number of page links displayed at one time
	 *	 
	 * @return void
	 */
	function __construct($last_page, $current_page = 1, $list_count = 10) 
	{
		$page_margin = 0;
		$first_page = 0;
		
		$half_page_count = ceil($list_count / 2);
		$last_page = ($last_page < 0) ? 1 : $last_page;
		
		if ($last_page > $list_count)
		{
			if ($current_page > $last_page - ($list_count - 1)) 
			{
				$page_margin = $last_page - $list_count;
				$first_page = $page_margin < $list_count ? 0 : -1;
			}
			else if ($current_page > $half_page_count) 
			{
				$page_margin = $current_page - ($half_page_count);
				$first_page = $page_margin > $list_count ? 0 : -1;
			}
			
			if ($current_page > $last_page - ($list_count - 1) && $current_page < $last_page - ($half_page_count - 1)) 
			{
				$page_margin = $current_page - $half_page_count;
				$first_page = $page_margin > $list_count ? 0 : -1;
			}
		}
		
		$this->page_margin = $page_margin;
		$this->first_page = $first_page;
		$this->last_page = $last_page;
		$this->current_page = $current_page;
		$this->list_count = $list_count;
	}
	
	/**
	 * get a last page.
	 *
	 * @return int
	 */
	function getLastPage()
	{
		return $this->board->page_count;
	}
	
	/**
	 * get a link of last page.
	 *
	 * @return String
	 */
	function getLastPageLink()
	{
		return str::getUrl(__MODULEID, $_GET[__MODULEID], 'page', $this->getLastPage(), 'srl', '');
	}
	
	/**
	 * get a comment link of last page.
	 *
	 * @return String
	 */
	function getCommentPageLink()
	{
		return str::getUrl(__MODULEID, $_GET[__MODULEID], 'cpage', $value, 'act', 'getCommentPage');
	}
	
	/**
	 * get a page link.
	 *
	 * @return String
	 */
	function getPageLink()
	{
		return str::getUrl(__MODULEID, $_GET[__MODULEID], 'page', $this->getCurrentPage(), 'srl', '');
	}
	
	/**
	 * make sure this page is the same as the current page.
	 *
	 * @return boolean
	 */
	function isCurrentPage()
	{
		return ($_GET['page'] == $this->getCurrentPage()) ? true : false;
	}
	
	/**
	 * make sure this comment page is the same as the current page.
	 *
	 * @return boolean
	 */
	function isCurrentCPage()
	{
		return ($_GET['cpage'] == $this->getCurrentPage()) ? true : false;
	}
	
	/**
	 * make sure has next page.
	 *
	 * @return boolean
	 */
	function hasNextPage()
	{
		$page = $this->first_page + ++$this->point;
		if ($page > $this->list_count || $this->getCurrentPage() > $this->last_page)
		{
			$this->point = 0;
			
			return false;
		}
		else
		{
			return true;
		}
	}
	
	/**
	 * get a current page.
	 *
	 * @return int
	 */
	function getCurrentPage()
	{
		return ($this->page_margin + $this->first_page + $this->point);
	}
	
}