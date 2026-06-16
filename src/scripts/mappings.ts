type Category = 'vowel' | 'glide' | 'liquid' | 'nasal' | 'fricative' | 'affricate' | 'stop';

// Sonority rankings (higher = more sonorous)
const CATEGORY_SONORITY: Record<Category, number> = {
	vowel: 8,
	glide: 7,
	liquid: 6,
	nasal: 5,
	fricative: 4,
	affricate: 3,
	stop: 2
};

interface IpaSymbol {
	ipa: string;
	respellings: string[];
	category: Category;
	sonority: number;
}

const defineSymbol = (category: Category) => (ipa: string, respelling: string | string[]): IpaSymbol => ({
	ipa,
	respellings: Array.isArray(respelling)? respelling: [respelling],
	category,
	sonority: CATEGORY_SONORITY[category]
});

const vowel = defineSymbol('vowel');
const glide = defineSymbol('glide');
const liquid = defineSymbol('liquid');
const nasal = defineSymbol('nasal');
const fricative = defineSymbol('fricative');
const affricate = defineSymbol('affricate');
const stop = defineSymbol('stop');

const consonantSymbols = [
	stop('b', 'b'),
	affricate('tʃ', ['ch', 'tch']),
	stop('d', 'd'),
	fricative('ð', 'dh'),
	fricative('f', 'f'),
	stop('ɡ', ['g', 'gh']),
	fricative('h', 'h'),
	fricative('ɦ', 'h'),
	affricate('dʒ', 'j'),
	stop('k', 'k'),
	fricative('x', 'kh'),
	liquid('l', 'l'),
	liquid('ɫ', 'l'),
	liquid('ʎ', 'ly'),
	nasal('m', 'm'),
	nasal('ɱ', 'm'),
	nasal('n', 'n'),
	nasal('ɳ', 'n'),
	nasal('ŋ', 'ng'),
	nasal('ɴ', 'ng'),
	// Nasal+stop clusters take the stop category since they pattern as codas.
	stop('ŋk', 'nk'),
	stop('p', 'p'),
	liquid('r', 'r'),
	liquid('ɹ', 'r'),
	liquid('ɾ', 'r'),
	liquid('ɽ', 'r'),
	fricative('s', ['s', 'ss']),
	fricative('ʃ', 'sh'),
	stop('t', 't'),
	stop('ʈ', 't'),
	fricative('θ', 'th'),
	fricative('v', 'v'),
	glide('w', 'w'),
	glide('ɥ', 'w'),
	glide('ɰ', 'w'),
	glide('hw', 'wh'),
	glide('j', 'y'),
	fricative('ʝ', 'y'),
	fricative('z', 'z'),
	fricative('ʒ', 'zh'),
	fricative('ç', 'ch'),
	affricate('ʣ', 'dz'),
	affricate('ʤ', 'j'),
	affricate('ʦ', 'ts'),
	affricate('ʧ', 'ch'),
	stop('ɢ', 'g'),
	stop('ʔ', ''),
	stop('c', 'k'),
	stop('ɟ', 'g'),
	stop('q', 'k'),
	fricative('χ', 'kh'),
	fricative('ʁ', 'r'),
	fricative('ħ', 'h'),
	fricative('ʕ', '')
];

// Length-marked entries (ɑː, juː, …) never match during conversion because ː is
// stripped beforehand, but they populate the IPA input buttons.
const vowelSymbols = [
	vowel('æ', 'a'),
	vowel('ɑ', 'ah'),
	vowel('ɑː', 'ah'),
	vowel('ɛər', 'air'),
	vowel('ɑːr', 'ar'),
	vowel('ɑr', 'ar'),
	vowel('ær', 'arr'),
	vowel('ɔː', 'aw'),
	vowel('eɪ', 'ay'),
	vowel('e', ['e', 'eh']),
	vowel('ɛ', ['e', 'eh']),
	vowel('iː', 'ee'),
	vowel('i', 'ee'),
	vowel('ɪər', 'eer'),
	vowel('ɛr', 'err'),
	vowel('juː', 'ew'),
	vowel('ju', 'ew'),
	vowel('aɪ', ['eye', 'y']),
	vowel('ɪ', ['i', 'ih']),
	vowel('aɪər', 'ire'),
	vowel('ɪr', 'irr'),
	vowel('ɒ', 'o'),
	vowel('oʊ', 'oh'),
	vowel('ɔɪər', 'oir'),
	vowel('uː', 'oo'),
	vowel('u', 'oo'),
	vowel('ʊər', 'oor'),
	vowel('ɔːr', 'or'),
	vowel('ɔr', 'or'),
	vowel('ɒr', 'orr'),
	vowel('aʊər', 'our'),
	vowel('aʊ', 'ow'),
	vowel('ɔɪ', 'oy'),
	vowel('ʌ', ['u', 'uh']),
	vowel('ɜːr', 'ur'),
	vowel('ɜr', 'ur'),
	vowel('jʊər', 'ure'),
	vowel('ʌr', 'urr'),
	vowel('ʊ', 'uu'),
	vowel('ʊr', 'uurr'),
	vowel('ə', 'uh'),
	vowel('ər', 'er'),
	vowel('y', 'ue'),
	vowel('ø', 'eu'),
	vowel('œ', 'eu'),
	vowel('ɶ', 'a'),
	vowel('ɨ', 'i'),
	vowel('ʉ', 'u'),
	vowel('ɯ', 'u'),
	vowel('ɘ', 'uh'),
	vowel('ɵ', 'uh'),
	vowel('ɤ', 'uh'),
	vowel('ɜ', 'uh'),
	vowel('ɞ', 'uh'),
	vowel('ɐ', 'uh'),
	vowel('ɚ', 'er'),
	vowel('ɝ', 'ur'),
	vowel('ɔ', 'aw'),
	vowel('o', 'aw'),
	vowel('oː', 'aw'),
	vowel('a', 'ah'),
	vowel('ɑ̃', 'on'),
	vowel('ɛ̃', 'an'),
	vowel('ɔ̃', 'on'),
	vowel('œ̃', 'un')
];

const symbols = [...consonantSymbols, ...vowelSymbols];
const symbolByIpa = new Map(symbols.map(symbol => [symbol.ipa.normalize('NFD'), symbol]));

const STRESS_MARK = 'ˈ';
const SECONDARY_STRESS_MARK = 'ˌ';

const consonants = consonantSymbols.map(({ ipa }) => ipa);
const vowels = vowelSymbols.map(({ ipa }) => ipa);

const syllableSeparatorSymbols = [' ', '.'];
const acceptedSymbols = [...syllableSeparatorSymbols, '/', '[', ']'];

// Stripped pre-tokenization: parens/hyphen, length mark, and tie bars U+0361/U+035C (the bars must go so dʒ/tʃ become adjacent and match one chunk); other diacritics/modifiers are dropped in the tokenizer.
const ignoredSymbols = ['(', ')', 'ː', '\u0361', '\u035C', '-'];

const validChunks = [...consonants, ...vowels, STRESS_MARK, SECONDARY_STRESS_MARK, ...acceptedSymbols]
	.map(chunk => chunk.normalize('NFD'))
	.sort((a, b) => b.length - a.length);

export { symbolByIpa, STRESS_MARK, SECONDARY_STRESS_MARK, consonants, vowels, acceptedSymbols, ignoredSymbols, syllableSeparatorSymbols, validChunks };
export type { IpaSymbol, Category };
