import { Choice } from "../helpers/Choice.js";
import { ApiObjectInfo } from "../wrappers/ApiObjectInfo.js";

export interface Trait extends ApiObjectInfo {

    /**
     * Description of the trait.
     * Can consist of multiple paragraphs.
     */
    desc: string[];

    /**
     * List of races that get this trait.
     */
    races: ApiObjectInfo[];

    /**
     * List of subraces that get this trait.
     */
    subraces: ApiObjectInfo[];

    /**
     * List of proficiencies that this trait provides.
     */
    proficiencies: ApiObjectInfo[];

    /**
     * If applicable, a choice in proficiencies that the player can make when getting this trait.
     */
    proficiency_choices: Choice;

    /**
     * If applicable, a choice in languages that the player can make when getting this trait.
     */
    language_options: Choice;

    /**
     * Any extra trait-specific information.
     * Can differ in specification per trait.
     */
    trait_specific: any;
}