export default class AudioContextObject {
	
	constructor(AudioContextObject) {
		this.audioContext = AudioContextObject;
	}
	
	get getObject () {
		return this.audioContext;
	}
	
	/*
		Read only
	*/
	get getCurrentTime () {
		return $.core.Audio.getContextCurrentTime(this.audioContext);
	}
	
	/*
		Read only
	*/
	get getListener () {
		return $.core.Audio.getContextListener(this.audioContext);
	}
	
	/*
		Read only
	*/
	get getSampleRate () {
		return $.core.Audio.contextGetSamplesRate(this.audioContext);
	}
	
	get createGain () {
		return $.core.Audio.createGain(this.audioContext);
	}
	
	get createPeriodicWave () {
		return $.core.Audio.createPeriodicWave(this.audioContext);
	}
	
	get createDelay () {
		return $.core.Audio.createDelay(this.audioContext);
	}
	
	get createPanner () {
		return $.core.Audio.createPanner(this.audioContext);
	}
	
	get createStereoPanner () {
		return $.core.Audio.createStereoPanner(this.audioContext);
	}
	
	get createOscillator () {
		return $.core.Audio.createOscillator(this.audioContext);
	}
	
	get createAnalyser () {
		return $.core.Audio.createAnalyser(this.audioContext);
	}
	
	get createBuffSource () {
		return $.core.Audio.createBuffSource(this.audioContext);
	}
	
}