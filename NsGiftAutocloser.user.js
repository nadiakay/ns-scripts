// ==UserScript==
// @name         NsGiftAutocloser
// @namespace    east-tignutn-script
// @version      0.0.01
// @description  autoclose gift page
// @author       east tign
// @copyright    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
// @match        *www.nationstates.net/page=deck
// @match        *www.nationstates.net/*page=deck*
// @grant        window.close
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

	const infobox = document.querySelector(".info");
    if (infobox) {
        if (infobox.innerHTML.slice(0,11) == "Card gifted") {
            window.close();
        }
	}
})();
