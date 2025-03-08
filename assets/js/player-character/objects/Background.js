import { ApiCategory, getApiResultsAsync } from "../api.js";
import { ApiBaseObject } from "./ApiBaseObject.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";
import { Choice } from "./Choice.js";
import { Feature } from "./Feature.js";

export class Background extends ApiBaseObject {

    static apiCategory = ApiCategory.Backgrounds;

    /**
     * Starting proficiencies for all new characters of this background.
     * @type {ApiObjectInfo[]}
     */
    starting_proficiencies;

    /**
     * Choice of languages for all new characters of this background.
     * @type {Choice}
     */
    language_options;

    /**
     * Starting equipment for all new characters of this background.
     * @type {ApiObjectInfo[]}
     */
    starting_equipment;

    /**
     * Choice of equipment for all new characters of this background.
     * @type {Choice}
     */
    starting_equipment_options;

    /**
     * Special feature granted to new characters of this background.
     * @type {Feature}
     */
    feature;

    /**
     * Choice of personality traits for all new characters of this background.
     * @type {Choice}
     */
    personality_traits;

    /**
     * Choice of ideals for all new characters of this background.
     * @type {Choice}
     */
    ideals;

    /**
     * Choice of bonds for all new characters of this background.
     * @type {Choice}
     */
    bonds;

    /**
     * Choice of flaws for all new characters of this background.
     * @type {Choice}
     */
    flaws;

    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }
}