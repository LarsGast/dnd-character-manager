import { ApiCategory } from "../../../services/api.js";
import { ApiBaseObject } from "./ApiBaseObject.js";

export class Language extends ApiBaseObject {

    static override apiCategory = ApiCategory.Languages;

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
    
    /**
     * Constructor.
     * @param data Full object as specified in the 5e SRD API.
     */
    constructor(data: Partial<Language> = {}) {
        super(data);
        
        this.desc = data.desc ?? "";
        this.type = data.type ?? "";
        this.script = data.script ?? "";
        this.typical_speakers = data.typical_speakers ?? [];
    }
}