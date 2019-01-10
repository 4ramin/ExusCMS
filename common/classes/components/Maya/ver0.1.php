<?php

	class maya
	{
		
		private static $addon_text = NULL;
		private static $global_static = 0;
		private static $text_i = 0;
		private static $self = NULL;
		
		private static $debug = FALSE;
		var $self_position = 0;
		var $text_len = 0;
		
		function __construct()
		{
			
		}
	
		function &getself()
		{
			static $obj = null;
			if(!$obj)
			{
				$obj = new maya();
			}

			return $obj;
		}
		
		function line_execute_match_left($start, $rule, $text, $mode)
		{
			$self = self::getself();
			
			$check_rule = strpos($rule, '||');
			
			if($check_rule!== false)
			{
				$check_rule = explode('||',$rule);
				
				foreach($check_rule as $val)
				{
					if($mode=='equal')
					{
						if(substr(substr($text, $this->text_i), 0, strlen($val)) == $val)
						{
							return $start+1;
						}
					}
				}
				
				return -1;
			}
			else
			{
				$check_rule = $rule;
				
				if($mode=='equal')
				{
					if(substr(substr($text, $this->text_i), 0, strlen($val)) == $val)
					{
						return $start + 1;
					}
				}
					
				return -1;
			}
				
		}
		
		function line_execute_match_right($start, $rule, $text, $mode)
		{
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
						
						if($rep_a == $rep_b)
						{
							return $start+1;
						}
					}
				}
				
				return -1;
			}
			else
			{
				$check_rule = $rule;
				
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
					
				return -1;
			}
		}

		function line_pass($start, $rule, $text, $passage=0)
		{
			$self = self::getself();
			
			$check_rule = strpos($rule, '||');

			if($check_rule!== false)
			{
				
				$check_rule = explode('||',$rule);
				
				foreach($check_rule as $val)
				{
					$pattern_pos = strpos($text, $val, $start);
					if($pattern_pos!== false)
					{
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
				
				$self->text_i = $start;
				return strlen($rule)+1;
			}
			else
			{
				$pattern_pos = strpos($text, $rule, $start);
				
				if($pattern_pos!== false)
				{
					return $self->line_pass($pattern_pos+1, $rule, $text);
				}
				else
				{
					$self->text_i = $start;
					if($passage==0)
					{
						return strlen($rule)+1;
					}
					else
					{
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
		
		function line_execute($start, $rule, $pattern, $text)
		{
			$self = self::getself();
			$pattern_pos = strpos($rule, $pattern);
			$escape_pos = substr($rule, $pattern_pos + 1, 1);
			if($pattern_pos!== false)
			{
				if($escape_pos==='^')
				{
					$self->line_execute($pattern_pos, substr($rule,$pattern_pos), $pattern, $text);
				}
				else
				{
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
				return -1;
			}
		}
		
		function execute($rule, $text, $type, $debug=FALSE)
		{
			$self = self::getself();
			
			$self->debug = $debug;
			$self->text_i = 0;
			
			$match_rule_init = array('!', '#', '@', '$', '+');
			
			$rule_len = strlen($rule);
			
			if($rule_len==0) return;
			
			$i = 0;
			for($i; $i < $rule_len; $i++)
			{
				$pattern_pass = substr($rule,$i,1);
				if(in_array($pattern_pass, $match_rule_init))
				{
					$self_position = $self->line_execute(0, substr($rule, $i+1), $pattern_pass, $text);
					if($self_position==-1) return FALSE;
					$i = $i + $self_position;
				}
			}
			
			return TRUE;
		}
		
	}
	
?>