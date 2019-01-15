<?php

class html
{
	
	public static function generateParameter($attributes = [])
	{
		$result;
		foreach ($attributes as $key => $val) 
		{
			$pair = sprintf("'%s'", $val);
			if($result)
			{
				$result = $result.",".$pair;
			}
			else
			{
				$result = $pair;
			}
		}
		
		return $result;
	}
	
	public static function element($type, $content, $attributes = [])
	{
		$html .= sprintf("%s%s", '<' ,$type);
		
        if (empty($attributes)) 
		{
            $html .= '';
        }
		else if (is_string($attributes)) 
		{
            $html .= ' '.$attributes;
        }
		elseif(is_array($attributes))
		{
			foreach ($attributes as $key => $val) 
			{
				if($key)
				{
					$pairs[] = sprintf('%s="%s"', $key, $val);
				}
			}
			
			$html .= ' '.implode(' ', $pairs);
		}
		
		return sprintf("%s>%s</%s>", $html, $content, $type);
	}
	
	public static function audio($args)
	{
		$source = $args->source;
		$control = $args->control;
		$repeat = $args->repeat;
		
		if($control == TRUE)
		{
			if($repeat == TRUE)
			{
				return "<audio src=$source preload=metadata loop=loop controls="."></audio>";
			}
			else
			{
				return "<audio src=$source preload=metadata controls="."></audio>";
			}
		}
		else
		{
			if($repeat == TRUE)
			{
				return "<audio src=$source preload=metadata loop=loop></audio>";
			}
			else
			{
				return "<audio src=$source preload=metadata></audio>";
			}
		}
	}
	
}

?>