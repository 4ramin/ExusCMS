"use strict";
exus.Request.addAjaxCallback('completeUpdateArtist', function (args) {
	if (args["type"] == "error") {
		exus.CoreMessanger.Show(args["html"], 'bottom', 'right', 'error');
	} else {
		$('input[name="singer"]').val(args["html"]);
		exus.CoreMessanger.Show("아티스트 업데트를 완료했습니다.", 'bottom', 'right', 'success');
	}
});

exus.Request.addAjaxCallback('randDocument', function (args) {
	if (args["type"] == "error") {
		exus.CoreMessanger.Show(args["html"], 'bottom', 'right', 'error');
	} else {
		exus.Request.ajax("GET", args["html"], '', 'complete_randdoc');
		//exus.Browser.Redirect(args["html"], true);
		exus.Browser.pushState(null, null, args["html"]);
	}
});

exus.Request.addAjaxCallback('completeLyrics', function (_) {
	"success" === _.type && chkLyricsType(_.html) ? $(".lyrics_display").html(_.html) && $(".lyrics_display").children().hide() && evtListener() : $(".lyrics_display").html(_.html);
});
	
exus.Request.addAjaxCallback('j_music_play', function (args) {
	var music_play = function (args) {
		var url = "index.php";
		var params = {
			[core_flower.def_mid]: core_flower.mid,
			act: 'procRandomMusic'
		};
		exus.Request.ajax("POST", url, params, 'j_music_play');
	}
	
	if (args) {
		var n = args.split("||");
		exus.CoreMessanger.Show(n[1] + "를 재생중입니다...", 'bottom', 'right', 'success');

		$("#randdownload").attr("href", n[2]);
		$("#randdownload").attr("playlist", n[2]);
		$("#randdownload").attr("style", "display:block");
		$("#playlist").attr("style", "display:block");
		$("#playlist").attr("target_srl", n[3]);
		exus.Audio.loadAudio(n[0]);
		exus.Audio.playAudio();
		$(StreamAudio).on("ended", function () {
			music_play();
		});
	}
});

exus.Request.addAjaxCallback('completeUpdateGenre', function (args) {
	exus.CoreMessanger.Show(args["html"], 'bottom', 'right', 'error');
});

exus.Request.addAjaxCallback('complteUpdateBlamedCount', function (args) {
	if (args["type"] == "error") {
		exus.CoreMessanger.Show(args["html"], 'bottom', 'right', 'error');
	} else {
		$(".blamed_count").html(args["html"]);
		exus.CoreMessanger.Show("비추천되었습니다.", 'bottom', 'right', 'success');
	}
});

exus.Request.addAjaxCallback('complteYpdateVotedCount', function (args) {
	if (args["type"] == "error") {
		exus.CoreMessanger.Show(args["html"], 'bottom', 'right', 'error');
	} else {
		$(".voted_count").html(args["html"]);
		exus.CoreMessanger.Show("추천되었습니다.", 'bottom', 'right', 'success');
	}
});

exus.Request.addAjaxCallback('completeUpdateStarCount', function (args) {
	if (args["type"] == "error") {
		exus.CoreMessanger.Show(args["html"], 'bottom', 'right', 'error');
	} else {
		exus.CoreMessanger.Show("별점이 완료되었습니다.", 'bottom', 'right', 'success');
	}
});

exus.Request.addAjaxCallback('complteUpdateCommentBlamedCount', function (args) {
	if (args["type"] == "error") {
		exus.CoreMessanger.Show(args["html"], 'bottom', 'right', 'error');
	} else {
	exus.CoreMessanger.Show("댓글 비추천을 완료했습니다.", 'bottom', 'right', 'success');
	}
});

exus.Request.addAjaxCallback('completeUpdateCommentVotedCount', function (args) {
	if (args["type"] == "error") {
		exus.CoreMessanger.Show(args["html"], 'bottom', 'right', 'error');
	} else {
	exus.CoreMessanger.Show("댓글 추천을 완료했습니다.", 'bottom', 'right', 'success');
	}
});

exus.Request.addAjaxCallback('completeInsertComment', function (args) {
	if (args["type"] == "error") {
		exus.CoreMessanger.Show(args["html"], 'bottom', 'right', 'error');
	} else {
		exus.Browser.Refresh();
	}
});

exus.Request.addAjaxCallback('completeInsertPlaylist', function (args) {
	if (args["type"] == "error") {
		exus.CoreMessanger.Show(args["html"], 'bottom', 'right', 'error');
	} else {
		exus.CoreMessanger.Show(args["html"], 'bottom', 'right', 'success');
	}
});

exus.Request.addAjaxCallback('autocomplete', function (args) {
	args = exus.JSON.parse(args);
	if (exus.JSON.isJSON(args)) {
		var prev_navi = args.prev_navi;
		var next_navi = args.next_navi;
		var tag = args.tag_list;
		var navi = args.navigator;
		$('#autoload_related_list').setTemplateURL("module/base/board/music/tpl/music/template/related_tag_autocomplete.tpl").processTemplate(tag);
	} else {
		$('#autoload_related_area').html(args).show(700);
	}
});

exus.Request.addAjaxCallback('complteLoadReleatedList', function (args) {
	args = exus.JSON.parse(args);
	if (exus.JSON.isJSON(args)) {
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

exus.Request.addAjaxCallback('complete_randdoc', function (args) {
	if (args) {
		loadDoc(args, true);
	}
});

exus.Request.addAjaxCallback('completeLoadDocument', function (args) {
	if (args) {
		loadDoc(args, false);
	}
});

exus.Request.addAjaxCallback('completeLoadComment', function (args) {
	if (args) {
		if($('#comment_padding').length>0){
			$('#comment_padding').html(args);
			$("html, body").animate({scrollTop: $('#comment_padding').position().top}, 100, 'swing');
			registryBoardAjax();
		}
	}
});

exus.Request.addAjaxCallback('completeLoadPage', function (args) {
	if (args) {
		var target = $('.boardListWrap');
		var target_sub = $('.list_area .content div div');
		if(target.length>0){
			target.html(args);
			$("html, body").animate({scrollTop: target.position().top}, 100, 'swing');
			registryBoardAjax();
		} else {
			console.log('wer');
			console.log(args.coreUserObj);
			var target = $('.content');
			
			target.html(args);
			$("html, body").animate({scrollTop: target.position().top}, 100, 'swing');
			registryBoardAjax();
		}
	}
});
