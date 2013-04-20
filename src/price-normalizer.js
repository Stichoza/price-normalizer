// Main Regex
var __prcm_rex__ = new RegExp("([$£€₠₡₢₣₤₥₦₧₨₩₪₫₭₮₯₰₱₲₳₴₵₶₷₸₹₺])+"+
	"([0-9, ]{1,10})+([.]{0,1})+([0-9]{1,5})", "igm");

// Find what to replace
var __prcm_rpl__ = function (s) {
	return r = s.replace(/([0-9, ]{1,10})+([.]{0,1})+([0-9]{1,5})/, __prcm_ceil__);
}

// How to replace
var __prcm_ceil__ = function (s) {
	s = parseFloat(s.replace(/([, ])/gi, ""), 10);
	var r = Math.round(s);
	var rem = s*100%100;
	// console.log(s+" -> "+r+" -> "+rem+" :: "+__prcm_option__("rest_min"));
	return (r>s && rem >= __prcm_option__("rest_min")) ? r.toFixed(2) : s.toFixed(2);
}

// Main loop function
function __prcm_main__(node) {
	var __prcm_val__ = node.nodeValue;
	var __prcm_match__ = __prcm_val__.match(__prcm_rex__);
	var __prcm_count__ = (__prcm_match__ == null) ? 0 : __prcm_val__.match(__prcm_rex__).length;
	if (__prcm_count__) {
		// Set title with original price on node
		if (__prcm_val__.length < 10) {
			node.addAtribute
		}
		var __prcm_newsrc__ = __prcm_val__.replace(__prcm_rex__, __prcm_rpl__);
		node.nodeValue = __prcm_newsrc__;
	}
}

// Get enabled state and activate main loop
var __prcm_interval__; // Global interval variable
var __prcm_interval_b__ = false; // Inteval status
chrome.runtime.sendMessage({method: "getEnabled"}, function (response) {
	if (response.enabled == "on") {
		__prcm_interval__ = window.setInterval(function () {
			__prcm_dom_walk__(document.getElementsByTagName("body")[0]);
		}, 2000);
		__prcm_interval_b__ = true;
	}
});

// Get messages from background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.method == "clearLoop") {
		window.clearInterval(__prcm_interval__);
		__prcm_interval_b__ = false;
	} else if (request.method == "startLoop" && !__prcm_interval_b__) {
		__prcm_interval__ = window.setInterval(function () {
			__prcm_dom_walk__(document.getElementsByTagName("body")[0]);
		}, 2000);
		__prcm_interval_b__ = true;
	}
	sendResponse({});
});

// Get local storage variables from exstension runtime
function __prcm_option__(n) {
	var requestMessage = {
		method: "getOption",
		option: n
	};
	chrome.runtime.sendMessage(requestMessage, function (response) {
		window.__prcm_var_rest__ = response.value;
	});
	return window.__prcm_var_rest__;
}

// Walk DOM elements
function __prcm_dom_walk__(node) {
	var child, next;
	switch (node.nodeType) {
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while (child) {
				next = child.nextSibling;
				__prcm_dom_walk__(child);
				child = next;
			}
			break;
		case 3: // Text node
			__prcm_main__(node);
			break;
	}
}