//Clipboard-related functions
'use strict';

(function ($, core) {

	var A = core.Clipboard = {
		isExist: function () {
			return _cWin.clipboardData;
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