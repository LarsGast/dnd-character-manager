import { BaseResourceApiDto } from "../wrappers/BaseResourceApiDto.js";

export interface LanguageApiDto extends BaseResourceApiDto {

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