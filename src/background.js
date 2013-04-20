// Initialize localStorage
initLocalStorage("enabled", "on");
initLocalStorage("global", "no");
initLocalStorage("restonly", "ok");
initLocalStorage("rest_min", "75");

setActive(false); // Before setting enable state
setEnabled(getEnabled()); // We need it to changes badge text

// Initialize vars
function initLocalStorage(n, v) {
	if (localStorage[n] === undefined || localStorage[n] === null) localStorage[n] = v;
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
	} else if (request.method == "getOption") {
		sendResponse({
			value: localStorage[request.option]
		});
	}
});