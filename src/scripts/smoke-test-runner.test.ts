import { describe, expect, it } from 'vitest';
import { testConversions, testIpaNotations } from './smoke-test-runner';

describe(
	'smoke test runner',
	() => {
		it(
			'converts every supplied IPA notation and returns the respellings',
			() => {
				const { results, errors } = testIpaNotations(['/ˈaʊ̯tɪŋ/', 'ˈbaɪoʊ']);

				expect(errors)
					.toEqual([]);

				expect(results)
					.toEqual([
						{ ipa: '/ˈaʊ̯tɪŋ/', respelling: '/OWt(i|ih)ng/' },
						{ ipa: 'ˈbaɪoʊ', respelling: 'B(EYE|Y)oh' }
					]);
			}
		);

		it(
			'collects a failure without skipping later IPA notations',
			() => {
				const { results, errors } = testIpaNotations(['aɪ', '💩', 'b']);

				expect(results)
					.toEqual([
						{ ipa: 'aɪ', respelling: '(eye|y)' },
						{ ipa: 'b', respelling: 'b' }
					]);

				expect(errors)
					.toHaveLength(1);
				expect(errors[0])
					.toMatchObject({ ipa: '💩' });
			}
		);

		it(
			'preserves word metadata for random-word conversions and failures',
			() => {
				const { results, errors } = testConversions([
					{ word: 'eye', ipa: 'aɪ' },
					{ word: 'invalid', ipa: '💩' }
				]);

				expect(results)
					.toEqual([
						{ word: 'eye', ipa: 'aɪ', respelling: '(eye|y)' }
					]);

				expect(errors)
					.toHaveLength(1);
				expect(errors[0])
					.toMatchObject({ word: 'invalid', ipa: '💩' });
			}
		);
	}
);
