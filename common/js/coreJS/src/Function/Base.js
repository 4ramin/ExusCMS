//Base-related functions
'use strict';

(function ($, core) {

	var A = core.Base = {
		resetNaviCache: function () {
			_cNavi = navigator;
		},
		resetWinCache: function () {
			_cWin = window;
		}
	};
	
})(jQuery, $.core);