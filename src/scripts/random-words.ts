import { generate } from 'random-words';

const URL_TO_IPA_API = 'https://rhymebrain.com/talk';
const IPA_FETCH_TIMEOUT_MS = 5000;

function fetchWords(count = 8): string[] {
	return generate({ exactly: count }) as string[];
}

interface RhymeBrainWordInfo {
	ipa?: string;
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

	const url = new URL(URL_TO_IPA_API);
	url.searchParams.set('function', 'getWordInfo');
	url.searchParams.set('word', word);
	url.searchParams.set('lang', 'en');

	try {
		const response = await fetch(
			url,
			{ signal: controller.signal }
		);

		if (!response.ok) {
			return undefined;
		}

		const wordInfo = await response.json() as RhymeBrainWordInfo;
		const ipa = wordInfo.ipa?.trim();
		if (!ipa) {
			return undefined;
		}

		return ipa;
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
