import { describe, it, expect } from 'vitest';
import { convert } from './converter';

describe(
	'converter tests',
	() => {
		it(
			'handles ambiguous mapping for aɪ ("I")',
			() => expect(convert('aɪ')).toBe('(eye|y)')
		);

		it(
			'handles ambiguous mapping for ɡ ("go")',
			() => expect(convert('ɡ')).toBe('(g|gh)')
		);

		it(
			'handles ambiguous mapping for s ("see")',
			() => expect(convert('s')).toBe('(s|ss)')
		);

		it(
			'handles single mapping for b ("be")',
			() => expect(convert('b')).toBe('b')
		);

		it(
			'handles single mapping for æ ("cat" vowel)',
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
			'splits simple CV syllables ("cat")',
			() => expect(convert('kæt')).toBe('kat')
		);

		it(
			'splits consonant clusters at sonority valleys ("strength")',
			() => expect(convert('strɛŋθ')).toBe('(s|ss)tr(e|eh)ngth')
		);

		it(
			'handles liquid + consonant clusters ("help")',
			() => expect(convert('hɛlp')).toBe('h(e|eh)lp')
		);

		it(
			'splits complex consonant clusters ("script")',
			() => expect(convert('skrɪpt')).toBe('(s|ss)kr(i|ih)pt')
		);

		it(
			'handles nasal + stop clusters ("hand")',
			() => expect(convert('hænd')).toBe('hand')
		);

		it(
			'splits at fricative + stop boundaries ("asked")',
			() => expect(convert('æskt')).toBe('a(s|ss)kt')
		);

		it(
			'handles vowel + liquid + consonant ("world")',
			() => expect(convert('wɜrld')).toBe('wurld')
		);

		it(
			'splits geminate consonants ("apple")',
			() => expect(convert('æpl')).toBe('apl')
		);

		it(
			'throws error for unknown symbol',
			() => expect(() => convert('💩')).toThrow()
		);

		it(
			'handles stress with syllable boundaries ("cater")',
			() => expect(convert('ˈkæt.ər')).toBe('KAT er')
		);

		it(
			'splits multisyllabic words correctly ("caterpillar")',
			() => expect(convert('kæt.ər.pɪl.ər')).toBe('kat er p(i|ih)l er')
		);

		it(
			'syllable boundaries work with complex clusters ("strict")',
			() => expect(convert('ˈstrɪkt')).toBe('(S|SS)Tr(i|ih)kt')
		);

		it(
			'handles multiple syllables with stress ("caterpillar")',
			() => expect(convert('ˈkæt.ə.ˈpɪl.ər')).toBe('KAT uh P(I|IH)L er')
		);

		it(
			'ignores parentheses and length marks but keeps slashes ("hello")',
			() => expect(convert('/həˈloʊ(ː)/')).toBe('/huhLOH/')
		);

		it(
			'ignores parentheses ("hello")',
			() => expect(convert('(həˈloʊ)')).toBe('huhLOH')
		);

		it(
			'ignores length marks ("hello")',
			() => expect(convert('həˈloːʊ')).toBe('huhLOH')
		);

		it(
			'stress mark terminates the prior syllable without an explicit "." ("cater")',
			() => expect(convert('kæˈtər')).toBe('kaTER')
		);

		it(
			'r between vowels syllabifies as onset of next syllable ("berry")',
			() => expect(convert('ˈbɛri')).toBe('B(E|EH)Ree')
		);
	}
);
