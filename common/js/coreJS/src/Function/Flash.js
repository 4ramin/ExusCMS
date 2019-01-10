//Flash-related functions
'use strict';

(function ($, core) {

	var A = core.Flash = {
		isSupport: function () {
			try {
				if (new ActiveXObject('ShockwaveFlash.ShockwaveFlash')) return true;
			} catch (e) {
				if (navigator.mimeTypes['application/x-shockwave-flash'] != undefined) return true;
			}
			
			return false;
		},
		getVersion: function () {
			var version, flash;
			
			try {
				flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
				version = flash.GetVariable("$version");
			} catch (e) {}
			
			if (!version) try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
				version = "WIN 6,0,21,0";
				flash.AllowScriptAccess = "always";
				version = flash.GetVariable("$version");
			} catch (e) {}
			
			if (!version) try {
				flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
				version = flash.GetVariable("$version");
			} catch (e) {}
			
			if (!version) try {
				flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
				version = "WIN 3,0,18,0"
			} catch (e) {}
			
			if (!version) try {
				flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				version = "WIN 2,0,0,11"
			} catch (e) {
				version = false;
			}
			
			return version;
		},
		generate: function (file, width, height, id, clsID) {
			if (this.isSupport()) {
				var str = '';
				var cls = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000";
				cls = cls || clsID;
				str += '<object classid="' + cls + '" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="' + width + '" height="' + height + '" id="' + id + '" align="middle">';
				str += '<param name="allowScriptAccess" value="sameDomain" />';
				str += '<param name="quality" value="high" />';
				str += '<param name="movie" value="' + file + '" />';
				str += '<param name="quality" value="high" />';
				str += '<param name=wmode value=transparent>';
				str += '<embed src="' + file + '" quality="high" bgcolor="#000000" width="' + width + '" height="' + height + '"  name="' + id + '" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" wmode="transparent" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
				str += '</object>';
				return str;
			} else {
				return null;
			}
		},
		remove: function (id) {
			var flash = $.core.Element.getById(id);
			
			if (flash && flash.nodeName == "OBJECT") {
				if ($.core.Browser.isIE()) {
					if (obj.readyState == 4) {
						$.core.Element.removeIEObject(id);
					}
				} else {
					flash.parentNode.removeChild(flash);
				}
			}
		}
	};
})(jQuery, $.core);