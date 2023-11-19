export interface IndexedCharacter {
	character: string;
	index: number;
}

export interface Syllable {
	onset: IndexedCharacter[];
	nucleus: IndexedCharacter[];
	coda: IndexedCharacter[];
}
