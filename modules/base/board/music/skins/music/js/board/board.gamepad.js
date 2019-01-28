"use strict";
var controllers = {};

if ($.core.gamePad.isConnected()) {
	registryGamePad();
}

window.addEventListener("gamepadconnected", function (e) {
	registryGamePad();
});
window.addEventListener("gamepaddisconnected", function (e) {
	$.core.gamePad.destroy(e.gamepad);
});

function registryGamePad() {
	$.core.gamePad.addDynamicKeys([11, 12, 13, 14, 15, 16, 17]);
	setInterval($.core.gamePad.registry(registKey), 100);
}

function registKey(gamepads) {
	$.core.gamePad.addKey(gamepads.index, gamepads);
	var pressKey = $.core.gamePad.getPressedIndex();
	var pressAxes = $.core.gamePad.getAxesArrowIndex();
	
	if ($.core.Validate.isObject(pressAxes)) {
		if (pressAxes['arrow'] == 1 && pressAxes['pos'] == -1 && pressAxes['key'] == 0) {
			$.each($('audio'), function () {
				$(this)[0].currentTime = $(this)[0].currentTime + 10;
			});
		} else if (pressAxes['arrow'] == -1 && pressAxes['pos'] == -1 && pressAxes['key'] == 0) {
			$.each($('audio'), function () {
				$(this)[0].currentTime = $(this)[0].currentTime - 10;
			});
		} else if (pressAxes['arrow'] == -1 && pressAxes['pos'] == -1 && pressAxes['key'] == 1) {
			$.each($('audio'), function () {
				if ($(this)[0].volume < 0.9) {
					$(this)[0].volume = $(this)[0].volume + 0.1;
				}
			});
		} else if (pressAxes['arrow'] == 1 && pressAxes['pos'] == -1 && pressAxes['key'] == 1) {
			$.each($('audio'), function () {
				if ($(this)[0].volume > 0.1) {
					$(this)[0].volume = $(this)[0].volume - 0.1;
				}
			});
		} else if (pressAxes['arrow'] == 1 && pressAxes['pos'] == 1 && pressAxes['key'] == 3) {
			var scrollTop = Element.getScrollTop();
			$(document).scrollTop(scrollTop + 100);
		} else if (pressAxes['arrow'] == -1 && pressAxes['pos'] == 1 && pressAxes['key'] == 3) {
			var scrollTop = Element.getScrollTop();
			$(document).scrollTop(scrollTop - 100);
		}
	}
	switch (pressKey) {
	case 0:
		$.core.Effect.FocusAnimate($(window).height());
		break;
	case 1:
		$('#comment_padding ul').FocusAnimate();
		break;
	case 2:
		$('.bd_lst_wrp').FocusAnimate();
		break;
	case 3:
		$.core.Effect.FocusAnimate(0);
		break;
	case 16:
		$.each($('audio'), function () {
			if ($(this)[0].paused == false) {
				$(this)[0].pause();
			} else {
				$(this)[0].play();
			}
		});
		break;
	case 5:
		$.each($('audio'), function () {
			$(this)[0].currentTime = 0;
		});
		break;
	case 4:
		$.each($('audio'), function () {
			$(this)[0].volume = 0;
		});
		break;
	case 6:
		$.each($('audio'), function () {
			$(this)[0].volume = 1;
		});
		break;
	case 12:
		$.each($('audio'), function () {
			if ($(this)[0].volume < 0.9) {
				$(this)[0].volume = $(this)[0].volume + 0.1;
			}
		});
		break;
	case 13:
		$.each($('audio'), function () {
			if ($(this)[0].volume > 0.1) {
				$(this)[0].volume = $(this)[0].volume - 0.1;
			}
		});
		break;
	case 14:
		$.each($('audio'), function () {
			$(this)[0].currentTime = $(this)[0].currentTime - 10;
		});
		break;
	case 15:
		$.each($('audio'), function () {
			$(this)[0].currentTime = $(this)[0].currentTime + 10;
		});
		break;
	}
}
