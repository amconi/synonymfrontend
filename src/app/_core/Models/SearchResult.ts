import { Synonym } from "@models/Synonym";

export interface SearchResult{
    wordId: number;
    wordText: string;
    synonyms: Synonym[];
    
}