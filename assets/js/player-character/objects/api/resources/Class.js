import { ApiCategory } from "../../../api.js";
import { ApiBaseObject } from "./ApiBaseObject.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";
import { Choice } from "../helpers/Choice.js";
import { Feature } from "../helpers/Feature.js";

export class Class extends ApiBaseObject {

    static apiCategory = ApiCategory.Classes;

    /**
     * Hit die of the class. (ex: 12 == 1d12).
     * @type {number}
     */
    hit_die;

    /**
     * URL of the level resource for the class.
     * @type {string}
     */
    class_levels;

    /**
     * All information regarding multi-classing into and out of this class.
     * @type {MultiClassing}
     */
    multi_classing;

    /**
     * All information regarding spellcasting that this class has access to.
     * @type {SpellCasting}
     */
    spellcasting;

    /**
     * URL of the spell resource list for the class.
     * @type {string}
     */
    spells;

    /**
     * List of equipment and their quantities all players of the class start with.
     * @type {StartingEquipment[]}
     */
    starting_equipment;

    /**
     * List of choices of starting equipment.
     * @type {Choice[]}
     */
    starting_equipment_options;

    /**
     * List of choices of starting proficiencies.
     * @type {Choice[]}
     */
    proficiency_choices;

    /**
     * List of starting proficiencies for all new characters of this class.
     * @type {ApiObjectInfo[]}
     */
    proficiencies;

    /**
     * Saving throws the class is proficient in.
     * @type {ApiObjectInfo[]}
     */
    saving_throws;

    /**
     * List of all possible subclasses this class can specialize in.
     * @type {ApiObjectInfo[]}
     */
    subclasses;
        
    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }
}

class MultiClassing {

    /**
     * List of prerequisites that must be met.
     * @type {Prerequisite[]}
     */
    prerequisites;

    /**
     * List of choices of prerequisites to meet for.
     * @type {Choice[]}
     */
    prerequisite_options;

    /**
     * List of proficiencies available when multi-classing.
     * @type {ApiObjectInfo[]}
     */
    proficiencies;

    /**
     * List of choices of proficiencies that are given when multi-classing.
     * @type {Choice[]}
     */
    proficiency_choices;
}

class Prerequisite {

    /**
     * The ability score that must have a minimum score to multi-class.
     * @type {ApiObjectInfo}
     */
    ability_score;

    /**
     * Minimum score to meet the prerequisite.
     * @type {number}
     */
    minimum_score;
}

class SpellCasting {

    /**
     * Level at which the class can start using its spellcasting abilities.
     * @type {number}
     */
    level;

    /**
     * Descriptions of the class' ability to cast spells.
     * @type {Feature}
     */
    info;

    /**
     * Reference to the AbilityScore used for spellcasting by the class.
     * @type {ApiObjectInfo}
     */
    spellcasting_ability;
}

class StartingEquipment {

    /**
     * Number of pieces of equipment is given.
     * @type {number}
     */
    quantity;

    /**
     * Information about the equipment.
     * @type {ApiObjectInfo}
     */
    equipment;
}