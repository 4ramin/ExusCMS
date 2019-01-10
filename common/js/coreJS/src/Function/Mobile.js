//Mobile-related functions
'use strict';

(function ($, core) {

	var A = core.Mobile = {
		isRefMobile: function () {
			return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);
		},
		isMobile: function () {
			var filter = "win16|win32|win64|mac|macintel";
			if (navigator.platform) {
				var isMobile = (filter.indexOf(navigator.platform.toLowerCase()) < 0) ? true : false;
			}
			
			var a = _cNavi.userAgent || _cNavi.vendor || _cWin.opera;
			if (/(android|bb\d+|meego).+mobile|avantgo|webos|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
				var _isMobile = true;
			} else {
				var _isMobile = false;
			}
			
			return _isMobile || isMobile;
		},
		isLGUSeries: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (UserAgent.match("u8[000|110|120|130|180|210|260|330|360|380|500]") || UserAgent.match("u[300|400|830|900|960|990]")) {
					return true;
			}
			
			return false;
		},
		isLGGSeries: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (UserAgent.match("g[1100|1500|1610|1800|3000|3100|4011|4015|4020|4050|5220c|5300|5300i|5310|5400|5500|5600|6070|7000|7020|7030|7050|7100|7200|8000|210|510|510w|650|912]")) {
					return true;
			}
			
			return false;
		},
		isGalaxyMega: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (UserAgent.match("gt-i[9150|9152|9200|9205]")) {
					return true;
			}
			
			return false;
		},
		/* Smartphones */
		isGalaxyS: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (UserAgent.match("gt-i9000[b|m|t|m4]") || UserAgent.match("gt-i9003") || UserAgent.match("gt-i90[09|88]") || UserAgent.match("sch-i[909-919]") || UserAgent.match("sc-02b") || UserAgent.match("shw-m1[10s|30k|30l]")) {
					return true;
			}
			
			return false;
		},
		isGalaxySDuos: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (UserAgent.match("gt-s7562i")) {
					return true;
			}
			
			return false;
		},
		isGalaxyII: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (UserAgent.match("gt-i9100[g|t|m|p]") || UserAgent.match("gt-o9210t") || UserAgent.match("sgh-i[757m|727r|9108|927|929|727|777]") || UserAgent.match("sgh-t[989d|989]") || UserAgent.match("isw11sc") || UserAgent.match("sc-02c") || UserAgent.match("shw-m250[k|l|s]") || UserAgent.match("sph-d710") || UserAgent.match("sch-r989") || UserAgent.match("gt-i9105")) {
				return true;
			}
			
			return false;
		},
		isGalaxyIII: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (UserAgent.match("gt-i[9300|9300t|9305|905n|9305t|9308|9301l]") || UserAgent.match("shv-e210[k|l|s]") || UserAgent.match("sgh-[t999|t999l|t999v|i747|i747m|n064|n035]") || UserAgent.match("sch-[j021|r530|i535|s960l|s968c|i939]") || UserAgent.match("sc-[03e|06d]") || UserAgent.match("scl21")) {
				return true;
			}
			
			return false;
		},
		isGalaxyS4: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (UserAgent.match("gt-i[9500|9505|9506|9595g|9508|9502]") || UserAgent.match("shv-e3[00k|00l|00s|30k|30l|30s]") || UserAgent.match("sgh-[i337|m919|n045|i337m|m919v]") || UserAgent.match("sch-[i515|r970|i959|r970x|r970c]") || UserAgent.match("sph-l720") || UserAgent.match("sc-04e")) {
					return true;
			}
			
			return false;
		},
		isGalaxyS5: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (UserAgent.match("sm-g900[h|f|fd|i|k|l|s|m|md|w8|t|t1|a|v|r2|p|6w|8v|9d|d|j]") || UserAgent.match("sc-04f") || UserAgent.match("slc23")) {
					return true;
			}
			
			return false;
		},
		isGalaxyS7: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (UserAgent.match("sm-g930[f|fd|w9|s|k|l|0|v|a|az|p|t|r4|8|u]") || UserAgent.match("sm-g935[0|v|a|p|t|u|r4|f|fd|w8|s|k|l]") || UserAgent.match("sc-02h") || UserAgent.match("scv33")) {
					return true;
			}
			
			return false;
		},
		isGalaxyS8: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (UserAgent.match("sm-g930[f|fd|w9|s|k|l|0|v|a|az|p|t|r4|8|u]") || UserAgent.match("sm-g935[0|v|a|p|t|u|r4|f|fd|w8|s|k|l]") || UserAgent.match("sc-02h") || UserAgent.match("scv33")) {
					return true;
			}
			
			return false;
		},
		isGalaxyCore: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (UserAgent.match("sm-g[350|3502|386f|g360p]") || UserAgent.match("shw-m580d") || UserAgent.match("gt-i8262d") || UserAgent.match("sch-i829")) {
					return true;
			}
			
			return false;
		},
		isGalaxyNoteTablet: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (UserAgent.match("gt-n[5100|5110|5120|8000|8010|8020]") || UserAgent.match("sm-p[600|601|605|900|905]")) {
					return true;
			}
			
			return false;
		},
		isGalaxyNotePhabletsLTE: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (UserAgent.match("gt-n[7005|7105]") || UserAgent.match("sm-n[9005|7505]")) {
					return true;
			}
			
			return false;
		},
		isGalaxyNotePhablets3G: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (UserAgent.match("gt-n[7000|7100]") || UserAgent.match("sm-n[9000|7500|910g|n915g|n920]")) {
					return true;
			}
			
			return false;
		},
		screenEnabled: function () {
			if (_cNavi.mozPower.screenEnabled) {
				return true;
			}
			return false;
		},
		screenBright: function (value) {
			if (this.screenEnabled() == true) {
				_cNavi.mozPower.screenBrightness = value;
			}
		},
		screenUnlock: function () {
			_cNavi.requestWakeLock('screen');
		},
		powerOff: function () {
			_cNavi.mozPower.powerOff();
		}
	};
})(jQuery, $.core);