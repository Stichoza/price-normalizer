localStorage["global"] = "ok";
localStorage["enabled"] = "on";

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
}

// Get options
function getOpt(opt) {
	switch (opt) {
		case "isEnabled":
			return (localStorage["enabled"] == "on");
		case "isGlobal":
			return (localStorage["global"] == "ok");
		default:
			return localStorage[opt];
	}
}

/*
 * Actions performed
 * when DOM is ready
 */
$(document).ready(function() {

	preparePage(); // This will display current options

	// Tooltips
	//$(".text-error").tooltip();

	$("#on").click(function() {
		setOnOffState(true);
		setStatusTest("Turned on", "success");
	});


	$("#off").click(function() {
		setOnOffState(false);
		setStatusTest("Turned off", "error");
	});


	$("#cancel").click(function() {
		window.close();
	});

	$("#save").click(function() {
		setStatusTest("Changes saved.", "success");
	});

});