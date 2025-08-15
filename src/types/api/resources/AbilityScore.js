import { ApiCategory } from "../../../api.js";
import { ApiBaseObject } from "./ApiBaseObject.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";

export class AbilityScore extends ApiBaseObject {

    static apiCategory = ApiCategory.AbilityScores;

    /**
     * Description of the resource.
     * @type {string}
     */
    desc ;

    /**
     * Full name of the ability score.
     * @type {string}
     */
    full_name;

    /**
     * List of skills that use this ability score.
     * @type {ApiObjectInfo[]}
     */
    skills;
    
    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }
}