import { describe, it, expect, vi } from 'vitest';
import { fetchWords, convertToIpa } from './random-words';

globalThis.fetch = globalThis.fetch || vi.fn();

describe(
	'random words',
	() => {
		it(
			'fetchWords returns an array of the requested length',
			async () => {
				(globalThis.fetch) = vi
					.fn()
					.mockResolvedValue({
							json: async () => ['apple', 'banana', 'cat', 'dog', 'egg', 'fish', 'goat', 'hat']
						}
					);

				const words = await fetchWords(8);
				expect(Array.isArray(words)).toBe(true);
				expect(words.length).toBe(8);
			}
		);

		it(
			'convertToIpa returns first phonetic for known words',
			async () => {
				(globalThis.fetch) = vi
					.fn()
					.mockResolvedValueOnce({
							ok: true,
							json: async () => [{ word: 'cat', phonetic: '/kæt/' }]
						}
					)
					.mockResolvedValueOnce({
							ok: true,
							json: async () => [{ word: 'dog', phonetic: '/dɒg/' }]
						}
					);

				const phonetic = await convertToIpa(['cat', 'dog']);
				expect(phonetic).toBe('/kæt/');
			}
		);
	}
);
