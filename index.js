const playerDeck = {
	suits: [ 'heart', 'diamond', 'spade', 'club' ],
	values: [ '1', '2', '3,', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king' ],
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
		this.drawCards();
	},
	drawCards() {
		const drawAmt = document.querySelector('.draw-amt');
		const { deck, hand } = this;
		if (!hand.length) {
			hand.push(deck.splice(0, 5));
		} else {
			hand.push(deck.splice(0, drawAmt.valueAsNumber));
			drawAmt.value = '';
		}
		this.createCardContainers();
	},
	createCardContainers() {
		const numOfCards = this.hand[0].length;
		const cardContainer = document.querySelector('#card-container-columns');
		for (let i = 0; i < numOfCards; i++) {
			const card = document.createElement('div');
			if (i === 0) {
				card.classList.add('column', 'card', 'is-2', 'is-offset-1');
			} else {
				card.classList.add('column', 'card', 'is-2');
			}

			const cardImg = document.createElement('div');
			cardImg.classList.add('card-image');
			const figure = document.createElement('div');
			figure.classList.add('image');
			cardImg.appendChild(figure);
			card.appendChild(cardImg);
			cardContainer.appendChild(card);
		}
		this.displayCardImgs();
	},
	displayCardImgs() {
		const { hand } = this;
		const cards = document.querySelectorAll('.image');
		cards.forEach((card, i) => {
			const suit = hand[0][i].suit;
			const value = hand[0][i].value;
			const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			svg.setAttribute('viewBox', '0 0 300 300');
			svg.setAttribute('height', '300');
			svg.setAttribute('width', '300');
			const svgContent = `<use href="./images/cards/svg-cards/svg-cards.svg#${suit}_${value}" x="0" y="0"/>`;
			svg.innerHTML = svgContent;
			card.appendChild(svg);
		});
	},
	clearCurrentHand() {
		this.hand = [];
	},
	clearDeck() {
		this.deck = [];
		this.hand = [];
	}
};

const checkBtnDisable = (btns) => {
	btns.forEach((btn) => {
		if (btn.disabled) {
			btn.disabled = false;
		} else {
			btn.disabled = true;
		}
	});
};

const buttons = document.querySelectorAll('button');
buttons.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		switch (e.target.value) {
			case 'start':
				playerDeck.createDeck();
				checkBtnDisable(buttons);
				break;
			case 'end':
				playerDeck.clearDeck();
				checkBtnDisable(buttons);
				break;
			case 'draw':
				playerDeck.drawCards();
				break;
			case 'fold':
				playerDeck.clearCurrentHand();
				break;

			default:
				break;
		}
	});
});
