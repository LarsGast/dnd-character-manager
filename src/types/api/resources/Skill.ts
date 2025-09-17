import { ApiObjectInfo } from "../wrappers/ApiObjectInfo.js";

export interface Skill extends ApiObjectInfo {

    /**
     * Flavor description of the skill.
     */
    desc: string[];

    /**
     * The ability score that the skill is typically used as.
     */
    ability_score: ApiObjectInfo;
}