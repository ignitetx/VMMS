/*Hide all pages but splash screen on load.*/
$(document).ready(function() {
	/**/
	$(".page").hide();
	$("#page1").show();
	test_connection();
	
	/*Load Screen*/
	setTimeout(function(){
		$('body').addClass('loaded');
		$('h1').css('color','#222222');
	}, 200);
	
	/**/
	get_users();
	get_logs();
	get_trucks();
	
	/**/
	milage_check();
	remark_check();
	get_repairs();
	parts_check();
	
	/**/
	StatusBar.show();
});

/*Load function which manages what page to show and which to hide.*/
function load(page, dbPage) {
	var page;
	
	$(".page").hide();
	$("#" + page).show();
	
	$(".title").hide();
	
	if(dbPage != '1' && dbPage != '0') {
		set_page(dbPage);
	}
	else if(dbPage == '1') {
		set_page(dbPage);
	}
	
	test_connection();
}

function load_pending(logID) {
	var logID;
	
	$("input[name='logID']").val(logID);
	
	$.post( "http://ignitetx.com/vmms/app/pages.php", { pend: '1', logID: logID })
	.done(function( data ) {
		load(data, '0');
	});
}

function load_request(logID, iID) {
	var logID;
	var iID;
	
	$("input[name='logID']").val(logID);
	$("input[name='inventoryID']").val(iID);
	
	$.post( "http://ignitetx.com/vmms/app/pages.php", { req: '1', logID: logID })
	.done(function( data ) {
		$('#log_request').html(data);
		load('page15', '0');
	});
}

function accept_request() {
	var logID;
	var userID;
	
	logID = $("input[name='logID']").val();
	userID = $("input[name='userID']").val();
	
	$.post( "http://ignitetx.com/vmms/app/pages.php", { accept: '1', logID: logID, userID: userID })
	.done(function( data ) {
		if(data == 'false') {
			appAlert('Error. Unable to connect to serve. Close the app and try again.');
		}
		else {
			load('page5', '0');
		}
	});
}

/**/
function fresh_start() {
	$("input[name='userID']").val('');
	$("input[name='user_pin']").val('');
	$("input[name='inventoryID']").val('');
	$("input[name='logID']").val('');
	
	$("input[name='mileage']").val('');
	$("select[name='type']").val('');
	
	$("textarea[name='driver_remarks']").val('');
	$("textarea[name='mechanic_remarks']").val('');
	
	$("input[name='p_description']").val('');
	$("input[name='p_num']").val('');
	$("input[name='p_vendor']").val('');
	$("input[name='p_date']").val('');
	
	$('input:checkbox').removeAttr('checked');
}

function test_connection() {
	$.post( "http://ignitetx.com/vmms/app/pages.php", { test: '1' })
	.done(function( data ) {
		if (data == 'false') {
			appAlert('Error. Unable to connect to serve. Close the app and try again.');
		}
		else {

		}
	});
}

function delete_log() {
	var logID;
	
	logID = $("input[name='logID']").val();
}

function truck_status() {
	$.post( "http://ignitetx.com/vmms/app/pages.php", { truck_status: "1" })
	.done(function( data ) {
		$('#truck_status').html(data);
	});
	
	load('page14', '0');
}

/*Get Functions*/
function get_users() {
	$.post( "http://ignitetx.com/vmms/app/pages.php", { users: "1" })
	.done(function( data ) {
		$('#users_data').html(data);
	});
}

function get_name() {
	var id;
	
	id = $("input[name='userID']").val();	
	
	$.post( "http://ignitetx.com/vmms/app/pages.php", { name: id })
	.done(function( data ) {
		$('#user_name').html(data);
	});
}

function get_logs() {
	$.post( "http://ignitetx.com/vmms/app/pages.php", { logs: "1" })
	.done(function( data ) {
		$('#view_logs').html(data);
	});
}

function get_maintenance() {
	var lan;
	
	lan = $("input[name='language']").val();	
	
	$.post( "http://ignitetx.com/vmms/app/pages.php", { truck: "1", language: lan })
	.done(function( data ) {
		$('#maintenance_type').html(data);
	});
}

function get_trucks() {
	$.post( "http://ignitetx.com/vmms/app/pages.php", { trucks: "1" })
	.done(function( data ) {
		$('#view_trucks').html(data);
	});
}

function get_repairs() {
	var lan;
	
	lan = $("input[name='language']").val();	
	
	$.post( "http://ignitetx.com/vmms/app/pages.php", { repair: "1", language: lan  })
	.done(function( data ) {
		$('#view_repair').html(data);
	});
}

function get_logID() {
	var uID;
	var iID;
	
	uID = $("input[name='userID']").val();	
	iID = $("input[name='inventoryID']").val();	
	
	$.post( "http://ignitetx.com/vmms/app/pages.php", { log: '1', uID: uID, inventoryID: iID })
	.done(function( data ) {
		if (data == 'false') {
			appAlert('Error. A problem occured.');
			load('page1', '0');
		}
		else {
			$("input[name='logID']").val(data);
		}
	});
}

function get_type() {
	var iID;
	
	iID = $("input[name='inventoryID']").val();	
	
	$.post( "http://ignitetx.com/vmms/app/pages.php", { v_type: '1', inventoryID: iID })
	.done(function( data ) {
		if (data == 'Truck') {
			$(".pick_type").show();
			load('page5', '0');
		}
		else {
			$("input[name='mileage']").val('0');
			$(".pick_type").hide();
			load('page5', '0');
		}
	});
}

function get_photos() {
	var logID;
	logID = $("input[name='logID']").val();
	
	$.post( "http://ignitetx.com/vmms/app/pages.php", { photo: "1", logID: logID })
	.done(function( data ) {
		$('#upPhotos').html(data);
	});
}

function get_pending() {
	$.post( "http://ignitetx.com/vmms/app/pages.php", { pending: "1" })
	.done(function( data ) {
		$('#pending_logs').html(data);
	});
	
	load('page3', '0');
}

function get_request() {
	$.post( "http://ignitetx.com/vmms/app/pages.php", { request: "1" })
	.done(function( data ) {
		$('#request_logs').html(data);
	});
	
	load('page12', '0');
}

function get_language() {
	var userID;
	userID = $("input[name='userID']").val();
	
	$.post( "http://ignitetx.com/vmms/app/pages.php", { lan: "1", id: userID })
	.done(function( data ) {
		 $("input[name='language']").val(data)
	});
	
	set_language();
}

function get_page() {
	$("input[name='userID']").val(userID);
}

/*Set Functions*/
function set_users(userID) {
	fresh_start();
	
	var userID;
	
	$("input[name='userID']").val(userID);

	appPrompt('pin');
	get_name();
}

function set_pin() {
	var pin;
	var id;
	
	id = $("input[name='userID']").val();	
	pin = $("input[name='user_pin']").val();
	
	$.post( "http://ignitetx.com/vmms/app/pages.php", { user_pin: pin,  user_id: id})
	.done(function(data) {
		if (data != 'true') {
			appAlert('Error. Invalid Password. Try Again!');
		}
		else {
			load('page2', '0');
			 get_language();
		}
	});
}

function set_truck(inventoryID) {
	var inventoryID;
	
	$("input[name='inventoryID']").val(inventoryID);
	
	get_logID();
	get_type();
	get_language();
}

function set_milage() {
	var logID;
	var m;
	var t;
	
	logID = $("input[name='logID']").val();	
	m = $("input[name='mileage']").val();
	t = $("select[name='type']").val();
	
	$.post( "http://ignitetx.com/vmms/app/pages.php", { mile: '1', mileage: m, type: t, logID: logID})
	.done(function(data) {
		if (data == 'false') {
			appAlert('Error. A problem occured.');
			load('page1', 'page1');
		}
		else {
			load('page6', 'page6');
		}
	});
}

function set_remarks() {
	var logID;
	var d;
	var m;
	
	logID = $("input[name='logID']").val();	
	d = $("textarea[name='driver_remarks']").val();
	m = $("textarea[name='mechanic_remarks']").val();
	
	$.post( "http://ignitetx.com/vmms/app/pages.php", { remarks: '1', driver: d, mechanic: m, logID: logID})
	.done(function(data) {
		if (data == 'false') {
			appAlert('Error. A problem occured.');
			load('page1', '0');
		}
		else {
			load('page8', 'page8');
		}
	});
}

function set_repairs() {
	var logID;
	var re = new Array();
	
	$("input[name='repair']:checked").each(function() {
	   re.push($(this).val());
	});
	
	logID = $("input[name='logID']").val();	

	
	$.post( "http://ignitetx.com/vmms/app/pages.php", { repairs: '1', rMade: re, logID: logID})
	.done(function(data) {
		if (data == 'false') {
			appAlert('Error. A problem occured.');
			load('page1', '0');
		}
		else {
			load('page9', 'page9');
		}
	});
}

function set_parts() {
	var logID;
	var pd = new Array();
	var pn = new Array();
	var pv = new Array();
	var pdt = new Array();
	
	$("input[name='p_description']").each(function() {
	   pd.push($(this).val());
	});
	
	$("input[name='p_num']").each(function() {
	   pn.push($(this).val());
	});
	
	$("input[name='p_vendor']").each(function() {
	   pv.push($(this).val());
	});
	
	$("input[name='p_date']").each(function() {
	   pdt.push($(this).val());
	});
	
	logID = $("input[name='logID']").val();	

	
	$.post( "http://ignitetx.com/vmms/app/pages.php", { parts: '1', p_description: pd, p_num: pn, p_vendor: pv, p_date: pdt, logID: logID})
	.done(function(data) {
		if (data == 'false') {
			appAlert('Error. A problem occured.');
			load('page1', '0');
		}
		else {
			load('page11', 'page11');
		}
	});
}

function set_stats(val) {
	var val;
	var logID;
	
	logID = $("input[name='logID']").val();	
	
	$.post( "http://ignitetx.com/vmms/app/pages.php", { stats: '1', status: val, logID: logID})
	.done(function(data) {
		if (data == 'false') {
			appAlert('Error. A problem occured.');
			load('page1', '1');
		}
		else {
			appAlert('New Log has been sucessfully created!');
			load('page1', '1');
		}
	});
}

function set_page(dbPage) {
	var dbPage;
	var logID;
	
	logID = $("input[name='logID']").val();	
	
	$.post( "http://ignitetx.com/vmms/app/pages.php", { dataPage: dbPage, logID: logID})
	.done(function(data) {
		if (data == 'false') {
			/**/
			var f  = data;
		}
		else {
			/**/
			var t  = data;
		}
	});
}

function set_language() {
	get_maintenance();
	
	var lang;
	
	lang = $("input[name='language']").val();	
	
	if (lang == 'E') {
		$(".engl").show();
		$(".span").hide();
		
		$("#engl").show();
		$("#span").hide();
	}
	else {
		$(".engl").hide();
		$(".span").show();
		
		$("#engl").hide();
		$("#span").show();
	}
	
}

/**/
function milage_check() {
	if ($("input[name='mileage']").val() == '') {
		$("#milage_check").hide();
	}
	
	
	$("input[name='mileage']").change(function(){
		if($("select[name='type']").val() != 0) {
			$("#milage_check").show();
		}
	});
	
	$("select[name='type']").change(function(){
		if ($("input[name='mileage']").val() != '') {
			$("#milage_check").show();
		}
	});
}

function remark_check() {
	$("#remark_check").hide();
	
	$("textarea[name='driver_remarks']").change(function(){
			$("#remark_check").show();
	});
	
	$("textarea[name='mechanic_remarks']").change(function(){
			$("#remark_check").show();
	});
}

function parts_check() {
	if ($("input[name='p_description']").val() == '' || $("input[name='p_num']").val() == '' || $("input[name='p_vendor']").val() == '' || $("input[name='p_date']").val() == '') {
		$("#parts_check").hide();
	}

	var stop = 0;
	
	$("input[name='p_description']").change(function(){
			if ($("input[name='p_num']").val() == '') { stop = 1; } else { stop = 0; }
			if ($("input[name='p_vendor']").val() == '') { stop = 1; } else { stop = 0; }
			if ($("input[name='p_date']").val() == '') { stop = 1; } else { stop = 0; }
			
			if (stop == 0) { $("#parts_check").show(); } 
	});
	
	$("input[name='p_num']").change(function(){
			if ($("input[name='p_description']").val() == '') { stop = 1; } else { stop = 0; }
			if ($("input[name='p_vendor']").val() == '') { stop = 1; } else { stop = 0; }
			if ($("input[name='p_date']").val() == '') { stop = 1; } else { stop = 0; }
			
			if (stop == 0) { $("#parts_check").show(); } 
	});
	
	$("input[name='p_vendor']").change(function(){
			if ($("input[name='p_description']").val() == '') { stop = 1; } else { stop = 0; }
			if ($("input[name='p_num']").val() == '') { stop = 1; } else { stop = 0; }
			if ($("input[name='p_date']").val() == '') { stop = 1; } else { stop = 0; }
			
			if (stop == 0) { $("#parts_check").show(); } 
	});
	
	$("input[name='p_date']").change(function(){
			if ($("input[name='p_description']").val() == '') { stop = 1; } else { stop = 0; }
			if ($("input[name='p_num']").val() == '') { stop = 1; } else { stop = 0; }
			if ($("input[name='p_vendor']").val() == '') { stop = 1; } else { stop = 0; }
			
			if (stop == 0) { $("#parts_check").show(); } 
	});
}

/**/
$( "#add_parts" ).click(function() {
	$('#parts').append($('#addon_data').html());
});

/**/
$(".num").on("tap",function(){
	var num;
	num = $(this).attr('num');
	$("input[name='user_pin']").val($("input[name='user_pin']").val() + num);
});

/**/
function appAlert(message) {
	var message;
	
	navigator.notification.alert(
		message,
		callBackFunctionB, // Specify a function to be called 
		'Transcar Maintenance',
		"OK"
	);
	
	function callBackFunctionB(){
		console.log('ok');
	}
}

/**/
function appPrompt(option) {
	var option;
	
	function onPrompt(results) {
		if (option == 'pin') {
			$("input[name='user_pin']").val(results.input1);
			set_pin();
		}
		else if (option == 'test') {
			appAlert(results.input1);
		}
	}

	navigator.notification.prompt(
		'Please enter your pin.',  // message
		onPrompt,                     // callback to invoke
		'Transcar Maintenance',            // title
		['Exit','Submit'],             // buttonLabels
		''                 // defaultText
	);
}

/**/
function appConfirm(response) {
	var response;
	
	function onConfirm(buttonIndex) {
		if (buttonIndex == 2) {
			load('page2', '0');
			fresh_start();
			delete_log();
		}
		else {
			
		}
	}

	navigator.notification.confirm(
		'Do you wish to go to home?', // message
		 onConfirm,            // callback to invoke with index of button pressed
		'Transcar Maintenance',           // title
		['No','Yes']     // buttonLabels
	);
}

/*Photos Upload*/
function setPhoto() {
	navigator.camera.getPicture(
		onSuccess, onFail, { quality: 50,
		destinationType: Camera.DestinationType.FILE_URI }
	);

	function onSuccess(imageURI) {
		uploadPhoto(imageURI);
	}

	function onFail(message) {
		appAlert('Upload Failed: ' + message);
	}
	
	get_photos();
}
 
function getPhoto() {
	navigator.camera.getPicture(uploadPhoto, function(message) { appAlert(message); },
		{
			quality: 50, 
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
		}
	);
	
	get_photos();
}

function uploadPhoto(imageURI) {
	var options = new FileUploadOptions();
	
	options.fileKey="file";
	options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
	options.mimeType="image/jpeg";
 
	var params = new Object();
	params.value1 = "test";
	params.value2 = "param";
 
	options.params = params;
	options.chunkedMode = false;
			
	var ft = new FileTransfer(); 
   
	var logID;
	logID = $("input[name='logID']").val();
   
	ft.upload(imageURI, "http://ignitetx.com/vmms/app/pages.php?photo=" + logID, win, fail, options);
	
	get_photos();
}
 
function win(r) {
	console.log("Code = " + r.responseCode);
	console.log("Response = " + r.response);
	console.log("Sent = " + r.bytesSent);
	//appAlert(r.response);
	appAlert('Sucess! Photo has been uploaded.');
}
 
function fail(error) {
	appAlert("An error has occurred: Code = " + error.code);
}
			
