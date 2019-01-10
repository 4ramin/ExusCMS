//File-related functions
'use strict';

(function ($, core) {

	var A = core.File = {
		hasFileUpload: function () {
			return (window.File && window.FileList && window.FileReader)
		},
		hasBlob: function () {
			if (_cWin.Blob) {
				return true;
			}
			
			try {
				return Boolean(new Blob());
			} catch (e) {
				return false;
			}
		},
		getBytes: function (format) {
			var bytes = 0;
			if (format.indexOf('TB') != -1) {
				bytes = parseFloat(format) * (1024 << 30);
			} else if (format.indexOf('GB') != -1) {
				bytes = parseFloat(format) * (1024 << 20);
			} else if (format.indexOf('MB') != -1) {
				bytes = parseFloat(format) * (1024 << 10);
			} else if (format.indexOf('KB') != -1) {
				bytes = parseFloat(format) * 1024;
			} else if (format.indexOf('bytes') != -1) {
				bytes = parseFloat(format);
			} else if (format.indexOf('byte') != -1) {
				bytes = parseFloat(format);
			}
			
			return bytes;
		},
		getSize: function (size) {
			size = size / (1024 << 30);
			if (size >= 1) {
				return getFloat(size, 1) + "TB";
			}
			
			size = size / (1024 << 20);
			if (size >= 1) {
				return getFloat(size, 1) + "GB";
			}
			
			size = size / (1024 << 10); //size = size / (-((-1024)>>>(1024))<<10);
			if (size >= 1) {
				return getFloat(size, 1) + "MB";
			}
			
			size = size / 1024; //size = size / ((-((-10)>>>(10))<<10));
			if (size >= 1) {
				return getFloat(size, 1) + "bytes";
			}
			
			if (size) {
				return size + "byte";
			} else {
				return "0byte";
			}
		},
		getBlob: function () {
			return _cWin.MozBlobBuilder || _cWin.WebKitBlobBuilder || _cWin.BlobBuilder || _cWin.MSBlobBuilder;
		},
		get: function () {
			return _cWin.FileReader;
		},
		getIntArr: function ($signed, $bit, $array) {
			if ($signed == 'uint') {
				switch ($bit) {
				case "8":
					return new Uint8Array($array);
				case "16":
					return new Uint16Array($array);
				case "32":
					return new Uint32Array($array);
				}
			} else if ($signed == 'int') {
				switch ($bit) {
				case "8":
					return new int8Array($array);
				case "16":
					return new int16Array($array);
				case "32":
					return new int32Array($array);
				}
			} else if ($signed == 'float') {
				switch ($bit) {
				case "32":
					return new Float32Array($array);
				case "64":
					return new Float64Array($array);
				}
			}
		},
		readArrBuffer: function (file) {
			var fr = this.get();
			fr.readAsArrayBuffer(file);
		},
		isSupport: function () {
			if (this.get()) {
				return true;
			}
			
			return false;
		}
	};
})(jQuery, $.core);