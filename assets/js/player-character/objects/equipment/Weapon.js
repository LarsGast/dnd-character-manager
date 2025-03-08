import { ApiObjectInfo } from "../ApiObjectInfo.js";
import { Equipment } from "./Equipment.js";

export class Weapon extends Equipment {

    /**
     * Category of weapon, such as "Martial" and "Simple".
     * @type {string}
     */
    weapon_category;

    /**
     * Range as a string, such as "Melee" and "Ranged".
     * @type {string}
     */
    weapon_range;

    /**
     * weapon_category combined with weapon_range in a single string.
     * @type {string}
     */
    category_range;

    /**
     * Information about the damage this weapon deals.
     * undefined for nets.
     * @type {Damage}
     */
    damage;

    /**
     * Information about the range (in feet) this weapon has.
     * @type {Range}
     */
    range;

    /**
     * Information about the throwing range (in feet) this weapon has.
     * undefined if the weapon cannot be thrown.
     * @type {Range}
     */
    throw_range;

    /**
     * Extra properties this weapon has.
     * @type {ApiObjectInfo[]}
     */
    properties;

    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }
}

class Damage {

    /**
     * The dice used for rolling for damage.
     * @type {string}
     */
    damage_dice;

    /**
     * The type of damage that is dealt.
     * @type {ApiObjectInfo}
     */
    damage_type
}

class Range {

    /**
     * The normal range of the weapon in feet.
     * Multiple of 5.
     * No disadvantage will be imposed when using this range.
     * @type {number}
     */
    normal;

    /**
     * The long range of the weapon in feet.
     * Multiple of 5.
     * Disadvantage will be imposed when using this range.
     * Cannot attack past this range.
     * undefined for non-thrown melee weapons.
     * @type {number}
     */
    long;
}