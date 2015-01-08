//contiene le operazioni ordinate per ciascun widget. Quando l'utente ne elimina una viene recuperato il valore di selezione degli elementi
//precedente
var operationList = [];

function addOp(element) {

	//viene recuperato l'id del widget
	var widgetId = element.id.split('_').pop();
	var width = document.getElementById('widget_body_' + widgetId).clientWidth;

	editOpInWidget(widgetId, 'add');
	
	document.getElementById('widget_body_' + widgetId).style.height = document.getElementById('widget_body_' + widgetId).clientHeight + 100;
	document.getElementById('widget_body_' + widgetId).style.width = width;

	document.getElementById('opButtonText_' + widgetId).innerHTML = '<font color="white">You need to confirm before adding other operations</font>';
	
	makeInvisible(document.getElementById('opButton_' + widgetId));

	document.getElementById('widget_body_' + widgetId).innerHTML = document.getElementById('widget_body_' + widgetId).innerHTML + getMenuButton(widgetId);


}

function getMenuButton(widgetId) {

	return '<form style="position:relative; left: 35; top: 10; width: 0"> <fieldset>'+
	'<select id="op_combo_'+widgetId+'"onChange="javascript:userSelectedOperation(this)" class="selectClass" name="operation" >'+
	'<option value="noOp" selected="selected">Choose an operation  </option>'+
	'<option value="op_000"> Manual content selection  </option>'+
	'<option value="op_001"> Automatic comparison between the fields  </option>'+
	'</select></fieldset></form>'; 
}



function userSelectedOperation(element) {

	var widgetBody = element.parentNode.parentNode;
	var widgetId = element.id.split('_').pop();

	console.log('passo ' + element.id);

	console.log('scelto ' + element.value);
	switch(element.value) {

	case 'op_000': //selezione manuale

		//cancella la combobox
		element.parentNode.parentNode.removeChild(element.parentNode);

		//carica il div
		widgetBody.innerHTML = widgetBody.innerHTML + getManualSelector(widgetId);
		break;

	case 'op_001': //confronto campi
		//cancella la combobox
		element.parentNode.parentNode.removeChild(element.parentNode);

		//carica il div
		widgetBody.innerHTML = widgetBody.innerHTML + getMatchField(widgetId);

		//viene prelevato il select relativo ai field del widget e riempito con i field del widiget stesso
		var selectFieldElement = document.getElementById('field_combo_'+ (operationUniqueId - 1) + '_'+widgetId);


		break;


	}
	
	addStep();

}

function executeOp(element) {

	console.log('esecuzione operazione');
	
	//controllo il tipo di operazione
	var opType = element.id.split('_')[1];
	var widgetId = element.id.split('_').pop();
	var opId = opType+'_'+element.id.split('_')[2] + '_' + widgetId;
	
	var widgetIndex = -1;
	
	//si cerca l'indice del widget
	
	widgetIndex = widgetElementListMap[parseInt(widgetId)];
	
	//si cerca l'indice della operazione. Tutti quelli successivi a lui devono essere di nuovo processati! quindi processed = false
	var opIndex = -1;
	for(var i = 0; i < widgetElementList[widgetIndex].op.length; i++) {
		
		if(opId == widgetElementList[widgetIndex].op[i].opId) {
			opIndex = i;
		}
		if(i > opIndex && opIndex != -1) {
			widgetElementList[widgetIndex].op[i].processed = false;
		}
		
	}
	
	console.log('opType = ' + opType);
	
	if(opType == '000') {
		//userSelector
		//Non e' necessario richiamare la servlet
		//si modifica il binArray
		var binArray = [];
		
		var numOfElement = 0;
		for(var i = 0; i < widgetElementList[widgetIndex].wfElements.length; i++) {
			
			binArray[i] = widgetElementList[widgetIndex].wfElements[i].elementSelected;
			//widgetElementList[widgetIndex].wfElements[i].elementShowed = widgetElementList[widgetIndex].wfElements[i].elementSelected;
			
			if(widgetElementList[widgetIndex].wfElements[i].elementSelected) {
				numOfElement++;
			}
			
			
		}
		
		if(widgetElementList[widgetIndex].widgetObject.type.indexOf('LIST') > -1) {
			opIndex = 0;
			makeInvisible(element);
		}

		widgetElementList[widgetIndex].op[opIndex].binArray = binArray;
		widgetElementList[widgetIndex].op[opIndex].processed = true;
		widgetElementList[widgetIndex].op[opIndex].confermed = true;
		widgetElementList[widgetIndex].numOfElementSelected = numOfElement;
		
		//scorrere la connected list e, per ogni widget che ha come widget di input questo widgetDest eseguire la breakConnection
		for(var cIndex = 0; cIndex < connectedList.length; cIndex++) {
			
			//per ogni inputElement controlliamo se è presente il widgetIndex
			for(var inputIndex = 0; inputIndex < connectedList[cIndex].inputElements.length; inputIndex++) {
				
				if(connectedList[cIndex].inputElements[inputIndex].split('_').pop() == widgetId) {
					breakConnection(cIndex);
					break;
				}
				
			}
			
			
		}
		
		//viene nascosto il tasto conferma
		makeInvisible(document.getElementById('executeOp_' + opId));
		
		//devono essere modificate anche le operazioni che utilizzano questo widget come input
		//quindi dobbiamo scorrere tutte le op di tutti i widget diversi da quello attuale e cercare se qualcuno usa
		//tale widget come input
		var idOfEditedWidget = widgetId;
		for(var i = 0; i < widgetElementList.length; i++){
			
			if(widgetElementList[i].widgetId != idOfEditedWidget) {
				console.log('esaminoooooo il widget ' + widgetElementList[i].widgetId);
				
				var breakOp = false;
				//scorriamo le sue operazioni per vedere se qualcuna di esse usava un elemento del widget che non è stato modificato
				for(var opIndex = 0; opIndex < widgetElementList[i].op.length; opIndex++) {
					console.log('esamino op ' + opIndex);
					if(breakOp) {
						//widgetElementList[i].op[opIndex].confermed = false;
						widgetElementList[i].op[opIndex].processed = false;

					}
					
					console.log('confronto tra ' + widgetElementList[i].op[opIndex].fieldBId.split('_').pop() +' e ' + idOfEditedWidget);
					
					if(widgetElementList[i].op[opIndex].opId.indexOf('001_') > -1 && widgetElementList[i].op[opIndex].fieldBId.split('_').pop() == idOfEditedWidget) {
						console.log('op non mai piu confermed');
						//questa operazione dev'essere eseguita di nuovo e anche confermata di nuovo
						//widgetElementList[i].op[opIndex].confermed = false;
						widgetElementList[i].op[opIndex].processed = false;
						breakOp = true;

						
					}

				}
				
				
			}
		}
		
		startComputation();
		
		
	}else {
		if(opType == '001') {
			
			console.log('match ');
			
			//prima di avviare la computazione ci si assicura che tutti i campi siano stati inseriti dall'utente
			if(widgetElementList[widgetIndex].op[opIndex].fieldAId != '' && widgetElementList[widgetIndex].op[opIndex].fieldBId != '') {
				widgetElementList[widgetIndex].op[opIndex].confermed = true;
				widgetElementList[widgetIndex].op[opIndex].processed = false;
				//scorrere la connected list e, per ogni widget che ha come widget di input questo widgetDest eseguire la breakConnection
				for(var cIndex = 0; cIndex < connectedList.length; cIndex++) {
					
					//per ogni inputElement controlliamo se è presente il widgetIndex
					for(var inputIndex = 0; inputIndex < connectedList[cIndex].inputElements.length; inputIndex++) {
						
						if(connectedList[cIndex].inputElements[inputIndex].split('_').pop() == widgetId) {
							breakConnection(cIndex);
							break;
						}
						
					}
					
					
				}
				
				makeInvisible(document.getElementById('executeOp_' + opId));
				
				startComputation();	
			}else {
				//l'operazione non può essere confermata!!!
				console.log('impossibile confermare l\'operazione!');
				
				//mostrare il popup
				//document.body.innerHTML = document.body.innerHTML + getErrorPopup('Impossibile confermare. Non hai inserito tutte le informazioni richieste per questo tipo di operazione. Assicurati di aver scelto un campo di questo widget su cui effettuare il confronto e di aver trascinato all\'interno dell\'area predisposta il campo di un altro widget che intendi confrontare','error');
				$('body').append(getErrorPopup('Impossibile confermare. Non hai inserito tutte le informazioni richieste per questo tipo di operazione. Assicurati di aver scelto un campo di questo widget su cui effettuare il confronto e di aver trascinato all\'interno dell\'area predisposta il campo di un altro widget che intendi confrontare','error'));
				
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
	}
	
	

}

function deleteOp(element) {

	//si preleva l'id della op
	var opId = element.id.split('_')[1] + '_' + element.id.split('_')[2] +'_'+ element.id.split('_')[3];

	//eliminazione grafica
	document.getElementById('op_'+opId).parentNode.removeChild(document.getElementById('op_'+opId));

	//modifica dimensione del widget
	var widgetId = element.id.split('_').pop();
	var width = document.getElementById('widget_body_' + widgetId).clientWidth;

	
	editOpInWidget(widgetId, 'remove');
	

	document.getElementById('widget_body_' + widgetId).style.height = document.getElementById('widget_body_' + widgetId).clientHeight - 100;
	document.getElementById('widget_body_' + widgetId).style.width = width;
	

	//eiminazione dell'operazione dalla widgetElementList, si rendono coerenti i dati e breakConnection

	//si cerca il widget

	var widgetIndex = 0;
	widgetIndex = widgetElementListMap[parseInt(widgetId)];

	//si cerca la opId
	var opIndex = -1;

	if(widgetElementList[widgetIndex].op.length == 1) {
		//stiamo eliminando l'unica operazione.
		//bisogna mettere showed e selected = true per ogni elemento della wfElementsList

		opIndex = 0;
		
		widgetElementList[widgetIndex].numOfElementSelected = widgetElementList[widgetIndex].wfElements.length;

		for(var i = 0; i < widgetElementList[widgetIndex].wfElements.length; i++) {

			widgetElementList[widgetIndex].wfElements[i].elementSelected = true;
			widgetElementList[widgetIndex].wfElements[i].elementShowed = true;

		}

	}else {

		for(var i = 0; i < widgetElementList[widgetIndex].op.length; i++) {

			if(widgetElementList[widgetIndex].op[i].opId == opId) {
				opIndex = i;
			}

			if(i > opIndex && opIndex != -1) {
				widgetElementList[widgetIndex].op[i].processed = false;
				
			}

		}

		//viene sistemata la wfElements
		widgetElementList[widgetIndex].numOfElementSelected = 0;

		if(opIndex == 0) {

			widgetElementList[widgetIndex].numOfElementSelected = widgetElementList[widgetIndex].wfElements.length;
			console.log('metto lenght massima');
			
			for(var i = 0; i < widgetElementList[widgetIndex].wfElements.length; i++) {

				widgetElementList[widgetIndex].wfElements[i].elementSelected = true;
				widgetElementList[widgetIndex].wfElements[i].elementShowed = true;

			}

		}else {

			for(var i = 0; i < widgetElementList[widgetIndex].wfElements.length; i++) {

				var value = widgetElementList[widgetIndex].op[opIndex - 1].binArray[i];
				
				if(value) {
					console.log('lenght + 1');
					widgetElementList[widgetIndex].numOfElementSelected++;
				}

				widgetElementList[widgetIndex].wfElements[i].elementSelected = value;
				widgetElementList[widgetIndex].wfElements[i].elementShowed = value;

			}


		}



	}

	


	//eliminazione opIndex
	widgetElementList[widgetIndex].op.splice(opIndex,1);
	
	//modifica elementi visivi riguardanti il numero di elementi sleelzioanti
	for(var i = 0; i < widgetElementList[widgetIndex].op.length; i++) {
		
		if(widgetElementList[widgetIndex].op[i].opId.split('_')[0] == '000') {
			var textElement = document.getElementById('numOfElement_'+ widgetElementList[widgetIndex].op[i].opId.split('_')[1]+'_'+widgetId);
			makeVisible(textElement);
			
			if(i == 0) {
				textElement.innerHTML = selectedElementText + widgetElementList[widgetIndex].wfElements.length +' of ' + widgetElementList[widgetIndex].wfElements.length;	
			} else {
				textElement.innerHTML = selectedElementText + widgetElementList[widgetIndex].op[i-1].numberOfElement +' of ' + widgetElementList[widgetIndex].op[i-1].numberOfElement;	
			}

		}
		
	}

	//scorrere la connected list e, per ogni widget che ha come widget di input questo widgetDest eseguire la breakConnection
	for(var cIndex = 0; cIndex < connectedList.length; cIndex++) {
		
		//per ogni inputElement controlliamo se è presente il widgetIndex
		for(var inputIndex = 0; inputIndex < connectedList[cIndex].inputElements.length; inputIndex++) {
			
			if(connectedList[cIndex].inputElements[inputIndex].split('_').pop() == widgetId) {
				breakConnection(cIndex);
				break;
			}
			
		}
		
		
	}

	startComputation();
	
	//si controlla che non ci siano altre operazioni con processed = false
	//se sono tutte a true viene mostrato di nuovo il tasto per poterne aggiungere altre
	var allProcessed = true;
	for(var i = 0; i < widgetElementList[widgetIndex].op.length; i++) {
		
		if(widgetElementList[widgetIndex].op[i].processed == false) {
			allProcessed = false;
			break;
		}
		
	}
	
	if(allProcessed) {
		makeVisible('opButton_' + widgetId);
		document.getElementById('opButtonText_' + widgetId).innerHTML = '<font color="white">Click on + to insert some operations to select elements or match different fields</font>';
		
	} else {
		makeInvisible('opButton_' + widgetId);
		document.getElementById('opButtonText_' + widgetId).innerHTML = '<font color="white">You need to confirm before adding other operations</font>';

		
	}


}

