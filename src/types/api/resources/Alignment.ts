import { ApiCategory } from "../../../services/api.js";
import { ApiBaseObject } from "./ApiBaseObject.js";

export class Alignment extends ApiBaseObject {

    static override apiCategory = ApiCategory.Alignments;

    /**
     * Abbreviation/initials/acronym for the alignment.
     */
    abbreviation: string;

    /**
     * Brief description of the alignment.
     */
    desc: string;
    
    /**
     * Constructor.
     * @param data Full object as specified in the 5e SRD API.
     */
    constructor(data: Partial<Alignment> = {}) {
        super(data);
        
        this.abbreviation = data.abbreviation ?? "";
        this.desc = data.desc ?? "";
    }
}