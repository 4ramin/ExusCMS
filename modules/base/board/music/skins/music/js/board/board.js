"use strict";

function registryBoardAjax(){

	bindGlobalEvents();
	
	$.core.Browser.setIframeAPushState();
	lazyloadRegsitry();
	
	registryZeroClipboard();
	
	highlightRunner(location.href);
	
	//keyEventRegistry();
	
	$('#form_cmt').submit(function (event) {
		proc.comment(this);
	});
	
	$('#comment').submit(function (event) {
		proc.comment(this);
	});
	
	$("#extend").click(function () {
		$("#content").height(500);
	});
	
	$(".rating .rating-input").click(function () {
		proc.star($(this).attr('value'));
	});
	
	$('.bd_lst li').mouseover(function() {
		$(this).find('.sm2_btn ,.mp3_btn').show();
	});
	
	$('.bd_lst li').mouseout(function() {
		$(this).find('.sm2_btn ,.mp3_btn').hide();
	});
	
	addDispPrefix();
	
	$(window).on('popstate', function(event) {
		popstateEvent(this, event);
	});
	
	$("form").submit(function (event) {
		formSubmitEvent(event);
	});
	
	$("a").hover(function (event) {
		hyperlinkHoverEvent(this);
	}, function () {
		if($(this).attr('data-img')) {
			$(this).find('.wrp').css('display', 'none');
		}
	});
	
	$('a[href*= "#"]').click(function (event) {
		hyperlinkBookmarkEvent(this, event);
	});
	
	$("a").click(function (event) {
		hyperlinkEvent(this, event);
	});
}

$.core.Evt.addListener(window, 'load', function () {
	registryBoardAjax();
});