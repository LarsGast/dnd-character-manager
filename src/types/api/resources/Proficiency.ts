import { ApiObjectInfo } from "../wrappers/ApiObjectInfo.js";

export interface Proficiency extends ApiObjectInfo {

    /**
     * The general category of the proficiency.
     */
    type: string;

    /**
     * Classes that start with this proficiency.
     */
    classes: ApiObjectInfo[]
    /**
     * Races that start with this proficiency.
     */
    races: ApiObjectInfo[];

    /**
     * Reference to the full description of the related resource.
     */
    reference: ApiObjectInfo;
}