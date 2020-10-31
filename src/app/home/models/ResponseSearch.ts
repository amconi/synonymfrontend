import { formatWithOptions } from "util";
/**
 * Result of search
 */
import { SearchResult } from '@models/SearchResult';
export class ResponseSearch {
    data: SearchResult[];
    isError: boolean;
    errorMessage?: string;
}