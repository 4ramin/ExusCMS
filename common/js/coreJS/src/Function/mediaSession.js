//mediaSession-related functions
'use strict';

(function ($, core) {

	var A = core.mediaSession = {
		isSupport: function () {
			if ('mediaSession' in navigator) {
				return true;
			}
			
			return false;
		},
		setMetadata: function (title, artist, album, artwork) {
			navigator.mediaSession.metadata = new MediaMetadata({
				title: title,
				artist: artist,
				album: album,
				artwork: artwork
			});
		},
		setActionHandler: function (action, callback) {
			if (this.isSupport()) {
				navigator.mediaSession.setActionHandler(action, callback);
			}
		},
		setCustomHandler: function (prefix, callback) {
			this.setActionHandler(prefix, callback);
		},
		setPlayHandler: function (callback) {
			this.setCustomHandler('play', callback);
		},
		setPauseHandler: function (callback) {
			this.setCustomHandler('pause', callback);
		},
		setSeekbackwardHandler: function (callback) {
			this.setCustomHandler('seekbackward', callback);
		},
		setSeekforwardHandler: function (callback) {
			this.setCustomHandler('seekforward', callback);
		},
		setPrevioustrackHandler: function (callback) {
			this.setCustomHandler('previoustrack', callback);
		},
		setNextrackHandler: function (callback) {
			this.setCustomHandler('nexttrack', callback);
		},
		setCustomPlaybackState: function (state) {
			navigator.mediaSession.playbackState = state;
		},
		setPlaybackState: function () {
			this.setCustomPlaybackState("playing");
		},
		setPlaybackState: function () {
			this.setCustomPlaybackState("paused");
		}
	}
})(jQuery, $.core);