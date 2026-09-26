import { generate } from 'random-words';

const URL_PREFIX_TO_IPA_API = 'https://api.dictionaryapi.dev/api/v2/entries/en';
const IPA_FETCH_TIMEOUT_MS = 5000;

function fetchWords(count = 8): string[] {
	return generate({ exactly: count }) as string[];
}

interface Ipa {
	word: string;
	phonetic: string;
}

async function fetchIpa(word: string): Promise<string | undefined> {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), IPA_FETCH_TIMEOUT_MS);

	try {
		const response = await fetch(
			`${URL_PREFIX_TO_IPA_API}/${word}`,
			{ signal: controller.signal }
		);

		if (!response.ok) {
			return undefined;
		}

		const [ipa] = await response.json() as Ipa[];

		return ipa?.phonetic;
	} catch {
		return undefined;
	} finally {
		clearTimeout(timeoutId);
	}
}

async function fetchRequiredIpa(word: string) {
	const phonetic = await fetchIpa(word);
	if (!phonetic) {
		throw Error(`No IPA is retrieved: ${word}`);
	}

	return phonetic;
}

async function fetchFirstIpa(words: string[]) {
	try {
		return await Promise.any(words.map(fetchRequiredIpa));
	} catch {
		return undefined;
	}
}

export { fetchWords, fetchIpa, fetchFirstIpa };
