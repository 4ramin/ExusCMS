
var dump = {unique_s : [], lyrics : {}, proclyric : null, _b_lyric : false, audioElement : null, _near : null, _near_ms : null},
	settings = {lyrics_box : 'lyrics_display', timestamp : 'timestamp'},
	playmeta = {time : null, ms : null},
	components = {context : null,audionode : null},
	effect = {gain : null, biquad: null, processor: null},
	vr_eq = {pan : null, temp : null, _band : null, _invent : null, _gain : null, section: {} },
	band = {high : null, mid : null, low : null},
	gain = {high : null, mid : null, low : null},
	invert = {high : null, mid : null, low : null}

function changeGain(string,type)
{
	vr_eq.section[type]['gain'].gain.value = parseFloat(string) / 100.0;
}

function changeFreq(string,type)
{
	vr_eq.section[type]['gain'].frequency.value = parseFloat(string) / 100.0;
}

function MakeEffect()
{
	Equlizer.getAudioContext();
	if(components.context){
		effect.processor = components.context.createGain();
		components.audionode = components.context.createMediaElementSource(dump.audioElement);
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
	}
}

var Equlizer = (function(){
	return {
		pan: function(){
			vr_eq.pan = components.context.createPanner();
			vr_eq.pan.panningModel = "equalpower";
			components.audionode.connect(vr_eq.pan);
			components.audionode.connect(components.context.destination);
			vr_eq.pan.connect(components.context.destination);
		},
		delay: function(time){
			var delay = components.context.createDelay();
			delay.delayTime.value = time;

			components.audionode.connect(delay);
			components.audionode.connect(components.context.destination);
			delay.connect(components.context.destination);
		},
		applyFilter: function(_name, processor, shelf, bandwidth, gains, value){
			vr_eq.section[_name] = {}
			vr_eq.section[_name]['band'] = vr_eq._band = this.createFilter(shelf, bandwidth, gains);
			vr_eq.section[_name]['invert'] = this.invert(vr_eq.section[_name]['band'], value);
			vr_eq.section[_name]['gain'] = vr_eq._gain = this.gain(vr_eq.section[_name]['band']);
			components.audionode.connect(vr_eq.section[_name]['band']);
			
			vr_eq.section[_name]['invert'].connect(components.context.createGain());
			vr_eq.section[_name]['gain'].connect(processor);
		},
		getAudioContext: function(){
			//Get audio context
			try {
				window.AudioContext = window.AudioContext||window.webkitAudioContext;
				components.context = new AudioContext();
			}catch(e) {
				components.context = null;
			}
		},
		//lowshelf, highshelf
		createFilter: function(type, freq, value){
			vr_eq.temp = components.context.createBiquadFilter();
			vr_eq.temp.type = "lowshelf";
			vr_eq.temp.frequency.value = freq;
			vr_eq.temp.gain.value = value;
			
			return vr_eq.temp;
		},
		invert: function(elements, value){
			vr_eq.temp = components.context.createGain();
			vr_eq.temp.gain.value = -1.0;
			elements.connect(vr_eq.temp);
			
			return vr_eq.temp;
		},
		gain: function(elements){
			vr_eq.temp = components.context.createGain();
			elements.connect(vr_eq.temp);
			
			return vr_eq.temp;
		}
	}
})();

function evtListener()
{
    dump.audioElement = $("audio")[0], dump.unique_s = $.map($("#lyrics_display > div"), function(e){
        return $(e).attr("timestamp")
    }).filter(function(e, t, s) {
        return s.indexOf(e) === t
    }), dump.bool_change = !1, dump.audioElement.addEventListener("timeupdate", function(){
        Display.displyrics()
    }), dump.audioElement.addEventListener("play", function(){
        dump.bool_change = !0, Display.displyrics()
    })
	
	MakeEffect();
}

function chkLyricsType(lyrics){
	if(lyrics.match(/<div(.*)ms=(\d{1,2})(.*)timestamp=(\d{1,4})/).length > 0) return true;
}
		
$(document).ready(function(){
    document.addEventListener || (dump.can_play = !1)
}), seek = function(){
    return{
        _s: function(e){
            var t = null;
            return $.each(dump.unique_s, function(){
                (null === t || Math.abs(this - e) < Math.abs(t - e)) && (t = this)
            }), t.valueOf()
        },
        _ms: function(e, t){
            var s = null;
            return $.each($.map($("#lyrics_display > div[" + t + '="' + dump._near + '"]'), function(e){
                return $(e).attr("ms")
            }).filter(function(e, t, s){
                return s.indexOf(e) === t
            }), function(){
                (null === s || Math.abs(this - e) < Math.abs(s - e)) && (s = this)
            }), s.valueOf()
        }
    }
}(), Display = function(){
    return{
        setlyrics: function(e){
            "undefined" != typeof dump.lyrics_temp_time && $("#" + settings.lyrics_box + " [" + settings.timestamp + '="' + dump.lyrics_temp_time + '"]').css("display", "none");
			dump._near = seek._s(playmeta.time);
			dump._near_ms = seek._ms(playmeta.ms, settings.timestamp);
			e = dump._near, dump.processlyrics = 0 != dump._near_ms && settings.get_ms === !0 ? $("#" + settings.lyrics_box + " [" + settings.timestamp + '="' + e + '"][ms="' + dump._near_ms + '"]') : dump.processlyrics = $("#" + settings.lyrics_box + " [" + settings.timestamp + '="' + e + '"]'), dump.processlyrics.css("display", "block"), dump.lyrics_temp_time = e, dump.bool_change = !1
        },
        displyrics: function(){
            playmeta.time = parseInt(dump.audioElement.currentTime);
			playmeta.ms = parseInt(100 * (dump.audioElement.currentTime - playmeta.time).toFixed(2));
			$("#" + settings.lyrics_box + " [" + settings.timestamp + '="' + parseInt(playmeta.time) + '"]').length > 0 || dump.bool_change === !0 && this.setlyrics(playmeta.time);
        }
    }
}();

function request_lyrics()
{
	function _(_){"success" === _.type && chkLyricsType(_.html) ? $("#lyrics_display").html(_.html) && $("#lyrics_display").children().css("display", "none") && evtListener() : alert(_.message)}
    ajax("POST", "index.php", {md: core_flower.mid,srl: core_flower.srl,act: "getAudiolyrics"}, _, "json")
}