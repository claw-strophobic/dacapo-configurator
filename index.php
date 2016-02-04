<?php
	$CONFIG['baseurl'] = 'http://'.@$_SERVER['HTTP_HOST'].'/~tkorell/TEST/XML';
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>dacapo configurator</title>
	<!-- script src="https://code.jquery.com/jquery-1.10.2.js"></script -->
	<script type="text/javascript" src="../lib/jquery-2.2.0.min.js"></script>
	<script type="text/javascript" src="../lib/swfobject.js"></script>
	<link rel="stylesheet" href="configurator.css" type="text/css" />
</head>
<body>
	<noscript>
		<div class="de" style="display:block;background:red;color:white;padding:10px;font-weight:bold;">
			JavaScript wird für diese Seite benötigt!
		</div>
		<div class="en" style="display:block;background:red;color:white;padding:10px;font-weight:bold;">
			Please enable JavaScript for this site!
		</div>
	</noscript>
	<span id="objectspan">
		<object id="fontListSWF" name="fontListSWF"
				type="application/x-shockwave-flash"
				data="./FontList.swf" width="1" height="1"
			>
			<param name="movie" value="./FontList.swf">
			<embed src="./FontList.swf" width="1" height="1" />
			<div class="en no-flash">
				The "You don't have flash" message. Or any other backup content.
			</div>
			<div class="de no-flash">
				Du hast kein Flash installiert oder aktiviert. Somit steht Dir die Schriftauswahl nicht zur Verfügung.
			</div>
		</object>
	</span>
	<form>
		<input type="hidden" name="path" value="<?php echo $CONFIG['baseurl'] ?>">
		<div id="debug-output"></div>
		<div id="doku" class="hidden"><ul></ul></div>
		<fieldset>
			<div id="version">Config-Version: <span></span></div>
			<div class="menu-icon-wrapper">
				<img class="save-ico icon" src="img/save-icon.png" height="30" alt="Save File" onclick="guis.save();">
			</div>
			<div class="menu-icon-wrapper openicon">
				<input id="inputfile" name="conf" type="file" size="50" accept="text/*" onchange="guis.open(event);">
			</div>
		</fieldset>
		<div>
			<nav id="menu">
				<ul>
					<li id="nav-window" onclick="guis.menuClick(1);"><span>GUI Window</span></li>
					<li id="nav-fullscreen" onclick="guis.menuClick(2);"><span>GUI Fullscreen</span></li>
					<li id="nav-meta" onclick="guis.menuClick(3);"><span>MetaData</span></li>
					<li id="nav-audio" onclick="guis.menuClick(4);"><span>Audio & Debug</span></li>
				</ul>
			</nav>
			<div id="gui" class="div-gui hideableTab">
				<fieldset class="border-fieldset">
					<legend class="legend-gui">
						<span>GUI</span>
					</legend>
					<div>
						<input id="lorem" type="text"/>
						<img class="refresh-icon icon" src="img/refresh-icon.png" height="30" alt="change preview" onclick="guis.changePreview();">
					</div>
					<?php	require_once dirname(__FILE__) . '/configurator_gui_window.php'; ?>
					<?php	require_once dirname(__FILE__) . '/configurator_gui_fullscreen.php'; ?>
				</fieldset>
			</div>
			<?php	require_once dirname(__FILE__) . '/configurator_meta.php'; ?>
			<div id="audio-marker" class="div-gui hideableTab">
				<fieldset class="border-fieldset">
					<fieldset>
						<legend>Audio Engine:</legend>
						<div id="audio_engine"></div>
					</fieldset>
					<fieldset>
						<legend>Debug Options:</legend>
						<div id="debug"></div>
					</fieldset>
				</fieldset>
			</div>
		</div>
	</form>


	<ul id="tag-list">
	</ul>
	<div id="message_output"></div>
	
<script type="text/javascript" src="configurator.js?v=2.4"></script>
</body>

</html>
<?php
	require_once dirname(__FILE__) . '/configurator_metafieldlist.php';
	require_once dirname(__FILE__) . '/configurator_field.php';
?>
