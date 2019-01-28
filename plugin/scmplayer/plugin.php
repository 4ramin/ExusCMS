<?php

	if(!defined("__FLOWER__")) exit();
	
	$playlist = '';

	$this->base = new base();
	if($position == 'init' && $status == 'after')
	{
		if($this->base->isLogged())
		{
			$oBoardModel = $this->base->getModel('music');
			$MemberExtraVar = $oBoardModel->getMemberExvar($this->base->getUserId());
			$mExvar = unserialize($MemberExtraVar);
			$pListArr = $mExvar['playlist'];
			
			if(is_array($pListArr))
			{
				foreach($pListArr as $plist)
				{
					$oFilesModel = $this->base->getModel('files');
					$this_file = $oFilesModel->getFileList($plist);
					foreach($this_file as $key=>$flst)
					{
						if(preg_match('/\.(mp3|mp4|wav)(?:[\?\#].*)?$/i', $flst['files'], $matches))
						{
							$file_name = __SUB.__FILE__ATTACH.$plist.'/'.$flst['files'];
							if($playlist)
							{
								$playlist .= ",{'title':'".str_replace("'", "", $flst['origin'])."','url':'".$file_name."'}";
							}
							else
							{
								$playlist .= "{'title':'".str_replace("'", "", $flst['origin'])."','url':'".$file_name."'}";
							}
						}
					}
				}
			}
		}
		
		echo "<script type=".'"'."text/javascript".'"'." src=".'"'."http://www.gkid.kr/plugin/scmplayer/scm/script.js".'"'." data-config=".'"'."{'skin':'skins/aquaBlue/skin.css','volume':50,'autoplay':false,'shuffle':false,'repeat':1,'placement':'bottom','showplaylist':false,'playlist':[".$playlist."]}".'"'."></script>";
	}
?>