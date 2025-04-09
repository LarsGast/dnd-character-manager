import { Weapon } from "../../api/resources/equipment/Weapon.js";
import { WeaponProficiencyCheckbox } from "./WeaponProficiencyCheckbox.js";

/**
 * Custom list item element for displaying a weapon proficiency option.
 * Extends the built-in HTMLLIElement.
 *
 * This element creates a labeled checkbox (using WeaponProficiencyCheckbox) alongside the weapon's name for a visual representation of proficiency.
 */
export class WeaponProficiencyDisplay extends HTMLLIElement {

    /**
     * Create a WeaponProficiencyDisplay.
     * @param {Weapon} weapon A Weapon object representing the weapon to display.
     */
    constructor(weapon) {
        super();

        /** @type {Weapon} */
        this.weapon = weapon;

        // Create the proficiency checkbox for the given weapon.
        this.proficiencyCheckbox = new WeaponProficiencyCheckbox(this.weapon);

        // Create a label and add both the checkbox and the weapon name.
        this.weaponProficiencyLabel = document.createElement('label');
        this.weaponProficiencyLabel.appendChild(this.proficiencyCheckbox);
        this.weaponProficiencyLabel.appendChild(document.createTextNode(this.weapon.name));

        // Append the label to the list item.
        this.appendChild(this.weaponProficiencyLabel);
    }
}

// Define the custom element, extending the built-in "li" element.
customElements.define('weapon-proficiency-display', WeaponProficiencyDisplay, { extends: 'li' });