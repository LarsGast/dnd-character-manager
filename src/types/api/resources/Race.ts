import { ApiCategory } from "../../../services/api.js";
import { AbilityBonus } from "../helpers/AbilityBonus.js"
import { Choice } from "../helpers/Choice.js";
import { ApiBaseObject } from "./ApiBaseObject.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";
import { Subrace } from "./Subrace.js";
import { Trait } from "./Trait.js";

export class Race extends ApiBaseObject {

    static override apiCategory = ApiCategory.Races;

    /**
     * Speed of the race in feet per round.
     */
    speed: number;

    /**
     * Bonuses to abilities this race gives.
     */
    ability_bonuses: AbilityBonus[] = [];

    /**
     * Flavor description of the typical age of the race.
     */
    age: string;

    /**
     * Flavor description of the typical alignments of the race.
     */
    alignment: string;

    /**
     * In-game size of the race.
     */
    size: string;

    /**
     * Flavor description of the typical size of the race.
     */
    size_description: string;

    /**
     * Starting languages for all new characters of this race.
     */
    languages: ApiObjectInfo[] = [];

    /**
     * Starting language options for all new characters of this race.
     */
    language_options: Choice = new Choice();

    /**
     * Flavor description of the languages known by the race.
     */
    language_desc: string;

    /**
     * A list of traits the race has.
     */
    traits: ApiObjectInfo[] = [];

    /**
     * A list of subraces the race has, if any.
     */
    subraces: ApiObjectInfo[] = [];

    /**
     * Constructor.
     * @param data Full object as specified in the 5e SRD API.
     */
    constructor(data: Partial<Race> = {}) {
        super(data);
        
        this.speed = data.speed ?? 30;
        this.ability_bonuses = (data.ability_bonuses ?? []).map(ab => new AbilityBonus(ab));
        this.age = data.age ?? "";
        this.alignment = data.alignment ?? "";
        this.size = data.size ?? "";
        this.size_description = data.size_description ?? "";
        this.languages = (data.languages ?? []).map(lang => new ApiObjectInfo(lang));
        this.language_options = Object.assign(new Choice(), data.language_options);
        this.language_desc = data.language_desc ?? "";
        this.traits = (data.traits ?? []).map(trait => new ApiObjectInfo(trait));
        this.subraces = (data.subraces ?? []).map(subrace => new ApiObjectInfo(subrace));
    }

    /**
     * Get the full object of all traits linked to this race.
     * @returns
     */
    async getAllTraitsAsync(): Promise<Trait[]> {
        return Promise.all(this.traits.map(traitInfo => ApiBaseObject.getAsync(traitInfo.index, Trait)));
    }

    /**
     * Get the full object of all subraces linked to this race.
     * @returns
     */
    async getAllSubracesAsync(): Promise<Subrace[]> {
        return Promise.all(this.subraces.map(subraceInfo => ApiBaseObject.getAsync(subraceInfo.index, Subrace)));
    }
}