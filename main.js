const countToDate = new Date().setMinutes(new Date().getMinutes() + 12959);
let previousTimeBetweenDates;
setInterval(() => {
	const currentDate = new Date();
	const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000);
	flipAllCards(timeBetweenDates);
	previousTimeBetweenDates = timeBetweenDates;
}, 100);

function flipAllCards(time) {
	const seconds = time % 60;
	const minutes = Math.floor(time / 60) % 60;
	const hours = Math.floor(time / 3600) % 24;
	const days = Math.floor(time / 86400);

	flip(document.querySelector("[data-days]"), days);
	flip(document.querySelector("[data-hours]"), hours);
	flip(document.querySelector("[data-minutes]"), minutes);
	flip(document.querySelector("[data-seconds]"), seconds);
}

function flip(flipCard, newNumber) {
	const topNumber = flipCard.querySelector(".counter__timer--top");
	const startNumber = parseInt(topNumber.textContent);
	const startValue = ("0" + startNumber).slice(-2);
	const newValue = ("0" + newNumber).slice(-2);

	if (newNumber === startNumber) return;

	const bottomNumber = flipCard.querySelector(".counter__timer--bottom");
	const topFlip = document.createElement("div");
	topFlip.classList.add("top-flip");
	const bottomFlip = document.createElement("div");
	bottomFlip.classList.add("bottom-flip");

	topNumber.textContent = startValue;
	bottomNumber.textContent = startValue;
	topFlip.textContent = startValue;
	bottomFlip.textContent = newValue;

	topFlip.addEventListener("animationstart", e => {
		topNumber.textContent = newValue;
	});

	topFlip.addEventListener("animationend", e => {
		topFlip.remove();
	});

	bottomFlip.addEventListener("animationend", e => {
		bottomNumber.textContent = newValue;
		bottomFlip.remove();
	});

	flipCard.append(topFlip, bottomFlip);
}
