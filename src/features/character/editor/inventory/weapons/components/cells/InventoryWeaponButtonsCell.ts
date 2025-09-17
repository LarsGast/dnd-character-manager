import { globals } from "../../../../../../../store/load-globals.js";
import { Weapon } from "../../../../../../../types/api/resources/Weapon.js";

/**
 * Custom table cell element that contains action buttons for a weapon entry.
 * Extends HTMLTableCellElement.
 *
 * It provides a "Delete" button that removes the weapon from the global inventory and dispatches an "inventoryWeaponDeleted" event.
 */
export class InventoryWeaponButtonsCell extends HTMLTableCellElement {
    weapon: Weapon;
    rowIndex: number;
    deleteButton: HTMLButtonElement;

    /**
     * Creates an instance of InventoryWeaponButtonsCell.
     * @param weapon The weapon object.
     * @param rowIndex The inventory row index of the weapon.
     */
    constructor(weapon: Weapon, rowIndex: number) {
        super();

        this.weapon = weapon;
        this.rowIndex = rowIndex;

        // Create a delete button.
        this.deleteButton = document.createElement('button');
        this.deleteButton.type = "button";
        this.deleteButton.textContent = "Delete";

        // Append the button to the cell.
        this.appendChild(this.deleteButton);

        // Bind the click event to remove the weapon.
        this.deleteButton.onclick = () => this.deleteRow();
    }

    /**
     * Handles deletion of the weapon row.
     * Removes the weapon from the global inventory and dispatches an "inventoryWeaponDeleted" event.
     */
    deleteRow(): void {
        globals.activePlayerCharacter.removeWeaponFromInventory(this.rowIndex);
        document.dispatchEvent(new Event("inventoryWeaponDeleted"));
    }
}

// Register the custom element.
customElements.define("inventory-weapon-buttons-cell", InventoryWeaponButtonsCell, { extends: 'td' });