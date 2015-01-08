function getGraphicalDiv(wfElementsList, elementId, typeOfField, widgetSourceIndex) {
	
	//controlliamo il typeOfField per vedere se l'elemento trasportato è una stringa o un'immagine
	var type = getTypeOfField(typeOfField);
	var index = [];
	//controlliamo il numero di campi presenti in wfElementsList
	//var length = wfElementsList.length;
	
	var length = widgetElementList[widgetSourceIndex].numOfElementSelected;
	
	if(length == 0) {
		
		return '<div id=\'draggedImageOfFieldId\' draggable="false">' +

		'<div id=\'img_div\' class=\'rotate_-5\' draggable="false">' +
			'<img draggable="false" id=\'upper_img_0\' src=\'img/noContent.png\' style=\'position: absolute; top:12px; left: 20px; z-index : 1; width:150; height: 135\'/>' +
			'<img draggable="false" id=\'shadow_img_0\' src=\'img/shadow_img.png\' style=\'position: absolute; top:8px; left: 15px; z-index : 0\'/> </div> ' +
			'<img draggable="false" id=\'upper_img_1\' src=\'img/rect_for_text.png\' style=\'position: absolute; top:147px; left: 5px; z-index : 1\'/> ' +
			'<p  class = "nowrap" draggable="false" id=\'text_of_dragged_element\' style=\'position: absolute; top:140px; left: 15px; z-index : 2; font-size:15px; font-family: sans"\'> you are not dragging anything </p> </div>';

	}
	
	
	
	if(type == 'img') {

		if(length == 1) {
			
			
			//cerchiamo l'elemento selezionato
			for(var i = 0; i < wfElementsList.length; i++) {
				if(wfElementsList[i].elementSelected) {
					index.push(i);
					break;
				}
			}
			
			var srcImage = 'img/upper_img.png';		
			for(var i = 0; i < wfElementsList[index[0]].wf.length; i++) {
				
				if(wfElementsList[index[0]].wf[i].elementId == elementId) {
					//elemento trovato.
					srcImage = wfElementsList[index[0]].wf[i].graphicalValue;
					
					break;
					
				}
				
			}
			
			return '<div id=\'draggedImageOfFieldId\' draggable="false">' +

			'<div id=\'img_div\' class=\'rotate_-5\' draggable="false">' +
				'<img draggable="false" id=\'upper_img_0\' src=\''+ srcImage +'\' style=\'position: absolute; top:12px; left: 20px; z-index : 1; width:150; height: 135\'/>' +
				'<img draggable="false" id=\'shadow_img_0\' src=\'img/shadow_img.png\' style=\'position: absolute; top:8px; left: 15px; z-index : 0\'/> </div> ' +
				'<img draggable="false" id=\'upper_img_1\' src=\'img/rect_for_text.png\' style=\'position: absolute; top:147px; left: 5px; z-index : 1\'/> ' +
				'<p  class = "nowrap" draggable="false" id=\'text_of_dragged_element\' style=\'position: absolute; top:140px; left: 15px; z-index : 2; font-size:15px; font-family: sans"\'> You\'re dragging an element </p> </div>';
			
			
		}
		
		
		if(length == 2) {
			
			var srcImage1 = 'img/upper_img.png';	
			var srcImage2 = 'img/upper_img.png';
			
			//prendiamo due elementi che siano selezionati
			for(var i = 0; i < wfElementsList.length; i++) {
				
				if(wfElementsList[i].elementSelected) {
					index.push(i);
				}
				
				if(index.length >= 2) {
					break;
				}
				
			}
			
			for(var i = 0; i < wfElementsList[0].wf.length; i++) {
				
				if(wfElementsList[0].wf[i].elementId == elementId) {
					//elemento trovato.
					srcImage1 = wfElementsList[index[0]].wf[i].graphicalValue;
					srcImage2 = wfElementsList[index[1]].wf[i].graphicalValue;
					break;
				}
				
			}
			
			return '<div draggable="false" id=\'draggedImageOfFieldId\'>' + 

			'<div draggable="false" id=\'img_div_0\' class=\'rotate_5\'>' +
				'<img draggable="false" id=\'upper_img_0\' src=\''+ srcImage1 +'\' style=\'position: absolute; top:12px; left: 20px; z-index : 1; width:150; height: 135\'/>' +
				'<img draggable="false" id=\'shadow_img_0\' src=\'img/shadow_img.png\' style=\'position: absolute; top:8px; left: 15px; z-index : 0\'/>' +
		    '</div>' +
			
			'<div draggable="false" id=\'img_div_1\' class=\'rotate_10\' style=\'position: absolute; top:12px; left: 50px; z-index : 2\'> ' +
				'<img draggable="false" id=\'upper_img_1\' src=\''+ srcImage2 +'\' style=\'position: absolute; top:12px; left: 20px; z-index : 1; width:150; height: 135\'/> ' +
				'<img draggable="false" id=\'shadow_img_1\' src=\'img/shadow_img.png\' style=\'position: absolute; top:8px; left: 15px; z-index : 0\'/>' +
		    '</div>' +
			
				'<img draggable="false" id=\'upper_img_2\' src=\'img/rect_for_text.png\' style=\'position: absolute; top:147px; left: 5px; z-index : 100\'/>' +
				'<p draggable="false" class = "nowrap" id=\'text_of_dragged_element\' style=\'position: absolute; top:140px; left: 15px; z-index : 101\'> You\'re dragging 2 elements </p>' +
			'</div>';
			
			
		}
		
		if(length > 2) {
			
			var srcImage1 = 'img/upper_img.png';	
			var srcImage2 = 'img/upper_img.png';
			var srcImage3 = 'img/upper_img.png';
			
			
			//prendiamo tre elementi che siano selezionati
			for(var i = 0; i < wfElementsList.length; i++) {
				
				if(wfElementsList[i].elementSelected) {
					index.push(i);
				}
				
				if(index.length >= 3) {
					break;
				}
				
			}
			
			for(var i = 0; i < wfElementsList[0].wf.length; i++) {
				
				if(wfElementsList[0].wf[i].elementId == elementId) {
					//elemento trovato.
					
					srcImage1 = wfElementsList[index[0]].wf[i].graphicalValue;
					srcImage2 = wfElementsList[index[1]].wf[i].graphicalValue;
					srcImage3 = wfElementsList[index[2]].wf[i].graphicalValue;
					break;
				}
				
			}
			
			return 	'<div draggable="false" id=\'draggedImageOfFieldId\'> '+

			'<div draggable="false" id=\'img_div_0\' class\=\'rotate_-5\'>' +
				'<img draggable="false" id=\'upper_img_0\' src=\''+ srcImage1 +'\' style=\'position: absolute; top:12px; left: 20px; z-index : 1; width:150; height: 135\'/>'+
				'<img draggable="false" id=\'shadow_img_0\' src=\'img/shadow_img.png\' style=\'position: absolute; top:8px; left: 15px; z-index : 0\'/>'+
		    '</div>'+
			
			'<div draggable="false" id=\'img_div_1\' class=\'rotate_10\' style=\'position: absolute; top:12px; left: 50px; z-index : 2\'>'+
				'<img draggable="false" id=\'upper_img_1\' src=\''+ srcImage2 +'\' style=\'position: absolute; top:12px; left: 20px; z-index : 1; width:150; height: 135\'/>'+
				'<img draggable="false" id=\'shadow_img_1\' src=\'img/shadow_img.png\' style=\'position: absolute; top:8px; left: 15px; z-index : 0\'/>'+
		    '</div>'+
			
			'<div draggable="false" id=\'img_div_2\' class=\'rotate_5\' style=\'position: absolute; top:12px; left: 90px; z-index : 1\'>'+
				'<img draggable="false" id=\'upper_img_2\' src=\''+ srcImage3 +'\' style=\'position: absolute; top:12px; left: 20px; z-index : 1; width:150; height: 135\'/>'+
				'<img draggable="false" id=\'shadow_img_2\' src=\'img/shadow_img.png\' style=\'position: absolute; top:8px; left: 15px; z-index : 0\'/>'+
		    '</div>'+
			
				'<img draggable="false" id=\'upper_img_3\' src=\'img/rect_for_text.png\' style=\'position: absolute; top:147px; left: 5px; z-index : 100\'/>'+
				'<p  draggable="false" class = "nowrap" id=\'text_of_dragged_element\' style=\'position: absolute; top:139px; left: 15px; z-index : 101\'> You\'re dragging '+ length +' elements </p>'+
			'</div>';
			
			
		}
		
		
		
	} else {
		//è una stringa quella che l'utente sta trasportando
		
		if(length == 1) {
			
			var text = 'indefinito';
			
			//prendiamo un elemento che sia selezionato
			for(var i = 0; i < wfElementsList.length; i++) {
				
				if(wfElementsList[i].elementSelected) {
					index.push(i);

				}
				
				if(index.length >= 1) {
					break;
				}
				
			}

			
			for(var i = 0; i < wfElementsList[0].wf.length; i++) {
				
				if(wfElementsList[index[0]].wf[i].elementId == elementId) {
					//elemento trovato.
					text = wfElementsList[index[0]].wf[i].graphicalValue;
					
					if(text.length > 25) {
						text = text.substring(0,24) + '...';
					}
					
					break;
					
				}
				
			}
			
			return '<div id=\'draggedImageOfFieldId\' draggable="false">' +

			'<div id=\'img_div\' class=\'rotate_-5\' draggable="false">' +
				'<img draggable="false" id=\'upper_img_0\' src=\'img/upper_text.png\' style=\'position: absolute; top:7px; left: 20px; z-index : 1\'/>' +
				'<p  class = "nowrap" draggable="false" id=\'text_of_dragged_element\' style=\'position: absolute; top:0px; left: 30px; z-index : 2; font-size:15px; font-family: sans"\'> '+ text +' </p> </div>' +
				'<img draggable="false" id=\'upper_img_1\' src=\'img/rect_for_text.png\' style=\'position: absolute; top:30px; left: 5px; z-index : 1\'/> ' +
				'<p  class = "nowrap" draggable="false" id=\'text_of_dragged_element\' style=\'position: absolute; top:23px; left: 15px; z-index : 2; font-size:15px; font-family: sans"\'> You\'re dragging an element </p> </div>';
			
			
		}
		
		
		if(length == 2) {
			
			var text1 = '';	
			var text2 = '';
			
			//prendiamo un elemento che sia selezionato
			for(var i = 0; i < wfElementsList.length; i++) {
				
				if(wfElementsList[i].elementSelected) {
					index.push(i);
				}
				
				if(index.length >= 2) {
					break;
				}
				
			}
			
			for(var i = 0; i < wfElementsList[0].wf.length; i++) {
				
				if(wfElementsList[index[0]].wf[i].elementId == elementId) {
					//elemento trovato.
					
					
					text1 = wfElementsList[index[0]].wf[i].graphicalValue;
					text2 = wfElementsList[index[1]].wf[i].graphicalValue;
					
					if(text2 == '') {
						text2 = text1;
					}
					
					if(text1.length > 25) {
						text1 = text1.substring(0,24) + '...';
					}
					
					if(text2.length > 25) {
						text2 = text2.substring(0,24) + '...';
					}
					

					break;
				}
				
			}
			
			return '<div id=\'draggedImageOfFieldId\' draggable="false">' +

			'<div id=\'text_div_0\' class=\'rotate_-5\' draggable="false">' +
				'<img draggable="false" id=\'upper_img_0\' src=\'img/upper_text.png\' style=\'position: absolute; top:7px; left: 20px; z-index : 1\'/>' +
				'<p  class = "nowrap" draggable="false" id=\'text_of_dragged_element\' style=\'position: absolute; top:0px; left: 30px; z-index : 2; font-size:15px; font-family: sans"\'> '+ text1 +' </p> </div>' +
				
				'<div id=\'img_div_1\' class=\'rotate_10\' draggable="false">' +
				'<img draggable="false" id=\'upper_img_1\' src=\'img/upper_text.png\' style=\'position: absolute; top:-250px; left: 40px; z-index : 1\'/>' +
				'<p  class = "nowrap" draggable="false" id=\'text_of_dragged_element\' style=\'position: absolute; top:-257px; left: 50px; z-index : 2; font-size:15px; font-family: sans"\'> '+ text2 +' </p> </div>' +
				
				'<img draggable="false" id=\'upper_img_2\' src=\'img/rect_for_text.png\' style=\'position: absolute; top:30px; left: 5px; z-index : 1\'/> ' +
				'<p  class = "nowrap" draggable="false" id=\'text_of_dragged_element\' style=\'position: absolute; top:23px; left: 15px; z-index : 2; font-size:15px; font-family: sans"\'> You\'re dragging 2 elements </p> </div>';
			
			
		}
		
		if(length > 2) {
			
			var text1 = '';	
			var text2 = '';
			var text3 = '';
			
			for(var i = 0; i < wfElementsList[0].wf.length; i++) {
				
				if(wfElementsList[0].wf[i].elementId == elementId) {
					//elemento trovato
					var count = 0;
					while(count < wfElementsList.length && text1 == '') {
						if(wfElementsList[count].elementSelected) {
							text1 = wfElementsList[count].wf[i].graphicalValue;	
						}
						count++;
					} 
					
					while(count < wfElementsList.length && text2 == '') {
						
						if(wfElementsList[count].elementSelected) {
							text2 = wfElementsList[count].wf[i].graphicalValue;	
						}
						if(text2 == text1) {
							text2 = '';
						}
						
						count++;
					}
					
					while(count < wfElementsList.length && text3 == '') {
						if(wfElementsList[count].elementSelected) {
							text3 = wfElementsList[count].wf[i].graphicalValue;	
						}
						
						if(text3 == text2 || text3 == text1) {
							text3 = '';
						}
						
						count++;
					}
					
					if(text2 == '') {
						text2 = text1;
					}
					
					if(text3 == '') {
						text3 = text2;
					}
					
					if(text1.length > 25) {
						text1 = text1.substring(0,24) + '...';
					}
					
					if(text2.length > 25) {
						text2 = text2.substring(0,24) + '...';
					}
					
					if(text3.length > 25) {
						text3 = text3.substring(0,24) + '...';
					}
					
					break;
				}
				
			}
			
			return 	'<div id=\'draggedImageOfFieldId\' draggable="false">' +

			'<div id=\'img_div_0\' class=\'rotate_-5\' draggable="false">' +
				'<img draggable="false" id=\'upper_img_0\' src=\'img/upper_text.png\' style=\'position: absolute; top:7px; left: 20px; z-index : 1\'/>' +
				'<p  class = "nowrap" draggable="false" id=\'text_of_dragged_element\' style=\'position: absolute; top:0px; left: 30px; z-index : 2; font-size:15px; font-family: sans"\'> '+ text1 +' </p> </div>' +
				
				'<div id=\'img_div_1\' class=\'rotate_10\' draggable="false">' +
				'<img draggable="false" id=\'upper_img_1\' src=\'img/upper_text.png\' style=\'position: absolute; top:-250px; left: 40px; z-index : 1\'/>' +
				'<p  class = "nowrap" draggable="false" id=\'text_of_dragged_element\' style=\'position: absolute; top:-257px; left: 50px; z-index : 2; font-size:15px; font-family: sans"\'> '+ text2 +' </p> </div>' +
				
				'<div id=\'img_div_2\' class=\'rotate_5\' draggable="false">' +
				'<img draggable="false" id=\'upper_img_2\' src=\'img/upper_text.png\' style=\'position: absolute; top:-430px; left: 10px; z-index : 1\'/>' +
				'<p  class = "nowrap" draggable="false" id=\'text_of_dragged_element\' style=\'position: absolute; top:-437px; left: 20px; z-index : 2; font-size:15px; font-family: sans"\'> '+ text3 +' </p> </div>' +
				
				'<img draggable="false" id=\'upper_img_3\' src=\'img/rect_for_text.png\' style=\'position: absolute; top:30px; left: 5px; z-index : 100\'/> ' +
				'<p  class = "nowrap" draggable="false" id=\'text_of_dragged_element\' style=\'position: absolute; top:23px; left: 15px; z-index : 200; font-size:15px; font-family: sans"\'> You\'re dragging '+ length +' elements </p> </div>';
				
		}
		
		
	}
	
	
	
}