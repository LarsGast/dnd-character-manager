import { BaseResource } from "../wrappers/BaseResource.js";
import { Choice } from "../helpers/Choice.js";

export interface Background extends BaseResource {

    /**
     * Starting proficiencies for all new characters of this background.
     */
    starting_proficiencies: BaseResource[];

    /**
     * Choice of languages for all new characters of this background.
     */
    language_options: Choice;

    /**
     * Starting equipment for all new characters of this background.
     */
    starting_equipment: BaseResource[];

    /**
     * Choice of equipment for all new characters of this background.
     */
    starting_equipment_options: Choice;

    /**
     * Special feature granted to new characters of this background.
     */
    feature: BackgroundFeature;

    /**
     * Choice of personality traits for all new characters of this background.
     */
    personality_traits: Choice;

    /**
     * Choice of ideals for all new characters of this background.
     */
    ideals: Choice;

    /**
     * Choice of bonds for all new characters of this background.
     */
    bonds: Choice;

    /**
     * Choice of flaws for all new characters of this background.
     */
    flaws: Choice;
}

interface BackgroundFeature {
    name: string;
    desc: string[];
}