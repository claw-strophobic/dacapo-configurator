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
	if(isset($_REQUEST['xml'])) {
		$content = $_REQUEST['xml'];
		$dom = new DomDocument('1.0');
		$dom->preserveWhiteSpace = false;
		$dom->formatOutput = true;
		$dom->loadXML($content);

		header('application/force-download');
		header("Content-Disposition:'attachment; filename=dacapo.conf'");
		echo $dom->saveXml();
	}
	return;
}
