<?php if(!defined("__FLOWER__")) exit(); ?>

<?php
class page_view extends page
{
	
	function __construct()
	{
		$this->base = new base();
		$this->pdo = $this->base->getPDO();
	}
	
	function init($args)
	{
		$this->page = new stdClass();
		$this->page->default_action = "dispPageContent";
		$this->page->model = new Page_Model($this);
		
		return $this->page;
	}
	
	function dispPageContent()
	{
		$this->base->set('skin', $this->page->tpl_path."/page.php");
		$file_data = file_get_contents($this->base->get('skin'));
	}
	
}
?>
