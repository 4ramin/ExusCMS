(function(window, document) {
	
	function setElement(){
		window.video = document.getElementsByTagName('video')[0],
		window.videoControls = document.getElementById('controlBox'),	
		window.play = document.getElementById('play'),

		window.progressInterval,
		window.isVideoFullScreen = false,
		window.isEQOpen = false,
		window.isExtendLyrics = false,
		window.isLyricsShow = false,
		window.isMouseMoved = false,
		window.mouseCapture,
		
		window.videocontainer = document.getElementById("video_container"),
		window.lyrics = document.getElementById("lyrics"),
		window.waveform = document.getElementById("waveform"),
		window.canvas = document.querySelector("canvas"),
		window.audioicon = document.getElementById("audioicon"),
		window.lyricsextend = document.getElementById("lyricsextend"),
		window.eq = document.getElementById("eq"),
		window.title = document.getElementById("title"),
		window.timer = document.getElementById("time"),
		window.progressContainer = document.getElementById("progress"),
		window.progressHolder = document.getElementById("progress_box"),
		window.progressBar = document.getElementById("play_progress"),
		window.loadedBar = document.getElementById("play_loaded"),
		
		window.fullScreenToggleButton = document.getElementById("fullScreen"),
		
		window.ie = (function() {
			var undef,
				v = 3,
				div = document.createElement('div'),
				all = div.getElementsByTagName('i');
			
			while (
				div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
				all[0]
			);
			
			return v > 4 ? v : undef;
			
		}());
	}
	
	var videoPlayer = {
	
		init : function() {
			window.setElement();
			
			if (ie < 9) return;
			
			var that = this;
			
			document.documentElement.className = 'js';
			
			window.video.removeAttribute('controls');
			window.video.addEventListener('loadeddata', this.initializeControls, false);

			this.handleButtonPresses();
			
			window.fullScreenToggleButton.addEventListener("click", function(){
				isVideoFullScreen ? that.fullScreenOff() : that.fullScreenOn();
				setTimeout(function(){ $.core.Lyrics.arrangeLyrics();}, 500);
			}, true);
			
			this.videoScrubbing();
		},
		initializeControls : function() {
			videoPlayer.showHideControls();
		},
		hideControls: function () {
			window.videoControls.style.opacity = 0;
			window.canvas.style.opacity = 0;
			window.title.style.opacity = 0;
			window.audioicon.style.opacity = 0;
			window.waveform.style.opacity = 0;
		},
		showControls: function () {
			window.videoControls.style.opacity = 1;
			window.canvas.style.opacity = 1;
			window.title.style.opacity = 1;
			window.audioicon.style.opacity = 1;
			window.waveform.style.opacity = 1;
			window.isMouseMoved = false;
			videoPlayer.autoHideControls();
		},
		autoHideControls: function () {
			mouseCapture = function() {
				window.isMouseMoved = true;
			};
			
			var x = window;
			if (x.addEventListener) {
				x.addEventListener("mousemove", mouseCapture);
			} else if (x.attachEvent) {
				x.attachEvent("onmousemove", mouseCapture);
			}
			
			setTimeout(function() {
				if (window.isMouseMoved == false) {
					videoPlayer.hideControls();
				}
				
				if (x.removeEventListener) {
				  x.removeEventListener("mousemove", mouseCapture);
				} else if (x.detachEvent) {
				  x.detachEvent("onmousemove", mouseCapture);
				}
				
				window.isMouseMoved = false;
			}, 3000);
		},
		showHideControls : function() {
			window.audioicon.addEventListener('mouseover', function() {
				videoPlayer.showControls();
			}, false);
			
			window.audioicon.addEventListener('mouseout', function() {
				videoPlayer.hideControls();
			}, false);
			
			window.canvas.addEventListener('mouseover', function() {
				videoPlayer.showControls();
			}, false);
			
			window.canvas.addEventListener('mouseout', function() {
				videoPlayer.hideControls();
			}, false);
			
			window.video.addEventListener('mouseover', function() {
				videoPlayer.showControls();
			}, false);
			
			window.video.addEventListener('mouseout', function(e) {
				videoPlayer.hideControls();
			}, false);
			
			window.videoControls.addEventListener('mouseover', function() {
				videoPlayer.showControls();
			}, false);
			
			window.videoControls.addEventListener('mouseout', function() {
				videoPlayer.hideControls();
			}, false);
		},
		fullScreenOn : function() {
			$.core.Screen.requestFullScreen($('.lyrics_display'));
			isVideoFullScreen = true;
			$('.lyrics_display').addClass('lyrics_focus');
			window.video.style.cssText = 'object-fit: contain;z-index:-1;max-height: 100%;image-rendering: -webkit-optimize-contrast;position: fixed; width:' + window.innerWidth + 'px; height: ' + window.innerHeight + 'px;';
			window.video.className = 'fullsizeVideo';
			window.videocontainer.className = 'fullsizeMode';
			window.videoControls.className = 'fs-control';
			window.fullScreenToggleButton.className = "fs-active control";
			document.addEventListener('keydown', this.checkKeyCode, false);
			
			console.log('test');
			
		},
		fullScreenOff : function() {
			$('.lyrics_display').removeClass('lyrics_focus');
			window.isVideoFullScreen = false;
			window.video.style.position = 'static';
			window.video.className = '';
			window.video.style.cssText = '';
			window.videocontainer.className = '';
			window.fullScreenToggleButton.className = "control";
			window.videoControls.className = '';
		},
		toggleLyricsExtend: function() {
			window.isExtendLyrics = (window.isExtendLyrics == false) ? true : false;
			if (isExtendLyrics) {
				window.lyricsextend.innerHTML = "<i class=\"fa fa-angle-double-up\" aria-hidden=\"true\"></i>";
			} else {
				window.lyricsextend.innerHTML = "<i class=\"fa fa-angle-double-down\" aria-hidden=\"true\"></i>";
			}
			
			$(".lyrics_display_expand").toggle("slow", function() {});
			$("#lyrics_display_inner").toggle("slow", function() {});
		},
		toggleLyrics: function() {
			window.isLyricsShow = (window.isLyricsShow == false) ? true : false;
			if (isLyricsShow) {
				window.lyrics.innerHTML = "<i class=\"fa fa-align-justify\" aria-hidden=\"true\"></i>";
			} else {
				window.lyrics.innerHTML = "<i class=\"fa fa fa-align-right\" aria-hidden=\"true\"></i>";
			}
			$(".lyrics_display").toggle("slow", function() {});
		},
		toggleEQ: function() {
			window.isEQOpen = (window.isEQOpen == false) ? true : false;
			if (isEQOpen) {
				window.eq.innerHTML = "<i class=\"fa fa-circle-thin\" aria-hidden=\"true\"></i>";
			} else {
				window.eq.innerHTML = "<i class=\"fa fa fa-adjust\" aria-hidden=\"true\"></i>";
			}
			
			$(".eq").toggle("slow", function() {});
		},
		handleButtonPresses : function() {
			window.audioicon.addEventListener('click', this.playPause, false);
			window.video.addEventListener('click', this.playPause, false);
			window.play.addEventListener('click', this.playPause, false);
			window.lyrics.addEventListener('click', this.toggleLyrics, false);
			window.lyricsextend.addEventListener('click', this.toggleLyricsExtend, false);
			window.eq.addEventListener('click', this.toggleEQ, false);
			
			window.video.addEventListener('play', function() {
				window.play.title = 'Pause';
				window.play.innerHTML = '<span id="pauseButton"><i class="fa fa-pause" aria-hidden="true"></i></span>';
				videoPlayer.trackPlayProgress();				
			}, false);
			
			window.video.addEventListener('pause', function() {
				window.play.title = 'Play';
				window.play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
				videoPlayer.stopTrackingPlayProgress();
			}, false);
			
			window.video.addEventListener('ended', function() {
				this.currentTime = 0;
				this.pause();
			}, false);
		},
		formatTime: function (seconds) {
			minutes = Math.floor(seconds / 60);
			minutes = (minutes >= 10) ? minutes : "0" + minutes;
			seconds = Math.floor(seconds % 60);
			seconds = (seconds >= 10) ? seconds : "0" + seconds;
			return minutes + ":" + seconds;
		},
		playPause: function() {
			if (window.video.paused || window.video.ended) {				
				if (window.video.ended) { 
					window.video.currentTime = 0; 
				}
				
				window.audioicon.className = "playicon";
				window.video.play();
			} else { 
				window.audioicon.className = "pauseicon";
				window.video.pause(); 
			}
		},
		trackPlayProgress : function(){
			(function progressTrack() {
				videoPlayer.updatePlayProgress();
				window.progressInterval = setTimeout(progressTrack, 50);
			 })();
		},
		updatePlayProgress : function(){
			window.timer.innerHTML = "<span style=color:#3d89ff>" + this.formatTime(parseInt(window.video.currentTime)) + "</span> / " + this.formatTime(parseInt(window.video.duration));
			window.progressBar.style.width = ((window.video.currentTime / window.video.duration) * (window.progressHolder.offsetWidth)) + "px";
			
			var r = window.video.buffered;
			var total = window.video.duration;

			var start = r.start(0);
			var end = r.end(0);
			window.loadedBar.style.width = (end / total) * 100 + "%";
		},
		stopTrackingPlayProgress : function(){
			clearTimeout(window.progressInterval);
		},
		videoScrubbing : function() {
			window.progressHolder.addEventListener("mousedown", function(){
				videoPlayer.stopTrackingPlayProgress();
				videoPlayer.playPause();
			
				document.onmousemove = function(e) {
					videoPlayer.setPlayProgress(e.pageX);
				}
				
				window.progressHolder.onmouseup = function(e) {
					document.onmouseup = null;
					document.onmousemove = null;
										
					window.video.play();
					videoPlayer.setPlayProgress(e.pageX);
					videoPlayer.trackPlayProgress();
				}
			}, true);
		},
		setPlayProgress : function( clickX ) {
			var newPercent = Math.max(0, Math.min(1, (clickX - this.findPosX(window.progressHolder)) / window.progressHolder.offsetWidth) );
			window.video.currentTime = newPercent * window.video.duration;
			window.progressBar.style.width = newPercent * (window.progressHolder.offsetWidth)  + "px";
		},
		findPosX : function(progressHolder) {
			var curleft = progressHolder.offsetLeft;
			while(progressHolder = progressHolder.offsetParent) {
				curleft += progressHolder.offsetLeft;
			}
			return curleft;
		},
		checkKeyCode : function(e) {
			e = e || window.event;
			if ((e.keyCode || e.which) === 27) videoPlayer.fullScreenOff();
		}
	};
	
	window.setElement = (function(){
		setElement();
	});
	
	window.initVideo = function initVideo(){
		$(document).ready(function() {
			videoPlayer.init();
		});
	}
	
})(this, document);