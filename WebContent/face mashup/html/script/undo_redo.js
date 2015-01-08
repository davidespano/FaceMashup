
var undoStack = [{},{},{},{},{}];
var count = 0;

var pressedPrev = 0;

var redoStack = [];
var countRedoStack = 0;


//////////////////////////////////////////////////////////////////////////////


//registiamo tutti i valori delle variabili:
//
//var appLoaded = true;
//
//var widgetElementList = [];
//var widgetElementListMap = [];
//
//var stickerElementList = [];
//var stickerElementListMap = [];
//
//var positionList = [];
//
//var userIsLogin = false;
//
//var operationUniqueId = 0;
//
//var widget_box_visible = false;
//var output_box_visible = false;
//
//var zIndexInt = 0;
//
//var widgetId = 0;
//var stickerId = 0;
//
//var connectedList = [];


/////////////////////////////////////////////////////////////////////////////

function addStep() {

	pressedPrev = 0;
	
	top.frames["upper_bar_frame"].document.getElementById('id_undo_icon').style.opacity = 1;
	top.frames["upper_bar_frame"].document.getElementById('id_undo_icon').style.filter = "alpha(opacity=100)"; //For IE;
	
	countRedoStack = 0;
	redoStack = [];
	redoStack = [{},{},{},{},{}];
	
	if(count < 5) {

		undoStack[count] = {HTML: document.body.innerHTML, appLoaded: JSON.parse(JSON.stringify(appLoaded)), widgetElementList: JSON.parse(JSON.stringify(widgetElementList)),
				widgetElementListMap: JSON.parse(JSON.stringify(widgetElementListMap)), stickerElementList: JSON.parse(JSON.stringify(stickerElementList)) , stickerElementListMap: JSON.parse(JSON.stringify(stickerElementListMap)) ,positionList: JSON.parse(JSON.stringify(positionList)), userIsLogin: JSON.parse(JSON.stringify(userIsLogin)), operationUniqueId: JSON.parse(JSON.stringify(operationUniqueId)), 
				widget_box_visible: JSON.parse(JSON.stringify(widget_box_visible)), output_box_visible: JSON.parse(JSON.stringify(output_box_visible)), zIndexInt: JSON.parse(JSON.stringify(zIndexInt)) , widgetId: JSON.parse(JSON.stringify(widgetId)), stickerId: JSON.parse(JSON.stringify(stickerId)), connectedList: JSON.parse(JSON.stringify(connectedList))};
	}else {

		undoStack[count % 5] = {HTML: document.body.innerHTML, appLoaded: JSON.parse(JSON.stringify(appLoaded)), widgetElementList: JSON.parse(JSON.stringify(widgetElementList)),
				widgetElementListMap: JSON.parse(JSON.stringify(widgetElementListMap)), stickerElementList: JSON.parse(JSON.stringify(stickerElementList)) , stickerElementListMap: JSON.parse(JSON.stringify(stickerElementListMap)) ,positionList: JSON.parse(JSON.stringify(positionList)), userIsLogin: JSON.parse(JSON.stringify(userIsLogin)), operationUniqueId: JSON.parse(JSON.stringify(operationUniqueId)), 
				widget_box_visible: JSON.parse(JSON.stringify(widget_box_visible)), output_box_visible: JSON.parse(JSON.stringify(output_box_visible)), zIndexInt: JSON.parse(JSON.stringify(zIndexInt)) , widgetId: JSON.parse(JSON.stringify(widgetId)), stickerId: JSON.parse(JSON.stringify(stickerId)), connectedList: JSON.parse(JSON.stringify(connectedList))};
	}

	console.log(undoStack);
	count++;


}

function nextStep() {

	if(!systemPause) {
		
		
		
		if(pressedPrev > 0 && countRedoStack > 0) {

			
			pressedPrev--;
			
			top.frames["upper_bar_frame"].document.getElementById('id_undo_icon').style.opacity = 1;
			top.frames["upper_bar_frame"].document.getElementById('id_undo_icon').style.filter = "alpha(opacity=100)"; //For IE;
			
			//si carica il valore dell'ultimo redo inserito
			document.body.innerHTML = redoStack[countRedoStack-1].HTML;
			
			appLoaded = redoStack[countRedoStack-1].appLoaded;
			widgetElementList = redoStack[countRedoStack-1].widgetElementList;
			widgetElementListMap = redoStack[countRedoStack-1].widgetElementListMap;
			stickerElementList = redoStack[countRedoStack-1].stickerElementList;
			stickerElementListMap = redoStack[countRedoStack-1].stickerElementListMap;
			positionList = redoStack[countRedoStack-1].positionList;
			userIsLogin = redoStack[countRedoStack-1].userIsLogin;
			operationUniqueId = redoStack[countRedoStack-1].operationUniqueId;
			widget_box_visible = redoStack[countRedoStack-1].widget_box_visible;
			output_box_visible = redoStack[countRedoStack-1].output_box_visible;
			zIndexInt = redoStack[countRedoStack-1].zIndexInt;
			widgetId = redoStack[countRedoStack-1].widgetId;
			stickerId = redoStack[countRedoStack-1].stickerId;
			connectedList = redoStack[countRedoStack-1].connectedList;

			count++;

			countRedoStack--;
			
			if(countRedoStack == 0) {
				top.frames["upper_bar_frame"].document.getElementById('id_redo_icon').style.opacity = 0.5;
				top.frames["upper_bar_frame"].document.getElementById('id_redo_icon').style.filter = "alpha(opacity=50)"; //For IE;
			}
			
			set_boxes_height();

		} else {
			pressedPrev = 0;
		}
		
		
		
	}
	


}


function prevStep() {

	if(!systemPause && count > 0) {
		
		if((count %5) >= 0) {

			if(pressedPrev < 5 && count -2 >= 0) {
				pressedPrev++;
			}
			
			
			
			if(pressedPrev < 5 && count > 1) {
				
				count--;

				if(count == 1) {
					top.frames["upper_bar_frame"].document.getElementById('id_undo_icon').style.opacity = 0.5;
					top.frames["upper_bar_frame"].document.getElementById('id_undo_icon').style.filter = "alpha(opacity=50)"; //For IE;
				}
				
				

				if(count-1 < 5 && count-1 >= 0) {
					
					countRedoStack++;
					
					top.frames["upper_bar_frame"].document.getElementById('id_redo_icon').style.opacity = 1;
					top.frames["upper_bar_frame"].document.getElementById('id_redo_icon').style.filter = "alpha(opacity=100)"; //For IE;
					
					
					document.body.innerHTML = undoStack[count-1].HTML;
					
					appLoaded = JSON.parse(JSON.stringify(undoStack[count-1].appLoaded));
					widgetElementList = JSON.parse(JSON.stringify(undoStack[count-1].widgetElementList));
					widgetElementListMap = JSON.parse(JSON.stringify(undoStack[count-1].widgetElementListMap));
					stickerElementList = JSON.parse(JSON.stringify(undoStack[count-1].stickerElementList));
					positionList = JSON.parse(JSON.stringify(undoStack[count-1].positionList));
					stickerElementListMap = JSON.parse(JSON.stringify(undoStack[count-1].stickerElementListMap));
					userIsLogin = JSON.parse(JSON.stringify(undoStack[count-1].userIsLogin));
					operationUniqueId = JSON.parse(JSON.stringify(undoStack[count-1].operationUniqueId));
					widget_box_visible = JSON.parse(JSON.stringify(undoStack[count-1].widget_box_visible));
					output_box_visible = JSON.parse(JSON.stringify(undoStack[count-1].output_box_visible));
					zIndexInt = JSON.parse(JSON.stringify(undoStack[count-1].zIndexInt));
					widgetId = JSON.parse(JSON.stringify(undoStack[count-1].widgetId));
					stickerId = JSON.parse(JSON.stringify(undoStack[count-1].stickerId));
					connectedList = JSON.parse(JSON.stringify(undoStack[count-1].connectedList));
					

					if(count >=5) {
						redoStack[countRedoStack-1] = JSON.parse(JSON.stringify(undoStack[count % 5]));	
						
					}else {
						redoStack[countRedoStack-1] = JSON.parse(JSON.stringify(undoStack[count]));
						
					}
					

				}else {
					
					if(count -1 >= 0) {
						
						countRedoStack++;
						
						document.body.innerHTML = JSON.parse(JSON.stringify(undoStack[(count -1) % 5].HTML));
						
						appLoaded = JSON.parse(JSON.stringify(undoStack[(count -1) % 5].appLoaded));
						widgetElementList = JSON.parse(JSON.stringify(undoStack[(count -1) % 5].widgetElementList));
						widgetElementListMap = JSON.parse(JSON.stringify(undoStack[(count -1) % 5].widgetElementListMap));
						stickerElementList = JSON.parse(JSON.stringify(undoStack[(count -1) % 5].stickerElementList));
						stickerElementListMap = JSON.parse(JSON.stringify(undoStack[(count -1) % 5].stickerElementListMap));
						positionList = JSON.parse(JSON.stringify(undoStack[(count -1) % 5].positionList));
						userIsLogin = JSON.parse(JSON.stringify(undoStack[(count -1) % 5].userIsLogin));
						operationUniqueId = JSON.parse(JSON.stringify(undoStack[(count -1) % 5].operationUniqueId));
						widget_box_visible = JSON.parse(JSON.stringify(undoStack[(count -1) % 5].widget_box_visible));
						output_box_visible = JSON.parse(JSON.stringify(undoStack[(count -1) % 5].output_box_visible));
						zIndexInt = JSON.parse(JSON.stringify(undoStack[(count -1) % 5].zIndexInt));
						widgetId = JSON.parse(JSON.stringify(undoStack[(count -1) % 5].widgetId));
						stickerId = JSON.parse(JSON.stringify(undoStack[(count -1) % 5].stickerId));
						connectedList = JSON.parse(JSON.stringify(undoStack[(count -1) % 5].connectedList));

						if(count >=5) {
							redoStack[countRedoStack-1] = JSON.parse(JSON.stringify(undoStack[count % 5]));	
						}else {
							redoStack[countRedoStack-1] = JSON.parse(JSON.stringify(undoStack[count]));	
						}
						
					}


				}
				
			}
			
			
			
			set_boxes_height();
			

		}

		
	}
		
	
	
	
}