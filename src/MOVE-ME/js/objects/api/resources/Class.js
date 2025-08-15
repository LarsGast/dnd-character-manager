import { ApiCategory, getApiResultsAsync } from "../../../api.js";
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

    /**
     * Get a ClassLevel object that is a part of this class.
     * @param {number} level
     * @returns {Promise<ClassLevel>}
     */
    async getLevelAsync(level) {
        return await ClassLevel.getClassLevelAsync(this.index, level);
    }
}

class ClassLevel extends ApiBaseObject {
    
    /**
     * The number value for the current level object.
     * @type {number}
     */
    level;
    
    /**
     * Total number of ability score bonuses gained, added from previous levels.
     * @type {number}
     */
    ability_score_bonuses;
    
    /**
     * Proficiency bonus for this class at the specified level.
     * @type {number}
     */
    prof_bonus;
    
    /**
     * Features automatically gained at this level.
     * @type {ApiBaseObject[]}
     */
    features;
    
    /**
     * Summary of spells known at this level.
     * @type {object}
     */
    spellcasting;
    
    /**
     * Class specific information such as dice values for bard songs and number of warlock invocations.
     * @type {any}
     */
    class_specific;
    
    /**
     * The class that this level is a part of.
     * @type {ApiBaseObject}
     */
    class;

    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }

    /**
     * Get a ClassLevel object based on the given class and level.
     * @param {string} classIndex 
     * @param {number} level 
     * @returns {Promise<ClassLevel>}
     */
    static async getClassLevelAsync(classIndex, level) {
        return new this(await getApiResultsAsync(ApiCategory.Classes, `${classIndex}/levels/${level}`));
    }

    /**
     * Get the full object of all subraces linked to this race.
     * @returns {Promise<Feature[]>}
     */
    async getAllFeaturesAsync() {
        return Promise.all(this.features.map(featureInfo => Feature.getAsync(featureInfo.index)));
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