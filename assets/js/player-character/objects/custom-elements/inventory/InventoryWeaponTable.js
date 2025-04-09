import { Weapon } from "../../api/resources/equipment/Weapon.js";
import { InventoryWeaponRow } from "./InventoryWeaponRow.js";
import { globalPlayerCharacter } from "../../PlayerCharacter.js";

/**
 * Custom element that displays a table of inventory weapons.
 * Extends HTMLElement.
 *
 * This element builds a table with a header and body. The header defines columns for various weapon properties (name, ability, attack bonus, damage, etc.).
 * The body is populated with InventoryWeaponRow elements constructed from the global player's inventory.
 *
 * The table listens for "inventoryWeaponAdded" and "inventoryWeaponDeleted" events to refresh its content.
 */
export class InventoryWeaponTable extends HTMLElement {
    constructor() {
        super();

        // Create the table header.
        this.tableHead = document.createElement('thead');
        const tr = document.createElement('tr');
        
        const nameHead = document.createElement('th');
        nameHead.id = "weapon_name";
        nameHead.textContent = "Name";
        
        const abilityHead = document.createElement('th');
        abilityHead.id = "weapon_ability";
        abilityHead.textContent = "Ability";
        
        const attackBonusHead = document.createElement('th');
        attackBonusHead.id = "weapon_attack-bonus";
        attackBonusHead.textContent = "Attack bonus";
        
        const damageHead = document.createElement('th');
        damageHead.id = "weapon_damage";
        damageHead.textContent = "Damage";
        
        const damageTypeHead = document.createElement('th');
        damageTypeHead.id = "weapon_damage-type";
        damageTypeHead.textContent = "Damage type";
        
        const rangeHead = document.createElement('th');
        rangeHead.id = "weapon_range";
        rangeHead.textContent = "Range";
        
        const weightHead = document.createElement('th');
        weightHead.id = "weapon_weight";
        weightHead.textContent = "Weight";
        
        const buttonsHead = document.createElement('th');
        buttonsHead.id = "weapon_buttons";
        buttonsHead.textContent = "Buttons";

        // Append header cells to the header row.
        tr.appendChild(nameHead);
        tr.appendChild(abilityHead);
        tr.appendChild(attackBonusHead);
        tr.appendChild(damageHead);
        tr.appendChild(damageTypeHead);
        tr.appendChild(rangeHead);
        tr.appendChild(weightHead);
        tr.appendChild(buttonsHead);

        this.tableHead.appendChild(tr);

        // Create the table body.
        this.tableBody = document.createElement('tbody');

        // Create the table and add the header and body.
        this.table = document.createElement('table');
        this.table.appendChild(this.tableHead);
        this.table.appendChild(this.tableBody);

        // Append the table to this element.
        this.appendChild(this.table);
    }

    /**
     * Called when the element is connected to the DOM.
     * Updates the table display immediately and registers event listeners for weapon inventory updates.
     */
    connectedCallback() {
        this.updateDisplay();

        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("inventoryWeaponAdded", this._updateHandler);
        document.addEventListener("inventoryWeaponDeleted", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes event listeners to avoid memory leaks.
     */
    disconnectedCallback() {
        document.removeEventListener("inventoryWeaponAdded", this._updateHandler);
        document.removeEventListener("inventoryWeaponDeleted", this._updateHandler);
    }

    /**
     * Updates the table body by repopulating it with the current inventory weapons.
     * @param {CustomEvent} event An optional event that triggers the update.
     */
    async updateDisplay(event) {
        if (this.shouldUpdateDisplay(event)) {
            const tableBody = this.table.querySelector('tbody');
            tableBody.replaceChildren();

            // Create a row for each weapon currently in the global inventory.
            for (const inventoryWeapon of globalPlayerCharacter.inventoryWeapons) {
                const weapon = await Weapon.getAsync(inventoryWeapon.index);
                tableBody.appendChild(new InventoryWeaponRow(weapon));
            }
        }
    }

    /**
     * Determines whether the table should be updated based on the triggering event.
     * @param {CustomEvent} event The event to evaluate.
     * @returns {boolean} True if the table should be refreshed; otherwise false.
     */
    shouldUpdateDisplay(event) {
        return !event ||
            event.type === "inventoryWeaponAdded" ||
            event.type === "inventoryWeaponDeleted";
    }
}

// Register the custom element.
customElements.define("inventory-weapon-table", InventoryWeaponTable);