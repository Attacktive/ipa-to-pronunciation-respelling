const URL_PREFIX_TO_RANDOM_WORD_API = 'https://random-word-api.herokuapp.com/word?number';
const URL_PREFIX_TO_IPA_API = 'https://api.dictionaryapi.dev/api/v2/entries/en';

async function fetchWords(number = 8) {
	const url = `${URL_PREFIX_TO_RANDOM_WORD_API}=${number}`;

	const response = await fetch(url);
	if (!response) {
		throw new Error(`Got no response from: ${url}`);
	}

	return await response.json() as string[];
}

interface Ipa {
	word: string;
	phonetic: string;
}

async function convertToIpa(words: string | string[]) {
	let array: string[];
	if (Array.isArray(words)) {
		array = words;
	} else {
		array = [words];
	}

	for (const word of array) {
		const response = await fetch(`${URL_PREFIX_TO_IPA_API}/${word}`);
		if (!response.ok) {
			console.warn(`Failed to retrieve IPA: ${word}`);
			continue;
		}

		const [ipa] = await response.json() as Ipa[];
		if (!ipa) {
			console.warn(`No IPA is retrieved: ${word}`);
			continue;
		}

		return ipa.phonetic;
	}

	return undefined;
}

export { fetchWords, convertToIpa };
