<?php

	if(!defined("__FLOWER__")) exit();

	class nonogram_controller extends nonogram
	{
		protected $pdo;
		
		function getCellItem($mapsize, $pixel, $column)
		{
			$tmp = 0;
			$cnt = 0;
			$txt = "";
			
			$lastItem = ($column + 1) + (($mapsize - 1) * $mapsize);
			
			for ($row = 1; $row < ($mapsize+1); $row++) 
			{
				$item = ($column + 1) + (($row - 1) * $mapsize);
				if($tmp == 0 && in_array($item, $pixel))
				{
					$cnt = 1;
					$tmp = 1;
				}
				elseif($tmp == 1 && !in_array($item, $pixel))
				{
					$txt .= empty($txt) ? $cnt : ",".$cnt;
					$cnt = 0;
					$tmp = 0;
				}
				elseif($tmp == 1 && in_array($item, $pixel)) 
				{
					$cnt++;
				}
			}
			
			if($tmp==1 && in_array($lastItem, $pixel)) 
			{
				$txt .= empty($txt) ? $cnt : ",".$cnt;
			}
			elseif(in_array($lastItem, $pixel))
			{
				$cnt = 1;
				$txt .= empty($txt) ? $cnt : ",".$cnt;
			}
			
			if(empty($txt)) $txt = "-1";
			
			return $txt;
		}
		
		function getCellData($mapsize, $pixel, $width, $height)
		{
			$data = null;
			for ($column = 0; $column < ($mapsize); $column++) 
			{
				$txt = $this->getCellItem($mapsize, $pixel, $column);
				
				$data .= empty($data) ? $txt : "/".$txt;
			}
			
			return $data;
		}
		
		function getRowItem($mapsize, $pixel, $row)
		{
			$tmp = 0;
			$cnt = 0;
			$txt = "";
			
			$lastItem = ($mapsize * $row) + $mapsize;
				
			for ($column = ($mapsize * $row)+1; $column < $lastItem + 1; $column++) 
			{
				if($tmp == 0 && in_array($column, $pixel))
				{
					$cnt = 1;
					$tmp = 1;
				}
				elseif($tmp == 1 && !in_array($column, $pixel)) 
				{
					$txt .= empty($txt) ? $cnt : ",".$cnt;
					$cnt = 0;
					$tmp = 0;
				}
				elseif($tmp == 1 && in_array($column, $pixel)) 
				{
					$cnt++;
				}
			}
			
			if($tmp==1 && in_array($lastItem, $pixel)) 
			{
				$txt .= empty($txt) ? $cnt : ",".$cnt;
			}
			elseif(in_array($lastItem, $pixel))
			{
				$cnt = 1;
				$txt .= empty($txt) ? $cnt : ",".$cnt;
			}
			
			if(empty($txt)) $txt = "-1";
			
			return $txt;
		}
		
		function getRowData($mapsize, $pixel, $width, $height)
		{
			$data = null;
			for ($row = 0; $row < ($mapsize); $row++) 
			{
				$txt = $this->getRowItem($mapsize, $pixel, $row);
				$data .= empty($data) ? $txt : "/".$txt;
			}
			
			return $data;
		}
		
		function procAnswer()
		{
			$gameID = $this->base->post_params("gameID");
			if(isset($_SESSION[$gameID]))
			{
				return $this->base->response("type", "tip", 'x', implode("/", $_SESSION[$gameID]));
			}
		}
		
		function procTip()
		{
			$gameID = $this->base->post_params("gameID");
			if($_SESSION[$gameID]['isTipView'] == false)
			{
				$width = $_SESSION[$gameID]['width'];
				$x = rand(1, $width);
				$y = rand(1, $width);
				$x = (($x -1)* $width)+1;
				$_x = '';
				$_y = '';
				for($i=$x; $i < $x + 10; $i++)
				{
					if(in_array($i, $_SESSION[$gameID]))
					{
						$_x .= empty($_x) ? $i.'/' : $i.'/';
					}
				}
				
				for($i=1; $i < $width; $i++)
				{
					$tmpi = ($i-1) * $width + $y;;
					if(in_array($tmpi, $_SESSION[$gameID]))
					{
						$_y .= empty($_y) ? $tmpi.'/' : $tmpi.'/';
					}
				}
				
				return $this->base->response("type", "tip", 'x', $_x, 'y', $_y);
			}
		}
		
		function procPointPixel(){
			$gameID = $this->base->post_params("gameID");
			$pixel = $this->base->post_params("pixel");
			$gameSession = $_SESSION[$gameID];
			
			if(isset($gameSession['failed']))
			{
				if($gameSession['failed'] > 3)
				{
					return $this->base->response("type", "gameover");
				}
			}
			
			if(count($gameSession['checked']) == count($gameSession) -4)
			{
				return $this->base->response("type", "gameend", 'count', count($gameSession));
			}
			
			if(isset($gameSession)){
				if(in_array($pixel, $gameSession)){
					if(!isset($gameSession['checked'])){
						$gameSession['checked'] = array();
					}
					
					if(!in_array($pixel, $gameSession['checked'])){
						array_push($gameSession['checked'],$pixel);
					}
					
					return $this->base->response("type", "success", "pixel", $pixel, 'on', count($gameSession['checked']), 'on2', count($gameSession));
				}else{
					if(!isset($gameSession['failed'])){
						$gameSession['failed'] = 1;
					}else{
						$gameSession['failed'] = ($gameSession['failed']) + 1;
					}
					
					return $this->base->response("type", "failed", "pixel", $pixel, 'count',$gameSession['failed']);
				}
			}
		}
		
		function procNewGame()
		{
			if ( ! session_id() ) @ session_start();
			
			$rands = rand(0, 15);
			
			$numbers = range(0, $rands * $rands);
			shuffle($numbers);
			$numberss = join(",",array_slice($numbers, 0, rand(5,$rands * $rands)));
			
			$px = array(
				array("data"=>"1,2,3,4,5,6,9,10,11,13,15,16,17,20,21,22,23,24,25","width"=>5,"height"=>5),
				array("data"=>$numberss ,"width"=>$rands,"height"=>$rands),
				array("data"=>"1","width"=>1,"height"=>1),
				array("data"=>"5,6,7,8,9,10,11,12,13,14,15,16,24,25,26,27,28,29,30,31,32,33,34,35,36,37,44,45,46,47,54,55,56,57,64,65,66,68,69,72,73,75,76,77,82,83,84,85,87,94,96,97,98,99,101,102,104,105,108,109,112,113,116,117,119,120,121,123,125,128,129,132,133,136,138,140,141,143,145,149,153,156,157,158,160,161,163,165,166,175,176,177,178,180,181,183,184,185,186,187,190,192,194,195,196,197,198,200,202,204,205,216,217,219,223,224,225,226,228,233,235,236,237,238,245,246,249,250,251,252,255,256,265,266,267,269,272,274,275,276,286,287,290,291,294,295,305,306,307,308,313,314,315,316,317,324,325,326,329,330,331,332,335,336,337,338,339,343,344,345,356,357,358,359,360,362,363,364,376,377,378,379,380,382,383,384,396,397,398,399,400","width"=>20,"height"=>20),
				array("data"=>"5,6,14,15,16,23,24,25,26,32,33,34,35,36,44,45,46,55,56,65,66,71,72,73,74,75,76,77,78,79,81,82,83,84,85,86,87,88,89,90,92,93,94,95,96,97,98,99,100","width"=>10,"height"=>10),
				array("data"=>"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,29,30,31,32,34,35,36,37,38,39,40,41,42,44,45,46,47,49,50,56,57,59,60,61,62,64,65,71,72,74,75,76,77,79,80,86,87,89,90,91,92,94,95,101,102,104,105,106,107,109,110,111,112,113,114,115,116,117,119,120,121,122,134,135,136,137,140,149,150,151,152,154,155,156,164,165,166,167,170,179,180,181,182,194,195,196,197,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225","width"=>15,"height"=>15),
				array("data"=>"1,2,3,4,5,6,7,9,10,11,12,13,14,15,16,17,18,19,20,21,25,26,27,28,29,30,31,32,33,34,35,36,40,41,42,43,44,45,46,47,48,49,50,56,57,58,59,60,61,62,63,64,65,71,72,73,74,75,91,105,106,107,119,120,121,122,123,133,134,135,136,137,138,139,147,148,149,150,151,152,153,163,164,165,166,167,168,178,179,180,181,182,188,194,195,196,197,202,203,204,209,210,211,215,216,217,218,219,220,221,225", "width"=>15,"height"=>15),
				array("data"=>"5,21,36,37,38,52,53,54,67,68,69,81,82,83,84,95,96,97,98,109,110,111,112,113,124,125,126,127,128,129,139,140,141,142,143,144,145,155,156,157,158,159,160,161,170,171,172,173,174,175,176,177,186,187,188,189,190,191,192,193,202,204,205,207,208,209,217,219","width"=>15,"height"=>15), 
				array("data"=>"3,4,5,17,18,19,20,21,32,33,34,36,47,48,51,63,65,66,69,70,71,80,83,84,87,94,95,97,98,99,100,101,103,109,110,111,112,113,114,115,116,117,119,124,125,126,127,128,129,130,131,132,133,134,140,141,143,144,145,146,148,157,159,160,161,162,173,174,175,177,178,189,193,202,203,204,205,206,207,208,216,217,219","width"=>15,"height"=>15),
				array("data"=>"6,7,9,10,20,21,22,23,24,25,26,35,36,37,38,39,40,41,50,51,52,53,54,55,56,62,63,64,66,67,68,69,70,72,73,74,76,77,78,79,80,82,83,84,86,87,88,89,90,91,92,93,94,95,96,98,100,101,102,103,104,105,107,108,109,110,111,112,114,115,116,117,118,119,121,122,123,124,125,126,128,130,131,132,133,134,135,136,137,138,139,140,143,146,147,148,149,150,152,153,154,158,162,163,164,172,173,186,187,198,199,200,201,213,214","width"=>15,"height"=>15),
				array("data"=>",3,5,6,9,10,15,18,19,20,21,22,24,25,26,33,35,36,40,41,56,57,61,62,65,66,67,68,71,72,76,77,78,79,80,81,83,84,85,86,93,94,95,96,97,99,100,101,103,104,107,108,109,110,111,112,113,114,115,116,117,118,119,120,123,124,125,126,127,128,129,130,131,133,134,136,137,138,139,140,141,142,143,144,145,146,151,152,155,156,157,158,160,161,162,176,177,179,181,183,184,190,191,194,195,196,197,198,199,200,204,205,206,209,211,213,214,219,220","width"=>15,"height"=>15),
				array("data"=>",10,11,12,13,24,25,26,27,28,29,38,39,40,41,43,44,45,53,54,55,56,57,58,59,69,70,71,72,73,85,86,87,99,100,101,102,103,106,112,113,114,115,116,117,118,119,121,122,123,126,127,128,132,133,134,136,137,138,139,140,141,142,144,145,146,148,149,152,153,154,155,156,158,159,160,161,163,164,167,168,169,170,171,172,173,174,177,178,183,184,185,186,187,188,189,190,191,192,200,201,203,204,205,217,218,219,220,221,222","width"=>15,"height"=>15),
				array("data"=>",5,6,7,16,17,18,19,20,21,22,23,34,36,37,38,39,43,44,49,50,51,53,54,57,58,59,60,64,65,67,68,69,70,72,75,79,81,82,83,84,85,90,95,96,97,98,99,100,101,103,104,105,108,109,111,112,113,114,115,116,117,118,119,122,126,127,129,130,131,132,133,134,135,137,140,141,144,145,146,147,148,149,150,152,153,155,160,161,163,164,168,170,171,176,177,179,180,186,192,195,205,206,207,209,210,219,220,223,224","width"=>15,"height"=>15),
				array("data"=>",13,14,15,21,22,23,24,27,28,30,34,35,36,39,42,44,46,47,48,50,53,54,57,61,62,68,72,73,77,78,79,80,83,84,88,89,95,96,99,100,104,105,111,115,116,117,120,126,127,132,133,135,139,140,141,142,148,149,150,154,156,159,160,164,165,171,174,179,187,189,194,201,202,203,204,205,208,209,214,215,216,218,219,221,222,223","width"=>15,"height"=>15)
			);
			
			$arrayKey = array_rand($px,1);
			$pixel = explode(",",$px[$arrayKey]['data']);
			$width = $px[$arrayKey]['width'];
			$height = $px[$arrayKey]['height'];
			
			$session = bin2hex(random_bytes(5));
			$_SESSION[$session] = $pixel;
			$_SESSION[$session]['width'] = $width;
			$_SESSION[$session]['height'] = $height;
			$_SESSION[$session]['isTipView'] = false;
			
			$mapsize = $width;
			$cellData = $this->getCellData($mapsize, $pixel, $width, $height);
			$rowData = $this->getRowData($mapsize, $pixel, $width, $height);
			$_rowData = explode("/",$rowData);
			$_cellData = explode("/",$cellData);
			$table = '';
			
			$cellHtml = '';
			for($z=1;$z<$mapsize+1;$z++){
				$cellHtml .= '<div class="cell'.(($z%2)+1).'">';
				$cellHtml .= isset($_cellData[$z-1]) ? str_replace(",","\n",$_cellData[$z-1]) : '';
				$cellHtml .= '</div>';
			}
			
			$rowHtml = '';
			for($z=1;$z<$mapsize+1;$z++){
				$rowHtml .= '<div class="cell'.(($z%2)+1).'">';
				$rowHtml .= isset($_rowData[$z-1]) ? str_replace(","," ",$_rowData[$z-1]) : '';
				$rowHtml .= '</div>';
			}
			
			for($z=1;$z<($mapsize+1);$z++){
				$table .= '<div style="display: table;">';
					for($i=1;$i<($mapsize+1);$i++){
						$table .= '<div data-pixel="'.($i + ($z - 1) * $mapsize).'" class="item"></div>';
					}
				$table .= '</div>';
			}
			
			for($k=1;$k<ceil($mapsize/5);$k++){
				$table .= '<line style="width:2px;height: 100%;top:0px;left:'.((73 * $k) + (1.5 * $k)).'px"></line>';
				$table .= '<line style="height:2px;width: 100%;top:'.((73 * $k) + (1.5 * $k)).'px"></line>';
			}
			
			return $this->base->response("type", "success", "row", $rowHtml, "column", $cellHtml, 'gameID', $session, 'width', $width, 'height', $height, 'table', $table);
		}
		
		function init($args)
		{
			$this->base = new base();
			$this->pdo = $this->base->getPDO();

			$this->api_key = "";
				
			$this->nonogram = new stdClass;
			$this->nonogram->module = $args->module;
			$this->nonogram->model = new nonogram_Model($this);
			
			return $this->nonogram;
		}

	}
?>