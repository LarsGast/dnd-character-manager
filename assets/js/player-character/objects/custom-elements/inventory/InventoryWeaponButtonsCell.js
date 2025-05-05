import { globals } from "../../../load-page.js";

/**
 * Custom table cell element that contains action buttons for a weapon entry.
 * Extends HTMLTableCellElement.
 *
 * It provides a "Delete" button that removes the weapon from the global inventory and dispatches an "inventoryWeaponDeleted" event.
 */
export class InventoryWeaponButtonsCell extends HTMLTableCellElement {

    /**
     * Creates an instance of InventoryWeaponButtonsCell.
     * @param {Weapon} weapon The weapon object.
     * @param {number} rowIndex The inventory row index of the weapon.
     */
    constructor(weapon, rowIndex) {
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
    deleteRow() {
        globals.activePlayerCharacter.removeWeaponFromInventory(this.rowIndex);
        document.dispatchEvent(new Event("inventoryWeaponDeleted"));
    }
}

// Register the custom element.
customElements.define("inventory-weapon-buttons-cell", InventoryWeaponButtonsCell, { extends: 'td' });