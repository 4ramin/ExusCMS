//Clipboard-related functions
'use strict';

(function ($, core) {

	var A = core.Clipboard = {
		isExist: function () {
			return _cWin.clipboardData;
		},
		Copy: function (text) {
			if (window.clipboardData && window.clipboardData.setData) {
				  return clipboardData.setData("Text", text); 
			} else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
				var textarea = document.createElement("textarea");
				textarea.textContent = text;
				textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
				document.body.appendChild(textarea);
				textarea.select();
				try {
					return document.execCommand("copy");  // Security exception may be thrown by some browsers.
				} catch (ex) {
					console.warn("Copy to clipboard failed.", ex);
					return false;
				} finally {
					document.body.removeChild(textarea);
				}
			}
		},
		Set: function (prompt_msg, data) {
			if ((_cWin.attachEvent || _cWin.addEventListener) && navigator.userAgent.toLowerCase().indexOf('msie') !== -1) {
				_cWin.clipboardData.setData(data);
				$.core.Base.resetWinCache();
			} else {
				pmt = prompt(prompt_msg, data);
			}
		},
		Get: function (type) {
			if ($.core.Validate.isUndefined(type)) type = 'text';
			if (this.isExist()) {
				return clipboardData.getData(type);
			}
		}
	};
	
})(jQuery, $.core);