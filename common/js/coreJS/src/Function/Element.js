//Element-related functions
'use strict';

(function ($, core) {

	var A = core.Element = {
		isHTMLElement: function (elem) {
			return (elem instanceof window.HTMLElement) ? true : false;
		},
		getWebColor: function (id) {
			return webColorCodes[id];
		},
		setMenuToggleClass: function (target, cls) {
			//JQMIGRATE: 'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'
			$(target).on('focus mouseenter mouseover mousedown', function () {
				$(this).addClass(cls);
			}),
			$(target).on('mouseleave mouseout contextmenu mouseup',function () { 
				$(this).removeClass(cls);
			});
		},
		insertDOMParentBefore: function (target, dom, id) {
			var elem = document.getElementById(target);
			if (elem) {
				var _dom = document.createElement(dom);
				elem.parentNode.insertBefore(_dom, elem);
				_dom.setAttribute("id", id);
			}
		},
		getElementOffsetLeft: function (element) {
			var element =  document.querySelector(element);
			var bodyRect = document.body.getBoundingClientRect();
			var elemRect = element.getBoundingClientRect();
			var offset   = elemRect.left - bodyRect.left;
			
			return offset;
		},
		getElementOffsetTop: function (element) {
			var element =  document.querySelector(element);
			var bodyRect = document.body.getBoundingClientRect();
			var elemRect = element.getBoundingClientRect();
			var offset   = elemRect.top - bodyRect.top;
			
			return offset;
		},
		getElementOffsetBottom: function (element) {
			var element =  document.querySelector(element);
			var bodyRect = document.body.getBoundingClientRect();
			var elemRect = element.getBoundingClientRect();
			var offset   = elemRect.bottom - bodyRect.bottom;
			
			return offset;
		},
		getElementsByClassNameCompatible: function (cls) {
			if (document.getElementsByClassName) {
				return document.getElementsByClassName(cls);
			}
			
			var i;
			var classArr = new Array();
			var regex = new RegExp('^| ' + cls + ' |$');
			var elem = document.body.getElementsByTagName("*");
			var len = elem.length;
			for (i=0; i<len; i++) {
				var clsName = elem[i].className;
				if (clsName) {
					if (regEx.test(clsName)) {
						classArr.push(elem[i]);
					}
				}
			}
			
			return classArr;
		},
		makeStruct: function (item, duplicate) {
			var item = item.split(duplicate);
			var count = item.length;
			function constructor() {
				var i;
				for (i = 0; i < count; i++) {
					this[names[i]] = arguments[i];
				}
			}
			
			return constructor;
		},
		getBodyLastChild: function () {
			return document.body.lastChild;
		},
		isBodyRTL: function () {
			return window.getComputedStyle(document.body).direction === 'rtl';
		},
		isCorrectFunctionName: function (func) {
			var func = /^\s*function\s*([A-Za-z0-9_$]*)/;
			return func.exec(func);
		},
		fontTest: function (beforeweight, beforefamily, afterweight, afterfamily, id) {
			before.family = (typeof(beforefamily) != 'undefined')? beforefamily: 'serif';
			before.weight = (typeof(beforeweight) != 'undefined')? beforeweight: '300';
			after.family = (typeof(afterfamily) != 'undefined')? afterfamily: 'serif';
			after.weight = (typeof(afterweight) != 'undefined')? afterweight: '300';	
			
			$('body').prepend('<p id="' + id + '" style="font-family:' + before.family + ';font-size:72px;font-weight:' + before.weight + ';left:-9999px;top:-9999px;position:absolute;visibility:hidden;width:auto;height:auto;">ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789./\!</p>');
			
			var beforeWidth = $('p#' + id).width();
			var beforeHeight = $('p#' + id).height();
			
			$('p#jQuery-Font-Test').css({
				'font-family': (after.family + ',' + base.family),
				'font-weight': after.weight
			});
			
			var afterWidth = $('p#' + id).width();
			var afterHeight = $('p#' + id).height();
			
			$('p#' + id).remove();
			
			return (((afterHeight != beforeHeight) || (afterWidth != beforeWidth)) ? true: false);
		},
		getChildsText: function (node) {
			function getStrings(node, arr) {
				if (node.nodeType == 3) { /* Node.TEXT_NODE */
					arr.push(node.data);
				} else if (node.nodeType == 1) { /* Node.ELEMENT_NODE */
					for (var m = node.firstChild; m != null; m = m.nextSibling) {
						getStrings(m, arr);
					}
				}
			}
			
			var arr = [];
			getStrings(node, arr);
			return arr.join("");
		},
		selectTextArea: function (id) {
			document.getElementById(id).select();
		},
		getPointerX: function (evt) {
			if (!evt) {
				evt = window.event;
			}
			
			try{
				return evt.pageX || (evt.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
			} catch (e) {
				console.log(e);
			}
		},
		getFunction: function (name, params) {
			query = name + "(" + params + ");";
			return eval(query);
		},
		getPointerY: function (evt) {
			if (!evt) {
				evt = window.event;
			}
			
			return evt.pageY || (evt.clientY + (document.documentElement.scrollLeft || document.body.scrollLeft));
		},
		getScrollX: function () {
			if (self.pageXOffset) {
				return self.pageXOffset;
			} else if (document.documentElement && document.documentElement.scrollTop) {
				return document.documentElement.scrollLeft;
			} else if (document.body && document.body.scrollLeft) {
				return document.body.scrollLeft;
			}
		},
		getScrollY: function () {
			if (self.pageYOffset) {
				return self.pageYOffset;
			} else if (document.documentElement && document.documentElement.scrollTop) {
				return document.documentElement.scrollTop;
			} else if (document.body && document.body.scrollTop) {
				return document.body.scrollTop;
			}
		},
		toggleLayer: function (id) {
			try {
				var obj = document.getElementById(id);
				obj.style.display = "none" == obj.style.display ? "block" : "none";
			} catch (e) {
				console.log(e);
			}
			
			return true;
		},
		findForm: function (object) {
			for (var obj = object; obj; obj = obj.parentNode) {
				if ("FORM" == obj.nodeName) {
					return obj;
				}
			}
		},
		trimAllTags: function (form) {
			try {
				var i;
				this.length = form.elements.length;
				for (var i = 0; i < this.length; i++) {
					//form.elements[i].tagName.toLowerCase();
					//form.elements[i].type
					/*TODO*/
				}
				return !0
			} catch (e) {
				console.log(e);
			}
		},
		getPosition: function (id, type) {
			elem = this.getById(id);
			if (!elem) {
				return 0;
			}
			
			var offset = 0;
			while (elem) {
				if (type=='left') {
					if (!$.core.Validate.isUndefined(elem.offsetLeft)) {
						offset += elem.offsetLeft;
					}
				} else {
					if (!$.core.Validate.isUndefined(elem.offsetTop)) {
						offset += elem.offsetTop;
					}
				}
				elem = !$.core.Validate.isUndefined(elem.offsetParent) ? elem.offsetParent : null
			}
			return offset;
		},
		getParent: function (id, node) {
			elem = this.getById(id);
			if (!elem) {
				return null;
			}
			
			if (!node && !$.core.Validate.isUndefined(elem.offsetParent)) {
				p = elem.offsetParent;
			} else if (!$.core.Validate.isUndefined(elem.parentNode)) {
				p = elem.parentNode;
			} else if (!$.core.Validate.isUndefined(elem.parentElement)) {
				p = elem.parentElement;
			}
			
			return p;
		},
		generateTooltip: function (elem, cls) {
			var _tooltip = [];
			
			if (!$(elem).length) {
				return;
			}
			
			$(elem).each(function (i, item) {
				var _tooltipItem = $('<div class="' + cls + '" data-index="' + i + '"></div>').appendTo($body);
				$(item).attr('data-index', i);
				_tooltip.push(_tooltipItem);
			});
			
			return _tooltip;
		},
		removeIEObject: function (id) {
			var obj = $.core.Element.getById(id);
			if (obj) {
				for (var i in obj) {
					if (typeof obj[i] == "function") {
						obj[i] = null;
					}
				}
				obj.parentNode.removeChild(obj);
			}
		},
		getAttr: function (elem, prop) {
			return elem.getAttribute(prop);
		},
		getStyleText: function (elem) {
			var style = this.getAttr(elem, "style");
			if (!style) {
				style = elem.style;
			}
			
			if (typeof(style)=="object") {
				return style;
			}
			
			return null;
		},
		addStyle: function (id, html) {
			var style = document.createElement("style");
			style.type = "text/css";
			style.innerHTML = html;
			style.id = id;
			document.head.appendChild(style);
		},
		getStyle: function (elem, prop) {
			if (elem.currentStyle) {
				return elem.currentStyle[prop];
			} else if (_cWin.getComputedStyle) {
				return document.defaultView.getComputedStyle(elem, null).getPropertyValue(prop);
			}
		},
		preloadImage: function (src) {
			var preloadIMage = new Image;
			preloadIMage.src = src;
		},
		getMatchesSelector: function (elem) {
			return elem.prototype.matchesSelector || elem.prototype.mozMatchesSelector || elem.prototype.msMatchesSelector || elem.prototype.oMatchesSelector || elem.prototype.webkitMatchesSelector;
		},
		setAllCheckboxToggle: function (elem, target) {
			var isChecked = elem.checked;
			if (target) {
				var checker = [];
				if (!target.length) {
					checker.push(target);
				} else if (target.length > 0) {
					for (var i=0; i<target.length; i++) {
						checker.push(target[i]);
					}
				}
				
				for (var i=0; i<checker.length; i++) {
					var currentItem = checker[i];
					if (isChecked && !currentItem.checked) {
						currentItem.checked = true;
					} else if (!isChecked && currentItem.checked) {
						currentItem.checked = false;
					}
				}
			}
		},
		setCheckboxToggle: function (item) {
			var obj = $('input[name=' + item + ']:checkbox');
			
			obj.each(function () {
				$(this).attr('checked', ($(this).attr('checked')) ? false : true)
			});
		},
		getSelectedText: function () {
			if (_cWin.getSelection) {
				return _cWin.getSelection();
			} else if (document.getSelection) {
				return document.getSelection();
			} else {
				var selection = document.selection && document.selection.createRange();
				
				if (!selection) {
					return false;
				}
				
				if (selection.text) {
					return selection.text;
				}
				
				return false;
			}
		},
		getDoc: function (elem) {
			return (elem.contentWindow || elem.contentDocument).document;
		},
		isVideoIncluded: function (Id) {
			var obj = this.getById(id);
			
			if (obj && /object|embed/i.test(obj.nodeName)) {
				return true;
			}
			
			return false;
		},
		setHeaderStyle: function (style) {
			var head = document.getElementsByTagName('head')[0];
			
			if (style && head) {
				var styles = this.create('style');
				styles.setAttribute('type', 'text/css');
				if (styles.styleSheet) {
					try {
						styles.styleSheet.cssText = style;
					} catch(e) {
						styles.nodeText = style;
					}
				} else {
					var styles = document.createTextNode(style);
					styles.appendChild(styles);
				}
				
				head.appendChild(styles);
			}
		},
		setJS: function (url, callback) {
			try {
				var head = document.getElementsByTagName('head')[0];
				var script = this.create('script');
				var scripts = head.getElementsByTagName('script');
				
				script.type = 'text/javascript';
				script.src = url;
				script.async = true;
				
				for (var i = 0; i < scripts.length; i++) {
					if (scripts[i].href === script.src) {
						return false;
					}
				}
				
				head.appendChild(script) || document.body.appendChild(script);
				
				script.onreadystatechange = function (self, callback) {
					if (/complete|loaded/.test(script.readyState)) {
						if ($.core.Validate.isFunc(callback)) {
							try {
								callback.call(this, script);
							} catch (e) {
								console.log(e)
							}
						}
					}
				}
				
				script.onload = function (self, callback) {
					if ($.core.Validate.isFunc(callback)) {
						try {
							callback.call(this, script);
						} catch (e) {
							console.log(e)
						}
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
		setCSS: function (url, callback) {
			try {
				var head = document.getElementsByTagName('head')[0];
				var link = this.create('link');
				var links = head.getElementsByTagName('link');
				link.rel = 'stylesheet';
				link.type = 'text/css';
				link.href = url;
				
				for (var i = 0; i < links.length; i++) {
					if (links[i].href === link.href) {
						return false;
					}
				}
				
				head.appendChild(link) || document.body.appendChild(link);
				
				/*script.onreadystatechange = function () {
					if (/complete|loaded/.test(script.readyState)) {
						if (callback != null && callback != undefined) {
							callback();
						}
					}
				}
				
				script.onload = function () {
					if (callback != null && callback != undefined) {
						callback();
					}
				}*/
			} catch (e) {
				console.log(e);
			}
		},
		setChecked: function (element) {
			$(element).prop('checked', true);
		},
		unsetChecked: function (element) {
			$(element).prop('checked', false);
		},
		isChecked: function (element) {
			return $(element).is(':checked');
		},
		enqueue: function (arr) {
			return arr.push(arr);
		},
		dequeue: function (arr) {
			return arr.shift();
		},
		hasProperty: function (obj, prop) {
			return protoObj.hasOwnProperty.call(obj, prop);
		},
		setProperty: function (obj, prop, descriptor) {
			if (descriptor) {
				Object.defineProperty(obj, prop, descriptor);
			} else {
				Object.defineProperties(obj, prop);
			}
		},
		getInnerWinSize: function () {
			return {
				width: this.getInnerWidth(),
				height: this.getInnerHeight()
			};
		},
		getProperty: function (element, prop) {
			return Object.getOwnPropertyDescriptor(element, prop);
		},
		readLittleEndian: function (array, index) {
			/***
			 * LSB (Least Significant Byte)
			 * 0x78, 0x56, 0x34, 0x12...
			 * Speed LE > BE
			 *
			 * ${https://oeis.org/A133752}
			 *
			 * 1, 256, 65536, 16777216, 4294967296, 1099511627776, 281474976710656, 72057594037927936, 18446744073709551616, 4722366482869645213696, 1208925819614629174706176, 309485009821345068724781056
			 */
			 
			//
			return (array[index + 3] * numberCValue(16777216) + array[index + 2] * numberCValue(65536) + array[index + 1] * numberCValue(256) + array[index + 0]);
		},
		readBigEndian: function (array, index) {
			/***
			 * MSB (Most Significant Byte)
			 * 0x12, 0x34, 0x56, 0x78...
			 */
			return (array[index + 0] * numberCValue(16777216) + array[index + 1] * numberCValue(65536) + array[index + 2] * numberCValue(256) + array[index + 3]);
		},
		generateCode: function (target, type, content) {
			var src = "";
			switch (type) {
			case "a":
				src = '<a href="' + target + '">' + content + '</a>';
				break;
			case "button":
				src = '<input type="button" value="' + content + '">' + target + '</input>';
				break;
			case "range":
				src = '<input type="range" value="' + content + '">' + target + '</input>';
				break;
			case "text":
				src = '<input type="text" value="' + content + '">' + target + '</input>';
				break;
			case "textarea":
				src = '<input type="textarea" value="' + content + '">' + target + '</input>';
				break;
			case "audio":
				src = '<audio src="' + target + '" controls></audio>';
				break;
			case "img":
				src = '<img src="' + target + '"></img>';
				break;
			case "embed":
				src = '<embed src="' + target + '"></embed>';
				break;
			case "video":
				src = '<video src="' + target + '" controls></video>';
				break;
			}
			return src;
		},
		isWheelExists: function () {
			document.onmousewheel !== undefined ?  'mousewheel' : 'DOMMouseScroll';
			if (document.onmousewheel !== undefined) {
				return true;
			}
			
			var hasWheel = ('onwheel' in document.createElement('div'));
			return hasWheel ? true : false;
		},
		generateMultimediaCode: function (file, type) {
			var src = "";
			switch (type) {
			case "audio":
				src = '<audio src="' + file + '" controls></audio>';
				break;
			case "img":
				src = '<img src="' + file + '"></img>';
				break;
			case "embed":
				src = '<embed src="' + file + '"></embed>';
				break;
			case "video":
				src = '<video src="' + file + '" controls></video>';
				break;
			}
			
			return src;
		},
		getRoot: function () {
			return document.documentElement;
		},
		clone: function ($element) {
			return $element.clone();
		},
		getSpecificType: function (type) {
			return $(document.activeElement).is(type);
		},
		getParents: function (el) {
			var parents = [];
			var p = el.parentNode;
			while (p !== document) {
				var o = p;
				parents.push(o);
				p = o.parentNode;
			}
			
			return parents;
		},
		findClass: document.getElementsByClassName ? (function (cls, context) {
			return protoArr.slice.call((context || document).getElementsByClassName(cls));
		}) : (function (cls, context) {
			var nodes = [];
			
			if (!cls) {
				return nodes;
			}
			
			var targets = (context || document).getElementsByTagName('*'),
				tokens = cls.split(' '),
				tn = tokens.length;
				
			for (var i = 0, n = targets.length; i < n; i++) {
				
				var targetClass = targets[i].className,
					hasToken = true;
					
				if (!targetClass) {
					continue;
				}
				
				for (var j = tn; j--;) {
					if (!new RegExp('(^|\\s)' + tokens[j] + '(\\s|$)').test(targetClass)) {
						hasToken = false;
						break;
					}
				}
				
				if (hasToken) {
					nodes.push(targets[i]);
				}
			}
			return nodes;
		}),
		addClass: function (element, className) {
			if (element.classList) {
				element.classList.add(className);
			} else {
				element.className += ' ' + className;
			}
		},
		checkClass: function (element, className) {
			var name = element.className;
			var reg = new RegExp(className, 'g');
			return reg.test(name);
		},
		removeClass: function (element, className) {
			if (element.classList) {
				element.classList.remove(className);
			} else {
				var name = element.className;
				var reg = new RegExp('[\\s\\u00A0\\u3000]*' + className + '[\\s\\u00A0\\u3000]*', 'g');
				element.className = name.replace(reg, ' ').replace(/[\s\u00A0\u3000]*$/, '');
			}
		},
		hasClasses: function (elem, className) {
			return elem.className.split(' ').indexOf(className) > -1;
		},
		/**
		 * Get Text Node
		 * @param {node} : element name
		 **/
		getTextNode: function (elem) {
			var textNode = _cDoc.createTextNode(elem);
			return textNode;
		},
		/**
		 * Get Object Rectangle Size
		 * @param {scope} : element
		 **/
		getRectangle: function (scope) {
			return {
				'offset_left': $(scope).offset().left || 0,
				'offset_top': $(scope).offset().top || 0,
				'position_left': $(scope).position().left || 0,
				'position_top': $(scope).position().top || 0,
				'width': $(scope).width() || 0,
				'height': $(scope).height() || 0
			};
		},
		getBasenamebyID: function (id) {
			return document.getElementById(id).value.split(/(\\|\/)/g).pop();
		},
		appendElement: function (id, type, callback) {
			var ul = document.getElementById(id);
			var li = document.createElement(type);
			
			if ($.core.Validate.isFunc(callback)) {
				callback(li);
			}
			
			ul.appendChild(li);
		},
		appendText: function (id, txt, callback) {
			this.appendElement(id, 'a', function (attr) {
				if ($.core.Validate.isFunc(callback)) {
					callback(attr);
				}
				
				attr.appendChild(document.createTextNode(txt));
			});
		},
		appendDiv: function (dom, cls) {
			if ($.core.Validate.isObject(dom)) {
				dom = dom.id || dom.className;
			}
			
			if (dom.match(/^#(.*)/)) {
				dom = $.core.Element.getById(dom);
			} else if (dom.match(/^\.(.*)$/)) {
				dom = dom.replace(/(^.)/i, "");
				dom = $.core.Element.getByClass(document, dom, dom);
			} else if (!$.core.Validate.isObject(dom)) {
				dom = $.core.Element.getById(dom);
			}
			
			if ($(dom).length > 0) {
				var append = this.create('div');
				append.className = cls;
				dom.appendChild(append);
				return append;
			} else {
				return false;
			}
		},
		appendDivId: function (dom, cls) {
			if ($.core.Validate.isObject(dom)) {
				dom = dom.id || dom.className;
			}
			
			if (dom.match(/^#(.*)/)) {
				dom = $.core.Element.getById(dom);
			} else if (dom.match(/^\.(.*)$/)) {
				dom = dom.replace(/(^.)/i, "");
				dom = $.core.Element.getByClass(document, dom, dom);
			} else if (!$.core.Validate.isObject(dom)) {
				dom = $.core.Element.getById(dom);
			}
			
			if ($(dom).length > 0) {
				var append = this.create('div');
				append.setAttribute("id", cls);
				dom.appendChild(append);
				return append;
			} else {
				return false;
			}
		},
		addDivOnBody: function (cls) {
			var docFrag = this.createFragment();
			var container = this.create('div');
			
			container.className = cls;
			docFrag.appendChild(container);
			document.body.appendChild(docFrag);
			
			return container;
		},
		getObjectType: function (target) {
			try {
				switch (typeof target) {
				case "undefined":
					return null;
				case "object":
					return target;
				default:
					return document.getElementById(target)
				}
			} catch (e) {
				return null;
			}
		},
		getWithNumberKeyCode: function (keyCode) {
			if ((keyCode > 47 && keyCode < 58) || (keyCode > 95 && keyCode < 106) || keyCode == 46 || keyCode == 39 || keyCode == 37 || keyCode == 9 || keyCode == 8) {
				return true;
			}
			
			return false;
		},
		getKeyCodeType: function (keyCode) {
			//48 ~ 57
			if (keycode > 47 && keycode < 58) {
				return 'NUM';
			//65 ~ 90
			} else if (keycode > 64 && keycode < 91) {
				return 'ALPHABET_LOWER';
			//96 ~ 105
			} else if (keycode > 95 && keycode < 106) {
				return 'KEYPAD_NUM';
			//112 ~ 123
			} else if (keycode > 111 && keycode < 124) {
				return 'FNKEY';
			}
		},
		getKeyDownCode: function (keyCode) {
			return keydownKeycode[keyCode];
		},
		forceChange: function ($element, $content) {
			$($element).text($content);
			if ($($element).text() == $content) {
				return true;
			}
			
			$($element).html($content);
			if ($($element).html() == $content) {
				return true;
			}
			
			$($element).val($content);
			if ($($element).val() == $content) {
				return true;
			}
			
			return false;
		},
		removeAttr: function (element, attributes) {
			for (var attr in attributes) {
				if (attributes.hasOwnProperty(attr)) {
					continue;
				}
				
				element.removeAttribute(attr, attributes[attr]);
			}
		},
		setAttrs: function (element, attributes) {
			for (var attr in attributes) {
				if (!attributes.hasOwnProperty(attr)) {
					continue;
				}
				
				element.setAttribute(attr, attributes[attr]);
			}
		},
		/**
		 * Get inner width in document
		 *
		 * @return <Integer>
		 **/
		getInnerWidth: function () {
			if (document.compatMode == 'CSS1Compat' && document.documentElement && document.documentElement.clientWidth) {
				return document.documentElement.clientWidth;
			} else if (document.documentElement && document.documentElement.clientWidth) {
				return document.documentElement.clientWidth;
			} else if (document.body && document.body.clientWidth) {
				return document.body.clientWidth;
			} else if (typeof (_cWin.innerWidth) != "undefined") {
				$.core.Base.resetWinCache();
				return _cWin.innerWidth;
			} else {
				return screen.width;
			}
		},
		/**
		 * Get inner height in document
		 *
		 * @return <Integer>
		 **/
		getInnerHeight: function () {
			if (document.documentElement && document.documentElement.clientHeight) {
				return document.documentElement.clientHeight;
			} else if (document.body && document.body.clientHeight) {
				return document.body.clientHeight;
			} else if (typeof (_cWin.innerHeight) != "undefined") {
				$.core.Base.resetWinCache();
				return _cWin.innerHeight;
			} else {
				return screen.height;
			}
		},
		getScrollTop: function () {
			if (typeof (_cWin.pageYOffset) != "undefined") {
				$.core.Base.resetWinCache();
				return _cWin.pageYOffset;
			} else if (document.documentElement) {
				return document.documentElement.scrollTop;
			} else if (document.body) {
				return document.body.scrollTop;
			}
		},
		getScrollLeft: function () {
			if (document.documentElement) {
				return document.documentElement.scrollLeft;
			} else if (document.body) {
				return document.body.scrollLeft;
			}
		},
		getWidth: function (element) {
			return $(element).width();
		},
		getHeight: function (element) {
			return $(element).height();
		},
		getOffset: function (element) {
			var o;
			
			var offset = {
				"left": element.offsetLeft,
				"top": element.offsetTop
			};
			
			while (o = element.offsetParent) {
				offset.left += o.offsetLeft;
				offset.top += o.offsetTop;
			}
			
			return offset;
		},
		getImgPosition: function (element) {
			if (!element) {
				return {
					"realOffset": 0,
					"correctOffset": 0
				};
			}
			
			var offset = this.getOffset(element);
			var real = parseInt(offset.top, 10);
			var currect = parseInt(real - defScreenHeight * 0.1);
			
			return {
				"realOffset": real,
				"correctOffset": currect
			};
		},
		getLeft: function (element) {
			return $(element).offset().left;
		},
		getTop: function (element) {
			return $(element).offset().top;
		},
		getByTag: function (tag) {
			return document.getElementsByTagName(tag);
		},
		getById: function (id) {
			if (typeof (id) != 'string') {
				return id;
			}
			
			var elem = null;
			
			try {
				elem = document.getElementById(id);
			} catch (e) {
				console.log(e);
			}
			
			return elem;
		},
		getinnerHTML: function (element) {
			return element.innerHTML;
		},
		getByClass: function (elem, tagName, className) {
			var cls = this.getByClasses(tagName);
			this.length = cls.length;
			
			for (var i = 0; i < this.length; i++) {
				if ((new RegExp(className)).test(cls[i].className)) {
					return cls[i];
				}
			}
			
			return null;
		},
		getByClasses: function (cls, elem) {
			var elem = elem || document;
			return elem.getElementsByClassName(cls);
		},
		getClassCount: function (cls) {
			return this.getByClasses(cls).length;
		},
		setAllInnerHTMLbyClass: function (cls, html) {
			var _target = this.getByClasses(cls);
			var _length = this.getClassCount(cls);
			
			for (var i = 0; i < _length; i++) {
				_target[i].innerHTML = html;
			}
		},
		setIframeToggleMute: function (id) {
			var browser = document.querySelector(id);
			var request = browser.getMuted();
			
			request.onsuccess = function () {
				if (request.result) {
					browser.unmute();
				} else {
					browser.mute();
				}
			}
		},
		setinnerHTML: function (element, html) {
			element.innerHTML = html;
		},
		isSelectedType: function (type) {
			if ($(this.getSelected()).is(type)) {
				return true;
			}
			
			return false;
		},
		getSelected: function () {
			return document.activeElement;
		},
		createEvent: function (event) {
			var cEvent;
			if (document.createEvent != null) {
				cEvent = document.createEvent(event);
			} else if (document.createEventObject != null) {
				cEvent = document.createEventObject(event);
			}
			
			return cEvent;
		},
		create: function (element) {
			return document.createElement(element);
		},
		createSVGNS: function (tags) {
			return document.createElementNS(SVG_NS, tags);
		},
		createNS: function (attribute, tags) {
			if (attribute) {
				if (tags) {
					return document.createElementNS(attribute, tags);
				} else {
					return document.createElementNS(attribute);
				}
			}
			
			return document.createElementNS || document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
		},
		createFragment: function (element) {
			return document.createDocumentFragment();
		},
		setStyles: function (element, props) {
			var props = props || {};
			
			for (var prop in props) {
				element.style[prop] = props[prop];
			}
		}
	};
})(jQuery, $.core);