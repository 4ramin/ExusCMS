//WebSocket-related functions
(function ($, core) {

	var A = core.WebSocket = {
		isSupport: function () {
			if ("WebSocket" in _cWin) {
				return true;
			}
			
			return false;
		},
		Open: function (host, options) {
			HandlerWebSocket = new WebSocket(host, options);
			
			return HandlerWebSocket;
		},
		Send: function (packet) {
			HandlerWebSocket.send(packet);
		}
	};
	
})(jQuery, $.core);