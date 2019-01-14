export default class AudioContextObject {
	
	constructor(CanvasID) {
		try {
		this.canvas = document.getElementById(CanvasID);
		} catch(e) {}
		
		this.gl = null;
	}
	
	setViewPortSize (width, height) {
		this.gl.viewport(0, 0, width, height);
	}
	
	isInitialized () {
		if (this.gl == null) {
			return false;
		}
		
		return true;
	}
	
	enableDepthTest () {
		if (this.isInitialized()) {
			this.gl.enable(gl.DEPTH_TEST);
		}
	}
	
	initialize () {
		if (this.isInitialized()) {
			this.gl = initWebGL(canvas);
		}
	}
}