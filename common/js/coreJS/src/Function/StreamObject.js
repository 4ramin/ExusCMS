//StreamObject-related functions
(function ($, core) {

	var A = core.StreamObject = {
		//var streamobject = new core.StreamObject.Stream();
		Stream: function (str) {
			var pos = 0;
			this.read = function (len) {
				var result = str.substr(pos, len);
				pos += len;
				
				return result;
			}
			this.readBigEndianInt32 = function () {
				var result = ((str.charCodeAt(pos) << 24) + (str.charCodeAt(pos + 1) << 16) + (str.charCodeAt(pos + 2) << 8) + str.charCodeAt(pos + 3));
				pos += 4;
				
				return result;
			}
			
			this.readBigEndianInt16 = function () {
				var result = ((str.charCodeAt(pos) << 8) + str.charCodeAt(pos + 1));
				pos += 2;
				
				return result;
			}
			
			this.readInt8 = function (signed) {
				var result = str.charCodeAt(pos);
				if (signed && result > 127) {
					result -= 256;
				}
				
				pos += 1;
				
				return result;
			}
			
			this.eof = function () {
				return pos >= str.length;
			}
		}
	};
})(jQuery, $.core);