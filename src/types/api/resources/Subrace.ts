import { ApiCategory } from "../../../services/api.js";
import { AbilityBonus } from "../helpers/AbilityBonus.js";
import { ApiBaseObject } from "./ApiBaseObject.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";
import { Choice } from "../helpers/Choice.js";
import { Trait } from "./Trait.js";

export class Subrace extends ApiBaseObject {

    static override apiCategory = ApiCategory.Subraces;

    /**
     * Flavor description of the subrace.
     */
    desc: string;

    /**
     * The race that the subrace is a part of.
     */
    race: ApiObjectInfo;

    /**
     * Bonuses to abilities this subrace gives.
     */
    ability_bonuses: AbilityBonus[];

    /**
     * A list of proficiencies the subrace starts with.
     */
    starting_proficiencies: ApiObjectInfo[];

    /**
     * List of languages the subrace always learns.
     */
    languages: ApiObjectInfo[];

    /**
     * If applicable, a choice in languages that the player can make choosing this subrace.
     */
    language_options: Choice;

    /**
     * A list of traits the subrace has.
     */
    racial_traits: ApiObjectInfo[];

    /**
     * Constructor.
     * @param data Full object as specified in the 5e SRD API.
     */
    constructor(data: Partial<Subrace> = {}) {
        super(data);
        
        this.desc = data.desc ?? "";
        this.race = data.race ? new ApiObjectInfo(data.race) : new ApiObjectInfo();
        this.ability_bonuses = data.ability_bonuses?.map(ab => new AbilityBonus(ab)) ?? [];
        this.starting_proficiencies = data.starting_proficiencies?.map(sp => new ApiObjectInfo(sp)) ?? [];
        this.languages = data.languages?.map(l => new ApiObjectInfo(l)) ?? [];
        this.language_options = new Choice(data.language_options);
        this.racial_traits = data.racial_traits?.map(rt => new ApiObjectInfo(rt)) ?? [];
    }

    /**
     * Get the full object of all traits linked to this subrace.
     * @returns
     */
    async getAllTraitsAsync(): Promise<Trait[]> {
        return Promise.all(this.racial_traits.map(traitInfo => ApiBaseObject.getAsync(traitInfo.index, Trait)));
    }
}