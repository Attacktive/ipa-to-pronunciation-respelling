type Category = 'vowel' | 'glide' | 'liquid' | 'nasal' | 'fricative' | 'affricate' | 'stop';

/** Describes why an IPA symbol is safe to accept in the English-facing respelling scheme. */
type Support = 'english' | 'safe-alias' | 'reference-foreign';

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
	canonicalRespelling: string;
	alternativeRespellings: string[];
	category: Category;
	sonority: number;
	support: Support;
}

const defineSymbol = (category: Category) =>
	(
		ipa: string,
		canonicalRespelling: string,
		alternativeRespellings: string[] = [],
		support: Support = 'english'
	): IpaSymbol => ({
		ipa,
		canonicalRespelling,
		alternativeRespellings,
		category,
		sonority: CATEGORY_SONORITY[category],
		support
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
	affricate('tʃ', 'ch', ['tch']),
	stop('d', 'd'),
	fricative('ð', 'dh'),
	fricative('f', 'f'),
	stop('ɡ', 'g', ['gh']),
	fricative('h', 'h'),
	fricative('ɦ', 'h', [], 'safe-alias'),
	affricate('dʒ', 'j'),
	stop('k', 'k'),
	fricative('x', 'kh', [], 'reference-foreign'),
	liquid('l', 'l'),
	liquid('ɫ', 'l', [], 'safe-alias'),
	nasal('m', 'm'),
	nasal('ɱ', 'm', [], 'safe-alias'),
	nasal('n', 'n'),
	nasal('ŋ', 'ng'),
	// Nasal+stop clusters take the stop category since they pattern as codas.
	stop('ŋk', 'nk'),
	stop('p', 'p'),
	liquid('r', 'r'),
	liquid('ɹ', 'r'),
	fricative('s', 's', ['ss']),
	fricative('ʃ', 'sh'),
	stop('t', 't'),
	fricative('θ', 'th'),
	fricative('v', 'v'),
	fricative('ʍ', 'wh'),
	glide('w', 'w'),
	glide('hw', 'wh', [], 'safe-alias'),
	glide('j', 'y'),
	fricative('z', 'z'),
	fricative('ʒ', 'zh'),
	affricate('ʣ', 'dz', [], 'safe-alias'),
	affricate('ʤ', 'j', [], 'safe-alias'),
	affricate('ʦ', 'ts', [], 'safe-alias'),
	affricate('ʧ', 'ch', [], 'safe-alias')
];

// Length-marked entries populate the IPA buttons while the parser retains length as token metadata.
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
	vowel('e', 'eh', ['e']),
	vowel('ɛ', 'eh', ['e']),
	vowel('iː', 'ee'),
	vowel('i', 'ee'),
	vowel('ɪər', 'eer'),
	vowel('ɛr', 'err'),
	vowel('juː', 'ew'),
	vowel('ju', 'ew'),
	vowel('aɪ', 'eye', ['y']),
	vowel('ɪ', 'ih', ['i']),
	vowel('aɪər', 'ire'),
	vowel('ɪr', 'irr'),
	vowel('ɒ', 'o'),
	vowel('oʊ', 'oh'),
	vowel('əʊ', 'oh'),
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
	vowel('ʌ', 'uh', ['u']),
	vowel('ɜːr', 'ur'),
	vowel('ɜr', 'ur'),
	vowel('jʊər', 'ure'),
	vowel('ʌr', 'urr'),
	vowel('ʊ', 'uu'),
	vowel('ʊr', 'uurr'),
	vowel('ə', 'uh'),
	vowel('ər', 'er'),
	vowel('y', 'ue', [], 'reference-foreign'),
	vowel('œ', 'eu', [], 'reference-foreign'),
	vowel('ɜ', 'uh'),
	vowel('ɐ', 'uh'),
	vowel('ɚ', 'er'),
	vowel('ɝ', 'ur'),
	vowel('ɔ', 'aw'),
	vowel('o', 'aw'),
	vowel('oː', 'aw'),
	vowel('a', 'ah', [], 'reference-foreign'),
	vowel('ɑ̃', 'on', [], 'reference-foreign'),
	vowel('ɛ̃', 'an', [], 'reference-foreign'),
	vowel('ɔ̃', 'on', [], 'reference-foreign'),
	vowel('œ̃', 'un', [], 'reference-foreign')
];

const symbols = [...consonantSymbols, ...vowelSymbols];
const symbolByIpa = new Map(symbols.map(symbol => [symbol.ipa.normalize('NFD'), symbol]));

const STRESS_MARK = 'ˈ';
const SECONDARY_STRESS_MARK = 'ˌ';

const consonants = consonantSymbols.map(({ ipa }) => ipa);
const vowels = vowelSymbols.map(({ ipa }) => ipa);
const phonemeChunks = [...new Set([...consonants, ...vowels].map(chunk => chunk.normalize('NFD').replaceAll('ː', '')))]
	.sort((a, b) => b.length - a.length);

// Stripped pre-tokenization: tie bars become adjacent affricates and hyphens remain formatting-only.
const ignoredSymbols = ['\u0361', '\u035C', '-'];

export { symbolByIpa, STRESS_MARK, SECONDARY_STRESS_MARK, consonants, vowels, phonemeChunks, ignoredSymbols };
export type { IpaSymbol, Category, Support };
