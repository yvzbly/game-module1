class Card {
    constructor(suit, value, img){
        this.suit = suit;
        this.value = value;
        this.img = img; 
    }
}
class Deck {
    constructor(){
        this.cards = this.createDeck();
        this.shuffle();
    }
}
createDeck(){
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    const cards = [];
}