# Canonical pronunciation respelling scheme

This document defines the canonical IPA-to-pronunciation-respelling scheme used by this project.

The scheme is English-facing and project-owned. The Wikipedia pronunciation respelling key and Dictionary.com's IPA key informed its development, but neither external key is normative. The converter emits one canonical respelling for each accepted input; alternative spellings retained in mapping metadata are not emitted.

The executable contract lives in [`scheme-conformance.test.ts`](../src/scripts/scheme-conformance.test.ts). Changes to the rules in this document should normally be accompanied by matching conformance cases.

## Core output rules

Each accepted IPA phoneme or supported phoneme chunk has one canonical respelling. Common English consonants usually keep their familiar letter, while vowels, affricates, and other ambiguous sounds use explicit spellings.

Primary stress (`ˈ`) uppercases the following syllable. For example, `ˈstrɪkt` becomes `STRIHKT`.

Secondary stress (`ˌ`) ends any pending primary-stress capitalization but has no visible marker of its own. For example, `ˈæbˌstrækt` becomes `ABstrakt`.

Explicit syllable boundaries written as a period or space become a space in the output. Inferred syllable boundaries affect syllable structure and stress, but do not insert spaces. For example, `kæt.ər.pɪl.ər` becomes `kat er pihl er`.

Literal IPA wrappers `/`, `[`, and `]` are preserved.

Optional segments inside parentheses stay optional and are respelled normally. For example, `/səˈl(j)uːʃən/` becomes `/suhL(Y)OOshuhn/`. Parentheses that wrap the entire input are treated as input wrappers rather than as an optional group.

## Vowels

The scheme intentionally favors readable, stable spellings over preserving every narrow phonetic distinction.

| IPA | Canonical respelling | Notes |
| --- | --- | --- |
| `æ` | `a` | TRAP-like vowel |
| `ɑ`, `ɑː`, `a` | `ah` | Open vowel family |
| `ɔ`, `ɔː`, `o`, `oː` | `aw` | THOUGHT-like family |
| `e`, `ɛ` | `eh` | DRESS-like family |
| `i`, `iː` | `ee` | FLEECE-like family |
| `ɪ` | `ih` | KIT-like vowel |
| `ɒ` | `o` | LOT-like vowel |
| `u`, `uː` | `oo` | GOOSE-like family |
| `ʊ` | `uu` | FOOT-like vowel |
| `ʌ` | `uh` | STRUT-like vowel |
| `ə`, `ɘ`, `ɜ`, `ɐ` | `uh` | Reduced/central vowel family |
| `ɚ` | `er` | Rhotic schwa |
| `ɝ` | `ur` | Stressed rhotic central vowel |
| `y` | `ue` | Limited foreign-reference mapping |
| `œ` | `eu` | Limited foreign-reference mapping |

### Diphthongs and vowel sequences

| IPA | Canonical respelling |
| --- | --- |
| `eɪ` | `ay` |
| `aɪ` | `eye` |
| `aʊ` | `ow` |
| `ɔɪ` | `oy` |
| `oʊ`, `əʊ` | `oh` |
| `ju`, `juː` | `ew` |

Vowel length is not encoded in the respelling. A standalone length mark (`ː`) is accepted but does not change the canonical output, so pairs such as `i`/`iː` and `u`/`uː` share `ee` and `oo`.

## Rhotic vowels

Ordinary vowel-plus-`r` forms are compositional: use the canonical base-vowel spelling and append `r`.

| IPA | Canonical respelling |
| --- | --- |
| `ɑr`, `ɑːr` | `ahr` |
| `ær` | `ar` |
| `ɛr` | `ehr` |
| `ɪr` | `ihr` |
| `ɔr`, `ɔːr` | `awr` |
| `ɒr` | `or` |
| `ʌr` | `uhr` |
| `ʊr` | `uur` |

Familiar fused rhotic spellings remain explicit rather than being derived:

| IPA | Canonical respelling |
| --- | --- |
| `ɛər` | `air` |
| `ɪər` | `eer` |
| `aɪər` | `ire` |
| `ɔɪər` | `oir` |
| `ʊər` | `oor` |
| `aʊər` | `our` |
| `ɜr`, `ɜːr` | `ur` |
| `jʊər` | `ure` |
| `ər` | `er` |

For example, `/kɑr/` becomes `/kahr/`, `/stɔr/` becomes `/stawr/`, and `/pʊər/` becomes `/poor/`.

## Consonants and affricates

Most familiar English consonants keep a direct spelling, including `b`, `d`, `f`, `ɡ` → `g`, `k`, `l`, `m`, `n`, `p`, `r`/`ɹ` → `r`, `s`, `t`, `v`, `w`, and `z`.

The main explicit consonant spellings are:

| IPA | Canonical respelling |
| --- | --- |
| `tʃ`, `ʧ` | `ch` |
| `dʒ`, `ʤ` | `j` |
| `ʣ` | `dz` |
| `ʦ` | `ts` |
| `ð` | `dh` |
| `θ` | `th` |
| `ʃ` | `sh` |
| `ʒ` | `zh` |
| `ŋ` | `ng` |
| `ŋk` | `nk` |
| `ʍ`, `hw` | `wh` |
| `j` | `y` |
| `x` | `kh` |

Some narrow or legacy symbols are accepted as safe aliases when they collapse to the same unambiguous respelling: `ɦ → h`, `ɫ → l`, `ɱ → m`, `hw → wh`, `ʣ → dz`, `ʤ → j`, `ʦ → ts`, `ʧ → ch`, and `ɘ → uh`.

## Syllabic and non-syllabic marks

Syllabicity is structural, not decorative.

The syllabic marks U+030D and U+0329 can turn a consonant into a syllable nucleus. For example, `/ˈɹiːd͡ʒn̩/` becomes `/REEjn/`.

The non-syllabic mark U+032F keeps a marked vowel component inside the preceding nucleus. This can affect stress propagation. For example, `ˈɛə̯` becomes `EHUH`, while the unmarked `ˈɛə` becomes `EHuh`.

## Nasal vowels and limited foreign support

This converter is not a general IPA transliterator. It supports the English inventory, a small set of safe aliases, and a limited foreign-reference set that has an explicit project respelling.

The supported nasal-vowel chunks are:

| IPA | Canonical respelling |
| --- | --- |
| `ɑ̃` | `on` |
| `ɛ̃` | `an` |
| `ɔ̃` | `on` |
| `œ̃` | `un` |

Other explicit foreign-reference mappings include `x → kh`, `y → ue`, `œ → eu`, and `a → ah`.

These mappings are deliberate exceptions. A foreign or narrow phoneme is not accepted merely because it could be approximated by a nearby English sound.

## Ignored detail versus unsupported detail

Some phonetic detail is deliberately ignored because the canonical scheme does not encode it:

| Mark | Treatment |
| --- | --- |
| `ː` | Vowel length is accepted but not encoded |
| `ʰ` | Aspiration is ignored |
| `ˑ` | Half-length is ignored |

Tie bars are normalized so affricates such as `d͡ʒ` and `t͡ʃ` resolve to their canonical chunks. Hyphens are treated as formatting and ignored.

Other meaningful distinctions are not silently discarded. Unsupported marks or phonemes cause conversion to fail. Examples include generic nasalization such as `ẽ`, voicelessness such as `n̥`, labialization such as `tʷ`, and unsupported phonemes such as `ʔ` or `q`.

The same rule applies to lossy foreign approximations. Distinct sounds such as `ɾ`, `ç`, `χ`, `ʁ`, `ɥ`, `ɯ`, or `ø` are rejected rather than silently rewritten as a different English phoneme.

An unsupported input reports the offending symbol, for example:

```text
ẽ contains unsupported symbol(s) around: "̃".
```

## Representative examples

| IPA | Canonical respelling | Rule illustrated |
| --- | --- | --- |
| `/ʍɛn/` | `/whehn/` | Consonant spelling |
| `/d͡ʒʌd͡ʒ/` | `/juhj/` | Tie-bar affricates |
| `/kɑr/` | `/kahr/` | Ordinary rhotic vowel |
| `ˈstrɪkt` | `STRIHKT` | Primary stress |
| `ˈæbˌstrækt` | `ABstrakt` | Secondary stress ends primary capitalization |
| `kæt.ər.pɪl.ər` | `kat er pihl er` | Explicit syllable spacing |
| `/səˈl(j)uːʃən/` | `/suhL(Y)OOshuhn/` | Optional segment |
| `/ˈɹiːd͡ʒn̩/` | `/REEjn/` | Syllabic consonant |
| `ˈɛə̯` | `EHUH` | Non-syllabic vowel component |
| `ɑ̃` | `on` | Supported nasal vowel |
| `tʰ` | `t` | Deliberately ignored aspiration |

## Maintaining the scheme

The canonical scheme is intentionally singular: the converter does not choose among multiple output styles.

When changing a canonical mapping or formatting rule:

1. Update the implementation.
2. Update or add a representative case in [`scheme-conformance.test.ts`](../src/scripts/scheme-conformance.test.ts).
3. Update this document when the written rule or examples change.

This keeps the prose, executable contract, and converter behavior aligned.
