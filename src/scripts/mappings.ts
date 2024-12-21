const consonantMappings: Map<string, string | string[]> = new Map();
consonantMappings.set("b", "b");
consonantMappings.set("tʃ", "ch");
consonantMappings.set("d", "d");
consonantMappings.set("ð", "dh");
consonantMappings.set("f", "f");
consonantMappings.set("ɡ", ["g", "gh"]);
consonantMappings.set("h", "h");
consonantMappings.set("ɦ", "h");
consonantMappings.set("dʒ", "j");
consonantMappings.set("k", "k");
consonantMappings.set("x", "kh");
consonantMappings.set("l", "l");
consonantMappings.set("ʎ", "ly");
consonantMappings.set("m", "m");
consonantMappings.set("ɱ", "m");
consonantMappings.set("n", "n");
consonantMappings.set("ɳ", "n");
consonantMappings.set("ŋ", "ng");
consonantMappings.set("ɴ", "ng");
consonantMappings.set("ŋk", "nk");
consonantMappings.set("p", "p");
consonantMappings.set("r", "r");
consonantMappings.set("ɹ", "r");
consonantMappings.set("ɾ", "r");
consonantMappings.set("ɽ", "r");
consonantMappings.set("s", ["s", "ss"]);
consonantMappings.set("ʃ", "sh");
consonantMappings.set("t", "t");
consonantMappings.set("ʈ", "t");
consonantMappings.set("tʃ", "tch");
consonantMappings.set("θ", "th");
consonantMappings.set("v", "v");
consonantMappings.set("w", "w");
consonantMappings.set("ɥ", "w");
consonantMappings.set("ɰ", "w");
consonantMappings.set("hw", "wh");
consonantMappings.set("j", "y");
consonantMappings.set("ʝ", "y");
consonantMappings.set("z", "z");
consonantMappings.set("ʒ", "zh");
consonantMappings.set("ç", "ch");
consonantMappings.set("ʣ", "dz");
consonantMappings.set("ʤ", "j");
consonantMappings.set("ʦ", "ts");
consonantMappings.set("ʧ", "ch");
consonantMappings.set("ɢ", "g");
consonantMappings.set("ʔ", "");
consonantMappings.set("c", "k");
consonantMappings.set("ɟ", "g");
consonantMappings.set("q", "k");
consonantMappings.set("χ", "kh");
consonantMappings.set("ʁ", "r");
consonantMappings.set("ħ", "h");
consonantMappings.set("ʕ", "");

const vowelMappings: Map<string, string | string[]> = new Map();
vowelMappings.set("æ", "a");
vowelMappings.set("ɑ", "ah");
vowelMappings.set("ɑː", "ah");
vowelMappings.set("ɛər", "air");
vowelMappings.set("ɑːr", "ar");
vowelMappings.set("ær", "arr");
vowelMappings.set("ɔː", "aw");
vowelMappings.set("eɪ", "ay");
vowelMappings.set("ɛ", ["e", "eh"]);
vowelMappings.set("iː", "ee");
vowelMappings.set("i", "ee");
vowelMappings.set("ɪər", "eer");
vowelMappings.set("ɛr", "err");
vowelMappings.set("juː", "ew");
vowelMappings.set("aɪ", ["eye", "y"]);
vowelMappings.set("ɪ", ["i", "ih"]);
vowelMappings.set("aɪər", "ire");
vowelMappings.set("ɪr", "irr");
vowelMappings.set("ɒ", "o");
vowelMappings.set("oʊ", "oh");
vowelMappings.set("ɔɪər", "oir");
vowelMappings.set("uː", "oo");
vowelMappings.set("u", "oo");
vowelMappings.set("ʊər", "oor");
vowelMappings.set("ɔːr", "or");
vowelMappings.set("ɒr", "orr");
vowelMappings.set("aʊər", "our");
vowelMappings.set("aʊ", "ow");
vowelMappings.set("ɔɪ", "oy");
vowelMappings.set("ʌ", ["u", "uh"]);
vowelMappings.set("ɜːr", "ur");
vowelMappings.set("jʊər", "ure");
vowelMappings.set("ʌr", "urr");
vowelMappings.set("ʊ", "uu");
vowelMappings.set("ʊr", "uurr");
vowelMappings.set("ə", "uh");
vowelMappings.set("ər", "er");
vowelMappings.set("y", "ue");
vowelMappings.set("ø", "eu");
vowelMappings.set("œ", "eu");
vowelMappings.set("ɶ", "a");
vowelMappings.set("ɨ", "i");
vowelMappings.set("ʉ", "u");
vowelMappings.set("ɯ", "u");
vowelMappings.set("ɘ", "uh");
vowelMappings.set("ɵ", "uh");
vowelMappings.set("ɤ", "uh");
vowelMappings.set("ɜ", "uh");
vowelMappings.set("ɞ", "uh");
vowelMappings.set("ɐ", "uh");
vowelMappings.set("ɚ", "er");
vowelMappings.set("ɝ", "ur");
vowelMappings.set("ɔ", "aw");
vowelMappings.set("a", "ah");
vowelMappings.set("ɑ̃", "on");
vowelMappings.set("ɛ̃", "an");
vowelMappings.set("ɔ̃", "on");
vowelMappings.set("œ̃", "un");

export const mappings: Map<string, string | string[]> = new Map([...consonantMappings, ...vowelMappings]);

export const STRESS_MARK = "ˈ";
export const SECONDARY_STRESS_MARK = "ˌ";

export const consonants = [...consonantMappings.keys()];
export const vowels = [...vowelMappings.keys()];

// miscellaneous
export const acceptedSymbols = ["/", "[", "]", " "];

export const validChunks = [...consonants, ...vowels, STRESS_MARK, SECONDARY_STRESS_MARK, ...acceptedSymbols];

// Sonority rankings (higher = more sonorous)
export const sonorityRanks = new Map<string, number>([
	// Vowels (8)
	["i", 8], ["y", 8], ["ɨ", 8], ["ʉ", 8], ["ɯ", 8], ["u", 8], ["ɪ", 8], ["ʏ", 8], ["ʊ", 8], ["e", 8], ["ø", 8], ["ɘ", 8], ["ɵ", 8], ["ɤ", 8], ["o", 8], ["ə", 8], ["ɛ", 8], ["œ", 8], ["ɜ", 8], ["ɞ", 8], ["ʌ", 8], ["ɔ", 8], ["æ", 8], ["ɐ", 8], ["a", 8], ["ɶ", 8], ["ɑ", 8], ["ɒ", 8], ["ɚ", 8], ["ɝ", 8], ["ʲ", 8],
	// Diphthongs
	["aɪ", 8], ["eɪ", 8], ["ɔɪ", 8], ["aʊ", 8], ["oʊ", 8], ["ɪə", 8], ["ɛə", 8], ["ʊə", 8],

	// Glides (7)
	["j", 7], ["w", 7], ["ɥ", 7], ["ɰ", 7],

	// Liquids (6)
	["l", 6], ["r", 6], ["ɹ", 6], ["ɾ", 6], ["ɽ", 6], ["ʎ", 6], ["ʟ", 6],

	// Nasals (5)
	["m", 5], ["ɱ", 5], ["n", 5], ["ɳ", 5], ["ŋ", 5], ["ɴ", 5],

	// Fricatives (4)
	["f", 4], ["v", 4], ["θ", 4], ["ð", 4], ["s", 4], ["z", 4], ["ʃ", 4], ["ʒ", 4], ["ç", 4], ["ʝ", 4], ["x", 4], ["ɣ", 4], ["χ", 4], ["ʁ", 4], ["ħ", 4], ["ʕ", 4], ["h", 4], ["ɦ", 4],

	// Affricates (3)
	["ʦ", 3], ["ʣ", 3], ["ʧ", 3], ["ʤ", 3], ["tʃ", 3], ["dʒ", 3],

	// Stops (2)
	["p", 2], ["b", 2], ["t", 2], ["d", 2], ["ʈ", 2], ["ɖ", 2], ["c", 2], ["ɟ", 2], ["k", 2], ["g", 2], ["q", 2], ["ɢ", 2], ["ʔ", 2]
]);
