/*
 * Create a list that holds all of your cards
 */

const squares = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube",  "fa fa-anchor", "fa fa-anchor", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle"];



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const cardsContainer = document.querySelector(".deck")

let openCards = [] //shell array to temporarily save clicked cards
let matchingCards = [] //array to save matches
let seconds = 1;

//initialize the game. Function contains all code.
function init() {
  clock (seconds);
  // use for loop to create the cards
  for (let i = 0; i < squares.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = "<i class='" + squares[i] + "'></i>";
    cardsContainer.appendChild(card);
    //create event listener for card-clicked
    click(card);
  }
}

//event listener for cards
function click (card) {
  card.addEventListener("click", function() {

    const currentCard = this;
    const previousCard = openCards[0];

    //open cards and compare them
    if(openCards.length === 1) {

      card.classList.add("open", "show", "endclick");
      openCards.push(this);
      // card comparison conditional
      comparison(currentCard, previousCard);
      increaseMove();
    } else {

      card.classList.add("open", "show", "endclick");
      openCards.push(this);

    }
  });
}

//find out if there's a match
function comparison (currentCard, previousCard) {
  if(currentCard.innerHTML === previousCard.innerHTML){

    currentCard.classList.add("match");
    previousCard.classList.add("match");

    matchingCards.push(currentCard, previousCard); //store match in matchingCards
    openCards = []; //reset open cards array
    youWin(); //check to see if all cards are matched

  } else {
    console.log("sorry, no can do confederado!")

      //show the opened non-matched cards for a moment before hiding again
      setTimeout(function() {
        currentCard.classList.remove("open", "show", "endclick");
        previousCard.classList.remove("open", "show", "endclick");
        openCards = [];
      }, 500);
  }
}

//game timer
function clock(seconds){
  setInterval (function myTimer() {
    document.querySelector(".timer").innerHTML = seconds++;
  }, 1000);
}

//rating system
const starsContainer = document.querySelector(".stars");
function rating() {
  if (moves > 9 && moves < 14) {
    starsContainer.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
  } else {
    if (moves > 13) {
      starsContainer.innerHTML = '<li><i class="fa fa-star"></i></li>';
    }
  }
}

//tally moves
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function increaseMove () {
  moves++;
  movesContainer.innerHTML = moves;
  rating();
}

//message to tell player game is over
function youWin() {
  setTimeout (function () {
    if (matchingCards.length === squares.length) {
      alert("You're done! Hope it was fun! It took you " + moves + " moves and " + seconds + " seconds to win. Nice Work!");
    }
  }, 501);
}

// restart button
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
  //delete cards
  cardsContainer.innerHTML = "";
  movesContainer.innerHTML = "0";

  //call init to begin new game
  init();

  //reset variables
  matchingCards = [];
  moves = 0;
});

//shuffle the cards, create a card's html, and add to page

//start the game
init();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
