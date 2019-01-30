<?php

class board_dto
{
	
	function setDispBoardDTO($dto)
	{
		$this->board->srl = $this->getSrl();
		$this->board->list_count = $this->getListCount();
		$this->board->page = $this->getPage();
		$this->board->genre = $this->getParam('genre');
		$this->board->category = $this->getCategorySrl();
		$this->board->sortIndex = $this->getParam('sort_index');
		$this->board->module_id = $this->getModuleID();
		$this->board->keyword = $this->getParam('keyword');
		$this->board->type = $this->getParam('type');
	}
	
}

?>