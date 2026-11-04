import { convert } from './converter';
import { UnsupportedIpaSymbolError } from './parser';

const testConversions = (inputs: ConversionInput[]) => {
	const results: ConversionResult[] = [];
	const errors: ConversionError[] = [];

	for (const input of inputs) {
		try {
			results.push({ ...input, respelling: convert(input.ipa) });
		} catch (error) {
			errors.push({ ...input, error: error instanceof Error ? error.message : String(error), kind: error instanceof UnsupportedIpaSymbolError ? 'unsupported' : 'unexpected' });
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
	kind: 'unsupported' | 'unexpected';
}

export { testConversions, testIpaNotations };
export type { ConversionError };
