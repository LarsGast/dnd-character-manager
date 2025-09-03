import { ApiCategory } from "../../../../services/api.js";
import { DnDContentBaseObject } from "./DnDContentBaseObject.js";
import { DnDContentObjectInfo } from "./DnDContentObjectInfo.js";

export class Skill extends DnDContentBaseObject {

    static apiCategory = ApiCategory.Skills;

    /**
     * Flavor description of the skill.
     * @type {string[]}
     */
    desc;

    /**
     * The ability score that the skill is typically used as.
     * @type {DnDContentObjectInfo}
     */
    ability_score;

    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }
}