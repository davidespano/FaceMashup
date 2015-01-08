function classWidgetPosts(widgetId) {

			var i = 0;

			this.type = 'posts widget';

			//input: user, lista di user, id di un video, lista di id foto 
			this.inputType = [ '001', '008', '011' ];

			//elementi del widget
			this.wf = [
					
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : 'img/widget_body/user_picture.png',
						fieldType : '011',
						fieldName : 'List of users\' photos',
						fieldPath : '{-from-/-id',
						fieldSelect : true,
						valueId : '',
						graphicalValue : '',
						fieldGraphicalPath : '',
						elementId : 'user_picture_' + widgetId,
						selectedForConnection : []
					},
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : 'Published by ',
						fieldType : '001',
						fieldName : 'List of users who have published the content',
						fieldPath : '{-from-/-id',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '{-from-/-name',
						graphicalValue : '',
						elementId : 'publisched_by_text_' + widgetId,
						selectedForConnection : []
					},
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : 'Date',
						fieldType : '006',
						fieldName : 'Publication dates',
						fieldPath : '/-updated_time',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '',
						graphicalValue : '',
						elementId : 'data_text_' + widgetId,
						selectedForConnection : []
					},
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : 'Text of post',
						fieldType : '013',
						fieldName : 'List of posts',
						fieldPath : '/-id',
						fieldSelect : true,
						valueId : '',
						graphicalValue : '',
						fieldGraphicalPath : '/-message',
						elementId : 'post_message_' + widgetId,
						selectedForConnection : []
					},
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : 'Tagged friends',
						fieldType : '008',
						fieldName : 'List of tagged friends',
						fieldPath : '{-tags-[-data-/-id',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '{-tags-[-data-/-name',
						graphicalValue : '',
						elementId : 'tagged_friends_' + widgetId,
						selectedForConnection : []
					},
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : 'in - place of photo',
						fieldType : '009',
						fieldName : 'List of posts\' places',
						fieldPath : '{-place-/-id',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '{-place-/-name',
						graphicalValue : '',
						elementId : 'content_place_' + widgetId,
						selectedForConnection : []
					},
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : 'list of friends who liked this',
						fieldType : '008',
						fieldName : 'list of friends who liked this',
						fieldPath : '{-likes-[-data-/-id',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '{-likes-[-data-/-name',
						graphicalValue : '',
						elementId : 'users_like_' + widgetId,
						selectedForConnection : []
					}, ];

		}

function loadPostsWidget() {
	
	//helpText ='<i> <b><br>NESSUN CONTENUTO DISPONIBILE</br></b> <br>Questo widget mostrerà tutti gli stati che hai pubblicato.</br> <br>Trascina all\'interno di questo widget un nome o una foto del profilo</br> <br>o un insieme di nomi o foto del profilo per visualizzare gli stati corrispondenti</br> </i>';
	//helpText ='<i> <b><br>NO AVAILABLE CONTENT</br></b> <br>This widget shows your posts or posts of your friends</br> <br>Drag here a name or a user\'s photo </br> <br>or a list of usernames or users\' photos.</br> </i>';
	helpText ='<i><b>NO AVAILABLE CONTENT<br><br></b> This widget shows your or your friend\'s posts.<br> Please drag here one among the following elements:<br><br> 1) a username<br> 2) a user’s photo<br> 3) a list of username<br> 4) a list of users’ photos.</i>';


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
				+ '"style="color:dadada; position: absolute; top: -6px; left:30px; font-size:20px; font-family: sans">widget no. <b>'+ widgetId +' - Posts</b></p>'+
			
				'<img src="img/widget_body/widget_close.png" style="position: absolute; top: 16px; left: 750px; bottom: 5px;" onclick="javascript:deleteWidget(this)"/>'+
				'<img href="javascript:;" onClick="window.open(\'help/posts_help.html\', \'MANUALE UTENTE\', \'width=1000, height=500, resizable, status, scrollbars=1, location=yes\')" src="img/widget_body/widget_help.png" style="position: absolute; top: 15px; left: 720px; bottom: 6px;"/>'+

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
						
				
						
				'<img id="user_picture_'
				+ widgetId
				+ '" src="img/widget_body/user_picture.png" style="width:35px; position: absolute; top: 160px; left: 80px; bottom: 5px" onmousedown="javascript:dragFieldForConnection(this)" draggable="false"/>'+
					
					'<p onmousedown="javascript:dragFieldForConnection(this)" draggable="false" id="publisched_by_text_'
				+ widgetId
				+ '" style="position: absolute; top: 135px; left: 130px; font-size:22px; font-family: sans ">Pubblicato da</p>'+
					'<p onmousedown="javascript:dragFieldForConnection(this)" draggable="false" id="data_text_'
				+ widgetId
				+ '" style="position: absolute; top: 165px; left: 130px; font-size:15px; font-family: sans ">Data</p>'+
					
					'<img src="img/widget_body/widget_inner_bar.png" style="width:650; height:2; position: absolute; top: 205px; left: 75px; bottom: 0px"/>'+
					
					'<div class="div_posts_status_text" style="position:absolute; top: 205px; left: 130px;">' +
					
					'<p onmousedown="javascript:dragFieldForConnection(this)" draggable="false" id="post_message_'
					+ widgetId
					+ '" style="position:absolute; top: -15; font-size:24px; font-family: sans ">Testo del post</p>'+
					
					'</div>' +
					
					'<img src="img/widget_body/widget_inner_bar.png" style="width:650; height:2; position: absolute; top: 280px; left: 75px; bottom: 0px"/>'+
					
					'<p onmousedown="javascript:dragFieldForConnection(this)" draggable="false" id="tagged_friends_'
					+ widgetId
					+ '" style="position: absolute; top: 280px; left: 130px; font-size:15px; font-family: sans "> <font color="grey">Con </font><font color="black">Nomi amici taggati </font> </p>'+
					
					'<p onmousedown="javascript:dragFieldForConnection(this)" draggable="false" id="content_place_'
						+ widgetId
						+ '" style="position: absolute; top: 300px; left: 130px; font-size:15px; font-family: sans "> <font color="grey">presso </font> <font color="black">Luogo del post</font> </p>' +

					
					'<img src="img/widget_body/black_transparent_bg.png" style="width:350; height:20; position: absolute; top: 340px; left: 125px; bottom: 0px"/>'+
					
					'<p onmousedown="javascript:dragFieldForConnection(this)" draggable="false" id="users_like_'
					+ widgetId
					+ '" style="position: absolute; top: 326px; left: 130px; font-size:15px; font-family: sans"> <font color="grey">Piace a </font><font color="black">Nomi utente che hanno messo mi piace </font></p> '+
					
					'<img src="img/widget_body/widget_inner_bar.png" style="width:650; height:2; position: absolute; top: 370px; left: 75px; bottom: 0px"/>'+
					
				
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