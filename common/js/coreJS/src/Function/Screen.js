//Screen-related functions
'use strict';

(function ($, core) {

	var A = core.Screen = {
		/**
		 * Cancel Full Screen
		 * @param {element}         : element
		 **/
		cancelFullScreen: function (element) {
			if (this.isFullScreen(element)) {
				if (element) {
					try {
						if (element.exitFullscreen) {
							var requestMethod = element.exitFullscreen();
						} else if (element.cancelFullScreen) {
							var requestMethod = element.cancelFullScreen();
						} else if (element.mozCancelFullScreen || this.hasMozNativeFullScreen) {
							var requestMethod = element.mozCancelFullScreen();
						} else if (element.webkitExitFullScreen || element.webkitCancelFullScreen || this.hasWebkitNativeFullScreen) {
							var requestMethod = element.webkitExitFullScreen() || element.webkitCancelFullScreen();
						} else if (element.msExitFullscreen || this.hasMsNativeFullScreen) {
							var requestMethod = element.msExitFullscreen();
						}
					} catch (e) {
						//var requestMethod = element.webkitExitFullScreen || element.cancelFullScreen || element.webkitCancelFullScreen || element.msExitFullscreen || element.mozCancelFullScreen || element.msCancelFullScreen || element.exitFullscreen;
						if (document.exitFullscreen) {
							var requestMethod = document.exitFullscreen();
						} else if (document.mozCancelFullScreen) {
							var requestMethod = document.mozCancelFullScreen();
						} else if (document.webkitCancelFullScreen) {
							var requestMethod = document.webkitCancelFullScreen();
						} else if (document.msExitFullscreen) {
							var requestMethod = document.msExitFullscreen();
						}
					}
				} else {
					if (document.exitFullscreen) {
						var requestMethod = document.exitFullscreen();
					} else if (document.mozCancelFullScreen) {
						var requestMethod = document.mozCancelFullScreen();
					} else if (document.webkitCancelFullScreen) {
						var requestMethod = document.webkitCancelFullScreen();
					} else if (document.msExitFullscreen) {
						var requestMethod = document.msExitFullscreen();
					}
				}
				
				try{
					if (requestMethod) {
						requestMethod.call(element);
					}
				} catch(e) {}
				return false;
			}
		},
		hasPip: function () {
			if (document.pictureInPictureElement) {
				return true;
			}
			
			return false;
		},
		setPip: function (video) {
			if (!this.hasPip()) {
			video.requestPictureInPicture().catch(function () {
				//error => {
					return false
				});
				
				return true;
			}
		},
		exitPip: function () {
			if (this.hasPip()) {
				document.exitPictureInPicture().catch(function () {
				//error => {
					return false
				});
				
				return true;
			}
		},
		getHTML5Handler: function () {
			var video;
			this.length = html5Elements.length;
			for (i = 0; i < this.length; i++) {
				video = $.core.Element.create(html5Elements[i]);
			}
			return video;
		},
		hasTrueNativeFullScreen: function () {
			video = this.getHTML5Handler();
			if (typeof video.msRequestFullscreen !== 'undefined') {
				return true;
			}
			return false;
		},
		hasMsNativeFullScreen: function () {
			video = this.getHTML5Handler();
			if (typeof video.webkitRequestFullScreen !== 'undefined' || typeof video.mozRequestFullScreen !== 'undefined' || typeof video.msRequestFullscreen !== 'undefined') {
				return true;
			}
			return false;
		},
		hasMozNativeFullScreen: function () {
			video = this.getHTML5Handler();
			if (typeof video.mozRequestFullScreen !== 'undefined') {
				return true;
			}
			return false;
		},
		hasWebkitNativeFullScreen: function () {
			video = this.getHTML5Handler();
			if (typeof video.webkitRequestFullScreen !== 'undefined') {
				return true;
			}
			return false;
		},
		hasNativeFullscreen: function () {
			video = this.getHTML5Handler();
			if (typeof video.requestFullscreen !== 'undefined') {
				return true;
			}
			return false;
		},
		hasSemiNativeFullScreen: function () {
			video = this.getHTML5Handler();
			if (typeof video.webkitEnterFullscreen !== 'undefined') {
				return true;
			}
			return false;
		},
		/**
		 * Request Full Screen
		 * @param {element}         : element
		 **/
		requestFullScreen: function (element) {
			if (!this.isFullScreen(element)) {
				try {
					if (element.requestFullscreen) {
						var requestMethod = element.requestFullscreen();
					} else {
						var requestMethod = element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
					}
					
					if (element.mozRequestFullScreen || element.mozRequestFullScreen) {
						var requestMethod = element.mozRequestFullScreen();
					} else if (element.webkitRequestFullScreen || this.hasWebkitNativeFullScreen) {
						var requestMethod = element.webkitRequestFullScreen();
					} else if (element.mozRequestFullScreen || this.hasMozNativeFullScreen) {
						var requestMethod = element.mozRequestFullScreen();
					} else if (element.msRequestFullscreen || this.hasMsNativeFullScreen) {
						var requestMethod = element.msRequestFullscreen();
					} else {
						var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) || element.mozRequestFullScreen || element.msRequestFullScreen;
					}
				} catch(e) {
					console.log(e);
				}
				
				if (requestMethod) {
					requestMethod.call(element);
				}
				return false;
			}
		},
		/**
		 * Toggle Full Screen
		 * @param {element}         : element
		 **/
		toggleFullScreen: function (element) {
			if (this.isFullScreen(element)) {
				return this.cancelFullScreen(element);
			} else {
				return this.requestFullScreen(element);
			}
			return false;
		},
		
		getScreenColorDepth: function () {
			return window.screen.colorDepth;
		},
		/**
		 * Check Browser Support Full Screen
		 * @param {element}     : element
		 **/
		isFullScreen: function (element) {
			$.core.Base.resetWinCache();
			if (element) {
				if (this.hasMozNativeFullScreen) {
					var isFull = element.mozFullScreen;
				} else if (this.hasWebkitNativeFullScreen) {
					var isFull = element.webkitIsFullScreen;
				} else if (this.hasMsNativeFullScreen) {
					var isFull = element.msFullscreenElement;
				} else {
					var isFull = element.fullscreenElement || element.mozFullScreenElement || element.webkitFullscreenElement || element.msFullscreenElement;
				}
			} else {
				var isFull = document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement;
			}
			
			if (isFull || Math.abs(screen.width - _cWin.innerWidth) < 10) {
				return true;
			}
			return false;
		}
	}
})(jQuery, $.core);