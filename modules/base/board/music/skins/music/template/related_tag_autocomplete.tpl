{#foreach $T as Row}
	<li class="autoload_doc">
	  <a {#if $T.Row.current_srl == $T.Row.item_srl}style="color:red"{#/if} href="{$T.Row.item_link}">{$T.Row.title}</a>
	</li>
{#/for}