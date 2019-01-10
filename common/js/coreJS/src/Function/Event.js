//Event-related functions
'use strict';

(function ($, core) {

	var A = core.Evt = {
		setResizeHorizontalEvent(minimumSize, target, handler) {
			if (!minimumSize) minimumSize = 0;
			
			$(handler).mousedown(function(e) {
				var eventWhich = $.core.Evt.getMouseEventWhichType(e);
				
				if (eventWhich != 'left') return;
				
				document.body.style.cursor = "n-resize";
				e.preventDefault();
				
				$(document).mousemove(function(e) {
					var offset = $.core.Element.getElementOffsetTop(target);
					var resizedValue = e.pageY - offset;
					if (resizedValue < minimumSize) return;
					$(target).css("height", resizedValue);
				});
			});
			
			$(document).mouseup(function(e){
				document.body.style.cursor = 'default';
				$(document).unbind('mousemove');
			});
		},
		getCallerScriptPath: function () {
			var scriptPath = '';
			
			try {
				throw new Error();
			} catch(e) {
				var stack = e.stack.split('\n');
				var index = 0;
				for (var i in stack) {
					if (!stack[i].match(/http[s]?:\/\//)) continue;
					index = Number(i) + 2;
					break;
				}
			}
			
			return stack;
		},
		getMouseEventWhichType: function (e) {
			var which;
			
			switch(e.which) {
				case 1:
					which = "left";
					break;
				case 2:
					which = "middle";
					break;
				case 3:
					which = "right";
					break;
				default:
					which = "none";
					break;
			}
			
			return which;
		},
		onBackSpaceClick: function (callback) {
			$(document).keydown(function (e) {
				if (e.target.nodeName != "INPUT" && e.target.nodeName != "TEXTAREA") {    
					if (e.keyCode === 8) {
						callback();
					}
				}
			});
		},
		addClickHandler: function (callback, chkRegEx) {
			var links = document.body.getElementsByTagName("A");
			var length = links.length;
			for (var i = 0; i < length; i++) {
				var link = links[i];
				var href = null;
				
				try {
					href = link.href;
				} catch (e) {
					console.log(e);
				}
				
				if (!href) {
					continue;
				} else if (chkRegEx) {
					if (href.match(chkRegEx)) continue;
				}
				
				if (link.attachEvent) {
					link.attachEvent("onclick", this.onClickHandler(event, callback));
				} else { 
					link.addEventListener('click', this.onClickHandler(event, callback), false);
				}
			}
		},
		onClickHandler: function (event, callback) {
			var link = this.getEventSource(event);
			
			while (link && link.tagName != "A") {
				link = link.parentNode;
			}
			
			if (!link) {
				return;
			}
			
			callback(window, {'href':link.href,'title':link.title});
		},
		getEventSource: function (event) {
			try {
				var obj = event.srcElement ? event.srcElement : event.target;
				return obj;
			} finally {
				obj = null;
			}
		},
		iframeOnClick: function (id, callback) {
			document.getElementById(id).contentWindow.document.body.onclick = function () {
				callback();
			};
		},
		normalize: function (event) {
			var eventNormalize = {};
			
			eventNormalize.target = (event.target ? event.target : event.srcElement);
			eventNormalize.which = (event.which ? event.which : event.button);
			
			return eventNormalize;
		},
		isSupport: function (eventName, element) {
			var eventName = 'on' + eventName;
			var isSupported = eventName in element;
			
			return isSupported;
		},
		disableDraggable: function (element) {
			element.draggable = false;
			
			element.onmousedown = function (event) {
				event.preventDefault();
				return false;
			};
		},
		prefixMouseEvent: function (pointerEvent) {
			return _cWin.MSPointerEvent ? 'MSPointer' + pointerEvent.charAt(7).toUpperCase() + pointerEvent.substr(8) : pointerEvent;
		},
		when: function (element, type, fn, condition) {
			var func = function () {
				if (condition()) {
					element.off(type, func);
					fn.apply(this, arguments);
				}
			};
			
			element.on(type, func);
		},
		addNN4EventListener: function (element, event, listener) {
			if (!element.NN4Event) element.NN4Event = {};
			if (!element.NN4Event[event]) element.NN4Event[event] = [];
			
			var event_arr = element.NN4Event[event];
			event_arr[event_arr.length] = listener;
		},
		getNN4Event: function (element, event) {
			if (element.NN4Event && element.NN4Event[event]) {
				var event_arr = element.NN4Event[event];
				this.length = event_arr.length;
				
				for (var i = 0; i < this.length; i++) {
					event_arr[i]();
				}
			}
		},
		addListener: function (element, event, listener) {
			if ($.core.Validate.isNull(element) || $.core.Validate.isUndefined(element) || !$.core.Validate.isObject(element)) {
				return;
			}
			
			// Support: IE 11
			// Standards-based browsers support DOMContentLoaded
			if (element.addEventListener) {
				element.addEventListener(event, listener, false);
			// If IE event model is used
			// Support: IE 9 - 10 only
			} else if (element.attachEvent) {
				element.attachEvent('on' + event, listener);
			} else {
				addNN4EventListener(element, event, listener);
				element['on' + event] = function () {
					getNN4Event(element, event)
				};
			}
		},
		removeEvent: function (element, eventType, fn) {
			if (element.addEventListener) {
				return element.removeEventListener(eventType, fn, false);
			} else if (element.detachEvent) {
				return element.detachEvent("on" + eventType, fn);
			}
		},
		addEventListener: function (element, eventName, handler) {
			if (element.addEventListener) {
				element.addEventListener(eventName, handler);
			} else if (element.attachEvent) {
				element.attachEvent('on' + eventName, function () {
					handler.call(element);
				});
			}
		},
		preventEvent: function (evt) {
			var evt = evt || _cWin.event;
			
			if (evt.preventDefault) {
				evt.preventDefault();
			} else {
				evt.returnValue = false;
				evt.cancelBubble = true;
			}
		},
		onReady: function (doc, callback) {
			var fired = false;
			
			this.addListener(doc, 'DOMContentLoaded', function () {
				if (fired) {
					return;
				}
				
				fired = true;
				callback();
			});
			
			this.addListener(doc, 'readystatechange', function () {
				if (fired) {
					return;
				}
				
				if (doc.readyState === 'complete') {
					fired = true;
					callback();
				}
			});
		},
		addNodeEvent: document.addEventListener ? 
			(function (node, type, handler) {
				node.addEventListener(type, handler, false);
			}) : 
			(function (node, type, handler) {
				node.attachEvent('on' + type, handler);
			}),
		removeNodeEvent: document.removeEventListener ? 
			(function (node, type, handler) {
				node.removeEventListener(type, handler, false);
			}) : 
			(function (node, type, handler) {
				node.detachEvent('on' + type, handler);
			}),
		Trigger: function ($elements, $event, $ignore) {
			if ($ignore === true) {
				$($elements).triggerHandler($event);
			} else {
				$($elements).trigger($event);
			}
		},
		loopCallback: function (start, end, callback) {
			for (i = start; i < end; i++) {
				callback();
			}
		},
		getShortCutKeyType: function (event) {
			if ($.core.Browser.isIE()) {
				event = window.event;
				event.target = event.srcElement;
			}
			
			if (event.altKey || event.ctrlKey || event.metaKey) {
				return;
			}
			
			switch (event.target.nodeName) {
				case "INPUT":
				case "SELECT":
				case "TEXTAREA":
					return;
			}
			
			switch (event.keyCode) {
				//return keydownKeycode[event.keyCode];
			}

		},
		Try: function (fn, err) {
			try {
				fn();
				return true;
			} catch (e) {
				err && err(e);
			}
			
			return false;
		},
		exceptionMsg: function ($exception) {
			var error = '';
			for (var i in $exception) {
				error += i + ' : ' + exception[i] + '\n';
			}
			
			alert(error);
		}
	};
})(jQuery, $.core);