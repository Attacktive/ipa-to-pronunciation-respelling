import { fetchWords, fetchIpa } from './random-words.ts';
import { testConversions, testIpaNotations } from './smoke-test-runner';
import type { ConversionError } from './smoke-test-runner';

const printFailures = (errors: ConversionError[], total: number, subject: string) => {
	const unsupported = errors.filter(error => error.kind === 'unsupported');
	const unexpected = errors.filter(error => error.kind === 'unexpected');
	if (unsupported.length > 0) {
		console.log(`${unsupported.length}/${total} ${subject} contain intentionally unsupported IPA symbols; excluding them from failure reports.`);
	}

	if (unexpected.length === 0) {
		return;
	}

	console.log(`${unexpected.length}/${total} ${subject} failed unexpectedly:`);

	for (const { word, ipa, error } of unexpected) {
		if (word !== undefined) {
			console.log(`  - ${word} [${ipa}]: ${error}`);
		} else {
			console.log(`  - [${ipa}]: ${error}`);
		}
	}

	process.stderr.write(`${JSON.stringify(unexpected)}\n`);
	process.exit(1);
};

function smokeTestIpaNotations(ipaNotations: string[]) {
	console.log(`Testing ${ipaNotations.length} supplied IPA notations...`);

	const { results, errors } = testIpaNotations(ipaNotations);

	for (const { ipa, respelling } of results) {
		console.log(`  - ${ipa} -> ${respelling}`);
	}

	printFailures(errors, ipaNotations.length, 'IPA notations');
	console.log(`All ${results.length} supported IPA notations converted successfully.`);
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

	printFailures(errors, wordsWithIpa.length, 'words');
	console.log(`All ${wordsWithIpa.length - errors.length} supported words converted successfully.`);
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
