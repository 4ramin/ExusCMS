//Cookie-related functions
'use strict';

(function ($, core) {

	var A = core.Cookie = {
		/**
		 * Delete Cookie
		 * @param {cName}   : Cookie Name
		 **/
		Delete: function (cName) {
			if (this.isAccept()) {
				DateFormat.setDate(DateFormat.getDate() - 1);
				var cookies = cName + '=' + '; expires=' + DateFormat.toGMTString() + '; path=/';
				
				return this.SetData(cookies);
			} else {
				return false;
			}
		},
		isAccept: function () {
			return _cNavi.cookieEnabled;
		},
		/**
		 * Get Cookie
		 * @param {cName}   : Cookie Name
		 **/
		Get: function (cName) {
			if (this.isAccept()) {
				var cookies = document.cookie.match(new RegExp("(^| )" + cName + "=([^;]*)(;|$)"));
				return !cookies ? "" : decodeURIComponent(cookies[2])
			} else {
				return false;
			}
		},
		SetData: function (data) {
			document.cookie = data;
			if (document.cookie.length == 0) {
				return false;
			} else {
				return true;
			}
		},
		/**
		 * Set Cookie
		 * @param {cName}   : Cookie Name
		 * @param {cValue}  : Cookie Value
		 * @param {cDay}    : Cookie Expires Day
		 **/
		Set: function (cName, cValue, cDay) {
			if (this.isAccept()) {
				DateFormat.setDate(DateFormat.getDate() + cDay);
				var cookies = cName + '=' + escape(cValue) + '; path=/ ';
				cookies += ';domain=' + window.location.hostname;
				if (typeof cDay != 'undefined') {
					cookies += ';expires=' + DateFormat.toGMTString() + ';';
				}
				
				return this.SetData(cookies);
			} else {
				return false;
			}
		}
	};
})(jQuery, $.core);