// Main Regex
var __prcm_rex__ = new RegExp("([$€₠₡₢₣₤₥₦₧₨₩₪₫₭₮₯₰₱₲₳₴₵₶₷₸₹₺])+([0-9, ]{1,10})+([.]{0,1})+([0-9]{1,5})", "igm");

// Find what to replace
var __prcm_rpl__ = function (s) {
    return r = s.replace(/([0-9, ]{1,10})+([.]{0,1})+([0-9]{1,5})/, __prcm_ceil__);
}

// How to replace
var __prcm_ceil__ = function (s) {
    s = parseFloat(s.replace(/([, ])/gi, ""), 10);
    var r = Math.round(s);
    //return (r<s) ? s : "<span class=\"__prcm__\" title=\"Original price was "+s+"\">"+r+"</span>";
    return (r<s) ? s : r;
}

// Main loop function
function __prcm__() {
	var __prcm_elem__ = document.getElementsByTagName("body")[0];
	var __prcm_match__ = __prcm_elem__.innerHTML.match(__prcm_rex__);
	var __prcm_count__ = (__prcm_match__ == null) ? 0 : __prcm_elem__.innerHTML.match(__prcm_rex__).length;
	if (__prcm_count__) {
	    var __prcm_newsrc__ = __prcm_elem__.innerHTML.replace(__prcm_rex__, __prcm_rpl__);
	    __prcm_elem__.innerHTML = __prcm_newsrc__;
	    console.log("price-normalizer: replaced "+__prcm_count__+" entries");
	} else {
		console.log("price-normalizer: nothing to do");
	}
}

// Get enabled state and activate main loop
var __prcm_interval__; // Global interval variable
var __prcm_interval_b__ = false; // Inteval status
chrome.runtime.sendMessage({method: "getEnabled"}, function (response) {
	if (response.enabled == "on") {
		__prcm_interval__ = window.setInterval(__prcm__, 2000);
		__prcm_interval_b__ = true;
	}
});

// Get messages from background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.method == "clearLoop") {
		window.clearInterval(__prcm_interval__);
		__prcm_interval_b__ = false;
	} else if (request.method == "startLoop" && !__prcm_interval_b__) {
		__prcm_interval__ = window.setInterval(__prcm__, 2000);
		__prcm_interval_b__ = true;
	}
	sendResponse({});
});