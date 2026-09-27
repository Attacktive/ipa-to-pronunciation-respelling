import { describe, expect, it } from 'vitest';
import { convert } from './converter';

interface ConformanceCase {
	family: string;
	label: string;
	ipa: string;
	respelling: string;
}

interface UnsupportedCase {
	family: string;
	label: string;
	ipa: string;
}

/** Representative canonical outputs that define the public pronunciation-respelling contract. */
const CONFORMANCE_CASES: ConformanceCase[] = [
	{ family: 'short vowels', label: 'cat vowel', ipa: 'æ', respelling: 'a' },
	{ family: 'short vowels', label: 'kit vowel', ipa: 'ɪ', respelling: 'ih' },
	{ family: 'long vowels', label: 'fleece vowel', ipa: 'iː', respelling: 'ee' },
	{ family: 'long vowels', label: 'goose vowel', ipa: 'uː', respelling: 'oo' },
	{ family: 'diphthongs', label: 'face vowel', ipa: 'eɪ', respelling: 'ay' },
	{ family: 'diphthongs', label: 'price vowel', ipa: 'aɪ', respelling: 'eye' },
	{ family: 'diphthongs', label: 'mouth vowel', ipa: 'aʊ', respelling: 'ow' },
	{ family: 'diphthongs', label: 'choice vowel', ipa: 'ɔɪ', respelling: 'oy' },
	{ family: 'diphthongs', label: 'British goat vowel', ipa: 'əʊ', respelling: 'oh' },
	{ family: 'consonants', label: 'voiceless wh', ipa: '/ʍɛn/', respelling: '/whehn/' },
	{ family: 'affricates', label: 'judge', ipa: '/d͡ʒʌd͡ʒ/', respelling: '/juhj/' },
	{ family: 'affricates', label: 'choose', ipa: '/t͡ʃuːz/', respelling: '/chooz/' },
	{ family: 'rhotic vowels', label: 'ordinary vowel plus r', ipa: '/kɑr/', respelling: '/kahr/' },
	{ family: 'rhotic vowels', label: 'open-o plus r', ipa: '/stɔr/', respelling: '/stawr/' },
	{ family: 'rhotic vowels', label: 'fused cure-like vowel', ipa: '/pʊər/', respelling: '/poor/' },
	{ family: 'stress', label: 'primary stress uppercases the syllable', ipa: 'ˈstrɪkt', respelling: 'STRIHKT' },
	{ family: 'stress', label: 'secondary stress stops primary stress propagation', ipa: 'ˈæbˌstrækt', respelling: 'ABstrakt' },
	{ family: 'multisyllabic', label: 'explicit syllable boundaries become spaces', ipa: 'kæt.ər.pɪl.ər', respelling: 'kat er pihl er' },
	{ family: 'optional segments', label: 'optional glide stays parenthesized', ipa: '/səˈl(j)uːʃən/', respelling: '/suhL(Y)OOshuhn/' },
	{ family: 'syllabicity', label: 'syllabic consonant remains a nucleus', ipa: '/ˈɹiːd͡ʒn̩/', respelling: '/REEjn/' },
	{ family: 'syllabicity', label: 'non-syllabic diphthong component stays in the nucleus', ipa: '/ˈaʊ̯tɪŋ/', respelling: '/OWtihng/' },
	{ family: 'nasal vowels', label: 'open back nasal vowel', ipa: 'ɑ̃', respelling: 'on' },
	{ family: 'nasal vowels', label: 'open-mid front nasal vowel', ipa: 'ɛ̃', respelling: 'an' },
	{ family: 'ignored detail', label: 'aspiration is intentionally ignored', ipa: 'tʰ', respelling: 't' },
	{ family: 'ignored detail', label: 'half-length is intentionally ignored', ipa: 'ɛˑ', respelling: 'eh' }
];

/** Meaningful distinctions that the canonical scheme intentionally refuses to approximate. */
const UNSUPPORTED_CASES: UnsupportedCase[] = [
	{ family: 'unsupported detail', label: 'generic nasalization', ipa: 'ẽ' },
	{ family: 'unsupported detail', label: 'voicelessness', ipa: 'n̥' },
	{ family: 'unsupported detail', label: 'labialization', ipa: 'tʷ' },
	{ family: 'unsupported phonemes', label: 'glottal stop', ipa: 'ʔ' },
	{ family: 'unsupported phonemes', label: 'uvular stop', ipa: 'q' }
];

describe(
	'canonical respelling scheme conformance',
	() => {
		it.each(CONFORMANCE_CASES)(
			'$family: $label',
			({ ipa, respelling }) => {
				expect(convert(ipa))
					.toBe(respelling);
			}
		);

		it.each(UNSUPPORTED_CASES)(
			'$family: $label',
			({ ipa }) => {
				expect(() => convert(ipa))
					.toThrow();
			}
		);
	}
);
