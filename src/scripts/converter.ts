import { symbolByIpa, validChunks, SECONDARY_STRESS_MARK, STRESS_MARK, acceptedSymbols, syllableSeparatorSymbols, ignoredSymbols, vowels } from './mappings';

const rColoredVowelChunks = new Set(vowels.filter(v => v.endsWith('r')));
const vowelChunksByLength = [...vowels].sort((a, b) => b.length - a.length);

const isSonorityValley = (previous: number | undefined, current: number | undefined, next: number | undefined): boolean => current !== undefined
	&& previous !== undefined
	&& next !== undefined
	&& current <= previous
	&& current <= next;

const findSyllableBoundaries = (tokens: string[]): number[] => {
	const sonorities = tokens.map(token => symbolByIpa.get(token)?.sonority);
	const boundaries: number[] = [];

	for (let i = 1; i < tokens.length - 1; i++) {
		if (isSonorityValley(sonorities[i - 1], sonorities[i], sonorities[i + 1])) {
			boundaries.push(i);
		}
	}

	return boundaries;
};

const convertToken = (token: string): string => {
	const symbol = symbolByIpa.get(token);
	if (symbol) {
		const { respellings } = symbol;

		return respellings.length > 1? `(${respellings.join('|')})`: respellings[0];
	}

	if (acceptedSymbols.includes(token)) {
		return token;
	}

	throw Error(`Token "${token}" has no mapping!`);
};

const tokenize = (ipa: string) => {
	const result = [];

	for (let i = 0; i < ipa.length;) {
		let foundMatch = false;
		for (const chunk of validChunks) {
			if (ipa.startsWith(chunk, i)) {
				const rest = ipa.substring(i + chunk.length);
				if (rColoredVowelChunks.has(chunk) && vowelChunksByLength.some(vowel => rest.startsWith(vowel))) {
					continue;
				}

				result.push(chunk);
				i += chunk.length;
				foundMatch = true;
				break;
			}
		}

		if (!foundMatch) {
			throw Error(`${ipa} contains unsupported symbol(s) around: "${ipa.charAt(i)}".`);
		}
	}

	return result;
};

export const convert = (ipa: string) => {
	// Remove ignored symbols before tokenization
	let cleanedIpa = ipa;
	for (const ignoredSymbol of ignoredSymbols) {
		cleanedIpa = cleanedIpa.replaceAll(ignoredSymbol, '');
	}

	const tokens = tokenize(cleanedIpa);
	const syllableBoundaries = findSyllableBoundaries(tokens);
	const result: string[] = [];

	let currentSyllable: string[] = [];
	let pendingStress = false;

	const flushSyllable = () => {
		if (currentSyllable.length === 0) {
			return;
		}

		const syllableText = currentSyllable.join('');
		result.push(pendingStress? syllableText.toUpperCase(): syllableText);
		pendingStress = false;
		currentSyllable = [];
	};

	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i];
		if (token === STRESS_MARK) {
			flushSyllable();
			pendingStress = true;
			continue;
		}

		if (token === SECONDARY_STRESS_MARK) {
			// A syllable break without uppercasing; the respelling key leaves secondary stress unmarked.
			flushSyllable();
			continue;
		}

		if (syllableSeparatorSymbols.includes(token)) {
			flushSyllable();
			result.push(' ');
			continue;
		}

		currentSyllable.push(convertToken(token));

		if (syllableBoundaries.includes(i)) {
			flushSyllable();
		}
	}

	flushSyllable();

	return result.join('');
};
