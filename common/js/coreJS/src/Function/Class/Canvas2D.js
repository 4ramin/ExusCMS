export default class OPenGLObject {
	
	constructor(CanvasID) {
		try {
		this.canvas = document.getElementById(CanvasID);
		} catch(e) {}
		
		this.context = null;
	}
	
	initialize () {
		this.context = this.canvas.getContext("2d");
	}
	
	setFontFamily (font) {
		this.context.font = font;
	}
	
	setFillStyle (style) {
		this.context.fillStyle = style;
	}
	
	setFillText (text, x, y) {
		this.context.fillText(text, x, y);
	}
	
	getImage (URL) {
		return $.core.Element.preloadImage(URL);
	}
	
	fillRect (x, y, width, height) {
		this.canvas.fillRect(x, y, width, height);
	}
	
	drawImage (img, sx, sy, swidth, sheight, x, y, width, height) {
		this.canvas.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
	}
	
	
}