const playerDeck = {
	suits: [ 'hearts', 'diamonds', 'spades', 'clubs' ],
	values: [ '2', '3,', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A' ],
	deck: [],
	hand: [],
	createDeck() {
		const { suits, values, deck } = this;
		for (const value of values) {
			for (const suit of suits) {
				deck.push({ value, suit });
			}
		}
		this.shuffleDeck();
	},
	shuffleDeck() {
		const { deck } = this;
		let currentIdx = deck.length;
		let tempCard, randomIdx;
		while (0 !== currentIdx) {
			randomIdx = Math.floor(Math.random() * currentIdx);
			currentIdx--;
			tempCard = deck[currentIdx];
			deck[currentIdx] = deck[randomIdx];
			deck[randomIdx] = tempCard;
		}
	},
	drawCards(num) {
		const { deck, hand } = this;
		hand.push(deck.splice(0, num));
	}
};
