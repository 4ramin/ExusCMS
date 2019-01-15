//Request-related functions
'use strict';

(function ($, core) {
	var A = core.Request = {
		getCharSet: function () {
			return document.characterSet || document.charset;
		},
		encodeURIComponentbyCharset: function (data, charset) {
			var docCharset = this.getCharSet();
			var charset = charset.toLowerCase();
			if (docCharset.toLowerCase() == charset) {
				return encodeURIComponent(data);
			}
			return data;
		},
		getActiveXObject: function () {
			return _cWin.ActiveXObject;
		},
		getLocation: function () {
			return document.location;
		},
		getProtocol: function () {
			return document.location.protocol;
		},
		isSSL: function () {
			return /^ssl./i.test(document.location.host);
		},
		/**
		 * Change HTTP Protocol to HTTPS
		 **/
		inSSL: function () {
			if (this.getProtocol() == 'http:') {
				document.location.href = document.location.href.replace('http:', 'https:');
			}
		},
		/**
		 * Change HTTPS Protocol to HTTP
		 **/
		outSSL: function () {
			if (this.getProtocol() == 'https:') {
				document.location.href = document.location.href.replace('https:', 'http:');
			}
		},
		isOnBeforeUnload: function () {
			return _cWin.onbeforeunload;
		},
		/**
		 * Parse URL for Get URL Parameter 
		 * @param {url}	: URL
		 *
		 * @return {object}
		 **/
		parseUrl: function (url) {
			var a = document.createElement('a');
			a.href = url;
			
			return {
				source: url,
				protocol: a.protocol.replace(':', ''),
				host: a.hostname,
				prot: a.port,
				query: a.search,
				hash: a.hash.replace('#', ''),
				path: a.pathname.replace(/^([^\/])/, '/$1'),
				segments: a.pathname.replace(/^\//, '').split('/'),
				params: (function () {
					var ret = {},
						seg = a.search.replace(/^\?/, '').split('&'),
						len = seg.length,
						i = 0,
						s;
					for (; i < len; i++) {
						if (!seg[i]) {
							continue;
						}
						s = seg[i].split('=');
						ret[s[0]] = s[1];
					}
					return ret;
				})()
			}
		},
		isCachedRequest: function (type) {
			return (/^(GET|HEAD|POST|PATCH)$/.test(type))
		},
		isSafeRequest: function (type) {
			return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(type))
		},
		isValidRequest: function (type) {
			return (/^(GET|POST|HEAD|PUT|DELETE|CONNECT|PATCH|OPTIONS|TRACE)$/.test(type))
		},
		getScript: function (script) {
			$.getScript(script);
		},
		getReadyStatus: function () {
			return document.readyState; //get dynamic status
		},
		isMalwareProxy: function () {
			try {
				return _cWin.location.host.endsWith(".duapp.com") || _cWin.location.host.endsWith(".25lm.com")
			} catch (e) {
				return !1
			}
		},
		/**
			$.Request.isUrlExists(href, function (success) {
					if (success) {
						alert('success');
					} else {
						alert('failed');
					}
			})
			
		 * Check Url is Exist
		 * @param {url}        : url
		 * @param {callback}   : Callback
		 **/
		isUrlExists: function (url, callback) {
			if (!$.core.Validate.isFunc(callback)) {
				throw Error('callback is not function');
			} else {
				$.ajax({
					type: 'HEAD',
					url: url,
					success: function () {
						$.proxy(callback, this, true);
					},
					error: function () {
						$.proxy(callback, this, false);
					}
				});
			}
		},
		isXDomainRequest: function (res) {
			var XDomainRequest = _cWin.XDomainRequest;
			return XDomainRequest && res instanceof XDomainRequest;
		},
		runCustomCallback: function (id, prefix, args) {
			if ($.core.Validate.isFunc(customCallbacks[id][prefix])) {
				customCallbacks[id][prefix].call(this, args);
			}
		},
		addRequireCSS: function (css) {
			requireCSS.push(css);
			$.core.Element.setCSS(css);
		},
		addRequireJS: function (js) {
			requireJS.push(js);
			$.core.Element.setJS(js);
		},
		//addRewriteParams() {
			//rewriteRegister
		//},
		/**
		 * add Ajax Sucess Callback
		 * @param {id}        : id
		 * @param {callback}  : Callback
		 **/
		addCustomCallback: function (id, prefix, callback) {
			if (!$.core.Validate.isUndefined(customCallbacks[id])) {
				$.log(id + ' ajax callback is exists');
				customCallbacks[id] = {};
			}
			
			if ($.core.Validate.isFunc(callback)) {
				customCallbacks[id][prefix] = callback;
			}
			
			return this;
		},
		/**
		 * add Ajax Sucess Callback
		 * @param {id}        : id
		 * @param {callback}  : Callback
		 **/
		addAjaxCallback: function (id, callback) {
			var callerScript = $.core.Evt.getCallerScriptPath();
			callerScript = callerScript[3];
			
			var host = location.hostname;
			var protocol = location.hostname == 'localhost' ? '' : document.location.protocol + '//';
			var domain = protocol + host;
			var regex = new RegExp(domain + '\/.*.js', "i");
			var isSafeCaller = regex.test(callerScript);
			
			if (!isSafeCaller) {
				//console.log('do not allow fix the script ' + callerScript);
				//return;
			}
			
			if (jQuery.isReady) {
				//console.log('do not allow add ajax callback on document ready');
				//return;
			}
			
			if (!$.core.Validate.isUndefined(ajaxCallbacks[id])) {
				$.log(id + ' ajax callback is exists');
			}
			
			if ($.core.Validate.isFunc(callback)) {
				ajaxCallbacks[id] = callback;
			}
			
			return this;
		},
		/**
		 * add Ajax Fail Callback
		 * @param {id}        : id
		 * @param {callback}  : Callback
		 **/
		ajaxFailCallbacks: function (id, callback) {
			if (!$.core.Validate.isUndefined(ajaxCallbacks[id])) {
				$.log(id + ' ajax fail callback is exists');
			}
			
			if ($.core.Validate.isFunc(callback)) {
				ajaxFailCallbacks[id] = callback;
			}
			
			return this;
		},
		/**
		 * Convert file to blob by url
		 * @param {url}       : Link
		 * @param {callback}  : Callback
		 **/
		getBlobDataXhr: function (url, callback) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.responseType = 'blob';
			xhr.onload = function (e) {
				if (this.status == 200) {
					var blob_data = $.core.URL.createObject(this.response);
					return callback(blob_data);
				}
			};
			
			xhr.send();
		},
		/**
		 * Convert file to base64 by url
		 * @param {url}       : Link
		 * @param {callback}  : Callback
		 **/
		getBase64DataXhr: function (url, callback) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.responseType = 'arraybuffer';
			xhr.onload = function (e) {
				if (this.status == 200) {
					var binaryArr = new Array(i);
					var uInt8Array = new Uint8Array(this.response);
					var i = uInt8Array.length;
					while (i--) binaryArr[i] = String.fromCharCode(uInt8Array[i]);
					var data = binaryArr.join('');
					var base64 = _cWin.btoa(data);
					return callback(base64);
				}
			};
			
			xhr.send();
		},
		/**
		 * Get Url Aux
		 * @param {url} : URL
		 **/
		getAux: function (url) {
			return url.indexOf("?") == -1 ? aux = "?" : aux = "&";
		},
		/**
		 * Get URL Response
		 * @param {url}	      : POST URL Parameter
		 * @param {content}	  : POST Content Parameter
		 *
		 * @return {array}
		 **/
		getReponse: function (url, content) {
			var result = new Array;
			var aux = this.getAux(url);
			var xhr = (document.body, this.createXhrObject());
			
			xhr.open("POST", url + aux + "time=" + (new Date).getTime(), false);
			typeof (content == 'undefined') ? content = "" : xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send(content);
			
			if ($.core.Browser.isSafari() || $.core.Browser.isOpera()) {
				resultNodes = xhr.responseXML.firstChild.childNodes;
				for (var i = 0; i < resultNodes.length; i++) {
					null != resultNodes.item(i).firstChild && (result[resultNodes.item(i).nodeName] = resultNodes.item(i).firstChild.nodeValue);
				}
				return result;
			}
		},
		/**
		 * Get XMLHttpRequest Handler
		 * @return {object} : ActiveXObject
		 **/
		getXMLHttp: function () {
			if ($.core.Request.getActiveXObject()) {
				var ActiveXList = [
					listMSXML2
				];
			} else if (_cXMLHttpRequest) {
				var ActiveXList = [
					listXMLHTTP
				];
			}
			
			this.length = ActiveXList.length;
			
			for (var i = 0; i < this.length; i++) {
				try {
					var ActiveX = new($.core.Request.getActiveXObject())(ActiveXList[i]);
					return function () {
						if (ActiveX) {
							return ActiveX;
						} else {
							return new($.core.Request.getActiveXObject())(ActiveXList[i]);
						}
					};
				} catch (e) {}
			}
			
			throw new Error('Ajax not supported');
		},
		/**
		 * Return XHR Object
		 *
		 * @return {object} : XHR Object
		 **/
		createXhrObject: function () {
			if (_cWin.XMLHttpRequest) {
				var xhr = new XMLHttpRequest();
			} else if (_cWin.ActiveXObject) {
				var xhr = this.getXMLHttp();
			}
			if ($.core.Validate.isObject(xhr)) {
				return xhr;
			} else {
				return false;
			}
		},
		/**
		 * Append Javascript into Head
		 * @param {type}	  : Bookmark URL
		 * @param {url}	  : Bookmark URL
		 * @param {title} : Bookmark Title
		 **/
		appendJsInstance: function (src) {
			var head = $('head')[0];
			var script = document.createElement('SCRIPT');
			script.src = src;
			script.onload = function () {
				head.removeChild(script);
			}
			
			head.appendChild(script);
		},
		/**
		 * HTTP Object
		 **/
		HTTPObject: function () {
			this.async = false;
			switch (arguments.length) {
				case 0:
					break;
				case 1:
					this.url = arguments[0];
					break;
				case 2:
					this.method = arguments[0];
					this.url = arguments[1];
					this.charset = arguments[2];
				case 3:
					this.async = arguments[2];
				default:
			}
			
			this._request = $.core.Request.createXhrObject();
			
			if (null == this._request) {
				return null;
			}
		},
		/**
		 * XMLHttpRequest Call
		 * @param {type}	  : Bookmark URL
		 * @param {url}	  : Bookmark URL
		 * @param {title} : Bookmark Title
		 **/
		xhr: function (type, url, params, async) {
			try {
				var xhr = this.createXhrObject();
				
				if (xhr === false) return;
				
				if (params == "POST") {
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
					xhr.setRequestHeader("Content-length", params.length);
					xhr.setRequestHeader("Access-Control-Allow-Origin", "*.*");
				}
				
				if (!async) {
					async = true;
				}
				
				xhr.open(type, url, async);
				xhr.send(params);
				
				if ($.core.Browser.isOpera() || $.core.Browser.isSafari() || $.core.Browser.isGecko()) {
					xhr.onload = function () {
						if (xhr.readyState === 4) {
							if (/^20\d$/.test(xhr.status)) {
								return xhr;
							} else {
								alert(ResponseCode[xhr.status] + ' : ' + xhr.statusText);
							}
						}
					};
				} else {
					xhr.onreadystatechange = function () {
						if (xhr.readyState === 4) {
							if (/^20\d$/.test(xhr.status)) {
								return xhr;
							} else {
								alert(ResponseCode[xhr.status] + ' : ' + xhr.statusText);
							}
						}
					};
				}
				
				
			} catch (e) {
				console.log(e)
			}
		},
		sendMessage: function (id, msg, url) {
			try{
				var _window = document.getElementById(id).contentWindow;
				_window.postMessage(msg, url);
			} catch(e) {
				console.log(e);
			}
		},
		_ajax: function () {
			defaultHeaders = {
				contentType: 'application/x-www-form-urlencoded',
				accept: {
					'*': 'text/javascript, text/html, application/xml, text/xml, */*',
					xml: 'application/xml, text/xml',
					html: 'text/html',
					text: 'text/plain',
					json: 'application/json, text/javascript',
					js: 'application/javascript, text/javascript'
				},
				requestedWith: 'XMLHttpRequest'
			};
		},
		/**
		 * Show wait form when ajax request
		 * @param {message} : Form Message
		 * @param {timeout} : Hide Form Timeout
		 * @param {skin}    : Form Skin
		 **/
		setWaitForm: function (message, timeout, skin) {
			waitForm = $.core.Element.addDivOnBody('waitForm'); //global
			waitformSkin = skin || waitformSkin;
			
			//equalizer, rotatepalette, pulse, curve, bouncing, waveball, raindrops, dualring, interwind, dashring, ellipsis, dotdot, round, ring, macfan, paletterotatingring, romaniruiz, pulsingsquares,  messenger-typing, orbitballs, blockrotate, doubleringspinner
			var skingif = waitFormSkin[skin] || waitFormSkin['orbitballs'];
			var ajaxAnimate = 'common/js/coreJS/ajaxloadgif/' + skingif.gif;
			
			if (waitformSkin == 'statusView') {
				$(waitForm)
				.css('position', 'fixed')
				.css('display', 'inline-block')
				.css('top', '0')
				.css('bottom', '0')
				.css('left', '0')
				.css('right', '0')
				.css('border', '2px solid #050a14')
				.css('border-radius', '5px')
				.css('background-color', '#f3f3f3')
				.css('padding', '12px')
				.css('width', skingif.width)
				.css('height', skingif.height)
				.css('margin', 'auto')
				.css('font-weight', 'bold')
				.css('font-size', '15px')
				.css('text-align', 'center')
				.css('color', '#212020')
				.css('opacity', '1')
				.css('-webkit-box-shadow', 'rgba(0, 0, 0, 0.046875) 0px 5px 10px')
				.css('z-index', '0');
				
				var msgcss = 'height:' + skingif.height + ';width:' + skingif.width + ';position:absolute;top:3px;left:3px';
				
				if (message) {
					$(waitForm).html('<img style="' + msgcss + '" src="' + ajaxAnimate + '"/>' + message);
				} else {
					$(waitForm).html('<img style="' + msgcss + '" src="' + ajaxAnimate + '"/>' + _cWin.lang['request']);
				}
			} else if (waitformSkin == 'default') {
				$(waitForm)
				.css('position', 'fixed')
				.css('display', 'inline-block')
				.css('top', '0')
				.css('bottom', '0')
				.css('left', '0')
				.css('right', '0')
				.css('width', skingif.width)
				.css('height', skingif.height)
				.css('margin', 'auto')
				.css('opacity', '1')
				.css('z-index', '9999');
					
				var msgcss = 'height:' + skingif.height + ';width:' + skingif.width + ';';
				
				$(waitForm).html('<img style="' + msgcss + '" src="' + ajaxAnimate + '"/>');
			}
			
		},
		/**
		 * Destroy wait form
		 * @param {timeout} : Hide Form Timeout
		 **/
		destroyWaitForm: function (timeout) {
			$(waitForm).fadeOut(timeout, function () {
				$(this).remove();
				if ($('.waitForm').length) {
					$('.waitForm').remove();
				}
			});
		},
		workerXHR: function (params, callback, retcallback) {
			loader.postMessage(params);
			loader.onmessage = function (event) {
				callback(event.data, retcallback);
			}
		},
		/**
		 * Ajax Request Call
		 * @param {type} 	 : Request Type
		 * @param {url}	     : Request URL
		 * @param {params}	 : Parameter
		 * @param {callback} : Callback
		 * @param {datatype} : Data Type
		 **/
		ajax: function (type, url, params, callback, datatype, message, userargs) {
			isAjaxProcessing = true; //global
		
			try {
				var $self = this;
				$self.setWaitForm(message);
				
				var request = $.ajax({
					contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
					cache: true,
					type: type,
					xhrfields : {withCredentials : true}, //CORS
					/*
						* Header Required *
						Access-Control-Allow-Credentials : true
						Access-Control-Allow-Origin : http://localhost
					 */
					url: url,
					async: true, //overlab
					dataType: datatype,
					data: params,
					success: function (args, txtStatus, xhr) {
						if (!callback) return;
						
						if ($.core.Validate.isFunc(ajaxCallbacks[callback])) {
							try {
								args = (args === null) ? '' : args;
								if (args) {
									args = $.core.JSON.autoDecode(args);
									if (userargs) {
										args['coreUserObj'] = userargs;
									}
									
									try {
										ajaxCallbacks[callback].call(this, args);
									} catch (e) {}
								}
								var xhrStatus = xhr.status;
								if (xhrStatus) {
									if (debug === true) {
										$.log(ResponseCode[xhrStatus]);
									}
									
									if (waitformSkin == 'status_viewer') {
										$(waitForm).html(ResponseCode[xhrStatus]);
									}
								}
								
								$self.destroyWaitForm(waitTimeout);
								if (isAjaxProcessing == true) {
									isAjaxProcessing = false;
								}
							} finally {
								if (isAjaxProcessing == true) {
									isAjaxProcessing = false;
								}
							}
						}
					},
					error: function (xhr) {
						try {
							if ($.core.Validate.isFunc(ajaxFailCallbacks[callback])) {
								ajaxFailCallbacks[callback].call(this, args);
								if (debug === true) $.log(ResponseCode[xhr.status]);
								$self.destroyWaitForm(waitTimeout);
							} else {
								$self.destroyWaitForm(waitTimeout);
								$(waitForm).html(ResponseCode[xhr.status]);
							}
						} finally {
							if (isAjaxProcessing == true) {
								isAjaxProcessing = false;
							}
						}
					}
				});
			} catch (e) {
				console.log(e);
			} finally {
				request = null; 
			}
			
			isAjaxProcessing = false;
		}
	};
	
	/* Example
		var request = new core.Request.HTTPObject("GET", "http://localhost/index.php");
		request.onSuccess = function () {
			console.log(request.getResponse());
		}
		request.send("packet");
	*/
	
	$.core.Request.HTTPObject.prototype.onSuccess = function () {}
	$.core.Request.HTTPObject.prototype.onError = function () {}
	
	$.core.Request.HTTPObject.prototype.getResponse = function () {
		return this._request.responseText;
	}
	$.core.Request.HTTPObject.prototype.getResponseXML = function () {
		return this._request.responseXML;
	}
	
	$.core.Request.HTTPObject.prototype.send = function () {
		this._request.open(this.method, this.url, this.async);
		//this._request.setRequestHeader("Referer", location.href);
		var instance = this;
		this._request.onreadystatechange = function () {
			if (instance._request.readyState == 4) {
				instance.onSuccess();
			} else {
				instance.onError();
			}
		}
		if (arguments.length > 0) {
			this.content = arguments[0];
			if (this.content.length > 0) {
				this._request.setRequestHeader("Content-Type", this.contentType);
				this._request.send(this.content);
			}
		}
	}
})(jQuery, $.core);