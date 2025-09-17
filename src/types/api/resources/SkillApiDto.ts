import { ApiObjectInfoApiDto } from "../wrappers/ApiObjectInfoApiDto.js";

export interface SkillApiDto extends ApiObjectInfoApiDto {

    /**
     * Flavor description of the skill.
     */
    desc: string[];

    /**
     * The ability score that the skill is typically used as.
     */
    ability_score: ApiObjectInfoApiDto;
}