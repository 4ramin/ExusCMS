//ID3-related functions
'use strict';

(function ($, core) {

	var A = core.ID3 = {
		isHasHeader: function (data /* Uint8Array */, offset, type) {
			if (type === 'footer') {
				if (data[offset] === asciiHex['3'] && data[offset + 1] === asciiHex['D'] && data[offset + 2] === asciiHex['I']) {
					return true;
				}
			} else if (data[offset] === asciiHex['I'] && data[offset + 1] === asciiHex['D'] && data[offset + 2] === asciiHex['3']) {
				return true;
			}
			
			return false;
		},
		hasVersion: function (data, offset) {
			if (data[offset + 3] < asciiHex['ÿ'] && data[offset + 4] < asciiHex['ÿ']) {
				return true;
			}
			
			return false;
		},
		isInRange: function (data, offset) {
			if (data[offset + 6] < asciiHex['€'] && data[offset + 7] < asciiHex['€'] && data[offset + 8] < asciiHex['€'] && data[offset + 9] < asciiHex['€']) {
				return true;
			}
			
			return false;
		},
		isHeader: function (data, offset) {
			if (this.isHasHeader(data, offset) && this.hasVersion(data, offset) && this.isInRange(data, offset)) {
				return true;
			}
			
			return false;
		}, 
		skipID3v2Header: function (data, offset) {
			if (this.isInRange(data, offset-6)) {
				var size = 0;
				size = (data[offset] & asciiHex['']) << 21; // = * 2097152
				size |= (data[offset + 1] & asciiHex['']) << 14; // = * 16384
				size |= (data[offset + 2] & asciiHex['']) << 7; // = * 128
				size |= data[offset + 3] & asciiHex[''];
				return size;
			}
		}
	};
	
})(jQuery, $.core);