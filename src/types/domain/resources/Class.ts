import { BaseResource } from "../wrappers/BaseResource.js";
import { Choice } from "../helpers/Choice.js";

export interface Class extends BaseResource {

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
    multi_classing: MultiClassing;

    /**
     * All information regarding spellcasting that this class has access to.
     */
    spellcasting: SpellCasting;

    /**
     * URL of the spell resource list for the class.
     */
    spells: string;

    /**
     * List of equipment and their quantities all players of the class start with.
     */
    starting_equipment: StartingEquipment[];

    /**
     * List of choices of starting equipment.
     */
    starting_equipment_options: Choice[];

    /**
     * List of choices of starting proficiencies.
     */
    proficiency_choices: Choice[];

    /**
     * List of starting proficiencies for all new characters of this class.
     */
    proficiencies: BaseResource[];

    /**
     * Saving throws the class is proficient in.
     */
    saving_throws: BaseResource[];

    /**
     * List of all possible subclasses this class can specialize in.
     */
    subclasses: BaseResource[];
}

interface MultiClassing {

    /**
     * List of prerequisites that must be met.
     */
    prerequisites: Prerequisite[];

    /**
     * List of choices of prerequisites to meet for.
     */
    prerequisite_options: Choice;

    /**
     * List of proficiencies available when multi-classing.
     */
    proficiencies: BaseResource[];

    /**
     * List of choices of proficiencies that are given when multi-classing.
     */
    proficiency_choices: Choice[];
}

interface Prerequisite {

    /**
     * The ability score that must have a minimum score to multi-class.
     */
    ability_score: BaseResource;

    /**
     * Minimum score to meet the prerequisite.
     */
    minimum_score: number;
}

interface SpellCasting {

    /**
     * Level at which the class can start using its spellcasting abilities.
     */
    level: number;

    /**
     * Descriptions of the class' ability to cast spells.
     */
    info: SpellCastingInfo[];

    /**
     * Reference to the AbilityScore used for spellcasting by the class.
     */
    spellcasting_ability: BaseResource;
}

interface SpellCastingInfo {
    name: string;
    desc: string[];
}

interface StartingEquipment {

    /**
     * Number of pieces of equipment is given.
     */
    quantity: number;

    /**
     * Information about the equipment.
     */
    equipment: BaseResource;
}