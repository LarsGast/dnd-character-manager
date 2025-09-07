import { Equipment } from "./Equipment.js";

export class Armor extends Equipment {

    /**
     * Category of armor, such as "Light", "Medium", and "Heavy".
     */
    armor_category: string;

    /**
     * The base armor class of the armor. Can be used to calculate effective armor class.
     */
    armor_class: ArmorClass;

    /**
     * The minimum STR score required to don this armor.
     */
    str_minimum: number;

    /**
     * If wearing this armor imposes disadvantage on stealth checks.
     */
    stealth_disadvantage: boolean;

    /**
     * Constructor.
     * @param data Full object as specified in the 5e SRD API.
     */
    constructor(data: Partial<Armor> = {}) {
        super(data);

        this.armor_category = data.armor_category ?? "";
        this.armor_class = data.armor_class ? new ArmorClass(data.armor_class) : new ArmorClass({ base: 0, dex_bonus: false });
        this.str_minimum = data.str_minimum ?? 0;
        this.stealth_disadvantage = data.stealth_disadvantage ?? false;        
    }
}

/**
 * Holds information about the armor class of a piece of armor.
 */
class ArmorClass {

    /**
     * Base AC every character gets while wearing the armor.
     */
    base: number;

    /**
     * Wether a DEX bonus applies to the armor.
     */
    dex_bonus: boolean;

    /**
     * The maximum amount of DEX bonus the armor gets.
     * undefined if dex_bonus is false or it has no maximum.
     */
    max_bonus: number | undefined;

    /**
     * Constructor.
     * @param data Full object as specified in the 5e SRD API.
     */
    constructor(data: Partial<ArmorClass> = {}) {
        this.base = data.base ?? 0;
        this.dex_bonus = data.dex_bonus ?? false;
        this.max_bonus = data.max_bonus ?? undefined;
    }

    getDisplayString() {
        let displayString = `${this.base}`;

        if (this.dex_bonus) {
            displayString += ' + DEX';

            if (this.max_bonus) {
                displayString += ` (max ${this.max_bonus})`;
            }
        }

        return displayString;
    }

    getEffectiveArmorClass(dexModifier: number) {
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