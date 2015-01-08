function classWidgetPlace(widgetId) {

			var i = 0;

			this.type = 'place widget';

			//input: user, lista di user, id di una foto, lista di id foto 
			this.inputType = [ '009', '007' ];

			//elementi del 
			this.wf = [
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : 'img/widget_body/default_place_picture.png',
						fieldType : '004',
						fieldName : 'Foto del luogo',
						fieldPath : '/-id',
						fieldSelect : true,
						valueId : '',
						graphicalValue : '',
						fieldGraphicalPath : '',
						elementId : 'picture_place_' + widgetId,
						selectedForConnection : []
					},
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : 'Nome del luogo',
						fieldType : '009',
						fieldName : 'Nome del luogo',
						fieldPath : '/-id',
						fieldSelect : true,
						valueId : '',
						graphicalValue : '',
						fieldGraphicalPath : '/-name',
						elementId : 'name_of_place_' + widgetId,
						selectedForConnection : []
					},
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : 'indirizzo:',
						fieldType : '007',
						fieldName : 'Via del luogo',
						fieldPath : '{-location-/-street',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '{-location-/-street',
						graphicalValue : '',
						elementId : 'street_name_' + widgetId,
						selectedForConnection : []
					},
					
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : 'city',
						fieldType : '007',
						fieldName : 'Citta\' del luogo',
						fieldPath : '{-location-/-city',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '{-location-/-city',
						graphicalValue : '',
						elementId : 'city_name_' + widgetId,
						selectedForConnection : []
					},
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : 'stato',
						fieldType : '007',
						fieldName : 'Paese del luogo',
						fieldPath : '{-location-/-country',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '{-location-/-country',
						graphicalValue : '',
						elementId : 'country_name_' + widgetId,
						selectedForConnection : []
					},
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : 'zip code',
						fieldType : '007',
						fieldName : 'Codice ZIP del luogo',
						fieldPath : '{-location-/-zip',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '{-location-/-zip',
						graphicalValue : '',
						elementId : 'zip_code_' + widgetId,
						selectedForConnection : []
					},
					
				 	{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : '',
						fieldType : '',
						fieldName : 'latitude',
						fieldPath : '{-location-/-latitude',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '',
						graphicalValue : '',
						elementId : '',
						selectedForConnection : []
					},
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : '',
						fieldType : '',
						fieldName : 'longitude',
						fieldPath : '{-location-/-longitude',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '',
						graphicalValue : '',
						elementId : '',
						selectedForConnection : []
					},
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : '',
						fieldType : '',
						fieldName : 'google maps',
						fieldPath : '',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '',
						graphicalValue : '',
						elementId : 'google_maps_'+widgetId,
						selectedForConnection : []
					},
					
					];

		}

function loadPlaceWidget() {

	//helpText ='<i> <b><br>NESSUN CONTENUTO DISPONIBILE</br></b> <br>Questo widget mostrerà le informazioni su un posto.</br> <br>Cerca o trascina all\'interno di questo widget</br><br>il nome di un luogo </br> </i>';
	helpText ='<i><b>NO AVAILABLE CONTENT<br><br></b> This widget shows the information about a place<br> Please search for a place or drag here one among the following elements:<br><br> 1) a place\'s name <br> 2) a list of place\'s name</i>';


	return (

			'<div id="widget_body_'
			+ widgetId
			+ '" class="div_photo_widget_bg" onmouseout="javascript:mouseOutThisWidget(this)" onmouseover="javascript:mouseOverThisWidget(this)">' +

			'<div style="position:relative" id="header'
			+ widgetId
			+ '" draggable="false" onmousedown="javascript:dragWidget(this)"> '+
			'<img src="img/widget_body/header_shadow.png" style=\'width:800px; height:40px; \' draggable="false"/>'+

			'<p id="widget_name_'
			+ widgetId
			+ '"style="color:dadada; position: absolute; top: -6px; left:30px; font-size:20px; font-family: sans">widget no. <b>'+ widgetId +' Place</b></p>'+

			'<img src="img/widget_body/widget_close.png" style="position: absolute; top: 16px; left: 750px; bottom: 5px;" onclick="javascript:deleteWidget(this)"/>'+
			'<img href="javascript:;" onClick="window.open(\'help/place_help.html\', \'MANUALE UTENTE\', \'width=1000, height=500, resizable, status, scrollbars=1, location=yes\')" src="img/widget_body/widget_help.png" style="position: absolute; top: 15px; left: 720px; bottom: 6px;"/>'+

			'</div>'+

			'<div id="inner_'
			+ widgetId
			+ '" class="div-photo-widget-inner">'+

			'<img onclick="javascript:prev(this)" id="prevButton_'
			+ widgetId
			+ '" src="img/prevArrow.png" style="position: absolute; top: 230px; left: 12px;"/>'+
			'<img onclick="javascript:next(this)" id="nextButton_'
			+ widgetId
			+ '" src="img/nextArrow.png" style="position: absolute; top: 230px; left: 766px;"/>'+

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

			'<div id="widget_body_'
			+ widgetId
			+ '" class="div_photo_widget_body_bg">'+

			'<p id="help_message_'
			+ widgetId
			+ '" style="position: absolute; top: 180px; left: 70px; z-index:1000; font-size:18px; font-family: sans "> '+ helpText +' </p>' +


			'<img id="loading_'
			+ widgetId
			+ '" src="img/loading.gif" style="position: absolute; top: 180px; left: 90px; bottom: 5px; z-index = 2000"/>'+


			'<p style="position: absolute; top: 130px; left: 52px; font-size:18px; font-family: sans "><b>search</b></p>'+
			
			'<textarea onkeyup="javascript:changePlaceTextArea(this)" id="search_place_area_'+widgetId+'" style="position: absolute; top: 170px; left: 50px; " name="nome del luogo" rows="1" cols="40"> </textarea>' +
			
			'<img onclick="javascript:startSearch(this)" id="search_button_'
			+ widgetId
			+ '" src="img/widget_body/search_button.png" style="position: absolute; top: 160px; left: 350px" draggable="false"/>'+

			'<img src="img/widget_body/widget_inner_bar.png" style="width:700; height:2; position: absolute; top: 205px; left: 50px; bottom: 0px"/>'+
			
			'<img id="picture_place_'
			+ widgetId
			+ '" src="img/widget_body/default_place_picture.png" style="position: absolute; top: 215px; left: 60px; bottom: 5px"  onmousedown="javascript:dragFieldForConnection(this)" draggable="false"/>'+

			'<p onmousedown="javascript:dragFieldForConnection(this)" draggable="false" id="name_of_place_'
			+ widgetId
			+ '" style="position: absolute; top: 190px; left: 210px; font-size:23px; font-family: sans "><b>Nome del luogo</b></p>'+
			
			'<img src="img/widget_body/widget_inner_bar.png" style="width:250; height:2; position: absolute; top: 241px; left: 210px"/>'+
			
			'<p onmousedown="javascript:dragFieldForConnection(this)" draggable="false" id="street_name_'
			+ widgetId
			+ '" style="position: absolute; top: 225px; left: 210px; font-size:20px; font-family: sans ">indirizzo:</p>'+

			'<p onmousedown="javascript:dragFieldForConnection(this)" draggable="false" id="city_name_'
			+ widgetId
			+ '" style="position: absolute; top: 245px; left: 210px; font-size:20px; font-family: sans ">citta\'</p>'+
			
			'<p onmousedown="javascript:dragFieldForConnection(this)" draggable="false" id="country_name_'
			+ widgetId
			+ '" style="position: absolute; top: 265px; left: 210px; font-size:20px; font-family: sans ">country</p>'+

			'<p onmousedown="javascript:dragFieldForConnection(this)" draggable="false" id="zip_code_'
			+ widgetId
			+ '" style="position: absolute; top: 285px; left: 210px; font-size:20px; font-family: sans ">zip</p>'+
			
			'<iframe style="opacity:0.0; position:absolute; top:150; left:490;" id="google_maps_'+widgetId+'" width="260" height="230" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src=""></iframe><br />'+


			'</div>'+

			'</div>'+

			'<img src="img/widget_body/footer_shadow_bar.png" style=" width:735px; height:12px; position: absolute; top: 380px; left: 0px"/>'+

			'<img id="opButton_'+widgetId+'" onclick="javascript:addOp(this)" title="Permette di scegliere solo alcuni elementi dell\'insieme o svolgere operazioni di confronto sugli elementi stessi" src="img/widget_body/plus_button.png" style="position: absolute; top: 403px; left: 50px; bottom: 5px"/>'+

			'<p name = "ok" draggable="false" id="opButtonText_'
			+ widgetId
			+ '" style="position: absolute; top: 392px; left: 90px; font-size:15px; font-family: sans"> <font color="white">Clicca sul + per inserire operazioni di selezione degli elementi o di confronto tra i campi</font></p> '+


			'</div>'




	);
}

//modifica l'innerHTML della text area e lo inserisce all'interno del wf.graphicalValue dell'elemento. Sarà il valore
//che poi recupera la servlet per effettuare la ricerca
function changePlaceTextArea(element) {
	
	element.innerHTML = element.value;
	
	var widgetId = element.id.split('_').pop();
	
	widgetElementList[widgetElementListMap[widgetId]].widgetObject.wf[0].graphicalValue = element.value.replace(/\s+/g, '');
	
}

function startSearch(button) {
	
	var widgetPlaceId = button.id.split('_').pop();
	
	//viene controllato il campo wf[0].graphicalValue.
	//se è '' allora l'utente non ha scritto nulla nel box quindi non viene avviata la ricerca
	if(widgetElementList[widgetElementListMap[widgetPlaceId]].widgetObject.wf[0].graphicalValue.replace(' ','') == '') {
		//mostrare il popup
		document.body.innerHTML = document.body.innerHTML + getErrorPopup('Non hai inserito nessun luogo da cercare! Inserisci un luogo a fianco e premi per cercare.','error');

		document.getElementById('error_popup_body').style.position = 'absolute';
		document.getElementById('error_popup_body').style.left = (document.body.clientWidth / 2)
		- (document.getElementById('error_popup_body').clientWidth / 2)
		+ document.body.scrollLeft;
		document.getElementById('error_popup_body').style.top = (document.body.clientHeight / 2)
		- (document.getElementById('error_popup_body').clientHeight / 2)
		+ document.body.scrollTop - 100;
		document.getElementById('error_popup_body').style.zIndex = 100000;
	}else {
		//l'utente ha inserito un testo da cercare.
		//la nostra servlet tuttavia non esamina alcun widget che non sia connesso ad un altro widget 
		//mediante la connectedList..
		//per ovviare a ciò viene creato un dummy widget di tipo testo e inserito un collegamento a questo widget nella connected list
		
		//viene quindi esaminata la connected list per vedere se l'attuale widget è già stato collegato con un widgte dummy text
		//se lo è di fatto ci basterà modificare il suo contenuto e lasciare tutto il resto inalterato.
		
		
		var widgetDummyId = -1;
		var connectedListIndex = -1;
		var inputElementIndex = -1;
		
		//viene quindi cercato il widgetId all'interno della connectedList
		for(var i = 0; i < connectedList.length; i++) {
			
			if(connectedList[i].widgetDest == widgetPlaceId) {
				//connessione trovata
				
				connectedListIndex = i;
				
				//si esaminano gli inputElements alla ricerca del widgetdummy
				for(var j = 0; j < connectedList[i].inputElements.length; j++) {
					if(connectedList[i].inputElements[j].indexOf('dummy') > -1) {
						//widget trovato.
						inputElementIndex = j;
						//l'utente ha già svolto una ricerca in precendenza
						widgetDummyId = connectedList[i].inputElements[j].split('_').pop();
						break;
					}
				}
			}
			
		}
		
		if(widgetDummyId == -1) {
			//è la prima ricerca che l'utente svolge su questo widget
			//inserimento widget di testo nella widgetElementList
			widgetElementListMap.push(widgetElementList.length);
			var textWidget = new classWidgetTextDummy(widgetId);
			//INSERIMENTO IN WIDGETELEMENTLIST
			widgetElementList.push({
				widgetId : widgetId,
				widgetObject : textWidget,
				mouseOverThisWidget : false,
				loaded : true,
				cursor : 0,
				numOfElementSelected : 0,
				op: [],
				wfElements : []
			});
			
		    widgetId++;
			
			widgetElementList[widgetElementList.length - 1].widgetObject.wf[0].graphicalValue = widgetElementList[widgetElementListMap[widgetPlaceId]].widgetObject.wf[0].graphicalValue;
			widgetElementList[widgetElementList.length - 1].widgetObject.wf[0].valueId = widgetElementList[widgetElementListMap[widgetPlaceId]].widgetObject.wf[0].graphicalValue;
			
			//inserimento dell'unico elemento della wfElements
			widgetElementList[widgetElementList.length - 1].wfElements.push({elementSelected: true, elementShowed: true, wf: widgetElementList[widgetElementList.length - 1].widgetObject.wf});

			widgetElementList[widgetElementList.length - 1].numOfElementSelected = 1;
			widgetElementList[widgetElementList.length - 1].loaded = true;
			
			//infine viene creato il collegamento
			inputElements = [widgetElementList[widgetElementList.length - 1].widgetObject.wf[0].elementId];

			connectedList.push({

				processed : false,
				widgetDest : widgetPlaceId,
				inputElements : inputElements
			});

			
		}else {
			
			//si rende non processed il collegamento
			connectedList[connectedListIndex].processed = false;
			
			widgetElementList[widgetElementListMap[widgetPlaceId]].loaded = false;
			
			//si modifica il valore della wfElements del widgte dummy con il nuovo inserito dall'utente
			widgetElementList[widgetElementListMap[widgetDummyId]].wfElements[0].wf[0].graphicalValue = widgetElementList[widgetElementListMap[widgetPlaceId]].widgetObject.wf[0].graphicalValue;
			widgetElementList[widgetElementListMap[widgetDummyId]].wfElements[0].wf[0].valueId = widgetElementList[widgetElementListMap[widgetPlaceId]].widgetObject.wf[0].graphicalValue;

			
			widgetElementList[widgetElementList.length - 1].numOfElementSelected = 1;
			widgetElementList[widgetElementList.length - 1].loaded = true;			
		}
		
		console.log(connectedList);
		console.log(widgetElementList);
		startComputation();
	
	}
	
	
	
}