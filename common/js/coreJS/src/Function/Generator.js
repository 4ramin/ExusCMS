//Generator-related functions
'use strict';

(function ($, core) {

	var A = core.Generator = {
		uniqueRandIterators: function* (min, max, length) {
			var str = $.core.Str.getUniqueRand(min, max, length);
			var idx = 0;
			
			while (idx < str.length) {
				yield str[idx++];
			}
		},
		uniqueStrIterators: function* (length) {
			var str = $.core.Str.randomStr(length);
			var idx = 0;
			
			while (idx < str.length) {
				yield str[idx++];
			}
		},
		getUniqueNum: function (min, max, length) {
			IteratorsTemp = this.uniqueRandIterators(min, max, length);
		},
		getUniqueStr: function (length) {
			IteratorsTemp = this.uniqueStrIterators(length);
		},
		getNext: function () {
			return IteratorsTemp.next().value;
		}
	};
})(jQuery, $.core);