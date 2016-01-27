<?php
if(isset($_REQUEST['mode'])) {
	switch ($_REQUEST['mode']) {
    case "upload":
        upload();
        break;
    case "download":
        download();
        break;
    default:
        echo "ERROR";
        break;
	}
	exit;
}

function upload() {
	if(isset($_FILES['file'])) {
		$content = readfile($_FILES['file']['tmp_name']);
		echo $content;
	}
	return;
}

function download() {
	if(isset($_FILES['file'])) {
		$content = readfile($_FILES['file']['tmp_name']);
		echo $content;
	}
	return;
}
