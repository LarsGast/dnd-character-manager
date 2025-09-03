import { ApiCategory } from "../../../../services/api.js";
import { Choice } from "../helpers/Choice.js";
import { Feature } from "../helpers/Feature.js";
import { DnDContentBaseObject } from "./DnDContentBaseObject.js";
import { DnDContentObjectInfo } from "./DnDContentObjectInfo.js";

export class Background extends DnDContentBaseObject {

    static apiCategory = ApiCategory.Backgrounds;

    /**
     * Starting proficiencies for all new characters of this background.
     * @type {DnDContentObjectInfo[]}
     */
    starting_proficiencies;

    /**
     * Choice of languages for all new characters of this background.
     * @type {Choice}
     */
    language_options;

    /**
     * Starting equipment for all new characters of this background.
     * @type {DnDContentObjectInfo[]}
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