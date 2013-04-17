// Initialize localStorage
if (typeof localStorage.enabled != 'undefined') setEnabled(true);
if (typeof localStorage.active != 'undefined') setActive(false);

// Turn normalizer on or off
function setEnabled(b) {
	localStorage["enabled"] = b;
	var state = (b) ? "on" : "off";
	chrome.browserAction.setBadgeText({text: state});
}

// Get normalizer enabled state
function getEnabled() {
	return localStorage["enabled"];
}

// Set active state on or off
function setActive(b) {
	localStorage["active"] = b;
	var bg_color = (b) ? [0, 255, 0, 255] : [100, 100, 100, 255];
	chrome.browserAction.setBadgeBackgroundColor({color: bg_color});
}

// Get active state
function getActive() {
	return localStorage["active"];
}

// Actions fired on popup click
function popupOpen() {
	setEnabled(!getEnabled());
}

chrome.browserAction.onClicked.addListener(popupOpen);
