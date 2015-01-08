//This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response);
	// The response object is returned with a status field that lets the
	// app know the current login status of the person.
	// Full docs on the response object can be found in the documentation
	// for FB.getLoginStatus().
	if (response.status === 'connected') {
		// Logged into your app and Facebook.
		testAPI();
	} else if (response.status === 'not_authorized') {
		// The person is logged into Facebook, but not your app.
		document.getElementById('status').innerHTML = 'Please log ' +
		'into this app.';
	} else {
		// The person is not logged into Facebook, so we're not sure if
		// they are logged into this app or not.
		//document.getElementById('status').innerHTML = 'Please log ' +
		//'into Facebook.';
	}
}

//This function is called when someone finishes with the Login
//Button.  See the onlogin handler attached to it in the sample
//code below.
function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

window.fbAsyncInit = function() {
	FB.init({
		appId      : '1548043445408667',
		//appId : '141873702634079', app spano
		cookie     : true,  // enable cookies to allow the server to access 
		// the session
		xfbml      : true,  // parse social plugins on this page
		version    : 'v2.1' // use version 2.1
	});

	// Now that we've initialized the JavaScript SDK, we call 
	// FB.getLoginStatus().  This function gets the state of the
	// person visiting this page and can return one of three states to
	// the callback you provide.  They can be:
	//
	// 1. Logged into your app ('connected')
	// 2. Logged into Facebook, but not your app ('not_authorized')
	// 3. Not logged into Facebook and can't tell if they are logged into
	//    your app or not.
	//
	// These three cases are handled in the callback function.

//	FB.getLoginStatus(function(response) {
//	statusChangeCallback(response);
//	});


};


//Load the SDK asynchronously
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//Here we run a very simple test of the Graph API after login is
//successful.  See statusChangeCallback() for when this call is made.

function getUserInfo(index, accessToken) {


	$.get('https://graph.facebook.com/v2.1/me?access_token='+accessToken, function(responseProfile) {

		widgetElementList[index].loaded = true;
		widgetElementList[index].numOfElementSelected = 1;
		widgetElementList[index].widgetObject.wf[0].valueId = responseProfile.id;
		widgetElementList[index].widgetObject.wf[1].valueId = accessToken;
		widgetElementList[index].widgetObject.wf[2].valueId = responseProfile.id;
		widgetElementList[index].widgetObject.wf[2].graphicalValue = responseProfile.name;
		widgetElementList[index].widgetObject.wf[3].valueId  = responseProfile.id;

		//modifica elementi grafici
		document.getElementById(widgetElementList[index].widgetObject.wf[2].elementId).innerHTML='name: ' + responseProfile.name;
		document.getElementById(widgetElementList[index].widgetObject.wf[2].elementId).title = 'Username. Drag on compatible widget';
		
		widgetElementList[index].wfElements.push({elementSelected: true, elementShowed: true, wf: widgetElementList[index].widgetObject.wf});
		//widgetElementList[index].wfElements.elementSelected = true;
		
		startComputation();
		
		var loginButton_ids = $("[id^=loginButton_]");
		
		for(var i = 0; i < loginButton_ids.length; i++) {
			makeInvisible(document.getElementById(loginButton_ids[i].id));
		}
		
		


	});

	$.get('https://graph.facebook.com/v2.1/me/picture?access_token='+accessToken+ '&redirect=false', function(responsePicture) {

		widgetElementList[index].widgetObject.wf[3].graphicalValue = responsePicture.data.url;
		

		//modifica elementi grafici
		document.getElementById(widgetElementList[index].widgetObject.wf[3].elementId).src=responsePicture.data.url;
		document.getElementById(widgetElementList[index].widgetObject.wf[3].elementId).style.width="32%"
	    document.getElementById(widgetElementList[index].widgetObject.wf[3].elementId).title = 'Photo of user. Drag on compatible widget';

	});




}