import { convert } from './converter';

const testConversions = (inputs: ConversionInput[]) => {
	const results: ConversionResult[] = [];
	const errors: ConversionError[] = [];

	for (const input of inputs) {
		try {
			results.push({ ...input, respelling: convert(input.ipa) });
		} catch (error) {
			errors.push({ ...input, error: (error as Error).message });
		}
	}

	return { results, errors };
};

const testIpaNotations = (ipaNotations: string[]) => testConversions(ipaNotations.map(ipa => ({ ipa })));

interface ConversionInput {
	ipa: string;
	word?: string;
}

interface ConversionResult extends ConversionInput {
	respelling: string;
}

interface ConversionError extends ConversionInput {
	error: string;
}

export { testConversions, testIpaNotations };
export type { ConversionError };
