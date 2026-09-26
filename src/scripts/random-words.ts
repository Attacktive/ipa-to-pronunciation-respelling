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

async function fetchIpa(word: string, signal?: AbortSignal): Promise<string | undefined> {
	const controller = new AbortController();
	const abort = () => controller.abort(signal?.reason);
	const timeoutId = setTimeout(() => controller.abort(), IPA_FETCH_TIMEOUT_MS);

	if (signal?.aborted) {
		abort();
	} else {
		signal?.addEventListener('abort', abort, { once: true });
	}

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
		signal?.removeEventListener('abort', abort);
	}
}

async function fetchRequiredIpa(word: string, signal?: AbortSignal) {
	const phonetic = await fetchIpa(word, signal);
	if (!phonetic) {
		throw Error(`No IPA is retrieved: ${word}`);
	}

	return phonetic;
}

async function fetchFirstIpa(words: string[], signal?: AbortSignal) {
	try {
		return await Promise.any(words.map(word => fetchRequiredIpa(word, signal)));
	} catch {
		if (signal?.aborted) {
			throw signal.reason;
		}

		return undefined;
	}
}

export { fetchWords, fetchIpa, fetchFirstIpa };
