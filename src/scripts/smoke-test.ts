import { convert } from './converter.ts';
import { fetchRandomWords, fetchIpa } from './random-words.ts';

interface ConversionError {
	word: string;
	ipa: string;
	error: string;
}

async function smokeTest() {
	console.log('Fetching random words...');
	const words = await fetchRandomWords();
	if (words === null) {
		console.log('Random word API failed; skipping smoke test.');

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
		} catch (error) {
			errors.push({ word, ipa, error: (error as Error).message });
		}
	}

	if (errors.length === 0) {
		console.log(`All ${wordsWithIpa.length} words converted successfully.`);
	} else {
		console.log(`${errors.length}/${wordsWithIpa.length} words failed to convert:`);

		for (const { word, ipa, error } of errors) {
			console.log(`  - ${word} [${ipa}]: ${error}`);
		}

		process.stderr.write(JSON.stringify(errors) + '\n');

		process.exit(1);
	}
}

smokeTest()
	.catch(error => {
		console.error('Unexpected error:', error);
		process.exit(1);
	});
