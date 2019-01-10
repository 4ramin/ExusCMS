'use strict';

(function ($, core) {
	var A = core.dragDrop = {}
	
	A.Resize = {
		/**
		 * Event on Mouse UP
		 *
		 * @param <Event> {event} : event
		 *
		 * @return void
		 **/
		mouseUpEvent: function (event) {
			if (resizeHandler.obj) {
				event.preventDefault();
				document.body.style.cursor = '';
				jQuery(document).off('mouseup', this.mouseUpEvent);
				resizeHandler.obj = null;
			}
		},
		/**
		 * Change Mouse Cursor to Resizable Icon on Resize
		 *
		 * @return void
		 **/
		resizeStart: function () {
			document.body.style.cursor = 'se-resize';
		},
		/**
		 * Event on Resize
		 *
		 * @param <Object>   {obj}         : Object
		 * @param <Clousure> {resizeStart} : Event on Resize Start
		 * @param <Clousure> {resizeDo}    : Event on Resize Do
		 * @param <Clousure> {resizeEnd}   : Event on Resize End
		 *
		 * @return void
		 **/
		resizeEvent: function (obj, resizeStart, resizeDo, resizeEnd) {
			obj.draggable = true;
			obj.dragStart = resizeStart;
			obj.drag = resizeDo;
			obj.dragEnd = resizeEnd;
			
			if (!resizeHandler.isDrag) {
				jQuery(document).on('mousemove', this.resizeDragMouseMove);
			}
		},
		/**
		 * Event on Resize Do
		 *
		 * @param <Object> {obj} : Object
		 *
		 * @return void
		 **/
		resizeDo: function (obj) {
			var target = jQuery(obj);
			
			var nx = obj.xDPX;
			var ny = obj.xDPY;
			
			var pallet = $.core.Element.getById(self.target.pallet);
			var palletWidth = $.core.dragDrop.Resize.width(pallet);
			var palletLeft = $.core.Element.getPosition(pallet, 'left');
			
			var objLeft = $.core.Element.getPosition(obj.parentNode, 'left');
			var objTop = $.core.Element.getPosition(obj.parentNode, 'top');
			var fullWidth = palletLeft + palletWidth;
			
			var pWidth = $.core.dragDrop.Resize.width(obj.parentNode);
			
			if (target.hasClass((self.target.target))) {
				if (nx > fullWidth) nx = fullWidth;
				
				var new_width = nx  - objLeft;
				var new_height = ny - objTop;
				
				if (fullWidth < objLeft + new_width) new_width = fullWidth - objLeft;
				
				$.core.dragDrop.Resize.width(new_width, obj.parentNode);
				$.core.dragDrop.Resize.height(new_height, obj.parentNode);
			}

		},
		resizeEnd: function () {
		},
		/**
		 * Event on Drag Mouse Move
		 *
		 * @param <Event> {event} : Event
		 *
		 * @return void
		 **/
		resizeDragMouseMove: function (event) {
			if (resizeHandler.obj) {
				event.preventDefault();

				var obj = resizeHandler.obj;
				var dx = event.pageX - obj.xDPX;
				var dy = event.pageY - obj.xDPY;

				obj.xDPX = event.pageX;
				obj.xDPY = event.pageY;

				if (obj.drag) {
					obj.drag(obj, dx, dy);
				}
			}
		},
		/**
		 * Event on Mouse Down
		 *
		 * @param <Event> {event} : Event
		 *
		 * @return void
		 **/
		mouseDownEvent: function (event) {
			var obj = event.target;

			while(obj && !obj.draggable) {
				obj = this.Element.getParent(obj, true);
			}
			
			if (obj) {
				event.preventDefault();
				obj.xDPX = event.pageX;
				obj.xDPY = event.pageY;
				resizeHandler.obj = obj;
				$(document).on('mouseup', this.mouseUpEvent);
				if (obj.dragStart) {
					obj.dragStart(obj, event.pageX, event.pageY);
				}
			}
		},
		/**
		 * Start Resize Event
		 *
		 * @param <Event>    {event}  : event
		 * @param <Clousure> {target} : target
		 * @param <Clousure> {pallet} : pallet
		 *
		 * @return void;
		 **/
		startEvent: function (event, target, pallet) {
			self.target = {};
			self.target.target = target;
			self.target.pallet = pallet;
			this.vss = event.target;
			if (!this.vss) {
				return;
			}
			
			this.resizeEvent(this.vss, this.resizeStart, this.resizeDo, this.resizeEnd);
			this.mouseDownEvent(event);
			return;
		},
		position: function (size, id, type) {
			elem = $.core.Element.getById(id);
			if (!elem) return;
			
			if (size < 0) {
				size = 0;
			}
			
			size = Math.round(size);
			
			this.style = elem.style;
			this.isSizeDefined = (type == 'left') ? 
				!$.core.Validate.isStr(elem.style.left) : 
				!$.core.Validate.isUndefined(elem.style.top);
			this.isPixelSizeDefined = (type == 'width') ? 
				!$.core.Validate.isUndefined(elem.style.pixelLeft) : 
				!$.core.Validate.isUndefined(elem.style.pixelTop);
			
			if (!$.core.Validate.isUndefined(this.style) && this.isSizeDefined) {
				if (type == 'left') {
					elem.style.left = size + 'px';
				} else {
					elem.style.top = size + 'px';
				}
			} else if (!$.core.Validate.isUndefined(this.style) && this.isPixelSizeDefined) {
				if (type == 'left') {
					elem.style.pixelLeft = size;
				} else {
					elem.style.pixelTop = size;
				}
			}
			return size;
		},
		/**
		 * Resize to specify size
		 *
		 * @param <String>  {id}   : element id
		 * @param <Integer> {size} : size
		 * @param <String>  {type} : resize target
		 *
		 * @return <int> size
		 **/
		size: function (size, id, type) {
			elem = $.core.Element.getById(id);
			if (!elem) return;
			
			if (size < 0) {
				size = 0;
			}
			
			size = Math.round(size);
			
			this.style = $.core.Validate.isUndefined(elem.style) ? null : elem.style;
			this.tagName = elem.tagName.toLowerCase();
			this.isSizeDefined = (type == 'width') ? 
				!$.core.Validate.isUndefined(elem.offsetWidth) && !$.core.Validate.isUndefined(elem.style.width) : 
				!$.core.Validate.isUndefined(elem.offsetHeight) && !$.core.Validate.isUndefined(elem.style.height);
			this.isPixelSizeDefined = (type == 'width') ? 
				!$.core.Validate.isUndefined(elem.style.pixelWidth) : 
				!$.core.Validate.isUndefined(elem.style.pixelHeight);
			
			if (elem == document || this.tagName == 'html' || this.tagName == 'body') {
				size = (type == 'width') ? $.core.Element.getInnerWidth : $.core.Element.getInnerHeight;
			} else if (!$.core.Validate.isUndefined(this.style) && this.isSizeDefined) {
				if (type == 'width') {
					elem.style.width = size + 'px';
				} else {
					elem.style.height = size + 'px';
				}
				size = elem.offsetWidth
			} else if (!$.core.Validate.isUndefined(this.style) && this.isPixelSizeDefined) {
				if (type == 'width') {
					elem.style.pixelWidth = size;
					size = elem.style.pixelWidth;
				} else {
					elem.style.pixelHeight = size;
					size = elem.style.pixelHeight;
				}
			}
			
			return size;
		},
		/**
		 * Resize Object to specify width
		 *
		 * @param {id} : element id
		 * @param {size} : size
		 *
		 * @return <int> size
		 **/
		width: function (size, id) {
			return this.size(size, id, 'width');
		},
		/**
		 * Resize Object to specify height
		 *
		 * @param {id} : element id
		 * @param {size} : size
		 *
		 * @return <int> size
		 **/
		height: function (size, id) {
			return this.size(size, id, 'height');
		},
		/**
		 * Resize Object to specify top
		 *
		 * @param {id} : element id
		 * @param {size} : size
		 *
		 * @return <int> size
		 **/
		top: function (size, id) {
			return this.position(size, id, 'top');
		},
		/**
		 * Resize Object to specify left
		 *
		 * @param {id} : element id
		 * @param {size} : size
		 *
		 * @return <int> size
		 **/
		left: function (size, id) {
			return this.position(size, id, 'left');
		}
	}
	
	A.Reorder = {
		onDragStart: function (evt, callback) {
			self.$.core.dragDrop.Reorder.Handler = evt.target;
			evt.dataTransfer.effectAllowed = 'move';
			evt.dataTransfer.setData('Text', elem.textContent);
			callback();
		},
		onDragEnd: function (evt, callback) {
			evt.preventDefault();
			callback();
		},
		onDragOver: function (evt) {
			evt.preventDefault();
			evt.dataTransfer.dropEffect = 'move';
			this.handler = self.$.core.dragDrop.Reorder.Handler;
			var target = evt.target;
			
			if (target && target !== this.handler && target.nodeName == 'LI') {
				rootEl.insertBefore(this.handler, target.nextSibling || target);
			}
		}
	}
})(jQuery, $.core);