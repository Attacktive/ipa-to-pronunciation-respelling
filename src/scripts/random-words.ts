const URL_PREFIX_TO_RANDOM_WORD_API = 'https://random-word-api.herokuapp.com/word?number';
const URL_PREFIX_TO_IPA_API = 'https://api.dictionaryapi.dev/api/v2/entries/en';
const RANDOM_WORD_API_TIMEOUT_MS = 3000;

const FALLBACK_WORDS: readonly string[] = ['apple', 'autumn', 'banana', 'beach', 'beautiful', 'book', 'bread', 'butter', 'cat', 'chair', 'cheese', 'cloud', 'coffee', 'cold', 'computer', 'dance', 'day', 'desert', 'doctor', 'dog', 'door', 'draw', 'dream', 'earth', 'elephant', 'evening', 'family', 'fast', 'fire', 'fish', 'flower', 'forest', 'garden', 'happy', 'horse', 'hot', 'house', 'ice', 'jungle', 'kite', 'laugh', 'light', 'lion', 'love', 'milk', 'moon', 'morning', 'mountain', 'music', 'night', 'ocean', 'orange', 'paint', 'peace', 'phone', 'piano', 'queen', 'rain', 'read', 'river', 'run', 'sand', 'school', 'sing', 'sky', 'sleep', 'slow', 'small', 'smile', 'snow', 'spring', 'star', 'stone', 'street', 'student', 'sugar', 'summer', 'sun', 'table', 'teacher', 'tea', 'tree', 'umbrella', 'valley', 'walk', 'water', 'window', 'winter', 'world', 'write', 'year', 'yellow'];

function pickFallbackWords(count: number): string[] {
	return Array.from(
		{ length: count },
		() => FALLBACK_WORDS[Math.floor(Math.random() * FALLBACK_WORDS.length)]
	);
}

async function fetchWords(number = 8) {
	const url = `${URL_PREFIX_TO_RANDOM_WORD_API}=${number}`;

	try {
		const response = await fetch(url, { signal: AbortSignal.timeout(RANDOM_WORD_API_TIMEOUT_MS) });
		if (!response.ok) {
			throw new Error(`Got a ${response.status} response from: ${url}`);
		}

		return await response.json() as string[];
	} catch (error) {
		console.warn('Random word API failed; using local fallback list.', error);

		return pickFallbackWords(number);
	}
}

interface Ipa {
	word: string;
	phonetic: string;
}

async function fetchFirstIpa(words: string[]) {
	for (const word of words) {
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

		const { phonetic } = ipa;
		if (!phonetic) {
			console.warn(`No IPA is retrieved: ${word}; it's just not provided by the API.`);
			continue;
		}

		return phonetic;
	}

	return undefined;
}

export { fetchWords, fetchFirstIpa };
