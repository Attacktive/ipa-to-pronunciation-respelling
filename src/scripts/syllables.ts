import { IndexedCharacter, Syllable } from "./types";
import { onsetPatterns, vowels } from "./mappings";

export function syllabify(ipa: string) {
	const MAXIMUM_LENGTH_OF_ONSET = 3;
	const MAXIMUM_LENGTH_OF_CODA = 4;

	const indexedCharacters = transformToIndexedCharacters(ipa);

	const syllables: Syllable[] = [];

	const allNucleus = extractNucleus(ipa);
	for (let i = 0; i < allNucleus.length; i++) {
		const nucleus = allNucleus[i];
		const onset: IndexedCharacter[] = [];
		const coda: IndexedCharacter[] = [];
		if (syllables.length > 0) {
			const lastSyllable = syllables.pop() as Syllable;

			const onsetCandidate: IndexedCharacter[] = [];
			for (let j = 1; j <= MAXIMUM_LENGTH_OF_ONSET; j++) {
				const index = nucleus.index - j;
				if (index < 0) {
					break;
				}

				const indexedCharacter = indexedCharacters[index];
				if (lastSyllable.coda.some(codeCharacter => codeCharacter.index === index)) {
					lastSyllable.coda.pop();
				}

				onsetCandidate.unshift(indexedCharacter);
				const chunk = onsetCandidate.map(possibleOnset => possibleOnset.character).join("");
				if (onsetPatterns.includes(chunk)) {
					onsetCandidate.forEach(onsetCharacter => onset.push(onsetCharacter));
					break;
				}
			}

			syllables.push(lastSyllable);
		}

		if (nucleus.index < ipa.length - 1) {
			for (let j = 1; j < MAXIMUM_LENGTH_OF_CODA; j++) {
				const index = nucleus.index + j;
				if (index >= ipa.length) {
					break;
				}

				coda.push(indexedCharacters[index]);
			}
		}

		syllables.push({ onset, nucleus, coda });
	}

	console.debug("syllables", syllables);

	return syllables;
}

function transformToIndexedCharacters(input: string): IndexedCharacter[] {
	return [...input].map((character, index) => {
		return { character, index };
	});
}

function extractNucleus(ipa: string) {
	const nucleus: IndexedCharacter[][] = [];
	for (let index = 0; index < ipa.length; index++) {
		const character = ipa.charAt(index);
		if (vowels.includes(character)) {
			nucleus.push([{ character, index }]);
		} else {
			const vowelCharacters = vowels.filter(vowel => vowel.length > 1)
				.map(vowel => ipa.substring(index, vowel.length))
				.filter(chunk => vowels.includes(chunk));

			if (vowelCharacters) {
				const nuclei: IndexedCharacter[] = [];
				for (let i = 0; i < vowelCharacters.length; i++) {
					const vowelCharacter = vowelCharacters[i];
					nuclei.push({ character: vowelCharacter, index: index + i });
				}

				nucleus.push(nuclei);
			}
		}
	}

	return nucleus;
}
