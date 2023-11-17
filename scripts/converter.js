/**
 * @param { string } ipa
 * @return { string }
 */
function convert(ipa) {
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
		const mapped = mappings.get(token);
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

/**
 * @param { string } ipa
 * @return { string[] }
 */
function tokenize(ipa) {
	const result = [];
	const validChunks = [...mappings.keys(), STRESS_MARK, SECONDARY_STRESS_MARK];

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
