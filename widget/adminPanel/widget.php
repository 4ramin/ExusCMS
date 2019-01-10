<?php if(!defined("__FLOWER__")) exit(); ?>
<?php
	$base = new base();
	$base->addCSS('/widget/admin/css/basic.css');
?>
<script>
$.core.Request.addAjaxCallback('completeAdminPanel', function (args) {
	alert(args['html']);
});

function requestAdminPanel()
{
	var _word = $('#naturalSearch').val();
	
	var url = "index.php";
	var params = {
		[core_flower.def_mid]: 'naturalsearch',
		word: _word,
		act: 'getNaturalLanguage'
	};
	$.core.Request.ajax("POST", url, params, 'completeAdminPanel', "json");
}
</script>
<input type="text" id="naturalSearch" value=""/>
<input type="button" onclick="requestAdminPanel()" value="전송"/>