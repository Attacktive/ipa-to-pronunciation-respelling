import { symbolByIpa } from './mappings';
import type { ParsedToken, PhonemeToken } from './parser';

const LEGAL_ONSET_CLUSTERS = new Set([
	'pl', 'bl', 'kl', 'gl', 'fl', 'sl',
	'pr', 'br', 'tr', 'dr', 'kr', 'gr', 'fr', 'θr', 'ʃr',
	'tw', 'dw', 'kw', 'gw', 'sw', 'θw', 'hw',
	'pj', 'bj', 'tj', 'dj', 'kj', 'gj', 'fj', 'vj', 'θj', 'sj', 'zj', 'hj', 'mj', 'nj', 'lj',
	'sp', 'st', 'sk', 'sm', 'sn',
	'spl', 'spr', 'str', 'skr', 'skw'
]);

const NON_ONSET_PHONEMES = new Set(['ŋ', 'ɴ', 'ŋk']);
const ONSET_EQUIVALENTS = new Map([
	['ɡ', 'g'],
	['ɹ', 'r'],
	['ɾ', 'r'],
	['ɽ', 'r'],
	['ʁ', 'r'],
	['ɫ', 'l']
]);

const isVowel = (token: PhonemeToken) => symbolByIpa.get(token.ipa)?.category === 'vowel';

const isNucleus = (token: PhonemeToken) => {
	if (token.syllabic !== undefined) {
		return token.syllabic;
	}

	return isVowel(token);
};

const isNonSyllabicVowel = (token: PhonemeToken) => isVowel(token) && token.syllabic === false;

const normalizeOnset = (tokens: PhonemeToken[]) => tokens.map(token => ONSET_EQUIVALENTS.get(token.ipa) ?? token.ipa).join('');

const canBeOnset = (tokens: PhonemeToken[]) => {
	if (tokens.length === 1) {
		return !NON_ONSET_PHONEMES.has(tokens[0].ipa) && !isNucleus(tokens[0]);
	}

	return LEGAL_ONSET_CLUSTERS.has(normalizeOnset(tokens));
};

const findBoundaryBefore = (tokens: ParsedToken[], consonantIndexes: number[], nextNucleusIndex: number) => {
	for (let onsetStart = 0; onsetStart < consonantIndexes.length; onsetStart++) {
		const onset = consonantIndexes
			.slice(onsetStart)
			.map(index => tokens[index])
			.filter((token): token is PhonemeToken => token.kind === 'phoneme');

		if (canBeOnset(onset)) {
			return consonantIndexes[onsetStart];
		}
	}

	return nextNucleusIndex;
};

const finishNucleus = (nuclei: number[][], currentNucleus: number[]) => {
	if (currentNucleus.length > 0) {
		nuclei.push(currentNucleus);
	}

	return [];
};

const findNuclei = (tokens: ParsedToken[], start: number, end: number) => {
	const nuclei: number[][] = [];
	let currentNucleus: number[] = [];

	for (let i = start; i < end; i++) {
		const token = tokens[i];
		if (token.kind !== 'phoneme') {
			continue;
		}

		if (isNucleus(token)) {
			currentNucleus = finishNucleus(nuclei, currentNucleus);
			currentNucleus = [i];
			continue;
		}

		if (isNonSyllabicVowel(token) && currentNucleus.length > 0) {
			currentNucleus.push(i);
			continue;
		}

		currentNucleus = finishNucleus(nuclei, currentNucleus);
	}

	finishNucleus(nuclei, currentNucleus);

	return nuclei;
};

const findConsonantIndexes = (tokens: ParsedToken[], previousNucleus: number[], nextNucleus: number[]) => {
	const result: number[] = [];

	for (let tokenIndex = previousNucleus[previousNucleus.length - 1] + 1; tokenIndex < nextNucleus[0]; tokenIndex++) {
		if (tokens[tokenIndex].kind === 'phoneme') {
			result.push(tokenIndex);
		}
	}

	return result;
};

const findBoundaryBetweenNuclei = (tokens: ParsedToken[], previousNucleus: number[], nextNucleus: number[]) => {
	const consonantIndexes = findConsonantIndexes(tokens, previousNucleus, nextNucleus);
	if (consonantIndexes.length === 0) {
		return nextNucleus[0];
	}

	return findBoundaryBefore(tokens, consonantIndexes, nextNucleus[0]);
};

const findRegionBoundaries = (tokens: ParsedToken[], start: number, end: number) => {
	const nuclei = findNuclei(tokens, start, end);
	const boundaries: number[] = [];

	for (let i = 1; i < nuclei.length; i++) {
		boundaries.push(findBoundaryBetweenNuclei(tokens, nuclei[i - 1], nuclei[i]));
	}

	return boundaries;
};

const addRegionBoundaries = (boundaries: Set<number>, tokens: ParsedToken[], start: number, end: number) => {
	for (const boundary of findRegionBoundaries(tokens, start, end)) {
		boundaries.add(boundary);
	}
};

const isRegionBreak = (token: ParsedToken) => token.kind === 'stress'
	|| token.kind === 'boundary'
	|| token.kind === 'literal';

const findSyllableBoundaries = (tokens: ParsedToken[]) => {
	const boundaries = new Set<number>();
	let regionStart = 0;

	for (let i = 0; i < tokens.length; i++) {
		if (!isRegionBreak(tokens[i])) {
			continue;
		}

		addRegionBoundaries(boundaries, tokens, regionStart, i);
		regionStart = i + 1;
	}

	addRegionBoundaries(boundaries, tokens, regionStart, tokens.length);

	return boundaries;
};

export { findSyllableBoundaries };
