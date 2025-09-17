import { ApiObjectInfo } from "../wrappers/ApiObjectInfo.js";

export interface Alignment extends ApiObjectInfo {

    /**
     * Abbreviation/initials/acronym for the alignment.
     */
    abbreviation: string;

    /**
     * Brief description of the alignment.
     */
    desc: string;
}