import { ApiCategory, getApiResultsAsync } from "../../../services/api.js";
import { ApiBaseObject } from "./ApiBaseObject.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";
import { Choice } from "../helpers/Choice.js";
import { Feature } from "../helpers/Feature.js";

export class Class extends ApiBaseObject {

    static override apiCategory = ApiCategory.Classes;

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
    proficiencies: ApiObjectInfo[];

    /**
     * Saving throws the class is proficient in.
     */
    saving_throws: ApiObjectInfo[];

    /**
     * List of all possible subclasses this class can specialize in.
     */
    subclasses: ApiObjectInfo[];
        
    /**
     * Constructor.
     * @param data Full object as specified in the 5e SRD API.
     */
    constructor(data: Partial<Class> = {}) {
        super(data);
        
        this.hit_die = data.hit_die ?? 0;
        this.class_levels = data.class_levels ?? "";
        this.multi_classing = data.multi_classing ? new MultiClassing(data.multi_classing) : new MultiClassing();
        this.spellcasting = data.spellcasting ? new SpellCasting(data.spellcasting) : new SpellCasting();
        this.spells = data.spells ?? "";
        this.starting_equipment = (data.starting_equipment ?? []).map(se => (new StartingEquipment(se)));
        this.starting_equipment_options = (data.starting_equipment_options ?? []).map(ce => new Choice(ce));
        this.proficiency_choices = (data.proficiency_choices ?? []).map(pc => new Choice(pc));
        this.proficiencies = (data.proficiencies ?? []).map(p => new ApiObjectInfo(p));
        this.saving_throws = (data.saving_throws ?? []).map(st => new ApiObjectInfo(st));
        this.subclasses = (data.subclasses ?? []).map(sc => new ApiObjectInfo(sc));
    }

    /**
     * Get a ClassLevel object that is a part of this class.
     * @param level
     * @returns
     */
    async getLevelAsync(level: number): Promise<ClassLevel> {
        return await ClassLevel.getClassLevelAsync(this.index, level);
    }
}

class ClassLevel extends ApiBaseObject {
    
    /**
     * The number value for the current level object.
     */
    level: number;
    
    /**
     * Total number of ability score bonuses gained, added from previous levels.
     */
    ability_score_bonuses: number;
    
    /**
     * Proficiency bonus for this class at the specified level.
     */
    prof_bonus: number;
    
    /**
     * Features automatically gained at this level.
     */
    features: ApiObjectInfo[];
    
    /**
     * Summary of spells known at this level.
     */
    spellcasting: object;
    
    /**
     * Class specific information such as dice values for bard songs and number of warlock invocations.
     */
    class_specific: any;
    
    /**
     * The class that this level is a part of.
     */
    class: ApiObjectInfo;

    /**
     * Constructor.
     * @param  data Full object as specified in the 5e SRD API.
     */
    constructor(data: Partial<ClassLevel> = {}) {
        super(data);
        
        this.level = data.level ?? 0;
        this.ability_score_bonuses = data.ability_score_bonuses ?? 0;
        this.prof_bonus = data.prof_bonus ?? 0;
        this.features = (data.features ?? []).map(f => new ApiObjectInfo(f));
        this.spellcasting = data.spellcasting ?? {};
        this.class_specific = data.class_specific ?? {};
        this.class = data.class ? new ApiObjectInfo(data.class) : new ApiObjectInfo();
    }

    /**
     * Get a ClassLevel object based on the given class and level.
     * @param classIndex 
     * @param level 
     * @returns
     */
    static async getClassLevelAsync(classIndex: string, level: number): Promise<ClassLevel> {
        return new this(await getApiResultsAsync(ApiCategory.Classes, `${classIndex}/levels/${level}`));
    }

    /**
     * Get the full object of all subraces linked to this race.
     * @returns
     */
    async getAllFeaturesAsync(): Promise<Feature[]> {
        return Promise.all(this.features.map(featureInfo => ApiBaseObject.getAsync(featureInfo.index, Feature)));
    }
}

class MultiClassing {

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
    proficiencies: ApiObjectInfo[];

    /**
     * List of choices of proficiencies that are given when multi-classing.
     */
    proficiency_choices: Choice[];

    constructor(data: Partial<MultiClassing> = {}) {
        this.prerequisites = (data.prerequisites ?? []).map(pr => new Prerequisite(pr));
        this.prerequisite_options = data.prerequisite_options ? new Choice(data.prerequisite_options) : new Choice();
        this.proficiencies = (data.proficiencies ?? []).map(p => new ApiObjectInfo(p));
        this.proficiency_choices = (data.proficiency_choices ?? []).map(pc => new Choice(pc));
    }
}

class Prerequisite {

    /**
     * The ability score that must have a minimum score to multi-class.
     */
    ability_score: ApiObjectInfo;

    /**
     * Minimum score to meet the prerequisite.
     */
    minimum_score: number;

    constructor(data: Partial<Prerequisite> = {}) {
        this.ability_score = data.ability_score ? new ApiObjectInfo(data.ability_score) : new ApiObjectInfo();
        this.minimum_score = data.minimum_score ?? 0;
    }
}

class SpellCasting {

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
    spellcasting_ability: ApiObjectInfo;

    constructor(data: Partial<SpellCasting> = {}) {
        this.level = data.level ?? 0;
        this.info = (data.info ?? []).map(i => new SpellCastingInfo(i));
        this.spellcasting_ability = data.spellcasting_ability ? new ApiObjectInfo(data.spellcasting_ability) : new ApiObjectInfo();
    }
}

class SpellCastingInfo {
    name: string;
    desc: string[];

    constructor(data: Partial<SpellCastingInfo> = {}) {
        this.name = data.name ?? "";
        this.desc = data.desc ?? [];
    }
}

class StartingEquipment {

    /**
     * Number of pieces of equipment is given.
     */
    quantity: number;

    /**
     * Information about the equipment.
     */
    equipment: ApiObjectInfo;

    constructor(data: Partial<StartingEquipment> = {}) {
        this.quantity = data.quantity ?? 0;
        this.equipment = data.equipment ? new ApiObjectInfo(data.equipment) : new ApiObjectInfo();
    }
}