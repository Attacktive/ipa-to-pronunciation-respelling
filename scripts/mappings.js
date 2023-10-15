const vowels = new Map();
vowels.set("æ", "a");
vowels.set("ɑː", "ah");
vowels.set("ɛər", "air");
vowels.set("ɑːr", "ar");
vowels.set("ær", "arr");
vowels.set("ɔː", "aw");
vowels.set("eɪ", "ay");
vowels.set("ɛ", ["e", "eh"]);
vowels.set("iː", "ee");
vowels.set("i", "ee");
vowels.set("ɪər", "eer");
vowels.set("ɛr", "err");
vowels.set("juː", "ew");
vowels.set("aɪ", ["eye", "y"]);
vowels.set("ɪ", ["i", "ih"]);
vowels.set("aɪər", "ire");
vowels.set("ɪr", "irr");
vowels.set("ɒ", "o");
vowels.set("oʊ", "oh");
vowels.set("ɔɪər", "oir");
vowels.set("uː", "oo");
vowels.set("u", "oo");
vowels.set("ʊər", "oor");
vowels.set("ɔːr", "or");
vowels.set("ɒr", "orr");
vowels.set("aʊər", "our");
vowels.set("aʊ", "ow");
vowels.set("ɔɪ", "oy");
vowels.set("ʌ", ["u", "uh"]);
vowels.set("ɜːr", "ur");
vowels.set("jʊər", "ure");
vowels.set("ʌr", "urr");
vowels.set("ʊ", "uu");
vowels.set("ʊr", "uurr");
vowels.set("ə", "uh");
vowels.set("ər", "er");

const consonants = new Map();
consonants.set("b", "b");
consonants.set("tʃ", "ch");
consonants.set("d", "d");
consonants.set("ð", "dh");
consonants.set("f", "f");
consonants.set("ɡ", ["g", "gh"]);
consonants.set("h", "h");
consonants.set("dʒ", "j");
consonants.set("k", "k");
consonants.set("x", "kh");
consonants.set("l", "l");
consonants.set("m", "m");
consonants.set("n", "n");
consonants.set("ŋ", "ng");
consonants.set("ŋk", "nk");
consonants.set("p", "p");
consonants.set("r", "r");
consonants.set("s", ["s", "ss"]);
consonants.set("ʃ", "sh");
consonants.set("t", "t");
consonants.set("tʃ", "tch");
consonants.set("θ", "th");
consonants.set("v", "v");
consonants.set("w", "w");
consonants.set("hw", "wh");
consonants.set("j", "y");
consonants.set("z", "z");
consonants.set("ʒ", "zh");

/**
 * @type {Map<string, string | string[]>}
 */
const mappings = new Map([...vowels, ...consonants]);

// miscellaneous
mappings.set("/", "");
mappings.set("[", "");
mappings.set("]", "");
mappings.set(" ", " ");

const STRESS_MARK = "ˈ";
