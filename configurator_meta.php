<?php

?>
<div id="template-meta-div" class="hidden fieldset-field-div">
	<fieldset class="fieldset-meta">
		<legend class="legend-meta">
			<span>Feldname</span>
			<img class="copy-ico" src="img/Paste-icon.png" height="30" alt="Copy Field">
			<img class="del-ico" src="img/delete-file-icon.png" height="30" alt="Delete Field">
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
					<img class="content-ico" src="img/Left-arrow.png" height="30" alt="Insert Fieldname">
					<select class="content_helper">
					</select>
				</dd>
				<dt class="condition"><label class="de">wenn</label><label class="en">if</label></dt>
				<dd class="condition">
					<select class="operator" >
						<option class="de" value="notempty">Nicht Leer</option>
						<option class="de" value="empty">Leer</option>
						<option class="en" value="notempty">Not Empty</option>
						<option class="en" value="empty">Empty</option>
					</select>
					<input class="operand" list="meta-fields-list" name="operand">
				</dd>
			</dl>
		</div>
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
