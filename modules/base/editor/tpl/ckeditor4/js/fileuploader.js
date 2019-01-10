var fileHandler = './index.php?mid=files&act=uploadAjaxFile';

$('#fileupload').fileupload({
	url: fileHandler,
	formData: initFormData(),
	dataType: 'json',
	type: 'POST',
	add: function(e, data) {
		var uploadFile = data.files[0];
		var isValid = true;
		
		if (!(/png|jpe?g|gif|mp3|zip|gz|mp4/i).test(uploadFile.name)) {
			alert('png, jpg, gif 만 가능합니다');
			isValid = false;
		} else if (uploadFile.size > (8000 << 15)) { // 256mb
			alert('파일 용량은 5메가를 초과할 수 없습니다.');
			isValid = false;
		}
		
		if (isValid) {
			$('#progress .progress-bar').css('display', 'block');
			data.submit();
		}
	},
	fail: function(e, data) {
		$('#progress .progress-bar').css('display', 'none');
	},
	done: function (e, data) {
		fileData = data.result;
		
		if (fileData.sequence) {
			$('input[name=file_sequence]').val(fileData.sequence);
		}
		
		if (fileData.fileName) {
			insertTag(fileData);
			$('#progress .progress-bar').css('display', 'none');
		}
	},
	progressall: function (e, data) {
		var progress = parseInt(data.loaded / data.total * 100, 10);
		$('#progress .progress-bar').css(
			'width',
			progress + '%'
		);
	}
}).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');