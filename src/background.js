// Initialize localStorage
setEnabled(localStorage["enabled"] == 'undefined' || getEnabled());
setActive(false);
initLocalStorage("restonly", "no");
initLocalStorage("rest_min", "75");


// Initialize vars
function initLocalStorage(n, v) {
	if (localStorage[n] == 'undefined') localStorage[n] = v;
}

// Turn normalizer on or off
function setEnabled(b) {
	localStorage["enabled"] = (b) ? "on" : "off";
	chrome.browserAction.setBadgeText({text: localStorage["enabled"]});
	if (!b) setActive(false);
	console.log("Enabled: "+localStorage["enabled"]);
	// Send message to all tabs to stop looping main function
	chrome.tabs.query({}, function(tabs) {
		var message = {
			method: (b) ? "startLoop" : "clearLoop"
		};
		for (var i=0; i<tabs.length; ++i) {
			chrome.tabs.sendMessage(tabs[i].id, message);
		}
	});
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

// Enable/disable exstension on icon click
chrome.browserAction.onClicked.addListener(popupOpen);

// Get messages from content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.method == "getEnabled") {
		sendResponse({
			enabled: localStorage["enabled"]
		});
	} else if (request.method == "setEnabled") {
		setEnabled(request.value);
		sendResponse({
			enabled: localStorage["enabled"]
		});
	}
});