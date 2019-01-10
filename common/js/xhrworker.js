function createXhrObject(){
	if (XMLHttpRequest) {
		var xhr = new XMLHttpRequest();
	} else if (ActiveXObject) {
		var xhr = this.getXMLHttp();
	}
	return xhr;
}

self.addEventListener('message', function (response) {

		var xhr = createXhrObject();
		if (xhr === false) return;
		xhr.open(response.data.type, response.data.url, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
		xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		xhr.responseType = response.data.datatype;
		xhr.send(response.data.params);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (/^20\d$/.test(xhr.status)) {
					self.postMessage(xhr.response);
				} else {
					self.postMessage(xhr.statusText);
				}
			}
		};

});