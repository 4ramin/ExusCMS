//Validate-related functions
'use strict';

(function ($, core) {

	var A = core.Validate = {
		getType: function (str) {
			if (this.isUndefined(str)) {
				return 'undefined';
			} else if (this.isWindow(str)) {
				return 'window';
			} else if (this.isDate(str)) {
				return 'date';
			} else if (this.isNumeric(str)) {
				if (this.isRRN(str)) {
					return 'rrn';
				} else {
					return 'number';
				}
			} else if (this.isBool(str)) {
				return 'bool';
			} else if (this.isArray(str)) {
				return 'array';
			} else if (this.isRegex(str)) {
				return 'regex';
			} else if (this.isFunc(str)) {
				return 'function';
			} else if (this.isObject(str)) {
				return 'object';
			} else if (this.isStr(str)) {
				if (this.isJapan(str)) {
					return 'japan';
				} else if (this.isHiragana(str)) {
					return 'hiragana';
				} else if (this.isKatakana(str)) {
					return 'katakana';
				} else if (this.isKor(str)) {
					return 'kor';
				} else if (this.isJSON(str)) {
					return 'json';
				} else if (this.isTime(str)) {
					return 'time';
				} else if (this.isURL(str)) {
					return 'url';
				} else if (this.isWeekday(str)) {
					return 'weekday';
				} else if (this.isEmail(str)) {
					return 'email';
				} else {
					return 'string';
				}
			}
		},
		isJapan: function (str) {
			return str.match(regJapan) ? true : false;
		},
		isHiragana: function (str) {
			return str.match(regHiragana) ? true : false;
		},
		isKatakana: function (str) {
			return str.match(regKatakana) ? true : false;
		},
		isKor: function (str) {
			return str.match(regOnlyKor) ? true : false;
		},
		isURL: function (str) {
			return str.match(regUrl) ? true : false;
		},
		regWhiteSpace: function (str) {
			return str.match(regWhiteSpace) ? true : false;
		},
		isEmail: function (str) {
			return str.match(regEmail) ? true : false;
		},
		isArrayBuffer: function (buff) {
			return toString.call(buff) === '[object ArrayBuffer]';
		},
		isRRN: function (str) {
			return str.match(regRRN) ? true : false;
		},
		isJSON: function (str) {
			return $.core.JSON.isJSON(str);
		},
		isWeekday: function (str) {
			try {
				var tmp = str.split(",");
				var length = tmp.length;
				for (i = 0; i < length; i++) {
					if (tmp[i].length > 1) return false;
					if (isNaN(tmp[i]) == true) return false;
					if (tmp[i] > 7 || tmp[i] < 1) return false;
				}
				return str;
			} finally {
				tmp = null; 
				length = null; 
			}
		},
		getJosa: function (str, tail) {
			strTemp = str.substr(str.length - 1);
			return ((strTemp.charCodeAt(0) - 16) % 28 != 0) ? str + tail.substr(0, 1) : str + tail.substr(1, 1);
		},
		isWindow: function (elem) {
			return null != elem && elem == elem.window && toString.call(elem) === '[object Window]';
		},
		isEmptyObject: function (obj) {
			for (var c in obj) return !1;
			return !0
		},
		isPromiseLike: function (obj) {
			return obj && this.isFunc(obj.then);
		},
		isFormData: function (form) {
			return toString.call(form) === '[object FormData]';
		},
		isFile: function (file) {
			return toString.call(file) === '[object File]';
		},
		isBlob: function (blob) {
			return toString.call(blob) === '[object Blob]';
		},
		isBlobBuilder: function (blob) {
			return toString.call(blob) === '[object BlobBuilder]';
		},
		isNumeric: function (num) {
			return 0 <= num - parseFloat(num);
		},
		isUndefined: function (value) {
			return typeof value === 'undefined'; //val === void 0
		},
		isBool: function (value) {
			return typeof value === 'boolean';
		},
		isArray: function (value) {
			return typeof value === 'array' && value.constructor === Array && toString.call(value) === '[object Array]';
		},
		isNull: function (value) {
			return typeof value === 'null' || value == undefined || value == null || value == 'null' || value.toString().replace(/ /g,"") == "";
		},
		isDate: function (value) {
			return toString.call(value) === '[object Date]' && typeof value === 'date';
		},
		isRegex: function (value) {
			return typeof value === 'regexp' && toString.call(value) === '[object RegExp]';
		},
		isStr: function (value, mode) {
			if (mode == 'object') {
				return this.isStr(value) || "[object String]" === Object.prototype.toString.call(value);
			} else {
				return typeof value === 'string' && String(value) === value;
			}
		},
		isFunc: function (value) {
			return typeof value === 'function' && {}.toString.call(value) === '[object Function]';
		},
		isObject: function (value, mode) {
			if (mode == 'object') {
				return this.isObject(value) && "[object Object]" === Object.prototype.toString.call(value);
			} else {
				return typeof value === 'object';
			}
		},
		isNum: function (value, mode) {
			if (mode == 'object') {
				return this.isNum(value) || "[object Number]" === Object.prototype.toString.call(value);
			} else {
				return typeof value === 'number' && isFinite(value);
			}
		},
		isTime: function (str) {
			if (str == null || str == "") {
				return false;
			} else if (str.length < 4) {
				return false;
			}
			
			var hour = str.substring(0, 2),
				min = str.substring(2);
				
			if (hour > 23) {
				return false;
			} else if (min > 59) {
				return false;
			}
			
			return str;
		},
		isBlank: function (str) {
			for (var i = 0; i < str.length; i++) {
				var ch = str.charAt(i);
				if ((ch != ' ') && (ch != '\n') && (ch != '\et')) {
					return false;
				}
			}
			
			return true;
		}
	};
})(jQuery, $.core);