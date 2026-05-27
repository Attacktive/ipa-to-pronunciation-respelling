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
				expect(Array.isArray(words)).toBe(true);
				expect(words.length).toBe(5);
				expect(words.every(word => typeof word === 'string' && word.length > 0)).toBe(true);
			}
		);

		it(
			'fetchFirstIpa returns first phonetic for known words',
			async () => {
				(globalThis.fetch) = vi
					.fn()
					.mockResolvedValueOnce({
						ok: true,
						json: async () => [{ word: 'cat', phonetic: '/kæt/' }]
					})
					.mockResolvedValueOnce({
						ok: true,
						json: async () => [{ word: 'dog', phonetic: '/dɒg/' }]
					});

				const phonetic = await fetchFirstIpa(['cat', 'dog']);
				expect(phonetic).toBe('/kæt/');
			}
		);
	}
);
