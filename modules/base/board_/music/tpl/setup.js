
$(function () {
	$('.multiorder_add').click(function () {
		$.core.OptionList.moveSelectedItem('.multiorder_show', '.multiorder_selected');
	});
	$('.multiorder_del').click(function () {
		$.core.OptionList.moveSelectedItem('.multiorder_selected', '.multiorder_show');
	});
	$('.multiorder_up').click(function () {
		$.core.OptionList.moveItemUp('.multiorder_selected');
	});
	$('.multiorder_down').click(function () {
		$.core.OptionList.moveItemDown('.multiorder_selected');
	});
	$('.multiorder_top').click(function () {
		$.core.OptionList.moveItemTop('.multiorder_selected');
	});
	$('.multiorder_bottom').click(function () {
		$.core.OptionList.moveItemBottom('.multiorder_selected');
	});
});