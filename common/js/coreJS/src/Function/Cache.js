//Cache-related functions
'use strict';

(function ($, core) {

	var A = core.Cache = {
		isSupport: function () {
			if ('caches' in _cWin) {
				return true;
			}
			return false;
		},
		open: function (key, val, callback) {
			if (this.isSupport()) {
				caches.open(key).then(function (cache) {
					cache.match(val).then(function (matchedResponse) {
						if ($.core.Validate.isFunc(callback)) {
							callback(matchedResponse);
						}
					});
				});
			}
		},
		del: function (key, callback) {
			if (this.isSupport()) {
				caches.delete(key).then(function () {
					if ($.core.Validate.isFunc(callback)) {
						callback();
					}
					return true;
				});
				return false;
			}
		},
		add: function (key, value, request) {
			if (this.isSupport()) {
				if (request) {
					caches.open(key).then(function (cache) {
						cache.add(new Request(value, request));
					});
				} else {
					caches.open(key).then(function (cache) {
						cache.add(value);
					});
				}
			}
		}
	};
	
})(jQuery, $.core);