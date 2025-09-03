import { ApiCategory } from "../../../../services/api.js";
import { DnDContentBaseObject } from "./DnDContentBaseObject.js";

export class Alignment extends DnDContentBaseObject {

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