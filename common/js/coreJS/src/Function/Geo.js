//GEO-related functions
'use strict';

(function ($, core) {

	var A = core.GEO = {
		isSupport: function () {
			return (navigator.geolocation) ? true : false;
		},
		Get: function () {
			if (!this.isSupport()) return;
			
			var options = {
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0
			};
			
			_cNavi.geolocation.getCurrentPosition(geoSuccess, geoError, options);

			function geoSuccess(pos) {
				return pos.coords;
			}

			function geoError(err) {
				return err;
			}
		}
	};
})(jQuery, $.core);