<?php

	if (!defined("__FLOWER__")) exit();

	class naturalsearch_controller extends naturalsearch {
		
		function __construct() {
			parent::getHandler(TRUE);
		}
		
		function init() {
		}
		
		function getNaturalLanguage() {
			$source = $this->base->post_params('word');
			$response = null;
			$talk_process = array("해줘","싶다","싶어", "해", "줘");
			$talk_in = array("에서","에");
			$talk_of = array("의");
			$talk_if = array("인");
			$talk_to = array("을","를","이","가");
			$talk_is = array("다");
			$talk_inv = array("은,는");
			$talk_do = array("한","했다","했는데","했음","했어");
			$talk_and = array(",","그리고","와","과");
			$talk_ask = array("뭐지","에 저장된 값은?","는?","은?");

			for ($i = 0; $i <= mb_strlen($source, "UTF-8"); $i++)) {
				for ($q = 1; $q <= count($talk_in); $q++) {
					if (mb_substr($source, $i + 1, mb_strlen($talk_in[$q-1], "UTF-8"),'UTF-8') == $talk_in[$q-1]) {
						if (mb_substr($source, $i + (mb_strlen($talk_in[$q-1], "UTF-8") + 1), 1,'UTF-8') == " ") {
							$talk_memory2 = mb_substr($source, $z, ($i - $z) + 1,'UTF-8');
							$z = $i + mb_strlen($talk_in[$q-1], "UTF-8") + 2;
						}
					}
				}
				
				for ($q = 1; $q <= count($talk_if); $q++) {
					if (mb_substr($source, $i + 1, mb_strlen($talk_if[$q-1], "UTF-8"),'UTF-8') == $talk_if[$q-1]) {
						if (mb_substr($source, $i + (mb_strlen($talk_if[$q-1], "UTF-8") + 1), 1,'UTF-8') == " ") {
							$talk_memory4 = mb_substr($source, $z, ($i - $z) + 1,'UTF-8');
							$z = $i + mb_strlen($talk_if[$q-1], "UTF-8") + 2;
						}
					}
				}
				
				for ($q = 1; $q <= count($talk_to); $q++) {
					if (mb_substr($source, $i + 1, mb_strlen($talk_to[$q-1], "UTF-8"),'UTF-8') == $talk_to[$q-1]) {
						if (mb_substr($source, $i + (mb_strlen($talk_to[$q-1], "UTF-8") + 1), 1,'UTF-8') == " ") {
							if ($chk_and == false) {
								$talk_memory = $talk_memory.",".mb_substr($source, $z, ($i - $z) + 1,'UTF-8');
							} else {
								$chk_and = TRUE;
								$talk_memory = mb_substr($source, $z, ($i - $z) + 1,'UTF-8');
							}
							$z = $i + mb_strlen($talk_to[$q-1], "UTF-8") + 2;
						}
					}
				}
				
				for ($q = 1; $q <= count($talk_and); $q++) {
					if (mb_substr($source, $i + 1, mb_strlen($talk_and[$q-1], "UTF-8"),'UTF-8') == $talk_and[$q-1]) {
						if (mb_substr($source, $i + (mb_strlen($talk_and[$q-1], "UTF-8") + 1), 1,'UTF-8') == " ") {
							if ($chk_and == false) {
								$talk_memory = $talk_memory.",".mb_substr($source, $z, ($i - $z) + 1,'UTF-8');
							} else {
								$chk_and = TRUE;
								$talk_memory = mb_substr($source, $z, ($i - $z) + 1,'UTF-8');
							}
							
							$z = $i + mb_strlen($talk_and[$q-1], "UTF-8") + 2;
						}
					}
				}
				
				if ((mb_substr($source, $i + 2, 1, "UTF-8") == "를" || mb_substr($source, $i + 2, 1, "UTF-8") == "가")) {
					if (mb_substr($source, $i + 3, 1, "UTF-8") == " ") {
						if ($chk_and == false) {
							$talk_memory = $talk_memory.','.mb_substr($source, $z, ($i - $z) + 2, "UTF-8");
						} else {
							$talk_memory = mb_substr($source, $z, ($i - $z) + 1, "UTF-8");
							$chk_and = TRUE;
						}
						$z = $i + 3;
					}
				}
				
				if ((mb_substr($source, $i + 2, 1, "UTF-8") == "을" || mb_substr($source, $i + 2, 1, "UTF-8") == "이")) {
					if (mb_substr($source, $i + 3, 1, "UTF-8") == " ") {
						if ($chk_and == false) {
							$talk_memory = $talk_memory.','.mb_substr($source, $z, ($i - $z) + 2, "UTF-8");
						} else {
							$talk_memory = mb_substr($source, $z, ($i - $z) + 1, "UTF-8");
							$chk_and = TRUE;
						}
						$z = $i + 3;
					}
				}
			
				for ($q = 1; $q <= count($talk_and);$q++) {
					if (mb_substr($source, $i + 1, mb_strlen($talk_and[$q-1], "UTF-8"), "UTF-8") == $talk_and[$q-1]) {
						if (mb_substr($source, $i + (mb_strlen($talk_and[$q-1], "UTF-8") + 1), 1, "UTF-8") == " ") {
							if ($chk_and == false) {
								$talk_memory = $talk_memory.",".mb_substr($source, $z, ($i - $z) + 1, "UTF-8");
							} else {
								$talk_memory = mb_substr($source, $z, ($i - $z) + 1, "UTF-8");
								$chk_and = TRUE;
							}
							$z = $i + mb_strlen($talk_and[$q-1], "UTF-8") + 2;
						}
					}
				}
				
				for ($q = 1;$q <= count($talk_inv);$q++) {
					if (mb_substr($source, $i + 1, mb_strlen($talk_inv[$q-1]), "UTF-8") == $talk_inv[$q-1]) {
						if (mb_substr($source, $i + (mb_strlen($talk_inv[$q-1], "UTF-8") + 1), 1, "UTF-8") == " ") {
							$talk_memory = $talk_memory.",".mb_substr($source, $z, ($i - $z) + 1, "UTF-8");
							$z = $i + mb_strlen($talk_and[$q-1], "UTF-8") + 2;
							$chk_and = TRUE;
							$chk_inv = TRUE;
						}
					}
				}
				
				for ($q = 1;$q <= count($talk_process);$q++) {
					if (mb_substr($source, $i + 1, mb_strlen($talk_process[$q-1], "UTF-8"), "UTF-8") == $talk_process[$q-1]) {
						if (mb_substr($source, $i + (mb_strlen($talk_process[$q-1], "UTF-8") + 1), 1, "UTF-8") == " " || $i+1 == mb_strlen($source, "UTF-8") - mb_strlen($talk_process[$q-1], "UTF-8")) {
							if (strpos($talk_memory, ",")!==false) {
								$talk_memory = $talk_memory.",".mb_substr($source, $z + 1, ($i - $z), "UTF-8");
								$talk_split = explode(",",$talk_memory);
								for ($w = 1; $w <= count($talk_split)-3;$w++) {
									if ($talk_memory3!='') {
										$talk_result = $talk_memory3;
									} else if ($talk_memory2!='') {
										$talk_result = $talk_memory2;
									}
									if (mb_strlen($talk_split[$w-1], "UTF-8")) {
										$response .= $this->run_func((mb_substr($source, $z, ($i - $z), "UTF-8")), $talk_result, $talk_split[$w-1], $talk_memory3, $talk_memory4);
									}
								}
							}
						}
					}
				}
				
			}
			
			return $this->base->response("type", "success", "html", ($response));
		}
		
		function run_func($Functions, $Address1, $Address2, $Address3, $Address4) {
			if ($Functions == '탐색')) {
				if ($Address1=='사이트') {
					if (isset($user[$Address2])) {
						$response .= $user[$Address2];
					} else {
						$response .= $Address2.' 유저를 찾을 수 없습니다.';
					}
				}
			}
			
			if ($Functions == '출력')) {
				if ($Address2 == '아이피') {
					$response .= $_SERVER['REMOTE_ADDR'];
				}
			}
			
			if ($Functions == '발음')) {
				if (isset($Address2)) {
					$response .= "<script>exus.Speech.speech('$Address2','Microsoft Heami Desktop - Korean',1,1);</script>";
				}
			}
			
			if (!$response)) {
				$response = '알 수 없는 명령어입니다.';
			}
			
			return $response;
		}
		
	}
?>