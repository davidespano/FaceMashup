<html xmlns="http://www.w3.org/1999/xhtml" lang="it-IT">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>work area</title>

<script src="generic_widget_body.widget.js"></script>
<script src="popup.js"></script>
<script src="photo.widget.js"></script>
<script src="date.widget.js"></script>
<script src="text.widget.js"></script>
<script src="video.widget.js"></script>
<script src="tagger.widget.js"></script>
<script src="place.widget.js"></script>
<script src="profile.widget.js"></script>
<script src="friends.widget.js"></script>
<script src="posts.widget.js"></script>
<script src="script/facebookLogin.js"></script>
<script src="script/draggedGraphicalField.js"></script>
<script src="script/dragFieldForConnection.js"></script>
<script src="script/startComputation.js"></script>
<script src="script/sticker/stickerStruct.js"></script>
<script src="script/insertNewWidget.js"></script>
<script src="script/emphasizeWidget.js"></script>
<script src="script/showLoadSavePopup.js"></script>
<script src="script/mouseUp.js"></script>
<script src="script/addOp.js"></script>
<script src="script/userSelectorOp.js"></script>
<script src="script/matchFieldOp.js"></script>
<script src="script/showErrorPopup.js"></script>
<script src="script/showPostWidgetContent.js"></script>
<script src="script/confermPostOperation.js"></script>
<script src="script/positionElement.js"></script>
<script src="script/undo_redo.js"></script>
<script type="text/javascript" src="script/jshashtable-3.0.js"></script>
<script type="text/javascript" src="script/jshashset-3.0.js"></script>


<meta name="generator" content="HAPedit 3.1">
<style type="text/css">
.input_div {
	overflow-y: scroll;
	width: 725px;
	height: 60px;
}

.small_div {
	overflow-y: scroll;
	width: 400px;
	height: 90px;
}

.input_element_div {
	background-image: url(img/inputElementBox.png);
	background-size: cover;
	background-repeat: no-repeat;
	float: left;
	width: 161px;
	height: 57px;
}

.friend_box_element_div {
	background-image: url(img/friend_box.png);
	background-size: cover;
	background-repeat: no-repeat;
	float: left;
	margin: 10px 10px 0px;
	width: 214px;
	height: 64px;
}

.rotate_-5 {
	width: 160;
	height: 200;
	-webkit-transform: rotate(-5deg);
	-moz-transform: rotate(-5deg);
	-o-transform: rotate(-5deg);
	-ms-transform: rotate(-5deg);
	transform: rotate(-5deg);
}

.rotate_10 {
	width: 160;
	height: 200;
	-webkit-transform: rotate(10deg);
	-moz-transform: rotate(10deg);
	-o-transform: rotate(10deg);
	-ms-transform: rotate(10deg);
	transform: rotate(10deg);
}

.rotate_5 {
	width: 160;
	height: 200;
	-webkit-transform: rotate(5deg);
	-moz-transform: rotate(5deg);
	-o-transform: rotate(5deg);
	-ms-transform: rotate(5deg);
	transform: rotate(5deg);
}

*.unselectable {
	-moz-user-select: none;
	-khtml-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.nowrap {
	white-space: nowrap;
}

textarea {
	resize: none;
}

.text_area_sticker {

	resize: none;
	font-size: 30pt;
	font-family: sans;

}

.div_posts_status_text {
	height: 70px;
	width: 600px;
	overflow-y: scroll;
	overflow-x: hidden;

}

.div_popup_bg {
	background-image: url(img/popup_bg.png);
	background-size: cover;
	background-repeat: no-repeat;
	width: 700px;
	height: 450px;
}

.error_popup_bg {
	background-image: url(img/errorPopup.png);
	background-size: cover;
	background-repeat: no-repeat;
	width: 1082px;
	height: 620px;
}

.ok_popup_bg {
	background-image: url(img/okPopup.png);
	background-size: cover;
	background-repeat: no-repeat;
	width: 1082px;
	height: 620px;
}

.load_popup_bg {
	background-image: url(img/load_save_popup/loadPopup.png);
	background-size: cover;
	background-repeat: no-repeat;
	width: 1082px;
	height: 620px;
}

.save_popup_bg {
	background-image: url(img/load_save_popup/savePopup.png);
	background-size: cover;
	background-repeat: no-repeat;
	width: 1082px;
	height: 620px;
}

.error_inner_popup {
	height: 300px;
	width: 400px;
}

.div-popup-inner {
	overflow: auto;
	height: 250px;
	width: 500px;
}

.div-popup-element {
	background-image: url(img/popup_element_bg.png);
	height: 30px;
	width: 400px;
	clear: both;
}

.left_p {
	float: left;
	width: 200px;
}

.right_p {
	float: left;
	width: 200px;
}

.blue_rect {
	border: 1px solid #00c5ff;
}

.div_widget_bg {
	background-image: url(img/widget_body/widget_bg.png);
	background-size: cover;
	background-repeat: no-repeat;
	width: 500px;
	height: 450px;
}

@font-face {
	font-family: 'sans';
	src: url('font/sans.eot');
	src: local('sans'), url('font/sans.ttf') format('truetype');
}

.div-widget-inner {
	overflow: auto;
	height: 400px;
	margin: 0px 30px 30px;
}

.div_prebody_bg {
	background-image: url(img/widget_body/circle.png);
	background-repeat: repeat;
	height: 85px;
}

.div_widget_body_bg {
	background-image: url(img/widget_body/widget_inner_bg.png);
	background-repeat: no-repeat;
	margin: 10px 15px 0px;
	height: 300px;
}

div.custom_form {
	background-image: url(img/widget_body/input_text_bg.png);
	background-repeat: no-repeat;
}

div.custom_form input {
	background-color: #cecece;
	border: none;
	font-size: 18px;
	margin: 0px 10px 0px;
}

div.widget_body {
	width: 500px;
}

.div_widget_bg {
	background-image: url(img/widget_body/widget_bg.png);
	background-repeat: no-repeat;
	width: 526;
	height: 422;
}

div.box {
	float: left;
	width: 300px;
	background-color: #f2f2f2;
	position: fixed;
}

div.output-box {
	float: left;
	width: 600px;
	height: 0px;
	background-color: #f2f2f2;
	position: fixed;
}

div.box-header {
	width: 300px;
	height: 45px;
	margin: -20px 0px 0px;
	bottom: 0px;
}

div.box-inner {
	width: 300;
	overflow: auto;
	margin: 30px 0px 0px;
	padding-right: 0px;
	padding-top: 0px;
	background-color: #f2f2f2;
}

div.output-box-inner {
	height: 200px;
	overflow: auto;
	margin: 5px 25px 0px;
	background-color: #f2f2f2;
}

.image {
	margin: 0 auto;
	display: block;
}

.div_photo_widget_body_bg {
	background-image: url(img/widget_body/widget_inner_bg.png);
	background-size: 730px 245px;
	background-repeat: no-repeat;
	margin: 15px 4px 0px;
	height: 250px;
	width: 730px;
}

.div-photo-widget-inner {
	overflow: auto;
	height: 350px;
	width: 735px;
	margin: 0px 30px 30px;
}

.div_photo_widget_bg {
	background-image: url(img/widget_body/big_widget_bg.png);
	background-size: 100% 100%;
	background-repeat: no-repeat;
	overflow: hidden;
	width: 800px;
	height: 450px;
}

.div_friends_widget_bg {
	background-image: url(img/widget_body/big_widget_bg.png);
	background-size: 100% 100%;
	background-repeat: no-repeat;
	overflow: hidden;
	width: 800px;
	height: 450px;
}

.div-friends-widget-inner {
	overflow: auto;
	height: 350px;
	width: 735px;
	margin: 0px 30px 30px;
}

.div_friends_widget_body_bg {
	background-image: url(img/widget_body/widget_inner_bg.png);
	background-size: 730px 250px;
	background-repeat: no-repeat;
	margin: 15px 0px 0px;
	height: 250px;
	width: 730px;
	overflow-y: scroll;
	overflow-x: hidden;
}

.div_post_widget_bg {
	background-image: url(img/widget_body/big_widget_bg_yellow.png);
	background-size: 100% 100%;
	background-repeat: no-repeat;
	overflow: hidden;
	width: 800px;
	height: 450px;
}

.selectClass {
	font-size: 18px;
}

.br {
	display: block;
	margin: 2px 0;
}
​
</style>



</head>


<body bgcolor="#E9EAED"
	onmouseover="javascript:mouseOverBody(true)"
	onmouseout="javascript:mouseOverBody(false)"
	onmouseup="javascript:mouseUp()"
    onbeforeunload="javascript:closeWin()" 
	onscroll="javascript:set_boxes_height()"
	onmousemove="javascript:draggedMouseMove(this)" unselectable="on"
	onload="addStep()"
	class="unselectable">




	<div class="box-header" id="box_header_down"
		onmouseover="javascript:mouseOverBox(true)"
		onmouseout="javascript:mouseOverBox(false)">
		<img onclick="javascript:clickOnWidgetBoxButton()"
			id="_logo_img" src="img/widget_compact.png" width='80%'
			height='auto' />
	</div>

	<div class="box-header" id="box_output_header_down"
		onmouseover="javascript:mouseOverBox(true)"
		onmouseout="javascript:mouseOverBox(false)">
		<img onclick="javascript:clickOnOutputBoxButton()"
			id="output_logo_img" src="img/stickers_compact.png" width='80%'
			height='auto' />
	</div>


	<div id="widget_box" class="box"
		onmouseover="javascript:mouseOverBox(true)"
		onmouseout="javascript:mouseOverBox(false)">

		<p>
		<div class="box-header" id="box_header">
			<p class="image">
				<img onclick="javascript:clickOnWidgetBoxButton()"
					id="widget_logo_img" src="img/widget_compact.png" width='80%'
					height='auto' />
			</p>
			<p class="image">
				<img id="_hor_bar_img" src="img/hor_bar.png" width='100%'
					height='auto' />
			</p>

		</div>
		</p>



		<p>
		<div id="inner_box" class="box-inner"> 
			<img onmousedown="javascript:downOnWidget('login')" id="login_widget"
				src="img/widget logo/login.png" width='49%' onclick="" height='auto'
				draggable="false" /> <img
				onmousedown="javascript:downOnWidget('profile')" id="profile_widget"
				src="img/widget logo/profile.png" width='49%' height='auto'
				draggable="false" /> <img
				onmousedown="javascript:downOnWidget('friends')" id="friends_widget"
				src="img/widget logo/friends.png" width='49%' height='auto'
				draggable="false" /> <img
				onmousedown="javascript:downOnWidget('photos')" onclick=""
				id="photos_widget" src="img/widget logo/photos.png" width='49%'
				height='auto' draggable="false" /> <img
				onmousedown="javascript:downOnWidget('video')" onclick=""
				id="video_widget" src="img/widget logo/video.png" width='49%'
				height='auto' draggable="false" /> <img
				onmousedown="javascript:downOnWidget('posts')" onclick=""
				id="posts_widget" src="img/widget logo/posts.png" width='49%'
				height='auto' draggable="false" /> <img
				onmousedown="javascript:downOnWidget('date')" onclick=""
				id="date_widget" src="img/widget logo/date.png" width='49%'
				height='auto' draggable="false" /> <img
				onmousedown="javascript:downOnWidget('text')" onclick=""
				id="text_widget" src="img/widget logo/text.png" width='49%'
				height='auto' draggable="false" /> <img
				onmousedown="javascript:downOnWidget('place')" id="place_widget"
				src="img/widget logo/place.png" width='49%' height='auto'
				draggable="false" /> <img
				onmousedown="javascript:downOnWidget('tagger')" onclick=""
				id="tagger_widget" src="img/widget logo/tagger.png" width='49%'
				height='auto' draggable="false" />
				
				

		</div>
		</p>
	</div>



	<div id="output_box" class="output-box"
		onmouseover="javascript:mouseOverBox(true)"
		onmouseout="javascript:mouseOverBox(false)">




		<p>
		<div class="box-header" id="output_box_header">
			<p class="image">
				<img onclick="javascript:clickOnOutputBoxButton()"
					id="output_logo_img" src="img/stickers_expanse.png" width='80%'
					height='auto' />
			</p>
			<p class="image">
				<img id="output_hor_bar_img" src="img/hor_bar.png" />
			</p>

		</div>
		</p>

		<p>
		<div id="output_inner_box" class="output-box-inner">
			<!--<p>TESTO DI OUTPUT: ${servletInfo}</p>-->
			
		<img onmousedown="javascript:downOnSticker(this)" id="s000" 
				src="img/stickers/s000.png" width='5%' onclick="" height='auto'
				draggable="false" /> <img
				onmousedown="javascript:downOnSticker(this)" id="s001"
				src="img/stickers/s001.png" width='5%' height='auto'
				draggable="false" /> <img
				onmousedown="javascript:downOnSticker(this)" id="s002"
				src="img/stickers/s002.png" width='5%' height='auto'
				draggable="false" /> <img
				onmousedown="javascript:downOnSticker(this)" onclick=""
				id="s003" src="img/stickers/s003.png" width='5%'
				height='auto' draggable="false" />
				
				<img onmousedown="javascript:downOnSticker(this)" id="s004"
				src="img/stickers/s004.png" width='5%' onclick="" height='auto'
				draggable="false" /> <img
				onmousedown="javascript:downOnSticker(this)" id="s005"
				src="img/stickers/s005.png" width='5%' height='auto'
				draggable="false" /> <img
				onmousedown="javascript:downOnSticker(this)" id="s006"
				src="img/stickers/s006.png" width='3%' height='auto'
				draggable="false" /> <img
				onmousedown="javascript:downOnSticker(this)" onclick=""
				id="s007" src="img/stickers/s007.png" width='3%'
				height='auto' draggable="false" />
				
				<img onmousedown="javascript:downOnSticker(this)" id="s008"
				src="img/stickers/s008.png" width='5%' onclick="" height='auto'
				draggable="false" /> <img
				onmousedown="javascript:downOnSticker(this)" id="s009"
				src="img/stickers/s009.png" width='5%' height='auto'
				draggable="false" /> <img
				onmousedown="javascript:downOnSticker(this)" id="s010"
				src="img/stickers/s010.png" width='5%' height='auto'
				draggable="false" /> <img
				onmousedown="javascript:downOnSticker(this)" onclick=""
				id="s011" src="img/stickers/s011.png" width='5%'
				height='auto' draggable="false" />
				
				<img onmousedown="javascript:downOnSticker(this)" id="s012"
				src="img/stickers/s012.png" width='5%' onclick="" height='auto'
				draggable="false" /> <img
				onmousedown="javascript:downOnSticker(this)" id="s013"
				src="img/stickers/s013.png" width='5%' height='auto'
				draggable="false" /> <img
				onmousedown="javascript:downOnSticker(this)" id="s014"
				src="img/stickers/s014.png" width='5%' height='auto'
				draggable="false" /> <img
				onmousedown="javascript:downOnSticker(this)" onclick=""
				id="s015" src="img/stickers/s015.png" width='5%'
				height='auto' draggable="false" />
				
		</div>
		</p>
	</div>


	<script src="http://code.jquery.com/jquery-latest.js"></script>
	<script type="text/javascript" language="JavaScript"
		charset="iso-8859-1">
		//LISTA CONTENENTE IL WIDEGTID DELL'ELEMENTO GRAFICO E L'OGGETTO DEL  STESSO CONTENENTE TUTTE LE PRORPIETA' E FUNZIONI DEL  STESSO
		var appLoaded = true;
		
		var widgetElementList = [];
		var widgetElementListMap = [];
		
		var stickerElementList = [];
		var stickerElementListMap = [];
		
		var positionList = [];

		var userIsLogin = false;

		var operationUniqueId = 0;

		var dragAndDropInText = ' trascina su un widget compatibile';

		var draggedFieldIdForConnection = '-1';

		var usersHasChangedSomeInput = false;

		var systemPause = false;
		var yetCalled = false; //indica se è in corso una chiamata alla servlet

		var widget_box_visible = false;
		var output_box_visible = false;

		var mouseOverBodyBool = false;
		var mouseOverBoxBool = true;

		var widgetRelasedOnWork = false;

		var zIndexInt = 0;

		//contengono gli id reali (o,1,2...) dei  su cui si trova il mouse
		var previousWidgetMouseOver = '-1';
		var currentWidgetMouseOver = '-1';

		var widgetDownName = 'null';
		var widgetId = 0;
		var stickerId = 0;
		var draggedWidget = null;
		var widgetOriginalX = 0;
		var widgetOriginalY = 0;
		var mouseOriginalClickX = 0;
		var mouseOriginalClickY = 0;

		// Temporary variables to hold mouse x-y pos.s
		var tempX = 0;
		var tempY = 0;
		var originalX = 0;
		var originalY = 0;

		var shiftKeyDown = false;
		var ctrlKeyDown = false;

		var tmpFieldConnectioId = 0;
		var fieldConnectionId = 0;

		var tmpWidgetConnectionId = 0;
		var widgetConnectionId = 0;

		//contiene tutti i collegamenti tra i vari 
		var connectedList = [];

		//contiene per ogni elemento grafico di selezione l'id corrispondente al fieldID del wf dell'elemento grafico
		var graphicalConnectedList = [];

		//contiene l'id grafico dell'elemento e il relativo id del  a cui fa riferimento
		var graphicalWidgetConnectedList = [];

		//contiene tutti i  che hanno un inputType cmpatibile con il type di draggedFieldIdForConnection
		var listOfAllowedWidget = [];

		//contiene tutti i field dei  che hanno un input type della op cpmpatibile. Usato per i  di post
		var listOfAllowedOp = [];

		//elemento che viene creato quando l'utente clicca su field ed eliminato quando mouseUp
		var draggedGraphicalField;
		var orginalTopOfDraggedGraphicalField;
		var orginalLeftOfDraggedGraphicalField;

		var draggedStickerFlag = false;
		
		//restituisce img o text in base al typeOfField
		function getTypeOfField(typeOfField) {

			if (typeOfField == '001' || typeOfField == '002'
					|| typeOfField == '003' || typeOfField == '006'
					|| typeOfField == '007' || typeOfField == '008'
					|| typeOfField == '009' || typeOfField == '013') {
				return 'text';
			} else
				return 'img';

		}

		function mouseOverThisWidget(element) {
			//estrapoliamo l'id dall'elemento e eliminiamo la prima parte per ottenre l'id in ElementList (ultima parte)
			var wholeId = element.id;
			var realId = wholeId.split('_').pop();

			if (element.id.indexOf("Widget") > -1 || element.id.indexOf("widget") > -1) {

				currentWidgetMouseOver = realId;

				if (currentWidgetMouseOver != previousWidgetMouseOver) {

					previousWidgetMouseOver = currentWidgetMouseOver;

					//scorriamo tutta la ElementList per modificare i valori di mouseOverOnThis
					for ( var i = 0; i < widgetElementList.length; i++) {

						if (widgetElementList[i].widgetId == realId) {
							widgetElementList[i].mouseOverThisWidget = true;
						} else {
							widgetElementList[i].mouseOverThisWidget = false;
						}

					}

				}

			} else {
				//non sono sopra un widget ma sopra un putInFIeld
				currentWidgetMouseOver = 'field_' + element.id.split('_')[1]
						+ '_' + element.id.split('_')[2] + '_' + realId;

			}

		}

		function mouseOutThisWidget(element) {

			//estrapoliamo l'id dall'elemento e eliminiamo la prima parte per ottenre l'id in widgetElementList (ultima parte)
			var wholeId = element.id;
			var realId = wholeId.split('_').pop();

			previousWidgetMouseOver = '-1';
			currentWidgetMouseOver = '-1';

			widgetElementList[widgetElementListMap[parseInt(realId)]].mouseOverThisWidget = false;

		}

		function showConnectedElementOp(element) {

			//l'unica cosa di cui abbiamo bisogno e' l'id del widget di appartenenza.
			//Dopo di che infatti basterà entrare nelle sue op per ottenere la lista dei field

			var widgetId = element.id.split('_').pop();

			//creazione id per chiamare showConnectedElement
			//che è nella forma input-widgetId-widgetIdInput-field

			for ( var opIndex = 0; opIndex < widgetElementList[widgetElementListMap[widgetId]].op.length; opIndex++) {

				var inputField = '';
				
				for(var fieldIndex = 0; fieldIndex < 2; fieldIndex++) {
					
					if(fieldIndex == 0) {
						inputField = widgetElementList[widgetElementListMap[widgetId]].op[opIndex].fieldAId;
					}else {
						inputField = widgetElementList[widgetElementListMap[widgetId]].op[opIndex].fieldBId;
					}
					
					if (inputField != '') {

						var parameter = 'input-' + widgetId + '-'
								+ inputField.split('_').pop() + '-' + inputField;

						console.log('visualizzo ' +inputField);
						showConnectedElement(parameter, 'append');

					}
				}

			}

		}

		//resituisce l'indice della wf in cui si trova questo determinato elementId
		function getWfIndex(elementId) {

			var widgetId = elementId.split('_').pop();

			var wfIndex = -1;

			console.log('cerco indice wf di  ' +elementId);
			
			for ( var i = 0; i < widgetElementList[widgetElementListMap[widgetId]].widgetObject.wf.length; i++) {

				if (widgetElementList[widgetElementListMap[widgetId]].widgetObject.wf[i].elementId == elementId) {
					wfIndex = i;
					break;
				}

			}

			return wfIndex;

		}

		//l'utente ha cliccato su un elemento grafico di connessione.
		function showConnectedElement(element, type) {

			var elementId = '';
			var widgetId = '';
			var widgetDest = '';
			var fieldId = '';

			if (!systemPause || type == 'append') {

				elementId = element.id;

				if (elementId == undefined) {
					elementId = element;
				}

				//se systemPause = true allora il popup è giù visible

				if (!systemPause) {

					//viene mostrato il popup
/* 					document.body.innerHTML = loadPopupWindow(elementId, type)
							+ document.body.innerHTML; */
					
					$('body').append(loadPopupWindow(elementId, type));

					document.getElementById('popup_body').style.position = 'absolute';
					document.getElementById('popup_body').style.left = (document.body.clientWidth / 2)
							- (document.getElementById('popup_body').clientWidth / 2)
							+ document.body.scrollLeft;
					document.getElementById('popup_body').style.top = (document.body.clientHeight / 2)
							- (document.getElementById('popup_body').clientHeight / 2)
							+ document.body.scrollTop;
					document.getElementById('popup_body').style.zIndex = 100000;

				}

				var popupInner = document.getElementById('popup_inner');

				//mostriamo gli elementi presenti nella wfElements della ElementList da cui abbiamo preso l'input
				//e che hanno elementId uguale
				widgetId = elementId.split('_').pop();
				widgetDest = elementId.split('-')[1];
				fieldId = elementId.split('-').pop();

				// trovato. Entriamo nella sua wfElements e, per ciascun elemento selezionato globalmente e selezionato
				//per quel determinato Dest, inseriamo il riferimento all'interno del popup

				var i = widgetElementListMap[parseInt(widgetId)];

				var wfIndex = getWfIndex(fieldId);

				for ( var j = 0; j < widgetElementList[i].wfElements.length; j++) {

					if (widgetElementList[i].wfElements[j].elementSelected) {
						//l'elemento è globalmente selezionato.

						//cerchiamo l'elemento con elementId uguale

						var isSelected = false;
						//elemento trovato. Controlliamo se è selezionato per il nostro Dest
						for ( var x = 0; x < widgetElementList[i].wfElements[j].wf[wfIndex].selectedForConnection.length; x++) {

							if (widgetElementList[i].wfElements[j].wf[wfIndex].selectedForConnection[x].widgetDest == widgetDest) {
								isSelected = widgetElementList[i].wfElements[j].wf[wfIndex].selectedForConnection[x].selected;
								break;
							}

						}

						popupInner.innerHTML = popupInner.innerHTML
								+ getElement(
										j,
										elementId,
										getTypeOfField(widgetElementList[i].wfElements[j].wf[wfIndex].fieldType),
										widgetElementList[i].wfElements[j].wf[wfIndex].graphicalValue,
										i, isSelected);

					}

				}

				systemPause = true;

			}

		}

		function deleteConnection(element, type) {

			//eliminazione elemento
			//dentro elementId abbiamo input-Dest-id-field

			var widgetDest = element.id.split('-')[2];
			var field = element.id.split('-').pop();
			var connectedIndex = -1;

			//controlliamo il type. Se è main  connection allora il collegamento 
			//riguarda un classico elemento con un . Se invece non lo è allora il collegamento
			//riguarda un campo di un  con un field non main del  di POST.
			//l'eliminazione in questo ultimo caso viene eseguita cancellando tutte le op all'interno del  stesso

			if (type == 'main widget connection') {

				//si cerca nella connectedList il Dest
				for ( var i = 0; i < connectedList.length; i++) {

					if (connectedList[i].widgetDest == widgetDest) {

						connectedIndex = i;

						//trovato. Ora scorriamo al sua inputElements alla ricerca del field per eliminarlo
						for ( var j = 0; j < connectedList[i].inputElements.length; j++) {

							if (field
									.indexOf(connectedList[i].inputElements[j]) > -1) {

								//field trovato.
								//eseguiamo l'eliminazione del collegamento
								connectedList[i].inputElements.splice(j, 1);

								breakConnection(i);
								break;
								break;
							}

						}

					}

				}

				boxField = element.id.replace('buttonDeleteConnection-', '');
				boxField = boxField.replace(' ', '');

				//si recupera l'uniqueId del boxField
				var uniqueId = parseInt(boxField.split('-')[2]);

				console.log(boxField);

				//eliminazione del text interno al box
				document.getElementById('text-' + boxField).parentNode
						.removeChild(document
								.getElementById('text-' + boxField));

				//eliminazione del box
				document.getElementById(boxField).parentNode
						.removeChild(document.getElementById(boxField));

				//dobbiamo modificare gli ID di tutti gli input element del widget stesso successivi all'uniqueId!!!
				//si recuperano quindi tutti gli id degli elementi grafici he rappresentano gli elementi in ingresso del 
				var ids = $('[id^="input-' + widgetDest + '-"]');

				for ( var i = 0; i < ids.length; i++) {

					var thisUniqueId = ids[i].id.split('-')[2];
					if (thisUniqueId > uniqueId) {

						var newId = 'input-' + widgetDest + '-'
								+ (thisUniqueId - 1) + '-'
								+ ids[i].id.split('-').pop();
						var idsId = ids[i].id;
						document.getElementById(idsId).id = newId;
						document.getElementById('text-' + idsId).id = 'text-'
								+ newId;
					}
				}

			} else {

				var firstOp = widgetElementList[widgetElementListMap[widgetDest]].op[0];
				firstOp.fieldAId = '';
				firstOp.fieldBId = '';

				widgetElementList[widgetElementListMap[widgetDest]].op = [];
				widgetElementList[widgetElementListMap[widgetDest]].op
						.push(firstOp);

			}
			
			makeConnection(widgetDest);

			startComputation();

			closePopup();

		}

		function changeFieldConnection(element, indexInWidgetElementList) {

			usersHasChangedSomeInput = true;

			//l'id dell'elemento è del tipo deleteElementId-{posizioneNellaWfElements}-input-{widgetDest}-{idUnivoco}-fieldDiRiferimento_widgetId

			var wfElementsIndex = element.id.split('-')[1];
			var field = element.id.split('-').pop();
			var widgetDest = element.id.split('-')[3];

			for ( var wfIndex = 0; wfIndex < widgetElementList[indexInWidgetElementList].wfElements[wfElementsIndex].wf.length; wfIndex++) {

				if (field
						.indexOf(widgetElementList[indexInWidgetElementList].wfElements[wfElementsIndex].wf[wfIndex].elementId) > -1) {

					//elemento trovato. Si mette a false il campo della selectedElement riferita al widgetDest
					for ( var selectedElementIndex = 0; selectedElementIndex < widgetElementList[indexInWidgetElementList].wfElements[wfElementsIndex].wf[wfIndex].selectedForConnection.length; selectedElementIndex++) {

						if (widgetElementList[indexInWidgetElementList].wfElements[wfElementsIndex].wf[wfIndex].selectedForConnection[selectedElementIndex].widgetDest == widgetDest) {

							widgetElementList[indexInWidgetElementList].wfElements[wfElementsIndex].wf[wfIndex].selectedForConnection[selectedElementIndex].selected = !widgetElementList[indexInWidgetElementList].wfElements[wfElementsIndex].wf[wfIndex].selectedForConnection[selectedElementIndex].selected;
							//modifica elemento visuale

							if (widgetElementList[indexInWidgetElementList].wfElements[wfElementsIndex].wf[wfIndex].selectedForConnection[selectedElementIndex].selected) {

								element.innerHTML = 'elimina elemento';
							} else {
								element.innerHTML = 'ripristina elemento';
							}

						}

					}

				}

			}
			
			/////////////////////////////////////////////////////////////
			//devono essere modificate anche le operazioni che utilizzano questo widget come input
			//quindi dobbiamo scorrere tutte le op di tutti i widget diversi da quello attuale e cercare se qualcuno usa
			//tale widget come input
			var idOfWidgetEdited = widgetDest;
			for(var i = 0; i < widgetElementList.length; i++){
				
				if(widgetElementList[i].widgetId != idOfWidgetEdited) {
					console.log('esaminoooooo il widget ' + widgetElementList[i].widgetId);
					
					var breakOp = false;
					//scorriamo le sue operazioni per vedere se qualcuna di esse usava un elemento del widget che non è stato modificato
					for(var opIndex = 0; opIndex < widgetElementList[i].op.length; opIndex++) {
						console.log('esamino op ' + opIndex);
						if(breakOp) {
							//ElementList[i].op[opIndex].confermed = false;
							widgetElementList[i].op[opIndex].processed = false;
							//mostriamo il tasto di conferma
							makeVisible(document.getElementById('executeOp_' + widgetElementList[i].op[opIndex].opId));
						}
						
						console.log('confronto tra ' + widgetElementList[i].op[opIndex].fieldBId.split('_').pop() +' e ' + idOfWidgetEdited);
						
						if(widgetElementList[i].op[opIndex].opId.indexOf('001_') > -1 && widgetElementList[i].op[opIndex].fieldBId.split('_').pop() == idOfWidgetEdited) {
							console.log('op non mai piu confermed');
							//questa operazione dev'essere eseguita di nuovo e anche confermata di nuovo
							//ElementList[i].op[opIndex].confermed = false;
							widgetElementList[i].op[opIndex].processed = false;
							breakOp = true;
							
							//mostriamo il tasto di conferma
							makeVisible(document.getElementById('executeOp_' + widgetElementList[i].op[opIndex].opId));
							
						}

					}
					
					
				}
			}
			

			for ( var i = 0; i < connectedList.length; i++) {

				if (connectedList[i].widgetDest == widgetDest) {

					breakConnection(i);

					break;
				}

			}

		}

		function closePopup() {

			if (usersHasChangedSomeInput) {
				usersHasChangedSomeInput = false;
				startComputation();

			}

			document.getElementById('popup_body').parentNode
					.removeChild(document.getElementById('popup_body'));

			systemPause = false;

		}

		function removeTmpFieldConnection() {

			for ( var i = 0; i < tmpFieldConnectioId; i++) {

				console.log(' cerco di eliminare fieldConnectedId' + i);
				(document.getElementById('fieldConnectedId' + i).parentNode)
						.removeChild(document.getElementById('fieldConnectedId'
								+ i));

			}

			tmpFieldConnectioId = 0;

		}

		function removeTmpWidgetConnection() {

			for ( var i = 0; i < tmpWidgetConnectionId; i++) {

				(document.getElementById('widgetConnectedId' + i).parentNode)
						.removeChild(document
								.getElementById('widgetConnectedId' + i));

			}

			tmpWidgetConnectionId = 0;

		}

		function initButton(element) {
			element.onclick = function() {
				var cb = function(response) {
					console.log('FB.login callback', response);
					if (response.status === 'connected') {
						console.log('User logged in');
						userIsLogin = true;

						//recupero l'id del button premuto
						var buttonId = element.id;

						//processo l'id per elimare la parte relativa al loginButton in modo da ottenere soltanto l'id in int.
						var objectId = buttonId.split('_').pop();
						//prelevo dalla lista dei widget l'object relativo al'id ottenuto

						var objectOfWidgetPosition = widgetElementListMap[objectId];

						//recupero le informazioni dell'utente e avvio la computazione
						getUserInfo(objectOfWidgetPosition,
								response.authResponse.accessToken);

					} else {
						console.log('User is logged out');
					}
				};
				FB.login(cb, {
					scope : 'public_profile, email, user_friends,user_birthday,user_likes,user_photos,user_relationships,user_status,user_tagged_places,user_videos'
				});
			};
		}

		$("body").mousemove(function(e) {
			tempX = e.pageX;
			tempY = e.pageY;
		})

		

		
		
					
					
					
		
					
					
					

		

		
		
		

		
		
		
					
		
					
		function classWidgetFriends(widgetId) {

			var i = 0;

			this.type = 'LIST friends widget';
			this.inputType = [ '001', '008', '011' ];

			this.wf = [
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : 'img/widget_body/user_picture.png',
						fieldType : '011',
						fieldName : 'Foto del profilo',
						fieldPath : '/-id',
						fieldSelect : true,
						elementId : 'user_picture_' + widgetId,
						valueId : '',
						fieldGraphicalPath : '',
						graphicalValue : '',
						selectedForConnection : []

					},

					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : 'Nome Utente',
						fieldType : '001',
						fieldName : 'Nome della persona',
						fieldPath : '/-id',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '/-name',
						graphicalValue : '',
						elementId : 'user_name_' + widgetId,
						selectedForConnection : []
					}, ];

		}


		function mouseOverBox(flag) {
			mouseOverBoxBool = flag;
		}
		
		
		var draggedSticker = null;
		
		function downOnSticker(element) {
			
			if(!systemPause) {
				
				//l'utente ha cliccato sullo sticker name
				widgetRelasedOnWork = false;

				draggedSticker = element;
				
				//mostrare elemento grafico trasportato
				var graphicalElement = document.createElement("img");
				graphicalElement.setAttribute('src', 'img/stickers/'+element.id+'.png');
				graphicalElement.setAttribute('id', 'draggedStickerId');
				graphicalElement.setAttribute('draggable', 'false');

				
				var fieldRect = element.getBoundingClientRect();
				var bodyRect = document.body.getBoundingClientRect();

				document.body.appendChild(graphicalElement);

				graphicalElement.style.position = 'absolute';
				graphicalElement.style.top = fieldRect.top - bodyRect.top;
				graphicalElement.style.left = fieldRect.left - bodyRect.left;
				graphicalElement.style.zIndex = 100000;
				
				graphicalElement.style.width = element.clientWidth;
				graphicalElement.style.height = element.clientHeight;

				orginalTopOfDraggedGraphicalField = fieldRect.top - bodyRect.top;
				orginalLeftOfDraggedGraphicalField = fieldRect.left - bodyRect.left;

				mouseOriginalClickX = tempX;
				mouseOriginalClickY = tempY;
				
			}
			
			
			
		}

		function downOnWidget(widgetName) {

			if (!systemPause) {
				
				

				appLoaded = false;

				widgetDownName = widgetName;
				widgetRelasedOnWork = false;

				//mostrare elemento grafico trasportato
				var graphicalElement = document.createElement("img");
				graphicalElement.setAttribute('src', 'img/widget logo/'+widgetName+'.png');
				graphicalElement.setAttribute('id', 'draggedWidgetId');
				graphicalElement.setAttribute('draggable', 'false');

			    var elementWidget = document.getElementById(widgetName+'_widget');
				
				var fieldRect = elementWidget.getBoundingClientRect();
				var bodyRect = document.body.getBoundingClientRect();

				document.body.appendChild(graphicalElement);

				graphicalElement.style.position = 'absolute';
				graphicalElement.style.top = fieldRect.top - bodyRect.top;
				graphicalElement.style.left = fieldRect.left - bodyRect.left;
				graphicalElement.style.zIndex = 100000;
				
				graphicalElement.style.width = elementWidget.clientWidth;
				graphicalElement.style.height = elementWidget.clientHeight;

				orginalTopOfDraggedGraphicalField = fieldRect.top - bodyRect.top;
				orginalLeftOfDraggedGraphicalField = fieldRect.left - bodyRect.left;

				mouseOriginalClickX = tempX;
				mouseOriginalClickY = tempY;
				
				

			}

		}

		//chiamata durante l'aggiornamento dell'input di un  già caricato. Ha come scopo quello di rompere tutti i  che sono stati caricati grazie a esso
		//ricorsivamente e a cascata.
		function breakConnection(index) {

			connectedList[index].processed = false;
			//cerco il widget di destinazione per settarlo a non loaded

			var widgetElementListIndex = widgetElementListMap[parseInt(connectedList[index].widgetDest)];

			//se il widget è di post allora dobbiamo anche visualizzare il contenuto standard
			if (widgetElementList[widgetElementListIndex].widgetObject.type
					.indexOf('POST') > -1) {

				//widget di post
				// si cerca il main element e lo si reinizializza
				for ( var i = 0; i < widgetElementList[widgetElementListIndex].widgetObject.wf.length; i++) {

					if (widgetElementList[widgetElementListIndex].widgetObject.wf[i].elementId
							.indexOf('main') > -1) {

						if (getTypeOfField(widgetElementList[widgetElementListIndex].widgetObject.wf[i].fieldType) == 'img') {

							document
									.getElementById(
											widgetElementList[widgetElementListIndex].widgetObject.wf[i].elementId)
									.setAttribute(
											'src',
											widgetElementList[widgetElementListIndex].widgetObject.wf[i].defaultGraphicalValue);

						} else {
							document
									.getElementById(widgetElementList[widgetElementListIndex].widgetObject.wf[i].elementId).innerHTML = widgetElementList[widgetElementListIndex].widgetObject.wf[i].defaultGraphicalValue;
						}

						break;
					}

				}

			}

			widgetElementList[widgetElementListIndex].loaded = false;

			var userSelector = false;
			//inoltre devono essere processate di nuovo anche tutte le operazioni.
			for ( var opIndex = 0; opIndex < widgetElementList[widgetElementListIndex].op.length; opIndex++) {

				widgetElementList[widgetElementListIndex].op[opIndex].processed = false;

				//l'ìoperazione deve aspettare la conferma da parte dell'utente
				if (widgetElementList[widgetElementListIndex].op[opIndex].opId
						.split('_')[0] == '000') {
					userSelector = true;
				}

				if (userSelector) {
					//tutte le operazioni dalla user selector in poi devono essere di nuovo confermate
					widgetElementList[widgetElementListIndex].op[opIndex].processed.confermed = false;
					//viene mostrato il tasto di conferma
					makeVisible(document
							.getElementById('executeOp_'
									+ widgetElementList[widgetElementListIndex].op[opIndex].opId));

				}

			}
			
			//devono essere modificate anche le operazioni che utilizzano questo widget come input
			//quindi dobbiamo scorrere tutte le op di tutti i widget diversi da quello attuale e cercare se qualcuno usa
			//tale  come input
			var idOfWidgetEdited = widgetElementList[widgetElementListIndex].widgetId;
			for(var i = 0; i < widgetElementList.length; i++){
				
				if(widgetElementList[i].Id != idOfWidgetEdited) {
					console.log('esaminoooooo il  ' + widgetElementList[i].widgetId);
					
					var breakOp = false;
					//scorriamo le sue operazioni per vedere se qualcuna di esse usava un elemento del  che non è stato modificato
					for(var opIndex = 0; opIndex < widgetElementList[i].op.length; opIndex++) {
						console.log('esamino op ' + opIndex);
						if(breakOp) {
							//ElementList[i].op[opIndex].confermed = false;
							widgetElementList[i].op[opIndex].processed = false;
							//mostriamo il tasto di conferma
							makeVisible(document.getElementById('executeOp_' + widgetElementList[i].op[opIndex].opId));
						}
						
						console.log('confronto tra ' + widgetElementList[i].op[opIndex].fieldBId.split('_').pop() +' e ' + idOfWidgetEdited);
						
						if(widgetElementList[i].op[opIndex].opId.indexOf('001_') > -1 && widgetElementList[i].op[opIndex].fieldBId.split('_').pop() == idOfWidgetEdited) {
							console.log('op non più confermed');
							//questa operazione dev'essere eseguita di nuovo e anche confermata di nuovo
							//ElementList[i].op[opIndex].confermed = false;
							widgetElementList[i].op[opIndex].processed = false;
							breakOp = true;
							
							//mostriamo il tasto di conferma
							makeVisible(document.getElementById('executeOp_' + widgetElementList[i].op[opIndex].opId));
							
						}

					}
					
					
				}
				
			}

			//dobbiamo rompere i collegamenti a cascata dei  che usavano il Dest come input
			for ( var i = 0; i < connectedList.length; i++) {

				//si cerca nei loro input
				for ( var j = 0; j < connectedList[i].inputElements.length; j++) {

					if (connectedList[i].inputElements[j].split('_').pop() == connectedList[index].widgetDest) {

						//il widget connectedList[i].Dest ha come inputElement un valore che non è più a loaded perchè appartiene alla connectedList[index].Dest
						//quindi dobbiamo prendere il box grafico input-Dest che hacome pop del field connectedList[index].Dest e metterlo a 0

						var thisId = $('[id ^=text-input-'
								+ connectedList[i].widgetDest + '-' + '][id $='
								+ connectedList[index].widgetDest + ']');

						for ( var idsIndex = 0; idsIndex < thisId.length; idsIndex++) {

							document.getElementById(thisId[idsIndex].id).innerHTML = '<b>0</b>';

						}

						breakConnection(i);

					}

				}

			}

		}

		function removeHighlightField() {
			
		    try{
		    	document.getElementById('hightlighField').parentNode
				.removeChild(document.getElementById('hightlighField'));		
		    }catch(Exception) {
		    	console.log('nessun highlight da eliminare');
		    }
		
			
		}

		function mouseOverThisInputBox(element) {

			if (element == '') {
				return;
			}

			var elementFieldId = '';

			try {

				//si recupera l'id
				var elementId = element.id;

				//id del tipo : input-Dest-idIncrementale-elementIdDelCampoCollegato
				//recuperiamo l'id del field che fa parte del suo input			
				elementFieldId = elementId.split('-').pop();
			} catch (Exception) {

				elementFieldId = element;
			}

			try {

				//creaimo l'elemento di evidenziazione sul 
				var highlightField = document.createElement("img");
				highlightField.setAttribute('src', 'img/blue_rect.png');
				highlightField.setAttribute('id', 'hightlighField');
				document.body.appendChild(highlightField);

				var body = document.body;
				var fieldBody = document.getElementById(elementFieldId);

				var fieldRect = fieldBody.getBoundingClientRect();
				var bodyRect = document.body.getBoundingClientRect();

				highlightField = document.getElementById('hightlighField');

				highlightField.style.position = 'absolute';
				highlightField.style.top = fieldRect.top - bodyRect.top + 10;
				highlightField.style.left = fieldRect.left - bodyRect.left + 10;
				highlightField.style.zIndex = 500;

				highlightField.style.width = fieldBody.clientWidth;
				highlightField.style.height = fieldBody.clientHeight;

			} catch (Exception) {

			}

		}
		
		var prevTmpX = 0;
		var prevTmpY = 0;

		function draggedMouseMove(ev) {

			if (!systemPause) {

				ev = ev || window.event;

				var body = document.body;

				//sto spostando un widget già inserito
				if (draggedWidget != null) {

					draggedWidget.style.position = 'absolute';

					//dobbiamo spostare, se ho modificato la x, anche tutti i widget alla sua destra della differenza tra la posizione orignale e l'attuale
					//mentre se sto modificando la y allora devo spostare in verticale tutti i  successivi alla riga

					if(draggedWidget.id.indexOf('widget') > -1) {
						
						if(widgetOriginalX != widgetOriginalX - (mouseOriginalClickX - tempX - body.scrollLeft)) {

							if(prevTmpX < tempX) {
								//sto spostando a destra
								shiftAllXWidgetOnRight(positionListDraggedWidgetIndex, tempX - mouseOriginalClickX);
							}else if(prevTmpX > tempX){
							
								shiftAllXWidgetOnRight(positionListDraggedWidgetIndex, -(mouseOriginalClickX - tempX));
							}
							
							
						}
						
						if(tempX != prevTmpX) {
							prevTmpX = tempX;
						}
						
						console.log('prevTmp ' +prevTmpY + '  tmpY ' + tempY);
						if(widgetOriginalY != widgetOriginalY - (mouseOriginalClickY - tempY - body.scrollTop)) {

							if(prevTmpY < tempY) {
								//sto spostando in basso
								shiftAllYWidgetOnDrag(positionListDraggedThisWidgetColumnIndex, tempY - mouseOriginalClickY);
							}else if(prevTmpY > tempY){
							
								shiftAllYWidgetOnDrag(positionListDraggedThisWidgetColumnIndex, -(mouseOriginalClickY - tempY));
							}
							
							
						}
						
						if(tempY != prevTmpY) {
							prevTmpY = tempY;
						}
						
					}
					
					
					
					draggedWidget.style.top = widgetOriginalY
							- (mouseOriginalClickY - tempY - body.scrollTop);
					draggedWidget.style.left = widgetOriginalX
							- (mouseOriginalClickX - tempX - body.scrollLeft);
					
					if(draggedWidget.id.indexOf('widget') == -1) {
						
						draggedStickerFlag = true;
						
						//ho spostato uno sticker quindi devo andare a modificare le sue coordinate anche dentro la stickerElementList
						stickerElementList[stickerElementListMap[draggedWidget.id.split('_').pop()]].xPosition = widgetOriginalX
						- (mouseOriginalClickX - tempX - body.scrollLeft);
						
						stickerElementList[stickerElementListMap[draggedWidget.id.split('_').pop()]].yPosition = widgetOriginalY
						- (mouseOriginalClickY - tempY - body.scrollTop);
						
					}

					return false;
				}

				//sto inserendo un widget nella workArea
				if (widgetDownName != 'null' && !widgetRelasedOnWork) {

					var element = document.getElementById('draggedWidgetId');
					element.style.position = 'absolute';

					element.style.top = orginalTopOfDraggedGraphicalField
							- (mouseOriginalClickY - tempY);
					element.style.left = orginalLeftOfDraggedGraphicalField
							- (mouseOriginalClickX - tempX);

					return false;

				}
				
				//sto inserendo uno sticker nella workArea
				if (draggedSticker != null) {

					var element = document.getElementById('draggedStickerId');
					
					element.style.position = 'absolute';

					element.style.top = orginalTopOfDraggedGraphicalField
							- (mouseOriginalClickY - tempY);
					element.style.left = orginalLeftOfDraggedGraphicalField
							- (mouseOriginalClickX - tempX);

					return false;

				}

				//sto spostando un field per collegarlo ad un widget
				if (draggedFieldIdForConnection != '-1') {

					//creazione elemento visivo ottenuto dalla wfElements del  stesso

					//elemento visivo non definitivo
					draggedGraphicalField.style.position = 'absolute';

					draggedGraphicalField.style.top = orginalTopOfDraggedGraphicalField
							- (mouseOriginalClickY - tempY);
					draggedGraphicalField.style.left = orginalLeftOfDraggedGraphicalField
							- (mouseOriginalClickX - tempX);

					return false;

				}

			}

		}

		function deleteWidget(element) {

			if (!systemPause && !yetCalled) {

				var widget = (element.parentNode).parentNode;

				var justWidgetId = (widget.id).replace('widget_body_', '');
				
				//devono essere modificate anche le operazioni che utilizzano questo  come input
				//quindi dobbiamo scorrere tutte le op di tutti i  diversi da quello attuale e cercare se qualcuno usa
				//tale  come input
				var idOfWidgetEdited = justWidgetId;
				for(var i = 0; i < widgetElementList.length; i++){
					
					if(widgetElementList[i].widgetId != idOfWidgetEdited) {
						console.log('esaminoooooo il Widget  ' + widgetElementList[i].widgetId);
						
						var breakOp = false;
						//scorriamo le sue operazioni per vedere se qualcuna di esse usava un elemento del widget che non è stato modificato
						for(var opIndex = 0; opIndex < widgetElementList[i].op.length; opIndex++) {
							console.log('esamino op ' + opIndex);
							if(breakOp) {
								widgetElementList[i].op[opIndex].confermed = false;
								widgetElementList[i].op[opIndex].processed = false;
								//mostriamo il tasto di conferma
								makeVisible(document.getElementById('executeOp_' + widgetElementList[i].op[opIndex].opId));
							}
							
							console.log('confronto tra ' + widgetElementList[i].op[opIndex].fieldBId.split('_').pop() +' e ' + idOfWidgetEdited);
							
							if(widgetElementList[i].op[opIndex].opId.indexOf('001_') > -1 && widgetElementList[i].op[opIndex].fieldBId.split('_').pop() == idOfWidgetEdited) {
								console.log('op non mai piu confermed');
								//questa operazione dev'essere eseguita di nuovo e anche confermata di nuovo
								widgetElementList[i].op[opIndex].confermed = false;
								widgetElementList[i].op[opIndex].processed = false;
								widgetElementList[i].op[opIndex].fieldBId = '';
								document.getElementById('putInMatchOp_'+widgetElementList[i].op[opIndex].opId).setAttribute('src', 'img/putIn.png');
								breakOp = true;
								
								//mostriamo il tasto di conferma
								makeVisible(document.getElementById('executeOp_' + widgetElementList[i].op[opIndex].opId));
								
							}

						}
						
						
					}
				}
				
				deleteWidgetPosition(justWidgetId);

				//sistemo la connectedList per aggiornare tutti i widget collegati a questo 
				//scorrere la connected list e, per ogni widget che ha come widget di input questo widgetDest eseguire la breakConnection
				for ( var cIndex = 0; cIndex < connectedList.length; cIndex++) {

					//per ogni inputElement controlliamo se è presente il widgetIndex
					for ( var inputIndex = 0; inputIndex < connectedList[cIndex].inputElements.length; inputIndex++) {

						if (connectedList[cIndex].inputElements[inputIndex]
								.split('_').pop() == justWidgetId) {
							
						    console.log('elimino connessione indice cIndex');
							breakConnection(cIndex);
							break;
						}

					}

				}

				//elimazione elemento grafico
				widget.parentNode.removeChild(widget);

				//eliminazione del widget dalla lista
				for ( var i = 0; i < widgetElementList.length; i++) {

					//viene eliminato il widget stesso
					if (widgetElementList[i].widgetId == justWidgetId) {
						//elemento trovato.
						widgetElementList.splice(i, 1);

					}

				}

				//si controlla se sono presenti connessioni che hanno come destinazione il  appena eliminato.
				//Nel caso fossero prensenti devono essere eliminate
				for ( var j = 0; j < connectedList.length; j++) {

					if (connectedList[j].widgetDest == justWidgetId) {

						connectedList.splice(j--, 1);

						if (j < 0) {
							j = 0;
						}

						if (connectedList.length == 0) {
							break;
						}

					}

					//inoltre per ogni connessione si controlla se il widget appena eliminato fa parte della lista degli input
					for ( var k = 0; k < connectedList[j].inputElements.length; k++) {

						if (connectedList[j].inputElements[k].split('_').pop() == justWidgetId) {

							//dev'essere modifiato il contenuto intero (numero) all'interno del box grafico che indica
							//la connessione.
							//viene quindi calcolato l'id

							var thisWidgetId = $('[id ^=text-input-'
									+ connectedList[j].widgetDest + '-'
									+ '][id $='
									+ connectedList[j].inputElements[k] + ']');

							for ( var idsIndex = 0; idsIndex < thisWidgetId.length; idsIndex++) {

								document.getElementById(thisWidgetId[idsIndex].id).innerHTML = '<b>0</b>';

							}

							//viene eliminato questo collegamento
							connectedList[j].inputElements.splice(k--, 1);

						}

					}

					//se il Dest non ha più nessuna lista di input allora viene eliminato il collegamento
					if (connectedList[j].inputElements.length <= 0) {
						connectedList.splice(j--, 1);
					}

				}

				console.log('delete. Nuova  element list');
				console.log(widgetElementList);
				console.log(connectedList);

				//nella ElementListMap tutti i  dopo di lui devono essere scalati di uno
				for ( var mapIndex = justWidgetId; mapIndex < widgetElementListMap.length; mapIndex++) {

					widgetElementListMap[mapIndex] = widgetElementListMap[mapIndex] - 1;

				}

				
				startComputation();	
				
				
				

			}

		}

		function readList() {
			console.log(widgetElementList);
		}

		function makeInvisible(element) {
			try {
				

				element.style.visibility = "hiden";
				element.style.display = "none";

			} catch (Exception) {

				//console.log('make invisible su non riuscito ' + element.id);
				
			}

		}

		function makeVisible(element) {

			try {

				element.style.visibility = "visible";
				element.style.display = "block";
				element.style.zIndex = 2000;

			} catch (Exception) {

			}

		}

		function readLocalFile(url) {

			if (window.File && window.FileReader && window.FileList
					&& window.Blob) {

				//IL BROWSER SUPPORTA LA LETTURA DA FILE
				var rawFile = new XMLHttpRequest();
				rawFile.open("GET", url, false);
				rawFile.onreadystatechange = function() {
					if (rawFile.readyState === 4) {
						if (rawFile.status === 200 || rawFile.status == 0) {
							var allText = rawFile.responseText;
							alert(allText);
						}
					}
				}
				rawFile.send(null);

			} else {
				alert('IL BROWSER NON E\' SUPPORTATO');
			}

		}

		function autoResize(element) {

			//element.style.height = element.contentWindow.document.body.scrollHeight + 'px';
			element.style.width = 500;

		}
		
		
		
		
		function dragSticker(element) {

			if (!systemPause) {

				draggedWidget = element.parentNode;
				
				//viene recuperata la posizione iniziale dello sticker
				var rect = element.getBoundingClientRect();
				widgetOriginalX = rect.left;
				widgetOriginalY = rect.top;
				mouseOriginalClickX = tempX;
				mouseOriginalClickY = tempY;

			}

			return false;

		}
		
		
		
		
		var positionListDraggedWidgetIndex = -1;
		var positionListDraggedThisWidgetColumnIndex = -1;
		

		function dragWidget(element) {

			if (!systemPause) {

				//passiamo il child dell'elemento che vogliamo passare. Recuperiamo il parent
				draggedWidget = element.parentNode;
				
				//recuperiamo gli indici necessari all'interno della positionList
				var widgetId = draggedWidget.id.split('_').pop();
				
				var currentY = 0;
				positionListDraggedThisWidgetColumnIndex = 0;
				
				for(var i = 0; i < positionList.length; i++) {
					
					if(currentY != positionList[i].yPosition) {
						positionListDraggedThisWidgetColumnIndex = i;
						currentY = positionList[i].yPosition;
					}
					
					
					if(positionList[i].widgetId == widgetId) {
						
						positionListDraggedWidgetIndex = i;
											
						break;
						
					}
				}
				
				//viene recuperata la posizione iniziale del 
				var rect = element.getBoundingClientRect();
				widgetOriginalX = rect.left;
				widgetOriginalY = rect.top;
				mouseOriginalClickX = tempX;
				mouseOriginalClickY = tempY;
				
				prevTmpX = tempX;
				prevTmpY = tempY;
				
				console.log('positionListDraggedIndex: ' + positionListDraggedWidgetIndex);
				console.log('positionListDraggedThisColumnIndex: ' + positionListDraggedThisWidgetColumnIndex);

			}

			return false;

		}

		function clickOnWidgetBoxButton() {

			if (!systemPause) {

				widget_box_visible = !widget_box_visible;
				
				if(widget_box_visible) {
					xStartOffset = 400;
					shiftAllWidgetX(0,400);
					shiftAllStickerX(400);
					document.getElementById('widget_logo_img').src = "./img/widget_expanse.png";
				}else {
					xStartOffset = 0;
					shiftAllWidgetX(0,-400);
					shiftAllStickerX(-400);
					document.getElementById('widget_logo_img').src = "img/widget_compact.png";
				}
				
				set_boxes_height();

			}

		}

		function clickOnOutputBoxButton() {

			if (!systemPause) {

				output_box_visible = !output_box_visible;
				
				if(output_box_visible) {
					
				    console.log('exspanse');
					document.getElementById('output_logo_img').src = "./img/stickers_expanse.png";
				}else {
					document.getElementById('output_logo_img').src = "./img/stickers_compact.png";
				}
				
				set_boxes_height();

			}

		}
		
		
		function replaceChar(text) {
		
		    text = text.replace(/ì/g , "i");
		    
			return text;
		}
		
		function saveApplicationRequest(element) {
			
			if(!systemPause) {
				
				//mostrare il popup
				//document.body.innerHTML = document.body.innerHTML + getErrorPopup('Impossibile confermare. Non hai inserito tutte le informazioni richieste per questo tipo di operazione. Assicurati di aver scelto un campo di questo  su cui effettuare il confronto e di aver trascinato all\'interno dell\'area predisposta il campo di un altro  che intendi confrontare','error');
				$('body').append(getSavePopup());
				
				document.getElementById('load_save_popup_body').style.position = 'absolute';
				document.getElementById('load_save_popup_body').style.left = (document.body.clientWidth / 2)
						- (document.getElementById('load_save_popup_body').clientWidth / 2)
						+ document.body.scrollLeft;
				document.getElementById('load_save_popup_body').style.top = (document.body.clientHeight / 2)
						- (document.getElementById('load_save_popup_body').clientHeight / 2)
						+ document.body.scrollTop - 100;
				document.getElementById('load_save_popup_body').style.zIndex = 100000;
				

				
			}
			
			
		    
			
		}
		
		function openApplicationRequest(element) {

			if(!systemPause) {
				
				//mostrare il popup
				//document.body.innerHTML = document.body.innerHTML + getErrorPopup('Impossibile confermare. Non hai inserito tutte le informazioni richieste per questo tipo di operazione. Assicurati di aver scelto un campo di questo  su cui effettuare il confronto e di aver trascinato all\'interno dell\'area predisposta il campo di un altro  che intendi confrontare','error');
				$('body').append(getLoadPopup());
				
				document.getElementById('load_save_popup_body').style.position = 'absolute';
				document.getElementById('load_save_popup_body').style.left = (document.body.clientWidth / 2)
						- (document.getElementById('load_save_popup_body').clientWidth / 2)
						+ document.body.scrollLeft;
				document.getElementById('load_save_popup_body').style.top = (document.body.clientHeight / 2)
						- (document.getElementById('load_save_popup_body').clientHeight / 2)
						+ document.body.scrollTop - 100;
				document.getElementById('load_save_popup_body').style.zIndex = 100000;
				
				
			}
			
			
			
			
		  
			
		}
		

		//MODIFICA LA DIMENSIONE DELLA BARRA DEI  E DELL'OUTPUT IN BASE ALLA DIMENSIONE DEL BODY
		//MODIFICA LA DIMENSIONE DELLA BARRA DEI WIDGET E DELL'OUTPUT IN BASE ALLA DIMENSIONE DEL BODY
		function set_boxes_height() {

			var body = document.body;
			var widget_box = document.getElementById('widget_box');
			var widget_box_inner = document.getElementById('inner_box');
			var widget_box_header = document.getElementById('box_header');
			var widget_box_header_down = document
					.getElementById('box_header_down');
			var output_box_header_down = document
					.getElementById('box_output_header_down');
			var output_box = document.getElementById('output_box');
			var output_inner_box = document.getElementById('output_inner_box');
			var output_hor_bar = document.getElementById('output_hor_bar_img');

			var widget_box_width = widget_box_header_down.clientWidth;

			widget_box.style.height = 0;
			output_box.style.height = 0;
			widget_box.style.zIndex = 100000;
			output_box.style.zIndex = 100000;
			widget_box_header_down.style.zIndex = 100000;
			output_box_header_down.style.zIndex = 100000;

			var body_height = $(body).height();
			var body_width = $(body).width();

			var body_heigth_try = document.body.clientHeight;
			
			widget_box.style.height = body_heigth_try;
			output_box.style.height = body_heigth_try / 4;
			output_box.style.width = body_width - 20 - widget_box_width;

			output_hor_bar.style.width = body_width - 20 - widget_box_width;
			output_hor_bar.style.height = 5;

			widget_box_inner.style.height = (body_heigth_try - 100);
			widget_box_inner.style.bottom = 100;

			output_inner_box.style.height = (body_heigth_try / 7) - 20;
			output_inner_box.style.bottom = body_heigth_try;

			if (widget_box_visible) {

				widget_box.style.visibility = "visible";
				widget_box_header_down.style.visibility = "hidden";

			} else {

				var body_height = $(body).height();

				widget_box.style.visibility = "hidden";
				widget_box_header_down.style.visibility = "visible";
				widget_box_header_down.style.position = 'absolute';
				widget_box_header_down.style.left = document.body.scrollLeft;
				widget_box_header_down.style.bottom = -body.scrollTop;

			}

			if (output_box_visible) {

				output_box.style.visibility = "visible";
				output_box_header_down.style.visibility = "hidden";
				output_box.style.position = 'absolute';
				output_box.style.left = 20 + widget_box_width + document.body.scrollLeft;
				output_box.style.bottom = -body.scrollTop;

			} else {

				var body_height = $(body).height();
				output_box.style.visibility = "hidden";
				output_box_header_down.style.visibility = "visible";
				output_box_header_down.style.position = 'absolute';
				output_box_header_down.style.bottom = -body.scrollTop;
				output_box_header_down.style.left = 20 + widget_box_width + document.body.scrollLeft;

			}

		}
				

		$(document).ready(function() {
			set_boxes_height();		
			
		    document.cookie = document.cookie.split('=')[0] +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';


			$('.nav li').hover(function() {
				//mostra sottomenu
				$('ul', this).stop(true, true).delay(50).slideDown(100);

			}, function() {
				//nascondi sottomenu
				$('ul', this).stop(true, true).slideUp(200);
			});

			$(window).bind('resize', function() {
				set_boxes_height();
			});
		});
	</script>


</body>




</html>