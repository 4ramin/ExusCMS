//SimpleCrypto-related functions
'use strict';

(function ($, core) {

	var A = core.SimpleCrypto = {
		baseConvert: function (number, frombase, tobase) {
			return parseInt(number + '', frombase | 0).toString(tobase | 0);
		},
		getSecureLink: function (text, milliseconds) {
			var timestamp = this.getTimeStamp(milliseconds);
			var md5String = md5(text);
			var md5ByteArray = $.core.Str.hex2a(md5String);
			var base64String = btoa(md5ByteArray);
			
			return "?s=" + base64String + "&t=" + timestamp;
		},
		AESCBCDecrypt: function (iv, key, plainText) {
			var plaintextArray = CryptoJS.AES.decrypt(
				{ciphertext: CryptoJS.enc.Base64.parse(plainText)}, 
				CryptoJS.enc.Hex.parse(key),
				{iv: CryptoJS.enc.Hex.parse(iv)}
			);
			
			return plaintextArray;
		},
		AESDecrypt: function (key, plainText) {
			plainText = plainText.replace(/\r?\n/g, "");
			var decrypt = CryptoJS.AES.decrypt(plainText, key).toString(CryptoJS.enc.Utf8);
			
			return decrypt;
		},
		getTimeStamp: function (milliseconds) {
			var date = $.core.Time.getTime() + milliseconds;
			date = $.core.Time.getDateObject(time * 1000);
			var timestamp = parseInt($.core.Time.setMinutes(date, 0, 0, 0));
			
			return parseInt((timestamp / 1000) / 1000);
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