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
	setOnOffState(getOption("isEnabled")); // Initial on/off state
	$("#global").attr("checked", getOption("isGlobal"));
	$("#restonly").attr("checked", getOption("isRestOnly"));
	$("#add_titles").attr("checked", getOption("isTitled"));
	$("#rest_min").val(getOption("rest_min"));
}

// Get options
function getOption(o) {
	switch (o) {
		case "isEnabled":
			return (localStorage["enabled"] == "on");
		case "isGlobal":
			return (localStorage["global"] == "ok");
		case "isTitled":
			return (localStorage["add_titles"] == "ok");
		case "isRestOnly":
			return (localStorage["restonly"] == "ok");
		default:
			return localStorage[o];
	}
}

// Set options
function setOption(opt, val) {
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
		setOption("global", $("#global").is(':checked') ? "ok" : "no");
		setOption("restonly", $("#restonly").is(':checked') ? "ok" : "no");
		setOption("add_titles", $("#add_titles").is(':checked') ? "ok" : "no");
		setOption("rest_min", $("#rest_min").val());
		setStatusTest("Changes saved.", "success");
	});

});