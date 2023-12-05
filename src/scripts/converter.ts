import { mappings, validChunks, SECONDARY_STRESS_MARK, STRESS_MARK } from "./mappings";

export function convert(ipa: string) {
	const tokens = tokenize(ipa);

	let stressed = false;
	return tokens.map(token => {
		if (token === STRESS_MARK) {
			stressed = true;
			return null;
		}

		if (token === SECONDARY_STRESS_MARK) {
			return null;
		}

		let converted;
		const mapped = mappings.get(token)!;
		if (Array.isArray(mapped)) {
			// TODO: express one-to-many mapping
			converted = mapped[0];
		} else {
			converted = mapped;
		}

		if (stressed) {
			converted = converted.toUpperCase();
		}

		// TODO: make stressed back to false only when the entire syllable ends.
		stressed = false;

		return converted;
	})
	.filter(chunk => chunk !== null)
	.join("");
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
