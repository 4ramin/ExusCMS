$.core.Evt.addListener(window, 'load', function () {
	$('.root_gnb').click(function(){
		if($(this).next().hasClass('open')){
			$(this).next().removeClass('open');
		}else{
			$(this).next().addClass('open');
		}
	});
});

function checkInstall(plugin_name)
{
	var url = core_flower.url + '/index.php';
	var params = {
		[core_flower.def_mid]: 'admin',
		module: plugin_name,
		act: 'procAdminisPluginInstalled'
	};
	$.core.Request.ajax("POST", url, params, 'completeCheckInstalled', 'json');
}

$.core.Request.addAjaxCallback('completeCheckInstalled', function (args) {
	if (args["type"] == "error") {
		$.core.CoreMessanger.Show(args["html"], 'bottom', 'right', 'error');
	} else {
		$.core.CoreMessanger.Show(args["html"], 'bottom', 'right', 'success');
	}
});