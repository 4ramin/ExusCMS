/**
 * Prototype
 */
(function () {

	Number.prototype.clamp = function (min, max) {
		return Math.min(Math.max(this, min), max);
	};
	
	Number.prototype.mod = function (n) {
		return ((this % n) + n) % n;
	};

	Audio.prototype.Restart = function () {
		this.pause();
		this.currentTime = 0;
		this.play();
	};
	
	function EventEmitter() {
		this.listeners = {};
		this._owner = this;
	};
	
	EventEmitter.prototype.on = function (event, callback) {
		this._callbacks[event] = this._callbacks[event] || [];
		this._callbacks[event].push(callback);
	};
	
	EventEmitter.prototype.emit = function (event, data) {
		if ($.core.Validate.isUndefined(this._callbacks[event])) {
			return;
		}
		var callbacks = this._callbacks[event];
		for (var i = 0, len = callbacks.length; i < len; ++i) {
			try {
				callbacks[i].call(null, data);
			} catch (e) {
				console.log(e);
			}
		}
	};
	
	EventEmitter.prototype.off = function (event) {
		delete this._callbacks[event];
	};
	
	protoArr.indexOf = function (e) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == e) return i;
		}
		return -1;
	};
	
	protoArr.forEach = function (fn) {
		for (var i = 0; i < this.length; i++) {
			fn(this[i], i, this);
		}
	};
	
	protoArr.find = function (cond) {
		var code = (cond instanceof Function) ? cond : function (v) {
			return v == cond;
		};
		var arrL = this.length;
		for (var i = 0; i < arrL; i++) {
			if (code(this[i])) {
				return this[i];
			}
		}
		return undefined;
	};
	
	protoArr.isAlready = function (key) {
		var _isAlready = false;
		var _count = this.length;
		var i;
		for (i = 0; i < _count; i++) {
			if (this[i] == key) {
				_isAlready = true;
			}
		}
		return _isAlready;
	};
	
	protoArr.arsort = function (key) {
		this.sort(function (a, b) {
			return (a[key] < b[key]) ? 1 : -1;
		});
	};
	
	protoArr.remove = function (_count) {
		this.splice(_count, 1);
	};
	
	protoArr.unique = function () {
		var e = [];
		var _count = length = this.length;
		var k, h;
		for (k = 0; k < _count; k++) {
			for (h = 0; h < e.length; h++) {
				if (this[k] == e[h]) {
					break
				}
			}
			if (h >= e.length) {
				e[h] = this[k]
			}
		}
		return e;
	};
	
	protoArr.asort = function (key) {
		this.sort(function (a, b) {
			return (a[key] > b[key]) ? 1 : -1;
		});
	};
	
	protoArr.shuffle = function () {
		var l = this.length;
		while (l) {
			var m = Math.floor(Math.random() * l);
			var n = this[--l];
			this[l] = this[m];
			this[m] = n;
		}
	};
	
});