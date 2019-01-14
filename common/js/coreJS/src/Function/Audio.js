//Audio-related functions
'use strict';

(function ($, core) {

	var A = core.Audio = {
		/**
		 * Check that browser is support specify audio codec type
		 *
		 * @return boolean
		 **/
		isCanPlay: function (element, type, codecs) {
			var codecs = '';
			switch (type) {
			case "opus":
				type = 'audio/opus';
				codecs = 'opus';
				return element.canPlayType(type + ';codecs="' + codecs + '"');
			case "ogg":
				type = 'audio/ogg';
				codecs = 'theora, vorbis';
				return element.canPlayType(type + ';codecs="' + codecs + '"');
			case "oga":
				type = 'audio/ogg';
				codecs = 'vorbis';
				return element.canPlayType(type + ';codecs="' + codecs + '"');
			case "wav":
				type = 'audio/wav';
				codecs = '1';
				return element.canPlayType(type + ';codecs="' + codecs + '"');
			case "weba":
				type = 'audio/weba';
				codecs = 'vorbis';
				return element.canPlayType(type + ';codecs="' + codecs + '"');
			case "webm":
				type = 'audio/weba';
				codecs = 'vp8.0, vorbis';
				return element.canPlayType(type + ';codecs="' + codecs + '"');
			case "dolby":
				type = 'audio/mp4';
				codecs = 'ec-3';
				return element.canPlayType(type + ';codecs="' + codecs + '"');
			case "flac":
				return element.canPlayType("audio/x-flac;") || element.canPlayType("audio/flac;");
			case "m4a":
				return element.canPlayType("audio/x-m4a;") || element.canPlayType("audio/m4a;") || element.canPlayType("audio/aac;");
			case "mp4":
				return element.canPlayType('audio/x-mp4;codecs="avc1.42E01E, mp4a.40.2"') || element.canPlayType("audio/mp4;") || element.canPlayType("audio/aac;");
			case "caf":
				return element.canPlayType("audio/x-caf;");
			case "aac":
				return element.canPlayType("audio/aac;");
			case "mpeg":
				return element.canPlayType("audio/mpeg;");
			case "mp3":
				return element.canPlayType("audio/mp3;") || element.canPlayType("audio/mpeg;");
			}
			
			return element.canPlayType(type + ';codecs="' + codecs + '"');
		},
		/**
		 * Check that audio support
		 *
		 * @return boolean
		 **/
		isSupport: function () {
			if (_cWin.HTMLAudioElement && !$.core.Mobile.isRefMobile()) {
				return true;
			}
			return false;
		},
		/**
		 * Check that audio playing
		 *
		 * @return boolean
		 **/
		isPlaying: function () {
			if ($.core.Validate.isObject(StreamAudio)) {
				try{
					if (StreamAudio.currentTime > 0 && !StreamAudio.paused && !StreamAudio.ended && StreamAudio.readyState > 2) {
						return true;
					}
				} catch(e) {}
				return false;
			}
		},
		/**
		 * Load Audio File for Play
		 *
		 * @param {src} : Audio Source
		 *
		 * @return void
		 **/
		loadAudio: function (src) {
			if (this.isSupport()) {
				if (!StreamAudio || !$.core.Validate.isObject(StreamAudio)) {
					StreamAudio = $.core.Element.create("audio");
				}
				
				try{
					const playPromise = StreamAudio.play();
					
					if (this.isPlaying()) {
						this.pauseAudio();
					}
					
					if (playPromise !== null) {
						StreamAudio.setAttribute("src", src);
						StreamAudio.src = src;
						StreamAudio.load();
					} else if (!$.core.Validate.isUndefined(playPromise)) {
						playPromise.then(function () {
						//_ => {
							StreamAudio.setAttribute("src", src);
							StreamAudio.src = src;
							StreamAudio.load();
						}).catch(function () {
						//error => {
							if (this.isPlaying()) {
								this.pauseAudio();
							}
							
							StreamAudio.setAttribute("src", src);
							StreamAudio.load();
						});
					}
				} catch(e) {
					console.log(e);
				}
			}
		},
		/**
		 * Decode Audio Context
		 *
		 * @param {result} : evt.target.result
		 * @param {audioContext} : Audio Context
		 * @param {callback} : Callback
		 * @param {failCallback} : Failure Callback
		 *
		 * @return Callback
		 **/
		decodeAudio: function (result, audioContext, callback, failCallback) {
			audioContext.decodeAudioData(result, function (buffer) {
				callback(audioContext, buffer);
			}, function (e) {
				failCallback(e);
			});
		},
		/**
		 * Play Audio File (* Need to Load Audio File)
		 *
		 * @return void
		 **/
		playAudio: function () {
			if ($.core.Validate.isObject(StreamAudio)) {
				StreamAudio.play();
			}
		},
		/**
		 * Pause Audio File (* Need to Load Audio File)
		 *
		 * @return void
		 **/
		pauseAudio: function () {
			if ($.core.Validate.isObject(StreamAudio)) {
				StreamAudio.pause();
			}
		},
		/**
		 * Get Offline Audio Context
		 *
		 * @return Object
		 **/
		getOfflineAudioContext: function () {
			var OfflineAudioContext = null;
			try {
				var OfflineAudioContext = _cWin.OfflineAudioContext;
				return new(OfflineAudioContext)();
			} catch (e) {}
			return OfflineAudioContext;
		},
		/**
		 * Get Audio Context
		 *
		 * @return Object
		 **/
		getContext: function () {
			var AudioContext = null;
			try {
				var AudioContext = _cWin.AudioContext || _cWin.webkitAudioContext || _cWin.mozAudioContext || _cWin.msAudioContext;;
				return new(AudioContext)();
			} catch (e) {}
			
			return AudioContext;
		},
		/**
		 * Get Audio Context
		 *
		 * @param {audioContext} : AudioContext Object
		 * @param {audioElement} : Audio Element
		 *
		 * @return Object
		 **/
		createMediaElementSource: function (audioContext, audioElement) {
			return audioContext.createMediaElementSource(audioElement);
		},
		/**
		 * Get Node
		 *
		 * @param {context}      : AudioContext Object
		 * @param {audioElement} : Audio Element
		 *
		 * @return Object
		 **/
		getNode: function (context, audioElement) {
			return context.createMediaElementSource(audioElement);
		},
		/**
		 * Set Biquad Filter
		 *
		 * @param {context}      : AudioContext Object
		 * @param {type}         : [lowshelf, highshelf]
		 * @param {freq}         : AudioFrequency
		 * @param {gain}         : Audio Gain
		 *
		 * @return Object
		 **/
		setBiquadFilter: function (context, type, freq, gain) {
			var variable = context.createBiquadFilter();
			variable.type = type;
			
			try{
				variable.frequency.setTargetAtTime(0, context.currentTime, freq);
			} catch(e) {
				variable.frequency.value = freq; //is deprecated and will be removed in M64, around January 2018.
			}
			
			try{
				variable.gain.setTargetAtTime(0, context.currentTime, gain);
			} catch(e) {
				variable.gain.value = gain;
			}
			
			return variable;
		},
		/**
		 * Set Delay
		 *
		 * @param {context}      : AudioContext Object
		 * @param {audioNode}    : Audio Node
		 * @param {time}         : Delay Time
		 *
		 * @return void
		 **/
		setDelay: function (context, audioNode, time) {
			var variable = context.createDelay();
			variable.delayTime.value = time;
			audioNode.connect(variable);
			audioNode.connect(context.destination);
			variable.connect(context.destination);
		},
		//value : samples
		contextSamplesToSeconds: function (audioContext, value) {
			return audioContext.sampleRate / value;
		},
		getContextCurrentTime: function (audioContext) {
			return audioContext.currentTime;
		},
		setGain: function (context, element) {
			var variable = context.createGain();
			element.connect(variable);
			return variable;
		},
		//AudioNode : context.createMediaElementSource(audioElement);
		setPan: function (context, audioNode) {
			var variable = context.createPanner();
			variable.panningModel = "equalpower";
			audionode.connect(variable);
			audionode.connect(context.destination);
			variable.connect(context.destination);
		},
		setInvert: function (value, context, element) {
			var variable = context.createGain();
			variable.gain.value = value;
			element.connect(variable);
			return variable;
		},
		createGain: function (audioContext) {
			if (!$.core.Validate.isFunc(audioContext.prototype.createGain)) {
				audioContext.prototype.createGain = audioContext.prototype.createGainNode;
			}
			
			return audioContext.createGain();
		},
		createBiquadFilter: function (audioContext) {
			return audioContext.createBiquadFilter();
		},
		setPeriodicWave: function (oscillatorNode) {
			if (!$.core.Validate.isFunc(oscillatorNode.prototype.setPeriodicWave)) {
				oscillatorNode.prototype.setPeriodicWave = oscillatorNode.prototype.setWaveTable;
			}
			
			return oscillatorNode.setPeriodicWave;
		},
		stopOscillatorNode: function (oscillatorNode) {
			if (!$.core.Validate.isFunc(oscillatorNode.prototype.stop)) {
				oscillatorNode.prototype.stop = oscillatorNode.prototype.noteOff;
			}
			
			return oscillatorNode.stop;
		},
		startOscillatorNode: function (oscillatorNode) {
			if (!$.core.Validate.isFunc(oscillatorNode.prototype.start)) {
				oscillatorNode.prototype.start = oscillatorNode.prototype.noteOn;
			}
			
			return oscillatorNode.start;
		},
		stopBufferSourceNode: function (audioBufferSourceNode) {
			if (!$.core.Validate.isFunc(audioBufferSourceNode.prototype.stop)) {
				audioBufferSourceNode.prototype.stop = audioBufferSourceNode.prototype.noteGrainOn;
			}
			
			return audioBufferSourceNode.stop;
		},
		startBufferSourceNode: function (audioBufferSourceNode) {
			if (!$.core.Validate.isFunc(audioBufferSourceNode.prototype.start)) {
				audioBufferSourceNode.prototype.start = audioBufferSourceNode.prototype.noteGrainOn;
			}
			
			return audioBufferSourceNode.start;
		},
		createPeriodicWave: function (audioContext) {
			if (!$.core.Validate.isFunc(audioContext.prototype.createPeriodicWave)) {
				audioContext.prototype.createPeriodicWave = audioContext.prototype.createWaveTable;
			}
			
			return audioContext.createPeriodicWave();
		},
		createDelay: function (audioContext) {
			if (!$.core.Validate.isFunc(audioContext.prototype.createDelay)) {
				audioContext.prototype.createDelay = audioContext.prototype.createDelayNode;
			}
			
			return audioContext.createDelay();
		},
		createPanner: function (audioContext) {
			return audioContext.createPanner();
		},
		createStereoPanner: function (context) {
			return context.createStereoPanner;
		},
		createOscillator: function (context) {
			return context.createOscillator;
		},
		createAnalyser: function (context) {
			return context.createAnalyser;
		},
		closeAudioEffect: function (input, output, AudioNode) {
			if (!$.core.Validate.isFunc(input)) {
				if (input instanceof AudioNode) {
					input.disconnect();
				} 
				input = null;
			}
			
			if (!$.core.Validate.isFunc(output)) {
				if (output instanceof AudioNode) {
					output.disconnect();
				} 
				output = null;
			}
		},
		/**
		 * analyser : createAnalyser
		 */
		analyserFreqBinCount: function (analyser) {
			return analyser.frequencyBinCount; //Array
		},
		/**
		 * analyser : createAnalyser
		 */
		analyserGetByteFreqData: function (analyser, array) {
			return analyser.getByteFrequencyData(array);
		},
		createBuffSource: function (context) {
			return context.createBufferSource;
		}
	};
})(jQuery, $.core);