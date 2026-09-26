import { describe, it, expect, vi } from 'vitest';
import { fetchWords, fetchFirstIpa } from './random-words';

globalThis.fetch = globalThis.fetch || vi.fn();

describe(
	'random words',
	() => {
		it(
			'fetchWords returns the requested number of words',
			() => {
				const words = fetchWords(5);

				expect(Array.isArray(words))
					.toBe(true);
				expect(words.length)
					.toBe(5);
				expect(words.every(word => typeof word === 'string' && word.length > 0))
					.toBe(true);
			}
		);

		it(
			'fetchFirstIpa returns the first available phonetic without waiting for earlier lookups',
			async () => {
				let resolveFirstRequest: (response: { ok: boolean }) => void;

				globalThis.fetch = vi
					.fn()
					.mockImplementationOnce(() => new Promise(resolve => {
						resolveFirstRequest = resolve;
					}))
					.mockResolvedValueOnce({
						ok: true,
						json: async () => [{ word: 'dog', phonetic: '/dɒg/' }]
					});

				const phonetic = await fetchFirstIpa(['cat', 'dog']);

				expect(globalThis.fetch)
					.toHaveBeenCalledTimes(2);
				expect(phonetic)
					.toBe('/dɒg/');

				resolveFirstRequest!({ ok: false });
			}
		);
	}
);
