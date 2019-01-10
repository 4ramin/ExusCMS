//OptionList-related functions
'use strict';

(function ($, core) {

	var A = core.OptionList = {
		setFocusLastItem: function (target) {
			if (!target) {
				return;
			}
			
			var selected = $(target);
			$(selected).children(':last-child').prop('selected',true);
		},
		getLength: function (target) {
			return $("#" + target + " option").length || document.getElementById(target).options.length;
		},
		addItme: function (target, value, html) {
			var opt = document.createElement('option');
			opt.value = value;
			opt.innerHTML = html;
			document.getElementById(target).appendChild(opt);
		},
		setSelectedItemText: function (target, text) {
			if (!target || !text) {
				return;
			}
			
			$(target).find(':selected').text(text);
		},
		moveSelectedItem: function (target, dest) {
			if (!target || !dest) {
				return;
			}
			
			$(target).find(':selected').appendTo(dest);
		},
		moveAllItem: function (target, dest) {
			if (!target || !dest) {
				return;
			}
			
			$(target).children().appendTo(dest);
		},
		moveItemTop: function (target) {
			if (!target) {
				return;
			}
			
			var selected = $(target).find(':selected');
			
			if (selected.length) {
				selected.parent().prepend(selected);
			}
		},
		moveItemBottom: function (target) {
			if (!target) {
				return;
			}
			
			var selected = $(target).find(':selected');
			
			if (selected.length) {
				selected.parent().append(selected);
			}
		},
		moveItemUp: function (target) {
			if (!target) {
				return;
			}
			
			var selected = $(target).find(':selected');
			
			if (selected.length) {
				selected.first().prev().before(selected);
			}
		},
		moveItemDown: function (target) {
			if (!target) {
				return;
			}
			
			var selected = $(target).find(':selected');
			
			if (selected.length) {
				selected.last().next().after(selected);
			}
		}
	};
})(jQuery, $.core);