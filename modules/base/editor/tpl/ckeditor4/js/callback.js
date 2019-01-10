$.core.Request.addAjaxCallback('completeRemoveFile', function (args) {
	if (args){
		var regexp = new RegExp('<(img) [^>]*data-file-srl="(' + args.fileSrl + ')"[^>]*>', 'g');
		_instance.setData(_instance.getData().replace(regexp, ''));
		$('.imageDelete[data-id=' + args.fileSrl + ']').closest('li').remove();
		if ($('#fileList li').length == 0) {
			$('#fileList, .editOpt').hide();
		}
	}
});

$.core.Request.addAjaxCallback('completeLoadFileList', function (args) {
	if (args) {
		for (var item in args) {
			var _item = args[item];
			var fileUrl = './file/attach/' + _item.target + '/' + _item.files;
			
			imageAppends(_item.srl, _item.target, fileUrl, _item.origin);
		}
		
		registryFileHandler();
	}
});