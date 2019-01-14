//Canvas-related functions
import OpenGLObject from './CLass/OpenGLObject.js'
'use strict';

(function ($, core) {

	var A = core.Canvas = {
		drawImage: function (ctx, image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
			ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
		},
		getImageContext: function () {
			var img = new Image();
			
			return img;
		},
		gradientAddColorStop: function (gradient, offset, color) {
			gradient.addColorStop(offset, color);
		},
		getImageData: function (ctx, sx, sy, sw, sh) {
			var imagedata = ctx.getImageData(sx, sy, sw, sh);
			
			return imagedata;
		},
		fillText: function (ctx, font, text, x, y) {
			ctx.font = font;
			ctx.fillText(text, x, y);
		},
		createLinearGradient: function (ctx, x0, y0, x1, y1) {
			var gradient = ctx.createLinearGradient(x0, y0, x1, y1);
			
			return gradient;
		},
		createRadialGradient: function (ctx, x0, y0, r0, x1, y1, r1) {
			var gradient = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
			
			return gradient;
		},
		//repeat, repeat-x, repeat-y, no-repeat
		createPattern: function (ctx, image, repetition) {
			if (!repetition) repetition = 'repeat';
			var pattern = ctx.createPattern(img, repetition);
			
			return pattern;
		},
		createImageData: function (ctx, width, height) {
			var imagedata = ctx.createImageData(width, height);
			
			return imagedata;
		},
		applyLinearGradient: function (ctx, x0, y0, r0, x1, y1, r1, x, y, width, height, startcolor, stopcolor) {
			var gradient = this.createLinearGradient(ctx, image, repetition);
			this.gradientAddColorStop(0, startcolor);
			this.gradientAddColorStop(1, stopcolor);
			ctx.fillStyle = gradient;
			ctx.fillRect(x, y, width, height);
		},
		applyRadialGradient: function (ctx, x0, y0, r0, x1, y1, r1, x, y, width, height, startcolor, stopcolor) {
			var gradient = this.createRadialGradient(ctx, image, repetition);
			this.gradientAddColorStop(0, startcolor);
			this.gradientAddColorStop(1, stopcolor);
			ctx.fillStyle = gradient;
			ctx.fillRect(x, y, width, height);
		},
		applyPattern: function (ctx, image, repetition, x, y, width, height) {
			var pattern = this.createPattern(ctx, image, repetition);
			ctx.fillStyle = pattern;
			ctx.fillRect(x, y, width, height);
		},
		get2DCanvasContext: function (id) {
			var canvas = document.getElementById(id);
			var ctx = canvas.getContext("2d");
			
			return ctx;
		}
	};
	
})(jQuery, $.core);