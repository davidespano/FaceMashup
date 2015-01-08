function startComputation() {

	console.log("avvio computazione");

	//mostriamo popup di attesa (da creare)

	var param = ('?wl='
			+ encodeURIComponent(JSON.stringify(widgetElementList))
			+ '&cl=' + encodeURIComponent(JSON.stringify(connectedList)));

	systemPause = false;

	$
	.ajax({
		url : '../../FaceMashupServ' + param,
		type : 'GET',
		dataType : 'json',

		beforeSend : function() {

			//mostriamo i loading
			//sappiamo che tutti i widgetDest presenti nella connectedList con processed = false verranno per forza di cose processati
			//quindi mostriamo in tutti i widget il loading!!!!
			for ( var connectedListIndex = 0; connectedListIndex < connectedList.length; connectedListIndex++) {

				if (connectedList[connectedListIndex].processed == false) {

					//nascondiamo il testo di help
					makeInvisible(document
							.getElementById('help_message_'+ connectedList[connectedListIndex].widgetDest));

					if(widgetElementList[widgetElementListMap[connectedList[connectedListIndex].widgetDest]].widgetObject.type.indexOf('POST') > -1) {
						//il widget è di post. Il suo loading dev'essere mostrato soltanto quando l'utente preme sul tasto conferma!
						//quindi la sua prima op dev'essere conferme = true e processed = false altrimenti non viene mostrato
						if(widgetElementList[widgetElementListMap[connectedList[connectedListIndex].widgetDest]].op[0].confermed && !widgetElementList[widgetElementListMap[connectedList[connectedListIndex].widgetDest]].op[0].processed) {

							makeVisible(document
									.getElementById('loading_'
											+ connectedList[connectedListIndex].widgetDest));

						} 

					} else {

						makeVisible(document
								.getElementById('loading_'
										+ connectedList[connectedListIndex].widgetDest));

					}






				}

			}

			if (yetCalled) {

				//è già in corso una chiamata alla servlet.
				//bisogna attendere che questa finisca
				return false;

			}

			yetCalled = true;

		},

		error : function() {

			//da mostrare nel popup
			console.log('IMPOSSIBILE COLLEGARSI A FACEBOOK!!!');
			yetCalled = false;

			//mostrare il popup
			//document.body.innerHTML = document.body.innerHTML + getErrorPopup('Facebook non ha permesso all\'applicazione di recuperare gli elementi richiesti! Cancella i cookie del tuo browser e riprova','error');

			$('body').append(getErrorPopup('Facebook non ha permesso all\'applicazione di recuperare gli elementi richiesti! Cancella i cookie del tuo browser e riprova','error'));

			document.getElementById('error_popup_body').style.position = 'absolute';
			document.getElementById('error_popup_body').style.left = (document.body.clientWidth / 2)
			- (document.getElementById('error_popup_body').clientWidth / 2)
			+ document.body.scrollLeft;
			document.getElementById('error_popup_body').style.top = (document.body.clientHeight / 2)
			- (document.getElementById('error_popup_body').clientHeight / 2)
			+ document.body.scrollTop - 100;
			document.getElementById('error_popup_body').style.zIndex = 100000;


		},
		success : function(data) {
			systemPause = false;
			yetCalled = false;

			console.log('CARICATI DATI DA  FACEBOOK!!!');
			//recuperiamo la risposta dalla nostra servlet (widgetElementList e connectedList aggiornate)
			//per ogni widget in widgetElementList mostriamo il primo elemento trovato nei nostri widget
			console.log(data);

			var widgetElementListFromServlet = data[0];
			var connectedListFromServlet = data[1];
			var statusOfComputation = data[2];
			
			console.log('risutato ottenuto ' + statusOfComputation);
			
			switch(statusOfComputation.split('-')[1]) {
			
			case '00': 
				try {console.log('computazione terminata'); emphasizeWidget(positionList[positionList.length-1].widgetId);}catch(Exception){ emphasizeWidget(widgetElementList[widgetElementList.length - 1].widgetId); }	
				break;
			case '01': 
				
					console.log('richiesta interazione dell\'utente sul widget ' + statusOfComputation.split('-')[2]); 
			        emphasizeWidget(statusOfComputation.split('-')[2]);
			          
				
				break;
				
		
			
			}

			//dobbiamo controllare se durante la computazione del server l'utente ha
			//svolto qualche operazione di inserimento di widget o di inserimento di connessioni
			//lo si fa controllando la dimensione delle liste. Se sono cambiate sono state svolte operazioni di questo tipo
			//e bisogna chiamare di nuovo la servlet con le liste aggiornate

			//inserimento dati coerenti all'interno della widgetElementList

			for ( var i = 0; i < widgetElementListFromServlet.length; i++) {

				//se il widget è di POST dobbiamo contrllare se e' stato eseguito. Questo lo verifichiamo
				//controllando che ora sia a loeaded e che inoltre abbia la prima op confermed e processed
				if(widgetElementList[i].widgetObject.type.indexOf('POST') > -1)  {
					//il widget è di POST. Controlliamo che sia a loaded e confermed
					if(widgetElementListFromServlet[i].loaded && widgetElementListFromServlet[i].op[0].confermed) {

						//se nella eidgetElementList iniziale non era processed e ora lo è significa che l'operazione è stata
						//eseguita. Mostriamo quindi il popup di conferma
						if(widgetElementListFromServlet[i].op[0].processed && !widgetElementList[i].op[0].processed) {

							//mostrare il popup
							//document.body.innerHTML = document.body.innerHTML + getErrorPopup('L\'operazione confermata è stata eseguita con successo','ok');
							$('body').append(getErrorPopup('Operation completed successfully','ok'));	

							document.getElementById('error_popup_body').style.position = 'absolute';
							document.getElementById('error_popup_body').style.left = (document.body.clientWidth / 2)
							- (document.getElementById('error_popup_body').clientWidth / 2)
							+ document.body.scrollLeft;
							document.getElementById('error_popup_body').style.top = (document.body.clientHeight / 2)
							- (document.getElementById('error_popup_body').clientHeight / 2)
							+ document.body.scrollTop - 100;
							document.getElementById('error_popup_body').style.zIndex = 100000;
							
							//settiamo confermed e processed a false
							widgetElementListFromServlet[i].op[0].confermed = false;
							widgetElementListFromServlet[i].op[0].processed = false;
							


						}

					}

				}
				

				//per ogni elemento copiamo tutto tranne la selectedForConnetion perchè potrebbe essere stata modiifcata!!!
				//quindi inserisco dentro la lista ricevuta dal server i valori attuali
				//e poi copio il tutto
				for(var wfElementsIndex = 0; wfElementsIndex < widgetElementListFromServlet[i].wfElements.length; wfElementsIndex++) {

					//entriamo nei wf
					for(var wfIndex = 0; wfIndex < widgetElementListFromServlet[i].wfElements[wfElementsIndex].wf.length; wfIndex++) {

						try {
							widgetElementListFromServlet[i].wfElements[wfElementsIndex].wf[wfIndex].selectedForConnection = widgetElementList[i].wfElements[wfElementsIndex].wf[wfIndex].selectedForConnection;

						}catch(Exception) {

						}


					}


				}

				widgetElementList[i] = widgetElementListFromServlet[i];


			}

			var edited = false;

			//modifica widgetList in modo da renderla coerente
			for ( var i = 0; i < connectedListFromServlet.length; i++) {

				if (connectedList[i].inputElements.length == connectedListFromServlet[i].inputElements.length) {

					connectedList[i] = connectedListFromServlet[i];

				} else {

					//l'utente ha aggiunto un collegamento proprio al widget che stava caricando il proprio contenuto
					breakConnection(i);
					edited = true;
				}

			}

			//per ogni widget in widgetElementList diverso dal widget di login è che ha il campo a loaded mettiamo
			//il primo elemento trovato della wfElement

			for ( var widgetElementListIndex = 0; widgetElementListIndex < widgetElementList.length; widgetElementListIndex++) {

				//controlliamo se è loadead
				if ((widgetElementList[widgetElementListIndex].loaded
						&& widgetElementList[widgetElementListIndex].wfElements.length > 0 && widgetElementList[widgetElementListIndex].numOfElementSelected > 0) || widgetElementList[widgetElementListIndex].widgetObject.type.indexOf('POST') > -1) {

					//controlliamo che sia diverso dal widget di login e dal widget dummy
					if (widgetElementList[widgetElementListIndex].widgetObject.type.indexOf('dummy') == -1 && widgetElementList[widgetElementListIndex].widgetObject.type != 'login widget' && widgetElementList[widgetElementListIndex].widgetObject.type != 'date widget') {

						//se è un widget di POST allora chiamiamo showPostWidgetContent
						if(widgetElementList[widgetElementListIndex].widgetObject.type.indexOf('POST') > -1) {
		
							showPostWidgetContent(widgetElementList[widgetElementListIndex].widgetId);

							//eliminiamo il loading
							makeInvisible(document
									.getElementById('loading_'
											+ widgetElementList[widgetElementListIndex].widgetId));

						} else {


							//eliminiamo il loading
							makeInvisible(document
									.getElementById('loading_'
											+ widgetElementList[widgetElementListIndex].widgetId));

							//modifichiam la rappresentazione
							//scorriamo quindi i field del primo elemento del wfElements

							//eliminiamo il testo di help e togliamo l'opacità agli elementi
							makeInvisible(document
									.getElementById('help_message_'
											+ widgetElementList[widgetElementListIndex].widgetId));

							
							//i widget di tipo list mostreranno il tatso di conferma
							if(widgetElementList[widgetElementListIndex].widgetObject.type.indexOf('LIST') > -1 && !widgetElementList[widgetElementListIndex].op[0].confermed) {
								makeVisible(document.getElementById('executeOp_000_'+widgetElementList[widgetElementListIndex].widgetId));
								makeVisible(document.getElementById('selectAllButton_'+widgetElementList[widgetElementListIndex].widgetId));
								makeVisible(document.getElementById('deselectAllButton_'+widgetElementList[widgetElementListIndex].widgetId));
							}
							

							//l'opButton viene reso visibile soltanto nel caso tutte le operazioni all'interno 
							//del widget siano state processed
							var allProcessed = true;
							for(var i = 0; i < widgetElementList[widgetElementListIndex].op.length; i++) {

								if(widgetElementList[widgetElementListIndex].op[i].processed == false) {
									//rendi visibile il tasto per la conferma
									makeVisible(document.getElementById('executeOp_' + widgetElementList[widgetElementListIndex].op[i].opId));
									allProcessed = false;
								}

							}

							if(allProcessed) {

								try{

									makeVisible(document.getElementById('opButton_' + widgetElementList[widgetElementListIndex].widgetId));
									document.getElementById('opButtonText_' + widgetElementList[widgetElementListIndex].widgetId).innerHTML = '<font color="white">Click on + to insert some operations to select elements or match different fields</font>';

								}catch(Exception) {

								}



							} else {
								try{
									makeInvisible(document.getElementById('opButton_' + widgetElementList[widgetElementListIndex].widgetId));
									document.getElementById('opButtonText_' + widgetElementList[widgetElementListIndex].widgetId).innerHTML = '<font color="white">You need to confirm before adding other operations</font>';

								}catch(Exception){
									
								}


							}

							makeVisible(document.getElementById('opButtonText_'
									+ widgetElementList[widgetElementListIndex].widgetId));

							for ( var wfIndex = 0; wfIndex < widgetElementList[widgetElementListIndex].widgetObject.wf.length; wfIndex++) {

								try {

									element = document
									.getElementById(widgetElementList[widgetElementListIndex].widgetObject.wf[wfIndex].elementId);

									//cambio trasparenza dell'elemento
									element.style.opacity = 1;
									element.style.filter = "alpha(opacity=100)"; //For IE;

								}catch(Exception) {
									console.log('l\'elemento non ha un elementId');
								}


							}

							showElementInCursorPosition(widgetElementListIndex);

						} //if login diverso da widget


					}



				} //if wfLengh > 0 e widget a loaded

				else {

					//wfElementVuota
					
					//i widget di tipo list non mostreranno il tatso di conferma e i tasti di selezione
					if(widgetElementList[widgetElementListIndex].widgetObject.type.indexOf('LIST') > -1) {
						makeInvisible(document.getElementById('executeOp_000_'+widgetElementList[widgetElementListIndex].widgetId));

						
						
						if(widgetElementList[widgetElementListIndex].wfElements.length == 0) {
							
							makeInvisible(document.getElementById('selectAllButton_'+widgetElementList[widgetElementListIndex].widgetId));
							makeInvisible(document.getElementById('deselectAllButton_'+widgetElementList[widgetElementListIndex].widgetId));
							
							//inoltre vengono eliminati tutti gli eventuali elementi presenti al suo interno se la wfElements è vuota
							var exElement = $('div[id^="friend_box_' + widgetElementList[widgetElementListIndex].widgetId +'"]');
							
							for(var i = 0; i < exElement.length; i++) {
								console.log('elimino ' +exElement[i].id);
								document.getElementById(exElement[i].id).parentNode.removeChild(document.getElementById(exElement[i].id));
							}
						}
						
					}

					//il widget di testo, quello di place mostrerà sempre il proprio contenuto così come quelli di POST!!!
					if(widgetElementList[widgetElementListIndex].widgetObject.type != 'text widget' && widgetElementList[widgetElementListIndex].widgetObject.type.indexOf('POST') == -1) {

						makeInvisible(document
								.getElementById('loading_'
										+ widgetElementList[widgetElementListIndex].widgetId));

						if(widgetElementList[widgetElementListIndex].wfElements.length > 0 && widgetElementList[widgetElementListIndex].widgetObject.type.indexOf('LIST') > -1) {
							console.log('widget lista esaminato');
						}else {
							makeVisible(document
									.getElementById('help_message_'
											+ widgetElementList[widgetElementListIndex].widgetId));
						}
						

						makeInvisible(document.getElementById('opButton_'
								+ widgetElementList[widgetElementListIndex].widgetId));
						makeInvisible(document.getElementById('opButtonText_'
								+ widgetElementList[widgetElementListIndex].widgetId));


//						//eliminiamo le operazioni inserite dall'utente
//						//sia dalla widgetElementList che graficamente
//						//ma solo se la wfElement è vuota

//						if(widgetElementList[widgetElementListIndex].loaded
//						&& !widgetElementList[widgetElementListIndex].wfElements.length > 0) {

//						for(var opIndex = 0; opIndex < widgetElementList[widgetElementListIndex].op.length; opIndex++) {										
//						//si recupera l'id e si elimina l'elemento grafico
//						document.getElementById('op_' + widgetElementList[widgetElementListIndex].op[opIndex].opId).parentNode.removeChild(document.getElementById('op_' + widgetElementList[widgetElementListIndex].op[opIndex].opId));
//						}

//						widgetElementList[widgetElementListIndex].op = [];
//						//modifica dimensione del widget
//						var width = document.getElementById('widget_body_' + widgetElementList[widgetElementListIndex].widgetId).clientWidth;
						//
						//
//						document.getElementById('widget_body_' + widgetElementList[widgetElementListIndex].widgetId).style.height = 449;
//						document.getElementById('widget_body_' + widgetElementList[widgetElementListIndex].widgetId).style.width = width;

//						}


						for (var wfIndex = 0; wfIndex < widgetElementList[widgetElementListIndex].widgetObject.wf.length; wfIndex++) {

							try{

								if(widgetElementList[widgetElementListIndex].widgetObject.type.indexOf('login') == -1) {
									
								
								element = document
								.getElementById(widgetElementList[widgetElementListIndex].widgetObject.wf[wfIndex].elementId);

								//cambio trasparenza dell'elemento
								element.style.opacity = 0.1;
								element.style.filter = "alpha(opacity=10)"; //For IE;

								}
							}catch(Exception) {

							}


						}







					}

					//se la wfElements è vuota per un widget di testo allora dobbiamo inserire un elemento nella wfElement uguale al wf
					if(widgetElementList[widgetElementListIndex].widgetObject.type == 'text widget') {
						widgetElementList[widgetElementListIndex].wfElements.push({elementSelected: true, elementShowed: true, wf: widgetElementList[widgetElementListIndex].widgetObject.wf});
						widgetElementList[widgetElementListIndex].numOfElementSelected = 1;
						widgetElementList[widgetElementListIndex].loaded = true;

						//modifica del field grafico
						document.getElementById('text_id_'+widgetElementList[widgetElementListIndex].widgetId).innerHTML = 'Testo trascinabile: ' + widgetElementList[widgetElementListIndex].widgetObject.wf[0].graphicalValue;

						document.getElementById('text_area_'+widgetElementList[widgetElementListIndex].widgetId).value = widgetElementList[widgetElementListIndex].widgetObject.wf[0].graphicalValue;

					}



				}

			} // per ogni elemento della widget element list

			//avviamo di nuovo la computaione se l'utente a eseguito qualche collegamento durante il processamento della servlet
			if(edited || connectedList.length != connectedListFromServlet.length) {
				startComputation();
			}

			//infine per ciascun widget di dest presente nella connectedList dobbiamo modificare il numero visualizzato di elementi
			//in ingresso.

			for(var i = 0; i < connectedList.length; i++) {

				//un collegamento viene processato soltanto nel caso in cui tutti i suoi inputElement siano stati caricati.
				//se di fatto quindi il collegamento non è processed allora non aggiorniamo le informazioni sul numero di elementi in ingresso 
				//perche' non sono ancora definitive

				//si scorrono gli inputElement per questo determinato collegamento
				for(var j = 0; j < connectedList[i].inputElements.length; j++) {

					//si crea soltanto se il widget di input non è dummy
					if(connectedList[i].inputElements[j].indexOf('dummy') == -1) {

						//si costruisce l'id dell'elemento di collegamento
						//che è nella forma input-widgetId-id-field

						var elementId = 'input-'+connectedList[i].widgetDest+'-'+j+'-'+connectedList[i].inputElements[j];

						//vengono contati gli elementi selezionati globalmente e per quel determinato widget di destinazione
						var count = countSelectedElement(connectedList[i].widgetDest,connectedList[i].inputElements[j]);
						document.getElementById(elementId).title= 'Il campo collegato è evidenziato. Clicca qui per modificare la lista. Elementi presenti: '+count;

						document.getElementById('text-'+elementId).innerHTML='<b>'+count+'</b>';

					}




				}

			}

			
		}
		
		


	});





}


function countSelectedElement(widgetDest, field) {

	var count = 0;

	var inputWidget = field.split('_').pop();

	var wfIndex = getWfIndex(field);
	
	
	//se il field in ingresso è del widget del login
	if(widgetElementList[widgetElementListMap[inputWidget]].widgetObject.type.indexOf('login') > -1) {
		
		//controlliamo che la su lista di connessione per gli elementi contiene il widget dest. Se non lo contiene allora lo dobbiamo costruire noi
		//mettendolo a true di default.
		//cerchiamo quindi il field
		var fieldIndex = -1;
		for(var i = 0; i < widgetElementList[widgetElementListMap[inputWidget]].widgetObject.wf.length; i++) {
			if(widgetElementList[widgetElementListMap[inputWidget]].widgetObject.wf[i].elementId == field) {
				fieldIndex = i;
				break;
			}
		}
		
		console.log('field trovato per il login in pos '+fieldIndex);
		
		//all'interno della lista per la connessione locale del field cerchiamo se è presente il widgetDest 
		var exist = false;
		var selected = false;
		for(var i = 0; i < widgetElementList[widgetElementListMap[inputWidget]].wfElements[0].wf[fieldIndex].selectedForConnection.length; i++) {
			if(widgetElementList[widgetElementListMap[inputWidget]].wfElements[0].wf[fieldIndex].selectedForConnection.widgetDest == widgetDest) {
				exist = true;
				selected = widgetElementList[widgetElementListMap[inputWidget]].wfElements[0].wf[fieldIndex].selectedForConnection.selected;
				break;
			}
		}
		
		if(!exist) {
			//viene inserito
			widgetElementList[widgetElementListMap[inputWidget]].wfElements[0].wf[fieldIndex].selectedForConnection.push({widgetDest: widgetDest, selected: true});
			return 1;
		}
		
		if(selected) {
			return 1;
		}else {
			return 0;
		}
		
		
		
	}

	//si scorre la wfElementList del widget di input
	for(var i = 0; i < widgetElementList[widgetElementListMap[inputWidget]].wfElements.length; i++) {


		if(widgetElementList[widgetElementListMap[inputWidget]].wfElements[i].elementSelected) {

			//elemento selezionat globalmente
			//controlliamo se lo è anche per questo determinato widgteDest
			for(var j = 0; j < widgetElementList[widgetElementListMap[inputWidget]].wfElements[i].wf[wfIndex].selectedForConnection.length; j++) {
				if(widgetElementList[widgetElementListMap[inputWidget]].wfElements[i].wf[wfIndex].selectedForConnection[j].widgetDest == widgetDest && widgetElementList[widgetElementListMap[inputWidget]].wfElements[i].wf[wfIndex].selectedForConnection[j].selected) {
					count++;
					break;
				}
			}

		}

	}

	return count;


}

//prende in ingresso un index della widgetElementList e mostra i dati all'interno del widget
//sulla base del valore interno al cursor
function showElementInCursorPosition(widgetElementListIndex) {

	

	//se il widget è di tipo LIST allora viene eseguito un metodo di show diverso in quanto
	//in questo caso ogni singolo elemento della wfElemrntsList verrà mostrato all'interno del widget contemporaneamente

	if(widgetElementList[widgetElementListIndex].widgetObject.type.indexOf('LIST') > -1) {

		//se il widget è degli amici
		if(widgetElementList[widgetElementListIndex].widgetObject.type.indexOf('friends') > -1) {

			//si preleva l'id del widget per recuperarne il body allinterno del quale verranno inseriri tutti gli elementi
			var widgetId = widgetElementList[widgetElementListIndex].widgetId;
			var widgetBody = document.getElementById('widget_friends_body_'+widgetId);
			
			//si eliminano tutti gli elementi precedenti
			//var exElement = $('div[id^="friend_box_' + widgetId +'"]');
			var exElement = $('[id^=friend_box_][id$='+widgetId+']');
			
			for(var i = 0; i < exElement.length; i++) {
				console.log('elimino ' +exElement[i].id);
				document.getElementById(exElement[i].id).parentNode.removeChild(document.getElementById(exElement[i].id));
			}
			
			//per ogni elemento della wfElementList mostriamo il contenuto quindi aggiungiamo l'elemento
			for(var i = 0; i < widgetElementList[widgetElementListIndex].wfElements.length; i++) {
				
				$(widgetBody).append(insertNewFriendBox(widgetId, i));
				
			}
			
			


		}
		
		return;
	}
	
	var cursor = widgetElementList[widgetElementListIndex].cursor;

	for ( var wfFieldIndex = 0; wfFieldIndex < widgetElementList[widgetElementListIndex].wfElements[cursor].wf.length; wfFieldIndex++) {


		if(widgetElementList[widgetElementListIndex].wfElements[cursor].wf[wfFieldIndex].elementId != '') {

			var fieldType = widgetElementList[widgetElementListIndex].wfElements[cursor].wf[wfFieldIndex].fieldType;

			document
			.getElementById(widgetElementList[widgetElementListIndex].wfElements[cursor].wf[wfFieldIndex].elementId).title = widgetElementList[widgetElementListIndex].wfElements[cursor].wf[wfFieldIndex].fieldName
			+ ', '
			+ dragAndDropInText;

			if (fieldType == '001'
				|| fieldType == '006'
					|| fieldType == '007'
						|| fieldType == '008'
							|| fieldType == '009' || fieldType == '013') {

				var text = '';
				var wholeText = '';

				if (fieldType == '009') {
					text = 'in ';
				}

				if (fieldType == '008') {

					if (widgetElementList[widgetElementListIndex].wfElements[cursor].wf[wfFieldIndex].fieldName == 'List of tagged friends') {
						text = 'with ';
					}

					if (widgetElementList[widgetElementListIndex].wfElements[cursor].wf[wfFieldIndex].fieldName == 'list of friends who liked this') {
						text = 'This liked to ';
					}

				}

				if (widgetElementList[widgetElementListIndex].wfElements[cursor].wf[wfFieldIndex].graphicalValue == '') {

					text = widgetElementList[widgetElementListIndex].wfElements[cursor].wf[wfFieldIndex].defaultGraphicalValue;
					wholeText = text;

				} else {

					//se il widgtet è di tipo place allora verrà eliminata la prima parte "presso" del luogo
					if(widgetElementList[widgetElementListIndex].widgetObject.type == 'place widget') {

						if(fieldType == '009') {
							text = '<b>';
							text = text
							+ widgetElementList[widgetElementListIndex].wfElements[cursor].wf[wfFieldIndex].graphicalValue;
							wholeText = text;

							if (text.length > 23) {
								text = text.substring(
										0, 23)
										+ '...</b>';
							}
						}else {

							text = '';
							text = text
							+ widgetElementList[widgetElementListIndex].wfElements[cursor].wf[wfFieldIndex].graphicalValue;
							wholeText = text;

							if (text.length > 35) {
								text = text.substring(
										0, 35)
										+ '...';
							}

						}


						//inoltre verrà cambiato il source dell'ifframe di google maps
						//inserendo le coordinate presenti nella wfElementList
						var latitude =  widgetElementList[widgetElementListIndex].wfElements[cursor].wf[6].valueId;
						var longitude =  widgetElementList[widgetElementListIndex].wfElements[cursor].wf[7].valueId;

						if(document.getElementById('google_maps_'+widgetElementList[widgetElementListIndex].widgetId).src != 'https://maps.google.com/maps?q='+latitude+','+longitude+'&hl=es;z=14&amp&output=embed') {
							document.getElementById('google_maps_'+widgetElementList[widgetElementListIndex].widgetId).src='https://maps.google.com/maps?q='+latitude+','+longitude+'&hl=es;z=14&amp&output=embed';	
						}



					}else {

						text = text
						+ widgetElementList[widgetElementListIndex].wfElements[cursor].wf[wfFieldIndex].graphicalValue;
						wholeText = text;
						
						if(fieldType == '013') {
							text = wholeText;
						}else {
							if (text.length > 45) {
								text = text.substring(
										0, 45)
										+ '...';
							}
						}

						

					}



				}

				document
				.getElementById(widgetElementList[widgetElementListIndex].wfElements[cursor].wf[wfFieldIndex].elementId).innerHTML = replaceChar(text);

				if(widgetElementList[widgetElementListIndex].widgetObject.type == 'text widget') {

					//oltre al field in questo caso dobbiamo anche modificare il contenuto della text area. 
					//quest'ultima infatti non è un field della wfElements (di fatto non si può trasportare) e quindi non verrà mai
					//aggiornata con le info

					document.getElementById('text_area_'+widgetElementList[widgetElementListIndex].widgetId).innerHTML = wholeText;

					document.body.innerHTML = document.body.innerHTML;

					document.getElementById('text_id_'+widgetElementList[widgetElementListIndex].widgetId).innerHTML = 'Draggable text: ' +text;

					widgetElementList[widgetElementListIndex].widgetObject.wf[0].valueId = wholeText;

				}


			}

			if (fieldType == '005' || fieldType == '004' || fieldType == '011') {

				//vengono recuperate le dimensioni appropriate per l'immagine
				var width = document
				.getElementById(widgetElementList[widgetElementListIndex].wfElements[cursor].wf[wfFieldIndex].elementId).clientWidth;
				var height = document
				.getElementById(widgetElementList[widgetElementListIndex].wfElements[cursor].wf[wfFieldIndex].elementId).clientHeight;

				if (widgetElementList[widgetElementListIndex].wfElements[0].wf[wfFieldIndex].graphicalValue == '') {
					document
					.getElementById(widgetElementList[widgetElementListIndex].wfElements[cursor].wf[wfFieldIndex].elementId).src = widgetElementList[widgetElementListIndex].wfElements[cursor].wf[wfFieldIndex].defaultGraphicalValue;
				} else {
					document
					.getElementById(widgetElementList[widgetElementListIndex].wfElements[cursor].wf[wfFieldIndex].elementId).src = widgetElementList[widgetElementListIndex].wfElements[cursor].wf[wfFieldIndex].graphicalValue;

				}

				document
				.getElementById(widgetElementList[widgetElementListIndex].wfElements[cursor].wf[wfFieldIndex].elementId).style.width = width;
				document
				.getElementById(widgetElementList[widgetElementListIndex].wfElements[cursor].wf[wfFieldIndex].elementId).style.height = height;

			}

		}






	} //ciclo sui wfElements per assegnare i valori



}