$.Request.ajaxFailCallbacks('instance_complete_login', function(args){
	args = $._JSON.decode(args);
	if(args["type"]=="error"){
		alert(args["message"]);
	}else{
		alert(args["message"]);
	}
});

$.Request.addAjaxCallback('complete_remove_playlist', function(args){
	args = $._JSON.decode(args);
	if(args["type"]=="error"){
		alert(args["message"]);
	}else{
		$('[data-item="' + args["item"] + '"]').remove();
	}
});

$.Request.addAjaxCallback('instance_complete_login', function(args){
	args = $._JSON.decode(args);
	if(args["type"]=="error"){
		alert(args["message"]);
	}else if(args["type"]=="redirect"){
		redirect(args["html"], true);
	}else{
		$(".menu_cont").load(window.location.href + " .menu_cont");
		$(".login_box").load(window.location.href + " .login_info");
	}
});

function login_instance(){
	var url = "index.php";
	var id = $('.login_form').find('input[name=user_id]').val();
	var pw = $('.login_form').find('input[name=password]').val();
	var return_url = $('.login_form').find('input[name=return_url]').val();
	var params = core_flower.def_mid + "=member&act=procBoardLogin&user_id=" + id + "&password=" + pw + "&return_url=" + return_url;
	$.Request.ajax("POST",url,params,'instance_complete_login',"json");
}

function removePlaylist(target_srl){
	var url = "index.php";
	var params = {
		[core_flower.def_mid]: 'member',
		target: target_srl,
		act: 'removePlaylist'
	};

	$.Request.ajax("POST", url, params, 'complete_remove_playlist', "json");
}