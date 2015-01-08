function getLoadPopup() {
	
	systemPause = true;

	return (

			'<div id="load_save_popup_body" class="load_popup_bg">' +
			
				'<div class="error_inner_popup" style="position:absolute; top: 150px; left: 500;">'+
			
				    '<img src="img/widget_body/widget_close.png" style="position: absolute; top: -80px; left: 450px; width:30;" onclick="javascript:deleteLoadSavePopup()"/>'+
				
			
				    '<p style="color:#e6e6e6; font-size:20px; font-family: sans; position:absolute; top:-30; left:-340;">Application name</p>' +
				    '<p id="name_of_app" style="color:#00a6ff; font-size:25px; font-family: sans; position:absolute; top:-38; left:-110;"></p>' +
				    
				    '<p style="color:#e6e6e6; font-size:20px; font-family: sans; position:absolute; top:0; left:-340;">author:</p>' +
				    '<p id="author_of_app" style="color:#00a6ff; font-size:25px; font-family: sans; position:absolute; top:-8; left:-110;"></p>' +
				    
				    '<p style="color:#e6e6e6; font-size:20px; font-family: sans; position:absolute; top:60; left:-340;">description:</p>' +
				    '<img src="img/load_save_popup/PopupWhiteRect.png" style="position: absolute; top: 110px; left: -420px"/>'+
				    
				    
				    '<p id="description_of_app" style="color:white; font-size:20px; font-family: sans; position:relative; top:110; left:-320;"></p>' +
				    
				    '<img src="img/load_save_popup/PopupWhiteRect.png" style="position: absolute; top: 320px; left: -420px"/>'+
				    
				    '<img src="img/load_save_popup/choseFile.png" style="position: absolute; top: 350px; left: 50px"/>'+
				    '<input onchange="javascript:loadApplicationPreview()" type="file" id="open_file" style="position: absolute; top: 350px; left: 50px; width:180; height:45; opacity:0">'+
				    
					'<img src="img/load_save_popup/loadPopupConfirm.png" style="position: absolute; top: 350px; left: 300px" onclick="javascript:loadApplicationConfirm(this)"/>'+
					
				'</div>'+

			'</div>'


	);
	
	
	
}


function getSavePopup() {
	
	systemPause = true;

	return (

			'<div id="load_save_popup_body" class="save_popup_bg">' +
			
				'<div class="error_inner_popup" style="position:absolute; top: 150px; left: 500;">'+
			
				    '<img src="img/widget_body/widget_close.png" style="position: absolute; top: -80px; left: 450px; width:30;" onclick="javascript:deleteLoadSavePopup()"/>'+
				
			
				    '<p style="color:#e6e6e6; font-size:20px; font-family: sans; position:absolute; top:0; left:-340;">Application name:</p>' +
				    '<textarea  id="text_area_name_of_app" style="position:absolute; top:50; left:-340; " rows="1" cols="50">'+
					'</textarea>' +
				    
				    '<p style="color:#e6e6e6; font-size:20px; font-family: sans; position:absolute; top:70; left:-340;">author:</p>' +
				    '<textarea  id="text_area_author_of_app" style="position:absolute; top:120; left:-340; "rows="1" cols="50">'+
					'</textarea>' +
				    
				    '<p style="color:#e6e6e6; font-size:20px; font-family: sans; position:absolute; top:140; left:-340;">description:</p>' +
				    '<textarea  id="text_area_description_of_app" style="position:absolute; top:190; left:-340; " rows="5" cols="100">'+
					'</textarea>' +
				    
				    
				
				    
				    '<img src="img/load_save_popup/PopupWhiteRect.png" style="position: absolute; top: 320px; left: -420px"/>'+
				    
					'<a id="openFiles" download="tmp.fm"><img src="img/load_save_popup/saveButton.png" style="position: absolute; top: 350px; left: 300px" onclick="javascript:saveApplicationConfirm(this)"/></a>'+
					
				'</div>'+

			'</div>'


	);
	
	
	
}

var readData = null;

function loadApplicationPreview() {
	
	var files = document.getElementById('open_file').files;
    if (!files.length) {
      
      console.log('nessun file inserito');
      return;
    }

    var file = files[0];
    var start = 0;
    var stop = file.size - 1;

    var reader = new FileReader();

    reader.onloadend = function(evt) {
      if (evt.target.readyState == FileReader.DONE) {
    	readData = evt.target.result;
        
    	//vengono mostrati i valori recuperati
    	document.getElementById('name_of_app').innerHTML = readData.split('&*&')[1];
    	document.getElementById('author_of_app').innerHTML = readData.split('&*&')[2];
    	document.getElementById('description_of_app').innerHTML = readData.split('&*&')[3];
    	
    	
      }
    };

    var blob = file.slice(start, stop + 1);
    reader.readAsBinaryString(blob);
	
}

function loadApplicationConfirm(element) {
	
	if(readData == null) {
		
		console.log('non hai inserito nessun file');
		return;
	}
	
	

	//si cancellano i widget già inseriti
	for(var i = 0; i < widgetElementList.length; i++) {
		
	    try {
	    	
	    	document.getElementById('widget_body_'+widgetElementList[i].widgetId).parentNode.removeChild(document.getElementById('widget_body_'+widgetElementList[i].widgetId));
	    	
	    }catch(Exception) {
	    	
	    }
	}
	
	//si cancellano gli sticker già inseriti
	for(var i = 0; i < stickerElementList.length; i++) {
        try {
	    	
	    	document.getElementById('sticker_div_'+stickerElementList[i].stickerId).parentNode.removeChild(document.getElementById('sticker_div_'+stickerElementList[i].stickerId));
	    	
	    }catch(Exception) {
	    	
	    }
	}
		
	appLoaded = true;
	
	widgetElementList = [];
	widgetElementListMap = [];
	stickerElementList = [];
	stickerElementListMap = [];
	positionList = [];
	userIsLogin = false;
	operationUniqueId = 0;
	zIndexInt = 0;
	widgetId = 0;
	stickerId = 0;
	connectedList = [];
	
	
	
	widgetElementListLoaded = JSON.parse(readData.split('&*&')[4]);
	connectedList = JSON.parse(readData.split('&*&')[5]);
	positionList = JSON.parse(readData.split('&*&')[6]);
	stickerElementList = JSON.parse(readData.split('&*&')[7]);
	
	//modifichiamo le xPosition se la barra dei widget è visible
	if(xStartOffset > 0) {
		for(var i = 0; i < positionList.length; i++) {
			positionList[i].xPosition = positionList[i].xPosition + xStartOffset;
		}
		
		for(var i = 0; i < stickerElementList.length; i++) {
			stickerElementList[i].xPosition = stickerElementList[i].xPosition + xStartOffset;
		}
	}
	
	//per ogni elemento nella widgetElementList dobbiamo ora inserire gli elementi grafici 
	for(var i = 0; i < widgetElementListLoaded.length; i++) {
		
		if(widgetElementListLoaded[i].widgetObject.type.indexOf('dummy') == -1) {
		
			mouseOverBoxBool = false; 
			widgetRelasedOnWork = true;
			widgetDownName = widgetElementListLoaded[i].widgetObject.type;
			if(widgetDownName.split(' ')[0] == 'LIST' || widgetDownName.split(' ')[0] == 'POST') {
				widgetDownName = widgetDownName.split(' ')[1];
			}else {
				widgetDownName = widgetDownName.split(' ')[0];
			}
			
			widgetId = widgetElementListLoaded[i].widgetId;
			mouseOverBody(true,'load');
			
			//se il widget è di tipo testo allora dobbiamo caricare il graphical value salvato
			if(widgetElementList[i].widgetObject.type.indexOf('text') > -1) {
				widgetElementList[i].widgetObject.wf[0].valueId = widgetElementListLoaded[i].widgetObject.wf[0].graphicalValue;
				widgetElementList[i].widgetObject.wf[0].graphicalValue = '';
				
				//modifica anche del wfELement
			    widgetElementList[i].wfElements[0].wf[0].graphicalValue = widgetElementListLoaded[i].widgetObject.wf[0].graphicalValue;
				widgetElementList[i].wfElements[0].wf[0].valueId = widgetElementListLoaded[i].widgetObject.wf[0].graphicalValue;
				
				//modifica testo trascinabile e valore text area
				document.getElementById('text_area_'+widgetElementList[i].widgetId).innerHTML = widgetElementListLoaded[i].widgetObject.wf[0].graphicalValue;
				document.getElementById('text_id_'+widgetElementList[i].widgetId).innerHTML = widgetElementListLoaded[i].widgetObject.wf[0].graphicalValue;
				
			}
			
			//per ogni operazione
			for(var j = 0; j < widgetElementListLoaded[i].op.length; j++) {
				
				if(widgetElementListLoaded[i].op[j].opId.indexOf('001_') > -1) {
					//operazione di match
					
					widgetElementList[i].op.push(widgetElementListLoaded[i].op[j]);
					
					//inserimento dell'operazione grafica
					var width = document.getElementById('widget_body_' + widgetElementListLoaded[i].widgetId).clientWidth;
					
					document.getElementById('widget_body_' + widgetElementListLoaded[i].widgetId).style.height = document.getElementById('widget_body_' + widgetElementListLoaded[i].widgetId).clientHeight + 100;
					document.getElementById('widget_body_' + widgetElementListLoaded[i].widgetId).style.width = width;
					

					//carica il div
					var fieldAId = widgetElementListLoaded[i].op[j].fieldAId;
					if(fieldAId == '') {
						fieldAId = null;
					}
					document.getElementById('widget_body_' + widgetElementListLoaded[i].widgetId).innerHTML = document.getElementById('widget_body_' + widgetElementListLoaded[i].widgetId).innerHTML + getGraphicalMatchOp(widgetElementListLoaded[i].widgetId, widgetElementListLoaded[i].op[j].opId.split('_')[1]+'_'+widgetElementListLoaded[i].op[j].opId.split('_')[2] , fieldAId);
					
					document.getElementById('op_'+widgetElementListLoaded[i].op[j].opId).style.left = 35;
					document.getElementById('op_'+widgetElementListLoaded[i].op[j].opId).style.top = 5;
					
					if(widgetElementListLoaded[i].op[j].confermed) {
						makeInvisible(document.getElementById('executeOp_'+widgetElementListLoaded[i].op[j].opId));
					}
					
					//caricamento operazione scelta
					var indexOp = 0;
					switch(widgetElementListLoaded[i].op[j].subOp) {
					case 'equal': indexOp = 0; break;
					case 'notEqualMatchOp': indexOp = 1; break;
					case 'containsMatchOp': indexOp = 2; break;
					case 'notContainsMatchOp': indexOp = 3; break;
					}
					
					var subOpElement = document.getElementById('matchOp_combo_'+ widgetElementListLoaded[i].op[j].opId);
					
					//modifico il valore di default della select	
					for(var k = 0; k < subOpElement.options.length; k++) {
						subOpElement.options[k].removeAttribute("selected");
					}

					subOpElement.options[indexOp].setAttribute("selected","selected");
					
					//modifica fieldBId
					//cambiamo la visualizzazione del campo
					if(widgetElementListLoaded[i].op[j].fieldBId != '') {
					
						document.getElementById('putInMatchOp_' + widgetElementListLoaded[i].op[j].opId).src = 'img/putInOk.png';

						document.getElementById('putInMatchOp_' + widgetElementListLoaded[i].op[j].opId).name = widgetElementListLoaded[i].op[j].fieldBId;
						document.getElementById('putInMatchOp_' + widgetElementListLoaded[i].op[j].opId).title = 'elemento inserito';
					}
	
				}else {
					if(widgetElementListLoaded[i].op[j].opId.indexOf('000_') > -1 && widgetElementListLoaded[i].widgetObject.type.indexOf('date') == -1 && widgetElementListLoaded[i].widgetObject.type.indexOf('LIST') == -1 && widgetElementListLoaded[i].widgetObject.type.indexOf('text')) {
						
						//operazione di user selector
						
						widgetElementList[i].op.push(widgetElementListLoaded[i].op[j]);
						
						//viene caricato graficamente
						var width = document.getElementById('widget_body_' + widgetElementListLoaded[i].widgetId).clientWidth;
						
						document.getElementById('widget_body_' + widgetElementListLoaded[i].widgetId).style.height = document.getElementById('widget_body_' + widgetElementListLoaded[i].widgetId).clientHeight + 100;
						document.getElementById('widget_body_' + widgetElementListLoaded[i].widgetId).style.width = width;
						
						document.getElementById('widget_body_' + widgetElementListLoaded[i].widgetId).innerHTML = document.getElementById('widget_body_' + widgetElementListLoaded[i].widgetId).innerHTML + getGraphicalSelectorOp(widgetElementListLoaded[i].widgetId, widgetElementListLoaded[i].op[j].opId.split('_')[1]+'_'+widgetElementListLoaded[i].op[j].opId.split('_')[2]);

						document.getElementById('op_'+widgetElementListLoaded[i].op[j].opId).style.left = 35;
						document.getElementById('op_'+widgetElementListLoaded[i].op[j].opId).style.top = 5;
						
					} else {
						
						if(widgetElementListLoaded[i].op[j].opId.indexOf('002_') > -1) {
							
							//operazione di post usata per contenere gli elementi
							if(j == 0) {
								widgetElementList[i].op = [];
							}
							widgetElementList[i].op.push(widgetElementListLoaded[i].op[j]);

							
						}
						
					}
				}
				
			}
			
			
		}
	}
	
	//aumentiamo la dimensione del body di 300px
	document.body.style.height = 300 + document.body.scrollHeight;
	
	//per ogni connessione aggiungiamo l'elemento grafico
	for(var i = 0; i < connectedList.length; i++) {
		
		var widgetDest = connectedList[i].widgetDest;
		
		for(var j = 0; j < connectedList[i].inputElements.length; j++) {
			
			document.getElementById('input_element_div_'+ widgetDest).innerHTML = document.getElementById('input_element_div_'+ widgetDest).innerHTML
							+ createConnectionGraphicalElement(j,connectedList[i].inputElements[j],widgetDest);
			
		}
		
		
	}
	
	//per ogni elemento presente nella stickerELementList
	//creiamo la stickerElementListMap
	//e inseriamo l'elemento grafico
	for(var i = 0; i < stickerElementList.length; i++) {
		
		var currentStickerId = stickerElementList[i].stickerId.split('_').pop();
		stickerId = currentStickerId;
		
		while(stickerElementListMap.length < stickerId) {
			stickerElementListMap.push('-1');
		}
		
		stickerElementListMap.push(i);
		
		
		//aggiungiamo elemento grafico
		$('body').append(getStickerDiv(i));
		
		//spostiamolo nelle giuste x e y
		document.getElementById('sticker_div_'+stickerElementList[i].stickerId).position = 'absolute';
		document.getElementById('sticker_div_'+stickerElementList[i].stickerId).top = stickerElementList[i].yPosition;
		document.getElementById('sticker_div_'+stickerElementList[i].stickerId).left = stickerElementList[i].xPosition;
		document.getElementById('sticker_div_'+stickerElementList[i].stickerId).style.zIndex = stickerElementList[i].zIndex;
	}
	
	if(stickerElementList.length > 0) {
		stickerId++;
	}
	
	
	console.log('sticker');
	console.log(stickerElementList);
	console.log(stickerElementListMap);

	
}

function createConnectionGraphicalElement(uniqueId, inputField, widgetDest) {
								    
	//id del tipo : input-widgetDest-idIncrementale-elementIdDelCampoCollegato
	//inputBox.setAttribute('id', 'input-'+ currentWidgetMouseOver +'-'+ uniqueId +'-' + draggedFieldIdForConnection);
	var thisId = 'input-' + widgetDest
	+ '-' + uniqueId + '-'
	+ inputField;
	var widgetId = inputField.split('_').pop();

	var titleText = 'Il campo collegato è evidenziato. Clicca qui per modificare la lista. Elementi presenti: 0';


	return('<div class="input_element_div" title=\' '
		+ titleText
		+ ' \' id='
		+ thisId
		+ ' style=\' margin-left: 10px \' onmouseout="javascript:removeHighlightField()" onmouseover="javascript:mouseOverThisInputBox(this)" onclick="javascript:showConnectedElement(this,\'main widget connection\')"> <p class="nowrap" id="text-'+thisId
		+ '"style="color:white; width:30px; position:relative; top: -20px; left:90px; font-size:30px; font-family: sans"><b>0</b></p> </div>');


}

function saveApplicationConfirm(element) {
	
	//vengono, prima di tutto, eseguiti i controlli sui field.
	//tutti i field devono essere riempiti dall'utente
	
	var nameOfApp = document.getElementById('text_area_name_of_app').value;
	var authorOfApp = document.getElementById('text_area_author_of_app').value;
	var descriptionOfApp = document.getElementById('text_area_description_of_app').value;
	
	if(nameOfApp == '' || authorOfApp == '' || descriptionOfApp == '') {
		
		//mostra il popup di errore
		//mostrare il popup
		//document.body.innerHTML = document.body.innerHTML + getErrorPopup('Impossibile confermare. Non hai inserito tutte le informazioni richieste per questo tipo di operazione. Assicurati di aver scelto un campo di questo widget su cui effettuare il confronto e di aver trascinato all\'interno dell\'area predisposta il campo di un altro widget che intendi confrontare','error');
		$('body').append(getErrorPopup('Impossibile salvare l\'applicazione. Inserisci il nome dell\'applicazione, il tuo nome e una descrizione','error'));
		
		document.getElementById('error_popup_body').style.position = 'absolute';
		document.getElementById('error_popup_body').style.left = (document.body.clientWidth / 2)
				- (document.getElementById('error_popup_body').clientWidth / 2)
				+ document.body.scrollLeft;
		document.getElementById('error_popup_body').style.top = (document.body.clientHeight / 2)
				- (document.getElementById('error_popup_body').clientHeight / 2)
				+ document.body.scrollTop - 100;
		document.getElementById('error_popup_body').style.zIndex = 100000;
		
		
	}else {
		
		console.log('avvio scrittura file');

		var textFile = null;
		
		var dataFile = '&*&'+nameOfApp +'&*&'+ authorOfApp +'&*&'+descriptionOfApp;
		
		//viene salvata una widgetElementList con tutti i campi wfElements a [], i binArray delle op a []
		var widgetElementListToSave = JSON.parse(JSON.stringify( widgetElementList ));
		
		for(var i = 0; i < widgetElementListToSave.length; i++) {
			
			widgetElementListToSave[i].loaded = false;
			
			//alcuni widget, come quello di login, modificano anche wf
			if(widgetElementListToSave[i].widgetObject.type == 'login widget') {
				
				for(var j = 0; j < widgetElementListToSave[i].widgetObject.wf.length; j++) {
					 widgetElementListToSave[i].widgetObject.wf[j].graphicalValue = '';
					 widgetElementListToSave[i].widgetObject.wf[j].valueId = '';
				}
				
			}
			
			//eliminazione wfElements
			widgetElementListToSave[i].wfElements = [];
			widgetElementListToSave[i].numOfElementSelected = 0;
			
			//per ogni operazione eliminiamo il bin array e mettiamo tutte le operzioni come confermed (se non è di user selector) ma non processed
			//nonsaranno confermed neanche quelle sotto la user selector
			var userSelectorOp = false;
			for(var j = 0; j <  widgetElementListToSave[i].op.length; j++) {
				widgetElementListToSave[i].op[j].binArray = [];
				if(widgetElementListToSave[i].op[j].opId.indexOf('000_') > -1) {
					
					widgetElementListToSave[i].op[j].processed = false;
					widgetElementListToSave[i].op[j].confermed = false;
					userSelectorOp = true;
					
				}else {
					widgetElementListToSave[i].op[j].processed = false;
				}
			}
		}
		
		//viene creata la connectedList con tutti i processed a false
		var connectedListToSave = JSON.parse(JSON.stringify( connectedList ));
		
		for(var i = 0; i < connectedListToSave.length; i++) {
			
			connectedListToSave[i].processed = false;
			
			if(widgetElementList[widgetElementListMap[connectedList[i].widgetDest]].widgetObject.type.indexOf('place') > -1) {

				//viene controllato che all'interno del widget non siano presenti inputElements con dummy
				for(var j = 0; j < connectedListToSave[i].inputElements.length; j++) {
					if(connectedListToSave[i].inputElements[j].indexOf('dummy') > -1) {
						
						//se dentro c'è qualche altro elemento di input allora eliminiamo solo l'input element dummy
						//altrimenti tutto il collegamento
						if(connectedListToSave[i].inputElements.length > 1) {
							//eliminiamo solo il dummy
							connectedListToSave[i].inputElements.splice(j,1);
						}else {
							connectedListToSave.splice(i,1);
						}
						break;
					}
				}

			}
			
			
			
			
		}
		
		//viene tolto l xStartOffset se questo è maggiore di 0
		var positionListToSave = JSON.parse(JSON.stringify( positionList ));
		if(xStartOffset > 0) {
			for(var i = 0; i < positionListToSave.length; i++) {
				positionListToSave[i].xPosition = positionListToSave[i].xPosition - xStartOffset;
			}
		}
		
		var stickerListToSave = JSON.parse(JSON.stringify( stickerElementList ));
		if(xStartOffset > 0) {
			for(var i = 0; i < stickerListToSave.length; i++) {
				stickerListToSave[i].xPosition = stickerListToSave[i].xPosition - xStartOffset;
			}
		}
		
		dataFile = dataFile + '&*&'+ JSON.stringify(widgetElementListToSave) + '&*&' + JSON.stringify(connectedListToSave) + '&*&' + JSON.stringify(positionListToSave) + '&*&' + JSON.stringify(stickerListToSave);
		
		
		var data = new Blob([dataFile],{type: 'text/plain'});
		
		if (textFile !== null) {

		      window.URL.revokeObjectURL(textFile);
		}

	    textFile = window.URL.createObjectURL(data);
		
	    element.parentNode.setAttribute('download', nameOfApp+'.fm');
	    element.parentNode.setAttribute('href', textFile);   
	    
		
	    deleteLoadSavePopup();
	    
	    $('body').append(getErrorPopup('The application has been successfully saved','ok'));	

		document.getElementById('error_popup_body').style.position = 'absolute';
		document.getElementById('error_popup_body').style.left = (document.body.clientWidth / 2)
		- (document.getElementById('error_popup_body').clientWidth / 2)
		+ document.body.scrollLeft;
		document.getElementById('error_popup_body').style.top = (document.body.clientHeight / 2)
		- (document.getElementById('error_popup_body').clientHeight / 2)
		+ document.body.scrollTop - 100;
		document.getElementById('error_popup_body').style.zIndex = 100000;
		
	}
		
	
	
}


function deleteLoadSavePopup() {
	
	systemPause = false;
	document.getElementById('load_save_popup_body').parentNode.removeChild(document.getElementById('load_save_popup_body'));
	
	
}