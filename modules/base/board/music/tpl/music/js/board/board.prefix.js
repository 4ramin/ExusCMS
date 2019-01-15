var viewDocumentPrefix = 'viewing_g2';
var ajaxDocument = 'view_bd';
var documentContent = 'content_view';
var searchForm = 'boardSearchForm';
var glob_srl = null;
var isForRedirect = false;
var requestBackendFile = 'index.php';
var tmp_comment = undefined;

//Readed Document Object
var readObject = $('#' + documentContent);
var reRegistryDocument = function () {
	readObject = $('#' + documentContent);
};

$(document).ready(function() {
reRegistryDocument();
});

//Instance Template
if (typeof template === "undefined") {
	var template = {};
}

//Process Variables
if (typeof disp === "undefined") {
	var disp = {};
}

if (typeof proc === "undefined") {
	var proc = {};
}

const BR = "\n";
const CANNOT_STAR = "별점을 매길 수 없습니다.";
const CONFIRM_STAR = "정말 별점을 매기겠습니까?";
const COMPLETE_STAR = "별점이 완료되었습니다.";

const CANNOT_VOTE = "추천할 수 없습니다.";
const CONFIRM_VOTE = "정말 추천하시겠습니까?";
const COMPLETE_VOTE = "추천되었습니다.";

const CANNOT_BLAMED = "비추천할 수 없습니다.";
const CONFIRM_BLAMED = "정말 비추천하시겠습니까?";
const COMPLETE_BLAMED = "비추천되었습니다.";

const SUCCESS_COPY = "복사가 완료되었습니다.";

const COMPLETE_COMMENT_BLAMED = "댓글 비추천을 완료했습니다.";
const COMPLETE_COMMENT_VOTE = "댓글 추천을 완료했습니다.";

const COMPLETE_ARTIST_UPDATE = "아티스트 업데이트를 완료했습니다.";
const COMPLETE_GENRE_UPDATE = "장르 업데이트를 완료했습니다.";
