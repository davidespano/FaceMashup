function setGraphicalValue(elementId, graphicalValue, type) {


	if(getTypeOfField(type) == 'img') {

		var width = document.getElementById(elementId).clientWidth;
		var height = document.getElementById(elementId).clientHeight;

		document.getElementById(elementId).setAttribute('src', graphicalValue);

		document.getElementById(elementId).style.width = width;
		document.getElementById(elementId).style.height = height;

	} else {
		document.getElementById(elementId).innerHTML = graphicalValue;
	}

}

function showPostWidgetContent(widgetId) {

	//ha il compito di aggiornare la visualizzazione dei widgte di post sulla base di quello che è il contenuto connesso (connectedList) e (opField usati per contenere connesisoni in questo caso) 
	var widgetType = widgetElementList[widgetElementListMap[widgetId]].widgetObject.type;

	var fieldId = '';
	var notMainFieldId = '';

	var fieldMainType = '';
	var notMainFieldType = '';

	var numOfMainElements = 0;
	var numOfNotMainElements = 0;


	//all'interno dell'elemento classificato come main del widget verrà sempre mostrato il contenuto della connessione 
	//mostrata nella connectedList.

	//viene quindi cercata la connessione che ha come widgetDest il widgetId

	var inputElement = [];
	for(var i = 0; i < connectedList.length; i++) {

		if(connectedList[i].widgetDest == widgetId) {

			for(var j = 0; j < connectedList[i].inputElements.length; j++) {
				inputElement.push(connectedList[i].inputElements[j]);
			}	
		}	
	}

	if(inputElement.length > 0) {
		//possiamo mostrare il primo cobtenuto trovato che è globalmente selected e che lo è anche per l'attuale widget di destinazione

		//si cerca il field main del widgetId

		for(var i = 0; i < widgetElementList[widgetElementListMap[widgetId]].widgetObject.wf.length; i++) {
			if(widgetElementList[widgetElementListMap[widgetId]].widgetObject.wf[i].elementId.indexOf('main') > -1) {
				fieldId = widgetElementList[widgetElementListMap[widgetId]].widgetObject.wf[i].elementId;
				fieldMainType = widgetElementList[widgetElementListMap[widgetId]].widgetObject.wf[i].fieldType;

			}else {
				notMainFieldId = widgetElementList[widgetElementListMap[widgetId]].widgetObject.wf[i].elementId;
				notMainFieldType = widgetElementList[widgetElementListMap[widgetId]].widgetObject.wf[i].fieldType;
			}

			if(fieldId != '' && notMainFieldId != '') {
				break;
			}
		}

		//si cerca, per ogni elemento di input, il fieldIndex all'interno del widget
		for(var i = 0; i < inputElement.length; i++) {

			var inputWidgetId = inputElement[i].split('_').pop();

			var j = getWfIndex(inputElement[i]);

			//si rileva la posizione dell'elemeneto corispondente alla connessine all'interno della lista di connessione locale tra widget
			//per verificare che l'elemento sia selezioanto per questo determinato widget
			var selIndex = -1;


			var isYetShowed = false;

			//si scorre la wfElementList del widget e si modifica il contenuto sulla base del type con il primo elemeneto selected trovato
			for(var k = 0; k < widgetElementList[widgetElementListMap[inputWidgetId]].wfElements.length; k++) {

				if(selIndex == -1) {

					for(var sel = 0; sel < widgetElementList[widgetElementListMap[inputWidgetId]].wfElements[k].wf[j].selectedForConnection.length; sel++) {
						if(widgetElementList[widgetElementListMap[inputWidgetId]].wfElements[k].wf[j].selectedForConnection[sel].widgetDest == widgetId) {
							selIndex = sel;
							break;
						}

					}

				}



				if(widgetElementList[widgetElementListMap[inputWidgetId]].wfElements[k].elementSelected) {

					//si controlla che sia selezionato anche per questo determinato widget di destinazione
					var isSelected = false;

					try{
						
					
					
					if(widgetElementList[widgetElementListMap[inputWidgetId]].wfElements[k].wf[j].selectedForConnection[selIndex].selected) {
						//l'elemento è selezionato
						isSelected = true;
						numOfMainElements++;

					}

					if(isSelected && !isYetShowed) {
						setGraphicalValue(fieldId, widgetElementList[widgetElementListMap[inputWidgetId]].wfElements[k].wf[j].graphicalValue, widgetElementList[widgetElementListMap[inputWidgetId]].wfElements[k].wf[j].fieldType);
						isYetShowed = true;

					}

					}catch(Exception) {
						
					}


				}

			}





		}

	}


	//modifica dell'elemento grafico non main

	var setOfValueOfOpField = new HashSet();
	//vengono inseriti, tenendo in considerazione anche il type dei dati (es lista) i valori presenti nei campi delle op
	//all'interno dell'insieme
	for(var opIndex = 0; opIndex < widgetElementList[widgetElementListMap[widgetId]].op.length; opIndex++) {

		var inputWidgetId = '';
		var inputField = '';

		for(var fieldIndex = 0; fieldIndex < 2; fieldIndex++) {

			if(fieldIndex == 0) {
				if(widgetElementList[widgetElementListMap[widgetId]].op[opIndex].fieldAId != '') {
					inputWidgetId =  widgetElementList[widgetElementListMap[widgetId]].op[opIndex].fieldAId.split('_').pop();
					inputField = widgetElementList[widgetElementListMap[widgetId]].op[opIndex].fieldAId;

				}
			}else {
				if(widgetElementList[widgetElementListMap[widgetId]].op[opIndex].fieldBId != '') {
					inputWidgetId =  widgetElementList[widgetElementListMap[widgetId]].op[opIndex].fieldBId.split('_').pop();
					inputField = widgetElementList[widgetElementListMap[widgetId]].op[opIndex].fieldBId;

				}

			}

			if(inputWidgetId != '') {

				var wfFieldIndex = -1;

				//ricera dell'elementId all'interno della wfElementList
				for(var wfIndex = 0; wfIndex < widgetElementList[widgetElementListMap[inputWidgetId]].widgetObject.wf.length; wfIndex++) {

					if(widgetElementList[widgetElementListMap[inputWidgetId]].widgetObject.wf[wfIndex].elementId == inputField) {
						//field trovato
						wfFieldIndex = wfIndex;
						break;
					}

				}

				if(wfFieldIndex != -1) {

					//per ogni wfElement selezionato inseriamo il graphicalValue all'interno di setOfValueOfOpField
					for(var wfElementIndex = 0; wfElementIndex < widgetElementList[widgetElementListMap[inputWidgetId]].wfElements.length; wfElementIndex++) {

						if(widgetElementList[widgetElementListMap[inputWidgetId]].wfElements[wfElementIndex].elementSelected) {
							//l'elemento è selezionato. Lo inseriamo nell'insieme soltanto se anche la selezione per il widget di destinazizone è a true
							
							//se però la selectedForConnection è vuota allora ne creiamo una fasulla in cui tutti gli elementi sono a true
							if(widgetElementList[widgetElementListMap[inputWidgetId]].wfElements[wfElementIndex].wf[wfFieldIndex].selectedForConnection.length == 0) {
								
								//questo però lo si fa soltanto se il widget è loaded ovviamente.
								//inoltre se è di tipo LIST allora deve avere anche la prima op confermed
								if(widgetElementList[widgetElementListMap[inputWidgetId]].loaded) {
									
									if(widgetElementList[widgetElementListMap[inputWidgetId]].widgetObject.type.indexOf('LIST') > -1 && widgetElementList[widgetElementListMap[inputWidgetId]].op[0].confermed) {
										widgetElementList[widgetElementListMap[inputWidgetId]].wfElements[wfElementIndex].wf[wfFieldIndex].selectedForConnection.push({widgetDest: widgetId, selected: true});
									}
									
									if(widgetElementList[widgetElementListMap[inputWidgetId]].widgetObject.type.indexOf('LIST') == -1) {
										widgetElementList[widgetElementListMap[inputWidgetId]].wfElements[wfElementIndex].wf[wfFieldIndex].selectedForConnection.push({widgetDest: widgetId, selected: true});

									}
									
								}
								
							}

							var isSelected = false;
							for(var inIndex = 0; inIndex < widgetElementList[widgetElementListMap[inputWidgetId]].wfElements[wfElementIndex].wf[wfFieldIndex].selectedForConnection.length; inIndex++) {

								if(widgetElementList[widgetElementListMap[inputWidgetId]].wfElements[wfElementIndex].wf[wfFieldIndex].selectedForConnection[inIndex].widgetDest == widgetId) {

									isSelected = widgetElementList[widgetElementListMap[inputWidgetId]].wfElements[wfElementIndex].wf[wfFieldIndex].selectedForConnection[inIndex].selected;
									break;
								}

							}

							if(isSelected) {

								var valueOfField = widgetElementList[widgetElementListMap[inputWidgetId]].wfElements[wfElementIndex].wf[wfFieldIndex].graphicalValue;
								var typeOfField = widgetElementList[widgetElementListMap[inputWidgetId]].wfElements[wfElementIndex].wf[wfFieldIndex].fieldType;

								//se il tipo è di una lista (elemento1,elemento2,....)
								if(typeOfField == '008') {
									//dobbiamo inserire ogni singolo elemento splittato
									var valueSplitted = valueOfField.split(',');

									for(var i = 0; i < valueSplitted.length; i++) {

										if(valueSplitted != '') {
											setOfValueOfOpField.add(valueSplitted[i]);	
										}

									}


								} else {
									setOfValueOfOpField.add(widgetElementList[widgetElementListMap[inputWidgetId]].wfElements[wfElementIndex].wf[wfFieldIndex].graphicalValue);
								}

							}




						}


					}

				}



			}


		}

	}


	//dentro setOfValueOfOpField ho tutti i valori

	var valueOfField = '';

	valueOfField = setOfValueOfOpField.values().toString();
	numOfNotMainElements = setOfValueOfOpField.size();

	if(valueOfField == '') {
		valueOfField = 'clicca per vedere gli elementi connessi';
	}

	document.getElementById('secondFieldText_'+widgetId).innerHTML = numOfMainElements;
	document.getElementById('firstFieldText_'+widgetId).innerHTML = numOfNotMainElements;


	if(notMainFieldId == '') {

		for(var i = 0; i < widgetElementList[widgetElementListMap[widgetId]].widgetObject.wf.length; i++) {
			if(widgetElementList[widgetElementListMap[widgetId]].widgetObject.wf[i].elementId.indexOf('main') == -1) {

				notMainFieldId = widgetElementList[widgetElementListMap[widgetId]].widgetObject.wf[i].elementId;
				notMainFieldType = widgetElementList[widgetElementListMap[widgetId]].widgetObject.wf[i].fieldType;
				break;
			}
		}

	}

	setGraphicalValue(notMainFieldId, valueOfField , notMainFieldType);


}