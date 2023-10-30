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
console.log(cards);

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
  drawCard(){
    return this.cards.pop();
    function drawCard(hand, targetElement) {
        const card = deck.drawCard();
        hand.push(card);
        const cardImg = document.createElement("img");
        cardImg.src = `/images/cards/${card.img}`;
        targetElement.appendChild(cardImg);
        updateScores();
    }
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
        const imgName = `${value}-${suit.charAt(0)}.png`;

        const card = {
          name: cardName,
          img: imgName,
        };

        cards.push(card);
        console.log(card);
      }
    }

    return cards;
  }
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      console.log(j);
    }
  }
}
const deck = new Deck();
const playerHand = [];
const dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let gameOver = false;
