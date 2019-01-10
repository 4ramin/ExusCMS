(function($) {
	exus.CoreMessanger = {
		
		Show: function(msg, bottom, left, type) {
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
			
			if (exus.Audio.isSupport()) {
				if (type==='success') {
				exus.Audio.loadAudio('./library/mp3/alert.mp3');
				} else if(type==='error') {
				exus.Audio.loadAudio('./library/mp3/error.mp3');
				}
				exus.Audio.playAudio();
			}
		}
		
	}
})(jQuery);