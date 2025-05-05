import { EquipmentCategoryIndex } from "../../../api.js";
import { getEmptyOption, getSelectOption } from "../../../util.js";
import { globals } from "../../../load-page.js";
import { EquipmentCategory } from "../../api/resources/EquipmentCategory.js";
import { Weapon } from "../../api/resources/equipment/Weapon.js";

/**
 * Custom element that provides UI for adding a new weapon to the inventory.
 * Extends HTMLElement.
 *
 * The element contains a select dropdown populated with weapon options grouped by category and a button to add the selected weapon. 
 * When a valid option is selected, the button is enabled. 
 * On clicking, the selected weapon is retrieved, added to the active PC's inventory (using its standard ability), and an "inventoryWeaponAdded" event is dispatched.
 */
export class InventoryWeaponAddInput extends HTMLElement {

    constructor() {
        super();
        
        // Create a select element for choosing a weapon.
        this.weaponSelect = document.createElement('select');
        
        // Create an "Add weapon" button.
        this.addWeaponButton = document.createElement('button');
        this.addWeaponButton.type = "button";
        this.addWeaponButton.textContent = "Add weapon";
        this.addWeaponButton.disabled = true;

        // Append the select and button to this custom element.
        this.appendChild(this.weaponSelect);
        this.appendChild(this.addWeaponButton);

        // Bind event handlers.
        this.weaponSelect.onchange = () => this.handleWeaponSelectChange();
        this.addWeaponButton.onclick = () => this.addWeapon();
    }

    /**
     * Called when the element is attached to the DOM.
     * Populates the select element with weapon options grouped by category.
     */
    async connectedCallback() {

        // Start with an empty default option.
        this.weaponSelect.appendChild(getEmptyOption());

        // Append groups of weapon options by type.
        this.weaponSelect.appendChild(await this.getSelectOptionGroup("Simple Melee", EquipmentCategoryIndex.SimpleMeleeWeapons));
        this.weaponSelect.appendChild(await this.getSelectOptionGroup("Martial Melee", EquipmentCategoryIndex.MartialMeleeWeapons));
        this.weaponSelect.appendChild(await this.getSelectOptionGroup("Simple Ranged", EquipmentCategoryIndex.SimpleRangedWeapons));
        this.weaponSelect.appendChild(await this.getSelectOptionGroup("Martial Ranged", EquipmentCategoryIndex.MartialRangedWeapons));
    }

    /**
     * Creates and returns an optgroup element containing weapon options.
     * @param {string} optgroupLabel The label for this group (e.g., "Simple Melee", "Martial Ranged").
     * @param {EquipmentCategoryIndex} equipmentCategoryIndex The category index for fetching weapon data.
     * @returns {Promise<HTMLOptGroupElement>} A promise that resolves to the populated optgroup element.
     */
    async getSelectOptionGroup(optgroupLabel, equipmentCategoryIndex) {
        const optgroup = document.createElement('optgroup');
        optgroup.label = optgroupLabel;
    
        // Fetch weapons for the provided category.
        const results = await EquipmentCategory.getAsync(equipmentCategoryIndex);
    
        // For each weapon, create an option element.
        results.equipment.forEach(equipment => {
            optgroup.appendChild(getSelectOption(equipment.name, equipment.index));
        });
    
        return optgroup;
    }

    /**
     * Handles changes in the weapon select.
     * Enables the "Add weapon" button if a valid selection is made.
     */
    handleWeaponSelectChange() {
        if (this.weaponSelect.value) {
            this.addWeaponButton.disabled = false;
        }
    }

    /**
     * Handles the addition of a weapon to the global inventory.
     * Retrieves the weapon by its index, adds it with its standard ability, dispatches an "inventoryWeaponAdded" event, and then resets the select.
     */
    async addWeapon() {
        const weaponIndex = this.weaponSelect.value;
        const weapon = await Weapon.getAsync(weaponIndex);

        // Add the weapon to the PC's inventory using its standard ability.
        globals.activePlayerCharacter.addWeaponToInventory(weapon.index, weapon.getStandardAbility());

        // Notify that a new weapon has been added.
        document.dispatchEvent(new Event("inventoryWeaponAdded"));

        // Reset the select and disable the button.
        this.weaponSelect.value = "null";
        this.addWeaponButton.disabled = true;
    }
}

// Register the custom element.
customElements.define("inventory-weapon-add-input", InventoryWeaponAddInput);