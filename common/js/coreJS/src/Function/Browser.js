//Browser-related functions
'use strict';

(function ($, core) {

	var A = core.Browser = {
		isLocalhost: function () {
			//[::1] is the IPv6 localhost address.
			var loc = window.location;
			return ((loc.hostname.match('localhost') || loc.hostname.match('[::1]') || loc.hostname.match('192.168.0.') || loc.hostname.match('127.0.0.1')) ? true : false);
		},
		hasTouchScreen: function () {
			return ("ontouchstart" in window);
		},
		isEmbededObject: function (id) {
			var isEO = false;
			var obj = document.getElementById(id);
			if (obj && (obj.nodeName === "OBJECT" || obj.nodeName === "EMBED")) {
				isEO = true
			}
			return isEO;
		},
		isChromeApp: function () {
			return (window.chrome || wiindow.chrome.storage);
		},
		hasConsole: function () {
			return (window.console || window.console.log);
		},
		hasReplaceState: function () {
			return (window.history || window.history.replaceState);
		},
		redirectToCompleteHost: function () {
			var host = location.host.toLowerCase();
			var url = location.href;
			if (host.indexOf("www")== -1) {
				location.href = url.replace("//","//www.");
			}
		},
		getAllPerformType: function () {
			var performtype = new Array();
			var perform = this.getPerform();
			for (var value in perform) {
				performtype.push(value);
			}
			
			return performtype;
		},
		getHardwareCur: function () {
			return navigator.hardwareConcurrency;
		},
		getPerform: function () {
			return window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};
		},
		getPerformMemorySize: function () { //Not available to workers
			var perform = this.getPerform();
			return perform.memory;
			/*
				{
				  totalJSHeapSize: ***,
				  usedJSHeapSize:  ***,
				  jsHeapSizeLimit: ***
				}
			*/
		},
		getPerformTiming: function () { //Not available to workers
			var perform = this.getPerform();
			return perform.timing;
		},
		is64Bit: function () {
			var agent = navigator.userAgent;
			if (agent.indexOf("x64") != -1) {
				return true;
			} else {
				return false;
			}
		},
		getChromeVersion: function () {
			return parseInt(navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
		},
		isWebVideo: function (url) {
			return /\.webm$|\.mp4$/.test(url);
		},
		isMozila: function () {
			try {
				if (jQuery.browser.mozilla) {
					return true;
				}
				return false;
			} catch (e) {
				return false;
			}
		},
		parseHTML: function (html) {
			return $.parseHTML(html);
		},
		isTouchSupport: function () {
			return "createTouch" in document;
		},
		hasPointerEvents: function () {
			var elem = document.createElement('div');
			var docElem = document.documentElement;
			
			if (!('pointerEvents' in elem.style)) {
				return false;
			}
			
			elem.style.pointerEvents = 'auto';
			elem.style.pointerEvents = 'x';
			docElem.appendChild(elem);
			
			var isSupports = window.getComputedStyle && window.getComputedStyle(elem, '').pointerEvents === 'auto';
			docElem.removeChild(elem);
			
			return !!isSupports;
		},
		isTouchable: function () {
			return "ontouchstart" in document.documentElement;
		},
		getFirstScriptTag: function () {
			return document.getElementsByTagName('script')[0];
		},
		getCancelAnimationFrame: function () {
			if ($.core.Validate.isUndefined($cache['animationFrame'])) {
				$cache['cancelanimationFrame'] = _cWin.cancelAnimationFrame || _cWin.webkitCancelAnimationFrame || _cWin.mozCancelAnimationFrame || _cWin.msCancelAnimationFrame;
			}
			return $cache['cancelanimationFrame'];
		},
		getAnimationFrame: function () {
			if ($.core.Validate.isUndefined($cache['animationFrame'])) {
				$cache['animationFrame'] = _cWin.mozRequestAnimationFrame || _cWin.webkitRequestAnimationFrame || _cWin.requestAnimationFrame || _cWin.oRequestAnimationFrame || _cWin.msRequestAnimationFrame || function (callback) {
					_cWin.setTimeout(callback, 1000 / 60);
				};
			}
			return $cache['animationFrame'];
		},
		disableContextMenu: function () {
			$(document).on('contextmenu', false);
		},
		disableDrag: function () {
			$(document).on('dragstart', false);
		},
		getConsoleErr: function (msg, url, line, column, errorObj) {
			$.core.Base.resetWinCache();
			if (msg.match(/Uncaught TypeError: Cannot read property '(\s?\.?[a-zA-Z\.]+)\w+' of undefined/ig)) {
				msg = /'([^']+)'/.exec(msg);
				msg = _cWin.lang['uncaught'] + _cWin.lang['typeerror'] + _cWin.lang['property'] + msg[0] + _cWin.lang['cannotreadproperty'] + '\n' + url + ':' + line + ':' + column;
				$.log("%c%s", "color: #ef0000; background: #e8ef63; font-size: 15px;", msg);
			} else if (msg.match(/Uncaught ReferenceError: (\s?\.?[a-zA-Z\.]+)\w+ is not defined/ig)) {
				msg = /\:(.*).+is/.exec(msg);
				msg = _cWin.lang['uncaught'] + _cWin.lang['referror'] + msg[1] + _cWin.lang['undefined'] + '\n' + url + ':' + line + ':' + column;
				$.log("%c%s", "color: #ef0000; background: #e8ef63; font-size: 15px;", msg);
			} else if (msg.match(/Uncaught TypeError: (\s?\.?[a-zA-Z\.]+)\w+ is not defined/ig)) {
				msg = /\:(.*).+is/.exec(msg);
				msg = _cWin.lang['uncaught'] + _cWin.lang['type'] + msg[1] + _cWin.lang['undefined'] + '\n' + url + ':' + line + ':' + column;
				$.log("%c%s", "color: #ef0000; background: #e8ef63; font-size: 15px;", msg);
			} else if (msg.match(/Uncaught TypeError: (\s?\.?[a-zA-Z\.()]+)\w+ is not a function/ig)) {
				msg = /\:(.*).+is/.exec(msg);
				msg = _cWin.lang['uncaught'] + _cWin.lang['typeerror'] + msg[1] + _cWin.lang['isnotfunc'] + '\n' + url + ':' + line + ':' + column;
				$.log("%c%s", "color: #ef0000; background: #e8ef63; font-size: 15px;", msg);
			} else {
				$.log(msg + '\n' + url + ':' + line + ':' + column);
			}
		},
		getTitle: function () {
			return document.title;
		},
		setTitle: function (title) {
			document.title = title;
		},
		getHash: function () {
			return _cWin.location.hash.replace('#', '');
		},
		printInnerHTML: function (id) {
			var initBody = document.body.innerHTML;
			window.onbeforeprint = function () {
				document.body.innerHTML = document.getElementById(id).innerHTML;
			}
			
			window.onafterprint = function () {
				document.body.innerHTML = initBody;
			}
			
			window.print();
		},
		Print: function () {
			_cWin.print();
		},
		getSearchEngineQuery: function (engine, keyword) {
			if (engine=='yahoo') {
				result = 'https://search.yahoo.com/search;?p=123' + keyword;
			} else if (engine=='google') {
				result = 'https://www.google.com/search?q=' + keyword;
			} else if (engine=='bing') {
				result = 'https://www.bing.com/search?q=' + keyword;
			} else if (engine=='baidu') {
				result = 'http://www.baidu.com/s?ie=utf-8&wd=' + keyword;
			} else if (engine=='yandex') {
				result = 'https://www.yandex.com/search/?text=' + keyword;
			} else if (engine=='duckduckgo') {
				result = 'https://duckduckgo.com/?q=' + keyword;
			} else if (engine=='gigablast') {
				result = 'https://www.gigablast.com/search?c=main&q=' + keyword;
			}
			
			return result;
		},
		isSupportCssAnimation: function () {
			try {
				return Modernizr.cssanimations;
			} catch (e) {
				return false;
			}
		},
		getHead: function () {
			return _cDoc.getElementsByTagName('head')[0];
		},
		getCharSet: function () {
			if (_cDoc.charset) {
				return _cDoc.charset.toLowerCase();
			} else if (_cDoc.characterSet) {
				return _cDoc.characterSet.toLowerCase();
			}
		},
		isWin: function () {
			if ($.core.Validate.isUndefined($cache['isWin'])) {//Win
				$cache['isWin'] = _cWin.navigator.userAgent.toLowerCase().indexOf("win") !== -1 ? true : false;
			}
			return $cache['isWin'];
		},
		isFirefox: function () {
			if ($.core.Validate.isUndefined($cache['isFirefox'])) {//Firefox
				$cache['isFirefox'] = _cWin.navigator.userAgent.toLowerCase().indexOf("firefox") !== -1 ? true : false;
			}
			return $cache['isFirefox'];
		},
		isNetscape: function () {
			if ($.core.Validate.isUndefined($cache['isNetscape'])) {//Netscape
				$cache['isNetscape'] = _cWin.navigator.userAgent.toLowerCase().indexOf("netscape") !== -1 ? true : false;
			}
			return $cache['isNetscape'];
		},
		isOpera: function () {
			if ($.core.Validate.isUndefined($cache['isOpera'])) {//Opera
				$cache['isOpera'] = (_cWin.navigator.userAgent.toLowerCase().indexOf("opera") !== -1 || _cWin.navigator.userAgent.toLowerCase().indexOf("opr") !== -1) ? true : false;
			}
			return $cache['isOpera'];
		},
		isChrome: function () {
			if ($.core.Validate.isUndefined($cache['isChrome'])) {//Chrome
				$cache['isChrome'] = _cWin.navigator.userAgent.toLowerCase().indexOf("chrome") !== -1 ? true : false;
			}
			return $cache['isChrome'];
		},
		isGecko: function () {
			if ($.core.Validate.isUndefined($cache['Gecko'])) {//Gecko
				$cache['isGecko'] = _cWin.navigator.userAgent.toLowerCase().indexOf("gecko") !== -1 ? true : false;
			}
			return $cache['isGecko'];
		},
		isKonqueror: function () {
			if ($.core.Validate.isUndefined($cache['Konqueror'])) {//Konqueror
				$cache['isKonqueror'] = _cWin.navigator.userAgent.toLowerCase().indexOf("konqueror") !== -1 ? true : false;
			}
			return $cache['isKonqueror'];
		},
		isSafari: function () {
			if ($.core.Validate.isUndefined($cache['isSafari'])) {//AppleWebKit
				$cache['isSafari'] = _cWin.navigator.userAgent.toLowerCase().indexOf("applewebkit") !== -1 ? true : false;
			}
			return $cache['isSafari'];
		},
		isIE: function () {
			if ($.core.Validate.isUndefined($cache['isIE'])) {
				$cache['isIE'] = _cUserAgent.indexOf("MSIE") > 0 || /msie/i.test(_cNavi.userAgent);
			}
			return $cache['isIE'];
		},
		isiOS: function () {
			if ($.core.Validate.isUndefined($cache['isIOS'])) {
				$cache['isIOS'] == _cNavi.platform.match(/(iPhone|iPod|iPad)/i) ? true : false;
			}
			return $cache['isIOS'];
		},
		isMacPlatform: function () {
			if ($.core.Validate.isUndefined($cache['isMacPlatform'])) {
				$cache['isMacPlatform'] == _cNavi.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
			}
			return $cache['isMacPlatform'];
		},
		isBlackBerry: function () {
			if ($.core.Validate.isUndefined($cache['isBlackBerry'])) {
				$cache['isBlackBerry'] == _cWin.navigator.userAgent.toLowerCase().indexOf("blackberry") !== -1 ? true : false;
			}
			return $cache['isBlackBerry'];
		},
		isMac: function () {
			if ($.core.Validate.isUndefined($cache['isMac'])) {
				$cache['isMac'] == _cWin.navigator.userAgent.toLowerCase().indexOf("mac") !== -1 ? true : false;
			}
			return $cache['isMac'];
		},
		isFrame: function (window) {
			var root = window.parent;
			if (root == 'undefined') return false;
			for (i = 0; i < root.frames.length; i++) {
				if (window == root.frames[i]) {
					return true;
				}
			}
			return false;
		},
		getLang: function () {
			_cNavi.language = _cNavi.language || _cNavi.userLanguage;
			return _cNavi.language;
		},
		getCreateShadowRoot: function () {
			_cWin.createShadowRoot = _cWin.createShadowRoot || _cWin.webkitCreateShadowRoot;
			return _cWin.createShadowRoot;
		},
		isStyleScoped: function (elem) {
			return void 0 === elem.document.createElement("style").scoped;
		},
		getRTCPeerConnection: function () {
			_cWin.RTCPeerConnection = _cWin.RTCPeerConnection || _cWin.webkitRTCPeerConnection || _cWin.mozRTCPeerConnection;
			return _cWin.RTCPeerConnection;
		},
		hasRTCPeerConnection: function () {
			return !!(this.getRTCPeerConnection());
		},
		newImageCapture: function (mediaStream) {
			var mediaStreamTrack = mediaStream.getVideoTracks()[0];
			if ($.core.Validate.isObject(mediaStream.getVideoTracks()[0])) {
				return new ImageCapture(mediaStreamTrack);
			}
		},
		startWebCam: function (errCallback) {
			if (this.hasGetUserMedia()) {
				this.getDeviceUserMedia({
					type: true
				}).then(function (mediaStream) {
					return mediaStream;
				}).catch(errCallback);
			}
		},
		getDeviceUserMedia: function (params) {
			return _cWin.navigator.mediaDevices.getUserMedia(params);
		},
		getImageCaptureHandler: function () {
			this.getDeviceUserMedia({video: true}).then(gotMedia).catch(function () {
			//error => {
				return false;
			});
			
			function gotMedia(mediaStream) {
				const mediaStreamTrack = mediaStream.getVideoTracks()[0];
				const imageCapture = new ImageCapture(mediaStreamTrack);
				return imageCapture;
			}
		},
		doCapture: function () {
			var imageCapture = this.getImageCaptureHandler();
			var blobData;
			imageCapture.takePhoto().then(function (blob) {
			//blob => {
				blobData = blob;
			}).catch(function () {
			//error => {
				return false;
			});
			
			return blobData;
		},
		setIframeAPushState: function () {
			if (this.hasIframe()) {
				$("a").click(function () {
					var tag = event.currentTarget.tagName.toUpperCase();
					var url = event.currentTarget.href;
					if (tag === 'A' && !url.match(url)) {
						$.core.Browser.pushState(null, null, url);
					}
				});
			}
		},
		getTarget: function (event) {
			return event.srcElement || event.target;;
		},
		/**
		 * Asynchronous Module Definition
		 **/
		isDefAMD: function () {
			return define.amd;
		},
		isSupportPjax: function () {
			return $.support.pjax;
		},
		getBoundingHeight: function (id) {
			var height = 0;
			var rect = document.getElementById(id).getBoundingClintRect();

			if (rect.height) {
				height = rect.height;
			} else {
				height = rect.bottom - rect.height; 
			}
			
			return height;
		},
		requireJs: function (source) {
			document.write('<script type="text/javascript" src="' + source + '"><\/script>');
		},
		isConsoleDirAvailable: function () {
			if (_cWin.console && _cWin.console.dir) {
				return true;
			}
			return false;
		},
		isConsoleAvailable: function () {
			if (_cWin.console && _cWin.console.log) {
				return true;
			}
			return false;
		},
		hasConnection: function () {
			var connection = this.getConnection();
			if (connection) {
				return true;
			}
			return false;
		},
		getConnection: function () {
			if ($.core.Validate.isUndefined($cache['connection'])) {
				$cache['connection'] = _cNavi.connection || _cNavi.mozConnection || _cNavi.webkitConnection;
			}
			
			return $cache['connection'];
		},
		getUserNetworkSpeed: function () {
			if (this.hasConnection()) {
				var connection = this.getConnection();
				return connection.bandwidth;
			} else {
				return 0;
			}
		},
		isUserNeedPayCost: function () {
			if (this.hasConnection()) {
				var connection = this.getConnection();
				if (!connection.metered && (connection.type && connection.type == "cellular")) {
					return false;
				}
				return false;
			}
			return false;
		},
		getMailWin: function (target) {
			location.href = "mailto:" + target;
		},
		hasIframe: function () {
			if (self !== top) {
				return true;
			}
			return false;
		},
		getBodyMiddleTop: function () {
			return Math.floor(( $("body").outerHeight(true) - $(_cWin).height()) / 2);
		},
		getUserMedia: function () {
			return _cNavi.getUserMedia || _cNavi.webkitGetUserMedia || _cNavi.mozGetUserMedia || _cNavi.msGetUserMedia;
		},
		hasGetUserMedia: function () {
			return !!(this.getUserMedia());
		},
		getVibrator: function () {
			return _cWin.navigator.vibrate || _cWin.navigator.webkitVibrate || _cWin.navigator.mozVibrate || _cWin.navigator.msVibrate;
		},
		hasVibrator: function () {
			return !!(this.getVibrator().vibrate);
		},
		mobileVibrate: function (ms) {
			var vibrator = this.getVibrator();
			
			if (vibrator.vibrate) {
				vibrator.vibrate(ms);
			}
		},
		isSupportTouch: function () {
			var android = _cNavi.userAgent.indexOf('Android') != -1;
			return android || !!('createTouch' in document);
		},
		isOnline: function () {
			$.core.Base.resetNaviCache();
			if (_cNavi.onLine) {
				return true;
			}
			return false;
		},
		appVer: function () {
			return _cNavi.appVersion;
		},
		userAgent: function () {
			return _cNavi.userAgent;
		},
		Product: function () {
			return _cNavi.product;
		},
		appCode: function () {
			return _cNavi.appCodeName;
		},
		appName: function () {
			return _cNavi.appName;
		},
		Url: function () {
			return _cWin.location.href;
		},
		Host: function () {
			return _cWin.location.hostname || _cWin.location.host;;
		},
		path: function () {
			return _cWin.location.pathname;
		},
		protocol: function () {
			return _cWin.location.protocol;
		},
		getCanvas: function (id) {
			var canvas = document.getElementById(id);
			if (canvas.getContext) {
				return this.canvas.getContext('2d');
			}
		},
		_Assign: function ($url) {
			return _cWin.location.assign($url);
		},
		Back: function () {
			_cWin.history.back();
		},
		Refresh: function () {
			location.reload(true);
		},
		Forward: function () {
			_cWin.history.forward();
		},
		/**
		 * Check elements is in the DOM
		 * @param {elem}        : Element
		 **/
		hasDom: function (elem) {
			$.contains(document.documentElement, elem);
		},
		/**
		 * Redirect
		 * @param {url}        : Link
		 * @param {_history}   : History
		 **/
		Redirect: function (url, hasRedirect) {
			if (hasRedirect === true) {
				_cWin.location.replace(url);
			} else {
				_cWin.location.href = url;
			}
		},
		answerCallback: function (msg, callback) {
			var answer = this._Confirm(msg);
			if (answer == true) {
				callback();
			}
		},
		_Prompt: function ($title, $content) {
			return prompt($title, $content);
		},
		_Confirm: function (msg, callback) {
			if ($.core.Validate.isFunc(callback)) {
				var cfm = confirm(msg);
				if (cfm == true) {
					callback();
				}
			} else {
				return confirm(msg);
			}
		},
		/**
		 * Answer before Redirect
		 * @param {$msg}   : Message
		 * @param {url}    : Link
		 **/
		answerRedirect: function (msg, url) {
			var answer = this._Confirm(msg);
			if (answer == true) {
				this.Redirect(url);
			}
		},
		/**
		 * Push State
		 * @param {stateObject}   : state Object
		 * @param {title}         : Title
		 * @param {url}           : Link
		 **/
		pushState: function (stateObject, title, url) {
			_cWin.top.history.pushState(stateObject, title, url);
		},
		replaceState: function (data, title) {
			_cWin.top.history.replaceState(stateObject, title, url);
		},
		isSmartPhone: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (/(Mobile)|(iPhone)|(Android)/gi.exec(userAgent)) {
				return true;
			}
			
			return false;
		},
		getWindowsVersion: function () {
			if (this.isWindows()) {
				var userAgent = _cNavi.userAgent.toLowerCase();
				
				if (/(windows nt 6.2)/gi.exec(userAgent)) {
					return "8";
				} else if (/(windows nt 6.1)/gi.exec(userAgent)) {
					return "7";
				} else if (/(windows nt 6.0)/gi.exec(userAgent)) {
					return "vista";
				} else if (/(windows nt 5.2)/gi.exec(userAgent)) {
					return "2003";
				} else if (/(windows nt 5.1)|(windows XP)/gi.exec(userAgent)) {
					return "XP";
				} else if (/(windows nt 5.0)|(windows 2000)/gi.exec(userAgent)) {
					return "2000";
				} else if (/(windows nt 4.0)|(winnt4.0)|(winnt)|(windows nt)/gi.exec(userAgent)) {
					return "4.0";
				} else if (/(windows ME)/gi.exec(userAgent)) {
					return "ME";
				} else if (/(windows 98)|(win98)/gi.exec(userAgent)) {
					return "98";
				} else if (/(windows 95)|(win95)|(windows_95)/gi.exec(userAgent)) {
					return "95";
				} else if (/(win16)/gi.exec(userAgent)) {
					return "3.11";
				}
			}
		},
		/*
		 * Make sure the operating system is Microsoft Windows as the user agent value.
		 */
		isWindows: function () {
			var userAgent = _cNavi.userAgent.toLowerCase();
			if (/(windows)|(winnt)|(win98)|(win95)|(win16)/gi.exec(userAgent)) {
				return true;
			}
			
			return false;
		},
		/*
		 * Make sure the operating system is Linux as the user agent value.
		 */
		isLinux: function () {
			var userAgent = _cNavi.userAgent.toLowerCase();
			if (/(linux)/gi.exec(userAgent)) {
				return true;
			}
			
			return false;
		},
		/*
		 * Make sure the operating system is Sun OS as the user agent value.
		 */
		isSunOS: function () {
			var userAgent = _cNavi.userAgent.toLowerCase();
			if (/(sunos)/gi.exec(userAgent)) {
				return true;
			}
			
			return false;
		},
		/*
		 * Make sure the operating system is isOpenBSD as the user agent value.
		 */
		isOpenBSD: function () {
			var userAgent = _cNavi.userAgent.toLowerCase();
			if (/(openbsd)/gi.exec(userAgent)) {
				return true;
			}
			
			return false;
		},
		/*
		 * Make sure the operating system is MacPowerPC as the user agent value.
		 */
		isMacPowerPC: function () {
			var userAgent = _cNavi.userAgent.toLowerCase();
			if (/(mac_powerpc)/gi.exec(userAgent)) {
				return true;
			}
			
			return false;
		},
		getDetail: function () {
			var Browser = {};
			var userAgent = _cNavi.userAgent.toLowerCase();
			
			if (userAgent.indexOf("msie") > -1) {
				Browser.Name = 'Internet Explorer';
				Browser.Version = parseFloat(userAgent.match(/msie (\d+\.\d+)/)[1]);
				if (Browser.Version >= 8 && document.documentMode >= 7) {
					Browser.documentMode = document.documentMode;
				}
			} else if (userAgent.indexOf("firefox") > -1) {
				Browser.Name = 'Firefox';
				Browser.Version = parseFloat(userAgent.match(/firefox\/(\d+\.\d+)/)[1]);
			} else if (userAgent.indexOf("chrome") > -1) {
				Browser.Name = 'Chrome';
				Browser.Version = parseFloat(userAgent.match(/chrome\/(\d+\.\d+)/)[1]);
			} else if (userAgent.indexOf("opera") > -1) {
				Browser.Name = 'Opera';
				Browser.Version = parseFloat(userAgent.match(/opera\/(\d+(\.\d+)?)/)[1]);
			} else if (userAgent.indexOf("applewebkit") > -1) {
				Browser.Name = 'Safari';
				Browser.Version = parseFloat(userAgent.match(/applewebkit\/(\d+(\.\d+)?)/)[1]);
			} else {
				Browser.Name = 'Unknown';
				Browser.Version = '0';
			}
			
			return Browser;
		},
		/**
		 * Get Browser User Agent Type
		 **/
		getType: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (UserAgent.indexOf("nokia") != -1) return 'Nokia';
			if (UserAgent.indexOf("sonyericsson") != -1) return 'Sony Ericsson';
			if (UserAgent.indexOf("polaris") != -1) return 'POLARIS';
			if (UserAgent.indexOf("symbian") != -1) return 'Symbian';
			if (UserAgent.indexOf("blackberry") != -1) return 'BlackBerry';
			if (UserAgent.indexOf("shw-m180") != -1) return 'Galaxy Tab';
			if (UserAgent.indexOf("shw-m380") != -1) return 'Galaxy Tab 10';
			//Internet Explorer
			if (UserAgent.indexOf("msie 6.") != -1) return 'MSIE 6.x';
			if (UserAgent.indexOf("msie 7.") != -1) return 'MSIE 7.x';
			if (UserAgent.indexOf("msie 8.") != -1) return 'MSIE 8.x';
			if (UserAgent.indexOf("msie 9.") != -1) return 'MSIE 9.x';
			if (UserAgent.indexOf("msie 10.") != -1) return 'MSIE 10.x';
			if (UserAgent.indexOf("android") != -1) return 'Android';
			//iOS
			if (UserAgent.indexOf("iphone") != -1) return 'iPhone';
			if (UserAgent.indexOf("ipad") != -1) return 'iPad';
			if (UserAgent.indexOf("ipod") != -1) return 'iPod';
			//Microsoft
			if (UserAgent.indexOf("iemobile") != -1) return 'IEMobile';
			if (UserAgent.indexOf("windows ce") != -1) return 'Windows CE';
			if (UserAgent.indexOf("windows phone") != -1) return 'Windows Phone';
			if (UserAgent.indexOf("netscape") != -1) return 'Netscape';
			if (UserAgent.indexOf("msie") != -1) return 'Internet Explorer';
			//General
			if (UserAgent.indexOf("opera") != -1) return 'Opera';
			if (UserAgent.indexOf("chrome") != -1) return 'Chrome';
			if (UserAgent.indexOf("mozilla/5.0") != -1) return 'Mozilla';
			if (UserAgent.indexOf("firefox") != -1) return 'Firefox';
			if (UserAgent.indexOf("opera mobi") != -1) return 'Opera Mobi';
			if (UserAgent.indexOf("opera mini") != -1) return 'Opera Mini';
			if (UserAgent.indexOf("webtv") != -1) return 'WebTV'; //LG
			//Max OS
			if (UserAgent.indexOf("chimera") != -1) return 'Chimera';
			if (UserAgent.indexOf("safari") != -1) return 'Safari';
		},
		/**
		 * Bookmark
		 * @param {url}	  : Bookmark URL
		 * @param {title} : Bookmark Title
		 **/
		Bookmark: function (url, title) {
			if (_cNavi.userAgent.toLowerCase().indexOf('chrome') > -1) {
				alert((_cNavi.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'Ctrl') + _cWin.lang['favorite']);
			} else if (_cWin.sidebar && _cWin.sidebar.addPanel) {
				_cWin.sidebar.addPanel(title, url, '');
			} else if ((_cWin.sidebar && (_cNavi.userAgent.toLowerCase().indexOf('firefox') > -1)) || (_cWin.opera && _cWin.print)) {
				var aElements = document.createElement('a');
				aElements.setAttribute('href', url);
				aElements.setAttribute('title', name);
				aElements.setAttribute('rel', 'sidebar');
				aElements.click();
			} else if (_cWin.sidebar && Browser.isMozila()) {
				jQuery(this).attr('rel', 'sidebar');
			} else {
				if (_cWin.external && ('AddFavorite' in _cWin.external)) {
					_cWin.external.AddFavorite(url, title);
				} else {
					alert((_cNavi.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'Ctrl') + _cWin.lang['favorite']);
				}
			}
		}
	};
})(jQuery, $.core);