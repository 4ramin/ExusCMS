<?php if(!defined("__FLOWER__")) exit(); ?>

<nav class="gnb" id="gnb">
	<ul class="mul">
	
	
		<li class="gnb_menu">
			<i class="fa fa-tachometer" aria-hidden="true"></i> 
			<a href="<?php echo str::getUrl('',__MODULEID,'admin'); ?>">
				<span><?php echo $this->admin->lang['dashboard']; ?></span>
			</a>
		</li>
		
		<li class="menu_sec root_gnb gnb_menu">
			<i class="fa fa-pencil" aria-hidden="true"></i> 
			<a>
				<span><?php echo $this->admin->lang['design']; ?></span>
			</a><b class="pos_v"></b>
		</li>
		
		<ul class="sub_depth">
			<li class="gnb_menu">
				<i class="fa fa-th-large" aria-hidden="true"></i> 
				<a href="<?php echo str::getUrl('',__MODULEID,'admin','act','dispAdminMenuEdit'); ?>">
					<span><?php echo $this->admin->lang['menuedit']; ?></span>
				</a>
			</li>
			<li class="gnb_menu">
				<i class="fa fa-columns" aria-hidden="true"></i> 
				<a href="">
					<span><?php echo $this->admin->lang['layoutedit']; ?></span>
				</a>
			</li>
		</ul>
		
		
		
		<li class="menu_sec root_gnb gnb_menu">
			<i class="fa fa-folder" aria-hidden="true"></i> 
			<a>
				<span><?php echo $this->admin->lang['module']; ?></span>
			</a>
			<b class="pos_v"></b>
		</li>
		
		<ul class="sub_depth">
			<li class="gnb_menu">
				<i class="fa fa-pencil-square" aria-hidden="true"></i> 
				<a href="<?php echo str::getUrl('',__MODULEID,'admin','act','dispAdminPluginList'); ?>">
					<span><?php echo $this->admin->lang['moduleedit']; ?></span>
				</a>
			</li>
			<li class="gnb_menu">
				<i class="fa fa-pencil-square" aria-hidden="true"></i> 
				<a href="<?php echo str::getUrl('',__MODULEID,'admin','act','dispAdminComponentList'); ?>">
					<span><?php echo $this->admin->lang['modulecomponent']; ?></span>
				</a>
			</li>
			<li class="gnb_menu">
				<i class="fa fa-map-o" aria-hidden="true"></i> 
				<a href="<?php echo str::getUrl('',__MODULEID,'admin','act','dispAdminBoardList'); ?>">
					<span><?php echo $this->admin->lang['modulelist']; ?></span>
				</a>
			</li>
		</ul>
		
		
		<li class="menu_sec root_gnb gnb_menu">
			<i class="fa fa-plug" aria-hidden="true"></i> 
			<a>
				<span><?php echo $this->admin->lang['system']; ?></span>
			</a><b class="pos_v"></b>
		</li>
			
		<ul class="sub_depth">
			<li class="gnb_menu"><i class="fa fa-desktop" aria-hidden="true"></i> 
				<a href="<?php echo str::getUrl('',__MODULEID,'admin','act','dispAdminPluginAdmin'); ?>">
					<span><?php echo $this->admin->lang['pluginlist']; ?></span>
				</a>
			</li>
			<li class="gnb_menu"><i class="fa fa-desktop" aria-hidden="true"></i> 
				<a href="">
					<span><?php echo $this->admin->lang['widgetlist']; ?></span>
				</a>
			</li>
			<li class="gnb_menu"><i class="fa fa-tasks" aria-hidden="true"></i></i> 
				<a href="">
					<span><?php echo $this->admin->lang['easyinstall']; ?></span>
				</a>
			</li>
			<li class="gnb_menu">
				<i class="fa fa-cogs" aria-hidden="true"></i> 
				<a href="<?php echo str::getUrl('',__MODULEID,'admin','act','dispAdminSystemConfig'); ?>">
					<span><?php echo $this->admin->lang['systemsetup']; ?></span>
				</a>
			</li>
		</ul>
		
		
		<li class="menu_sec root_gnb gnb_menu">
			<i class="fa fa-users" aria-hidden="true"></i> 
			<a>
				<span><?php echo $this->admin->lang['member']; ?></span>
			</a><b class="pos_v"></b>
		</li>
		
		<ul class="sub_depth">
			<li class="gnb_menu">
				<i class="fa fa-user" aria-hidden="true"></i> 
				<a href="<?php echo str::getUrl('',__MODULEID,'admin','act','dispAdminMemberList'); ?>">
					<span><?php echo $this->admin->lang['memberlist']; ?></span>
				</a>
			</li>
		</ul>
		
		
		<li class="menu_sec root_gnb gnb_menu">
			<i class="fa fa-server" aria-hidden="true"></i> 
			<a>
				<span><?php echo $this->admin->lang['content']; ?></span>
			</a><b class="pos_v"></b>
		</li>
		
		
		
		<ul class="sub_depth">
			<li class="gnb_menu"><i class="fa fa-envelope" aria-hidden="true"></i> 
				<a href="<?php echo str::getUrl('',__MODULEID,'admin','act','dispAdminDocumentList'); ?>">
					<span><?php echo $this->admin->lang['documentlist']; ?></span>
				</a>
			</li>
			<li class="gnb_menu">
				<i class="fa fa-file-code-o" aria-hidden="true"></i> 
				<a href="<?php echo str::getUrl('',__MODULEID,'admin','act','dispAdminFileList'); ?>">
					<span><?php echo $this->admin->lang['filelist']; ?></span>
				</a>
			</li>
			<li class="gnb_menu">
				<i class="fa fa-comment" aria-hidden="true"></i> 
				<a href="<?php echo str::getUrl('',__MODULEID,'admin','act','dispAdminCommentList'); ?>">
					<span><?php echo $this->admin->lang['commentlist']; ?></span>
				</a>
			</li>
		</ul>
		
	</ul>
</nav>