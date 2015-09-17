<?php
	require_once dirname(__FILE__) . '/configurator_metafieldlist.php';
	require_once dirname(__FILE__) . '/configurator_meta.php';
	require_once dirname(__FILE__) . '/configurator_field.php';
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>XML Test</title>
	<!-- script src="https://code.jquery.com/jquery-1.10.2.js"></script -->
	<script type="text/javascript" src="../lib/jquery.js"></script>
	<script type="text/javascript" src="swfobject.js"></script>	
	<link rel="stylesheet" href="configurator.css" type="text/css" />
</head>
<body>
	<noscript>
		<div style="display:block;background:red;color:white;padding:10px;font-weight:bold;">
			JavaScript wird für diese Seite benötigt!
		</div>
	</noscript>

	<nav>
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

	</nav>
	<form>
		<div id="debug-output"></div>
		<div id="doku" class="hidden"><ul></ul></div>
		<fieldset>
			<div id="version"></div>
		</fieldset>
		<div id="gui" class="div-gui">
			<fieldset>
				<legend class="legend-gui">
					<span>GUI</span>
				</legend>
				<div>
					<input id="lorem" type="text"/>
					<img class="save-ico" src="img/3floppy_unmount.png" height="30" alt="change preview" onclick="guis.changePreview();">
				</div>
				<fieldset id="window-marker" class="fieldset-gui">
					<legend class="legend-gui">
						<span>Window:</span>
						<img class="new-ico" src="img/new-file-icon.png" height="30" alt="New Field">
					</legend>
					<div id="window">
						<dl id="dl-window">
							<dt><label for="height-window">Höhe / Breite / Hintergundfarbe des Fensters</label></dt>
							<dd>
								<input id="height-window" type="number" step="1" max="9999" min="1"/>
								<input id="width-window" type="number" step="1" max="9999" min="1"/>
								<input class="background_color" type="color" onchange="guis.window.changeBackground()"/>
							</dd>							
							<dt>
								<label class="de" for="pic-left-window">Bildbereichs im Fensters: Linke- & Obere- Position / Max. Breite & Höhe / Ausrichtung</label>
								<label class="en" for="pic-left-window">Picture-area in Window: Left- & Top- Position / Max. Width & Height / Alignment</label>
							</dt>
							<dd>
								<input class="field_pos_h" type="number" step="1" max="9999" min="0"/>
								<input class="field_pos_v" type="number" step="1" max="9999" min="0"/>
								<span> / </span>
								<input class="pic_height" type="number" step="1" max="9999" min="1"/>
								<input class="pic_width" type="number" step="1" max="9999" min="1"/>
								<span> / </span>
								<select class="field_pos_v_align" >
									<option class="de" value="top">Oben</option>
									<option class="de" value="bottom">Unten</option>
									<option class="de" value="center">Mittig</option>
									<option class="en" value="top">Top</option>
									<option class="en" value="bottom">Bottom</option>
									<option class="en" value="center">Middle</option>
								</select>
								<select class="field_pos_h_align" >
									<option class="de" value="left">Links</option>
									<option class="de" value="right">Rechts</option>
									<option class="de" value="center">Zentriert</option>
									<option class="en" value="left">Left</option>
									<option class="en" value="right">Right</option>
									<option class="en" value="center">Center</option>
								</select>
							</dd>
							<dt><label for="lyricfont_size-window">Position und Schrift für Lyrics (Größe/Farbe/Schrift)</label></dt>
							<dd>
								<input class="font_pos" type="number" step="1" max="9999" min="1"/>
								<input class="font_size" type="number" step="1" max="9999" min="1"/>
								<input class="font_color" type="color" />
								<select class="font_name"></select>
							</dd>
							<dd><div class="font_sample lyricfont"></div></dd>
						</dl>
						<ul class="tablist">

						</ul>
					</div>

				</fieldset>
				<fieldset id="fullscreen-marker" class="fieldset-gui">
					<legend class="legend-gui">
						<span>Fullscreen:</span>
						<img class="new-ico" src="img/new-file-icon.png" height="30" alt="New Field">
					</legend>
					<div id="fullscreen">
						<dl id="dl-fullscreen">
							<dt><label for="height-fullscreen">Höhe / Breite / Hintergundfarbe</label></dt>
							<dd>
								<input id="height-fullscreen" type="number" step="1" max="9999" min="1"/>
								<input id="width-fullscreen" type="number" step="1" max="9999" min="1"/>
								<input class="background_color" type="color" onchange="guis.fullscreen.changeBackground()"/>
							</dd>
							<dt>
								<label class="de" for="pic-left-window">Bildbereichs im Fullscreen: Linke- & Obere- Position / Max. Breite & Höhe / Ausrichtung</label>
								<label class="en" for="pic-left-window">Picture-area in Fullscreen: Left- & Top- Position / Max. Width & Height / Alignment</label>
							</dt>
							<dd>
								<input class="field_pos_h" type="number" step="1" max="9999" min="0"/>
								<input class="field_pos_v" type="number" step="1" max="9999" min="0"/>
								<span> / </span>
								<input class="pic_height" type="number" step="1" max="9999" min="1"/>
								<input class="pic_width" type="number" step="1" max="9999" min="1"/>
								<span> / </span>
								<select class="field_pos_v_align" >
									<option class="de" value="top">Oben</option>
									<option class="de" value="bottom">Unten</option>
									<option class="de" value="center">Mittig</option>
									<option class="en" value="top">Top</option>
									<option class="en" value="bottom">Bottom</option>
									<option class="en" value="center">Middle</option>
								</select>
								<select class="field_pos_h_align" >
									<option class="de" value="left">Links</option>
									<option class="de" value="right">Rechts</option>
									<option class="de" value="center">Zentriert</option>
									<option class="en" value="left">Left</option>
									<option class="en" value="right">Right</option>
									<option class="en" value="center">Center</option>
								</select>
							</dd>
							<dt><label for="lyricfont_size-fullscreen">Position und Schrift für Lyrics (Größe/Farbe/Schrift)</label></dt>
							<dd>
								<input class="font_pos" type="number" step="1" max="9999" min="1"/>
								<input class="font_size" type="number" step="1" max="9999" min="1"/>
								<input class="font_color" type="color" />
								<select class="font_name"></select>
							</dd>
							<dd><div class="font_sample lyricfont"></div></dd>
						</dl>
						<ul class="tablist">

						</ul>
					</div>
				</fieldset>
			</fieldset>
		</div>
		<div class="div-gui">
			<fieldset id="metadata-marker">
				<legend class="legend-metadata">
					<span>MetaData</span>
					<img class="new-ico" src="img/new-file-icon.png" height="30" alt="New Field">
				</legend>
				<div id="metadata"  >
					<ul class="tablist">
					</ul>
				</div>
			</fieldset>
		</div>
		<fieldset>
			<legend>Audio Engine:</legend>
			<div id="audio_engine"></div>
		</fieldset>
		<fieldset>
			<legend>Debug Options:</legend>
			<div id="debug"></div>
		</fieldset>
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
    <div id="dummyOutput">
		<table>
			<thead>
				<tr><td>Name</td><td>Beispiel</td></tr>
			</thead>
			<tbody id="tablebody">

			</tbody>
			<tfoot>
				<tr><td colspan="2" id="tablefoot"></td></tr>
			</tfoot>
		</table>
    </div>
<script type="text/javascript" src="configurator.js"></script>
</body>

</html>
