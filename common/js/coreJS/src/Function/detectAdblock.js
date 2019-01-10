//detectAdblock-related functions
'use strict';

(function ($, core) {

	var A = core.detectAdblock = {
		create: function () {
			var cls = 'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links';
			var style = 'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important';
			if ($('.pub_300x250').length == 0) {
				pAdBlocker = $.core.Element.addDivOnBody(cls);
				pAdBlocker.setAttribute('style', style);
			}
		},
		detect: function () {
			if ($.core.Validate.isUndefined($cache['adblock'])) {
				var detected = false;
				if (_cWin.document.body.getAttribute('abp') !== null || pAdBlocker.offsetParent === null || pAdBlocker.offsetHeight == 0 || pAdBlocker.offsetLeft == 0 || pAdBlocker.offsetTop == 0 || pAdBlocker.offsetWidth == 0 || pAdBlocker.clientHeight == 0 || pAdBlocker.clientWidth == 0) {
					detected = true;
				}
				
				if (!$.core.Validate.isUndefined(_cWin.getComputedStyle)) {
					var baitTemp = _cWin.getComputedStyle(pAdBlocker, null);
					if (baitTemp && (baitTemp.getPropertyValue('display') == 'none' || baitTemp.getPropertyValue('visibility') == 'hidden')) {
						detected = true;
					}
				}
				$cache['adblock'] = detected;
			}
			return $cache['adblock'];
		}
	};
})(jQuery, $.core);