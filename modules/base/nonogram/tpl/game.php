<?php if(!defined("__FLOWER__")) exit();?>
<?php
	$this->base->addJS("/modules/base/nonogram/tpl/js/nonogram.js");
?>
<style>
.gameBoard {
    height: 900px;
}
.content a{
      background-color: #f1f1f1;
    margin: 5px;
    padding: 3px 9px;
    color: #717171;}
.item{
    float: left;
    border: 1px solid #797979;
    border-top: 0px;
    border-left: 0px;
    width: 15px;
    height: 15px;
}
.game{
    position: absolute;
	display: inline-block;
    border-top: 1px solid #656667;
    border-left: 1px solid #656667;
    top: 170px;
	left:170px;
}
.gameInfo{
    position: relative;
     width: 50%;
    margin: 0 auto;
}
.cellinfo{
	top: 0px;
    position: absolute;
    left: 170px;
    height: 170px;
    background-color: #eee;
	border: 1px solid #daefff;
    border-left: 0px;
    border-bottom: 0px;
}
.cellinfo div{
	height: 170px;
    text-align: center;
    vertical-align: middle;
    line-height: 1;
    float: left;
    width: 15px;
    font-size: 10px;
    border-right: 1px solid #b5b1b1;
    white-space: pre-wrap;
    font-weight: bold;
    font-family: Nanum Gothic, 나눔고딕, NanumGothic, NG, 'Segoe UI', "Yoon Gothic", "Apple Gothic", "HY Gulim", "MalgumGothic", "HY Dotum", "Lexi Gulim", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
	display: flex;
	justify-content: center;
	align-items: flex-end;
    padding-bottom: 7px;
}
.rowinfo{
	top: 170px;
    position: absolute;
    left: 0px;
    width: 170px;
    background-color: #eee;
	border: 1px solid #daefff;
    border-top: 0px;
    border-right: 0px;
}
.rowinfo div{
	height: 15px;
    text-align: right;
    vertical-align: middle;
    line-height: normal;
    width: 170px;
    line-height: 14px;
    font-size: 10px;
    border-bottom: 1px solid #8c8888;
    font-weight: bold;
    font-family: Nanum Gothic, 나눔고딕, NanumGothic, NG, 'Segoe UI', "Yoon Gothic", "Apple Gothic", "HY Gulim", "MalgumGothic", "HY Dotum", "Lexi Gulim", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    padding-right: 7px;
}
.gameBoard{
	display: block;
}
line{
    position: absolute;
    width: 2px;
    background-color: #22a4ff;
    opacity: 0.6;}
.cell1{background-color:#fff;border-color: #daefff  !important;}
.cell2{background-color:#e6f6ff;border-color: #f2f9ff  !important;}
</style>

<audio src="http://66.90.93.122/ost/lupin-iii-jazz-bossa-fusion/zfocwkdw/07-just%20fall%20in%20love.mp3" autoplay></audio>

<div class="list_area">
	<div class="content newclearfix">
		<a class="tip">Tip!</a>
		<a class="answer">Answer!</a>
		<div class="gameBoard">
			<div class="gameInfo">
				<div class="cellinfo"></div>
				<div class="rowinfo"></div>
				<div class="game"></div>
			</div>
		</div>
	</div>
</div>