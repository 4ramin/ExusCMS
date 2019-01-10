//WebRealbook-related functions
'use strict';

(function ($, core) {

	var A = core.WebRealbook = {
		createContainer: function () {
			var svgContainer = $.core.Element.createSVGNS('svg');
			var svgMeasure = $.core.Element.createSVGNS('g');
			svgContainer.append(svgMeasure);
			
			this.storage.container.content = svgContainer;
		},
		setContainer: function (tags) {
			if (this.storage.container.content) {
				tags.append(this.storage.container.content);
			} else {
				throw("Container isn't created");
			}
		}
	};
	
	A.Attribute = {
		setFontSize: function (fontsize) {
			A.storage.config.size = fontsize;
		},
		setEditable: function (editable) {
			A.storage.config.editable = editable;
		},
		setContainerWidth: function (width) {
			A.storage.config.containerWidth = width;
		},
		setTempo: function (tempo) {
			A.storage.config.tempo = tempo;
		}
	};
	
	A.storage = {};
	A.storage.config = {};
	A.storage.container = {};
	
})(jQuery, $.core);