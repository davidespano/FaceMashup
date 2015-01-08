function mouseOverBody(flag,type) {

	//se draggedWidget non ï¿½ a null significa che ho finito di spostare un widget.
	if (draggedWidget != null && !mouseOverBoxBool && flag
			&& widgetRelasedOnWork) {

		draggedWidget.style.zIndex = zIndexInt++;
		widgetRelasedOnWork = false;
		widgetDownName = 'null';
		draggedWidget = null;

		try {

			//eliminazione elemento grafico trascinato
			document.getElementById('draggedWidgetId').parentNode.removeChild(document.getElementById('draggedWidgetId'));

		}catch(Exception) {

		}


	} else

		if (!mouseOverBoxBool && flag && widgetRelasedOnWork) {
			//il mouse non si trova sopra un box (widget o output) quindi sta sulla work area. STO SPOSTATDNO UN WIDGET DALLA BARRA ALL'AREA DI LAVORO
			widgetRelasedOnWork = false;
			
			//inserimento dell'id del widget nella mappa
			if(type == 'load') {
				
				//riempire le prime widgetId-1 posizioni con -1
				for(var i = widgetElementListMap.length; i < widgetId; i++) {
					widgetElementListMap.push(-1);
				}
				
				widgetElementListMap.push(widgetElementList.length);
			}else {
				widgetElementListMap.push(widgetElementList.length);
			}
			
			console.log('widgetELementLitMap');
			console.log(widgetElementListMap);

			try {

				//eliminazione elemento grafico trascinato
				document.getElementById('draggedWidgetId').parentNode.removeChild(document.getElementById('draggedWidgetId'));

			}catch(Exception) {

			}

			switch (widgetDownName) {

			case 'login':
				$('body').append(loadBodyWidget());
				//= loadBodyWidget()
				//+ document.body.innerHTML;
				//CREAZIONE DELL'ISTANZA DEL WIDGET
				var widgetLogin = new classWidgetLogin(widgetId);
				console.log(widgetLogin.type);
				//INSERIMENTO IN WIDGETELEMENTLIST
				widgetElementList.push({
					widgetId : widgetId,
					widgetObject : widgetLogin,
					mouseOverThisWidget : false,
					loaded : false,
					cursor : 0,
					numOfElementSelected : 0,
					op: [],
					wfElements : []
				});
				readList();
				initButton(document.getElementById('loginButton_'
						+ widgetId));

				break;

			case 'photos':
				$('body').append(loadPhotosWidget());
//				document.body.innerHTML = loadPhotosWidget()
//				+ document.body.innerHTML;
				var photosWidget = new classWidgetPhotos(widgetId);
				console.log(photosWidget.type);
				//INSERIMENTO IN WIDGETELEMENTLIST
				widgetElementList.push({
					widgetId : widgetId,
					widgetObject : photosWidget,
					mouseOverThisWidget : false,
					loaded : false,
					cursor : 0,
					numOfElementSelected : 0,
					op: [],
					wfElements : []
				});
				readList();
				break;

			case 'video':
				$('body').append(loadVideosWidget());
//				document.body.innerHTML = loadVideosWidget()
//				+ document.body.innerHTML;
				var videosWidget = new classWidgetVideo(widgetId);
				console.log(videosWidget.type);
				//INSERIMENTO IN WIDGETELEMENTLIST
				widgetElementList.push({
					widgetId : widgetId,
					widgetObject : videosWidget,
					mouseOverThisWidget : false,
					loaded : false,
					cursor : 0,
					numOfElementSelected : 0,
					op: [],
					wfElements : []
				});
				readList();
				break;
				
			case 'posts':
				$('body').append(loadPostsWidget());
				var postsWidget = new classWidgetPosts(widgetId);
				console.log(postsWidget.type);
				//INSERIMENTO IN WIDGETELEMENTLIST
				widgetElementList.push({
					widgetId : widgetId,
					widgetObject : postsWidget,
					mouseOverThisWidget : false,
					loaded : false,
					cursor : 0,
					numOfElementSelected : 0,
					op: [],
					wfElements : []
				});
				readList();
				break;


			case 'date': 
				var dateWidget = new classWidgetDate(widgetId);
				//INSERIMENTO IN WIDGETELEMENTLIST
				widgetElementList.push({
					widgetId : widgetId,
					widgetObject : dateWidget,
					mouseOverThisWidget : false,
					loaded : true,
					cursor : 0,
					numOfElementSelected : 1,
					op: [{confermed: false, processed: false, opId: '000_0_'+widgetId, fieldAId:'', fieldBId:'', subOp:'', binArray: [], inputType: []}],
					wfElements : []
				});

				//viene eseguito dopo perchè la funzione inserirà anche l'unico wfElements dell'elemento e ha  bisogno della widgetElementList aggiornata
//				document.body.innerHTML = loadDateWidget()
//				+ document.body.innerHTML;
				$('body').append(loadDateWidget());

				readList();
				break;

			case 'text': 
				var textWidget = new classWidgetText(widgetId);
				//INSERIMENTO IN WIDGETELEMENTLIST
				widgetElementList.push({
					widgetId : widgetId,
					widgetObject : textWidget,
					mouseOverThisWidget : false,
					loaded : true,
					cursor : 0,
					numOfElementSelected : 0,
					op: [{confermed: false, processed: false, opId: '000_0_'+widgetId, fieldAId:'', fieldBId:'', subOp:'', binArray: [], inputType: []}],
					wfElements : []
				});

//				document.body.innerHTML = loadTextWidget()
//				+ document.body.innerHTML;
				$('body').append(loadTextWidget());

				readList();
				break;

			case 'tagger':
//				document.body.innerHTML = loadTaggerWidget()
//				+ document.body.innerHTML;
				$('body').append(loadTaggerWidget());
				var taggerWidget = new classWidgetTagger(widgetId);
				//INSERIMENTO IN WIDGETELEMENTLIST
				widgetElementList.push({
					widgetId : widgetId,
					widgetObject : taggerWidget,
					mouseOverThisWidget : false,
					loaded : true,
					cursor : 0,
					numOfElementSelected : 0,
					op: [{confermed: false, processed: false, opId: '002_0_'+widgetId, fieldAId:'', fieldBId:'', subOp:'', binArray: [], inputType: ['001', '008', '011']}],
					wfElements : []
				});
				readList();
				break;

			case 'place': 
//				document.body.innerHTML = loadPlaceWidget()
//				+ document.body.innerHTML;
				$('body').append(loadPlaceWidget());
				var placeWidget = new classWidgetPlace(widgetId);
				console.log(placeWidget.type);
				//INSERIMENTO IN WIDGETELEMENTLIST
				widgetElementList.push({
					widgetId : widgetId,
					widgetObject : placeWidget,
					mouseOverThisWidget : false,
					loaded : false,
					cursor : 0,
					numOfElementSelected : 0,
					op: [],
					wfElements : []
				});
				readList();
				break;

			case 'profile':
				$('body').append(loadProfileWidget());
				var profileWidget = new classWidgetProfile(widgetId);
				console.log(profileWidget.type);
				//INSERIMENTO IN WIDGETELEMENTLIST
				widgetElementList.push({
					widgetId : widgetId,
					widgetObject : profileWidget,
					mouseOverThisWidget : false,
					loaded : false,
					cursor : 0,
					numOfElementSelected : 0,
					op: [],
					wfElements : []
				});
				readList();
				break;
				
			case 'friends':
				$('body').append(loadFriendsWidget());
				var friendsWidget = new classWidgetFriends(widgetId);
				//INSERIMENTO IN WIDGETELEMENTLIST
				widgetElementList.push({
					widgetId : widgetId,
					widgetObject : friendsWidget,
					mouseOverThisWidget : false,
					loaded : false,
					cursor : 0,
					numOfElementSelected : 0,
					op: [{confermed: false, processed: false, opId: '000_0_'+widgetId, fieldAId:'', fieldBId:'', subOp:'', binArray: [], inputType: []}],
					wfElements : []
				});
				readList();

				makeInvisible(document.getElementById('executeOp_000_'+widgetId));
				makeInvisible(document.getElementById('selectAllButton_'+widgetId));
				makeInvisible(document.getElementById('deselectAllButton_'+widgetId));

				break;

			}


			//l'utente sta caricando
			if(type == 'load') {
				
				var positionListIndex = 0;
				
				//si cerca l'id del widget appena inserito all'interno della positionList
				for(var posIndex = 0; posIndex < positionList.length; posIndex++) {
					if(positionList[posIndex].widgetId == widgetId) {
						positionListIndex = posIndex;
						break;
					}
				}
				
				//la posizione sarà quella presente nella position list caricata dal file
				//inserimento widget nell'area
				document.getElementById('widget_body_' + widgetId).style.position = 'absolute';
				document.getElementById('widget_body_' + widgetId).style.top = positionList[positionListIndex].yPosition;
				document.getElementById('widget_body_' + widgetId).style.left = positionList[positionListIndex].xPosition;
				document.getElementById('widget_body_' + widgetId).style.zIndex = zIndexInt++;
				
			}else {
				
				//inserimento widget nell'area
				document.getElementById('widget_body_' + widgetId).style.position = 'absolute';
				document.getElementById('widget_body_' + widgetId).style.top = tempY;
				document.getElementById('widget_body_' + widgetId).style.left = tempX;
				document.getElementById('widget_body_' + widgetId).style.zIndex = zIndexInt++;
				
				//inserimento widget nella positionList
				var posElement = new positionElement(widgetId);

				//essendo appena stato inserito il suo yPosition sarà uguale a 0
				posElement.yPosition = 0;
				posElement = insertElementInPositionList(posElement);
				
			}
			




			//vengono modificate le coordinate del widget sulla base dei valori appena inseriti

			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			//CREAZIONE DELL'ISTANZA DEL WIDGET E INSERIMENTO IN WIDGETELEMENTLIST.////////////////////////////////////////
			///////////////////////////////////////////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////

			set_boxes_height();
			widgetId++;
			widgetDownName = 'null';

			//viene nascosto il pulsante plus per l'inserimento delle operazioni
			makeInvisible(document.getElementById('opButton_'
					+ (widgetId - 1)));
			makeInvisible(document.getElementById('opButtonText_'
					+ (widgetId - 1)));

			//viene nascosto il loading
			makeInvisible(document.getElementById('loading_'
					+ (widgetId - 1)));

			//si preeva quindi l'ultimo elemento inserito in widgetElementList per rendere seminvisibili tutti i field interni al widget
			//e mostrare il messaggio di invito al collegamento
						
			for ( var wfIndex = 0; wfIndex < widgetElementList[widgetElementList.length - 1].widgetObject.wf.length; wfIndex++) {

				if (widgetElementList[widgetElementList.length - 1].widgetObject.type != 'login widget' && !widgetElementList[widgetElementList.length - 1].loaded && widgetElementList[widgetElementList.length - 1].widgetObject.type.indexOf('POST') == -1) {

					try{
						element = document
						.getElementById(widgetElementList[widgetElementList.length - 1].widgetObject.wf[wfIndex].elementId);

						//cambio trasparenza dell'elemento
						element.style.opacity = 0.1;
						element.style.filter = "alpha(opacity=10)"; //For IE;
					}catch(Exception){
						console.log('elemento non ha un elementId');
					}


				}

			}


			
			

		}

}