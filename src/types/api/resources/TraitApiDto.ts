import { ChoiceApiDto } from "../helpers/ChoiceApiDto.js";
import { BaseResourceApiDto } from "../wrappers/BaseResourceApiDto.js";

export interface TraitApiDto extends BaseResourceApiDto {

    /**
     * Description of the trait.
     * Can consist of multiple paragraphs.
     */
    desc: string[];

    /**
     * List of races that get this trait.
     */
    races: BaseResourceApiDto[];

    /**
     * List of subraces that get this trait.
     */
    subraces: BaseResourceApiDto[];

    /**
     * List of proficiencies that this trait provides.
     */
    proficiencies: BaseResourceApiDto[];

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