"use strict";

var glob_srl = null;
var readObject = $('.documentContent');

function categoryAjax(url) {
	if (isAjaxProcessing === false) {
		exus.Evt.preventEvent(event);
		exus.Request.ajax("GET", url, '', 'completeLoadPage');
		exus.Browser.pushState(null, null, url);
		window.history.pushState(null, null, url);
	} else {
		exus.Evt.preventEvent(event);
	}
}

function closeDoc() {
	readObject.empty();
	glob_srl = null;
}

function loadDoc(args, getpart) {
	readObject = $('.documentContent');
	
	if(readObject.length>0){
		if(getpart==true){
			$('.list_area').empty();
			$('.list_area').parent().html(args);
		}else if(readObject.length===0){
			readObject.empty();
			exus.Element.appendDiv('.category', 'documentContent');
			readObject.parent().html(args);
		} else {
			readObject.empty();
			readObject.parent().html($(args).find(".documentContent"));
		}
		registryBoardAjax();
		$("html, body").animate({scrollTop: $('.list_area').position().top}, 100, 'swing');
	}
}
	
function procSearch(elem, event) {
	if($(elem).find('input[name=keyword]').val().length===0) {
		exus.Evt.preventEvent(event);
		alert('검색어 값은 필수입니다.');
	}
}

function registryBoardAjax(){
	if (core_flower.srl) {
		if(typeof(ZeroClipboard)=='function') {
			var client = new ZeroClipboard(document.getElementById("copy-button"));
			client.on("ready", function(readyEvent){
				client.on("aftercopy", function(event){
					alert("복사가 완료되었습니다.");
				});
			});
		}
	}
	
	exus.detectAdblock.create();
	
	setTimeout(function() {
		if(exus.detectAdblock.detect()) {
			$('.content_pad').hide();
		}
	}, 1000);

	if(glob_srl !== null){
		var target = $('div[data-srl=' + glob_srl + ']');
		if (target.length > 0) {
			$('div[data-srl=' + glob_srl + ']').addClass('viewing_g2');
		}
	} else {
		var target_focus_srl = exus.URL.getParam('srl',window.location.href);
		if (target_focus_srl) {
			glob_srl = target_focus_srl;
			var target = $('div[data-srl=' + glob_srl + ']');
			if (target.length > 0) {
				$('div[data-srl=' + glob_srl + ']').addClass('viewing_g2');
			}
		}
	}
	
	$('a').unbind('click');
	$('form').unbind('submit');
	$('.bd_lst li').mouseover(function() {
		$(this).find('.sm2_btn ,.mp3_btn').show();
	}), $('.bd_lst li').mouseout(function() {
		$(this).find('.sm2_btn ,.mp3_btn').hide();
	});
	
	exus.Browser.setIframeAPushState();
	
	$(window).on('popstate', function(event) {
		var target_url = event.target.hosthref;
		var target_srl = exus.URL.getParam('srl',target_url);
		var target_page = exus.URL.getParam('page',target_url);
		if (!target_url) return;
		
		readObject = $('.documentContent');
		
		if (target_srl && readObject.length>0) {
			
		} else if (!target_srl && target_page) {
			var url = exus.URL.setParam('act', '', target_url);
			
			/*exus.Request.ajax("GET", url, '', 'completeLoadPage', 'wer');
			exus.Browser.pushState(null, null, url);*/
		}
	}), $("form").submit(function (event) {
		var bdsearch = $(event.target).hasClass("bd_srch_btm");
		if(bdsearch === true){
			if (isAjaxProcessing === false) {
				exus.Evt.preventEvent(event);
				var url = event.currentTarget.href;
				var params = $(".bd_srch_btm").serialize();
				exus.Request.ajax("GET", url, params, 'completeLoadPage');
			} else {
				exus.Evt.preventEvent(event);
			}
		}
	}), $("a").hover(function (event) {
		if ($(this).attr('data-img')) {
			$(this).find('.wrp').css('display','inline');
		}
	}, function () {
		if($(this).attr('data-img')) {
			$(this).find('.wrp').css('display','none');
		}
	}), $('a[href*= "#"]').click(function (event) {
		if (exus.Str.removeTagHash(this.href) === exus.Str.removeTagHash(location.href) && location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
			var $target = $(this.hash), targetOffset;
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
			if ($target.length) {
				exus.Evt.preventEvent(event);
				targetOffset = $target.offset().top;
				$('html, body').animate({scrollTop: targetOffset}, 600, 'quart');
				return false;
			}
		}
	}), $("a").click(function (event) {
		var tag = event.currentTarget.tagName.toUpperCase();
		var url = event.currentTarget.href;
		var navi_page = $(event.target).hasClass("navi_page");
		var comment_navi = $(event.target).hasClass("comment_navi");
		var view_bd = $(event.target).hasClass("view_bd");
		
		if (tag === 'A' && !url.match(url)) {
			if (view_bd === true) {
				if (isAjaxProcessing === false) {
					readObject = $('.documentContent');
					
					if(readObject.length>0 || $('.related_doc').length>0){
						exus.Evt.preventEvent(event);
						url = exus.URL.setParam('act', '', url);
						exus.Request.ajax("GET", url, '', 'completeLoadDocument');
						exus.Browser.pushState(null, null, url);
						if(core_flower.bdstyle=='flat'){
							var srl = exus.URL.getParam('srl',url);
							glob_srl = srl;
							
							$('.bd_lst li div').removeClass('viewing_g2');
							$('.bd_lst a').filter(function() {
								var regex = 'srl=' + srl + '';
								var regexr = new RegExp(regex, 'g');
								if(this.href.match(regexr)) {
									if($(this).hasClass('view_bd')){
										$(this).parent().find('.tmb').addClass('viewing_g2');
									}
								}
							});
						}
					}
				} else {
					exus.Evt.preventEvent(event);
				}
			} else if(comment_navi === true){
				if (isAjaxProcessing === false) {
					exus.Evt.preventEvent(event);
					url = exus.Str.removeTagHash(url);
					exus.Request.ajax("GET", url, '', 'completeLoadComment');
				} else {
					exus.Evt.preventEvent(event);
				}
			} else if(navi_page === true){
				if (isAjaxProcessing === false) {
					exus.Evt.preventEvent(event);
					exus.Request.ajax("GET", url, '', 'completeLoadPage');
					exus.Browser.pushState(null, null, url);
				} else {
					exus.Evt.preventEvent(event);
				}
			}
		}
	});
}

exus.Evt.addListener(window, 'load', function () {
	registryBoardAjax(), $('.docs-pictures').maxWidth(500), $('.docs-pictures').maxHeight(500);
	$(document).keyDownHandler(function (keyCode, event) {
		if (!$(":input,[contenteditable]").isEditable()) {
			switch (keyCode) {
			case exus.Element.getKeyDownCode('c'):
				$('#comment_padding ul').FocusAnimate();
				break;
			case exus.Element.getKeyDownCode('l'):
				$('.bd_lst_wrp').FocusAnimate();
				break;
			case exus.Element.getKeyDownCode('t'):
				exus.Effect.FocusAnimate(0);
				break;
			case exus.Element.getKeyDownCode('b'):
				exus.Effect.FocusAnimate($(window).height());
				break;
			}
		} else {
			if (exus.Arr.isArrayEqual(keyCode, [17, 16])) { //Ctrl + Shift
				event.preventDefault();
				proc.comment('#form_cmt');
			}
		}
	});
	
	$('#form_cmt').submit(function (event) {
		proc.comment(this);
	}), $('#comment').submit(function (event) {
		proc.comment(this);
	}), $("#extend").click(function () {
		$("#content").height(500);
	}), $(".rating .rating-input").click(function () {
		proc.star($(this).attr('value'));
	});
});
