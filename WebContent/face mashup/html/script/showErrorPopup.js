function getErrorPopup(text, type) {
	
	systemPause = true;
	
	var classPopup = '';
	var buttonSrc = '';
	
	if(type.indexOf('error') > -1) {
		classPopup = 'error_popup_bg';
		buttonSrc = 'img/closePopup.png';
	}
	
	if(type.indexOf('ok') > -1) {
		classPopup = 'ok_popup_bg';
		buttonSrc = 'img/closeOkPopup.png';
	}
	
	return (

			'<div id="error_popup_body" class="'+classPopup+'">' +
			
				'<div class="error_inner_popup" style="position:absolute; top: 150px; left: 500;">'+
			
					'<p style="color:white; font-size:20px; font-family: sans; position:relative; top:50; left:50;"> ' + text + '</p>' +
			
					'<img src="'+buttonSrc+'" style="position: absolute; top: 350px; left: 300px" onclick="javascript:deleteErrorPopup()"/>'+
					
				'</div>'+

			'</div>'


	);
	
	
	
}

function deleteErrorPopup() {
	
	
	document.getElementById('error_popup_body').parentNode.removeChild(document.getElementById('error_popup_body'));
	
	//controlliamo se è presente un altro popup come quello di save
	try{
		var tryer = document.getElementById('load_save_popup_body').id;
	}catch(Exception){
		systemPause = false;
	}
	
}