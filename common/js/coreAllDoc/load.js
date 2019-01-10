$.core.Evt.addListener(window, 'load', function () {

  var Arr = [3,-8,5,1,2,8,4,5,8,9,15,2,4,100,-999,5,-987,46,89,4,0,0,5,5,9,9,1,1,3];
  var Arr2 = [31,-8,5,1,2,8,4,5,8,9,15,2,4,100,-999,5,-987,46,89,4,0,0,5,5,9,9,1,1,3];
  
  $('.filterMax').html($.core.Arr.filterMax(Arr, 99).join(","));
  $('.sort').html($.core.Arr.sort(Arr).join(","));
  $('.isArrayEqual').html($.core.Arr.isArrayEqual(Arr, Arr2) ? "TRUE" : "FALSE");
  $('.initArray').html($.core.Arr.initArray(1,3,7,9).toString());
  $('.getUnique').html($.core.Arr.getUnique(Arr).join(","));
  $('.getRandom').html($.core.Arr.getRandom(Arr));
  $('.getMoreIndex').html($.core.Arr.getMoreIndex(Arr, 4, 3));
  $('.getMoreValue').html($.core.Arr.getMoreValue(Arr, 4, 3));
  $('.getLessIndex').html($.core.Arr.getLessIndex(Arr, 0, 15));
  $('.getLessValue').html($.core.Arr.getLessValue(Arr, 0, 15));
  $('.getMinValue').html($.core.Arr.getMinValue(Arr));
  $('.getWindowsVersion').html($.core.Browser.getWindowsVersion());
  $('.hasVibrator').html($.core.Browser.hasVibrator() ? "TRUE" : "FALSE");
  $('.hasConnection').html($.core.Browser.hasConnection() ? "TRUE" : "FALSE");
  $('.getLang').html($.core.Browser.getLang());
  $('.isMac').html($.core.Browser.isMac() ? "TRUE" : "FALSE");
  $('.isBlackBerry').html($.core.Browser.isBlackBerry() ? "TRUE" : "FALSE");
  $('.isMacPlatform').html($.core.Browser.isMacPlatform() ? "TRUE" : "FALSE");
  $('.isiOS').html($.core.Browser.isiOS() ? "TRUE" : "FALSE");
  $('.isIE').html($.core.Browser.isIE() ? "TRUE" : "FALSE");
  $('.isSafari').html($.core.Browser.isSafari() ? "TRUE" : "FALSE");
  $('.isKonqueror').html($.core.Browser.isKonqueror() ? "TRUE" : "FALSE");
  $('.isGecko').html($.core.Browser.isGecko() ? "TRUE" : "FALSE");
  $('.isChrome').html($.core.Browser.isChrome() ? "TRUE" : "FALSE");
  $('.isOpera').html($.core.Browser.isOpera() ? "TRUE" : "FALSE");
  $('.isNetscape').html($.core.Browser.isNetscape() ? "TRUE" : "FALSE");
  $('.isNetscape').html($.core.Browser.isNetscape() ? "TRUE" : "FALSE");
  $('.isFirefox').html($.core.Browser.isFirefox() ? "TRUE" : "FALSE");
  $('.isWin').html($.core.Browser.isWin() ? "TRUE" : "FALSE");
  $('.isMozila').html($.core.Browser.isMozila() ? "TRUE" : "FALSE");
  $('.getChromeVersion').html($.core.Browser.getChromeVersion());
  $('.is64Bit').html($.core.Browser.is64Bit() ? "TRUE" : "FALSE");
  $('.getHardwareCur').html($.core.Browser.getHardwareCur().toString());
  $('.getAllPerformType').html($.core.Browser.getAllPerformType().toString());
  $('.hasConsole').html($.core.Browser.hasConsole() ? "TRUE" : "FALSE");
  $('.isChromeApp').html($.core.Browser.isChromeApp() ? "TRUE" : "FALSE");
  $('.encodeURIComponentbyCharset').html("인코딩 : " + $.core.Request.encodeURIComponentbyCharset("인코딩", "UTF-8"));
  $('.isSSL').html($.core.Request.isSSL() ? "TRUE" : "FALSE");
  $('.charingTime').html($.core.Battery.charingTime());
  $('.dischargingTime').html($.core.Battery.dischargingTime());
  $('.blevel').html($.core.Battery.level());
  $('.bisget').html($.core.Battery.isGet() ? "TRUE" : "FALSE");
  $('.hasTouchScreen').html($.core.Browser.hasTouchScreen() ? "TRUE" : "FALSE");
  $.core.Request.isUrlExists("//localhost/hikaru_test/favicon.ico", function(args){
	$('.isUrlExists').html(args);
  });
  
  $('.xhr').html($.core.Request.xhr("GET", "http://localhost/hikaru_test/library/js/coreAllDoc/index.html", "", false));
  $('.isLocalhost').html($.core.Browser.isLocalhost() ? "TRUE" : "FALSE");
  
    $('p').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});