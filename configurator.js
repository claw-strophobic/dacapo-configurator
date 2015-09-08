
var flashsupport = 'Flash wird unterstützt? ';
var instFonts;
var lorem = 'Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich';

var labels_deu = {
	label_field: 'Parameter für das Feld ',
	ask_remove: 'Wirklich das Feld: %field% löschen?',
	ask_copy: 'Name für neues Feld:',
	ask_save: 'Name für Datei:'
};
var labels_eng = {
	label_field: 'Parameter for the field ',
	ask_remove: 'Do you really want to remove the field: %field%?',
	ask_copy: 'The name for the new field:',
	ask_save: 'Name for File:'
};

var labels = {};

function FieldProto(name, gui, father) {
	if (arguments.length == 0) return; // don't do anything
	var t = this;
	t.name = name;
	t.father = father;
	t.gui = gui; // <-- jQuery-Object of father
	t.div = null; // <-- jQuery-Object of t
	
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
		t.gui.find('.fieldset-field-div').hide();
		$(t.div).show();
	}
	t.remove = function() {
		var str = labels.ask_remove.replace("%field%", t.name);
		if (window.confirm(str) === true) {
			t.div.remove();
			delete t.father.fields[t.name];
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
		// Deep copy
		t.father.fields[newName] = new Field(newName, t.gui, t.father);
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
		cloneObj.setHandler();
		jumpTo('#'+id);
	};
	t.setHelper = function() {
		// Remove old optionlist
		t.div.find(".content_helper option").each(function() {
			$(this).remove();
		});
		// Create new optionlist
		$("#meta-fields-list option").each(function() {
			t.div.find(".content_helper").append($(this).clone()); // Add $(this).val() to your list
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
		for(var f in this.father.fields) {
			optionList += '<option value="' + this.father.fields[f].name + '">'
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
		xml += '>' + t.content;
		xml += '</' + t.name + '>';
		return xml;
	};
}
MetaField.prototype = new FieldProto();
MetaField.prototype.constructor = MetaField;

var Font = function(father, gui) {
	var t = this;
	this.gui = gui;
	this.father = father;
	this.fontName = '';
	this.fontSize = 16;
	this.fontColor = '';
	this.getOptionList = function() {
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
	this.changePreview = function() {
		if (typeof t.father.div !== 'undefined' &&
			typeof t.gui !== 'undefined') {
			t.father.div.find(".font_sample").first().css({
				"background-color"	: t.gui.find(".background_color").val(),
				"font-family"		: t.father.div.find(".font_name").val(),
				"color"				: t.father.div.find(".font_color").val(),
				"font-size"			: t.father.div.find(".font_size").val()+"px"
					});
		}
		return true;
	};

	this.setHTML = function() {
		t.father.div.find(".font_name").append(t.getOptionList());
		t.father.div.find(".font_color").val(t.fontColor);
		t.father.div.find(".font_size").val(t.fontSize);

		t.father.div.find(".font_sample").text(lorem);
	};

	this.setHandler = function() {
		t.father.div.find(".font_name").unbind();
		t.father.div.find(".font_name").change(this.changePreview);
		t.father.div.find(".font_color").unbind();
		t.father.div.find(".font_color").change(this.changePreview);
		t.father.div.find(".font_size").unbind();
		t.father.div.find(".font_size").change(this.changePreview);
	};

	this.getHTML = function() {
		t.fontName = t.father.div.find(".font_name").val();
		t.fontSize = t.father.div.find(".font_size").val();
		t.fontColor = t.father.div.find(".font_color").val();
	};

	this.getXML = function() {
		var xml = '<font type="text">' + t.fontName + '</font>';
		xml += '<fontSize type="int">' + t.fontSize + '</fontSize>';
		xml += '<fontColor type="color">' + hexToRgb(t.fontColor) + '</fontColor>';
		return xml;
	};
}
var Pos = function(father) {
	var t = this;
	t.father = father;
	// Horizontal
	t.alignH = '';
	t.posH = 0;
	t.posRefH = '';
	// Vertical
	t.alignV = '';
	t.posV = 0;
	t.posRefV = '';
	t.changeValues = function() {
	};
	t.setHTML = function() {
		t.father.div.find(".field_pos_h_align").val(t.alignh);
		if (t.posH > 0) {
			t.father.div.find(".field_pos_h").val(t.posH);
		}
		t.father.div.find(".field_pos_h_ref").val(t.posRefH);

		t.father.div.find(".field_pos_v_align").val(t.alignV);
		if (t.posV > 0) {
			t.father.div.find(".field_pos_v").val(t.posV);
		}
		t.father.div.find(".field_pos_v_ref").val(t.posRefV);

	};

	t.setHandler = function() {
		t.father.div.find(".field_pos_h_align").unbind().change(t.changeValues);
		t.father.div.find(".field_pos_h").unbind().change(t.changeValues);
		t.father.div.find(".field_pos_h_ref").unbind().change(t.changeValues);

		t.father.div.find(".field_pos_v_align").unbind().change(t.changeValues);
		t.father.div.find(".field_pos_v").unbind().change(t.changeValues);
		t.father.div.find(".field_pos_v_ref").unbind().change(t.changeValues);

	};

	t.getHTML = function() {
		// Horizontal
		t.alignH = t.father.div.find(".field_pos_h_align").val();
		t.posH = t.father.div.find(".field_pos_h").val();
		t.posRefH = t.father.div.find(".field_pos_h_ref").val();
		// Vertical
		t.alignV = t.father.div.find(".field_pos_v_align").val();
		t.posV = t.father.div.find(".field_pos_v").val();
		t.posRefV = t.father.div.find(".field_pos_v_ref").val();
	};

	t.getXML = function() {
		// Horizontal
		var xml = '<alignH type="text">' + t.alignH + '</alignH>';
		xml += '<posH type="int">' + t.posH + '</posH>';
		if (t.posRefH !== '') {
			xml += '<posRefH type="text">' + t.posRefH + '</posRefH>';
		}
		// Vertical
		xml = '<alignV type="text">' + t.alignV + '</alignV>';
		xml += '<posV type="int">' + t.posV + '</posV>';
		if (t.posRefV !== '') {
			xml += '<posRefV type="text">' + t.posRefV + '</posRefV>';
		}
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
	t.pos = new Pos(this);
	t.font = new Font(this, gui);

	t.getFieldsOptionList = function() {
		var optionList = '';
		for(var f in t.father.fields) {
			optionList += '<option value="' + t.father.fields[f].name + '">'
				+ t.father.fields[f].name + '</option>';
		}
		return optionList;
	}
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
		t.div.find(".field_zindex").val(t.zIndex);
		t.div.find('input[name=multiline]').prop('checked', t.multiLine);
		t.div.find('input[name=splitspaces]').prop('checked', t.splitSpaces);
		t.div.find('input[name=overlay]').prop('checked', t.overlay);

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
		t.font.setHandler();
		t.pos.setHandler();
	}
	t.getHTML = function() {
		t.content = t.div.find(".content").val();
		t.comments = t.div.find(".comments").val();
		t.zIndex = t.div.find(".field_zindex").val();
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
		xml += t.font.getXML();
		xml += t.pos.getXML();
		xml += '<overlay type="boolean">' + t.overlay + '</overlay>';
		xml += '<splitSpaces type="boolean">' + t.splitSpaces + '</splitSpaces>';
		xml += '<multiLine type="boolean">' + t.multiLine + '</multiLine>';
		xml += '</' + t.name + '>';
		return xml;
	};
}
Field.prototype = new FieldProto();
Field.prototype.constructor = Field;
// var fields = {};

var gui = function(name) {
	var t = this;
	this.name = name;
	this.div = $('#'+name); // <-- jQuery-Object
	this.height = 0;
	this.width = 0;
	this.background = undefined;
	this.fields = {};
	this.lyricFont = new Font(this, this.div);
	this.fontPos = 0;

	this.getXML = function() {
		var xml = '<' + t.name + '><fields type="dict">';
		for(var f in t.fields) {
			//xml = $.parseXML(t.fields[f].font.getXML());
			xml += t.fields[f].getXML();
		}
		xml += '</fields></' + t.name + '>';
		var dom = $.parseXML(xml);
		return xml2Str(dom);
	};

	this.changeBackground = function() {
		t.lyricFont.changePreview();
		for(var f in t.fields) {
			t.fields[f].font.changePreview();
		}
	};

	this.setHandler = function() {
		t.div.parent().find(".new-ico").unbind();
		t.div.parent().find(".new-ico").click(this.newField);
		t.lyricFont.setHandler();
	}

	this.newField = function() {
		var str = labels.ask_copy;
		var copyName = 'NewField';
		copyName = prompt(str, copyName);
		if (copyName !== null) {
			t.fields[copyName] = new Field(copyName, t.div, t);
			t.fields[copyName].setHTML();
			jumpTo(t.fields[copyName].div);
		}
	};

	this.grabXMLData = function(xml) {
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
				case 'lyricfontpos':
					t.fontPos = parseInt($(this).text());
					break;
				case 'lyricfont':
					t.lyricFont.fontName = $(this).text();
					break;
				case 'lyricfontsize':
					t.lyricFont.fontSize = parseInt($(this).text());
					break;
				case 'lyricfontcolor':
					t.lyricFont.fontColor = rgbToHex($(this).text());
					break;
				default:
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
		// set the HTML-elements to XML-values
		$('#height-'+name).val(this.height);
		$('#width-'+name).val(this.width);
		t.div.find(".background_color").val(this.background);
		t.div.find(".font_pos").val(this.fontPos);
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
			jumpTo(t.fields[copyName].div);
		}
	};

	t.grabXMLData = function(xml) {
		$(xml).children().each(function() {
			if (!t.fields[$(this)[0].localName] && $(this)[0].localName !== 'MP3-Tags') {
				t.fields[$(this)[0].localName] = new MetaField($(this)[0].localName, t.div, t);
				t.fields[$(this)[0].localName].grabXMLData(this);
			}
		});
		t.setHandler();
	};
}

var guis = {
	window: new gui('window'),
	fullscreen: new gui('fullscreen'),
	meta: new MetaData(),
	save: function(){
		var xml = '<dacapo_preferences><gui>';
		xml += this.window.getXML();
		xml += this.fullscreen.getXML();
		xml += this.meta.getXML();
		xml += '</gui></dacapo_preferences>';
		var dom = $.parseXML(xml);
		myWindow = window.open("data:application/xml,"
				+ encodeURIComponent(xml2Str(dom)));
		//myWindow = window.open("data:text/xml," + encodeURIComponent(xml2Str(dom)),
        //               "_blank", "width=200,height=100");
		myWindow.focus();
		return false;
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
	loadXMLData();
});


/*
	for (f in fields) {
		if (fields[f].font.fontName) {
			$("#debug-output").append(f + '  ' + fields[f].font.fontName
					+ '<br>' + fields[f].font.fontSize + '<br>'
					+ fields[f].font.fontColor
					+ fields[f].content + '<br>');
		}
	}
*/
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
	var version = 'Config-Version: <span>' + $(obj).text() + '</span>';
	$("#version").append(version);
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
	// loadXMLData();
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


function loadXMLData() {
	console.log("lade XML...");
	$.get( "http://localhost/~tkorell/TEST/dacapo.conf", function( xml ) {
		var metaliste = $("#meta-fields-list");
		$(xml).find('metaData').children().each(function() {
			if ($(this).attr('type') === 'cond') {
				metaliste.prepend('<option data-value="' + $(this)[0].localName
						+ 'artist" value="' + $(this)[0].localName + '">' + $(this)[0].localName + '</option>');
			}
		});
		prepareDoku($(xml).find('doku'));
		prepareVersion($(xml).find('version'));
		prepareAudioEngine($(xml).find('audio_engine'));
		prepareDebug($(xml).find('debug'));

		guis.window.grabXMLData($(xml).find('gui').find('window'));
		guis.fullscreen.grabXMLData($(xml).find('gui').find('fullscreen'));
		guis.meta.grabXMLData($(xml).find('metaData'));

	});

}
