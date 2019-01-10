//Application-related functions
'use strict';

(function ($, core) {

	var A = core.App = {
		registry: function (App) {
			appRegister.push(App);
		},
		fnCombine: function () {
			var fn = [];
			var vmem = [];
			var func = [];
			var prop = null;
			var args = arguments;
			for (prop in args[0]) {
				fn[prop] = args[0][prop];
				vmem = new fn[prop](true);
				if (vmem.PROP) {
					var _prop = vmem.PROP;
					var _name = _prop.name;
				}
				
				_prop = _name ? _name : prop;
				if (typeof func[_prop] === 'undefined') {
					if (vmem._name) {
						delete vmem._name;
					}
					func[_prop] = vmem;
				}
			}
			
			return func;
		}
	};
})(jQuery, $.core);