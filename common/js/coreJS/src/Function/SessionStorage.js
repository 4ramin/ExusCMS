//Session Storage-related functions
(function ($, core) {

	var A = core.sessionStorage = {
		isSupport: function () {
			if ($.core.Validate.isUndefined($cache['isSessionStorageSupport'])) {
				this.isSupport = true;
				let unitName = "test";
				let unitValue = "value";
				
				try {
					sessionStorage = window.sessionStorage;
					sessionStorage.setItem(unitName, unitValue);
					sessionStorage.removeItem(unitName);
				} catch(e) {
					this.isSupport = false;
				}
				
				$cache['isSessionStorageSupport'] = this.isSupport;
			}
			
			return $cache['isSessionStorageSupport'];
		},
		setItem: function (item, value, useOverwrite) {
			if (this.getItem(item) !== null) {
				if (useOverwrite === true) {
					sessionStroage.setItem(item, value);
				} else {
					return false;
				}
			} else {
				sessionStroage.setItem(item, value);
			}
			
			return true;
		},
		isEmpty: function (item) {
			if (this.getItem(item) !== null) {
				return true;
			}
			
			return false;
		},
		getAllItem: function () {
			return sessionStroage.getItem();
		},
		getItem: function (item) {
			return sessionStroage.getItem(item);
		},
		removeItem: function (item) {
			if (this.isEmpty(item)) {
				sessionStroage.removeItem(item);
			}
			
			return true;
		},
		clear: function (item) {
			sessionStroage.clear();
		}
	};
})(jQuery, $.core);