//XML-related functions
'use strict';

(function ($, core) {

	var A = core.XML = {
		isXMLDoc: function (xml) {
			return jQuery.isXMLDoc(xml);
		},
		parse: function (xml) {
			return $.parseXML(xml);
		},
		find: function (xml, val) {
			if (self.isXMLDoc(xml)) {
				return xml.find(val);
			}
		},
		serialize: function (str) {
			if ($.core.Validate.isUndefined($cache['xmlserializer'])) {
				var serializer = new XMLSerializer();
				$cache['xmlserializer'] = serializer;
			}
			
			var xmlString = $cache['xmlserializer'].serializeToString(str);
			
			return xmlString;
		},
		strToXML: function (str) {
			var xmlDOM;
			var xmlParser;
			
			if ($.core.Request.getActiveXObject()) {
				xmlDOM = new ActiveXObject('Microsoft.XMLDOM');
				xmlDOM.async = false;
				xmlDOM.loadXML(str);
			} else if (_cXMLHttpRequest) {
				if ($.core.Validate.isUndefined($cache['domparser'])) {
					xmlParser = new DOMParser();
					$cache['domparser'] = xmlParser;
				}
				xmlDOM = $cache['domparser'].parseFromString(str, 'text/xml');
			} else {
				return null;
			}
			
			return xmlDOM;
		}
	};
})(jQuery, $.core);