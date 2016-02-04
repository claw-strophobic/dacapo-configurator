<?php

?>
		<div id="template-field-div" class="hidden fieldset-field-div">
			<fieldset class="fieldset-field">
				<legend class="legend-field">
					<span>Feldname</span>
					<img class="copy-ico icon" src="img/Paste-icon.png" height="30" alt="Copy Field">
					<img class="del-ico icon" src="img/delete-file-icon.png" height="30" alt="Delete Field">
				</legend>
				<div>
					<dl>
						<dt><label class="de">Kommentar zu dem Feld</label><label class="en">Comments about the field</label></dt>
						<dd>
							<textarea class="comments"></textarea>
						</dd>
						<dt><label class="de">Inhalt des Feldes</label><label class="en">Content of the field</label></dt>
						<dd>
							<input class="content" type="text" />
							<img class="content-ico icon" src="img/Left-arrow.png" height="30" alt="Insert Fieldname">
							<select class="content_helper">
							</select>
						</dd>
					</dl>
					<fieldset>
						<legend class="de">Positionsangaben</legend>
						<legend class="en">Positioning values</legend>
						<dl>
							<dt><label class="de">Position Horizontal</label><label class="en">Horizontal position</label></dt>
							<dd>
								<select class="field_pos_h_align" >
									<option class="de" value="left">Links</option>
									<option class="de" value="right">Rechts</option>
									<option class="de" value="center">Zentriert</option>
									<option class="en" value="left">Left</option>
									<option class="en" value="right">Right</option>
									<option class="en" value="center">Center</option>
								</select>
								<input class="field_pos_h" type="number" step="1" max="9999" min="1"/>
								<select class="field_pos_h_ref" ><option value=""></option></select>
							</dd>
							<dt><label class="de">Position Vertikal</label><label class="en">Vertical position</label></dt>
							<dd>
								<select class="field_pos_v_align" >
									<option class="de" value="top">Oben</option>
									<option class="de" value="bottom">Unten</option>
									<option class="de" value="center">Mittig</option>
									<option class="en" value="top">Top</option>
									<option class="en" value="bottom">Bottom</option>
									<option class="en" value="center">Middle</option>
								</select>
								<input class="field_pos_v" type="number" step="1" max="9999" min="1"/>
								<select class="field_pos_v_ref" ><option value=""></option></select>
							</dd>
							<dt><label class="de">Layerschicht</label><label class="en">Layer position</label></dt>
							<dd>
								<input name="field_zindex" class="de" type="number" step="1" max="9999" min="0"
									   title='Je höher dieser Wert, desto "weiter oben" liegt das Feld. Hilfreich, um z.B. Felder übereinander zu lagern. Standardwert = 0.'/>
								<input name="field_zindex" class="en" type="number" step="1" max="9999" min="0"
									   title='The higher this value the "more on top" is the field. Helpful if you want to overlay fields. Default = 0.'/>
							</dd>
							<dt><label class="de">Max Breite/Höhe</label><label class="en">Max width/height</label></dt>
							<dd>
								<input name="field_max_width" type="number" step="1" max="9999" min="0"/>
								<input name="field_max_height" type="number" step="1" max="9999" min="0"/>
							</dd>
						</dl>
					</fieldset>
					<fieldset>
						<legend class="de">Stilangaben</legend>
						<legend class="en">Styling parameters</legend>
						<dl>
							<dt><ul><li>
									<input type="checkbox" name="multiline" value="multiline"/><label for="multiline" class="de">Mehrere Zeilen</label><label for="multiline" class="en">Multi line</label>
								</li><li>
									<input type="checkbox" name="splitspaces" value="splitspaces"/><label for="splitspaces" class="de">Leerzeichen umbrechen</label><label for="splitspaces" class="en">Break Spaces</label>
								</li><li>
									<input type="checkbox" name="overlay" value="overlay"/><label for="overlay" class="de">Bilder überlagern</label><label for="overlay" class="en">Overlay Pictures</label>
								</li></ul>
							</dt>
							<dd>
							</dd>
							<dt><label class="de">Schrift für das Feld (Größe/Farbe/Schrift)</label><label class="en">Font for the field (size/color/font)</label></dt>
							<dd>
								<input class="font_size" type="number" step="1" max="9999" min="1"/>
								<input class="font_color" type="color" />
								<select class="font_name"></select>
							</dd>
							<dd><div class="font_sample"></div></dd>
						</dl>
					</fieldset>
				</div>
			</fieldset>
		</div>
