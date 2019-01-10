//SNS-related functions
'use strict';

(function ($, core) {

	var A = core.SNS = {
		getLink: function (href) {
			if (secure_opt) {
				$.core.Request.isUrlExists(href, function (success) {
					if (success) {
						$.core.Popup.openCircle(href, 500);
					} else {
						throw Error('url is not exists (' + href + ')');
					}
				})
			} else {
				$.core.Popup.openCircle(href, 500);
			}
		},
		twitter: function (url, msg) {
			var href = 'http://twitter.com/home?status=' + encodeURIComponent(msg) + ' ' + encodeURIComponent(url);
			this.getLink(href);
		},
		yozm: function (url, title) {
			var href = "http://yozm.daum.net/api/popup/prePost?sourceid=54&link=" + encodeURIComponent(url) + "&prefix=" + encodeURIComponent(title) + "&parameter=";
			this.getLink(href);
		},
		pholar: function (url, title) {
			var href = 'http://www.pholar.co/spi/rephol?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title);
			this.getLink(href);
		},
		line: function (url, title) {
			var href = "http://line.me/R/msg/text/?" + encodeURIComponent(title) + " " + encodeURIComponent(url);
			this.getLink(href);
		},
		naver: function (url, title) {
			var href = 'http://share.naver.com/web/shareView.nhn?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title);
			this.getLink(href);
		},
		band: function (url, title) {
			var href = 'http://band.us/plugin/share?body=' + encodeURIComponent(title) + '  ' + encodeURIComponent(url) + '&route=' + encodeURIComponent(url);
			this.getLink(href);
		},
		pinterest: function (url, image, title) {
			var href = 'http://www.pinterest.com/pin/create/button/?url=' + encodeURIComponent(url) + '&media=' + image + '&description=' + encodeURIComponent(title);
			this.getLink(href);
		},
		naverBlog: function (url, title) {
			var href = 'http://blog.naver.com/openapi/share?url=' + encodeURIComponent(url) + "&title=" + encodeURIComponent(title);
			this.getLink(href);
		},
		kakaoStory: function (url) {
			var href = 'https://story.kakao.com/s/share?url=' + encodeURIComponent(url);
			this.getLink(href);
		},
		googlePlus: function (url) {
			var href = 'https://plus.google.com/share?url=' + encodeURIComponent(url);
			this.getLink(href);
		},
		facebook: function (url, msg) {
			var href = 'http://www.facebook.com/sharer.php?u=' + url + '&t=' + encodeURIComponent(msg);
			this.getLink(href);
		}
	};
})(jQuery, $.core);