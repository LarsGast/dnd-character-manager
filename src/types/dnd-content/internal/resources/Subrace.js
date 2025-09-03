import { ApiCategory } from "../../../../services/api.js";
import { AbilityBonus } from "../helpers/AbilityBonus.js";
import { DnDContentBaseObject } from "./DnDContentBaseObject.js";
import { DnDContentObjectInfo } from "./DnDContentObjectInfo.js";
import { Choice } from "../helpers/Choice.js";
import { Trait } from "./Trait.js";

export class Subrace extends DnDContentBaseObject {

    static apiCategory = ApiCategory.Subraces;

    /**
     * Flavor description of the subrace.
     * @type {string}
     */
    desc;

    /**
     * The race that the subrace is a part of.
     * @type {DnDContentObjectInfo}
     */
    race;

    /**
     * Bonuses to abilities this subrace gives.
     * @type {AbilityBonus[]}
     */
    ability_bonuses;

    /**
     * A list of proficiencies the subrace starts with.
     * @type {DnDContentObjectInfo[]}
     */
    starting_proficiencies;

    /**
     * List of languages the subrace always learns.
     * @type {DnDContentObjectInfo[]}
     */
    languages;

    /**
     * If applicable, a choice in languages that the player can make choosing this subrace.
     * @type {Choice}
     */
    language_options;

    /**
     * A list of traits the subrace has.
     * @type {DnDContentObjectInfo[]}
     */
    racial_traits;

    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }

    /**
     * Get the full object of all traits linked to this subrace.
     * @returns {Promise<Trait[]>}
     */
    async getAllTraitsAsync() {
        return Promise.all(this.racial_traits.map(traitInfo => Trait.getAsync(traitInfo.index)));
    }
}