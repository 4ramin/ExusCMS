//JSON-related functions
'use strict';

(function ($, core) {

	var A = core.JSON = {
		isSupport: function () {
			if ("JSON" in window) {
				return true;
			}
			
			return false;
		},
		autoDecode: function (str) {
			if (str === null) {
				return 'null';
			}
		
			if (this.isSupport()) {
				if (this.isJSON(str)) {
					return this.decode(str);
				} else {
					var _eval = this.SecureEvalJSON(str);
					if (!_eval) {
						return str;
					}
					
					return _eval;
				}
			} else {
				return str;
			}
		},
		SecureEvalJSON: function (str) {
			if (str) {
				var _secure =
					str.replace( /\\["\\\/bfnrtu]/g, '@' )
					.replace( /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
					.replace( /(?:^|:|,)(?:\s*\[)+/g, '');
					
				if (/^[\],:{}\s]*$/.test(_secure)) {
					return eval('(' + str + ')');
				} else {
					return false;
				}
			} else {
				return false;
			}
		},
		strToJSON: function (str) {
			return JSON.parse(eval(str)[0]);
		},
		ConverToStr: function (obj) {
			var result = "";
			
			if (typeof JSON != "undefined") {
				result = self.stringify(obj);
			} else {
				var arr = [];
				for (var i in obj) {
					arr.push("'" + i + "':'" + obj[i] + "'");
				}
				result = "{" + arr.join(",") + "}";
			}
			
			return result;
		},
		isJSON: function (m) {
			if ($.core.Validate.isObject(m)) {
				try {
					m = JSON.stringify(m);
				} catch (err) {
					return false;
				}
			}
			
			if ($.core.Validate.isStr(m)) {
				try {
					m = JSON.parse(m);
				} catch (err) {
					return false;
				}
			}
			
			if (!$.core.Validate.isObject(m)) {
				return false;
			}
			
			return true;
		},
		stringify: function (object) {
			var stringify = JSON.stringify(object);
			
			if (/^[\{\[]/.test(stringify)) {
				return stringify;
			}
			
			return null;
		},
		decode: function (object) {
			if (this.isJSON(object)) {
				return jQuery.parseJSON(JSON.stringify(object));
			} else {
				return object;
			}
		},
		parse: function (object) {
			if (this.isSupport()) {
				if (this.isJSON(object)) {
					return JSON.parse(object);
				} else {
					return object;
				}
			}
		}
	};
})(jQuery, $.core);