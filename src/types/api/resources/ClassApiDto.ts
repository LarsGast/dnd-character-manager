import { BaseResourceApiDto } from "../wrappers/BaseResourceApiDto.js";
import { ChoiceApiDto } from "../helpers/ChoiceApiDto.js";

export interface ClassApiDto extends BaseResourceApiDto {

    /**
     * Hit die of the class. (ex: 12 == 1d12).
     */
    hit_die: number;

    /**
     * URL of the level resource for the class.
     */
    class_levels: string;

    /**
     * All information regarding multi-classing into and out of this class.
     */
    multi_classing: MultiClassingApiDto;

    /**
     * All information regarding spellcasting that this class has access to.
     */
    spellcasting: SpellCastingApiDto;

    /**
     * URL of the spell resource list for the class.
     */
    spells: string;

    /**
     * List of equipment and their quantities all players of the class start with.
     */
    starting_equipment: StartingEquipmentApiDto[];

    /**
     * List of choices of starting equipment.
     */
    starting_equipment_options: ChoiceApiDto[];

    /**
     * List of choices of starting proficiencies.
     */
    proficiency_choices: ChoiceApiDto[];

    /**
     * List of starting proficiencies for all new characters of this class.
     */
    proficiencies: BaseResourceApiDto[];

    /**
     * Saving throws the class is proficient in.
     */
    saving_throws: BaseResourceApiDto[];

    /**
     * List of all possible subclasses this class can specialize in.
     */
    subclasses: BaseResourceApiDto[];
}

export interface MultiClassingApiDto {

    /**
     * List of prerequisites that must be met.
     */
    prerequisites: PrerequisiteApiDto[];

    /**
     * List of choices of prerequisites to meet for.
     */
    prerequisite_options: ChoiceApiDto;

    /**
     * List of proficiencies available when multi-classing.
     */
    proficiencies: BaseResourceApiDto[];

    /**
     * List of choices of proficiencies that are given when multi-classing.
     */
    proficiency_choices: ChoiceApiDto[];
}

export interface PrerequisiteApiDto {

    /**
     * The ability score that must have a minimum score to multi-class.
     */
    ability_score: BaseResourceApiDto;

    /**
     * Minimum score to meet the prerequisite.
     */
    minimum_score: number;
}

export interface SpellCastingApiDto {

    /**
     * Level at which the class can start using its spellcasting abilities.
     */
    level: number;

    /**
     * Descriptions of the class' ability to cast spells.
     */
    info: SpellCastingInfoApiDto[];

    /**
     * Reference to the AbilityScore used for spellcasting by the class.
     */
    spellcasting_ability: BaseResourceApiDto;
}

export interface SpellCastingInfoApiDto {
    name: string;
    desc: string[];
}

export interface StartingEquipmentApiDto {

    /**
     * Number of pieces of equipment is given.
     */
    quantity: number;

    /**
     * Information about the equipment.
     */
    equipment: BaseResourceApiDto;
}