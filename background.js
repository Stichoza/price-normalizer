// Initialize localStorage
setEnabled(localStorage["enabled"] == 'undefined' || !getEnabled());
setActive(!(localStorage["active"] == 'undefined' || !getActive()));

// Turn normalizer on or off
function setEnabled(b) {
	localStorage["enabled"] = (b) ? "on" : "off";
	chrome.browserAction.setBadgeText({text: localStorage["enabled"]});
	if (!b) setActive(false);
	console.log("Enabled: "+localStorage["enabled"]);
}

// Get normalizer enabled state
function getEnabled() {
	return (localStorage["enabled"] == "on");
}

// Set active state on or off
function setActive(b) {
	localStorage["active"] = (b) ? "ok" : "no";
	var bg_color = (b) ? [0, 255, 0, 255] : [100, 100, 100, 255];
	chrome.browserAction.setBadgeBackgroundColor({color: bg_color});
	console.log("Active: "+localStorage["active"]);
}

// Get active state
function getActive() {
	return (localStorage["active"] == "ok");
}

// Actions fired on popup click
function popupOpen() {
	setEnabled(!getEnabled());
}

chrome.browserAction.onClicked.addListener(popupOpen);