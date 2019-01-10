//System-related functions
'use strict';

(function ($, core) {

	var A = core.System = {
		shell: function (exec) {
			var shell = new ActiveXObject("WScript.shell");
			shell.run(exec, 1, true);
		},
		/*
			for (;!e.atEnd();e.moveNext ()) {
				p.{prop};
			}
			Caption
			IPFilterSecurityEnabled
			IPPortSecurityEnabled
			IPXAddress
			IPXEnabled
			IPXNetworkNumber
			MACAddress
			WINSPrimaryServer
			WINSSecondaryServer
		 */
		getNetworkAdaptor: function () {
			if ($.core.Browser.isIE()) {
				var locator = new ActiveXObject("WbemScripting.SWbemLocator");
				var service = locator.ConnectServer(".");
				var properties = service.ExecQuery("SELECT * FROM Win32_NetworkAdapterConfiguration");
				var enums = new Enumerator (properties);
				return enums;
			}
		}
	};
})(jQuery, $.core);