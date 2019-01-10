<div id="video_container">
	<span id="title">
		<?php echo $this->base->get('title'); ?>
	</span>
	
	<video id="audio_player" autoplay preload webkit-playsinline playsinline poster="<?php echo $this->base->get('image_url'); ?>">
		<source src="<?php echo $this->base->get('audio_url'); ?>">
	</video>

	<div class="eq">
		<div class="controls">
			<input orient="vertical" type="range" class="eq_p1" value="100" step="1" min="0" max="200" oninput="$.core.Lyrics.Equalizer.changeGain(this.value, 'low');"></input>
			<br/><label>32</label>
		</div>
		<div class="controls">
			<input orient="vertical" type="range" class="eq_p2" value="100" step="1" min="0" max="200" oninput="$.core.Lyrics.Equalizer.changeGain(this.value, 'mid');"></input>
			<br/><label>500</label>
		</div>
		<div class="controls">
			<input orient="vertical" type="range" class="eq_p3" value="100" step="1" min="0" max="200" oninput="$.core.Lyrics.Equalizer.changeGain(this.value, 'high');"></input>
			<br/><label>8k</label>
		</div>
		<div class="controls">
			<input  orient="vertical" type="range" value="0" step="1" min="0" max="24000" oninput="$.core.Lyrics.Equalizer.changeFreq(this.value, 'low');"></input>
			<br/><label>32</label>
		</div>
		<div class="controls">
			<input  orient="vertical" type="range" value="0" step="1" min="0" max="24000" oninput="$.core.Lyrics.Equalizer.changeFreq(this.value, 'high');"></input>
			<br/><label>8k</label>
		</div>
		<button onclick="$.core.Lyrics.Eqaulizer.setPreset(1,1,1);">
			Reset
		</button>
		<button onclick="$.core.Lyrics.Eqaulizer.setPreset(0.75,0.58,1.14);">
			Bass
		</button>
		<button onclick="$.core.Lyrics.Eqaulizer.setPreset(0.52,1.27,1.7);">
			Treble
		</button>
		<button onclick="$.core.Lyrics.Equalizer.setPreset(1.17,0.23,0.58);">
			Dance
		</button>
	</div>

	<canvas class="style__spectrogram___2tFeN" id="canvas" width="500" height="300">sorry, your browser doesn't support canvas</canvas>
	
	<div id="audioicon" class="pauseicon" style="opacity:0"></div>
	
	<canvas id="waveform" width="500" height="500"></canvas>
	
	<div id="controlBox">
		<div id="progress"> 
			<div id="progress_box"> 
				<span id="play_loaded"></span>
				<span id="play_progress"><span id="play_progress_ring"></span></span>
			</div> 
		</div>
		<div id="extprogress">
			<div class="lyrics_display_expand_bar" style="width: 0%;"></div>
			<div class="lyrics_display_expand_timer"></div>
		</div>
		
		<div class="player" id="videoControls">
			<button id="eq" title="이퀄라이저"><i class="fa fa-adjust" aria-hidden="true"></i></button>
			<button id="lyrics" title="자막"><i class="fa fa-align-right" aria-hidden="true"></i></button>
			<button id="lyricsextend" title="자막확장"><i class="fa fa-angle-double-down" aria-hidden="true"></i></button>
			<button id="play" title="재생"> <i class="fa fa-play" aria-hidden="true"></i> </button>
			<span id="time"></span>
			
			<button id="fullScreen" title="전체화면"><i class="fa fa-expand" aria-hidden="true"></i></button>
		</div>
	</div>
</div>

<script>
$(document).ready(function() {
	$.core.Request.addRequireCSS("./components/Audioplayer/tpl/css/exusplayer.css");
	$.core.Request.addRequireJS("./components/Audioplayer/tpl/js/exusplayer.js");
	window.initVideo();
	$.core.Lyrics.getLyricsData('<?php echo $this->base->get('lyricssrl'); ?>');
});
</script>