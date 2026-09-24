import { ignoredSymbols, phonemeChunks, SECONDARY_STRESS_MARK, STRESS_MARK, vowels } from './mappings';

const LENGTH_MARK = 'ː';
const SYLLABICITY_BY_DIACRITIC = new Map<string, boolean>([
	['\u030D', true],
	['\u0329', true],
	['\u032F', false]
]);
const STRESS_LEVEL_BY_MARK = new Map<string, StressToken['level']>([
	[STRESS_MARK, 'primary'],
	[SECONDARY_STRESS_MARK, 'secondary']
]);
const SYLLABLE_SEPARATORS = new Set<BoundaryToken['separator']>([' ', '.']);
const LITERALS = new Set<LiteralToken['value']>(['/', '[', ']']);
const PARENTHESIS_DEPTH_CHANGE = new Map([
	['(', 1],
	[')', -1]
]);
const DROPPABLE_DIACRITIC = /[\p{M}\p{Lm}]/u;
const normalizedVowels = [...new Set(vowels.map(vowel => vowel.normalize('NFD').replaceAll(LENGTH_MARK, '')))]
	.sort((a, b) => b.length - a.length);
const rColoredVowels = new Set(normalizedVowels.filter(vowel => vowel.endsWith('r')));

const closesOuterParenthesisEarly = (ipa: string) => {
	let depth = 0;

	for (let i = 0; i < ipa.length - 1; i++) {
		depth += PARENTHESIS_DEPTH_CHANGE.get(ipa.charAt(i)) ?? 0;
		if (depth === 0) {
			return true;
		}
	}

	return false;
};

const unwrapOuterParentheses = (ipa: string) => {
	if (!ipa.startsWith('(') || !ipa.endsWith(')') || closesOuterParenthesisEarly(ipa)) {
		return ipa;
	}

	return ipa.substring(1, ipa.length - 1);
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

const consumeParenthesis: TokenConsumer = context => {
	const character = context.cleanedIpa.charAt(context.index);
	const depthChange = PARENTHESIS_DEPTH_CHANGE.get(character);
	if (depthChange === undefined) {
		return false;
	}

	if (depthChange < 0 && context.optionalDepth === 0) {
		throw Error(`${context.originalIpa} contains an unmatched closing parenthesis.`);
	}

	context.optionalDepth += depthChange;
	context.index++;

	return true;
};

const consumeStress: TokenConsumer = context => {
	const level = STRESS_LEVEL_BY_MARK.get(context.cleanedIpa.charAt(context.index));
	if (level === undefined) {
		return false;
	}

	context.tokens.push({ kind: 'stress', level });
	context.index++;

	return true;
};

const consumeBoundary: TokenConsumer = context => {
	const character = context.cleanedIpa.charAt(context.index) as BoundaryToken['separator'];
	if (!SYLLABLE_SEPARATORS.has(character)) {
		return false;
	}

	context.tokens.push({ kind: 'boundary', separator: character });
	context.index++;

	return true;
};

const consumeLiteral: TokenConsumer = context => {
	const character = context.cleanedIpa.charAt(context.index) as LiteralToken['value'];
	if (!LITERALS.has(character)) {
		return false;
	}

	context.tokens.push({ kind: 'literal', value: character });
	context.index++;

	return true;
};

const consumeSyllabicity: TokenConsumer = context => {
	const syllabic = SYLLABICITY_BY_DIACRITIC.get(context.cleanedIpa.charAt(context.index));
	if (syllabic === undefined) {
		return false;
	}

	const token = context.tokens.at(-1);
	if (token?.kind === 'phoneme') {
		token.syllabic = syllabic;
	}

	context.index++;

	return true;
};

const consumePhoneme: TokenConsumer = context => {
	const match = matchPhonemeAt(context.cleanedIpa, context.index);
	if (match === undefined) {
		return false;
	}

	context.tokens.push({ kind: 'phoneme', ipa: match.ipa, optional: context.optionalDepth > 0, long: match.long });
	context.index = match.nextIndex;

	return true;
};

const consumeDroppableDiacritic: TokenConsumer = context => {
	if (!DROPPABLE_DIACRITIC.test(context.cleanedIpa.charAt(context.index))) {
		return false;
	}

	context.index++;

	return true;
};

const TOKEN_CONSUMERS: TokenConsumer[] = [
	consumeParenthesis,
	consumeStress,
	consumeBoundary,
	consumeLiteral,
	consumeSyllabicity,
	consumePhoneme,
	consumeDroppableDiacritic
];

const parseIpa = (ipa: string) => {
	const context: ParserContext = {
		originalIpa: ipa,
		cleanedIpa: cleanIpa(ipa),
		tokens: [],
		index: 0,
		optionalDepth: 0
	};

	while (context.index < context.cleanedIpa.length) {
		const consumed = TOKEN_CONSUMERS.some(consumer => consumer(context));
		if (!consumed) {
			throw Error(`${ipa} contains unsupported symbol(s) around: "${context.cleanedIpa.charAt(context.index)}".`);
		}
	}

	if (context.optionalDepth !== 0) {
		throw Error(`${ipa} contains an unclosed optional group.`);
	}

	return context.tokens;
};

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

interface ParserContext {
	originalIpa: string;
	cleanedIpa: string;
	tokens: ParsedToken[];
	index: number;
	optionalDepth: number;
}

type TokenConsumer = (context: ParserContext) => boolean;

export { parseIpa };
export type { ParsedToken, PhonemeToken };
