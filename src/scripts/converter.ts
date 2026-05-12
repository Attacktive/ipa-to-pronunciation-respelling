import { mappings, validChunks, SECONDARY_STRESS_MARK, STRESS_MARK, acceptedSymbols, sonorityRanks, syllableSeparatorSymbols, ignoredSymbols, vowels } from './mappings';

const rColoredVowelChunks = new Set(vowels.filter(v => v.endsWith('r')));
const vowelChunksByLength = [...vowels].sort((a, b) => b.length - a.length);

function findSyllableBoundaries(tokens: string[]): number[] {
	if (tokens.length < 3) {
		return [];
	}

	const boundaries: number[] = [];

	let previousSonority = sonorityRanks.get(tokens[0]);

	for (let i = 1; i < tokens.length - 1; i++) {
		const currentSonority = sonorityRanks.get(tokens[i]);
		const nextSonority = sonorityRanks.get(tokens[i + 1]);

		const isSonorityValley = currentSonority !== undefined
			&& previousSonority !== undefined
			&& nextSonority !== undefined
			&& currentSonority <= previousSonority
			&& currentSonority <= nextSonority;

		if (isSonorityValley) {
			boundaries.push(i);
		}

		previousSonority = currentSonority;
	}

	return boundaries;
}

function convertToken(token: string): string {
	const mapped = mappings.get(token);
	if (Array.isArray(mapped)) {
		return `(${mapped.join('|')})`;
	} else if (typeof mapped === 'string') {
		return mapped;
	}

	if (acceptedSymbols.includes(token)) {
		return token;
	}

	throw Error(`Token "${token}" has no mapping!`);
}

function handleStressedSyllable(syllable: string[], isStressed: boolean): string {
	if (syllable.length === 0) {
		return '';
	}

	const syllableText = syllable.join('');
	if (isStressed) {
		return syllableText.toUpperCase();
	}

	return syllableText;
}

function tokenize(ipa: string) {
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
}

export function convert(ipa: string) {
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

	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i];
		if (token === STRESS_MARK) {
			if (currentSyllable.length > 0) {
				result.push(handleStressedSyllable(currentSyllable, pendingStress));
				currentSyllable = [];
			}

			pendingStress = true;
			continue;
		}

		if (token === SECONDARY_STRESS_MARK) {
			continue;
		}

		if (syllableSeparatorSymbols.includes(token)) {
			if (currentSyllable.length > 0) {
				const syllableText = handleStressedSyllable(currentSyllable, pendingStress);
				result.push(syllableText);
				pendingStress = false;
				currentSyllable = [];
			}

			result.push(' ');
			continue;
		}

		currentSyllable.push(convertToken(token));

		if (syllableBoundaries.includes(i)) {
			const syllableText = handleStressedSyllable(currentSyllable, pendingStress);
			result.push(syllableText);
			pendingStress = false;
			currentSyllable = [];
		}
	}

	if (currentSyllable.length > 0) {
		const syllableText = handleStressedSyllable(currentSyllable, pendingStress);
		result.push(syllableText);
	}

	return result.join('');
}
