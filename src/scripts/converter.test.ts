import { describe, it, expect } from 'vitest';
import { convert } from './converter';

describe(
	'converter tests',
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

describe(
	'syllabification tests',
	() => {
		it(
			'splits simple CV syllables',
			() => expect(convert('kæt')).toBe('kat')
		);

		it(
			'splits consonant clusters at sonority valleys',
			() => expect(convert('strɛŋθ')).toBe('(s|ss)tr(e|eh)ngth')
		);

		it(
			'handles liquid + consonant clusters',
			() => expect(convert('hɛlp')).toBe('h(e|eh)lp')
		);

		it(
			'splits complex consonant clusters',
			() => expect(convert('skrɪpt')).toBe('(s|ss)kr(i|ih)pt')
		);

		it(
			'handles nasal + stop clusters',
			() => expect(convert('hænd')).toBe('hand')
		);

		it(
			'splits at fricative + stop boundaries',
			() => expect(convert('æskt')).toBe('a(s|ss)kt')
		);

		it(
			'handles vowel + liquid + consonant',
			() => expect(convert('wɜrld')).toBe('wuhrld')
		);

		it(
			'splits geminate consonants',
			() => expect(convert('æpl')).toBe('apl')
		);

		it(
			'throws error for unknown symbol',
			() => expect(() => convert('💩')).toThrow()
		);

		it(
			'handles stress with syllable boundaries',
			() => expect(convert('ˈkæt.ər')).toBe('KAT uhr')
		);

		it(
			'splits multisyllabic words correctly',
			() => expect(convert('kæt.ər.pɪl.ər')).toBe('kat uhr p(i|ih)l uhr')
		);

		it(
			'syllable boundaries work with complex clusters',
			() => expect(convert('ˈstrɪkt')).toBe('(S|SS)Tr(i|ih)kt')
		);

		it(
			'handles multiple syllables with stress',
			() => expect(convert('ˈkæt.ə.ˈpɪl.ər')).toBe('KAT uh P(I|IH)L uhr')
		);

		it(
			'ignores parentheses and length marks but keeps slashes',
			() => expect(convert('/həˈloʊ(ː)/')).toBe('/HUHLOH/')
		);

		it(
			'ignores parentheses',
			() => expect(convert('(həˈloʊ)')).toBe('HUHLOH')
		);

		it(
			'ignores length marks',
			() => expect(convert('həˈloːʊ')).toBe('HUHLOH')
		);
	}
);
