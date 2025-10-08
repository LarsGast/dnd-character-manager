import { globals } from '../../../../../../../store/load-globals';
import { Armor } from '../../../../../../../types/domain/resources/Armor';

/**
 * Custom table cell element containing buttons for inventory armor actions.
 * Extends HTMLTableCellElement.
 *
 * In this implementation, it contains a "Delete" button to remove the armor from the PC's inventory. The cell takes an Armor instance and a row index.
 */
export class InventoryArmorButtonsCell extends HTMLTableCellElement {
	armor: Armor;
	rowIndex: number;
	deleteButton: HTMLButtonElement;

	/**
	 * Creates an instance of InventoryArmorButtonsCell.
	 * @param armor The armor object.
	 * @param rowIndex The row index in the table (used to identify the inventory entry). Points to the same object in the globals.activePlayerCharacter.inventoryArmor array.
	 */
	constructor(armor: Armor, rowIndex: number) {
		super();

		this.armor = armor;
		this.rowIndex = rowIndex;

		// Create a delete button.
		this.deleteButton = document.createElement('button');
		this.deleteButton.type = 'button';
		this.deleteButton.textContent = 'Delete';

		this.appendChild(this.deleteButton);

		// Bind deletion handler.
		this.deleteButton.onclick = () => this.deleteRow();
	}

	/**
	 * Deletes the row by removing the corresponding armor from the inventory and dispatching an "inventoryArmorDeleted" event.
	 */
	deleteRow(): void {
		globals.activePlayerCharacter.removeArmorFromInventory(this.rowIndex);
		document.dispatchEvent(new Event('inventoryArmorDeleted'));
	}
}

// Register the custom element, extending the built-in "td" element.
customElements.define(
	'inventory-armor-buttons-cell',
	InventoryArmorButtonsCell,
	{ extends: 'td' },
);
