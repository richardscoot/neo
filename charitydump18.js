// ==UserScript==
// @name         Charity Corner - Auto Dump Items
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto Dump Items From Inventory
// @author       Richard Scoot
// @match        http://www.neopets.com/charitycorner/2018/np.phtml
// @grant        none
// ==/UserScript==


// NOTE: ALL ITEMS FOUND INVENTORY WILL BE DUMPED FOR CHARITY CORNER
//       PLEASE KEEP YOUR VALUABLES IN SDB BEFORE RUNNING THE SCRIPT
if ($('div.gift>select:first').children('option').length > 1) {
  setTimeout(automateDumping, 3000);
} else {
  setTimeout(function() {
    window.location.reload();
  }, 30000);
}

function automateDumping() {
  var idx = 1;
  $("div.gift>select").each(function() {
    $(this).find("option:eq(" + idx + ")").attr("selected", "selected");
    $(this).change();
    idx++;
  });

  setTimeout(function() {
    $(".buttonDonate").click();
    setTimeout(close, 1000);
  }, 1000);

};

function close() {
  if ($("div#colorbox").is(":visible")) {
    $(".button120").click();
  } else {
    setTimeout(close, 1000);
  }
}
