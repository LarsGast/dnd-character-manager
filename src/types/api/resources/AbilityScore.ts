import { ApiObjectInfo } from "../wrappers/ApiObjectInfo.js";

export interface AbilityScore extends ApiObjectInfo {

    /**
     * Description of the resource.
     */
    desc: string;

    /**
     * Full name of the ability score.
     */
    full_name: string;

    /**
     * List of skills that use this ability score.
     */
    skills: ApiObjectInfo[];
}