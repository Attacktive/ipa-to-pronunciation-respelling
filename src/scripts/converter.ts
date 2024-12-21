import { mappings, validChunks, SECONDARY_STRESS_MARK, STRESS_MARK, acceptedSymbols, sonorityRanks } from "./mappings";

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

export function convert(ipa: string) {
	const tokens = tokenize(ipa);
	const syllableBoundaries = findSyllableBoundaries(tokens);

	const result = [];
	let currentSyllable = [];
	let isStressed = false;

	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i];

		if (token === STRESS_MARK) {
			if (currentSyllable.length > 0) {
				const syllableText = currentSyllable.join("");
				const stressedSyllableText = isStressed? syllableText.toUpperCase() : syllableText;

				result.push(stressedSyllableText);
				currentSyllable = [];
			}

			isStressed = true;
			continue;
		}

		if (token === SECONDARY_STRESS_MARK) {
			continue;  // ignore secondary stress
		}

		if (token === " ") {
			if (currentSyllable.length > 0) {
				const syllableText = currentSyllable.join("");
				const stressedSyllableText = isStressed? syllableText.toUpperCase() : syllableText;

				result.push(stressedSyllableText);
				currentSyllable = [];
			}

			result.push(" ");
			isStressed = false;
			continue;
		}

		let converted;
		const mapped = mappings.get(token);
		if (Array.isArray(mapped)) {
			converted = mapped[0];
		} else if (typeof mapped === "string") {
			converted = mapped;
		} else if (acceptedSymbols.includes(token)) {
			converted = token;
		} else {
			throw Error(`Token "${token}" has no mapping!`);
		}

		currentSyllable.push(converted);

		if (syllableBoundaries.includes(i)) {
			const syllableText = currentSyllable.join("");
			const stressedSyllableText = isStressed? syllableText.toUpperCase() : syllableText;

			result.push(stressedSyllableText);
			currentSyllable = [];
		}
	}

	if (currentSyllable.length > 0) {
		const syllableText = currentSyllable.join("");
		const stressedSyllableText = isStressed? syllableText.toUpperCase() : syllableText;

		result.push(stressedSyllableText);
	}

	return result.join("");
}

export function tokenize(ipa: string) {
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
