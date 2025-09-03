import { ApiCategory } from "../../../../services/api.js";
import { DnDContentBaseObject } from "./DnDContentBaseObject.js";
import { DnDContentObjectInfo } from "./DnDContentObjectInfo.js";

export class AbilityScore extends DnDContentBaseObject {

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
     * @type {DnDContentObjectInfo[]}
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