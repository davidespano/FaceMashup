
//var standardText = "Selected elements: ";
var selectedElementText = 'Selected elements: ';

function getManualSelector(widgetId) {

	var id = (operationUniqueId++) + '_'+widgetId;

	//inserimento all'interno della widget element list l'operazione appena aggiunta
	//ricerca widgetid

	var i = widgetElementListMap[parseInt(widgetId)];

	var binArray = [];

	//creaiamo il binArray con tutti true
	for(var k = 0; k < widgetElementList[i].wfElements.length; k++) {

		binArray.push(true);

	}			

	var numberOfElements = 0;
	if(widgetElementList[i].op.length > 0) {
		numberOfElements = widgetElementList[i].op[widgetElementList[i].op.length -1].numberOfElement;
	}else {
		numberOfElements = widgetElementList[i].wfElements.length;
	}

	widgetElementList[i].op.push({confermed: false, processed: false, opId: '000_'+id, fieldAId:'', fieldBId:'', subOp:'', binArray: binArray, inputType: []});


	return getGraphicalSelectorOp(widgetId, id);



}

function getGraphicalSelectorOp(widgetId, id) {

	return '<div style="position:relative" class="div_prebody_bg" id="op_000_'+id+'">'+

	'<img src="img/img/whiteRect.png" style="position: absolute; left:0"/>'+

	'<img onclick="javascript:deleteOp(this)" id="deleteOp_000_'+id+'" src="img/img/deleteOp.png" style="position: absolute; top: 5; left:730"/>'+

	'<img onclick="javascript:prev(this)" id="leftArrow_'+id+'" src="img/img/leftArrow.png" style="position: absolute; top:30; left:10"/>'+
	'<img onclick="javascript:next(this)" id="rightArrow_'+id+'" src="img/img/rightArrow.png" style="position: absolute; top: 30; left:60"/>'+

	'<img onclick="javascript:clickOnToogle(this)" id="toogle_'+id+'" src="img/img/toogleOn.png" style="position: absolute; top: 37; left:120"/>'+

	'<img onclick="javascript:selectAll(this)" id="selectAllButton_'+id+'" src="img/img/selectAllButton.png" style="position: absolute; top: 20; left:265"/>'+
	'<img onclick="javascript:deselectAll(this)" id="deselectAllButton_'+id+'" src="img/img/deselectAllButton.png" style="position: absolute; top: 20; left:415"/>'+

	'<img onclick="javascript:executeOp(this)" id="executeOp_000_'+id+'" src="img/executeOpButton.png" style="position: absolute; top: 18; left:565"/>'+

	'<p class="nowrap" id="numOfElement_'+id+'" style="position: absolute; top: 45px; left: 480px; font-size:18px; color:white; font-family: sans">  </p>'+

	'<img src="img/img/whiteRect.png" style="position: absolute; top: 90;"/></div>'
	
}



function next(element) {

	//element,id sarà del tipo op_idUnivoco_widgetId

	var widgetId = element.id.split('_').pop();

	//cerchiamo nella widgetElementList l'id 
	var i = widgetElementListMap[parseInt(widgetId)];

	//widget trovato
	//si guarda il valore del proprio cursor e la dimensione della wfElements
	var wfDim = widgetElementList[i].wfElements.length;

	widgetElementList[i].cursor++;

	if(widgetElementList[i].cursor == wfDim) {

		widgetElementList[i].cursor = 0;

	}

	while(!widgetElementList[i].wfElements[widgetElementList[i].cursor].elementShowed) {
		//l'elemento non dev'essere mostrato
		widgetElementList[i].cursor++;

		if(widgetElementList[i].cursor == wfDim) {

			widgetElementList[i].cursor = 0;

		}


	}



	//si aggiorna il toogle
	var toogleStatus = widgetElementList[i].wfElements[widgetElementList[i].cursor].elementSelected;
	//recuperiamo l'id del toogle
	var toogleId = 'toogle_' + element.id.split('_')[1] + '_' + widgetId;
	
	var toogleIds = $('[id^=toogle_][id$='+widgetId+']');

	try{
		
		//cambio elemento grafico
		if(toogleStatus) {
			//elemento selezionato
			for(var j = 0; j < toogleIds.length; j++)  {

				//cerca solo i toogle del widget vero e proprio e non ad esempio toogle_friends_0_widgteId
				if(toogleIds[j].id.split('_').length == 3) {

				document.getElementById(toogleIds[j].id).src = 'img/img/toogleOn.png';
				}
			}
			


		} else {
			//elemento deselezionato
			for(var j = 0; j < toogleIds.length; j++) {
				document.getElementById(toogleIds[j].id).src = 'img/img/toogleOff.png';	
			}
			

		}
		
	}catch(Exception) {
		
	}
	


	//aggiorniamo gli elementi visualizzati
	showElementInCursorPosition(i);


}

function prev(element) {

	//element,id sarà del tipo op_idUnivoco_widgetId

	var widgetId = element.id.split('_').pop();

	//cerchiamo nella widgetElementList l'id 
	var i = widgetElementListMap[parseInt(widgetId)];

	//widget trovato
	//si guarda il valore del proprio cursor e la dimensione della wfElements
	var wfDim = widgetElementList[i].wfElements.length;

	widgetElementList[i].cursor--;

	if(widgetElementList[i].cursor < 0) {

		widgetElementList[i].cursor = widgetElementList[i].wfElements.length - 1;

	}

	while(!widgetElementList[i].wfElements[widgetElementList[i].cursor].elementShowed) {
		//l'elemento non dev'essere mostrato
		widgetElementList[i].cursor--;

		if(widgetElementList[i].cursor < 0) {

			widgetElementList[i].cursor = widgetElementList[i].wfElements.length - 1;

		}


	}



	//si aggiorna il toogle
	var toogleStatus = widgetElementList[i].wfElements[widgetElementList[i].cursor].elementSelected;
	//recuperiamo l'id del toogle
	var toogleId = 'toogle_' + element.id.split('_')[1] + '_' + widgetId;
	
	var toogleIds = $('[id^=toogle_][id$='+widgetId+']');

	try{
		
		//cambio elemento grafico
		if(toogleStatus) {
			//elemento selezionato
			for(var j = 0; j < toogleIds.length; j++) {
				document.getElementById(toogleIds[j].id).src = 'img/img/toogleOn.png';
			}
			


		} else {
			//elemento deselezionato
			for(var j = 0; j < toogleIds.length; j++) {
				document.getElementById(toogleIds[j].id).src = 'img/img/toogleOff.png';
			}
			

		}
		
	}catch(Exception){
		console.log('provato a modificare toogle ' + toogleId);
	}
	


	//aggiorniamo gli elementi visualizzati
	showElementInCursorPosition(i);


}

function selectAll(element) {

	//element,id sarà del tipo op_idUnivoco_widgetId		
	var widgetId = element.id.split('_').pop();

	//modifica dell'operazione. Il tasto per aggiungerne altre viene nascosto
	document.getElementById('opButtonText_' + widgetId).innerHTML = '<font color="white">You need to confirm before adding other operations</font>';
	makeInvisible(document.getElementById('opButton_' + widgetId));

	var widgetIndex = -1;


	widgetIndex = widgetElementListMap[parseInt(widgetId)];

	//widget trovato. Si entra nella sua wfElement list e si mettono tutti a selected
	for(var j = 0; j < widgetElementList[widgetIndex].wfElements.length; j++) {

		widgetElementList[widgetIndex].wfElements[j].elementSelected = widgetElementList[widgetIndex].wfElements[j].elementShowed; 

	}


	//viene modificato il toogle dell'attuale foto
	//recuperiamo l'id del toogle
	var toogleId = 'toogle_' + element.id.split('_')[1] + '_' + widgetId;

	//cambio elemento grafico
	document.getElementById(toogleId).src = 'img/img/toogleOn.png';

	var opId = '000_'+element.id.split('_')[1] + '_' + widgetId;

	//cerchaimo la opId
	for(var i = 0; i < widgetElementList[widgetIndex].op.length; i++) {

		if(widgetElementList[widgetIndex].op[i].opId == opId) {
			widgetElementList[widgetIndex].op[i].processed = false;
			widgetElementList[widgetIndex].op[i].confermed = false;
			
			//viene mostrato il tasto di conferma
			makeVisible(document.getElementById('executeOp_' + opId));
			
			//viene calcolato il numero di elementiSelezionati sulla base del binArray dell'op precedente
			//se op = 0 allor wfElement.length

			var numOfElement = 0;

			if(i == 0) {
				widgetElementList[widgetIndex].numOfElementSelected = widgetElementList[widgetIndex].wfElements.length;

				//settiamo tutti gli elementi del binArray e della wfElements a true
				for(var wfIndex = 0; wfIndex < widgetElementList[widgetIndex].wfElements.length; wfIndex++) {

					widgetElementList[widgetIndex].wfElements[wfIndex].elementSelected = true;
					widgetElementList[widgetIndex].wfElements[wfIndex].elementShowed = true;

				}


			}else {


				for(var binIndex = 0; binIndex < widgetElementList[widgetIndex].op[i-1].binArray.length; binIndex++) {

					if(widgetElementList[widgetIndex].op[i-1].binArray[binIndex]) {
						numOfElement++;

						widgetElementList[widgetIndex].wfElements[binIndex].elementSelected = true;
						//widgetElementList[widgetIndex].wfElements[wfIndex].elementShowed = true;
						widgetElementList[widgetIndex].wfElements[binIndex].elementShowed = true;


					}

				}

				widgetElementList[widgetIndex].numOfElementSelected = numOfElement;


			}


			break;
		}

	}

	//modifichaimo anche il testo
	var textElement = document.getElementById('numOfElement_' + element.id.split('_')[1] + '_' + widgetId);
	makeVisible(textElement);
	textElement.innerHTML = selectedElementText + widgetElementList[widgetIndex].numOfElementSelected +' of ' + widgetElementList[widgetIndex].wfElements.length;


}


function deselectAll(element) {



	//element,id sarà del tipo op_idUnivoco_widgetId		
	var widgetId = element.id.split('_').pop();

	//modifica dell'operazione. Il tasto per aggiungerne altre viene nascosto
	document.getElementById('opButtonText_' + widgetId).innerHTML = '<font color="white">You need to confirm before adding other operations</font>';
	makeInvisible(document.getElementById('opButton_' + widgetId));

	var widgetIndex = -1;


	widgetIndex = widgetElementListMap[parseInt(widgetId)];

	//widget trovato. Si entra nella sua wfElement list e si mettono tutti a selected
	widgetElementList[widgetIndex].numOfElementSelected = 0;

	for(var j = 0; j < widgetElementList[widgetIndex].wfElements.length; j++) {

		widgetElementList[widgetIndex].wfElements[j].elementSelected = false;

	}


	//viene modificato il toogle dell'attuale foto
	//recuperiamo l'id del toogle
	var toogleId = 'toogle_' + element.id.split('_')[1] + '_' + widgetId;

	//cambio elemento grafico
	document.getElementById(toogleId).src = 'img/img/toogleOff.png';

	//modifichaimo anche il testo
	var textElement = document.getElementById('numOfElement_' + element.id.split('_')[1] + '_' + widgetId);
	makeVisible(textElement);
	textElement.innerHTML = selectedElementText + '0' +' of ' + widgetElementList[widgetIndex].wfElements.length;

	//il processed dell'operazione dev'essere messo a false. Viene fatto alla fine della for dopo per ottenere il widgetIndex
	var opId = '000_'+element.id.split('_')[1] + '_' + widgetId;

	//cerchaimo la opId
	for(var i = 0; i < widgetElementList[widgetIndex].op.length; i++) {

		if(widgetElementList[widgetIndex].op[i].opId == opId) {
			widgetElementList[widgetIndex].op[i].processed = false;
			widgetElementList[widgetIndex].op[i].confermed = false;
			
			//viene mostrato il tasto di conferma
			makeVisible(document.getElementById('executeOp_' + opId));
			
			break;
		}

	}

}


function clickOnToogle(element) {


	//element,id sarà del tipo op_idUnivoco_widgetId		
	var widgetId = element.id.split('_').pop();

	//modifica dell'operazione. Il tasto per aggiungerne altre viene nascosto
	document.getElementById('opButtonText_' + widgetId).innerHTML = '<font color="white">You need to confirm before adding other operations</font>';
	makeInvisible(document.getElementById('opButton_' + widgetId));

	var widgetIndex = -1;

	//cerchiamo nella widgetElementList l'id 


	widgetIndex = widgetElementListMap[parseInt(widgetId)];
	var i = widgetIndex;

	//widget trovato

	var numOfElement = 0;
	//calcoliamo il numero di elementi selezioanti
	for(var wfIndex = 0; wfIndex < widgetElementList[i].wfElements.length; wfIndex++) {

		if( widgetElementList[i].wfElements[wfIndex].elementSelected) {
			numOfElement++;
		}

	}


	//si guarda il valore del proprio cursor e si entra nella wfElementsList per settare a true o a false l'elemento in cursor
	var wfDim = widgetElementList[i].wfElements.length;

	var toogleStatus = widgetElementList[i].wfElements[widgetElementList[i].cursor].elementSelected;

	widgetElementList[i].wfElements[widgetElementList[i].cursor].elementSelected = !toogleStatus;

	//cambio elemento grafico
	if(!toogleStatus) {
		//elemento selezionato
		element.src = 'img/img/toogleOn.png';

		numOfElement++;
		widgetElementList[i].numOfElementSelected = numOfElement;

		//modifichiamo il numero di elementi selezionati, mostriamo la stringa all'utente
		var textElement = document.getElementById('numOfElement_' + element.id.split('_')[1] + '_' + widgetId);
		textElement.innerHTML = selectedElementText + widgetElementList[i].numOfElementSelected +' of ' + widgetElementList[i].wfElements.length;


	} else {
		//elemento deselezionato
		element.src = 'img/img/toogleOff.png';

		numOfElement--;
		widgetElementList[i].numOfElementSelected = numOfElement;
		var textElement = document.getElementById('numOfElement_' + element.id.split('_')[1] + '_' + widgetId);
		makeVisible(textElement);
		textElement.innerHTML = selectedElementText + widgetElementList[i].numOfElementSelected +' of ' + widgetElementList[i].wfElements.length;



	}

	//il processed dell'operazione dev'essere messo a false. Viene fatto alla fine della for dopo per ottenere il widgetIndex
	var opId = '000_'+element.id.split('_')[1] + '_' + widgetId;

	//cerchaimo la opId
	for(var i = 0; i < widgetElementList[widgetIndex].op.length; i++) {

		if(widgetElementList[widgetIndex].op[i].opId == opId) {
			widgetElementList[widgetIndex].op[i].processed = false;
			widgetElementList[widgetIndex].op[i].confermed = false;
			
			//viene mostrato il tasto di conferma
			makeVisible(document.getElementById('executeOp_' + opId));


			//dobbiamo mostrare all'utente tutte le foto disponibili ma non quelle scartate dall'operazione precedente
			if(i == 0) {
				widgetElementList[widgetIndex].numOfElementSelected = widgetElementList[widgetIndex].wfElements.length;

				//settiamo tutti gli elementi del binArray e della wfElements a true
				for(var wfIndex = 0; wfIndex < widgetElementList[widgetIndex].wfElements.length; wfIndex++) {
					widgetElementList[widgetIndex].wfElements[wfIndex].elementShowed = true;

				}


			}else {


				for(var binIndex = 0; binIndex < widgetElementList[widgetIndex].op[i-1].binArray.length; binIndex++) {

					if(widgetElementList[widgetIndex].op[i-1].binArray[binIndex]) {
						numOfElement++;
						widgetElementList[widgetIndex].wfElements[binIndex].elementShowed = true;

					}
				}


			}



			break;
		}

	}



}