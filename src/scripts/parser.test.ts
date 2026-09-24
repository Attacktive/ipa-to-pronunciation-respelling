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
						{ kind: 'phoneme', ipa: 'ɑ', long: true },
						{ kind: 'phoneme', ipa: 'ɹ', long: false },
						{ kind: 'phoneme', ipa: 'tʃ', long: false },
						{ kind: 'phoneme', ipa: 'ə', long: false },
						{ kind: 'phoneme', ipa: 'ɹ', long: false }
					]);

				const optionals = parseIpa('/ˈɑː(ɹ).tʃə(ɹ)/')
					.filter(token => token.kind === 'optional');

				expect(optionals)
					.toEqual([
						{ kind: 'optional', boundary: 'start' },
						{ kind: 'optional', boundary: 'end' },
						{ kind: 'optional', boundary: 'start' },
						{ kind: 'optional', boundary: 'end' }
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

		it(
			'keeps a non-syllabic component inside a compound vowel token',
			() => {
				const diphthong = parseIpa('/aʊ̯/')
					.find(token => token.kind === 'phoneme');

				expect(diphthong)
					.toMatchObject({ ipa: 'aʊ', containsNonSyllabicComponent: true });
			}
		);
	}
);
