"use strict";

var proc = (function () {
	return {
		comment: function ($form) {
			event.preventDefault();
			$.getScript("common/js/jquery.form.js");
			var params = $("#form_cmt").serialize();
			$.core.Request.ajax("POST", requestBackendFile, params, 'completeInsertComment', "json");
		},
		parent_comment: function ($form, $srl) {
			event.preventDefault();
			$.getScript("common/js/jquery.form.js");
			var params = $("#cw_" + $srl).serialize();
			$.core.Request.ajax("POST", requestBackendFile, params, 'completeInsertComment', "json");
		},
		comment_vote: function (target) {
			var params = {
				srl: target,
				act: 'procCommentVote',
				[core_flower.def_mid]: 'comment'
			};
			$.core.Request.ajax("POST", requestBackendFile, params, 'completeUpdateCommentVotedCount', "json");
		},
		comment_blame: function (target) {
			var params = {
				srl: target,
				act: 'procCommentBlame',
				[core_flower.def_mid]: 'comment'
			};
			$.core.Request.ajax("POST", requestBackendFile, params, 'completeUpdateStarCount', "json");
		},
		playlist: function (target) {
			var params = {
				target: $(target).attr('target_srl'),
				act: 'procAddPlaylist',
				[core_flower.def_mid]: core_flower.mid
			};
			$.core.Request.ajax("POST", requestBackendFile, params, 'completeUpdateStarCount', "json");
		},
		star: function (star) {
			if (core_flower.isLogged === false) {
				alert(CANNOT_STAR);
			} else {
				$.core.Browser.answerCallback(CONFIRM_STAR, starCall);
			}

			function starCall() {
				var params = {
					[core_flower.def_mid]: core_flower.mid,
					star: star,
					srl: core_flower.srl,
					act: 'procBoardStar'
				};
				$.core.Request.ajax("POST", requestBackendFile, params, 'completeUpdateStarCount', "json");
			}
		},
		vote: function (target) {
			if (core_flower.isLogged === false) {
				alert(CANNOT_VOTE);
			} else {
				$.core.Browser.answerCallback(CONFIRM_VOTE, voteCall);
			}

			function voteCall() {
				var params = {
					[core_flower.def_mid]: core_flower.mid,
					srl: target,
					act: 'procBoardVote'
				};
				$.core.Request.ajax("POST", requestBackendFile, params, 'complteYpdateVotedCount', "json");
			}
		},
		blame: function (target) {
			if (core_flower.isLogged === false) {
				alert(CANNOT_BLAMED);
			} else {
				$.core.Browser.answerCallback(CONFIRM_BLAMED, blameCall);
			}

			function blameCall() {
				var params = {
					[core_flower.def_mid]: core_flower.mid,
					srl: target,
					act: 'procBoardBlame'
				};
				$.core.Request.ajax("POST", requestBackendFile, params, 'complteUpdateBlamedCount', "json");
			}
		},
		lst_related: function (pos, tag, bd, srl) {
			var params = {
				[core_flower.def_mid]: core_flower.mid,
				pos: pos,
				tag: tag,
				srl: srl,
				act: 'procBoardRelatedList',
				target: 'Related'
			};
			$.core.Request.ajax("POST", requestBackendFile, params, 'complteLoadReleatedList');
		},
		autocomplete: function (self) {
			var params = {
				[core_flower.def_mid]: core_flower.mid,
				pos: 0,
				tag: $(self).val(),
				srl: 0,
				act: 'procBoardRelatedList',
				target: 'Autocomplete'
			};
			$.core.Request.ajax("POST", requestBackendFile, params, 'autocomplete');
		}
	};
})();

var disp = (function () {
	return {
		reply: function ($board, $serial, $target, $form, $srl) {
			if ($($form).find('#reply').is(':empty')) {
				$(tmp_comment).find('#reply').hide(200);
				
				$($form).find('#reply').html('');
				
				$($form).find('#reply').append(template.replyEmpty($board, $serial, $target, $form, $srl));
				tmp_comment = $form;
			} else {
				$($form).find('#reply').html(
					template.reply($board, $serial, $target, $form, $srl)
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
				
				$($form).find('#reply').append(template.replyEmptyModify($board, $serial, $target, $form, $srl));
				
				tmp_comment = $form;
			} else {
				$($form).find('#reply').html(template.replyModify($board, $serial, $target, $form, $srl));
				
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