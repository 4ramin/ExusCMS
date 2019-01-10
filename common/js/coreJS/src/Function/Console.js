//Console-related functions
'use strict';

(function ($, core) {

	var A = core.Console = {
		clear: function () {
			console.clear();
		},
		log: function (str) {
			console.log(str);
		},
		err: function (str) {
			console.err(str);
		},
		styledLog: function (str, style) {
			console.log('%c ${str} ', style);
		},
		group: function () {
			console.group();
		},
		info: function (str) {
			console.info(str);
		},
		time: function () {
			console.time();
		}
	};
	
	A.count = {
		show: function () {
			console.count();
		},
		reset: function () {
			console.countReset();
		}
	};
	
})(jQuery, $.core);