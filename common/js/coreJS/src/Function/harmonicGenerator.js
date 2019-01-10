//harmonicGenerator-related functions
'use strict';

(function ($, core) {
	var A = core.harmonicGenerator = {}
	
	var A = core.harmonicGenerator = {
		getAvoidNote: function (scale) {
			var scaleArr = [];
			var index = 0;
			while(true) {
				var avoidNote = scale[index+1] - scale[index];
				if (avoidNote == 1) {
					scaleArr.push(scale[index+1]);
				}
				index = index + 2;
				
				if (index > scale.length) break;
			}
			
			return scaleArr;
		},
		setOctave: function (scale, octave) {
			var scaleArr = [];
			scale.forEach(function(note) {
				scaleArr.push((parseInt(12) * octave) + parseInt(note)); 
			});
			
			return scaleArr;
		},
		getChord: function (root, type) {
			var scaleArr = [];
			var Scale = chordList[type];
			Scale.forEach(function(note) {
				scaleArr.push(parseInt(root) + parseInt(note)); 
			});
			
			return scaleArr;
		},
		getScaleDiff: function (scale) {
			var scaleArr = [];
			var scaleCompare;
			var scaleTmp;
			scaleCompare = $.core.Arr.getMinValue(scale);
			scale.forEach(function(note) {
				if (!scaleTmp) {
					scaleTmp = note;
				} else {
					scaleTmp = note;
				}
				
				var diff = (parseInt(note) - parseInt(scaleCompare));
				scaleArr.push(diff);
			});
			
			return scaleArr;
		},
		getMajorChord: function (root) {
			return this.getChord(root, "majorChord");
		},
		getMinorChord: function (root) {
			return this.getChord(root, "minorChord");
		},
		getAugmentedChord: function (root) {
			return this.getChord(root, "augmentedChord");
		},
		getSuspendedChord: function (root) {
			return this.getChord(root, "suspendedChord");
		},
		getDiminishedChord: function (root) {
			return this.getChord(root, "diminishedChord");
		},
		getMajorSeventhChord: function (root) {
			return this.getChord(root, "majorSeventhChord");
		},
		getMinorSeventhChord: function (root) {
			return this.getChord(root, "minorSeventhChord");
		},
		getMinorSeventhFlat5Chord: function (root) {
			return this.getChord(root, "minorSeventhFlat5Chord");
		},
		getSeventhChord: function (root) {
			return this.getChord(root, "SeventhChord");
		},
		getDiminishedSeventhChord: function (root) {
			return this.getChord(root, "diminishedSeventhChord");
		},
		getAugmentedSeventhChord: function (root) {
			return this.getChord(root, "augmentedSeventhChord");
		},
		getSeventhFlat5Chord: function (root) {
			return this.getChord(root, "SeventhFlat5Chord");
		},
		getSeventhSharp5Chord: function (root) {
			return this.getChord(root, "SeventhSharp5Chord");
		},
		getNoteList: function (scale) {
			var scaleArr = [];
			var objectKeys = Object.keys(yamahaTone);
			var objectVars = Object.values(yamahaTone);
			 function getYamahaNote(value) {
				var arrIndex = objectVars.indexOf(value % 12); // remove Octave
				return objectKeys[arrIndex];
			}
			
			scale.forEach(function(note) {
				scaleArr.push(getYamahaNote(note));
			});
			
			return scaleArr;
		},
		getScale: function (root, type) {
			var scaleArr = [];
			var Scale = scaleList[type];
			Scale.forEach(function(note) {
				scaleArr.push(parseInt(root) + parseInt(note)); 
			});
			
			return scaleArr;
		},
		getMajorScale: function (root) {
			return this.getScale(root, 'majorScale');
		},
		getMinorScale: function (root) {
			return this.getScale(root, 'minorScale');
		},
		getPentatonicScale: function (root) {
			return this.getScale(root, 'pentatonicScale');
		},
		getBluesScale: function (root) {
			return this.getScale(root, 'bluesScale');
		},
		getMode: function (root, type) {
			var scaleArr = [];
			var Scale = modeList[type];
			Scale.forEach(function(note) {
				scaleArr.push(parseInt(root) + parseInt(note)); 
			});
			
			return scaleArr;
		},
		getIonianMode: function (root) {
			return this.getMode(root, 'ionianMode');
		},
		getDorianMode: function (root) {
			return this.getMode(root, 'dorianMode');
		},
		getPhrygianMode: function (root) {
			return this.getMode(root, 'phrygianMode');
		},
		getLydianMode: function (root) {
			return this.getMode(root, 'lydianMode');
		},
		getMixolydianMode: function (root) {
			return this.getMode(root, 'mixolydianMode');
		},
		getAeolianMode: function (root) {
			return this.getMode(root, 'aeolianMode');
		},
		getLocrianMode: function (root) {
			return this.getMode(root, 'locrianMode');
		},
		getHypoionianMode: function (root) {
			return this.getMode(root, 'hypoionianMode');
		},
		getHypodorianMode: function (root) {
			return this.getMode(root, 'hypodorianMode');
		},
		getHypophrygianMode: function (root) {
			return this.getMode(root, 'hypophrygianMode');
		},
		getHypolydianMode: function (root) {
			return this.getMode(root, 'hypolydianMode');
		},
		getHypomixolydianMode: function (root) {
			return this.getMode(root, 'hypomixolydianMode');
		},
		getHypoaeolianMode: function (root) {
			return this.getMode(root, 'hypoaeolianMode');
		},
		getHypolocrianMode: function (root) {
			return this.getMode(root, 'hypolocrianMode');
		}
	};
})(jQuery, $.core);