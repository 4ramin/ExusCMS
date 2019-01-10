
$.core.Evt.addListener(window, 'load', function () {
	$('.dropdown').hover(function(){
		$(this).addClass('open');
	});

	$('.dropdown').focus(function(){
		$(this).addClass('open');
	});

	$('.dropdown').mouseleave(function(){ 
		$(this).removeClass('open');
	});
});

$.core.Request.addAjaxCallback('completeLogout', function(args) {
	args = $.core.JSON.decode(args);
	if(args["type"]=="error"){
		alert(args["message"]);
	}else{
		$.core.Browser.Redirect($.core.URL.setQuery('RToken', args["RToken"]), true);
	}
});

$.core.Request.addAjaxCallback('completeLogin', function(args) {
	args = $.core.JSON.decode(args);
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
	var params = core_flower.def_mid + "=member&act=procBoardLogin&user_id="+id+"&password="+pw;
	$.core.Request.ajax("POST",url,params,'completeLogin',"json");
}

function member_logout(){
	var url = "index.php";
	var params = core_flower.def_mid + "=member&act=procBoardLogout";
	$.core.Request.ajax("POST",url,params,'completeLogout',"json");
}

console.log($.core.Str.getNotationArr('(2*8+((3.7*2)/2) * 3)+5+(3*2)'));

console.log($.core.Scripter.Parse('var a\n\ntitle("test")\n\n\a="115"\n\nif (a) > ("10")\n\nalert("big then 10")\n\nelse\n\nalert("small then 10")\n\nend script'));
