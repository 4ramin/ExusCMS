<?php

	if(!defined("__FLOWER__")) exit();

	class maya
	{
		
		private static $self = NULL;
		
		private $addon_text = NULL;
		private $global_static = 0;
		private $text_i = 0;
		private $text_z = 0;
		private $debug = TRUE;
		
		var $self_position = 0;
		var $text_len = 0;
		
		function __construct()
		{
			
		}
	
		static function &getself()
		{
			static $obj = null;
			if(!$obj)
			{
				$obj = new maya();
			}

			return $obj;
		}
		
		/* line match execute
		   var int start
		   var str rule
		   var str text
		   var str mode
		*/
		function line_execute_match_left($start, $rule, $text, $mode)
		{
			//pass over position value(this function use absolute position value)
			$self = self::getself();
			
			$this->debug_print('>>LEFT LINE EXECUTE'.$mode.' - '.$rule.' / '."\n");
			
			$check_rule = strpos($rule, '||');
			
			if($check_rule!== false){
				$check_rule = explode('||',$rule);
				
				foreach($check_rule as $val)
				{
					if($mode=='equal')
					{
						$this->debug_print($self->text_i.substr(substr($text, $self->text_i), 0, strlen($val))."\n");
						if(substr(substr($text, $this->text_i), 0, strlen($val)) == $val)
						{
							return $start+1;
						}
					}
				}
				
				$this->debug_print(">>FALSE EXECUTE ARR");
				return -1;
			}
			else
			{
				$check_rule = $rule;
				$this->debug_print('>>EXECUTE SINGLE',substr($text, $this->text_i).'');
				$this->debug_print($rule);
				
				if($mode=='equal')
				{
					if(substr(substr($text, $this->text_i), 0, strlen($val)) == $val)
					{
						return $start + 1;
					}
				}
					
				$this->debug_print(">>FALSE EXECUTE");
				return -1;
			}
				
		}
		
		/* line match execute
		   var int start
		   var str rule
		   var str text
		   var str mode
		*/
		function line_execute_match_right($start, $rule, $text, $mode)
		{
			$this->debug_print('>>RIGHT LINE EXECUTE'.$mode.' - '.$rule.' / '.$text."\n");
			$self = self::getself();
			$self->global_static = FALSE;
			
			$check_rule_split = strpos($rule, '||');
			
			if($check_rule_split!== false)
			{
				$check_rule = explode('||',$rule);
				foreach($check_rule as $val)
				{
					if($mode=='like')
					{
						$check_arr = $this->addon_text==NULL ? strpos(substr($text, $self->text_i), $val) : strpos(substr($text, $self->text_i), $self->addon_text.$val);
						if($check_arr!== false)
						{
							return $start+1;
						}
					}
					elseif($mode=='equal')
					{
						$rep_a = $this->addon_text==NULL ? substr(substr($text,$self->text_i), strlen(substr($text, $self->text_i))-strlen($val), strlen($val)) : substr(substr($text,$self->text_i), (strlen(substr($text, $self->text_i))-strlen($val)) - strlen($this->addon_text), strlen($val) + strlen($this->addon_text));
						$rep_b = $this->addon_text==NULL ? $val : $this->addon_text.$val;
						
						$this->debug_print($rep_a);
						$this->debug_print($rep_b);
						
						if($rep_a == $rep_b)
						{
							return $start+1;
						}
					}
				}
				
				$this->debug_print(">>FALSE EXECUTE ARR");
				return -1;
			}
			else
			{
				$check_rule = $rule;
				$this->debug_print('>>EXECUTE SINGLE', substr($text,$this->text_i).'');
				$this->debug_print($rule);
				
				if($mode=='like')
				{
					$check_rule = $this->addon_text==NULL ? strpos(substr($text, $this->text_i), $check_rule) : strpos(substr($text, $this->text_i), $this->addon_text.$check_rule);
				
					if($check_rule!== false)
					{
						$self->text_i = $check_rule;
						return $start+1;
					}
				}
				elseif($mode=='equal')
				{
					if(substr(substr($text, $self->text_i), strlen(substr($text, $self->text_i)) - strlen($val), strlen($val)) == $val)
					{
						return $start+1;
					}
				}
					
				$this->debug_print(">>FALSE EXECUTE");
				return -1;
			}
		}
		
		/* debug message
		   var str message
		*/
		function debug_print($message)
		{
			if($this->debug)
			{
				echo '<div style="border:1px solid #EEE;margin:3px 5px;background-color:#EAC;padding:15px;width:100%;">';
				echo $message;
				echo '</div>';
			}
		}

		/* line split pass execute
		   var int start
		   var str rule
		   var str text
		*/
		function line_pass($start, $rule, $text, $passage=0)
		{
			$this->debug_print('>>LINEPASS'.$text." ".$rule."\n");
			$self = self::getself();
			
			$check_rule = strpos($rule, '||');

			if($check_rule!== false){
				
				$check_rule = explode('||',$rule);
				
				foreach($check_rule as $val)
				{
					$pattern_pos = strpos($text, $val, $start);
					if($pattern_pos!== false)
					{
						$this->debug_print('>>ARR REPEAT PASS '.substr($text, $pattern_pos+1)." / ".$val."\n");
						if($passage==0)
						{
							return $self->line_pass($pattern_pos + 1, $rule, $text, strlen($rule));
						}
						else
						{
							return $self->line_pass($pattern_pos + 1, $rule, $text, $passage);	
						}
					}
				}
				
				$this->debug_print('>>ARR SUCESS PASS '.substr($text, $start)."\n");
				$self->text_i = $start;
				return strlen($rule)+1;
			}
			else
			{
				$pattern_pos = strpos($text, $rule, $start);
				
				if($pattern_pos!== false)
				{
					$this->debug_print('>>REPEAT PASS '.substr($text, $pattern_pos+1)."\n");
					return $self->line_pass($pattern_pos+1, $rule, $text);
				}
				else
				{
					$self->text_i = $start;
					if($passage==0)
					{
						$this->debug_print('>>SarrUCESS PASS '.substr($text, $start)."\n");
						return strlen($rule)+1;
					}
					else
					{
						$this->debug_print('>>SUCESS PASS '.substr($text, $start)."\n");
						return $passage+1;
					}
				}
			}
		}
		
		function line_add($start, $rule)
		{
			$this->addon_text = $rule;
			return $start+1;
		}
		
		/* line base execute 
		   var int start
		   var str rule
		   var str pattern
		   var str text
		*/
		function line_execute($start, $rule, $pattern, $text)
		{
			$self = self::getself();
			$pattern_pos = strpos($rule, $pattern);
			$escape_pos = substr($rule, $pattern_pos + 1, 1);
			$this->debug_print('>>EXE '.$rule." / ".$text."/".$pattern."\n");
			if($pattern_pos!== false)
			{
				if($escape_pos==='^')
				{
					$this->debug_print('>>REPEAT'."\n");
					$self->line_execute($pattern_pos, substr($rule,$pattern_pos), $pattern, $text);
				}
				else
				{
					
					$this->debug_print('>>TRUE '.$rule." / ".$pattern."\n");
					switch ($pattern):
					case "+":
						return $self->line_add($pattern_pos, substr($rule, $start, $pattern_pos));
						break;
					case "$":
						return $self->line_execute_match_left($pattern_pos, substr($rule, $start, $pattern_pos), $text, 'equal');
						break;
					case "#":
						return $self->line_execute_match_right($pattern_pos, substr($rule, $start, $pattern_pos), $text, 'like');
						break;
					case "!":
						return $self->line_execute_match_right($pattern_pos, substr($rule, $start, $pattern_pos), $text, 'equal');
						break;
					case "@":
						return $self->line_pass($pattern_pos, substr($rule, $start, $pattern_pos), $text);
						break;
					default:
						break;
					endswitch;
				}
			}
			else
			{
				$this->debug_print('>>FALSE '.$rule." / ".$pattern."\n");
				return -1;
			}
		}
		
		static function execute($rule, $text, $type, $debug=FALSE)
		{

			$self = self::getself();
			
			$self->debug = $debug;
			$self->text_i = 0;
			
			$match_rule_init = array('!', '#', '@', '$', '+');
			
			$rule_len = strlen($rule);
			$text_len = strlen($text);
			
			if($rule_len==0) return;
			if($text_len==0) return;
			
			$i = 0;
			for($i; $i < $rule_len; $i++)
			{
				$pattern_pass = substr($rule,$i,1);
				if(in_array($pattern_pass, $match_rule_init))
				{
					$self->debug_print('>>'.substr($text,$self->text_i));
					
					$self_position = $self->line_execute(0, substr($rule, $i+1), $pattern_pass, $text);
					if($self_position==-1) return FALSE;
					$i = $i + $self_position;
				}
			}
			
			$self->debug_print('>>TRUE');
			
			return TRUE;
		}
		
	}