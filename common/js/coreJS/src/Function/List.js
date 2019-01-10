//List-related functions
'use strict';

(function ($, core) {

	var A = $.core.List = {
		addItem: function (id) {
			var node = document.createElement("LI");
			var text = document.createTextNode(firstname);
			
			node.appendChild(text);
			document.getElementById(id).appendChild(node);
		},
		setChildrenDraggable: function (elem) {
			[].slice.call(rootEl.children).forEach(function (elem) {
				elem.draggable = true;
			});
		}
	};
	
})(jQuery, $.core);