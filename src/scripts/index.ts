import { convert } from './converter';
import { consonants, vowels, STRESS_MARK } from './mappings';
import { fetchWords, fetchFirstIpa } from './random-words';

function onWindowLoaded() {
	drawInputButtons();

	void generateRandomInput();
}

function drawInputButtons() {
	const input = document.querySelector<HTMLInputElement>('#input')!;

	const onButtonClick = (event: MouseEvent) => {
		const target = event.target as HTMLButtonElement;

		const start = input.selectionStart ?? input.value.length;
		const end = input.selectionEnd ?? input.value.length;

		input.focus();
		input.setRangeText(target.textContent ?? '', start, end, 'end');
	};

	const consonantInputButtonArea = document.querySelector<HTMLDivElement>('#input-button-area-consonants')!;
	[...consonants, STRESS_MARK]
		.map(consonant => {
			const button = document.createElement('button');
			button.type = 'button';
			button.textContent = consonant;

			button.className = 'col text-white bg-blue-500 hover:bg-blue-700 py-1 px-3 rounded input-button';
			button.addEventListener('click', onButtonClick);

			return button;
		})
		.forEach(button => consonantInputButtonArea.appendChild(button));

	const vowelInputButtonArea = document.querySelector<HTMLDivElement>('#input-button-area-vowels')!;
	vowels.map(vowel => {
		const button = document.createElement('button');
		button.type = 'button';
		button.textContent = vowel;

		button.className = 'col text-white bg-purple-500 hover:bg-purple-700 py-1 px-3 rounded input-button';
		button.addEventListener('click', onButtonClick);

		return button;
	})
		.forEach(button => vowelInputButtonArea.appendChild(button));
}

function onInput() {
	const input = document.querySelector<HTMLInputElement>('#input')!;
	const button = document.querySelector<HTMLButtonElement>('#run')!;

	if (input.value.length > 0) {
		button.removeAttribute('disabled');
	} else {
		button.setAttribute('disabled', '');
	}
}

function preventFormSubmission(event: KeyboardEvent) {
	if (event.key === 'Enter') {
		event.preventDefault();
	}
}

function onKeydown(event: KeyboardEvent) {
	if (event.key === 'Enter') {
		run();
	}
}

function run() {
	const input = document.querySelector<HTMLInputElement>('#input')!;
	const output = document.querySelector<HTMLElement>('#output')!;

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
	const output = document.querySelector<HTMLElement>('#output')!;

	navigator.clipboard.writeText(output.textContent)
		.then(() => {
			const message = `"${output.textContent}" is successfully copied to the clipboard. 😁`;

			console.debug(message);
			showToast(message);
		})
		.catch(error => {
			console.error(error);
			showToast('Failed to copy to the clipboard.');
		});
}

let toastTimeoutId: ReturnType<typeof setTimeout> | undefined;

function showToast(message: string) {
	const toast = document.querySelector<HTMLSpanElement>('#toast')!;
	toast.classList.remove('hidden');

	if (toastTimeoutId !== undefined) {
		clearTimeout(toastTimeoutId);
	}

	toastTimeoutId = setTimeout(() => toast.classList.add('hidden'), 3000);

	const toastBody = document.querySelector<HTMLSpanElement>('#toast-body')!;
	toastBody.textContent = message;
}

addEventListener('load', onWindowLoaded);


const forms = document.querySelectorAll('form');
for (const form of forms) {
	form.addEventListener('keydown', preventFormSubmission);
}

const input = document.querySelector<HTMLInputElement>('#input')!;
input.addEventListener('input', onInput);
input.addEventListener('keydown', onKeydown);

const button = document.querySelector<HTMLButtonElement>('#run')!;
button.addEventListener('click', run);

const copyButton = document.querySelector<HTMLButtonElement>('#copy')!;
copyButton.addEventListener('click', copy);

const randomIpaButton = document.querySelector<HTMLButtonElement>('#random-ipa')!;

async function generateRandomInput() {
	input.disabled = true;
	randomIpaButton.disabled = true;

	try {
		const words = await fetchWords();
		const ipa = await fetchFirstIpa(words);
		if (ipa) {
			input.value = ipa;
			input.dispatchEvent(new Event('input'));
		} else {
			showToast('No phonetic available for the fetched words. Try again?');
		}
	} catch (err) {
		console.error(err);
		showToast('Failed to fetch a random IPA.');
	} finally {
		input.disabled = false;
		randomIpaButton.disabled = false;
	}
}

randomIpaButton.addEventListener('click', generateRandomInput);
