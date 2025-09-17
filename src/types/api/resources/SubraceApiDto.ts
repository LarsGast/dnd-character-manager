import { AbilityBonusApiDto } from "../helpers/AbilityBonusApiDto.js";
import { ApiObjectInfoApiDto } from "../wrappers/ApiObjectInfoApiDto.js";
import { ChoiceApiDto } from "../helpers/ChoiceApiDto.js";

export interface SubraceApiDto extends ApiObjectInfoApiDto {

    /**
     * Flavor description of the subrace.
     */
    desc: string;

    /**
     * The race that the subrace is a part of.
     */
    race: ApiObjectInfoApiDto;

    /**
     * Bonuses to abilities this subrace gives.
     */
    ability_bonuses: AbilityBonusApiDto[];

    /**
     * A list of proficiencies the subrace starts with.
     */
    starting_proficiencies: ApiObjectInfoApiDto[];

    /**
     * List of languages the subrace always learns.
     */
    languages: ApiObjectInfoApiDto[];

    /**
     * If applicable, a choice in languages that the player can make choosing this subrace.
     */
    language_options: ChoiceApiDto;

    /**
     * A list of traits the subrace has.
     */
    racial_traits: ApiObjectInfoApiDto[];
}