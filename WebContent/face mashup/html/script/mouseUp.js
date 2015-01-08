//flag ï¿½ true se il mouse si trova sul body
//qui devi aggiungere le nuove modifiche per vedere se il mouse si trova su un widget 
//controllare anche se il contenuto trasportato è accettato dal widget stesso
function mouseUp() {
	
	if (!systemPause) {
		
		//console.log('rilasciato su ' + currentWidgetMouseOver);

		if (widgetDownName != 'null' || draggedWidget != null) {
			//l'utente ha spostato un widet.

			try {

				//eliminazione elemento grafico trascinato
				document.getElementById('draggedWidgetId').parentNode.removeChild(document.getElementById('draggedWidgetId'));

			}catch(Exception) {

			}

			//identificazione del luogo del rilascio
			if (!mouseOverBoxBool) {
				widgetRelasedOnWork = true;
				mouseOverBody(true);

			} else {

				widgetDownName = 'null';
				widgetRelasedOnWork = false;

			}
		} else

			if (draggedFieldIdForConnection != '-1') {

				//MOUSE UP E STO SPOSTANDO UN FIELD
				//controlliamo se ci sono widget in widgetElementList con il campo mouseOverThisWidget messo a true
				//più semplicemente controlliamo la variabile currentWidgetmouseOver.
				//se -1 il collegamento non viene eseguito (il widget è stato rilasciato non sopra un altro widget)
				//altrimenti controlliamo che non lo abbia rilasciato sul widget stesso di appartenenza (actualWidgetMouseOver == draggedFieldForConnection.split.pop)

				if (currentWidgetMouseOver != '-1' && currentWidgetMouseOver.indexOf('field') < 0) {

					//se il widget su cui ho spostato il field è diverso dal widget di appartenenza del field stesso
					if (currentWidgetMouseOver != draggedFieldIdForConnection
							.split('_').pop()) {

						var canConnect = false;
						//se il widget di destinazione ha come input type il type del mmio widget allora eseguo il collegamento
						//quindi scorro listOfAllowedWidget alla ricerca dell'id del widget di destinazione
						for ( var listOfAllowedWidgetIndex = 0; listOfAllowedWidgetIndex < listOfAllowedWidget.length; listOfAllowedWidgetIndex++) {

							if (listOfAllowedWidget[listOfAllowedWidgetIndex] == currentWidgetMouseOver) {
								canConnect = true;
								break;
							}

						}
						
						//inoltre dobbiamo verificare che l'utente non stiacreando uno stallo!!!!
						//questo lo facciamo controllando la connectedList.
						//se il widegt che sto trascinando ha come input_elements il widget di destinazione
						//allora mostra popup di errore
						
						//scorriamo nella connectedList per cercare il widget che sto trascinando
						for(var conIndex = 0; conIndex < connectedList.length; conIndex++) {
							if(connectedList[conIndex].widgetDest == draggedFieldIdForConnection.split('_').pop()) {
								
								//scorriamo nei suoi inputElements per vederre se è presente il widget su cui ho rilasciato 
								//il field trasportato
								for(var inIndex = 0; inIndex < connectedList[conIndex].inputElements.length; inIndex++) {
									
									if(connectedList[conIndex].inputElements[inIndex].split('_').pop() == widgetElementList[widgetElementListMap[currentWidgetMouseOver]].widgetId) {
										//STALLO
										
										//mostrare il popup
										//document.body.innerHTML = document.body.innerHTML + getErrorPopup('Impossibile confermare. Non hai inserito tutte le informazioni richieste per questo tipo di operazione. Assicurati di aver scelto un campo di questo widget su cui effettuare il confronto e di aver trascinato all\'interno dell\'area predisposta il campo di un altro widget che intendi confrontare','error');
										$('body').append(getErrorPopup('Impossibile eseguire il collegamento. Stai creando un stallo. Non puoi far dipendere un widget A da un widget B se il widget B dipende a sua volta dal widget A','error'));
										
										document.getElementById('error_popup_body').style.position = 'absolute';
										document.getElementById('error_popup_body').style.left = (document.body.clientWidth / 2)
												- (document.getElementById('error_popup_body').clientWidth / 2)
												+ document.body.scrollLeft;
										document.getElementById('error_popup_body').style.top = (document.body.clientHeight / 2)
												- (document.getElementById('error_popup_body').clientHeight / 2)
												+ document.body.scrollTop - 100;
										document.getElementById('error_popup_body').style.zIndex = 100000;
										
										canConnect = false;
										
									}
									
								}
								
							}
						}

						if (canConnect) {

							//ESEGUIAMO IL COLLEGAMENTO
							console.log('eseguiamo il collegamento');

							//se il widget è di tipo text allora lo mettiamo a loaded = false
//							if(widgetElementList[widgetElementListMap[currentWidgetMouseOver]].widgetObject.type == 'text widget') {
//							widgetElementList[widgetElementListMap[currentWidgetMouseOver]].loaded = false;	
//							}


							if(widgetElementList[widgetElementListMap[currentWidgetMouseOver]].widgetObject.type.indexOf('POST') == -1) {
								widgetElementList[widgetElementListMap[currentWidgetMouseOver]].loaded = false;		
							}



							//cerchiamo se esistono già collegamenti con il widgetDest uguale a currentWidgetMouseOver
							var indexPosition = -1;

							for ( var connectedListIndex = 0; connectedListIndex < connectedList.length; connectedListIndex++) {

								if (connectedList[connectedListIndex].widgetDest == currentWidgetMouseOver) {

									indexPosition = connectedListIndex;

									break;

								}

							}

							if (indexPosition != -1) {

								//inseriamo il draggedFieldForConnection nella lista degli inputElements del index trovato
								connectedList[indexPosition].inputElements
								.push(draggedFieldIdForConnection);

								//viene modificata la posizione del widget
								//sulla base dei suoi elementi in ingresso
								makeConnection(connectedList[indexPosition].widgetDest);
								
								//l'elemento è già stato processato.
								//bisogna farlo processare di nuovo

								//settare a cascata tutti i widget che hanno sicuramente una wfElementsList che dipende dal widgetDest.
								//a cascata perchè A -> B -> C se cambio A cambiano anche B e C ovviamente!!!!
								//lo si fa mediante una funzione ricorsiva
								breakConnection(indexPosition);

							} else {

								inputElements = [];
								inputElements
								.push(draggedFieldIdForConnection);

								connectedList.push({

									processed : false, //indica se il collegamento è già stato processato dal server. Nella fase di creazione non tanto utile ma serve nel caso l'utente usi un'applicazione con i collegamenti già definiti. Inoltre nella fase di composizione possiamo passare tutta la connected List
									widgetDest : currentWidgetMouseOver,
									inputElements : inputElements
								});
								
								//viene modificata la posizione del widget
								//sulla base dei suoi elementi in ingresso
								makeConnection(connectedList[connectedList.length-1].widgetDest);

							}

							//inseriamo l'elemento grafico presente in draggedGraphicalField nel widget di destinazione con un id particolare								    
							//calcolo idIncrementale
							var uniqueId = 0;
							if (indexPosition != -1) {
								uniqueId = connectedList[indexPosition].inputElements.length - 1;
							}

							//id del tipo : input-widgetDest-idIncrementale-elementIdDelCampoCollegato
							//inputBox.setAttribute('id', 'input-'+ currentWidgetMouseOver +'-'+ uniqueId +'-' + draggedFieldIdForConnection);
							var thisId = 'input-' + currentWidgetMouseOver
							+ '-' + uniqueId + '-'
							+ draggedFieldIdForConnection;
							var widgetId = draggedFieldIdForConnection
							.split('_').pop();
							var numberOfElements = 0;
							var indexOfWidgetInputList = widgetElementListMap[parseInt(widgetId)];


							numberOfElements = widgetElementList[indexOfWidgetInputList].wfElements.length;

							//inseriamo per ogni wfElementList l'elemento di connessione personalizzato dall'utente
							//per quel determinato widget di destinazione
							for ( var wfElementsIndex = 0; wfElementsIndex < widgetElementList[indexOfWidgetInputList].wfElements.length; wfElementsIndex++) {

								var wfIndex = getWfIndex(draggedFieldIdForConnection);


								try {

									widgetElementList[indexOfWidgetInputList].wfElements[wfElementsIndex].wf[wfIndex].selectedForConnection
									.push({
										widgetDest : currentWidgetMouseOver,
										selected : true
									});


								} catch (Exception) { }




							}

							var titleText = 'Il campo collegato è evidenziato. Clicca qui per modificare la lista. Elementi presenti: '+ widgetElementList[indexOfWidgetInputList].numOfElementSelected;

//							if (uniqueId < 5) {
//							var inputBox = '<div class="input_element_div" title=\' '
//							+ titleText
//							+ ' \' id='
//							+ thisId
//							+ ' style=\' margin-left: 10px \' onmouseout="javascript:removeHighlightField()" onmouseover="javascript:mouseOverThisInputBox(this)" onclick="javascript:showConnectedElement(this,\'main widget connection\')"> <p class="nowrap" id="text-'+thisId
//							+ '"style="color:white; width:30px; position:relative; top: -20px; left:90px; font-size:30px; font-family: sans"><b>0</b></p> </div>';

//							} else {
//							var inputBox = '<div class="input_element_div" title='
//							+ titleText
//							+ ' \' id='
//							+ thisId
//							+ ' style=\' margin-left: 10px; margin-top: 5px \' onmouseout="javascript:removeHighlightField()" onmouseover="javascript:mouseOverThisInputBox(this)"  onclick="javascript:showConnectedElement(this, \'main widget connection\')"> <p id="text-'+thisId
//							+ '"style="color:white; position: absolute; top: -35px; left:90px; font-size:40px; font-family: sans"><b>0</b></p>  </div>';

//							}

							var inputBox = '<div class="input_element_div" title=\' '
								+ titleText
								+ ' \' id='
								+ thisId
								+ ' style=\' margin-left: 10px \' onmouseout="javascript:removeHighlightField()" onmouseover="javascript:mouseOverThisInputBox(this)" onclick="javascript:showConnectedElement(this,\'main widget connection\')"> <p class="nowrap" id="text-'+thisId
								+ '"style="color:white; width:30px; position:relative; top: -20px; left:90px; font-size:30px; font-family: sans"><b>0</b></p> </div>';


							var widgetInputElementDiv = document
							.getElementById('input_element_div_'
									+ currentWidgetMouseOver);

							document.getElementById('input_element_div_'
									+ currentWidgetMouseOver).innerHTML = document
									.getElementById('input_element_div_'
											+ currentWidgetMouseOver).innerHTML
											+ inputBox;

							//widgetInputElementDiv.appendChild(inputBox);   

							//avviamo la computazione
							
							console.log(connectedList);

							
							startComputation();	



						}

					}

				} else if(currentWidgetMouseOver != '-1' && currentWidgetMouseOver.indexOf('field') > -1) {

					//controlliamo che il widget di destinazione non sia di POST

					if(widgetElementList[widgetElementListMap[currentWidgetMouseOver.split('_')[3]]].widgetObject.type.indexOf('POST') == -1) {
						
						//cambiamo la visualizzazione del campo
						document.getElementById('putInMatchOp_' + currentWidgetMouseOver.split('_')[1] + '_' + currentWidgetMouseOver.split('_')[2] + '_' + currentWidgetMouseOver.split('_')[3]).src = 'img/putInOk.png';

						document.getElementById('putInMatchOp_' + currentWidgetMouseOver.split('_')[1] + '_' + currentWidgetMouseOver.split('_')[2] + '_' + currentWidgetMouseOver.split('_')[3]).name = draggedFieldIdForConnection;
						document.getElementById('putInMatchOp_' + currentWidgetMouseOver.split('_')[1] + '_' + currentWidgetMouseOver.split('_')[2] + '_' + currentWidgetMouseOver.split('_')[3]).title = 'elemento inserito';

						//currentWidgetMouseOver contiene  field_idOp_widgetId 
						changeFieldOfSelect('field_combo_'+ currentWidgetMouseOver.split('_')[1]+'_'+currentWidgetMouseOver.split('_')[2]+'_'+currentWidgetMouseOver.split('_')[3] , draggedFieldIdForConnection);

						makeConnection(currentWidgetMouseOver.split('_').pop());

					} else {

						var opOfWidget = widgetElementList[widgetElementListMap[currentWidgetMouseOver.split('_')[3]]].op;
						var lastElementIndex = opOfWidget.length -1;
						var widgetId = currentWidgetMouseOver.split('_')[3];




						if(opOfWidget[lastElementIndex].fieldAId == '') {
							//primo elemento del blocco che viene inserito
							widgetElementList[widgetElementListMap[widgetId]].op[lastElementIndex].fieldAId = draggedFieldIdForConnection;
						}else {
							if(opOfWidget[lastElementIndex].fieldBId == '') {
								//lo inseriamo nel secondo elemento del blocco
								widgetElementList[widgetElementListMap[widgetId]].op[lastElementIndex].fieldBId = draggedFieldIdForConnection;

								//creiamo una nuova op

								var oldUniqueId = widgetElementList[widgetElementListMap[currentWidgetMouseOver.split('_')[3]]].op[lastElementIndex].opId.split('_')[1];

								var newUniqueId = widgetElementList[widgetElementListMap[currentWidgetMouseOver.split('_')[3]]].op[lastElementIndex].opId.split('_')[0] + '_' + (parseInt(oldUniqueId)+1) + '_' + widgetId;

								widgetElementList[widgetElementListMap[currentWidgetMouseOver.split('_')[3]]].op.push({confermed: false, processed: false, opId: newUniqueId, fieldAId:'', fieldBId:'', subOp:'', binArray: [], inputType: ['001', '008', '011']});
								
								//viene modificata la posizione del widget
								//sulla base dei suoi elementi in ingresso
								makeConnection(widgetId);

							}
						}

						var widgetInputId = draggedFieldIdForConnection.split('_').pop();

						//inseriamo per ogni wfElementList l'elemento di connessione personalizzato dall'utente
						//per quel determinato widget di destinazione
						for ( var wfElementsIndex = 0; wfElementsIndex < widgetElementList[widgetElementListMap[widgetInputId]].wfElements.length; wfElementsIndex++) {

							var wfIndex = getWfIndex(draggedFieldIdForConnection);


							try {

								widgetElementList[widgetElementListMap[widgetInputId]].wfElements[wfElementsIndex].wf[wfIndex].selectedForConnection
								.push({
									widgetDest : widgetId,
									selected : true
								});


							} catch (Exception) { }



						}

						//widgetElementList[widgetElementListMap[currentWidgetMouseOver.split('_')[3]]].loaded = true;
						startComputation();	

					}



				}

				//elimina elementi visivi come gli evidenziatori sui widget possibili di destinazione
				//e l'elemento visivo usato per il drag


				//eliminazione elemento draggato
				try {
					draggedGraphicalField.parentNode.removeChild(draggedGraphicalField);
				}catch(Exception) {
					
				}
				

				//eliminazione elementi di highlighted e gl iinvisible layer

				for ( var i = 0; i < listOfAllowedWidget.length; i++) {

					document.body.removeChild(document
							.getElementById('invisibleLayerOFWidgetId_'
									+ listOfAllowedWidget[i]));
					document.body.removeChild(document
							.getElementById('highlightWidget_'
									+ listOfAllowedWidget[i]));

				}


				//eliminazione highlight e invisibleLayer dei putIn field
				var putInElements = $('*[id^="invisibleLayerOFPutInId"]');
				for(var i=0; i < putInElements.length; i++) {
					var id = putInElements[i].id.split('_')[1] +'_'+ putInElements[i].id.split('_')[2] + '_' + putInElements[i].id.split('_').pop();

					document.body.removeChild(document.getElementById('invisibleLayerOFPutInId_' + id));
					document.body.removeChild(document.getElementById('highlightPutInId_' + id));

				}


				draggedFieldIdForConnection = '-1';
				listOfAllowedWidget = [];
				listOfAllowedOp = [];
				
				

			}

	}
	
	
	//è stato spostato un widget.
	//dev'essere sistemata la positionList 
	if(positionListDraggedWidgetIndex != -1) {
		
		for(var i = 0; i < positionList.length; i++) {
			
			//viene recuperata la posizione del widget
			var rect = document.getElementById('widget_body_'+positionList[i].widgetId).getBoundingClientRect();
			positionList[i].xPosition = Math.abs(rect.left + document.body.scrollLeft);
			positionList[i].yPosition = Math.abs(rect.top +  document.body.scrollTop);
			
		}
		
		positionListDraggedWidgetIndex = -1;
		positionListDraggedWidgetThisColumnIndex = -1;
		prevTmpX = 0;
		prevTmpY = 0;
		
		console.log('PL');
		console.log(positionList);
		
		addStep();
		
	}
	
	//è stata modificata la posizione di uno sticker
	if(draggedStickerFlag) {
		draggedStickerFlag = false;
		addStep();
	}
	
	//è stato inserito uno sticker
	if(draggedSticker != null) {
		
		//eliminazione elemento grafico trasportato
		document.getElementById('draggedStickerId').parentNode.removeChild(document.getElementById('draggedStickerId'));
		var sticker = new  stickerClass(stickerId, draggedSticker.id, tempX, tempY, zIndexInt, '');
		
		stickerElementList.push(sticker);
		stickerElementListMap.push(stickerElementList.length - 1);
		
		//inserimento elemento grafico
		$('body').append(getStickerDiv(stickerElementList.length-1));
		
		//viene settato il width al div
		document.getElementById('sticker_div_'+stickerElementList[stickerElementList.length - 1].stickerId).width = document.getElementById('sticker_div_'+stickerElementList[stickerElementList.length - 1].stickerId).clientWidth; 
		
		draggedSticker = null;
		stickerId++;
		
		addStep();
		
		console.log(stickerElementList);
		
	}


	
	
	return false;

}