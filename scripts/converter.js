/**
 * @param { string } ipa
 * @return { string }
 */
function convert(ipa) {
	const tokens = tokenize(ipa);

	return tokens.map(token => {
		const converted = mappings.get(token);
		if (Array.isArray(converted)) {
			// TODO: express one-to-many mapping
			return converted[0];
		}

		return converted;
	})
	.join("");
}

/**
 * @param { string } ipa
 * @return { string[] }
 */
function tokenize(ipa) {
	const result = [];
	const validChunks = Array.from(mappings.keys());

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
			throw Error(`${ipa} contains an invalid or unsupported character!`);
		}
	}

	return result;
}
