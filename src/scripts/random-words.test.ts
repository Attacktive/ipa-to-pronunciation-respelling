import { describe, it, expect, vi } from 'vitest';
import { fetchWords, fetchFirstIpa } from './random-words';

globalThis.fetch = globalThis.fetch || vi.fn();

describe(
	'random words',
	() => {
		it(
			'fetchWords requests the configured number of words from the API',
			async () => {
				const fetchSpy = vi
					.fn()
					.mockResolvedValue({
						ok: true,
						json: async () => ['apple', 'banana', 'cat', 'dog', 'egg', 'fish', 'goat', 'hat']
					});
				globalThis.fetch = fetchSpy;

				await fetchWords(8);
				expect(fetchSpy).toHaveBeenCalledOnce();
				expect(fetchSpy.mock.calls[0][0]).toContain('number=8');
			}
		);

		it(
			'fetchWords falls back to the local list when the API rejects',
			async () => {
				(globalThis.fetch) = vi.fn().mockRejectedValue(new Error('network down'));

				const words = await fetchWords(5);
				expect(Array.isArray(words)).toBe(true);
				expect(words.length).toBe(5);
				expect(words.every(word => typeof word === 'string' && word.length > 0)).toBe(true);
			}
		);

		it(
			'fetchWords falls back to the local list on a non-2xx response',
			async () => {
				(globalThis.fetch) = vi
					.fn()
					.mockResolvedValue({ ok: false, status: 503 });

				const words = await fetchWords(3);
				expect(words.length).toBe(3);
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
