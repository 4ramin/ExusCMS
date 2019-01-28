(function ($) {
	$(window).getEvent(window,function (e) {
		var $type = e.type; 
		var $target = e.target;
		if ($type == 'click') {
			var $link = $target.href;
			if ($link) {
				var host = location.hostname;
				var protocol = location.hostname == 'localhost' ? '' : document.location.protocol + '//';
				var domain = protocol + host;
				var regex = new RegExp(domain + '\/', "i");
				var isSafeCaller = regex.test($link);
				if (!isSafeCaller) {
					//event.preventDefault();
					//return;
				}
			}
		}
	});
	
	var messangerType = 'messanger';
	
	$.core.CoreMessanger = {
		Show: function (msg, bottom, left, type) {
			if (messangerType=='messanger') {
				Messenger.options = {
					extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-left',
					theme: 'air'
				},
				Messenger().post({
					type: "info",
					message : msg,
					hideAfter: 5
				});
			} else {
				$.notify(msg, {
					globalPosition: 'bottom left',
					className: 'success'
				});
			}
			
			if ($.core.Audio.isSupport()) {
				if (type==='success') {
					$.core.Audio.loadAudio('./library/mp3/alert.mp3');
				} else if (type==='error') {
					$.core.Audio.loadAudio('./library/mp3/error.mp3');
				}
				
				$.core.Audio.playAudio();
			}
		}
	}
})(jQuery);