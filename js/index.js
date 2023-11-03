const cards = [
  { name: "clubs 2", img: "2-C.png" },
  { name: "clubs 3", img: "3-C.png" },
  { name: "clubs 4", img: "4-C.png" },
  { name: "clubs 5", img: "5-C.png" },
  { name: "clubs 6", img: "6-C.png" },
  { name: "clubs 7", img: "7-C.png" },
  { name: "clubs 8", img: "8-C.png" },
  { name: "clubs 9", img: "9-C.png" },
  { name: "clubs 10", img: "10-C.png" },
  { name: "clubs J", img: "J-C.png" },
  { name: "clubs Q", img: "Q-C.png" },
  { name: "clubs K", img: "K-C.png" },
  { name: "clubs A", img: "A-C.png" },
  { name: "diamonds 2", img: "2-D.png" },
  { name: "diamonds 3", img: "3-D.png" },
  { name: "diamonds 4", img: "4-D.png" },
  { name: "diamonds 5", img: "5-D.png" },
  { name: "diamonds 6", img: "6-D.png" },
  { name: "diamonds 7", img: "7-D.png" },
  { name: "diamonds 8", img: "8-D.png" },
  { name: "diamonds 9", img: "9-D.png" },
  { name: "diamonds 10", img: "10-D.png" },
  { name: "diamonds J", img: "J-D.png" },
  { name: "diamonds Q", img: "Q-D.png" },
  { name: "diamonds K", img: "K-D.png" },
  { name: "diamonds A", img: "A-D.png" },
  { name: "hearts 2", img: "2-H.png" },
  { name: "hearts 3", img: "3-H.png" },
  { name: "hearts 4", img: "4-H.png" },
  { name: "hearts 5", img: "5-H.png" },
  { name: "hearts 6", img: "6-H.png" },
  { name: "hearts 7", img: "7-H.png" },
  { name: "hearts 8", img: "8-H.png" },
  { name: "hearts 9", img: "9-H.png" },
  { name: "hearts 10", img: "10-H.png" },
  { name: "hearts J", img: "J-H.png" },
  { name: "hearts Q", img: "Q-H.png" },
  { name: "hearts K", img: "K-H.png" },
  { name: "hearts A", img: "A-H.png" },
  { name: "spades 2", img: "2-S.png" },
  { name: "spades 3", img: "3-S.png" },
  { name: "spades 4", img: "4-S.png" },
  { name: "spades 5", img: "5-S.png" },
  { name: "spades 6", img: "6-S.png" },
  { name: "spades 7", img: "7-S.png" },
  { name: "spades 8", img: "8-S.png" },
  { name: "spades 9", img: "9-S.png" },
  { name: "spades 10", img: "10-S.png" },
  { name: "spades J", img: "J-S.png" },
  { name: "spades Q", img: "Q-S.png" },
  { name: "spades K", img: "K-S.png" },
  { name: "spades A", img: "A-S.png" },
];
// console.log(cards);

class Card {
  constructor(suit, value, img) {
    this.suit = suit;
    this.value = value;
    this.img = img;
  }
}

class Deck {
  constructor() {
    this.cards = this.createDeck();
    this.shuffle();
  }

  drawCard(hand, targetElement) {
    const card = this.cards.pop();
    hand.push(card);
    const cardImg = document.createElement("img");
    cardImg.src = `./images/cards/${card.img}`;
    targetElement.appendChild(cardImg);
    updateScores();
  }

  createDeck() {
    const suits = ["hearts", "diamonds", "clubs", "spades"];
    const values = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A",
    ];
    const cards = [];

    for (const suit of suits) {
      for (const value of values) {
        const cardName = `${value}`;
        const imgName = `${value}-${suit.charAt(0).toUpperCase()}.png`; ///

        const card = {
          name: cardName,
          img: imgName,
        };

        cards.push(card);
        // console.log(card);
      }
    }

    return cards;
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      // console.log(j);
    }
  }
}

const deck = new Deck();
const playerHand = [];
const dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let gameOver = false;

function calculateHandScore(hand) {
  let score = 0;
  let numAces = 0;

  for (const card of hand) {
    const cardName = card.name;
    const cardValueMatch = cardName.match(/\d+|J|Q|K|A/);
    const cardValue = cardValueMatch ? cardValueMatch[0] : null;

    if (cardValue === "A") {
      numAces++;
      score += 11;
    } else if (cardValue === "K" || cardValue === "Q" || cardValue === "J") {
      score += 10;
    } else {
      score += parseInt(cardValue);
    }
  }

  while (numAces > 0 && score > 21) {
    score -= 10;
    numAces--;
  }

  return score;
}

const dealButton = document.getElementById("deal-button");
const dealSound = document.getElementById("dealSound");
const hitButton = document.getElementById("hit-button");
const standButton = document.getElementById("stand-button");

dealButton.addEventListener("click", deal);
dealButton.addEventListener("click", function () {
  dealSound.play();
});
hitButton.addEventListener("click", hit);
hitButton.addEventListener("click", function () {
  dealSound.play();
});
standButton.addEventListener("click", stand);

function deal() {
  if (gameOver) {
    startNewGame();
  } else {
    for (let i = 0; i < 2; i++) {
      deck.drawCard(playerHand, document.getElementById("player-cards"));
      deck.drawCard(dealerHand, document.getElementById("dealer-cards"));
    }
    dealButton.disabled = true;
    hitButton.disabled = false;
    standButton.disabled = false;
    checkForBlackjack();
  }
}

function hit() {
  if (!gameOver) {
    if (playerHand.length < 5) {
      deck.drawCard(playerHand, document.getElementById("player-cards"));
      checkForBlackjack();
      computerMove();
    } else {
      hitButton.disabled = true;
    }
  }
}

function computerMove() {
  if (!gameOver) {
    if (dealerHand.length < 5 && dealerScore < 21) {
      deck.drawCard(dealerHand, document.getElementById("dealer-cards"));
      checkForBlackjack();
    }
  }
}

function stand() {
  if (!gameOver) {
    while (dealerScore <= 21 && dealerScore < playerScore)
      deck.drawCard(dealerHand, document.getElementById("dealer-cards"));
    updateScores();
  }
  endGame();
}

function endGame() {
  gameOver = true;
  dealButton.disabled = false;
  hitButton.disabled = true;
  standButton.disabled = true;

  updateScores();

  if (playerScore > dealerScore) {
    displayMessage("You win!");
    playWinSound();
  } else if (playerScore < dealerScore) {
    displayMessage("Dealer wins");
  } else {
    displayMessage("It`s a tie.");
  }
  // if (gameOver) {
  //   startNewGame();
  // }
}
function playWinSound() {
  const winSound = document.getElementById("PlayerWinSound");
  winSound.play();
}

function displayMessage(message) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
}

function checkForBlackjack() {
  if (playerScore === 21 || dealerScore === 21) {
    endGame();
    displayMessage("Blackjack!");
  }
}

function updateScores() {
  playerScore = calculateHandScore(playerHand);
  dealerScore = calculateHandScore(dealerHand);

  const playerScoreElement = document.getElementById("player-score");
  const dealerScoreElement = document.getElementById("dealer-score");

  playerScoreElement.textContent = `Player score: ${playerScore}`;
  dealerScoreElement.textContent = `Dealer score: ${dealerScore}`;

  if (playerScore > 21) {
    displayMessage("You bust! Dealer wins");
    endGame();
  } else if (dealerScore > 21) {
    displayMessage("Dealer busts! You win");
    playWinSound();
    endGame();
  }
}

function startNewGame() {
  playerHand.length = 0;
  dealerHand.length = 0;
  document.getElementById("player-cards").innerHTML = "";
  document.getElementById("dealer-cards").innerHTML = "";
  playerScore = 0;
  dealerScore = 0;
  gameOver = false;
  dealButton.disabled = false;
  hitButton.disabled = true;
  standButton.disabled = true;
  displayMessage("");
  deck.shuffle();
  updateScores();
}
