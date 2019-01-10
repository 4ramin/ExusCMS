//Notify-related functions
'use strict';

(function ($, core) {

	var A = core.Notify = {
		isSupport: function () {
			if (!("Notification" in window)) {
				return false;
			}
			
			try {
				var notify = _cWin.Notification || _cWin.webkitNotifications || navigator.mozNotification;// || (_cWin.external && _cWin.external.msIsSiteMode() !== undefined);
				if (notify) {
					return true;
				}
			} catch (e) {
				consoel.log(e);
			}
			
			return false;
		},
		/**
		 * Get Permission
		 **/
		getPermit: function () {
			if (_cWin.Notification.permission !== 'denied') {
				_cWin.Notification.requestPermission(function (permission) {});
			} else if (_cWin.webkitNotifications && _cWin.webkitNotifications.checkPermission) {
				_cWin.webkitNotifications.requestPermission();
			}
		},
		/**
		 * Check Permission
		 **/
		getPermitLevel: function () {
			if (_cWin.Notification && _cWin.Notification.permissionLevel) {
				var permit = _cWin.Notification.permissionLevel;
			} else if (_cWin.webkitNotifications && _cWin.webkitNotifications.checkPermission) {
				var permit = Permissions[_cWin.webkitNotifications.checkPermission()];
			} else if (_cWin.Notification && _cWin.Notification.permission) {
				var permit = _cWin.Notification.permission;
			} else if (navigator.mozNotification) {
				var permit = Permission.GRANTED;
			} else if (_cWin.external && _cWin.external.msIsSiteMode() !== undefined) {
				var permit = _cWin.external.msIsSiteMode() ? 'granted' : 'default';
			}
			
			return permit;
		},
		/**
		 * Show Notification
		 * @param {message}         : message
		 * options : body, icon, sound, vibrate: [200, 100, 200], timestamp, silent [bool], requireInteraction: shouldRequireInteraction, lang, dir: 'rtl', data
		 **/
		Show: function (title, message, icon, body, options) {
			if (this.getPermitLevel() != 'denied') {
				if (_cWin.Notification) {
					if (!options) options = {}
					var notificationHandler = new Notification(message, options);
				} else if (_cWin.webkitNotifications) {
					notificationHandler = _cWin.webkitNotifications.createNotification(icon, title, body);
					notification.show();
				} else if (navigator.mozNotification) {
					notificationHandler = navigator.mozNotification.createNotification(title, body, icon);
					notification.show();
				} else if (_cWin.external && _cWin.external.msIsSiteMode()) {
					_cWin.external.msSiteModeClearIconOverlay();
					_cWin.external.msSiteModeSetIconOverlay(icon, title);
					_cWin.external.msSiteModeActivate();
					notification = {};
				}
			} else {
				this.getPermit();
			}
		}
	};
})(jQuery, $.core);