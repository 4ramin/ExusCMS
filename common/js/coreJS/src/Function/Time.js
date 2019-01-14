//Time-related functions
'use strict';

(function ($, core) {

	var A = core.Time = {
		getDateObject: function (time) {
			var date = new Date(time);
			
			return date;
		},
		setMinutes: function (date, minutes, seconds, milliseconds) {
			return date.setMinutes(minutes, seconds, milliseconds);
		},
		formatTime: function (seconds) {
			var minutes;
			minutes = Math.floor(seconds / 60);
			minutes = (minutes >= 10) ? minutes : "0" + minutes;
			seconds = Math.floor(seconds % 60);
			seconds = (seconds >= 10) ? seconds : "0" + seconds;
			return minutes + ":" + seconds;
		},
		monthToNumbar: function (_str) {
			var _returnStr = "";
			if (_str == "Jan") _returnStr = "01";
			if (_str == "Feb") _returnStr = "02";
			if (_str == "Mar") _returnStr = "03";
			if (_str == "Apr") _returnStr = "04";
			if (_str == "May") _returnStr = "05";
			if (_str == "Jun") _returnStr = "06";
			if (_str == "Jul") _returnStr = "07";
			if (_str == "Aug") _returnStr = "08";
			if (_str == "Sep") _returnStr = "09";
			if (_str == "Oct") _returnStr = "10";
			if (_str == "Nov") _returnStr = "11";
			if (_str == "Dec") _returnStr = "12";
			
			return _returnStr;
		},
		getWebkitTimezone: function () {
			if (!$.core.Validate.isObject(Intl)) {
				return null;
			}
			
			var format = Intl.DateTimeFormat();
			
			if (!$.core.Validate.isObject(format)) {
				return null;
			}
			
			var options = format.resolvedOptions();
			
			if (!$.core.Validate.isObject(options)) {
				return null;
			}
			return options.timeZone || null;
		},
		getTime: function () {
			var date = new Date();
			var time = date.getTime();
			
			return time;
		},
		Local: function () {
			var webkittime = this.getWebkitTimezone();
			
			if (webkittime) {
				return webkittime;
			} else {
				var DateFormat = new Date();
				return DateFormat.toLocaleTimeString();
			}
		},
		now: function () {
			return +new Date
		},
		getDate: function () {
			var date = new Date(),
				y = date.getFullYear(),
				n = date.getMonth() + 1,
				d = date.getDate();
				
			return [y, n, d];
		},
		getTime: function () {
			var time = new Date(),
				h = time.getHours(),
				i = time.getMinutes(),
				s = time.getSeconds(),
				m = time.getMilliseconds();
				
			return [h, i, s, m];
		}
	};
})(jQuery, $.core);