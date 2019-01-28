var requestUrl = "index.php";

function onRename(e, data) {
	var target = data.node.original;
	
	var params = {
		[core_flower.def_mid]: core_flower.mid,
		act: 'procBoardCategoryRename',
		category_srl: target.category_srl,
		text: data.node.text
	}
	
	$.core.Request.ajax("POST", requestUrl, params, 'completeMoveCategory');
}

function onMove(e, data) {
	var target = data.node.original;
	var target_submenu = data.node.original;
	var target_parent = data.node.parent;
	var old_position = data.old_position;
	var position = data.position;
	var old_parent = data.old_parent;
	var parent = data.parent;
	var parent_item = data.old_instance._model.data[parent].original;
	var new_item = data.new_instance._model.data[parent].original;
	var instance = $('#data').jstree(true);

	//Move with no depth
	if(parent==="#") {
		if(target_parent=="#") {
			var params = {
				[core_flower.def_mid]: core_flower.mid,
				act: 'procBoardCategoryFolderOut',
				category_srl: target.category_srl
			}
			
			//exus.Request.ajax("POST", requestUrl, params, 'completeMoveCategory');
		}
		
		if (old_position > position) {
			var old_item_category_srl = instance._model.data[instance._model.data["#"].children[position+1]].original.category_srl;
		} else {
			var old_item_category_srl = instance._model.data[instance._model.data["#"].children[position-1]].original.category_srl;
		}
		
		var params = {
			[core_flower.def_mid]: core_flower.mid,
			act: 'procBoardCategoryMove',
			category_srl: target.category_srl,
			type: target.type,
			parent_srl: old_item_category_srl
		}
		
		$.core.Request.ajax("POST", requestUrl, params, 'completeMoveCategory');
		console.log('move item');
	
	} else {
		if (old_parent == parent) {
		} else {
			var params = {
				[core_flower.def_mid]: core_flower.mid,
				act: 'procBoardCategoryMoveFolder',
				category_srl: target.category_srl,
				parent_srl: parent_item.category_srl
			}
			
			$.core.Request.ajax("POST", requestUrl, params, 'completeMoveCategory');
			console.log('move to folder');
		}
	}
}

function onDelete(e, data) {
	var target = data.node.original;
	
	var params = {
		[core_flower.def_mid]: core_flower.mid,
		act: 'procBoardCategoryRemove',
		category_srl: target.category_srl,
	}
	
	$.core.Request.ajax("POST", requestUrl, params, 'completeMoveCategory');
}