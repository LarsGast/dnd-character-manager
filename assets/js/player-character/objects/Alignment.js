import { ApiCategory } from "../api.js";
import { ApiBaseObject } from "./ApiBaseObject.js";

export class Alignment extends ApiBaseObject {

    static apiCategory = ApiCategory.Alignments;

    /**
     * Abbreviation/initials/acronym for the alignment.
     * @type {string}
     */
    abbreviation;

    /**
     * Brief description of the alignment.
     * @type {string}
     */
    desc;
    
    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }
}