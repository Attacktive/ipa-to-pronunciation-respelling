import { symbolByIpa } from './mappings';
import { parseIpa } from './parser';
import { findSyllableBoundaries } from './syllabifier';
import type { PhonemeToken } from './parser';

const OPTIONAL_ALTERNATIVE_GROUP = /\(\(([^()]*\|[^()]*)\)\)/gu;

const convertToken = (token: PhonemeToken) => {
	const symbol = symbolByIpa.get(token.ipa);
	if (symbol === undefined) {
		throw Error(`Token "${token.ipa}" has no mapping!`);
	}

	const { respellings } = symbol;
	let result = respellings[0];
	if (respellings.length > 1) {
		result = `(${respellings.join('|')})`;
	}

	return result;
};

const normalizeOptionalGroups = (value: string) => value
	.replaceAll('()', '')
	.replace(OPTIONAL_ALTERNATIVE_GROUP, '($1)');

const convert = (ipa: string) => {
	const tokens = parseIpa(ipa);
	const syllableBoundaries = findSyllableBoundaries(tokens);
	const result: string[] = [];
	let currentSyllable: string[] = [];
	let pendingStress = false;

	const flushSyllable = () => {
		if (currentSyllable.length === 0) {
			return;
		}

		const syllableText = currentSyllable.join('');
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
		if (token.kind === 'phoneme') {
			currentSyllable.push(convertToken(token));
			continue;
		}

		if (token.kind === 'optional') {
			if (token.boundary === 'start') {
				currentSyllable.push('(');
			} else {
				currentSyllable.push(')');
			}

			continue;
		}

		if (token.kind === 'stress') {
			flushSyllable();
			pendingStress = token.level === 'primary';
			continue;
		}

		if (token.kind === 'boundary') {
			flushSyllable();
			result.push(' ');
			continue;
		}

		flushSyllable();
		result.push(token.value);
	}

	flushSyllable();

	return normalizeOptionalGroups(result.join(''));
};

export { convert };
