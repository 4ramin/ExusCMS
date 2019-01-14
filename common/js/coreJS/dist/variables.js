//Define a global variables
const html5Elements = ['source', 'track', 'audio', 'video'],
	dataType = "Boolean_Number_String_Function_Array_Date_RegExp_Object_Error".split("_"),
	revEvent = {'mouseenter': "mouseover", 'mouseleave': "mouseout", 'pointerenter': "pointerover", 'pointerleave': "pointerout"},
	domType = ["", "Webkit", "Moz", "ms", "O"],
	doctype = document.doctype || {},
	SVG_NS = 'http://www.w3.org/2000/svg',
	SVG_ICON = {
	  // https://commons.wikimedia.org/wiki/File:B%C3%A9mol.svg
	  'flat': 'm 1.380956,10.84306 -0.02557,1.68783 0,0.28131 c 0,0.56261 0.02557,1.12522 0.102293,1.68783 1.150797,-0.97178 2.378313,-2.04586 2.378313,-3.55468 0,-0.84392 -0.358026,-1.7134103 -1.09965,-1.7134103 -0.792771,0 -1.329809,0.7672 -1.355382,1.6111203 z M 0.306879,15.42067 0,0.20457992 C 0.204586,0.07671992 0.460319,-7.6580061e-8 0.690478,-7.6580061e-8 0.920637,-7.6580061e-8 1.17637,0.07669992 1.380956,0.20457992 L 1.201943,9.0273597 c 0.639331,-0.53704 1.483249,-0.8695 2.327166,-0.8695 1.329809,0 2.27602,1.22752 2.27602,2.6084803 0,2.04586 -2.1993,2.99207 -3.759269,4.32188 C 1.662261,15.42067 1.432102,16.06 0.895064,16.06 0.562612,16.06 0.306879,15.77869 0.306879,15.42067 Z',
	  'flat_height': 16.059999465942383,
	  // https://commons.wikimedia.org/wiki/File:Di%C3%A8se.svg
	  'sharp': 'm 4.6252809,-11.71096 c 0,-0.21414 -0.1713067,-0.40686 -0.38544,-0.40686 -0.2141334,0 -0.4068535,0.19272 -0.4068535,0.40686 l 0,3.1049303 -1.777307,-0.66381 0,-3.3833103 c 0,-0.21413 -0.19272,-0.40685 -0.4068534,-0.40685 -0.2141334,0 -0.3854401,0.19272 -0.3854401,0.40685 l 0,3.1049303 -0.68522678,-0.25696 c -0.0428267,-0.0214 -0.10706669,-0.0214 -0.14989337,-0.0214 C 0.19272004,-9.8265897 0,-9.6338697 0,-9.3983197 l 0,1.2847998 c 0,0.1713 0.10706669,0.34261 0.27837339,0.40685 l 0.98501351,0.34261 0,3.42614 -0.68522678,-0.23555 c -0.0428267,-0.0214 -0.10706669,-0.0214 -0.14989337,-0.0214 C 0.19272004,-4.1948799 0,-4.0021599 0,-3.7666099 l 0,1.2848 c 0,0.1713 0.10706669,0.3212 0.27837339,0.38544 l 0.98501351,0.36402 0,3.38331 c 0,0.21413 0.1713067,0.40685 0.3854401,0.40685 0.2141334,0 0.4068534,-0.19272 0.4068534,-0.40685 l 0,-3.10493 1.777307,0.66380998 0,3.38331002 c 0,0.21413 0.1927201,0.40685 0.4068535,0.40685 0.2141333,0 0.38544,-0.19272 0.38544,-0.40685 l 0,-3.10494002 0.6852268,0.25696 c 0.042827,0.0214 0.1070667,0.0214 0.1498934,0.0214 0.2355467,0 0.4282668,-0.19272 0.4282668,-0.42827 l 0,-1.28479998 c 0,-0.17131 -0.1070667,-0.34261 -0.2783734,-0.40685 l -0.9850136,-0.34262 0,-3.42613 0.6852268,0.23554 c 0.042827,0.0214 0.1070667,0.0214 0.1498934,0.0214 0.2355467,0 0.4282668,-0.19272 0.4282668,-0.42827 l 0,-1.2848 c 0,-0.17131 -0.1070667,-0.3212 -0.2783734,-0.38544 l -0.9850136,-0.36403 0,-3.3833001 z m -2.5696005,8.0728301 0,-3.42614 1.777307,0.6424 0,3.42614 z',
	  'sharp_height': 16.059999465942383,
	  'bar': 'M 0,0 0,100',
	  'bar_height': 100,
	  'delta_char': '\u0394',
	  'oslash_char': '\u00F8',
	  'slabo27px_H_height_ratio': 33.33 / 50
	},
	
	// Music
	OctaveTone = 12,
	toneYamaha = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
	yamahaTone = {"C" : 0, "Dbb" : 0, "C#" : 1, "Db" : 1, "D" : 2, "Cx" : 2, "Ebb" : 2, "D#" : 3, "Eb" : 3, "E" : 4, "Fb" : 4, "F" : 5, "E#" : 5, "Gbb" : 5, "F#" : 6, "Gb" : 6, "G" : 7, "Fx" : 7, "Abb" : 7, "G#" : 8, "Ab" : 8, "A": 9, "Gx" : 9, "Bbb" : 9, "A#" : 10, "Bb" : 10, "B" : 11, "Ax" : 11, "Cb" : 11, "B#" : 12},
	romeTone = {"I" : 0, "IIbb" : 0, "I#" : 1, "IIb" : 1, "II" : 2, "Ix" : 2, "IIIbb" : 2, "II#" : 3, "IIIb" : 3, "III" : 4, "IVb" : 4, "IV" : 5, "III#" : 5, "Vbb" : 5, "IV#" : 6, "Vb" : 6, "V" : 7, "IVx" : 7, "VIbb" : 7, "V#" : 8, "VIb" : 8, "VI": 9, "Vx" : 9, "VIIbb" : 9, "VI#" : 10, "VIIb" : 10, "VII" : 11, "VIx" : 11, "Ib" : 11, "VII#" : 12},
	symbolTone = {"C" : 0, "D--" : 0, "C+" : 1, "D-" : 1, "D" : 2, "C++" : 2, "E--" : 2, "D+" : 3, "E-" : 3, "E" : 4, "F-" : 4, "F" : 5, "E+" : 5, "G--" : 5, "F+" : 6, "G-" : 6, "G" : 7, "F++" : 7, "A--" : 7, "G+" : 8, "A-" : 8, "A": 9, "G++" : 9, "B--" : 9, "A+" : 10, "B-" : 10, "B" : 11, "A++" : 11, "C-" : 11, "B+" : 12},
	
	// Scale
	majorScale = [0,2,4,5,7,9,11],
	minorScale = [0,2,3,5,7,8,10],
	pentatonicScale = [0,2,4,7,9],
	bluesScale = [0,3,5,6,7,10],
	melodicMinorScale = [0,2,3,5,7,9,11],
	
	// Mode
	ionianMode = majorScale, // C
	dorianMode = [0,2,3,5,7,9,10], // D
	phrygianMode = [0,1,3,5,7,8,10] // E
	lydianMode = [0,2,4,6,7,9,11], // F
	mixolydianMode = [0,2,4,5,7,9,10], // G
	aeolianMode = [0,2,3,5,7,8,10,12], //A
	locrianMode = [0,1,3,5,6,8,10], // B
	locrian9Mode = [0,2,3,5,6,8,10], // B
	locrianb7Mode = [0,2,4,6,8,10,11], // B
	mixolydianMode = [0,2,4,5,8,10,11], // B
	
	// hypo Mode
	hypoionianMode = mixolydianMode, // C
	hypodorianMode = aeolianMode, // D
	hypophrygianMode = locrianMode, // E
	hypolydianMode = ionianMode, // F
	hypomixolydianMode = dorianMode, // G
	hypoaeolianMode = phrygianMode, // A
	hypolocrianMode = lydianMode, // B
	
	// Compare
	scaleList  = {"majorScale" : majorScale, "minorScale" : minorScale, "pentatonicScale" : pentatonicScale, "aeolianScale" : aeolianMode, "bluesScale" : bluesScale},
	modeList = {"ionianMode" : ionianMode, "dorianMode" : dorianMode, "phrygianMode" : phrygianMode, "lydianMode" : lydianMode, "mixolydianMode" : mixolydianMode, "aeolianMode" : aeolianMode, "locrianMode" : locrianMode, "hypoionianMode" : hypoionianMode, "hypodorianMode" : hypodorianMode, "hypophrygianMode" : hypophrygianMode, "hypolydianMode" : hypolydianMode, "hypomixolydianMode" : hypomixolydianMode, "hypoaeolianMode" : hypoaeolianMode, "hypolocrianMode" : hypolocrianMode},
	
	/**
	 * Perfect is 1,4,5,8
	 *
	 * Perfect Interval : Double Diminished... <- Diminished <- {Perfect} -> Augmented -> Double Augmented....
	 **/
	perfect4Interval = [0,5], // Perfect 4
	perfect5Interval = [0,7], // Perfect 5
	perfect5Interval = [0,12], // Perfect 8
	
	perfectInterval = {perfect4Interval, perfect5Interval, perfect5Interval},
	
	/**
	 * Major, Minor is 2,3,6,7
	 *
	 * Perfect Interval : Double Diminished... <- Diminished <- {Minor <-> Major} -> Augmented -> Double Augmented....
	 **/
	m2Interval = [0,2], // major 2
	m3Interval = [0,4], // major 3
	m6Interval = [0,9], // major 6
	m7Interval = [0,11], // major 7
	
	mInterval = {m2Interval, m3Interval, m6Interval, m7Interval},
	
	germanAugmentedSixthChord = [0,3,6,9], // bA, C, Eb, Gb(F#)
	frenchAugmentedSixthChord = [0,3,5,9], // bA, C, D, Gb(F#)
	italianAugmentedSixthChord = [0,3,9], // bA, C, Gb(F#)
	
	majorChord = [0,4,7], // Maj, C, E, G
	minorChord = [0,3,7], // Min, C, Eb, G
	augmentedChord = [0,4,8], // +, C, E, G#
	suspendedChord = [0,5,7], // sus4, C, F, G
	diminishedChord = [0,3,6], // dim, C, Eb, Gb
	majorSeventhChord = [0,4,7,11], // M7, C, E, G, B
	minorSixthChord = [0,3,7,9], // m7, C, Eb, G, A
	minorSeventhChord = [0,3,7,10], // m7, C, Eb, G, Bb
	minorSeventhFlat5Chord = [0,3,8,10], // m7b5, C, Eb, G#, Bb
	SeventhChord = [0,4,7,10], // 7, C, E, G, Bb
	diminishedSeventhChord = [0,3,6,9], // dim7, C, Eb, Gb, Bbb(=A)
	augmentedSeventhChord = [0,4,8,10], // 7+, C, E, G#, Bb
	SeventhFlat5Chord = [0,4,6,10], // 7b5, C, E, Gb, Bb
	SeventhSharp5Chord = [0,4,8,10], // 7+5, C, E, G#, Bb
	
	chordList = {"majorChord" : majorChord, "minorChord" : minorChord, "augmentedChord" : augmentedChord, "suspendedChord" : suspendedChord, "diminishedChord" : diminishedChord, "majorSeventhChord" : majorSeventhChord, "minorSeventhChord" : minorSeventhChord, "minorSeventhFlat5Chord" : minorSeventhFlat5Chord, "SeventhChord" : SeventhChord, "diminishedSeventhChord" : diminishedSeventhChord, "augmentedSeventhChord" : augmentedSeventhChord, "SeventhFlat5Chord" : SeventhFlat5Chord, "SeventhSharp5Chord" : SeventhSharp5Chord, "germanAugmentedSixthChord" : germanAugmentedSixthChord, "frenchAugmentedSixthChord" : frenchAugmentedSixthChord, "italianAugmentedSixthChord" : italianAugmentedSixthChord},
	
	diatonicChord = {
		"CM7"  : {"root" : 0, "chord" : majorSeventhChord, "romename" : "IM7", "yamahaname" : "CM7", "symbols" : "CΔ7", "type": "Tonic"}, // CM7
		"Dm7"  : {"root" : 2, "chord" : minorSeventhChord, "romename" : "IIm7", "yamahaname" : "Dm7", "symbols" : "D-7", "type" : "SubDominant"}, // Dm7
		"Em7"  : {"root" : 4, "chord" : minorSeventhChord, "romename" : "IIIm7", "yamahaname" : "Em7", "symbols" : "E-7", "type": "Dominant"}, // Em7
		"FM7"  : {"root" : 5, "chord" : majorSeventhChord, "romename" : "IVM7", "yamahaname" : "FM7", "symbols" : "FΔ7", "type": "SubDominant"}, // F7
		"G7"   : {"root" : 7, "chord" : SeventhChord, "romename" : "VM7", "yamahaname" : "G7", "symbols" : "G7", "type": "Dominant"}, // G7
		"Am7"  : {"root" : 9, "chord" : minorSeventhChord, "romename" : "VIm7", "yamahaname" : "Am7", "symbols" : "VI-7", "type": "Tonic"}, // Am7
		"Bdim7": {"root" : 11, "chord" : diminishedSeventhChord, "romename" : "VIIdim7", "yamahaname" : "Bdim7", "symbols" : "VIIo7", "type": ["Dominant", "SubDominant"]} // Bdim7
	}
	
	aeolianChord = {
		"Cm7": {"root": 0, "chord": minorSeventhChord, "romename": "Im7", "yamahaname": "Cm7", "symbols": "C-7", "type": "Tonic Minor", "scale": 
			{"aeolian": {"avoidnote": 8}, "dorian": {"avoidnote": 8}}
		}, // Cm7
		"Dm7b5": {"root": 2, "chord": minorSeventhFlat5Chord, "romename": "IIm7b5", "yamahaname": "Dm7b5", "symbols": "D-7b5", "type": "SubDominant Minor", "scale": 
			{"locrian": {"avoidnote": 1}, "locrian9": {}}
		}, // Dm7b5
		"DbM7": {"root": 2, "chord": majorSeventhChord, "romename": "IIbM7", "yamahaname": "DbM7", "symbols": "Db-7", "type": "SubDominant Minor", "scale": 
			{"locrian": {"avoidnote": 1}, "locrian9": {}}
		}, // DbM7
		"EbM7": {"root": 4, "chord": majorSeventhChord, "romename": "IIIbM7", "yamahaname": "EbM7", "symbols": "EbΔ7", "type": "Tonic Minor", "scale": 
			{"lydian": {}}
		}, // EbM7
		"IVm7": {"root": 5, "chord": minorSeventhChord, "romename": "IVm7", "yamahaname": "Fm7", "symbols": "F-7", "type": "SubDominant Minor", "scale": 
			{"dorian": {"avoidnote": 9}}
		}, // IVm7
		"IVm6": {"root": 5, "chord": minorSeventhChord, "romename": "IVm6", "yamahaname": "Fm6", "symbols": "F-6", "type": "SubDominant Minor", "scale": 
			{"dorian": {"avoidnote": 10}}
		}, // IVm6
		"IVmM7": {"root": 5, "chord": minorSeventhChord, "romename": "IVmM7", "yamahaname": "FmM7", "symbols": "F-Δ7", "type": "SubDominant Minor", "scale": 
			{"melodicminor": {}}
		}, // IVmM7
		"Vm7": {"root": 7, "chord": minorSeventhChord, "romename": "Vm7", "yamahaname": "Vm7", "symbols": "G-7", "type": "Tonic Minor", "scale": 
			{"dorian": {"avoidnote": 9}, "aeolian": {"avoidnote": 8}}
		}, // Vm7
		"AbM7": {"root": 9, "chord": majorSeventhChord, "romename": "VIbM7", "yamahaname": "AbM7", "symbols": "VIbΔ7", "type": "Tonic", "SubDominant Minor": 
			{"lydian": {}}
		}, // AbM7
		"Bb7": {"root": 11, "chord": SeventhChord, "romename": "VII7", "yamahaname": "Bb7", "symbols": "VII7", "type": "SubDominant Minor", "scale": 
			{"locrianb7": {}, "mixolydian": {"avoidnote": 5}}
		} // Bb7
	}
	
	getFlashLink = "http://get.adobe.com/flashplayer/",
	
	//XHLHTTP
	listXMLHTTP = ['Microsoft.XMLHTTP'],
	
	listMSXML2 = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.5.0", "MSXML2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP.2.0", "MSXML2.XMLHTTP"],
	
	numberList = '0123456789',
	
	upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	
	lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz',
	
	xmlHeader = '<?xml version="1.0" encoding="utf-8"?>',
	
	machinePlatform = {"web": "Website", "win": "Windows", "dos": "DOS", "lin": "Linux", "mac": "Mac OS", "ios": "Apple iProduct", "and": "Android", "dvd": "DVD Player", "bdp": "Blu-ray Player", "fmt": "FM Towns", "gba": "Game Boy Advance", "gbc": "Game Boy Color", "msx": "MSX", "nds": "Nintendo DS", "nes": "Famicom", "p88": "PC-88", "p98": "PC-98", "pce": "PC Engine", "pcf": "PC-FX", "psp": "PlayStation Portable", "ps1": "PlayStation 1", "ps2": "PlayStation 2", "ps3": "PlayStation 3", "ps4": "PlayStation 4", "psv": "PlayStation Vita", "drc": "Dreamcast", "sat": "Sega Saturn", "sfc": "Super Nintendo", "wii": "Nintendo Wii", "n3d": "Nintendo 3DS", "x68": "X68000", "xb1": "Xbox", "xb3": "Xbox 360", "xbo": "Xbox One"},
	
	waitFormSkin = {'equalizer': {'gif':'equalizer-bars.gif', 'width':'150px', 'height':'150px'}, 'rotatepalette': {'gif':'rotate-palette.gif','width':'150px', 'height':'150px'}, 'pulse': {'gif':'pulse-bar.gif', 'width':'150px', 'height':'150px'}, 'curve': {'gif':'curve-bars.gif', 'width':'150px', 'height':'150px'}, 'bouncing': {'gif':'bouncing-circle.gif', 'width':'150px','height':'150px'}, 'waveball': {'gif':'wave-ball.gif', 'width':'150px', 'height':'150px'}, 'raindrops': {'gif':'raindrops.gif', 'width':'170px', 'height':'170px'}, 'dualring': {'gif':'dual-ring.gif', 'width':'200px', 'height':'200px'}, 'interwind': {'gif':'interwind.gif', 'width':'180px', 'height':'180px'}, 'dashring': {'gif':'dash-ring.gif', 'width':'210px', 'height':'210px'}, 'ellipsis': {'gif':'ellipsis.gif', 'width':'220px', 'height':'220px'}, 'dotdot': {'gif':'dotdot.gif', 'width':'120px', 'height':'120px'}, 'round': {'gif':'round.gif', 'width':'120px', 'height':'120px'}, 'ring': {'gif':'ring.gif', 'width':'120px', 'height':'120px'}, 'macfan': {'gif':'mac-fan.gif', 'width':'120px', 'height':'120px'}, 'paletterotatingring': {'gif':'palette-rotating-ring.gif', 'width':'120px', 'height':'120px'}, 'romaniruiz': {'gif':'romani_ruiz.gif', 'width':'120px', 'height':'120px'}, 'pulsingsquares': {'gif':'pulsing-squares.gif', 'width':'110px', 'height':'110px'}, 'messenger-typing': {'gif':'messenger-typing.gif', 'width':'110px', 'height':'110px'}, 'orbitballs': {'gif':'orbit-balls.gif', 'width':'110px', 'height':'110px'}, 'blockrotate': {'gif':'block-rotate.gif', 'width':'110px', 'height':'110px'}, 'doubleringspinner': {'gif':'double-ring-spinner.gif', 'width':'150px', 'height':'150px'}},
	
	locationNaturalCode = {'japanese': '日本語', 'bulgarian': 'български', 'czech': 'čeština', 'danish': 'Dansk', 'dutch': 'Nederlands', 'english': 'English', 'finnish': 'Suomi', 'french': 'Français', 'greek': 'Ελληνικά', 'german': 'Deutsch', 'hungarian': 'Magyar', 'italian': 'Italiano', 'koreana': '한국어', 'norwegian': 'Norsk', 'polish': 'Polski', 'portuguese': 'Português', 'brazilian': 'Português-Brasil', 'russian': 'Русский', 'romanian': 'Română', 'schinese': '简体中文', 'spanish': 'Español', 'swedish': 'Svenska', 'tchinese': '繁體中文', 'thai': 'ไทย', 'turkish': 'Türkçe'},
	
	unicodeImoticon = {"00a9": ["©", "", "󾬩", ["copyright"]],"00ae": ["®", "", "󾬭", ["registered"]],"203c": ["‼", "", "󾬆", ["bangbang"]],2049: ["⁉", "", "󾬅", ["interrobang"]],2122: ["™", "", "󾬪", ["tm"]],2139: ["ℹ", "", "󾭇", ["information_source"]],2194: ["↔", "", "󾫶", ["left_right_arrow"]],2195: ["↕", "", "󾫷", ["arrow_up_down"]],2196: ["↖", "", "󾫲", ["arrow_upper_left"]],2197: ["↗", "", "󾫰", ["arrow_upper_right"]],2198: ["↘", "", "󾫱", ["arrow_lower_right"]],2199: ["↙", "", "󾫳", ["arrow_lower_left"]],"21a9": ["↩", "", "󾮃", ["leftwards_arrow_with_hook"]],"21aa": ["↪", "", "󾮈", ["arrow_right_hook"]],"231a": ["⌚", "", "󾀝", ["watch"]],"231b": ["⌛", "", "󾀜", ["hourglass"]],"23e9": ["⏩", "", "󾫾", ["fast_forward"]],"23ea": ["⏪", "", "󾫿", ["rewind"]],"23eb": ["⏫", "", "󾬃", ["arrow_double_up"]],"23ec": ["⏬", "", "󾬂", ["arrow_double_down"]],"23f0": ["⏰", "", "󾀪", ["alarm_clock"]],"23f3": ["⏳", "", "󾀛", ["hourglass_flowing_sand"]],"24c2": ["Ⓜ", "", "󾟡", ["m"]],"25aa": ["▪", "", "󾭮", ["black_small_square"]],"25ab": ["▫", "", "󾭭", ["white_small_square"]],"25b6": ["▶", "", "󾫼", ["arrow_forward"]],"25c0": ["◀", "", "󾫽", ["arrow_backward"]],"25fb": ["◻", "", "󾭱", ["white_medium_square"]],"25fc": ["◼", "", "󾭲", ["black_medium_square"]],"25fd": ["◽", "", "󾭯", ["white_medium_small_square"]],"25fe": ["◾", "", "󾭰", ["black_medium_small_square"]],2600: ["☀", "", "󾀀", ["sunny"]],2601: ["☁", "", "󾀁", ["cloud"]],"260e": ["☎", "", "󾔣", ["phone", "telephone"]],2611: ["☑", "", "󾮋", ["ballot_box_with_check"]],2614: ["☔", "", "󾀂", ["umbrella"]],2615: ["☕", "", "󾦁", ["coffee"]],"261d": ["☝", "", "󾮘", ["point_up"]],"263a": ["☺", "", "󾌶", ["relaxed"]],2648: ["♈", "", "󾀫", ["aries"]],2649: ["♉", "", "󾀬", ["taurus"]],"264a": ["♊", "", "󾀭", ["gemini"]],"264b": ["♋", "", "󾀮", ["cancer"]],"264c": ["♌", "", "󾀯", ["leo"]],"264d": ["♍", "", "󾀰", ["virgo"]],"264e": ["♎", "", "󾀱", ["libra"]],"264f": ["♏", "", "󾀲", ["scorpius"]],2650: ["♐", "", "󾀳", ["sagittarius"]],2651: ["♑", "", "󾀴", ["capricorn"]],2652: ["♒", "", "󾀵", ["aquarius"]],2653: ["♓", "", "󾀶", ["pisces"]],2660: ["♠", "", "󾬛", ["spades"]],2663: ["♣", "", "󾬝", ["clubs"]],2665: ["♥", "", "󾬚", ["hearts"]],2666: ["♦", "", "󾬜", ["diamonds"]],2668: ["♨", "", "󾟺", ["hotsprings"]],"267b": ["♻", "", "󾬬", ["recycle"]],"267f": ["♿", "", "󾬠", ["wheelchair"]],2693: ["⚓", "", "󾓁", ["anchor"]],"26a0": ["⚠", "", "󾬣", ["warning"]],"26a1": ["⚡", "", "󾀄", ["zap"]],"26aa": ["⚪", "", "󾭥", ["white_circle"]],"26ab": ["⚫", "", "󾭦", ["black_circle"]],"26bd": ["⚽", "", "󾟔", ["soccer"]],"26be": ["⚾", "", "󾟑", ["baseball"]],"26c4": ["⛄", "", "󾀃", ["snowman"]],"26c5": ["⛅", "", "󾀏", ["partly_sunny"]],"26ce": ["⛎", "", "󾀷", ["ophiuchus"]],"26d4": ["⛔", "", "󾬦", ["no_entry"]],"26ea": ["⛪", "", "󾒻", ["church"]],"26f2": ["⛲", "", "󾒼", ["fountain"]],"26f3": ["⛳", "", "󾟒", ["golf"]],"26f5": ["⛵", "", "󾟪", ["boat", "sailboat"]],"26fa": ["⛺", "", "󾟻", ["tent"]],"26fd": ["⛽", "", "󾟵", ["fuelpump"]],2702: ["✂", "", "󾔾", ["scissors"]],2705: ["✅", "", "󾭊", ["white_check_mark"]],2708: ["✈", "", "󾟩", ["airplane"]],2709: ["✉", "", "󾔩", ["email", "envelope"]],"270a": ["✊", "", "󾮓", ["fist"]],"270b": ["✋", "", "󾮕", ["hand", "raised_hand"]],"270c": ["✌", "", "󾮔", ["v"]],"270f": ["✏", "", "󾔹", ["pencil2"]],2712: ["✒", "", "󾔶", ["black_nib"]],2714: ["✔", "", "󾭉", ["heavy_check_mark"]],2716: ["✖", "", "󾭓", ["heavy_multiplication_x"]],2728: ["✨", "", "󾭠", ["sparkles"]],2733: ["✳", "", "󾭢", ["eight_spoked_asterisk"]],2734: ["✴", "", "󾭡", ["eight_pointed_black_star"]],2744: ["❄", "", "󾀎", ["snowflake"]],2747: ["❇", "", "󾭷", ["sparkle"]],"274c": ["❌", "", "󾭅", ["x"]],"274e": ["❎", "", "󾭆", ["negative_squared_cross_mark"]],2753: ["❓", "", "󾬉", ["question"]],2754: ["❔", "", "󾬊", ["grey_question"]],2755: ["❕", "", "󾬋", ["grey_exclamation"]],2757: ["❗", "", "󾬄", ["exclamation", "heavy_exclamation_mark"]],2764: ["❤", "", "󾬌", ["heart"], "<3"],2795: ["➕", "", "󾭑", ["heavy_plus_sign"]],2796: ["➖", "", "󾭒", ["heavy_minus_sign"]],2797: ["➗", "", "󾭔", ["heavy_division_sign"]],"27a1": ["➡", "", "󾫺", ["arrow_right"]],"27b0": ["➰", "", "󾬈", ["curly_loop"]],"27bf": ["➿", "", "󾠫", ["loop"]],2934: ["⤴", "", "󾫴", ["arrow_heading_up"]],2935: ["⤵", "", "󾫵", ["arrow_heading_down"]],"2b05": ["⬅", "", "󾫻", ["arrow_left"]],"2b06": ["⬆", "", "󾫸", ["arrow_up"]],"2b07": ["⬇", "", "󾫹", ["arrow_down"]],"2b1b": ["⬛", "", "󾭬", ["black_large_square"]],"2b1c": ["⬜", "", "󾭫", ["white_large_square"]],"2b50": ["⭐", "", "󾭨", ["star"]],"2b55": ["⭕", "", "󾭄", ["o"]],3030: ["〰", "", "󾬇", ["wavy_dash"]],"303d": ["〽", "", "󾠛", ["part_alternation_mark"]],3297: ["㊗", "", "󾭃", ["congratulations"]],3299: ["㊙", "", "󾬫", ["secret"]],"1f004": ["🀄", "", "󾠋", ["mahjong"]],"1f0cf": ["🃏", "", "󾠒", ["black_joker"]],"1f170": ["🅰", "", "󾔋", ["a"]],"1f171": ["🅱", "", "󾔌", ["b"]],"1f17e": ["🅾", "", "󾔎", ["o2"]],"1f17f": ["🅿", "", "󾟶", ["parking"]],"1f18e": ["🆎", "", "󾔍", ["ab"]],"1f191": ["🆑", "", "󾮄", ["cl"]],"1f192": ["🆒", "", "󾬸", ["cool"]],"1f193": ["🆓", "", "󾬡", ["free"]],"1f194": ["🆔", "", "󾮁", ["id"]],"1f195": ["🆕", "", "󾬶", ["new"]],"1f196": ["🆖", "", "󾬨", ["ng"]],"1f197": ["🆗", "", "󾬧", ["ok"]],"1f198": ["🆘", "", "󾭏", ["sos"]],"1f199": ["🆙", "", "󾬷", ["up"]],"1f19a": ["🆚", "", "󾬲", ["vs"]],"1f201": ["🈁", "", "󾬤", ["koko"]],"1f202": ["🈂", "", "󾬿", ["sa"]],"1f21a": ["🈚", "", "󾬺", ["u7121"]],"1f22f": ["🈯", "", "󾭀", ["u6307"]],"1f232": ["🈲", "", "󾬮", ["u7981"]],"1f233": ["🈳", "", "󾬯", ["u7a7a"]],"1f234": ["🈴", "", "󾬰", ["u5408"]],"1f235": ["🈵", "", "󾬱", ["u6e80"]],"1f236": ["🈶", "", "󾬹", ["u6709"]],"1f237": ["🈷", "", "󾬻", ["u6708"]],"1f238": ["🈸", "", "󾬼", ["u7533"]],"1f239": ["🈹", "", "󾬾", ["u5272"]],"1f23a": ["🈺", "", "󾭁", ["u55b6"]],"1f250": ["🉐", "", "󾬽", ["ideograph_advantage"]],"1f251": ["🉑", "", "󾭐", ["accept"]],"1f300": ["🌀", "", "󾀅", ["cyclone"]],"1f301": ["🌁", "", "󾀆", ["foggy"]],"1f302": ["🌂", "", "󾀇", ["closed_umbrella"]],"1f303": ["🌃", "", "󾀈", ["stars"]],"1f304": ["🌄", "", "󾀉", ["sunrise_over_mountains"]],"1f305": ["🌅", "", "󾀊", ["sunrise"]],"1f306": ["🌆", "", "󾀋", ["city_sunset"]],"1f307": ["🌇", "", "󾀌", ["city_sunrise"]],"1f308": ["🌈", "", "󾀍", ["rainbow"]],"1f309": ["🌉", "", "󾀐", ["bridge_at_night"]],"1f30a": ["🌊", "", "󾀸", ["ocean"]],"1f30b": ["🌋", "", "󾀺", ["volcano"]],"1f30c": ["🌌", "", "󾀻", ["milky_way"]],"1f30d": ["🌍", "", "", ["earth_africa"]],"1f30e": ["🌎", "", "", ["earth_americas"]],"1f30f": ["🌏", "", "󾀹", ["earth_asia"]],"1f310": ["🌐", "", "", ["globe_with_meridians"]],"1f311": ["🌑", "", "󾀑", ["new_moon"]],"1f312": ["🌒", "", "", ["waxing_crescent_moon"]],"1f313": ["🌓", "", "󾀓", ["first_quarter_moon"]],"1f314": ["🌔", "", "󾀒", ["moon", "waxing_gibbous_moon"]],"1f315": ["🌕", "", "󾀕", ["full_moon"]],"1f316": ["🌖", "", "", ["waning_gibbous_moon"]],"1f317": ["🌗", "", "", ["last_quarter_moon"]],"1f318": ["🌘", "", "", ["waning_crescent_moon"]],"1f319": ["🌙", "", "󾀔", ["crescent_moon"]],"1f31a": ["🌚", "", "", ["new_moon_with_face"]],"1f31b": ["🌛", "", "󾀖", ["first_quarter_moon_with_face"]],"1f31c": ["🌜", "", "", ["last_quarter_moon_with_face"]],"1f31d": ["🌝", "", "", ["full_moon_with_face"]],"1f31e": ["🌞", "", "", ["sun_with_face"]],"1f31f": ["🌟", "", "󾭩", ["star2"]],"1f330": ["🌰", "", "󾁌", ["chestnut"]],"1f331": ["🌱", "", "󾀾", ["seedling"]],"1f332": ["🌲", "", "", ["evergreen_tree"]],"1f333": ["🌳", "", "", ["deciduous_tree"]],"1f334": ["🌴", "", "󾁇", ["palm_tree"]],"1f335": ["🌵", "", "󾁈", ["cactus"]],"1f337": ["🌷", "", "󾀽", ["tulip"]],"1f338": ["🌸", "", "󾁀", ["cherry_blossom"]],"1f339": ["🌹", "", "󾁁", ["rose"]],"1f33a": ["🌺", "", "󾁅", ["hibiscus"]],"1f33b": ["🌻", "", "󾁆", ["sunflower"]],"1f33c": ["🌼", "", "󾁍", ["blossom"]],"1f33d": ["🌽", "", "󾁊", ["corn"]],"1f33e": ["🌾", "", "󾁉", ["ear_of_rice"]],"1f33f": ["🌿", "", "󾁎", ["herb"]],"1f340": ["🍀", "", "󾀼", ["four_leaf_clover"]],"1f341": ["🍁", "", "󾀿", ["maple_leaf"]],"1f342": ["🍂", "", "󾁂", ["fallen_leaf"]],"1f343": ["🍃", "", "󾁃", ["leaves"]],"1f344": ["🍄", "", "󾁋", ["mushroom"]],"1f345": ["🍅", "", "󾁕", ["tomato"]],"1f346": ["🍆", "", "󾁖", ["eggplant"]],"1f347": ["🍇", "", "󾁙", ["grapes"]],"1f348": ["🍈", "", "󾁗", ["melon"]],"1f349": ["🍉", "", "󾁔", ["watermelon"]],"1f34a": ["🍊", "", "󾁒", ["tangerine"]],"1f34b": ["🍋", "", "", ["lemon"]],"1f34c": ["🍌", "", "󾁐", ["banana"]],"1f34d": ["🍍", "", "󾁘", ["pineapple"]],"1f34e": ["🍎", "", "󾁑", ["apple"]],"1f34f": ["🍏", "", "󾁛", ["green_apple"]],"1f350": ["🍐", "", "", ["pear"]],"1f351": ["🍑", "", "󾁚", ["peach"]],"1f352": ["🍒", "", "󾁏", ["cherries"]],"1f353": ["🍓", "", "󾁓", ["strawberry"]],"1f354": ["🍔", "", "󾥠", ["hamburger"]],"1f355": ["🍕", "", "󾥵", ["pizza"]],"1f356": ["🍖", "", "󾥲", ["meat_on_bone"]],"1f357": ["🍗", "", "󾥶", ["poultry_leg"]],"1f358": ["🍘", "", "󾥩", ["rice_cracker"]],"1f359": ["🍙", "", "󾥡", ["rice_ball"]],"1f35a": ["🍚", "", "󾥪", ["rice"]],"1f35b": ["🍛", "", "󾥬", ["curry"]],"1f35c": ["🍜", "", "󾥣", ["ramen"]],"1f35d": ["🍝", "", "󾥫", ["spaghetti"]],"1f35e": ["🍞", "", "󾥤", ["bread"]],"1f35f": ["🍟", "", "󾥧", ["fries"]],"1f360": ["🍠", "", "󾥴", ["sweet_potato"]],"1f361": ["🍡", "", "󾥨", ["dango"]],"1f362": ["🍢", "", "󾥭", ["oden"]],"1f363": ["🍣", "", "󾥮", ["sushi"]],"1f364": ["🍤", "", "󾥿", ["fried_shrimp"]],"1f365": ["🍥", "", "󾥳", ["fish_cake"]],"1f366": ["🍦", "", "󾥦", ["icecream"]],"1f367": ["🍧", "", "󾥱", ["shaved_ice"]],"1f368": ["🍨", "", "󾥷", ["ice_cream"]],"1f369": ["🍩", "", "󾥸", ["doughnut"]],"1f36a": ["🍪", "", "󾥹", ["cookie"]],"1f36b": ["🍫", "", "󾥺", ["chocolate_bar"]],"1f36c": ["🍬", "", "󾥻", ["candy"]],"1f36d": ["🍭", "", "󾥼", ["lollipop"]],"1f36e": ["🍮", "", "󾥽", ["custard"]],"1f36f": ["🍯", "", "󾥾", ["honey_pot"]],"1f370": ["🍰", "", "󾥢", ["cake"]],"1f371": ["🍱", "", "󾥯", ["bento"]],"1f372": ["🍲", "", "󾥰", ["stew"]],"1f373": ["🍳", "", "󾥥", ["egg"]],"1f374": ["🍴", "", "󾦀", ["fork_and_knife"]],"1f375": ["🍵", "", "󾦄", ["tea"]],"1f376": ["🍶", "", "󾦅", ["sake"]],"1f377": ["🍷", "", "󾦆", ["wine_glass"]],"1f378": ["🍸", "", "󾦂", ["cocktail"]],"1f379": ["🍹", "", "󾦈", ["tropical_drink"]],"1f37a": ["🍺", "", "󾦃", ["beer"]],"1f37b": ["🍻", "", "󾦇", ["beers"]],"1f37c": ["🍼", "", "", ["baby_bottle"]],"1f380": ["🎀", "", "󾔏", ["ribbon"]],"1f381": ["🎁", "", "󾔐", ["gift"]],"1f382": ["🎂", "", "󾔑", ["birthday"]],"1f383": ["🎃", "", "󾔟", ["jack_o_lantern"]],"1f384": ["🎄", "", "󾔒", ["christmas_tree"]],"1f385": ["🎅", "", "󾔓", ["santa"]],"1f386": ["🎆", "", "󾔕", ["fireworks"]],"1f387": ["🎇", "", "󾔝", ["sparkler"]],"1f388": ["🎈", "", "󾔖", ["balloon"]],"1f389": ["🎉", "", "󾔗", ["tada"]],"1f38a": ["🎊", "", "󾔠", ["confetti_ball"]],"1f38b": ["🎋", "", "󾔡", ["tanabata_tree"]],"1f38c": ["🎌", "", "󾔔", ["crossed_flags"]],"1f38d": ["🎍", "", "󾔘", ["bamboo"]],"1f38e": ["🎎", "", "󾔙", ["dolls"]],"1f38f": ["🎏", "", "󾔜", ["flags"]],"1f390": ["🎐", "", "󾔞", ["wind_chime"]],"1f391": ["🎑", "", "󾀗", ["rice_scene"]],"1f392": ["🎒", "", "󾔛", ["school_satchel"]],"1f393": ["🎓", "", "󾔚", ["mortar_board"]],"1f3a0": ["🎠", "", "󾟼", ["carousel_horse"]],"1f3a1": ["🎡", "", "󾟽", ["ferris_wheel"]],"1f3a2": ["🎢", "", "󾟾", ["roller_coaster"]],"1f3a3": ["🎣", "", "󾟿", ["fishing_pole_and_fish"]],"1f3a4": ["🎤", "", "󾠀", ["microphone"]],"1f3a5": ["🎥", "", "󾠁", ["movie_camera"]],"1f3a6": ["🎦", "", "󾠂", ["cinema"]],"1f3a7": ["🎧", "", "󾠃", ["headphones"]],"1f3a8": ["🎨", "", "󾠄", ["art"]],"1f3a9": ["🎩", "", "󾠅", ["tophat"]],"1f3aa": ["🎪", "", "󾠆", ["circus_tent"]],"1f3ab": ["🎫", "", "󾠇", ["ticket"]],"1f3ac": ["🎬", "", "󾠈", ["clapper"]],"1f3ad": ["🎭", "", "󾠉", ["performing_arts"]],"1f3ae": ["🎮", "", "󾠊", ["video_game"]],"1f3af": ["🎯", "", "󾠌", ["dart"]],"1f3b0": ["🎰", "", "󾠍", ["slot_machine"]],"1f3b1": ["🎱", "", "󾠎", ["8ball"]],"1f3b2": ["🎲", "", "󾠏", ["game_die"]],"1f3b3": ["🎳", "", "󾠐", ["bowling"]],"1f3b4": ["🎴", "", "󾠑", ["flower_playing_cards"]],"1f3b5": ["🎵", "", "󾠓", ["musical_note"]],"1f3b6": ["🎶", "", "󾠔", ["notes"]],"1f3b7": ["🎷", "", "󾠕", ["saxophone"]],"1f3b8": ["🎸", "", "󾠖", ["guitar"]],"1f3b9": ["🎹", "", "󾠗", ["musical_keyboard"]],"1f3ba": ["🎺", "", "󾠘", ["trumpet"]],"1f3bb": ["🎻", "", "󾠙", ["violin"]],"1f3bc": ["🎼", "", "󾠚", ["musical_score"]],"1f3bd": ["🎽", "", "󾟐", ["running_shirt_with_sash"]],"1f3be": ["🎾", "", "󾟓", ["tennis"]],"1f3bf": ["🎿", "", "󾟕", ["ski"]],"1f3c0": ["🏀", "", "󾟖", ["basketball"]],"1f3c1": ["🏁", "", "󾟗", ["checkered_flag"]],"1f3c2": ["🏂", "", "󾟘", ["snowboarder"]],"1f3c3": ["🏃", "", "󾟙", ["runner", "running"]],"1f3c4": ["🏄", "", "󾟚", ["surfer"]],"1f3c6": ["🏆", "", "󾟛", ["trophy"]],"1f3c7": ["🏇", "", "", ["horse_racing"]],"1f3c8": ["🏈", "", "󾟝", ["football"]],"1f3c9": ["🏉", "", "", ["rugby_football"]],"1f3ca": ["🏊", "", "󾟞", ["swimmer"]],"1f3e0": ["🏠", "", "󾒰", ["house"]],"1f3e1": ["🏡", "", "󾒱", ["house_with_garden"]],"1f3e2": ["🏢", "", "󾒲", ["office"]],"1f3e3": ["🏣", "", "󾒳", ["post_office"]],"1f3e4": ["🏤", "", "", ["european_post_office"]],"1f3e5": ["🏥", "", "󾒴", ["hospital"]],"1f3e6": ["🏦", "", "󾒵", ["bank"]],"1f3e7": ["🏧", "", "󾒶", ["atm"]],"1f3e8": ["🏨", "", "󾒷", ["hotel"]],"1f3e9": ["🏩", "", "󾒸", ["love_hotel"]],"1f3ea": ["🏪", "", "󾒹", ["convenience_store"]],"1f3eb": ["🏫", "", "󾒺", ["school"]],"1f3ec": ["🏬", "", "󾒽", ["department_store"]],"1f3ed": ["🏭", "", "󾓀", ["factory"]],"1f3ee": ["🏮", "", "󾓂", ["izakaya_lantern", "lantern"]],"1f3ef": ["🏯", "", "󾒾", ["japanese_castle"]],"1f3f0": ["🏰", "", "󾒿", ["european_castle"]],"1f400": ["🐀", "", "", ["rat"]],"1f401": ["🐁", "", "", ["mouse2"]],"1f402": ["🐂", "", "", ["ox"]],"1f403": ["🐃", "", "", ["water_buffalo"]],"1f404": ["🐄", "", "", ["cow2"]],"1f405": ["🐅", "", "", ["tiger2"]],"1f406": ["🐆", "", "", ["leopard"]],"1f407": ["🐇", "", "", ["rabbit2"]],"1f408": ["🐈", "", "", ["cat2"]],"1f409": ["🐉", "", "", ["dragon"]],"1f40a": ["🐊", "", "", ["crocodile"]],"1f40b": ["🐋", "", "", ["whale2"]],"1f40c": ["🐌", "", "󾆹", ["snail"]],"1f40d": ["🐍", "", "󾇓", ["snake"]],"1f40e": ["🐎", "", "󾟜", ["racehorse"]],"1f40f": ["🐏", "", "", ["ram"]],"1f410": ["🐐", "", "", ["goat"]],"1f411": ["🐑", "", "󾇏", ["sheep"]],"1f412": ["🐒", "", "󾇎", ["monkey"]],"1f413": ["🐓", "", "", ["rooster"]],"1f414": ["🐔", "", "󾇔", ["chicken"]],"1f415": ["🐕", "", "", ["dog2"]],"1f416": ["🐖", "", "", ["pig2"]],"1f417": ["🐗", "", "󾇕", ["boar"]],"1f418": ["🐘", "", "󾇌", ["elephant"]],"1f419": ["🐙", "", "󾇅", ["octopus"]],"1f41a": ["🐚", "", "󾇆", ["shell"]],"1f41b": ["🐛", "", "󾇋", ["bug"]],"1f41c": ["🐜", "", "󾇚", ["ant"]],"1f41d": ["🐝", "", "󾇡", ["bee", "honeybee"]],"1f41e": ["🐞", "", "󾇢", ["beetle"]],"1f41f": ["🐟", "", "󾆽", ["fish"]],"1f420": ["🐠", "", "󾇉", ["tropical_fish"]],"1f421": ["🐡", "", "󾇙", ["blowfish"]],"1f422": ["🐢", "", "󾇜", ["turtle"]],"1f423": ["🐣", "", "󾇝", ["hatching_chick"]],"1f424": ["🐤", "", "󾆺", ["baby_chick"]],"1f425": ["🐥", "", "󾆻", ["hatched_chick"]],"1f426": ["🐦", "", "󾇈", ["bird"]],"1f427": ["🐧", "", "󾆼", ["penguin"]],"1f428": ["🐨", "", "󾇍", ["koala"]],"1f429": ["🐩", "", "󾇘", ["poodle"]],"1f42a": ["🐪", "", "", ["dromedary_camel"]],"1f42b": ["🐫", "", "󾇖", ["camel"]],"1f42c": ["🐬", "", "󾇇", ["dolphin", "flipper"]],"1f42d": ["🐭", "", "󾇂", ["mouse"]],"1f42e": ["🐮", "", "󾇑", ["cow"]],"1f42f": ["🐯", "", "󾇀", ["tiger"]],"1f430": ["🐰", "", "󾇒", ["rabbit"]],"1f431": ["🐱", "", "󾆸", ["cat"]],"1f432": ["🐲", "", "󾇞", ["dragon_face"]],"1f433": ["🐳", "", "󾇃", ["whale"]],"1f434": ["🐴", "", "󾆾", ["horse"]],"1f435": ["🐵", "", "󾇄", ["monkey_face"]],"1f436": ["🐶", "", "󾆷", ["dog"]],"1f437": ["🐷", "", "󾆿", ["pig"]],"1f438": ["🐸", "", "󾇗", ["frog"]],"1f439": ["🐹", "", "󾇊", ["hamster"]],"1f43a": ["🐺", "", "󾇐", ["wolf"]],"1f43b": ["🐻", "", "󾇁", ["bear"]],"1f43c": ["🐼", "", "󾇟", ["panda_face"]],"1f43d": ["🐽", "", "󾇠", ["pig_nose"]],"1f43e": ["🐾", "", "󾇛", ["feet", "paw_prints"]],"1f440": ["👀", "", "󾆐", ["eyes"]],"1f442": ["👂", "", "󾆑", ["ear"]],"1f443": ["👃", "", "󾆒", ["nose"]],"1f444": ["👄", "", "󾆓", ["lips"]],"1f445": ["👅", "", "󾆔", ["tongue"]],"1f446": ["👆", "", "󾮙", ["point_up_2"]],"1f447": ["👇", "", "󾮚", ["point_down"]],"1f448": ["👈", "", "󾮛", ["point_left"]],"1f449": ["👉", "", "󾮜", ["point_right"]],"1f44a": ["👊", "", "󾮖", ["facepunch", "punch"]],"1f44b": ["👋", "", "󾮝", ["wave"]],"1f44c": ["👌", "", "󾮟", ["ok_hand"]],"1f44d": ["👍", "", "󾮗", ["+1", "thumbsup"]],"1f44e": ["👎", "", "󾮠", ["-1", "thumbsdown"]],"1f44f": ["👏", "", "󾮞", ["clap"]],"1f450": ["👐", "", "󾮡", ["open_hands"]],"1f451": ["👑", "", "󾓑", ["crown"]],"1f452": ["👒", "", "󾓔", ["womans_hat"]],"1f453": ["👓", "", "󾓎", ["eyeglasses"]],"1f454": ["👔", "", "󾓓", ["necktie"]],"1f455": ["👕", "", "󾓏", ["shirt", "tshirt"]],"1f456": ["👖", "", "󾓐", ["jeans"]],"1f457": ["👗", "", "󾓕", ["dress"]],"1f458": ["👘", "", "󾓙", ["kimono"]],"1f459": ["👙", "", "󾓚", ["bikini"]],"1f45a": ["👚", "", "󾓛", ["womans_clothes"]],"1f45b": ["👛", "", "󾓜", ["purse"]],"1f45c": ["👜", "", "󾓰", ["handbag"]],"1f45d": ["👝", "", "󾓱", ["pouch"]],"1f45e": ["👞", "", "󾓌", ["mans_shoe", "shoe"]],"1f45f": ["👟", "", "󾓍", ["athletic_shoe"]],"1f460": ["👠", "", "󾓖", ["high_heel"]],"1f461": ["👡", "", "󾓗", ["sandal"]],"1f462": ["👢", "", "󾓘", ["boot"]],"1f463": ["👣", "", "󾕓", ["footprints"]],"1f464": ["👤", "", "󾆚", ["bust_in_silhouette"]],"1f465": ["👥", "", "", ["busts_in_silhouette"]],"1f466": ["👦", "", "󾆛", ["boy"]],"1f467": ["👧", "", "󾆜", ["girl"]],"1f468": ["👨", "", "󾆝", ["man"]],"1f469": ["👩", "", "󾆞", ["woman"]],"1f46a": ["👪", "", "󾆟", ["family"]],"1f46b": ["👫", "", "󾆠", ["couple"]],"1f46c": ["👬", "", "", ["two_men_holding_hands"]],"1f46d": ["👭", "", "", ["two_women_holding_hands"]],"1f46e": ["👮", "", "󾆡", ["cop"]],"1f46f": ["👯", "", "󾆢", ["dancers"]],"1f470": ["👰", "", "󾆣", ["bride_with_veil"]],"1f471": ["👱", "", "󾆤", ["person_with_blond_hair"]],"1f472": ["👲", "", "󾆥", ["man_with_gua_pi_mao"]],"1f473": ["👳", "", "󾆦", ["man_with_turban"]],"1f474": ["👴", "", "󾆧", ["older_man"]],"1f475": ["👵", "", "󾆨", ["older_woman"]],"1f476": ["👶", "", "󾆩", ["baby"]],"1f477": ["👷", "", "󾆪", ["construction_worker"]],"1f478": ["👸", "", "󾆫", ["princess"]],"1f479": ["👹", "", "󾆬", ["japanese_ogre"]],"1f47a": ["👺", "", "󾆭", ["japanese_goblin"]],"1f47b": ["👻", "", "󾆮", ["ghost"]],"1f47c": ["👼", "", "󾆯", ["angel"]],"1f47d": ["👽", "", "󾆰", ["alien"]],"1f47e": ["👾", "", "󾆱", ["space_invader"]],"1f47f": ["👿", "", "󾆲", ["imp"]],"1f480": ["💀", "", "󾆳", ["skull"]],"1f481": ["💁", "", "󾆴", ["information_desk_person"]],"1f482": ["💂", "", "󾆵", ["guardsman"]],"1f483": ["💃", "", "󾆶", ["dancer"]],"1f484": ["💄", "", "󾆕", ["lipstick"]],"1f485": ["💅", "", "󾆖", ["nail_care"]],"1f486": ["💆", "", "󾆗", ["massage"]],"1f487": ["💇", "", "󾆘", ["haircut"]],"1f488": ["💈", "", "󾆙", ["barber"]],"1f489": ["💉", "", "󾔉", ["syringe"]],"1f48a": ["💊", "", "󾔊", ["pill"]],"1f48b": ["💋", "", "󾠣", ["kiss"]],"1f48c": ["💌", "", "󾠤", ["love_letter"]],"1f48d": ["💍", "", "󾠥", ["ring"]],"1f48e": ["💎", "", "󾠦", ["gem"]],"1f48f": ["💏", "", "󾠧", ["couplekiss"]],"1f490": ["💐", "", "󾠨", ["bouquet"]],"1f491": ["💑", "", "󾠩", ["couple_with_heart"]],"1f492": ["💒", "", "󾠪", ["wedding"]],"1f493": ["💓", "", "󾬍", ["heartbeat"]],"1f494": ["💔", "", "󾬎", ["broken_heart"], "</3"],"1f495": ["💕", "", "󾬏", ["two_hearts"]],"1f496": ["💖", "", "󾬐", ["sparkling_heart"]],"1f497": ["💗", "", "󾬑", ["heartpulse"]],"1f498": ["💘", "", "󾬒", ["cupid"]],"1f499": ["💙", "", "󾬓", ["blue_heart"], "<3"],"1f49a": ["💚", "", "󾬔", ["green_heart"], "<3"],"1f49b": ["💛", "", "󾬕", ["yellow_heart"], "<3"],"1f49c": ["💜", "", "󾬖", ["purple_heart"], "<3"],"1f49d": ["💝", "", "󾬗", ["gift_heart"]],"1f49e": ["💞", "", "󾬘", ["revolving_hearts"]],"1f49f": ["💟", "", "󾬙", ["heart_decoration"]],"1f4a0": ["💠", "", "󾭕", ["diamond_shape_with_a_dot_inside"]],"1f4a1": ["💡", "", "󾭖", ["bulb"]],"1f4a2": ["💢", "", "󾭗", ["anger"]],"1f4a3": ["💣", "", "󾭘", ["bomb"]],"1f4a4": ["💤", "", "󾭙", ["zzz"]],"1f4a5": ["💥", "", "󾭚", ["boom", "collision"]],"1f4a6": ["💦", "", "󾭛", ["sweat_drops"]],"1f4a7": ["💧", "", "󾭜", ["droplet"]],"1f4a8": ["💨", "", "󾭝", ["dash"]],"1f4a9": ["💩", "", "󾓴", ["hankey", "poop", "shit"]],"1f4aa": ["💪", "", "󾭞", ["muscle"]],"1f4ab": ["💫", "", "󾭟", ["dizzy"]],"1f4ac": ["💬", "", "󾔲", ["speech_balloon"]],"1f4ad": ["💭", "", "", ["thought_balloon"]],"1f4ae": ["💮", "", "󾭺", ["white_flower"]],"1f4af": ["💯", "", "󾭻", ["100"]],"1f4b0": ["💰", "", "󾓝", ["moneybag"]],"1f4b1": ["💱", "", "󾓞", ["currency_exchange"]],"1f4b2": ["💲", "", "󾓠", ["heavy_dollar_sign"]],"1f4b3": ["💳", "", "󾓡", ["credit_card"]],"1f4b4": ["💴", "", "󾓢", ["yen"]],"1f4b5": ["💵", "", "󾓣", ["dollar"]],"1f4b6": ["💶", "", "", ["euro"]],"1f4b7": ["💷", "", "", ["pound"]],"1f4b8": ["💸", "", "󾓤", ["money_with_wings"]],"1f4b9": ["💹", "", "󾓟", ["chart"]],"1f4ba": ["💺", "", "󾔷", ["seat"]],"1f4bb": ["💻", "", "󾔸", ["computer"]],"1f4bc": ["💼", "", "󾔻", ["briefcase"]],"1f4bd": ["💽", "", "󾔼", ["minidisc"]],"1f4be": ["💾", "", "󾔽", ["floppy_disk"]],"1f4bf": ["💿", "", "󾠝", ["cd"]],"1f4c0": ["📀", "", "󾠞", ["dvd"]],"1f4c1": ["📁", "", "󾕃", ["file_folder"]],"1f4c2": ["📂", "", "󾕄", ["open_file_folder"]],"1f4c3": ["📃", "", "󾕀", ["page_with_curl"]],"1f4c4": ["📄", "", "󾕁", ["page_facing_up"]],"1f4c5": ["📅", "", "󾕂", ["date"]],"1f4c6": ["📆", "", "󾕉", ["calendar"]],"1f4c7": ["📇", "", "󾕍", ["card_index"]],"1f4c8": ["📈", "", "󾕋", ["chart_with_upwards_trend"]],"1f4c9": ["📉", "", "󾕌", ["chart_with_downwards_trend"]],"1f4ca": ["📊", "", "󾕊", ["bar_chart"]],"1f4cb": ["📋", "", "󾕈", ["clipboard"]],"1f4cc": ["📌", "", "󾕎", ["pushpin"]],"1f4cd": ["📍", "", "󾔿", ["round_pushpin"]],"1f4ce": ["📎", "", "󾔺", ["paperclip"]],"1f4cf": ["📏", "", "󾕐", ["straight_ruler"]],"1f4d0": ["📐", "", "󾕑", ["triangular_ruler"]],"1f4d1": ["📑", "", "󾕒", ["bookmark_tabs"]],"1f4d2": ["📒", "", "󾕏", ["ledger"]],"1f4d3": ["📓", "", "󾕅", ["notebook"]],"1f4d4": ["📔", "", "󾕇", ["notebook_with_decorative_cover"]],"1f4d5": ["📕", "", "󾔂", ["closed_book"]],"1f4d6": ["📖", "", "󾕆", ["book", "open_book"]],"1f4d7": ["📗", "", "󾓿", ["green_book"]],"1f4d8": ["📘", "", "󾔀", ["blue_book"]],"1f4d9": ["📙", "", "󾔁", ["orange_book"]],"1f4da": ["📚", "", "󾔃", ["books"]],"1f4db": ["📛", "", "󾔄", ["name_badge"]],"1f4dc": ["📜", "", "󾓽", ["scroll"]],"1f4dd": ["📝", "", "󾔧", ["memo", "pencil"]],"1f4de": ["📞", "", "󾔤", ["telephone_receiver"]],"1f4df": ["📟", "", "󾔢", ["pager"]],"1f4e0": ["📠", "", "󾔨", ["fax"]],"1f4e1": ["📡", "", "󾔱", ["satellite"]],"1f4e2": ["📢", "", "󾔯", ["loudspeaker"]],"1f4e3": ["📣", "", "󾔰", ["mega"]],"1f4e4": ["📤", "", "󾔳", ["outbox_tray"]],"1f4e5": ["📥", "", "󾔴", ["inbox_tray"]],"1f4e6": ["📦", "", "󾔵", ["package"]],"1f4e7": ["📧", "", "󾮒", ["e-mail"]],"1f4e8": ["📨", "", "󾔪", ["incoming_envelope"]],"1f4e9": ["📩", "", "󾔫", ["envelope_with_arrow"]],"1f4ea": ["📪", "", "󾔬", ["mailbox_closed"]],"1f4eb": ["📫", "", "󾔭", ["mailbox"]],"1f4ec": ["📬", "", "", ["mailbox_with_mail"]],"1f4ed": ["📭", "", "", ["mailbox_with_no_mail"]],"1f4ee": ["📮", "", "󾔮", ["postbox"]],"1f4ef": ["📯", "", "", ["postal_horn"]],"1f4f0": ["📰", "", "󾠢", ["newspaper"]],"1f4f1": ["📱", "", "󾔥", ["iphone"]],"1f4f2": ["📲", "", "󾔦", ["calling"]],"1f4f3": ["📳", "", "󾠹", ["vibration_mode"]],"1f4f4": ["📴", "", "󾠺", ["mobile_phone_off"]],"1f4f5": ["📵", "", "", ["no_mobile_phones"]],"1f4f6": ["📶", "", "󾠸", ["signal_strength"]],"1f4f7": ["📷", "", "󾓯", ["camera"]],"1f4f9": ["📹", "", "󾓹", ["video_camera"]],"1f4fa": ["📺", "", "󾠜", ["tv"]],"1f4fb": ["📻", "", "󾠟", ["radio"]],"1f4fc": ["📼", "", "󾠠", ["vhs"]],"1f500": ["🔀", "", "", ["twisted_rightwards_arrows"]],"1f501": ["🔁", "", "", ["repeat"]],"1f502": ["🔂", "", "", ["repeat_one"]],"1f503": ["🔃", "", "󾮑", ["arrows_clockwise"]],"1f504": ["🔄", "", "", ["arrows_counterclockwise"]],"1f505": ["🔅", "", "", ["low_brightness"]],"1f506": ["🔆", "", "", ["high_brightness"]],"1f507": ["🔇", "", "", ["mute"]],"1f509": ["🔉", "", "", ["sound"]],"1f50a": ["🔊", "", "󾠡", ["speaker"]],"1f50b": ["🔋", "", "󾓼", ["battery"]],"1f50c": ["🔌", "", "󾓾", ["electric_plug"]],"1f50d": ["🔍", "", "󾮅", ["mag"]],"1f50e": ["🔎", "", "󾮍", ["mag_right"]],"1f50f": ["🔏", "", "󾮐", ["lock_with_ink_pen"]],"1f510": ["🔐", "", "󾮊", ["closed_lock_with_key"]],"1f511": ["🔑", "", "󾮂", ["key"]],"1f512": ["🔒", "", "󾮆", ["lock"]],"1f513": ["🔓", "", "󾮇", ["unlock"]],"1f514": ["🔔", "", "󾓲", ["bell"]],"1f515": ["🔕", "", "", ["no_bell"]],"1f516": ["🔖", "", "󾮏", ["bookmark"]],"1f517": ["🔗", "", "󾭋", ["link"]],"1f518": ["🔘", "", "󾮌", ["radio_button"]],"1f519": ["🔙", "", "󾮎", ["back"]],"1f51a": ["🔚", "", "󾀚", ["end"]],"1f51b": ["🔛", "", "󾀙", ["on"]],"1f51c": ["🔜", "", "󾀘", ["soon"]],"1f51d": ["🔝", "", "󾭂", ["top"]],"1f51e": ["🔞", "", "󾬥", ["underage"]],"1f51f": ["🔟", "", "󾠻", ["keycap_ten"]],"1f520": ["🔠", "", "󾭼", ["capital_abcd"]],"1f521": ["🔡", "", "󾭽", ["abcd"]],"1f522": ["🔢", "", "󾭾", ["1234"]],"1f523": ["🔣", "", "󾭿", ["symbols"]],"1f524": ["🔤", "", "󾮀", ["abc"]],"1f525": ["🔥", "", "󾓶", ["fire"]],"1f526": ["🔦", "", "󾓻", ["flashlight"]],"1f527": ["🔧", "", "󾓉", ["wrench"]],"1f528": ["🔨", "", "󾓊", ["hammer"]],"1f529": ["🔩", "", "󾓋", ["nut_and_bolt"]],"1f52a": ["🔪", "", "󾓺", ["hocho"]],"1f52b": ["🔫", "", "󾓵", ["gun"]],"1f52c": ["🔬", "", "", ["microscope"]],"1f52d": ["🔭", "", "", ["telescope"]],"1f52e": ["🔮", "", "󾓷", ["crystal_ball"]],"1f52f": ["🔯", "", "󾓸", ["six_pointed_star"]],"1f530": ["🔰", "", "󾁄", ["beginner"]],"1f531": ["🔱", "", "󾓒", ["trident"]],"1f532": ["🔲", "", "󾭤", ["black_square_button"]],"1f533": ["🔳", "", "󾭧", ["white_square_button"]],"1f534": ["🔴", "", "󾭣", ["red_circle"]],"1f535": ["🔵", "", "󾭤", ["large_blue_circle"]],"1f536": ["🔶", "", "󾭳", ["large_orange_diamond"]],"1f537": ["🔷", "", "󾭴", ["large_blue_diamond"]],"1f538": ["🔸", "", "󾭵", ["small_orange_diamond"]],"1f539": ["🔹", "", "󾭶", ["small_blue_diamond"]],"1f53a": ["🔺", "", "󾭸", ["small_red_triangle"]],"1f53b": ["🔻", "", "󾭹", ["small_red_triangle_down"]],"1f53c": ["🔼", "", "󾬁", ["arrow_up_small"]],"1f53d": ["🔽", "", "󾬀", ["arrow_down_small"]],"1f550": ["🕐", "", "󾀞", ["clock1"]],"1f551": ["🕑", "", "󾀟", ["clock2"]],"1f552": ["🕒", "", "󾀠", ["clock3"]],"1f553": ["🕓", "", "󾀡", ["clock4"]],"1f554": ["🕔", "", "󾀢", ["clock5"]],"1f555": ["🕕", "", "󾀣", ["clock6"]],"1f556": ["🕖", "", "󾀤", ["clock7"]],"1f557": ["🕗", "", "󾀥", ["clock8"]],"1f558": ["🕘", "", "󾀦", ["clock9"]],"1f559": ["🕙", "", "󾀧", ["clock10"]],"1f55a": ["🕚", "", "󾀨", ["clock11"]],"1f55b": ["🕛", "", "󾀩", ["clock12"]],"1f55c": ["🕜", "", "", ["clock130"]],"1f55d": ["🕝", "", "", ["clock230"]],"1f55e": ["🕞", "", "", ["clock330"]],"1f55f": ["🕟", "", "", ["clock430"]],"1f560": ["🕠", "", "", ["clock530"]],"1f561": ["🕡", "", "", ["clock630"]],"1f562": ["🕢", "", "", ["clock730"]],"1f563": ["🕣", "", "", ["clock830"]],"1f564": ["🕤", "", "", ["clock930"]],"1f565": ["🕥", "", "", ["clock1030"]],"1f566": ["🕦", "", "", ["clock1130"]],"1f567": ["🕧", "", "", ["clock1230"]],"1f5fb": ["🗻", "", "󾓃", ["mount_fuji"]],"1f5fc": ["🗼", "", "󾓄", ["tokyo_tower"]],"1f5fd": ["🗽", "", "󾓆", ["statue_of_liberty"]],"1f5fe": ["🗾", "", "󾓇", ["japan"]],"1f5ff": ["🗿", "", "󾓈", ["moyai"]],"1f600": ["😀", "", "", ["grinning"]],"1f601": ["😁", "", "󾌳", ["grin"]],"1f602": ["😂", "", "󾌴", ["joy"]],"1f603": ["😃", "", "󾌰", ["smiley"], ":)"],"1f604": ["😄", "", "󾌸", ["smile"], ":)"],"1f605": ["😅", "", "󾌱", ["sweat_smile"]],"1f606": ["😆", "", "󾌲", ["laughing", "satisfied"]],"1f607": ["😇", "", "", ["innocent"]],"1f608": ["😈", "", "", ["smiling_imp"]],"1f609": ["😉", "", "󾍇", ["wink"], ";)"],"1f60a": ["😊", "", "󾌵", ["blush"]],"1f60b": ["😋", "", "󾌫", ["yum"]],"1f60c": ["😌", "", "󾌾", ["relieved"]],"1f60d": ["😍", "", "󾌧", ["heart_eyes"]],"1f60e": ["😎", "", "", ["sunglasses"]],"1f60f": ["😏", "", "󾍃", ["smirk"]],"1f610": ["😐", "", "", ["neutral_face"]],"1f611": ["😑", "", "", ["expressionless"]],"1f612": ["😒", "", "󾌦", ["unamused"]],"1f613": ["😓", "", "󾍄", ["sweat"]],"1f614": ["😔", "", "󾍀", ["pensive"]],"1f615": ["😕", "", "", ["confused"]],"1f616": ["😖", "", "󾌿", ["confounded"]],"1f617": ["😗", "", "", ["kissing"]],"1f618": ["😘", "", "󾌬", ["kissing_heart"]],"1f619": ["😙", "", "", ["kissing_smiling_eyes"]],"1f61a": ["😚", "", "󾌭", ["kissing_closed_eyes"]],"1f61b": ["😛", "", "", ["stuck_out_tongue"]],"1f61c": ["😜", "", "󾌩", ["stuck_out_tongue_winking_eye"], ";p"],"1f61d": ["😝", "", "󾌪", ["stuck_out_tongue_closed_eyes"]],"1f61e": ["😞", "", "󾌣", ["disappointed"], ":("],"1f61f": ["😟", "", "", ["worried"]],"1f620": ["😠", "", "󾌠", ["angry"]],"1f621": ["😡", "", "󾌽", ["rage"]],"1f622": ["😢", "", "󾌹", ["cry"], ":'("],"1f623": ["😣", "", "󾌼", ["persevere"]],"1f624": ["😤", "", "󾌨", ["triumph"]],"1f625": ["😥", "", "󾍅", ["disappointed_relieved"]],"1f626": ["😦", "", "", ["frowning"]],"1f627": ["😧", "", "", ["anguished"]],"1f628": ["😨", "", "󾌻", ["fearful"]],"1f629": ["😩", "", "󾌡", ["weary"]],"1f62a": ["😪", "", "󾍂", ["sleepy"]],"1f62b": ["😫", "", "󾍆", ["tired_face"]],"1f62c": ["😬", "", "", ["grimacing"]],"1f62d": ["😭", "", "󾌺", ["sob"], ":'("],"1f62e": ["😮", "", "", ["open_mouth"]],"1f62f": ["😯", "", "", ["hushed"]],"1f630": ["😰", "", "󾌥", ["cold_sweat"]],"1f631": ["😱", "", "󾍁", ["scream"]],"1f632": ["😲", "", "󾌢", ["astonished"]],"1f633": ["😳", "", "󾌯", ["flushed"]],"1f634": ["😴", "", "", ["sleeping"]],"1f635": ["😵", "", "󾌤", ["dizzy_face"]],"1f636": ["😶", "", "", ["no_mouth"]],"1f637": ["😷", "", "󾌮", ["mask"]],"1f638": ["😸", "", "󾍉", ["smile_cat"]],"1f639": ["😹", "", "󾍊", ["joy_cat"]],"1f63a": ["😺", "", "󾍈", ["smiley_cat"]],"1f63b": ["😻", "", "󾍌", ["heart_eyes_cat"]],"1f63c": ["😼", "", "󾍏", ["smirk_cat"]],"1f63d": ["😽", "", "󾍋", ["kissing_cat"]],"1f63e": ["😾", "", "󾍎", ["pouting_cat"]],"1f63f": ["😿", "", "󾍍", ["crying_cat_face"]],"1f640": ["🙀", "", "󾍐", ["scream_cat"]],"1f645": ["🙅", "", "󾍑", ["no_good"]],"1f646": ["🙆", "", "󾍒", ["ok_woman"]],"1f647": ["🙇", "", "󾍓", ["bow"]],"1f648": ["🙈", "", "󾍔", ["see_no_evil"]],"1f649": ["🙉", "", "󾍖", ["hear_no_evil"]],"1f64a": ["🙊", "", "󾍕", ["speak_no_evil"]],"1f64b": ["🙋", "", "󾍗", ["raising_hand"]],"1f64c": ["🙌", "", "󾍘", ["raised_hands"]],"1f64d": ["🙍", "", "󾍙", ["person_frowning"]],"1f64e": ["🙎", "", "󾍚", ["person_with_pouting_face"]],"1f64f": ["🙏", "", "󾍛", ["pray"]],"1f680": ["🚀", "", "󾟭", ["rocket"]],"1f681": ["🚁", "", "", ["helicopter"]],"1f682": ["🚂", "", "", ["steam_locomotive"]],"1f683": ["🚃", "", "󾟟", ["railway_car", "train"]],"1f684": ["🚄", "", "󾟢", ["bullettrain_side"]],"1f685": ["🚅", "", "󾟣", ["bullettrain_front"]],"1f686": ["🚆", "", "", ["train2"]],"1f687": ["🚇", "", "󾟠", ["metro"]],"1f688": ["🚈", "", "", ["light_rail"]],"1f689": ["🚉", "", "󾟬", ["station"]],"1f68a": ["🚊", "", "", ["tram"]],"1f68c": ["🚌", "", "󾟦", ["bus"]],"1f68d": ["🚍", "", "", ["oncoming_bus"]],"1f68e": ["🚎", "", "", ["trolleybus"]],"1f68f": ["🚏", "", "󾟧", ["busstop"]],"1f690": ["🚐", "", "", ["minibus"]],"1f691": ["🚑", "", "󾟳", ["ambulance"]],"1f692": ["🚒", "", "󾟲", ["fire_engine"]],"1f693": ["🚓", "", "󾟴", ["police_car"]],"1f694": ["🚔", "", "", ["oncoming_police_car"]],"1f695": ["🚕", "", "󾟯", ["taxi"]],"1f696": ["🚖", "", "", ["oncoming_taxi"]],"1f697": ["🚗", "", "󾟤", ["car", "red_car"]],"1f698": ["🚘", "", "", ["oncoming_automobile"]],"1f699": ["🚙", "", "󾟥", ["blue_car"]],"1f69a": ["🚚", "", "󾟱", ["truck"]],"1f69b": ["🚛", "", "", ["articulated_lorry"]],"1f69c": ["🚜", "", "", ["tractor"]],"1f69d": ["🚝", "", "", ["monorail"]],"1f69e": ["🚞", "", "", ["mountain_railway"]],"1f69f": ["🚟", "", "", ["suspension_railway"]],"1f6a0": ["🚠", "", "", ["mountain_cableway"]],"1f6a1": ["🚡", "", "", ["aerial_tramway"]],"1f6a2": ["🚢", "", "󾟨", ["ship"]],"1f6a3": ["🚣", "", "", ["rowboat"]],"1f6a4": ["🚤", "", "󾟮", ["speedboat"]],"1f6a5": ["🚥", "", "󾟷", ["traffic_light"]],"1f6a6": ["🚦", "", "", ["vertical_traffic_light"]],"1f6a7": ["🚧", "", "󾟸", ["construction"]],"1f6a8": ["🚨", "", "󾟹", ["rotating_light"]],"1f6a9": ["🚩", "", "󾬢", ["triangular_flag_on_post"]],"1f6aa": ["🚪", "", "󾓳", ["door"]],"1f6ab": ["🚫", "", "󾭈", ["no_entry_sign"]],"1f6ac": ["🚬", "", "󾬞", ["smoking"]],"1f6ad": ["🚭", "", "󾬟", ["no_smoking"]],"1f6ae": ["🚮", "", "", ["put_litter_in_its_place"]],"1f6af": ["🚯", "", "", ["do_not_litter"]],"1f6b0": ["🚰", "", "", ["potable_water"]],"1f6b1": ["🚱", "", "", ["non-potable_water"]],"1f6b2": ["🚲", "", "󾟫", ["bike"]],"1f6b3": ["🚳", "", "", ["no_bicycles"]],"1f6b4": ["🚴", "", "", ["bicyclist"]],"1f6b5": ["🚵", "", "", ["mountain_bicyclist"]],"1f6b6": ["🚶", "", "󾟰", ["walking"]],"1f6b7": ["🚷", "", "", ["no_pedestrians"]],"1f6b8": ["🚸", "", "", ["children_crossing"]],"1f6b9": ["🚹", "", "󾬳", ["mens"]],"1f6ba": ["🚺", "", "󾬴", ["womens"]],"1f6bb": ["🚻", "", "󾔆", ["restroom"]],"1f6bc": ["🚼", "", "󾬵", ["baby_symbol"]],"1f6bd": ["🚽", "", "󾔇", ["toilet"]],"1f6be": ["🚾", "", "󾔈", ["wc"]],"1f6bf": ["🚿", "", "", ["shower"]],"1f6c0": ["🛀", "", "󾔅", ["bath"]],"1f6c1": ["🛁", "", "", ["bathtub"]],"1f6c2": ["🛂", "", "", ["passport_control"]],"1f6c3": ["🛃", "", "", ["customs"]],"1f6c4": ["🛄", "", "", ["baggage_claim"]],"1f6c5": ["🛅", "", "", ["left_luggage"]],"0023": ["#⃣", "", "󾠬", ["hash"]],"0030": ["0⃣", "", "󾠷", ["zero"]],"0031": ["1⃣", "", "󾠮", ["one"]],"0032": ["2⃣", "", "󾠯", ["two"]],"0033": ["3⃣", "", "󾠰", ["three"]],"0034": ["4⃣", "", "󾠱", ["four"]],"0035": ["5⃣", "", "󾠲", ["five"]],"0036": ["6⃣", "", "󾠳", ["six"]],"0037": ["7⃣", "", "󾠴", ["seven"]],"0038": ["8⃣", "", "󾠵", ["eight"]],"0039": ["9⃣", "", "󾠶", ["nine"]],"1f1e8-1f1f3": ["🇨🇳", "", "󾓭", ["cn"]],"1f1e9-1f1ea": ["🇩🇪", "", "󾓨", ["de"]],"1f1ea-1f1f8": ["🇪🇸", "", "󾓫", ["es"]],"1f1eb-1f1f7": ["🇫🇷", "", "󾓧", ["fr"]],"1f1ec-1f1e7": ["🇬🇧", "", "󾓪", ["gb", "uk"]],"1f1ee-1f1f9": ["🇮🇹", "", "󾓩", ["it"]],"1f1ef-1f1f5": ["🇯🇵", "", "󾓥", ["jp"]],"1f1f0-1f1f7": ["🇰🇷", "", "󾓮", ["kr"]],"1f1f7-1f1fa": ["🇷🇺", "", "󾓬", ["ru"]],"1f1fa-1f1f8": ["🇺🇸", "", "󾓦", ["us"]]},
	
	korChar = {lead: ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'],vowel: ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'],tail: ['ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']},
	
	jpnChar = {read:{'あ':'a','ぁ':'a','か':'ka','が':'ga','さ':'sa','ざ':'za','た':'ta','だ':'da',/***/'な':'na','は':'ha','ば':'ba','ぱ':'pa','ま':'ma','や':'ya','ら':'ra','わ':'wa','ゎ':'lwa',/***/'い':'i','ぃ':'i','き':'ki','ま':'ma','ぎ':'gi','し':'si','じ':'zi','ち':'ti','ぢ':'di',/***/'に':'ni','ひ':'hi','び':'bi','ぴ':'pi','み':'mi','り':'ri',/***/'う':'u','ぅ':'u','く':'ku','ぐ':'gu','す':'su','ず':'zu','つ':'tu','づ':'du',/***/'ぬ':'nu','ふ':'hu','ぶ':'bu','ぷ':'pu','む':'mu','ゆ':'yu','ゅ':'lyu','る':'ru',/***/'え':'e','ぇ':'e','け':'ke','げ':'ge','せ':'se','ぜ':'ze','て':'te','で':'de',/***/'ね':'ne','へ':'he','べ':'be','ぺ':'pe','め':'me','れ':'re',/***/'お':'o','ぉ':'o','こ':'ko','ご':'go','そ':'so','ぞ':'zo','と':'to','ど':'do',/***/'の':'no','ほ':'ho','ぼ':'bo','ぽ':'po','も':'mo','よ':'yo','ょ':'lyo','ろ':'ro','を':'wo',/***/'ア':'a','ァ':'a','カ':'ka','ガ':'ga','サ':'sa','ザ':'za','タ':'ta','ダ':'da',/***/'ナ':'na','ハ':'ha','バ':'ba','パ':'pa','マ':'ma','ヤ':'ya','ャ':'lya','ラ':'ra','ワ':'wa','ヮ':'lwa','ン':'n',/***/'イ':'i','ィ':'i','キ':'ki','ギ':'gi','シ':'si','ジ':'zi','チ':'ti','ヂ':'di',/***/'ニ':'ni','ヒ':'hi','ビ':'bi','ピ':'pi','ミ':'mi','リ':'ri',/***/'ウ':'u','ゥ':'u','ク':'ku','グ':'gu','ス':'su','ズ':'zu','ツ':'tu','ヅ':'du',/***/'ヌ':'nu','フ':'hu','ブ':'bu','プ':'pu','ム':'mu','ユ':'yu','ュ':'lyu','ル':'ru',/***/'エ':'e','ェ':'e','ケ':'ke','ゲ':'ge','セ':'se','ゼ':'ze','テ':'te','デ':'de',/***/'ネ':'ne','ヘ':'he','ベ':'be','ペ':'pe','メ':'me','レ':'re',/***/'オ':'o','ォ':'o','コ':'ko','ゴ':'go','ソ':'so','ゾ':'zo','ト':'to','ド':'do',/***/'ノ':'no','ホ':'ho','ボ':'bo','ポ':'po','モ':'mo','ヨ':'yo','ョ':'lyo','ロ':'ro','ヲ':'wo'},conversation:{'Hello':'初めまして。','Nicemeetyou':'どうぞよろしく。','Howareyou':'どうお過ごしですか。'},number:{'いち':1,'に':2,'さん':3,'よん':4,'ご':5,'ろく':6,'なな':7,'はち':8,'きゅう':9}},
	
	indoChar = {read : {'अ':'a', 'इ':'i', 'उ':'u', 'ऋ':'ṛ', 'ऌ':'ḷ', /***/'प':'pa', 'पि':'pi', 'पु':'pu', 'पृ':'pṛ', 'पॢ':'pḷ',/***/'आ':'ā', 'ई':'ī', 'ऊ':'ū', 'ॠ':'ṝ', 'ॡ':'ḹ', /***/'पा':'pā', 'पी':'pī', 'पू':'pū', 'पॄ':'pṝ', 'पॣ':'pḹ',/***/'क':'ka', 'च':'ca', 'ट':'ṭa', 'त':'ta', 'प':'pa', /***/'ख':'kha', 'छ':'cha', 'ठ':'ṭha', 'थ':'tha', 'फ':'pha',/***/'ग':'ga', 'ज':'ja', 'ड':'ḍa', 'द':'da', 'ब':'ba', /***/'घ':'gha', 'झ':'jha', 'ढ':'ḍha', 'ध':'dha', 'भ':'bha',/***/'ङ':'ṅa', 'ञ':'ña', 'ण':'ṇa', 'न':'na', 'म':'ma'}},
	
	rusianChar = {read : {'А':'a', 'a':'a', 'Б':'b', 'б':'b', 'В':'v', 'в':'v', 'Г':'g', 'г':'g', 'Д':'d', 'д':'d', 'Е':'je', 'е':'je', 'Ё':'jo', 'ё':'jo', 'Ж':'ʒ', 'ж':'ʒ', 'З':'z', 'з':'z',	'И':'i', 'и':'i', 'Й':'j', 'й':'j', 'К':'k', 'к':'k', 'Л':'l', 'л':'l', 'М':'m', 'м':'m', 'Н':'n', 'н':'n', 'О':'o', 'о':'o', 'П':'p', 'п':'p', 'Р':'r', 'р':'r', 'С':'s', 'Т':'t', 'т':'t', 'У':'u', 'у':'u', 'Ф':'f', 'ф':'f', 'Х':'x', 'х':'x', 'Ц':'ts', 'ц':'ts', 'Ч':'tʃ', 'ч':'tʃ', 'Ш':'ʃ', 'ш':'ʃ', 'Щ':'ts', 'щ':'ʃtʃ', 'ц':'ʃtʃ', 'Ъ':'-', 'ъ':'-', 'Ы':'ɨ', 'ы':'ɨ', 'Ь':'ʲ', 'ь':'ʲ', 'Э':'ɛ', 'э':'ɛ', 'Ю':'ju', 'ю':'ju', 'Я':'ja', 'я':'ja'},conversation : {'Hello':'Здравствуйте','Nice meet you':'Рад встрече','How are you?':'Как дела?'}},
	
	utf8Str = {'utf8bom':'\xEF\xBB\xBF', 'non-breaking space':'\x0B\xC2\xA0'},
	
	unicodeString = {' ': '&nbsp;', '\u0009': 'tab', '\u000B': 'left tab', ' ': 'blank'},
	
	locationCode = {'Afghanistan': 'AF', 'Aland Islands': 'AX', 'Albania': 'AL', 'Algeria': 'DZ', 'American Samoa': 'AS', 'Andorra': 'AD', 'Angola': 'AO', 'Anguilla': 'AI', 'Antarctica': 'AQ', 'Antigua And Barbuda': 'AG', 'Argentina': 'AR', 'Armenia': 'AM', 'Aruba': 'AW', 'Australia': 'AU', 'Austria': 'AT', 'Azerbaijan': 'AZ', 'Bahamas': 'BS', 'Bahrain': 'BH', 'Bangladesh': 'BD', 'Barbados': 'BB', 'Belarus': 'BY', 'Belgium': 'BE', 'Belize': 'BZ', 'Benin': 'BJ', 'Bermuda': 'BM', 'Bhutan': 'BT', 'Bolivia': 'BO', 'Bosnia And Herzegovina': 'BA', 'Botswana': 'BW', 'Bouvet Island': 'BV', 'Brazil': 'BR', 'British Indian Ocean Territory': 'IO', 'Brunei Darussalam': 'BN', 'Bulgaria': 'BG', 'Burkina Faso': 'BF', 'Burundi': 'BI', 'Cambodia': 'KH', 'Cameroon': 'CM', 'Canada': 'CA', 'Cape Verde': 'CV', 'Cayman Islands': 'KY', 'Central African Republic': 'CF', 'Chad': 'TD', 'Chile': 'CL', 'China': 'CN', 'Christmas Island': 'CX', 'Cocos (Keeling) Islands': 'CC', 'Colombia': 'CO', 'Comoros': 'KM', 'Congo': 'CG', 'Congo, Democratic Republic': 'CD', 'Cook Islands': 'CK', 'Costa Rica': 'CR', "Cote D'Ivoire": 'CI', 'Croatia': 'HR', 'Cuba': 'CU', 'Cyprus': 'CY', 'Czech Republic': 'CZ', 'Denmark': 'DK', 'Djibouti': 'DJ', 'Dominica': 'DM', 'Dominican Republic': 'DO', 'Ecuador': 'EC', 'Egypt': 'EG', 'El Salvador': 'SV', 'Equatorial Guinea': 'GQ', 'Eritrea': 'ER', 'Estonia': 'EE', 'Ethiopia': 'ET', 'Falkland Islands': 'FK', 'Faroe Islands': 'FO', 'Fiji': 'FJ', 'Finland': 'FI', 'France': 'FR', 'French Guiana': 'GF', 'French Polynesia': 'PF', 'French Southern Territories': 'TF', 'Gabon': 'GA', 'Gambia': 'GM', 'Georgia': 'GE', 'Germany': 'DE', 'Ghana': 'GH', 'Gibraltar': 'GI', 'Greece': 'GR', 'Greenland': 'GL', 'Grenada': 'GD', 'Guadeloupe': 'GP', 'Guam': 'GU', 'Guatemala': 'GT', 'Guernsey': 'GG', 'Guinea': 'GN', 'Guinea-Bissau': 'GW', 'Guyana': 'GY', 'Haiti': 'HT', 'Heard Island & Mcdonald Islands': 'HM', 'Holy See (Vatican City State)': 'VA', 'Honduras': 'HN', 'Hong Kong': 'HK', 'Hungary': 'HU', 'Iceland': 'IS', 'India': 'IN', 'Indonesia': 'ID', 'Iran, Islamic Republic Of': 'IR', 'Iraq': 'IQ', 'Ireland': 'IE', 'Isle Of Man': 'IM', 'Israel': 'IL', 'Italy': 'IT', 'Jamaica': 'JM', 'Japan': 'JP', 'Jersey': 'JE', 'Jordan': 'JO', 'Kazakhstan': 'KZ', 'Kenya': 'KE', 'Kiribati': 'KI', 'Republic of Korea': 'KR', 'South Korea': 'KR', "Democratic People's Republic of Korea": 'KP', 'North Korea': 'KP', 'Kuwait': 'KW', 'Kyrgyzstan': 'KG', "Lao People's Democratic Republic": 'LA', 'Latvia': 'LV', 'Lebanon': 'LB', 'Lesotho': 'LS', 'Liberia': 'LR', 'Libyan Arab Jamahiriya': 'LY', 'Liechtenstein': 'LI', 'Lithuania': 'LT', 'Luxembourg': 'LU', 'Macao': 'MO', 'Macedonia': 'MK', 'Madagascar': 'MG', 'Malawi': 'MW', 'Malaysia': 'MY', 'Maldives': 'MV', 'Mali': 'ML', 'Malta': 'MT', 'Marshall Islands': 'MH', 'Martinique': 'MQ', 'Mauritania': 'MR', 'Mauritius': 'MU', 'Mayotte': 'YT', 'Mexico': 'MX', 'Micronesia, Federated States Of': 'FM', 'Moldova': 'MD', 'Monaco': 'MC', 'Mongolia': 'MN', 'Montenegro': 'ME', 'Montserrat': 'MS', 'Morocco': 'MA', 'Mozambique': 'MZ', 'Myanmar': 'MM', 'Namibia': 'NA', 'Nauru': 'NR', 'Nepal': 'NP', 'Netherlands': 'NL', 'Netherlands Antilles': 'AN', 'New Caledonia': 'NC', 'New Zealand': 'NZ', 'Nicaragua': 'NI', 'Niger': 'NE', 'Nigeria': 'NG', 'Niue': 'NU', 'Norfolk Island': 'NF', 'Northern Mariana Islands': 'MP', 'Norway': 'NO', 'Oman': 'OM', 'Pakistan': 'PK', 'Palau': 'PW', 'Palestinian Territory, Occupied': 'PS', 'Panama': 'PA', 'Papua New Guinea': 'PG', 'Paraguay': 'PY', 'Peru': 'PE', 'Philippines': 'PH', 'Pitcairn': 'PN', 'Poland': 'PL', 'Portugal': 'PT', 'Puerto Rico': 'PR', 'Qatar': 'QA', 'Reunion': 'RE', 'Romania': 'RO', 'Russian Federation': 'RU', 'Rwanda': 'RW', 'Saint Barthelemy': 'BL', 'Saint Helena': 'SH', 'Saint Kitts And Nevis': 'KN', 'Saint Lucia': 'LC', 'Saint Martin': 'MF', 'Saint Pierre And Miquelon': 'PM', 'Saint Vincent And Grenadines': 'VC', 'Samoa': 'WS', 'San Marino': 'SM', 'Sao Tome And Principe': 'ST', 'Saudi Arabia': 'SA', 'Senegal': 'SN', 'Serbia': 'RS', 'Seychelles': 'SC', 'Sierra Leone': 'SL', 'Singapore': 'SG', 'Slovakia': 'SK', 'Slovenia': 'SI', 'Solomon Islands': 'SB', 'Somalia': 'SO', 'South Africa': 'ZA', 'South Georgia And Sandwich Isl.': 'GS', 'Spain': 'ES', 'Sri Lanka': 'LK', 'Sudan': 'SD', 'Suriname': 'SR', 'Svalbard And Jan Mayen': 'SJ', 'Swaziland': 'SZ', 'Sweden': 'SE', 'Switzerland': 'CH', 'Syrian Arab Republic': 'SY', 'Taiwan': 'TW', 'Tajikistan': 'TJ', 'Tanzania': 'TZ', 'Thailand': 'TH', 'Timor-Leste': 'TL', 'Togo': 'TG', 'Tokelau': 'TK', 'Tonga': 'TO', 'Trinidad And Tobago': 'TT', 'Tunisia': 'TN', 'Turkey': 'TR', 'Turkmenistan': 'TM', 'Turks And Caicos Islands': 'TC', 'Tuvalu': 'TV', 'Uganda': 'UG', 'Ukraine': 'UA', 'United Arab Emirates': 'AE', 'United Kingdom': 'GB', 'United States': 'US', 'United States Outlying Islands': 'UM', 'Uruguay': 'UY', 'Uzbekistan': 'UZ', 'Vanuatu': 'VU', 'Venezuela': 'VE', 'Vietnam': 'VN', 'Virgin Islands, British': 'VG', 'Virgin Islands, U.S.': 'VI', 'Wallis And Futuna': 'WF', 'Western Sahara': 'EH', 'Yemen': 'YE', 'Zambia': 'ZM', 'Zimbabwe': 'ZW'},
	
	asciiEncodeUTF8 = {' ': '%20', '!': '%21', '"': '%22', '#': '%23', '$': '%24', '%': '%25', '&': '%26', "'": '%27', '(': '%28', ')': '%29', '*': '%2A', '+': '%2B', ',': '%2C', '-': '%2D', '.': '%2E', '/': '%2F', '0': '%30', '1': '%31', '2': '%32', '3': '%33', '4': '%34', '5': '%35', '6': '%36', '7': '%37', '8': '%38', '9': '%39', ':': '%3A', ';': '%3B', '<': '%3C', '=': '%3D', '>': '%3C', '?': '%3F', '@': '%40', 'A': '%41', 'B': '%42', 'C': '%43', 'D': '%44', 'E': '%45', 'F': '%46', 'G': '%47', 'H': '%48', 'I': '%49', 'J': '%4A', 'K': '%4B', 'L': '%4C', 'M': '%4D', 'N': '%4E', 'O': '%4F', 'P': '%50', 'Q': '%51', 'R': '%52', 'S': '%53', 'T': '%54', 'U': '%55', 'V': '%56', 'W': '%57', 'X': '%58', 'Y': '%59', 'Z': '%5A', '[': '%5B', '\\': '%5C', ']': '%5D', '^': '%5E', '_': '%5F', '``': '%60', 'a': '%61', 'b': '%62', 'c': '%63', 'd': '%64', 'e': '%65', 'f': '%66', 'g': '%67', 'h': '%68', 'i': '%69', 'j': '%6A', 'k': '%6B', 'l': '%6C', 'm': '%6D', 'n': '%6E', 'o': '%6F', 'p': '%70', 'q': '%71', 'r': '%72', 's': '%73', 't': '%74', 'u': '%75', 'v': '%76', 'w': '%77', 'x': '%78', 'y': '%79', 'z': '%7A', '{': '%7B', '|': '%7C', '}': '%7D', '~': '%7E', '  ': '%7F', '`': '%E2%82%AC', '': '%81', '‚': '%E2%80%9A', 'ƒ': '%C6%92', '„': '%E2%80%9E', '…': '%E2%80%A6', '†': '%E2%80%A0', '‡': '%E2%80%A1', 'ˆ': '%CB%86'},
	
	musicGenre = ["Blues", "Classic Rock", "Country", "Dance", "Disco", "Funk", "Grunge", "Hip-Hop", "Jazz", "Metal", "New Age", "Oldies", "Other", "Pop", "R&B", "Rap", "Reggae", "Rock", "Techno", "Industrial", "Alternative", "Ska", "Death Metal", "Pranks", "Soundtrack", "Euro-Techno", "Ambient", "Trip-Hop", "Vocal", "Jazz+Funk", "Fusion", "Trance", "Classical", "Instrumental", "Acid", "House", "Game", "Sound Clip", "Gospel", "Noise", "AlternRock", "Bass", "Soul", "Punk", "Space", "Meditative", "Instrumental Pop", "Instrumental Rock", "Ethnic", "Gothic", "Darkwave", "Techno-Industrial", "Electronic", "Pop-Folk", "Eurodance", "Dream", "Southern Rock", "Comedy", "Cult", "Gangsta Rap", "Top 40", "Christian Rap", "Pop / Funk", "Jungle", "Native American", "Cabaret", "New Wave", "Psychedelic", "Rave", "Showtunes", "Trailer", "Lo-Fi", "Tribal", "Acid Punk", "Acid Jazz", "Polka", "Retro", "Musical", "Rock & Roll", "Hard Rock", "Folk", "Folk-Rock", "National Folk", "Swing", "Fast  Fusion", "Bebob", "Latin", "Revival", "Celtic", "Bluegrass", "Avantgarde", "Gothic Rock", "Progressive Rock", "Psychedelic Rock", "Symphonic Rock", "Slow Rock", "Big Band", "Chorus", "Easy Listening", "Acoustic", "Humour", "Speech", "Chanson", "Opera", "Chamber Music", "Sonata", "Symphony", "Booty Bass", "Primus", "Porn Groove", "Satire", "Slow Jam", "Club", "Tango", "Samba", "Folklore", "Ballad", "Power Ballad", "Rhythmic Soul", "Freestyle", "Duet", "Punk Rock", "Drum Solo", "A Cappella", "Euro-House", "Dance Hall", "Goa", "Drum & Bass", "Club-House", "Hardcore", "Terror", "Indie", "BritPop", "Negerpunk", "Polsk Punk", "Beat", "Christian Gangsta Rap", "Heavy Metal", "Black Metal", "Crossover", "Contemporary Christian", "Christian Rock", "Merengue", "Salsa", "Thrash Metal", "Anime", "JPop", "Synthpop", "Rock/Pop"],
	
	fileHeaderBytes = {'B16': {'pos': 0,'bytes': '50434F2D'},'BCIF': {'pos': 0,'bytes': '42434946'},'BFLI': {'pos': 0,'bytes': 'FF3B62'},'BGA': {'pos': 0,'bytes': '4241'},'BIF': {'pos': 0,'bytes': '424946'},'BMP': {'pos': 0,'bytes': '424D'},'BMPv1': {'pos': 14,'bytes': '424D'},'BMPv2': {'pos': 14,'bytes': '40000000'},'BMPv2a': {'pos': 14,'bytes': '34000000'},'BMPv2o': {'pos': 14,'bytes': '10000000'},'BMPv3': {'pos': 14,'bytes': '28000000'},'BMPv3a': {'pos': 14,'bytes': '38000000'},'BMPv4': {'pos': 14,'bytes': '6C000000'},'BMPv5': {'pos': 14,'bytes': '7C000000'},'GIF': {'pos': 0,'bytes': '474946'},'GIF87a': {'pos': 0,'bytes': '474946383761'},'GIF89a': {'pos': 0,'bytes': '474946383961'},'GIFAnimate': {'pos': 0,'bytes': '474946383961'}},
	
	numberCValue = {0: 0x000000, 1: 0x000001, 2: 0x000002, 3: 0x000003, 4: 0x000004, 5: 0x000005, 6: 0x000006, 7: 0x000007, 8: 0x000008, 9: 0x000009, 10: 0x00000A, 11: 0x00000B, 12: 0x00000C, 13: 0x00000D, 14: 0x00000E, 15: 0x00000F, 16: 0x000010, 17: 0x000011, 18: 0x000012, 127: 0x00007F, 256: 0x100, 2047: 0x0007FF, 65535: 0x00FFFF, 65536: 0x10000, 16777216: 0x1000000},
	
	asciiHex = {/* Varicode */'': 0x01,  '': 0x02,  '': 0x03,  '': 0x04,  '': 0x05,  '': 0x06,  '': 0x07,  '': 0x08,  '': 0x0b,  '': 0x0c,  '': 0x0e,  '': 0x0f,  '': 0x10,  '': 0x11,  '': 0x15,  '': 0x16,  '': 0x17,  '': 0x18,  '': 0x19,  '': 0x0a,  '': 0x0b,  '': 0x0c,  '': 0x1d,  '': 0x1e,  '': 0x1f,  '!': 0x21,  '"': 0x22,  '#': 0x23,  '$': 0x24,  '%': 0x25,  '&': 0x26,  "'": 0x27,  '(': 0x28,  ')': 0x29,  '*': 0x2a,  '+': 0x2b,  ',': 0x2c,  '-': 0x2d,  '.': 0x2e,  '/': 0x2f,  0: 0x30,  1: 0x31,  2: 0x32,  3: 0x33,  4: 0x34,  5: 0x35,  6: 0x36,  7: 0x37,  8: 0x38,  9: 0x39,  ':': 0x3a,  ';': 0x3b,  '<': 0x3c,  '=': 0x3d,  '>': 0x3e,  '?': 0x3f,  '@': 0x40,  'A': 0x41,  'B': 0x42,  'C': 0x43,  'D': 0x44,  'E': 0x45,  'F': 0x46,  'G': 0x47,  'H': 0x48,  'I': 0x49,  'J': 0x4a,  'K': 0x4b,  'L': 0x4c,  'M': 0x4d,  'N': 0x4e,  'O': 0x4f,  'P': 0x50,  'Q': 0x51,  'R': 0x52,  'S': 0x53,  'T': 0x54,  'U': 0x55,  'V': 0x56,  'W': 0x57,  'X': 0x58,  'Y': 0x59,  'Z': 0x5a,  '[': 0x5b,  '\\': 0x5c,  ']': 0x5d,  '^': 0x5e,  '_': 0x5f,  '`': 0x60,  'a': 0x61,  'b': 0x62,  'c': 0x63,  'd': 0x64,  'e': 0x65,  'f': 0x66,  'g': 0x67,  'h': 0x68,  'i': 0x69,  'j': 0x6a,  'k': 0x6b,  'l': 0x6c,  'm': 0x6d,  'n': 0x6e,  'o': 0x6f,  'p': 0x70,  'q': 0x71,  'r': 0x72,  's': 0x73,  't': 0x74,  'u': 0x75,  'v': 0x76,  'w': 0x77,  'x': 0x78,  'y': 0x79,  'z': 0x7a,  '{': 0x7b,  '': 0x7f, /*SREG &(Atmega128)*/  '€': 0x80, /*SREG |(Atmega128)*/  '': 0x81,  '‚': 0x82,  'ƒ': 0x83,  '„': 0x84,  '…': 0x85,  '†': 0x86,  '‡': 0x87,  'ˆ': 0x88,  '‰': 0x89,  'Š': 0x8a,  '‹': 0x8b,  'Œ': 0x8c,  '': 0x8d,  'Ž': 0x8e,  '': 0x8f,  '': 0x90,  '‘': 0x91,  '’': 0x92,  '“': 0x93,  '”': 0x94,  '•': 0x95,  '–': 0x96,  '—': 0x97,  '˜': 0x98,  '™': 0x99,  'š': 0x9a,  '›': 0x9b,  'œ': 0x9c,  '': 0x9d,  'ž': 0x9e,  'Ÿ': 0x9f,  ' ': 0xa0,  '¡': 0xa1,  '¢': 0xa2,  '£': 0xa3,  '¤': 0xa4,  '¥': 0xa5,  '¦': 0xa6,  '§': 0xa7,  '¨': 0xa8,  '©': 0xa9,  'ª': 0xaa,  '«': 0xab,  '¬': 0xac,  '­': 0xad,  '®': 0xae,  '¯': 0xaf,  '°': 0xb0,  '±': 0xb1,  '²': 0xb2,  '³': 0xb3,  '´': 0xb4,  'µ': 0xb5,  '¶': 0xb6,  '·': 0xb7,  '¸': 0xb8,  '¹': 0xb9,  'º': 0xba,  '»': 0xbb,  '¼': 0xbc,  '½': 0xbd,  '¾': 0xbe,  '¿': 0xbf,  'À': 0xc0,  'Á': 0xc1,  'Â': 0xc2,  'Ã': 0xc3,  'Ä': 0xc4,  'Å': 0xc5,  'Æ': 0xc6,  'Ç': 0xc7,  'È': 0xc8,  'É': 0xc9,  'Ê': 0xca,  'Ë': 0xcb,  'Ì': 0xcc,  'Í': 0xcd,  'Î': 0xce,  'Ï': 0xcf,  'Ð': 0xd0,  'Ñ': 0xd1,  'Ò': 0xd2,  'Ó': 0xd3,  'Ô': 0xd4,  'Õ': 0xd5,  'Ö': 0xd6,  '×': 0xd7,  'Ø': 0xd8,  'Ù': 0xd9,  'Ú': 0xda,  'Û': 0xdb,  'Ü': 0xdc,  'Ý': 0xdd,  'Þ': 0xde,  'ß': 0xdf,  'à': 0xe0,  'á': 0xe1,  'â': 0xe2,  'ã': 0xe3,  'ä': 0xe4,  'å': 0xe5,  'æ': 0xe6,  'ç': 0xe7,  'è': 0xe8,  'é': 0xe9,  'ê': 0xea,  'ë': 0xeb,  'ì': 0xec,  'í': 0xed,  'î': 0xee,  'ï': 0xef,  'ð': 0xf0,  'ñ': 0xf1,  'ò': 0xf2,  'ó': 0xf3,  'ô': 0xf4,  'õ': 0xf5,  'ö': 0xf6,  '÷': 0xf7,  'ø': 0xf8,  'ù': 0xf9,  'ú': 0xfa,  'û': 0xfb,  'ü': 0xfc,  'ý': 0xfd,  'þ': 0xfe,  'ÿ': 0xff},
	
	webColorCodes = {boogerbuster:"DDE26A", blizzardblue:"ACE5EE", cadetblue:"5F9EA0", celadon:"ACE1AF", azure:"007FFF", aztecgold:"C39953", avocado:"568203", aureolin:"FDEE00", auburn:"A52A2A", atomictangerine:"FF9966", asparagus:"87A96B", ashgrey:"B2BEB5", arylideyellow:"E9D66B",artichoke:"8F9779", arsenic:"3B444B", armygreen:"4B5320", arcticlime:"D0FF14", apricot:"FBCEB1", applegreen:"8DB600", antiquewhite:"FAEBD7", antiqueruby:"841B2D", antiquefuchsia:"915C83", antiquebronze:"665D1E", antiquebrass:"CD9575", antiflashwhite:"F2F3F4", androidgreen:"A4C639",amethyst:"9966CC", americanrose:"FF033E", amber:"FFBF00", amazon:"3B7A57", amaranthred:"D3212D", amaranthpurple:"AB274F",amaranthpink:"F19CBB",amaranthdeeppurple:"AB274F",amaranth:"E52B50", almond:"EFDECD", alloyorange:"C46210", alizarincrimson:"E32636", alienarmpit:"84DE02", aliceblue:"F0F8FF", alabamacrimson:"AF002A",airsuperiorityblue:"72A0C1", airforceblue:"5D8AA8", africanviolet:"B284BE", aeroblue:"C9FFE5",aero:"7CB9E8", absolutezero:"0048BA",acidgreen:"B0BF1A", lemonchiffon: "FFFACD", rebeccapurple: "663399",aliceblue: "f0f8ff", antiquewhite: "faebd7", aqua: "00ffff", aquamarine: "7fffd4", azure: "f0ffff", beige: "f5f5dc", bisque: "ffe4c4", black: "000000", blanchedalmond: "ffebcd", blue: "0000ff", blueviolet: "8a2be2", brown: "a52a2a", burlywood: "deb887", cadetblue: "5f9ea0", chartreuse: "7fff00", chocolate: "d2691e", coral: "ff7f50", cornflowerblue: "6495ed", cornsilk: "fff8dc", crimson: "dc143c", cyan: "00ffff", darkblue: "00008b", darkcyan: "008b8b", darkgoldenrod: "b8860b", darkgray: "a9a9a9", darkgreen: "006400", darkkhaki: "bdb76b", darkmagenta: "8b008b", darkolivegreen: "556b2f", darkorange: "ff8c00", darkorchid: "9932cc", darkred: "8b0000", darksalmon: "e9967a", darkseagreen: "8fbc8f", darkslateblue: "483d8b", darkslategray: "2f4f4f", darkturquoise: "00ced1", darkviolet: "9400d3", deeppink: "ff1493", deepskyblue: "00bfff", dimgray: "696969", dodgerblue: "1e90ff", firebrick: "b22222", floralwhite: "fffaf0", forestgreen: "228b22", fuchsia: "ff00ff", gainsboro: "dcdcdc", ghostwhite: "f8f8ff", gold: "ffd700", goldenrod: "daa520", gray: "808080", green: "008000", greenyellow: "adff2f", honeydew: "f0fff0", hotpink: "ff69b4", indianred: "cd5c5c", indigo: "4b0082", ivory: "fffff0", khaki: "f0e68c", lavender: "e6e6fa", lavenderblush: "fff0f5", lawngreen: "7cfc00", lemonchiffon: "fffacd", lightblue: "add8e6", lightcoral: "f08080", lightcyan: "e0ffff", lightgoldenrodyellow: "fafad2", lightgrey: "d3d3d3", lightgreen: "90ee90", lightpink: "ffb6c1", lightsalmon: "ffa07a", lightseagreen: "20b2aa", lightskyblue: "87cefa", lightslategray: "778899", lightsteelblue: "b0c4de", lightyellow: "ffffe0", lime: "00ff00", limegreen: "32cd32", linen: "faf0e6", magenta: "ff00ff", maroon: "800000", mediumaquamarine: "66cdaa", mediumblue: "0000cd", mediumorchid: "ba55d3", mediumpurple: "9370d8", mediumseagreen: "3cb371", mediumslateblue: "7b68ee", mediumspringgreen: "00fa9a", mediumturquoise: "48d1cc", mediumvioletred: "c71585", midnightblue: "191970", mintcream: "f5fffa", mistyrose: "ffe4e1", moccasin: "ffe4b5", navajowhite: "ffdead", navy: "000080", oldlace: "fdf5e6", olive: "808000", olivedrab: "6b8e23", orange: "ffa500", orangered: "ff4500", orchid: "da70d6", palegoldenrod: "eee8aa", palegreen: "98fb98", f: "afeeee", palevioletred: "d87093", papayawhip: "ffefd5", peachpuff: "ffdab9", peru: "cd853f", pink: "ffc0cb", plum: "dda0dd", powderblue: "b0e0e6", purple: "800080", red: "ff0000", rosybrown: "bc8f8f", royalblue: "4169e1", saddlebrown: "8b4513", salmon: "fa8072", sandybrown: "f4a460", seagreen: "2e8b57", seashell: "fff5ee", sienna: "a0522d", silver: "c0c0c0", skyblue: "87ceeb", slateblue: "6a5acd", slategray: "708090", snow: "fffafa", springgreen: "00ff7f", steelblue: "4682b4", tan: "d2b48c", teal: "008080", thistle: "d8bfd8", tomato: "ff6347", turquoise: "40e0d0", violet: "ee82ee", wheat: "f5deb3", white: "ffffff", whitesmoke: "f5f5f5", yellow: "ffff00", yellowgreen: "9acd32", transparent: "transparent"},
	
	shiftNums = {"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&", "8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ":", "'": "\"", ",": "<", ".": ">", "/": "?", "\\": "|"},
	
	winsize = {1: "640x400", 2: "960x600", 3: "1024x576", 4: "1024x600", 5: "1024x640", 6: "1280x720", 7: "1280x800", 8: "1366x768", 9: "1920x1080"},
	
	allowFileFormat = ["jpg", "jpeg", "gif", "bmp", "png", "jpe", "cur", "svg", "svgz", "tif", "tiff", "ico", "wma", "wav", "mp3", "aac", "ra", "ram", "mp2", "ogg", "aif", "mpega", "amr", "mid", "midi", "m4a", "wmv", "rmvb", "mpeg4", "mpeg2", "flv", "avi", "3gp", "mpga", "qt", "rm", "wmz", "wmd", "wvx", "wmx", "wm", "swf", "mpg", "mp4", "mkv", "mpeg", "mov", "asf", "zip", "rar", "7z", "flac"],
	
	movieFormat = ["moov", "udta", "mdia", "meta", "ilst", "stbl", "minf", "moof", "traf", "trak", "stsd"],
	
	fFormat = {0: "IMPLICIT", 1: "UTF8", 2: "UTF16", 3: "SJIS", 6: "HTML", 7: "XML", 8: "UUID", 9: "ISRC", 10: "MI3P", 12: "GIF", 13: "JPEG", 14: "PNG", 15: "URL", 16: "DURATION", 17: "DATETIME", 18: "GENRED", 21: "INTEGER", 24: "RIAAPA", 25: "UPC", 27: "BMP", 255: "UNDEFINED"},
	
	//Server Response Code
	ResponseCode = (globalLang == 'ko') ? 
			{/* Conditional response */100: '요청 진행', 101: '프로토콜이 변경됨', 102: '진행중',/* Success */200: '전송이 정상적으로 완료됨', 201: '문서가 생성됨', 202: '허용됨', 203: '믿을 수 없는 정보', 204: '전송할 내용이 없음', 205: '문서 리셋', 206: '부분 요청(Range) 컨텐츠', 207: '다중 상태', 208: '이미 보고되었음', 266: 'IM Used',/* Redirection Success */300: '지나치게 많은 선택', 301: '영구적으로 이동됨', 302: '임시적으로 이동됨', 303: '기타보기', 304: '변경되지 않음', 305: '프록시 사용', 307: '임시적인 리다이렉트', 308: '영구적인 리다이렉트',/* Request Error */400: '올바르지 않는 요청 또는 문법적으로 오류가 있는 요청', 401: '권한이 인증되지 않음', 402: '예약된 요청', 403: '권한이 제한됨', 404: '문서를 찾을 수 없음', 405: '메소드가 허용되지 않음', 406: '허용되지 않음', 407: '프록시 인증 필요', 408: '요청시간이 지남', 409: '올바르지 않는 파일', 410: '영구적으로 사용할 수 없음', 411: 'Content-Length 헤더 필요', 412: '사전 조건 성립 실패', 413: '요청 개체가 허용범위보다 지나치게 큼', 414: '요청 주소가 지나치게 김', 415: '지원되지 않는 미디어 타입 또는 알려지지 않은 미디어 타입', 416: '요청된 범위(Range)가 충족되지 않음', 417: '요청 헤더(Expect)의 값이 올바르지 않음', 418: '지나치게 짧은 body 엔티티\/stout', 420: '차분한 마음가짐',422: '처리 할 수 없는 엔터티', 423: '잠금상태', 424: '의존성 실패', 425: '정렬되지 않은 컬렉션', 426: '업그레이드가 필요함', 428: '사전 조건 필요', 429: '너무 많은 요청수', 431: '요청 헤더 필드가 지나치게 큼', 444: 'Nginx의 응답이 없음', 449: '다시 시도하시오', 450: '자녀 보호에 의거하거 차단됨', 451: '법적으로 허용되지 않음', 494: '요청 헤더가 지나치게 큼', 495: 'Cert 오류', 496: 'Cert가 존재하지 않음', 497: 'HTTP에서 HTTPS로 프로토콜이 변경됨', 499: '클라이언트에서 요청을 닫음',/* Server Error */500: '내부 서버 오류 또는 서버 내의 문법적 오류 또는 유지보수중인 사이트에 요청중입니다', 501: '구현되지 않았거나 지원되지 않음', 502: '서버의 자원이 과부하되었음', 503: '유지보수 또는 자원의 과부하로 인하여 서비스를 사용할 수 없음', 504: '최대 요청 범위 시간대로 요청을 했으나 응답을 받을 수 없음', 505: '지원되지 않는 HTTP 버전', 506: 'Variant Also Negotiates', 507: '내부 스토리지가 불충분함', 509: '요청 가능한 대역폭을 벗어났습니다', 510: '확장되지 않음', 511: '네트워크 인증 필요', 598: '네트워크 읽기 시간초과 오류', 599: '네트워크 읽기 시간초과 오류'} : 
		(globalLang == 'jp') ? 
			{/* Conditional response */100: 'リクエスト進行', 101: 'プロトコルが変更されました', 102: '進行中です',/* Success */200: '転送が正常に完了しました', 201: 'ドキュメントが生成されました', 202: '許可された', 203: '信じられない情報です', 204: '送信内容がありません', 205: '文書リセット', 206: 'リクエストの一部（Range）コンテンツ', 207: '複数の状態', 208: '既に報告されて', 266: 'IM Used',/* Redirection Success */300: '過度に多くの選択', 301: '永久に移動されました', 302: '一時的に移動されました', 303: 'その他の表示', 304: '変更されていません', 305: 'プロキシを使用', 307: '一時的なリダイレクト', 308: '恒久的なリダイレクト',/* Request Error */400: '正しくない要求または文法的にエラーがあるリクエスト', 401: '権限が認証されていない', 402: 'スケジュールされたリクエスト', 403: '権限が制限', 404: '文書が見つかりません', 405: 'メソッドが許可されていない', 406: '許可されていない', 407: '프록시 인증 필요', 408: '요청시간이 지남', 409: '正しくないファイル', 410: '恒久的に使用することができません', 411: 'Content-Lengthヘッダが必要', 412: '前提条件成立失敗', 413: '要求オブジェクトが許容範囲よりも過度に大きい', 414: 'リクエストアドレスが過度に金', 415: 'サポートされていないメディアタイプまたは未知のメディアタイプ', 416: '要求された範囲（Range）が満たされていない', 417: 'リクエストヘッダ（Expect）の値が正しくない', 418: '短すぎるbodyエンティティ\/stout', 420: '落ち着いた心構え',422: '処理できないエンティティ', 423: 'ロック状態', 424: '依存性の失敗', 425: 'ソートされていないコレクション', 426: 'アップグレードが必要', 428: '前提条件が必要', 429: 'あまりにも多くのリクエストができ', 431: 'リクエストヘッダフィールドが過度に大きい', 444: 'Nginxの応答がありません', 449: 'やり直して下さい', 450: '子供の保護に基づきたりブロック', 451: '法的に許可されていない', 494: 'リクエストヘッダが過度に大きい', 495: 'Certエラー', 496: 'Certが存在しない', 497: 'HTTPからHTTPSにプロトコルが変更された', 499: 'クライアントからの要求を閉じ',/* Server Error */500: '内部サーバーエラーまたはサーバー内の文法エラーやメンテナンス中のサイトにリクエストしています', 501: '実装されていないか、サポートされない', 502: 'サーバーのリソースが過負荷されました', 503: 'メンテナンスや資源の過負荷によりサービスを利用することができません', 504: '最大要求の範囲の時間帯に要求をしたが、応答を受信できない', 505: 'サポートされていないHTTPのバージョン', 506: 'Variant Also Negotiates', 507: '内部ストレージが不十分さ', 509: 'リクエスト可能な帯域幅を外', 510: '拡張されません', 511: 'ネットワーク認証が必要', 598: 'ネットワークの読み取りタイムアウトエラー', 599: 'ネットワークの読み取りタイムアウトエラー'
	} : {
		
	},
	
	cardType = ["visa","mastercard","amex","jcb","unionpay","rupay","discover","dinersclub"],
	
	//File Resouce
	unicodeHeader = 0xfeff, //Little endian
	bomStr = '﻿',
	
	regSubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	regSubmittable = /^(?:input|select|textarea|keygen)/i;
	//from jQuery
	booleanAtributes = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
	//regEx Resource
	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",// 
	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	regIdentifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + regIdentifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + regIdentifier + "))|)" + whitespace +
		"*\\]",
	pseudos = ":(" + regIdentifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",
	matchExpr = {
		"ID": new RegExp( "^#(" + regIdentifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + regIdentifier + ")" ),
		"TAG": new RegExp( "^(" + regIdentifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleanAtributes + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},
	regInputs = /^(?:input|select|textarea|button)$/i,
	regHeader = /^h\d$/i,
	regNative = /^[^{]+\{\s*\[native \w/,
	regQuickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	regSibling = /[+~]/,
	regEscape = /'|\\/g,
	regJapanese = /([ぁ-んァ-ヶー一-龠])/,
	regJapan = /^[\p{Katakana}\p{Hiragana}\p{Han}]+$/,
	regKanji = /[一-龠]$/,
	regHiragana = /^([ぁ-ん]+)$/,
	regKatakana = /^([ァ-ヶー]+)$/,
	regHalfKana = /^([ｧ-ﾝﾞﾟ]+)$/,
	regHiraganaKatakana = /^([ァ-ヶーぁ-ん]+)$/,
	regFArrtype = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array]$/,
	regURLParmas = /([^=&?]+)=([^&#]*)/g,
	regRewriteParams = /^\/(.+)\/([A-Za-z0-9]*)$/,
	regWhiteSpace = /^\s*$/,
	regEmail = /^[^"'@]+@[._a-zA-Z0-9-]+\.[a-zA-Z]+$/,
	regUrl = /^(http\:\/\/)*[.a-zA-Z0-9-]+\.[a-zA-Z]+$/,
	regWords = /\w+/g,
	regNum = /^[0-9]+$/,
	regAlpha = /^[a-zA-Z]+$/,
	regOnlyKor = /^[\uAC00-\uD7A3]*$/,
	regKor = /[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/,
	regPerfectKor = /[\uAC00-\uD7A3]/,
	regKorEng = /[\uAC00-\uD7A3a-zA-Z]/,
	regRRN = /^\d{6}[1234]\d{6}$/, //Jumin
	regId = /#([\w\-]+)/,
	regIds = /^#([\w\-]+)$/,
	regClasss = /^\.([\w\-]+)$/,
	regcanvas = /canvas/i,
	regimg = /img/i,
	reginput = /input/i,
	regdata = /^data:[^,]+,/,
	monthHanja = "日_月_火_水_木_金_土".split("_"),
	months = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
	monthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
	dayOfWeek = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split("_"),
	dayOfWeekShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split("_"),
	elOptions = booleanAtributes.split("|"),
	
	//System language
	initLang = function () {
		_cWin.lang = [];
		_cWin.lang['favorite'] = ' + D를 누르시면 즐겨찾기가 등록됩니다', _cWin.lang['request'] = '서버에 요청중입니다', _cWin.lang['uncaught'] = '잡히지 않는', _cWin.lang['property'] = '정의하지 않은 객체의', _cWin.lang['undefined'] = '가 정의되지 않았습니다.', _cWin.lang['isnotfunc'] = '는 함수가 아닙니다.', _cWin.lang['cannotreadproperty'] = '속성을 읽을 수 없습니다.', _cWin.lang['typeerror'] = ' 타입에러 : ', _cWin.lang['referror'] = ' 레퍼런스에러 : ', _cWin.lang['notonline'] = '인터넷이 연결되어 있지 않습니다.';},
	
	//keyCode ascii code array
	keydownKeycode = {'backspace': 8, 'tab': 9, 'enter': 13, 'shift': 16, 'ctrl': 17, 'alt': 18, 'pause/break': 19, 'capslock': 20, 'esc': 27, 'pageup': 33, 'pagedown': 34, 'end': 35, 'home': 36, 'arrowleft': 37, 'arrowup': 38, 'arrowright': 39, 'arrowdown': 40, 'insert': 45, 'delete': 46, 0: 48, 1: 49, 2: 50, 3: 51, 4: 52, 5: 53, 6: 54, 7: 55, 8: 56, 9: 57, ';:': 59, '=+': 61, 'a': 65, 'b': 66, 'c': 67, 'd': 68, 'e': 69, 'f1': 112, 'f2': 113, 'f3': 114, 'f4': 115, 'f5': 116, 'f6': 117, 'f7': 118, 'f8': 119, 'f9': 120, 'f10': 121, 'f11': 122, 'f12': 123, 'f': 70, 'g': 71, 'h': 72, 'i': 73, 'j': 74, 'k': 75, 'l': 76, 'm': 77, 'n': 78, 'o': 79, 'p': 80, 'q': 81, 'r': 82, 's': 83, 't': 84, 'u': 85, 'v': 86, 'w': 87, 'x': 88, 'y': 89, 'z': 90, 'windows': 91, 'rightclick': 93, 'numlock': 144, 'scrolllock': 145, '.>': 190, '/?': 1991, 'mycomputer': 182, 'mycalcurator': 183, "'~": 192, ',<': 188, '\|': 220, ']}': 220, '[{': 219, "'": 222, '"': 222};
	
var root = this,
	waitformSkin = "default",
	IteratorsTemp = '',
	$body = $body || $('body'),
	$window = $window || $('window'),
	$document = $document || $('document'),
	$q = $q || $,
	secure_opt = false,
	hexChar = '0123456789ABCDEF',
	EOF = "/* EOF */",
	_root = {}, //sth
	$cache = {}, //cache
	jqueryExist = true,
	
	//Configure
	debug = false,
	messangerType = 'messanger',
	uniquenum = 0,
	waitTimeout = 150,
	gamePadValue = 0.5,
	
	rewriteRegister = {},
	
	//Gamepad
	gamePadControllers = {},
	gamePadDynamicKeys = {},
	
	//init
	$trigDeprecated = {},
	notificationHandler = null,
	pressedGamePadPressedIndex = null,
	indexedDBStorage = null,
	HandlerWebSocket = null,
	HandlerWebDb = null,
	HandlerWebDbQuery = null,
	HandlerWebDbExec = null,
	popup = null,
	StreamAudio = null,
	waitForm = null,
	isAjaxProcessing = false,
	
	deferred = $q.defer,
	n4 = (document.layers) ? true : false,
	e4 = (document.all) ? true : false,
	
	resourcePreloader = [],
	
	//Scripter
	StopLabel = null,
	VarNames = null,
	
	//Prototype
	protoArr = Array.prototype,
	protoObj = Object.prototype,
	toString = protoObj.toString,
	hasOwnProperty = protoObj.hasOwnProperty,
	nativeIsArr = Array.isArray,
	nativeKeys = Object.keys,
	
	requireJS = [],
	requireCSS = [],
	//Callback
	customCallbacks = {},
	//onclick Handler
	onclickCallbacksType = {},
	onclickCallbacksClass = {},
	onclickCallbacksID = {},
	defaults = {
		"none_function": $.noop
	}, //=> Resource
	
	//Browser
	_cDoc = document, //navi cache(must renewal if set)
	_cNavi = navigator, //navi cache(must renewal if set)
	_cWin = window, //win cache(must renewal if set)
	_cUserAgent = _cNavi.userAgent,
	_cBlob = _cWin.Blob,
	_cFile = _cWin.File,
	_cFileReader = _cWin.FileReader,
	_cFormData = _cWin.FormData,
	_cXMLHttpRequest = _cWin.XMLHttpRequest,
	_cdataURLtoBlob = _cWin.dataURLtoBlob,
	_cMath = _cWin.Math,
	_cjQuery = _cWin.jQuery,
	
	//Internet Explorer
	isIE7 = /*@cc_on!@*/ false && (!document.documentMode || document.documentMode === 7),
	isIE = /*@cc_on!@*/ false && document.documentMode <= 8,
	
	//Ajax callback
	ajaxCallbacks = {},
	ajaxFailCallbacks = {},
	appRegister = {},
	resizeHandler = {},
	
	//Process
	pTimer = null, //processTimer
	pAudio = null, //processAudio
	pAdBlocker = null; //processAdBlock
	
initLang();
	