//Lyrics-related functions
'use strict';

(function ($, core) {

	var A = core.Lyrics = {
		setLyricsMoveEvent: function() {
			$('.lyrics_display > div').mousedown(function(e) {
				var eventWhich = $.core.Evt.getMouseEventWhichType(e);
				
				if (eventWhich != 'left') return;
				
				/*****************
				 * Get X Position*
				 *****************/
					 
				// Get audio container height
				var width = $('#video_container').height();
				
				// Get audio container top in window object
				var offset = $.core.Element.getElementOffsetLeft('#video_container');
				
				// Set mouseX position in audio context
				var mousePosition = (parseInt($('.lyrics_display > div:visible').first().css('left'))) - (-(offset - e.pageX));
				A.config.dump.mousePositionY = mousePosition;
				
				/*****************
				 * Get Y Position*
				 *****************/
					 
				// Get audio container height
				var height = $('#video_container').height();
				
				// Get audio container top in window object
				var offset = $.core.Element.getElementOffsetTop('#video_container');
				
				// Get css bottom attibute in first lyrics element
				var firstItemBottom = parseInt($('.lyrics_display > div:visible').first().css('bottom'));
				
				// Get css last attibute in first lyrics element
				var lastItemBottom = parseInt($('.lyrics_display > div:visible').last().css('bottom'));
				
				// Get inner box size of lyrics container
				var lyricsInnerBoxSize = firstItemBottom - lastItemBottom;
				
				// Set mouseY position in audio context
				var mousePosition = (parseInt($('.lyrics_display > div:visible').first().css('bottom'))) - (height - (-(offset - e.pageY)));
				A.config.dump.mousePositionX = mousePosition - lyricsInnerBoxSize;
				
				// set grabbing cursor
				document.body.style.cursor = "grabbing";
				
				e.preventDefault();
				
				$(document).mousemove(function(e) {
					
					/*****************
					 * Get X Position*
					 *****************/
					 
					// Get audio container width
					var width = $('#video_container').width();
					
					// Get audio container left in window object
					var offset = $.core.Element.getElementOffsetLeft('#video_container');
					
					var diffOffset = ((width - (-(offset - e.pageX))));
					
					var marginY = ((width >> 1) > diffOffset) ? (width >> 1) - diffOffset : -(diffOffset - (width >> 1));
					
					// Arrange primary lyrics X position
					A.config.settings.lyrics_Xmargin = marginY;
					
					/*****************
					 * Get Y Position*
					 *****************/
					 
					// Get audio container height
					var height = $('#video_container').height();
					
					// Get audio container top in window object
					var offset = $.core.Element.getElementOffsetTop('#video_container');
					
					// Get pageY position of audio container
					var diffOffset = -((height - (-(offset - e.pageY))) - (A.config.settings.lyrics_top_position * 2) - 19);
					
					// Not allow  resize to less than container size
					if (-(diffOffset - 100) > height) return;
					
					// Not allow  resize to less than container bottom
					if (diffOffset > 50) return;
					
					// Arrange primary lyrics Y position
					A.config.settings.lyrics_margin = diffOffset;
					
					$.core.Lyrics.arrangeLyrics('user');
				});
				
				$(document).mouseup(function(e) {
					document.body.style.cursor = "default";
					$(document).unbind('mousemove');
				});
			});
		},
		setResizable: function () {
			$.core.Evt.setResizeHorizontalEvent(70, '.lyrics_display_expand', '#resizable');
			$.core.Lyrics.setLyricsMoveEvent();
		},
		isValidLyricsData: function (lyrics) {
			if (lyrics == null) return;
			var lyricsData = lyrics.match(/<div(.*)ms=(\d{1,2})(.*)timestamp=(\d{1,4})/);
			if (lyricsData.length > 0) return true;
		},
		getUserVolume: function () {
			try {
				var volume = $.core.Storage.getItem('volume');
				audioElement.volume = parseFloat(volume),
				audioElement.onvolumechange = function () {
					$.core.Storage.setItem('volume', $("video")[0].volume);
				}
			}catch(e) {}
		},
		getAudioLyrics: function (srl) {
			$.core.Request.ajax("POST", "index.php", {
				[core_flower.def_mid]: core_flower.mid,
				srl: srl,
				act: "getAudiolyrics"
			}, 'completeLyrics', "json", "가사를 요청중입니다");
		},
		setLyricsContainer: function () {
			// Append lyrics container
			if ($('.lyrics_display').length === 0) {
				$.core.Element.appendDiv('video_container', 'lyrics_display');
				$.core.Element.appendDivId('video_container', 'lyrics_display_inner');
				$.core.Element.appendDiv('lyrics_display_inner', 'lyrics_display_expand');
				$('#lyrics_display_inner').hide();
			}
			
			$.core.Lyrics.Equalizer.makeEffect();
		},
		getLyricsData: function (srl) {
			A.config.dump.audioElement = $("video")[0];
			
			// Set Volume to User Preset Volume
			if ($.core.Storage.isSupport) {
				var audioElement = $("video")[0];
				if ($("video").length > 0) {
					this.getUserVolume();
				}
			}
			
			this.setLyricsContainer();
			this.getAudioLyrics(srl);
		},
		removeFocusReadedLyrics: function () {
			// If has temp timestamp
			if (typeof A.config.dump.lyrics_temp_time !== 'undefined') {
				$('.lyrics_display_expand [' + A.config.settings.timestamp + '="' + A.config.dump.lyrics_temp_time + '"]').removeClass('focus_lyrics');
				$('.' + A.config.settings.lyrics_box + '[' + A.config.settings.timestamp + '="' + A.config.dump.lyrics_temp_time + '"]').css("display", "none");
			}
		},
		setEventListener: function () {
			// Start event when click the extended lyrics container
			$('.lyrics_display_expand').click(function(e) {
				
				// Hide primary lyrics
				$(".lyrics_display > div").css("display", "none");
				
				// If Item node is div
				if ($(e.target).is('div')) {
					// Remove focus lyrics in extended lyrics container
					$.core.Lyrics.removeFocusReadedLyrics();
					
					// Get a timestamp
					var timestamp = $(e.target).attr(A.config.settings.timestamp);
					
					// Audio Seek to timestamp
					A.config.dump.audioElement.currentTime = timestamp;
					
					// Add Focus Class to Clicked Item
					$('.lyrics_display_expand [' + A.config.settings.timestamp + '="' + timestamp + '"]').addClass('focus_lyrics');
					A.config.dump.lyrics_temp_time = timestamp;
				}
			});
			
			A.config.dump.unique_s = $.map($(".lyrics_display > div"), function (e) {
				return $(e).attr("timestamp")
			}).filter(function (e, t, s) {
				return s.indexOf(e) === t
			}), A.config.dump.bool_change = false, A.config.dump.audioElement.addEventListener("timeupdate", function () {
				A.Display.dispLyrics()
			}), A.config.dump.audioElement.addEventListener("play", function () {
				A.config.dump.bool_change = true, A.Display.dispLyrics()
			});
		},
		arrangeLyrics: function (type) {
			var $i = 0;
			var $z = 0;
			var isFirst = true;
	
			// Arrange lyrics css position
			$(".lyrics_display > div").each(function(i, item) {
				if ($(item).css('display') == 'block') {
					if (isFirst) {
						$i = (($i + ($(item).height() + (A.config.settings.lyrics_top_position)) - A.config.settings.lyrics_margin) + A.config.dump.mousePositionX);
						isFirst = false;
					} else {
						$i = $i + $(item).height() + 30;
					}
					
					var width = ($('#video_container').width() >> 1) + A.config.settings.lyrics_Xmargin + A.config.dump.mousePositionY;
					
					// Arrange lyrics left
					if (type == 'user') {
						$(item).css('left', width);
					} else {
						$(item).animate({left: width}, 10, "easeOutBounce");
					}
				}
			});
			
			$(".lyrics_display > div").each(function(i, item) {
				if ($(item).css('display') == 'block') {
					
					// Arrange lyrics bottom
					if (type == 'user') {
						$(item).css('bottom', $i);
					} else {
						$(item).animate({bottom: $i}, 100, "easeOutBounce");
					}
					
					$i = $i - ($(item).height() + 30);
				}
			});
		}
	};
	
	A.Eqaulizer = core.Lyrics.Equalizer = {
		setPanValue: function (location) {
			switch(location) {
				case "left":
					A.config.components.pannode.value = -1;
					break;
				case "center":
					A.config.components.pannode.value = 0;
					break;
				case "right":
					A.config.components.pannode.value = 1;
					break;
			}
		},
		setEqualizerAttribute: function (range, type, value) {
			switch (type) {
				case "gain":
					A.config.vr_eq.section[range]['gain'].gain.value = value;
					break;
				case "detune":
					A.config.vr_eq.section[range]['band'].detune.value = value;
					break;
				case "frequency":
					A.config.vr_eq.section[range]['band'].frequency.value = value;
					break;
			}
		},
		setPreset: function (p1, p2, p3) {
			// Set Low Equalizer Gain
			this.setEqualizerAttribute('low', 'detune', -1200);
			this.setEqualizerAttribute('low', 'gain', p1);
			$('.eq_p1').val(p1 * 100);

			if ($.core.Storage.isSupport) {
				$.core.Storage.setItem('low_gain', p1);
			}
			
			// Set Mid Equalizer Gain
			this.setEqualizerAttribute('mid', 'gain', p2);
			$('.eq_p2').val(p2 * 100);
			
			if ($.core.Storage.isSupport) {
				$.core.Storage.setItem('mid_gain', p2);
			}
			
			// Set High Equalizer Gain
			this.setEqualizerAttribute('high', 'gain', p3);
			$('.eq_p3').val(p3 * 100);
			
			if ($.core.Storage.isSupport) {
				$.core.Storage.setItem('high_gain', p3);
			}
		},
		changeFreq: function (string, type) {
			this.setEqualizerAttribute(type, 'frequency', parseFloat(string));
		},
		changeGain: function (string, type) {
			if ($.core.Storage.isSupport) {
				$.core.Storage.setItem(type + '_gain', (parseFloat(string) / 100.0));
			}
			
			this.setEqualizerAttribute(type, 'gain', (parseFloat(string) / 100.0));
		},
		closeEffect: function () {
			if (A.config.components.context) {
				$('video').each(function() {
					this.remove();
				});
			}
		},
		drawBuffer: function(width, height, context, buffer) {
			var data = buffer.getChannelData(0);
			var step = Math.ceil(data.length / width);
			var amp = height / 2;
			for (var i=0; i < width; i++) {
				var min = 1.0;
				var max = -1.0;
				
				for (var j=0; j<step; j++) {
					var datum = data[(i*step) + j];
					if (datum < min) {
						min = datum;
					}
					
					if (datum > max) {
						max = datum;
					}
				}
				
				//context.shadowBlur = 20;
				//context.shadowColor = "black";
				context.globalAlpha = 0.9;
				context.fillStyle = '#ffffff';
				context.fillRect(i * 2, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
			}
		},
		getAudioBuffer: function () {
			var audioContext = new AudioContext();
			
			var audioRequest = new XMLHttpRequest();
			audioRequest.open("GET", A.config.dump.audioElement.currentSrc, true);
			audioRequest.responseType = "arraybuffer";
			audioRequest.onload = function() {
				audioContext.decodeAudioData(audioRequest.response, 
					function(buffer) {
						var canvas = document.getElementById("waveform");
						$.core.Lyrics.Equalizer.drawBuffer(canvas.width, canvas.height, canvas.getContext('2d'), buffer); 
					}
				);
			}
			audioRequest.send();
		},
		analyseEqualizer: function (analyser) {
			var canvas = document.querySelector('canvas');
			var ctx = canvas.getContext('2d');
			
			var requestAnimationFrame = $.core.Browser.getAnimationFrame();
			requestAnimationFrame(function() {
				$.core.Lyrics.Equalizer.analyseEqualizer(analyser);
			});
			
			var freqData = new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(freqData);

			var width = canvas.width;
			var height = canvas.height;
			
			ctx.shadowBlur = 20;
			ctx.shadowColor = "black";

			ctx.clearRect(0, 0, width, height);
			ctx.fillStyle = '#173eb5';
			ctx.lineCap = 'round';
			ctx.lineWidth = 10;
			
			var beatc = freqData[2] / 4;
			var beatround = Math.round(beatc);
			
			if (beatround < 10) {
				ctx.globalAlpha = '0.1125';
			} else {
				ctx.globalAlpha = '0.' + beatround;
			}
			
			for (var i = 0; i < freqData.length; i++ ) {
				var magnitude = freqData[i];
				ctx.fillRect(i * 6, height, 3, -magnitude);
			}
		},
		getEqualizerSetting: function () {
			if ($.core.Storage.isSupport) {
				var low_gain = $.core.Storage.getItem('low_gain');
				if (low_gain) {
					this.setEqualizerAttribute('low', 'gain', low_gain);
					$('.eq_p1').val(low_gain * 100);
				}
				
				var mid_gain = $.core.Storage.getItem('mid_gain');
				if (low_gain) {
					this.setEqualizerAttribute('mid', 'gain', mid_gain);
					$('.eq_p2').val(mid_gain * 100);
				}
				
				var high_gain = $.core.Storage.getItem('high_gain');
				if (low_gain) {
					this.setEqualizerAttribute('high', 'gain', high_gain);
					$('.eq_p3').val(high_gain * 100);
				}
			}
		},
		makeEffect: function () {
			try {
				if (A.config.components.context) {
					A.config.components.audionode.disconnect(A.config.components.context);
				}
				
				A.config.components.context = $.core.Audio.getContext();
				if (A.config.components.context) {
					A.config.effect.processor = A.config.components.context.createGain();
					A.config.components.audionode = $.core.Audio.getNode(A.config.components.context, A.config.dump.audioElement);
					
					var analyser = A.config.components.context.createAnalyser();
					A.config.components.audionode.connect(analyser);
					analyser.connect(A.config.components.context.destination);
					
					//this.analyseEqualizer(analyser);
					
					//this.getAudioBuffer();
					this.applyFilter("high", A.config.effect.processor, "lowshelf", 360, -40.0, -1.0);
					this.applyFilter("low", A.config.effect.processor, "highshelf", 3600, -40.0, -1.0);
					
					A.config.vr_eq.section['mid'] = {};
					A.config.band.mid = A.config.components.context.createGain();
					A.config.gain.mid = this.gain(A.config.band.mid);
					A.config.components.audionode.connect(A.config.band.mid);
					A.config.vr_eq.section['low']['invert'].connect(A.config.band.mid);
					A.config.vr_eq.section['high']['invert'].connect(A.config.band.mid);
					A.config.vr_eq.section['mid']['gain'] = this.gain(A.config.band.mid);
					A.config.vr_eq.section['mid']['gain'].connect(A.config.effect.processor);
					A.config.effect.processor.connect(A.config.components.context.destination);
					
					this.getEqualizerSetting();
				}
			}catch(e) {}
		},
		applyFilter: function (_name, processor, shelf, bandwidth, gains, value) {
			A.config.vr_eq.section[_name] = {}
			A.config.vr_eq.section[_name]['band'] = A.config.vr_eq._band = this.createFilter(shelf, bandwidth, gains);
			A.config.vr_eq.section[_name]['invert'] = this.invert(A.config.vr_eq.section[_name]['band'], value);
			A.config.vr_eq.section[_name]['gain'] = A.config.vr_eq._gain = this.gain(A.config.vr_eq.section[_name]['band']);
			A.config.components.audionode.connect(A.config.vr_eq.section[_name]['band']);
			A.config.vr_eq.section[_name]['invert'].connect(A.config.components.context.createGain());
			A.config.vr_eq.section[_name]['gain'].connect(processor);
		},
		createFilter: function (type, freq, gain) {
			A.config.vr_eq.temp = $.core.Audio.setBiquadFilter(A.config.components.context, type, freq, gain);
			return A.config.vr_eq.temp;
		},
		invert: function (element, value) {
			value = value || -1.0;
			A.config.vr_eq.temp = $.core.Audio.setInvert(-1.0, A.config.components.context, element);
			return A.config.vr_eq.temp;
		},
		gain: function (element) {
			A.config.vr_eq.temp = $.core.Audio.setGain(A.config.components.context, element);
			return A.config.vr_eq.temp;
		}
	};
	
	A.Seek = {
		// Find adjacent seconds attribute in lyrics
		_s: function (e) {
			var t = null;
			return $.each(A.config.dump.unique_s, function () {
				(null === t || Math.abs(this - e) < Math.abs(t - e)) && (t = this)
			}), t.valueOf();
		},
		// Find adjacent milliseconds attribute in lyrics
		_ms: function (ms, timestamp) {
			var s = null;
			return $.each($.map($(".lyrics_display > div[" + timestamp + '="' + A.config.dump._near + '"]'), function (ms) {
				return $(ms).attr("ms")
			}).filter(function (ms, timestamp, s) {
				return s.indexOf(ms) === timestamp
			}), function () {
				(null === s || Math.abs(this - ms) < Math.abs(s - ms)) && (s = this)
			}), s.valueOf();
		}
	};
	
	A.Display = {
		setLyrics: function (time) {
			if ("undefined" != typeof A.config.dump.lyrics_temp_time) {
				$("." + A.config.settings.lyrics_box + " [" + A.config.settings.timestamp + '="' + A.config.dump.lyrics_temp_time + '"]').css("display", "none");
				var elements_lyrics_box = $('.lyrics_display_expand [' + A.config.settings.timestamp + '="' + A.config.dump.lyrics_temp_time +'"]');
				elements_lyrics_box.removeClass('focus_lyrics');
			}
			
			A.config.dump._near = A.Seek._s(A.config.playmeta.time);
			A.config.dump._near_ms = A.Seek._ms(A.config.playmeta.ms, A.config.settings.timestamp);
			time = A.config.dump._near;
			A.config.dump.processlyrics = 0 != A.config.dump._near_ms && A.config.settings.get_ms === true ? 
				$("." + A.config.settings.lyrics_box + " [" + A.config.settings.timestamp + '="' + time + '"][ms="' + A.config.dump._near_ms + '"]') : 
				A.config.dump.processlyrics = $("." + A.config.settings.lyrics_box + " [" + A.config.settings.timestamp + '="' + time + '"]');
				
			A.config.dump.processlyrics.css("display", "block");
			
			var elements_lyrics_box = $('.lyrics_display_expand [' + A.config.settings.timestamp + '="' + A.config.dump._near +'"][ms="' + A.config.dump._near_ms + '"]');
			elements_lyrics_box.addClass('focus_lyrics');
			if (elements_lyrics_box.length > 0) {
				// Focus extended lyric
				$('.lyrics_display_expand').animate({
					scrollTop: (
						$(elements_lyrics_box).parent().scrollTop() + 
						$(elements_lyrics_box).offset().top - 
						$(elements_lyrics_box).parent().offset().top
					) - ($('.lyrics_display_expand').height() / 2)
				}, {
					duration: 300,
					specialEasing: {width: 'linear', height: 'easeInBounce'}
				});
			}
			
			A.config.dump.lyrics_temp_time = time;
			A.config.dump.bool_change = false;
		},
		dispLyrics: function () {
			var currentTime = A.config.dump.audioElement.currentTime - A.config.settings.delay;
			
			// Set time and milliseconds
			A.config.playmeta.time = parseInt(currentTime);
			A.config.playmeta.ms = parseInt(100 * (currentTime - A.config.playmeta.time).toFixed(2));
			
			// If has lyric
			if ($(".lyrics_display_expand > div").length > 0) {
				var startStamp;
				var prevItem;
				var nextStamp;
				var pysicalStamp;
				var realStamp;
				
				// Check all extended lyrics Items
				$(".lyrics_display_expand > div").each(function(i, item) {
					
					// If prev item is focused
					if (!$(item).hasClass("focus_lyrics") && $(item).prev().hasClass("focus_lyrics")) {
						startStamp = parseInt($(item).prev().attr("timestamp"));
						prevItem = $(item).prev();
					}
					
					// If found prev item
					if (prevItem) {
						nextStamp = parseInt($(prevItem).next().attr("timestamp"));
						return false;
					}
				});
				
				pysicalStamp = nextStamp - startStamp;
				realStamp = A.config.playmeta.time - startStamp;
				
				if (realStamp < 0) {
					pysicalStamp = startStamp;
					realStamp = startStamp - (-(parseInt(realStamp)));
				}
				
				var isFinal = (isNaN(realStamp) || isNaN(pysicalStamp));
				
				if (isFinal) {
					pysicalStamp = A.config.playmeta.time;
					realStamp = A.config.playmeta.time;
				}
				
				$(".lyrics_display_expand_timer").html($.core.Time.formatTime(realStamp) + " / " + $.core.Time.formatTime(pysicalStamp));
				$(".lyrics_display_expand_bar").css("width",parseInt(realStamp / pysicalStamp * 100).toFixed(3) + "%");
			}
			
			// If found current time arributes in lyrics
			if ($(".lyrics_display [" + A.config.settings.timestamp + '="' + parseInt(A.config.playmeta.time) + '"]').length > 0 || A.config.dump.bool_change === true) {
				// Set Lyrics
				this.setLyrics(A.config.playmeta.time);
				
				// Arrange lyrics css position
				$.core.Lyrics.arrangeLyrics();
			}
		}
	};
	
	A.config = {};
	
	A.config.dump = {
		unique_s: [],
		lyrics: {},
		audioSrc: null,
		proclyric: null,
		_b_lyric: false,
		audioElement: null,
		_near: null,
		_near_ms: null,
		mousePositionX: null,
		mousePositionY: null
	},
	A.config.settings = {
		lyrics_box: 'lyrics_display',
		timestamp: 'timestamp',
		get_ms: true,
		delay: 0,
		lyrics_margin : -20,
		lyrics_Xmargin : -20,
		lyrics_top_position : 20 /* Don't fix */
	},
	A.config.playmeta = {
		time: null,
		ms: null
	},
	A.config.components = {
		context: null,
		audionode: null,
		pannode: null
	},
	A.config.effect = {
		gain: null,
		biquad: null,
		processor: null
	},
	A.config.vr_eq = {
		pan: null,
		temp: null,
		_band: null,
		_invent: null,
		_gain: null,
		section: {}
	},
	A.config.band = {
		high: null,
		mid: null,
		low: null
	},
	A.config.gain = {
		high: null,
		mid: null,
		low: null
	},
	A.config.invert = {
		high: null,
		mid: null,
		low: null
	}
	
})(jQuery, $.core);