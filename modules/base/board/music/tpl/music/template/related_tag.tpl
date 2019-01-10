{#foreach $T as Row}
	<li class="relatedDocumentItem">
	  <a {#if $T.Row.current_srl == $T.Row.item_srl}style="color:red"{#/if} href="{$T.Row.item_link}">{$T.Row.title}</a>
	  <div class="fr wrapper">
		<a href="{$T.Row.file_link}" class="sm2_button" ></a>
	  </div>
	</li>
{#/for}