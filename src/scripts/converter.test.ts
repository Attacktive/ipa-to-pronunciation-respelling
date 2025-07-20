import { describe, it, expect } from 'vitest';
import { convert } from './converter';

describe(
	'convert',
	() => {
		it(
			'handles ambiguous mapping for aɪ',
			() => expect(convert('aɪ')).toBe('(eye|y)')
		);

		it(
			'handles ambiguous mapping for ɡ',
			() => expect(convert('ɡ')).toBe('(g|gh)')
		);

		it(
			'handles ambiguous mapping for s',
			() => expect(convert('s')).toBe('(s|ss)')
		);

		it(
			'handles single mapping for b',
			() => expect(convert('b')).toBe('b')
		);

		it(
			'handles single mapping for æ',
			() => expect(convert('æ')).toBe('a')
		);

		it(
			'handles accepted symbol /',
			() => expect(convert('/')).toBe('/')
		);

		it(
			'handles accepted symbol (space)',
			() => expect(convert(' ')).toBe(' ')
		);

		it(
			'throws error for unknown symbol',
			() => expect(() => convert('💩')).toThrow()
		);
	}
);
