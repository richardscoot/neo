// ==UserScript==
// @name         Neopets - Hide Purple Fog/Haze
// @namespace    http://www.neopet.scom/
// @version      0.1
// @description  Hide away those aweful purple fog/haze
// @author       richardscoot
// @match        *www.neopets.com/prehistoric/omelette.phtml*
// @match        *www.neopets.com/jelly/jelly.phtml*
// @match        *www.neopets.com/soupkitchen.phtml*
// @match        *www.neopets.com/island/kitchen.phtml*
// @match        *www.neopets.com/halloween/applebobbing.phtml*
// @match        *www.neopets.com/medieval/pickyourown_index.phtml*
// @match        *www.neopets.com/medieval/rubbishdump.phtml*
// @match        *www.neopets.com/donations.phtml*
// @match        *www.neopets.com/faerieland/springs.phtml*
// @match        *www.neopets.com/water/fishing.phtml*
// @match        *www.neopets.com/island/training.phtml*
// @match        *www.neopets.com/island/mystichut.phtml*
// @match        *www.neopets.com/faerieland/tdmbgpop.phtml*
// @match        *www.neopets.com/desert/shrine.phtml*
// @match        *www.neopets.com/island/tombola.phtml*
// @match        *www.neopets.com/desert/fruit/index.phtml*
// @grant        none
// ==/UserScript==

$.fn.SmokeEffect = function (method) {};
$('div#cboxOverlay').hide();
$('div#colorbox').hide();
window.setTimeout(function (){$('div#content').attr("style","");}, 300);