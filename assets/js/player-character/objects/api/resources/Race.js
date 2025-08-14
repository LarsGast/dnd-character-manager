import { ApiCategory } from "../../../api.js";
import { AbilityBonus } from "../helpers/AbilityBonus.js"
import { Choice } from "../helpers/Choice.js";
import { ApiBaseObject } from "./ApiBaseObject.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";
import { Subrace } from "./Subrace.js";
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
    ability_bonuses = [];

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
     * Starting languages for all new characters of this race.
     * @type {ApiObjectInfo[]}
     */
    languages = [];

    /**
     * Starting language options for all new characters of this race.
     * @type {ApiObjectInfo[]}
     */
    language_options = new Choice();

    /**
     * Flavor description of the languages known by the race.
     * @type {string}
     */
    language_desc;

    /**
     * A list of traits the race has.
     * @type {ApiObjectInfo[]}
     */
    traits = [];

    /**
     * A list of subraces the race has, if any.
     * @type {ApiObjectInfo[]}
     */
    subraces = [];

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

    /**
     * Get the full object of all subraces linked to this race.
     * @returns {Promise<Trait[]>}
     */
    async getAllSubracesAsync() {
        return Promise.all(this.subraces.map(subraceInfo => Subrace.getAsync(subraceInfo.index)));
    }
}