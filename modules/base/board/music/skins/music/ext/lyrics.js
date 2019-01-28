var dump = {
		unique_s: [],
		lyrics: {},
		proclyric: null,
		_b_lyric: false,
		audioElement: null,
		_near: null,
		_near_ms: null
	},
	settings = {
		lyrics_box: 'lyrics_display',
		timestamp: 'timestamp',
		get_ms: true
	},
	playmeta = {
		time: null,
		ms: null
	},
	components = {
		context: null,
		audionode: null
	},
	effect = {
		gain: null,
		biquad: null,
		processor: null
	},
	vr_eq = {
		pan: null,
		temp: null,
		_band: null,
		_invent: null,
		_gain: null,
		section: {}
	},
	band = {
		high: null,
		mid: null,
		low: null
	},
	gain = {
		high: null,
		mid: null,
		low: null
	},
	invert = {
		high: null,
		mid: null,
		low: null
	}

function setPreset(p1, p2, p3) {
	vr_eq.section['low']['gain'].gain.value = p1;
	$('.eq_p1').val(p1*100);
	
	if (exus.Storage.isSupport) {
		exus.Storage.Set('low_gain', p1);
	}
	
	vr_eq.section['mid']['gain'].gain.value = p2;
	$('.eq_p2').val(p2*100);
	
	if (exus.Storage.isSupport) {
		exus.Storage.Set('mid_gain', p2);
	}
	
	vr_eq.section['high']['gain'].gain.value = p3;
	$('.eq_p3').val(p3*100);
	
	if (exus.Storage.isSupport) {
		exus.Storage.Set('high_gain', p3);
	}
}
	
function changeGain(string, type) {
	if (exus.Storage.isSupport) {
		exus.Storage.Set(type+'_gain', parseFloat(string) / 100.0);
	}
	
	vr_eq.section[type]['gain'].gain.value = parseFloat(string) / 100.0;
}

function changeFreq(string, type) {
	vr_eq.section[type]['band'].frequency.value = parseFloat(string);
	console.log(vr_eq.section[type]['band']);
	//vr_eq.section[type]['gain'].frequency.value = parseFloat(string) / 100.0;
}

function closeEffect() {
	if (components.context) {
		$('audio').each(function(){
			this.remove();
		});
	}
}

function MakeEffect() {
	try{
		if (components.context) {
			components.audionode.disconnect(components.context);
		}
		
		components.context = exus.Audio.getContext();
		if (components.context) {
			effect.processor = components.context.createGain();
			components.audionode = exus.Audio.getNode(components.context, dump.audioElement);
			Equlizer.applyFilter("high", effect.processor, "lowshelf", 360, -40.0, -1.0);
			Equlizer.applyFilter("low", effect.processor, "highshelf", 3600, -40.0, -1.0);
			vr_eq.section['mid'] = {};
			band.mid = components.context.createGain();
			gain.mid = Equlizer.gain(band.mid);
			components.audionode.connect(band.mid);
			vr_eq.section['low']['invert'].connect(band.mid);
			vr_eq.section['high']['invert'].connect(band.mid);
			vr_eq.section['mid']['gain'] = Equlizer.gain(band.mid);
			vr_eq.section['mid']['gain'].connect(effect.processor);
			effect.processor.connect(components.context.destination);
			
			if (exus.Storage.isSupport) {
				var low_gain = exus.Storage.Get('low_gain');
				if(low_gain){
					vr_eq.section['low']['gain'].gain.value = low_gain;
					$('.eq_p1').val(low_gain*100);
				}
				
				var mid_gain = exus.Storage.Get('mid_gain');
				if(low_gain){
					vr_eq.section['mid']['gain'].gain.value = mid_gain;
					$('.eq_p2').val(mid_gain*100);
				}
				
				var high_gain = exus.Storage.Get('high_gain');
				if(low_gain){
					vr_eq.section['high']['gain'].gain.value = high_gain;
					$('.eq_p3').val(high_gain*100);
				}
			}
		}
	}catch(e){}
}

var Equlizer = (function () {
	return {
		applyFilter: function (_name, processor, shelf, bandwidth, gains, value) {
			vr_eq.section[_name] = {}
			vr_eq.section[_name]['band'] = vr_eq._band = this.createFilter(shelf, bandwidth, gains);
			vr_eq.section[_name]['invert'] = this.invert(vr_eq.section[_name]['band'], value);
			vr_eq.section[_name]['gain'] = vr_eq._gain = this.gain(vr_eq.section[_name]['band']);
			components.audionode.connect(vr_eq.section[_name]['band']);
			vr_eq.section[_name]['invert'].connect(components.context.createGain());
			vr_eq.section[_name]['gain'].connect(processor);
		},
		//lowshelf, highshelf
		createFilter: function (type, freq, gain) {
			vr_eq.temp = exus.Audio.setBiquadFilter(components.context, type, freq, gain);
			return vr_eq.temp;
		},
		invert: function (element, value) {
			value = value || -1.0;
			vr_eq.temp = exus.Audio.setInvert(-1.0, components.context, element);
			return vr_eq.temp;
		},
		gain: function (element) {
			vr_eq.temp = exus.Audio.setGain(components.context, element);
			return vr_eq.temp;
		}
	}
})();

function evtListener() {
	dump.unique_s = $.map($(".lyrics_display > div"), function (e) {
		return $(e).attr("timestamp")
	}).filter(function (e, t, s) {
		return s.indexOf(e) === t
	}), dump.bool_change = false, dump.audioElement.addEventListener("timeupdate", function () {
		Display.displyrics()
	}), dump.audioElement.addEventListener("play", function () {
		dump.bool_change = true, Display.displyrics()
	})
}

function chkLyricsType(lyrics) {
	var lyrics = lyrics.match(/<div(.*)ms=(\d{1,2})(.*)timestamp=(\d{1,4})/);
	if (lyrics == null) return;
	if (lyrics.length > 0) return true;
}

$(document).ready(function () {
	document.addEventListener || (dump.can_play = !1)
}), seek = function () {
	return {
		_s: function (e) {
			var t = null;
			return $.each(dump.unique_s, function () {
				(null === t || Math.abs(this - e) < Math.abs(t - e)) && (t = this)
			}), t.valueOf();
		},
		_ms: function (ms, timestamp) {
			var s = null;
			return $.each($.map($(".lyrics_display > div[" + timestamp + '="' + dump._near + '"]'), function (ms) {
				return $(ms).attr("ms")
			}).filter(function (ms, timestamp, s) {
				return s.indexOf(ms) === timestamp
			}), function () {
				(null === s || Math.abs(this - ms) < Math.abs(s - ms)) && (s = this)
			}), s.valueOf();
		}
	}
}(), Display = function () {
	return {
		setlyrics: function (time) {
			console.log(time);
			if ("undefined" != typeof dump.lyrics_temp_time) {
				$("." + settings.lyrics_box + " [" + settings.timestamp + '="' + dump.lyrics_temp_time + '"]').css("display", "none");
			}
			dump._near = seek._s(playmeta.time);
			dump._near_ms = seek._ms(playmeta.ms, settings.timestamp);
			time = dump._near;
			dump.processlyrics = 0 != dump._near_ms && settings.get_ms === true ? $("." + settings.lyrics_box + " [" + settings.timestamp + '="' + time + '"][ms="' + dump._near_ms + '"]') : dump.processlyrics = $("." + settings.lyrics_box + " [" + settings.timestamp + '="' + time + '"]');
			dump.processlyrics.css("display", "block");
			dump.lyrics_temp_time = time;
			dump.bool_change = false;
		},
		displyrics: function () {
			playmeta.time = parseInt(dump.audioElement.currentTime);
			playmeta.ms = parseInt(100 * (dump.audioElement.currentTime - playmeta.time).toFixed(2));
			if ($("." + settings.lyrics_box + " [" + settings.timestamp + '="' + parseInt(playmeta.time) + '"]').length > 0 || dump.bool_change === true) {
				this.setlyrics(playmeta.time);
			}
		}
	}
}();

function request_lyrics(srl) {
	dump.audioElement = $("audio")[0];
	
	MakeEffect();

	if (exus.Storage.isSupport) {
		var audioElement = $("audio")[0];
		if($("audio").length>0) {
			audioElement.volume = exus.Storage.Get('volume'),
				audioElement.onvolumechange = function () {
					exus.Storage.Set('volume', $("audio")[0].volume);
				}
		}else{
			return;
		}
	}
	
	if($('.lyrics_display').length === 0) {
		exus.Element.appendDiv('flower_space', 'lyrics_display');
	}
	
	exus.Request.ajax("POST", "index.php", {
		[core_flower.def_mid]: core_flower.mid,
		srl: srl,
		act: "getAudiolyrics"
	}, 'completeLyrics', "json", "가사를 요청중입니다");
}