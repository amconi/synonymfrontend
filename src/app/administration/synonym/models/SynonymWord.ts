import { Synonym } from '@models/Synonym';
export class SynonymWord {
    wordId: number;
    wordText: string;
    synonyms: Synonym[];
}