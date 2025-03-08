import { ApiCategory } from "../api.js";
import { AbilityBonus } from "./AbilityBonus.js";
import { ApiBaseObject } from "./ApiBaseObject.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";
import { Trait } from "./Trait.js";

export class Race extends ApiBaseObject {

    static apiCategory = ApiCategory.Races;

    /**
     * Speed of the race in feet per round.
     * @type {number}
     */
    speed;

    /**
     * Bonuses to abilities this race gives.
     * @type {AbilityBonus[]}
     */
    ability_bonuses;

    /**
     * Flavor description of the typical age of the race.
     * @type {string}
     */
    age;

    /**
     * Flavor description of the typical alignments of the race.
     * @type {string}
     */
    alignment;

    /**
     * In-game size of the race.
     * @type {string}
     */
    size;

    /**
     * Flavor description of the typical size of the race.
     * @type {string}
     */
    size_description;

    /**
     * A list of proficiencies the race starts with.
     * @type {ApiObjectInfo[]}
     */
    starting_proficiencies;

    /**
     * Flavor description of the languages known by the race.
     * @type {string}
     */
    language_desc;

    /**
     * A list of traits the race has.
     * @type {ApiObjectInfo[]}
     */
    traits;

    /**
     * A list of subraces the race has, if any.
     * @type {ApiObjectInfo[]}
     */
    subraces;

    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }

    /**
     * Get the full object of all traits linked to this race.
     * @returns {Promise<Trait[]>}
     */
    async getAllTraitsAsync() {
        return Promise.all(this.traits.map(traitInfo => Trait.getAsync(traitInfo.index)));
    }
}