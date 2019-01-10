//MediaSource-related functions
'use strict';

(function ($, core) {

	var A = core.MediaSource = {
		isSupport: function () {
			return 'MediaSource' in window ? true : false;
		},
		get: function () {
			return new _cWin.MediaSource() || _cWin.webkitMediaSource();
		},
		genKeyRequest: function (target) {
			if (target.webkitGenerateKeyRequest && target.generateKeyRequest) {
				return true;
			}
			
			return false;
		},
		has: function () {
			if (_cWin.MediaSource || _cWin.webkitMediaSource) {
				return true;
			}
			
			var video = $.core.Element.create('video');
			
			if (video.webkitSourceAddId && video.sourceAddId) {
				return true;
			}
			
			return false;
		},
		appendEndStream: function (video) {
			video.webkitSourceEndOfStream(HTMLMediaElement.EOS_NO_ERROR);
		},
		append: function (video, bytes) {
			video.webkitSourceAppend(bytes);
		},
		getUrl: function (video) {
			return video.webkitMediaSourceURL;
		},
		addSrc: function (elem) {
			elem.addSourceBuffer('video/mp4; codecs="avc1.4d401e"');
		}
	};
})(jQuery, $.core);