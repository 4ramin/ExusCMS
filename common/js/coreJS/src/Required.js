// Check that the jQuery object exists
if (typeof jQuery === 'undefined') {
	throw new Error('This JavaScript requires jQuery');
}

// Check that the Window object exists
if (typeof window === "undefined" || !("document" in window)) {
	throw new Error('Window Object is undefined.');
}

// Check that the Navigator object exists
if (typeof navigator === 'undefined') {
	throw new Error('Navigator is undefined.');
}

// Extend Query Selector
! function () {
	var $$ = function (x) {
		return document.querySelector(x);
	};
	$$.all = function (x) {
		return document.querySelectorAll(x);
	};
	window["$$"] = $$;
};

window.__defineGetter__('clear', function () {
	return console.clear();
});
  
//Check it's the correct address
if (virtualmode === false) {
	if (!/([a-z0-9]+)*(\.[a-z]{2,6}|^.[a-z]{2,20})$/.test(location.hostname)) {
		throw Error('invalid host');
	} else if (/([a-z0-9]+)*(\.[a-z]{2,6}|^.[a-z]{2,20})$/.test(location.hostname)) {
		var hostname = RegExp.lastMatch;
		var hosthref = top.location.href || location.href;
	}
}

// Create Missing Console
if (!('console' in window)) {
	window.console = {};
	window.console.log = function (str) {
		return str;
	};
}

// Create Missing QuerySelector
if (!document.querySelector) {
	document.querySelector = function (selectors) {
		var elements = document.querySelectorAll(selectors);
		return (elements.length) ? elements[0] : null;
	};
}

// Create Missing JSON
typeof JSON != "object" && (JSON = {});
