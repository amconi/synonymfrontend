/**
 * Search fields
 */
export class HomeFilter {
    constructor(){
        this.searchTerm = "";
    }

    searchTerm: string
    includeTransitive: boolean;
}