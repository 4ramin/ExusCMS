
		config.toolbar = [
			{ name: 'clipboard', items: ['Undo', 'Redo', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-'] },
			{ name: 'insert', items: ['Table', 'HorizontalRule', 'Smiley','SpecialChar', 'PageBreak'] },
			'-',
			{ name: 'basicstyles', items: ['Font','FontSize','Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'] },
			{ name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
			{ name: 'links', items: ['Link', 'Unlink'] },
			'/',
			{ name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
			{ name: 'colors', items: ['TextColor', 'BGColor'] },
		],
		config.extraPlugins = 'sourcedialog, font'