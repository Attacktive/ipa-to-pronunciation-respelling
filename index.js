function loaded() {
	focusOnInput();
}

function focusOnInput() {
	const input = document.querySelector("#input");
	input.select();
}

function onInput() {
	const input = document.querySelector("#input");
	const button = document.querySelector("#run");

	if (input.value.length > 0) {
		button.removeAttribute("disabled");
	} else {
		button.setAttribute("disabled", "");
	}
}

/**
 * @param { KeyboardEvent } event
 */
function preventFormSubmission(event) {
	if (event.key === "Enter") {
		return false;
	}
}

/**
 * @param { KeyboardEvent } event
 */
function onKeydown(event) {
	if (event.key === "Enter") {
		run();
	}
}

function run() {
	const input = document.querySelector("#input");
	const output = document.querySelector("#output");

	let result;

	try {
		result = convert(input.value);
	} catch (error) {
		console.error(error);

		result = error.message;
	}

	output.textContent = result;
}

addEventListener("load", loaded);

const forms = document.querySelectorAll("form");
for (const form of Array.from(forms)) {
	form.onkeydown = preventFormSubmission;
}

const input = document.querySelector("#input");
input.addEventListener("input", onInput);
input.addEventListener("keydown", onKeydown);

const button = document.querySelector("#run");
button.addEventListener("click", run);
