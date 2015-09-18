<?php
	require_once dirname(__FILE__) . '/configurator_metafieldlist.php';
	require_once dirname(__FILE__) . '/configurator_field.php';
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>XML Test</title>
	<!-- script src="https://code.jquery.com/jquery-1.10.2.js"></script -->
	<script type="text/javascript" src="../lib/jquery-2.1.4.min.js"></script>
	<script type="text/javascript" src="swfobject.js"></script>	
	<link rel="stylesheet" href="configurator.css" type="text/css" />
</head>
<body>
	<noscript>
		<div style="display:block;background:red;color:white;padding:10px;font-weight:bold;">
			JavaScript wird für diese Seite benötigt!
		</div>
	</noscript>

	<!-- nav>
		<ul class="menubar">
			<li>
				<img class="save-ico" src="img/3floppy_unmount.png" height="30" alt="Save File" onclick="guis.save();">
			</li>
			<li>
				<img class="save-ico" src="img/Arrow-right-icon.png" height="30" 
					 title="Scroll to the window-section"
					 alt="Scroll to the window-section" onclick="jumpTo('#window-marker');">
			</li>
			<li>
				<img class="save-ico" src="img/Arrow-right-icon.png" height="30"
					 title="Scroll to the fullscreen-section"
					 alt="Scroll to the fullscreen-section" onclick="jumpTo('#fullscreen-marker');">
			</li>
			<li>
				<img class="save-ico" src="img/Arrow-right-icon.png" height="30"
					 title="Scroll to the metaData-section"
					 alt="Scroll to the metaData-section" onclick="jumpTo('#metadata-marker');">
			</li>
		</ul>

	</nav -->
	<form>
		<div id="debug-output"></div>
		<div id="doku" class="hidden"><ul></ul></div>
		<fieldset>
			<div id="version"></div>
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
						<img class="save-ico" src="img/3floppy_unmount.png" height="30" alt="change preview" onclick="guis.changePreview();">
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
	<span id="objectspan">
		<object id="fontListSWF" name="fontListSWF"
				type="application/x-shockwave-flash"
				data="./FontList.swf" width="1" height="1"
			>
			<param name="movie" value="./FontList.swf">
			<embed src="./FontList.swf" width="1" height="1" />
			The "You don't have flash" message. Or any other backup content. 
		</object>
	</span>
<script type="text/javascript" src="configurator.js"></script>
</body>

</html>
