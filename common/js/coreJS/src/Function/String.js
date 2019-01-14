//String-related functions
'use strict';

(function ($, core) {

	var A = core.Str = {
		a2hex: function (str) {
			var arr = [];
			for (var i = 0, l = str.length; i < l; i ++) {
				var hex = Number(str.charCodeAt(i)).toString(16);
				arr.push(hex);
			}
			return arr.join('');
		},
		hex2a: function (hexx) {
			var hex = hexx.toString();
			var str = '';
			for (var i = 0; i < hex.length; i += 2) {
				str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
			}
			return str;
		},
		toArr: function (str) {
			var strlength = str.length;
			var arr = new Uint8Array(strlength);
			
			for (var i = 0; i < strlength; i++) {
				arr[i] = str.charCodeAt(i);
			}
            
			return arr;
		},
		//Determining if an integer is a power of 2
		determiningIntegerisPowOf2: function (v) {
			v = v >>> 0; //convert to unsigned int
			
			return ((v & (v-1)) === 0) ? true : false;
		},
		//Detect if two integers have opposite signs
		hasOppositeSigns: function (x, y) {
			return ((x ^ y) < 0) ? true : false;
		},
		isBlankExists: function (str) {
			if (str.indexOf(" ") != -1) {
				return true;
			}
			
			return false;
		},
		getNotationArr: function (str) {
			return str.match(/[\d\.]+|^[\s]* +|[*\+|\-|(|)|^]/g);
		},
		isIsothermal: function (str) {
			if (3 & str == 3) {
				return true;
			}
			
			return false;
		},
		isEvenNumber: function (str) {
			if ((1 & str) == 0 && ((1 & str) % str) == 0) {
				return true;
			}
			
			return false;
		},
		isOddNumber: function (str) {
			if ((1 & str) == 1 && ((1 & str) % str) == 0) {
				return true;
			}
			
			return false;
		},
		/**
		 * 4n, 4n+1
		 **/
		is4NP1: function (str) {
			if ((3 & str) == 1 && ((1 & str)%str) == 0) {
				return true;
			}
			
			return false;
		},
		/**
		 * x, (x+2, x+6) => repeat
		 **/
		is2P6Px: function (str, x) {
			if (5 & str == x) {
				return true;
			}
			
			return false;
		},
		/**
		 * 32n
		 **/
		is32n: function (str) {
			if (2 >> n == 2) {
				return true;
			}
			
			return false;
		},
		/**
		 * x, (x+1, x+2, x+3, x+8) => repeat
		 **/
		is1P2P3P8P: function (str, x) {
			if (4 & str == x) {
				return true;
			}
			
			return false;
		},
		/**
		 * 8n+x
		 **/
		is8NPx: function (str, x) {
			if (7 & str == x) {
				return true;
			}
			
			return false;
		},
		Left: function (str, n) {
			if (n <= 0) {
				return "";
			} else if (n > String(str).length) {
				return str;
			} else {
				return String(str).substring(0,n);
			}
		},
		getInt: function (Number) {
			if (!Number || Number == "null") {
				return 0;
			} else if (isNaN(parseInt(Number))) {
				return 0;
			}

			return parseInt(Number);
		},
		notBin: function (a) {
			var result = '';
			var i;
			for (i = a.length -1; i > -1; i--) {
				result = (a.substr(i, 1)^1) + result;
			}
			
			return result;
		},
		isKorCharFortisPos: function (chs) {
			if (697015%(chs*2+3)===0) {
				return true;
			}
			
			return false;
		},
		dfsSimple: function (arr) {
			var dfsTemp = [];
			var dfsData = [];
			var vertical = dta[0].length;
			var horizon = dta.length;
			
			for (i = 0;i < vertical; i++) {
				dfsTemp	= [];
				for (z=0; z < horizon; z++) {
					var data = dta[z][i];
					if (!data) break;
					
					dfsTemp.push(data);
				}
				
				dfsData.push(dfsTemp);
			}
			
			return dfsData;
		},
		padBin: function (a, b) {
			if (a.length > b.length) {
				var pad = "0".repeat(a.length - b.length);
				b = pad + b;
			} else if (b.length > a.length) {
				var pad = "0".repeat(b.length - a.length);
				a = pad + a;
			}
			
			return [a, b];
		},
		leftMatchBin: function (a, b) {
			if (a.length > b.length) {
				var pad = "0".repeat(a.length - b.length);
				b = b + pad;
			} else if (b.length > a.length) {
				var pad = "0".repeat(b.length - a.length);
				a = a + pad;
			}
			
			return a;
		},
		xorBin: function (a, b) {
			var bTmp;
			var result = '';
			var i;
			
			b = b.split("").reverse().join(""); //reverse
			for (i = a.length -1; i > -1; i--) {
				var bPrefix = b.substr((((a.length -1) - b.length) - i) + b.length, 1);
				bTmp = bPrefix ? bPrefix + bTmp : 0 + bTmp;
			}
			
			for (i = a.length -1; i > -1; i--) {
				if (a.substr(i,1) == bTmp.substr(i,1)) {
					result = 0 + result;
				} else {
					result = 1 + result;
				}
			}
			
			return result;
		},
		orBin: function (a, b) {
			var bTmp;
			var result = '';
			var i;
			
			b = b.split("").reverse().join(""); //reverse
			for (i = a.length -1; i > -1; i--) {
				var bPrefix = b.substr((((a.length -1) - b.length) - i) + b.length, 1);
				bTmp = bPrefix ? bPrefix + bTmp : 0 + bTmp;
			}
			
			for (i = a.length -1; i > -1; i--) {
				if (a.substr(i,1) == 1 || bTmp.substr(i,1) == 1) {
					result = 1 + result;
				} else {
					result = 0 + result;
				}
				
			}
			
			return result;
		},
		andBin: function (a, b) {
			var bTmp;
			var result = '';
			var i;
			
			b = b.split("").reverse().join(""); //reverse
			for (i = a.length -1; i > -1; i--) {
				var bPrefix = b.substr((((a.length -1) - b.length) - i) + b.length, 1);
				bTmp = bPrefix ? bPrefix + bTmp : 0 + bTmp;
			}
			
			for (i = a.length -1; i > -1; i--) {
				if (a.substr(i,1) == bTmp.substr(i,1) && a.substr(i,1) == '1') {
					result = 1 + result;
				} else {
					result = 0 + result;
				}
				
			}
			
			return result;
		},
		addBin: function (a, b) {
			var bTmp;
			var result = "";
			var i;
			
			b = b.split("").reverse().join(""); //reverse
			for (i = a.length -1; i > -1; i--) {
				var bPrefix = b.substr((((a.length -1) - b.length) - i) + b.length, 1);
				bTmp = bPrefix ? bPrefix + bTmp : 0 + bTmp;
			}
			
			var carry = 0;
			for (i = a.length -1; i > -1; i--) {
				var prefix = bTmp.substr(i,1) ? (parseInt(a.substr(i,1)) + parseInt(bTmp.substr(i,1))) + parseInt(carry) : parseInt(a.substr(i,1)) + parseInt(carry);
				carry = prefix > 1 ? 1 : 0;
				result = prefix > 1 ? prefix == 2 ? 0 + result : 1 + result : prefix + result;
				if (i==0 && prefix > 1) result = 1 + result;
			}
			
			return result;
		},
		isBase64: function (str) {
			if (str.search(/^[a-zA-Z0-9=+\/]+$/) === -1) {
				return false;
			}
			
			return true;
			
			
			/*var hasPad = str.indexOf("=");
			var _str = str.replace(/\=/g, "");
			
			if (hasPad && hasPad < _str.length !== -1) {
				return false;
			}*/
		},
		getBase64Bytes: function (str) {
			var d = 0;
			var g = [];
			var str = str.replace(/\=/g, "");
			var e;
			
			//Split Word by 4 Length
			var length = str.length;
			for (e = 0; e < length; e += 4) {
				for (l = str.substr(e, 4), h = n = 0; h < l.length; ++h) {
					f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(l[h]);
					n |= f << 18 - 6 * h;
				}
				
				for (h = 0; h < l.length - 1; ++h) {
					for (m = d + [0], f = m >>> 2; g.length <= f;) {
						g.push(0);
					}
					
					g[f] |= (n >>> 16 - 8 * h & 255) << 8 * (3 - m % 4);
					++d;
				}
			}
			
			return g;
		},
		InStr: function (start, string, chars) {
			if (!start) {
				start = 0;
			}
			
			string = string.substr(start);
			
			var i;
			var length = string.length;
			
			for (i=0; i < length; i++) {
				if (chars == string.substr(i-1,chars.length)) {
					return i + start;
				}
			}
			
			return -1;
		},
		midChar: function ($string, $start, $end) {
			if (!$start) {
				$start = 0;
			} else {
				$start = $start -1;
			}
			
			if (typeof $string === 'string' && $start && $end) {
				return $string.substr($start, parseInt($end));
			} else if (typeof $string === 'string' && $start) {
				return $string.substr($start);
			}
		},
		reverse: function (str) {
			return str.match(/(.)/g).reverse().join('');
		},
		replaceToNewLine: function (str) {
			return str.replace(/\\n/g,'\n');
		},
		removeComma: function (num) {
			num = new String(num);
			return num.replace(/,/gi,"");
		},
		evalReplaceAll: function (str1, str2) {
			var tmp = eval("/\\" + str1 + "/g");
			return this.replace(tmp, str2);
		},
		getUniqueNum: function () {
			return function () {
				return ++uniquenum;
			};
		},
		brToLine: function (str) {
			return str.replace(/<br([^>]*)>/ig, "\n");
		},
		lineToBr: function (str) {
			return str.replace(/(\r\n|\n|\r)/g, "<br />");
		},
		stripTabs: function (str) {
			return str.replace(/(<([^>]+)>)/ig, '');
		},
		removeWithoutNumberic: function (str) {
			return str.replace(/[^0-9]/g, '');
		},
		revParams: function (Fn) {
			return function (value, key) {
				Fn(key, value);
			};
		},
		cutStr: function (str, limit) {
			str.length > limit && (str = str.substring(0, limit - 3) + "...");
			return str;
		},
		getNumStat: function (str1, str2) {
			return str1 < str2 ? -1 : str1 > str2 ? 1 : 0;
		},
		removeTagHash: function (str) {
			//%20 : asciiEncodeUTF8('space')
			return str.replace(/(%20|\s)*#(.*)/, "");
		},
		getTagHash: function (str) {
			return str.replace(/^#/, "");
		},
		getUniqueRand: function (min, max, length) {
			arr = [];
			result = [];
			
			for (i = min; i <= max; i++) {
				arr.push(i);
			}
			
			for (i = 0; i < length; i++) {
				randNumber = this.randNum(arr.length);
				result.push(arr[randNumber]);
				arr.splice(randNumber, 1);
			}
			
			return result;
		 },
		randNum: function (max) {
			return Math.floor(Math.random() * max);
		},
		randomStr: function (length) {
			var charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			var result = ''
			
			for (var i = 0; i < length; i++) {
				var pos = Math.floor(Math.random() * charset.length)
				result += charset.substring(pos, pos + 1)
			}
			
			return result;
		},
		uin2hex: function (str) {
			var maxLength = 16;
			str = parseInt(str);
			var hex = str.toString(16);
			var len = hex.length;
			
			for (var i = len; i < maxLength; i++) {
				hex = "0" + hex
			}
			
			var arr = [];
			for (var j = 0; j < maxLength; j += 2) {
				arr.push("\\x" + hex.substr(j, 2))
			}
			
			var result = arr.join("");
			eval('result="' + result + '"');
			
			return result;
		},
		bin2Str: function (a) {
			var arr = [];
			
			for (var i = 0, len = a.length; i < len; i++) {
				var temp = a.charCodeAt(i).toString(16);
				if (temp.length == 1) {
					temp = "0" + temp
				}
				arr.push(temp)
			}
			
			arr = "0x" + arr.join("");
			arr = parseInt(arr, 16);
			return arr;
		},
		recovery: function (str) {
			return ('' + str).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;/g, "'"); //&#39;
		},
		escape: function (str) {
			return ('' + str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
		},
		s_escape: function (str) {
			return ('' + str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/([:@=])/g, '$1​').replace(/([\\`\*_\{\}\[\]\(\)#\+\-\.!\~\|])/g, '\\$1').replace(/\//g, '&#x2F;');
		},
		cut: function (str, len) {
			var l = 0;
			for (var i = 0; i < str.length; i++) {
				l += (str.charCodeAt(i) > 128) ? 2 : 1;
				if (l > len) return str.substring(0, i);
			}
			
			return str;
		},
		getBytes: function (str) {
			var l = 0;
			for (var i = 0; i < str.length; i++) l += (str.charCodeAt(i) > 128) ? 2 : 1;
			
			return l;
		},
		getUTFBytes: function (str) {
			var i = 0;
			var length = str.length;
			for (var i = 0; i < length; i++) {
				chars = str.charCodeAt(i);
				if (chars <= numberCValue(127)) { //ASCII
					/*
						0xxxxxxx
					*/
					i += 1;
				} else if (chars <= numberCValue(2047)) { //First Bytes=>110/1110 And Except 10 
					/*
						110xxxxx 10xxxxxx
						1110xxxx 10xxxxxx 10xxxxxx
					*/
					i += 2;
				} else if (chars <= numberCValue(65535)) { //UTF-16 surrogate pairs
					/*
						11110zzz 10zzxxxx 10xxxxxx 10xxxxxx
					*/
					i += 3;
				} else {
					i += 4;
				}
			}
			return i;
		},
		lcase: function (str) {
			return str.toLowerCase();
		},
		ucase: function (str) { 
			return str.toUpperCase();
		},
		length: function (str) {
			return str.length;
		},
		ltrim: function (str) {
			return str.replace(/^\s+/,"");
		},
		trim: function (str) {
			return str.replace(/(^\s*)|(\s*$)/g, "");
		},
		rtrim: function (str) {
			return str.replace(/\s+$/,"");
		},
		replaceAll: function (str, orgStr, repStr) {
			return str.split(orgStr).join(repStr);
		},
		stripSpace: function (str) {
			return str.replace(/ /g, "");
		},
		strCut: function (str, len) {
			var s = 0;
			var length = str.length;
			
			for (var i = 0; i < length; i++) {
				s += (str.charCodeAt(i) > 128) ? 2 : 1;
				if (s > len) {
					return str.substring(0, i);
				}
			}
			
			return str;
		},
		lineCount: function (element) {
			element.text().split("\n").length;
		},
		ucFirst: function (str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		},
		removeSpace: function (str) {
			var proc = new RegExp("\\s", "g");
			
			return str.replace(proc, "");
		},
		strPad: function (str, nlen, padstr) {
			var len = str.length;
			
			for (i = 0; i < nlen - len; i++) {
				str = padstr + str;
			}
			
			return str;
		},
		upper: function (str) {
			return str.toUpperCase();
		},
		lower: function (str) {
			return str.toLowerCase();
		}
	};
})(jQuery, $.core);