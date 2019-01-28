var globalData;
$.core.Request.addAjaxCallback('completeMoveCategory', function (_) 
{
	globalData.instance.refresh();
	//jQuery('#data').jstree(true).refresh(true);
});

var to = false;
$('#plugins4_q').keyup(function () {
    if (to) {
		clearTimeout(to);
	}
	
    to = setTimeout(function () {
		var v = $('#plugins4_q').val();
		$('#data').jstree(true).search(v);
	}, 250);
});

$(function () {
	$('#addCategoryNodes').click(function() {
		$(".x_modal-backdrop").show();
		$("#__category_info").show();
	});
	
	$('#closeCategoryNodes').click(function() {
		$(".x_modal-backdrop").hide();
		$("#__category_info").hide();
	});
});

$('#data').jstree({
	'core' : {
		"check_callback" : true,
		'data' : {
			'url' : '?mid=' + core_flower.mid + "&act=getCategory",
			dataType : "json",
			'data' : function (node) {
				return { 'id' : node.id };
			}
		},
		'check_callback' : function(o, n, p, i, m) {
			
		},
		'themes' : {
			'responsive' : false,
			'variant' : 'big',
			'stripes' : true
		}
	},
	"contextmenu" : {
		'items' : function(node) {
			var tmp = $.jstree.defaults.contextmenu.items();
			delete tmp.create.action;
			tmp.create.label = "New";
			tmp.create.submenu = {
				"Category" : {
					"separator_after" : true,
					"label" : "Category",
					"action" : function (data) {
						var inst = $.jstree.reference(data.reference);
						var obj = inst.get_node(data.reference);
						
						inst.create_node(obj, { type : "default" }, "last", function (new_node) {
							setTimeout(function () {								
								inst.edit(new_node);
							}, 0);
						});
					}
				}
			}
			
			return tmp;
		}
	},
	"plugins" : [
		"contextmenu", "dnd", "search", "state", "types", "wholerow", "state", "changed"
	]
}).on('move_node.jstree', function (e, data) {
	globalData = data;
	onMove(e, data);
}).on('delete_node.jstree', function (e, data) {
	globalData = data;
	onDelete(e, data);
}).on('rename_node.jstree', function (e, data) {
	globalData = data;
	onRename(e, data);
});