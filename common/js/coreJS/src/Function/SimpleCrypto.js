//SimpleCrypto-related functions
'use strict';

(function ($, core) {

	var A = core.SimpleCrypto = {
		baseConvert: function (number, frombase, tobase) {
			return parseInt(number + '', frombase | 0).toString(tobase | 0);
		},
		numToHex: function (i) {
			 //integer => -2147483648 / 2147483647
			if (2147483648 > i) {
				return null;
			}
			
			var hex = (-i >>> 0);
			hex = this.baseConvert(ac, 10, 16);
			
			return hex;
		},
		hexToNum: function (i) {
			var num = baseConvert(i, 16, 10);
			
			return -(num << 0);
		},
		asciiEncode: function (str, margin) {
			var slen = str.trim().length;
			var ctr = 1;
			var enc = '';
			
			do {
				enc = enc + String.fromCharCode(((str.trim().substr(ctr-1,1)).charCodeAt(0)) + margin);
				ctr = ctr + 1;
			} while (ctr <= slen); 
			
			return enc;
		},
		asciiDecode: function (str, margin) {
			var slen = str.trim().length;
			var ctr = 1;
			var enc = '';
			
			do {
				enc = enc + String.fromCharCode(((str.trim().substr(ctr-1,1)).charCodeAt(0)) - margin);
				ctr = ctr + 1;
			} while (ctr <= slen);
			
			return enc;
		}
	};
})(jQuery, $.core);