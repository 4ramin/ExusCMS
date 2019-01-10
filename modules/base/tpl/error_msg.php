<?php if(!defined("__FLOWER__")) exit(); ?>
<?php 
	if(is_object($this->base)){
		$error_message = $this->base->get('err_msg');
	}
?>
<head>
	<title>심각한 오류가 발생하였습니다.</title>
</head>
<body style="height: 100%;background-color:#1275b2;width: 100%;width: 100%;padding: 0;display: table;height: 100%;position: absolute;top: 0;left: 0;margin: 0;">
	<div style="padding:15px;vertical-align: middle;display: table-cell;margin: 0;">
		<div style="background-color:#fff;width:800px;min-height: 300px;margin:0 auto;border:1px solid #EEE;padding:0px 15px;border-radius:3px;box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);box-sizing:border-box;border-radius:5px">
			<header style="border-bottom: 1px dotted #b3b3b3;">
				<h1 class="page-title">
					<img style="width:35px;height:auto" src="module\base\tpl\logo.png">
					<a style="font-size: 0.8em;font-weight: lighter;line-height: 1.2em;color: #0074bd;word-wrap: break-word;">Flower CMS</a>
				</h1>
			</header>

			<div style="margin:15px 7px"><?php echo $error_message ?></div>
		</div>
	</div>
</body>