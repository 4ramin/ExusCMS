import OpenGLAttributeObject from './OpenGLAttributeObject.js'

export default class OpenGLObject {
	
	constructor(CanvasID) {
		try {
		this.canvas = document.getElementById(CanvasID);
		} catch(e) {}
		
		this.gl = null;
		this.attribute = null;
	}
	
	getGLObject () {
		return this.gl;
	}
	
	setMatrixUniforms (shaderProgram, scriptID, flatten) {
		var Uniform = this.gl.getUniformLocation(shaderProgram, scriptID);
		this.gl.uniformMatrix4fv(Uniform, false, new Float32Array(flatten));
	}
		
	getShader(shaderId) {
		var theSource = "";
		var shaderScript = document.getElementById(shaderId);
		var currentChild = shaderScript.firstChild;
		var shader;
		
		while(currentChild) {
			if (currentChild.nodeType == currentChild.TEXT_NODE) {
				theSource += currentChild.textContent;
			}
		
			currentChild = currentChild.nextSibling;
		}
		
		if (shaderScript.type == "x-shader/x-fragment") {
			shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
		} else if (shaderScript.type == "x-shader/x-vertex") {
			shader = this.gl.createShader(this.gl.VERTEX_SHADER);
			 // Unknown shader type
		} else {
			return null;
		}
		
		this.gl.shaderSource(shader, theSource);
    
		// Compile the shader program
		this.gl.compileShader(shader);  
		
		// See if it compiled successfully
		if (!this.gl.getShaderParameter(shader, this.attribute.COMPILE_STATUS)) {  
			alert("An error occurred compiling the shaders: " + this.gl.getShaderInfoLog(shader));  
			return null;  
		}
		
		return shader;
	}

	bufferData (mode, data, draw) {
		this.gl.bufferData(mode, data, draw);
	}
	
	bindBuffer (mode, buffer) {
		this.gl.bindBuffer(mode, buffer);
	}
	
	createBuffer () {
		return this.gl.createBuffer();
	}
	
	enableVertexAttribArray (AttribLocation) {
		this.gl.enableVertexAttribArray(AttribLocation);
	}
	
	getAttribLocation (shaderProgram, scriptID) {
		return this.gl.getAttribLocation(shaderProgram, scriptID);
	}
	
	useProgram (shaderProgram) {
		this.gl.useProgram(shaderProgram);
	}
	
	hasInitializedShaderProgramLink (shaderProgram) {
		if (this.gl.getProgramParameter(shaderProgram, this.attribute.LINK_STATUS)) {
			return true;
		}
		
		return false;
	}
	
	linkProgram (shaderProgram) {
		this.gl.linkProgram(shaderProgram);
		
		if (!this.hasInitializedShaderProgramLink(shaderProgram)) {
			return new Exception("Unable to initialize the shader program.");
		}
	}
	
	attachShader (shaderProgram, shader) {
		this.gl.attachShader(shaderProgram, shader);
	}
	
	createProgram () {
		return this.gl.createProgram();
	}
	
	initWebGL () {
		try {
			this.gl = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl")  || this.canvas.getContext("webkit-3d")  || this.canvas.getContext("moz-webgl");
			
			this.attribute = new OpenGLAttributeObject(this.gl);
		} catch (e) {}
	}
	
	setViewPortSize (width, height) {
		this.gl.viewport(0, 0, width, height);
	}
	
	/*set Clear Color of OpenGL
	 *
	 * opacity (max 1.0) : set Opacity
	 *
	 */
	setClearColor (r, g, b, opacity) {
		this.gl.clearColor(r, g, b, opacity);
	}
	
	setClear (mode) {
		this.gl.clear(mode);
	}
	
	setEnable (mode) {
		this.gl.enable(mode);
	}
	
	setDepthFunc (func) {
		this.gl.depthFunc(func);
	}
	
	isInitialized () {
		if (this.gl == null) {
			return false;
		}
		
		return true;
	}
	
	initialize () {
		if (!this.isInitialized()) {
			this.initWebGL();
		}
	}
	
}