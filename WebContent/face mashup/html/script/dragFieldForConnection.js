function highlightElement(element,elementType) {

	var widgetId = '';


	var body = document.body;

	var invisibleLayerId = '';
	var highlightId = '';
	var widgetBody='';
	var width = 0;
	var height = 0;

	//creaimo l'elemento di evidenziazione sul widget
	var highlightWidget = document.createElement("img");

	var bodyRect = document.body.getBoundingClientRect();


	if(elementType == 'widget') {
		invisibleLayerId = 'invisibleLayerOFWidgetId_';
		highlightId = 'highlightWidget_';
		widgetId = element.id.split('_').pop();


		highlightWidget.setAttribute('src',
		'img/putInGif.gif');

		highlightWidget.setAttribute('id',
				highlightId+ widgetId);
		document.body.appendChild(highlightWidget);



		//si controlla se il widget è di tipo POST
		if(widgetElementList[widgetElementListMap[widgetId]].widgetObject.type.indexOf('POST') > -1) {
			//il widget è di tipo post. L'elemento di hightlight verrà mostrato in prossimità del campo il cui id contiene il termine main
			for(var wfIndex = 0; wfIndex < widgetElementList[widgetElementListMap[widgetId]].widgetObject.wf.length; wfIndex++) {

				if(widgetElementList[widgetElementListMap[widgetId]].widgetObject.wf[wfIndex].elementId.indexOf('main') > -1) {
					//elemento principale trovato
					widgetBody = document.getElementById(widgetElementList[widgetElementListMap[widgetId]].widgetObject.wf[wfIndex].elementId);
					break;

				}

			}

			var widgetRect = widgetBody.getBoundingClientRect();

			highlightWidget.style.position = 'absolute';
			highlightWidget.style.top = widgetRect.top
			- bodyRect.top;
			highlightWidget.style.left = widgetRect.left
			- bodyRect.left;



			highlightWidget.style.zIndex = document.getElementById('widget_body_'+ widgetId).style.zIndex;
			width = widgetBody.clientWidth;
			height = widgetBody.clientHeight;
			highlightWidget.style.height = height; 




		} else {

			widgetBody = document
			.getElementById('widget_body_'
					+ widgetId);

			var widgetRect = widgetBody.getBoundingClientRect();

			highlightWidget.style.position = 'absolute';
			highlightWidget.style.top = widgetRect.top
			- bodyRect.top + 100;
			highlightWidget.style.left = widgetRect.left
			- bodyRect.left + 200;
			highlightWidget.style.zIndex = widgetBody.style.zIndex;
			width = highlightWidget.clientWidth;
			height = highlightWidget.clientHeight;

		}




	} else if(elementType == 'putInField') {
		invisibleLayerId = 'invisibleLayerOFPutInId_';
		widgetId = element.id.split('_')[1] + '_' +element.id.split('_')[2] + '_' +element.id.split('_').pop();

		highlightWidget.setAttribute('src','img/putInFieldGif.gif');

		widgetBody = element;
		highlightId = 'highlightPutInId_';

		highlightWidget.setAttribute('id',highlightId+ widgetId);

		document.body.appendChild(highlightWidget);

		var widgetRect = widgetBody.getBoundingClientRect();

		highlightWidget.style.position = 'absolute';
		highlightWidget.style.top = widgetRect.top
		- bodyRect.top + 3;
		highlightWidget.style.left = widgetRect.left
		- bodyRect.left;
		highlightWidget.style.zIndex = document.getElementById('widget_body_'+ widgetId.split('_').pop()).style.zIndex;
	}




	//viene inoltre creato il layer invisibile con zIndex maggiore a quello dell'oggetto field draggato
	//in modo catturare in modo corretto il onmouseover
	var invisibleLayer = document.createElement("img");
	invisibleLayer.setAttribute('src',
	'img/invisible_rect.png'); //invisible_rect
	invisibleLayer.setAttribute('id',
			invisibleLayerId+ widgetId);
	document.body.appendChild(invisibleLayer);



	var putInRect = highlightWidget.getBoundingClientRect();

	invisibleLayer.style.position = 'absolute';
	invisibleLayer.style.top = putInRect.top
	- bodyRect.top - 15;
	invisibleLayer.style.left = putInRect.left
	- bodyRect.left - 15;
	invisibleLayer.style.zIndex = 1500;

	invisibleLayer.style.width = 394;
	invisibleLayer.style.height = 302;

	if(highlightWidget.clientWidth == 0) {

		setTimeout(function(){

			invisibleLayer.style.width = highlightWidget.clientWidth +40;
			invisibleLayer.style.height = highlightWidget.clientHeight + 20;

		}
		, 200);

	} else {

		invisibleLayer.style.width = highlightWidget.clientWidth + 40;
		invisibleLayer.style.height = highlightWidget.clientHeight + 20;

	}

	invisibleLayer.style.width = highlightWidget.clientWidth + 40;
	invisibleLayer.style.height = highlightWidget.clientHeight + 20;

	invisibleLayer.addEventListener('mouseover',
			function() {
		mouseOverThisWidget(this);
	}, false);
	invisibleLayer.addEventListener('mouseout',
			function() {
		mouseOutThisWidget(this);
	}, false);

}


//l'utente ha premuto il tatso del mouse sul field.
//il field scelto potrebbe essere parte dell'input di un widget dest
function dragFieldForConnection(elementField) {

	//recupero l'id dell'field
	var elementFieldId = elementField.id;
	
	//si preleva l'id del widget dall'elementFieldId
	var elementWidgetId = elementFieldId.split('_').pop();

	
	try {

		//si controlla se attualmente il widget è in fase di loading (si controlla lo style del loading_widgetId)
		if(document.getElementById('loading_' + elementWidgetId).style.display == 'block') {
			//l'elemento è visibile quindi non posso poter trasportare il suo input che è ancora in fase di caricamento
			return;

		}


	}catch(Exception) {

	}

	//l'id al proprio interno ha il widgetId di appartenenza
	//questo lo useremo quando l'utente rilascia il field sopra un altro widget

	
	draggedFieldIdForConnection = elementFieldId;

	
	//vengono messi in evidenza tutti i widget nella widgetElementList che hanno come inputType
	//il type relativo al field trasportato.

	var typeOfField;
	var widgetIndex = widgetElementListMap[parseInt(elementWidgetId)];
	//si recupera quindi il type del widget


	//si scorre la sua wf list alla ricerca field che ha come elementId il valore uguale al elementFieldId
	var wfIndex = getWfIndex(elementFieldId);

	
	typeOfField = widgetElementList[widgetIndex].widgetObject.wf[wfIndex].fieldType;


	//si controlla che tutte le operazioni siano state processate! 
	//se non lo sono allora non può essere trascinato ul field!!!!!!!!1
	for(var i = 0; i < widgetElementList[widgetIndex].op.length; i++) {

		if(widgetElementList[widgetIndex].op[i].processed == false) {
			console.log('devi prima confermare le operazioni!!!!!!!!');

			//mostrare il popup
			//document.body.innerHTML = document.body.innerHTML + getErrorPopup('Per trasportare un campo devi prima confermare o eliminare le operazioni in sospeso inserite nel widget','error');

			$('body').append(getErrorPopup('Per trasportare un campo devi prima confermare o eliminare le operazioni in sospeso inserite nel widget','error'));
			
			document.getElementById('error_popup_body').style.position = 'absolute';
			document.getElementById('error_popup_body').style.left = (document.body.clientWidth / 2)
			- (document.getElementById('error_popup_body').clientWidth / 2)
			+ document.body.scrollLeft;
			document.getElementById('error_popup_body').style.top = (document.body.clientHeight / 2)
			- (document.getElementById('error_popup_body').clientHeight / 2)
			+ document.body.scrollTop - 100;
			document.getElementById('error_popup_body').style.zIndex = 100000;

			return;
			break;
		}

	}

	var divElement = getGraphicalDiv(
			widgetElementList[widgetIndex].wfElements, elementFieldId,
			typeOfField,widgetIndex);

	var body = document.body;

	var fieldRect = elementField.getBoundingClientRect();
	var bodyRect = document.body.getBoundingClientRect();

	//document.body.innerHTML = document.body.innerHTML + divElement;
    $('body').append(divElement);

	draggedGraphicalField = document
	.getElementById('draggedImageOfFieldId');

	draggedGraphicalField.style.position = 'absolute';
	draggedGraphicalField.style.top = fieldRect.top - bodyRect.top;
	draggedGraphicalField.style.left = fieldRect.left - bodyRect.left;
	draggedGraphicalField.style.zIndex = 1000;

	orginalTopOfDraggedGraphicalField = fieldRect.top - bodyRect.top;
	orginalLeftOfDraggedGraphicalField = fieldRect.left - bodyRect.left;

	mouseOriginalClickX = tempX;
	mouseOriginalClickY = tempY;

	if (widgetElementList[widgetIndex].wfElements.length == 0) {
		return;
	}


	//si evidenziano i widget che hanno come inputType un elemento uguale a typeOfField
	for ( var i = 0; i < widgetElementList.length; i++) {

		//si scorrono tutti gli inputType.
		//non si tiene in considerazione il widget Attuale da cui stiamo prendendo il field
		if (widgetElementList[i].widgetId != elementWidgetId) {

			///////////////////////////////////////////////////////////////////////////////////////////
			///////////////////////////////////////////////////////////////////////////////////////////
			///////////////////////////////////////////////////////////////////////////////////////////
			///////////////////////////////////////////////////////////////////////////////////////////
			///////////////////////////////////////////////////////////////////////////////////////////
			///////////////////////////////////////////////////////////////////////////////////////////
			///////////////////////////////////////////////////////////////////////////////////////////
			///////////////////////////////////////////////////////////////////////////////////////////
			///////////////////////////////////////////////////////////////////////////////////////////
			///////////////////////////////////////////////////////////////////////////////////////////
			///////////////////////////////////////////////////////////////////////////////////////////

			//si controlla il tupo di widget. Se è di post allora
			//dobbiamo evidenziare i fieldInput inerenti alle op che hanno come input type il field uguale
			//dobbiamo evidenziarlo e inserirlo all'interno di una lista che poi mouseUp controllerà per verificare che il collegamento
			//possa essere eseguito.

			if(widgetElementList[i].widgetObject.type.indexOf('POST') > -1) {
				//il widget è di post.
				//prendiamo la prima op per vedere se gli input type sono compatibili

				for(var inputTypeIndex = 0; inputTypeIndex < widgetElementList[i].op[0].inputType.length; inputTypeIndex++) {
					if(typeOfField == widgetElementList[i].op[0].inputType[inputTypeIndex]) {
						//il field trasportato è compatibile con uno dei field che possono essere messi all'interno del widget di post non nel main element
						//in queanto per quello si segue il metodo standard
						listOfAllowedOp.push(widgetElementList[i].widgetId);

						//widgetId ci serve
						var widgetId = widgetElementList[i].widgetId;

						//si cercano gli elementi della wfElement che non sono main per evidenziarli
						for(var wfIndex = 0; wfIndex < widgetElementList[i].widgetObject.wf.length; wfIndex++) {

							if(widgetElementList[i].widgetObject.wf[wfIndex].elementId.indexOf('main') == -1) {

								highlightElement(document.getElementById(widgetElementList[i].widgetObject.wf[wfIndex].elementId), 'putInField');

							}

						}



						break;
					}
				} 


			}


			for ( var j = 0; j < widgetElementList[i].widgetObject.inputType.length; j++) {

				if (widgetElementList[i].widgetObject.inputType[j] == typeOfField) {

					//evidenzia widgetElementList[i].widgetId

					//inseriamo il widget nella lista listOfAllowedWidget
					listOfAllowedWidget
					.push(widgetElementList[i].widgetId);

					//widgetId ci serve
					var widgetId = widgetElementList[i].widgetId;

					highlightElement(document.getElementById('widget_body_'+widgetId), 'widget');

				}

			}

		}

	}

	//si evidenziano i campi putIn riguardanti le operazioni di matchField nella quale
	//è possibile spostare un campo per il confronto
	var putInElements = $('*[id^="putInMatchOp"]');

	for(var k=0; k < putInElements.length; k++) {

		if(elementWidgetId != putInElements[k].id.split('_').pop()) {

			highlightElement(document.getElementById(putInElements[k].id),'putInField');

		}

	}




}