<?php

class LyricsUpdater{
	
	function transHTML($status, $args, $script, $originCode){
		
		if($status !== 'before') return;
		
		$self = $args->ret;
		$this->base = $args->base;
		$this->board = new stdClass();
		
		$document_srl = (int)$this->base->get_params('srl');
		if(!$document_srl || $document_srl <= -1) return;
		
		$oBoardModel = $this->base->getModel('music');
		$oDocument = $oBoardModel->getDocumentItems($document_srl);
		
		$oFileModel = $this->base->getModel('files');
		$fileSequence = $oFileModel->getDocumentFileSequence($document_srl);
		$FileList = $oFileModel->getFileList($fileSequence);
		
		foreach($FileList as $key=>$val){
			if (maya::execute('@\@!mp3||wav!', $val['files'], 'boolean')){
				if ($oBoardModel->getLysicsCount($oDocument['module'], $fileSequence)==0){
					$filename = sprintf("%s%s%s/%s", __DIR, __FILE__ATTACH, $val['target'], $val['files']);
					if (file_exists($filename)){
						$md5 = $oBoardModel->getMD5Hash($filename);
						$lyrics = $oBoardModel->getLysics($md5);
						$oBoardModel->insertLysics($oDocument['module'], $fileSequence, $lyrics);
					}
				}
			}
		}
	}
}
?>