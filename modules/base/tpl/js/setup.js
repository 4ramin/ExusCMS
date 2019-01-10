function delExtra(){
}

function addExtra(){
}

$.core.Evt.addListener(window, 'load', function () {
	$("body").bind('scroll', function() {
		$('.title_setup').each(function() {
			var self = $(this);
			var position = self.position().top - ($(window).scrollTop() + $(window).height());
			var attr = self.attr('data-bar');
			if (position <= 0) {
				$('.top_bookmark .' + attr).addClass('selected_bookmark');
			} else {
				$('.top_bookmark .' + attr).removeClass('selected_bookmark');
			}
		});
	});
});

$.core.Request.addAjaxCallback('insertConfig', function (args) {
	if (args["type"] == "error") {
		$.core.CoreMessanger.Show(args["html"], 'bottom', 'right', 'error');
	} else {
		$.core.CoreMessanger.Show(args["html"], 'bottom', 'right', 'success');
	}
});

function insertConfig(){
	$.core.Evt.preventEvent(event);
	var url = event.currentTarget.href;
	var params = $("#form_config").serializeArray();
	
	var multiorder_option = $.map($('#multiorder_selected option') ,function(option) {
		return option.value;
	});
	
	if(multiorder_option.length>0){
		params.push({
			name : 'multiorder_option',
			value : multiorder_option.join(",")
		});
	}
	
	$.core.Request.ajax("POST", url, params, 'insertConfig');
}