import { ApiObjectInfo } from "../wrappers/ApiObjectInfo.js";

/**
 * Object for storing information about a choice the player is given when gaining a new feature.
 */
export interface Choice {
    
    /**
     * Description of the choice to be made.
     */
    desc: string;
    
    /**
     * How many of the choices can be chosen.
     */
    choose: number;
    
    /**
     * The type of object that is being chosen.
     * Examples: proficiencies, languages.
     */
    type: string;
    
    /**
     * The options to choose from.
     */
    from: OptionSet;
}

/**
 * Object for storing information about the specific choices a player can make when gaining a feature that let's them choose.
 */
export interface OptionSet {
    
    /**
     * Type of option set.
     * Can be options_array for an array of objects, equipment_category for a collection of equipments, or resource_list for only the reference to the object.
     */
    option_set_type: string;

    /**
     * A URL leading to all options.
     * undefined if option_set_type is not resource_list_url.
     */
    resource_list_url: string;

    /**
     * Object with information about the equipment category of the choice.
     * undefined if option_set_type is not equipment_category.
     */
    equipment_category: string;

    /**
     * The options to choose from.
     * undefined if option_set_type is not options_array.
     */
    options: Option[];
}

/**
 * Option that the player can choose from when gaining a feature that let's them choose.
 */
export interface Option {
    
    /**
     * Indicates the structure of the option.
     * The value of this attribute indicates how the option should be handled, and each type has different attributes.
     * The possible values and their corresponding attributes are listed below.
     * - reference - A terminal option. Contains a reference to a Document that can be added to the list of options chosen.
     *   - item
     * - action - A terminal option. Contains information describing an action, for use within Multiattack actions.
     *   - action_name
     *   - count
     *   - type
     * - multiple - When this option is chosen, all of its child options are chosen, and must be resolved the same way as a normal option.
     *   - items
     * - choice - A nested choice. If this option is chosen, the Choice structure contained within must be resolved like a normal Choice structure, and the results are the chosen options. 
     *   - choice
     * - string - A terminal option. Contains a reference to a string. 
     *   - string
     * - ideal - A terminal option. Contains information about an ideal. 
     *   - desc
     *   - alignments
     * - counted_reference - A terminal option. Contains a reference to something else in the API along with a count. 
     *   - count
     *   - of
     * - score_prerequisite - A terminal option. Contains a reference to an ability score and a minimum score. 
     *   - ability_score
     *   - minimum_score
     * - ability_bonus - A terminal option. Contains a reference to an ability score and a bonus 
     *   - ability_score
     *   - bonus
     * - breath - A terminal option: Contains a reference to information about a breath attack. 
     *   - name
     *   - dc
     *   - damage
     * - damage - A terminal option. Contains information about damage. 
     *   - damage_type
     *   - damage_dice
     *   - notes
     */
    option_type: string;
    
    /**
     * Reference to the object in the API of the actual choice.
     */
    item: ApiObjectInfo;

    /**
     * The name of the action, according to its `name` attribute.
     */
    action_name: string;

    /**
     * The number of times this action can be repeated if this option is chosen.
     */
    count: string | number;

    /**
     * For attack actions that can be either melee, ranged, abilities, or magic.
     */
    type: string | undefined;

    /**
     * An array of Option objects. All of them must be taken if the option is chosen.
     */
    items: Option[];

    /**
     * The Choice to resolve.
     */
    choice: Choice;

    /**
     * The string.
     */
    string: string;

    /**
     * A description of the ideal.
     */
    desc: string;

    /**
     *  A list of alignments of those who might follow the ideal.
     */
    alignments: ApiObjectInfo[];

    /**
     * Thing being referenced.
     */
    of: ApiObjectInfo;

    /**
     * Ability score being referenced.
     */
    ability_score: ApiObjectInfo;

    /**
     * The minimum score required to satisfy the prerequisite.
     */
    minimum_score: number;

    /**
     * The bonus being applied to the ability score.
     */
    bonus: number;

    /**
     * Name of the breath.
     */
    name: string;

    /**
     * Difficulty check of the breath attack.
     */
    dc: number;

    /**
     * Damage dealt by the breath attack, if any.
     */
    damage: string;

    /**
     * Reference to type of damage.
     */
    damage_type: ApiObjectInfo;

    /**
     * Damage expressed in dice (e.g. "13d6").
     */
    damage_dice: string;

    /**
     * Information regarding the damage.
     */
    notes: string;
}