function loadPopupWindow(fieldConnectionId,type) {

	return (

			'<div id="popup_body" class="div_popup_bg">' +

			'<div id="popup_header"> '+

			'<img src="img/popup_close_button.png" style="position: absolute; top: 10px; left: 650px; bottom: 5px; width:25" onclick="javascript:closePopup()"/>'+
			'<img class="image" src="img/popup_rect.png" style="position: absolute; top: 40px; left: 20; width:650"/>'+
			'<p style="color:white; position: absolute; top: -5px; left: 50; font-size:18px; font-family: sans"> Elementi in ingresso </p>'+

			'</div>'+


			'<div class="div-popup-inner" style="position:absolute; top: 100px; left: 130;" id="popup_inner">' +


			//qui verà inserito il contenuto dinamicamente


			'</div>'+

			'<img class="image" src="img/popup_rect.png" style="position: absolute; top: 370px; left: 20; width:650"/>'+
			
			'<img onclick="javascript:deleteConnection(this,\''+type+'\')" id="buttonDeleteConnection-'+ fieldConnectionId + ' " class="image" src="img/deleteConnectionButton.png" style="position: absolute; top: 390px; left: 420;"/>'+

			'</div>'


	);


}

function getElement(id, fieldConnectionId, type, graphicalValue, indexInWidgetElementList, isSelected) {

	//id -> numero incrementale
	//type può essere img o text
	//fieldConnectionId contiene input-idDest-idUnique-field_connected_widgetId 

	if(graphicalValue == '') {
		return '';
	}
	
	var button = '';
	
	if(isSelected) {
		button = 'elimina elemento';
	}else {
		button = 'ripristina elemento';
	}

	if(type == 'text') {

		var text = '';
		if(graphicalValue.length > 15) {
			text = graphicalValue.substring(0,15) + '...';
		}else {
			text = graphicalValue;
		}

		return ('<div class="div-popup-element" id="div_element_'+id+'">' +

				'<p title="'+ graphicalValue +'" class="left_p" style="color:white; font-size:20px; font-family: sans; position:relative; top:-16; left:10;"> ' + text + '</p>' +
				'<p onclick="javascript:changeFieldConnection(this,'+indexInWidgetElementList+')" id="deleteElementId-'+ id +'-'+ fieldConnectionId + ' " class="right_p" style="color:white; font-size:15px; font-family: sans; position:relative; top:-8; left:42;"> '+ button +' </p>'+

		'</div>');


	}

	if(type == 'img') {

		return ('<div class="div-popup-element" id="div_element_'+id+'">' +

				'<img class="left_p" src="'+ graphicalValue +'" style="position: position:relative; top:-16; left:10; width: 50"/>' +
				'<p onclick="javascript:changeFieldConnection(this,'+indexInWidgetElementList+')" id="deleteElementId-'+ id +'-'+ fieldConnectionId + ' " class="right_p" style="color:white; font-size:15px; font-family: sans; position:relative; top:-8; left:90;">' +button+' </p>'+

		'</div>');


	}

}