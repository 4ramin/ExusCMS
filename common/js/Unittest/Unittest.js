var cTest = $.core;

$.core.Evt.addListener(window, 'load', function () {
	$('#append').append('<h1>Browser Type</h1>');
	
	$('#append').append('isFirefox : ');
	$('#append').append(cTest.Browser.isFirefox() === true ? 'true' : 'false');
	
	$('#append').append('</br>isNetscape : ');
	$('#append').append(cTest.Browser.isNetscape() === true ? 'true' : 'false');
	
	$('#append').append('</br>isOpera : ');
	$('#append').append(cTest.Browser.isOpera() === true ? 'true' : 'false');
	
	$('#append').append('</br>isChrome : ');
	$('#append').append(cTest.Browser.isChrome() === true ? 'true' : 'false');
	
	$('#append').append('</br>isIE : ');
	$('#append').append(cTest.Browser.isIE() === true ? 'true' : 'false');
	
	
	$('#append').append('</br></br><h1>Computer Type</h1>');
	
	
	$('#append').append('isWin : ');
	$('#append').append(cTest.Browser.isWin() === true ? 'true' : 'false');
	
	$('#append').append('</br>isMac : ');
	$('#append').append(cTest.Browser.isMac() === true ? 'true' : 'false');
	
	
	$('#append').append('</br></br><h1>Mobile Status</h1>');
	
	
	$('#append').append('isMobile : ');
	$('#append').append(cTest.Mobile.isMobile() === true ? 'true' : 'false');
	
	
	$('#append').append('</br></br><h1>Browser Status</h1>');
	
	
	$('#append').append('SWF Installed : ');
	$('#append').append(cTest.Flash.isSupport());
	
	$('#append').append('</br>Popup Enabled : ');
	$('#append').append(cTest.Popup.Enabled() === true ? "true" : "false");
	
	$('#append').append('</br>Cookie Enabled : ');
	$('#append').append(cTest.Cookie.isAccept());
	
	$('#append').append('</br>FileReader Enabled : ');
	$('#append').append(cTest.File.isSupport());
	
	$('#append').append('</br>Notify Enabled : ');
	$('#append').append(cTest.Notify.getPermit() === true ? 'true' : 'false');
	
	$('#append').append('</br>Storage Enabled : ');
	$('#append').append(cTest.Storage.isSupport() === true ? 'true' : 'false');
	
	$('#append').append('</br>GEO Enabled : ');
	$('#append').append(cTest.GEO.isSupport());
	
	$('#append').append('</br>Battery Enabled : ');
	$('#append').append(cTest.Battery.isGet() === true ? 'true' : 'false');
	
	$('#append').append('</br>Browser is Mozila : ');
	$('#append').append(cTest.Browser.isMozila() === true ? 'true' : 'false');
	
	$('#append').append('</br>isSupportCssAnimation : ');
	$('#append').append(cTest.Browser.isSupportCssAnimation() === true ? 'true' : 'false');
	
	$('#append').append('</br>isFullScreen : ');
	$('#append').append(cTest.Screen.isFullScreen(window) === true ? 'true' : 'false');
	
	$('#append').append('</br>isConsoleAvailable : ');
	$('#append').append(cTest.Browser.isConsoleAvailable());
	
	$('#append').append('</br>isUserNeedPayCost : ');
	$('#append').append(cTest.Browser.isUserNeedPayCost() === true ? 'true' : 'false');

	$('#append').append('</br>hasIframe : ');
	$('#append').append(cTest.Browser.hasIframe() === true ? 'true' : 'false');
	
	$('#append').append('</br>hasGetUserMedia : ');
	$('#append').append(cTest.Browser.hasGetUserMedia() === true ? 'true' : 'false');
	
	$('#append').append('</br>isOnline : ');
	$('#append').append(cTest.Browser.isOnline());
	
	$('#append').append('</br>getBrowserType : ');
	$('#append').append(cTest.Browser.getType());
	
	$('#append').append('</br>Audio is Support : ');
	$('#append').append(cTest.Audio.isSupport());
	
	$('#append').append('</br>webDB is Support : ');
	$('#append').append(cTest.WebDB.isSupport() === true ? 'true' : 'false');

	$('#append').append('</br>WebSocket is Support : ');
	$('#append').append(cTest.WebSocket.isSupport() === true ? 'true' : 'false');

	$("#append").appendDiv('eventListener');
	$("#append").appendDiv('notifyTab');
	$("#append").appendDiv('keyDownHandler');
	$("#append").appendDiv('getTime');
	
	cTest.Timer.interval('', function(e) {
		$('.getTime').text(cTest.Time.getTime().join(":"));
	}, 1);
	
	$('.notifyTab').click(function() {
		cTest.Notify.Show('Message', 'Hello World', "favicon.ico", "Hello", {
			body: "Hello",
			icon: "notify.png",
			vibrate: 200,
			dir: 'rtl'
		});
	});
	
	if (!$('.notifyTab').text()) {
		$('.notifyTab').text('Show Notify');
	}
	
	if (!$('.keyDownHandler').text()) {
		$('.keyDownHandler').text('KeyCode : 0');
	}
	
	$(window).keyDownHandler(function (keyCode, event) {
		if (keyCode!='') {
			$('.keyDownHandler').text('keyCode : ' + keyCode);
		}
	});
	
	$(window).getEvent(window, function(e) {
		$('.eventListener').text('originalEvent : ' + e.originalEvent + ' type : ' + e.type + ' target : ' + e.target + ' currentTarget : ' + e.currentTarget);
	});
});



var cTest = $.core;

QUnit.config.collapse = true;

//<!--Application-->
QUnit.module("Application");

QUnit.test("App.fnCombine", function(assert) {

	var fn = {
		'unitTest': function() {
			return function() {
				return 'success'
			}
		},
		'Application': function() {
			return function() {
				return 'success'
			}
		}
	};
	
    assert.ok(cTest.App.fnCombine(fn)['unitTest'].call() == 'success', "Result is " + cTest.App.fnCombine(fn)['unitTest'].call());
});

//<!--Array-->
QUnit.module("Array");

QUnit.test("Arr.canPush", function(assert) {
    assert.ok(cTest.Arr.canPush() === true, "Passed!");
});

QUnit.test("Arr.isArrayEqual", function(assert) {
    assert.ok(cTest.Arr.isArrayEqual(['1','2','3'], ['1', '2', '3']) === true, "Passed!");
});

QUnit.test("Arr.Search", function(assert) {
    assert.ok(cTest.Arr.Search(['1','2','3'], '3') === true && cTest.Arr.Search(['1','2','3'], '4') === false, "Passed!");
});

//<!--String-->
QUnit.module("String");

QUnit.test("Str.isBase64", function(assert) {
    assert.ok(cTest.Str.isBase64("dGVzdA==") === true, "Passed!");
});

QUnit.test("Str.addBin", function(assert) {
    assert.ok(cTest.Str.addBin("100101", "11111") === "1000100", "Passed!");
});

QUnit.test("Str.andBin", function(assert) {
    assert.ok(cTest.Str.andBin("100101", "11111") === "000101", "Passed!");
});

QUnit.test("Str.orBin", function(assert) {
    assert.ok(cTest.Str.orBin("100101", "10110") === "110111", "Passed!");
});

QUnit.test("Str.xorBin", function(assert) {
    assert.ok(cTest.Str.xorBin("100101", "10110") === "110011", "Passed!");
});

QUnit.test("Str.randomStr", function(assert) {
    assert.ok(cTest.Str.randomStr(10).length === 10, "Passed!");
});

QUnit.test("Str.escape", function(assert) {
    assert.ok(cTest.Str.escape('\'<>"=&') === "&#x27;&lt;&gt;&quot;=&amp;", "Passed!");
});

QUnit.test("Str.recovery", function(assert) {
    assert.ok(cTest.Str.recovery(cTest.Str.escape('\'<>"=&')) === '\'<>"=&', "Passed!");
});

QUnit.test("Str.cut", function(assert) {
    assert.ok(cTest.Str.cut('Hello World', 5) === "Hello", "Passed!");
});

QUnit.test("Str.lcase", function(assert) {
    assert.ok(cTest.Str.lcase('Hello World') === "hello world", "Passed!");
});

QUnit.test("Str.ucase", function(assert) {
    assert.ok(cTest.Str.ucase('Hello World') === "HELLO WORLD", "Passed!");
});

QUnit.test("Str.length", function(assert) {
    assert.ok(cTest.Str.length('Hello World') === 11, "Passed!");
});

QUnit.test("Str.trim", function(assert) {
    assert.ok(cTest.Str.trim('  Hello World   ') === "Hello World", "Passed!");
});

QUnit.test("Str.ltrim", function(assert) {
    assert.ok(cTest.Str.ltrim('  Hello World   ') === "Hello World   ", "Passed!");
});

QUnit.test("Str.rtrim", function(assert) {
    assert.ok(cTest.Str.rtrim('  Hello World   ') === "  Hello World", "Passed!");
});

QUnit.test("Str.replaceAll", function(assert) {
    assert.ok(cTest.Str.replaceAll('ABAACD', "A", "C") === "CBCCCD", "Passed!");
});

QUnit.test("Str.ucFirst", function(assert) {
    assert.ok(cTest.Str.ucFirst('hello') === "Hello", "Passed!");
});

//<!--Time-->
QUnit.module("String");

QUnit.test("Time.formatTime", function(assert) {
    assert.ok(cTest.Time.formatTime('120') === "02:00", "Passed!");
});

//<!--Browser-->
QUnit.module("Browser");

QUnit.test("Browser.getTitle", function(assert) {
    assert.ok(cTest.Browser.getTitle() === "Test Page", "Browser title is " + cTest.Browser.getTitle());
});

QUnit.test("Browser.getCharSet", function(assert) {
    assert.ok(cTest.Browser.getCharSet() === "utf-8", "Document Char Set is " + cTest.Browser.getCharSet());
});

QUnit.test("Browser.getWindowsVersion", function(assert) {
    assert.ok(cTest.Browser.getWindowsVersion(), "Window Version is " + cTest.Browser.getWindowsVersion());
});

QUnit.test("Browser.getType", function(assert) {
    assert.ok(cTest.Browser.getType(), "Browser is " + cTest.Browser.getType());
});

QUnit.test("Browser.getDetail", function(assert) {
    assert.ok(cTest.Browser.getDetail(), "Browser is " + cTest.Browser.getDetail().Name + ", Version is " + cTest.Browser.getDetail().Version);
});

QUnit.test("Browser.isWheelExists", function(assert) {
    assert.ok(cTest.Element.isWheelExists(), "Wheel is " + (cTest.Element.isWheelExists() ? "supported" : "not supported"));
});

QUnit.test("Browser.getWebColor", function(assert) {
    assert.ok(cTest.Element.getWebColor("ashgrey") === "B2BEB5", "Ashgrey WebColor Hex Code : " + cTest.Element.getWebColor("ashgrey"));
});

QUnit.test("Browser.getRectangle", function(assert) {
    assert.notDeepEqual(cTest.Element.getRectangle("body"), {offset_left: 0, offset_top: 0, position_left: 0, position_top: 0, width: 1000}, "Passed!");
});

QUnit.test("Browser.getInnerWidth", function(assert) {
    assert.notDeepEqual(cTest.Element.getInnerWidth("body"), 0, "Body Inner Width is " + cTest.Element.getInnerWidth("body"));
});

QUnit.test("Browser.getInnerHeight", function(assert) {
    assert.notDeepEqual(cTest.Element.getInnerHeight("body"), 0, "Body Inner Height is " + cTest.Element.getInnerHeight("body"));
});

QUnit.test("Browser.getScrollTop", function(assert) {
    assert.ok(cTest.Element.getScrollTop() > -1, "Scroll Top is " + cTest.Element.getScrollTop());
});

QUnit.test("Browser.getScrollLeft", function(assert) {
    assert.ok(cTest.Element.getScrollLeft() > -1, "Scroll Left is " + cTest.Element.getScrollLeft());
});

QUnit.test("Browser.getWidth", function(assert) {
    assert.ok(cTest.Element.getWidth("body") > -1, "Body Width is " + cTest.Element.getWidth("body"));
});

QUnit.test("Browser.getOffset", function(assert) {
    assert.notDeepEqual(cTest.Element.getOffset("body"), {left: 0, top: 0},"Passed!");
});

QUnit.test("Browser.getLeft", function(assert) {
    assert.notDeepEqual(cTest.Element.getLeft("body") > -1, {left: 0, top: 0}, "Body Left is " + cTest.Element.getLeft("body"));
});

QUnit.test("Browser.getTop", function(assert) {
    assert.notDeepEqual(cTest.Element.getTop("body") > -1, {left: 0, top: 0}, "Body Top is " + cTest.Element.getTop("body"));
});

QUnit.test("Browser.getinnerHTML", function(assert) {
    assert.ok(cTest.Element.getinnerHTML("head") == undefined, "Passed!");
});

//<!--Event-->
QUnit.module("Event");

QUnit.test("Evt.getCallerScriptPath", function(assert) {
    assert.ok(cTest.Evt.getCallerScriptPath(), cTest.Evt.getCallerScriptPath());
});