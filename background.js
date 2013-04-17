// Turn normalizer on or off
function setEnable(b) {
	localStorage["enabled"] = b;
	var state = (b) ? "on" : "off";
	chrome.browserAction.setBadgeText({text: state});
}

// Get normalizer enabled state
function getEnable() {
	return localStorage["enabled"];
}

// Set active state on or off
function setActive(b) {
	localStorage["active"] = b;
	var bg_color = (b) ? [0, 255, 0, 255] : [22, 22, 22, 255];
	chrome.browserAction.setBadgeBackgroundColor({color: bg_color});
}

// Get active state
function getActive() {
	return localStorage["active"];
}


setActive(true);