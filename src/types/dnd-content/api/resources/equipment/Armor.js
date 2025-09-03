import { Equipment } from "./Equipment.js";

export class Armor extends Equipment {

    /**
     * Category of armor, such as "Light", "Medium", and "Heavy".
     * @type {string}
     */
    armor_category;

    /**
     * The base armor class of the armor. Can be used to calculate effective armor class.
     * @type {ArmorClass}
     */
    armor_class;

    /**
     * The minimum STR score required to don this armor.
     * @type {number}
     */
    str_minimum;

    /**
     * If wearing this armor imposes disadvantage on stealth checks.
     * @type {boolean}
     */
    stealth_disadvantage;

    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
        this.armor_class = new ArmorClass(this.armor_class);
    }
}

/**
 * Holds information about the armor class of a piece of armor.
 */
class ArmorClass {

    /**
     * Base AC every character gets while wearing the armor.
     * @type {number}
     */
    base;

    /**
     * Wether a DEX bonus applies to the armor.
     * @type {boolean}
     */
    dex_bonus;

    /**
     * The maximum amount of DEX bonus the armor gets.
     * undefined if dex_bonus is false or it has no maximum.
     * @type {number}
     */
    max_bonus;

    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        Object.assign(this, data);
    }

    getDisplayString() {
        let displayString = this.base;

        if (this.dex_bonus) {
            displayString += ' + DEX';

            if (this.max_bonus) {
                displayString += ` (max ${this.max_bonus})`;
            }
        }

        return displayString;
    }

    getEffectiveArmorClass(dexModifier) {
        let armorClass = this.base;

        if (this.dex_bonus) {

            let bonusFromDex = dexModifier;

            if (this.max_bonus && dexModifier > this.max_bonus) {
                bonusFromDex = this.max_bonus;
            }

            armorClass += bonusFromDex;
        }

        return armorClass;
    }
}