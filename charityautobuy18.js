// ==UserScript==
// @name         Charity Corner - Auto Buy below (x)
// @namespace    http://www.neopets.com/
// @version      0.1
// @description  Auto Buy items that is below certain amount for Charity Corner '18
// @author       richardscoot
// @match        http://www.neopets.com/browseshop.phtml?owner=*
// @grant        none
// ==/UserScript==

// NOTE:
// 1. SET 'xPrice' to any value that you would love to buy below
// 2. You may face some error, but that's normal, just click back to check,
//    if there's anything else there to buy
// 3. If you want to set to buy things faster, you can change the minTO and maxTO
//    to your desired value

var xPrice = 85;
var minTO = 800;
var maxTO = 1100;



var arr = [];
var arrStr = [];
$('a[href*="buy_item.phtml"]').each(function() {
  var str = $(this).attr("href");
  var rex = /old_price=(.*?)\&feat/;
  var matches = str.match(rex);
  if (matches[1] <= xPrice) {
    if (arrStr.indexOf(str) == -1) {
      var stock = {};
      stock.el = $(this);
      stock.el.attr("onclick", "location.href=this.href;return false;");
      arrStr.push(str);
      str = $(this).parent("td").html();
      rex = /<\/b><br>(.*?)\ in stock/;
      matches = str.match(rex);
      stock.total = parseInt(matches[1]);

      arr.push(stock);
    }
  }
});


function buy(idx) {
    var timeout = Math.floor(Math.random() * (maxTO - minTO + 1) + minTO);
    arr[idx].el.click();

    console.log(arr[idx].total);
    if (arr[idx].total > 1) {
      arr[idx].total--;
    } else {
      idx--;
    }
    if (idx >= 0) {
    setTimeout(function() {
      buy(idx);
    }, timeout);
    }
}

buy(arr.length-1);
