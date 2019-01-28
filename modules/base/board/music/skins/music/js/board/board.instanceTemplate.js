var template = (function () {
	return {
		replyEmpty: function ($board, $serial, $target, $form, $srl) {
			var HTML = '<div class="pcomment_write_form comment_write">' + 
						'<form id="cw_' + $target + '" method="post" enctype="multipart/form-data" action="./">' + 
						'<input type="hidden" name="' + core_flower.def_mid + '" value="comment" />' + 
						'<input type="hidden" name="module" value="' + $board + '" />' + 
						'<input type="hidden" name="comment_srl" value="' + $serial + '" />' + 
						'<input type="hidden" name="parent_srl" value="' + $target + '" />' + 
						'<input type="hidden" name="act" value="insertComment" />' + 
						'<input type="hidden" name="srl" value="' + $srl + '" />' + 
						'<textarea id="content" name="content" class="postContent" placeholder=""></textarea>' + 
						'<input type="submit" onclick="proc.parent_comment(this, ' + $target + ')" class="bd_btn postComment" name="postComment" value="댓글">' + 
						'</div>';
			
			return HTML;
		},
		reply: function ($board, $serial, $target, $form, $srl) {
			var HTML = '<div class="pcomment_write_form comment_write">' + 
						'<form id="cw_' + $target + '" method="post" enctype="multipart/form-data" action="./">' + 
						'<input type="hidden" name="' + core_flower.def_mid + '" value="comment" />' + 
						'<input type="hidden" name="module" value="' + $board + '" />' + 
						'<input type="hidden" name="comment_srl" value="' + $serial + '" />' + 
						'<input type="hidden" name="parent_srl" value="' + $target + '" />' + 
						'<input type="hidden" name="act" value="insertComment" />' + 
						'<input type="hidden" name="srl" value="' + $srl + '" />' + 
						'<textarea id="content" name="content" class="postContent" placeholder=""></textarea>' + 
						'<input type="submit" onclick="proc.parent_comment(this, ' + $target + ')" class="bd_btn postComment" name="postComment" value="댓글">' + 
						'</div>';
						
			return HTML;
		},
		replyEmptyModify: function ($board, $serial, $target, $form, $srl) {
			var HTML = '<div class="pcomment_write_form comment_write">' + 
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
						'</div>';
			return HTML;
		},
		replyModify: function ($board, $serial, $target, $form, $srl) {
			var HTML = '<div class="pcomment_write_form comment_write">' + 
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
						'</div>';
			return HTML;
		}
	}
})();