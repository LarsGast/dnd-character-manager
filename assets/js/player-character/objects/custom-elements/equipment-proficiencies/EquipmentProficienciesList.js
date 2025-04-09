import { Armor } from "../../api/resources/equipment/Armor.js";
import { Weapon } from "../../api/resources/equipment/Weapon.js";
import { EquipmentCategory } from "../../api/resources/EquipmentCategory.js";
import { ArmorProficiencyDisplay } from "./ArmorProficiencyDisplay.js";
import { WeaponProficiencyDisplay } from "./WeaponProficiencyDisplay.js";

/**
 * Custom unordered list element for displaying equipment proficiencies.
 * Extends the built-in HTMLUListElement.
 *
 * Depending on the type (armor or weapon), this component dynamically loads and appends either ArmorProficiencyDisplay or WeaponProficiencyDisplay items.
 */
export class EquipmentProficienciesList extends HTMLUListElement {

    /**
     * Create an EquipmentProficienciesList.
     *
     * Attributes:
     *   - equipmentCategoryIndex: The index used to fetch equipment items.
     *   - isArmor: String "true" or "false" to decide if this list is for armor.
     */
    constructor() {
        super();
        
        // Attributes stored on the element for fetching data.
        this.equipmentCategoryIndex = this.getAttribute("equipmentCategoryIndex");
        this.isArmor = this.getAttribute("isArmor");

        // Setup base CSS classes for list styling.
        this.classList.add('no-style-list', 'proficiencies-list');
    }

    /**
     * Called when the element is inserted into the DOM.
     * Fetches the equipment data and populates the list with the corresponding proficiency displays. 
     * Adds a CSS class based on the number of equipment items.
     */
    async connectedCallback() {

        // Fetch equipment information based on the category index.
        const results = await EquipmentCategory.getAsync(this.equipmentCategoryIndex);

        // Iterate over each equipment item to create and append the display component.
        for (const equipmentInfo of results.equipment) {
            if (this.isArmor === "true") {
                const armor = await Armor.getAsync(equipmentInfo.index);
                this.appendChild(new ArmorProficiencyDisplay(armor));
            } else {
                const weapon = await Weapon.getAsync(equipmentInfo.index);
                this.appendChild(new WeaponProficiencyDisplay(weapon));
            }
        }

        // Apply a CSS class to manage the number of columns based on item count.
        this.classList.add(this.getNumberOfColumnsClassName(results.equipment.length));
    }

    /**
     * Get the appropriate number-of-columns class name for styling.
     * @param {number} listLength The total number of equipment items.
     * @returns {string} The CSS class name defining column layout.
     */
    getNumberOfColumnsClassName(listLength) {
        if (listLength >= 9) {
            return 'three-columns-list';
        }
    
        if (listLength >= 4) {
            return 'two-columns-list';
        }
    }
}

// Define the custom element, extending the built-in "ul" element.
customElements.define('equipment-proficiencies-list', EquipmentProficienciesList, { extends: 'ul' });