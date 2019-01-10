//Effect-related functions
'use strict';

(function ($, core) {

	var A = core.Effect = {
		Highlighter: function (target, rgb1, rgb2, delay) {
			var timerCounter = 0;
			var timerDelay = 30;
			var _delay = delay / timerDelay;
			var firstDiff = (rgb1[0] - rgb2[0]) / _delay;
			var secondDiff = (rgb1[1] - rgb2[1]) / _delay;
			var thirdDiff = (rgb1[2] - rgb2[2]) / _delay;

			var timer = setInterval(function () {
				rgb1[0] = parseInt(rgb1[0] - firstDiff, 10);
				rgb1[1] = parseInt(rgb1[1] - secondDiff, 10);
				rgb1[2] = parseInt(rgb1[2] - thirdDiff, 10);
				
				target.style.backgroundColor = "rgb(" + rgb1.toString() + ")";
				timerCounter += 1;
				if (timerCounter >= _delay) {
					target.style.backgroundColor = "#fff";
					clearInterval(timer);
				}
			}, timerDelay);
		},
		Toggle: function (elements) {
			if ($(elements).length) {
				var hasDisplayAttr = elements.currentStyle ? elements.currentStyle.display : _cWin.getComputedStyle($(elements)[0], "").getPropertyValue('display');
				hasDisplayAttr = hasDisplayAttr ? hasDisplayAttr.toString().length : 0;
				if (hasDisplayAttr > 0) {
					$(elements).toggle(500);
				}
				$(_cWin).scrollTop($(elements).position().top);
			}
		},
		Focus: function (elements) {
			if (typeof elements === 'number' && isFinite(elements)) {
				$(_cWin).scrollTop(elements);
			} else {
				if ($(elements).length > 0) {
					$(_cWin).scrollTop($(elements).position().top);
				}
			}
		},
		FocusAnimate: function (elements, delay, type) {
			if (typeof elements === 'number' && isFinite(elements)) {
				$("html, body").animate({
					scrollTop: elements
				}, delay, 'swing');
			} else {
				if ($(elements).length > 0) {
					$("html, body").animate({
						scrollTop: $(elements).position().top
					}, delay, 'swing');
				}
			}
		}
	};
})(jQuery, $.core);