//Midi-related functions
'use strict';

(function ($, core) {

	var A = core.Midi = {
		isSupport: function () {
			if (navigator.requestMIDIAccess) {
				return true;
			}
			return false;
		},
		request: function (onSuccessCallback, onErrorCallback) {
			if (this.isSupport()) {
				navigator.requestMIDIAccess({
					sysex: false
				}).then(onSuccessCallback, onErrorCallback);
			}
		}
	};
})(jQuery, $.core);
