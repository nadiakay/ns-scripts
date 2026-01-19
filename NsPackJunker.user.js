// ==UserScript==
// @name         NsPackJunker
// @namespace    east-tignutn-script
// @version      0.1.2
// @description  Speedier junking/gifting after opening a pack
// @author       east tign
// @copyright    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
// @match        *www.nationstates.net/page=deck
// @match        *www.nationstates.net/*page=deck*
// ==/UserScript==
// recommended to use with NsAutoFlipPack (by Sitethief), NsGiftNewTab and NsGiftAutoclose

(function () {
    'use strict';
    let error = document.querySelector(".error")
    if (error) return;
    if (!document.querySelector('.deck-loot-box')) return;
    let infos = document.querySelectorAll('.deckcard-info');

    let buttons = document.querySelectorAll('.deckcard-info-cardbuttons');
    let cards = document.querySelectorAll('.deckcard');
    let cardInfo;
    let cardButtons;
    let card;
    let junkButton;
    let giftButton;
    let targetCard;

    let config = { attributes: true, childList: false, subtree: false };

    let setCard = function() {
        if (n > 4) {return;}
        cardInfo = infos[n];
        cardButtons = buttons[n];
        card = cards[n];
        junkButton = cardInfo.querySelector('.deckcard-junk-button');
        giftButton = cardButtons.querySelector('a:nth-of-type(2)');
        //giftButton.setAttribute('target', '_blank');
        //enable the above if not using NsGiftAutoclose
        cardInfo.classList.add('show')
        cardInfo.querySelector('.deckcard-junk-button').focus();
        targetCard = card;
        cardObserver.observe(targetCard, config);
    }

    let nextCard = function() {
        if (n == 4) {
            setTimeout(() => {
                window.close();
            }, 50);
        }
        cardInfo.classList.remove('show');
        n++;
        setCard()
        setGiftButtonListener();
        console.log('n',n);
    }

    let isJunked = function(mutationsList, cardObserver) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (mutation.target.classList.contains('junked')) {
                    nextCard();
                }
            }
        }
    }

    let setGiftButtonListener = function() {
        let cardRef=n;
        giftButton.addEventListener('click', function() {
            nextCard();
        });
        giftButton.addEventListener('blur', () => {
            if (cardRef==n && junkButton!=document.activeElement & giftButton!=document.activeElement) {
                nextCard();
            }

        });
    }


    let n = 0;
    let cardObserver = new MutationObserver(isJunked);
    setCard();
    setGiftButtonListener();
    console.log('document.activeElement',document.activeElement);
})();
