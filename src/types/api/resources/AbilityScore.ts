import { ApiCategory } from "../../../services/api.js";
import { ApiBaseObject } from "./ApiBaseObject.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";

export class AbilityScore extends ApiBaseObject {

    static override apiCategory = ApiCategory.AbilityScores;

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
    
    /**
     * Constructor.
     * @param data Full object as specified in the 5e SRD API.
     */
    constructor(data: Partial<AbilityScore> = {}) {
        super(data);
        
        this.desc = data.desc ?? "";
        this.full_name = data.full_name ?? "";
        this.skills = (data.skills ?? []).map(skill => new ApiObjectInfo(skill));
    }
}