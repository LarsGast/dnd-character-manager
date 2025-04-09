import { Armor } from "../../api/resources/equipment/Armor.js";
import { ArmorProficiencyCheckbox } from "./ArmorProficiencyCheckbox.js";

/**
 * Custom list item element for displaying an armor proficiency option.
 * Extends the built-in HTMLLIElement.
 *
 * This element creates a labeled checkbox (using ArmorProficiencyCheckbox) alongside the name of the armor for visual display.
 */
export class ArmorProficiencyDisplay extends HTMLLIElement {

    /**
     * Create an ArmorProficiencyDisplay.
     * @param {Armor} armor An Armor object representing the armor to display.
     */
    constructor(armor) {
        super();

        /** @type {Armor} */
        this.armor = armor;

        // Create the proficiency checkbox for the given armor.
        this.proficiencyCheckbox = new ArmorProficiencyCheckbox(this.armor);
        
        // Create a label element and append the checkbox and armor name.
        this.armorProficiencyLabel = document.createElement('label');
        this.armorProficiencyLabel.appendChild(this.proficiencyCheckbox);
        this.armorProficiencyLabel.appendChild(document.createTextNode(this.armor.name));

        // Add the label to the list item.
        this.appendChild(this.armorProficiencyLabel);
    }
}

// Define the custom element, extending the built-in "li" element.
customElements.define('armor-proficiency-display', ArmorProficiencyDisplay, { extends: 'li' });