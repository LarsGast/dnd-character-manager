import { ApiCategory } from "../../../api.js";
import { ApiBaseObject } from "./ApiBaseObject.js";

export class Language extends ApiBaseObject {

    static apiCategory = ApiCategory.Languages;

    /**
     * Brief description of the language.
     * @type {string}
     */
    desc;

    /**
     * CPossible values: [Standard, Exotic].
     * @type {string}
     */
    type;

    /**
     * Script used for writing in the language.
     * @type {string}
     */
    script;

    /**
     * List of races that tend to speak the language.
     * @type {string[]}
     */
    typical_speakers;
    
    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }
}