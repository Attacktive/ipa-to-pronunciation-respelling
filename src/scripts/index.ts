import bootstrap from "bootstrap";
import { convert } from "./converter";

function loaded() {
	focusOnInput();
}

function focusOnInput() {
	const input = document.querySelector("#input") as HTMLInputElement;
	input.select();
}

function onInput() {
	const input = document.querySelector("#input") as HTMLInputElement;
	const button = document.querySelector("#run") as HTMLButtonElement;

	if (input.value.length > 0) {
		button.removeAttribute("disabled");
	} else {
		button.setAttribute("disabled", "");
	}
}

function preventFormSubmission(event: KeyboardEvent) {
	if (event.key === "Enter") {
		return false;
	}
}

function onKeydown(event: KeyboardEvent) {
	if (event.key === "Enter") {
		run();
	}
}

function run() {
	const input = document.querySelector("#input") as HTMLInputElement;
	const output = document.querySelector("#output") as HTMLElement;

	let result;

	try {
		result = convert(input.value);
	} catch (error) {
		console.error(error);

		result = (error as Error).message;
	}

	output.textContent = result;
}

function copy() {
	const output = document.querySelector("#output") as HTMLElement;

	navigator.clipboard.writeText(output.textContent as string)
		.then(() => {
			const message = `"${output.textContent}" is successfully copied to the clipboard. 😁`;

			console.debug(message);
			showToast(message);
		});
}

function showToast(message: string) {
	const toastBody = document.querySelector("#toast-body") as HTMLElement;
	toastBody.textContent = message;

	const toastElement = document.querySelector("#toast") as HTMLElement;
	const toast = bootstrap.Toast.getOrCreateInstance(toastElement);
	toast.show();
}

addEventListener("load", loaded);

const forms = document.querySelectorAll("form");
for (const form of Array.from(forms)) {
	form.onkeydown = preventFormSubmission;
}

const input = document.querySelector("#input") as HTMLInputElement;
input.addEventListener("input", onInput);
input.addEventListener("keydown", onKeydown);

const button = document.querySelector("#run") as HTMLButtonElement;
button.addEventListener("click", run);

const copyButton = document.querySelector("#copy") as HTMLButtonElement;
copyButton.addEventListener("click", copy);
