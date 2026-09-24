import { ignoredSymbols, phonemeChunks, SECONDARY_STRESS_MARK, STRESS_MARK, vowels } from './mappings';

const LENGTH_MARK = 'ː';
const SYLLABIC_DIACRITICS = new Set(['\u030D', '\u0329']);
const NON_SYLLABIC_DIACRITICS = new Set(['\u032F']);
const DROPPABLE_DIACRITIC = /[\p{M}\p{Lm}]/u;
const normalizedVowels = [...new Set(vowels.map(vowel => vowel.normalize('NFD').replaceAll(LENGTH_MARK, '')))]
	.sort((a, b) => b.length - a.length);

const rColoredVowels = new Set(normalizedVowels.filter(vowel => vowel.endsWith('r')));

interface PhonemeToken {
	kind: 'phoneme';
	ipa: string;
	optional: boolean;
	long: boolean;
	syllabic?: boolean;
}

interface StressToken {
	kind: 'stress';
	level: 'primary' | 'secondary';
}

interface BoundaryToken {
	kind: 'boundary';
	separator: ' ' | '.';
}

interface LiteralToken {
	kind: 'literal';
	value: '/' | '[' | ']';
}

type ParsedToken = PhonemeToken | StressToken | BoundaryToken | LiteralToken;

interface ChunkMatch {
	ipa: string;
	nextIndex: number;
	long: boolean;
}

const unwrapOuterParentheses = (ipa: string) => {
	if (!ipa.startsWith('(') || !ipa.endsWith(')')) {
		return ipa;
	}

	let depth = 0;
	for (let i = 0; i < ipa.length; i++) {
		if (ipa.charAt(i) === '(') {
			depth++;
		} else if (ipa.charAt(i) === ')') {
			depth--;
		}

		if (depth === 0 && i < ipa.length - 1) {
			return ipa;
		}
	}

	if (depth === 0) {
		return ipa.substring(1, ipa.length - 1);
	}

	return ipa;
};

const matchCandidateAt = (ipa: string, index: number, candidate: string): ChunkMatch | undefined => {
	let sourceIndex = index;
	let long = false;

	for (let candidateIndex = 0; candidateIndex < candidate.length; candidateIndex++) {
		while (ipa.charAt(sourceIndex) === LENGTH_MARK) {
			long = true;
			sourceIndex++;
		}

		if (ipa.charAt(sourceIndex) !== candidate.charAt(candidateIndex)) {
			return undefined;
		}

		sourceIndex++;
	}

	while (ipa.charAt(sourceIndex) === LENGTH_MARK) {
		long = true;
		sourceIndex++;
	}

	return { ipa: candidate, nextIndex: sourceIndex, long };
};

const startsWithVowelAt = (ipa: string, index: number) => normalizedVowels.some(vowel => matchCandidateAt(ipa, index, vowel) !== undefined);

const matchPhonemeAt = (ipa: string, index: number): ChunkMatch | undefined => {
	for (const chunk of phonemeChunks) {
		const match = matchCandidateAt(ipa, index, chunk);
		if (match === undefined) {
			continue;
		}

		if (rColoredVowels.has(chunk) && startsWithVowelAt(ipa, match.nextIndex)) {
			continue;
		}

		return match;
	}

	return undefined;
};

const cleanIpa = (ipa: string) => {
	let result = unwrapOuterParentheses(ipa.normalize('NFD'));
	for (const ignoredSymbol of ignoredSymbols) {
		result = result.replaceAll(ignoredSymbol, '');
	}

	return result;
};

const setSyllabicity = (tokens: ParsedToken[], syllabic: boolean) => {
	const token = tokens.at(-1);
	if (token?.kind === 'phoneme') {
		token.syllabic = syllabic;
	}
};

const parseIpa = (ipa: string) => {
	const cleanedIpa = cleanIpa(ipa);
	const result: ParsedToken[] = [];
	let optionalDepth = 0;

	for (let i = 0; i < cleanedIpa.length;) {
		const character = cleanedIpa.charAt(i);

		if (character === '(') {
			optionalDepth++;
			i++;
			continue;
		}

		if (character === ')') {
			if (optionalDepth === 0) {
				throw Error(`${ipa} contains an unmatched closing parenthesis.`);
			}

			optionalDepth--;
			i++;
			continue;
		}

		if (character === STRESS_MARK || character === SECONDARY_STRESS_MARK) {
			let level: StressToken['level'] = 'secondary';
			if (character === STRESS_MARK) {
				level = 'primary';
			}

			result.push({ kind: 'stress', level });
			i++;
			continue;
		}

		if (character === ' ' || character === '.') {
			result.push({ kind: 'boundary', separator: character });
			i++;
			continue;
		}

		if (character === '/' || character === '[' || character === ']') {
			result.push({ kind: 'literal', value: character });
			i++;
			continue;
		}

		if (SYLLABIC_DIACRITICS.has(character)) {
			setSyllabicity(result, true);
			i++;
			continue;
		}

		if (NON_SYLLABIC_DIACRITICS.has(character)) {
			setSyllabicity(result, false);
			i++;
			continue;
		}

		const match = matchPhonemeAt(cleanedIpa, i);
		if (match !== undefined) {
			result.push({ kind: 'phoneme', ipa: match.ipa, optional: optionalDepth > 0, long: match.long });
			i = match.nextIndex;
			continue;
		}

		if (DROPPABLE_DIACRITIC.test(character)) {
			i++;
			continue;
		}

		throw Error(`${ipa} contains unsupported symbol(s) around: "${character}".`);
	}

	if (optionalDepth !== 0) {
		throw Error(`${ipa} contains an unclosed optional group.`);
	}

	return result;
};

export { parseIpa };
export type { ParsedToken, PhonemeToken };
