import { describe, it, expect } from 'vitest';
import { convert } from './converter';
import { symbolByIpa } from './mappings';

describe(
	'converter tests',
	() => {
		it(
			'uses canonical mapping for aɪ ("I")',
			() => expect(convert('aɪ')).toBe('eye')
		);

		it(
			'uses canonical mapping for ɡ ("go")',
			() => expect(convert('ɡ')).toBe('g')
		);

		it(
			'uses canonical mapping for s ("see")',
			() => expect(convert('s')).toBe('s')
		);

		it(
			'retains alternative respellings as mapping metadata',
			() => {
				expect(symbolByIpa.get('aɪ'))
					.toMatchObject({
						canonicalRespelling: 'eye',
						alternativeRespellings: ['y']
					});
			}
		);

		it(
			'handles single mapping for b ("be")',
			() => expect(convert('b')).toBe('b')
		);

		it(
			'handles the voiceless wh sound ("when")',
			() => expect(convert('/ʍɛn/')).toBe('/whehn/')
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
			() => expect(convert('strɛŋθ')).toBe('strehngth')
		);

		it(
			'handles liquid + consonant clusters ("help")',
			() => expect(convert('hɛlp')).toBe('hehlp')
		);

		it(
			'splits complex consonant clusters ("script")',
			() => expect(convert('skrɪpt')).toBe('skrihpt')
		);

		it(
			'handles nasal + stop clusters ("hand")',
			() => expect(convert('hænd')).toBe('hand')
		);

		it(
			'splits at fricative + stop boundaries ("asked")',
			() => expect(convert('æskt')).toBe('askt')
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
			() => expect(convert('kæt.ər.pɪl.ər')).toBe('kat er pihl er')
		);

		it(
			'does not invent a boundary inside a one-syllable word ("strict")',
			() => expect(convert('ˈstrɪkt')).toBe('STRIHKT')
		);

		it(
			'handles multiple syllables with stress ("caterpillar")',
			() => expect(convert('ˈkæt.ə.ˈpɪl.ər')).toBe('KAT uh PIHL er')
		);

		it(
			'ignores parentheses and length marks but keeps slashes ("hello")',
			() => expect(convert('/həˈloʊ(ː)/')).toBe('/huhLOH/')
		);

		it(
			'ignores wrapper parentheses ("hello")',
			() => expect(convert('(həˈloʊ)')).toBe('huhLOH')
		);

		it(
			'handles a length mark inside a diphthong ("hello")',
			() => expect(convert('həˈloːʊ')).toBe('huhLOH')
		);

		it(
			'respells juː as ew ("few")',
			() => expect(convert('fjuː')).toBe('few')
		);

		it(
			'stress mark terminates the prior syllable without an explicit "." ("cater")',
			() => expect(convert('kæˈtər')).toBe('kaTER')
		);

		it(
			'r between vowels syllabifies as onset of next syllable ("berry")',
			() => expect(convert('ˈbɛri')).toBe('BEHree')
		);

		it(
			'handles tie bar affricate ("judge")',
			() => expect(convert('/d͡ʒʌd͡ʒ/')).toBe('/juhj/')
		);

		it(
			'handles trailing hyphen ("curious")',
			() => expect(convert('/ˈkjɔː-/')).toBe('/KYAW/')
		);

		it(
			'handles plain e vowel ("clean")',
			() => expect(convert('/kleːn/')).toBe('/klehn/')
		);

		it(
			'handles a length mark after bare o ("quarter")',
			() => expect(convert('/ˈkoː.tɘ/')).toBe('/KAW tuh/')
		);

		it(
			'ignores the non-syllabic diacritic U+032F while keeping its vowel in the nucleus ("area")',
			() => expect(convert('/ˈɛə̯ɹɪə̯/')).toBe('/EHUHrihuh/')
		);

		it(
			'keeps a marked component inside a diphthong nucleus',
			() => expect(convert('/ˈaʊ̯tɪŋ/')).toBe('/OWtihng/')
		);

		it(
			'splits adjacent syllabic vowels into separate nuclei',
			() => expect(convert('ˈbaɪoʊ')).toBe('BEYEoh')
		);

		it(
			'handles tie bar affricate with syllabic consonant ("region")',
			() => expect(convert('/ˈɹiːd͡ʒn̩/')).toBe('/REEjn/')
		);

		it(
			'handles dark l and the British əʊ diphthong ("bowl")',
			() => expect(convert('/bəʊɫ/')).toBe('/bohl/')
		);

		it(
			'handles tie bar affricate ("choose")',
			() => expect(convert('/t͡ʃuːz/')).toBe('/chooz/')
		);

		it(
			'secondary stress mark terminates the prior syllable ("abstract", noun)',
			() => expect(convert('ˈæbˌstrækt')).toBe('ABstrakt')
		);

		it(
			'secondary stress mark stops primary stress from bleeding into the next syllable ("A-B")',
			() => expect(convert('ˈeɪˌbiː')).toBe('AYbee')
		);

		it(
			'infers the coda and onset between vowel nuclei ("household")',
			() => {
				expect(convert('/ˈhaʊshəʊld/'))
					.toBe('/HOWShohld/');
			}
		);
	}
);

describe(
	'structured IPA handling',
	() => {
		it(
			'preserves optional sounds in the respelling ("solution")',
			() => {
				expect(convert('/səˈl(j)uːʃən/'))
					.toBe('/suhL(Y)OOshuhn/');
			}
		);

		it(
			'keeps a multi-phoneme optional group together',
			() => expect(convert('/(st)/')).toBe('/(st)/')
		);

		it(
			'preserves a single optional phoneme',
			() => expect(convert('/(s)/')).toBe('/(s)/')
		);

		it(
			'handles long vowels and optional rhotics together ("archer")',
			() => {
				expect(convert('/ˈɑː(ɹ).tʃə(ɹ)/'))
					.toBe('/AH(R) chuh(r)/');
			}
		);
	}
);

describe(
	'normalization and diacritic resilience',
	() => {
		it(
			'drops an aspiration modifier letter ("tʰ")',
			() => expect(convert('tʰ')).toBe('t')
		);

		it(
			'decomposes a precomposed accented vowel via NFD ("ẽ")',
			() => expect(convert('ẽ')).toBe('eh')
		);

		it(
			'drops a half-length modifier ("ɛˑ")',
			() => expect(convert('ɛˑ')).toBe('eh')
		);

		it(
			'drops an unrecognized combining diacritic ("n̥" voiceless)',
			() => expect(convert('n̥')).toBe('n')
		);

		it(
			'keeps ç mapped after NFD key normalization ("ç")',
			() => expect(convert('ç')).toBe('ch')
		);

		it(
			'keeps nasal vowel chunks intact ("ɑ̃")',
			() => expect(convert('ɑ̃')).toBe('on')
		);
	}
);
