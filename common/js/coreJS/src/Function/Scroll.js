//Scroll-related functions
'use strict';

(function ($, core) {

	var A = core.Scroll = {
		/**
		 * Document Scroll to Top
		 **/
		Top: function () {
			return $(document).scrollTop(0);
		},
		/**
		 * Document Scroll to Bottom
		 **/
		Bottom: function () {
			return $.core.Effect.FocusAnimate($(window).height());
		}
	};
	
})(jQuery, $.core);