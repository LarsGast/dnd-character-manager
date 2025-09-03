import { ApiCategory } from "../../../../services/api.js";
import { Choice } from "../helpers/Choice.js";
import { DnDContentBaseObject } from "./DnDContentBaseObject.js";
import { DnDContentObjectInfo } from "./DnDContentObjectInfo.js";

export class Trait extends DnDContentBaseObject {

    static apiCategory = ApiCategory.Traits;

    /**
     * Description of the trait.
     * Can consist of multiple paragraphs.
     * @type {string[]}
     */
    desc = [];

    /**
     * List of races that get this trait.
     * @type {DnDContentObjectInfo[]}
     */
    races = [];

    /**
     * List of subraces that get this trait.
     * @type {DnDContentObjectInfo[]}
     */
    subraces = [];

    /**
     * List of proficiencies that this trait provides.
     * @type {DnDContentObjectInfo[]}
     */
    proficiencies = [];

    /**
     * If applicable, a choice in proficiencies that the player can make when getting this trait.
     * @type {Choice}
     */
    proficiency_choices = new Choice();

    /**
     * If applicable, a choice in languages that the player can make when getting this trait.
     * @type {Choice}
     */
    language_options = new Choice();

    /**
     * Any extra trait-specific information.
     * Can differ in specification per trait.
     * @type {JSON}
     */
    trait_specific;
    
    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }
}