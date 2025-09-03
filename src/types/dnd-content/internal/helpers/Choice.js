import { ApiObjectInfo } from "../resources/ApiObjectInfo.js";

/**
 * Object for storing information about a choice the player is given when gaining a new feature.
 */
export class Choice {
    
    /**
     * Description of the choice to be made.
     * @type {string}
     */
    desc = '';
    
    /**
     * How many of the choices can be chosen.
     * @type {number}
     */
    choose;
    
    /**
     * The type of object that is being chosen.
     * Examples: proficiencies, languages.
     * @type {string}
     */
    type = '';
    
    /**
     * The options to choose from.
     * @type {OptionSet}
     */
    from = new OptionSet();
}

/**
 * Object for storing information about the specific choices a player can make when gaining a feature that let's them choose.
 */
export class OptionSet {
    
    /**
     * Type of option set.
     * Can be options_array for an array of objects, equipment_category for a collection of equipments, or resource_list for only the reference to the object.
     * @type {string}
     */
    option_set_type;

    /**
     * A URL leading to all options.
     * undefined if option_set_type is not resource_list_url.
     * @type {string}
     */
    resource_list_url;

    /**
     * Object with information about the equipment category of the choice.
     * undefined if option_set_type is not equipment_category.
     * @type {string}
     */
    equipment_category;

    /**
     * The options to choose from.
     * undefined if option_set_type is not options_array.
     * @type {Option[]}
     */
    options = [];
}

/**
 * Option that the player can choose from when gaining a feature that let's them choose.
 */
export class Option {
    
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
     * @type {string}
     */
    option_type;
    
    /**
     * Reference to the object in the API of the actual choice.
     * @type {ApiObjectInfo}
     */
    item;

    /**
     * The name of the action, according to its `name` attribute.
     * @type {string}
     */
    action_name;

    /**
     * The number of times this action can be repeated if this option is chosen.
     * @type {string | number}
     */
    count;

    /**
     * For attack actions that can be either melee, ranged, abilities, or magic.
     * @type {string = "melee" | "ranged" | "ability" | "magic"}
     */
    type;

    /**
     * An array of Option objects. All of them must be taken if the option is chosen.
     * @type {Option[]}
     */
    items;

    /**
     * The Choice to resolve.
     * @type {Choice}
     */
    choice;

    /**
     * The string.
     * @type {string}
     */
    string;

    /**
     * A description of the ideal.
     * @type {string}
     */
    desc;

    /**
     *  A list of alignments of those who might follow the ideal.
     * @type {ApiObjectInfo[]}
     */
    alignments;

    /**
     * Thing being referenced.
     * @type {ApiObjectInfo}
     */
    of;

    /**
     * Ability score being referenced.
     * @type {ApiObjectInfo}
     */
    ability_score;

    /**
     * The minimum score required to satisfy the prerequisite.
     * @type {number}
     */
    minimum_score;

    /**
     * The bonus being applied to the ability score.
     * @type {number}
     */
    bonus;

    /**
     * Name of the breath.
     * @type {string}
     */
    name;

    /**
     * Difficulty check of the breath attack.
     * @type {number}
     */
    dc;

    /**
     * Damage dealt by the breath attack, if any.
     * @type {string}
     */
    damage;

    /**
     * Reference to type of damage.
     * @type {ApiObjectInfo}
     */
    damage_type;

    /**
     * Damage expressed in dice (e.g. "13d6").
     * @type {string}
     */
    damage_dice;

    /**
     * Information regarding the damage.
     * @type {string}
     */
    notes;
}