var _item;
var _attr;
var _instance;
var fileSequence;
var html;
var wysiwygareaAvailable;
var selectedItem = [];
const acceptedExt = ["audio", "compress", "video", "excel", "powerpoint", "word", "access", "vb6", "html", "javascript", "notepad", "css"];

$(document).ready(function() {
	if (CKEDITOR.env.ie && CKEDITOR.env.version < 9) {
		CKEDITOR.tools.enableHtml5Elements( document );
	}
	
	wysiwygareaAvailable = isWysiwygareaAvailable();
	
	if (wysiwygareaAvailable) {
		setEditorConfig();
		editorInitialize();
	} else {
		editorElement.setAttribute('contenteditable', 'true');
		inlineEditorInitialize();
	}
});