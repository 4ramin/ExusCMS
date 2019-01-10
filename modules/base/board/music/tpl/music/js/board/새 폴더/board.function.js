var highlightRunner = function (target) {
	try{
		var n = decodeURIComponent(target).replace(/.*#cmt_/, "");
		if (n) {
			n = "#comment_content_" + n;
			$(".commentAuthor").each(function (i, item) {
				var it = $(item).find(n);
				if(it.length>0){
					$.core.Effect.Highlighter(this, [255, 255, 60], [255, 255, 255], 1024);
				}
			});
		}
	}catch(e){}
}

function showCompactAjaxMessage(args, CompactMessage){
	if (args["type"] == "error") {
		$.core.CoreMessanger.Show(args["html"], 'bottom', 'right', 'error');
	} else {
		$(".voted_count").html(args["html"]);
		$.core.CoreMessanger.Show(CompactMessage, 'bottom', 'right', 'success');
	}
}

function blockAd(){
	$.core.detectAdblock.create();
	
	setTimeout(function() {
		if($.core.detectAdblock.detect()) {
			$('.content_pad').hide();
		}
	}, 1000);
}

function categoryAjax(url) {
	if (isAjaxProcessing === false) {
		$.core.Evt.preventEvent(event);
		$.core.Request.ajax("GET", url, '', 'completeLoadPage');
		$.core.Browser.pushState(null, null, url);
		window.history.pushState(null, null, url);
	} else {
		$.core.Evt.preventEvent(event);
	}
}

function minimalizeDoc() {
	miniimalizedDoc = document.createElement( "span" );
	miniimalizedDoc.setAttribute("class", "Item");
	
	miniimalizedDocItem = document.createElement("a");
	miniimalizedDocItem.setAttribute("href", $(readObject).find('.linkableArea a').attr("href"));
	miniimalizedDocItem.innerText = $(readObject).find(".h1_title").find('a[href="' + $(readObject).find('.linkableArea a').attr("href") + '"]').text();
	miniimalizedDocItem.setAttribute("class", ajaxDocument);
	
	miniimalizedDoc.appendChild(miniimalizedDocItem);
	$(".minimalizeWindow").append(miniimalizedDoc);
	closeDoc();
}

function closeDoc() {
	readObject.empty();
	glob_srl = null;
}

function registryZeroClipboard(){
	if (core_flower.srl) {
		if(typeof(ZeroClipboard)=='function') {
			ZeroClipboard.config({
				cacheBust: false
				,trustedDomains: ['localhost']
			});
			
			var client = new ZeroClipboard(document.getElementById("copy-button"));
			client.on("ready", function(readyEvent){
				client.on("aftercopy", function(event){
					alert(SUCCESS_COPY + BR + event.data["text/plain"]);
				});
			});
		}
	}
}
	
function procSearch(elem, event) {
	if($(elem).find('input[name=keyword]').val().length===0) {
		$.core.Evt.preventEvent(event);
		alert('검색어 값은 필수입니다.');
		return false;
	}
}

function addDispPrefix(){
	if(glob_srl !== null){
		try{
			var target = $('div[data-srl=' + glob_srl + ']');
			if (target.length > 0) {
				$('div[data-srl=' + glob_srl + ']').addClass('viewing_g2');
			}
		}catch(e){}
	} else {
		try{
			var target_focus_srl = $.core.URL.getParam('srl',window.location.href);
			if (target_focus_srl) {
				glob_srl = target_focus_srl;
				var target = $('div[data-srl=' + glob_srl + ']');
				if (target.length > 0) {
					$('div[data-srl=' + glob_srl + ']').addClass('viewing_g2');
				}
			}
		}catch(e){}
	}
}

function hyperlinkHoverEvent(_this){
	if ($(_this).attr('data-img')) {
		$(_this).find('.wrp').css('display','inline');
	}
}

function bindGlobalEvents(){
	$('a').unbind('click');
	$(window).unbind('popstate');
	$('form').unbind('submit');
}

function lazyloadRegsitry() {
	var observer = lozad('.lozad', {
        threshold: 1,
        load: function(el) {
            $(el).addClass(el.getAttribute("data-tmb"));
        }
    });
	
    var pictureObserver = lozad('.lozad-picture', {
	    threshold: 1
    });

    observer.observe();
    pictureObserver.observe();
}

function popstateEvent(_this, event){
	var target_url = event.target.location.href;
	var target_srl = $.core.URL.getParam('srl', target_url);
	var target_page = $.core.URL.getParam('page', target_url);
	
	if (!target_url || target_url.indexOf('#')) return;
	
	reRegistryDocument();
	
	var url = $.core.URL.setParam('act', '', target_url);
	
	if (target_srl && readObject.length>0) {
		$.core.Request.ajax("GET", url, '', 'completeLoadDocument', '');
	} else if (!target_srl && target_page) {
		$.core.Request.ajax("GET", url, '', 'completeLoadPage', '');
	}
}

function hyperlinkBookmarkEvent(_this, event){
	var isSameURL = ($.core.Str.removeTagHash(_this.href) === $.core.Str.removeTagHash(location.href)) && 
					(location.pathname.replace(/^\//, '') === _this.pathname.replace(/^\//, '')) && 
					(location.hostname === _this.hostname);
					
	if (isSameURL) {
		if(_this.hash) {
			
			var $target = $(_this.hash), targetOffset;
			$target = $target.length && 
					  $target || $('[name=' + _this.hash.slice(1) + ']');
					  
			if ($target.length) {
				$.core.Evt.preventEvent(event);
				targetOffset = $target.offset().top;
				$('html, body').animate({scrollTop: targetOffset}, 600, 'quart');
				$.core.Browser.pushState(null, null, location.href);
				highlightRunner(_this.hash);
				return false;
			}
		}
	}
}

function loadDoc(args) {
	var hasLength = readObject.length > 0;
	
	if(hasLength){
		if(readObject.length==0){
			readObject.empty();
			$.core.Element.appendDiv('.category', documentContent);
			readObject.parent().html($(args).find('.' + documentContent));
		} else {
			readObject.empty();
			readObject.parent().html($(args).find("." + documentContent));
		}
		
		reRegistryDocument();
		registryBoardAjax();
		
		$("html, body").animate({scrollTop: $('.list_area').position().top},{duration: 300,specialEasing: {width: 'linear',height: 'easeInBounce'}});
	}
}
	
function formSubmitEvent(event){
	var bdsearch = $(event.target).hasClass(searchForm);
	if(bdsearch === true){
		if (isAjaxProcessing === false) {
			$.core.Evt.preventEvent(event);
			var url = event.currentTarget.href;
			var params = $("." + searchForm).serialize();
			$.core.Request.ajax("GET", url, params, 'completeSearch');
		} else {
			$.core.Evt.preventEvent(event);
		}
	}
}

function loadTargetDocument(_this, url, event){
	if(readObject.length>0 || $('.related_doc').length>0){
		$.core.Evt.preventEvent(event);
		url = $.core.URL.setParam('act', '', url);
		$.core.Request.ajax("GET", url, '', 'completeLoadDocument');
		$.core.Browser.pushState(null, null, url);
		
		if(core_flower.bdstyle=='flat'){
			var srl = $.core.URL.getParam('srl',url);
			glob_srl = srl;
			$('.bd_lst li div').removeClass(viewDocumentPrefix);
			$('.bd_lst a').filter(function() {
				var regex = 'srl=' + srl + '';
				var regexr = new RegExp(regex, 'g');
				
				var rewrite_regex = '^/([0-9]+)/([a-zA-Z0-9_]+)$';
				var rewrite_regexr = new RegExp(regex, 'g');
				
				var isMatch = ($(this).attr('href').match(regexr) || this.href.match(rewrite_regexr));
				if(isMatch) {
					if($(this).hasClass(ajaxDocument)){
						$(this).parent().find('.tmb').addClass(viewDocumentPrefix);
					}
				}
			});
		}else if(core_flower.bdstyle=='list'){
			var srl = $.core.URL.getParam('srl',url);
			console.log(srl);
			glob_srl = srl;
			$('.bd_tb tbody tr').removeClass(viewDocumentPrefix);
			$('.bd_tb tbody tr').filter(function() {
				var regex = 'srl=' + srl + '';
				var regexr = new RegExp(regex, 'g');
				
				var rewrite_regex = '^/([0-9]+)/([a-zA-Z0-9_]+)$';
				var rewrite_regexr = new RegExp(regex, 'g');
				
				var isMatch = ($(this).attr('href').match(regexr) || this.href.match(rewrite_regexr));
				if(isMatch) {
					console.log($(this).attr('href'));
					if($(this).hasClass(ajaxDocument)){
					console.log(this);
						$(this).parent().find('tr').addClass(viewDocumentPrefix);
					}
				}
			});
		}
	}
}

function hyperlinkEvent(_this, event){
	var tag = event.currentTarget.tagName.toUpperCase();
	var url = event.currentTarget.href;
	var navi_page = $(event.target).hasClass("navi_page");
	var comment_navi = $(event.target).hasClass("comment_navi");
	var isAjaxDocument = $(event.target).hasClass(ajaxDocument);
	var isTargetLink = (tag === 'A' && !url.match(url));
	
	if (isTargetLink) {
		if (isAjaxDocument === true) {
			if (isAjaxProcessing === false) {
				loadTargetDocument(_this, url, event);
			} else {
				$.core.Evt.preventEvent(event);
			}
		} else if(comment_navi === true){
			if (isAjaxProcessing === false) {
				$.core.Evt.preventEvent(event);
				url = $.core.Str.removeTagHash(url);
				$.core.Request.ajax("GET", url, '', 'completeLoadComment');
			} else {
				$.core.Evt.preventEvent(event);
			}
		} else if(navi_page === true){
			if (isAjaxProcessing === false) {
				$.core.Evt.preventEvent(event);
				$.core.Request.ajax("GET", url, '', 'completeLoadPage');
				$.core.Browser.pushState(null, null, url);
			} else {
				$.core.Evt.preventEvent(event);
			}
		}
	}
}