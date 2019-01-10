{#foreach $T as Row}
	<a class="view_bd" onclick="proc.lst_related('{$T.Row.page}','{$T.Row.item_tag}','{$T.Row.item_module_srl}','{$T.Row.item_srl}')" {#if $T.Row.cur_page == $T.Row.page_count}style="color:red"{#/if}>
		{$T.Row.cur_page}
	</a>
	<span class="bar">|</span> 
{#/for}