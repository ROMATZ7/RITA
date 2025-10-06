const slider = document.getElementById("slider");
const boopBtn = document.getElementById("boopBtn");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const result = document.getElementById("result");
const pointer = document.getElementById("pointer");
const image = document.getElementById("dogImage");

const imageNaturalWidth = 600;
const noseCenterX = 299;
const tolerance = 20;

function updatePointer() {
	const x = parseInt(slider.value);
	const max = parseInt(slider.max);

	const imgRect = image.getBoundingClientRect();

	const pointerX = (x / max) * imgRect.width;
	const currentNoseX = (noseCenterX / imageNaturalWidth) * imgRect.width;

	pointer.style.left = `${pointerX}px`;

	const isOnNose = Math.abs(pointerX - currentNoseX) <= tolerance;

	pointer.style.color = isOnNose ? "#4a4e69" : "#9a8c98";

	boopBtn.disabled = false;
}

slider.addEventListener("input", updatePointer);

boopBtn.addEventListener("click", () => {
	const x = parseInt(slider.value);
	const max = parseInt(slider.max);

	const imgRect = image.getBoundingClientRect();
	const pointerX = (x / max) * imgRect.width;
	const currentNoseX = (noseCenterX / imageNaturalWidth) * imgRect.width;

	const isOnNose = Math.abs(pointerX - currentNoseX) <= tolerance;

	if (isOnNose) {
		result.textContent = "Boop! You're a human";
	} else {
		result.textContent = "Nice try, bot.";
	}
	result.classList.remove("hidden");
	boopBtn.classList.add("animate");
	setTimeout(() => boopBtn.classList.remove("animate"), 500);
	tryAgainBtn.classList.remove("hidden");
});

tryAgainBtn.addEventListener("click", () => {
	slider.value = 0;
	updatePointer();
	result.classList.add("hidden");
	tryAgainBtn.classList.add("hidden");
});

updatePointer();
slider.addEventListener("input", () => {
  updatePointer();
  console.log("slider.value:", slider.value);
});
 const debug = document.getElementById("debug");

slider.addEventListener("input", () => {
  updatePointer();
  debug.textContent = `Slider: ${slider.value}`;
});