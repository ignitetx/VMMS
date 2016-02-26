/*Hide all pages but splash screen on load.*/
$(document).ready(function() {
	
	$(".page").hide();
	$("#splash").show();
	
	/*Load Screen*/
	setTimeout(function(){
		$('body').addClass('loaded');
		$('h1').css('color','#222222');
	}, 200);
	
	/**/
	get_users();
	get_logs();
	get_trucks();
	get_maintenance();
	
	/**/
	milage_check();
	remark_check();
	get_repairs();
	parts_check();
});

/*Load function which manages what page to show and which to hide.*/
function load(page) {
	var page;
	
	$(".page").hide();
	$("#" + page).show();
	
	$(".title").hide();
	StatusBar.hide();
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
	$.post( "http://ignitetx.com/vmms/app/pages.php", { trucks: "1" })
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
	$.post( "http://ignitetx.com/vmms/app/pages.php", { repair: "1" })
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
			load('page1');
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
			load('page5');
		}
		else {
			$("input[name='mileage']").val('0')
			$(".pick_type").hide();
			load('page5');
		}
	});
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
			load('page2');
		}
	});
}

function set_truck(inventoryID) {
	var inventoryID;
	
	$("input[name='inventoryID']").val(inventoryID);
	
	get_logID();
	get_type();
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
			load('page1');
		}
		else {
			load('page6');
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
			load('page1');
		}
		else {
			load('page8');
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
			load('page1');
		}
		else {
			load('page9');
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
			load('page1');
		}
		else {
			load('page10');
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
			load('page1');
		}
		else {
			appAlert('New Log has been sucessfully created!');
			load('page1');
		}
	});
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
