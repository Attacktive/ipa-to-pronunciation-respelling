import { symbolByIpa } from './mappings';
import { parseIpa } from './parser';
import { findSyllableBoundaries } from './syllabifier';
import type { ParsedToken, PhonemeToken } from './parser';

const convertToken = (token: PhonemeToken) => {
	const symbol = symbolByIpa.get(token.ipa);
	if (symbol === undefined) {
		throw Error(`Token "${token.ipa}" has no mapping!`);
	}

	return symbol.canonicalRespelling;
};

/** Remove parentheses whose contents disappeared during IPA parsing, including nested empty groups. */
const removeEmptyOptionalGroups = (tokens: ParsedToken[]) => {
	const normalized: ParsedToken[] = [];

	for (const token of tokens) {
		const previous = normalized.at(-1);
		if (token.kind === 'optional' && token.boundary === 'end' && previous?.kind === 'optional' && previous.boundary === 'start') {
			normalized.pop();
			continue;
		}

		normalized.push(token);
	}

	return normalized;
};

const isSyllabicConsonant = (token: ParsedToken | undefined) => token?.kind === 'phoneme' && token.syllabic === true && symbolByIpa.get(token.ipa)?.category !== 'vowel';

const PRICE_CODA_SPELLINGS = new Map([
	['t', 'ight'],
	['d', 'ide'],
	['n', 'ine'],
	['m', 'ime'],
	['p', 'ipe'],
	['f', 'ife'],
	['v', 'ive'],
	['z', 'ize'],
	['s', 'ice'],
	['l', 'ile'],
	['k', 'ike'],
	['nd', 'ined'],
	['ld', 'iled']
]);

const PRICE_CODA_OVERRIDES = new Map([
	['w:t', 'hite'],
	['wh:t', 'ite'],
	['g:d', 'uide'],
	['f:d', 'ied'],
	['t:d', 'ied'],
	['d:d', 'ied'],
	['tr:d', 'ied'],
	['fr:d', 'ied'],
	['cr:d', 'ied'],
	['ch:ld', 'ild'],
	['m:ld', 'ild'],
	['w:ld', 'ild'],
	['st:ld', 'yled']
]);

const PRICE_OPEN_SPELLINGS = new Map([
	['h', 'igh'],
	['l', 'ie'],
	['r', 'ye'],
	['s', 'igh'],
	['t', 'ie'],
	['d', 'ie'],
	['f', 'ie'],
	['n', 'igh'],
	['w', 'ye'],
	['g', 'uy'],
	['p', 'ie'],
	['kw', 'ye'],
	['ch', 'ai']
]);

type SyllablePart = PhonemeToken | '(' | ')';

/** Finds rhotic schwa directly after the PRICE vowel or across one explicit period. */
const findPriceRhoticIndex = (tokens: ParsedToken[], priceIndex: number) => {
	let index = priceIndex + 1;
	const next = tokens[index];
	if (next?.kind === 'boundary' && next.separator === '.') {
		index++;
	}

	const rhotic = tokens[index];
	if (rhotic?.kind === 'phoneme' && rhotic.ipa === 'ɚ') {
		return index;
	}

	return undefined;
};

/** Treat the equivalent rhotic spellings aɪɚ and aɪ.ɚ as the existing aɪər chunk. */
const combinePriceRhotic = (tokens: ParsedToken[]) => {
	const combined: ParsedToken[] = [];

	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i];
		if (token.kind === 'phoneme' && token.ipa === 'aɪ') {
			const rhoticIndex = findPriceRhoticIndex(tokens, i);
			if (rhoticIndex !== undefined) {
				combined.push({ ...token, ipa: 'aɪər' });
				i = rhoticIndex;
				continue;
			}
		}

		combined.push(token);
	}

	return combined;
};

/** Treat safe IPA consonant aliases as their canonical spellings for coda matching. */
const normalizeCodaPhoneme = (part: PhonemeToken) => {
	const symbol = symbolByIpa.get(part.ipa);
	if (symbol?.support === 'safe-alias') {
		return symbol.canonicalRespelling;
	}

	return part.ipa;
};

const readCoda = (parts: SyllablePart[], start: number) => {
	let coda = '';

	for (let i = start; i < parts.length; i++) {
		const part = parts[i];
		if (typeof part === 'string') {
			return undefined;
		}

		coda += normalizeCodaPhoneme(part);
	}

	return coda;
};

/** Returns a full PRICE-vowel rime when all remaining phonemes form a supported coda. */
const renderPriceCoda = (onset: string, tail: SyllablePart[]) => {
	const coda = readCoda(tail, 0);
	if (coda === undefined) {
		return undefined;
	}

	const spelling = PRICE_CODA_SPELLINGS.get(coda);
	if (spelling === undefined) {
		return undefined;
	}

	return PRICE_CODA_OVERRIDES.get(`${onset}:${coda}`) ?? spelling;
};

interface PriceSpelling {
	text: string;
	consumesCoda: boolean;
}

/** Resolves the PRICE vowel without adding branches to the syllable renderer. */
const renderPriceVowel = (onset: string, tail: SyllablePart[]): PriceSpelling => {
	const codaSpelling = renderPriceCoda(onset, tail);
	if (codaSpelling !== undefined) {
		return { text: codaSpelling, consumesCoda: true };
	}

	if (onset.length > 0 && tail.length === 0) {
		return { text: PRICE_OPEN_SPELLINGS.get(onset) ?? 'y', consumesCoda: false };
	}

	return { text: 'eye', consumesCoda: false };
};

const renderPhoneme = (token: PhonemeToken) => {
	if (isSyllabicConsonant(token)) {
		return `uh${convertToken(token)}`;
	}

	return convertToken(token);
};

const renderMouthVowel = (parts: SyllablePart[], vowelIndex: number) => {
	switch (readCoda(parts, vowelIndex + 1)) {
		case '':
		case 's':
			return 'au';
		case 'n':
		case 'nd':
		case 't':
		case 'ts':
			return 'ou';
		default:
			return undefined;
	}
};

const renderSyllable = (parts: SyllablePart[], isStandaloneMouth: boolean) => {
	let rendered = '';

	for (let i = 0; i < parts.length; i++) {
		const part = parts[i];
		if (typeof part === 'string') {
			rendered += part;
			continue;
		}

		if (part.ipa === 'aɪ') {
			const spelling = renderPriceVowel(rendered, parts.slice(i + 1));
			rendered += spelling.text;
			if (spelling.consumesCoda) {
				break;
			}

			continue;
		}

		if (!isStandaloneMouth && part.ipa === 'aʊ') {
			rendered += renderMouthVowel(parts, i) ?? renderPhoneme(part);
			continue;
		}

		if (!isStandaloneMouth && part.ipa === 'aʊər') {
			rendered += 'auer';
			continue;
		}

		rendered += renderPhoneme(part);
	}

	return rendered;
};

const OPTIONAL_DELIMITERS = {
	start: '(',
	end: ')'
} as const;

const convert = (ipa: string) => {
	const tokens = combinePriceRhotic(removeEmptyOptionalGroups(parseIpa(ipa)));
	const firstPhoneme = tokens.find(token => token.kind === 'phoneme');
	const isStandaloneMouth = (firstPhoneme?.ipa === 'aʊ' || firstPhoneme?.ipa === 'aʊər')
		&& !tokens.some(token => token.kind === 'phoneme' && token !== firstPhoneme);
	const syllableBoundaries = findSyllableBoundaries(tokens);
	const result: string[] = [];
	let currentSyllable: SyllablePart[] = [];
	let pendingStress = false;

	const flushSyllable = () => {
		if (currentSyllable.length === 0) {
			return;
		}

		const syllableText = renderSyllable(currentSyllable, isStandaloneMouth);
		if (pendingStress) {
			result.push(syllableText.toUpperCase());
		} else {
			result.push(syllableText);
		}

		pendingStress = false;
		currentSyllable = [];
	};

	for (let i = 0; i < tokens.length; i++) {
		if (syllableBoundaries.has(i)) {
			flushSyllable();
		}

		const token = tokens[i];
		switch (token.kind) {
			case 'phoneme':
				currentSyllable.push(token);
				break;
			case 'optional':
				currentSyllable.push(OPTIONAL_DELIMITERS[token.boundary]);
				break;
			case 'stress':
				flushSyllable();
				pendingStress = token.level === 'primary';
				break;
			case 'boundary':
				flushSyllable();
				if (!isSyllabicConsonant(tokens[i + 1])) {
					result.push(' ');
				}

				break;
			case 'literal':
				flushSyllable();
				result.push(token.value);
				break;
		}
	}

	flushSyllable();

	return result.join('');
};

export { convert };
