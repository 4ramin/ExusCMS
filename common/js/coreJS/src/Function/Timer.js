//Timer-related functions
(function ($, core) {

	var A = core.Timer = {
		//async function fn() { const variables = await $.core.Timer.sleep(...); }
		sleep: function (callback, delay) {
			return new Promise(function (resolve) {
			//(resolve) => {
				setTimeout(function () {
				//() => {
					resolve(callback);
				}, delay);
			});
		},
		wait: function (ms) {
			setTimeout(deferred.resolve, ms);
			return deferred.promise();
		},
		timeout: function (vars, callback, ms) {
			if (pTimer !== null) {
				this.Reset();
			}
			
			pTimer = setTimeout(function () {
				callback(vars);
			}, ms);
		},
		interval: function (vars, callback, ms) {
			if (pTimer !== null) {
				this.Reset();
			}
			
			pTimer = setInterval(function () {
				callback(vars);
			}, ms);
		},
		Reset: function () {
			clearInterval(pTimer);
		}
	};
	
})(jQuery, $.core);