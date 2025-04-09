import { Armor } from "../../api/resources/equipment/Armor.js";
import { InventoryArmorButtonsCell } from "./InventoryArmorButtonsCell.js";
import { InventoryArmorEffectiveArmorClassCell } from "./InventoryArmorEffectiveArmorClassCell.js";

/**
 * Custom table row element that displays an inventory armor entry.
 * Extends HTMLTableRowElement.
 *
 * This element creates table cells for various armor properties (name, type, strength requirement, stealth disadvantage, armor class, effective armor class, and weight) and includes action buttons.
 */
export class InventoryArmorRow extends HTMLTableRowElement {

    /**
     * Creates an instance of InventoryArmorRow.
     * @param {Armor} armor The armor object to be displayed.
     */
    constructor(armor) {
        super();

        /** @type {Armor} */
        this.armor = armor;
    }
    
    /**
     * Called when the element is connected to the DOM.
     * Initializes table cells with armor properties and appends them to the row.
     */
    connectedCallback() {

        // Create and populate cell for the armor name.
        this.nameCell = document.createElement('td');
        this.nameCell.headers = 'armor_name';
        this.nameCell.textContent = this.armor.name;

        // Create and populate cell for the armor type.
        this.typeCell = document.createElement('td');
        this.typeCell.headers = 'armor_type';
        this.typeCell.textContent = this.armor.armor_category;

        // Create and populate cell for strength requirement.
        // Display "-" if no minimum strength is required.
        this.strengthCell = document.createElement('td');
        this.strengthCell.headers = 'armor_strength-requirement';
        this.strengthCell.textContent = this.armor.str_minimum === 0 ? "-" : this.armor.str_minimum;

        // Create and populate cell for stealth disadvantage.
        this.stealthCell = document.createElement('td');
        this.stealthCell.headers = 'armor_disadvantage-on-stealth';
        this.stealthCell.textContent = this.armor.stealth_disadvantage ? "Disadvantage" : "-";

        // Create and populate cell for base armor class.
        this.armorClassCell = document.createElement('td');
        this.armorClassCell.headers = 'armor_armor-class';
        this.armorClassCell.textContent = this.armor.armor_class.getDisplayString();

        // Create cell for effective armor class using the custom element.
        this.effectiveArmorClassCell = new InventoryArmorEffectiveArmorClassCell(this.armor);
        this.effectiveArmorClassCell.headers = 'armor_effective-armor-class';

        // Create and populate cell for weight.
        this.weightCell = document.createElement('td');
        this.weightCell.headers = 'armor_weight';
        this.weightCell.textContent = this.armor.weight;

        // Create a buttons cell to hold action buttons.
        // Note: Using rowIndex - 1 since the fist non-header row of the table starts at index 1.
        // The index used in the parameter here should be the index of the object within the inventory data on globalPlayerCharacter.
        this.buttonsCell = new InventoryArmorButtonsCell(this.armor, this.rowIndex - 1);
        this.buttonsCell.headers = 'armor_buttons';

        // Append all cells to the row.
        this.appendChild(this.nameCell);
        this.appendChild(this.typeCell);
        this.appendChild(this.strengthCell);
        this.appendChild(this.stealthCell);
        this.appendChild(this.armorClassCell);
        this.appendChild(this.effectiveArmorClassCell);
        this.appendChild(this.weightCell);
        this.appendChild(this.buttonsCell);
    }
}

// Register the custom element, extending the built-in "tr" element.
customElements.define("inventory-armor-row", InventoryArmorRow, { extends: 'tr' });