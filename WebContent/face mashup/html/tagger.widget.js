function classWidgetTagger(widgetId) {

			var i = 0;

			this.type = 'POST tagger widget';
			this.inputType = [ '005', '012' ];

			this.wf = [
					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : 'img/widget_body/photosVideosOrPost.png',
						fieldType : '004',
						fieldName : 'Contenuto in cui verranno taggati i tuoi amici',
						fieldPath : '',
						fieldSelect : true,
						elementId : 'main_element_id_' + widgetId, //nei widgte di POST il main indica l'elemento che dev'essere evidenziato quando si trascina un elemento compatibile con gli input type del widget stesso
						valueId : '',
						fieldGraphicalPath : '',
						graphicalValue : '',
						selectedForConnection : []

					},

					{
						fieldID : widgetId + '_' + i++,
						defaultGraphicalValue : 'Lista amici taggati',
						fieldType : '008',
						fieldName : 'Lista degli utenti taggati nel contenuto',
						fieldPath : '',
						fieldSelect : true,
						valueId : '',
						fieldGraphicalPath : '',
						graphicalValue : '',
						elementId : 'users_tag_' + widgetId,
						selectedForConnection : []
					}, ];

		}

function loadTaggerWidget() {
	
	return (
			
			'<div id="widget_body_'
			+ widgetId
			+ '" class="div_post_widget_bg" onmouseout="javascript:mouseOutThisWidget(this)" onmouseover="javascript:mouseOverThisWidget(this)">' +
			
			'<div style="position:relative" id="header'
			+ widgetId
			+ '" draggable="false" onmousedown="javascript:dragWidget(this)"> '+
				'<img src="img/widget_body/header_shadow.png" style=\'width:800px; height:40px; \' draggable="false"/>'+
				
				'<p id="widget_name_'
				+ widgetId
				+ '"style="color:dadada; position: absolute; top: -6px; left:30px; font-size:20px; font-family: sans">widget no. <b>'+ widgetId +' Tagger</b></p>'+
			
				'<img src="img/widget_body/widget_close.png" style="position: absolute; top: 16px; left: 750px; bottom: 5px;" onclick="javascript:deleteWidget(this)"/>'+
				'<img href="javascript:;" onClick="window.open(\'help/tagger_help.html\', \'MANUALE UTENTE\', \'width=1000, height=500, resizable, status, scrollbars=1, location=yes\')" src="img/widget_body/widget_help.png" style="position: absolute; top: 15px; left: 720px; bottom: 6px;"/>'+

			'</div>'+
			
			'<div id="inner_'
			+ widgetId
			+ '" class="div-photo-widget-inner">'+
			
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
				
				
				'<img id="loading_'
					+ widgetId
					+ '" src="img/loading.gif" style="position: absolute; top: 180px; left: 90px; bottom: 5px; z-index = 2000"/>'+
						
				
					'<p  draggable="false" id="help_text_'
					+ widgetId
					+ '" style="position: absolute; top: 130px; left: 60px; font-size:15px; font-family: sans "> <font color="black">Release here the contents<br/>on which you wish<br/>to tag your friends</font> </p>'+
				
					'<img id="main_element_id_'
				+ widgetId
				+ '" src="img/widget_body/photosVideosOrPost.png" style="position: absolute; top: 205px; left: 60px; bottom: 5px" draggable="false"/>'+
					
					
				'<p  draggable="false" id="help_text_'
				+ widgetId
				+ '" style="position: absolute; top: 170px; left: 330px; font-size:15px; font-family: sans "> <font color="black">Drag here the list of friends that you want to tag</font> </p>'+
			
				
					'<img src="img/widget_body/widget_inner_bar.png" style="position: absolute; top: 205px; left: 330px; bottom: 0px"/>'+
					
					'<div  class="small_div" style="position: absolute; top: 220px; left: 350px;"> <p onclick="javascript:showConnectedElementOp(this)" draggable="false" id="users_tag_'+ widgetId + '" style=" font-size:15px; font-family: sans "> <font color="grey">With </font><font color="black">Name of tagged user </font> </p>'+
				    '</div>' +
					
					
					'<img src="img/widget_body/widget_inner_bar.png" style="position: absolute; top: 320px; left: 330px; bottom: 0px"/>'+
					
				
				'</div>'+

			'</div>'+
			
			'<img src="img/widget_body/footer_shadow_bar.png" style=" width:735px; height:12px; position: absolute; top: 380px; left: 0px"/>'+
			
			'<p name = "ok" draggable="false" id="infoPostText_'
			+ widgetId
			+ '" style="position: absolute; top: 392px; left: 90px; font-size:15px; font-family: sans"> <font color="white">You are tagging <em id="firstFieldText_'+widgetId+'"> 0 </em> friends in <em id="secondFieldText_'+widgetId+'"> 0 </em> elements</font></p> '+
		
			'<img onclick="javascript:confermPostOperation(this)" id="confermOperation_'+widgetId+'" src="img/executeOpButton.png" style="position: absolute; top: 400px; left: 610px"/>'+
			
		'</div>'
	
	);
	
	
	
}