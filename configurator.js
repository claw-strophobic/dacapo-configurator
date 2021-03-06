
var flashsupport = 'Flash wird unterstützt? ';
var instFonts;
var lorem = 'Zwölf Boxkämpfer jagen Viktor \\nquer über den großen Sylter Deich';
//var configFile = "http://localhost/~tkorell/TEST/XML/dacapo.conf";

var labels_deu = {
	label_field: 'Parameter für das Feld ',
	ask_remove: 'Wirklich das Feld: %field% löschen?',
	ask_copy: 'Name für neues Feld:',
	ask_save: 'Name für Datei:',
	not_deletable: 'Dieses Feld lässt sich nicht löschen.',
	custom: 'Eigene'
};
var labels_eng = {
	label_field: 'Parameter for the field ',
	ask_remove: 'Do you really want to remove the field: %field%?',
	ask_copy: 'The name for the new field:',
	ask_save: 'Name for File:',
	not_deletable: 'This field is not deletable.',
	custom: 'Custom'
};

var labels = {};

var configVersion = '';
var miscSection = '';
var syncLyricsSection = '';
var audioSection = '';
var debugSection = '';

function FieldProto(name, gui, father) {
	if (arguments.length == 0) return; // don't do anything
	var t = this;
	t.name = name;
	t.father = father;
	t.gui = gui; // <-- jQuery-Object of father
	t.div = null; // <-- jQuery-Object of t
	t.deletable = true;

	t.tabStylesUnselected = {
      backgroundColor : "lightgrey",
      fontWeight: "normal",
	  'box-shadow': "-3px 2px black",
	  'border-right': "0px",
	  'margin-top': "0px"
    };
	t.tabStylesSelected = {
      backgroundColor : "antiquewhite",
      fontWeight: "bold",
	  'box-shadow': "-3px -2px black",
	  'border-right': "1px",
	  'margin-top': "2px"
    };
	
	t.setHandler = function() {
		var tablist = t.gui.find(".tablist");
		tablist.append('<li class="' + t.name + '">'+t.name+'</li>')
		tablist.find('.'+t.name).unbind();
		tablist.find('.'+t.name).click(t.click);

		t.div.find(".copy-ico").unbind();
		t.div.find(".del-ico").unbind();
		t.div.find(".copy-ico").click(t.copy);
		t.div.find(".del-ico").click(t.remove);
		t.div.find(".content-ico").click(t.contentHelper);
		t.setHelper();
	};
	t.click = function () {
		var tablist = t.gui.find(".tablist");
		tablist.find('li').css(t.tabStylesUnselected);
		tablist.find('.'+ t.name).css(t.tabStylesSelected);
		t.gui.find('.fieldset-field-div').hide();
		$(t.div).show();
	}
	t.remove = function() {
		var tablist = t.gui.find(".tablist");
		if (t.deletable === true) {
			var str = labels.ask_remove.replace("%field%", t.name);
			if (window.confirm(str) === true) {
				t.div.remove();
				tablist.find('.'+ t.name).remove();
				delete t.father.fields[t.name];
				for(var f in t.father.fields) {
					t.father.fields[f].click();
					break;
				};
				$("#meta-fields-list").find('optgroup').first().find("option[value='" + t.name + "']").remove();
				guis.setFieldHelper();
			};
		} else {
			var str = labels.not_deletable.replace("%field%", t.name);
			alert(str);
		};
	};

	t.copy = function() {
		var str = labels.ask_copy.replace("%field%", t.name);
		var copyName = t.name + '_copy';
		copyName = prompt(str, copyName);
		if (copyName !== null) {
			t.clone(copyName);
		}
	};
	t.clone = function(newName) {
		$("#meta-fields-list").find('optgroup').first().append('<option value="' + newName + '">'
				+ newName + '</option>');
		guis.setFieldHelper();
		// Deep copy
		t.father.fields[newName] = new t.constructor(newName, t.gui, t.father);
		var cloneObj = t.father.fields[newName];
		cloneObj.div = t.div.clone(true);
		var id = t.father.name + '-' + newName;
		cloneObj.div.attr("id", id);
		cloneObj.div.find("legend:first span").text(labels.label_field + newName);
		var selects = $(t.div).find("select");
		$(selects).each(function(i) {
			var select = this;
			$(cloneObj.div).find("select").eq(i).val($(select).val());
		});
		cloneObj.div.appendTo('#'+cloneObj.father.name);
		cloneObj.getHTML();
		cloneObj.setHTML();
		cloneObj.click();
	};
	t.setHelper = function() {
		// Remove old optionlist
		t.div.find(".content_helper").children().remove();
		// Create new optionlist
		$("#meta-fields-list").each(function() {
			t.div.find(".content_helper").append($(this).html()); // Add $(this).val() to your list
		});

	};
	t.contentHelper = function() {
		var ch = '%' + t.div.find(".content_helper").val() + '%';
		var c = t.div.find(".content").val() + ch;
		t.div.find(".content").val(c);
	};
}





function MetaField(name, gui, father) {
	FieldProto.apply(this, arguments);
	var t = this;
	t.content = undefined;
	t.operator = undefined;
	t.operand = undefined;
	t.type = 'cond';

	t.getFieldsOptionList = function() {
		var optionList = '';
		for(var f in t.father.fields) {
			optionList += '<option value="' + t.father.fields[f].name + '">'
				+ this.father.fields[f].name + '</option>';
		}
		return optionList;
	}
	t.grabXMLData = function(xml) {
		t.content = $(xml).text();
		t.operand = $(xml).attr('operand');
		t.operator = $(xml).attr('operator');
		t.type = $(xml).attr('type');
		t.setHTML();
	};

	t.setHTML = function() {
		var id = t.father.name + '-' + t.name;
		t.div = $('#template-meta-div').clone(true);

		t.div.attr("id", id);
		t.div.find("legend:first span").text(labels.label_field + t.name);
		t.div.find(".comments").val(t.comments);
		t.div.find(".content").val(t.content);
		t.div.find(".operator").val(t.operator);
		t.div.find(".operand").val(t.operand);
		if (t.type !== 'cond') {
			t.div.find(".condition").hide();
			t.deletable = false;
		}
		t.setHandler();

		t.div.removeClass('hidden');
		t.div.appendTo('#'+t.father.name);
		return true;
	};

	t.getHTML = function() {
		t.comments = t.div.find(".comments").val();
		t.content = t.div.find(".content").val();
		if (t.type === 'cond') {
			t.operator = t.div.find(".operator").val();
			t.operand = t.div.find(".operand").val();
		}
		return true;
	};

	t.getXML = function() {
		t.getHTML();
		var xml = '<' + t.name + ' type="' + t.type + '" ';
		if (t.type === 'cond') {
			xml += 'operand="' + t.operand + '" ';
			xml += 'operator="' + t.operator + '" ';
		}
		xml += 'comments="' + t.comments + '" ';
		xml += '>' + t.content;
		xml += '</' + t.name + '>';
		return xml;
	};
}
MetaField.prototype = new FieldProto();
MetaField.prototype.constructor = MetaField;

var Font = function(father, gui) {
	var t = this;
	t.gui = gui;
	t.father = father;
	t.fontName = '';
	t.fontSize = 16;
	t.fontColor = '';
	t.getOptionList = function() {
		var optionList = '';
		if (t.fontName === null) {
			t.fontName = '';
		}
		for(var f in instFonts) {
			var fName = instFonts[f];
			optionList += '<option value="' + fName + '"';
			if (fName.toLowerCase() == t.fontName.toLowerCase()) {
				optionList += ' selected="true"';
			}
			optionList += '>'+fName+'</option>';
		}
		return optionList;
	};
	t.changePreview = function() {
		if (typeof t.father.div !== 'undefined' &&
			typeof t.gui !== 'undefined') {
			var tmpLorem = lorem;
			var multiLine = t.father.div.find('input[name=multiline]').prop('checked');
			var splitSpaces = t.father.div.find('input[name=splitspaces]').prop('checked');
			if (!t.father.div.find(".font_sample").first().hasClass('lyricfont')) {
				if (multiLine === true) {
					tmpLorem = tmpLorem.replace(/\\n/g, '<br>');
				}
				if (splitSpaces === true) {
					tmpLorem = tmpLorem.replace(/ /g, '<br>');
				}
			}
			t.father.div.find(".font_sample").html(tmpLorem);
			t.father.div.find(".font_sample").first().css({
				"background-color"	: t.gui.find(".background_color").val(),
				"font-family"		: t.father.div.find(".font_name").val(),
				"color"				: t.father.div.find(".font_color").val(),
				"font-size"			: t.father.div.find(".font_size").val()+"px"
					});
		}
		return true;
	};

	t.setHTML = function() {
		t.father.div.find(".font_name").append(t.getOptionList());
		t.father.div.find(".font_color").val(t.fontColor);
		t.father.div.find(".font_size").val(t.fontSize);

		t.father.div.find(".font_sample").text(lorem);
	};

	t.setHandler = function() {
		t.father.div.find(".font_name").unbind();
		t.father.div.find(".font_name").change(this.changePreview);
		t.father.div.find(".font_color").unbind();
		t.father.div.find(".font_color").change(this.changePreview);
		t.father.div.find(".font_size").unbind();
		t.father.div.find(".font_size").change(this.changePreview);
	};

	t.getHTML = function() {
		t.fontName = t.father.div.find(".font_name").val();
		t.fontSize = t.father.div.find(".font_size").val();
		t.fontColor = t.father.div.find(".font_color").val();
	};

	t.getXML = function() {
		t.getHTML();
		var xml = '<font type="text">' + t.fontName + '</font>';
		xml += '<fontSize type="int">' + t.fontSize + '</fontSize>';
		xml += '<fontColor type="color">' + hexToRgb(t.fontColor) + '</fontColor>';
		return xml;
	};
}
var LyricFont = function(father, gui) {
	Font.apply(this, arguments);
	var t = this;
	t.posV = 0;
	t.alignH = undefined;

	t.orgGetHTML = t.getHTML; // save the basis-class-function
	t.getHTML = function() {
		t.orgGetHTML(); // call the basis-class-function
		t.posV = t.father.div.find(".font_pos").val();
		t.alignH = t.father.div.find(".font_pos_h_align").val();
	}
	t.orgSetHTML = t.setHTML; // save the basis-class-function
	t.setHTML = function() {
		t.orgSetHTML(); // call the basis-class-function
		t.father.div.find(".font_pos").val(t.posV);
		t.father.div.find(".font_pos_h_align").val(t.alignH);
	}
	t.grabXMLData = function(xml) {
		$(xml).children().each(function() {
			if ($(this).attr('type') == 'color') {
				t.fontColor = rgbToHex($(this).text());
			} else {
				if ($(this).attr('type') && $(this).attr('type') == 'int') {
					t[$(this)[0].localName] = parseInt($(this).text());
				} else {
					t[$(this)[0].localName] = $(this).text();
				}
			}
		});
	}
	t.orgGetXML = t.getXML; // save the basis-class-function
	t.getXML = function() {
		var xml = t.orgGetXML(); // call the basis-class-function
		xml += '<posV type="int">' + t.posV + '</posV>';
		xml += '<alignH type="text">' + t.alignH + '</alignH>';
		return xml;
	}
}
LyricFont.prototype = new Font();
LyricFont.prototype.constructor = LyricFont;

var PosProto = function(father) {
	var t = this;
	t.father = father;
	// Horizontal
	t.alignH = '';
	t.posH = 0;
	// Vertical
	t.alignV = '';
	t.posV = 0;
	t.changeValues = function() {
	};
	t.setHTML = function() {
		t.father.div.find(".field_pos_h_align").val(t.alignH);
		if (t.posH > 0) {
			t.father.div.find(".field_pos_h").val(t.posH);
		}
		t.father.div.find(".field_pos_v_align").val(t.alignV);
		if (t.posV > 0) {
			t.father.div.find(".field_pos_v").val(t.posV);
		}
	};

	t.setHandler = function() {
		t.father.div.find(".field_pos_h_align").unbind().change(t.changeValues);
		t.father.div.find(".field_pos_h").unbind().change(t.changeValues);

		t.father.div.find(".field_pos_v_align").unbind().change(t.changeValues);
		t.father.div.find(".field_pos_v").unbind().change(t.changeValues);

	};

	t.getHTML = function() {
		// Horizontal
		t.alignH = t.father.div.find(".field_pos_h_align").val();
		t.posH = t.father.div.find(".field_pos_h").val();
		// Vertical
		t.alignV = t.father.div.find(".field_pos_v_align").val();
		t.posV = t.father.div.find(".field_pos_v").val();
	};

	t.getXML = function() {
		// Horizontal
		var xml = '<alignH type="text">' + t.alignH + '</alignH>';
		xml += '<posH type="int">' + t.posH + '</posH>';
		// Vertical
		xml = '<alignV type="text">' + t.alignV + '</alignV>';
		xml += '<posV type="int">' + t.posV + '</posV>';
		return xml;
	};
}

function Field(name, gui, father) {
	FieldProto.apply(this, arguments);
	var t = this;
	t.comments = undefined;
	t.content = undefined;
	t.multiLine = false;
	t.overlay = false;
	t.splitSpaces = false;
	t.zIndex = 0;
	t.pos = new FieldPos(t);
	t.font = new Font(t, gui);
	t.maxWidth = 0;
	t.maxHeight = 0;

	t.getFieldsOptionList = function() {
		var optionList = '';
		for(var f in t.father.fields) {
			optionList += '<option value="' + t.father.fields[f].name + '">'
				+ t.father.fields[f].name + '</option>';
		}
		return optionList;
	};
	t.grabXMLData = function(xml) {
		$(xml).children().each(function() {
			switch($(this)[0].localName.toLowerCase()) {
				case 'value':
					t.content = $(this).text();
					break;
				case 'font':
					t.font.fontName = $(this).text();
					break;
				case 'fontsize':
					t.font.fontSize = parseInt($(this).text());
					break;
				case 'fontcolor':
					t.font.fontColor = rgbToHex($(this).text());
					break;
				case 'alignh':
				case 'alignv':
				case 'posh':
				case 'posv':
				case 'posrefh':
				case 'posrefv':
					if ($(this).attr('type') && $(this).attr('type') == 'int') {
						t.pos[$(this)[0].localName] = parseInt($(this).text());
					} else {
						t.pos[$(this)[0].localName] = $(this).text();
					}
					break;
				default:
					if ($(this).attr('type') && $(this).attr('type') == 'int') {
						t[$(this)[0].localName] = parseInt($(this).text());
					} else {
						t[$(this)[0].localName] = $(this).text();
					}
					break;
			}
		});
	};
	t.setHTML = function() {
		var id = t.father.name + '-' + t.name;
		t.div = $('#template-field-div').clone(true);
		
		t.div.attr("id", id);
		t.div.find("legend:first span").text(labels.label_field + t.name);
		t.div.find(".content").val(t.content);
		t.div.find(".comments").val(t.comments);
		t.div.find(".field_pos_h_ref").append(t.getFieldsOptionList('refh'));
		t.div.find(".field_pos_v_ref").append(t.getFieldsOptionList('refv'));
		t.div.find("input[name=field_zindex]").val(t.zIndex);
		t.div.find("input[name=field_max_width]").val(t.maxWidth);
		t.div.find("input[name=field_max_height]").val(t.maxHeight);
		t.div.find('input[name=multiline]').prop('checked', t.multiLine);
		t.div.find('input[name=splitspaces]').prop('checked', t.splitSpaces);
		t.div.find('input[name=overlay]').prop('checked', t.overlay);
		var tmp_id = id + 'multiline';
		t.div.find('input[name=multiline]').attr("id", tmp_id);
		t.div.find('label[for$=multiline]').attr("for", tmp_id);
		tmp_id = id + 'splitspaces';
		t.div.find('input[name=splitspaces]').attr("id", tmp_id);
		t.div.find('label[for$=splitspaces]').attr("for", tmp_id);
		tmp_id = id + 'overlay';
		t.div.find('input[name=overlay]').attr("id", tmp_id);
		t.div.find('label[for$=overlay]').attr("for", tmp_id);

		t.font.setHTML();
		t.font.changePreview();

		t.pos.setHTML();

		t.setHandler();

		t.div.removeClass('hidden');
		t.div.appendTo('#'+t.father.name);
		return true;
	};
	var origSetHandler = t.setHandler; // save the basis-class-function
	t.setHandler = function() {
		origSetHandler(); // call the basis-class-function
		t.div.find('input[name=multiline]').unbind();
		t.div.find('input[name=multiline]').click(t.font.changePreview);
		t.div.find('input[name=splitspaces]').unbind();
		t.div.find('input[name=splitspaces]').click(t.font.changePreview);
		t.font.setHandler();
		t.pos.setHandler();
	}
	t.getHTML = function() {
		t.content = t.div.find(".content").val();
		t.comments = t.div.find(".comments").val();
		t.zIndex = t.div.find("input[name=field_zindex]").val();
		t.maxWidth = t.div.find("input[name=field_max_width]").val();
		t.maxHeight = t.div.find("input[name=field_max_height]").val();
		t.multiLine = t.div.find('input[name=multiline]').prop('checked');
		t.splitSpaces = t.div.find('input[name=splitspaces]').prop('checked');
		t.overlay = t.div.find('input[name=overlay]').prop('checked');
		t.font.getHTML();
		t.pos.getHTML();
		return true;
	};
	
	t.getXML = function() {
		t.getHTML();
		var xml = '<' + t.name + ' type="dict">';
		xml += '<value type="text">' + t.content + '</value>';
		xml += '<comments type="text">' + t.comments + '</comments>';
		xml += t.font.getXML();
		xml += t.pos.getXML();
		xml += '<overlay type="boolean">' + t.overlay + '</overlay>';
		xml += '<splitSpaces type="boolean">' + t.splitSpaces + '</splitSpaces>';
		xml += '<multiLine type="boolean">' + t.multiLine + '</multiLine>';
		xml += '<zIndex type="int">' + t.zIndex + '</zIndex>';
		xml += '<maxWidth type="int">' + t.maxWidth + '</maxWidth>';
		xml += '<maxHeight type="int">' + t.maxHeight + '</maxHeight>';
		xml += '</' + t.name + '>';
		return xml;
	};
}
Field.prototype = new FieldProto();
Field.prototype.constructor = Field;
// var fields = {};

var FieldPos = function(father) {
	PosProto.apply(this, arguments);
	var t = this;
	t.posRefH = '';
	t.posRefV = '';

	t.origSetHTML = t.setHTML; // save the baseclass-function
	t.setHTML = function() {
		t.origSetHTML(); // call the baseclass-function
		t.father.div.find(".field_pos_h_ref").val(t.posRefH);
		t.father.div.find(".field_pos_v_ref").val(t.posRefV);
	};

	t.origSetHandler = t.setHandler; // save the baseclass-function
	t.setHandler = function() {
		t.origSetHandler(); // call the baseclass-function
		t.father.div.find(".field_pos_h_ref").unbind().change(t.changeValues);
		t.father.div.find(".field_pos_v_ref").unbind().change(t.changeValues);
	};

	t.origGetHTML = t.getHTML; // save the baseclass-function
	t.getHTML = function() {
		t.origGetHTML(); // call the baseclass-function
		t.posRefH = t.father.div.find(".field_pos_h_ref").val();
		t.posRefV = t.father.div.find(".field_pos_v_ref").val();
	};

	t.origGetXML = t.getXML; // save the baseclass-function
	t.getXML = function() {
		var xml = t.origGetXML(); // call the baseclass-function
		if (t.posRefH !== '') {
			xml += '<posRefH type="text">' + t.posRefH + '</posRefH>';
		}
		if (t.posRefV !== '') {
			xml += '<posRefV type="text">' + t.posRefV + '</posRefV>';
		}
		return xml;
	};
}
FieldPos.prototype = new PosProto();
FieldPos.prototype.constructor = FieldPos;

var PicPos = function(father) {
	PosProto.apply(this, arguments);
	var t = this;
	t.width = 0;
	t.height = 0;

	t.origSetHTML = t.setHTML; // save the baseclass-function
	t.setHTML = function() {
		t.origSetHTML(); // call the baseclass-function
		t.father.div.find(".pic_width").val(t.width);
		t.father.div.find(".pic_height").val(t.height);
	};

	t.origGetHTML = t.getHTML; // save the baseclass-function
	t.getHTML = function() {
		t.origGetHTML(); // call the baseclass-function
		t.width = t.father.div.find(".pic_width").val();
		t.height = t.father.div.find(".pic_height").val();
	};

	t.origGetXML = t.getXML; // save the baseclass-function
	t.getXML = function() {
		var xml = t.origGetHTML(); // call the baseclass-function
		if (t.posRefH !== '') {
			xml += '<width type="int">' + t.width + '</width>';
		}
		if (t.posRefV !== '') {
			xml += '<height type="int">' + t.height + '</height>';
		}
		return xml;
	};
	t.grabXMLData = function(xml) {
		$(xml).children().each(function() {
			if ($(this).attr('type') && $(this).attr('type') == 'int') {
				t[$(this)[0].localName] = parseInt($(this).text());
			} else {
				t[$(this)[0].localName] = $(this).text();
			}
		});
	};
}
PicPos.prototype = new PosProto();
PicPos.prototype.constructor = PicPos;

var gui = function(name) {
	var t = this;
	t.name = name;
	t.div = $('#'+name); // <-- jQuery-Object
	t.height = 0;
	t.width = 0;
	t.background = undefined;
	t.mouseVisible = undefined;
	t.fields = {};
	t.lyricFont = new LyricFont(t, t.div);
	t.picPos = new PicPos(t);

	t.getXML = function() {
		t.getHTML();
		var xml = '<' + t.name + '>';
		xml += '<width type="int">' + t.width + '</width>';
		xml += '<height type="int">' + t.height + '</height>';
		xml += '<lyricFont>';
		xml += t.lyricFont.getXML();
		xml += '</lyricFont>';
		xml += '<backgroundColor type="color">' + hexToRgb(t.background) + '</backgroundColor>'
		xml += '<mouseVisible type="boolean">' + t.mouseVisible + '</mouseVisible>'
		xml += '<fields type="dict">';
		for(var f in t.fields) {
			//xml = $.parseXML(t.fields[f].font.getXML());
			xml += t.fields[f].getXML();
		}
		xml += '</fields></' + t.name + '>';
		var dom = $.parseXML(xml);
		return xml2Str(dom);
	};

	t.changeBackground = function() {
		t.lyricFont.changePreview();
		for(var f in t.fields) {
			t.fields[f].font.changePreview();
		}
	};

	t.setHandler = function() {
		t.div.parent().find(".new-ico").unbind();
		t.div.parent().find(".new-ico").click(t.newField);
		t.lyricFont.setHandler();
	}

	t.newField = function() {
		var str = labels.ask_copy;
		var copyName = 'NewField';
		copyName = prompt(str, copyName);
		if (copyName !== null) {
			t.fields[copyName] = new Field(copyName, t.div, t);
			t.fields[copyName].setHTML();
			t.fields[copyName].click();
		}
	};

	t.getHTML = function() {
		t.height = $('#height-' + t.name).val();
		t.width = $('#width-' + t.name).val();
		t.background = t.div.find(".background_color").val();
		t.mouseVisible = t.div.find(".mouse_visible").prop("checked");
		return true;
	}
	t.grabXMLData = function(xml) {
		$(xml).children().each(function() {
			switch($(this)[0].localName.toLowerCase()) {
				case 'width':
					t.width = parseInt($(this).text());
					break;
				case 'height':
					t.height = parseInt($(this).text());
					break;
				case 'backgroundcolor':
					t.background = rgbToHex($(this).text());
					break;
				case 'fields':
				case 'lyricfont':
				case 'pictures':
					break;
				default:
					if ($(this).attr('type') && $(this).attr('type') == 'int') {
						t[$(this)[0].localName] = parseInt($(this).text());
					} else {
						t[$(this)[0].localName] = $(this).text();
					}
					break;
			}
		});
		$(xml).find('fields').children().each(function() {
			if (!t.fields[$(this)[0].localName]) {
				t.fields[$(this)[0].localName] = new Field($(this)[0].localName, t.div, t);
				// t.fields[$(this)[0].localName].father = t;
				t.fields[$(this)[0].localName].grabXMLData(this);
			}
		});
		t.lyricFont.grabXMLData($(xml).find('lyricFont'));
		t.picPos.grabXMLData($(xml).find('pictures'));
		t.picPos.setHTML();
		// set the HTML-elements to XML-values
		$('#height-'+name).val(this.height);
		$('#width-'+name).val(this.width);
		t.div.find(".background_color").val(this.background);
		t.div.find(".font_pos").val(this.fontPos);
		t.div.find(".mouse_visible").prop("checked", this.mouseVisible);
		t.lyricFont.setHTML();
		t.lyricFont.changePreview();
		t.setHandler();
		for(var f in t.fields) {
			t.fields[f].setHTML();
			t.fields[f].click();
			// $('#dl-'+name).append(this.fields[f].setHTML());
		}
	};
}

var MetaData = function() {
	var t = this;
	t.name = 'metadata';
	t.div = $('#metadata'); // <-- jQuery-Object
	t.fields = {};

	t.getXML = function() {
		var xml = '<metaData>';
		for(var f in t.fields) {
			//xml = $.parseXML(t.fields[f].font.getXML());
			xml += t.fields[f].getXML();
		}
		xml += '</metaData>';
		var dom = $.parseXML(xml);
		return xml2Str(dom);
	};

	t.setHandler = function() {
		t.div.parent().find(".new-ico").unbind();
		t.div.parent().find(".new-ico").click(this.newField);
	}

	t.newField = function() {
		var str = labels.ask_copy;
		var copyName = 'NewField';
		copyName = prompt(str, copyName);
		if (copyName !== null) {
			t.fields[copyName] = new MetaField(copyName, t.div, t);
			t.fields[copyName].setHTML();
			t.fields[copyName].click();
			// jumpTo(t.fields[copyName].div);
		}
	};

	t.grabXMLData = function(xml) {
		$(xml).children().each(function() {
			if (!t.fields[$(this)[0].localName] && $(this)[0].localName.toLowerCase() !== 'mp3-tags') {
				t.fields[$(this)[0].localName] = new MetaField($(this)[0].localName, t.div, t);
				t.fields[$(this)[0].localName].grabXMLData(this);
				t.fields[$(this)[0].localName].click();
			}
		});
		t.setHandler();
	};
}

var guis = {
	window: new gui('window'),
	fullscreen: new gui('fullscreen'),
	meta: new MetaData(),
	tabStylesUnselected: {
      backgroundColor : "lightgrey",
      fontWeight: "normal",
	  'box-shadow': "5px -2px black",
	  'margin-right': "0px",
    },
	tabStylesSelected: {
      backgroundColor : "antiquewhite",
      fontWeight: "bold",
	  'box-shadow': "5px -2px black",
	  'margin-right': "2px",
    },
	setFieldHelper: function(){
		$.each(this.fullscreen.fields, function() {
			if (typeof this.setHelper !== 'undefined' && $.isFunction(this.setHelper)) {
				this.setHelper();
			}
		});
		$.each(this.window.fields, function() {
			if (typeof this.setHelper !== 'undefined' && $.isFunction(this.setHelper)) {
				this.setHelper();
			}
		});
	},
	open: function(event){
		loadXMLData();
		uploadXMLData();
		return false;
	},
	save: function(){
		var xml = "<?xml version='1.0' encoding='UTF-8'?>";
		xml += '<dacapo_preferences><version>'+ configVersion + '</version><gui>';
		xml += this.window.getXML();
		xml += this.fullscreen.getXML();
		xml += this.meta.getXML();
		xml += '<misc>' + $(miscSection).html() + '</misc>';
		xml += '<syncLyrics>' + $(syncLyricsSection).html() + '</syncLyrics>';
		xml += '</gui>';
		xml += '<audio_engine>' + $(audioSection).html() + '</audio_engine>';
		xml += '<debug>' + $(debugSection).html() + '</debug>';
		xml += '</dacapo_preferences>';
		var dom = $.parseXML(xml);
		downloadXMLData(xml2Str(dom));
		return false;
	},
	changePreview: function() {
		lorem = $('#lorem').val();
		this.window.changeBackground();
		this.fullscreen.changeBackground();
	},
	menuClick: function(e) {
		$('.hideableTab').hide();
		$('#menu').find('li').css(guis.tabStylesUnselected);

		switch (e) {
			case 1:		// GUI Window
				$('#gui').show();
				$('#window-marker').show();
				$('#nav-window').css(guis.tabStylesSelected);
				break;
			case 2:		// GUI Fullscreen
				$('#gui').show();
				$('#fullscreen-marker').show();
				$('#nav-fullscreen').css(guis.tabStylesSelected);
				break;
			case 3:		// MetaData
				$('#metadata-marker').show();
				$('#nav-meta').css(guis.tabStylesSelected);
				break;
			case 4:		// Audio & Debug
				$('#audio-marker').show();
				$('#nav-audio').css(guis.tabStylesSelected);
				break;
		}
	}
};

jQuery(window).ready(function() {
	var userLang = navigator.language || navigator.userLanguage;
	flashsupport += typeof swfobject !== 'undefined' && swfobject.getFlashPlayerVersion().major !== 0 ? 'yes.' : 'no-flash!';
	if (typeof swfobject !== 'undefined') {
		console.log('swfobject Version: ' 
				+ swfobject.getFlashPlayerVersion().major
				+ '.' + swfobject.getFlashPlayerVersion().minor);
	};
	if (userLang === 'de') {
		labels = labels_deu;
		$('.en').remove();
	} else {
		labels = labels_eng;
		$('.de').remove();
	}
	$("#lorem").val(lorem);
	loadXMLData();
});


function listTags(node, father, listnode) {
	listnode += '<li id="'+father+'-'+$(node)[0].localName +'">'+ $(node)[0].localName;
	if ($(node).attr('type') && $(node).attr('type') != 'dict') {
		listnode += ' <span>' + $(node).attr('type') + '</span> <span>' + $(node).text() + '</span>' ;
		if (!fields[father]) {
			fields[father] = new Field($(node)[0].localName);
		}
		switch($(node)[0].localName) {
			case 'FONT':
				fields[father].font.fontName = $(node).text();
				break;
			case 'FONTSIZE':
				fields[father].font.fontSize = $(node).text();
				break;
			case 'FONTCOLOR':
				fields[father].font.fontColor = $(node).text();
				break;
			case 'VALUE':
				fields[father].content = $(node).text();
				break;
			default:
				break;
		}
	};
	listnode += '<ul>';

	if ($(node).children().length > 0) {
		$(node).children().each(function() {
			listnode = listTags(this, father+'-'+$(node)[0].localName, listnode);
		});
	} else {

	}
	listnode += '</ul></li>';
	return listnode;
}

function prepareDoku(obj) {
	$(obj).children().each(function() {
		var listnode = '';
		//up = '<li>'+ $(this)[0].localName +'</li>';
		// listnode = listTags(this,'main',listnode);
		listnode += '</li>';
		$("#doku").append(listnode);
	});
}
function prepareVersion(obj) {
	configVersion = $(obj).text();
	var version = $(obj).text();
	$("#version").find('span').text(version);
}
function prepareAudioEngine(obj) {
	$(obj).children().each(function() {
		var listnode = '';
		//up = '<li>'+ $(this)[0].localName +'</li>';
		// listnode = listTags(this,'main',listnode);
		listnode += '</li>';
		$("#audio_engine").append(listnode);
	});
}
function prepareDebug(obj) {
	$(obj).children().each(function() {
		var listnode = '';
		//up = '<li>'+ $(this)[0].localName +'</li>';
		//listnode = listTags(this,'main',listnode);
		listnode += '</li>';
		$("#debug").append(listnode);
	});
}

function populateFontList(fontArr) {
	var allFontsCounter = 0;
	var fontSize = '16';
	instFonts = fontArr;
	if (true === false) {
		for(var f in instFonts) {
			var fontName = instFonts[f];
			// trim
			fontName = fontName.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			$("#tablebody").append('<tr><td>'
					+ fontArr[f] + '</td>'
					+ '<td style="font-family: &quot;' + fontName
					+ '&quot; ;font-size:' + fontSize + 'px; ">'+lorem+'</td></tr>');
			allFontsCounter++;
		}
		$("#tablefoot").append('Insgesamt ' + allFontsCounter + ' Schriften');
	}
	return false;
}


function componentToHex(c) {
    var hex = (+c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgb) {
	var rgbObj = rgb.split(',');
    return "#" + componentToHex(rgbObj[0])
			+ componentToHex(rgbObj[1])
			+ componentToHex(rgbObj[2]);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var obj = result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
	] : null;
	var str = '';
	if (obj !== null) {
		str = obj.join(",");
	}
	return str;
}
function jumpTo(element){
     $('html, body').animate({ scrollTop: ($(element).offset().top)}, 'slow');
};

function save(){
     guis.window.saveData();
};

function xml2Str(xmlNode) {
   try {
      // Gecko- and Webkit-based browsers (Firefox, Chrome), Opera.
      return (new XMLSerializer()).serializeToString(xmlNode);
  }
  catch (e) {
     try {
        // Internet Explorer.
        return xmlNode.xml;
     }
     catch (e) {
        //Other browsers without XML Serializer
        alert('Xmlserializer not supported');
     }
   }
   return false;
}

function loadXMLData(xml) {
	var metaliste = $("#meta-fields-list");
	metaliste.prepend('<optgroup label="' + labels.custom + '"></optgroup>');
	$(xml).find('metaData').children().each(function() {
		if ($(this).attr('type') === 'cond') {
			metaliste.find('optgroup').first().append('<option data-value="' + $(this)[0].localName
					+ '" value="' + $(this)[0].localName + '">' + $(this)[0].localName + '</option>');
		}
	});
	prepareDoku($(xml).find('doku'));
	prepareVersion($(xml).find('version'));
	prepareAudioEngine($(xml).find('audio_engine'));
	prepareDebug($(xml).find('debug'));
	miscSection = $(xml).find('misc');
	syncLyricsSection = $(xml).find('syncLyrics');
	audioSection = $(xml).find('audio_engine');
	debugSection = $(xml).find('debug');

	guis.window.grabXMLData($(xml).find('gui').find('window'));
	guis.fullscreen.grabXMLData($(xml).find('gui').find('fullscreen'));
	guis.meta.grabXMLData($(xml).find('metaData'));
	guis.menuClick(1);
}

function uploadXMLData() {
	var file_data = $('#inputfile').prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
	form_data.append('mode', 'upload');
    $.ajax({
                url: $('input[name=path]').val() + '/configurator_ajax_upload.php', // point to server-side PHP script
                dataType: 'text',  // what to expect back from the PHP script, if anything
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function(php_script_response){
					var dom = $.parseXML(php_script_response);
					loadXMLData(dom); // display response from the PHP script, if any
                }
     });

}

function downloadXMLData(xml) {
    var form_data = new FormData();
    form_data.append('xml', xml);
	form_data.append('mode', 'download');
    $.ajax({
                url: $('input[name=path]').val() + '/configurator_ajax_upload.php', // point to server-side PHP script
                dataType: 'text',  // what to expect back from the PHP script, if anything
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function(php_script_response){
					myWindow = window.open("data:text/xml/force-download,"
					+ encodeURIComponent(php_script_response));
                }
     });

}
