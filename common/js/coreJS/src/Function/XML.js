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
		getXMLSerializer: function () {
			if ($.core.Validate.isUndefined($cache['xmlserializer'])) {
				var serializer = new XMLSerializer();
				$cache['xmlserializer'] = serializer;
			}
			
			var xmlSerializer = $cache['xmlserializer'];
			
			return xmlSerializer;
		},
		serialize: function (str) {
			var xmlString = this.getXMLSerializer().serializeToString(str);
			
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