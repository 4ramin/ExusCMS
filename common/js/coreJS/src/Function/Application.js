//Application-related functions
'use strict';

(function ($, core) {

	var A = core.App = {
		each: function(Array, b, c) {
			if (Array) {
				if (Array instanceof Array) {
					for (var d = 0, e = Array.length; d < e && !1 !== b.call(c, Array[d], d); d++);
				} else {
					for (d in Array) {
						if (!1 === b.call(c, Array[d], d)) {
							break;
						}
					}
				}
			}
		},
		extend: function(a) {
			var b = 2 <= arguments.length ? Array.prototype.slice.call(arguments, 1) : [];
			this.each(b, function(b) {
				for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d])
			});
		
			return a;
		},
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