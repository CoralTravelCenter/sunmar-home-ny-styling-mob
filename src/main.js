import './main.scss'
import './ukrasheniya.css'
import './ded.css'
import './tooltip.css'

const block = document.querySelector("#quick-search-tab-area + div");
const root = document.documentElement;

// Создаем элементы
function createPathMarkup() {
	const path = document.createElement("div");
	path.id = "path";

	const santa = document.createElement("div");
	santa.id = "santa";

	const tooltip = document.createElement("div");
	tooltip.id = "ded-tooltip";

	const headline = document.createElement("span");
	headline.className = "headline";
	headline.textContent = "С наступающим Новым годом🎄🌟";

	const text = document.createElement("span");
	text.innerHTML = `
      Пусть 2025 год подарит вам море приключений, открытий и радости.<br>
      А мы всегда поможем воплотить заветные мечты о путешествиях.
    `;

	tooltip.appendChild(headline);
	tooltip.appendChild(text);
	santa.appendChild(tooltip);
	path.appendChild(santa);

	return path;
}

// Вставляем созданные элементы
const pathElement = createPathMarkup();
block.appendChild(pathElement);
console.log(pathElement, block)
const path = document.getElementById("path");
const santa = document.getElementById("santa");

let reachedMiddle = false;

function initAnimation() {
	setTimeout(() => {
		startAnimation();
	}, 2000);
}

function startAnimation() {
	path.classList.add("animated");
	reachedMiddle = false;
}

function stopAnimation() {
	santa.classList.add("stop");
	path.classList.add("stop");
}

function resumeAnimation() {
	santa.classList.remove("stop");
	path.classList.remove("stop");
}

function updateBlockWidth() {
	const blockWidth = block.offsetWidth;
	root.style.setProperty("--block-width", `${blockWidth}px`);
}

function checkPosition() {
	const santaRect = path.getBoundingClientRect();
	const blockRect = block.getBoundingClientRect();
	const santaCenter = santaRect.left + santaRect.width / 2;
	const blockCenter = blockRect.left + blockRect.width / 2;

	if (santaCenter >= blockCenter && !reachedMiddle) {
		showTooltip();
		reachedMiddle = true;
	}
}

function showTooltip() {
	const tooltip = document.getElementById("ded-tooltip");
	tooltip.classList.add("tooltip-active");
	stopAnimation();

	tooltip.addEventListener("click", () => {
		resumeAnimation();
		tooltip.classList.remove("tooltip-active");
	});

//	setTimeout(() => {
//		tooltip.classList.remove("tooltip-active");
//		resumeAnimation();
//	}, 5000);
}

function handleAnimationEnd() {
	path.classList.remove("animated");
	setTimeout(() => {
		startAnimation();
	}, 5000);
}

// Обновляем ширину блока при загрузке
updateBlockWidth();

// Слушатели событий
window.addEventListener("resize", () => {
	updateBlockWidth();
	checkPosition();
});

path.addEventListener("animationiteration", checkPosition);
path.addEventListener("animationend", handleAnimationEnd);

initAnimation();



