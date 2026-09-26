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
			'aborts every pending lookup when random IPA fetching is canceled',
			async () => {
				const controller = new AbortController();

				globalThis.fetch = vi.fn(
					(_input, init) => new Promise((_resolve, reject) => {
						init?.signal?.addEventListener(
							'abort',
							() => reject(init.signal?.reason),
							{ once: true }
						);
					})
				);

				const phonetic = fetchFirstIpa(['cat', 'dog'], controller.signal);
				controller.abort();

				await expect(phonetic)
					.rejects.toMatchObject({ name: 'AbortError' });
				expect(globalThis.fetch)
					.toHaveBeenCalledTimes(2);
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
