// Change On/off button state
function setOnOffState(b) {
	if (b) {
		$("#off").removeClass("btn-danger");
		$("#on").addClass("btn-success");
	} else {
		$("#off").addClass("btn-danger");
		$("#on").removeClass("btn-success");
	}
}

// Set enabled state
function setEnabled(b) {
	var message = {
		method: "setEnabled",
		value: b
	};
	chrome.runtime.sendMessage(message, function (response) {
		if (response.enabled == "on") {}
	});
}

// Set status text
function setStatusTest(t, c) {
	$("#status-text")
	.hide()
	.stop()
	.clearQueue()
	.removeClass()
	.addClass("pull-right text-"+c)
	.text(t)
	.fadeIn()
	.delay(1500)
	.fadeOut();
}

// Prepare options page
function preparePage() {
	setOnOffState(getOpt("isEnabled")); // Initial on/off state
	$("#global").attr("checked", getOpt("isGlobal"));
	$("#restonly").attr("checked", getOpt("isRestOnly"));
	$("#rest_min").val(getOpt("rest_min"));
}

// Get options
function getOpt(opt) {
	switch (opt) {
		case "isEnabled":
			return (localStorage["enabled"] == "on");
		case "isGlobal":
			return (localStorage["global"] == "ok");
		case "isRestOnly":
			return (localStorage["restonly"] == "ok");
		default:
			return localStorage[opt];
	}
}

// Set options
function setOpt(opt, val) {
	localStorage[opt] = val;
}




/*
 * Actions performed
 * when DOM is ready
 */
$(document).ready(function() {

	preparePage(); // This will display current options

	// Tooltips
	$("[rel=tooltip]").tooltip();

	$("#on").click(function() {
		setOnOffState(true);
		setEnabled(true);
		setStatusTest("Turned on", "success");
	});


	$("#off").click(function() {
		setOnOffState(false);
		setEnabled(false);
		setStatusTest("Turned off", "error");
	});


	$("#cancel").click(function() {
		window.close();
	});

	$("#save").click(function() {
		setOpt("global", $("#global").is(':checked') ? "ok" : "no");
		setOpt("restonly", $("#restonly").is(':checked') ? "ok" : "no");
		setOpt("rest_min", $("#rest_min").val());
		setStatusTest("Changes saved.", "success");
	});

});