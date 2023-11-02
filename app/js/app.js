document.addEventListener('DOMContentLoaded', () => {

	Vue.createApp({
		data: () => ({
			cards: [],
			itemRefs: [],
			isLocalhost: false,
		}),
		async mounted() {
			if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
				this.isLocalhost = true;
			}
			await fetch("js/db.json")
				.then(res => res.json())
				.then(data => this.cards = data.cards)
			this.cards.forEach(card => {
				card.flipped = false
			});
			this.cards.sort(() => Math.random() - 0.5);
			this.paintCards(this.$refs.items);
		},
		methods: {
			paintCards: (cards) => {
				cards.forEach(ref => {
					let clr = '';
					let bgc = '';

					// let rndmClr = Math.floor(Math.random() * 0xFFFFFF << 0).toString(16)
					let rndmClr = Math.floor(Math.random() * 16777215).toString(16)

					while (rndmClr.length < 6) {
						rndmClr = Math.floor(Math.random() * 16777215).toString(16)
					}

					const red = parseInt(rndmClr.substring(0, 2), 16)
					const green = parseInt(rndmClr.substring(2, 4), 16)
					const blue = parseInt(rndmClr.substring(4, 6), 16)
					const brightness = red * 0.299 + green * 0.587 + blue * 0.114

					if (brightness > 180) {
						bgc = '#' + rndmClr
						clr = '#2e2e2e'
					}
					else {
						bgc = '#' + rndmClr
						clr = '#ffffff'
					}

					ref.querySelectorAll('.card-side').forEach(el => {
						el.style.backgroundColor = bgc;
						el.style.color = clr;
					});
				});
			},
			flipCard: function (card) {
				card.flipped = !card.flipped;
			},
			addCard: () => {
				console.log('test');
			}
		}
	}).mount('#app');

})
