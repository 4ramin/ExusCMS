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
	get_ms: true,
	delay: 0
},
playmeta = {
	time: null,
	ms: null
},
components = {
	context: null,
	audionode: null,
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
	vr_eq.section['low']['band'].detune.value = -1200;
	vr_eq.section['low']['gain'].gain.value = p1;
	$('.eq_p1').val(p1*100);

	if ($.core.Storage.isSupport) {
		$.core.Storage.Set('low_gain', p1);
	}
	
	vr_eq.section['mid']['gain'].gain.value = p2;
	$('.eq_p2').val(p2*100);
	
	if ($.core.Storage.isSupport) {
		$.core.Storage.Set('mid_gain', p2);
	}
	
	vr_eq.section['high']['gain'].gain.value = p3;
	$('.eq_p3').val(p3*100);
	
	if ($.core.Storage.isSupport) {
		$.core.Storage.Set('high_gain', p3);
	}
}
	
function changeGain(string, type) {
	if ($.core.Storage.isSupport) {
		$.core.Storage.Set(type+'_gain', parseFloat(string) / 100.0);
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
		$('video').each(function(){
			this.remove();
		});
	}
}

function MakeEffect() {
	try{
		if (components.context) {
			components.audionode.disconnect(components.context);
		}
		
		components.context = $.core.Audio.getContext();
		if (components.context) {
			effect.processor = components.context.createGain();
			components.audionode = $.core.Audio.getNode(components.context, dump.audioElement);
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
			
			if ($.core.Storage.isSupport) {
				var low_gain = $.core.Storage.Get('low_gain');
				if(low_gain){
					vr_eq.section['low']['gain'].gain.value = low_gain;
					$('.eq_p1').val(low_gain*100);
				}
				
				var mid_gain = $.core.Storage.Get('mid_gain');
				if(low_gain){
					vr_eq.section['mid']['gain'].gain.value = mid_gain;
					$('.eq_p2').val(mid_gain*100);
				}
				
				var high_gain = $.core.Storage.Get('high_gain');
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
			vr_eq.temp = $.core.Audio.setBiquadFilter(components.context, type, freq, gain);
			return vr_eq.temp;
		},
		invert: function (element, value) {
			value = value || -1.0;
			vr_eq.temp = $.core.Audio.setInvert(-1.0, components.context, element);
			return vr_eq.temp;
		},
		gain: function (element) {
			vr_eq.temp = $.core.Audio.setGain(components.context, element);
			return vr_eq.temp;
		}
	}
})();

function lyricsRemovedClass() {
	if(typeof dump.lyrics_temp_time !== 'undefined') {
		$('.lyrics_display_expand [' + settings.timestamp + '="' + dump.lyrics_temp_time + '"]').removeClass('focus_lyrics');
		$('.' + settings.lyrics_box + '[' + settings.timestamp + '="' + dump.lyrics_temp_time + '"]').css("display", "none");
	}
}

function evtListener() {
	$('.lyrics_display_expand').click(function(e){
		$(".lyrics_display > div").css("display", "none");
		if($(e.target).is('div')){
			lyricsRemovedClass();
			var timestamp = $(e.target).attr(settings.timestamp);
			dump.audioElement.currentTime = timestamp;
			$('.lyrics_display_expand [' + settings.timestamp + '="' + timestamp + '"]').addClass('focus_lyrics');
			dump.lyrics_temp_time = timestamp;
		}
	});
	
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
			if ("undefined" != typeof dump.lyrics_temp_time) {
				$("." + settings.lyrics_box + " [" + settings.timestamp + '="' + dump.lyrics_temp_time + '"]').css("display", "none");
				var elements_lyrics_box = $('.lyrics_display_expand [' + settings.timestamp + '="' + dump.lyrics_temp_time +'"]');
				elements_lyrics_box.removeClass('focus_lyrics');
			}
			
			dump._near = seek._s(playmeta.time);
			dump._near_ms = seek._ms(playmeta.ms, settings.timestamp);
			time = dump._near;
			dump.processlyrics = 0 != dump._near_ms && settings.get_ms === true ? $("." + settings.lyrics_box + " [" + settings.timestamp + '="' + time + '"][ms="' + dump._near_ms + '"]') : dump.processlyrics = $("." + settings.lyrics_box + " [" + settings.timestamp + '="' + time + '"]');
			dump.processlyrics.css("display", "block");
			var elements_lyrics_box = $('.lyrics_display_expand [' + settings.timestamp + '="' + dump._near +'"][ms="' + dump._near_ms + '"]');
			elements_lyrics_box.addClass('focus_lyrics');
			if (elements_lyrics_box.length>0) {
				$('.lyrics_display_expand').animate(
					{scrollTop: ($(elements_lyrics_box).parent().scrollTop() + $(elements_lyrics_box).offset().top - $(elements_lyrics_box).parent().offset().top)-(($('.lyrics_display_expand').height()/2))},
					{duration: 300,specialEasing: {width: 'linear',height: 'easeInBounce'}}
				);
			}
			
			dump.lyrics_temp_time = time;
			dump.bool_change = false;
		},
		displyrics: function () {
			var currentTime = dump.audioElement.currentTime - settings.delay;
			
			playmeta.time = parseInt(currentTime);
			playmeta.ms = parseInt(100 * (currentTime - playmeta.time).toFixed(2));
			
			if($(".lyrics_display_expand > div").length>0){
				var startStamp;
				var prevItem;
				var nextStamp;
				var pysicalStamp;
				var realStamp;
				$(".lyrics_display_expand > div").each(function(i, item){
					if(!$(item).hasClass("focus_lyrics") && $(item).prev().hasClass("focus_lyrics")){
						startStamp = parseInt($(item).prev().attr("timestamp"));
						prevItem = $(item).prev();
					}
					
					if(prevItem){
						nextStamp = parseInt($(prevItem).next().attr("timestamp"));
						return false;
					}
				});
				
				pysicalStamp = nextStamp - startStamp;
				realStamp = playmeta.time - startStamp;
				
				$(".lyrics_display_expand_timer").html($.core.Time.formatTime(realStamp) + " / " + $.core.Time.formatTime(pysicalStamp));
				$(".lyrics_display_expand_bar").css("width",parseInt(realStamp / pysicalStamp * 100).toFixed(3) + "%");
			}
			
			
			if ($(".lyrics_display [" + settings.timestamp + '="' + parseInt(playmeta.time) + '"]').length > 0 || dump.bool_change === true) {
				this.setlyrics(playmeta.time);
				rearrangeLyricsPosition();
			}
		}
	}
}();

function rearrangeLyricsPosition(){
	$i = 20;
	
	$(".lyrics_display > div").each(function(i, item){
		if($(item).css('display')=='block'){
			$i = $i + $(item).height();
		}
	});
	
	$(".lyrics_display > div").each(function(i, item){
		if($(item).css('display')=='block'){
			$(item).css('bottom', $i);
			$i = $i - $(item).height() - 3;
		}
	});
}

function request_lyrics(srl) {
	dump.audioElement = $("video")[0];
	
	MakeEffect();

	if ($.core.Storage.isSupport) {
		var audioElement = $("video")[0];
		if($("video").length>0) {
			try{
				var volume = $.core.Storage.Get('volume');
				audioElement.volume = parseFloat(volume),
				audioElement.onvolumechange = function () {
					$.core.Storage.Set('volume', $("video")[0].volume);
				}
			}catch(e){}
		}else{
			return;
		}
	}
	
	if($('.lyrics_display').length === 0) {
		$.core.Element.appendDiv('video_container', 'lyrics_display');
		$.core.Element.appendDiv('flower_space', 'lyrics_display_expand');
		$.core.Element.appendDiv('flower_space', 'lyrics_display_expand_bar');
		$.core.Element.appendDiv('flower_space', 'lyrics_display_expand_timer');
	}
	
	$.core.Request.ajax("POST", "index.php", {
		[core_flower.def_mid]: core_flower.mid,
		srl: srl,
		act: "getAudiolyrics"
	}, 'completeLyrics', "json", "가사를 요청중입니다");
}