<?php 
	if(!defined("__FLOWER__")) exit();
	
	if(isset($this->base))
	{
		$error_message = $this->base->get('err_msg');
		$this->base->addJS('modules/base/tpl/css/errormsg.css');
	}
?>
<head>
	<title>심각한 오류가 발생하였습니다.</title>
	<link rel="stylesheet" href="modules/base/tpl/css/errormsg.css" type="text/css" media="all"></link>
</head>

<body>
	<div>
		<div>
			<header>
				<h1 class="page-title">
					<img src="modules\base\tpl\logo.png">
					<a>Flower CMS</a>
				</h1>
			</header>

			<div class="msg"><?php echo $error_message ?></div>
		</div>
	</div>
</body>