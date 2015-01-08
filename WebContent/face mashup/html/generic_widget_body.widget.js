function classWidgetLogin(widgetId) {

			var i = 0;

			this.type = 'login widget';
			this.inputType = [];

			//contiene gli elementi del widget. In questo caso l'unico dato che viene ottenuto dalal richiesta di login � l'access token. 
			//Tuttavia vengono scaricate ulteriori informazioni riguardanti lo user id, il first name, il last name e la foto del profilo
			this.wf = [ {
				fieldID : widgetId + '_' + i++,
				defaultGraphicalValue : '',
				fieldType : '001',
				fieldName : 'User Id',
				fieldPath : '',
				fieldSelect : true,
				elementId : '',
				valueId : '',
				fieldGraphicalPath : '',
				graphicalValue : '',
				selectedForConnection : []

			}, {
				fieldID : widgetId + '_' + i++,
				defaultGraphicalValue : '',
				fieldType : '000',
				fieldName : 'Access token',
				fieldPath : '',
				fieldSelect : true,
				elementId : '',
				valueId : '',
				fieldGraphicalPath : '',
				graphicalValue : '',
				selectedForConnection : []
			}, {
				fieldID : widgetId + '_' + i++,
				defaultGraphicalValue : 'nome: Nome utente',
				fieldType : '001',
				fieldName : 'Nome dell\'utente',
				fieldPath : '',
				fieldSelect : true,
				elementId : 'username_id_' + widgetId,
				valueId : '',
				fieldGraphicalPath : '',
				graphicalValue : '',
				selectedForConnection : []
			}, {
				fieldID : widgetId + '_' + i++,
				defaultGraphicalValue : 'img/widget_body/user_picture.png',
				fieldType : '011',
				fieldName : 'Foto del profilo',
				fieldPath : '',
				fieldSelect : true,
				elementId : 'profile_picture_id_' + widgetId,
				valueId : '',
				fieldGraphicalPath : '',
				graphicalValue : '',
				selectedForConnection : []
			} ];

		}

function loadBodyWidget() {

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
			+ '"style="color:dadada; position: absolute; top: -6px; left:30px; font-size:20px; font-family: sans">widget no. <b>'+ widgetId +' Login</b></p>'+
		

			'<img src="img/widget_body/widget_close.png" style="position: absolute; top: 16px; left: 470px; bottom: 5px;" onclick="javascript:deleteWidget(this)"/>'
			+ '<img href="javascript:;" onClick="window.open(\'help/login_help.html\', \'MANUALE UTENTE\', \'width=1000, height=500, resizable, status, scrollbars=1, location=yes\')" src="img/widget_body/widget_help.png" style="position: absolute; top: 15px; left: 440px; bottom: 6px;"/>'
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

			'<b style="position: absolute; top: 95px; left: 60px; font-size:20px; font-family: sans ">Login</b>'
			+ '<img src="img/widget_body/body_hor_rect.png" style="position: absolute; top: 120px; left: 60px"/>'
			+

			'<img draggable="false" id="profile_picture_id_'
			+ widgetId
			+ '"src="img/widget_body/user_picture.png" style="position: absolute; top: 150px; left: 80px;" onmousedown="javascript:dragFieldForConnection(this)"/>'
			+

			'<p onmousedown="javascript:dragFieldForConnection(this)" draggable="false" id="username_id_'
			+ widgetId
			+ '"style="position: absolute; top: 150px; left: 270px; font-size:18px; font-family: sans ">name: <b>User name</b></p>' +
			
			'<button onmousedown="javascript:initThis(this)" id="loginButton_'+ widgetId
			+ '" style="position: absolute; top: 200px; left: 330px;">Log in</button>' +

			'<img src="img/widget_body/body_hor_rect.png" style="position: absolute; top: 330px; left: 60px"/>'
			+
			
			'</div>'
			+

			'</div>'
			+

			'<img src="img/widget_body/footer_shadow_bar.png" style="position: absolute; top: 380px; left: 0px"/>' +

	'</div>');

}

function initThis(element) {
	initButton(element);
}