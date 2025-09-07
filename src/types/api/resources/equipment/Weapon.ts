import { ApiObjectInfo } from "../ApiObjectInfo.js";
import { Equipment } from "./Equipment.js";

export class Weapon extends Equipment {

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

    /**
     * Constructor.
     * @param data Full object as specified in the 5e SRD API.
     */
    constructor(data: Partial<Weapon> = {}) {
        super(data);

        this.weapon_category = data.weapon_category ?? "";
        this.weapon_range = data.weapon_range ?? "";
        this.category_range = data.category_range ?? "";
        this.damage = data.damage ? new Damage(data.damage) : new Damage();
        this.range = data.range ? new Range(data.range) : new Range();
        this.throw_range = data.throw_range ? new Range(data.throw_range) : undefined;
        this.properties = (data.properties ?? []).map(property => new ApiObjectInfo(property));
    }

    hasMultipleAbilities() {
        return this.properties.some(property => property.index === "finesse");
    }

    getStandardAbility() {
        if (this.weapon_range === "Melee") {
            return "str";
        }

        return "dex";
    }
}

class Damage {

    /**
     * The dice used for rolling for damage.
     */
    damage_dice: string;

    /**
     * The type of damage that is dealt.
     */
    damage_type: ApiObjectInfo

    constructor(data: Partial<Damage> = {}) {
        this.damage_dice = data.damage_dice ?? "";
        this.damage_type = data.damage_type ? new ApiObjectInfo(data.damage_type) : new ApiObjectInfo();
    }
}

class Range {

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

    constructor(data: Partial<Range> = {}) {
        this.normal = data.normal ?? 0;
        this.long = data.long ?? 0;
    }
}