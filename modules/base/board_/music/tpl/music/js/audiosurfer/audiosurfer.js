/*! wavesurfer.js 1.2.6 (Sat, 19 Nov 2016 18:10:44 GMT)
* https://github.com/katspaugh/wavesurfer.js
* @license CC-BY-3.0 */
!function(a,b){"function"==typeof define&&define.amd?define("wavesurfer",[],function(){return a.WaveSurfer=b()}):"object"==typeof exports?module.exports=b():a.WaveSurfer=b()}(this,function(){"use strict";var a={defaultParams:{height:128,waveColor:"#999",progressColor:"#555",cursorColor:"#333",cursorWidth:1,skipLength:2,minPxPerSec:20,pixelRatio:window.devicePixelRatio||screen.deviceXDPI/screen.logicalXDPI,fillParent:!0,scrollParent:!1,hideScrollbar:!1,normalize:!1,audioContext:null,container:null,dragSelection:!0,loopSelection:!0,audioRate:1,interact:!0,splitChannels:!1,mediaContainer:null,mediaControls:!1,renderer:"Canvas",backend:"WebAudio",mediaType:"audio",autoCenter:!0},init:function(b){if(this.params=a.util.extend({},this.defaultParams,b),this.container="string"==typeof b.container?document.querySelector(this.params.container):this.params.container,!this.container)throw new Error("Container element not found");if(null==this.params.mediaContainer?this.mediaContainer=this.container:"string"==typeof this.params.mediaContainer?this.mediaContainer=document.querySelector(this.params.mediaContainer):this.mediaContainer=this.params.mediaContainer,!this.mediaContainer)throw new Error("Media Container element not found");this.savedVolume=0,this.isMuted=!1,this.tmpEvents=[],this.currentAjax=null,this.createDrawer(),this.createBackend(),this.isDestroyed=!1},createDrawer:function(){var b=this;this.drawer=Object.create(a.Drawer[this.params.renderer]),this.drawer.init(this.container,this.params),this.drawer.on("redraw",function(){b.drawBuffer(),b.drawer.progress(b.backend.getPlayedPercents())}),this.drawer.on("click",function(a,c){setTimeout(function(){b.seekTo(c)},0)}),this.drawer.on("scroll",function(a){b.fireEvent("scroll",a)})},createBackend:function(){var b=this;this.backend&&this.backend.destroy(),"AudioElement"==this.params.backend&&(this.params.backend="MediaElement"),"WebAudio"!=this.params.backend||a.WebAudio.supportsWebAudio()||(this.params.backend="MediaElement"),this.backend=Object.create(a[this.params.backend]),this.backend.init(this.params),this.backend.on("finish",function(){b.fireEvent("finish")}),this.backend.on("play",function(){b.fireEvent("play")}),this.backend.on("pause",function(){b.fireEvent("pause")}),this.backend.on("audioprocess",function(a){b.drawer.progress(b.backend.getPlayedPercents()),b.fireEvent("audioprocess",a)})},getDuration:function(){return this.backend.getDuration()},getCurrentTime:function(){return this.backend.getCurrentTime()},play:function(a,b){this.fireEvent("interaction",this.play.bind(this,a,b)),this.backend.play(a,b)},pause:function(){this.backend.pause()},playPause:function(){this.backend.isPaused()?this.play():this.pause()},isPlaying:function(){return!this.backend.isPaused()},skipBackward:function(a){this.skip(-a||-this.params.skipLength)},skipForward:function(a){this.skip(a||this.params.skipLength)},skip:function(a){var b=this.getCurrentTime()||0,c=this.getDuration()||1;b=Math.max(0,Math.min(c,b+(a||0))),this.seekAndCenter(b/c)},seekAndCenter:function(a){this.seekTo(a),this.drawer.recenter(a)},seekTo:function(a){this.fireEvent("interaction",this.seekTo.bind(this,a));var b=this.backend.isPaused(),c=this.params.scrollParent;b&&(this.params.scrollParent=!1),this.backend.seekTo(a*this.getDuration()),this.drawer.progress(this.backend.getPlayedPercents()),b||(this.backend.pause(),this.backend.play()),this.params.scrollParent=c,this.fireEvent("seek",a)},stop:function(){this.pause(),this.seekTo(0),this.drawer.progress(0)},setVolume:function(a){this.backend.setVolume(a)},setPlaybackRate:function(a){this.backend.setPlaybackRate(a)},toggleMute:function(){this.setMute(!this.isMuted)},setMute:function(a){a!==this.isMuted&&(a?(this.savedVolume=this.backend.getVolume(),this.backend.setVolume(0),this.isMuted=!0):(this.backend.setVolume(this.savedVolume),this.isMuted=!1))},toggleScroll:function(){this.params.scrollParent=!this.params.scrollParent,this.drawBuffer()},toggleInteraction:function(){this.params.interact=!this.params.interact},drawBuffer:function(){var a=Math.round(this.getDuration()*this.params.minPxPerSec*this.params.pixelRatio),b=this.drawer.getWidth(),c=a;this.params.fillParent&&(!this.params.scrollParent||a<b)&&(c=b);var d=this.backend.getPeaks(c);this.drawer.drawPeaks(d,c),this.fireEvent("redraw",d,c)},zoom:function(a){this.params.minPxPerSec=a,this.params.scrollParent=!0,this.drawBuffer(),this.drawer.progress(this.backend.getPlayedPercents()),this.drawer.recenter(this.getCurrentTime()/this.getDuration()),this.fireEvent("zoom",a)},loadArrayBuffer:function(a){this.decodeArrayBuffer(a,function(a){this.isDestroyed||this.loadDecodedBuffer(a)}.bind(this))},loadDecodedBuffer:function(a){this.backend.load(a),this.drawBuffer(),this.fireEvent("ready")},loadBlob:function(a){var b=this,c=new FileReader;c.addEventListener("progress",function(a){b.onProgress(a)}),c.addEventListener("load",function(a){b.loadArrayBuffer(a.target.result)}),c.addEventListener("error",function(){b.fireEvent("error","Error reading file")}),c.readAsArrayBuffer(a),this.empty()},load:function(a,b,c){switch(this.empty(),this.params.backend){case"WebAudio":return this.loadBuffer(a,b);case"MediaElement":return this.loadMediaElement(a,b,c)}},loadBuffer:function(a,b){var c=function(b){return b&&this.tmpEvents.push(this.once("ready",b)),this.getArrayBuffer(a,this.loadArrayBuffer.bind(this))}.bind(this);return b?(this.backend.setPeaks(b),this.drawBuffer(),this.tmpEvents.push(this.once("interaction",c)),void 0):c()},loadMediaElement:function(a,b,c){var d=a;if("string"==typeof a)this.backend.load(d,this.mediaContainer,b,c);else{var e=a;this.backend.loadElt(e,b),d=e.src}this.tmpEvents.push(this.backend.once("canplay",function(){this.drawBuffer(),this.fireEvent("ready")}.bind(this)),this.backend.once("error",function(a){this.fireEvent("error",a)}.bind(this))),b?this.backend.setPeaks(b):this.backend.supportsWebAudio()&&this.getArrayBuffer(d,function(a){this.decodeArrayBuffer(a,function(a){this.backend.buffer=a,this.drawBuffer(),this.fireEvent("waveform-ready")}.bind(this))}.bind(this))},decodeArrayBuffer:function(a,b){this.arraybuffer=a,this.backend.decodeArrayBuffer(a,function(c){this.isDestroyed||this.arraybuffer!=a||(b(c),this.arraybuffer=null)}.bind(this),this.fireEvent.bind(this,"error","Error decoding audiobuffer"))},getArrayBuffer:function(b,c){var d=this,e=a.util.ajax({url:b,responseType:"arraybuffer"});return this.currentAjax=e,this.tmpEvents.push(e.on("progress",function(a){d.onProgress(a)}),e.on("success",function(a,b){c(a),d.currentAjax=null}),e.on("error",function(a){d.fireEvent("error","XHR error: "+a.target.statusText),d.currentAjax=null})),e},onProgress:function(a){if(a.lengthComputable)var b=a.loaded/a.total;else b=a.loaded/(a.loaded+1e6);this.fireEvent("loading",Math.round(100*b),a.target)},exportPCM:function(a,b,c){a=a||1024,b=b||1e4,c=c||!1;var d=this.backend.getPeaks(a,b),e=[].map.call(d,function(a){return Math.round(a*b)/b}),f=JSON.stringify(e);return c||window.open("data:application/json;charset=utf-8,"+encodeURIComponent(f)),f},exportImage:function(a,b){return a||(a="image/png"),b||(b=1),this.drawer.getImage(a,b)},cancelAjax:function(){this.currentAjax&&(this.currentAjax.xhr.abort(),this.currentAjax=null)},clearTmpEvents:function(){this.tmpEvents.forEach(function(a){a.un()})},empty:function(){this.backend.isPaused()||(this.stop(),this.backend.disconnectSource()),this.cancelAjax(),this.clearTmpEvents(),this.drawer.progress(0),this.drawer.setWidth(0),this.drawer.drawPeaks({length:this.drawer.getWidth()},0)},destroy:function(){this.fireEvent("destroy"),this.cancelAjax(),this.clearTmpEvents(),this.unAll(),this.backend.destroy(),this.drawer.destroy(),this.isDestroyed=!0}};return a.create=function(b){var c=Object.create(a);return c.init(b),c},a.util={extend:function(a){var b=Array.prototype.slice.call(arguments,1);return b.forEach(function(b){Object.keys(b).forEach(function(c){a[c]=b[c]})}),a},min:function(a){var b=+(1/0);for(var c in a)a[c]<b&&(b=a[c]);return b},max:function(a){var b=-(1/0);for(var c in a)a[c]>b&&(b=a[c]);return b},getId:function(){return"wavesurfer_"+Math.random().toString(32).substring(2)},ajax:function(b){var c=Object.create(a.Observer),d=new XMLHttpRequest,e=!1;return d.open(b.method||"GET",b.url,!0),d.responseType=b.responseType||"json",d.addEventListener("progress",function(a){c.fireEvent("progress",a),a.lengthComputable&&a.loaded==a.total&&(e=!0)}),d.addEventListener("load",function(a){e||c.fireEvent("progress",a),c.fireEvent("load",a),200==d.status||206==d.status?c.fireEvent("success",d.response,a):c.fireEvent("error",a)}),d.addEventListener("error",function(a){c.fireEvent("error",a)}),d.send(),c.xhr=d,c}},a.Observer={on:function(a,b){this.handlers||(this.handlers={});var c=this.handlers[a];return c||(c=this.handlers[a]=[]),c.push(b),{name:a,callback:b,un:this.un.bind(this,a,b)}},un:function(a,b){if(this.handlers){var c=this.handlers[a];if(c)if(b)for(var d=c.length-1;d>=0;d--)c[d]==b&&c.splice(d,1);else c.length=0}},unAll:function(){this.handlers=null},once:function(a,b){var c=this,d=function(){b.apply(this,arguments),setTimeout(function(){c.un(a,d)},0)};return this.on(a,d)},fireEvent:function(a){if(this.handlers){var b=this.handlers[a],c=Array.prototype.slice.call(arguments,1);b&&b.forEach(function(a){a.apply(null,c)})}}},a.util.extend(a,a.Observer),a.WebAudio={scriptBufferSize:256,PLAYING_STATE:0,PAUSED_STATE:1,FINISHED_STATE:2,supportsWebAudio:function(){return!(!window.AudioContext&&!window.webkitAudioContext)},getAudioContext:function(){return this.ac||(this.ac=new(window.AudioContext||window.webkitAudioContext)),this.ac},getOfflineAudioContext:function(b){return a.WebAudio.offlineAudioContext||(a.WebAudio.offlineAudioContext=new(window.OfflineAudioContext||window.webkitOfflineAudioContext)(1,2,b)),a.WebAudio.offlineAudioContext},init:function(b){this.params=b,this.ac=b.audioContext||this.getAudioContext(),this.lastPlay=this.ac.currentTime,this.startPosition=0,this.scheduledPause=null,this.states=[Object.create(a.WebAudio.state.playing),Object.create(a.WebAudio.state.paused),Object.create(a.WebAudio.state.finished)],this.createVolumeNode(),this.createScriptNode(),this.createAnalyserNode(),this.setState(this.PAUSED_STATE),this.setPlaybackRate(this.params.audioRate)},disconnectFilters:function(){this.filters&&(this.filters.forEach(function(a){a&&a.disconnect()}),this.filters=null,this.analyser.connect(this.gainNode))},setState:function(a){this.state!==this.states[a]&&(this.state=this.states[a],this.state.init.call(this))},setFilter:function(){this.setFilters([].slice.call(arguments))},setFilters:function(a){this.disconnectFilters(),a&&a.length&&(this.filters=a,this.analyser.disconnect(),a.reduce(function(a,b){return a.connect(b),b},this.analyser).connect(this.gainNode))},createScriptNode:function(){this.ac.createScriptProcessor?this.scriptNode=this.ac.createScriptProcessor(this.scriptBufferSize):this.scriptNode=this.ac.createJavaScriptNode(this.scriptBufferSize),this.scriptNode.connect(this.ac.destination)},addOnAudioProcess:function(){var a=this;this.scriptNode.onaudioprocess=function(){var b=a.getCurrentTime();b>=a.getDuration()?(a.setState(a.FINISHED_STATE),a.fireEvent("pause")):b>=a.scheduledPause?a.pause():a.state===a.states[a.PLAYING_STATE]&&a.fireEvent("audioprocess",b)}},removeOnAudioProcess:function(){this.scriptNode.onaudioprocess=null},createAnalyserNode:function(){this.analyser=this.ac.createAnalyser(),this.analyser.connect(this.gainNode)},createVolumeNode:function(){this.ac.createGain?this.gainNode=this.ac.createGain():this.gainNode=this.ac.createGainNode(),this.gainNode.connect(this.ac.destination)},setVolume:function(a){this.gainNode.gain.value=a},getVolume:function(){return this.gainNode.gain.value},decodeArrayBuffer:function(a,b,c){this.offlineAc||(this.offlineAc=this.getOfflineAudioContext(this.ac?this.ac.sampleRate:44100)),this.offlineAc.decodeAudioData(a,function(a){b(a)}.bind(this),c)},setPeaks:function(a){this.peaks=a},getPeaks:function(a){if(this.peaks)return this.peaks;for(var b=this.buffer.length/a,c=~~(b/10)||1,d=this.buffer.numberOfChannels,e=[],f=[],g=0;g<d;g++)for(var h=e[g]=[],i=this.buffer.getChannelData(g),j=0;j<a;j++){for(var k=~~(j*b),l=~~(k+b),m=0,n=0,o=k;o<l;o+=c){var p=i[o];p>n&&(n=p),p<m&&(m=p)}h[2*j]=n,h[2*j+1]=m,(0==g||n>f[2*j])&&(f[2*j]=n),(0==g||m<f[2*j+1])&&(f[2*j+1]=m)}return this.params.splitChannels?e:f},getPlayedPercents:function(){return this.state.getPlayedPercents.call(this)},disconnectSource:function(){this.source&&this.source.disconnect()},destroy:function(){this.isPaused()||this.pause(),this.unAll(),this.buffer=null,this.disconnectFilters(),this.disconnectSource(),this.gainNode.disconnect(),this.scriptNode.disconnect(),this.analyser.disconnect(),this.params.audioContext||this.ac.close()},load:function(a){this.startPosition=0,this.lastPlay=this.ac.currentTime,this.buffer=a,this.createSource()},createSource:function(){this.disconnectSource(),this.source=this.ac.createBufferSource(),this.source.start=this.source.start||this.source.noteGrainOn,this.source.stop=this.source.stop||this.source.noteOff,this.source.playbackRate.value=this.playbackRate,this.source.buffer=this.buffer,this.source.connect(this.analyser)},isPaused:function(){return this.state!==this.states[this.PLAYING_STATE]},getDuration:function(){return this.buffer?this.buffer.duration:0},seekTo:function(a,b){if(this.buffer)return this.scheduledPause=null,null==a&&(a=this.getCurrentTime(),a>=this.getDuration()&&(a=0)),null==b&&(b=this.getDuration()),this.startPosition=a,this.lastPlay=this.ac.currentTime,this.state===this.states[this.FINISHED_STATE]&&this.setState(this.PAUSED_STATE),{start:a,end:b}},getPlayedTime:function(){return(this.ac.currentTime-this.lastPlay)*this.playbackRate},play:function(a,b){if(this.buffer){this.createSource();var c=this.seekTo(a,b);a=c.start,b=c.end,this.scheduledPause=b,this.source.start(0,a,b-a),"suspended"==this.ac.state&&this.ac.resume&&this.ac.resume(),this.setState(this.PLAYING_STATE),this.fireEvent("play")}},pause:function(){this.scheduledPause=null,this.startPosition+=this.getPlayedTime(),this.source&&this.source.stop(0),this.setState(this.PAUSED_STATE),this.fireEvent("pause")},getCurrentTime:function(){return this.state.getCurrentTime.call(this)},setPlaybackRate:function(a){a=a||1,this.isPaused()?this.playbackRate=a:(this.pause(),this.playbackRate=a,this.play())}},a.WebAudio.state={},a.WebAudio.state.playing={init:function(){this.addOnAudioProcess()},getPlayedPercents:function(){var a=this.getDuration();return this.getCurrentTime()/a||0},getCurrentTime:function(){return this.startPosition+this.getPlayedTime()}},a.WebAudio.state.paused={init:function(){this.removeOnAudioProcess()},getPlayedPercents:function(){var a=this.getDuration();return this.getCurrentTime()/a||0},getCurrentTime:function(){return this.startPosition}},a.WebAudio.state.finished={init:function(){this.removeOnAudioProcess(),this.fireEvent("finish")},getPlayedPercents:function(){return 1},getCurrentTime:function(){return this.getDuration()}},a.util.extend(a.WebAudio,a.Observer),a.MediaElement=Object.create(a.WebAudio),a.util.extend(a.MediaElement,{init:function(a){this.params=a,this.media={currentTime:0,duration:0,paused:!0,playbackRate:1,play:function(){},pause:function(){}},this.mediaType=a.mediaType.toLowerCase(),this.elementPosition=a.elementPosition,this.setPlaybackRate(this.params.audioRate),this.createTimer()},createTimer:function(){var a=this,b=function(){if(!a.isPaused()){a.fireEvent("audioprocess",a.getCurrentTime());var c=window.requestAnimationFrame||window.webkitRequestAnimationFrame;c(b)}};this.on("play",b)},load:function(a,b,c,d){var e=document.createElement(this.mediaType);e.controls=this.params.mediaControls,e.autoplay=this.params.autoplay||!1,e.preload=null==d?"auto":d,e.src=a,e.style.width="100%";var f=b.querySelector(this.mediaType);f&&b.removeChild(f),b.appendChild(e),this._load(e,c)},loadElt:function(a,b){var c=a;c.controls=this.params.mediaControls,c.autoplay=this.params.autoplay||!1,this._load(c,b)},_load:function(a,b){var c=this;a.load(),a.addEventListener("error",function(){c.fireEvent("error","Error loading media element")}),a.addEventListener("canplay",function(){c.fireEvent("canplay")}),a.addEventListener("ended",function(){c.fireEvent("finish")}),this.media=a,this.peaks=b,this.onPlayEnd=null,this.buffer=null,this.setPlaybackRate(this.playbackRate)},isPaused:function(){return!this.media||this.media.paused},getDuration:function(){var a=this.media.duration;return a>=1/0&&(a=this.media.seekable.end(0)),a},getCurrentTime:function(){return this.media&&this.media.currentTime},getPlayedPercents:function(){return this.getCurrentTime()/this.getDuration()||0},setPlaybackRate:function(a){this.playbackRate=a||1,this.media.playbackRate=this.playbackRate},seekTo:function(a){null!=a&&(this.media.currentTime=a),this.clearPlayEnd()},play:function(a,b){this.seekTo(a),this.media.play(),b&&this.setPlayEnd(b),this.fireEvent("play")},pause:function(){this.media&&this.media.pause(),this.clearPlayEnd(),this.fireEvent("pause")},setPlayEnd:function(a){var b=this;this.onPlayEnd=function(c){c>=a&&(b.pause(),b.seekTo(a))},this.on("audioprocess",this.onPlayEnd)},clearPlayEnd:function(){this.onPlayEnd&&(this.un("audioprocess",this.onPlayEnd),this.onPlayEnd=null)},getPeaks:function(b){return this.buffer?a.WebAudio.getPeaks.call(this,b):this.peaks||[]},getVolume:function(){return this.media.volume},setVolume:function(a){this.media.volume=a},destroy:function(){this.pause(),this.unAll(),this.media&&this.media.parentNode&&this.media.parentNode.removeChild(this.media),this.media=null}}),a.AudioElement=a.MediaElement,a.Drawer={init:function(a,b){this.container=a,this.params=b,this.width=0,this.height=b.height*this.params.pixelRatio,this.lastPos=0,this.initDrawer(b),this.createWrapper(),this.createElements()},createWrapper:function(){this.wrapper=this.container.appendChild(document.createElement("wave")),this.style(this.wrapper,{display:"block",position:"relative",userSelect:"none",webkitUserSelect:"none",height:this.params.height+"px"}),(this.params.fillParent||this.params.scrollParent)&&this.style(this.wrapper,{width:"100%",overflowX:this.params.hideScrollbar?"hidden":"auto",overflowY:"hidden"}),this.setupWrapperEvents()},handleEvent:function(a,b){!b&&a.preventDefault();var c,d=a.targetTouches?a.targetTouches[0].clientX:a.clientX,e=this.wrapper.getBoundingClientRect(),f=this.width,g=this.getWidth();return!this.params.fillParent&&f<g?(c=(d-e.left)*this.params.pixelRatio/f||0,c>1&&(c=1)):c=(d-e.left+this.wrapper.scrollLeft)/this.wrapper.scrollWidth||0,c},setupWrapperEvents:function(){var a=this;this.wrapper.addEventListener("click",function(b){var c=a.wrapper.offsetHeight-a.wrapper.clientHeight;if(0!=c){var d=a.wrapper.getBoundingClientRect();if(b.clientY>=d.bottom-c)return}a.params.interact&&a.fireEvent("click",b,a.handleEvent(b))}),this.wrapper.addEventListener("scroll",function(b){a.fireEvent("scroll",b)})},drawPeaks:function(a,b){this.resetScroll(),this.setWidth(b),this.params.barWidth?this.drawBars(a):this.drawWave(a)},style:function(a,b){return Object.keys(b).forEach(function(c){a.style[c]!==b[c]&&(a.style[c]=b[c])}),a},resetScroll:function(){null!==this.wrapper&&(this.wrapper.scrollLeft=0)},recenter:function(a){var b=this.wrapper.scrollWidth*a;this.recenterOnPosition(b,!0)},recenterOnPosition:function(a,b){var c=this.wrapper.scrollLeft,d=~~(this.wrapper.clientWidth/2),e=a-d,f=e-c,g=this.wrapper.scrollWidth-this.wrapper.clientWidth;if(0!=g){if(!b&&-d<=f&&f<d){var h=5;f=Math.max(-h,Math.min(h,f)),e=c+f}e=Math.max(0,Math.min(g,e)),e!=c&&(this.wrapper.scrollLeft=e)}},getWidth:function(){return Math.round(this.container.clientWidth*this.params.pixelRatio)},setWidth:function(a){this.width=a,this.params.fillParent||this.params.scrollParent?this.style(this.wrapper,{width:""}):this.style(this.wrapper,{width:~~(this.width/this.params.pixelRatio)+"px"}),this.updateSize()},setHeight:function(a){a!=this.height&&(this.height=a,this.style(this.wrapper,{height:~~(this.height/this.params.pixelRatio)+"px"}),this.updateSize())},progress:function(a){var b=1/this.params.pixelRatio,c=Math.round(a*this.width)*b;if(c<this.lastPos||c-this.lastPos>=b){if(this.lastPos=c,this.params.scrollParent&&this.params.autoCenter){var d=~~(this.wrapper.scrollWidth*a);this.recenterOnPosition(d)}this.updateProgress(a)}},destroy:function(){this.unAll(),this.wrapper&&(this.container.removeChild(this.wrapper),this.wrapper=null)},initDrawer:function(){},createElements:function(){},updateSize:function(){},drawWave:function(a,b){},clearWave:function(){},updateProgress:function(a){}},a.util.extend(a.Drawer,a.Observer),a.Drawer.Canvas=Object.create(a.Drawer),a.util.extend(a.Drawer.Canvas,{createElements:function(){var a=this.wrapper.appendChild(this.style(document.createElement("canvas"),{position:"absolute",zIndex:1,left:0,top:0,bottom:0}));if(this.waveCc=a.getContext("2d"),this.progressWave=this.wrapper.appendChild(this.style(document.createElement("wave"),{position:"absolute",zIndex:2,left:0,top:0,bottom:0,overflow:"hidden",width:"0",display:"none",boxSizing:"border-box",borderRightStyle:"solid",borderRightWidth:this.params.cursorWidth+"px",borderRightColor:this.params.cursorColor})),this.params.waveColor!=this.params.progressColor){var b=this.progressWave.appendChild(document.createElement("canvas"));this.progressCc=b.getContext("2d")}},updateSize:function(){var a=Math.round(this.width/this.params.pixelRatio);this.waveCc.canvas.width=this.width,this.waveCc.canvas.height=this.height,this.style(this.waveCc.canvas,{width:a+"px"}),this.style(this.progressWave,{display:"block"}),this.progressCc&&(this.progressCc.canvas.width=this.width,this.progressCc.canvas.height=this.height,this.style(this.progressCc.canvas,{width:a+"px"})),this.clearWave()},clearWave:function(){this.waveCc.clearRect(0,0,this.width,this.height),this.progressCc&&this.progressCc.clearRect(0,0,this.width,this.height)},drawBars:function(b,c){if(b[0]instanceof Array){var d=b;if(this.params.splitChannels)return this.setHeight(d.length*this.params.height*this.params.pixelRatio),void d.forEach(this.drawBars,this);b=d[0]}var e=[].some.call(b,function(a){return a<0});e&&(b=[].filter.call(b,function(a,b){return b%2==0}));var f=.5/this.params.pixelRatio,g=this.width,h=this.params.height*this.params.pixelRatio,i=h*c||0,j=h/2,k=b.length,l=this.params.barWidth*this.params.pixelRatio,m=Math.max(this.params.pixelRatio,~~(l/2)),n=l+m,o=1;this.params.normalize&&(o=a.util.max(b));var p=k/g;this.waveCc.fillStyle=this.params.waveColor,this.progressCc&&(this.progressCc.fillStyle=this.params.progressColor),[this.waveCc,this.progressCc].forEach(function(a){if(a)for(var c=0;c<g;c+=n){var d=Math.round(b[Math.floor(c*p)]/o*j);a.fillRect(c+f,j-d+i,l+f,2*d)}},this)},drawWave:function(b,c){if(b[0]instanceof Array){var d=b;if(this.params.splitChannels)return this.setHeight(d.length*this.params.height*this.params.pixelRatio),void d.forEach(this.drawWave,this);b=d[0]}var e=[].some.call(b,function(a){return a<0});if(!e){for(var f=[],g=0,h=b.length;g<h;g++)f[2*g]=b[g],f[2*g+1]=-b[g];b=f}var i=.5/this.params.pixelRatio,j=this.params.height*this.params.pixelRatio,k=j*c||0,l=j/2,m=~~(b.length/2),n=1;this.params.fillParent&&this.width!=m&&(n=this.width/m);var o=1;if(this.params.normalize){var p=a.util.max(b),q=a.util.min(b);o=-q>p?-q:p}this.waveCc.fillStyle=this.params.waveColor,this.progressCc&&(this.progressCc.fillStyle=this.params.progressColor),[this.waveCc,this.progressCc].forEach(function(a){if(a){a.beginPath(),a.moveTo(i,l+k);for(var c=0;c<m;c++){var d=Math.round(b[2*c]/o*l);a.lineTo(c*n+i,l-d+k)}for(var c=m-1;c>=0;c--){var d=Math.round(b[2*c+1]/o*l);a.lineTo(c*n+i,l-d+k)}a.closePath(),a.fill(),a.fillRect(0,l+k-i,this.width,i)}},this)},updateProgress:function(a){var b=Math.round(this.width*a)/this.params.pixelRatio;this.style(this.progressWave,{width:b+"px"})},getImage:function(a,b){return this.waveCc.canvas.toDataURL(a,b)}}),a.Drawer.MultiCanvas=Object.create(a.Drawer),a.util.extend(a.Drawer.MultiCanvas,{initDrawer:function(a){if(this.maxCanvasWidth=null!=a.maxCanvasWidth?a.maxCanvasWidth:4e3,this.maxCanvasElementWidth=Math.round(this.maxCanvasWidth/this.params.pixelRatio),this.maxCanvasWidth<=1)throw"maxCanvasWidth must be greater than 1.";if(this.maxCanvasWidth%2==1)throw"maxCanvasWidth must be an even number.";this.hasProgressCanvas=this.params.waveColor!=this.params.progressColor,this.halfPixel=.5/this.params.pixelRatio,this.canvases=[]},createElements:function(){this.progressWave=this.wrapper.appendChild(this.style(document.createElement("wave"),{position:"absolute",zIndex:2,left:0,top:0,bottom:0,overflow:"hidden",width:"0",display:"none",boxSizing:"border-box",borderRightStyle:"solid",borderRightWidth:this.params.cursorWidth+"px",borderRightColor:this.params.cursorColor})),this.addCanvas()},updateSize:function(){for(var a=Math.round(this.width/this.params.pixelRatio),b=Math.ceil(a/this.maxCanvasElementWidth);this.canvases.length<b;)this.addCanvas();for(;this.canvases.length>b;)this.removeCanvas();for(var c in this.canvases){var d=this.maxCanvasWidth+2*Math.ceil(this.params.pixelRatio/2);c==this.canvases.length-1&&(d=this.width-this.maxCanvasWidth*(this.canvases.length-1)),this.updateDimensions(this.canvases[c],d,this.height),this.clearWaveForEntry(this.canvases[c])}},addCanvas:function(){var a={},b=this.maxCanvasElementWidth*this.canvases.length;a.wave=this.wrapper.appendChild(this.style(document.createElement("canvas"),{position:"absolute",zIndex:1,left:b+"px",top:0,bottom:0})),a.waveCtx=a.wave.getContext("2d"),this.hasProgressCanvas&&(a.progress=this.progressWave.appendChild(this.style(document.createElement("canvas"),{position:"absolute",left:b+"px",top:0,bottom:0})),a.progressCtx=a.progress.getContext("2d")),this.canvases.push(a)},removeCanvas:function(){var a=this.canvases.pop();a.wave.parentElement.removeChild(a.wave),this.hasProgressCanvas&&a.progress.parentElement.removeChild(a.progress)},updateDimensions:function(a,b,c){var d=Math.round(b/this.params.pixelRatio),e=Math.round(this.width/this.params.pixelRatio);a.start=a.waveCtx.canvas.offsetLeft/e||0,a.end=a.start+d/e,a.waveCtx.canvas.width=b,a.waveCtx.canvas.height=c,this.style(a.waveCtx.canvas,{width:d+"px"}),this.style(this.progressWave,{display:"block"}),this.hasProgressCanvas&&(a.progressCtx.canvas.width=b,a.progressCtx.canvas.height=c,this.style(a.progressCtx.canvas,{width:d+"px"}))},clearWave:function(){for(var a in this.canvases)this.clearWaveForEntry(this.canvases[a])},clearWaveForEntry:function(a){a.waveCtx.clearRect(0,0,a.waveCtx.canvas.width,a.waveCtx.canvas.height),this.hasProgressCanvas&&a.progressCtx.clearRect(0,0,a.progressCtx.canvas.width,a.progressCtx.canvas.height)},drawBars:function(b,c){if(b[0]instanceof Array){var d=b;if(this.params.splitChannels)return this.setHeight(d.length*this.params.height*this.params.pixelRatio),void d.forEach(this.drawBars,this);b=d[0]}var e=[].some.call(b,function(a){return a<0});e&&(b=[].filter.call(b,function(a,b){return b%2==0}));var f=this.width,g=this.params.height*this.params.pixelRatio,h=g*c||0,i=g/2,j=b.length,k=this.params.barWidth*this.params.pixelRatio,l=Math.max(this.params.pixelRatio,~~(k/2)),m=k+l,n=1;this.params.normalize&&(n=a.util.max(b));for(var o=j/f,p=0;p<f;p+=m){var q=Math.round(b[Math.floor(p*o)]/n*i);this.fillRect(p+this.halfPixel,i-q+h,k+this.halfPixel,2*q)}},drawWave:function(b,c){if(b[0]instanceof Array){var d=b;if(this.params.splitChannels)return this.setHeight(d.length*this.params.height*this.params.pixelRatio),void d.forEach(this.drawWave,this);b=d[0]}var e=[].some.call(b,function(a){return a<0});if(!e){for(var f=[],g=0,h=b.length;g<h;g++)f[2*g]=b[g],f[2*g+1]=-b[g];b=f}var i=this.params.height*this.params.pixelRatio,j=i*c||0,k=i/2,l=1;if(this.params.normalize){var m=a.util.max(b),n=a.util.min(b);l=-n>m?-n:m}this.drawLine(b,l,k,j),this.fillRect(0,k+j-this.halfPixel,this.width,this.halfPixel)},drawLine:function(a,b,c,d){for(var e in this.canvases){var f=this.canvases[e];this.setFillStyles(f),this.drawLineToContext(f,f.waveCtx,a,b,c,d),this.drawLineToContext(f,f.progressCtx,a,b,c,d)}},drawLineToContext:function(a,b,c,d,e,f){if(b){var g=c.length/2,h=1;this.params.fillParent&&this.width!=g&&(h=this.width/g);var i=Math.round(g*a.start),j=Math.round(g*a.end);b.beginPath(),b.moveTo(this.halfPixel,e+f);for(var k=i;k<j;k++){var l=Math.round(c[2*k]/d*e);b.lineTo((k-i)*h+this.halfPixel,e-l+f)}for(var k=j-1;k>=i;k--){var l=Math.round(c[2*k+1]/d*e);b.lineTo((k-i)*h+this.halfPixel,e-l+f)}b.closePath(),b.fill()}},fillRect:function(a,b,c,d){for(var e in this.canvases){var f=this.canvases[e],g=e*this.maxCanvasWidth,h={x1:Math.max(a,e*this.maxCanvasWidth),y1:b,x2:Math.min(a+c,e*this.maxCanvasWidth+f.waveCtx.canvas.width),y2:b+d};h.x1<h.x2&&(this.setFillStyles(f),this.fillRectToContext(f.waveCtx,h.x1-g,h.y1,h.x2-h.x1,h.y2-h.y1),this.fillRectToContext(f.progressCtx,h.x1-g,h.y1,h.x2-h.x1,h.y2-h.y1))}},fillRectToContext:function(a,b,c,d,e){a&&a.fillRect(b,c,d,e)},setFillStyles:function(a){a.waveCtx.fillStyle=this.params.waveColor,this.hasProgressCanvas&&(a.progressCtx.fillStyle=this.params.progressColor)},updateProgress:function(a){var b=Math.round(this.width*a)/this.params.pixelRatio;this.style(this.progressWave,{width:b+"px"})}}),function(){var b=function(){var b=document.querySelectorAll("wavesurfer");Array.prototype.forEach.call(b,function(b){var c=a.util.extend({container:b,backend:"MediaElement",mediaControls:!0},b.dataset);b.style.display="block";var d=a.create(c);if(b.dataset.peaks)var e=JSON.parse(b.dataset.peaks);d.load(b.dataset.url,e)})};"complete"===document.readyState?b():window.addEventListener("load",b)}(),a});
//# sourceMappingURL=wavesurfer.min.js.map