<?php

class parser
{
	
	/**
	 * mid string
	 *
	 * @param     string    args->from
	 * @param   int/string  args->front
	 * @param   int/string  args->end
	 *
	 */
	public static function mid_str($args)
	{
		$start = $args->start;
		if(!isset($start))
		{
			$start = 0;
		}
		$string = $args->from;
		$front = $args->front;
		$end = $args->end;
		
		if(is_int($front) && is_int($end))
		{
			return substr($string, $front, $end);
		}
		elseif(is_string($front) && is_string($end))
		{
			if(strpos($string, $front, $start))
			{
				$front_i = strpos($string, $front, $start) + strlen($front);
				$end_i = strpos($string, $end, $front_i + 1);
				return substr($string,$front_i, $end_i - $front_i);
			}
		}
	}
	
	public static function sort_code($args)
	{
		$int_delimiter = 0;
		$code = $args->code;
		$delimiter = $args->str1;
		$delimiter2 = $args->str2;
		for($i=0;$i<=strlen($code);$i++)
		{
			if(substr($code,$i,1)==$delimiter)
			{
				$int_delimiter = $int_delimiter+1;
				if($int_delimiter>-1)
				{
					echo str_repeat("\t",$int_delimiter);
					echo $delimiter."\n\t";
				}
				elseif($int_delimiter<0)
				{
					echo 'Err';
				}
			}
			elseif(substr($code,$i,1)==$delimiter2)
			{
				$int_delimiter = $int_delimiter-1;
				if($int_delimiter>-1){
					echo str_repeat("\t",$int_delimiter);
					echo $delimiter2."\n\t";
				}elseif($int_delimiter<0){
					echo 'Err';
				}
			}
			else
			{
				echo substr($code,$i,1);
			}
		}
	}
	
}
?>