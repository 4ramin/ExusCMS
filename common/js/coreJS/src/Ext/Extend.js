;(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jQuery'], factory);
	} else {
		factory(jQuery);
	}
}(function ($) {
	_root.isUndefined = function (obj) {
		return obj === void 0;
	},
	_root.isNull = function (obj) {
		return obj === null;
	},
	_root.isArray = nativeIsArr || function (obj) {
		return toString.call(obj) === '[object Array]';
	},
	_root.isRegExp = function (obj) {
		return !!(obj && obj.test && obj.exec && (obj.ignoreCase || obj.ignoreCase === false));
	},
	_root.toType = (function (global) {
		return function (o) {
			if (o === global) {
				return 'global';
			}
			return toString.call(o).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
		}
	})(this);
	
	jQuery.easing.quart = function (x, t, b, c, d) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	};

	$.expr[':'].cls = $.expr.createPseudo(function (meta) {
		return function (el) {
			return meta ? el.className === meta : false;
		}
	});

	$.fn.Validation = function (options) {
		var defaults = {
			validators: {
				email: function (email) {
					var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					return email.match(regex) ? true : false;
				},
				date: function (date) {
					var regex = /^(\d{4})-(\d{2})-(\d{2})$/;
					return date.match(regex) ? true : false;
				},
				en: function (en) {
					var regex = /^[a-zA-Z]+$/;
					return en.match(regex) ? true : false;
				},
				phone: function (phone) {
					//var regex = /^[0-9]{1,}\-[0-9]{1,}\-[0-9]{1,}$/;
					var regex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
					return phone.match(regex) ? true : false;
				},
				jamo: function (jamo) {
					//var regex = /^[ㄱ-힣]*$/;
					var regex = /([^가-힣\x20])/i;
					return kor.match(regex) ? true : false;
				},
				num: function (num) {
					var regex = /[^0-9]*$/;
					return num.match(regex) ? true : false;
				},
				engnum: function (engnum) {
					var regex = /^[a-zA-Z0-9$_$.$-]*$/;
					return engnum.match(regex) ? true : false;
				}
			}
		};
		options = $.extend(true, defaults, options);
		this.each(function () {
			var $form = $(this);
			$form.find('input, textarea').each(function () {});
		});
	}

	$.extend($, {
		'$': function (el) {
			if (el.jquery) el = el[0];
			if (typeof el === 'string') el = $.selector(el);
			if (!el || !el.nodeName) throw new TypeError('Type Error: DOM Object or $() is Not Exists');
			return $.data(el, 'this') || $.data(el, 'this', $(el));
		},
		'log': (function () {
			if ($.core.Browser.isConsoleAvailable()) {
				return function () {
					console.log.apply("%c%s", $.makeArray(arguments));
				};
			}
		}())
	});

	$.fn.extend({
		appendDiv: function (id) {
			var cls = $(this).attr("id") || $(this).attr("class");
			if (cls) {
				$.core.Element.appendDiv(cls, id);
			}
		},
		combine: function (separator) {
			var res = "";
			var is_first = 1;
			
			this.each(function () {
				if (is_first != 1) {
					res += separator;
				} else {
					is_first = 0;
				}
				
				res += $(this).val();
			});
			
			return res;
		},
		enable: function () {
			return this.each(function () {
				$(this).removeAttr('disabled');
			});
		},
		disable: function () {
			return this.each(function () {
				$(this).attr('disabled', true);
			});
		},
		href: function (href) {
			if (arguments.length === 0) {
				return this.length === 0 ? null : this.get(0).href;
			} else {
				return this.each(function () {
					this.href = href;
				});
			}
			
			return this;
		},
		Toggle: function () {
			return this.each(function () {
				var elem = $(this);
				$.core.Effect.Toggle(elem);
			});
		},
		focusShow: function (delay) {
			if ($(this).css("display") == "none") {
				$(this).show(delay).Focus();
			} else {
				$(this).Focus();
			}
		},
		toggleBool: function (elementBoolean, delay) {
			if (elementBoolean === true) {
				$(this).show(delay);
			} else {
				$(this).hide(delay);
			}
		},
		toggleClass: function (element, cls) {
			//var fn = hasClasses(element, cls) ? removeClass : addClass;
			//fn(element, cls);
		},
		maxWidth: function ($width) {
			if ($(this).width() > $width) {
				$(this).css('max-width', $width);
				$(this).css('height', 'auto');
			}
		},
		maxHeight: function ($height) {
			if ($(this).height() > $height) {
				$(this).css('width', 'auto');
				$(this).css('max-height', $height);
			}
		},
		getEvent: function ($elements, $callback) {
			function EventList(element) {
				var event_list = [];
				for (var key in element) {
					if (key == "onmousewheel" || key == "onwheel") return;
					
					if (key.indexOf('on') === 0) {
						event_list.push(key.slice(2));
					}
				}
				
				return event_list.join(' ');
			}
			
			$($elements).on(EventList(this[0]), function (e) {
				return $callback(e);
			});
		},
		FocusAnimate: function (delay) {
			$.core.Effect.FocusAnimate(this);
		},
		Focus: function () {
			$.core.Effect.Focus(this);
		},
		keyDownHandler: function ($handler, event) {
			var keyDownMap = [];
			$(this).keydown(function (event) {
				keyDownMap.push(event.keyCode);
			}).keyup(function (event) {
				if (keyDownMap.length == 1) {
					$handler(parseInt(keyDownMap.toString()), event);
				} else {
					$handler(keyDownMap, event);
				}
				keyDownMap = [];
			});
		},
		isEditable: function () {
			return $(document.activeElement).is(this);
		}
	});
});