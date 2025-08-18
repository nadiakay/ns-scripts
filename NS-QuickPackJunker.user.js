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
        let n = 0;
        let cardInfo = infos[n];
        let card = cards[n];
        let junkButton = cardInfo.querySelector('.deckcard-junk-button');
        console.log('deckInfo',cardInfo);
        console.log('card',card);
        cardInfo.classList.add('show');
        cardInfo.querySelector('.deckcard-junk-button').focus();
        let targetCard = card;

        let config = { attributes: true, childList: false, subtree: false };

//        let lostFocus = function(mutationsList, junkButtonObserver) {
  //          console.log('lost focus');
    //    };

        let nextCard = function() {
            console.log('nextCard:');
            console.log('n=,',n);
                        n++;
                        cardInfo = infos[n];
                        card = cards[n];
                        cardInfo.classList.add('show');
                        targetCard = card;
                        junkButton = cardInfo.querySelector('.deckcard-junk-button');
            setFocusListener();
                        cardInfo.querySelector('.deckcard-junk-button').focus();
                        console.log('activeElement',document.activeElement);
            console.log('end nextCard');
            console.log('n=,',n);
        }

        let isJunked = function(mutationsList, cardObserver) {
            console.log('isJunked():');
            console.log('n=,',n);
            for (let mutation of mutationsList) {
                console.log('type',mutation.type);
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    console.log(`class change!`);
                    console.log('mutation.target:', mutation.target);
                    if (mutation.target.classList.contains('junked')) {
                        // Perform actions when the class is added
                        console.log('junked!');
                        nextCard();

                    }
                    // Perform actions based on the attribute mutation
                }
            }
            console.log('end isjunked');
            console.log('n=,',n);
        }

        let setFocusListener = function() {
            let cardRef=n;
            console.log('setFocusListener():');
            console.log('n=,',n);
            junkButton.addEventListener('blur', () => {
                console.log('Element lost focus (blur event)');

                console.log('activeElement',document.activeElement);
                console.log('junkbutton',junkButton);
                if (cardRef==n) {
                    nextCard();
                }

            });
            console.log('end setFocusListener()');
            console.log('n=,',n);
        }
        setFocusListener();

        let cardObserver = new MutationObserver(isJunked);

        //let junkButtonObserver = new MutationObserver(lostFocus);
        cardObserver.observe(targetCard, config);
        console.log('init');
        console.log('activeElement',document.activeElement);
        //junkButtonObserver.observe(junkButton, config);

            //if (cards[i].classList.contains('junked')) {
            //    i++;
            //}
    }
})();
