'use strict';

(function ($, core) {

	var A = core.Imoticon = {
		get: function () {
			var uI = (unicodeImoticon);
			return uI;
		},
		getItem: function (name) {
			var uI = (unicodeImoticon);
			
			if (typeof uI[name] === undefined) {
				return null;
			}
			
			return uI[name];
		}
	};
})(jQuery, $.core);