function isWysiwygareaAvailable() {
	if (CKEDITOR.revision == ('%RE' + 'V%')) {
		return true;
	}

	return !!CKEDITOR.plugins.get('wysiwygarea');
}

function setEditorConfig() {
	CKEDITOR.editorConfig = function(config) {
		config.toolbarGroups = [
			{name:'document', groups: ['mode','document','doctools']},
			{name:'clipboard', groups: ['clipboard','undo']},
			{name:'editing', groups: ['find','selection','spellchecker','editing']},
			{name:'forms', groups: ['forms']}, '/',
			{name:'basicstyles', groups: ['basicstyles','cleanup']},
			{name:'paragraph', groups: ['list','indent','blocks','align','bidi','paragraph']},
			{name:'links', groups: ['links']},
			{name:'insert', groups: ['insert']}, '/',
			{name:'styles', groups: ['styles']},
			{name:'colors', groups: ['colors']},
			{name:'tools', groups: ['tools']},
			{name:'others', groups: ['others']},
			{name:'about', groups: ['about']}
		];
		config.removeButtons ='About,EasyImageUpload';
	};
}

function setEditorStyleSet() {
	CKEDITOR.stylesSet.add('default', [
		/* Block styles */

		// These styles are already available in the "Format" drop-down list ("format" plugin),
		// so they are not needed here by default. You may enable them to avoid
		// placing the "Format" combo in the toolbar, maintaining the same features.
		
		{name:'Paragraph', element:'p'},
		{name:'Heading 1', element:'h1'},
		{name:'Heading 2', element:'h2'},
		{name:'Heading 3', element:'h3'},
		{name:'Heading 4', element:'h4'},
		{name:'Heading 5', element:'h5'},
		{name:'Heading 6', element:'h6'},
		{name:'Preformatted Text',element:'pre'},
		{name:'Address', element:'address'},
		{name:'Italic Title', element:'h2', styles: {'font-style':'italic'}},
		{name:'Subtitle', element:'h3', styles: {'color':'#aaa', 'font-style':'italic'}},
		{name:'Special Container', element:'div', styles: {padding:'5px 10px', background:'#eee', border:'1px solid #ccc'}},

		/* Inline styles */

		// These are core styles available as toolbar buttons. You may opt enabling
		// some of them in the Styles drop-down list, removing them from the toolbar.
		// (This requires the "stylescombo" plugin.)
		
		{name:'Strong', element:'strong', overrides:'b'},
		{name:'Emphasis', element:'em'	, overrides:'i'},
		{name:'Underline', element:'u'},
		{name:'Strikethrough', element:'strike'},
		{name:'Subscript', element:'sub'},
		{name:'Superscript', element:'sup'},
		
		{name:'Marker', element:'span', attributes: {'class':'marker'}},

		{name:'Big', element:'big'},
		{name:'Small', element:'small'},
		{name:'Typewriter', element:'tt'},

		{name:'Computer Code', element:'code'},
		{name:'Keyboard Phrase', element:'kbd'},
		{name:'Sample Text', element:'samp'},
		{name:'Variable', element:'var'},

		{name:'Deleted Text', element:'del'},
		{name:'Inserted Text', element:'ins'},

		{name:'Cited Work', element:'cite'},
		{name:'Inline Quotation', element:'q'},

		{name:'Language: RTL', element:'span', attributes: {'dir':'rtl'}},
		{name:'Language: LTR', element:'span', attributes: {'dir':'ltr'}},

		/* Object styles */

		{name:'Styled Image (left)', element:'img', attributes: {'class':'left'}},
		{name:'Styled Image (right)', element:'img', attributes: {'class':'right'}},
		{name:'Compact Table', element:'table', attributes: {
			cellpadding:'5', cellspacing:'0', border:'1', bordercolor:'#ccc'
		}, styles: {'border-collapse':'collapse'}},

		{name:'Borderless Table', element:'table', styles: {'border-style':'hidden', 'background-color':'#E6E6FA'}},
		{name:'Square Bulleted List', element:'ul', styles: {'list-style-type':'square'}},

		/* Widget styles */

		{name:'Clean Image', type:'widget', widget:'image', attributes: {'class':'image-clean'}},
		{name:'Grayscale Image', type:'widget', widget:'image', attributes: {'class':'image-grayscale'}},

		{name:'Featured Snippet', type:'widget', widget:'codeSnippet', attributes: {'class':'code-featured'}},

		{name:'Featured Formula', type:'widget', widget:'mathjax', attributes: {'class':'math-featured'}},

		{name:'240p', type:'widget', widget:'embedSemantic', attributes: {'class':'embed-240p'}, group:'size'},
		{name:'360p', type:'widget', widget:'embedSemantic', attributes: {'class':'embed-360p'}, group:'size'},
		{name:'480p', type:'widget', widget:'embedSemantic', attributes: {'class':'embed-480p'}, group:'size'},
		{name:'720p', type:'widget', widget:'embedSemantic', attributes: {'class':'embed-720p'}, group:'size'},
		{name:'1080p', type:'widget', widget:'embedSemantic', attributes: {'class':'embed-1080p'}, group:'size'},

		// Adding space after the style name is an intended workaround. For now, there
		// is no option to create two styles with the same name for different widget types. See https://dev.ckeditor.com/ticket/16664.
		{name:'240p ', type:'widget', widget:'embed', attributes: {'class':'embed-240p'}, group:'size'},
		{name:'360p ', type:'widget', widget:'embed', attributes: {'class':'embed-360p'}, group:'size'},
		{name:'480p ', type:'widget', widget:'embed', attributes: {'class':'embed-480p'}, group:'size'},
		{name:'720p ', type:'widget', widget:'embed', attributes: {'class':'embed-720p'}, group:'size'},
		{name:'1080p ', type:'widget', widget:'embed', attributes: {'class':'embed-1080p'}, group:'size'}

	] );
}

function inlineEditorInitialize() {
	CKEDITOR.inline('editor');
}

function editorInitialize() {
	CKEDITOR.replace('editor', {
		skin:'moono',
		height: 300,
		width:'auto',
		autoUpdateElement : true,
		resize_enabled : true,
		htmlEncodeOutput: true,
		enterMode : CKEDITOR.ENTER_BR,
		shiftEnterMode : CKEDITOR.ENTER_P,
		on: {
			instanceReady: function(evt) {
				wysiwygareaAvailable = isWysiwygareaAvailable();
				_instance = CKEDITOR.instances.editor;
				fileSequence = $('input[name=file_sequence]').val();
				html = $('input[name=content]').val();
				
				if (html) {
					_instance.setData(html, function() {
						_instance.focus();
					});
				}
				
				if (fileSequence) {
					getFileList(fileSequence);
				}
			}
		}, allowedContent: {
			'a b p u s sub strong em audio video h1 h2 h3 h4 h5 h6 h7 a span img table tr td tbody ol ul li input div blockquote hr': true,
			'div': {
				styles: ['margin'],
				dir:'rtl'
			},
			'p h1 a span': {
				styles: ['text-align','font-size','color','font-weight','font-family','font-style','text-align','background-color']
			},
			'table': {
				styles: ['width','height']
			},
			'div': {
				styles: ['background-color']
			},
			img: {
				attributes: ['src','data-file-srl','alt','width','height'],
				classes: {tip: true }
			},
			table: {
				attributes: ['border','cellpadding','cellspacing','height'],
				classes: {tip: true }
			},
			a: {
				attributes: ['href','alt','width','height'],
				classes: {tip: true }
			},
			'u s sub strong em p b': {
				attributes: ['href','alt','width','height'],
				classes: {tip: true }
			},
			'audio video': {
				attributes: ['src', 'autoplay', 'controls', 'width', 'height'],
				classes: {tip: true }
			}
		}
    });
}

function submitFilter() {
	var data = _instance.getData();
	var _filter = filterData(data);
	if (!_filter) {
		return false;
	}
	
	$('input[name="content"]').val(data);
	return true;
}

function filterData(data) {
	var length = data.length;
	if (length <= 0) {
		alert('내용이 없습니다.');
		return false;
	} else if (length <= 5) {
		alert('내용이 너무 짧습니다.');
		return false;
	}
	
	return true;
}

function uploadAllFiles() {
	$.each($('#uploadedFile').find("li"), function(key, item) {
		_attr = $(item).find('div');
			
		var url = _attr.attr('download_url');
		var fileSrl = _attr.attr('file_srl');
		var fileName = _attr.attr('filename');
		
		var sourceCode = getExtSource(url, fileSrl, fileName);
		if (sourceCode) {
			_instance.insertHtml(sourceCode);
			$('.fileItem div').removeClass('selectedItem');
		}
	});
}

function uploadSelectedFiles() {
	if ($('#uploadedFile').find('.selectedItem').length > 0) {
		var _selectedItem = selectedItem;
		var _tmpLength = _selectedItem.length;
		for(item = 0; item < _tmpLength; item++) {
			_item = _selectedItem[item];
			_attr = $('div[file_srl=' + _item + ']');
			
			var url = _attr.attr('download_url');
			var fileSrl = _attr.attr('file_srl');
			var fileName = _attr.attr('filename');
			
			var sourceCode = getExtSource(url, fileSrl, fileName);
			if (sourceCode) {
				_instance.insertHtml(sourceCode);
				$('.fileItem div').removeClass('selectedItem');
			}
		}
		
		selectedItem = [];
	}
}

function selectItem(self) {
	var _self = $(self);
	var fileSrl = _self.attr('file_srl');
	
	if ($(_self).hasClass('selectedItem')) {
		selectedItem.splice(selectedItem.indexOf(fileSrl), 1);
		$(_self).removeClass('selectedItem');
	} else{
		selectedItem.push(fileSrl);
		$(_self).addClass('selectedItem');
	}
	
	if ($('.selectedItem').length>0) {
		$('.insertImageToContent,.unsetSelectedItem').addClass('activeItem');
	} else{
		$('.insertImageToContent,.unsetSelectedItem').removeClass('activeItem');
	}
}

function uploadSelectedFile(self) {
	var _self = $(self);
	var url = _self.attr('download_url');
	var fileSrl = _self.attr('file_srl');
	var fileName = _self.attr('filename');
	
	var sourceCode = getExtSource(url, fileSrl, fileName);
	if (sourceCode) {
		_instance.insertHtml(sourceCode);
	}
}

function removeFile(self) {
	var fileSrl = $(self).attr('data-id');
	var fileSequence = $(self).attr('data-target');
	var url = "index.php";
				
	var params = {
		[core_flower.def_mid]:'files',
		module: core_flower.mid,
		srl: core_flower.srl,
		act:'deleteFile',
		sequence: fileSequence,
		target: fileSrl
	};
	
	$.core.Request.ajax("POST", url, params, 'completeRemoveFile', 'json');
}

function unsetSelectedItem() {
	$('.fileItem div').removeClass('selectedItem');
	selectedItem = [];
}

function registryFileHandler() {
	
	$(".fileItem").hover(function() {
		$(this).find('#EditorToggleButton').css('display', 'block');
	},function() {
		$(this).find('#EditorToggleButton').css('display', 'none');
	});
	
	$('.editOpt .unsetSelectedItem').click(function() {
		unsetSelectedItem();
	});
	
	$('.editOpt .insertAllImageToContent').click(function() {
		uploadAllFiles();
	});
	
	$('.editOpt .insertImageToContent').click(function() {
		uploadSelectedFiles();
	});
	
	$('#uploadedFile .imageArea').dblclick(function() {
		uploadSelectedFile(this);
	});
	
	$('#uploadedFile .imageArea').click(function() {
		selectItem(this);
	});
	
	$('#uploadedFile .imageDelete').click(function() {
		removeFile(this);
	});
}

function getFileList(fileSequence) {
	var url = "index.php";
	
	var params = {
		[core_flower.def_mid]:'files',
		module: core_flower.mid,
		srl: core_flower.srl,
		act:'getFileList',
		sequence: fileSequence
	};
	
	$.core.Request.ajax("POST", url, params, 'completeLoadFileList', 'json');
}

function initFormData() {
	var formData = new FormData();
	formData.append(core_flower.def_mid, 'files');
	formData.append('sequence', $('input[name=file_sequence]').val());
	formData.append('act', 'uploadAjaxFile');
	formData.append('module', [core_flower.mid]);
	formData.append('allowSize', 10);
	formData.append('upload', $('#fileupload')[0].files[0]);
	
	return formData;
}

function insertTag(fileData) {
	var sourceCode = getExtSource(fileData.url, fileData.fileSrl, fileData.fileName);
	if (sourceCode) {
		_instance.insertHtml(sourceCode);
	}
	
	imageAppends(fileData.fileSrl, fileData.sequence, fileData.url, fileData.fileName);
	registryFileHandler();
}

function getExtSource(src, fileSrl, fileName) {
	var src;
	
	if (/\.(jpe?g|png|gif)$/i.test(fileName)) {
		src = '<img src="' + src + '" data-file-srl="' + fileSrl + '" alt="' + fileName + '"/>' + "\r\n<p><br></p>\r\n";
	} else if (/\.(mp3|ogg)$/i.test(fileName)) {
		src = '<audio src="' + src + '" data-file-srl="' + fileSrl + '" alt="' + fileName + '" controls></audio>' + "\r\n<p><br></p>\r\n";
	} else if (/\.(mp4)$/i.test(fileName)) {
		src = '<video src="' + src + '" data-file-srl="' + fileSrl + '" alt="' + fileName + '" controls></video>' + "\r\n<p><br></p>\r\n";
	} else{
		src = '<a href="' + src + '" data-file-srl="' + fileSrl + '" alt="' + fileName + '" controls >' + fileName + '</a>';
	}
	
	return src;
}

function getFileType(fileName) {
	if (/\.(jpe?g|png|gif|bmp|tif|pcx|webp)$/i.test(fileName)) {
		return 'image';
	} else if (/\.(mp3|ogg)$/i.test(fileName)) {
		return 'audio';
	} else if (/\.(mp4|avi|mpg|mpeg|mpe|wmv|asf|asx|flv|rm|mov|dat|mkv|ts|tp|3gp)$/i.test(fileName)) {
		return 'video';
	} else if (/\.(zip|gz|rar|gzip|7z|7zip|tar|arj|alz|ace|arc|arj|b64|bh|bhx|bin|gz2|cab|ear|enc|ha|hqx|ice|img|mim|pak|tgz|war)$/i.test(fileName)) {
		return 'compress';
	} else if (/\.(hwp)$/i.test(fileName)) {
		return 'hwp';
	} else if (/\.(xlsx|xlsm|xlsb|xltx|xltm|xls|xlt|xls|xlam|xla|xlw|xlr)$/i.test(fileName)) {
		return 'excel';
	} else if (/\.(pptx|pptm|ppt|potx|potm|pot|thmx|ppsx|ppsm|pps|ppam|ppa|pptx)$/i.test(fileName)) {
		return 'powerpoint';
	} else if (/\.(doc|dot|wbk)$/i.test(fileName)) {
		return 'word';
	} else if (/\.(accdb|accde|accdt|accdr)$/i.test(fileName)) {
		return 'access';
	} else if (/\.(vbg|vbp)$/i.test(fileName)) {
		return 'vb6';
	} else if (/\.(html)$/i.test(fileName)) {
		return 'html';
	} else if (/\.(css)$/i.test(fileName)) {
		return 'css';
	} else if (/\.(js)$/i.test(fileName)) {
		return 'javascript';
	} else if (/\.(txt)$/i.test(fileName)) {
		return 'notepad';
	}
}

function getExtImage(download_url) {
	var imgPath = "./library/img/ext/";
	var extFile = getFileType(download_url);
	if (extFile == 'image') {
		return download_url;
	} else if ($.inArray(extFile, acceptedExt)) {
		return imgPath + extFile + ".png";
	} else{
		return imgPath + "/file.png";
	}
}

function imageAppends(file_srl, upload_target_srl, download_url, filename) {
	$('#fileList, .editOpt').show();
	
	var imageController = document.createElement("li");
	imageController.setAttribute('class',"fileItem");
	
	var imageDelete = document.createElement("a");
	imageDelete.setAttribute('id',"EditorToggleButton");
	imageDelete.setAttribute('class',"imageDelete");
	imageDelete.setAttribute('data-id', file_srl);
	imageDelete.setAttribute('data-target', upload_target_srl);
	imageDelete.innerHTML = "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>";
	
	var imageName = document.createElement("a");
	imageName.setAttribute('class',"fileName");
	imageName.innerHTML = filename;
	
	var imageNameDiv = document.createElement("div");
	imageNameDiv.setAttribute('id',"EditorToggleButton");
	imageNameDiv.setAttribute('class',"fileNameArea");
	
	imageNameDiv.appendChild(imageName);
	
	var imagePriview = document.createElement("a");
	imagePriview.setAttribute('class',"screenshot");
	imagePriview.setAttribute('rel', download_url);
	
	var imageAppend = document.createElement("img");
	imageAppend.setAttribute('data', download_url);
	imageAppend.setAttribute('src', getExtImage(download_url));
	
	var imageAppendDiv = document.createElement("div");
	imageAppendDiv.setAttribute('class',"imageArea");
	imageAppendDiv.setAttribute('file_srl', file_srl);
	imageAppendDiv.setAttribute('upload_target_srl', upload_target_srl);
	imageAppendDiv.setAttribute('download_url', download_url);
	imageAppendDiv.setAttribute('filename', filename);
	imageAppendDiv.appendChild(imageAppend);
	
	imageController.appendChild(imageAppendDiv);
	imageController.appendChild(imagePriview);
	imageController.appendChild(imageDelete);
	imageController.appendChild(imageNameDiv);
	
	var target = document.getElementById("uploadedFile");
	target.appendChild(imageController);
}
