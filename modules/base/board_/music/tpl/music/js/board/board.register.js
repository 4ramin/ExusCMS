"use strict";

$.core.Request.addAjaxCallback('completeLyrics', function (_) {
	"success" === _.type && chkLyricsType(_.html) ? 
	$(".lyrics_display").html(_.html) && $(".lyrics_display").children().hide() && evtListener() : 
	$(".lyrics_display").html(_.html), $(".lyrics_display_expand").html(_.html);
						
	if ("success" === _.type && chkLyricsType(_.html)) {
		$(".lyrics_display").find('div').each(function(i, item){
			var linkRegExr = '/(http:\/\/.*[.a-zA-Z0-9-]+\.[a-zA-Z]+)/g';
			$(item).html($(item).html().replace(linkRegExr, '<a style="text-decoration:underline" href="$1">$1</a>'));
			if ($(item).html().match(regJapanese)) {
				$(item).html('<div class="lyric_with_jp">' + $(item).html() + '</div>');
			} else {
				$(item).html('<div class="lyric_etc">' + $(item).html() + '</div>');
			}
		});
		
		$(".lyrics_display_expand > div").each(function(i, item){
			$(item).html($(item).html() + '<span style=float:right>' + $.core.Time.formatTime($(item).attr('timestamp')) + '</span>');
		});
	}
});

$.core.Request.addAjaxCallback('randDocument', function (args) {
	if (args["type"] == "error") {
		$.core.CoreMessanger.Show(args["html"], 'bottom', 'right', 'error');
	} else {
		if (readObject.length === 0) {
			$.core.Browser.Redirect(args["html"], true);
		} else {
			$.core.Request.ajax("GET", args["html"], '', 'complete_randdoc');
		}
		
		glob_srl = $.core.URL.getParam('srl', args["html"]);
		
		if (isForRedirect == true) {
			$.core.Browser.Redirect(args["html"], true);
		} else {
			$.core.Browser.pushState(null, null, args["html"]);
		}
	}
});

$.core.Request.addAjaxCallback('complteUpdateBlamedCount', function (args) {
	if (args["type"] == "error") {
		$.core.CoreMessanger.Show(args["html"], 'bottom', 'right', 'error');
	} else {
		$(".blamed_count").html(args["html"]);
		$.core.CoreMessanger.Show(COMPLETE_BLAMED, 'bottom', 'right', 'success');
	}
});

$.core.Request.addAjaxCallback('completeUpdateGenre', function (args) {
	showCompactAjaxMessage(args, COMPLETE_GENRE_UPDATE);
});

$.core.Request.addAjaxCallback('complteYpdateVotedCount', function (args) {
	showCompactAjaxMessage(args, COMPLETE_VOTE);
});

$.core.Request.addAjaxCallback('completeUpdateStarCount', function (args) {
	showCompactAjaxMessage(args, COMPLETE_STAR);
});

$.core.Request.addAjaxCallback('complteUpdateCommentBlamedCount', function (args) {
	showCompactAjaxMessage(args, COMPLETE_COMMENT_BLAMED);
});

$.core.Request.addAjaxCallback('completeUpdateCommentVotedCount', function (args) {
	showCompactAjaxMessage(args, COMPLETE_COMMENT_VOTE);
});

$.core.Request.addAjaxCallback('completeInsertComment', function (args) {
	if (args["type"] == "error") {
		$.core.CoreMessanger.Show(args["html"], 'bottom', 'right', 'error');
	} else {
		var url = $.core.URL.getUrl();
		url = $.core.Str.removeTagHash(url);
		$.core.Request.ajax("GET", url, '', 'completeLoadComment');
	}
});

$.core.Request.addAjaxCallback('autocomplete', function (args) {
	args = $.core.JSON.parse(args);
	if ($.core.JSON.isJSON(args)) {
		var prev_navi = args.prev_navi;
		var next_navi = args.next_navi;
		var tag = args.tag_list;
		var navi = args.navigator;
		$('#autoload_related_list').setTemplateURL("module/base/board/music/tpl/music/template/related_tag_autocomplete.tpl").processTemplate(tag);
	} else {
		$('#autoload_related_area').html(args).show(700);
	}
});

$.core.Request.addAjaxCallback('complteLoadReleatedList', function (args) {
	args = $.core.JSON.parse(args);
	if ($.core.JSON.isJSON(args)) {
		var prev_navi = args.prev_navi;
		var next_navi = args.next_navi;
		var tag = args.tag_list;
		var navi = args.navigator;
		$('#prev_nav').setTemplateURL("module/base/board/music/tpl/music/template/related_btn.tpl").processTemplate(prev_navi);
		$('#next_nav').setTemplateURL("module/base/board/music/tpl/music/template/related_btn.tpl").processTemplate(next_navi);
		$('#related_list').setTemplateURL("module/base/board/music/tpl/music/template/related_tag.tpl").processTemplate(tag);
		$('#related_nav_page').setTemplateURL("module/base/board/music/tpl/music/template/related_navi.tpl").processTemplate(navi);
	} else {
		$('#related_area').html(args).show(700);
	}
});

$.core.Request.addAjaxCallback('complete_randdoc', function (args) {
	if (args) {
		loadDoc(args, true);
	}
});

$.core.Request.addAjaxCallback('completeLoadDocument', function (args) {
	if (args) {
		loadDoc(args, false);
	}
});

$.core.Request.addAjaxCallback('completeLoadComment', function (args) {
	if (args) {
		if($('#comment_padding').length>0){
			$('#comment_padding').html($(args).find('#comment_padding'));
			$("html, body").animate({scrollTop: $('#comment_padding').position().top}, 100, 'swing');
			registryBoardAjax();
		}
	}
});

$.core.Request.addAjaxCallback('completeSearch', function (args) {
	if (args) {
		var target = $('.list_area');
		if (target.length>0) {
			target.html($(args).find('.list_area'));
			$("html, body").animate({scrollTop: target.position().top}, 100, 'swing');
			registryBoardAjax();
		} 
	}
});

$.core.Request.addAjaxCallback('completeLoadPage', function (args) {
	if (args) {
		var target = $('.boardListWrap');
		var target_sub = $('.list_area .content div div');
		if (target.length>0) {
			target.html($(args).find('.boardListWrap'));
			$("html, body").animate({scrollTop: target.position().top}, 100, 'swing');
			registryBoardAjax();
		} else {
			var target = $('.content');
			target.html(args);
			$("html, body").animate({scrollTop: target.position().top}, 100, 'swing');
			registryBoardAjax();
		}
	}
});

function keyEventRegistry(){
	$(document).keyDownHandler(function (keyCode, event) {
		if (!$(":input,[contenteditable]").isEditable()) {
			switch (keyCode) {
			case $.core.Element.getKeyDownCode('c'):
				$('#comment_padding ul').FocusAnimate();
				break;
			case $.core.Element.getKeyDownCode('l'):
				$('.bd_lst_wrp').FocusAnimate();
				break;
			case $.core.Element.getKeyDownCode('t'):
				$.core.Effect.FocusAnimate(0);
				break;
			case $.core.Element.getKeyDownCode('b'):
				$.core.Effect.FocusAnimate($(window).height());
				break;
			}
		} else {
			if ($.core.Arr.isArrayEqual(keyCode, [17, 16])) { //Ctrl + Shift
				event.preventDefault();
				proc.comment('#form_cmt');
			}
		}
	});
}
