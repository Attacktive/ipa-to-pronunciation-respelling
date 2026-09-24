import { describe, expect, it } from 'vitest';
import { parseIpa } from './parser';

describe(
	'IPA parser',
	() => {
		it(
			'preserves vowel length and optional phonemes',
			() => {
				const phonemes = parseIpa('/ˈɑː(ɹ).tʃə(ɹ)/')
					.filter(token => token.kind === 'phoneme');

				expect(phonemes)
					.toEqual([
						{ kind: 'phoneme', ipa: 'ɑ', optional: false, long: true },
						{ kind: 'phoneme', ipa: 'ɹ', optional: true, long: false },
						{ kind: 'phoneme', ipa: 'tʃ', optional: false, long: false },
						{ kind: 'phoneme', ipa: 'ə', optional: false, long: false },
						{ kind: 'phoneme', ipa: 'ɹ', optional: true, long: false }
					]);
			}
		);

		it(
			'preserves syllabic and non-syllabic diacritics as structure',
			() => {
				const syllabicConsonant = parseIpa('/n̩/')
					.find(token => token.kind === 'phoneme');
				const nonSyllabicVowel = parseIpa('/ə̯/')
					.find(token => token.kind === 'phoneme');

				expect(syllabicConsonant)
					.toMatchObject({ ipa: 'n', syllabic: true });
				expect(nonSyllabicVowel)
					.toMatchObject({ ipa: 'ə', syllabic: false });
			}
		);
	}
);
