import { ApiObjectInfoApiDto } from "../wrappers/ApiObjectInfoApiDto.js";

export interface AlignmentApiDto extends ApiObjectInfoApiDto {

    /**
     * Abbreviation/initials/acronym for the alignment.
     */
    abbreviation: string;

    /**
     * Brief description of the alignment.
     */
    desc: string;
}