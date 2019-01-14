<?php if(!defined("__FLOWER__")) exit(); ?>
<body>
	<div id="gnb_cover">
		<div class="gnb_area">
			<a href="./"><img class="logo" src="modules/base/layout/tpl/senkawa/logo_blue.png" alt="logo"></a>
			<nav class="gnb" id="gnb">
				<ul class="nav navbar-nav navbar-left">
				<?php foreach($this->menu as $menuItem): ?>
					<li class="dropdown<?php echo ($menuItem[__MODULEID] == $_GET[__MODULEID]) ? " current_menu" : "";?>">
						<?php echo html::element('a', $menuItem['title'], [
							'href' => $menuItem['link'],
							'class' => 'first_a'
						]);?>
						<?php if(isset($menuItem['submenu'])):?>
							<ul class="dropdown-menu">
							<?php foreach($menuItem['submenu'] as $submenuItem){ ?>
								<li>
									<?php echo html::element('a', $submenuItem['title'], [
										'href' => $submenuItem['link']
									]);?>
								</li>
							<?php } ?>
							</ul>
						<?php endif;?>
					</li>
				<?php endforeach; ?>
				</ul>
			</nav>
			<div class="left_nav">
				<div class="search_hover" >
					<form method="get" class="on">
						<input type="hidden" name="mid" value="search">
						<input type="hidden" name="act" value="search">
						<input type="hidden" name="page" value="1">
						<?php echo html::element('input', '', [
							'keyword' => 'keyword',
							'id' => 'search-main',
							'placeholder' => '검색',
							'class' => 'tt-input',
							'value' => $_GET['keyword'],
							'autocomplete' => 'off',
							'spellcheck' => 'false',
							'dir' => 'auto',
							'style' => 'position: relative; vertical-align: top;'
						]);?>
						<i class="fa fa-search search_icon" aria-hidden="true"></i>
					</form>
				</div>
				<?php if(!$this->base->isLogged()):?>
					<nav style="display:inline-block" id="gnb">
						<ul style="padding: 0;margin: 0;" class="nav navbar-nav member-menu">
							<li class="dropdown">
								<a href="<?php echo str::getUrl('', __MODULEID, 'member', 'act', 'dispMemberLogin'); ?>" class="first_a">로그인</a>
								<ul class="dropdown-menu">
									<li><a href="<?php echo str::getUrl('', __MODULEID, 'member', 'act', 'dispMemberSignin'); ?>">회원가입</a></li>
									<li><a href="#" onclick="$.core.Browser.Bookmark('localhost', '즐겨찾기')">즐겨찾기</a></li>
								</ul>
							</li>
						</ul>
					</nav>
				<?php else:?>
					<span onclick="javascript:member_logout();" class="btn_slim">로그아웃</span>
				<?php endif;?>
			</div>
		</div>
	</div>
	<div class="content_pad" class="clearfix">
		<aside class="list2_box">
			<div class="login_box">
				<?php if(!$this->base->isLogged()):?>
					<form id="simple_outlogin" type="post">
						<div class="login-box">
							<div class="login-cell">
								<input type="text" name="mb_id" id="mb_id" class="form_login input-sm" required="" placeholder="아이디" tabindex="21">
								<input autocomplete="off" type="password" name="mb_password" id="mb_password" class="form_login input-sm no-top-border" required="" placeholder="비밀번호" tabindex="22">
							</div>
							<div class="login-cell login-btn" tabindex="23" onclick="javascript:member_login()">로그인</div>	
						</div>
					</form>
					<div class="login-misc font-12 text-muted ellipsis">
						<div class="pull-left">
							<label><input type="checkbox" name="auto_login" value="1" id="remember_me" class="remember_me"> 자동로그인</label>
						</div>
						<div class="pull-right text-muted">
							<a href="<?php echo str::getUrl(__MODULEID, 'member', 'act', 'dispMemberSignin');?>"><span class="text-muted">회원가입</span></a>
							<span class="bar">|</span>
							<a href="" class="win_password_lost"><span class="text-muted">정보찾기</span></a>
						</div>
						<div class="clearfix"></div>
					</div>
				<?php else:?>
					<div class="login_info">
					<a href="<?php echo str::getUrl(__MODULEID, 'member', 'act', 'dispMemberInfo');?>">
						<img class="user_ico" src="common\img\user.png"/>
					</a>
					<span class="welcome"><?php echo $this->base->getNickName(); ?>님 환영합니다.</span>
					<?php if($this->base->isAdmin()):?>
						<a class="user_menu" href="<?php echo str::getUrl(__MODULEID, 'admin'); ?>" target="_blank">관리자</a>
					<?php endif;?>
					</div>
				<?php endif;?>
			</div>
			<div class="widget_box">
				<div class="widget_title"><?php echo $this->base->getRootMenuTitle($this->menu); ?></div>
				<?php if($this->base->getSubMenu($this->menu)):?>
				<?php foreach($this->base->getSubMenu($this->menu) as $key2=>$submenu){ ?>
					<div class="ca-sub1 off"><a class="no-sub" href="<?php echo $submenu['link'];?>"><?php echo $submenu['title'];?></a></div>
				<?php } ?>
				<?php endif;?>
			</div>
			<?php
				$this->base->display_widget("popularDocument");
				$this->base->display_widget("commentList");
			?>
		</aside>
		<article class="list_box flower_content"><?php echo $this->base->get('article'); ?></article>
	</div>
	<div id="footer-container">
		<div class="footer-content">
			<div class="footer-left"><a href="/"><img class="footer-logo" src="modules/base/layout/tpl/senkawa/_logo.png" alt="logo"></a></div>
			<div class="footer-right"><a class="footer-copyright"><span style="font-size:14px;font-weight:bold;">EXUS CMS</span><br/>Copyright (C) Exuscms. All rights reserved.</a></div>
		</div>
	</div>
</body>