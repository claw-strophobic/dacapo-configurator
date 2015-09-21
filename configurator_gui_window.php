<?php

?>
<fieldset id="window-marker" class="fieldset-gui hideableTab">
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
			<dt><label for="lyricfont_size-window">Position und Schrift für Lyrics (Position/Größe/Farbe/Schrift)</label></dt>
			<dd>
				<input class="font_pos" type="number" step="1" max="9999" min="1"/>
				<input class="font_size" type="number" step="1" max="9999" min="1"/>
				<input class="font_color" type="color" />
				<select class="font_name"></select>
				<select class="font_pos_h_align" >
					<option class="de" value="left">Links</option>
					<option class="de" value="right">Rechts</option>
					<option class="de" value="center">Zentriert</option>
					<option class="en" value="left">Left</option>
					<option class="en" value="right">Right</option>
					<option class="en" value="center">Center</option>
				</select>
			</dd>
			<dd><div class="font_sample lyricfont"></div></dd>
		</dl>
		<ul class="tablist">

		</ul>
	</div>

</fieldset>