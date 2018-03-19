// ==UserScript==
// @name         Charity Corner - Auto Dump Items
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Auto Dump Items From Inventory
// @author       Richard Scoot
// @match        http://www.neopets.com/charitycorner/2018/np.phtml
// @grant        none
// ==/UserScript==


// NOTE: ALL ITEMS FOUND INVENTORY WILL BE DUMPED FOR CHARITY CORNER
//       PLEASE KEEP YOUR VALUABLES IN SDB BEFORE RUNNING THE SCRIPT

var selectionTO = {"min": 1000, "max": 2000};
var donateTO = {"min": 1000, "max": 2000};
var closePopup = {"min": 1000, "max": 2000};
var reloadOnEmpty = {"min": 300000, "max": 350000};

if ($('div.gift>select:first').children('option').length > 1) {
  var timeout = Math.floor(Math.random() * (selectionTO.max - selectionTO.min + 1) + selectionTO.min);

  setTimeout(automateDumping, 0);
} else {
  var timeout = Math.floor(Math.random() * (reloadOnEmpty.max - reloadOnEmpty.min + 1) + reloadOnEmpty.min);

  setTimeout(function() {
    window.location.reload();
  }, timeout);
}

function automateDumping() {
  var timeout = 0;

  var idx = 1;
  $("div.gift>select").each(function() {

    timeout = timeout + Math.floor(Math.random() * (selectionTO.max - selectionTO.min + 1) + selectionTO.min);
      var tIdx = idx;
      setTimeout(function() {
      $(this).find("option:eq(" + tIdx + ")").attr("selected", "selected");
      $(this).change();
    }.bind(this, timeout, $(this), tIdx), timeout);

    idx++;
  });

  timeout = timeout + Math.floor(Math.random() * (donateTO.max - donateTO.min + 1) + donateTO.min);
  setTimeout(function() {
    $(".buttonDonate").click();
    var closeTO = Math.floor(Math.random() * (closePopup.max - closePopup.min + 1) + closePopup.min);

    setTimeout(close, closeTO);
  }.bind(this, timeout), timeout);
}

function close() {
  if ($("div#colorbox").is(":visible")) {
    $(".button120").click();
  } else {
    var timeout = Math.floor(Math.random() * (closePopup.max - closePopup.min + 1) + closePopup.min);
    setTimeout(close, timeout);
  }
}
