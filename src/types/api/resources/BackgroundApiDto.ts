import { ApiObjectInfoApiDto } from "../wrappers/ApiObjectInfoApiDto.js";
import { ChoiceApiDto } from "../helpers/ChoiceApiDto.js";

export interface BackgroundApiDto extends ApiObjectInfoApiDto {

    /**
     * Starting proficiencies for all new characters of this background.
     */
    starting_proficiencies: ApiObjectInfoApiDto[];

    /**
     * Choice of languages for all new characters of this background.
     */
    language_options: ChoiceApiDto;

    /**
     * Starting equipment for all new characters of this background.
     */
    starting_equipment: ApiObjectInfoApiDto[];

    /**
     * Choice of equipment for all new characters of this background.
     */
    starting_equipment_options: ChoiceApiDto;

    /**
     * Special feature granted to new characters of this background.
     */
    feature: BackgroundFeatureApiDto;

    /**
     * Choice of personality traits for all new characters of this background.
     */
    personality_traits: ChoiceApiDto;

    /**
     * Choice of ideals for all new characters of this background.
     */
    ideals: ChoiceApiDto;

    /**
     * Choice of bonds for all new characters of this background.
     */
    bonds: ChoiceApiDto;

    /**
     * Choice of flaws for all new characters of this background.
     */
    flaws: ChoiceApiDto;
}

interface BackgroundFeatureApiDto {
    name: string;
    desc: string[];
}