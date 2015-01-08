function classWidgetDate(widgetId) {

			var i = 0;

			this.type = 'date widget';
			this.inputType = [];

			this.wf = [ {
				fieldID : widgetId + '_' + i++,
				defaultGraphicalValue : '',
				fieldType : '006',
				fieldName : 'Data',
				fieldPath : '',
				fieldSelect : true,
				elementId : 'date_id_' + widgetId,
				valueId : '',
				fieldGraphicalPath : '',
				graphicalValue : '',
				selectedForConnection : []

			} ];

		}

function loadDateWidget() {

	var date = new Date();
	
	//viene caricatata la data corrente
	var day = date.getDate().toString();
	var month = parseInt(date.getMonth().toString());
	var year = date.getFullYear().toString();
	
	if(day < 10) {
		day = '0'+day;
	}

	var textMonth = ['Gennaio', 'Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
	
	widgetElementList[widgetElementList.length - 1].widgetObject.wf[0].graphicalValue = day +' '+ textMonth[month] +' ' + year;
	widgetElementList[widgetElementList.length - 1].widgetObject.wf[0].valueId = day +' '+ textMonth[month] +' ' + year;
	
	//inserimento dell'unico elemento della wfElements
	widgetElementList[widgetElementList.length - 1].wfElements.push({elementSelected: true, elementShowed: true, wf: widgetElementList[widgetElementList.length - 1].widgetObject.wf});
	
	var optionOfDaySelect = '';
	
	for(var i = 1; i <= 31; i++) {
		if(day == i) {
			optionOfDaySelect += '<option value="'+i+'" selected="selected">'+i+'</option>';	
		}else {
			optionOfDaySelect += '<option value="'+i+'">'+i+'</option>';
		}
	}
	
    var optionOfMonthSelect = '';
	
	for(var i = 1; i <= 12; i++) {
		if(month == i - 1) {
			optionOfMonthSelect += '<option value="'+i+'" selected="selected">'+textMonth[i - 1]+'</option>';	
		}else {
			optionOfMonthSelect += '<option value="'+i+'">'+textMonth[i - 1]+'</option>';
		}
	}
	
    var optionOfYearSelect = '';
	var startYear = year - 100;
		
	for(var i = startYear; i <= year; i++) {
		if(year == i) {
			optionOfYearSelect += '<option value="'+i+'" selected="selected">'+i+'</option>';	
		}else {
			optionOfYearSelect += '<option value="'+i+'">'+i+'</option>';
		}
	}
	
	
	
	return (
			
			'<div id="widget_body_'
			+ widgetId
			+ '" class="div_widget_bg" draggable="false" onmouseout="javascript:mouseOutThisWidget(this)" onmouseover="javascript:mouseOverThisWidget(this)"\>'
			+

			'<div style="position:relative" id="header'
			+ widgetId
			+ '" draggable="false" onmousedown="javascript:dragWidget(this)">'
			+ '<img src="img/widget_body/header_shadow.png" style=\'width:496px; height:40px; \' draggable="false"/>'
			+
			
			
			'<p id="widget_name_'
			+ widgetId
			+ '"style="color:dadada; position: absolute; top: -6px; left:30px; font-size:20px; font-family: sans">widget no. <b>'+ widgetId +' Date</b></p>'+
		

			'<img src="img/widget_body/widget_close.png" style="position: absolute; top: 16px; left: 470px; bottom: 5px;" onclick="javascript:deleteWidget(this)"/>'
			+ '<img href="javascript:;" onClick="window.open(\'help/date_help.html\', \'MANUALE UTENTE\', \'width=1000, height=500, resizable, status, scrollbars=1, location=yes\')" src="img/widget_body/widget_help.png" style="position: absolute; top: 15px; left: 440px; bottom: 6px;"/>'
			+

			'</div>'
			+

			'<div id="inner_'
			+ widgetId
			+ '" class="div-widget-inner">'
			+
			
			'<img src="img/widget_body/shadow_upper_bar.png" style=\'width:460px; height:33px;\'/>'+


			'<div id="widget_body_'
			+ widgetId
			+ '" class="div_widget_body_bg">'
			+

			'<b style="position: absolute; top: 95px; left: 60px; font-size:20px; font-family: sans ">Inserisci una data</b>'
			+ '<img src="img/widget_body/body_hor_rect.png" style="position: absolute; top: 120px; left: 60px"/>'
			+

			
			
			'<p style="position: absolute; top: 140px; left: 102px; font-size:20px; font-family: sans ">giorno</p>' +
			'<div style="position:absolute; top: 190; left: 100;">'+
			
			'<select onChange="javascript:changeDatedOfSelect(this,\'day\')" id="date_day_'+widgetId+'" class="selectClass" name="day" >'+
			optionOfDaySelect +
			
			'</select></div>'+
			
			
			'<p style="position: absolute; top: 140px; left: 192px; font-size:20px; font-family: sans ">mese</p>' +
			'<div style="position:absolute; top: 190; left: 190;">'+
			
			'<select onChange="javascript:changeDatedOfSelect(this,\'month\')" id="date_month_'+widgetId+'" class="selectClass" name="month" >'+
			optionOfMonthSelect +
			'</select></div>'+
			
			'<p style="position: absolute; top: 140px; left: 332px; font-size:20px; font-family: sans ">anno</p>' +
			'<div style="position:absolute; top: 190; left: 330;">'+
			
			'<select onChange="javascript:changeDatedOfSelect(this,\'year\')" id="date_year_'+widgetId+'" class="selectClass" name="year" >'+
			optionOfYearSelect +
			'</select></div>'+
			
			
			'<p onmousedown="javascript:dragFieldForConnection(this)" draggable="false" id="date_id_'
			+ widgetId
			+ '"style="position: absolute; top: 250px; left: 170px; font-size:18px; font-family: sans ">data: <b>'+ day +' '+ textMonth[month] +' ' + year +'</b></p>' +
			
			'<img src="img/widget_body/body_hor_rect.png" style="position: absolute; top: 310px; left: 60px"/>'
			+
			
			'<img onclick="javascript:executeOp(this)" id="executeOp_000_0_'+widgetId+'" src="img/executeOpButton.png" style="position: absolute; top: 320; left:313"/>'+

			
			'</div>'
			+

			'</div>'
			+

			'<img src="img/widget_body/footer_shadow_bar.png" style="position: absolute; top: 380px; left: 0px"/>' +
			

	'</div>');

}

function changeDatedOfSelect(element, type) {
	
	var textMonth = ['Gennaio', 'Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
	
	//recupero il widgetId per la modifica della sua wfElements
	var widgetId = element.id.split('_').pop();
	var oldDate = widgetElementList[widgetElementListMap[widgetId]].wfElements[0].wf[0].valueId;
	var date = '';	
	var day = oldDate.split(' ')[0];
	
	//modifico il valore di default della select	
	for(var i = 0; i < element.options.length; i++) {
		element.options[i].removeAttribute("selected");
	}

	element.options[element.options.selectedIndex].setAttribute("selected","selected");
	
	//un cambiamento del mese e dell'anno potrebbero portare ad un cambiamento automatico del giorno
	//se type == day si cambia solo il giorno
	if(type == 'day') {
		day = '01';
		if(element.value < 10) {
			day = '0'+element.value;
		} else {
			day = element.value;
		}
		
		date = day + ' ' + oldDate.split(' ')[1] + ' ' + oldDate.split(' ')[2];

	}
	
    if(type == 'month') {
		
    	var  daySelectElement = document.getElementById('date_day_' + widgetId);
    	
    	if(element.options.selectedIndex == 3 || element.options.selectedIndex == 5 || element.options.selectedIndex == 7 || element.options.selectedIndex == 8) {
    		//30 giorni
    		
    		//se esiste elimino l'opzione 31 dalla select del giorno
    		
    		if(daySelectElement.length == 31) {
    			daySelectElement.removeChild(daySelectElement.options[30]);
    		}
    		
    		//se ho meno giorni di 30 allora devo aggiungerli fino ad arrivarci
			for(var i = daySelectElement.length + 1; i <= 30; i++) {
				var newOption = document.createElement('option');
				newOption.appendChild( document.createTextNode(i) );
				newOption.value = i;
				daySelectElement.appendChild(newOption);
			}
			
    		//controllo sul giorno attualmente selezionato
    		if(day == 31) {
    			day = 30;
    			daySelectElement.options[29].setAttribute("selected","selected");
    		}
    		
    		
    	} else {
    		if(element.options.selectedIndex == 1) {
    			//28 0 29 giorni
    			//devo controllare l'anno per sapere se è bisestile
    			var  yearSelectElement = document.getElementById('date_year_' + widgetId);
    			var numOfDay = 28;
    			
    			if((yearSelectElement.value % 400 == 0 || 
    					  (yearSelectElement.value % 100 != 0 && yearSelectElement.value % 4 == 0))) {
    				//anno bisestile. 29 giorni
    				numOfDay = 29;
    			}
    			
    			var dayLength = daySelectElement.length;
    			
    			//eliminazione degli elementi con indice maggiore al numOfDay
    			for(var i = dayLength; i > numOfDay; i--) {
    				daySelectElement.removeChild(daySelectElement.options[i-1]);	
    			}
    			
    			//controllo il giorno precedentemente selezionato
        		if(day > numOfDay) {
        			day = numOfDay;
        			daySelectElement.options[numOfDay - 1].setAttribute("selected","selected");
        		}
    			
    			
    		} else {
    			//31 giorni
    			for(var i = daySelectElement.length + 1; i <= 31; i++) {
    				var newOption = document.createElement('option');
    				newOption.appendChild( document.createTextNode(i) );
    				newOption.value = i;
    				daySelectElement.appendChild(newOption);
    			}
    			
    			
    		}
    	}
    	
    	

    	date = day + ' ' + textMonth[element.options.selectedIndex] + ' ' + oldDate.split(' ')[2];
    	
    	
    	
		
		
	}
    
    if(type == 'year') {
    	
    	var  monthSelectElement = document.getElementById('date_month_' + widgetId);
    	var  daySelectElement = document.getElementById('date_day_' + widgetId);
    	
    	//controllo se il mese selezionato è febbraio
    	if(monthSelectElement.options.selectedIndex == 1) {
    		//il mese è febbraio.
    		//controllare se l'anno è bisestile
    		
    		var numOfDay = 28;
    		
    		if((element.value % 400 == 0 || 
					  (element.value % 100 != 0 && element.value % 4 == 0))) {
				//anno bisestile. 29 giorni
				numOfDay = 29;
			}
    		
    		if(daySelectElement.length == 28 && numOfDay == 29) {
    			//aggiungere opzione 
    			var newOption = document.createElement('option');
				newOption.appendChild( document.createTextNode(29) );
				newOption.value = 29;
				daySelectElement.appendChild(newOption);
    			
    		} else {
    			
    			if(daySelectElement.length == 29 && numOfDay == 28) {
    				//devo eliminare una opzione
    				daySelectElement.removeChild(daySelectElement.options[28]);
    				daySelectElement.options[27].setAttribute("selected","selected");
    			}
    			
    		}
    		
    		if(day == 29) {
    			day = numOfDay;
    		}
    		
    		
    	}
    	
    	
		date = day + ' ' + oldDate.split(' ')[1] + ' ' + element.value;
	}
	
  //modifica wfElements
	widgetElementList[widgetElementListMap[widgetId]].wfElements[0].wf[0].graphicalValue = date;
	widgetElementList[widgetElementListMap[widgetId]].wfElements[0].wf[0].valueId = date;
	
	makeVisible(document.getElementById('executeOp_000_0_'+widgetId));
	widgetElementList[widgetElementListMap[widgetId]].op[0].processed = false;
	widgetElementList[widgetElementListMap[widgetId]].op[0].confermed = false;
	
	document.getElementById('date_id_'+widgetId).innerHTML = 'data: <b>'+ date +'</b>';

}