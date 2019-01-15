export default class OpenGLAttributeObject {
	
	constructor(openGL) {
		this.gl = openGL;
	}
	
	COMPILE_STATUS () {
		return this.gl.COMPILE_STATUS;
	}
	
	//gl.clear
	COLOR_BUFFER_BIT () {
		return this.gl.COLOR_BUFFER_BIT;
	}
	
	//gl.clear
	DEPTH_BUFFER_BIT () {
		return this.gl.DEPTH_BUFFER_BIT;
	}
	
	//gl.depthFunc
	LEQUAL () {
		return this.gl.LEQUAL;
	}
	
	//gl.enable
	DEPTH_TEST () {
		return this.gl.DEPTH_TEST;
	}
	
	//gl.getProgramParameter( ,LINK_STATUS);
	LINK_STATUS () {
		return this.gl.LINK_STATUS;
	}
	
	//gl.bufferData( , ,STATIC_DRAW);
	STATIC_DRAW () {
		return this.gl.STATIC_DRAW;
	}
	
	//gl.bufferData(ARRAY_BUFFER , ,);
	ARRAY_BUFFER () {
		return this.gl.ARRAY_BUFFER;
	}
	
	
	
}