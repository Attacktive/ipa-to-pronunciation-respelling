/**
 * @type {Map<string, string | string[]>}
 */
const mappings = new Map();

// vowels
mappings.set("æ", "a");
mappings.set("ɑː", "ah");
mappings.set("ɛər", "air");
mappings.set("ɑːr", "ar");
mappings.set("ær", "arr");
mappings.set("ɔː", "aw");
mappings.set("eɪ", "ay");
mappings.set("ɛ", ["e", "eh"]);
mappings.set("iː", "ee");
mappings.set("i", "ee");
mappings.set("ɪər", "eer");
mappings.set("ɛr", "err");
mappings.set("juː", "ew");
mappings.set("aɪ", ["eye", "y"]);
mappings.set("ɪ", ["i", "ih"]);
mappings.set("aɪər", "ire");
mappings.set("ɪr", "irr");
mappings.set("ɒ", "o");
mappings.set("oʊ", "oh");
mappings.set("ɔɪər", "oir");
mappings.set("uː", "oo");
mappings.set("u", "oo");
mappings.set("ʊər", "oor");
mappings.set("ɔːr", "or");
mappings.set("ɒr", "orr");
mappings.set("aʊər", "our");
mappings.set("aʊ", "ow");
mappings.set("ɔɪ", "oy");
mappings.set("ʌ", ["u", "uh"]);
mappings.set("ɜːr", "ur");
mappings.set("jʊər", "ure");
mappings.set("ʌr", "urr");
mappings.set("ʊ", "uu");
mappings.set("ʊr", "uurr");
mappings.set("ə", "uh");
mappings.set("ər", "er");

// consonants
mappings.set("b", "b");
mappings.set("tʃ", "ch");
mappings.set("d", "d");
mappings.set("ð", "dh");
mappings.set("f", "f");
mappings.set("ɡ", ["g", "gh"]);
mappings.set("h", "h");
mappings.set("dʒ", "j");
mappings.set("k", "k");
mappings.set("x", "kh");
mappings.set("l", "l");
mappings.set("m", "m");
mappings.set("n", "n");
mappings.set("ŋ", "ng");
mappings.set("ŋk", "nk");
mappings.set("p", "p");
mappings.set("r", "r");
mappings.set("s", ["s", "ss"]);
mappings.set("ʃ", "sh");
mappings.set("t", "t");
mappings.set("tʃ", "tch");
mappings.set("θ", "th");
mappings.set("v", "v");
mappings.set("w", "w");
mappings.set("hw", "wh");
mappings.set("j", "y");
mappings.set("z", "z");
mappings.set("ʒ", "zh");

// miscellaneous
mappings.set("/", "");
mappings.set(" ", " ");
