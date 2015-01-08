function loadFriendsWidget() {

	//helpText ='<i> <b><br>NESSUN CONTENUTO DISPONIBILE</br></b> <br>Questo widget mostrerà la lista degli amici degli utenti trascinati.</br> <br>Trascina all\'interno di questo widget un nome o una foto del profilo</br> <br>o un insieme di nomi o foto del profilo.</br> </i>';
	//helpText ='<i> <b><br>NO AVAILABLE CONTENT</br></b> <br>This widget shows the list of friends of dragged users.</br> <br>Drag here a name or a user\'s photo </br> <br>or a list of usernames or users\' photos.</br> </i>';
	helpText ='<i><b>NO AVAILABLE CONTENT<br><br></b> This widget shows your friends list or friends list of your friends<br> Please drag here one among the following elements:<br><br> 1) a username<br> 2) a user’s photo<br> 3) a list of username<br> 4) a list of users’ photos.</i>';

	
	return (

			'<div id="widget_body_'
			+ widgetId
			+ '" class="div_friends_widget_bg" onmouseout="javascript:mouseOutThisWidget(this)" onmouseover="javascript:mouseOverThisWidget(this)">' +

			'<div style="position:relative" id="header'
			+ widgetId
			+ '" draggable="false" onmousedown="javascript:dragWidget(this)"> '+
			'<img src="img/widget_body/header_shadow.png" style=\'width:800px; height:40px; \' draggable="false"/>'+

			'<p id="widget_name_'
			+ widgetId
			+ '"style="color:dadada; position: absolute; top: -6px; left:30px; font-size:20px; font-family: sans">widget no. <b>'+ widgetId +' Friends</b></p>'+

			'<img src="img/widget_body/widget_close.png" style="position: absolute; top: 16px; left: 750px; bottom: 5px;" onclick="javascript:deleteWidget(this)"/>'+
			'<img href="javascript:;" onClick="window.open(\'help/friends_help.html\', \'MANUALE UTENTE\', \'width=1000, height=500, resizable, status, scrollbars=1, location=yes\')" src="img/widget_body/widget_help.png" style="position: absolute; top: 15px; left: 720px; bottom: 6px;"/>'+

			'</div>'+

			'<div id="inner_'
			+ widgetId
			+ '" class="div-friends-widget-inner">'+

			'<div style="position:relative; text-align:center" class="div_prebody_bg" id="prebody_'
			+ widgetId
			+ '"> '+

			'<img src="img/widget_body/shadow_upper_bar.png" style=\'width:735px; height:33px;\'/>'+


			'<div class="input_div" id="input_element_div_'
			+ widgetId
			+ '" style="position: absolute; top: 20px; left: 10px; bottom: 5px; text-align:left">'+



			'</div>'+

			'<img src="img/widget_body/shadow_bottom_bar.png" style=" width:735px; height:33px; position: absolute; top: 55px; left: 0px; bottom: 5px"/>'+

			'</div>'+

			'<div id="widget_friends_body_'
			+ widgetId
			+ '" class="div_friends_widget_body_bg">'+

			'<p id="help_message_'
			+ widgetId
			+ '" style="position: absolute; top: 140px; left: 70px; z-index:1000; font-size:18px; font-family: sans "> '+ helpText +' </p>' +


			'<img id="loading_'
			+ widgetId
			+ '" src="img/loading.gif" style="position: absolute; top: 180px; left: 90px; bottom: 5px; z-index = 2000"/>'+


			////////////////////////////////////////////////////////////////////////////////////7

//			'<div class="friend_box_element_div">'+
//
//			'<img id="user_picture_'
//			+ widgetId
//			+ '" src="img/widget_body/user_picture.png" style="width:40px; position: relative; top: 10px; left: 10px" onmousedown="javascript:dragFieldForConnection(this)" draggable="false"/>'+
//
//			'<p onmousedown="javascript:dragFieldForConnection(this)" draggable="false" id="user_name_'
//			+ widgetId
//			+ '" style="position: relative; top: -45px; left: 60px; font-size:18px; font-family: sans "><b>Nome Utente</b></p>'+
//
//			'<img  id="toogle_friends_'+widgetId+'" src="img/img/toogleOn.png" style="position: relative; top: -62; left:184; width:16"/>'+
//
//			'</div>'+
//
//
//
//


			'</div>'+

			'</div>'+

			'<img src="img/widget_body/footer_shadow_bar.png" style=" width:735px; height:12px; position: absolute; top: 380px; left: 0px"/>'+
			
			'<img onclick="javascript:selectAllFriend(this)" id="selectAllButton_'+widgetId+'" src="img/img/selectAllButton.png" style="position: absolute; top: 402; left:265"/>'+
			'<img onclick="javascript:deselectAllFriend(this)" id="deselectAllButton_'+widgetId+'" src="img/img/deselectAllButton.png" style="position: absolute; top: 402; left:415"/>'+

			'<img onclick="javascript:executeOp(this)" id="executeOp_000_'+widgetId+'" src="img/executeOpButton.png" style="position: absolute; top: 400; left:600"/>'+

			'</div>'




	);

}

function selectAllFriend(element) {

	var widgetId = element.id.split('_').pop();
	
	//viene mostrato il tasto di conferma
	makeVisible(document.getElementById('executeOp_000_'+widgetId));
	widgetElementList[widgetElementListMap[widgetId]].op[0].confermed = false;
	widgetElementList[widgetElementListMap[widgetId]].op[0].processed = false;
	
	var binArray = [];
	
	//widget trovato. Si entra nella sua wfElement list e si mettono tutti a selected
	for(var j = 0; j < widgetElementList[widgetElementListMap[widgetId]].wfElements.length; j++) {

		widgetElementList[widgetElementListMap[widgetId]].wfElements[j].elementSelected = true;
		
		//viene modificato il toogle toogle_friends_'+widgetId+'_'+incrementalId+'
		console.log('cerco elemento '+'toogle_friends_'+widgetId+'_'+j);
		document.getElementById('toogle_friends_'+j+'_'+widgetId).src = "img/img/toogleOn.png";
		binArray.push(true);
	}
	
	widgetElementList[widgetElementListMap[widgetId]].numOfElementSelected = widgetElementList[widgetElementListMap[widgetId]].wfElements.length;
	widgetElementList[widgetElementListMap[widgetId]].op[0].binArray = binArray;
	
	
}

function deselectAllFriend(element) {
	
	var widgetId = element.id.split('_').pop();
	
	//viene mostrato il tasto di conferma
	makeVisible(document.getElementById('executeOp_000_'+widgetId));
	widgetElementList[widgetElementListMap[widgetId]].op[0].confermed = false;
	widgetElementList[widgetElementListMap[widgetId]].op[0].processed = false;
	
	var binArray = [];
	
	//widget trovato. Si entra nella sua wfElement list e si mettono tutti a selected
	for(var j = 0; j < widgetElementList[widgetElementListMap[widgetId]].wfElements.length; j++) {

		widgetElementList[widgetElementListMap[widgetId]].wfElements[j].elementSelected = false;
		
		//viene modificato il toogle toogle_friends_'+widgetId+'_'+incrementalId+'
		document.getElementById('toogle_friends_'+j+'_'+widgetId).src = "img/img/toogleOff.png";
		binArray.push(false);
	}
	
	widgetElementList[widgetElementListMap[widgetId]].numOfElementSelected = 0;
	widgetElementList[widgetElementListMap[widgetId]].op[0].binArray = binArray;

	
	
}

function insertNewFriendBox(widgetId, incrementalId) {
	
	var userPictureSrc = widgetElementList[widgetElementListMap[widgetId]].wfElements[incrementalId].wf[0].graphicalValue;
	var userName = widgetElementList[widgetElementListMap[widgetId]].wfElements[incrementalId].wf[1].graphicalValue;
	var toogleSrc = "img/img/toogleOn.png";
	
	console.log('userName ' +userName);
	
	userName = userName.replace(/\'/g, '');
	
	if(userName.length > 15) {
		userName = userName.substring(0,12);
		userName = userName + "...";
	}
	
	if(userPictureSrc == '') {
		userPictureSrc = 'img/widget_body/user_picture.png';
	}
	
	
	if(!widgetElementList[widgetElementListMap[widgetId]].wfElements[incrementalId].elementSelected) {
		toogleSrc = "img/img/toogleOff.png";
	}
	
	//return('<div id="friend_box_'+widgetId+'_'+incrementalId+'" class="friend_box_element_div">'+

	return('<div id="friend_box_'+incrementalId+'_'+widgetId+ '" class="friend_box_element_div">'+

	
	'<img id="user_picture_'
	+ +incrementalId+'_'+widgetId+'" src="'+userPictureSrc+'" style="width:40px; position: relative; top: 10px; left: 10px" onmousedown="javascript:preDragFieldForConnection(this)" draggable="false"/>'+

	'<p onmousedown="javascript:preDragFieldForConnection(this)" draggable="false" id="user_name_'+incrementalId+'_'+widgetId+
	'" style="position: relative; top: -45px; left: 60px; font-size:18px; font-family: sans "><b>'+userName+'</b></p>'+

	'<img  onmousedown="javascript:clickOnFriendToogle(this)" id="toogle_friends_'+incrementalId+'_'+widgetId+'" src="'+toogleSrc+'" style="position: relative; top: -62; left:184; width:16"/>'+

	'</div>');
}

function preDragFieldForConnection(element) {
	
	console.log('element.id trovato ' +element.id);
	
	var arrayId = element.id.split('_');
	console.log(arrayId);
	var elementId = '';
	for(var i = 0; i < arrayId.length; i++) {
		
		if(i == arrayId.length -2) {
			
		}else {
			elementId = elementId+arrayId[i]+'_';
		}
		
		
		
	}
	
	elementId = elementId.slice(0, - 1); //copia il valore
	
	//dobbiamo creare un elemento invisibile a cui assegniamo questo id
	//e lo posizioniamo nello stesso punto del mouse
	
	var dummyField = document.createElement("img");
	dummyField.setAttribute('src','img/blue_rect.png');

	dummyField.setAttribute('id',elementId);
	document.body.appendChild(dummyField);
	
	//e lo posizioniamo
	var fieldRect = element.getBoundingClientRect();
	var bodyRect = document.body.getBoundingClientRect();

	dummyField.style.position = 'absolute';
	dummyField.style.top = fieldRect.top - bodyRect.top;
	dummyField.style.left = fieldRect.left - bodyRect.left;
	
	
	dragFieldForConnection(document.getElementById(elementId));
	
	//eliminiamo l'elemento grafico invisible
	//forse può essere fatto qui
	document.getElementById(elementId).parentNode.removeChild(document.getElementById(elementId));
	
}

function clickOnFriendToogle(element){
	
	//indice 2 è il widgetId mentre il 3 il wfElements
	var widgetId = element.id.split('_')[3];
	var wfElementIndex = element.id.split('_')[2];
	
	//viene mostrato il tasto di conferma
	makeVisible(document.getElementById('executeOp_000_'+widgetId));
	widgetElementList[widgetElementListMap[widgetId]].op[0].confermed = false;
	widgetElementList[widgetElementListMap[widgetId]].op[0].processed = false;
	
	//viene recuperato l'attuale valore della selected
	var valueOfSel = widgetElementList[widgetElementListMap[widgetId]].wfElements[wfElementIndex].elementSelected;
	
	//viene modificato il src del toogle
	widgetElementList[widgetElementListMap[widgetId]].wfElements[wfElementIndex].elementSelected = !valueOfSel;
	
	if(valueOfSel) {
		element.src="img/img/toogleOff.png";
		widgetElementList[widgetElementListMap[widgetId]].numOfElementSelected--;
	}else {
		element.src="img/img/toogleOn.png";
		widgetElementList[widgetElementListMap[widgetId]].numOfElementSelected++;
	}
	
	
}