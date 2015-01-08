var standardText = "Elementi selezionati: ";

function getMatchField(widgetId) {

	var id = (operationUniqueId++) + '_' + widgetId;

	var i = widgetElementListMap[parseInt(widgetId)];


	var binArray = [];

	//creaiamo il binArray con tutti true
	for(var k = 0; k < widgetElementList[i].wfElements.length; k++) {

		binArray.push(true);

	}			
	widgetElementList[i].op.push({confermed: false, processed: false, opId: '001_'+id, fieldAId:'', fieldBId:'', subOp:'equal', binArray: binArray, inputType: []});


	return getGraphicalMatchOp(widgetId, id, null);
	
}


function getGraphicalMatchOp(widgetId, id, elementSelected) {
	
	var i = widgetElementListMap[parseInt(widgetId)];
	
	//contiene i field del widget
	var elementFieldSelect ='';

	//Entriamo nella sua wf list
	//e per ogni elemento creiamo lo option

	console.log('il widget '+widgetId +' si trova in posizione ' +i);
	
	for(var j = 0; j < widgetElementList[i].widgetObject.wf.length; j++) {

		if(widgetElementList[i].widgetObject.wf[j].fieldName != '') {
			
			if(elementSelected == widgetElementList[i].widgetObject.wf[j].elementId) {
				elementFieldSelect = elementFieldSelect + '<option selected=\'selected\' value="'+widgetElementList[i].widgetObject.wf[j].elementId+'">'+widgetElementList[i].widgetObject.wf[j].fieldName+'</option>';
				
			}else {
				elementFieldSelect = elementFieldSelect + '<option value="'+widgetElementList[i].widgetObject.wf[j].elementId+'">'+widgetElementList[i].widgetObject.wf[j].fieldName+'</option>';
				
			}
			
			
		}
		
	}



	return '<div style="position:relative;" class="div_prebody_bg" id="op_001_'+id+'">'+

	'<img src="img/img/whiteRect.png" style="position: absolute; left:0"/>'+

	'<img onclick="javascript:deleteOp(this)" id="deleteOp_001_'+id+'" src="img/img/deleteOp.png" style="position: absolute; top: 5; left:730"/>'+

	'<div title="Scegli il campo di questo widget su cui basare il confronto" style="position:absolute; top: -15; left: 10;"><select onChange="javascript:changeFieldOfSelect(this,\'fieldAId\')" id="field_combo_001_'+id+'" class="selectClass" name="field" style="position:absolute; top: 30;">'+
	'<option value="noField">Choose a field</option>'+ elementFieldSelect +
	'</select></div>'+


	'<div style="position:absolute; top: 50; left: 10;"><select onChange="javascript:changeFieldOfSelect(this,\'subOp\')" id="matchOp_combo_001_'+id+'" class="selectClass" name="operation" >'+
	'<option title="Il campo qui sopra dev\'essere uguale al campo a destra" value="equal" selected="selected">Equal</option>'+
	'<option title="Il campo qui sopra non dev\'essere uguale al campo a destra" value="notEqualMatchOp">Not equal</option>'+
	'<option title="Il campo qui sopra deve contenere il campo a destra" value="containsMatchOp">Contains</option>'+
	'<option title="Il campo qui sopra non deve contenere il campo a destra" value="notContainsMatchOp">Not contains</option>'+
	'</select></div>'+



	'<img onmouseout="javascript:removeHighlightField()" onmouseover="javascript:mouseOverThisInputBox(this.name)" name="" id="putInMatchOp_001_'+id+'" title="Il campo inserito qui verra\' confrontato con il campo scelto di questo widget" src="img/putIn.png" style="position: absolute; top: 44px; left: 150px;"/>'+

	'<img onclick="javascript:executeOp(this)" id="executeOp_001_'+id+'" src="img/executeOpButton.png" style="position: absolute; top: 50; left:565"/>'+

	'<p class="nowrap" id="numOfElement_'+id+'" style="position: absolute; top: 45px; left: 480px; font-size:18px; color:white; font-family: sans">  </p>'+

	'<img src="img/img/whiteRect.png" style="position: absolute; top: 90;"/></div>'
	
}


function changeFieldOfSelect(element, type) {
	//element id della forma: field_combo_001_idUnivocoOp_widgetId

	var widgetId = '';	
	var opId='';


	try {
		widgetId = element.id.split('_').pop();	
		opId = '001_' + element.id.split('_')[3] + '_' + widgetId;
	}catch(Exception) {
		widgetId = element.split('_').pop();	
		opId = '001_' + element.split('_')[3] + '_' + widgetId;

	}

	//cerchiamo il widget
	for(var i = 0; i < widgetElementList.length; i++) {

		if(widgetElementList[i].widgetId+''.indexOf(widgetId) > -1) {
			//elemento trovato
			//scorriamo la sua lista di operazioni
			//per trovare quella da modificare

			for(var j = 0; j < widgetElementList[i].op.length; j++) {

				if(widgetElementList[i].op[j].opId.indexOf(opId) > -1) {

					//non sara' più ne confermed e ne processed
					widgetElementList[i].op[j].processed = false;
					widgetElementList[i].op[j].confermed = false;
					
					//viene mostrato il tasto di conferma
					makeVisible(document.getElementById('executeOp_' + opId));

					//modifica dell'operazione. Il tasto per aggiungerne altre viene nascosto
					document.getElementById('opButtonText_' + widgetId).innerHTML = '<font color="white">You need to confirm before adding other operations</font>';
					makeInvisible(document.getElementById('opButton_' + widgetId));

					//operazione trovata.
					//modifichiamo il field in base al type

					if(type == 'fieldAId') {
						widgetElementList[i].op[j].fieldAId = element.value;

						//modifico il valore di default della select	
						for(var i = 0; i < element.options.length; i++) {
							element.options[i].removeAttribute("selected");
						}

						element.options[element.options.selectedIndex].setAttribute("selected","selected");


					} else if(type == 'subOp') {
						widgetElementList[i].op[j].subOp= element.value;

						//modifico il valore di default della select	
						for(var i = 0; i < element.options.length; i++) {
							element.options[i].removeAttribute("selected");
						}

						element.options[element.options.selectedIndex].setAttribute("selected","selected");

					} else {
						widgetElementList[i].op[j].fieldBId = type;
					}


					break;
					break;

				}

			}


		}


	}

}

