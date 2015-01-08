function emphasizeWidget(thisWigedtId) {
	
	//viene recuperato il widget
	console.log('widget_body_'+thisWigedtId);
	var element = document.getElementById('widget_body_'+thisWigedtId);
	
	var x = 0;
	var y = 0;
	console.log(positionList);
	//viene ricavata l'attuale posizione del widget dalla positionList
	for(var i = 0; i < positionList.length; i++) {
		if(positionList[i].widgetId == thisWigedtId) {
			x = positionList[i].xPosition;
			y = positionList[i].yPosition;
			break;
		}
	}
	
	//viene spostata la visuale per inquadrare il widget
	autoScroll(y, x-xStartOffset);
	
	//viene inserito il white square in prossimità del widget
	//se il white square esiste già viene eliminato
	
	var whiteSquare = document.getElementById('white_square');
	
	var notExist = false;
	
	if(whiteSquare == null) {
		
		console.log('autoexist white square non esiste');
		
		notExist = true;
		
		whiteSquare = document.createElement("img");
		whiteSquare.setAttribute('src','img/full_white_square.png');

		whiteSquare.setAttribute('id',"white_square");
		document.body.appendChild(whiteSquare);
		
	}
	

	whiteSquare.style.position = 'absolute';
	whiteSquare.style.top = y;
	whiteSquare.style.left = x;
	
	whiteSquare.style.zIndex = 1000;
	width = element.clientWidth;
	height = element.clientHeight;
	whiteSquare.style.height = height; 
	whiteSquare.style.width = width; 

	//viene avviata l'animazione per emphasizeWidget
	
	if(appLoaded) {
		
		if(notExist) {
			$("#white_square").fadeIn(500);
			$("#white_square").fadeOut(1000);
			$("#white_square").fadeIn(500);
			$("#white_square").fadeOut(1000);
			$("#white_square").fadeIn(500);
			$("#white_square").fadeOut(500);
			
			setTimeout(function(){

				document.getElementById('white_square').parentNode.removeChild(document.getElementById('white_square'));
				addStep();

			}
			, 4000);
		}
		
		
		
	}else {
		
		if(notExist) {

			$("#white_square").fadeIn(500);
			$("#white_square").fadeOut(1000);
			$("#white_square").fadeIn(500);
			$("#white_square").fadeOut(1000);
			
			setTimeout(function(){

				document.getElementById('white_square').parentNode.removeChild(document.getElementById('white_square'));
				addStep();

			}
			, 2000);
			
		}
		
		
	}

	
}