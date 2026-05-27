import { generate } from 'random-words';

const URL_PREFIX_TO_IPA_API = 'https://api.dictionaryapi.dev/api/v2/entries/en';

function fetchWords(count = 8): string[] {
	return generate({ exactly: count }) as string[];
}

interface Ipa {
	word: string;
	phonetic: string;
}

async function fetchIpa(word: string): Promise<string | undefined> {
	try {
		const response = await fetch(`${URL_PREFIX_TO_IPA_API}/${word}`);

		if (!response.ok) {
			return undefined;
		}

		const [ipa] = await response.json() as Ipa[];

		return ipa?.phonetic;
	} catch {
		return undefined;
	}
}

async function fetchFirstIpa(words: string[]) {
	for (const word of words) {
		const phonetic = await fetchIpa(word);
		if (phonetic) {
			return phonetic;
		}

		console.warn(`No IPA is retrieved: ${word}`);
	}

	return undefined;
}

export { fetchWords, fetchIpa, fetchFirstIpa };
