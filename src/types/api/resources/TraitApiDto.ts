import { ChoiceApiDto } from "../helpers/ChoiceApiDto.js";
import { ApiObjectInfoApiDto } from "../wrappers/ApiObjectInfoApiDto.js";

export interface TraitApiDto extends ApiObjectInfoApiDto {

    /**
     * Description of the trait.
     * Can consist of multiple paragraphs.
     */
    desc: string[];

    /**
     * List of races that get this trait.
     */
    races: ApiObjectInfoApiDto[];

    /**
     * List of subraces that get this trait.
     */
    subraces: ApiObjectInfoApiDto[];

    /**
     * List of proficiencies that this trait provides.
     */
    proficiencies: ApiObjectInfoApiDto[];

    /**
     * If applicable, a choice in proficiencies that the player can make when getting this trait.
     */
    proficiency_choices: ChoiceApiDto;

    /**
     * If applicable, a choice in languages that the player can make when getting this trait.
     */
    language_options: ChoiceApiDto;

    /**
     * Any extra trait-specific information.
     * Can differ in specification per trait.
     */
    trait_specific: any;
}