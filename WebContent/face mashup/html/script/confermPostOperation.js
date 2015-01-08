function confermPostOperation(element) {
	
	var widgetId = element.id.split('_').pop();
	
	//prima di procedere si verifica che l'utente abbia inserito tutti i campi richeisti
	//in particolar modo si verifica che sia presente un collegamento in connectedList e che il fieldA sia diverso da ''
	
	var isConnected = false;
	
	for(var i = 0; i < connectedList.length; i++) {
		if(connectedList[i].widgetDest == widgetId) {
			isConnected = true;
			connectedList[i].processed = false;
			break;
		}
	}
	
	if(isConnected && widgetElementList[widgetElementListMap[widgetId]].op[0].fieldAId != '') {
		
		//possiamo avviare la computazione.
		widgetElementList[widgetElementListMap[widgetId]].loaded = false;
		widgetElementList[widgetElementListMap[widgetId]].op[0].confermed = true;
		
		startComputation();
		
		
	}else {
		//qualche campo non è stato inserito. Viene mostrato il popup di errore
		//document.body.innerHTML = document.body.innerHTML + getErrorPopup('Impossibile confermare. Non hai inserito tutte le informazioni richieste per questo tipo di operazione.');
		
		$('body').append(getErrorPopup('Impossibile confermare. Non hai inserito tutte le informazioni richieste per questo tipo di operazione.','error'));
		
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