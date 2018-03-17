// ==UserScript==
// @name         Charity Corner - Auto Buy below (x)
// @namespace    http://www.neopets.com/
// @version      0.2
// @description  Auto Buy items that is below certain amount for Charity Corner '18
// @author       richardscoot
// @match        http://www.neopets.com/browseshop.phtml?owner=*
// @match        http://www.neopets.com/browseshop.phtml?*

// @grant        none
// ==/UserScript==

// NOTE:
// 1. SET 'xPrice' to any value that you would love to buy below
// 2. You may face some error, but that's normal, just click back to check,
//    if there's anything else there to buy
// 3. If you want to set to buy things faster, you can change the minTO and maxTO
//    to your desired value
// 4. If you want to buy things that is in within the list (Good to buy from a
//    list of R102-179), you can change "searchWithin" to "true", and change the
//    "items" list to your own list.

var xPrice = 500;
var minTO = 1100;
var maxTO = 1300;
var searchWithin = false;


var items = ["00 Hog Battlecard", "1/3 Bacon and Broccoli Omelette", "1/3 Bacon Omelette", "1/3 BBQ Sauce Omelette", "1/3 Carrot and Pea Omelette", "1/3 Cheese and Onion Omelette", "1/3 Cheese Omelette", "1/3 Green Pepper Omelette", "1/3 Sausage and Pepperoni Omelette", "1/3 Sausage Omelette", "1/3 Tomato and Pepper Omelette", "1/3 Tomato Omelette", "2/3 Bacon and Broccoli Omelette", "2/3 Bacon Omelette", "2/3 BBQ Sauce Omelette", "2/3 Carrot and Pea Omelette", "2/3 Cheese and Onion Omelette", "2/3 Cheese Omelette", "2/3 Green Pepper Omelette", "2/3 Sausage and Pepperoni Omelette", "2/3 Sausage Omelette", "2/3 Tomato and Pepper Omelette", "2/3 Tomato Omelette", "Alkenore Cheese", "Artisans Lens", "Attack Fork", "Baby Fireball", "Bacon and Broccoli Omelette", "Bacon Omelette", "Bang Bang Negg", "Bat Pack", "BBQ Sauce Omelette", "Bearog", "Big Beefy Cheese", "Bilguss", "Blizzard Ring", "Blurtle", "Brain Cheese", "Brain Tree Branch", "Brain Tree Root", "Brain Tree Splinters", "Branston Battlecard", "Brick Cheese", "Brucey B Battlecard", "Bubbling Blueberry Cheese", "Buried Burger", "Burning Potion", "Carrot and Pea Omelette", "Caustic Potion", "Cheese and Onion Omelette", "Cheese Omelette", "Chia Shaped Eraser", "Christmas Tree Negg", "Chuffer Bob Battlecard", "Coltzans Burning Gem", "Coltzans Ring", "Crystal Negg", "Deaver", "Earth Potion", "Expert Lens", "Faeries Fortune Scratchcard", "Fake Tattoo", "False Finger Nail", "Feather Tickler", "Fernypoo Battlecard", "Fire Fighter Badge", "Forest Arrow", "Garlic Shield", "Gold Branston Battlecard", "Gold Brucey B Battlecard", "Gold Capara Battlecard", "Gold Chuffer Bob Battlecard", "Gold Fernypoo Battlecard", "Gold Kalora Battlecard", "Gold Little Timmy Battlecard", "Golden Shield", "Gooey Snot Cheese", "Green Pepper Omelette", "Handy Compass", "Hawk Wand", "Heart Shaped Charm", "Ice Cave Crystal", "Iced Wand", "Iceray Bracelet", "Inexpensive Aisha Pin", "Jhudora T-Shirt", "Jhudoras Brush", "Jubusul Plushie", "Jungle Arrow", "Kalora Battlecard", "Koibat Plushie", "Lil Frankie", "Little Timmy Battlecard", "Luperus Teeth", "Maggoty Spud", "Magic Branch", "Malice Potion", "Metal Puzzle", "Mirgle", "Moon Staff", "Mummy Baby", "Mysterious Hemlock Dart", "Narwhool", "Noxious Nectar", "Overgrown Cheese", "Peppermint Cheese", "Plastic Gem Ring", "Plastic Pocket Mirror", "Plastic Ring", "Plum Chia Eraser", "Pocket Magnifying Glass", "Poisonous Lollypop", "Pumpkin Shield", "Purple and Green Party Hat", "Purple Blob Potion", "Purple Poogle Toy", "Purple Quiggle Plushie", "Purple Spotted Cheese", "Quadruple Fudge Cheese", "Quigquig Plushie", "Rainbow Quiggle Plushie", "Rancid Old Meat", "Red and Green Party Hat", "Red and Purple Party Hat", "Rock Baby Cabbages", "Roo Island Crystal", "Sausage and Pepperoni Omelette", "Sausage Omelette", "Scorcie Plushie", "Sheriffs Badge", "Silver 00 Hog Battlecard", "Silver Brucey B Battlecard", "Silver Capara Battlecard", "Silver Chuffer Bob Battlecard", "Silver Fernypoo Battlecard", "Silver Kalora Battlecard", "Silver Little Timmy Battlecard", "Silver Spectre Battlecard", "Sir Cheekalot Battle Shield", "Sir Cheekalot Trials Shield", "Slime Potion", "Sloth Faerie Plushie", "Smoked Snorkle Cheese", "Snout Plant", "Snow Mudball", "Space Blumfaerie Plushie", "Spectre Battlecard", "Spongy Mound", "Staff of Brain", "Stone Snowball", "Super Blue Poogle Toy", "Super Luperus Tooth", "Super Poison Dart", "Terror Trove Scratchcard", "Tomato and Pepper Omelette", "Tomato Omelette", "Tyrannian Dung Cheese", "Undead Jackpot of Doom Scratchcard", "Usulbat Plushie", "Von Kougra Plushie", "Walking Carpet", "Web Claw", "Whoot Necklace", "Wind Up Rat", "Wooden Shield", "Yellow and Purple Party Hat", "Yellow Party Hat"];

var arr = [];
var arrStr = [];
var totalItems = 0;
var totalNP = 0;
$('a[href*="buy_item.phtml"]').each(function() {
  var str = $(this).attr("href");
  var rex = /old_price=(.*?)\&feat/;
  var matches = str.match(rex);
  if (matches[1] <= xPrice) {
    if (arrStr.indexOf(str) == -1) {
      var stock = {};
      stock.el = $(this);
      stock.el.attr("onclick", "location.href=this.href;return false;");
      stock.np = parseInt(matches[1]);
      arrStr.push(str);
      str = $(this).parent("td").html();
      rex = /<\/b><br>(.*?)\ in stock/;
      matches = str.match(rex);
      stock.total = parseInt(matches[1]);

      rex = /<\/a> <br> <b>(.*?)\<\/b><br>/;
      matches = str.match(rex);
      var itemName = matches[1];
      if ((searchWithin && items.indexOf(itemName) != -1) || !searchWithin) {
        totalItems = totalItems + stock.total;
        totalNP = totalNP + (stock.total * stock.np);
        arr.push(stock);
      }
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
  } else {
    alert("You have bought " + totalItems + " items with " + totalNP + " NP.");
  }
}

if (arr.length > 0) {
  buy(arr.length - 1);
}
