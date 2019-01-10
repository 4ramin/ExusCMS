<?php if(!defined("__FLOWER__")) exit(); ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
	<!--//META-->
	<meta charset="utf-8">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<link rel="shortcut icon" href="favicon.ico" />
	<link rel="apple-touch-icon" href="mobicon.png" />
<?php foreach($this->base->getMeta() as $metaInfo):?>
	<?php echo html::element('meta', '', [
		'name' => $metaInfo['name'],
		'content' => $metaInfo['content']
	]);?>
<?php endforeach;?>

	<!--//CSS-->
<?php foreach($this->base->getCSS() as $cssLink):?>
	<?php echo html::element('link', '', [
		'rel' => 'stylesheet',
		'href' => $cssLink,
		'type' => 'text/css',
		'media' => 'all'
	]);?>
<?php endforeach;?>

	<!--//JS-->
<?php foreach($this->base->getJS() as $jsLink):?>
	<?php echo html::element('script', '', [
		'src' => $jsLink
	]);?>
<?php endforeach;?>

	<!--[if lt IE 9]>
		<script src="./library/js/ie/html5shiv.js"></script>
		<script src="./library/js/ie/response.min.js"></script>
	<![endif]-->
	<!--[if IE 9]>
		<script src="./library/js/ie/ie9.js"></script>
	<![endif]-->
	<!--[if IE 8]>
		<script src="./library/js/ie/ie8.js"></script>
	<![endif]-->
	<!--[if IE 7]>
		<script src="./library/js/ie/ie7.js"></script>
	<![endif]-->

	<!--//TITLE-->
	<title><?php echo $this->base->get('title'); ?></title>
</head>

<noscript>브라우져가 스크립트를 지원하지 않습니다.</noscript>

<script>
//<![CDATA[
	core_flower = [];
	core_flower.isLogged = <?php echo $this->base->isLogged() ? 'true' : 'false'; ?>;
	core_flower.def_mid = "<?php echo __MODULEID; ?>";
	core_flower.mid = "<?php echo $_GET[__MODULEID]; ?>";
	core_flower.srl = "<?php echo $_GET['srl']; ?>";
	core_flower.url = "<?php echo request::get_host(); ?>";
//]]>
</script>
