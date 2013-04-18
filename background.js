// Initialize localStorage
if (localStorage["enabled"] == 'undefined' || !getEnabled()) setEnabled(true);
if (localStorage["active"] == 'undefined' || !getActive()) setActive(false);

// Turn normalizer on or off
function setEnabled(b) {
	localStorage["enabled"] = (b) ? "on" : "off";
	chrome.browserAction.setBadgeText({text: localStorage["enabled"]});
	if (!b) setActive(false);
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