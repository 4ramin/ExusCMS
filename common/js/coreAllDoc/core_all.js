const virtualmode = true,
	globalLang = 'ko';

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

//Create a component
(function($){
	var core = core || function (element) {
		this.element = $(element);
	};
	
	core.version = '1.0';
	
	$.core = {};
	$.fn.core = $.fn.core || function() {
		$.extend(this, $.fn.core);
		return this;
	};
})(jQuery);

//Check it's the correct address
if (virtualmode === false) {
	if (!/([a-z0-9]+)*(\.[a-z]{2,6}|^.[a-z]{2,20})$/.test(location.hostname)) {
		throw Error('invalid host');
	} else if (/([a-z0-9]+)*(\.[a-z]{2,6}|^.[a-z]{2,20})$/.test(location.hostname)) {
		var hostname = RegExp.lastMatch;
		var hosthref = top.location.href || location.href;
	}
}

// Create Missing JSON
typeof JSON != "object" && (JSON = {});

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

window.__defineGetter__('clear', function() {
	return console.clear();
});
  
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

// Error Handler
window.onerror = window.onerror || function (msg, url, line, column, errorObj) {
	$.core.Browser.getConsoleErr(msg, url, line, column, errorObj);
};

//Define a global variables
const html5Elements = ['source', 'track', 'audio', 'video'],
	dataType = "Boolean_Number_String_Function_Array_Date_RegExp_Object_Error".split("_"),
	revEvent = {'mouseenter': "mouseover", 'mouseleave': "mouseout", 'pointerenter': "pointerover", 'pointerleave': "pointerout"},
	domType = ["", "Webkit", "Moz", "ms", "O"],
	doctype = document.doctype || {},
	
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
	ResponseCode = (globalLang == 'ko') ? {/* Conditional response */100: '요청 진행', 101: '프로토콜이 변경됨', 102: '진행중',/* Success */200: '전송이 정상적으로 완료됨', 201: '문서가 생성됨', 202: '허용됨', 203: '믿을 수 없는 정보', 204: '전송할 내용이 없음', 205: '문서 리셋', 206: '부분 요청(Range) 컨텐츠', 207: '다중 상태', 208: '이미 보고되었음', 266: 'IM Used',/* Redirection Success */300: '지나치게 많은 선택', 301: '영구적으로 이동됨', 302: '임시적으로 이동됨', 303: '기타보기', 304: '변경되지 않음', 305: '프록시 사용', 307: '임시적인 리다이렉트', 308: '영구적인 리다이렉트',/* Request Error */400: '올바르지 않는 요청 또는 문법적으로 오류가 있는 요청', 401: '권한이 인증되지 않음', 402: '예약된 요청', 403: '권한이 제한됨', 404: '문서를 찾을 수 없음', 405: '메소드가 허용되지 않음', 406: '허용되지 않음', 407: '프록시 인증 필요', 408: '요청시간이 지남', 409: '올바르지 않는 파일', 410: '영구적으로 사용할 수 없음', 411: 'Content-Length 헤더 필요', 412: '사전 조건 성립 실패', 413: '요청 개체가 허용범위보다 지나치게 큼', 414: '요청 주소가 지나치게 김', 415: '지원되지 않는 미디어 타입 또는 알려지지 않은 미디어 타입', 416: '요청된 범위(Range)가 충족되지 않음', 417: '요청 헤더(Expect)의 값이 올바르지 않음', 418: '지나치게 짧은 body 엔티티\/stout', 420: '차분한 마음가짐',422: '처리 할 수 없는 엔터티', 423: '잠금상태', 424: '의존성 실패', 425: '정렬되지 않은 컬렉션', 426: '업그레이드가 필요함', 428: '사전 조건 필요', 429: '너무 많은 요청수', 431: '요청 헤더 필드가 지나치게 큼', 444: 'Nginx의 응답이 없음', 449: '다시 시도하시오', 450: '자녀 보호에 의거하거 차단됨', 451: '법적으로 허용되지 않음', 494: '요청 헤더가 지나치게 큼', 495: 'Cert 오류', 496: 'Cert가 존재하지 않음', 497: 'HTTP에서 HTTPS로 프로토콜이 변경됨', 499: '클라이언트에서 요청을 닫음',/* Server Error */500: '내부 서버 오류 또는 서버 내의 문법적 오류 또는 유지보수중인 사이트에 요청중입니다', 501: '구현되지 않았거나 지원되지 않음', 502: '서버의 자원이 과부하되었음', 503: '유지보수 또는 자원의 과부하로 인하여 서비스를 사용할 수 없음', 504: '최대 요청 범위 시간대로 요청을 했으나 응답을 받을 수 없음', 505: '지원되지 않는 HTTP 버전', 506: 'Variant Also Negotiates', 507: '내부 스토리지가 불충분함', 509: '요청 가능한 대역폭을 벗어났습니다', 510: '확장되지 않음', 511: '네트워크 인증 필요', 598: '네트워크 읽기 시간초과 오류', 599: '네트워크 읽기 시간초과 오류'} : (globalLang == 'jp') ? {/* Conditional response */100: 'リクエスト進行', 101: 'プロトコルが変更されました', 102: '進行中です',/* Success */200: '転送が正常に完了しました', 201: 'ドキュメントが生成されました', 202: '許可された', 203: '信じられない情報です', 204: '送信内容がありません', 205: '文書リセット', 206: 'リクエストの一部（Range）コンテンツ', 207: '複数の状態', 208: '既に報告されて', 266: 'IM Used',/* Redirection Success */300: '過度に多くの選択', 301: '永久に移動されました', 302: '一時的に移動されました', 303: 'その他の表示', 304: '変更されていません', 305: 'プロキシを使用', 307: '一時的なリダイレクト', 308: '恒久的なリダイレクト',/* Request Error */400: '正しくない要求または文法的にエラーがあるリクエスト', 401: '権限が認証されていない', 402: 'スケジュールされたリクエスト', 403: '権限が制限', 404: '文書が見つかりません', 405: 'メソッドが許可されていない', 406: '許可されていない', 407: '프록시 인증 필요', 408: '요청시간이 지남', 409: '正しくないファイル', 410: '恒久的に使用することができません', 411: 'Content-Lengthヘッダが必要', 412: '前提条件成立失敗', 413: '要求オブジェクトが許容範囲よりも過度に大きい', 414: 'リクエストアドレスが過度に金', 415: 'サポートされていないメディアタイプまたは未知のメディアタイプ', 416: '要求された範囲（Range）が満たされていない', 417: 'リクエストヘッダ（Expect）の値が正しくない', 418: '短すぎるbodyエンティティ\/stout', 420: '落ち着いた心構え',422: '処理できないエンティティ', 423: 'ロック状態', 424: '依存性の失敗', 425: 'ソートされていないコレクション', 426: 'アップグレードが必要', 428: '前提条件が必要', 429: 'あまりにも多くのリクエストができ', 431: 'リクエストヘッダフィールドが過度に大きい', 444: 'Nginxの応答がありません', 449: 'やり直して下さい', 450: '子供の保護に基づきたりブロック', 451: '法的に許可されていない', 494: 'リクエストヘッダが過度に大きい', 495: 'Certエラー', 496: 'Certが存在しない', 497: 'HTTPからHTTPSにプロトコルが変更された', 499: 'クライアントからの要求を閉じ',/* Server Error */500: '内部サーバーエラーまたはサーバー内の文法エラーやメンテナンス中のサイトにリクエストしています', 501: '実装されていないか、サポートされない', 502: 'サーバーのリソースが過負荷されました', 503: 'メンテナンスや資源の過負荷によりサービスを利用することができません', 504: '最大要求の範囲の時間帯に要求をしたが、応答を受信できない', 505: 'サポートされていないHTTPのバージョン', 506: 'Variant Also Negotiates', 507: '内部ストレージが不十分さ', 509: 'リクエスト可能な帯域幅を外', 510: '拡張されません', 511: 'ネットワーク認証が必要', 598: 'ネットワークの読み取りタイムアウトエラー', 599: 'ネットワークの読み取りタイムアウトエラー'
	} : {
		
	},
	
	cardType = ["visa","mastercard","amex","jcb","unionpay","rupay","discover","dinersclub"],
	
	//File Resouce
	unicodeHeader = 0xfeff, //Little endian
	bomStr = '﻿',
	
	//regEx Resource
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
	elOptions = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped'.split("|"),
	
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
	waitTimeout = 1500,
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
	
/**
 * Prototype
 */
 
(function () {

	Number.prototype.clamp = function(min, max) {
		return Math.min(Math.max(this, min), max);
	};
	
	Number.prototype.mod = function(n) {
		return ((this % n) + n) % n;
	};

	Audio.prototype.Restart = function() {
		this.pause();
		this.currentTime = 0;
		this.play();
	};
	
	function EventEmitter() {
		this.listeners = {};
		this._owner = this;
	};
	
	EventEmitter.prototype.on = function (event, callback) {
		this._callbacks[event] = this._callbacks[event] || [];
		this._callbacks[event].push(callback);
	};
	
	EventEmitter.prototype.emit = function (event, data) {
		if ($.core.Validate.isUndefined(this._callbacks[event])) {
			return;
		}
		var callbacks = this._callbacks[event];
		for (var i = 0, len = callbacks.length; i < len; ++i) {
			try {
				callbacks[i].call(null, data);
			} catch (e) {
				console.log(e);
			}
		}
	};
	
	EventEmitter.prototype.off = function (event) {
		delete this._callbacks[event];
	};
	
	protoArr.indexOf = function (e) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == e) return i;
		}
		return -1;
	};
	
	protoArr.forEach = function (fn) {
		for (var i = 0; i < this.length; i++) {
			fn(this[i], i, this);
		}
	};
	
	protoArr.find = function (cond) {
		var code = (cond instanceof Function) ? cond : function (v) {
			return v == cond;
		};
		var arrL = this.length;
		for (var i = 0; i < arrL; i++) {
			if (code(this[i])) {
				return this[i];
			}
		}
		return undefined;
	};
	
	protoArr.isAlready = function (key) {
		var _isAlready = false;
		var _count = this.length;
		var i;
		for (i = 0; i < _count; i++) {
			if (this[i] == key) {
				_isAlready = true;
			}
		}
		return _isAlready;
	};
	
	protoArr.arsort = function (key) {
		this.sort(function (a, b) {
			return (a[key] < b[key]) ? 1 : -1;
		});
	};
	
	protoArr.remove = function (_count) {
		this.splice(_count, 1);
	};
	
	protoArr.unique = function () {
		var e = [];
		var _count = length = this.length;
		var k, h;
		for (k = 0; k < _count; k++) {
			for (h = 0; h < e.length; h++) {
				if (this[k] == e[h]) {
					break
				}
			}
			if (h >= e.length) {
				e[h] = this[k]
			}
		}
		return e;
	};
	
	protoArr.asort = function (key) {
		this.sort(function (a, b) {
			return (a[key] > b[key]) ? 1 : -1;
		});
	};
	
	protoArr.shuffle = function () {
		var l = this.length;
		while (l) {
			var m = Math.floor(Math.random() * l);
			var n = this[--l];
			this[l] = this[m];
			this[m] = n;
		}
	};
	
});
	
(function (global) {

	//replace btoa function
	/**
	 *
	 * Base64 encode / decode
	 * http://www.webtoolkit.info/
	 *
	 **/
	var Base64 = {
		// private property
		_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		// public method for encoding
		encode: function (input) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
			input = Base64._utf8_encode(input);
			while (i < input.length) {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
				output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
			}
			return output;
		},
		// public method for decoding
		decode: function (input) {
			var output = "";
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
			while (i < input.length) {
				enc1 = this._keyStr.indexOf(input.charAt(i++));
				enc2 = this._keyStr.indexOf(input.charAt(i++));
				enc3 = this._keyStr.indexOf(input.charAt(i++));
				enc4 = this._keyStr.indexOf(input.charAt(i++));
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
				output = output + String.fromCharCode(chr1);
				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}
			}
			output = Base64._utf8_decode(output);
			return output;
		},
		// private method for UTF-8 encoding
		_utf8_encode: function (string) {
			string = string.replace(/\r\n/g, "\n");
			var utftext = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				} else if ((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				} else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
			}
			return utftext;
		},
		// private method for UTF-8 decoding
		_utf8_decode: function (utftext) {
			var string = "";
			var i = 0;
			var c = 0,
				c1 = 0,
				c2 = 0,
				c3 = 0;
			while (i < utftext.length) {
				c = utftext.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				} else if ((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i + 1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				} else {
					c2 = utftext.charCodeAt(i + 1);
					c3 = utftext.charCodeAt(i + 2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		}
	};
})(this);

(function($, core) {
	var A = core.dragDrop = {}
	
	A.Resize = {
		/**
		 * Event on Mouse UP
		 *
		 * @param <Event> {event} : event
		 *
		 * @return void
		 **/
		mouseUpEvent: function(event) {
			if (resizeHandler.obj) {
				event.preventDefault();
				document.body.style.cursor = '';
				jQuery(document).off('mouseup', this.mouseUpEvent);
				resizeHandler.obj = null;
			}
		},
		/**
		 * Change Mouse Cursor to Resizable Icon on Resize
		 *
		 * @return void
		 **/
		resizeStart: function () {
			document.body.style.cursor = 'se-resize';
		},
		/**
		 * Event on Resize
		 *
		 * @param <Object>   {obj}         : Object
		 * @param <Clousure> {resizeStart} : Event on Resize Start
		 * @param <Clousure> {resizeDo}    : Event on Resize Do
		 * @param <Clousure> {resizeEnd}   : Event on Resize End
		 *
		 * @return void
		 **/
		resizeEvent: function(obj, resizeStart, resizeDo, resizeEnd){
			obj.draggable = true;
			obj.dragStart = resizeStart;
			obj.drag = resizeDo;
			obj.dragEnd = resizeEnd;
			
			if (!resizeHandler.isDrag) {
				jQuery(document).on('mousemove', this.resizeDragMouseMove);
			}
		},
		/**
		 * Event on Resize Do
		 *
		 * @param <Object> {obj} : Object
		 *
		 * @return void
		 **/
		resizeDo: function(obj) {
			var target = jQuery(obj);
			
			var nx = obj.xDPX;
			var ny = obj.xDPY;
			
			var pallet = $.core.Element.getById(self.target.pallet);
			var palletWidth = $.core.dragDrop.Resize.width(pallet);
			var palletLeft = $.core.Element.getPosition(pallet, 'left');
			
			var objLeft = $.core.Element.getPosition(obj.parentNode, 'left');
			var objTop = $.core.Element.getPosition(obj.parentNode, 'top');
			var fullWidth = palletLeft + palletWidth;
			
			var pWidth = $.core.dragDrop.Resize.width(obj.parentNode);
			
			if (target.hasClass((self.target.target))) {
				if(nx > fullWidth) nx = fullWidth;
				
				var new_width = nx  - objLeft;
				var new_height = ny - objTop;
				
				if(fullWidth < objLeft + new_width) new_width = fullWidth - objLeft;
				
				$.core.dragDrop.Resize.width(new_width, obj.parentNode);
				$.core.dragDrop.Resize.height(new_height, obj.parentNode);
			}

		},
		resizeEnd: function() {
		},
		/**
		 * Event on Drag Mouse Move
		 *
		 * @param <Event> {event} : Event
		 *
		 * @return void
		 **/
		resizeDragMouseMove: function(event) {
			if(resizeHandler.obj) {
				event.preventDefault();

				var obj = resizeHandler.obj;
				var dx = event.pageX - obj.xDPX;
				var dy = event.pageY - obj.xDPY;

				obj.xDPX = event.pageX;
				obj.xDPY = event.pageY;

				if (obj.drag) {
					obj.drag(obj, dx, dy);
				}
			}
		},
		/**
		 * Event on Mouse Down
		 *
		 * @param <Event> {event} : Event
		 *
		 * @return void
		 **/
		mouseDownEvent: function(event) {
			var obj = event.target;

			while(obj && !obj.draggable) {
				obj = this.Element.getParent(obj, true);
			}
			
			if(obj) {
				event.preventDefault();
				obj.xDPX = event.pageX;
				obj.xDPY = event.pageY;
				resizeHandler.obj = obj;
				$(document).on('mouseup', this.mouseUpEvent);
				if (obj.dragStart) {
					obj.dragStart(obj, event.pageX, event.pageY);
				}
			}
		},
		/**
		 * Start Resize Event
		 *
		 * @param <Event>    {event}  : event
		 * @param <Clousure> {target} : target
		 * @param <Clousure> {pallet} : pallet
		 *
		 * @return void;
		 **/
		startEvent: function (event, target, pallet) {
			self.target = {};
			self.target.target = target;
			self.target.pallet = pallet;
			this.vss = event.target;
			if(!this.vss) {
				return;
			}
			
			this.resizeEvent(this.vss, this.resizeStart, this.resizeDo, this.resizeEnd);
			this.mouseDownEvent(event);
			return;
		},
		position: function (size, id, type) {
			elem = $.core.Element.getById(id);
			if(!elem) return;
			
			if (size < 0){
				size = 0;
			}
			
			size = Math.round(size);
			
			this.style = elem.style;
			this.isSizeDefined = (type == 'left') ? 
				!$.core.Validate.isStr(elem.style.left) : 
				!$.core.Validate.isUndefined(elem.style.top);
			this.isPixelSizeDefined = (type == 'width') ? 
				!$.core.Validate.isUndefined(elem.style.pixelLeft) : 
				!$.core.Validate.isUndefined(elem.style.pixelTop);
			
			if (!$.core.Validate.isUndefined(this.style) && this.isSizeDefined) {
				if(type == 'left') {
					elem.style.left = size + 'px';
				} else {
					elem.style.top = size + 'px';
				}
			} else if (!$.core.Validate.isUndefined(this.style) && this.isPixelSizeDefined) {
				if(type == 'left') {
					elem.style.pixelLeft = size;
				} else {
					elem.style.pixelTop = size;
				}
			}
			return size;
		},
		/**
		 * Resize to specify size
		 *
		 * @param <String>  {id}   : element id
		 * @param <Integer> {size} : size
		 * @param <String>  {type} : resize target
		 *
		 * @return <int> size
		 **/
		size: function (size, id, type) {
			elem = $.core.Element.getById(id);
			if(!elem) return;
			
			if (size < 0){
				size = 0;
			}
			
			size = Math.round(size);
			
			this.style = $.core.Validate.isUndefined(elem.style) ? null : elem.style;
			this.tagName = elem.tagName.toLowerCase();
			this.isSizeDefined = (type == 'width') ? 
				!$.core.Validate.isUndefined(elem.offsetWidth) && !$.core.Validate.isUndefined(elem.style.width) : 
				!$.core.Validate.isUndefined(elem.offsetHeight) && !$.core.Validate.isUndefined(elem.style.height);
			this.isPixelSizeDefined = (type == 'width') ? 
				!$.core.Validate.isUndefined(elem.style.pixelWidth) : 
				!$.core.Validate.isUndefined(elem.style.pixelHeight);
			
			if(elem == document || this.tagName == 'html' || this.tagName == 'body'){
				size = (type == 'width') ? $.core.Element.getInnerWidth : $.core.Element.getInnerHeight;
			}else if(!$.core.Validate.isUndefined(this.style) && this.isSizeDefined){
				if(type == 'width') {
					elem.style.width = size + 'px';
				} else {
					elem.style.height = size + 'px';
				}
				size = elem.offsetWidth
			} else if (!$.core.Validate.isUndefined(this.style) && this.isPixelSizeDefined) {
				if(type == 'width') {
					elem.style.pixelWidth = size;
					size = elem.style.pixelWidth;
				} else {
					elem.style.pixelHeight = size;
					size = elem.style.pixelHeight;
				}
			}
			
			return size;
		},
		/**
		 * Resize Object to specify width
		 *
		 * @param {id} : element id
		 * @param {size} : size
		 *
		 * @return <int> size
		 **/
		width: function (size, id) {
			return this.size(size, id, 'width');
		},
		/**
		 * Resize Object to specify height
		 *
		 * @param {id} : element id
		 * @param {size} : size
		 *
		 * @return <int> size
		 **/
		height: function (size, id) {
			return this.size(size, id, 'height');
		},
		/**
		 * Resize Object to specify top
		 *
		 * @param {id} : element id
		 * @param {size} : size
		 *
		 * @return <int> size
		 **/
		top: function (size, id) {
			return this.position(size, id, 'top');
		},
		/**
		 * Resize Object to specify left
		 *
		 * @param {id} : element id
		 * @param {size} : size
		 *
		 * @return <int> size
		 **/
		left: function (size, id) {
			return this.position(size, id, 'left');
		}
	}
	
	A.Reorder = {
		onDragStart: function (evt, callback) {
			self.$.core.dragDrop.Reorder.Handler = evt.target;
			evt.dataTransfer.effectAllowed = 'move';
			evt.dataTransfer.setData('Text', elem.textContent);
			callback();
		},
		onDragEnd: function (evt, callback) {
			evt.preventDefault();
			callback();
		},
		onDragOver: function (evt) {
			evt.preventDefault();
			evt.dataTransfer.dropEffect = 'move';
			this.handler = self.$.core.dragDrop.Reorder.Handler;
			var target = evt.target;
			
			if(target && target !== this.handler && target.nodeName == 'LI'){
				rootEl.insertBefore(this.handler, target.nextSibling || target);
			}
		}
	}
})(jQuery, $.core);

//Application-related functions
(function($, core) {

	var A = core.App = {
		registry: function (App) {
			appRegister.push(App);
		},
		fnCombine: function() {
			var fn = [];
			var vmem = [];
			var func = [];
			var prop = null;
			var args = arguments;
			for (prop in args[0]) {
				fn[prop] = args[0][prop];
				vmem = new fn[prop](true);
				if (vmem.PROP) {
					var _prop = vmem.PROP;
					var _name = _prop.name;
				}
				
				_prop = _name ? _name : prop;
				if(typeof func[_prop] === 'undefined') {
					if (vmem._name) {
						delete vmem._name;
					}
					func[_prop] = vmem;
				}
			}
			
			return func;
		}
	};
})(jQuery, $.core);

//Array-related functions
(function($, core) {

	var A = core.Arr = {
		forEach: function (array, callback) {
			if (array && array.length && $.core.Validate.isFunc(callback)) {
				this.length = array.length;
				for (var i = 0; i < this.length; i++) {
					callback(array[i], i, array);
				}
			}
		},
		/**
		 * Check that Array can push
		 *
		 * @return <Boolean>
		 **/
		canPush: function () {
			if (!new Array().push) return false;
			return true;
		},
		/**
		 * Get Minium Value in Array
		 *
		 * @param <Array> arr : Array
		 *
		 * @return <Boolean>
		 **/
		getMinValue: function (arr) {
			return Math.min(...arr);
		},
		getLessValue: function (arr, val, min) {
			return arr.find(val => val < min);
		},
		/**
		 * Get Minium Index in Array
		 *
		 * @param <Array> arr : Array
		 *
		 * @return <Integer>
		 **/
		getLessIndex: function (arr, val, min) {
			return arr.findIndex(val => val < min);
		},
		getMoreValue: function (arr, val, min) {
			return arr.find(val => val > min);
		},
		getMoreIndex: function (arr, val, min) {
			return arr.findIndex(val => val > min);
		},
		/**
		 * Get Random Number
		 *
		 * @param <Array> arr : Array
		 *
		 * @return <Integer>
		 **/
		getRandom: function (arr) {
			return arr[Math.floor(arr.length * Math.random())];
		},
		sibling: function (arr, c) {
			for (var result = []; arr; arr = arr.nextSibling){
				if(arr.nodeType === 1 && arr !== c){
					result.push(arr);
				}
			}
			
			return result;
		},
		/**
		 * Get Unique Array Values
		 *
		 * @return <Array>
		 **/
		getUnique: function (arr) {
			return arr.filter(function (item, i, ar) {
				return ar.indexOf(item) === i;
			});
		},
		/**
		 * initialize Array
		 *
		 * @param <Arguments>
		 **/
		initArray: function () {
			var _this = new Array();
			this.length = arguments.length;
			if (this.length > 0) {
				for (var i = 0; i < this.length; i++) {
					if (!$.core.Validate.isUndefined(arguments[i])) {
						_this[i + 1] = arguments[i];
					}
				}
			}
			
			return _this;
		},
		locationFrame: function (id, type, url) {
			var iframe = document.getElementById(id);
			if (iframe) {
				var sendData = {}
				sendData.type = type;
				sendData.url = url;
				
				var sendDataJson = JSON.stringify(sendData);
				var target = this.getPostMessage(iframe.contentWindow.window);
				
				target.postMessage(sendDataJson, '*');
			}
		},
		getPostMessage: function (target) {
			return (target.postMessage ? target : (target.document.postMessage ? target.document : undefined));
		},
		sendLinkToIframe: function (id, data) {
			target = document.getElementById(id);
			target.contentWindow.window.postMessage(data, '*');
		},
		/**
		 * Check that Array is equal
		 *
		 * @param <Array> {arr1}       : Array
		 * @param <Array> {arr2}       : Array
		 *
		 * @return <Boolean>
		 **/
		isArrayEqual: function (arr1, arr2) {
			var bool = (arr1.length == arr2.length) && arr1.every(function (element, index) {
				return element === arr2[index];
			});
			return bool;
		},
		/**
		 * Sortable Array
		 *
		 * @param <Array> arr : Array
		 *
		 * @return <Array>
		 **/
		sort: function (arr) {
			var temp = {};
			
			this.length = arr.length;
			
			for (var i = 0; i < this.length; i++){
				temp[arr[i]] = true;
			}
			
			return nativeKeys(temp);
		},
		isDef: function (args) {
			this.length = args.length;
			if (this.length > 0) {
				for (var i = 0; i < this.length; ++i) {
					if ($.core.Validate.isUndefined(args[i])) {
						return false;
					}
				}
				return true;
			}
		},
		/**
		 * Replace Text to Replace Text in Array
		 *
		 * @param <Array> arr      : Array
		 * @param <String> find    : to Find Text
		 * @param <String> replace : Set the Replacement Text
		 *
		 * @return <Array>
		 **/
		replace: function (arr, find, replace) {
			for (var i = 0; i < arr.length; i++) {
				arr[i] = arr[i].replace(find, replace);
			}
			return arr;
		},
		/**
		 * Find Object in Array
		 *
		 * @param <Array> arr      : Array
		 * @param <Object> obj     : to Find Object
		 *
		 * @return <Array>
		 **/
		Search: function (arr, obj) {
			this.length = arr.length;
			for (var i = 0, len = this.length; i < len; i++) {
				if (arr[i] == obj) {
					return true;
				}
			}
			return false;
		},
		/**
		 * Array Maximum Number Filter by specify number
		 *
		 * @param <Array> arr      : Array
		 * @param <String> max     : Maximum number
		 *
		 * @return <Array>
		 **/
		filterMax: function (arr, max) {
			return $.grep(arr, function (n, i) {
				return n > max;
			});
		},
		/**
		 * Array Minimum Number Filter by specify number
		 *
		 * @param <Array> arr      : Array
		 * @param <String> max     : Minimum number
		 *
		 * @return <Array>
		 **/
		filterMin: function (arr, min) {
			$.grep(arr, function (n, i) {
				return n > min;
			}, true);
		}
	};
	
})(jQuery, $.core);

//Audio-related functions
(function($, core) {

	var A = core.Audio = {
		/**
		 * Check that browser is support specify audio codec type
		 *
		 * @return boolean
		 **/
		isCanPlay: function (element, type, codecs) {
			var codecs = '';
			switch (type) {
			case "opus":
				type = 'audio/opus';
				codecs = 'opus';
				return element.canPlayType(type + ';codecs="' + codecs + '"');
			case "ogg":
				type = 'audio/ogg';
				codecs = 'theora, vorbis';
				return element.canPlayType(type + ';codecs="' + codecs + '"');
			case "oga":
				type = 'audio/ogg';
				codecs = 'vorbis';
				return element.canPlayType(type + ';codecs="' + codecs + '"');
			case "wav":
				type = 'audio/wav';
				codecs = '1';
				return element.canPlayType(type + ';codecs="' + codecs + '"');
			case "weba":
				type = 'audio/weba';
				codecs = 'vorbis';
				return element.canPlayType(type + ';codecs="' + codecs + '"');
			case "webm":
				type = 'audio/weba';
				codecs = 'vp8.0, vorbis';
				return element.canPlayType(type + ';codecs="' + codecs + '"');
			case "dolby":
				type = 'audio/mp4';
				codecs = 'ec-3';
				return element.canPlayType(type + ';codecs="' + codecs + '"');
			case "flac":
				return element.canPlayType("audio/x-flac;") || element.canPlayType("audio/flac;");
			case "m4a":
				return element.canPlayType("audio/x-m4a;") || element.canPlayType("audio/m4a;") || element.canPlayType("audio/aac;");
			case "mp4":
				return element.canPlayType('audio/x-mp4;codecs="avc1.42E01E, mp4a.40.2"') || element.canPlayType("audio/mp4;") || element.canPlayType("audio/aac;");
			case "caf":
				return element.canPlayType("audio/x-caf;");
			case "aac":
				return element.canPlayType("audio/aac;");
			case "mpeg":
				return element.canPlayType("audio/mpeg;");
			case "mp3":
				return element.canPlayType("audio/mp3;") || element.canPlayType("audio/mpeg;");
			}
			
			return element.canPlayType(type + ';codecs="' + codecs + '"');
		},
		/**
		 * Check that audio support
		 *
		 * @return boolean
		 **/
		isSupport: function () {
			if (_cWin.HTMLAudioElement && !$.core.Mobile.isRefMobile()) {
				return true;
			}
			return false;
		},
		/**
		 * Check that audio playing
		 *
		 * @return boolean
		 **/
		isPlaying: function () {
			if ($.core.Validate.isObject(StreamAudio)) {
				try{
					if (StreamAudio.currentTime > 0 && !StreamAudio.paused && !StreamAudio.ended && StreamAudio.readyState > 2) {
						return true;
					}
				}catch(e){}
				return false;
			}
		},
		/**
		 * Load Audio File for Play
		 *
		 * @param {src} : Audio Source
		 *
		 * @return void
		 **/
		loadAudio: function (src) {
			if (this.isSupport()) {
				if (!StreamAudio || !$.core.Validate.isObject(StreamAudio)) {
					StreamAudio = $.core.Element.create("audio");
				}
				
				try{
					const playPromise = StreamAudio.play();
					
					if (this.isPlaying()) {
						this.pauseAudio();
					}
					
					if (playPromise !== null) {
						StreamAudio.setAttribute("src", src);
						StreamAudio.src = src;
						StreamAudio.load();
					} else if (!$.core.Validate.isUndefined(playPromise)) {
						playPromise.then(_ => {
							StreamAudio.setAttribute("src", src);
							StreamAudio.src = src;
							StreamAudio.load();
						}).catch(error => {
							if (this.isPlaying()) {
								this.pauseAudio();
							}
							
							StreamAudio.setAttribute("src", src);
							StreamAudio.load();
						});
					}
				}catch(e){
					console.log(e);
				}
			}
		},
		/**
		 * Decode Audio Context
		 *
		 * @param {result} : evt.target.result
		 * @param {audioContext} : Audio Context
		 * @param {callback} : Callback
		 * @param {failCallback} : Failure Callback
		 *
		 * @return Callback
		 **/
		decodeAudio: function (result, audioContext, callback, failCallback) {
			audioContext.decodeAudioData(result, function (buffer) {
				callback(audioContext, buffer);
			}, function (e) {
				failCallback(e);
			});
		},
		/**
		 * Play Audio File (* Need to Load Audio File)
		 *
		 * @return void
		 **/
		playAudio: function () {
			if ($.core.Validate.isObject(StreamAudio)) {
				StreamAudio.play();
			}
		},
		/**
		 * Pause Audio File (* Need to Load Audio File)
		 *
		 * @return void
		 **/
		pauseAudio: function () {
			if ($.core.Validate.isObject(StreamAudio)) {
				StreamAudio.pause();
			}
		},
		/**
		 * Get Offline Audio Context
		 *
		 * @return Object
		 **/
		getOfflineAudioContext: function () {
			var OfflineAudioContext = null;
			try {
				var OfflineAudioContext = _cWin.OfflineAudioContext;
				return new(OfflineAudioContext)();
			} catch (e) {}
			return OfflineAudioContext;
		},
		/**
		 * Get Audio Context
		 *
		 * @return Object
		 **/
		getContext: function () {
			var AudioContext = null;
			try {
				var AudioContext = _cWin.AudioContext || _cWin.webkitAudioContext || _cWin.mozAudioContext || _cWin.msAudioContext;;
				return new(AudioContext)();
			} catch (e) {}
			return AudioContext;
		},
		/**
		 * Get Audio Context
		 *
		 * @param {audioContext} : AudioContext Object
		 * @param {audioElement} : Audio Element
		 *
		 * @return Object
		 **/
		createMediaElementSource: function (audioContext, audioElement) {
			return audioContext.createMediaElementSource(audioElement);
		},
		/**
		 * Get Node
		 *
		 * @param {context}      : AudioContext Object
		 * @param {audioElement} : Audio Element
		 *
		 * @return Object
		 **/
		getNode: function (context, audioElement) {
			return context.createMediaElementSource(audioElement);
		},
		//type : lowshelf, highshelf
		setBiquadFilter: function (context, type, freq, gain) {
			var variable = context.createBiquadFilter();
			variable.type = type;
			
			try{
				variable.frequency.setTargetAtTime(0, context.currentTime, freq);
			}catch(e){
				variable.frequency.value = freq; //is deprecated and will be removed in M64, around January 2018.
			}
			
			try{
				variable.gain.setTargetAtTime(0, context.currentTime, gain);
			}catch(e){
				variable.gain.value = gain;
			}
			
			return variable;
		},
		setDelay: function (context, audioNode, time) {
			var variable = context.createDelay();
			variable.delayTime.value = time;
			audioNode.connect(variable);
			audioNode.connect(context.destination);
			variable.connect(context.destination);
		},
		//value : samples
		contextSamplesToSeconds: function (audioContext, value) {
			return audioContext.sampleRate / value;
		},
		getContextCurrentTime: function (audioContext) {
			return audioContext.currentTime;
		},
		setGain: function (context, element) {
			var variable = context.createGain();
			element.connect(variable);
			return variable;
		},
		//AudioNode : context.createMediaElementSource(audioElement);
		setPan: function (context, audioNode) {
			var variable = context.createPanner();
			variable.panningModel = "equalpower";
			audionode.connect(variable);
			audionode.connect(context.destination);
			variable.connect(context.destination);
		},
		setInvert: function (value, context, element) {
			var variable = context.createGain();
			variable.gain.value = value;
			element.connect(variable);
			return variable;
		},
		createGain: function (audioContext) {
			if(!$.core.Validate.isFunc(audioContext.prototype.createGain)){
				audioContext.prototype.createGain = audioContext.prototype.createGainNode;
			}
			
			return audioContext.createGain();
		},
		createBiquadFilter: function (audioContext) {
			return audioContext.createBiquadFilter();
		},
		setPeriodicWave: function (oscillatorNode) {
			if (!$.core.Validate.isFunc(oscillatorNode.prototype.setPeriodicWave)){
				oscillatorNode.prototype.setPeriodicWave = oscillatorNode.prototype.setWaveTable;
			}
			
			return oscillatorNode.setPeriodicWave;
		},
		stopOscillatorNode: function (oscillatorNode) {
			if (!$.core.Validate.isFunc(oscillatorNode.prototype.stop)){
				oscillatorNode.prototype.stop = oscillatorNode.prototype.noteOff;
			}
			
			return oscillatorNode.stop;
		},
		startOscillatorNode: function (oscillatorNode) {
			if (!$.core.Validate.isFunc(oscillatorNode.prototype.start)){
				oscillatorNode.prototype.start = oscillatorNode.prototype.noteOn;
			}
			
			return oscillatorNode.start;
		},
		stopBufferSourceNode: function (audioBufferSourceNode) {
			if (!$.core.Validate.isFunc(audioBufferSourceNode.prototype.stop)){
				audioBufferSourceNode.prototype.stop = audioBufferSourceNode.prototype.noteGrainOn;
			}
			
			return audioBufferSourceNode.stop;
		},
		startBufferSourceNode: function (audioBufferSourceNode) {
			if (!$.core.Validate.isFunc(audioBufferSourceNode.prototype.start)){
				audioBufferSourceNode.prototype.start = audioBufferSourceNode.prototype.noteGrainOn;
			}
			
			return audioBufferSourceNode.start;
		},
		createPeriodicWave: function (audioContext) {
			if (!$.core.Validate.isFunc(audioContext.prototype.createPeriodicWave)){
				audioContext.prototype.createPeriodicWave = audioContext.prototype.createWaveTable;
			}
			
			return audioContext.createPeriodicWave();
		},
		createDelay: function (audioContext) {
			if(!$.core.Validate.isFunc(audioContext.prototype.createDelay)){
				audioContext.prototype.createDelay = audioContext.prototype.createDelayNode;
			}
			
			return audioContext.createDelay();
		},
		createPanner: function (audioContext) {
			return audioContext.createPanner();
		},
		createOscillator: function (context) {
			return context.createOscillator;
		},
		createAnalyser: function (context) {
			return context.createAnalyser;
		},
		closeAudioEffect: function (input, output, AudioNode) {
			if (!$.core.Validate.isFunc(input)){
				if (input instanceof AudioNode){
					input.disconnect();
				} 
				input = null;
			}
			if (!$.core.Validate.isFunc(output)){
				if (output instanceof AudioNode){
					output.disconnect();
				} 
				output = null;
			}
		},
		/*
		 * analyser : createAnalyser
		 */
		analyserFreqBinCount: function (analyser) {
			return analyser.frequencyBinCount; //Array
		},
		/*
		 * analyser : createAnalyser
		 */
		analyserGetByteFreqData: function (analyser, array) {
			return analyser.getByteFrequencyData(array);
		},
		createBuffSource: function (context) {
			return context.createBufferSource;
		}
	};
})(jQuery, $.core);

//Base-related functions
(function($, core) {

	var A = core.Base = {
		resetNaviCache: function () {
			_cNavi = navigator;
		},
		resetWinCache: function () {
			_cWin = window;
		}
	};
	
})(jQuery, $.core);

//Battery-related functions
(function($, core) {

	var A = core.Battery = {
		isGet: function () {
			_cNavi.getBattery().then(function (battery) {
				return true;
			});
			return false;
		},
		charingTime: function () {
			if (this.isGet()) {
				return battery.chargingTime;
			}
		},
		dischargingTime: function () {
			if (this.isGet()) {
				return battery.dischargingTime;
			}
		},
		level: function () {
			if (this.isGet()) {
				return battery.level;
			}
		}
	};
	
})(jQuery, $.core);

//Browser-related functions
(function($, core) {

	var A = core.Browser = {
		isLocalhost: function() {
			var loc = window.location;
			return ((loc.hostname.match('localhost') || loc.hostname.match('192.168.0.') || loc.hostname.match('127.0.0.1')) ? true : false);
		},
		hasTouchScreen: function (){
			return ("ontouchstart" in window);
		},
		isEmbededObject: function (id) {
			var isEO = false;
			var obj = document.getElementById(id);
			if (obj && (obj.nodeName === "OBJECT" || obj.nodeName === "EMBED")) {
				isEO = true
			}
			return isEO;
		},
		isChromeApp: function(){
			return (window.chrome || wiindow.chrome.storage);
		},
		hasConsole: function() {
			return (window.console || window.console.log);
		},
		hasReplaceState: function() {
			return (window.history || window.history.replaceState);
		},
		redirectToCompleteHost: function () {
			var host = location.host.toLowerCase();
			var url = location.href;
			if (host.indexOf("www")== -1) {
				location.href = url.replace("//","//www.");
			}
		},
		getAllPerformType: function () {
			var performtype = new Array();
			var perform = this.getPerform();
			for (var value in perform) {
				performtype.push(value);
			}
			
			return performtype;
		},
		getHardwareCur: function () {
			return navigator.hardwareConcurrency;
		},
		getPerform: function () {
			return window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};
		},
		getPerformMemorySize: function () { //Not available to workers
			var perform = this.getPerform();
			return perform.memory;
			/*
				{
				  totalJSHeapSize: ***,
				  usedJSHeapSize:  ***,
				  jsHeapSizeLimit: ***
				}
			*/
		},
		getPerformTiming: function () { //Not available to workers
			var perform = this.getPerform();
			return perform.timing;
		},
		is64Bit: function () {
			var agent = navigator.userAgent;
			if (agent.indexOf("x64") != -1) {
				return true;
			} else {
				return false;
			}
		},
		getChromeVersion: function () {
			return parseInt(navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
		},
		isWebVideo: function (url) {
			return /\.webm$|\.mp4$/.test(url);
		},
		isMozila: function () {
			try {
				if (jQuery.browser.mozilla) {
					return true;
				}
				return false;
			} catch (e) {
				return false;
			}
		},
		parseHTML: function (html) {
			return $.parseHTML(html);
		},
		isTouchSupport: function () {
			return "createTouch" in document;
		},
		hasPointerEvents: function () {
			var elem = document.createElement('div');
			var docElem = document.documentElement;
			
			if (!('pointerEvents' in elem.style)) {
				return false;
			}
			
			elem.style.pointerEvents = 'auto';
			elem.style.pointerEvents = 'x';
			docElem.appendChild(elem);
			
			var isSupports = window.getComputedStyle && window.getComputedStyle(elem, '').pointerEvents === 'auto';
			docElem.removeChild(elem);
			
			return !!isSupports;
		},
		isTouchable: function () {
			return "ontouchstart" in document.documentElement;
		},
		getFirstScriptTag: function () {
			return document.getElementsByTagName('script')[0];
		},
		getCancelAnimationFrame: function () {
			if ($.core.Validate.isUndefined($cache['animationFrame'])) {
				$cache['cancelanimationFrame'] = _cWin.cancelAnimationFrame || _cWin.webkitCancelAnimationFrame || _cWin.mozCancelAnimationFrame || _cWin.msCancelAnimationFrame;
			}
			return $cache['cancelanimationFrame'];
		},
		getAnimationFrame: function () {
			if ($.core.Validate.isUndefined($cache['animationFrame'])) {
				$cache['animationFrame'] = _cWin.mozRequestAnimationFrame || _cWin.webkitRequestAnimationFrame || _cWin.requestAnimationFrame || _cWin.oRequestAnimationFrame || _cWin.msRequestAnimationFrame || function (callback) {
					_cWin.setTimeout(callback, 1000 / 60);
				};
			}
			return $cache['animationFrame'];
		},
		disableContextMenu: function () {
			$(document).on('contextmenu', false);
		},
		disableDrag: function () {
			$(document).on('dragstart', false);
		},
		getConsoleErr: function (msg, url, line, column, errorObj) {
			$.core.Base.resetWinCache();
			if (msg.match(/Uncaught TypeError: Cannot read property '(\s?\.?[a-zA-Z\.]+)\w+' of undefined/ig)) {
				msg = /'([^']+)'/.exec(msg);
				msg = _cWin.lang['uncaught'] + _cWin.lang['typeerror'] + _cWin.lang['property'] + msg[0] + _cWin.lang['cannotreadproperty'] + '\n' + url + ':' + line + ':' + column;
				$.log("%c%s", "color: #ef0000; background: #e8ef63; font-size: 15px;", msg);
			} else if (msg.match(/Uncaught ReferenceError: (\s?\.?[a-zA-Z\.]+)\w+ is not defined/ig)) {
				msg = /\:(.*).+is/.exec(msg);
				msg = _cWin.lang['uncaught'] + _cWin.lang['referror'] + msg[1] + _cWin.lang['undefined'] + '\n' + url + ':' + line + ':' + column;
				$.log("%c%s", "color: #ef0000; background: #e8ef63; font-size: 15px;", msg);
			} else if (msg.match(/Uncaught TypeError: (\s?\.?[a-zA-Z\.]+)\w+ is not defined/ig)) {
				msg = /\:(.*).+is/.exec(msg);
				msg = _cWin.lang['uncaught'] + _cWin.lang['type'] + msg[1] + _cWin.lang['undefined'] + '\n' + url + ':' + line + ':' + column;
				$.log("%c%s", "color: #ef0000; background: #e8ef63; font-size: 15px;", msg);
			} else if (msg.match(/Uncaught TypeError: (\s?\.?[a-zA-Z\.()]+)\w+ is not a function/ig)) {
				msg = /\:(.*).+is/.exec(msg);
				msg = _cWin.lang['uncaught'] + _cWin.lang['typeerror'] + msg[1] + _cWin.lang['isnotfunc'] + '\n' + url + ':' + line + ':' + column;
				$.log("%c%s", "color: #ef0000; background: #e8ef63; font-size: 15px;", msg);
			} else {
				$.log(msg + '\n' + url + ':' + line + ':' + column);
			}
		},
		getTitle: function () {
			return document.title;
		},
		setTitle: function (title) {
			document.title = title;
		},
		getHash: function () {
			return _cWin.location.hash.replace('#', '');
		},
		printInnerHTML: function (id) {
			var initBody = document.body.innerHTML;
			window.onbeforeprint = function () {
				document.body.innerHTML = document.getElementById(id).innerHTML;
			}
			
			window.onafterprint = function () {
				document.body.innerHTML = initBody;
			}
			
			window.print();
		},
		Print: function () {
			_cWin.print();
		},
		getSearchEngineQuery: function (engine, keyword) {
			if (engine=='yahoo') {
				result = 'https://search.yahoo.com/search;?p=123' + keyword;
			} else if (engine=='google') {
				result = 'https://www.google.com/search?q=' + keyword;
			} else if (engine=='bing') {
				result = 'https://www.bing.com/search?q=' + keyword;
			} else if (engine=='baidu') {
				result = 'http://www.baidu.com/s?ie=utf-8&wd=' + keyword;
			} else if (engine=='yandex') {
				result = 'https://www.yandex.com/search/?text=' + keyword;
			} else if (engine=='duckduckgo') {
				result = 'https://duckduckgo.com/?q=' + keyword;
			} else if (engine=='gigablast') {
				result = 'https://www.gigablast.com/search?c=main&q=' + keyword;
			}
			
			return result;
		},
		isSupportCssAnimation: function () {
			try {
				return Modernizr.cssanimations;
			} catch (e) {
				return false;
			}
		},
		getHead: function () {
			return _cDoc.getElementsByTagName('head')[0];
		},
		getCharSet: function () {
			if (_cDoc.charset) {
				return _cDoc.charset.toLowerCase();
			} else if (_cDoc.characterSet) {
				return _cDoc.characterSet.toLowerCase();
			}
		},
		isWin: function () {
			if ($.core.Validate.isUndefined($cache['isWin'])) {//Win
				$cache['isWin'] = _cWin.navigator.userAgent.toLowerCase().indexOf("win") !== -1 ? true : false;
			}
			return $cache['isWin'];
		},
		isFirefox: function () {
			if ($.core.Validate.isUndefined($cache['isFirefox'])) {//Firefox
				$cache['isFirefox'] = _cWin.navigator.userAgent.toLowerCase().indexOf("firefox") !== -1 ? true : false;
			}
			return $cache['isFirefox'];
		},
		isNetscape: function () {
			if ($.core.Validate.isUndefined($cache['isNetscape'])) {//Netscape
				$cache['isNetscape'] = _cWin.navigator.userAgent.toLowerCase().indexOf("netscape") !== -1 ? true : false;
			}
			return $cache['isNetscape'];
		},
		isOpera: function () {
			if ($.core.Validate.isUndefined($cache['isOpera'])) {//Opera
				$cache['isOpera'] = (_cWin.navigator.userAgent.toLowerCase().indexOf("opera") !== -1 || _cWin.navigator.userAgent.toLowerCase().indexOf("opr") !== -1) ? true : false;
			}
			return $cache['isOpera'];
		},
		isChrome: function () {
			if ($.core.Validate.isUndefined($cache['isChrome'])) {//Chrome
				$cache['isChrome'] = _cWin.navigator.userAgent.toLowerCase().indexOf("chrome") !== -1 ? true : false;
			}
			return $cache['isChrome'];
		},
		isGecko: function () {
			if ($.core.Validate.isUndefined($cache['Gecko'])) {//Gecko
				$cache['isGecko'] = _cWin.navigator.userAgent.toLowerCase().indexOf("gecko") !== -1 ? true : false;
			}
			return $cache['isGecko'];
		},
		isKonqueror: function () {
			if ($.core.Validate.isUndefined($cache['Konqueror'])) {//Konqueror
				$cache['isKonqueror'] = _cWin.navigator.userAgent.toLowerCase().indexOf("konqueror") !== -1 ? true : false;
			}
			return $cache['isKonqueror'];
		},
		isSafari: function () {
			if ($.core.Validate.isUndefined($cache['isSafari'])) {//AppleWebKit
				$cache['isSafari'] = _cWin.navigator.userAgent.toLowerCase().indexOf("applewebkit") !== -1 ? true : false;
			}
			return $cache['isSafari'];
		},
		isIE: function () {
			if ($.core.Validate.isUndefined($cache['isIE'])) {
				$cache['isIE'] = _cUserAgent.indexOf("MSIE") > 0 || /msie/i.test(_cNavi.userAgent);
			}
			return $cache['isIE'];
		},
		isiOS: function () {
			if ($.core.Validate.isUndefined($cache['isIOS'])) {
				$cache['isIOS'] == _cNavi.platform.match(/(iPhone|iPod|iPad)/i) ? true : false;
			}
			return $cache['isIOS'];
		},
		isMacPlatform: function () {
			if ($.core.Validate.isUndefined($cache['isMacPlatform'])) {
				$cache['isMacPlatform'] == _cNavi.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
			}
			return $cache['isMacPlatform'];
		},
		isBlackBerry: function () {
			if ($.core.Validate.isUndefined($cache['isBlackBerry'])) {
				$cache['isBlackBerry'] == _cWin.navigator.userAgent.toLowerCase().indexOf("blackberry") !== -1 ? true : false;
			}
			return $cache['isBlackBerry'];
		},
		isMac: function () {
			if ($.core.Validate.isUndefined($cache['isMac'])) {
				$cache['isMac'] == _cWin.navigator.userAgent.toLowerCase().indexOf("mac") !== -1 ? true : false;
			}
			return $cache['isMac'];
		},
		isFrame: function (window) {
			var root = window.parent;
			if (root == 'undefined') return false;
			for (i = 0; i < root.frames.length; i++) {
				if (window == root.frames[i]) {
					return true;
				}
			}
			return false;
		},
		getLang: function () {
			_cNavi.language = _cNavi.language || _cNavi.userLanguage;
			return _cNavi.language;
		},
		getCreateShadowRoot: function () {
			_cWin.createShadowRoot = _cWin.createShadowRoot || _cWin.webkitCreateShadowRoot;
			return _cWin.createShadowRoot;
		},
		isStyleScoped: function (elem) {
			return void 0 === elem.document.createElement("style").scoped;
		},
		getRTCPeerConnection: function () {
			_cWin.RTCPeerConnection = _cWin.RTCPeerConnection || _cWin.webkitRTCPeerConnection || _cWin.mozRTCPeerConnection;
			return _cWin.RTCPeerConnection;
		},
		hasRTCPeerConnection: function () {
			return !!(this.getRTCPeerConnection());
		},
		newImageCapture: function (mediaStream) {
			var mediaStreamTrack = mediaStream.getVideoTracks()[0];
			if ($.core.Validate.isObject(mediaStream.getVideoTracks()[0])) {
				return new ImageCapture(mediaStreamTrack);
			}
		},
		startWebCam: function (errCallback) {
			if (this.hasGetUserMedia()) {
				this.getDeviceUserMedia({
					type: true
				}).then(function (mediaStream) {
					return mediaStream;
				}).catch(errCallback);
			}
		},
		getDeviceUserMedia: function (params) {
			return _cWin.navigator.mediaDevices.getUserMedia(params);
		},
		getImageCaptureHandler: function () {
			this.getDeviceUserMedia({video: true}).then(gotMedia).catch(error => {
				return false;
			});
			
			function gotMedia(mediaStream) {
				const mediaStreamTrack = mediaStream.getVideoTracks()[0];
				const imageCapture = new ImageCapture(mediaStreamTrack);
				return imageCapture;
			}
		},
		doCapture: function () {
			var imageCapture = this.getImageCaptureHandler();
			var blobData;
			imageCapture.takePhoto().then(blob => {
				blobData = blob;
			}).catch(error => {
				return false;
			});
			
			return blobData;
		},
		setIframeAPushState: function () {
			if (this.hasIframe()) {
				$("a").click(function () {
					var tag = event.currentTarget.tagName.toUpperCase();
					var url = event.currentTarget.href;
					if (tag === 'A' && !url.match(url)) {
						$.core.Browser.pushState(null, null, url);
					}
				});
			}
		},
		getTarget: function (event) {
			return event.srcElement || event.target;;
		},
		/**
		 * Asynchronous Module Definition
		 **/
		isDefAMD: function () {
			return define.amd;
		},
		isSupportPjax: function () {
			return $.support.pjax;
		},
		getBoundingHeight: function (id) {
			var height = 0;
			var rect = document.getElementById(id).getBoundingClintRect();

			if(rect.height){
				height = rect.height;
			}else{
				height = rect.bottom - rect.height; 
			}
			
			return height;
		},
		requireJs: function (source) {
			document.write('<script type="text/javascript" src="' + source + '"><\/script>');
		},
		isConsoleDirAvailable: function () {
			if (_cWin.console && _cWin.console.dir) {
				return true;
			}
			return false;
		},
		isConsoleAvailable: function () {
			if (_cWin.console && _cWin.console.log) {
				return true;
			}
			return false;
		},
		hasConnection: function () {
			var connection = this.getConnection();
			if (connection) {
				return true;
			}
			return false;
		},
		getConnection: function () {
			if ($.core.Validate.isUndefined($cache['connection'])) {
				$cache['connection'] = _cNavi.connection || _cNavi.mozConnection || _cNavi.webkitConnection;
			}
			
			return $cache['connection'];
		},
		getUserNetworkSpeed: function () {
			if (this.hasConnection()) {
				var connection = this.getConnection();
				return connection.bandwidth;
			} else {
				return 0;
			}
		},
		isUserNeedPayCost: function () {
			if (this.hasConnection()) {
				var connection = this.getConnection();
				if (!connection.metered && (connection.type && connection.type == "cellular")) {
					return false;
				}
				return false;
			}
			return false;
		},
		getMailWin: function (target) {
			location.href = "mailto:" + target;
		},
		hasIframe: function () {
			if (self !== top) {
				return true;
			}
			return false;
		},
		getBodyMiddleTop: function () {
			return Math.floor(( $("body").outerHeight(true) - $(_cWin).height()) / 2);
		},
		getUserMedia: function () {
			return _cNavi.getUserMedia || _cNavi.webkitGetUserMedia || _cNavi.mozGetUserMedia || _cNavi.msGetUserMedia;
		},
		hasGetUserMedia: function () {
			return !!(this.getUserMedia());
		},
		getVibrator: function () {
			return _cWin.navigator.vibrate || _cWin.navigator.webkitVibrate || _cWin.navigator.mozVibrate || _cWin.navigator.msVibrate;
		},
		hasVibrator: function () {
			return !!(this.getVibrator().vibrate);
		},
		mobileVibrate: function (ms) {
			var vibrator = this.getVibrator();
			
			if (vibrator.vibrate) {
				vibrator.vibrate(ms);
			}
		},
		isSupportTouch: function () {
			var android = _cNavi.userAgent.indexOf('Android') != -1;
			return android || !!('createTouch' in document);
		},
		isOnline: function () {
			$.core.Base.resetNaviCache();
			if (_cNavi.onLine) {
				return true;
			}
			return false;
		},
		appVer: function () {
			return _cNavi.appVersion;
		},
		userAgent: function () {
			return _cNavi.userAgent;
		},
		Product: function () {
			return _cNavi.product;
		},
		appCode: function () {
			return _cNavi.appCodeName;
		},
		appName: function () {
			return _cNavi.appName;
		},
		Url: function () {
			return _cWin.location.href;
		},
		Host: function () {
			return _cWin.location.hostname || _cWin.location.host;;
		},
		path: function () {
			return _cWin.location.pathname;
		},
		protocol: function () {
			return _cWin.location.protocol;
		},
		getCanvas: function (id) {
			var canvas = document.getElementById(id);
			if (canvas.getContext) {
				return this.canvas.getContext('2d');
			}
		},
		_Assign: function ($url) {
			return _cWin.location.assign($url);
		},
		Back: function () {
			_cWin.history.back();
		},
		Refresh: function () {
			location.reload(true);
		},
		Forward: function () {
			_cWin.history.forward();
		},
		/**
		 * Check elements is in the DOM
		 * @param {elem}        : Element
		 **/
		hasDom: function (elem) {
			$.contains(document.documentElement, elem);
		},
		/**
		 * Redirect
		 * @param {url}        : Link
		 * @param {_history}   : History
		 **/
		Redirect: function (url, hasRedirect) {
			if (hasRedirect === true) {
				_cWin.location.replace(url);
			} else {
				_cWin.location.href = url;
			}
		},
		answerCallback: function (msg, callback) {
			var answer = this._Confirm(msg);
			if (answer == true) {
				callback();
			}
		},
		_Prompt: function ($title, $content) {
			return prompt($title, $content);
		},
		_Confirm: function (msg, callback) {
			if ($.core.Validate.isFunc(callback)) {
				var cfm = confirm(msg);
				if (cfm == true) {
					callback();
				}
			} else {
				return confirm(msg);
			}
		},
		/**
		 * Answer before Redirect
		 * @param {$msg}   : Message
		 * @param {url}    : Link
		 **/
		answerRedirect: function (msg, url) {
			var answer = this._Confirm(msg);
			if (answer == true) {
				this.Redirect(url);
			}
		},
		/**
		 * Push State
		 * @param {stateObject}   : state Object
		 * @param {title}         : Title
		 * @param {url}           : Link
		 **/
		pushState: function (stateObject, title, url) {
			_cWin.top.history.pushState(stateObject, title, url);
		},
		replaceState: function (data, title) {
			_cWin.top.history.replaceState(stateObject, title, url);
		},
		isSmartPhone: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (/(Mobile)|(iPhone)|(Android)/gi.exec(userAgent)) {
				return true;
			}
			
			return false;
		},
		getWindowsVersion: function () {
			if (this.isWindows()) {
				var UserAgent = _cNavi.userAgent.toLowerCase();
				if (/(windows nt 6.2)/gi.exec(userAgent)) {
					return "8";
				} else if (/(windows nt 6.1)/gi.exec(userAgent)) {
					return "7";
				} else if (/(windows nt 6.0)/gi.exec(userAgent)) {
					return "vista";
				} else if (/(windows nt 5.2)/gi.exec(userAgent)) {
					return "2003";
				} else if (/(windows nt 5.1)|(windows XP)/gi.exec(userAgent)) {
					return "XP";
				} else if (/(windows nt 5.0)|(windows 2000)/gi.exec(userAgent)) {
					return "2000";
				} else if (/(windows nt 4.0)|(winnt4.0)|(winnt)|(windows nt)/gi.exec(userAgent)) {
					return "4.0";
				} else if (/(windows ME)/gi.exec(userAgent)) {
					return "ME";
				} else if (/(windows 98)|(win98)/gi.exec(userAgent)) {
					return "98";
				} else if (/(windows 95)|(win95)|(windows_95)/gi.exec(userAgent)) {
					return "95";
				} else if (/(win16)/gi.exec(userAgent)) {
					return "3.11";
				}
			}
		},
		/*
		 * Make sure the operating system is Microsoft Windows as the user agent value.
		 */
		isWindows: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (/(windows)|(winnt)|(win98)|(win95)|(win16)/gi.exec(this.userAgent)) {
				return true;
			}
			
			return false;
		},
		/*
		 * Make sure the operating system is Linux as the user agent value.
		 */
		isLinux: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (/(linux)/gi.exec(this.userAgent)) {
				return true;
			}
			
			return false;
		},
		/*
		 * Make sure the operating system is Sun OS as the user agent value.
		 */
		isSunOS: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (/(sunos)/gi.exec(this.userAgent)) {
				return true;
			}
			
			return false;
		},
		/*
		 * Make sure the operating system is isOpenBSD as the user agent value.
		 */
		isOpenBSD: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (/(openbsd)/gi.exec(this.userAgent)) {
				return true;
			}
			
			return false;
		},
		/*
		 * Make sure the operating system is MacPowerPC as the user agent value.
		 */
		isMacPowerPC: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (/(mac_powerpc)/gi.exec(this.userAgent)) {
				return true;
			}
			
			return false;
		},
		getDetail: function () {
			Browser = {};
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (userAgent.indexOf("msie") > -1) {
				Browser.Name = 'Internet Explorer';
				Browser.Version = parseFloat(userAgent.match(/msie (\d+\.\d+)/)[1]);
				if (Browser.Version >= 8 && document.documentMode >= 7) {
					Browser.documentMode = document.documentMode;
				}
			} else if (navigator.userAgent.indexOf("firefox") > -1) {
				Browser.Name = 'Firefox';
				Browser.Version = parseFloat(navigator.userAgent.match(/firefox\/(\d+\.\d+)/)[1]);
			} else if (navigator.userAgent.indexOf("applewebkit") > -1) {
				Browser.Name = 'Safari';
				Browser.Version = parseFloat(navigator.userAgent.match(/applewebkit\/(\d+(\.\d+)?)/)[1]);
			} else if (navigator.userAgent.indexOf("opera") > -1) {
				Browser.Name = 'Opera';
			}
		},
		/**
		 * Get Browser User Agent Type
		 **/
		getType: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if (UserAgent.indexOf("nokia") != -1) return 'Nokia';
			if (UserAgent.indexOf("sonyericsson") != -1) return 'Sony Ericsson';
			if (UserAgent.indexOf("polaris") != -1) return 'POLARIS';
			if (UserAgent.indexOf("symbian") != -1) return 'Symbian';
			if (UserAgent.indexOf("blackberry") != -1) return 'BlackBerry';
			if (UserAgent.indexOf("shw-m180") != -1) return 'Galaxy Tab';
			if (UserAgent.indexOf("shw-m380") != -1) return 'Galaxy Tab 10';
			//Internet Explorer
			if (UserAgent.indexOf("msie 6.") != -1) return 'MSIE 6.x';
			if (UserAgent.indexOf("msie 7.") != -1) return 'MSIE 7.x';
			if (UserAgent.indexOf("msie 8.") != -1) return 'MSIE 8.x';
			if (UserAgent.indexOf("msie 9.") != -1) return 'MSIE 9.x';
			if (UserAgent.indexOf("msie 10.") != -1) return 'MSIE 10.x';
			if (UserAgent.indexOf("android") != -1) return 'Android';
			//iOS
			if (UserAgent.indexOf("iphone") != -1) return 'iPhone';
			if (UserAgent.indexOf("ipad") != -1) return 'iPad';
			if (UserAgent.indexOf("ipod") != -1) return 'iPod';
			//Microsoft
			if (UserAgent.indexOf("iemobile") != -1) return 'IEMobile';
			if (UserAgent.indexOf("windows ce") != -1) return 'Windows CE';
			if (UserAgent.indexOf("windows phone") != -1) return 'Windows Phone';
			if (UserAgent.indexOf("netscape") != -1) return 'Netscape';
			if (UserAgent.indexOf("msie") != -1) return 'Internet Explorer';
			//General
			if (UserAgent.indexOf("opera") != -1) return 'Opera';
			if (UserAgent.indexOf("chrome") != -1) return 'Chrome';
			if (UserAgent.indexOf("mozilla/5.0") != -1) return 'Mozilla';
			if (UserAgent.indexOf("firefox") != -1) return 'Firefox';
			if (UserAgent.indexOf("opera mobi") != -1) return 'Opera Mobi';
			if (UserAgent.indexOf("opera mini") != -1) return 'Opera Mini';
			if (UserAgent.indexOf("webtv") != -1) return 'WebTV'; //LG
			//Max OS
			if (UserAgent.indexOf("chimera") != -1) return 'Chimera';
			if (UserAgent.indexOf("safari") != -1) return 'Safari';
		},
		/**
		 * Bookmark
		 * @param {url}	  : Bookmark URL
		 * @param {title} : Bookmark Title
		 **/
		Bookmark: function (url, title) {
			if (_cNavi.userAgent.toLowerCase().indexOf('chrome') > -1) {
				alert((_cNavi.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'Ctrl') + _cWin.lang['favorite']);
			} else if (_cWin.sidebar && _cWin.sidebar.addPanel) {
				_cWin.sidebar.addPanel(title, url, '');
			} else if ((_cWin.sidebar && (_cNavi.userAgent.toLowerCase().indexOf('firefox') > -1)) || (_cWin.opera && _cWin.print)) {
				var aElements = document.createElement('a');
				aElements.setAttribute('href', url);
				aElements.setAttribute('title', name);
				aElements.setAttribute('rel', 'sidebar');
				aElements.click();
			} else if (_cWin.sidebar && Browser.isMozila()) {
				jQuery(this).attr('rel', 'sidebar');
			} else {
				if (_cWin.external && ('AddFavorite' in _cWin.external)) {
					_cWin.external.AddFavorite(url, title);
				} else {
					alert((_cNavi.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'Ctrl') + _cWin.lang['favorite']);
				}
			}
		}
	};
})(jQuery, $.core);

//Cache-related functions
(function($, core) {

	var A = core.Cache = {
		isSupport: function () {
			if ('caches' in _cWin) {
				return true;
			}
			return false;
		},
		open: function (key, val, callback) {
			if (this.isSupport()) {
				caches.open(key).then(function (cache) {
					cache.match(val).then(function (matchedResponse) {
						if ($.core.Validate.isFunc(callback)) {
							callback(matchedResponse);
						}
					});
				});
			}
		},
		del: function (key, callback) {
			if (this.isSupport()) {
				caches.delete(key).then(function () {
					if ($.core.Validate.isFunc(callback)) {
						callback();
					}
					return true;
				});
				return false;
			}
		},
		add: function (key, value, request) {
			if (this.isSupport()) {
				if (request) {
					caches.open(key).then(function (cache) {
						cache.add(new Request(value, request));
					});
				} else {
					caches.open(key).then(function (cache) {
						cache.add(value);
					});
				}
			}
		}
	};
})(jQuery, $.core);

//ChromeExtend-related functions
(function($, core) {

	var A = core.ChromeExtend = {
		appCreate: function (html, id, maxWidth, maxHeight, minWidth, minHeight) {
			chrome.app.window.create(
				html, {
					id: id,
					innerBounds: {
						maxWidth: maxWidth || 600,
						maxHeight: maxHeight || 300,
						minWidth: minWidth || 600,
						minHeight: minHeight || 300
					},
					frame: 'none'
				}
			);
		},
		getAppLaunchedEvent: function (callback) {
			chrome.app.runtime.onLaunched.addListener(function(){
				callback();
			});
		},
		setWallpaper: function (img_url, filename) {
			chrome.wallpaper.setWallpaper(
				{
					url:img_url,
					layout:"CENTER_CROPPED",
					filename:filename
				},
				function(thumbnail){}
			);
		},
		isSupport: function () {
			if (navigator.userAgent.toLowerCase.indexOf("chrome") != -1 && $.core.Browser.getChromeVersion() >= 42) {
				return true;
			} else {
				return false;
			}
		},
		getAPP: function (APP_ID) {
			_cWin.open("https://chrome.google.com/webstore/detail/" + APP_ID);
		},
		sendMessage: function (APP_ID, msg, callback) {
			if (this.isSupport()) {
				chrome.runtime.sendMessage(APP_ID, message, function (response) {
					callback(response);
				});
			}
		}
	};
	
})(jQuery, $.core);

//Clipboard-related functions
(function($, core) {

	var A = core.Clipboard = {
		isExist: function () {
			return _cWin.clipboardData;
		},
		Set: function (prompt_msg, data) {
			if ((_cWin.attachEvent || _cWin.addEventListener) && navigator.userAgent.toLowerCase().indexOf('msie') !== -1) {
				_cWin.clipboardData.setData(data);
				$.core.Base.resetWinCache();
			} else {
				pmt = prompt(prompt_msg, data);
			}
		},
		Get: function (type) {
			if ($.core.Validate.isUndefined(type)) type = 'text';
			if (this.isExist()) {
				return clipboardData.getData(type);
			}
		}
	};
	
})(jQuery, $.core);

//Cookie-related functions
(function($, core) {

	var A = core.Cookie = {
		/**
		 * Delete Cookie
		 * @param {cName}   : Cookie Name
		 **/
		Delete: function (cName) {
			if (this.isAccept()) {
				DateFormat.setDate(DateFormat.getDate() - 1);
				var cookies = cName + '=' + '; expires=' + DateFormat.toGMTString() + '; path=/';
				
				return this.SetData(cookies);
			} else {
				return false;
			}
		},
		isAccept: function () {
			return _cNavi.cookieEnabled;
		},
		/**
		 * Get Cookie
		 * @param {cName}   : Cookie Name
		 **/
		Get: function (cName) {
			if (this.isAccept()) {
				var cookies = document.cookie.match(new RegExp("(^| )" + cName + "=([^;]*)(;|$)"));
				return !cookies ? "" : decodeURIComponent(cookies[2])
			} else {
				return false;
			}
		},
		SetData: function (data) {
			document.cookie = data;
			if (document.cookie.length==0) {
				return false;
			} else {
				return true;
			}
		},
		/**
		 * Set Cookie
		 * @param {cName}   : Cookie Name
		 * @param {cValue}  : Cookie Value
		 * @param {cDay}    : Cookie Expires Day
		 **/
		Set: function (cName, cValue, cDay) {
			if (this.isAccept()) {
				DateFormat.setDate(DateFormat.getDate() + cDay);
				var cookies = cName + '=' + escape(cValue) + '; path=/ ';
				cookies += ';domain=' + window.location.hostname;
				if (typeof cDay != 'undefined') {
					cookies += ';expires=' + DateFormat.toGMTString() + ';';
				}
				
				return this.SetData(cookies);
			} else {
				return false;
			}
		}
	};
})(jQuery, $.core);

//detectAdblock-related functions
(function($, core) {

	var A = core.detectAdblock = {
		create: function () {
			var cls = 'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links';
			var style = 'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important';
			if ($('.pub_300x250').length == 0) {
				pAdBlocker = $.core.Element.addDivOnBody(cls);
				pAdBlocker.setAttribute('style', style);
			}
		},
		detect: function () {
			if ($.core.Validate.isUndefined($cache['adblock'])) {
				var detected = false;
				if (_cWin.document.body.getAttribute('abp') !== null || pAdBlocker.offsetParent === null || pAdBlocker.offsetHeight == 0 || pAdBlocker.offsetLeft == 0 || pAdBlocker.offsetTop == 0 || pAdBlocker.offsetWidth == 0 || pAdBlocker.clientHeight == 0 || pAdBlocker.clientWidth == 0) {
					detected = true;
				}
				
				if (!$.core.Validate.isUndefined(_cWin.getComputedStyle)) {
					var baitTemp = _cWin.getComputedStyle(pAdBlocker, null);
					if (baitTemp && (baitTemp.getPropertyValue('display') == 'none' || baitTemp.getPropertyValue('visibility') == 'hidden')) {
						detected = true;
					}
				}
				$cache['adblock'] = detected;
			}
			return $cache['adblock'];
		}
	};
})(jQuery, $.core);

//Effect-related functions
(function($, core) {

	var A = core.Effect = {
		Highlighter: function (target, rgb1, rgb2, delay) {
			var timerCounter = 0;
			var timerDelay = 30;
			var _delay = delay / timerDelay;
			var firstDiff = (rgb1[0] - rgb2[0]) / _delay;
			var secondDiff = (rgb1[1] - rgb2[1]) / _delay;
			var thirdDiff = (rgb1[2] - rgb2[2]) / _delay;

			var timer = setInterval(function () {
				rgb1[0] = parseInt(rgb1[0] - firstDiff, 10);
				rgb1[1] = parseInt(rgb1[1] - secondDiff, 10);
				rgb1[2] = parseInt(rgb1[2] - thirdDiff, 10);
				
				target.style.backgroundColor = "rgb(" + rgb1.toString() + ")";
				timerCounter += 1;
				if (timerCounter >= _delay) {
					target.style.backgroundColor = "#fff";
					clearInterval(timer);
				}
			}, timerDelay);
		},
		Toggle: function (elements) {
			if ($(elements).length) {
				var hasDisplayAttr = elements.currentStyle ? elements.currentStyle.display : getComputedStyle($(elements)[0], "").getPropertyValue('display');
				hasDisplayAttr = hasDisplayAttr ? hasDisplayAttr.toString().length : 0;
				if (hasDisplayAttr > 0) {
					$(elements).toggle(500);
				}
				$(_cWin).scrollTop($(elements).position().top);
			}
		},
		Focus: function (elements) {
			if (typeof elements === 'number' && isFinite(elements)) {
				$(_cWin).scrollTop(elements);
			} else {
				if ($(elements).length > 0) {
					$(_cWin).scrollTop($(elements).position().top);
				}
			}
		},
		FocusAnimate: function (elements, delay, type) {
			if (typeof elements === 'number' && isFinite(elements)) {
				$("html, body").animate({
					scrollTop: elements
				}, delay, 'swing');
			} else {
				if ($(elements).length > 0) {
					$("html, body").animate({
						scrollTop: $(elements).position().top
					}, delay, 'swing');
				}
			}
		}
	};
})(jQuery, $.core);

//Screen-related functions
(function($, core) {

	var A = core.Screen = {
		/**
		 * Cancel Full Screen
		 * @param {element}         : element
		 **/
		cancelFullScreen: function (element) {
			if (this.isFullScreen(element)) {
				if (element) {
					try {
						if (element.exitFullscreen) {
							var requestMethod = element.exitFullscreen();
						} else if (element.cancelFullScreen) {
							var requestMethod = element.cancelFullScreen();
						} else if (element.mozCancelFullScreen || this.hasMozNativeFullScreen) {
							var requestMethod = element.mozCancelFullScreen();
						} else if (element.webkitExitFullScreen || element.webkitCancelFullScreen || this.hasWebkitNativeFullScreen) {
							var requestMethod = element.webkitExitFullScreen() || element.webkitCancelFullScreen();
						} else if (element.msExitFullscreen || this.hasMsNativeFullScreen) {
							var requestMethod = element.msExitFullscreen();
						}
					} catch (e) {
						//var requestMethod = element.webkitExitFullScreen || element.cancelFullScreen || element.webkitCancelFullScreen || element.msExitFullscreen || element.mozCancelFullScreen || element.msCancelFullScreen || element.exitFullscreen;
						if (document.exitFullscreen) {
							var requestMethod = document.exitFullscreen();
						} else if (document.mozCancelFullScreen) {
							var requestMethod = document.mozCancelFullScreen();
						} else if (document.webkitCancelFullScreen) {
							var requestMethod = document.webkitCancelFullScreen();
						} else if (document.msExitFullscreen) {
							var requestMethod = document.msExitFullscreen();
						}
					}
				} else {
					if (document.exitFullscreen) {
						var requestMethod = document.exitFullscreen();
					} else if (document.mozCancelFullScreen) {
						var requestMethod = document.mozCancelFullScreen();
					} else if (document.webkitCancelFullScreen) {
						var requestMethod = document.webkitCancelFullScreen();
					} else if (document.msExitFullscreen) {
						var requestMethod = document.msExitFullscreen();
					}
				}
				
				try{
					if (requestMethod) {
						requestMethod.call(element);
					}
				} catch(e) {}
				return false;
			}
		},
		hasPip: function () {
			if (document.pictureInPictureElement) {
				return true;
			}
			
			return false;
		},
		setPip: function (video) {
			if (!this.hasPip()) {
				video.requestPictureInPicture().catch(error => {
					return false
				});
				
				return true;
			}
		},
		exitPip: function () {
			if (this.hasPip()) {
				document.exitPictureInPicture().catch(error => {
					return false
				});
				
				return true;
			}
		},
		getHTML5Handler: function () {
			var video;
			this.length = html5Elements.length;
			for (i = 0; i < this.length; i++) {
				video = $.core.Element.create(html5Elements[i]);
			}
			return video;
		},
		hasTrueNativeFullScreen: function () {
			video = this.getHTML5Handler();
			if (typeof video.msRequestFullscreen !== 'undefined') {
				return true;
			}
			return false;
		},
		hasMsNativeFullScreen: function () {
			video = this.getHTML5Handler();
			if (typeof video.webkitRequestFullScreen !== 'undefined' || typeof video.mozRequestFullScreen !== 'undefined' || typeof video.msRequestFullscreen !== 'undefined') {
				return true;
			}
			return false;
		},
		hasMozNativeFullScreen: function () {
			video = this.getHTML5Handler();
			if (typeof video.mozRequestFullScreen !== 'undefined') {
				return true;
			}
			return false;
		},
		hasWebkitNativeFullScreen: function () {
			video = this.getHTML5Handler();
			if (typeof video.webkitRequestFullScreen !== 'undefined') {
				return true;
			}
			return false;
		},
		hasNativeFullscreen: function () {
			video = this.getHTML5Handler();
			if (typeof video.requestFullscreen !== 'undefined') {
				return true;
			}
			return false;
		},
		hasSemiNativeFullScreen: function () {
			video = this.getHTML5Handler();
			if (typeof video.webkitEnterFullscreen !== 'undefined') {
				return true;
			}
			return false;
		},
		/**
		 * Request Full Screen
		 * @param {element}         : element
		 **/
		requestFullScreen: function (element) {
			if (!this.isFullScreen(element)) {
				try {
					if (element.requestFullscreen) {
						var requestMethod = element.requestFullscreen();
					} else {
						var requestMethod = element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
					}
					
					if (element.mozRequestFullScreen || element.mozRequestFullScreen) {
						var requestMethod = element.mozRequestFullScreen();
					} else if (element.webkitRequestFullScreen || this.hasWebkitNativeFullScreen) {
						var requestMethod = element.webkitRequestFullScreen();
					} else if (element.mozRequestFullScreen || this.hasMozNativeFullScreen) {
						var requestMethod = element.mozRequestFullScreen();
					} else if (element.msRequestFullscreen || this.hasMsNativeFullScreen) {
						var requestMethod = element.msRequestFullscreen();
					} else {
						var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) || element.mozRequestFullScreen || element.msRequestFullScreen;
					}
				} catch(e) {
					console.log(e);
				}
				
				if (requestMethod) {
					requestMethod.call(element);
				}
				return false;
			}
		},
		/**
		 * Toggle Full Screen
		 * @param {element}         : element
		 **/
		toggleFullScreen: function (element) {
			if (this.isFullScreen(element)) {
				return this.cancelFullScreen(element);
			} else {
				return this.requestFullScreen(element);
			}
			return false;
		},
		
		getScreenColorDepth: function () {
			return window.screen.colorDepth;
		},
		/**
		 * Check Browser Support Full Screen
		 * @param {element}     : element
		 **/
		isFullScreen: function (element) {
			$.core.Base.resetWinCache();
			if (element) {
				if (this.hasMozNativeFullScreen) {
					var isFull = element.mozFullScreen;
				} else if (this.hasWebkitNativeFullScreen) {
					var isFull = element.webkitIsFullScreen;
				} else if (this.hasMsNativeFullScreen) {
					var isFull = element.msFullscreenElement;
				} else {
					var isFull = element.fullscreenElement || element.mozFullScreenElement || element.webkitFullscreenElement || element.msFullscreenElement;
				}
			} else {
				var isFull = document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement;
			}
			
			if (isFull || Math.abs(screen.width - _cWin.innerWidth) < 10) {
				return true;
			}
			return false;
		}
	}
})(jQuery, $.core);

//Element-related functions
(function($, core) {

	var A = core.Element = {
		isHTMLElement: function (elem){
			return (elem instanceof window.HTMLElement) ? true : false;
		},
		getWebColor: function (id){
			return webColorCodes[id];
		},
		setMenuToggleClass: function (target, cls){
			//JQMIGRATE: 'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'
			$(target).on('focus mouseenter mouseover mousedown', function(){
				$(this).addClass(cls);
			}),
			$(target).on('mouseleave mouseout contextmenu mouseup',function(){ 
				$(this).removeClass(cls);
			});
		},
		insertDOMParentBefore: function (target, dom, id){
			var elem = document.getElementById(target);
			if (elem) {
				var _dom = document.createElement(dom);
				elem.parentNode.insertBefore(_dom, elem);
				_dom.setAttribute("id", id);
			}
		},
		getElementsByClassNameCompatible: function (cls){
			if(document.getElementsByClassName) {
				return document.getElementsByClassName(cls);
			}
			
			var i;
			var classArr = new Array();
			var regex = new RegExp('^| ' + cls + ' |$');
			var elem = document.body.getElementsByTagName("*");
			var len = elem.length;
			for(i=0; i<len; i++) {
				var clsName = elem[i].className;
				if(clsName) {
					if(regEx.test(clsName)) {
						classArr.push(elem[i]);
					}
				}
			}
			
			return classArr;
		},
		makeStruct: function (item, duplicate) {
			var item = item.split(duplicate);
			var count = item.length;
			function constructor() {
				var i;
				for (i = 0; i < count; i++) {
					this[names[i]] = arguments[i];
				}
			}
			
			return constructor;
		},
		getBodyLastChild: function(){
			return document.body.lastChild;
		},
		isBodyRTL: function(){
			return window.getComputedStyle(document.body).direction === 'rtl';
		},
		isCorrectFunctionName: function (func) {
			var func = /^\s*function\s*([A-Za-z0-9_$]*)/;
			return func.exec(func);
		},
		fontTest: function (beforeweight, beforefamily, afterweight, afterfamily, id) {
			before.family = (typeof(beforefamily) != 'undefined')? beforefamily: 'serif';
			before.weight = (typeof(beforeweight) != 'undefined')? beforeweight: '300';
			after.family = (typeof(afterfamily) != 'undefined')? afterfamily: 'serif';
			after.weight = (typeof(afterweight) != 'undefined')? afterweight: '300';	
			
			$('body').prepend('<p id="' + id + '" style="font-family:' + before.family + ';font-size:72px;font-weight:' + before.weight + ';left:-9999px;top:-9999px;position:absolute;visibility:hidden;width:auto;height:auto;">ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789./\!</p>');
			
			var beforeWidth = $('p#' + id).width();
			var beforeHeight = $('p#' + id).height();
			
			$('p#jQuery-Font-Test').css({
				'font-family': (after.family + ',' + base.family),
				'font-weight': after.weight
			});
			
			var afterWidth = $('p#' + id).width();
			var afterHeight = $('p#' + id).height();
			
			$('p#' + id).remove();
			
			return (((afterHeight != beforeHeight) || (afterWidth != beforeWidth)) ? true: false);
		},
		getChildsText: function (node) {
			function getStrings(node, arr) {
				if (node.nodeType == 3) { /* Node.TEXT_NODE */
					arr.push(node.data);
				} else if (node.nodeType == 1) { /* Node.ELEMENT_NODE */
					for (var m = node.firstChild; m != null; m = m.nextSibling) {
						getStrings(m, arr);
					}
				}
			}
			
			var arr = [];
			getStrings(node, arr);
			return arr.join("");
		},
		selectTextArea: function (id) {
			document.getElementById(id).select();
		},
		getPointerX: function (evt) {
			if (!evt) {
				evt = window.event;
			}
			
			try{
				return evt.pageX || (evt.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
			} catch (e){
				console.log(e);
			}
		},
		getFunction: function (name, params) {
			query = name + "(" + params + ");";
			return eval(query);
		},
		getPointerY: function (evt) {
			if (!evt) {
				evt = window.event;
			}
			
			return evt.pageY || (evt.clientY + (document.documentElement.scrollLeft || document.body.scrollLeft));
		},
		getScrollX: function () {
			if (self.pageXOffset) {
				return self.pageXOffset;
			} else if (document.documentElement && document.documentElement.scrollTop) {
				return document.documentElement.scrollLeft;
			} else if (document.body && document.body.scrollLeft) {
				return document.body.scrollLeft;
			}
		},
		getScrollY: function () {
			if (self.pageYOffset) {
				return self.pageYOffset;
			} else if (document.documentElement && document.documentElement.scrollTop) {
				return document.documentElement.scrollTop;
			} else if (document.body && document.body.scrollTop) {
				return document.body.scrollTop;
			}
		},
		toggleLayer: function (id) {
			try {
				var obj = document.getElementById(id);
				obj.style.display = "none" == obj.style.display ? "block" : "none";
			} catch (e) {
				console.log(e);
			}
			
			return true;
		},
		findForm: function (object) {
			for (var obj = object; obj; obj = obj.parentNode) {
				if ("FORM" == obj.nodeName) {
					return obj;
				}
			}
		},
		trimAllTags: function (form) {
			try {
				var i;
				this.length = form.elements.length;
				for (var i = 0; i < this.length; i++) {
					//form.elements[i].tagName.toLowerCase();
					//form.elements[i].type
					/*TODO*/
				}
				return !0
			} catch (e) {
				console.log(e);
			}
		},
		getPosition: function (id, type) {
			elem = this.getById(id);
			if(!elem){
				return 0;
			}
			
			var offset = 0;
			while (elem) {
				if (type=='left') {
					if (!$.core.Validate.isUndefined(elem.offsetLeft)) {
						offset += elem.offsetLeft;
					}
				} else {
					if (!$.core.Validate.isUndefined(elem.offsetTop)) {
						offset += elem.offsetTop;
					}
				}
				elem = !$.core.Validate.isUndefined(elem.offsetParent) ? elem.offsetParent : null
			}
			return offset;
		},
		getParent: function (id, node) {
			elem = this.getById(id);
			if(!elem){
				return null;
			}
			
			if(!node && !$.core.Validate.isUndefined(elem.offsetParent)){
				p = elem.offsetParent;
			}else if(!$.core.Validate.isUndefined(elem.parentNode)){
				p = elem.parentNode;
			}else if(!$.core.Validate.isUndefined(elem.parentElement)){
				p = elem.parentElement;
			}
			
			return p;
		},
		generateTooltip: function (elem, cls) {
			var _tooltip = [];
			
			if (!$(elem).length) {
				return;
			}
			
			$(elem).each(function (i, item) {
				var _tooltipItem = $('<div class="' + cls + '" data-index="' + i + '"></div>').appendTo($body);
				$(item).attr('data-index', i);
				_tooltip.push(_tooltipItem);
			});
			
			return _tooltip;
		},
		removeIEObject: function (id) {
			var obj = $.core.Element.getById(id);
			if (obj) {
				for (var i in obj) {
					if (typeof obj[i] == "function") {
						obj[i] = null;
					}
				}
				obj.parentNode.removeChild(obj);
			}
		},
		getAttr: function (elem, prop) {
			return elem.getAttribute(prop);
		},
		getStyleText: function (elem) {
			var style = this.getAttr(elem, "style");
			if(!style) {
				style = elem.style;
			}
			
			if(typeof(style)=="object"){
				return style;
			}
			
			return null;
		},
		addStyle: function (id, html) {
			var style = document.createElement("style");
			style.type = "text/css";
			style.innerHTML = html;
			style.id = id;
			document.head.appendChild(style);
		},
		getStyle: function (elem, prop) {
			if (elem.currentStyle) {
				return elem.currentStyle[prop];
			} else if (_cWin.getComputedStyle) {
				return document.defaultView.getComputedStyle(elem, null).getPropertyValue(prop);
			}
		},
		preloadImage: function (src) {
			var preloadIMage = new Image;
			preloadIMage.src = src;
		},
		getMatchesSelector: function (elem) {
			return elem.prototype.matchesSelector || elem.prototype.mozMatchesSelector || elem.prototype.msMatchesSelector || elem.prototype.oMatchesSelector || elem.prototype.webkitMatchesSelector;
		},
		setAllCheckboxToggle: function (elem, target) {
			var isChecked = elem.checked;
			if (target) {
				var checker = [];
				if (!target.length) {
					checker.push(target);
				} else if (target.length > 0) {
					for(var i=0; i<target.length; i++) {
						checker.push(target[i]);
					}
				}
				for(var i=0; i<checker.length; i++) {
					var currentItem = checker[i];
					if (isChecked && !currentItem.checked) {
						currentItem.checked = true;
					} else if (!isChecked && currentItem.checked) {
						currentItem.checked = false;
					}
				}
			}
		},
		setCheckboxToggle: function (item) {
			var obj = $('input[name=' + item + ']:checkbox');
			
			obj.each(function () {
				$(this).attr('checked', ($(this).attr('checked')) ? false : true)
			});
		},
		getSelectedText: function () {
			if (_cWin.getSelection) {
				return _cWin.getSelection();
			} else if (document.getSelection) {
				return document.getSelection();
			} else {
				var selection = document.selection && document.selection.createRange();
				
				if (selection.text) {
					return selection.text;
				}
				
				return false;
			}
		},
		getDoc: function (elem) {
			return (elem.contentWindow || elem.contentDocument).document;
		},
		isVideoIncluded: function (Id) {
			var obj = this.getById(id);
			
			if (obj && /object|embed/i.test(obj.nodeName)) {
				return true;
			}
			
			return false;
		},
		setHeaderStyle: function (style) {
			var head = document.getElementsByTagName('head')[0];
			
			if(style && head) {
				var styles = this.create('style');
				styles.setAttribute('type', 'text/css');
				if(styles.styleSheet) {
					try {
						styles.styleSheet.cssText = style;
					} catch(e) {
						styles.nodeText = style;
					}
				} else {
					var styles = document.createTextNode(style);
					styles.appendChild(styles);
				}
				head.appendChild(styles);
			}
		},
		setJS: function (url, callback) {
			try {
				var head = document.getElementsByTagName('head')[0];
				var script = this.create('script');
				var scripts = head.getElementsByTagName('script');
				
				script.type = 'text/javascript';
				script.src = url;
				script.async = true;
				
				for (i = 0; i < scripts.length; i++) {
					if (scripts[i].href === script.src) {
						return false;
					}
				}
				
				head.appendChild(script) || document.body.appendChild(script);
				
				script.onreadystatechange = function (self, callback) {
					if (/complete|loaded/.test(script.readyState)) {
						if ($.core.Validate.isFunc(callback)) {
							try {
								callback.call(this, script);
							} catch (e) {console.log(e)}
						}
					}
				}
				
				script.onload = function (self, callback) {
					if ($.core.Validate.isFunc(callback)) {
						try {
							callback.call(this, script);
						} catch (e) {console.log(e)}
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
		setCSS: function (url, callback) {
			try {
				var head = document.getElementsByTagName('head')[0];
				var link = this.create('link');
				var links = head.getElementsByTagName('link');
				link.rel = 'stylesheet';
				link.type = 'text/css';
				link.href = url;
				
				for (i = 0; i < links.length; i++) {
					if (links[i].href === link.href) {
						return false;
					}
				}
				
				head.appendChild(link) || document.body.appendChild(link);
				
				script.onreadystatechange = function () {
					if (/complete|loaded/.test(script.readyState)) {
						if (callback != null && callback != undefined) {
							callback();
						}
					}
				}
				
				script.onload = function () {
					if (callback != null && callback != undefined) {
						callback();
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
		setChecked: function (element) {
			$(element).prop('checked', true);
		},
		unsetChecked: function (element) {
			$(element).prop('checked', false);
		},
		isChecked: function (element) {
			return $(element).is(':checked');
		},
		enqueue: function (arr) {
			return arr.push(arr);
		},
		dequeue: function (arr) {
			return arr.shift();
		},
		hasProperty: function (obj, prop) {
			return protoObj.hasOwnProperty.call(obj, prop);
		},
		setProperty: function (obj, prop, descriptor) {
			if (descriptor) {
				Object.defineProperty(obj, prop, descriptor);
			} else {
				Object.defineProperties(obj, prop);
			}
		},
		getInnerWinSize: function () {
			return {
				width: this.getInnerWidth(),
				height: this.getInnerHeight()
			};
		},
		getProperty: function (element, prop) {
			return Object.getOwnPropertyDescriptor(element, prop);
		},
		readLittleEndian: function(array, index) {
			/***
			 * LSB (Least Significant Byte)
			 * 0x78, 0x56, 0x34, 0x12...
			 * Speed LE > BE
			 *
			 * ${https://oeis.org/A133752}
			 *
			 * 1, 256, 65536, 16777216, 4294967296, 1099511627776, 281474976710656, 72057594037927936, 18446744073709551616, 4722366482869645213696, 1208925819614629174706176, 309485009821345068724781056
			 */
			 
			//
			return (array[index + 3] * numberCValue(16777216) + array[index + 2] * numberCValue(65536) + array[index + 1] * numberCValue(256) + array[index + 0]);
		},
		readBigEndian: function(array, index) {
			/***
			 * MSB (Most Significant Byte)
			 * 0x12, 0x34, 0x56, 0x78...
			 */
			return (array[index + 0] * numberCValue(16777216) + array[index + 1] * numberCValue(65536) + array[index + 2] * numberCValue(256) + array[index + 3]);
		},
		generateCode: function (target, type, content) {
			var src = "";
			switch (type) {
			case "a":
				src = '<a href="' + target + '">' + content + '</a>';
				break;
			case "button":
				src = '<input type="button" value="' + content + '">' + target + '</input>';
				break;
			case "range":
				src = '<input type="range" value="' + content + '">' + target + '</input>';
				break;
			case "text":
				src = '<input type="text" value="' + content + '">' + target + '</input>';
				break;
			case "textarea":
				src = '<input type="textarea" value="' + content + '">' + target + '</input>';
				break;
			case "audio":
				src = '<audio src="' + target + '" controls></audio>';
				break;
			case "img":
				src = '<img src="' + target + '"></img>';
				break;
			case "embed":
				src = '<embed src="' + target + '"></embed>';
				break;
			case "video":
				src = '<video src="' + target + '" controls></video>';
				break;
			}
			return src;
		},
		isWheelExists: function() {
			document.onmousewheel !== undefined ?  'mousewheel' : 'DOMMouseScroll';
			if(document.onmousewheel !== undefined){
				return true;
			}
			
			return 'onwheel' in document.createElement('div') ? true : false;
		},
		generateMultimediaCode: function (file, type) {
			var src = "";
			switch (type) {
			case "audio":
				src = '<audio src="' + file + '" controls></audio>';
				break;
			case "img":
				src = '<img src="' + file + '"></img>';
				break;
			case "embed":
				src = '<embed src="' + file + '"></embed>';
				break;
			case "video":
				src = '<video src="' + file + '" controls></video>';
				break;
			}
			return src;
		},
		getRoot: function () {
			return document.documentElement;
		},
		clone: function ($element) {
			return $element.clone();
		},
		getSpecificType: function (type) {
			return $(document.activeElement).is(type);
		},
		getParents: function (el) {
			var parents = [];
			var p = el.parentNode;
			while (p !== document) {
				var o = p;
				parents.push(o);
				p = o.parentNode;
			}
			return parents;
		},
		findClass: document.getElementsByClassName
		? (function (cls, context) {
			return protoArr.slice.call((context || document).getElementsByClassName(cls));
		})
		: (function (cls, context) {
			var nodes = [];
			
			if (!cls) {
				return nodes;
			}
			
			var targets = (context || document).getElementsByTagName('*'),
				tokens = cls.split(' '),
				tn = tokens.length;
				
			for (var i = 0, n = targets.length; i < n; i++) {
				
				var targetClass = targets[i].className,
					hasToken = true;
					
				if (!targetClass) {
					continue;
				}
				
				for (var j = tn; j--;) {
					if (!new RegExp('(^|\\s)' + tokens[j] + '(\\s|$)').test(targetClass)) {
						hasToken = false;
						break;
					}
				}
				
				if (hasToken) {
					nodes.push(targets[i]);
				}
			}
			return nodes;
		}),
		addClass: function (element, className) {
			if (element.classList) {
				element.classList.add(className);
			} else {
				element.className += ' ' + className;
			}
		},
		checkClass: function (element, className) {
			var name = element.className;
			var reg = new RegExp(className, 'g');
			return reg.test(name);
		},
		removeClass: function (element, className) {
			if (element.classList) {
				element.classList.remove(className);
			} else {
				var name = element.className;
				var reg = new RegExp('[\\s\\u00A0\\u3000]*' + className + '[\\s\\u00A0\\u3000]*', 'g');
				element.className = name.replace(reg, ' ').replace(/[\s\u00A0\u3000]*$/, '');
			}
		},
		hasClasses: function (elem, className) {
			return elem.className.split(' ').indexOf(className) > -1;
		},
		/**
		 * Get Text Node
		 * @param {node} : element name
		 **/
		getTextNode: function (elem) {
			var textNode = _cDoc.createTextNode(elem);
			return textNode;
		},
		/**
		 * Get Object Rectangle Size
		 * @param {scope} : element
		 **/
		getRectangle: function (scope) {
			return {
				'offset_left': $(scope).offset().left || 0,
				'offset_top': $(scope).offset().top || 0,
				'position_left': $(scope).position().left || 0,
				'position_top': $(scope).position().top || 0,
				'width': $(scope).width() || 0,
				'height': $(scope).height() || 0
			};
		},
		getBasenamebyID: function (id) {
			return document.getElementById(id).value.split(/(\\|\/)/g).pop();
		},
		appendElement: function (id, type, callback) {
			var ul = document.getElementById(id);
			var li = document.createElement(type);
			
			if($.core.Validate.isFunc(callback)){
				callback(li);
			}
			
			ul.appendChild(li);
		},
		appendText: function (id, txt, callback) {
			this.appendElement(id, 'a', function (attr){
				if($.core.Validate.isFunc(callback)){
					callback(attr);
				}
				
				attr.appendChild(document.createTextNode(txt));
			});
		},
		appendDiv: function (dom, cls) {
			if ($.core.Validate.isObject(dom)) {
				dom = dom.id || dom.className;
			}
			
			if (dom.match(/^#(.*)/)) {
				dom = $.core.Element.getById(dom);
			} else if (dom.match(/^\.(.*)$/)) {
				dom = dom.replace(/(^.)/i, "");
				dom = $.core.Element.getByClass(document, dom, dom);
			} else if (!$.core.Validate.isObject(dom)) {
				dom = $.core.Element.getById(dom);
			}
			
			if ($(dom).length > 0) {
				var append = this.create('div');
				append.className = cls;
				dom.appendChild(append);
				return append;
			}
		},
		addDivOnBody: function (cls) {
			var docFrag = this.createFragment();
			var container = this.create('div');
			
			container.className = cls;
			docFrag.appendChild(container);
			document.body.appendChild(docFrag);
			
			return container;
		},
		getObjectType: function (target) {
			try {
				switch (typeof target) {
				case "undefined":
					return null;
				case "object":
					return target;
				default:
					return document.getElementById(target)
				}
			} catch (e) {
				return null;
			}
		},
		getWithNumberKeyCode: function(keyCode){
			if((keyCode > 47 && keyCode < 58) || (keyCode > 95 && keyCode < 106) || keyCode == 46 || keyCode == 39 || keyCode == 37 || keyCode == 9 || keyCode == 8){
				return true;
			}
			
			return false;
		},
		getKeyCodeType: function (keyCode){
			//48 ~ 57
			if(keycode > 47 && keycode < 58){
				return 'NUM';
			//65 ~ 90
			}else if(keycode > 64 && keycode < 91){
				return 'ALPHABET_LOWER';
			//96 ~ 105
			}else if(keycode > 95 && keycode < 106){
				return 'KEYPAD_NUM';
			//112 ~ 123
			}else if(keycode > 111 && keycode < 124){
				return 'FNKEY';
			}
		},
		getKeyDownCode: function (keyCode) {
			return keydownKeycode[keyCode];
		},
		forceChange: function ($element, $content) {
			$($element).text($content);
			if ($($element).text() == $content) {
				return true;
			}
			
			$($element).html($content);
			if ($($element).html() == $content) {
				return true;
			}
			
			$($element).val($content);
			if ($($element).val() == $content) {
				return true;
			}
			
			return false;
		},
		removeAttr: function (element, attributes) {
			for (var attr in attributes) {
				if (attributes.hasOwnProperty(attr)) {
					continue;
				}
				
				element.removeAttribute(attr, attributes[attr]);
			}
		},
		setAttrs: function (element, attributes) {
			for (var attr in attributes) {
				if (!attributes.hasOwnProperty(attr)) {
					continue;
				}
				
				element.setAttribute(attr, attributes[attr]);
			}
		},
		/**
		 * Get inner width in document
		 *
		 * @return <Integer>
		 **/
		getInnerWidth: function () {
			if (document.compatMode == 'CSS1Compat' && document.documentElement && document.documentElement.clientWidth) {
				return document.documentElement.clientWidth;
			} else if (document.documentElement && document.documentElement.clientWidth) {
				return document.documentElement.clientWidth;
			} else if (document.body && document.body.clientWidth) {
				return document.body.clientWidth;
			} else if (typeof (_cWin.innerWidth) != "undefined") {
				$.core.Base.resetWinCache();
				return _cWin.innerWidth;
			} else {
				return screen.width;
			}
		},
		/**
		 * Get inner height in document
		 *
		 * @return <Integer>
		 **/
		getInnerHeight: function () {
			if (document.documentElement && document.documentElement.clientHeight) {
				return document.documentElement.clientHeight;
			} else if (document.body && document.body.clientHeight) {
				return document.body.clientHeight;
			} else if (typeof (_cWin.innerHeight) != "undefined") {
				$.core.Base.resetWinCache();
				return _cWin.innerHeight;
			} else {
				return screen.height;
			}
		},
		getScrollTop: function () {
			if (typeof (_cWin.pageYOffset) != "undefined") {
				$.core.Base.resetWinCache();
				return _cWin.pageYOffset;
			} else if (document.documentElement) {
				return document.documentElement.scrollTop;
			} else if (document.body) {
				return document.body.scrollTop;
			}
		},
		getScrollLeft: function () {
			if (document.documentElement) {
				return document.documentElement.scrollLeft;
			} else if (document.body) {
				return document.body.scrollLeft;
			}
		},
		getWidth: function (element) {
			return $(element).width();
		},
		getHeight: function (element) {
			return $(element).height();
		},
		getOffset: function (element) {
			var offset = {
				"left": element.offsetLeft,
				"top": element.offsetTop
			};
			
			while (o = element.offsetParent) {
				offset.left += o.offsetLeft;
				offset.top += o.offsetTop;
			}
			
			return offset;
		},
		getImgPosition: function (element) {
			if (!element) {
				return {
					"realOffset": 0,
					"correctOffset": 0
				};
			}
			
			var offset = this.getOffset(element);
			var real = parseInt(offset.top, 10);
			var currect = parseInt(real - defScreenHeight * 0.1);
			
			return {
				"realOffset": real,
				"correctOffset": currect
			};
		},
		getLeft: function (element) {
			return $(element).offset().left;
		},
		getTop: function (element) {
			return $(element).offset().top;
		},
		getByTag: function (tag) {
			return document.getElementsByTagName(tag);
		},
		getById: function (id) {
			if (typeof (id) != 'string'){
				return id;
			}
			
			var elem = null;
			
			try {
				elem = document.getElementById(id);
			} catch (e) {
				console.log(e);
			}
			
			return elem;
		},
		getinnerHTML: function (element) {
			return element.innerHTML;
		},
		getByClass: function (elem, tagName, className) {
			var cls = this.getByClasses(tagName);
			this.length = cls.length;
			
			for (var i = 0; i < this.length; i++) {
				if ((new RegExp(className)).test(cls[i].className)) {
					return cls[i];
				}
			}
			
			return null;
		},
		getByClasses: function (cls, elem) {
			var elem = elem || document;
			return elem.getElementsByClassName(cls);
		},
		getClassCount: function (cls) {
			return this.getByClasses(cls).length;
		},
		setAllInnerHTMLbyClass: function (cls, html) {
			var _target = this.getByClasses(cls);
			var _length = this.getClassCount(cls);
			
			for (var i = 0; i < _length; i++) {
				_target[i].innerHTML = html;
			}
		},
		setIframeToggleMute: function (id) {
			var browser = document.querySelector(id);
			var request = browser.getMuted();
			
			request.onsuccess = function() {
				if(request.result) {
					browser.unmute();
				} else {
					browser.mute();
				}
			}
		},
		setinnerHTML: function (element, html) {
			element.innerHTML = html;
		},
		isSelectedType: function (type) {
			if ($(this.getSelected()).is(type)) {
				return true;
			}
			
			return false;
		},
		getSelected: function () {
			return document.activeElement;
		},
		createEvent: function (event) {
			return document.createEvent(event);
		},
		create: function (element) {
			return document.createElement(element);
		},
		createNS: function () {
			return document.createElementNS || document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
		},
		createFragment: function (element) {
			return document.createDocumentFragment();
		},
		setStyles: function (element, props) {
			var props = props || {};
			
			for (var prop in props) {
				element.style[prop] = props[prop];
			}
		}
	};
})(jQuery, $.core);

//Event-related functions
(function($, core) {

	var A = core.Evt = {
		getCallerScriptPath: function() {
			var scriptPath = '';
			
			try {
				throw new Error();
			}catch(e) {
				var stack = e.stack.split('\n');
				var index = 0;
				for(var i in stack){
					if(!stack[i].match(/http[s]?:\/\//)) continue;
					index = Number(i) + 2;
					break;
				}
			}
			
			return stack;
		},
		onBackSpaceClick: function (callback) {
			$(document).keydown(function(e){
				if (e.target.nodeName != "INPUT" && e.target.nodeName != "TEXTAREA") {    
					if(e.keyCode === 8){
						callback();
					}
				}
			});
		},
		addClickHandler: function (callback, chkRegEx) {
			var links = document.body.getElementsByTagName("A");
			var length = links.length;
			for (var i = 0; i < length; i++) {
				var link = links[i];
				var href = null;
				
				try {
					href = link.href;
				} catch (e){
					console.log(e);
				}
				
				if (!href) {
					continue;
				} else if(chkRegEx) {
					if(href.match(chkRegEx)) continue;
				}
				
				if (link.attachEvent) {
					link.attachEvent("onclick", this.onClickHandler(event, callback));
				} else { 
					link.addEventListener('click', this.onClickHandler(event, callback), false);
				}
			}
		},
		onClickHandler: function (event, callback) {
			var link = this.getEventSource(event);
			
			while (link && link.tagName != "A") {
				link = link.parentNode;
			}
			
			if (!link){
				return;
			}
			
			callback(window, {'href':link.href,'title':link.title});
		},
		getEventSource: function (event) {
			try {
				var obj = event.srcElement ? event.srcElement : event.target;
				return obj;
			} finally {
				obj = null;
			}
		},
		iframeOnClick: function (id, callback) {
			document.getElementById(id).contentWindow.document.body.onclick = function(){
				callback();
			};
		},
		normalize: function (event) {
			var eventNormalize = {};
			
			eventNormalize.target = (event.target ? event.target : event.srcElement);
			eventNormalize.which = (event.which ? event.which : event.button);
			
			return eventNormalize;
		},
		isSupport: function (eventName, element) {
			var eventName = 'on' + eventName;
			var isSupported = eventName in element;
			
			return isSupported;
		},
		disableDraggable: function (element) {
			element.draggable = false;
			
			element.onmousedown = function (event) {
				event.preventDefault();
				return false;
			};
		},
		prefixMouseEvent: function (pointerEvent) {
			return _cWin.MSPointerEvent ? 'MSPointer' + pointerEvent.charAt(7).toUpperCase() + pointerEvent.substr(8) : pointerEvent;
		},
		when: function (element, type, fn, condition) {
			var func = function () {
				if (condition()) {
					element.off(type, func);
					fn.apply(this, arguments);
				}
			};
			
			element.on(type, func);
		},
		addNN4EventListener: function (element, event, listener) {
			if (!element.NN4Event) element.NN4Event = {};
			if (!element.NN4Event[event]) element.NN4Event[event] = [];
			
			var event_arr = element.NN4Event[event];
			event_arr[event_arr.length] = listener;
		},
		getNN4Event: function (element, event) {
			if (element.NN4Event && element.NN4Event[event]) {
				var event_arr = element.NN4Event[event];
				this.length = event_arr.length;
				
				for (var i = 0; i < this.length; i++) {
					event_arr[i]();
				}
			}
		},
		addListener: function (element, event, listener) {
			if ($.core.Validate.isNull(element) || $.core.Validate.isUndefined(element) || !$.core.Validate.isObject(element)) {
				return;
			}
			
			if (element.addEventListener) {
				element.addEventListener(event, listener, false);
			} else if (element.attachEvent) {
				element.attachEvent('on' + event, listener);
			} else {
				addNN4EventListener(element, event, listener);
				element['on' + event] = function () {
					getNN4Event(element, event)
				};
			}
		},
		removeEvent: function (element, eventType, fn) {
			if (element.addEventListener) {
				return element.removeEventListener(eventType, fn, false);
			} else if (element.detachEvent) {
				return element.detachEvent("on" + eventType, fn);
			}
		},
		addEventListener: function (element, eventName, handler) {
			if (element.addEventListener) {
				element.addEventListener(eventName, handler);
			} else if (element.attachEvent) {
				element.attachEvent('on' + eventName, function () {
					handler.call(element);
				});
			}
		},
		preventEvent: function (evt) {
			var evt = evt || _cWin.event;
			
			if (evt.preventDefault) {
				evt.preventDefault();
			} else {
				evt.returnValue = false;
				evt.cancelBubble = true;
			}
		},
		onReady: function (doc, callback) {
			var fired = false;
			
			this.addListener(doc, 'DOMContentLoaded', function () {
				if (fired) {
					return;
				}
				fired = true;
				callback();
			});
			
			this.addListener(doc, 'readystatechange', function () {
				if (fired) {
					return;
				}
				if (doc.readyState === 'complete') {
					fired = true;
					callback();
				}
			});
		},
		addNodeEvent: document.addEventListener ? 
			(function (node, type, handler) {
				node.addEventListener(type, handler, false);
			}) : 
			(function (node, type, handler) {
				node.attachEvent('on' + type, handler);
			}),
		removeNodeEvent: document.removeEventListener ? 
			(function (node, type, handler) {
				node.removeEventListener(type, handler, false);
			}) : 
			(function (node, type, handler) {
				node.detachEvent('on' + type, handler);
			}),
		Trigger: function ($elements, $event, $ignore) {
			if ($ignore === true) {
				$($elements).triggerHandler($event);
			} else {
				$($elements).trigger($event);
			}
		},
		loopCallback: function (start, end, callback) {
			for (i = start; i < end; i++) {
				callback();
			}
		},
		getShortCutKeyType: function (event) {
			if ($.core.Browser.isIE()) {
				event = window.event;
				event.target = event.srcElement;
			}
			
			if (event.altKey || event.ctrlKey || event.metaKey) {
				return;
			}
			
			switch (event.target.nodeName) {
				case "INPUT":
				case "SELECT":
				case "TEXTAREA":
					return;
			}
			
			switch (event.keyCode) {
				//return keydownKeycode[event.keyCode];
			}

		},
		Try: function (fn, err) {
			try {
				fn();
				return true;
			} catch (e) {
				err && err(e);
			}
			
			return false;
		},
		exceptionMsg: function ($exception) {
			var error = '';
			for (var i in $exception) {
				error += i + ' : ' + exception[i] + '\n';
			}
			
			alert(error);
		}
	};
})(jQuery, $.core);

//File-related functions
(function($, core) {

	var A = core.File = {
		hasFileUpload: function (){
			return (window.File && window.FileList && window.FileReader)
		},
		hasBlob: function () {
			if (_cWin.Blob) {
				return true;
			}
			
			try {
				return Boolean(new Blob());
			} catch (e) {
				return false;
			}
		},
		getBytes: function (format) {
			var bytes = 0;
			if (format.indexOf('TB') != -1) {
				bytes = parseFloat(format) * (1024 << 30);
			} else if (format.indexOf('GB') != -1) {
				bytes = parseFloat(format) * (1024 << 20);
			} else if (format.indexOf('MB') != -1) {
				bytes = parseFloat(format) * (1024 << 10);
			} else if (format.indexOf('KB') != -1) {
				bytes = parseFloat(format) * 1024;
			} else if (format.indexOf('bytes') != -1) {
				bytes = parseFloat(format);
			} else if (format.indexOf('byte') != -1) {
				bytes = parseFloat(format);
			}
			
			return bytes;
		},
		getSize: function (size) {
			size = size / (1024 << 30);
			if (size >= 1) {
				return getFloat(size, 1) + "TB";
			}
			
			size = size / (1024 << 20);
			if (size >= 1) {
				return getFloat(size, 1) + "GB";
			}
			
			size = size / (1024 << 10); //size = size / (-((-1024)>>>(1024))<<10);
			if (size >= 1) {
				return getFloat(size, 1) + "MB";
			}
			
			size = size / 1024; //size = size / ((-((-10)>>>(10))<<10));
			if (size >= 1) {
				return getFloat(size, 1) + "bytes";
			}
			
			if (size) {
				return size + "byte";
			} else {
				return "0byte";
			}
		},
		getBlob: function () {
			return _cWin.MozBlobBuilder || _cWin.WebKitBlobBuilder || _cWin.BlobBuilder || _cWin.MSBlobBuilder;
		},
		get: function () {
			return _cWin.FileReader;
		},
		getIntArr: function ($signed, $bit, $array) {
			if ($signed == 'uint') {
				switch ($bit) {
				case "8":
					return new Uint8Array($array);
				case "16":
					return new Uint16Array($array);
				case "32":
					return new Uint32Array($array);
				}
			} else if ($signed == 'int') {
				switch ($bit) {
				case "8":
					return new int8Array($array);
				case "16":
					return new int16Array($array);
				case "32":
					return new int32Array($array);
				}
			} else if ($signed == 'float') {
				switch ($bit) {
				case "32":
					return new Float32Array($array);
				case "64":
					return new Float64Array($array);
				}
			}
		},
		readArrBuffer: function (file) {
			var fr = this.get();
			fr.readAsArrayBuffer(file);
		},
		isSupport: function () {
			if (this.get()) {
				return true;
			}
			
			return false;
		}
	};
})(jQuery, $.core);

//Flash-related functions
(function($, core) {

	var A = core.Flash = {
		isSupport: function () {
			try {
				if (new ActiveXObject('ShockwaveFlash.ShockwaveFlash')) return true;
			} catch (e) {
				if (navigator.mimeTypes['application/x-shockwave-flash'] != undefined) return true;
			}
			
			return false;
		},
		getVersion: function () {
			var version, flash;
			
			try {
				flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
				version = flash.GetVariable("$version");
			} catch (e) {}
			
			if (!version) try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
				version = "WIN 6,0,21,0";
				flash.AllowScriptAccess = "always";
				version = flash.GetVariable("$version");
			} catch (e) {}
			
			if (!version) try {
				flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
				version = flash.GetVariable("$version");
			} catch (e) {}
			
			if (!version) try {
				flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
				version = "WIN 3,0,18,0"
			} catch (e) {}
			
			if (!version) try {
				flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				version = "WIN 2,0,0,11"
			} catch (e) {
				version = false;
			}
			
			return version;
		},
		generate: function (file, width, height, id, clsID) {
			if (this.isSupport()) {
				var str = '';
				var cls = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000";
				cls = cls || clsID;
				str += '<object classid="' + cls + '" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="' + width + '" height="' + height + '" id="' + id + '" align="middle">';
				str += '<param name="allowScriptAccess" value="sameDomain" />';
				str += '<param name="quality" value="high" />';
				str += '<param name="movie" value="' + file + '" />';
				str += '<param name="quality" value="high" />';
				str += '<param name=wmode value=transparent>';
				str += '<embed src="' + file + '" quality="high" bgcolor="#000000" width="' + width + '" height="' + height + '"  name="' + id + '" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" wmode="transparent" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
				str += '</object>';
				return str;
			} else {
				return null;
			}
		},
		remove: function (id) {
			var flash = $.core.Element.getById(id);
			
			if (flash && flash.nodeName == "OBJECT") {
				if ($.core.Browser.isIE()) {
					if (obj.readyState == 4) {
						$.core.Element.removeIEObject(id);
					}
				} else {
					flash.parentNode.removeChild(flash);
				}
			}
		}
	};
})(jQuery, $.core);

//gamePad-related functions
(function($, core) {

	var A = core.gamePad = {
		registry: function (callback) {
			var gamepads = this.Get();
			for (var i = 0; i < gamepads.length; i++) {
				if (gamepads[i]) {
					if (!(gamepads[i].index in controllers)) {
						callback(gamepads[i]);
					}
				}
			}
		},
		Get: function () {
			return navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
		},
		addDynamicKeys: function (arr) {
			gamePadDynamicKeys = arr;
		},
		hasEvent: function () {
			var padEvent = 'GamepadEvent' in window;
			
			if (padEvent) {
				return true;
			}
			
			return false;
		},
		getType: function (device) {
			return {
				"index": device.gamepad.index,
				"id": device.gamepad.id,
				"button": device.gamepad.buttons.length,
				"axis": device.gamepad.axes.length
			}
		},
		getAxesArrowIndex: function () {
			var j;
			
			for (j in gamePadControllers) {
				var controller = gamePadControllers[j];
				for (var i = 0; i < controller.axes.length; i++) {
					var val = controller.axes[i];
					if (val > gamePadValue) {
						var arrow = 1;
					} else if (val < -gamePadValue) {
						var arrow = -1;
					} else {
						var arrow = 0;
					}
					if (arrow != 0) {
						var pressed = true;
						if (i <= 1) {
							var pos = -1;
						} else {
							var pos = 1;
						}
					} else {
						var pressed = false;
						var pos = 0;
					}
					if ($.core.Validate.isObject(val)) {
						pressed = val.pressed;
						val = val.value;
					}
					if (pressed == true) {
						return {
							"arrow": arrow,
							"pressed": pressed,
							"pos": pos,
							"key": i
						};
					}
				}
			}
		},
		getPressedIndex: function () {
			var j;
			
			for (j in gamePadControllers) {
				var controller = gamePadControllers[j];
				for (var i = 0; i < controller.buttons.length; i++) {
					var val = controller.buttons[i];
					var pressed = val == 1.0;
					if ($.core.Validate.isObject(val)) {
						pressed = val.pressed;
						val = val.value;
					}
					if (pressed && !$.core.Validate.isUndefined(i) && !$.core.Arr.Search(gamePadDynamicKeys, i) && controller.buttons[i].pressed == true) {
						if (pressed && pressedGamePadPressedIndex != i) {
							pressedGamePadPressedIndex = i;
							return i;
						}
					} else if (pressed) {
						pressedGamePadPressedIndex = i;
						return i;
					}
				}
			}
		},
		destroy: function (gamepad) {
			delete gamePadControllers[gamepad.index]; //Remove Array
		},
		addKey: function (key, value) {
			gamePadControllers[key] = value;
		},
		isConnected: function () {
			var gp = this.Get()[0];
			
			if ((gp)) {
				if (gp.connected && this.hasEvent()) return true;
			}
			
			return false;
		},
		isKeyExists: function () {
			if (this.Get()) {
				return true;
			}
			
			return false;
		},
		isButtonPressed: function (index) {
			if (self.isConnected() && self.isKeyExists()) {
				var gp = this.Get()[0];
				if (gp.buttons[index] == 1 && gp.buttons[index].pressed) {
					return true;
				}
				
				return false;
			}
		}
	};
})(jQuery, $.core);
(function($, core) {

	var A = core.Generator = {
		get: function () {
			var uI = (unicodeImoticon);
			return uI;
		},
		getItem: function (name) {
			var uI = (unicodeImoticon);
			
			if(typeof uI[name] === undefined){
				return null;
			}
			
			return uI[name];
		}
	};
})(jQuery, $.core);
//Generator-related functions
(function($, core) {

	var A = core.Generator = {
		uniqueRandIterators: function* (min, max, length) {
			var str = $.core.Str.getUniqueRand(min, max, length);
			var idx = 0;
			
			while (idx < str.length) {
				yield str[idx++];
			}
		},
		uniqueStrIterators: function* (length) {
			var str = $.core.Str.randomStr(length);
			var idx = 0;
			
			while (idx < str.length) {
				yield str[idx++];
			}
		},
		getUniqueNum: function (min, max, length) {
			IteratorsTemp = this.uniqueRandIterators(min, max, length);
		},
		getUniqueStr: function (length) {
			IteratorsTemp = this.uniqueStrIterators(length);
		},
		getNext: function () {
			return IteratorsTemp.next().value;
		}
	};
})(jQuery, $.core);

//GEO-related functions
(function($, core) {

	var A = core.GEO = {
		isSupport: function () {
			return (navigator.geolocation) ? true : false;
		},
		Get: function () {
			if (!this.isSupport()) return;
			
			var options = {
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0
			};
			
			_cNavi.geolocation.getCurrentPosition(geoSuccess, geoError, options);

			function geoSuccess(pos) {
				return pos.coords;
			}

			function geoError(err) {
				return err;
			}
		}
	};
})(jQuery, $.core);

//Google-related functions
(function($, core) {

	var A = core.Google = {
		/**
		 * Check Website has Google Adsence
		 *
		 * @return {boolean}
		 **/
		hasAdsence: function () {
			if ($('ins.adsbygoogle').length) {
				return true;
			}
			
			return false;
		},
		/**
		 * Check Website has Google Analytics
		 *
		 * @return {boolean}
		 **/
		hasAnalytics: function () {
			if (window.ga) {
				return true;
			}
			
			return false;
		},
		/**
		 * Send Authentication Key to Google Adsence
		 * @param {key}	: Authentication key
		 **/
		sendAdsence: function (key) {
			(adsbygoogle = window.adsbygoogle || []).push({});
			(adsbygoogle = window.adsbygoogle || []).push({
				google_ad_client: key,
				enable_page_level_ads: true
			});
		},
		/**
		 * Send Authentication Key to Google Analytics
		 * @param {key}	: Authentication key
		 **/
		sendAnalytics: function (key) {
			(function (i, s, o, g, r, a, m) {
				i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
					(i[r].q = i[r].q || []).push(arguments)
				}, i[r].l = 1 * new Date(); a = s.createElement(o),
				m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
			})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

			ga('create', key, 'auto');
			ga('send', 'pageview');
		}
	};
})(jQuery, $.core);

//ID3-related functions
(function($, core) {

	var A = core.ID3 = {
		isHasHeader: function (data /* Uint8Array */, offset, type) {
			if(type === 'footer') {
				if (data[offset] === asciiHex['3'] && data[offset + 1] === asciiHex['D'] && data[offset + 2] === asciiHex['I']) {
					return true;
				}
			} else if (data[offset] === asciiHex['I'] && data[offset + 1] === asciiHex['D'] && data[offset + 2] === asciiHex['3']) {
				return true;
			}
			
			return false;
		},
		hasVersion: function (data, offset) {
			if (data[offset + 3] < asciiHex['ÿ'] && data[offset + 4] < asciiHex['ÿ']) {
				return true;
			}
			
			return false;
		},
		isInRange: function (data, offset) {
			if (data[offset + 6] < asciiHex['€'] && data[offset + 7] < asciiHex['€'] && data[offset + 8] < asciiHex['€'] && data[offset + 9] < asciiHex['€']) {
				return true;
			}
			
			return false;
		},
		isHeader: function (data, offset) {
			if (this.isHasHeader(data, offset) && this.hasVersion(data, offset) && this.isInRange(data, offset)) {
				return true;
			}
			
			return false;
		}, 
		skipID3v2Header: function (data, offset) {
			if (this.isInRange(data, offset-6)) {
				var size = 0;
				size = (data[offset] & asciiHex['']) << 21; // = * 2097152
				size |= (data[offset + 1] & asciiHex['']) << 14; // = * 16384
				size |= (data[offset + 2] & asciiHex['']) << 7; // = * 128
				size |= data[offset + 3] & asciiHex[''];
				return size;
			}
		}
	};
	
})(jQuery, $.core);

//JSON-related functions
(function($, core) {

	var A = core.JSON = {
		isSupport: function () {
			if ("JSON" in window) {
				return true;
			}
			
			return false;
		},
		autoDecode: function (str) {
			if (str === null) {
				return 'null';
			}
		
			if (this.isSupport()) {
				if (this.isJSON(str)) {
					return this.decode(str);
				} else {
					var _eval = this.SecureEvalJSON(str);
					if(!_eval) {
						return str;
					}
					
					return _eval;
				}
			} else {
				return str;
			}
		},
		SecureEvalJSON: function (str){
			if (str) {
				var _secure =
					str.replace( /\\["\\\/bfnrtu]/g, '@' )
					.replace( /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
					.replace( /(?:^|:|,)(?:\s*\[)+/g, '');
					
				if(/^[\],:{}\s]*$/.test(_secure)) {
					return eval('(' + str + ')');
				} else {
					return false;
				}
			} else {
				return false;
			}
		},
		strToJSON: function (str) {
			return JSON.parse(eval(str)[0]);
		},
		ConverToStr: function (obj) {
			var result = "";
			
			if (typeof JSON != "undefined") {
				result = self.stringify(obj);
			} else {
				var arr = [];
				for (var i in obj) {
					arr.push("'" + i + "':'" + obj[i] + "'");
				}
				result = "{" + arr.join(",") + "}";
			}
			
			return result;
		},
		isJSON: function (m) {
			if ($.core.Validate.isObject(m)) {
				try {
					m = JSON.stringify(m);
				} catch (err) {
					return false;
				}
			}
			
			if ($.core.Validate.isStr(m)) {
				try {
					m = JSON.parse(m);
				} catch (err) {
					return false;
				}
			}
			
			if (!$.core.Validate.isObject(m)) {
				return false;
			}
			
			return true;
		},
		stringify: function (object) {
			var stringify = JSON.stringify(object);
			
			if (/^[\{\[]/.test(stringify)) {
				return stringify;
			}
			
			return null;
		},
		decode: function (object) {
			if (this.isJSON(object)) {
				return jQuery.parseJSON(JSON.stringify(object));
			} else {
				return object;
			}
		},
		parse: function (object) {
			if (this.isSupport()) {
				if (this.isJSON(object)) {
					return JSON.parse(object);
				} else {
					return object;
				}
			}
		}
	};
})(jQuery, $.core);

//List-related functions
(function($, core) {

	var A = $.core.List = {
		addItem: function (id) {
			var node = document.createElement("LI");
			var text = document.createTextNode(firstname);
			
			node.appendChild(text);
			document.getElementById(id).appendChild(node);
		},
		setChildrenDraggable: function (elem) {
			[].slice.call(rootEl.children).forEach(function (elem){
				elem.draggable = true;
			});
		}
	};
	
})(jQuery, $.core);

//MediaSource-related functions
(function($, core) {

	var A = core.MediaSource = {
		isSupport: function () {
			return 'MediaSource' in window ? true : false;
		},
		get: function () {
			return new _cWin.MediaSource() || _cWin.webkitMediaSource();
		},
		genKeyRequest: function (target) {
			if (target.webkitGenerateKeyRequest && target.generateKeyRequest) {
				return true;
			}
			
			return false;
		},
		has: function () {
			if (_cWin.MediaSource || _cWin.webkitMediaSource) {
				return true;
			}
			
			var video = $.core.Element.create('video');
			
			if (video.webkitSourceAddId && video.sourceAddId) {
				return true;
			}
			
			return false;
		},
		appendEndStream: function (video) {
			video.webkitSourceEndOfStream(HTMLMediaElement.EOS_NO_ERROR);
		},
		append: function (video, bytes) {
			video.webkitSourceAppend(bytes);
		},
		getUrl: function (video) {
			return video.webkitMediaSourceURL;
		},
		addSrc: function (elem) {
			elem.addSourceBuffer('video/mp4; codecs="avc1.4d401e"');
		}
	};
})(jQuery, $.core);

//Midi-related functions
(function($, core) {

	var A = core.Midi = {
		isSupport: function () {
			if (navigator.requestMIDIAccess) {
				return true;
			}
			return false;
		},
		request: function (onSuccessCallback, onErrorCallback) {
			if (this.isSupport()) {
				navigator.requestMIDIAccess({
					sysex: false
				}).then(onSuccessCallback, onErrorCallback);
			}
		}
	};
})(jQuery, $.core);

//Mobile-related functions
(function($, core) {

	var A = core.Mobile = {
		isRefMobile: function () {
			return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);
		},
		isMobile: function () {
			var filter = "win16|win32|win64|mac|macintel";
			if (navigator.platform) {
				var isMobile = (filter.indexOf(navigator.platform.toLowerCase()) < 0) ? true : false;
			}
			
			var a = _cNavi.userAgent || _cNavi.vendor || _cWin.opera;
			if (/(android|bb\d+|meego).+mobile|avantgo|webos|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
				var _isMobile = true;
			} else {
				var _isMobile = false;
			}
			
			return _isMobile || isMobile;
		},
		isLGUSeries: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if(UserAgent.match("u8[000|110|120|130|180|210|260|330|360|380|500]") || UserAgent.match("u[300|400|830|900|960|990]")){
					return true;
			}
			
			return false;
		},
		isLGGSeries: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if(UserAgent.match("g[1100|1500|1610|1800|3000|3100|4011|4015|4020|4050|5220c|5300|5300i|5310|5400|5500|5600|6070|7000|7020|7030|7050|7100|7200|8000|210|510|510w|650|912]")){
					return true;
			}
			
			return false;
		},
		isGalaxyMega: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if(UserAgent.match("gt-i[9150|9152|9200|9205]")){
					return true;
			}
			
			return false;
		},
		/* Smartphones */
		isGalaxyS: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if(UserAgent.match("gt-i9000[b|m|t|m4]") || UserAgent.match("gt-i9003") || UserAgent.match("gt-i90[09|88]") || UserAgent.match("sch-i[909-919]") || UserAgent.match("sc-02b") || UserAgent.match("shw-m1[10s|30k|30l]")){
					return true;
			}
			
			return false;
		},
		isGalaxySDuos: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if(UserAgent.match("gt-s7562i")){
					return true;
			}
			
			return false;
		},
		isGalaxyII: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if(UserAgent.match("gt-i9100[g|t|m|p]") || UserAgent.match("gt-o9210t") || UserAgent.match("sgh-i[757m|727r|9108|927|929|727|777]") || UserAgent.match("sgh-t[989d|989]") || UserAgent.match("isw11sc") || UserAgent.match("sc-02c") || UserAgent.match("shw-m250[k|l|s]") || UserAgent.match("sph-d710") || UserAgent.match("sch-r989") || UserAgent.match("gt-i9105")) {
				return true;
			}
			
			return false;
		},
		isGalaxyIII: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if(UserAgent.match("gt-i[9300|9300t|9305|905n|9305t|9308|9301l]") || UserAgent.match("shv-e210[k|l|s]") || UserAgent.match("sgh-[t999|t999l|t999v|i747|i747m|n064|n035]") || UserAgent.match("sch-[j021|r530|i535|s960l|s968c|i939]") || UserAgent.match("sc-[03e|06d]") || UserAgent.match("scl21")) {
				return true;
			}
			
			return false;
		},
		isGalaxyS4: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if(UserAgent.match("gt-i[9500|9505|9506|9595g|9508|9502]") || UserAgent.match("shv-e3[00k|00l|00s|30k|30l|30s]") || UserAgent.match("sgh-[i337|m919|n045|i337m|m919v]") || UserAgent.match("sch-[i515|r970|i959|r970x|r970c]") || UserAgent.match("sph-l720") || UserAgent.match("sc-04e")){
					return true;
			}
			
			return false;
		},
		isGalaxyS5: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if(UserAgent.match("sm-g900[h|f|fd|i|k|l|s|m|md|w8|t|t1|a|v|r2|p|6w|8v|9d|d|j]") || UserAgent.match("sc-04f") || UserAgent.match("slc23")){
					return true;
			}
			
			return false;
		},
		isGalaxyS7: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if(UserAgent.match("sm-g930[f|fd|w9|s|k|l|0|v|a|az|p|t|r4|8|u]") || UserAgent.match("sm-g935[0|v|a|p|t|u|r4|f|fd|w8|s|k|l]") || UserAgent.match("sc-02h") || UserAgent.match("scv33")){
					return true;
			}
			
			return false;
		},
		isGalaxyS8: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if(UserAgent.match("sm-g930[f|fd|w9|s|k|l|0|v|a|az|p|t|r4|8|u]") || UserAgent.match("sm-g935[0|v|a|p|t|u|r4|f|fd|w8|s|k|l]") || UserAgent.match("sc-02h") || UserAgent.match("scv33")){
					return true;
			}
			
			return false;
		},
		isGalaxyCore: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if(UserAgent.match("sm-g[350|3502|386f|g360p]") || UserAgent.match("shw-m580d") || UserAgent.match("gt-i8262d") || UserAgent.match("sch-i829")){
					return true;
			}
			
			return false;
		},
		isGalaxyNoteTablet: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if(UserAgent.match("gt-n[5100|5110|5120|8000|8010|8020]") || UserAgent.match("sm-p[600|601|605|900|905]")){
					return true;
			}
			
			return false;
		},
		isGalaxyNotePhabletsLTE: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if(UserAgent.match("gt-n[7005|7105]") || UserAgent.match("sm-n[9005|7505]")){
					return true;
			}
			
			return false;
		},
		isGalaxyNotePhablets3G: function () {
			var UserAgent = _cNavi.userAgent.toLowerCase();
			if(UserAgent.match("gt-n[7000|7100]") || UserAgent.match("sm-n[9000|7500|910g|n915g|n920]")){
					return true;
			}
			
			return false;
		},
		screenEnabled: function () {
			if (_cNavi.mozPower.screenEnabled) {
				return true;
			}
			return false;
		},
		screenBright: function (value) {
			if (this.screenEnabled() == true) {
				_cNavi.mozPower.screenBrightness = value;
			}
		},
		screenUnlock: function () {
			_cNavi.requestWakeLock('screen');
		},
		powerOff: function () {
			_cNavi.mozPower.powerOff();
		}
	};
})(jQuery, $.core);

//Notify-related functions
(function($, core) {

	var A = core.Notify = {
		isSupport: function () {
			if (!("Notification" in window)) {
				return false;
			}
			
			try {
				var notify = _cWin.Notification || _cWin.webkitNotifications || navigator.mozNotification;// || (_cWin.external && _cWin.external.msIsSiteMode() !== undefined);
				if(notify) {
					return true;
				}
			} catch (e) {
				consoel.log(e);
			}
			
			return false;
		},
		/**
		 * Get Permission
		 **/
		getPermit: function () {
			if (_cWin.Notification.permission !== 'denied') {
				_cWin.Notification.requestPermission(function (permission) {});
			} else if (_cWin.webkitNotifications && _cWin.webkitNotifications.checkPermission) {
				_cWin.webkitNotifications.requestPermission();
			}
		},
		/**
		 * Check Permission
		 **/
		getPermitLevel: function () {
			if (_cWin.Notification && _cWin.Notification.permissionLevel) {
				var permit = _cWin.Notification.permissionLevel;
			} else if (_cWin.webkitNotifications && _cWin.webkitNotifications.checkPermission) {
				var permit = Permissions[_cWin.webkitNotifications.checkPermission()];
			} else if (_cWin.Notification && _cWin.Notification.permission) {
				var permit = _cWin.Notification.permission;
			} else if (navigator.mozNotification) {
				var permit = Permission.GRANTED;
			} else if (_cWin.external && _cWin.external.msIsSiteMode() !== undefined) {
				var permit = _cWin.external.msIsSiteMode() ? 'granted' : 'default';
			}
			
			return permit;
		},
		/**
		 * Show Notification
		 * @param {message}         : message
		 * options : body, icon, sound, vibrate: [200, 100, 200], timestamp, silent [bool], requireInteraction: shouldRequireInteraction, lang, dir: 'rtl', data
		 **/
		Show: function (message, icon, body, options) {
			if (this.getPermitLevel() != 'denied') {
				if (_cWin.Notification) {
					if (!options) options = {}
					var notificationHandler = new Notification(message, options);
				} else if (_cWin.webkitNotifications) {
					notificationHandler = _cWin.webkitNotifications.createNotification(icon, title, body);
					notification.show();
				} else if (navigator.mozNotification) {
					notificationHandler = navigator.mozNotification.createNotification(title, body, icon);
					notification.show();
				} else if (_cWin.external && _cWin.external.msIsSiteMode()) {
					_cWin.external.msSiteModeClearIconOverlay();
					_cWin.external.msSiteModeSetIconOverlay(icon, title);
					_cWin.external.msSiteModeActivate();
					notification = {};
				}
			} else {
				this.getPermit();
			}
		}
	};
})(jQuery, $.core);

//OptionList-related functions
(function($, core) {

	var A = core.OptionList = {
		setFocusLastItem: function (target) {
			if (!target) {
				return;
			}
			
			var selected = $(target);
			$(selected).children(':last-child').prop('selected',true);
		},
		getLength: function (target) {
			return $("#" + target + " option").length || document.getElementById(target).options.length;
		},
		addItme: function (target, value, html) {
			var opt = document.createElement('option');
			opt.value = value;
			opt.innerHTML = html;
			document.getElementById(target).appendChild(opt);
		},
		setSelectedItemText: function (target, text) {
			if (!target || !text) {
				return;
			}
			
			$(target).find(':selected').text(text);
		},
		moveSelectedItem: function (target, dest) {
			if (!target || !dest) {
				return;
			}
			
			$(target).find(':selected').appendTo(dest);
		},
		moveAllItem: function (target, dest) {
			if (!target || !dest) {
				return;
			}
			
			$(target).children().appendTo(dest);
		},
		moveItemTop: function (target) {
			if (!target) {
				return;
			}
			
			var selected = $(target).find(':selected');
			
			if (selected.length) {
				selected.parent().prepend(selected);
			}
		},
		moveItemBottom: function (target) {
			if (!target) {
				return;
			}
			
			var selected = $(target).find(':selected');
			
			if (selected.length) {
				selected.parent().append(selected);
			}
		},
		moveItemUp: function (target) {
			if (!target) {
				return;
			}
			
			var selected = $(target).find(':selected');
			
			if (selected.length) {
				selected.first().prev().before(selected);
			}
		},
		moveItemDown: function (target) {
			if (!target) {
				return;
			}
			
			var selected = $(target).find(':selected');
			
			if (selected.length) {
				selected.last().next().after(selected);
			}
		}
	};
})(jQuery, $.core);

//Popup-related functions
(function($, core) {

	var A = core.Popup = {
		/**
		 * Open Popup Windows
		 * @param {url} 	  : Request URL
		 * @param {width}  : Windows Width
		 * @param {height} : Windows Height
		 * @param {p_top}  : Top Position
		 * @param {p_left} : Left Position
		 **/
		Open: function (url, width, height, p_top, p_left) {
			if (this.Enabled()) {
				popup = _cWin.open(url, 'popup', 'top=' + p_top + ',left=' + p_left + ',width=' + width + 'px,height=' + height + 'px,status=no,scrollbars=no,toolbar=no,resizable=no,scrollbars=no,location=no');
			}
		},
		openLink: function (link) {
			if (link) {
				var url = link.getAttribute("href");
				if (url) {
					return window.open(url);
				}
			}
		},
		/**
		 * Open Circle Popup Windows
		 * @param {href}        : Request URL
		 * @param {circleSize}  : Circle Windows Size
		 **/
		openCircle: function (href, circleSize) {
			$.core.Popup.Open(href, circleSize, circleSize, parseInt(($.core.Element.getInnerHeight() / 2) - parseInt(circleSize / 2), 10), parseInt(($.core.Element.getInnerWidth() / 2) - parseInt(circleSize / 2), 10));
		},
		/**
		 * Return Popup is Enabled
		 */
		Enabled: function () {
			var vPopup = _cWin.open('about:blank', 'win', 'width=1, height=1, scrollbars=yes, resizable=yes');
			var isDisabled = !vPopup || vPopup.closed || typeof vPopup.closed == 'undefined';
			
			if (!isDisabled) {
				vPopup.close();
			}
			
			return isDisabled ? false : true;
		},
		closeSelf: function () {
			open(location, '_self').close();
		},
		/**
		 * Close Popup
		 */
		Close: function () {
			if ($.core.Validate.isObject(popup)) {
				popup.close();
			}
		}
	};
})(jQuery, $.core);

//Promise-related functions
(function($, core) {

	var A = core.Promise = {
		RequestHanlder: function (request) {
			return new Promise(function (resolve, reject) {
				request.onsuccess = function () {
					resolve(request.result);
				},
				request.onerror = function () {
					reject(request.error);
				};
			});
		},
		RequestCall: function (obj, method, args) {
			var request;
			var p = new Promise(function (resolve, reject) {
				request = obj[method].apply(obj, args);
				this.RequestHanlder(request).then(resolve, reject);
			});

			p.request = request;
			
			return p;
		}
	};
})(jQuery, $.core);

//Request-related functions
(function($, core) {
	var A = core.Request = {
		getCharSet: function () {
			return document.characterSet || document.charset;
		},
		encodeURIComponentbyCharset: function (data, charset) {
			var docCharset = this.getCharSet();
			var charset = charset.toLowerCase();
			if (docCharset.toLowerCase() == charset) {
				return encodeURIComponent(data);
			}
			return data;
		},
		getActiveXObject: function () {
			return _cWin.ActiveXObject;
		},
		getLocation: function () {
			return document.location;
		},
		getProtocol: function () {
			return document.location.protocol;
		},
		isSSL: function () {
			return /^ssl./i.test(document.location.host);
		},
		/**
		 * Change HTTP Protocol to HTTPS
		 **/
		inSSL: function () {
			if (this.getProtocol() == 'http:') {
				document.location.href = document.location.href.replace('http:', 'https:');
			}
		},
		/**
		 * Change HTTPS Protocol to HTTP
		 **/
		outSSL: function () {
			if (this.getProtocol() == 'https:') {
				document.location.href = document.location.href.replace('https:', 'http:');
			}
		},
		isOnBeforeUnload: function () {
			return _cWin.onbeforeunload;
		},
		/**
		 * Parse URL for Get URL Parameter 
		 * @param {url}	: URL
		 *
		 * @return {object}
		 **/
		parseUrl: function (url) {
			var a = document.createElement('a');
			a.href = url;
			
			return {
				source: url,
				protocol: a.protocol.replace(':', ''),
				host: a.hostname,
				prot: a.port,
				query: a.search,
				hash: a.hash.replace('#', ''),
				path: a.pathname.replace(/^([^\/])/, '/$1'),
				segments: a.pathname.replace(/^\//, '').split('/'),
				params: (function () {
					var ret = {},
						seg = a.search.replace(/^\?/, '').split('&'),
						len = seg.length,
						i = 0,
						s;
					for (; i < len; i++) {
						if (!seg[i]) {
							continue;
						}
						s = seg[i].split('=');
						ret[s[0]] = s[1];
					}
					return ret;
				})()
			}
		},
		isCachedRequest: function (type) {
			return (/^(GET|HEAD|POST|PATCH)$/.test(type))
		},
		isSafeRequest: function (type) {
			//These HTTP methods do not require CSRF Token
			return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(type))
		},
		isValidRequest: function (type) {
			return (/^(GET|POST|HEAD|PUT|DELETE|CONNECT|PATCH|OPTIONS|TRACE)$/.test(type))
		},
		getScript: function (script) {
			$.getScript(script);
		},
		getReadyStatus: function () {
			return document.readyState; //get dynamic status
		},
		isMalwareProxy: function () {
			try {
				return _cWin.location.host.endsWith(".duapp.com") || _cWin.location.host.endsWith(".25lm.com")
			} catch (e) {
				return !1
			}
		},
		/**
			$.Request.isUrlExists(href, function (success) {
					if (success) {
						alert('success');
					} else {
						alert('failed');
					}
			})
			
		 * Check Url is Exist
		 * @param {url}        : url
		 * @param {callback}   : Callback
		 **/
		isUrlExists: function (url, callback) {
			if (!$.core.Validate.isFunc(callback)) {
				throw Error('callback is not function');
			} else {
				$.ajax({
					type: 'HEAD',
					url: url,
					success: function () {
						$.proxy(callback, this, true);
					},
					error: function () {
						$.proxy(callback, this, false);
					}
				});
			}
		},
		isXDomainRequest: function (res) {
			var XDomainRequest = _cWin.XDomainRequest;
			return XDomainRequest && res instanceof XDomainRequest;
		},
		runCustomCallback(id, prefix, args){
			if ($.core.Validate.isFunc(customCallbacks[id][prefix])) {
				customCallbacks[id][prefix].call(this, args);
			}
		},
		addRequireCSS: function (css) {
			requireCSS.push(css);
			$.core.Element.setCSS(css);
		},
		addRequireJS: function (js) {
			requireJS.push(js);
			$.core.Element.setJS(js);
		},
		addRewriteParams(){
			//rewriteRegister
		},
		/**
		 * add Ajax Sucess Callback
		 * @param {id}        : id
		 * @param {callback}  : Callback
		 **/
		addCustomCallback: function (id, prefix, callback) {
			if (!$.core.Validate.isUndefined(customCallbacks[id])) {
				$.log(id + ' ajax callback is exists');
				customCallbacks[id] = {};
			}
			
			if ($.core.Validate.isFunc(callback)) {
				customCallbacks[id][prefix] = callback;
			}
			
			return this;
		},
		/**
		 * add Ajax Sucess Callback
		 * @param {id}        : id
		 * @param {callback}  : Callback
		 **/
		addAjaxCallback: function (id, callback) {
			var callerScript = $.core.Evt.getCallerScriptPath();
			callerScript = callerScript[3];
			
			var host = location.hostname;
			var protocol = location.hostname == 'localhost' ? '' : document.location.protocol + '//';
			var domain = protocol + host;
			var regex = new RegExp(domain + '\/.*.js', "i");
			var isSafeCaller = regex.test(callerScript);
			
			if(!isSafeCaller) {
				console.log('do not allow fix the script ' + callerScript);
				return;
			}
			
			if(jQuery.isReady) {
				console.log('do not allow add ajax callback on document ready');
				return;
			}
			
			if (!$.core.Validate.isUndefined(ajaxCallbacks[id])) {
				$.log(id + ' ajax callback is exists');
			}
			
			if ($.core.Validate.isFunc(callback)) {
				ajaxCallbacks[id] = callback;
			}
			
			return this;
		},
		/**
		 * add Ajax Fail Callback
		 * @param {id}        : id
		 * @param {callback}  : Callback
		 **/
		ajaxFailCallbacks: function (id, callback) {
			if (!$.core.Validate.isUndefined(ajaxCallbacks[id])) {
				$.log(id + ' ajax fail callback is exists');
			}
			
			if ($.core.Validate.isFunc(callback)) {
				ajaxFailCallbacks[id] = callback;
			}
			
			return this;
		},
		/**
		 * Convert file to blob by url
		 * @param {url}       : Link
		 * @param {callback}  : Callback
		 **/
		getBlobDataXhr: function (url, callback) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.responseType = 'blob';
			xhr.onload = function (e) {
				if (this.status == 200) {
					var blob_data = $.core.URL.createObject(this.response);
					return callback(blob_data);
				}
			};
			
			xhr.send();
		},
		/**
		 * Convert file to base64 by url
		 * @param {url}       : Link
		 * @param {callback}  : Callback
		 **/
		getBase64DataXhr: function (url, callback) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.responseType = 'arraybuffer';
			xhr.onload = function (e) {
				if (this.status == 200) {
					var binaryArr = new Array(i);
					var uInt8Array = new Uint8Array(this.response);
					var i = uInt8Array.length;
					while (i--) binaryArr[i] = String.fromCharCode(uInt8Array[i]);
					var data = binaryArr.join('');
					var base64 = _cWin.btoa(data);
					return callback(base64);
				}
			};
			
			xhr.send();
		},
		/**
		 * Get Url Aux
		 * @param {url} : URL
		 **/
		getAux: function (url) {
			return url.indexOf("?") == -1 ? aux = "?" : aux = "&";
		},
		/**
		 * Get URL Response
		 * @param {url}	      : POST URL Parameter
		 * @param {content}	  : POST Content Parameter
		 *
		 * @return {array}
		 **/
		getReponse: function (url, content) {
			var result = new Array;
			var aux = this.getAux(url);
			var xhr = (document.body, this.createXhrObject());
			
			xhr.open("POST", url + aux + "time=" + (new Date).getTime(), false);
			typeof (content == 'undefined') ? content = "" : xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send(content);
			
			if ($.core.Browser.isSafari() || $.core.Browser.isOpera()) {
				resultNodes = xhr.responseXML.firstChild.childNodes;
				for (var i = 0; i < resultNodes.length; i++) {
					null != resultNodes.item(i).firstChild && (result[resultNodes.item(i).nodeName] = resultNodes.item(i).firstChild.nodeValue);
				}
				return result;
			}
		},
		/**
		 * Get XMLHttpRequest Handler
		 * @return {object} : ActiveXObject
		 **/
		getXMLHttp: function () {
			if ($.core.Request.getActiveXObject()) {
				var ActiveXList = [
					listMSXML2
				];
			} else if (_cXMLHttpRequest) {
				var ActiveXList = [
					listXMLHTTP
				];
			}
			
			this.length = ActiveXList.length;
			
			for (var i = 0; i < this.length; i++) {
				try {
					var ActiveX = new($.core.Request.getActiveXObject())(ActiveXList[i]);
					return function () {
						if (ActiveX) {
							return ActiveX;
						} else {
							return new($.core.Request.getActiveXObject())(ActiveXList[i]);
						}
					};
				} catch (e) {}
			}
			
			throw new Error('Ajax not supported');
		},
		/**
		 * Return XHR Object
		 *
		 * @return {object} : XHR Object
		 **/
		createXhrObject: function () {
			if (_cWin.XMLHttpRequest) {
				var xhr = new XMLHttpRequest();
			} else if (_cWin.ActiveXObject) {
				var xhr = this.getXMLHttp();
			}
			if ($.core.Validate.isObject(xhr)) {
				return xhr;
			} else {
				return false;
			}
		},
		/**
		 * Append Javascript into Head
		 * @param {type}	  : Bookmark URL
		 * @param {url}	  : Bookmark URL
		 * @param {title} : Bookmark Title
		 **/
		appendJsInstance: function (src) {
			var head = $('head')[0];
			var script = document.createElement('SCRIPT');
			script.src = src;
			script.onload = function() {
				head.removeChild(script);
			}
			
			head.appendChild(script);
		},
		/**
		 * HTTP Object
		 **/
		HTTPObject: function () {
			this.async = false;
			switch (arguments.length) {
				case 0:
					break;
				case 1:
					this.url = arguments[0];
					break;
				case 2:
					this.method = arguments[0];
					this.url = arguments[1];
					this.charset = arguments[2];
				case 3:
					this.async = arguments[2];
				default:
			}
			
			this._request = $.core.Request.createXhrObject();
			
			if (null == this._request){
				return null;
			}
		},
		/**
		 * XMLHttpRequest Call
		 * @param {type}	  : Bookmark URL
		 * @param {url}	  : Bookmark URL
		 * @param {title} : Bookmark Title
		 **/
		xhr: function (type, url, params, async) {
			try {
				var xhr = this.createXhrObject();
				
				if (xhr === false) return;
				
				if (params == "POST") {
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
					xhr.setRequestHeader("Content-length", params.length);
					xhr.setRequestHeader("Access-Control-Allow-Origin", "*.*");
				}
				
				if (!async){
					async = true;
				}
				
				xhr.open(type, url, async);
				xhr.send(params);
				
				if ($.core.Browser.isOpera() || $.core.Browser.isSafari() || $.core.Browser.isGecko()) {
					xhr.onload = function () {
						if (xhr.readyState === 4) {
							if (/^20\d$/.test(xhr.status)) {
								return xhr;
							} else {
								alert(ResponseCode[xhr.status] + ' : ' + xhr.statusText);
							}
						}
					};
				} else {
					xhr.onreadystatechange = function () {
						if (xhr.readyState === 4) {
							if (/^20\d$/.test(xhr.status)) {
								return xhr;
							} else {
								alert(ResponseCode[xhr.status] + ' : ' + xhr.statusText);
							}
						}
					};
				}
				
				
			} catch (e) {
				console.log(e)
			}
		},
		sendMessage: function (id, msg, url) {
			try{
				var _window = document.getElementById(id).contentWindow;
				_window.postMessage(msg, url);
			}catch(e){
				console.log(e);
			}
		},
		_ajax: function () {
			defaultHeaders = {
				contentType: 'application/x-www-form-urlencoded',
				accept: {
					'*': 'text/javascript, text/html, application/xml, text/xml, */*',
					xml: 'application/xml, text/xml',
					html: 'text/html',
					text: 'text/plain',
					json: 'application/json, text/javascript',
					js: 'application/javascript, text/javascript'
				},
				requestedWith: 'XMLHttpRequest'
			};
		},
		/**
		 * Show wait form when ajax request
		 * @param {message} : Form Message
		 * @param {timeout} : Hide Form Timeout
		 * @param {skin}    : Form Skin
		 **/
		setWaitForm: function (message, timeout, skin) {
			waitForm = $.core.Element.addDivOnBody('waitForm'); //global
			waitformSkin = skin || waitformSkin;
			
			var skingif = waitFormSkin[skin] || waitFormSkin['raindrops'];
			var ajaxAnimate = 'common/libraries/js/coreJS/ajaxloadgif/' + skingif.gif;
			
			if(waitformSkin == 'statusView'){
				$(waitForm)
				.css('position', 'fixed')
				.css('display', 'inline-block')
				.css('top', '0')
				.css('bottom', '0')
				.css('left', '0')
				.css('right', '0')
				.css('border', '2px solid #050a14')
				.css('border-radius', '5px')
				.css('background-color', '#f3f3f3')
				.css('padding', '12px')
				.css('width', skingif.width)
				.css('height', skingif.height)
				.css('margin', 'auto')
				.css('font-weight', 'bold')
				.css('font-size', '15px')
				.css('text-align', 'center')
				.css('color', '#212020')
				.css('opacity', '1')
				.css('-webkit-box-shadow', 'rgba(0, 0, 0, 0.046875) 0px 5px 10px')
				.css('z-index', '0');
				
				var msgcss = 'height:' + skingif.height + ';width:' + skingif.width + ';position:absolute;top:3px;left:3px';
				
				if (message) {
					$(waitForm).html('<img style="' + msgcss + '" src="' + ajaxAnimate + '"/>' + message);
				} else {
					$(waitForm).html('<img style="' + msgcss + '" src="' + ajaxAnimate + '"/>' + _cWin.lang['request']);
				}
			} else if (waitformSkin == 'default'){
				$(waitForm)
				.css('position', 'fixed')
				.css('display', 'inline-block')
				.css('top', '0')
				.css('bottom', '0')
				.css('left', '0')
				.css('right', '0')
				.css('width', skingif.width)
				.css('height', skingif.height)
				.css('margin', 'auto')
				.css('opacity', '1')
				.css('z-index', '9999');
					
				var msgcss = 'height:' + skingif.height + ';width:' + skingif.width + ';';
				
				$(waitForm).html('<img style="' + msgcss + '" src="' + ajaxAnimate + '"/>');
			}
			
		},
		/**
		 * Destroy wait form
		 * @param {timeout} : Hide Form Timeout
		 **/
		destroyWaitForm: function (timeout) {
			$(waitForm).fadeOut(timeout, function () {
				$(this).remove();
				if($('.waitForm').length){
					$('.waitForm').remove();
				}
			});
		},
		workerXHR: function (params, callback, retcallback) {
			loader.postMessage(params);
			loader.onmessage = function (event) {
				callback(event.data, retcallback);
			}
		},
		/**
		 * Ajax Request Call
		 * @param {type} 	 : Request Type
		 * @param {url}	     : Request URL
		 * @param {params}	 : Parameter
		 * @param {callback} : Callback
		 * @param {datatype} : Data Type
		 **/
		ajax: function (type, url, params, callback, datatype, message, userargs) {
			isAjaxProcessing = true; //global
		
			try {
				var _self = this;
				_self.setWaitForm(message);
				var request = $.ajax({
					contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
					cache: true,
					type: type,
					xhrfields : {withCredentials : true}, //CORS
					/*
						* Header Required *
						Access-Control-Allow-Credentials : true
						Access-Control-Allow-Origin : http://localhost
					 */
					url: url,
					async: true, //overlab
					dataType: datatype,
					data: params,
					success: function (args, txtStatus, xhr) {
						if(!callback) return;
						
						if ($.core.Validate.isFunc(ajaxCallbacks[callback])) {
							args = (args === null) ? '' : args;
							args = $.core.JSON.autoDecode(args);
							
							if(userargs){
								args['coreUserObj'] = userargs;
							}
							
							try {
								ajaxCallbacks[callback].call(this, args);
							} catch (e) {}
							
							if (debug === true){
								$.log(ResponseCode[xhr.status]);
							}
							
							_self.destroyWaitForm(waitTimeout);
							
							if(waitformSkin == 'status_viewer'){
								$(waitForm).html(ResponseCode[xhr.status]);
							}
							
							isAjaxProcessing = false;
						}
					},
					error: function (xhr) {
						if ($.core.Validate.isFunc(ajaxFailCallbacks[callback])) {
							ajaxFailCallbacks[callback].call(this, args);
							if (debug === true) $.log(ResponseCode[xhr.status]);
							_self.destroyWaitForm(waitTimeout);
						} else {
							_self.destroyWaitForm(waitTimeout);
							$(waitForm).html(ResponseCode[xhr.status]);
						}
					}
				});
			} catch (e) {
				console.log(e);
			} finally {
				request = null; 
			} 
			
			isAjaxProcessing = false;
		}
	};
	
	/*
	
		var request = new core.Request.HTTPObject("GET", "http://localhost/index.php");
		request.onSuccess = function (){
			console.log(request.getResponse());
		}
		request.send("packet");
		
	*/
	
	$.core.Request.HTTPObject.prototype.onSuccess = function () {}
	$.core.Request.HTTPObject.prototype.onError = function () {}
	
	$.core.Request.HTTPObject.prototype.getResponse = function () {
		return this._request.responseText;
	}
	$.core.Request.HTTPObject.prototype.getResponseXML = function () {
		return this._request.responseXML;
	}
	
	$.core.Request.HTTPObject.prototype.send = function () {
		this._request.open(this.method, this.url, this.async);
		//this._request.setRequestHeader("Referer", location.href);
		var instance = this;
		this._request.onreadystatechange = function () {
			if (instance._request.readyState == 4) {
				instance.onSuccess();
			} else {
				instance.onError();
			}
		}
		if (arguments.length > 0) {
			this.content = arguments[0];
			if (this.content.length > 0) {
				this._request.setRequestHeader("Content-Type", this.contentType);
				this._request.send(this.content);
			}
		}
	}
})(jQuery, $.core);

//Scroll-related functions
(function($, core) {

	var A = core.Scroll = {
		/**
		 * Document Scroll to Top
		 **/
		Top: function () {
			return $(document).scrollTop(0);
		},
		/**
		 * Document Scroll to Bottom
		 **/
		Bottom: function () {
			return $.core.Effect.FocusAnimate($(window).height());
		}
	};
	
})(jQuery, $.core);

//Selector-related functions
(function($, core) {

	var A = core.Selector = {
		first: function (elem) {
			return $(elem + ':first');
		},
		firstChild: function (elem) {
			return $(elem + ':first-child');
		},
		last: function (elem) {
			return $(elem + ':last');
		},
		lastChild: function (elem) {
			return $(elem + ':last-child');
		},
		onlyChild: function (elem) {
			return $(elem + ':only-child');
		},
		child: function (elem, th) {
			if ($.core.Validate.isUndefined(th)) {
				return this._first(elem);
			} else {
				return $(elem + ':nth-child(' + th + ')');
			}
		},
		/**
		 * Every Other
		 **/
		even: function (elem) {
			return $(elem + ':even');
		}
	};
})(jQuery, $.core);

//Session Storage-related functions
(function($, core) {

	var A = core.sessionStorage = {
		isSupport: function () {
			if ($.core.Validate.isUndefined($cache['isSessionStorageSupport'])) {
				this.isSupport = true;
				
				try {
					sessionStorage = window.sessionStorage;
					sessionStorage.setItem('test', 'val');
					sessionStorage.removeItem('test');
				} catch(e) {
					this.isSupport = false;
				}
				
				$cache['isSessionStorageSupport'] = this.isSupport;
			}
			
			return $cache['isSessionStorageSupport'];
		},
		setItem: function (item, value) {
			sessionStroage.setItem(item, value);
		},
		getItem: function (item) {
			sessionStroage.getItem(item);
		},
		removeItem: function (item) {
			sessionStroage.removeItem(item);
		},
		clear: function (item) {
			sessionStroage.clear();
		}
	};
})(jQuery, $.core);

//mediaSession-related functions
(function($, core) {

	var A = core.mediaSession = {
		isSupport: function () {
			if ('createTouch' in document) {
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
		setPlayHandler: function (callback) {
			this.setActionHandler('play', callback);
		},
		setPauseHandler: function (callback) {
			this.setActionHandler('pause', callback);
		},
		setSeekbackwardHandler: function (callback) {
			this.setActionHandler('seekbackward', callback);
		},
		setSeekforwardHandler: function (callback) {
			this.setActionHandler('seekforward', callback);
		},
		setPrevioustrackHandler: function (callback) {
			this.setActionHandler('previoustrack', callback);
		},
		setNextrackHandler: function (callback) {
			this.setActionHandler('nexttrack', callback);
		}
	}
})(jQuery, $.core);

//SimpleCrypto-related functions
(function($, core) {

	var A = core.SimpleCrypto = {
		baseConvert: function(number, frombase, tobase){
			return parseInt(number + '', frombase | 0).toString(tobase | 0);
		},
		numToHex: function (i) {
			if(2147483648 > i) return null; //integer => -2147483648 / 2147483647
			
			var hex = (-i >>> 0);
			hex = this.baseConvert(ac, 10, 16);
			
			return hex;
		},
		hexToNum: function (i) {
			var num = baseConvert(i, 16, 10);
			
			return -(num << 0);
		},
		asciiEncode: function (str, margin) {
			var slen = str.trim().length;
			var ctr = 1;
			var enc = '';
			
			do {
				enc = enc + String.fromCharCode(((str.trim().substr(ctr-1,1)).charCodeAt(0)) + margin);
				ctr = ctr + 1;
			} while (ctr <= slen); 
			
			return enc;
		},
		asciiDecode: function (str, margin) {
			var slen = str.trim().length;
			var ctr = 1;
			var enc = '';
			
			do {
				enc = enc + String.fromCharCode(((str.trim().substr(ctr-1,1)).charCodeAt(0)) - margin);
				ctr = ctr + 1;
			} while (ctr <= slen);
			
			return enc;
		}
	};
})(jQuery, $.core);

//SNS-related functions
(function($, core) {

	var A = core.SNS = {
		getLink: function (href) {
			if (secure_opt) {
				$.core.Request.isUrlExists(href, function (success) {
					if (success) {
						$.core.Popup.openCircle(href, 500);
					} else {
						throw Error('url is not exists (' + href + ')');
					}
				})
			} else {
				$.core.Popup.openCircle(href, 500);
			}
		},
		twitter: function (url, msg) {
			var href = 'http://twitter.com/home?status=' + encodeURIComponent(msg) + ' ' + encodeURIComponent(url);
			this.getLink(href);
		},
		yozm: function (url, title) {
			var href = "http://yozm.daum.net/api/popup/prePost?sourceid=54&link=" + encodeURIComponent(url) + "&prefix=" + encodeURIComponent(title) + "&parameter=";
			this.getLink(href);
		},
		pholar: function (url, title) {
			var href = 'http://www.pholar.co/spi/rephol?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title);
			this.getLink(href);
		},
		line: function (url, title) {
			var href = "http://line.me/R/msg/text/?" + encodeURIComponent(title) + " " + encodeURIComponent(url);
			this.getLink(href);
		},
		naver: function (url, title) {
			var href = 'http://share.naver.com/web/shareView.nhn?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title);
			this.getLink(href);
		},
		band: function (url, title) {
			var href = 'http://band.us/plugin/share?body=' + encodeURIComponent(title) + '  ' + encodeURIComponent(url) + '&route=' + encodeURIComponent(url);
			this.getLink(href);
		},
		pinterest: function (url, image, title) {
			var href = 'http://www.pinterest.com/pin/create/button/?url=' + encodeURIComponent(url) + '&media=' + image + '&description=' + encodeURIComponent(title);
			this.getLink(href);
		},
		naverBlog: function (url, title) {
			var href = 'http://blog.naver.com/openapi/share?url=' + encodeURIComponent(url) + "&title=" + encodeURIComponent(title);
			this.getLink(href);
		},
		kakaoStory: function (url) {
			var href = 'https://story.kakao.com/s/share?url=' + encodeURIComponent(url);
			this.getLink(href);
		},
		googlePlus: function (url) {
			var href = 'https://plus.google.com/share?url=' + encodeURIComponent(url);
			this.getLink(href);
		},
		facebook: function (url, msg) {
			var href = 'http://www.facebook.com/sharer.php?u=' + url + '&t=' + encodeURIComponent(msg);
			this.getLink(href);
		}
	};
})(jQuery, $.core);

//Speech-related functions
(function($, core) {

	var A = $.core.Speech = {
		Get: function () {
			return _cWin.speechSynthesis;
		},
		getSpeechRecognition: function () {
			return _cWin.SpeechRecognition || _cWin.webkitSpeechRecognition;
		},
		getVoices: function () {
			var synth = this.Get();
			return synth.getVoices();
		},
		getVoicesLength: function () {
			var voices = this.getVoices();
			return voices.length;
		},
		getPopularVoiceList: function () {
			var voiceList = [];
			var synth = this.Get();
			voices = synth.getVoices();
			for (i = 0; i < voices.length; i++) {
				voiceList.push(voices[i]);
			}
			return voiceList;
		},
		/*
			Microsoft Heami Desktop - Korean
			Microsoft Zira Desktop - English (United States)
		*/
		speech: function (word, speecher, pitch, rate) {
			var i;
			var synth = this.Get();
			
			if ($.core.Validate.isArray(word)) {
				var word = $.core.Arr.getRandom(word);
			}
			
			var utterThis = new SpeechSynthesisUtterance(word);
			var voices = this.getVoices();
			
			for (i = 0; i < voices.length; i++) {
				if (voices[i].name === speecher) {
					utterThis.voice = voices[i];
				}
			}
			
			utterThis.pitch = pitch;
			utterThis.rate = rate;
			synth.speak(utterThis);
		}
	};
})(jQuery, $.core);

//Storage-related functions
(function($, core) {

	var A = core.Storage = {
		/**
		 * Check Storage is Support
		 **/
		isSupport: function () {
			if (!window.localStorage) {
				return false;
			}
			
			this._isSupport = true;
			
			if ($.core.Validate.isUndefined($cache['isLocalStorageSupport'])) {
				var _prefix = 'test';
				var _data = 'tmp';
				if (typeof localStorage == 'object') {
					try {
						localStorage.setItem(_prefix, _data);
						var storageData = localStorage.getItem(_prefix);
						if (storageData === _data) {
							localStorage.removeItem(_prefix);
						} else {
							this.isSupport = false;
						}
					} catch(e) {
						this.isSupport = false;
					}
					$cache['isLocalStorageSupport'] = this.isSupport;
				}
			} else {
				return $cache['isLocalStorageSupport'];
			}
		},
		/**
		 * Get Storage
		 * @param {name}         : name
		 **/
		Get: function (name) {
			if (this.isSupport() == true) {
				var data_storage = _cWin.localStorage.getItem(name);
				
				if (!data_storage) {
					return false;
				}
				
				data_storage = $.core.JSON.autoDecode(data_storage);
				return data_storage;
			}
		},
		/**
		 * Set Storage
		 * @param {name}         : name
		 * @param {value}        : value
		 **/
		Set: function (name, value) {
			if (this.isSupport() == true) {
				try {
					_cWin.localStorage.setItem(name, value);
					$.core.Base.resetWinCache();
				} catch (e) {
					if (e == QUOTA_EXCEEDED_ERR) {
						return false;
					}
				}
			}
		},
		/**
		 * Empty Storage
		 * @param {name}        : name
		 **/
		Empty: function (name) {
			if (this.isSupport() == true && this.Get(name)) {
				try {
					_cWin.localStorage.removeItem(name);
					$.core.Base.resetWinCache();
				} catch (e) {
					$.log('Failed Empty ' + name + ' local Storage');
				}
			}
		}
	};
})(jQuery, $.core);

//String-related functions
(function($, core) {

	var A = core.Str = {
		toArr: function(str){
			var strlength = str.length;
			var arr = new Uint8Array(strlength);
			
			for (var i = 0; i < strlength; i++) {
				arr[i] = str.charCodeAt(i);
			}
            
			return arr;
		},
		//Determining if an integer is a power of 2
		determiningIntegerisPowOf2: function(v){
			v = v >>> 0; //convert to unsigned int
			
			return ((v & (v-1)) === 0) ? true : false;
		},
		//Detect if two integers have opposite signs
		hasOppositeSigns: function(x, y){
			return ((x ^ y) < 0) ? true : false;
		},
		isBlankExists: function(str) {
			if(str.indexOf(" ") != -1) {
				return true;
			}
			
			return false;
		},
		getNotationArr: function(str) {
			return str.match(/[\d\.]+|^[\s]* +|[*\+|\-|(|)|^]/g);
		},
		isIsothermal: function (str) {
			if(3 & str == 3) {
				return true;
			}
			
			return false;
		},
		isEvenNumber: function (str) {
			if((1 & str) == 0 && ((1 & str) % str) == 0) {
				return true;
			}
			
			return false;
		},
		isOddNumber: function (str) {
			if((1 & str) == 1 && ((1 & str) % str) == 0) {
				return true;
			}
			
			return false;
		},
		/*
		 * 4n, 4n+1
		 */
		is4NP1: function (str) {
			if((3 & str) == 1 && ((1 & str)%str) == 0) {
				return true;
			}
			
			return false;
		},
		/*
		 * x, (x+2, x+6) => repeat
		 */
		is2P6Px: function (str, x) {
			if(5 & str == x) {
				return true;
			}
			
			return false;
		},
		/*
		 * 32n
		 */
		is32n: function (str) {
			if(2 >> n == 2) {
				return true;
			}
			
			return false;
		},
		/*
		 * x, (x+1, x+2, x+3, x+8) => repeat
		 */
		is1P2P3P8P: function (str, x) {
			if(4 & str == x) {
				return true;
			}
			
			return false;
		},
		/*
		 * 8n+x
		 */
		is8NPx: function (str, x) {
			if(7 & str == x) {
				return true;
			}
			
			return false;
		},
		Left: function (str, n){
			if (n <= 0){
				return "";
			}else if (n > String(str).length){
				return str;
			}else{
				return String(str).substring(0,n);
			}
		},
		getInt: function (Number) {
			if (!Number || Number == "null") {
				return 0;
			} else if(isNaN(parseInt(Number))) {
				return 0;
			}

			return parseInt(Number);
		},
		notBin: function(a) {
			var result = '';
			var i;
			for (i = a.length -1; i > -1; i--) {
				result = (a.substr(i,1)^1) + result;
			}
			
			return result;
		},
		isKorCharFortisPos: function(chs) {
			if(697015%(chs*2+3)===0) return true;
			
			return false;
		},
		xorBin: function(a, b) {
			var bTmp;
			var result = '';
			
			b = b.split("").reverse().join(""); //reverse
			for (i = a.length -1; i > -1; i--) {
				var bPrefix = b.substr((((a.length -1) - b.length) - i) + b.length, 1);
				bTmp = bPrefix ? bPrefix + bTmp : 0 + bTmp;
			}
			
			for (i = a.length -1; i > -1; i--) {
				if(a.substr(i,1) == bTmp.substr(i,1)) {
					result = 0 + result;
				} else {
					result = 1 + result;
				}
			}
			
			return result;
		},
		orBin: function(a, b) {
			var bTmp;
			var result = '';
			
			b = b.split("").reverse().join(""); //reverse
			for (i = a.length -1; i > -1; i--) {
				var bPrefix = b.substr((((a.length -1) - b.length) - i) + b.length, 1);
				bTmp = bPrefix ? bPrefix + bTmp : 0 + bTmp;
			}
			
			for (i = a.length -1; i > -1; i--) {
				if(a.substr(i,1) == 1 || bTmp.substr(i,1) == 1) {
					result = 1 + result;
				} else {
					result = 0 + result;
				}
				
			}
			
			return result;
		},
		andBin: function(a, b) {
			var bTmp;
			var result = '';
			
			b = b.split("").reverse().join(""); //reverse
			for (i = a.length -1; i > -1; i--) {
				var bPrefix = b.substr((((a.length -1) - b.length) - i) + b.length, 1);
				bTmp = bPrefix ? bPrefix + bTmp : 0 + bTmp;
			}
			
			for (i = a.length -1; i > -1; i--) {
				if(a.substr(i,1) == bTmp.substr(i,1) && a.substr(i,1) == '1') {
					result = 1 + result;
				} else {
					result = 0 + result;
				}
				
			}
			
			return result;
		},
		addBin: function(a, b) {
			var bTmp;
			var result = '';
			
			b = b.split("").reverse().join(""); //reverse
			for (i = a.length -1; i > -1; i--) {
				var bPrefix = b.substr((((a.length -1) - b.length) - i) + b.length, 1);
				bTmp = bPrefix ? bPrefix + bTmp : 0 + bTmp;
			}
			
			var carry = 0;
			for (i = a.length -1; i > -1; i--) {
				var prefix = bTmp.substr(i,1) ? (parseInt(a.substr(i,1)) + parseInt(bTmp.substr(i,1))) + parseInt(carry) : parseInt(a.substr(i,1)) + parseInt(carry);
				carry = prefix > 1 ? 1 : 0;
				result = prefix > 1 ? prefix == 2 ? 0 + result : 1 + result : prefix + result;
				if (i==0 && prefix > 1) result = 1 + result;
			}
			
			return result;
		},
		isBase64: function (str) {
			if (str.search(/^[a-zA-Z0-9=+\/]+$/) === -1) {
				return false;
			}
			var hasPad = str.indexOf("=");
			var _str = str.replace(/\=/g, "");
			
			if (hasPad && hasPad < _str.length !== -1) {
				return false;
			}
		},
		getBase64Bytes: function (str) {
			var d = 0;
			var g = [];
			var str = str.replace(/\=/g, "");
			
			//Split Word by 4 Length
			for (e = 0; e < str.length; e += 4) {
				for (l = str.substr(e, 4), h = n = 0; h < l.length; ++h) {
					f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(l[h]);
					n |= f << 18 - 6 * h;
				}
				
				for (h = 0; h < l.length - 1; ++h) {
					for (m = d + [0], f = m >>> 2; g.length <= f;) {
						g.push(0);
					}
					
					g[f] |= (n >>> 16 - 8 * h & 255) << 8 * (3 - m % 4);
					++d;
				}
			}
			
			return g;
		},
		InStr: function(start, string, chars){
			if(!start){
				start = 0;
			}
			
			string = string.substr(start);
			
			var i;
			var length = string.length;
			
			for(i=0; i < length; i++){
				if (chars == string.substr(i-1,chars.length)){
					return i + start;
				}
			}
			
			return -1;
		},
		midChar: function ($string, $start, $end) {
			if (!$start) {
				$start = 0;
			} else {
				$start = $start -1;
			}
			
			if (typeof $string === 'string' && $start && $end) {
				return $string.substr($start, parseInt($end));
			} else if (typeof $string === 'string' && $start) {
				return $string.substr($start);
			}
		},
		reverse: function (str) {
			return str.match(/(.)/g).reverse().join('');
		},
		replaceToNewLine: function (str) {
			return str.replace(/\\n/g,'\n');
		},
		removeComma: function (num) {
			num = new String(num);
			return num.replace(/,/gi,"");
		},
		evalReplaceAll: function (str1, str2) {
			var tmp = eval("/\\" + str1 + "/g");
			return this.replace(tmp, str2);
		},
		getUniqueNum: function () {
			return function () {
				return ++uniquenum;
			};
		},
		brToLine: function (str) {
			return str.replace(/<br([^>]*)>/ig, "\n");
		},
		lineToBr: function (str) {
			return str.replace(/(\r\n|\n|\r)/g, "<br />");
		},
		stripTabs: function (str) {
			return str.replace(/(<([^>]+)>)/ig, '');
		},
		removeWithoutNumberic: function (str) {
			return str.replace(/[^0-9]/g, '');
		},
		revParams: function (Fn) {
			return function (value, key) {
				Fn(key, value);
			};
		},
		cutStr: function (str, limit) {
			str.length > limit && (str = str.substring(0, limit - 3) + "...");
			return str;
		},
		getNumStat: function (str1, str2) {
			return str1 < str2 ? -1 : str1 > str2 ? 1 : 0;
		},
		removeTagHash: function (str) {
			//%20 : asciiEncodeUTF8('space')
			return str.replace(/(%20|\s)*#(.*)/, "");
		},
		getTagHash: function (str) {
			return str.replace(/^#/, "");
		},
		getUniqueRand: function (min, max, length) {
			arr = [];
			result = [];
			
			for (i = min; i <= max; i++) {
				arr.push(i);
			}
			
			for (i = 0; i < length; i++) {
				randNumber = this.randNum(arr.length);
				result.push(arr[randNumber]);
				arr.splice(randNumber, 1);
			}
			
			return result;
		 },
		randNum: function (max) {
			return Math.floor(Math.random() * max);
		},
		randomStr: function (length) {
			var charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			var result = ''
			
			for (var i = 0; i < length; i++) {
				var pos = Math.floor(Math.random() * charset.length)
				result += charset.substring(pos, pos + 1)
			}
			
			return result;
		},
		uin2hex: function (str) {
			var maxLength = 16;
			str = parseInt(str);
			var hex = str.toString(16);
			var len = hex.length;
			
			for (var i = len; i < maxLength; i++) {
				hex = "0" + hex
			}
			
			var arr = [];
			for (var j = 0; j < maxLength; j += 2) {
				arr.push("\\x" + hex.substr(j, 2))
			}
			
			var result = arr.join("");
			eval('result="' + result + '"');
			
			return result;
		},
		bin2Str: function (a) {
			var arr = [];
			
			for (var i = 0, len = a.length; i < len; i++) {
				var temp = a.charCodeAt(i).toString(16);
				if (temp.length == 1) {
					temp = "0" + temp
				}
				arr.push(temp)
			}
			
			arr = "0x" + arr.join("");
			arr = parseInt(arr, 16);
			return arr;
		},
		recovery: function (str) {
			return ('' + str).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;/g, "'"); //&#39;
		},
		escape: function (str) {
			return ('' + str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
		},
		s_escape: function (str) {
			return ('' + str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/([:@=])/g, '$1​').replace(/([\\`\*_\{\}\[\]\(\)#\+\-\.!\~\|])/g, '\\$1').replace(/\//g, '&#x2F;');
		},
		cut: function (str) {
			var l = 0;
			for (var i = 0; i < str.length; i++) {
				l += (str.charCodeAt(i) > 128) ? 2 : 1;
				if (l > len) return str.substring(0, i);
			}
			
			return str;
		},
		getBytes: function (str) {
			var l = 0;
			for (var i = 0; i < str.length; i++) l += (str.charCodeAt(i) > 128) ? 2 : 1;
			
			return l;
		},
		getUTFBytes: function (str) {
			var i = 0;
			var length = str.length;
			for(var i = 0; i < length; i++) {
				chars = str.charCodeAt(i);
				if (chars <= numberCValue(127)) { //ASCII
					/*
						0xxxxxxx
					*/
					i += 1;
				} else if (chars <= numberCValue(2047)) { //First Bytes=>110/1110 And Except 10 
					/*
						110xxxxx 10xxxxxx
						1110xxxx 10xxxxxx 10xxxxxx
					*/
					i += 2;
				} else if (chars <= numberCValue(65535)) { //UTF-16 surrogate pairs
					/*
						11110zzz 10zzxxxx 10xxxxxx 10xxxxxx
					*/
					i += 3;
				} else {
					i += 4;
				}
			}
			return i;
		},
		lcase: function (str) {
			return str.toLowerCase();
		},
		ucase: function (str){ 
			return str.toUpperCase();
		},
		length: function (str) {
			return str.length;
		},
		ltrim: function (str) {
			return str.replace(/^\s+/,"");
		},
		trim: function (str) {
			return str.replace(/(^\s*)|(\s*$)/g, "");
		},
		rtrim: function (str) {
			return str.replace(/\s+$/,"");
		},
		replaceAll: function (str, orgStr, repStr) {
			return str.split(orgStr).join(repStr);
		},
		stripSpace: function (str) {
			return str.replace(/ /g, "");
		},
		strCut: function (str, len) {
			var s = 0;
			var length = str.length;
			
			for (var i = 0; i < length; i++) {
				s += (str.charCodeAt(i) > 128) ? 2 : 1;
				if (s > len){
					return str.substring(0, i);
				}
			}
			
			return str;
		},
		lineCount: function (element) {
			element.text().split("\n").length;
		},
		ucFirst: function (str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		},
		removeSpace: function (str) {
			var proc = new RegExp("\\s", "g");
			
			return str.replace(proc, "");
		},
		strPad: function (str, nlen, padstr) {
			var len = str.length;
			
			for (i = 0; i < nlen - len; i++) {
				str = padstr + str;
			}
			
			return str;
		},
		upper: function (str) {
			return str.toUpperCase();
		},
		lower: function (str) {
			return str.toLowerCase();
		}
	};
})(jQuery, $.core);

//System-related functions
(function($, core) {

	var A = core.System = {
		shell: function (exec) {
			var shell = new ActiveXObject("WScript.shell");
			shell.run(exec, 1, true);
		},
		/*
			for (;!e.atEnd();e.moveNext ()){
				p.{prop};
			}
			Caption
			IPFilterSecurityEnabled
			IPPortSecurityEnabled
			IPXAddress
			IPXEnabled
			IPXNetworkNumber
			MACAddress
			WINSPrimaryServer
			WINSSecondaryServer
		 */
		getNetworkAdaptor: function () {
			if($.core.Browser.isIE()){
				var locator = new ActiveXObject("WbemScripting.SWbemLocator");
				var service = locator.ConnectServer(".");
				var properties = service.ExecQuery("SELECT * FROM Win32_NetworkAdapterConfiguration");
				var enums = new Enumerator (properties);
				return enums;
			}
		}
	};
})(jQuery, $.core);

//Time-related functions
(function($, core) {

	var A = core.Time = {
		monthToNumbar: function (_str) {
			var _returnStr = "";
			if (_str == "Jan") _returnStr = "01";
			if (_str == "Feb") _returnStr = "02";
			if (_str == "Mar") _returnStr = "03";
			if (_str == "Apr") _returnStr = "04";
			if (_str == "May") _returnStr = "05";
			if (_str == "Jun") _returnStr = "06";
			if (_str == "Jul") _returnStr = "07";
			if (_str == "Aug") _returnStr = "08";
			if (_str == "Sep") _returnStr = "09";
			if (_str == "Oct") _returnStr = "10";
			if (_str == "Nov") _returnStr = "11";
			if (_str == "Dec") _returnStr = "12";
			
			return _returnStr;
		},
		getWebkitTimezone: function () {
			if (!$.core.Validate.isObject(Intl)) {
				return null;
			}
			
			var format = Intl.DateTimeFormat();
			
			if (!$.core.Validate.isObject(format)) {
				return null;
			}
			
			var options = format.resolvedOptions();
			
			if (!$.core.Validate.isObject(options)) {
				return null;
			}
			return options.timeZone || null;
		},
		Local: function () {
			var webkittime = this.getWebkitTimezone();
			
			if (webkittime) {
				return webkittime;
			} else {
				var DateFormat = new Date();
				return DateFormat.toLocaleTimeString();
			}
		},
		now: function () {
			return +new Date
		},
		getDate: function () {
			var date = new Date(),
				y = date.getFullYear(),
				n = date.getMonth() + 1,
				d = date.getDate();
			return [y, n, d];
		},
		getTime: function () {
			var time = new Date(),
				h = time.getHours(),
				i = time.getMinutes(),
				s = time.getSeconds(),
				m = time.getMilliseconds();
				
			return [h, i, s, m];
		}
	};
})(jQuery, $.core);

//Timer-related functions
(function($, core) {

	var A = core.Timer = {
		sleep: function (callback, delay) {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(callback);
				}, delay);
			});
		},
		//async function fn() { const variables = await $.core.Timer.sleep(...); }
		wait: function (ms) {
			setTimeout(deferred.resolve, ms);
			return deferred.promise();
		},
		timeout: function (vars, callback, ms) {
			if (pTimer !== null) {
				this.Reset();
			}
			
			pTimer = setTimeout(function () {
				callback(vars);
			}, ms);
		},
		interval: function (vars, callback, ms) {
			if (pTimer !== null) {
				this.Reset();
			}
			
			pTimer = setInterval(function () {
				callback(vars);
			}, ms);
		},
		Reset: function () {
			clearInterval(pTimer);
		}
	};
})(jQuery, $.core);

//URL-related functions
(function($, core) {

	var A = core.URL = {
		createBlob: function(arrayBuffer){
			var url = self.getNative;
			var blob = new Blob([arrayBuffer]);
			
			return url.createObjectURL(blob);
		},
		getJoinChar: function (url) {
			return /\?/.test(url) ? "&" : "?";
		},
		createObject: function () {
			return (_cWin.createObjectURL && _cWin) || (_cWin && _cWin.webkitURL) || (_cWin.URL && _cWin.URL.revokeObjectURL);
		},
		isCOMDomain: function () {
			return location.hostname.match(/\.com$/);
		},
		goRoot: function () {
			_cWin.location.href = "/";
		},
		getUrlVars: function (url) {
			var vars = [], hash;
			var hashes = url.slice(url.indexOf('?') + 1).split('&');
			
			if (hashes.indexOf(url) < 0) {
				for (var i = 0; i < hashes.length; i++) {
					hash = hashes[i].split('=');
					vars.push(hash[0]);
					vars[hash[0]] = hash[1];
				}
			}
			
			return vars;
		},
		getUrl: function (isHashRemove = false) {
			$.core.Base.resetWinCache();
			var url = _cWin.location.href;
			var target = '';
			
			if(isHashRemove){
				var hash = location.hash;
				target = url.replace(hash, '');
			} else {
				target = url;
			}
			
			return target;
		},
		getNative: function () {
			return _cWin.URL || _cWin.webkitURL || _cWin.mozURL || _cWin.msURL;
		},
		getObject: function (target) {
			var url = self.getNative;
			
			if (!url.createObjectURL) {
				url.createObjectURL = function (obj) {
					return obj;
				}
			}
			
			return url.createObjectURL(target);
		},
		revokeObject: function (target) {
			var url = self.getNative;
			
			return url.revokeObjectURL(target);
		},
		generateUrl: function () { //getPureUrl.apply('index.php',['a','b']);
			var $url = this;
			var i = 0;
			
			if (arguments.length > 0) {
				for (var i = 0; i < arguments.length; i++) {
					$url += $url != this ? '&' : '?';
					$url += arguments[i];
					$url += '=';
					$url += arguments[i + 1];
					i++;
				}
			}
			
			return $url;
		},
		parseQuerystring: function (string) {
			var params = {};
			var string = string.split('&');
			var length = string.length;
			
			for (i = 0; i < length; i++) {
				split = string[i].split('=');
				params[split[0]] = decodeURIComponent(split[1]);
			}
			
			return params;
		},
		changeSrcDirectory: function (url, dir) {
			return url.replace(/src\=".*\/(.*.jpg)/g, 'src\="' + dir + '$1');
		},
		getQueryString: function (key) {
			var regex = new RegExp("[\?&]" + key.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]") + "=([^&#]*)");
			var url = regex.exec(url());
			
			if (url == null){
				return false;
			}else{
				return url[1];
			}
		},
		getParam: function (name, url) {
			try {
				var url = url || this.getUrl();
				var regex = new RegExp('[\=&?]' + name + '=([^&#]*)').exec(url);
				if (regex) {
					if (regex.length > 0) {
						return regex[1];
					} else {
						return regex;
					}
				}
			} finally {
				url = null; 
			} 
		},
		setQuery: function (paramName, paramValue, url) {
			var url = url || this.getUrl();
			var chr = $.core.URL.getJoinChar(url);
			var regex = new RegExp('[\=&?]' + paramName + '=([^&#]*)').exec(url);
			chr == '?' ? '' : '&';
			
			if (regex) {
				return this.setParam(paramName, paramValue, url);
			} else {
				return url + chr + paramName + '=' + paramValue;
			}
		},
		setParam: function (paramName, paramValue, userUrl) {
			try {
				var url = this.getUrl();
				var target = userUrl || url;
				
				var regex = new RegExp("([\?&]" + paramName + "\=)[^&#]*");
				if (paramValue) {
					var target = target.replace(regex, "$1" + paramValue);
				} else {
					var target = target.replace(regex, "");
				}
				
				return target;
			} finally {
				url = null; 
				target = null; 
				regex = null; 
			} 
		},
		getParams: function (url) {
			try {
				var url = url || this.getUrl();
				return url.match(regURLParmas);
			} finally {
				url = null; 
			}
		}
	};
})(jQuery, $.core);

//Validate-related functions
(function($, core) {

	var A = core.Validate = {
		getType: function (str) {
			if (this.isUndefined(str)) {
				return 'undefined';
			} else if (this.isWindow(str)) {
				return 'window';
			} else if (this.isDate(str)) {
				return 'date';
			} else if (this.isNumeric(str)) {
				if (this.isRRN(str)) {
					return 'rrn';
				} else {
					return 'number';
				}
			} else if (this.isBool(str)) {
				return 'bool';
			} else if (this.isArray(str)) {
				return 'array';
			} else if (this.isRegex(str)) {
				return 'regex';
			} else if (this.isFunc(str)) {
				return 'function';
			} else if (this.isObject(str)) {
				return 'object';
			} else if (this.isStr(str)) {
				if (this.isJapan(str)) {
					return 'japan';
				} else if (this.isHiragana(str)) {
					return 'hiragana';
				} else if (this.isKatakana(str)) {
					return 'katakana';
				} else if (this.isKor(str)) {
					return 'kor';
				} else if (this.isJSON(str)) {
					return 'json';
				} else if (this.isTime(str)) {
					return 'time';
				} else if (this.isURL(str)) {
					return 'url';
				} else if (this.isWeekday(str)) {
					return 'weekday';
				} else if (this.isEmail(str)) {
					return 'email';
				} else {
					return 'string';
				}
			}
		},
		isJapan: function (str) {
			return str.match(regJapan) ? true : false;
		},
		isHiragana: function (str) {
			return str.match(regHiragana) ? true : false;
		},
		isKatakana: function (str) {
			return str.match(regKatakana) ? true : false;
		},
		isKor: function (str) {
			return str.match(regOnlyKor) ? true : false;
		},
		isURL: function (str) {
			return str.match(regUrl) ? true : false;
		},
		regWhiteSpace: function (str) {
			return str.match(regWhiteSpace) ? true : false;
		},
		isEmail: function (str) {
			return str.match(regEmail) ? true : false;
		},
		isArrayBuffer: function (buff) {
			return toString.call(buff) === '[object ArrayBuffer]';
		},
		isRRN: function (str) {
			return str.match(regRRN) ? true : false;
		},
		isJSON: function (str) {
			return $.core.JSON.isJSON(str);
		},
		isWeekday: function (str) {
			try {
				var tmp = str.split(",");
				var length = tmp.length;
				for (i = 0; i < length; i++) {
					if (tmp[i].length > 1) return false;
					if (isNaN(tmp[i]) == true) return false;
					if (tmp[i] > 7 || tmp[i] < 1) return false;
				}
				return str;
			} finally {
				tmp = null; 
				length = null; 
			}
		},
		getJosa: function (str, tail) {
			strTemp = str.substr(str.length - 1);
			return ((strTemp.charCodeAt(0) - 16) % 28 != 0) ? str + tail.substr(0, 1) : str + tail.substr(1, 1);
		},
		isWindow: function (elem) {
			return null != elem && elem == elem.window && toString.call(elem) === '[object Window]';
		},
		isEmptyObject: function (obj) {
			for (var c in obj) return !1;
			return !0
		},
		isPromiseLike: function (obj) {
			return obj && this.isFunc(obj.then);
		},
		isFormData: function (form) {
			return toString.call(form) === '[object FormData]';
		},
		isFile: function (file) {
			return toString.call(file) === '[object File]';
		},
		isBlob: function (blob) {
			return toString.call(blob) === '[object Blob]';
		},
		isBlobBuilder: function (blob) {
			return toString.call(blob) === '[object BlobBuilder]';
		},
		isNumeric: function (num) {
			return 0 <= num - parseFloat(num);
		},
		isUndefined: function (value) {
			return typeof value === 'undefined'; //val === void 0
		},
		isBool: function (value) {
			return typeof value === 'boolean';
		},
		isArray: function (value) {
			return typeof value === 'array' && value.constructor === Array && toString.call(value) === '[object Array]';;
		},
		isNull: function (value) {
			return typeof value === 'null' || value == undefined || value == null || value == 'null' || value.toString().replace(/ /g,"") == "";
		},
		isDate: function (value) {
			return toString.call(value) === '[object Date]' && typeof value === 'date';
		},
		isRegex: function (value) {
			return typeof value === 'regexp' && toString.call(value) === '[object RegExp]';
		},
		isStr: function (value) {
			return typeof value === 'string' && String(value) === value;
		},
		isFunc: function (value) {
			return typeof value === 'function' && {}.toString.call(value) === '[object Function]';
		},
		isObject: function (value) {
			return typeof value === 'object';
		},
		isNum: function (value) {
			return typeof value === 'number' && isFinite(value);
		},
		isTime: function (str) {
			if (str == null || str == "") {
				return false;
			} else if (str.length < 4) {
				return false;
			}
			
			var hour = str.substring(0, 2),
				min = str.substring(2);
				
			if (hour > 23) {
				return false;
			} else if (min > 59) {
				return false;
			}
			
			return str;
		},
		isBlank: function (str) {
			for (var i = 0; i < str.length; i++) {
				var ch = str.charAt(i);
				if ((ch != ' ') && (ch != '\n') && (ch != '\et')) {
					return false;
				}
			}
			
			return true;
		}
	};
})(jQuery, $.core);

//WebDB-related functions
(function($, core) {

	var A = core.WebDB = {
		isSupport: function () {
			if (_cWin.openDatabase) {
				return true;
			}
			
			return false;
		},
		getIndexedDB: function () {
			return _cWin.indexedDB || _cWin.mozIndexedDB || _cWin.webkitIndexedDB || _cWin.msIndexedDB;
		},
		getIDBTransaction: function () {
			return _cWin.IDBTransaction || _cWin.webkitIDBTransaction || _cWin.msIDBTransaction;
		},
		getIDBKeyRange: function () {
			return _cWin.IDBKeyRange || _cWin.webkitIDBKeyRange || _cWin.msIDBKeyRange;
		},
		Open: function (db, exp, size) {
			if (this.isSupport()) {
				if ($.core.Validate.isUndefined(size)) size = 1024 * 1024;
				HandlerWebDb = _cWin.openDatabase(db, "1.0", exp, size);
			}
		},
		SetQuery: function (query) {
			if (this.isSupport()) {
				HandlerWebDb.transaction(function (tex) {
					tex.executeSql(query);
				});
			}
		},
		GetQuery: function (query) {
			if (this.isSupport()) {
				HandlerWebDb.transaction(function (tex) {
					tex.executeSql(query, [], function (tx, results) {
						return results;
					}, null);
				});
			}
		}
	};
})(jQuery, $.core);

//StreamObject-related functions
(function($, core) {

	var A = core.StreamObject = {
		//var streamobject = new core.StreamObject.Stream();
		Stream: function (str) {
			var pos = 0;
			this.read = function (len) {
				var result = str.substr(pos, len);
				pos += len;
				
				return result;
			}
			this.readBigEndianInt32 = function () {
				var result = ((str.charCodeAt(pos) << 24) + (str.charCodeAt(pos + 1) << 16) + (str.charCodeAt(pos + 2) << 8) + str.charCodeAt(pos + 3));
				pos += 4;
				
				return result;
			}
			
			this.readBigEndianInt16 = function () {
				var result = ((str.charCodeAt(pos) << 8) + str.charCodeAt(pos + 1));
				pos += 2;
				
				return result;
			}
			
			this.readInt8 = function (signed) {
				var result = str.charCodeAt(pos);
				if (signed && result > 127){
					result -= 256;
				}
				
				pos += 1;
				
				return result;
			}
			
			this.eof = function () {
				return pos >= str.length;
			}
		}
	};
})(jQuery, $.core);

//Canvas-related functions
(function($, core) {

	var A = core.Canvas = {
		drawImage: function (ctx, image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
			ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
		},
		getImageContext: function () {
			var img = new Image();
			
			return img;
		},
		gradientAddColorStop: function (gradient, offset, color) {
			gradient.addColorStop(offset, color);
		},
		getImageData: function (ctx, sx, sy, sw, sh) {
			var imagedata = ctx.getImageData(sx, sy, sw, sh);
			
			return imagedata;
		},
		fillText: function (ctx, font, text, x, y) {
			ctx.font = font;
			ctx.fillText(text, x, y);
		},
		createLinearGradient: function (ctx, x0, y0, x1, y1) {
			var gradient = ctx.createLinearGradient(x0, y0, x1, y1);
			
			return gradient;
		},
		createRadialGradient: function (ctx, x0, y0, r0, x1, y1, r1) {
			var gradient = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
			
			return gradient;
		},
		//repeat, repeat-x, repeat-y, no-repeat
		createPattern: function (ctx, image, repetition) {
			if (!repetition) repetition = 'repeat';
			var pattern = ctx.createPattern(img, repetition);
			
			return pattern;
		},
		createImageData: function (ctx, width, height) {
			var imagedata = ctx.createImageData(width, height);
			
			return imagedata;
		},
		applyLinearGradient: function (ctx, x0, y0, r0, x1, y1, r1, x, y, width, height, startcolor, stopcolor) {
			var gradient = this.createLinearGradient(ctx, image, repetition);
			this.gradientAddColorStop(0, startcolor);
			this.gradientAddColorStop(1, stopcolor);
			ctx.fillStyle = gradient;
			ctx.fillRect(x, y, width, height);
		},
		applyRadialGradient: function (ctx, x0, y0, r0, x1, y1, r1, x, y, width, height, startcolor, stopcolor) {
			var gradient = this.createRadialGradient(ctx, image, repetition);
			this.gradientAddColorStop(0, startcolor);
			this.gradientAddColorStop(1, stopcolor);
			ctx.fillStyle = gradient;
			ctx.fillRect(x, y, width, height);
		},
		applyPattern: function (ctx, image, repetition, x, y, width, height) {
			var pattern = this.createPattern(ctx, image, repetition);
			ctx.fillStyle = pattern;
			ctx.fillRect(x, y, width, height);
		},
		get2DCanvasContext: function (id) {
			var canvas = document.getElementById(id);
			var ctx = canvas.getContext("2d");
			
			return ctx;
		}
	};
})(jQuery, $.core);

//WebSocket-related functions
(function($, core) {

	var A = core.WebSocket = {
		isSupport: function () {
			if ("WebSocket" in _cWin) {
				return true;
			}
			
			return false;
		},
		Open: function (host, options) {
			HandlerWebSocket = new WebSocket(host, options);
			
			return HandlerWebSocket;
		},
		Send: function (packet) {
			HandlerWebSocket.send(packet);
		}
	};
	
})(jQuery, $.core);

//XML-related functions
(function($, core) {

	var A = core.XML = {
		isXMLDoc: function (xml) {
			return jQuery.isXMLDoc(xml);
		},
		parse: function (xml) {
			return $.parseXML(xml);
		},
		find: function (xml, val) {
			if (self.isXMLDoc(xml)) {
				return xml.find(val);
			}
		},
		serialize: function (str) {
			if ($.core.Validate.isUndefined($cache['xmlserializer'])) {
				var serializer = new XMLSerializer();
				$cache['xmlserializer'] = serializer;
			}
			
			var xmlString = $cache['xmlserializer'].serializeToString(str);
			
			return xmlString;
		},
		strToXML: function (str) {
			var xmlDOM;
			var xmlParser;
			
			if ($.core.Request.getActiveXObject()) {
				xmlDOM = new ActiveXObject('Microsoft.XMLDOM');
				xmlDOM.async = false;
				xmlDOM.loadXML(str);
			} else if (_cXMLHttpRequest) {
				if ($.core.Validate.isUndefined($cache['domparser'])) {
					xmlParser = new DOMParser();
					$cache['domparser'] = xmlParser;
				}
				xmlDOM = $cache['domparser'].parseFromString(str, 'text/xml');
			} else {
				return null;
			}
			
			return xmlDOM;
		}
	};
})(jQuery, $.core);

;(function (factory){
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(jQuery);
	}
}(function ($) {
	_root.isUndefined = function (obj) {
		return obj === void 0;
	},
	_root.isNull = function (obj) {
		return obj === null;
	},
	_root.isArray = nativeIsArr || function (obj) {
		return toString.call(obj) === '[object Array]';
	},
	_root.isRegExp = function (obj) {
		return !!(obj && obj.test && obj.exec && (obj.ignoreCase || obj.ignoreCase === false));
	},
	_root.toType = (function (global) {
		return function (o) {
			if (o === global) {
				return 'global';
			}
			return toString.call(o).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
		}
	})(this);
	
	jQuery.easing.quart = function (x, t, b, c, d) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	};

	$.expr[':'].cls = $.expr.createPseudo(function (meta) {
		return function (el) {
			return meta ? el.className === meta : false;
		}
	});

	$.fn.Validation = function (options) {
		var defaults = {
			validators: {
				email: function (email) {
					var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					return email.match(regex) ? true : false;
				},
				date: function (date) {
					var regex = /^(\d{4})-(\d{2})-(\d{2})$/;
					return date.match(regex) ? true : false;
				},
				en: function (en) {
					var regex = /^[a-zA-Z]+$/;
					return en.match(regex) ? true : false;
				},
				phone: function (phone) {
					//var regex = /^[0-9]{1,}\-[0-9]{1,}\-[0-9]{1,}$/;
					var regex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
					return phone.match(regex) ? true : false;
				},
				jamo: function (jamo) {
					//var regex = /^[ㄱ-힣]*$/;
					var regex = /([^가-힣\x20])/i;
					return kor.match(regex) ? true : false;
				},
				num: function (num) {
					var regex = /[^0-9]*$/;
					return num.match(regex) ? true : false;
				},
				engnum: function (engnum) {
					var regex = /^[a-zA-Z0-9$_$.$-]*$/;
					return engnum.match(regex) ? true : false;
				}
			}
		};
		options = $.extend(true, defaults, options);
		this.each(function () {
			var $form = $(this);
			$form.find('input, textarea').each(function () {});
		});
	}

	$.extend($, {
		'$': function (el) {
			if (el.jquery) el = el[0];
			if (typeof el === 'string') el = $.selector(el);
			if (!el || !el.nodeName) throw new TypeError('Type Error: DOM Object or $() is Not Exists');
			return $.data(el, 'this') || $.data(el, 'this', $(el));
		},
		'log': (function () {
			if ($.core.Browser.isConsoleAvailable()) {
				return function () {
					console.log.apply("%c%s", $.makeArray(arguments));
				};
			}
		}())
	});

	$.fn.extend({
		combine: function (separator) {
			var res = "";
			var is_first = 1;
			
			this.each(function () {
				if (is_first != 1) {
					res += separator;
				} else {
					is_first = 0;
				}
				
				res += $(this).val();
			});
			
			return res;
		},
		enable: function () {
			return this.each(function () {
				$(this).removeAttr('disabled');
			});
		},
		disable: function () {
			return this.each(function () {
				$(this).attr('disabled', true);
			});
		},
		href: function (href) {
			if (arguments.length === 0) {
				return this.length === 0 ? null : this.get(0).href;
			} else {
				return this.each(function () {
					this.href = href;
				});
			}
			
			return this;
		},
		Toggle: function () {
			return this.each(function () {
				var elem = $(this);
				$.core.Effect.Toggle(elem);
			});
		},
		focusShow: function (delay) {
			if ($(this).css("display") == "none") {
				$(this).show(delay).Focus();
			} else {
				$(this).Focus();
			}
		},
		toggleBool: function (elementBoolean, delay) {
			if (elementBoolean === true) {
				$(this).show(delay);
			} else {
				$(this).hide(delay);
			}
		},
		toggleClass: function (element, cls) {
			//var fn = hasClasses(element, cls) ? removeClass : addClass;
			//fn(element, cls);
		},
		maxWidth: function ($width) {
			if ($(this).width() > $width) {
				$(this).css('max-width', $width);
				$(this).css('height', 'auto');
			}
		},
		maxHeight: function ($height) {
			if ($(this).height() > $height) {
				$(this).css('width', 'auto');
				$(this).css('max-height', $height);
			}
		},
		getEvent: function ($elements, $callback) {
			function EventList(element) {
				var event_list = [];
				for (var key in element) {
					if(key == "onmousewheel" || key == "onwheel") return;
					
					if (key.indexOf('on') === 0) {
						event_list.push(key.slice(2));
					}
				}
				
				return event_list.join(' ');
			}
			
			$($elements).on(EventList(this[0]), function (e) {
				return $callback(e);
			});
		},
		FocusAnimate: function (delay) {
			$.core.Effect.FocusAnimate(this);
		},
		Focus: function () {
			$.core.Effect.Focus(this);
		},
		keyDownHandler: function ($handler, event) {
			var keyDownMap = [];
			$(this).keydown(function (event) {
				keyDownMap.push(event.keyCode);
			}).keyup(function (event) {
				if (keyDownMap.length == 1) {
					$handler(parseInt(keyDownMap.toString()), event);
				} else {
					$handler(keyDownMap, event);
				}
				keyDownMap = [];
			});
		},
		isEditable: function () {
			return $(document.activeElement).is(this);
		}
	});
}));

(function($) {
	$(window).getEvent(window,function(e){
		var $type = e.type; 
		var $target = e.target;
		if($type == 'click'){
			var $link = $target.href;
			if($link){
				var host = location.hostname;
				var protocol = location.hostname == 'localhost' ? '' : document.location.protocol + '//';
				var domain = protocol + host;
				var regex = new RegExp(domain + '\/', "i");
				var isSafeCaller = regex.test($link);
				if(!isSafeCaller){
					//event.preventDefault();
					//return;
				}
			}
		}
	});
	
	$.core.CoreMessanger = {
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
			
			if ($.core.Audio.isSupport()) {
				if (type==='success') {
					$.core.Audio.loadAudio('./library/mp3/alert.mp3');
				} else if(type==='error') {
					$.core.Audio.loadAudio('./library/mp3/error.mp3');
				}
				
				$.core.Audio.playAudio();
			}
		}
	}
})(jQuery);