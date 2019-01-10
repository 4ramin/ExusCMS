$.core.Evt.addListener(window, 'load', function () {
	var url = "index.php";
	var params = {
		[core_flower.def_mid]: core_flower.mid,
		act: 'procNewGame'
	};

	$.core.Request.ajax("POST", url, params, 'startGame');
});

function registryGame(){
	var moduleID = core_flower.def_mid;
	$('.game').css('background-size',' 100%');
		
	$(".game .item").contextmenu(function(event) {
		event.preventDefault();
		var pixel = $(this).attr('data-pixel');
		var color = $('.item[data-pixel="' + pixel + '"').css('background-color');
		
		if(color == 'rgb(255, 255, 255)' || color == 'rgba(0, 0, 0, 0)'){
			$('.item[data-pixel="' + pixel + '"').css('background-color','#fb1212;');
		}else{
			$('.item[data-pixel="' + pixel + '"').css('background-color','#fff;');
		}
	});

	$('.tip').click(function(){
		var url = "index.php";
		var pixel = $(this).attr('data-pixel');
		
		var params = {
			[core_flower.def_mid]: core_flower.mid,
			act: 'procTip',
			gameID: gameID
		};
		$.core.Request.ajax("POST", url, params, 'procTip');
	});
	
	$('.answer').click(function(){
		var url = "index.php";
		var pixel = $(this).attr('data-pixel');
		
		var params = {
			[core_flower.def_mid]: core_flower.mid,
			act: 'procAnswer',
			gameID: gameID
		};
		$.core.Request.ajax("POST", url, params, 'procTip');
	});
	
	$('.game .item').click(function(){
		var url = "index.php";
		var pixel = $(this).attr('data-pixel');
		
		var params = {
			[core_flower.def_mid]: core_flower.mid,
			act: 'procPointPixel',
			pixel: pixel,
			gameID: gameID
		};
		$.core.Request.ajax("POST", url, params, 'procPixelPoint');
	});
}

$.core.Request.addAjaxCallback('procTip', function (args) {
	x = args.x.split('/');
	if(args.y) y = args.y.split('/');
	
	x.forEach(function (value, i) {
		var url = "index.php";
		var pixel = $(this).attr('data-pixel');
		
		var params = {
			[core_flower.def_mid]: core_flower.mid,
			act: 'procPointPixel',
			pixel: value,
			gameID: gameID
		};
		$.core.Request.ajax("POST", url, params, 'procPixelPoint');
	});
	
	if(y){
		y.forEach(function (value, i) {
			var url = "index.php";
			var pixel = $(this).attr('data-pixel');
			
			var params = {
				[core_flower.def_mid]: core_flower.mid,
				act: 'procPointPixel',
				pixel: value,
				gameID: gameID
			};
			$.core.Request.ajax("POST", url, params, 'procPixelPoint');
		});
	}
});

$.core.Request.addAjaxCallback('procPixelPoint', function (args) {
	if(args.type =='success'){
		$('.item[data-pixel="' + args.pixel + '"').css('background-color','#597dff;');
	}else if(args.type=='gameover'){
		$('audio')[0].src = 'http://66.90.93.122/ost/mario-s-picross-gb/wpznsyay/17_Game%20Over.mp3';
		$('.game').css('background', 'url(http://sonomasun.com/wp-content/uploads/2016/12/game_over.png)');
		$('.game').css('background-size',' 100%');
		
	}else if(args.type=='gameend'){
		$('audio')[0].src = 'http://66.90.93.122/ost/mario-s-picross-gb/flijcthw/14_Puzzle%20Solved%21%20%28Long%29.mp3';
	}else{
		$.core.Audio.loadAudio('https://freesound.org/data/previews/368/368188_6770584-lq.mp3');
		$.core.Audio.playAudio();
		$('.item[data-pixel="' + args.pixel + '"').css('background-color','#7b7b7b;');
	}
});

$.core.Request.addAjaxCallback('startGame', function (args) {
	row = args.row;
	column = args.column;
	gameID = args.gameID;
	table = args.table;
	
	$('.game').html(table);
	$('.rowinfo').html(row);
	$('.cellinfo').html(column);
	
	registryGame();
});