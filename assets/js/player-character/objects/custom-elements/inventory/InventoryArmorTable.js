import { Armor } from "../../api/resources/equipment/Armor.js";
import { InventoryArmorRow } from "./InventoryArmorRow.js";
import { globalPlayerCharacter } from "../../PlayerCharacter.js";

/**
 * Custom element for displaying the inventory armor table.
 * Extends HTMLElement.
 *
 * This element constructs a table consisting of a header and a body.
 * The header defines columns for armor properties while the body is populated with InventoryArmorRow elements based on the global PC's inventory.
 * It listens for "inventoryArmorAdded" and "inventoryArmorDeleted" events to refresh its content.
 */
export class InventoryArmorTable extends HTMLElement {
    constructor() {
        super();

        // Create table header.
        this.tableHead = document.createElement('thead');
        const tr = document.createElement('tr');
        
        const nameHead = document.createElement('th');
        nameHead.id = "armor_name";
        nameHead.textContent = "Name";
        
        const typeHead = document.createElement('th');
        typeHead.id = "armor_type";
        typeHead.textContent = "Type";
        
        const strengthHead = document.createElement('th');
        strengthHead.id = "armor_strength-requirement";
        strengthHead.textContent = "Strength";
        
        const stealthHead = document.createElement('th');
        stealthHead.id = "armor_disadvantage-on-stealth";
        stealthHead.textContent = "Stealth";
        
        const armorClassHead = document.createElement('th');
        armorClassHead.id = "armor_armor-class";
        armorClassHead.textContent = "Armor class";
        
        const effectiveArmorClassHead = document.createElement('th');
        effectiveArmorClassHead.id = "armor_effective-armor-class";
        effectiveArmorClassHead.textContent = "Effective armor class";
        
        const weightHead = document.createElement('th');
        weightHead.id = "armor_weight";
        weightHead.textContent = "Weight";
        
        const buttonsHead = document.createElement('th');
        buttonsHead.id = "armor_buttons";
        buttonsHead.textContent = "Buttons";

        // Append header cells to the header row.
        tr.appendChild(nameHead);
        tr.appendChild(typeHead);
        tr.appendChild(strengthHead);
        tr.appendChild(stealthHead);
        tr.appendChild(armorClassHead);
        tr.appendChild(effectiveArmorClassHead);
        tr.appendChild(weightHead);
        tr.appendChild(buttonsHead);

        this.tableHead.appendChild(tr);

        // Create table body.
        this.tableBody = document.createElement('tbody');

        // Create the table and assemble head and body.
        this.table = document.createElement('table');
        this.table.appendChild(this.tableHead);
        this.table.appendChild(this.tableBody);

        // Append the table to this custom element.
        this.appendChild(this.table);
    }

    /**
     * Called when the element is connected to the DOM.
     * Updates the table display and registers event listeners for armor inventory changes.
     */
    connectedCallback() {

        // Refresh the table immediately.
        this.updateDisplay();

        // Set up listeners to update the table when armor is added or deleted.
        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("inventoryArmorAdded", this._updateHandler);
        document.addEventListener("inventoryArmorDeleted", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes event listeners.
     */
    disconnectedCallback() {
        document.removeEventListener("inventoryArmorAdded", this._updateHandler);
        document.removeEventListener("inventoryArmorDeleted", this._updateHandler);
    }

    /**
     * Updates the table display by repopulating the body with the current armor inventory.
     * @param {CustomEvent} event Optional event that may trigger the update.
     */
    async updateDisplay(event) {
        if (this.shouldUpdateDisplay(event)) {

            // Clear existing table body content.
            const tableBody = this.table.querySelector('tbody');
            tableBody.replaceChildren();

            // For each armor in the inventory, create a new row and append it.
            for (const inventoryArmor of globalPlayerCharacter.inventoryArmor) {
                const armor = await Armor.getAsync(inventoryArmor.index);
                tableBody.appendChild(new InventoryArmorRow(armor));
            }
        }
    }

    /**
     * Determines if the table display should be updated based on the event.
     * @param {CustomEvent} event The event to evaluate.
     * @returns {boolean} True if the table should be updated; false otherwise.
     */
    shouldUpdateDisplay(event) {
        return !event ||
            event.type === "inventoryArmorAdded" ||
            event.type === "inventoryArmorDeleted";
    }
}

// Register the custom element.
customElements.define("inventory-armor-table", InventoryArmorTable);