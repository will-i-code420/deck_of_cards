function createDeck() {
	const suits = [ 'hearts', 'diamonds', 'spades', 'clubs' ];
	const values = [ '2', '3,', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A' ];
	const deck = [];
	for (const value of values) {
		for (const suit of suits) {
			deck.push({ value, suit });
		}
	}
	return deck;
}

function drawCard(cards) {
	const idx = Math.floor(Math.random() * cards.length);
	const card = cards.splice(idx, 1);
	return card;
}

const deck = createDeck();
