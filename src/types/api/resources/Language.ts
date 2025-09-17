import { ApiObjectInfo } from "../wrappers/ApiObjectInfo.js";

export interface Language extends ApiObjectInfo {

    /**
     * Brief description of the language.
     */
    desc: string;

    /**
     * CPossible values: [Standard, Exotic].
     */
    type: string;

    /**
     * Script used for writing in the language.
     */
    script: string;

    /**
     * List of races that tend to speak the language.
     */
    typical_speakers: string[];
}