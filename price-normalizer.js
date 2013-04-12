var __prcm_rex__ = new RegExp("([$€₠₡₢₣₤₥₦₧₨₩₪₫₭₮₯₰₱₲₳₴₵₶₷₸₹₺])+([0-9, ]{1,10})+([.]{0,1})+([0-9]{1,5})", "igm");
var __prcm_rpl__ = function (s) {
    return r = s.replace(/([0-9, ]{1,10})+([.]{0,1})+([0-9]{1,5})/, __prcm_ceil__);
}
var __prcm_ceil__ = function (s) {
    s = parseFloat(s.replace(/([, ])/gi, ""), 10);
    var r = Math.round(s);
    return (r<s) ? s : "<span class=\"__prcm__\" title=\"Original price was "+s+"\">"+r+"</span>";
}
var __prcm_elem__ = document.getElementsByTagName("body")[0];
var __prcm_match__ = __prcm_elem__.innerHTML.match(__prcm_rex__);
var __prcm_count__ = (__prcm_match__ == null) ? 0 : __prcm_elem__.innerHTML.match(__prcm_rex__).length;
if (__prcm_count__) {
    var __prcm_newsrc__ = __prcm_elem__.innerHTML.replace(__prcm_rex__, __prcm_rpl__);
    __prcm_elem__.innerHTML = __prcm_newsrc__;
    console.log("price-normalizer: replaced "+__prcm_count__+" entries");
}