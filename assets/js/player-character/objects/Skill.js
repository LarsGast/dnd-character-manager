import { ApiCategory } from "../api.js";
import { ApiBaseObject } from "./ApiBaseObject.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";

export class Skill extends ApiBaseObject {

    static apiCategory = ApiCategory.Skills;

    /**
     * Flavor description of the skill.
     * @type {string[]}
     */
    desc;

    /**
     * The ability score that the skill is typically used as.
     * @type {ApiObjectInfo}
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