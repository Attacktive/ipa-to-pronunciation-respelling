import { mappings, validChunks, SECONDARY_STRESS_MARK, STRESS_MARK, acceptedSymbols, sonorityRanks } from "./mappings";

interface SyllableState {
	currentSyllable: string[];
	isStressed: boolean;
}

function getSonority(token: string): number {
	return sonorityRanks.get(token) ?? 0;
}

function findSyllableBoundaries(tokens: string[]): number[] {
	const boundaries: number[] = [];
	let prevSonority = getSonority(tokens[0]);

	for (let i = 1; i < tokens.length - 1; i++) {
		const currSonority = getSonority(tokens[i]);
		const nextSonority = getSonority(tokens[i + 1]);

		if (currSonority <= prevSonority && currSonority <= nextSonority) {
			boundaries.push(i);
		}

		prevSonority = currSonority;
	}

	return boundaries;
}

function convertToken(token: string): string {
	const mapped = mappings.get(token);
	if (Array.isArray(mapped)) {
		return mapped[0];
	} else if (typeof mapped === "string") {
		return mapped;
	}

	if (acceptedSymbols.includes(token)) {
		return token;
	}

	throw Error(`Token "${token}" has no mapping!`);
}

function handleStressedSyllable(syllable: string[], isStressed: boolean): string {
	if (syllable.length === 0) {
		return "";
	}

	const syllableText = syllable.join("");
	return isStressed? syllableText.toUpperCase() : syllableText;
}

function processToken(token: string, currentSyllable: string[], isStressed: boolean, result: string[]): SyllableState {
	if (token === STRESS_MARK) {
		const syllableText = handleStressedSyllable(currentSyllable, isStressed);
		if (syllableText) {
			result.push(syllableText);
		}

		return { currentSyllable: [], isStressed: true };
	}

	if (token === SECONDARY_STRESS_MARK) {
		return { currentSyllable, isStressed };
	}

	if (token === " ") {
		const syllableText = handleStressedSyllable(currentSyllable, isStressed);
		if (syllableText) {
			result.push(syllableText);
		}

		result.push(" ");
		return { currentSyllable: [], isStressed: false };
	}

	return {
		currentSyllable: [...currentSyllable, convertToken(token)],
		isStressed
	};
}

function tokenize(ipa: string) {
	const result = [];

	for (let i = 0; i < ipa.length;) {
		let foundMatch = false;
		for (const chunk of validChunks) {
			if (ipa.startsWith(chunk, i)) {
				result.push(chunk);
				i += chunk.length;
				foundMatch = true;
			}
		}

		if (!foundMatch) {
			throw Error(`${ipa} contains unsupported symbol(s) around: "${ipa.charAt(i)}".`);
		}
	}

	return result;
}

export function convert(ipa: string) {
	const tokens = tokenize(ipa);
	const syllableBoundaries = findSyllableBoundaries(tokens);
	const result: string[] = [];

	let state: SyllableState = {
		currentSyllable: [],
		isStressed: false
	};

	for (let i = 0; i < tokens.length; i++) {
		state = processToken(tokens[i], state.currentSyllable, state.isStressed, result);

		if (syllableBoundaries.includes(i)) {
			const syllableText = handleStressedSyllable(state.currentSyllable, state.isStressed);
			if (syllableText) {
				result.push(syllableText);
			}
			state.currentSyllable = [];
		}
	}

	const finalSyllable = handleStressedSyllable(state.currentSyllable, state.isStressed);
	if (finalSyllable) {
		result.push(finalSyllable);
	}

	return result.join("");
}
