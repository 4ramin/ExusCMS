<?php

	class LyricsUpdater{
		
		function transHTML($status, $args, $script){
			if(!defined("__FLOWER__")) exit();
			
			if($status !== 'before') return;
			
			$this->base = $args->base;
			$this->board = new stdClass();
			
			$document_srl = $this->base->get_params('srl');
			if(!$document_srl || $document_srl <= -1) return;
			
			$oBoardModel = $this->base->getModel('music');
			$oBoardQuery = $this->base->getQuery('music');
			$oDocument = $oBoardQuery->getDocumentItem($document_srl);
			
			$oFileModel = $this->base->getModel('files');
			$fileSequence = $oFileModel->getDocumentFileSequence($document_srl);
			$FileList = $oFileModel->getFileList($fileSequence);
			
			if ($oBoardQuery->getLysicsCount($oDocument['module'], $document_srl)->data() > 0)
			{
				return;
			}

			if(empty($FileList)) return;
			
			foreach($FileList as $key => $fileInfo)
			{
				if (maya::execute('@\@!mp3||wav!', $fileInfo['files'], 'boolean'))
				{
					$AudioFile = sprintf("%s%s%s/%s", __DIR, __FILE__ATTACH, $fileInfo['target'], $fileInfo['files']);
					if (file_exists($AudioFile))
					{
						$md5Hash = $oBoardModel->getMD5Hash($AudioFile);
						$lyricsData = $oBoardModel->getLysics($md5Hash);
						$oBoardQuery->insertLysics($oDocument['module'], $document_srl, $oBoardModel->getLysics($md5Hash));
					}
				}
			}
			
			return;
		}
	}

?>