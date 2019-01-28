<?php

	if(!defined("__FLOWER__")) exit();

	if($position == 'init' && $status == 'before')
	{
		header('P3P: CP="ALL CURa ADMa DEVa TAIa OUR BUS IND PHY ONL UNI PUR FIN COM NAV INT DEM CNT STA POL HEA PRE LOC OTC"'); //P3P 표준 헤더
	}

?>