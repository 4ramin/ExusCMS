//Array-related functions
'use strict';

(function ($, core) {

	var A = core.Arr = {
		forEach: function (array, callback) {
			if (array && array.length && $.core.Validate.isFunc(callback)) {
				this.length = array.length;
				for (var i = 0; i < this.length; i++) {
					callback(array[i], i, array);
				}
			}
		},
		range: function (N) {
			Array.apply(null, {length: N}).map(function(value, index){
			  return index + 1;
			});
		},
		/**
		 * Check that Array can push
		 *
		 * @return <Boolean>
		 **/
		canPush: function () {
			if (!new Array().push) {
				return false;
			}
			
			return true;
		},
		/**
		 * Get Minium Value in Array
		 *
		 * @param <Array> arr : Array
		 *
		 * @return <Boolean>
		 **/
		getMinValue: function (arr) {
			return Math.min(...arr);
		},
		getLessValue: function (arr, val, min) {
			return arr.find(val => val < min);
		},
		/**
		 * Get Minium Index in Array
		 *
		 * @param <Array> arr : Array
		 *
		 * @return <Integer>
		 **/
		getLessIndex: function (arr, val, min) {
			return arr.findIndex(val => val < min);
		},
		getMoreValue: function (arr, val, min) {
			return arr.find(val => val > min);
		},
		getMoreIndex: function (arr, val, min) {
			return arr.findIndex(val => val > min);
		},
		/**
		 * Get Random Number
		 *
		 * @param <Array> arr : Array
		 *
		 * @return <Integer>
		 **/
		getRandom: function (arr) {
			return arr[Math.floor(arr.length * Math.random())];
		},
		sibling: function (arr, c) {
			for (var result = []; arr; arr = arr.nextSibling) {
				if (arr.nodeType === 1 && arr !== c) {
					result.push(arr);
				}
			}
			
			return result;
		},
		/**
		 * Get Unique Array Values
		 *
		 * @return <Array>
		 **/
		getUnique: function (arr) {
			return arr.filter(function (item, i, ar) {
				return ar.indexOf(item) === i;
			});
		},
		/**
		 * initialize Array
		 *
		 * @param <Arguments>
		 **/
		initArray: function () {
			var _this = new Array();
			this.length = arguments.length;
			if (this.length > 0) {
				for (var i = 0; i < this.length; i++) {
					if (!$.core.Validate.isUndefined(arguments[i])) {
						_this[i + 1] = arguments[i];
					}
				}
			}
			
			return _this;
		},
		locationFrame: function (id, type, url) {
			var iframe = document.getElementById(id);
			if (iframe) {
				var sendData = {}
				sendData.type = type;
				sendData.url = url;
				
				var sendDataJson = JSON.stringify(sendData);
				var target = this.getPostMessage(iframe.contentWindow.window);
				
				target.postMessage(sendDataJson, '*');
			}
		},
		getPostMessage: function (target) {
			return (target.postMessage ? target : (target.document.postMessage ? target.document : undefined));
		},
		sendLinkToIframe: function (id, data) {
			target = document.getElementById(id);
			target.contentWindow.window.postMessage(data, '*');
		},
		/**
		 * Check that Array is equal
		 *
		 * @param <Array> {arr1}       : Array
		 * @param <Array> {arr2}       : Array
		 *
		 * @return <Boolean>
		 **/
		isArrayEqual: function (arr1, arr2) {
			var bool = (arr1.length == arr2.length) && arr1.every(function (element, index) {
				return element === arr2[index];
			});
			return bool;
		},
		/**
		 * Sortable Array
		 *
		 * @param <Array> arr : Array
		 *
		 * @return <Array>
		 **/
		sort: function (arr) {
			var temp = {};
			
			this.length = arr.length;
			
			for (var i = 0; i < this.length; i++) {
				temp[arr[i]] = true;
			}
			
			return nativeKeys(temp);
		},
		isDef: function (args) {
			this.length = args.length;
			if (this.length > 0) {
				for (var i = 0; i < this.length; ++i) {
					if ($.core.Validate.isUndefined(args[i])) {
						return false;
					}
				}
				return true;
			}
		},
		/**
		 * Replace Text to Replace Text in Array
		 *
		 * @param <Array> arr      : Array
		 * @param <String> find    : to Find Text
		 * @param <String> replace : Set the Replacement Text
		 *
		 * @return <Array>
		 **/
		replace: function (arr, find, replace) {
			for (var i = 0; i < arr.length; i++) {
				arr[i] = arr[i].replace(find, replace);
			}
			return arr;
		},
		/**
		 * Find Object in Array
		 *
		 * @param <Array> arr      : Array
		 * @param <Object> obj     : to Find Object
		 *
		 * @return <Array>
		 **/
		Search: function (arr, obj) {
			this.length = arr.length;
			for (var i = 0, len = this.length; i < len; i++) {
				if (arr[i] == obj) {
					return true;
				}
			}
			return false;
		},
		/**
		 * Array Maximum Number Filter by specify number
		 *
		 * @param <Array> arr      : Array
		 * @param <String> max     : Maximum number
		 *
		 * @return <Array>
		 **/
		filterMax: function (arr, max) {
			return $.grep(arr, function (n, i) {
				return n > max;
			});
		},
		/**
		 * Array Minimum Number Filter by specify number
		 *
		 * @param <Array> arr      : Array
		 * @param <String> max     : Minimum number
		 *
		 * @return <Array>
		 **/
		filterMin: function (arr, min) {
			$.grep(arr, function (n, i) {
				return n > min;
			}, true);
		}
	};
	
})(jQuery, $.core);