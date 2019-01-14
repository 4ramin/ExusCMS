$.core.Evt.addListener(window, 'load', function () {
	$.core.Element.setMenuToggleClass('.dropdown', 'open');
	var audioContext = $.core.Audio.getContextObject();
	console.log(audioContext);
});

$.core.Request.addAjaxCallback('completeLogout', function(args) {
	if(args["type"]=="error"){
		alert(args["message"]);
	}else{
		$.core.Browser.Redirect($.core.URL.setQuery('RToken', args["RToken"]), true);
	}
});

$.core.Request.addAjaxCallback('completeLogin', function(args) {
	if(args["type"]=="error"){
		alert(args["message"]);
	}else{
		$.core.Browser.Redirect($.core.URL.setQuery('RToken', args["RToken"]), true);
	}
});

function member_login(){
	var url = "index.php";
	var id = $('#simple_outlogin').find('input[name=mb_id]').val();
	var pw = $('#simple_outlogin').find('input[name=mb_password]').val();
	var params = core_flower.def_mid + "=member&act=procBoardLogin&user_id=" + id + "&password=" + pw;
	$.core.Request.ajax("POST", url, params, 'completeLogin', "json");
}

function member_logout(){
	var url = "index.php";
	var params = core_flower.def_mid + "=member&act=procBoardLogout";
	$.core.Request.ajax("POST", url, params, 'completeLogout', "json");
}
