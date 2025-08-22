// ==UserScript==
// @name         NsGiftNewTab
// @namespace    east-tignutn-script
// @version      0.1.01
// @description  Open gifting page in a new tab. for use with gift autocloser
// @author       east tign
// @copyright    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
// @match        *www.nationstates.net/page=deck
// @match        *www.nationstates.net/*page=deck*
// ==/UserScript==

(function () {
    'use strict';
    let infos = document.querySelectorAll('.deckcard-info').forEach(function (el) {
        let giftButton = el.querySelector('a:nth-of-type(2)').setAttribute('target', '_blank');
    });
    }
)();
