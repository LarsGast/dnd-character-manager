import { ApiObjectInfoApiDto } from "../wrappers/ApiObjectInfoApiDto.js";

export interface ProficiencyApiDto extends ApiObjectInfoApiDto {

    /**
     * The general category of the proficiency.
     */
    type: string;

    /**
     * Classes that start with this proficiency.
     */
    classes: ApiObjectInfoApiDto[]
    /**
     * Races that start with this proficiency.
     */
    races: ApiObjectInfoApiDto[];

    /**
     * Reference to the full description of the related resource.
     */
    reference: ApiObjectInfoApiDto;
}