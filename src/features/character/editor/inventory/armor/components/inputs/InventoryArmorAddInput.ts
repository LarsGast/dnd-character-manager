import { EquipmentCategoryIndex } from "../../../../../../../services/api.js";
import { getEmptyOption, getSelectOption } from "../../../../../../../utils/util.js";
import { globals } from "../../../../../../../store/load-globals.js";
import { EquipmentCategoryApiDto } from "../../../../../../../types/api/resources/EquipmentCategoryApiDto.js";
import { Armor } from "../../../../../../../types/api/resources/equipment/Armor.js";
import { ApiBaseObject } from "../../../../../../../types/api/resources/ApiBaseObject.js";

/**
 * Custom element for adding armor to the inventory.
 * Extends HTMLElement.
 *
 * This element consists of a select dropdown that is populated with armor options (grouped by type) and a button to add the selected armor.
 *
 * When a valid armor option is selected, the button is enabled.
 * Clicking the button fetches the armor details and updates the active PC's inventory, then dispatches an "inventoryArmorAdded" event.
 */
export class InventoryArmorAddInput extends HTMLElement {
    armorSelect: HTMLSelectElement;
    addArmorButton: HTMLButtonElement;

    constructor() {
        super();
        
        // Create the select element for choosing armor.
        this.armorSelect = document.createElement('select');
        
        // Create the "Add armor" button.
        // Initially disabled until a valid option is selected.
        this.addArmorButton = document.createElement('button');
        this.addArmorButton.type = "button";
        this.addArmorButton.textContent = "Add armor";
        this.addArmorButton.disabled = true;

        // Append the select dropdown and button to the custom element.
        this.appendChild(this.armorSelect);
        this.appendChild(this.addArmorButton);

        // Bind event handlers.
        this.armorSelect.onchange = () => this.handleWeaponSelectChange();
        this.addArmorButton.onclick = () => this.addWeapon();
    }

    /**
     * Called when the element is connected to the DOM.
     * Loads the armor options grouped by category and appends them to the select element.
     */
    async connectedCallback(): Promise<void> {

        // Start with an empty option.
        this.armorSelect.appendChild(getEmptyOption());

        // Append groups of armor options by type.
        this.armorSelect.appendChild(await this.getSelectOptionGroup("Light", EquipmentCategoryIndex.LightArmor));
        this.armorSelect.appendChild(await this.getSelectOptionGroup("Medium", EquipmentCategoryIndex.MediumArmor));
        this.armorSelect.appendChild(await this.getSelectOptionGroup("Heavy", EquipmentCategoryIndex.HeavyArmor));
    }

    /**
     * Creates an optgroup element populated with armor options.
     * @param optgroupLabel The label for the option group (e.g., "Light", "Medium", "Heavy").
     * @param equipmentCategoryIndex The index of the equipment category to load.
     * @returns A promise resolving to the populated optgroup element.
     */
    async getSelectOptionGroup(optgroupLabel: string, equipmentCategoryIndex: EquipmentCategoryIndex): Promise<HTMLOptGroupElement> {

        const optgroup = document.createElement('optgroup');
        optgroup.label = optgroupLabel;
    
        // Get equipment data for this category.
        const results = await ApiBaseObject.getAsync(equipmentCategoryIndex, EquipmentCategory);
    
        // For each equipment entry, create an option element.
        results.equipment.forEach(equipment => {
            optgroup.appendChild(getSelectOption(equipment.name, equipment.index));
        });
    
        return optgroup;
    }

    /**
     * Handles changes in the select element.
     * If a valid armor is selected, enables the "Add armor" button.
     */
    handleWeaponSelectChange(): void {
        if (this.armorSelect.value) {
            this.addArmorButton.disabled = false;
        }
    }

    /**
     * Fetches the selected armor, adds it to the global inventory, dispatches an "inventoryArmorAdded" event, and resets the select.
     */
    async addWeapon(): Promise<void> {
        const armorIndex = this.armorSelect.value;
        const armor = await ApiBaseObject.getAsync(armorIndex, Armor);

        // Add the armor to the active player's inventory.
        globals.activePlayerCharacter.addArmorToInventory(armor.index);

        // Notify listeners that armor has been added.
        document.dispatchEvent(new Event("inventoryArmorAdded"));

        // Reset the select dropdown and disable the button.
        this.armorSelect.value = "null";
        this.addArmorButton.disabled = true;
    }
}

// Register the custom element.
customElements.define("inventory-armor-add-input", InventoryArmorAddInput);