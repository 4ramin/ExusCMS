{#foreach $T as Row}
<a class="view_bd navi_page{#if $T.Row.page == $T.Row.current_page} current_page{#/if}" href="{$T.Row.href}">{$T.Row.page}</a>
{#/for}