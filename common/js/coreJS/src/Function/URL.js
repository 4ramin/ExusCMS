//URL-related functions
'use strict';

(function ($, core) {

	var A = core.URL = {
		createBlob: function (arrayBuffer) {
			var url = self.getNative;
			var blob = new Blob([arrayBuffer]);
			
			return url.createObjectURL(blob);
		},
		getJoinChar: function (url) {
			return /\?/.test(url) ? "&" : "?";
		},
		createObject: function () {
			return (_cWin.createObjectURL && _cWin) || (_cWin && _cWin.webkitURL) || (_cWin.URL && _cWin.URL.revokeObjectURL);
		},
		isCOMDomain: function () {
			return location.hostname.match(/\.com$/);
		},
		goRoot: function () {
			_cWin.location.href = "/";
		},
		getUrlVars: function (url) {
			var vars = [], hash;
			var hashes = url.slice(url.indexOf('?') + 1).split('&');
			
			if (hashes.indexOf(url) < 0) {
				for (var i = 0; i < hashes.length; i++) {
					hash = hashes[i].split('=');
					vars.push(hash[0]);
					vars[hash[0]] = hash[1];
				}
			}
			
			return vars;
		},
		getUrl: function (isHashRemove) {
			$.core.Base.resetWinCache();
			var url = _cWin.location.href;
			var target = '';
			
			if (isHashRemove) {
				var hash = location.hash;
				target = url.replace(hash, '');
			} else {
				target = url;
			}
			
			return target;
		},
		getNative: function () {
			return _cWin.URL || _cWin.webkitURL || _cWin.mozURL || _cWin.msURL;
		},
		getObject: function (target) {
			var url = self.getNative;
			
			if (!url.createObjectURL) {
				url.createObjectURL = function (obj) {
					return obj;
				}
			}
			
			return url.createObjectURL(target);
		},
		revokeObject: function (target) {
			var url = self.getNative;
			
			return url.revokeObjectURL(target);
		},
		generateUrl: function () { //getPureUrl.apply('index.php',['a','b']);
			var $url = this;
			var i = 0;
			
			if (arguments.length > 0) {
				for (var i = 0; i < arguments.length; i++) {
					$url += $url != this ? '&' : '?';
					$url += arguments[i];
					$url += '=';
					$url += arguments[i + 1];
					i++;
				}
			}
			
			return $url;
		},
		parseQuerystring: function (string) {
			var params = {};
			var string = string.split('&');
			var length = string.length;
			
			for (i = 0; i < length; i++) {
				split = string[i].split('=');
				params[split[0]] = decodeURIComponent(split[1]);
			}
			
			return params;
		},
		changeSrcDirectory: function (url, dir) {
			return url.replace(/src\=".*\/(.*.jpg)/g, 'src\="' + dir + '$1');
		},
		getQueryString: function (key) {
			var regex = new RegExp("[\?&]" + key.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]") + "=([^&#]*)");
			var url = regex.exec(url());
			
			if (url == null) {
				return false;
			} else {
				return url[1];
			}
		},
		getParam: function (name, url) {
			try {
				var url = url || this.getUrl();
				var regex = new RegExp('[\=&?]' + name + '=([^&#]*)').exec(url);
				if (regex) {
					if (regex.length > 0) {
						return regex[1];
					} else {
						return regex;
					}
				}
			} finally {
				url = null; 
			} 
		},
		setQuery: function (paramName, paramValue, url) {
			var url = url || this.getUrl();
			var chr = $.core.URL.getJoinChar(url);
			var regex = new RegExp('[\=&?]' + paramName + '=([^&#]*)').exec(url);
			chr == '?' ? '' : '&';
			
			if (regex) {
				return this.setParam(paramName, paramValue, url);
			} else {
				return url + chr + paramName + '=' + paramValue;
			}
		},
		setParam: function (paramName, paramValue, userUrl) {
			try {
				var url = this.getUrl();
				var target = userUrl || url;
				
				var regex = new RegExp("([\?&]" + paramName + "\=)[^&#]*");
				if (paramValue) {
					var target = target.replace(regex, "$1" + paramValue);
				} else {
					var target = target.replace(regex, "");
				}
				
				return target;
			} finally {
				url = null; 
				target = null; 
				regex = null; 
			} 
		},
		getParams: function (url) {
			try {
				var url = url || this.getUrl();
				return url.match(regURLParmas);
			} finally {
				url = null; 
			}
		}
	};
})(jQuery, $.core);