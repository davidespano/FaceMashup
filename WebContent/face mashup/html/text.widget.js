function classWidgetText(widgetId) {

			var i = 0;

			this.type = 'text widget';
			this.inputType = [ '007', '006', '008', '001', '009', '013' ];

			this.wf = [ {
				fieldID : widgetId + '_' + i++,
				defaultGraphicalValue : '',
				fieldType : '007',
				fieldName : 'Testo',
				fieldPath : '',
				fieldSelect : true,
				elementId : 'text_id_' + widgetId,
				valueId : '',
				fieldGraphicalPath : '',
				graphicalValue : '',
				selectedForConnection : []

			} ];

		}

function classWidgetTextDummy(widgetId) {

	var i = 0;

	this.type = 'text dummy widget';
	this.inputType = [];

	this.wf = [ {
		fieldID : widgetId + '_' + i++,
		defaultGraphicalValue : '',
		fieldType : '007',
		fieldName : 'Testo',
		fieldPath : '',
		fieldSelect : true,
		elementId : 'dummy_text_id_' + widgetId,
		valueId : '',
		fieldGraphicalPath : '',
		graphicalValue : '',
		selectedForConnection : []

	} ];

}

function loadTextWidget() {
	
	
	widgetElementList[widgetElementList.length - 1].widgetObject.wf[0].graphicalValue = '';
	widgetElementList[widgetElementList.length - 1].widgetObject.wf[0].valueId = '';
	
	//inserimento dell'unico elemento della wfElements
	widgetElementList[widgetElementList.length - 1].wfElements.push({elementSelected: true, elementShowed: true, wf: widgetElementList[widgetElementList.length - 1].widgetObject.wf});

	widgetElementList[widgetElementList.length - 1].numOfElementSelected = 1;
	widgetElementList[widgetElementList.length - 1].loaded = true;
	
	return (
			
			'<div id="widget_body_'
			+ widgetId
			+ '" class="div_photo_widget_bg" onmouseout="javascript:mouseOutThisWidget(this)" onmouseover="javascript:mouseOverThisWidget(this)">' +
			
			'<div style="position:relative" id="header'
			+ widgetId
			+ '" draggable="false" onmousedown="javascript:dragWidget(this)"> '+
				'<img src="img/widget_body/header_shadow.png" style=\'width:800px; height:40px; \' draggable="false"/>'+
				
				'<p id="widget_name_'
				+ widgetId
				+ '"style="color:dadada; position: absolute; top: -6px; left:30px; font-size:20px; font-family: sans">widget no. <b>'+ widgetId +' Text</b></p>'+
			
				'<img src="img/widget_body/widget_close.png" style="position: absolute; top: 16px; left: 750px; bottom: 5px;" onclick="javascript:deleteWidget(this)"/>'+
				'<img href="javascript:;" onClick="window.open(\'help/text_help.html\', \'MANUALE UTENTE\', \'width=1000, height=500, resizable, status, scrollbars=1, location=yes\')" src="img/widget_body/widget_help.png" style="position: absolute; top: 15px; left: 720px; bottom: 6px;"/>'+

			'</div>'+
			
			'<div id="inner_'
			+ widgetId
			+ '" class="div-photo-widget-inner">'+
			
			'<img onclick="javascript:prev(this)" id="prevButton_'
			+ widgetId
			+ '" src="img/prevArrow.png" style="position: absolute; top: 230px; left: 12px;"/>'+
			'<img onclick="javascript:next(this)" id="nextButton_'
			+ widgetId
			+ '" src="img/nextArrow.png" style="position: absolute; top: 230px; left: 766px;"/>'+
			
			    '<div style="position:relative; text-align:center" class="div_prebody_bg" id="prebody_'
			+ widgetId
			+ '"> '+
					
					'<img src="img/widget_body/shadow_upper_bar.png" style=\'width:735px; height:33px;\'/>'+
					
					
					'<div class="input_div" id="input_element_div_'
					+ widgetId
					+ '" style="position: absolute; top: 20px; left: 10px; bottom: 5px; text-align:left">'+
					
						

					'</div>'+
					
					'<img src="img/widget_body/shadow_bottom_bar.png" style=" width:735px; height:33px; position: absolute; top: 55px; left: 0px; bottom: 5px"/>'+
				
			    '</div>'+
				
				'<div id="widget_body_'
				+ widgetId
				+ '" class="div_photo_widget_body_bg">'+
				
				'<textarea  onclick="javascript:clickOnAreaText(this)" id="text_area_'+widgetId+'"onkeyup="javascript:changeTextArea(this)" style="position: absolute; top: 160px; left: 80px; " name="testo" rows="5" cols="90">'+
				  'Scrivi qui il testo...'+
				'</textarea>' +
				
				'<p draggable="false" style="position: absolute; top: 240px; left: 400px; font-size:18px; font-family: sans "> <b>Applica le modifiche a tutti gli elementi</b> </p>' +
				
				'<img id="button_widget_text_'
				+ widgetId
				+ '" title="le modifiche al testo saranno applicate soltanto all\'elemento attualmente visualizzato" onclick="javascript:changeValueOfTextButton(this)" name="off" src="img/offButton.png" style=" position: absolute; top: 256px; left: 300px"/>'+

				'<p onmousedown="javascript:dragFieldForConnection(this)" draggable="false" id="text_id_'
				+ widgetId
				+ '"style="position: absolute; top: 280px; left: 80px; font-size:18px; font-family: sans ">Testo trascinabile: </p>' +
				
				
					'<img src="img/widget_body/widget_inner_bar.png" style="position: absolute; top: 330px; left: 170px; bottom: 0px"/>'+
					'<img onclick="javascript:executeOp(this)" id="executeOp_000_0_'+widgetId+'" src="img/executeOpButton.png" style="position: absolute; top: 345; left:590"/>'+
					
				
				'</div>'+

			'</div>'+
			
			'<img src="img/widget_body/footer_shadow_bar.png" style=" width:735px; height:12px; position: absolute; top: 380px; left: 0px"/>'+
			
//			'<img id="opButton_'+widgetId+'" onclick="javascript:addOp(this)" title="Permette di scegliere solo alcuni elementi dell\'insieme o svolgere operazioni di confronto sugli elementi stessi" src="img/widget_body/plus_button.png" style="position: absolute; top: 403px; left: 50px; bottom: 5px"/>'+
//
//			'<p name = "ok" draggable="false" id="opButtonText_'
//			+ widgetId
//			+ '" style="position: absolute; top: 392px; left: 90px; font-size:15px; font-family: sans"> <font color="white">Clicca sul + per inserire operazioni di selezione degli elementi o di confronto tra i campi</font></p> '+
//		
			
		'</div>'
			
	
	
	
	);

}

function changeTextArea(element) {
	
	element.innerHTML = element.value;

	//si recupera il widgetId
	var widgetId = element.id.split('_').pop();
	var cursor = widgetElementList[widgetElementListMap[widgetId]].cursor;
	
	var buttonValue = document.getElementById('button_widget_text_'+widgetId).name;
	
	if(cursor >= widgetElementList[widgetElementListMap[widgetId]].wfElements.length) {
		cursor = 0;
	}
	
	var text = element.value;
	
	makeVisible(document.getElementById('executeOp_000_0_'+widgetId));
	widgetElementList[widgetElementListMap[widgetId]].op[0].processed = false;
	widgetElementList[widgetElementListMap[widgetId]].op[0].confermed = false;
	
	if(buttonValue.indexOf('on') > -1) {
		//la modifica dev'essere applicata a tutti gli elementi della wfElements
		
		var edited = false;
		var deleted = false;
		var added = false;
		
		var prevText = widgetElementList[widgetElementListMap[widgetId]].widgetObject.wf[0].valueId.split(' ');
		var currentText = element.value.split(' ');
		
		if(prevText.length == currentText.length) { console.log('edited'); edited = true;}
		if(prevText.length > currentText.length) { console.log('deleted'); deleted = true;}
		if(prevText.length < currentText.length) { console.log('added'); added = true;}
		
		//viene cercato dove l'utente ha eseguito la modifica
		var editedIndex = -1;
		for(var i = 0; i < prevText.length; i++) {
			if(prevText[i] != currentText[i]) {
				editedIndex = i;
				break;
			}
		}
		
		console.log('index trivato ' + editedIndex);
		
		//applichiamo le modifiche a tutti i wfElements
		for(var i = 0; i <  widgetElementList[widgetElementListMap[widgetId]].wfElements.length; i++) {
			
			var newValue = widgetElementList[widgetElementListMap[widgetId]].wfElements[i].wf[0].graphicalValue.split(' ');
			var newValueString = widgetElementList[widgetElementListMap[widgetId]].wfElements[i].wf[0].graphicalValue;
			
			if(edited) {
				
				if(editedIndex != -1) {
					
					console.log('edited');
					newValue[editedIndex] = currentText[editedIndex];
					
					console.log(newValue);
					
					newValueString = '';
					for(var textIndex = 0; textIndex < newValue.length; textIndex++) {
						
						newValueString = newValueString + newValue[textIndex];
						
						if(textIndex < newValue.length -1) {
							newValueString = newValueString + ' ';
						}
						
					}
					
				} 
				
				
				
			} else {
				if(deleted) {
					
					console.log('deleetd');
					
					 newValue.splice(editedIndex, 1);
					 
					 newValueString = '';
						for(var textIndex = 0; textIndex < newValue.length; textIndex++) {
							
							newValueString = newValueString + newValue[textIndex];
							
							if(textIndex < newValue.length -1) {
								newValueString = newValueString + ' ';
							}
							
						}
					 
				} else {
					if(added) {
						
						console.log('added');
						
						//è stato aggiunto una nuova parola
						if(editedIndex == -1){
							//la parola è stata aggiunta alla fine
							newValueString = newValueString + ' ' + currentText.pop();
						} else {
							//la parola è stata aggiunta nella posizione editedIndex
							newValueString = '';
							
							for(var textIndex = 0; textIndex <= newValue.length; textIndex++) {
								
								if(textIndex <= editedIndex+1) {
									newValueString = newValueString + currentText[textIndex];	
								} else {
									newValueString = newValueString + newValue[textIndex - 1];
								}
								
								
								if(textIndex <= newValue.length -1) {
									newValueString = newValueString + ' ';
								}
								
							}

							
						}
						
					}
					
					
				}
				
				
				
			}
			
			widgetElementList[widgetElementListMap[widgetId]].wfElements[i].wf[0].graphicalValue = newValueString;
			widgetElementList[widgetElementListMap[widgetId]].wfElements[i].wf[0].valueId = newValueString;
			
		}
		
		
		
	} else {
		//la modifca dev'essere applicata soltanto al contenuto attualmente mostrato


		//modifica del wfElements
		widgetElementList[widgetElementListMap[widgetId]].wfElements[cursor].wf[0].valueId = element.value;
		widgetElementList[widgetElementListMap[widgetId]].wfElements[cursor].wf[0].graphicalValue = element.value;
		widgetElementList[widgetElementListMap[widgetId]].numOfElementSelected = widgetElementList[widgetElementListMap[widgetId]].wfElements.length;
	}
	
	
	if(text.length > 45) {
		text = text.substr(0,45) + '...';
	}
	
	
	document.getElementById('text_id_' + widgetId).innerHTML = 'Testo trascinabile: ' + text;
	
	
	//modifica del valueId del wf del widget. Contiene di fatto l'elemento attualemtne selezionato e modificato. Serve per il prev
	widgetElementList[widgetElementListMap[widgetId]].widgetObject.wf[0].valueId = element.value;
	
	
}

function clickOnAreaText(element) {
	
	//prende l'elemento attualemtne visualizzato (cursor) e modifica quindi il valueId dell'object
	var widgetId = element.id.split('_').pop();
	var cursor = widgetElementList[widgetElementListMap[widgetId]].cursor;
	
	widgetElementList[widgetElementListMap[widgetId]].widgetObject.wf[0].valueId = widgetElementList[widgetElementListMap[widgetId]].wfElements[cursor].wf[0].graphicalValue;
	
	
}

function changeValueOfTextButton(element) {
	
	var currentValue = element.name;
	
	console.log(currentValue);
	
	if(currentValue.indexOf("off") > -1) {
		
		element.title="le modifiche al testo saranno applicate a tutti gli elementi presenti in questo widget";
		element.name = "on";
		element.setAttribute('src', 'img/onButton.png');
		
	}else {
		
		element.title="le modifiche al testo saranno applicate soltanto all\'elemento attualmente visualizzato";
		element.name = "off";
		element.setAttribute('src', 'img/offButton.png');
	}
	
	
}