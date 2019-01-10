"use strict";
var tmp_comment = undefined;
if (typeof disp === "undefined") {
	var disp = {};
}
if (typeof proc === "undefined") {
	var proc = {};
}

var disp = (function () {
	return {
		reply: function ($board, $serial, $target, $form, $srl) {
			if ($($form).find('#reply').is(':empty')) {
				$(tmp_comment).find('#reply').hide(200);
				$($form).find('#reply').html('');
				$($form).find('#reply').append(
					'<div class="pcomment_write_form comment_write">' + 
					'<form id="cw_' + $target + '" method="post" enctype="multipart/form-data" action="./">' + 
					'<input type="hidden" name="' + core_flower.def_mid + '" value="comment" />' + 
					'<input type="hidden" name="module" value="' + $board + '" />' + 
					'<input type="hidden" name="comment_srl" value="' + $serial + '" />' + 
					'<input type="hidden" name="parent_srl" value="' + $target + '" />' + 
					'<input type="hidden" name="act" value="insertComment" />' + 
					'<input type="hidden" name="srl" value="' + $srl + '" />' + 
					'<textarea id="content" name="content" class="postContent" placeholder=""></textarea>' + 
					'<input type="submit" onclick="proc.parent_comment(this, ' + $target + ')" class="bd_btn postComment" name="postComment" value="댓글">' + 
					'</div>'
				);
				tmp_comment = $form;
			} else {
				$($form).find('#reply').html(
					'<div class="pcomment_write_form comment_write">' + 
					'<form id="cw_' + $target + '" method="post" enctype="multipart/form-data" action="./">' + 
					'<input type="hidden" name="' + core_flower.def_mid + '" value="comment" />' + 
					'<input type="hidden" name="module" value="' + $board + '" />' + 
					'<input type="hidden" name="comment_srl" value="' + $serial + '" />' + 
					'<input type="hidden" name="parent_srl" value="' + $target + '" />' + 
					'<input type="hidden" name="act" value="insertComment" />' + 
					'<input type="hidden" name="srl" value="' + $srl + '" />' + 
					'<textarea id="content" name="content" class="postContent" placeholder=""></textarea>' + 
					'<input type="submit" onclick="proc.parent_comment(this, ' + $target + ')" class="bd_btn postComment" name="postComment" value="댓글">' + 
					'</div>'
				);
				$(tmp_comment).find('#reply').hide(200);
				if ($($form).find('#reply').is(":visible")) {
					$($form).find('#reply').hide(200);
				} else {
					$($form).find('#reply').show(200);
				}
				tmp_comment = $form;
			}
		},
		reply_modify: function ($board, $serial, $target, $form, $srl) {
			if ($($form).find('#reply').is(':empty')) {
				$(tmp_comment).find('#reply').hide(200);
				$($form).find('#reply').html('');
				$($form).find('#reply').append(
					'<div class="pcomment_write_form comment_write">' + 
					'<form id="cw_' + $target + '" method="post" enctype="multipart/form-data" action="./">' + 
					'<input type="hidden" name="' + core_flower.def_mid + '" value="comment" />' + 
					'<input type="hidden" name="module" value="' + $board + '" />' + 
					'<input type="hidden" name="comment_srl" value="' + $target + '" />' + 
					'<input type="hidden" name="parent_srl" value="' + $serial + '" />' + 
					'<input type="hidden" name="act" value="insertComment" />' + 
					'<input type="hidden" name="srl" value="' + $srl + '" />' + 
					'<textarea id="content" name="content" class="postContent" placeholder="">' + 
					$('#comment_content_' + $target).html() + '</textarea>' + 
					'<input type="submit" onclick="proc.parent_comment(this, ' + $target + ')" class="bd_btn postComment" name="postComment" value="수정">' + 
					'</div>'
				);
				tmp_comment = $form;
			} else {
				$($form).find('#reply').html(
					'<div class="pcomment_write_form comment_write">' + 
					'<form id="cw_' + $target + '" method="post" enctype="multipart/form-data" action="./">' + 
					'<input type="hidden" name="' + core_flower.def_mid + '" value="comment" />' + 
					'<input type="hidden" name="module" value="' + $board + '" />' + 
					'<input type="hidden" name="comment_srl" value="' + $serial + '" />' + 
					'<input type="hidden" name="parent_srl" value="' + $target + '" />' + 
					'<input type="hidden" name="act" value="insertComment" />' + 
					'<input type="hidden" name="srl" value="' + $srl + '" />' + 
					'<textarea id="content" name="content" class="postContent" placeholder="">' + 
					$('#comment_content_' + $target).html() + '</textarea>' + 
					'<input type="submit" onclick="proc.parent_comment(this, ' + $target + ')" class="bd_btn postComment" name="postComment" value="수정">' + 
					'</div>'
				);
				$(tmp_comment).find('#reply').hide(200);
				if ($($form).find('#reply').is(":visible")) {
					$($form).find('#reply').hide(200);
				} else {
					$($form).find('#reply').show(200);
				}
				tmp_comment = $form;
			}
		}
	};
})();

var proc = (function () {
	return {
		comment: function ($form) {
			event.preventDefault();
			$.getScript("library/js/jquery.form.js");
			var url = "index.php";
			var params = $("#form_cmt").serialize();
			exus.Request.ajax("POST", url, params, 'completeInsertComment', "json");
		},
		parent_comment: function ($form, $srl) {
			event.preventDefault();
			$.getScript("library/js/jquery.form.js");
			var url = "index.php";
			var params = $("#cw_" + $srl).serialize();
			exus.Request.ajax("POST", url, params, 'completeInsertComment', "json");
		},
		comment_vote: function (target) {
			var url = "index.php";
			var params = {
				[core_flower.def_mid]: core_flower.mid,
				srl: target,
				act: 'procCommentVote',
				[core_flower.def_mid]: 'comment'
			};
			exus.Request.ajax("POST", url, params, 'completeUpdateCommentVotedCount', "json");
		},
		comment_blame: function (target) {
			var url = "index.php";
			var params = {
				[core_flower.def_mid]: core_flower.mid,
				srl: target,
				act: 'procCommentBlame',
				[core_flower.def_mid]: 'comment'
			};
			exus.Request.ajax("POST", url, params, 'completeUpdateStarCount', "json");
		},
		star: function (star) {
			var url = "index.php";
			var params = {
				[core_flower.def_mid]: core_flower.mid,
				star: star,
				srl: core_flower.srl,
				act: 'procBoardStar'
			};
			if (core_flower.isLogged === false) {
				alert("별점을 매길 수 없습니다.");
			} else {
				exus.Browser.answerCallback("정말 별점을 매기겠습니까?", starCall);
			}

			function starCall() {
				exus.Request.ajax("POST", url, params, 'completeUpdateStarCount', "json");
			}
		},
		vote: function (target) {
			var url = "index.php";
			var params = {
				[core_flower.def_mid]: core_flower.mid,
				srl: target,
				act: 'procBoardVote'
			};
			if (core_flower.isLogged === false) {
				alert("추천할 수 없습니다.");
			} else {
				exus.Browser.answerCallback("정말 추천하시겠습니까?", voteCall);
			}

			function voteCall() {
				exus.Request.ajax("POST", url, params, 'complteYpdateVotedCount', "json");
			}
		},
		blame: function (target) {
			var url = "index.php";
			var params = {
				[core_flower.def_mid]: core_flower.mid,
				srl: target,
				act: 'procBoardBlame'
			};
			if (core_flower.isLogged === false) {
				alert("비추천할 수 없습니다.");
			} else {
				exus.Browser.answerCallback("정말 비추천하시겠습니까?", blameCall);
			}

			function blameCall() {
				exus.Request.ajax("POST", url, params, 'complteUpdateBlamedCount', "json");
			}
		},
		lst_related: function (pos, tag, bd, srl) {
			var url = "index.php";
			var params = {
				[core_flower.def_mid]: core_flower.mid,
				pos: pos,
				tag: tag,
				srl: srl,
				act: 'dispBoardRelatedList',
				target: 'Related'
			};
			exus.Request.ajax("POST", url, params, 'complteLoadReleatedList');
		},
		autocomplete: function (self) {
			var url = "index.php";
			var params = {
				[core_flower.def_mid]: core_flower.mid,
				pos: 0,
				tag: $(self).val(),
				srl: 0,
				act: 'dispBoardRelatedList',
				target: 'Autocomplete'
			};
			exus.Request.ajax("POST", url, params, 'autocomplete');
		},
		send_genre: function (value, srl) {
			var url = "index.php";
			var params = {
				[core_flower.def_mid]: core_flower.mid,
				genre: value,
				srl: srl,
				act: 'procBoardUpdateGenre'
			};
			exus.Request.ajax("POST", url, params, 'completeUpdateGenre', "json");
		},
		send_artist: function (e) {
			e.stopPropagation();
			var url = "index.php";
			var params = $("#genre_post").serialize();
			exus.Request.ajax("POST", url, params, 'completeUpdateArtist');
		},
		playlist: function (target) {
			var url = "index.php";
			var target_srl = $(target).attr("target_srl");
			var params = {
				[core_flower.def_mid]: core_flower.mid,
				target: target_srl,
				act: 'pushPlaylist'
			};
			exus.Request.ajax("POST", url, params, 'completeInsertPlaylist', "json");
		},
		send_sex: function (value, srl) {
			var url = "index.php";
			var params = "sex=" + value + "&srl=" + srl;
			exus.Request.ajax({
				type: "POST",
				url: url,
				data: params,
				success: function (args) {
					if (messangerType=='messanger') {
				Messenger().post({
				type: "info",
				message : args,
				hideAfter: 5
				});
			} else {
			exus.CoreMessanger.Show(args, 'bottom', 'right', 'error');
			}
				},
				error: function (e) {
					if (messangerType=='messanger') {
				Messenger().post({
				type: "info",
				message : args,
				hideAfter: 5
				});
			} else {
			exus.CoreMessanger.Show(args, 'bottom', 'right', 'error');
			}
				}
			});
		},
		rand_document: function () {
			var music_play = function (args) {
				var url = "index.php";
				var params = {
					[core_flower.def_mid]: core_flower.mid,
					act: 'procRandomDocument'
				};
				exus.Request.ajax("POST", url, params, 'randDocument', "json");
			}
			music_play();
		},
		rand_music: function () {
			var music_play = function (args) {
				var url = "index.php";
				var params = {
					[core_flower.def_mid]: core_flower.mid,
					act: 'procRandomMusic'
				};
				exus.Request.ajax("POST", url, params, 'j_music_play');
			}
			music_play();
		}
	};
})();