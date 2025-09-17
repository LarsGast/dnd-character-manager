import { ApiObjectInfoApiDto } from "../wrappers/ApiObjectInfoApiDto.js";

export interface AbilityScoreApiDto extends ApiObjectInfoApiDto {

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
    skills: ApiObjectInfoApiDto[];
}