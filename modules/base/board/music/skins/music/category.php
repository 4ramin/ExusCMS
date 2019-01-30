<div class="category">
	<?php if(!$this->board->config->hide_liststyle):?>
	<div class="cnb_n_list">
		<div class="listButton fr">
			<ul>
				<li class="classic on"><a href="<?php echo str::getUrl('bdstyle','list') ?>" class="bubble" title="Text Style"><b>List</b></a></li>
				<li class="zine"><a href="<?php echo str::getUrl('bdstyle','webzine') ?>" class="bubble" title="Webzine Style"><b>Webzine</b></a></li>
				<li class="gall2"><a href="<?php echo str::getUrl('bdstyle','flat') ?>" class="bubble" title="Flat Gallery Style"><b>Flat Gallery</b></a></li>
				<li class="gall5"><a href="<?php echo str::getUrl('bdstyle','search') ?>" class="bubble" title="Card Style"><b>Search</b></a></li>
			</ul>
		</div>
	</div>
	<?php endif;?>
	<div class="cate_area">
	
		<select class="sel_cate" name="sort" id="sort" onchange="categoryAjax(this.options[this.selectedIndex].value);">
			<option value="<?php echo str::getUrl('', __MODULEID,$this->base->get_params(__MODULEID),'bdstyle',$this->base->get_params('bdstyle'), 'list_count',20);?>" selected="selected">기본</option>
			<?php foreach($this->board->list_index as $key=>$val):?>
			<?php echo html::element('option', $val, $this->base->get_params('list_count') == $val ? [
				'selected' => 'selected',
				'value' => $this->board->model->getListCountLink($val)
			]:[
				'value' => $this->board->model->getListCountLink($val)
			]);?>
			<?php endforeach;?>
		</select>
		
		<select class="sel_cate" name="sort" id="sort" onchange="categoryAjax(this.options[this.selectedIndex].value);">
			<option value="<?php echo str::getUrl('', __MODULEID,$this->base->get_params(__MODULEID),'bdstyle',$this->base->get_params('bdstyle'));?>" selected="selected">기본</option>
			<?php foreach($this->board->sort_index as $key=>$val):?>
			<?php echo html::element('option', $this->board->lang['sort_'.$val], $this->base->get_params('sort_index') == $val ? [
				'selected' => 'selected',
				'value' => $this->board->model->getSortIndexLink($val)
			]:[
				'value' => $this->board->model->getSortIndexLink($val)
			]);?>
			<?php endforeach;?>
		</select>
		
		<select class="sel_cate" name="sort" id="sort" onchange="categoryAjax(this.options[this.selectedIndex].value);">
			<option value="<?php echo str::getUrl('',__MODULEID,$this->base->get_params(__MODULEID),'bdstyle',$this->base->get_params('bdstyle'));?>" <?php echo !$this->base->get_params('category')=="" ? 'selected="selected"' : ''?>>
				모두 (<?php echo $this->board->document_count;?>)
			</option>
			<?php foreach($this->board->category_list as $key=>$val):?>
			<?php echo html::element('option', $val['name'].' ('.$val['count'].')', $this->base->get_params('category') == $val['category_srl'] ? [
				'selected' => 'selected',
				'value' => $this->board->model->getCategoryLink($val['category_srl'])
			]:[
				'value' => $this->board->model->getCategoryLink($val['category_srl'])
			]);?>
			<?php endforeach;?>
		</select>
		
		<select class="sel_cate" name="sort" id="sort" onchange="categoryAjax(this.options[this.selectedIndex].value);">
			<option value="<?php echo str::getUrl('',__MODULEID,$this->base->get_params(__MODULEID),'bdstyle',$this->base->get_params('bdstyle'));?>" selected="selected">모두</option>
			<option value="<?php echo str::getUrl('',__MODULEID,$this->base->get_params(__MODULEID),'genre','1','bdstyle',$this->base->get_params('bdstyle'));?>" <?php echo $this->base->get_params('genre')==1 ? 'selected="selected"' : ''?>>팝</option>
			<option value="<?php echo str::getUrl('',__MODULEID,$this->base->get_params(__MODULEID),'genre','2','bdstyle',$this->base->get_params('bdstyle'));?>" <?php echo $this->base->get_params('genre')==2 ? 'selected="selected"' : ''?>>댄스</option>
			<option value="<?php echo str::getUrl('',__MODULEID,$this->base->get_params(__MODULEID),'genre','3','bdstyle',$this->base->get_params('bdstyle'));?>" <?php echo $this->base->get_params('genre')==3 ? 'selected="selected"' : ''?>>발라드</option>
			<option value="<?php echo str::getUrl('',__MODULEID,$this->base->get_params(__MODULEID),'genre','4','bdstyle',$this->base->get_params('bdstyle'));?>" <?php echo $this->base->get_params('genre')==4 ? 'selected="selected"' : ''?>>클래식</option>
			<option value="<?php echo str::getUrl('',__MODULEID,$this->base->get_params(__MODULEID),'genre','5','bdstyle',$this->base->get_params('bdstyle'));?>" <?php echo $this->base->get_params('genre')==5 ? 'selected="selected"' : ''?>>재즈</option>
			<option value="<?php echo str::getUrl('',__MODULEID,$this->base->get_params(__MODULEID),'genre','6','bdstyle',$this->base->get_params('bdstyle'));?>" <?php echo $this->base->get_params('genre')==6 ? 'selected="selected"' : ''?>>일렉트로닉</option>
			<option value="<?php echo str::getUrl('',__MODULEID,$this->base->get_params(__MODULEID),'genre','7','bdstyle',$this->base->get_params('bdstyle'));?>" <?php echo $this->base->get_params('genre')==7 ? 'selected="selected"' : ''?>>락</option>
			<option value="<?php echo str::getUrl('',__MODULEID,$this->base->get_params(__MODULEID),'genre','8','bdstyle',$this->base->get_params('bdstyle'));?>" <?php echo $this->base->get_params('genre')==8 ? 'selected="selected"' : ''?>>헤비메탈</option>
			<option value="<?php echo str::getUrl('',__MODULEID,$this->base->get_params(__MODULEID),'genre','9','bdstyle',$this->base->get_params('bdstyle'));?>" <?php echo $this->base->get_params('genre')==9 ? 'selected="selected"' : ''?>>보사노바</option>
		</select>
	</div>
</div>