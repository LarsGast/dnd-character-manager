import { Weapon } from "../../../../../../../types/api/resources/Weapon.js";
import { getSelectOption } from "../../../../../../../utils/util.js";
import { globals } from "../../../../../../../store/load-globals.js";

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
    weapon: Weapon;
    rowIndex: number;
    select?: HTMLSelectElement;

    /**
     * Creates an instance of InventoryWeaponAbilityCell.
     * @param weapon The weapon object.
     * @param rowIndex The index of the weapon in the global inventory.
     */
    constructor(weapon: Weapon, rowIndex: number) {
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
    handleChange(): void {
        globals.activePlayerCharacter.editWeaponAbility(this.rowIndex, this.select!.value);

        document.dispatchEvent(new CustomEvent("inventoryWeaponAbilityChanged", {
            detail: { 
                index: this.rowIndex 
            },
            bubbles: true
        }));
    }

    /**
     * Retrieves the default ability for the weapon from the active player's inventory.
     * @returns The current ability value (e.g., "str" or "dex").
     */
    getDefaultAbility(): string {
        const inventoryWeapon = globals.activePlayerCharacter.inventoryWeapons[this.rowIndex];
        return (inventoryWeapon as any).ability;
    }
}

// Register the custom element, specifying that it extends the "td" element.
customElements.define("inventory-weapon-ability-cell", InventoryWeaponAbilityCell, { extends: 'td' });