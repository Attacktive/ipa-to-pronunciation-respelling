import { fetchWords, fetchIpa } from './random-words.ts';
import { testConversions, testIpaNotations } from './smoke-test-runner.ts';
import type { ConversionError } from './smoke-test-runner.ts';

const printFailures = (errors: ConversionError[], total: number, subject: string) => {
	console.log(`${errors.length}/${total} ${subject} failed to convert:`);

	for (const { word, ipa, error } of errors) {
		if (word !== undefined) {
			console.log(`  - ${word} [${ipa}]: ${error}`);
		} else {
			console.log(`  - [${ipa}]: ${error}`);
		}
	}

	process.stderr.write(`${JSON.stringify(errors)}\n`);
};

function smokeTestIpaNotations(ipaNotations: string[]) {
	console.log(`Testing ${ipaNotations.length} supplied IPA notations...`);

	const { results, errors } = testIpaNotations(ipaNotations);

	for (const { ipa, respelling } of results) {
		console.log(`  - ${ipa} -> ${respelling}`);
	}

	if (errors.length === 0) {
		console.log(`All ${ipaNotations.length} IPA notations converted successfully.`);
		return;
	}

	printFailures(errors, ipaNotations.length, 'IPA notations');

	process.exit(1);
}

async function smokeTestRandomWords() {
	const words = fetchWords();
	console.log(`Got ${words.length} words. Fetching IPA transcriptions...`);

	const ipaPromises = words.map(async word => ({ word, ipa: await fetchIpa(word) }));
	const ipaResults = await Promise.allSettled(ipaPromises);

	const wordsWithIpa = ipaResults
		.filter((result): result is PromiseFulfilledResult<{ word: string; ipa: string }> =>
			result.status === 'fulfilled' && result.value.ipa !== undefined,
		)
		.map(({ value }) => value);

	console.log(`Got IPA for ${wordsWithIpa.length}/${words.length} words. Testing converter...`);

	const { errors } = testConversions(wordsWithIpa);

	if (errors.length === 0) {
		console.log(`All ${wordsWithIpa.length} words converted successfully.`);
		return;
	}

	printFailures(errors, wordsWithIpa.length, 'words');

	process.exit(1);
}

async function smokeTest() {
	const ipaNotations = process.argv.slice(2);
	if (ipaNotations.length > 0) {
		smokeTestIpaNotations(ipaNotations);
		return;
	}

	await smokeTestRandomWords();
}

smokeTest()
	.catch(error => {
		console.error('Unexpected error:', error);
		process.exit(1);
	});
