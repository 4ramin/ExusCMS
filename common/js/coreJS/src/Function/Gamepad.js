//gamePad-related functions
'use strict';

(function ($, core) {

	var A = core.gamePad = {
		registry: function (callback) {
			var gamepads = this.Get();
			for (var i = 0; i < gamepads.length; i++) {
				if (gamepads[i]) {
					if (!(gamepads[i].index in controllers)) {
						callback(gamepads[i]);
					}
				}
			}
		},
		Get: function () {
			return navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
		},
		addDynamicKeys: function (arr) {
			gamePadDynamicKeys = arr;
		},
		hasEvent: function () {
			var padEvent = 'GamepadEvent' in window;
			
			if (padEvent) {
				return true;
			}
			
			return false;
		},
		getType: function (device) {
			return {
				"index": device.gamepad.index,
				"id": device.gamepad.id,
				"button": device.gamepad.buttons.length,
				"axis": device.gamepad.axes.length
			}
		},
		getAxesArrowIndex: function () {
			var j;
			
			for (j in gamePadControllers) {
				var controller = gamePadControllers[j];
				for (var i = 0; i < controller.axes.length; i++) {
					var val = controller.axes[i];
					if (val > gamePadValue) {
						var arrow = 1;
					} else if (val < -gamePadValue) {
						var arrow = -1;
					} else {
						var arrow = 0;
					}
					
					if (arrow != 0) {
						var pressed = true;
						if (i <= 1) {
							var pos = -1;
						} else {
							var pos = 1;
						}
					} else {
						var pressed = false;
						var pos = 0;
					}
					
					if ($.core.Validate.isObject(val)) {
						pressed = val.pressed;
						val = val.value;
					}
					
					if (pressed == true) {
						return {
							"arrow": arrow,
							"pressed": pressed,
							"pos": pos,
							"key": i
						};
					}
				}
			}
		},
		getPressedIndex: function () {
			var j;
			
			for (j in gamePadControllers) {
				var controller = gamePadControllers[j];
				for (var i = 0; i < controller.buttons.length; i++) {
					var val = controller.buttons[i];
					var pressed = val == 1.0;
					if ($.core.Validate.isObject(val)) {
						pressed = val.pressed;
						val = val.value;
					}
					
					if (pressed && !$.core.Validate.isUndefined(i) && !$.core.Arr.Search(gamePadDynamicKeys, i) && controller.buttons[i].pressed == true) {
						if (pressed && pressedGamePadPressedIndex != i) {
							pressedGamePadPressedIndex = i;
							return i;
						}
					} else if (pressed) {
						pressedGamePadPressedIndex = i;
						return i;
					}
				}
			}
		},
		destroy: function (gamepad) {
			delete gamePadControllers[gamepad.index]; //Remove Array
		},
		addKey: function (key, value) {
			gamePadControllers[key] = value;
		},
		isConnected: function () {
			var gp = this.Get()[0];
			
			if ((gp)) {
				if (gp.connected && this.hasEvent()) return true;
			}
			
			return false;
		},
		isKeyExists: function () {
			if (this.Get()) {
				return true;
			}
			
			return false;
		},
		isButtonPressed: function (index) {
			if (self.isConnected() && self.isKeyExists()) {
				var gp = this.Get()[0];
				if (gp.buttons[index] == 1 && gp.buttons[index].pressed) {
					return true;
				}
				
				return false;
			}
		}
	};
})(jQuery, $.core);