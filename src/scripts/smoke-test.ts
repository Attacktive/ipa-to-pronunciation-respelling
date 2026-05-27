import { convert } from '../src/scripts/converter.ts';

const RANDOM_WORD_API_URL_PREFIX = 'https://random-word-api.herokuapp.com/word?number';
const IPA_API_URL_PREFIX = 'https://api.dictionaryapi.dev/api/v2/entries/en';

interface DictionaryEntry {
	phonetic?: string;
}

async function fetchWords(count: number): Promise<string[] | null> {
	try {
		const response = await fetch(
			`${RANDOM_WORD_API_URL_PREFIX}=${count}`,
			{ signal: AbortSignal.timeout(5000) },
		);

		if (!response.ok) {
			throw new Error(`Status ${response.status}`);
		}

		return await response.json() as string[];
	} catch (error) {
		console.warn('Random word API failed; skipping smoke test.', error);

		return null;
	}
}

async function fetchIpa(word: string): Promise<string | undefined> {
	try {
		const response = await fetch(`${IPA_API_URL_PREFIX}/${word}`);

		if (!response.ok) {
			return undefined;
		}

		const [entry] = await response.json() as DictionaryEntry[];

		return entry?.phonetic;
	} catch {
		return undefined;
	}
}

interface ConversionError {
	word: string;
	ipa: string;
	error: string;
}

async function main() {
	const count = parseInt(process.argv[2] ?? '8', 10);

	console.log(`Fetching ${count} random words...`);
	const words = await fetchWords(count);
	if (words === null) {
		return;
	}

	console.log(`Got ${words.length} words. Fetching IPA transcriptions...`);

	const ipaPromises = words.map(async word => ({ word, ipa: await fetchIpa(word) }));
	const ipaResults = await Promise.allSettled(ipaPromises);

	const wordsWithIpa = ipaResults
		.filter((result): result is PromiseFulfilledResult<{ word: string; ipa: string }> =>
			result.status === 'fulfilled' && result.value.ipa !== undefined,
		)
		.map(({ value }) => value);

	console.log(`Got IPA for ${wordsWithIpa.length}/${words.length} words. Testing converter...`);

	const errors: ConversionError[] = [];

	for (const { word, ipa } of wordsWithIpa) {
		try {
			convert(ipa);
		} catch (e) {
			errors.push({ word, ipa, error: (e as Error).message });
		}
	}

	if (errors.length === 0) {
		console.log(`All ${wordsWithIpa.length} words converted successfully.`);
	} else {
		console.error(`${errors.length}/${wordsWithIpa.length} words failed to convert:`);
		for (const { word, ipa, error } of errors) {
			console.error(`  - ${word} [${ipa}]: ${error}`);
		}

		process.exit(1);
	}
}

main()
	.catch(error => {
		console.error('Unexpected error:', error);
		process.exit(1);
	});
