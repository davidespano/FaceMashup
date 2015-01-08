
var enableAutomaticPositioning = true;

var xStartOffset = 0;

function positionElement(widgetId) {

	this.widgetId = widgetId;
	this.yPosition;
	this.xPosition;

}


//riceve in ingresso l'indice relativo al primo elemento in una posizione y e inserisce il posElement ricevuto nell'ultima posizione x
function insertInXPosition(positionIndex, posElement,newPositionList) {

	var lastXPosition = xStartOffset;
	var lastXWidgetWidth = 0;
	var insertInIndex = -1;

	console.log('positionIndex ' + positionIndex);
	
	for(var i = positionIndex; i <= positionList.length; i++) {

		if(insertInIndex == -1) {

			if(i == positionList.length || positionList[i].yPosition != posElement.yPosition) {
				//l'ultimo x inserito si trova in i-1
				lastXPosition = positionList[i-1].xPosition;
				lastXWidgetWidth = document.getElementById('widget_body_'+positionList[i-1].widgetId).clientWidth;

				insertInIndex = i-1;
				posElement.xPosition = lastXPosition + lastXWidgetWidth;
				posElement.yPosition = positionList[0].yPosition;

				newPositionList.push(posElement);

			}else {
				newPositionList.push(positionList[i]);
			}

		}else{
			newPositionList.push(positionList[i-1]);
		}
	}

	return newPositionList;



}

function insertElementInPositionList(posElement) {

	//riceve un positionElement e si preoccupa di inserirlo nella lista in modo ordinato
	//in baase soltanto alla x poichè un widget appena inserito viene sempre inserito in posizione y = 0
	//la x in questo caso sarà uguale alla x dell'ultimo elemento inserito in posizione 0 più il suo width 

	var widgetId = posElement.widgetId;
	
	if(enableAutomaticPositioning) {

		if(positionList.length == 0) {
			
			posElement.yPosition = 0;
			posElement.xPosition = xStartOffset;
			positionList.push(posElement);

			if(enableAutomaticPositioning) {
				document.getElementById('widget_body_' + posElement.widgetId).style.position = 'absolute';
				document.getElementById('widget_body_' +posElement.widgetId).style.top = 0;
				document.getElementById('widget_body_' + posElement.widgetId).style.left = xStartOffset;
			}

			autoScroll(0, 0);
			emphasizeWidget(posElement.widgetId);

			console.log(positionList);

			return;

		}

		var newPositionList = [];
			
		posElement.yPosition = positionList[0].yPosition;

		newPositionList = insertInXPosition(0, posElement, newPositionList);

		positionList = newPositionList.slice(0,newPositionList.length);

		//il widget appena inserito appartiene ad una y che ha almeno un elemento al proprio interno
		//puà capitare che se sono presenti elementi in y inferiori questi debbano essere
		//traslati se l'altezza del nuovo widget appena inserito è superiore a quella di tutti gli altri
		
		var newWidgetHeight = document.getElementById('widget_body_' + widgetId).clientHeight;
		//essendo appena stato inserito la sua y sarà positionList[0].yPosition;
		//quindi bisogna cercare tyttu gli elementi appartenti a questa y
		//e vedere se l'elemento appena inserito è maggiore rispetto al precedente height max value preso in cosiderazione
		

		var prevMaxValue = 0;
		var lastIndexOfThisY = 0;
		
		for(var i = 0; i < positionList.length; i++) {
			
			if(positionList[i].yPosition != positionList[0].yPosition) {
				lastIndexOfThisY = i -1;
				break;
			}
			
			if(positionList[i].widgetId != widgetId) {
				
				if(document.getElementById('widget_body_' + positionList[i].widgetId).clientHeight > prevMaxValue) {
					prevMaxValue = document.getElementById('widget_body_' + positionList[i].widgetId).clientHeight;
				}
				
			}
			
		}
		
		if(prevMaxValue < newWidgetHeight && lastIndexOfThisY != 0) {
			//dobbiamo traslare tutte le y dalla lastIndexOfThisY+1 in poi di newWidgetHeigth - prevMaxValue
			shiftAllWidgetY(lastIndexOfThisY+1, newWidgetHeight-prevMaxValue);
		}
		
		if(enableAutomaticPositioning){
			document.getElementById('widget_body_' + posElement.widgetId).style.position = 'absolute';
			document.getElementById('widget_body_' +posElement.widgetId).style.top = posElement.yPosition;
			document.getElementById('widget_body_' + posElement.widgetId).style.left = posElement.xPosition;
			
			autoScroll(posElement.yPosition-100, posElement.xPosition-xStartOffset-100);
			emphasizeWidget(posElement.widgetId);
		}

	}
	
	console.log(positionList);

}

function deleteWidgetPosition(widgetDestId) {
	
	var widgetDestIndex = -1;
	
	//il widget è stato eliminato. Dobbiamo quindi, per prima cosa sistemare lo spazio nei widget alla sua destra.
	//inoltre dev'essere anche modificata la yPosition dei widget sotto eliminando il heigth del widget appena eliminato da tutti i successivi soltanto se era l'unico presente nella y
	for(var i = 0; i < positionList.length; i++) {
		
		if(positionList[i].widgetId == widgetDestId) {
			
			//widget eliminato trovato.
			//si spostano tutti i widget alla sua destra
			widgetDestIndex = i;
			var widgetWidth = document.getElementById('widget_body_'+widgetDestId).clientWidth;
			var widgetHeight = document.getElementById('widget_body_'+widgetDestId).clientHeight;
			
			var yPositionOfDeletedWidget = positionList[i].yPosition;
			var lastXAvailableForThisY = 0;
			var lastWidgetWidth = 0;
			
			var numOfWidgetInThisY = 0; //indica se è presente almeno un altro widget nella stessa y
			
			i++;
			while(i < positionList.length && positionList[i].yPosition == positionList[widgetDestIndex].yPosition) {
				
				
				numOfWidgetInThisY++;
				
				positionList[i].xPosition = positionList[i].xPosition - widgetWidth;
				
				if(enableAutomaticPositioning){
					document.getElementById('widget_body_' + positionList[i].widgetId).style.position = 'absolute';
					document.getElementById('widget_body_' + positionList[i].widgetId).style.left = positionList[i].xPosition;
				}
				
				lastXAvailableForThisY = positionList[i].xPosition;
				lastWidgetWidth = document.getElementById('widget_body_'+positionList[i].widgetId).clientWidth;
				
				i++;
				
			}
			
			console.log('posizionamento in x terminato. INZIAMO CON LA Y');
			
			//tutti i widget alla sua detsra sono stati sistemati quindi si procede con il traslare verticalmente tutti i widget sotto di esso
			//controllando però la lista della nuova y per posizionare nella corretta x il widget
			
			//in realtà dovrebbe essere necessario calcolare di nuovo le dipendeze dei widget poichè con l'eliminazione del widget ho eliminato anche
			//evenutali collegamenti
			//questo sarebbe da aggiungere
			
			//se non ci sono altri widget nella prima riga su traslano tutti
			if(numOfWidgetInThisY == 1) {
				console.log('positionLength = ' +positionList.length +' i='+i);
				while(i < positionList.length) {
					console.log('sposto il widgte in pos ' +i);
					positionList[i].yPosition = positionList[i].yPosition - widgetHeight;
					if(enableAutomaticPositioning){
						document.getElementById('widget_body_' + positionList[i].widgetId).style.position = 'absolute';
						document.getElementById('widget_body_' + positionList[i].widgetId).style.top = positionList[i].yPosition;
						
						if(yPositionOfDeletedWidget == positionList[i].yPosition) {
							//dobbiamo spostare anche la x
							positionList[i].xPosition = lastXAvailableForThisY + lastWidgetWidth;
							
							if(positionList[i].xPosition == 0) {
								positionList[i].xPosition = xStartOffset;
							}
							
							document.getElementById('widget_body_' + positionList[i].widgetId).style.left = positionList[i].xPosition;
							
							lastWidgetWidth = document.getElementById('widget_body_' + positionList[i].widgetId).clientWidth;
							lastXAvailableForThisY = positionList[i].xPosition;
							
						}
						
					}
					i++;
					
				}
			}
			
			
			
		}
		
	}
	
	//si elimina il riferimento del widget all'interno della positionList
	positionList.splice(widgetDestIndex,1);
	
	console.log('nuova position list');
	console.log(positionList);
	
}

function editOpInWidget(widgetDestId, type) {
	
	var incrementValue = 0;
	
	if(type == 'add') {
		incrementValue = 100;
	} else {
		incrementValue = -100;
	}
	
	//a tutti i widget con una y successiva a quella del widgetDestId deve essere modificata la y position incrementandola o decrementandola di 100px
	for(var i = 0; i < positionList.length; i++) {
		
		if(positionList[i].widgetId == widgetDestId) {
			//widgetDest trovato
			var widgetDestIndex = i;
			
			while(i < positionList.length && positionList[widgetDestIndex].yPosition == positionList[i].yPosition) {
				i++;
			}
			
			//in i ora è presente l'indice della primo elemento y successivo.
			//quindi da qui in poi dobbiamo modificare tutti gli elementi
			while(i < positionList.length) {
				
				
				positionList[i].yPosition = positionList[i].yPosition + incrementValue;
				if(enableAutomaticPositioning){
					document.getElementById('widget_body_' + positionList[i].widgetId).style.position = 'absolute';
					document.getElementById('widget_body_' +positionList[i].widgetId).style.top = positionList[i].yPosition;
				}
				
				i++;
				
				
			}
			
		}
	}
	
	console.log(positionList);
	
}

function makeConnection(widgetDestId) {

	if(enableAutomaticPositioning) {

		//viene come prima cosa ricavata la lista degli inputElements del widgetDest. Non solo quelli presenti nella connectedList
		//ma anche quelli relativi alle operazioni!!!

		//contiene gli id dei widget entranti
		var inputElements = [];

		//si cerca il widgetDest nella connectedList
		for(var i = 0; i < connectedList.length; i++) {
			if(connectedList[i].widgetDest.indexOf(widgetDestId) > -1) {
				//si scorrono gli inputElements e si inseriscono in inputElements
				for(var j = 0; j < connectedList[i].inputElements.length; j++) {
					inputElements.push(connectedList[i].inputElements[j].split('_').pop());
				}
				break;
			}
		}

		//si inseriscono anche gli id dei widget in ingresso per le operazioni
		for(var i = 0; i < widgetElementList[widgetElementListMap[widgetDestId]].op.length; i++) {

			//se il widget non è di post si preleva soltanto il fieldB.
			//se invece è di post allora si preleva anche fieldA

			//quindi il fieldB si prende a prescindere se esiste
			if(widgetElementList[widgetElementListMap[widgetDestId]].op[i].fieldBId != '') {
				inputElements.push(widgetElementList[widgetElementListMap[widgetDestId]].op[i].fieldBId.split('_').pop());
			}

			//se il widget è di POST si prende anche il fieldAid
			if((widgetElementList[widgetElementListMap[widgetDestId]].widgetObject.type.indexOf('POST') > -1)) {
				if(widgetElementList[widgetElementListMap[widgetDestId]].op[i].fieldAId != '') {
					inputElements.push(widgetElementList[widgetElementListMap[widgetDestId]].op[i].fieldAId.split('_').pop());
				}
			}

		}

		//dentro inputElements ora sono presenti tutti gli id dei widget da cui widgetDestId dipende
		console.log('inputElement del widget appena connesso');
		console.log(inputElements);

		var widgetDestIdIndex = -1;
		//recuperiamo la posizione attuale del widgetDestId
		for(var i = 0; i < positionList.length; i++) {
			if(positionList[i].widgetId == widgetDestId) {
				widgetDestIdIndex = i;
				break;
			}
		}

		console.log('widgetDestIdIndex ' +widgetDestIdIndex);
		
		//dobbiamo prima di procedere all'eliminazione del riferimento al widget spostare tutti i widget presenti alla sua destra
		//quindi tutti i widget che mantengono la stessa yPosition ma il cui indice è superiore a widgetDestIdIndex.
		//questo viene fatto soltanto se la nuova posizione del widget sarà in una y inferiore!!!
		//se la y resta la stessa allora non è necessario
		var i = widgetDestIdIndex;
		i++;
		while(i < positionList.length && (positionList[i].yPosition == positionList[widgetDestIdIndex].yPosition || (positionList[i].yPosition  >= positionList[widgetDestIdIndex].yPosition - 30 && positionList[i].yPosition  <= positionList[widgetDestIdIndex].yPosition +30))) {
			
			//si prende la sua xPosition e si decrementa del width del widgetDest 
			positionList[i].xPosition = positionList[i].xPosition - document.getElementById('widget_body_'+widgetDestId).clientWidth;
			
			if(enableAutomaticPositioning) {
				document.getElementById('widget_body_' + positionList[i].widgetId).style.position = 'absolute';
				document.getElementById('widget_body_' +positionList[i].widgetId).style.top = positionList[i].yPosition;
				document.getElementById('widget_body_' +positionList[i].widgetId).style.left = positionList[i].xPosition;
			}
			
			i++;
		}
		
		//registriamo la y di questo elemento. Potrebbe di fatto essere l'ultimo della riga e quindi il istsema 
		//salterà la riga.
		
		var yOfWidget = positionList[widgetDestIdIndex].yPosition;
		
		//eliminiamo l'eleemnto dalla positionList
		positionList.splice(widgetDestIdIndex,1);
		


		//per ogni inputElements bisogna entrare nella posiitonList e vedere quale ha la yPosition più elevata
		//quindi il widgetDestId avrà come yPosition quella successiva ai widget presenti nella positionList con la stessa yposition
		//se non ci sono widget successivi allora sarà uguale a yPosition + heigth più elevato dei widget presnti in quella tPosisition

		var maxYOfInputElements = 0;
		var maxYIndex = -1;


		//quindi recuperiamo la yPosition massima
		for(var i = 0; i < inputElements.length;i++) {

			//cerchiamo l'elemento nella positionList
			for(var j = 0; j < positionList.length; j++) {

				if(positionList[j].widgetId == inputElements[i]) {

					//elemento trovato. leggiamo la sua yPosition e la assegniamo soltanto se è la massima fin ora trovata
					if(maxYOfInputElements <= positionList[j].yPosition) {
						maxYOfInputElements = positionList[j].yPosition;
						maxYIndex = j;
					}
					break;
				}			
			}

		}

		var newYForElement = -1;
		var maxHeight = 0;
		var newYIndex = -1;
		
		if(inputElements.length == 0) {
			newYForElement = 0;
			newYIndex = 0;
			maxYIndex = 0;
		}

		if(maxYIndex >= 0) {
			
			if(inputElements.length > 0) {
				
				//la y massima si trova nell'indice maxYIndex e il suo valore in maxYOfInputElements
				console.log('y massima del widget ' + positionList[maxYIndex].widgetId);
				console.log('y massima ' + maxYOfInputElements);

				//cerchiamo pertanto se esiste una yPosition in positionList maggiore della maxYOfInputElements
				//in questa fase iniziamo anche a recuperare il heigth massimo dei widget con la medesima yPosition
				for(var i = maxYIndex; i < positionList.length; i++) {
					console.log('esamino la pos ' +i + ' che ha una yPosition = ' +positionList[i].yPosition);
					console.log('yOfWidget = ' +yOfWidget);

					newYIndex = i;
					
					if(positionList[i].yPosition != maxYOfInputElements) {
						console.log('diverso. if '+yOfWidget +' <= ' + maxYOfInputElements);
						if(yOfWidget >= maxYOfInputElements || yOfWidget < maxYOfInputElements || (yOfWidget < maxYOfInputElements + 70 && yOfWidget > maxYOfInputElements - 70)) {
							newYForElement = positionList[i].yPosition;
							console.log('newYForElement = ' +positionList[i].yPosition);
							newYIndex = i;
							break;
						}else {
							newYIndex = i;
							break;
						}
						
						
					}else {

						if(maxHeight <= document.getElementById('widget_body_'+positionList[i].widgetId).clientHeight) {
							maxHeight = document.getElementById('widget_body_'+positionList[i].widgetId).clientHeight; 
						}

					}
				}
				
			}
			


			

			if(newYForElement == -1) {
				//nessuna nuova y dopo la massima trovata.
				//il nuovo widget verrà messo nella posizione x = 0 e y = yMaxPosition + maxHeight

				console.log('primo elemento in questa y');
				
				

				var posElement = new positionElement(widgetDestId);
				posElement.yPosition = maxYOfInputElements + maxHeight;
				posElement.xPosition = xStartOffset;

				//positionList.push(posElement);
				
				if(newYIndex+1 == positionList.length) {
					positionList.push(posElement);
				}else{
					positionList.splice(newYIndex,0,posElement);
				}
				
				

				console.log('positionlist ');
				console.log(positionList);

			}else {

				//altrimenti dobbiamo mettere il nostro widget nella y = newYForElement
				//e nellal'ultima x disponibile

				console.log('non è il primo elemento in questa y');

				var posElement = new positionElement(widgetDestId);
				posElement.yPosition = newYForElement;

				console.log('nuova y in cui si troverà questo wisdget ' + newYForElement);
				console.log('newYIndex = ' +newYIndex);

				
				var prevMaxHeightValue = 0;
				//quindi scorro la positionList alla ricerca dell'ultimo elemento in questa y
				for(var i = newYIndex; i < positionList.length; i++) {
					
					while(i < positionList.length && positionList[i].yPosition == newYForElement) {
						
						if(prevMaxHeightValue < document.getElementById('widget_body_'+positionList[i].widgetId).clientHeight) {
							prevMaxHeightValue = document.getElementById('widget_body_'+positionList[i].widgetId).clientHeight;
						}
						
						i++;
					}
					
					posElement.xPosition = positionList[i-1].xPosition + document.getElementById('widget_body_'+positionList[i-1].widgetId).clientWidth;
				    var newWidgetHeight = document.getElementById('widget_body_'+posElement.widgetId).clientHeight;
				    positionList.splice(i, 0, posElement);
				    
				    //dalla posizione i in poi, se il nuovo widget è più alto di tutti i widget precedenti allora dobbiamo
				    //shiftare tutti quelli inferiori a lui
				    if(i+1 < positionList.length && prevMaxHeightValue < newWidgetHeight) {
				    	shiftAllWidgetY(i+1, newWidgetHeight-prevMaxHeightValue);
				    }
				    
				    break;


				}

				

			}


		}


		if(enableAutomaticPositioning) {
			
			//console.log('dovrei modificare widget con id widget_body_' + widgetDestId + ' con posX '+ posElement.xPosition +' e posY ' + posElement.yPosition);
			document.getElementById('widget_body_' + widgetDestId).style.position = 'absolute';
			document.getElementById('widget_body_' +widgetDestId).style.top = posElement.yPosition;
			document.getElementById('widget_body_' + widgetDestId).style.left = posElement.xPosition;
			
			if(newYForElement == -1) {
				//aumentiamo la dimensione del body 
				document.body.style.height = 200 + document.body.scrollHeight;
				console.log('aumento del body height');

			}
			
			autoScroll(posElement.yPosition-100, posElement.xPosition -xStartOffset-100);
			
			emphasizeWidget(widgetDestId);
			
			console.log('positionlist ');
			console.log(positionList);
			
		}

	}


}

//shifta tuttti i widget in x dalla posizione position della position list
function shiftAllWidgetX(position, value) {
	
	//tutti i widget della lista vengono traslati di x px
	for(var i = position; i < positionList.length; i++) {
		
		positionList[i].xPosition = positionList[i].xPosition + value;
		document.getElementById('widget_body_' + positionList[i].widgetId).style.left = positionList[i].xPosition;
		
	}
	
}


//shifta di value tutti i widget alla destra del widget position
function shiftAllXWidgetOnRight(position, value) {
	
	var currentY = positionList[position].yPosition;
	
	//modifichiamo la xPosition del widget in position
	positionList[position].xPosition = positionList[position].xPosition + value;
	
	var i = position;
	while(i < positionList.length && positionList[i].yPosition == currentY) {
		
		//positionList[i].xPosition = positionList[i].xPosition + value;
		document.getElementById('widget_body_' + positionList[i].widgetId).style.left = positionList[i].xPosition + value;
		i++;
	}
	
	
}

//shifta di value tutti i widget alla destra del widget position
function shiftAllYWidgetOnDrag(position, value) {
	
	//modifichiamo la xPosition del widget in position
	
    for(var i = position; i < positionList.length; i++) {

		document.getElementById('widget_body_' + positionList[i].widgetId).style.top = positionList[i].yPosition + value;
		
	}
	
	
}

function shiftAllWidgetY(position, value) {
	
	//tutti i widget della lista vengono traslati di x px
	for(var i = position; i < positionList.length; i++) {
		
		positionList[i].yPosition = positionList[i].yPosition + value;
		document.getElementById('widget_body_' + positionList[i].widgetId).style.top = positionList[i].yPosition;
		
	}
	
}

function autoScroll(positionY, positionX) {
	
	try {
		
	
	$(document).ready(function(){
	     $('body,html').animate({scrollTop: positionY}, 500); 
	});
	$(document).ready(function(){
	     $('body,html').animate({scrollLeft: positionX}, 500); 
	});
	
	}catch(Exception) {
		console.log('impossibile eseguire lo scroll');
	}
}
