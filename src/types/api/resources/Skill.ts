import { ApiCategory } from "../../../services/api.js";
import { ApiBaseObject } from "./ApiBaseObject.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";

export class Skill extends ApiBaseObject {

    static override apiCategory = ApiCategory.Skills;

    /**
     * Flavor description of the skill.
     */
    desc: string[];

    /**
     * The ability score that the skill is typically used as.
     */
    ability_score: ApiObjectInfo;

    /**
     * Constructor.
     * @param data Full object as specified in the 5e SRD API.
     */
    constructor(data: Partial<Skill> = {}) {
        super(data);
        
        this.desc = data.desc ?? [];
        this.ability_score = data.ability_score ? new ApiObjectInfo(data.ability_score) : new ApiObjectInfo();
    }
}