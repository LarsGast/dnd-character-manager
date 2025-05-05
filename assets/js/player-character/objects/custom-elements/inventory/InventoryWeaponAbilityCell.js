import { Weapon } from "../../api/resources/equipment/Weapon.js";
import { getSelectOption } from "../../../util.js";
import { globals } from "../../../load-page.js";

/**
 * Custom table cell element that displays or allows selection of the ability used for weapon attacks.
 * Extends HTMLTableCellElement.
 *
 * If the weapon supports multiple abilities (e.g., STR or DEX), a select dropdown is displayed.
 * Otherwise, the default ability is displayed as plain text.
 *
 * When the select value changes, the active player's inventory is updated and an "inventoryWeaponAbilityChanged" event is dispatched.
 */
export class InventoryWeaponAbilityCell extends HTMLTableCellElement {

    /**
     * Creates an instance of InventoryWeaponAbilityCell.
     * @param {Weapon} weapon The weapon object.
     * @param {number} rowIndex The index of the weapon in the global inventory.
     */
    constructor(weapon, rowIndex) {
        super();

        this.weapon = weapon;
        this.rowIndex = rowIndex;
        
        // If the weapon offers a choice between abilities.
        if (this.weapon.hasMultipleAbilities()) {

            // Create a select element for choosing ability ("STR" or "DEX").
            this.select = document.createElement('select');
            this.select.appendChild(getSelectOption("STR", "str"));
            this.select.appendChild(getSelectOption("DEX", "dex"));

            // Set the default ability from the active PC's current inventory.
            this.select.value = this.getDefaultAbility();

            // Append the select to the cell.
            this.appendChild(this.select);

            // Listen for changes in the select element.
            this.select.onchange = () => this.handleChange();
        }
        else {
            // If only one default ability is supported, simply display it.
            this.textContent = this.getDefaultAbility().toUpperCase();
        }
    }

    /**
     * Handles changes to the ability select element.
     * Updates the active player's inventory weapon entry with the new ability, and dispatches a custom "inventoryWeaponAbilityChanged" event with details.
     */
    handleChange() {
        globals.activePlayerCharacter.editWeaponAbility(this.rowIndex, this.select.value);

        document.dispatchEvent(new CustomEvent("inventoryWeaponAbilityChanged", {
            detail: { 
                index: this.rowIndex 
            },
            bubbles: true
        }));
    }

    /**
     * Retrieves the default ability for the weapon from the active player's inventory.
     * @returns {string} The current ability value (e.g., "str" or "dex").
     */
    getDefaultAbility() {
        const inventoryWeapon = globals.activePlayerCharacter.inventoryWeapons[this.rowIndex];
        return inventoryWeapon.ability;
    }
}

// Register the custom element, specifying that it extends the "td" element.
customElements.define("inventory-weapon-ability-cell", InventoryWeaponAbilityCell, { extends: 'td' });