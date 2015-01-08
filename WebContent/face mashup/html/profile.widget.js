function classWidgetProfile(widgetId) {

			var i = 0;

			this.type = 'profile widget';

			
			this.inputType = [ '001', '008', '011' ];

			//elementi del 
			this.wf = [
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : 'img/widget_body/user_picture.png',
						fieldType : '011',
						fieldName : 'Foto del profilo',
						fieldPath : '/-id',
						fieldSelect : true,
						valueId : '',
						graphicalValue : '',
						fieldGraphicalPath : '',
						elementId : 'user_picture_' + widgetId,
						selectedForConnection : []
					},
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : 'Nome Utente',
						fieldType : '001',
						fieldName : 'Nome utente',
						fieldPath : '/-id',
						fieldSelect : true,
						valueId : '',
						graphicalValue : '',
						fieldGraphicalPath : '/-name',
						elementId : 'name_of_user_' + widgetId,
						selectedForConnection : []
					},
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : 'mail',
						fieldType : '007',
						fieldName : 'email dell\'utente',
						fieldPath : '/-email',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '/-email',
						graphicalValue : '',
						elementId : 'mail_of_user_' + widgetId,
						selectedForConnection : []
					},
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : 'data',
						fieldType : '006',
						fieldName : 'Data di nascita dell\'utente',
						fieldPath : '/-birthday',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '',
						graphicalValue : '',
						elementId : 'birth_of_user_' + widgetId,
						selectedForConnection : []
					},
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : 'sesso',
						fieldType : '007',
						fieldName : 'Sesso dell\'utente',
						fieldPath : '/-gender',
						fieldSelect : true,
						valueId : '',
						graphicalValue : '',
						fieldGraphicalPath : '/-gender',
						elementId : 'gender_of_user_' + widgetId,
						selectedForConnection : []
					},
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : 'istruzione',
						fieldType : '007',
						fieldName : 'Istruzione dell\'utente',
						fieldPath : '[-education-{-school-/-name',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '[-education-{-school-/-name',
						graphicalValue : '',
						elementId : 'education_of_user_' + widgetId,
						selectedForConnection : []
					},
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : 'stato',
						fieldType : '007',
						fieldName : 'Relazione sentimentale dell\'utente',
						fieldPath : '/-relationship_status',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '/-relationship_status',
						graphicalValue : '',
						elementId : 'relationship_of_user_' + widgetId,
						selectedForConnection : []
					},
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : '',
						fieldType : '001',
						fieldName : 'Nome utente del partner',
						fieldPath : '{-significant_other-/-id',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '{-significant_other-/-name',
						graphicalValue : '',
						elementId : 'other_significant_of_user_' + widgetId,
						selectedForConnection : []
					}, 
					
					////////////////////////////////////
				    //elementi di contorno
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : '',
						fieldType : '',
						fieldName : '',
						fieldPath : '',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '',
						graphicalValue : '',
						elementId : 'mail_string_' + widgetId,
						selectedForConnection : []
					}, 
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : '',
						fieldType : '',
						fieldName : '',
						fieldPath : '',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '',
						graphicalValue : '',
						elementId : 'birth_string_' + widgetId,
						selectedForConnection : []
					}, 
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : '',
						fieldType : '',
						fieldName : '',
						fieldPath : '',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '',
						graphicalValue : '',
						elementId : 'gender_string_' + widgetId,
						selectedForConnection : []
					}, 
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : '',
						fieldType : '',
						fieldName : '',
						fieldPath : '',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '',
						graphicalValue : '',
						elementId : 'education_string_' + widgetId,
						selectedForConnection : []
					}, 
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : '',
						fieldType : '',
						fieldName : '',
						fieldPath : '',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '',
						graphicalValue : '',
						elementId : 'relationship_string_' + widgetId,
						selectedForConnection : []
					}, 
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : '',
						fieldType : '',
						fieldName : '',
						fieldPath : '',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '',
						graphicalValue : '',
						elementId : 'with_string_' + widgetId,
						selectedForConnection : []
					}, 
					
					
					
					];

		}

function loadProfileWidget() {

	//helpText ='<i> <b><br>NESSUN CONTENUTO DISPONIBILE</br></b> <br>Questo widget mostrerà il tuo profilo o quello dei tuoi amici.</br> <br>Trascina all\'interno di questo widget un nome o una foto del profilo</br> <br>o un insieme di nomi o foto del profilo per visualizzare i profili corrispondenti</br> </i>';
	helpText ='<i><b>NO AVAILABLE CONTENT<br><br></b> This widget shows your or your friend\'s profile.<br> Please drag here one among the following elements:<br><br> 1) a username<br> 2) a user’s photo<br> 3) a list of username<br> 4) a list of users’ photos.</i>';

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
			+ '"style="color:dadada; position: absolute; top: -6px; left:30px; font-size:20px; font-family: sans">widget no. <b>'+ widgetId +' Profile</b></p>'+

			'<img src="img/widget_body/widget_close.png" style="position: absolute; top: 16px; left: 750px; bottom: 5px;" onclick="javascript:deleteWidget(this)"/>'+
			'<img href="javascript:;" onClick="window.open(\'help/profile_help.html\', \'MANUALE UTENTE\', \'width=1000, height=500, resizable, status, scrollbars=1, location=yes\')" src="img/widget_body/widget_help.png" style="position: absolute; top: 15px; left: 720px; bottom: 6px;"/>'+

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
			+ '" style="position: absolute; top: 140px; left: 70px; z-index:1000; font-size:18px; font-family: sans "> '+ helpText +' </p>' +


			'<img id="loading_'
			+ widgetId
			+ '" src="img/loading.gif" style="position: absolute; top: 180px; left: 90px; bottom: 5px; z-index = 2000"/>'+

			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


			'<img id="user_picture_'
			+ widgetId
			+ '" src="img/widget_body/user_picture.png" style="position: absolute; top: 170px; left: 60px; bottom: 5px"  onmousedown="javascript:dragFieldForConnection(this)" draggable="false"/>'+

			'<p onmousedown="javascript:dragFieldForConnection(this)" draggable="false" id="name_of_user_'
			+ widgetId
			+ '" style="position: absolute; top: 130px; left: 270px; font-size:30px; font-family: sans "><b>Nome Utente</b></p>'+

			'<img src="img/widget_body/widget_inner_bar.png" style="position: absolute; top: 200px; left: 270px; bottom: 0px"/>'+

			'<p id="mail_string_'+widgetId+'" draggable="false"style="position: absolute; top: 190px; left: 270px; font-size:20px; font-family: sans "><b>e-mail: </b></p>'+

			'<p onmousedown="javascript:dragFieldForConnection(this)" draggable="false" id="mail_of_user_'
			+ widgetId
			+ '" style="position: absolute; top: 190px; left: 340px; font-size:20px; font-family: sans ">mail</p>'+


			'<p id="birth_string_'+widgetId+'" draggable="false"style="position: absolute; top: 215px; left: 270px; font-size:20px; font-family: sans "><b>data di nascita:</b></p>'+

			'<p onmousedown="javascript:dragFieldForConnection(this)" draggable="false" id="birth_of_user_'
			+ widgetId
			+ '" style="position: absolute; top: 215px; left: 410px; font-size:20px; font-family: sans ">data</p>'+

			'<p id="gender_string_'+widgetId+'" draggable="false"style="position: absolute; top: 240px; left: 270px; font-size:20px; font-family: sans "><b>sesso:</b></p>'+

			'<p onmousedown="javascript:dragFieldForConnection(this)" draggable="false" id="gender_of_user_'
			+ widgetId
			+ '" style="position: absolute; top: 240px; left: 335px; font-size:20px; font-family: sans ">sesso</p>'+

			'<p id="education_string_'+widgetId+'" draggable="false"style="position: absolute; top: 265px; left: 270px; font-size:20px; font-family: sans "><b>istruzione:</b></p>'+

			'<p onmousedown="javascript:dragFieldForConnection(this)" draggable="false" id="education_of_user_'
			+ widgetId
			+ '" style="position: absolute; top: 265px; left: 370px; font-size:20px; font-family: sans ">istruzione</p>'+

			'<p id="relationship_string_'+widgetId+'" draggable="false"style="position: absolute; top: 290px; left: 270px; font-size:20px; font-family: sans "><b>relazione sentimentale:</b></p>'+

			'<p onmousedown="javascript:dragFieldForConnection(this)" draggable="false" id="relationship_of_user_'
			+ widgetId
			+ '" style="position: absolute; top: 290px; left: 480px; font-size:20px; font-family: sans ">stato</p>'+

			'<p id="with_string_'+widgetId+'" draggable="false"style="position: absolute; top: 315px; left: 270px; font-size:20px; font-family: sans "><b>con:</b></p>'+

			'<p onmousedown="javascript:dragFieldForConnection(this)" draggable="false" id="other_significant_of_user_'
			+ widgetId
			+ '" style="position: absolute; top: 315px; left: 310px; font-size:20px; font-family: sans ">nome utente</p>'+




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