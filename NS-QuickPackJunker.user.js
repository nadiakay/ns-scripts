// ==UserScript==
// @name         NS-QuickPackJunker
// @namespace    east-tignutn-script
// @version      0.2
// @description  Speedier junking after opening a pack
// @author       east tign
// @copyright    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
// @match        *www.nationstates.net/page=deck
// @match        *www.nationstates.net/*page=deck*
// @grant        none
// ==/UserScript==
// to be used with card auto flipper

(function () {
    'use strict';
    let infos = document.querySelectorAll('.deckcard-info');
    if (infos.length == 5) {
        console.log('init');



        let cards = document.querySelectorAll('.deckcard');
        let cardInfo;
        let card;
        let junkButton;
        let giftButton;
        let targetCard;

        let config = { attributes: true, childList: false, subtree: false };

//        let lostFocus = function(mutationsList, junkButtonObserver) {
  //          console.log('lost focus');
    //    };

        let setCard = function() {
            console.log('setCard() START:');
            if (n > 4) {return;}
            cardInfo = infos[n];
            card = cards[n];
            junkButton = cardInfo.querySelector('.deckcard-junk-button');
            giftButton = cardInfo.querySelector('.deckcard-gift-button');
            cardInfo.classList.add('show')
            console.log("cardInfo.querySelector('.deckcard-junk-button').",cardInfo.querySelector('.deckcard-junk-button'));
            cardInfo.querySelector('.deckcard-junk-button').focus();
            targetCard = card;
            cardObserver.observe(targetCard, config);
            console.log('setCard() END');
            console.log('deckInfo',cardInfo);
            console.log('card',card);
        }

        let nextCard = function() {
            console.log('nextCard() START:');
            console.log('n=,',n);
            if (n > 4) {return;}
            cardInfo.classList.remove('show');
            n++;
            setCard()
            setFocusListener();
            console.log('nextCard END');
            console.log('n=,',n);
        }

        let isJunked = function(mutationsList, cardObserver) {
            console.log('isJunked() START:');
            console.log('n=,',n);
            for (let mutation of mutationsList) {
                console.log('type',mutation.type);
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (mutation.target.classList.contains('junked')) {
                        // Perform actions when the class is added
                        console.log('junked!');
                        nextCard();

                    }
                    // Perform actions based on the attribute mutation
                }
            }
            console.log('isJunked END');
            console.log('n=,',n);
        }

        let setFocusListener = function() {
            let cardRef=n;
            console.log('setFocusListener() START:');
            console.log('n=,',n);
            giftButton.addEventListener('blur', () => {
                console.log('Element lost focus (blur event)');

                console.log('activeElement',document.activeElement);
                console.log('junkbutton',junkButton);
                if (cardRef==n && junkButton!=document.activeElement & giftButton!=document.activeElement) {
                    nextCard();
                }

            });
            console.log('setFocusListener() END');
            console.log('n=,',n);
        }
        let n = 0;
        let cardObserver = new MutationObserver(isJunked);
        setCard();
        setFocusListener();

        //let junkButtonObserver = new MutationObserver(lostFocus);
        console.log('init');
        console.log('activeElement',document.activeElement);
        //junkButtonObserver.observe(junkButton, config);

            //if (cards[i].classList.contains('junked')) {
            //    i++;
            //}
    }
})();
