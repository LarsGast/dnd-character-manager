import { AbilityBonus } from "../helpers/AbilityBonus.js";
import { ApiObjectInfo } from "../wrappers/ApiObjectInfo.js";
import { Choice } from "../helpers/Choice.js";

export interface Subrace extends ApiObjectInfo {

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
}