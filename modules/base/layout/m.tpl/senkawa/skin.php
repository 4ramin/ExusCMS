<?php if(!defined("__FLOWER__")) exit(); ?>

<body>
	<div class="pad" id="top_btn">
		<div class="top_btn_wp">
			<a href="#" onclick="$.core.Effect.FocusAnimate(0)" title="상단으로" class="scroll-top"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>
			<a href="#ft" onclick="$.core.Effect.FocusAnimate($.core.Browser.getBodyMiddleTop())" title="중앙으로" class="scroll-bottom"><i class="fa fa-circle" aria-hidden="true"></i></a>
			<a href="#ft" onclick="$.core.Effect.FocusAnimate($.core.Element.getInnerHeight())" title="하단으로" class="scroll-bottom"><i class="fa fa-arrow-down" aria-hidden="true"></i></a>
			<a href="#" onclick="$.core.Effect.FocusAnimate('#comment_padding ul', 300);" title="댓글보기" class="scroll-center"><i class="fa fa-comment" aria-hidden="true"></i></a>
		</div>
	</div>
	<!--menu-->
	<div id="gnb_cover">
		<div class="gnb_area">
			<a href="./">
				<img class="logo" src="module/base/layout/tpl/senkawa/logo_blue.png" alt="logo">
			</a>
			<nav class="gnb" id="gnb">
				<ul style="padding: 0;margin: 0;" class="nav navbar-nav navbar-left">
					<?php foreach($this->menu as $key=>$value): ?>
						<li class="dropdown <?php echo ($value[__MODULEID]==$_GET[__MODULEID]) ? "current_menu" : "";?>">
							<a href="<?php echo $value['link']; ?>" class="first_a">
								<?php echo $value['title']; ?>
							</a>
							<?php if(isset($value['submenu'])):?>
								<ul class="dropdown-menu">
									<?php foreach($value['submenu'] as $key2=>$value2){ ?>
										<?php foreach($value2 as $key3=>$value3){ ?>
											<?php echo $key3=='link' ? '<li><a href="'.$value3.'">' : $value3.'</a></li>' ?>
										<?php } ?>
									<?php } ?>
								</ul>
							<?php endif;?>
						</li>
					<?php endforeach; ?>
				</ul>
			</nav>
			
			<div style="float:right">
			
				<div class="search_hover" >
					<form method="get" class="on">
						<input type="hidden" name="mid" value="search">
						<input type="hidden" name="act" value="search">
						<input type="hidden" name="page" value="1">
						<input type="text" name="keyword" id="search-main" placeholder="검색" class="tt-input" value="<?php echo $_GET['keyword']; ?>" autocomplete="off" spellcheck="false" dir="auto" style="position: relative; vertical-align: top;">
						<i class="fa fa-search search_icon" aria-hidden="true"></i>
					</form>
				</div>
				<?php if(!$this->base->isLogged()):?>
					<nav style="display:inline-block" id="gnb">
						<ul style="padding: 0;margin: 0;" class="nav navbar-nav member-menu">
							<li class="dropdown">
								<a href="<?php echo str::getUrl('',__MODULEID,'member','act','dispMemberLogin'); ?>" class="first_a">
									로그인
								</a>
								<ul class="dropdown-menu">
									<li>
										<a href="<?php echo str::getUrl('',__MODULEID,'member','act','dispMemberSignin'); ?>">
											회원가입
										</a>
									</li>
									<li>
										<a href="#" onclick="Browser.Bookmark('localhost','즐겨찾기')">
											즐겨찾기
										</a>
									</li>
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
	<!--content-->
		<div class="content_pad" class="clearfix">
			<article class="list_box flower_content">
				<?php
					$skin = $this->base->get('skin');
					if(isset($skin)) include($skin);
				?>
			</article>
		</div>
	<div id="footer-container">
		<div style="max-width: 1320px;margin:0 auto">
			<img style="float:left;margin-top: 5px;margin-right: 15px;margin-left: 15px;" src="module/base/layout/tpl/senkawa/logo-bottom.png" alt="logo">
			<a style="line-height: 45px;font-size: 12px;">Copyright (C) $.corecms. All rights reserved.</a>
		</div>
	</div>
</body>
