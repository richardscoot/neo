// ==UserScript==
// @author        richardscoot
// @description   Fixes the message box that went disappear sometimes when you are trying to send a neomail
// @include       http://www.neopets.com/neomessages.phtml?*type=send*
// @name          Neomail - Fix Message box
// @namespace     richardscoot@Clraik
// @version       1.0
// ==/UserScript==

(function() {
    var childno = 3;
    if (window.location.href.indexOf("reply_message_id=") > -1) {
        childno = 4;
    }
    var msgboxel = $('#content > table > tbody > tr > td.content > form > table > tbody > tr:nth-child(' + childno + ') > td:nth-child(2)');
    if (msgboxel.children('textarea').length == 0) {
        msgboxel.append('<textarea name="message_body" id="message_body" style="width: 600px; height: 100px; background-color: #d4f3ff;"></textarea>');
    }
})();
