import { ApiObjectInfo } from "../wrappers/ApiObjectInfo.js";
import { Equipment } from "./Equipment.js";

export interface Weapon extends Equipment {

    /**
     * Category of weapon, such as "Martial" and "Simple".
     */
    weapon_category: string;

    /**
     * Range as a string, such as "Melee" and "Ranged".
     */
    weapon_range: string;

    /**
     * weapon_category combined with weapon_range in a single string.
     */
    category_range: string;

    /**
     * Information about the damage this weapon deals.
     * undefined for nets.
     */
    damage: Damage | undefined;

    /**
     * Information about the range (in feet) this weapon has.
     */
    range: Range;

    /**
     * Information about the throwing range (in feet) this weapon has.
     * undefined if the weapon cannot be thrown.
     */
    throw_range: Range | undefined;

    /**
     * Extra properties this weapon has.
     */
    properties: ApiObjectInfo[];
}

interface Damage {

    /**
     * The dice used for rolling for damage.
     */
    damage_dice: string;

    /**
     * The type of damage that is dealt.
     */
    damage_type: ApiObjectInfo
}

interface Range {

    /**
     * The normal range of the weapon in feet.
     * Multiple of 5.
     * No disadvantage will be imposed when using this range.
     */
    normal: number;

    /**
     * The long range of the weapon in feet.
     * Multiple of 5.
     * Disadvantage will be imposed when using this range.
     * Cannot attack past this range.
     * undefined for non-thrown melee weapons.
     */
    long: number;
}