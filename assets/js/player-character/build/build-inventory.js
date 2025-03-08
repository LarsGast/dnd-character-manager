import { ApiCategory, EquipmentCategoryIndex, getApiResultsAsync } from "../api.js";
import { EquipmentCategory } from "../objects/EquipmentCategory.js";
import { getEmptyOption } from "../util.js";

/**
 * Build the inventory section.
 */
export const buildInventory = async function() {
    await buildWeaponSelect();
    await buildArmorSelect();
}

/**
 * Build the weapons part of the inventory section.
 * Add all the weapons to the dropdown so the user can pick any supported weapon.
 */
const buildWeaponSelect = async function() {
    const select = document.getElementById('weapon-select');

    select.appendChild(getEmptyOption());
    select.appendChild(await getSelectOptionGroup("Simple Melee", EquipmentCategoryIndex.SimpleMeleeWeapons));
    select.appendChild(await getSelectOptionGroup("Martial Melee", EquipmentCategoryIndex.MartialMeleeWeapons));
    select.appendChild(await getSelectOptionGroup("Simple Ranged", EquipmentCategoryIndex.SimpleRangedWeapons));
    select.appendChild(await getSelectOptionGroup("Martial Ranged", EquipmentCategoryIndex.MartialRangedWeapons));
}

/**
 * Build the armor part of the inventory section.
 * Add all the armor to the dropdown so the user can pick any supported armor.
 */
const buildArmorSelect = async function() {
    const select = document.getElementById('armor-select');

    select.appendChild(getEmptyOption());
    select.appendChild(await getSelectOptionGroup("Light", EquipmentCategoryIndex.LightArmor));
    select.appendChild(await getSelectOptionGroup("Medium", EquipmentCategoryIndex.MediumArmor));
    select.appendChild(await getSelectOptionGroup("Heavy", EquipmentCategoryIndex.HeavyArmor));
}

/**
 * Get a single option group to divide the different equipment types.
 * @param {string} optgroupLabel Name of this group.
 * @param {EquipmentCategoryIndex} equipmentCategoryIndex The index of the category, for getting data from the API.
 * @returns {Promise<HTMLOptGroupElement}
 */
const getSelectOptionGroup = async function(optgroupLabel, equipmentCategoryIndex) {
    const optgroup = document.createElement('optgroup');

    optgroup.label = optgroupLabel;

    const results = await EquipmentCategory.getAsync(equipmentCategoryIndex);

    results.equipment.forEach(equipment => {
        const option = document.createElement('option');

        // Add the index as the value so we can find it later.
        option.value = equipment.index;
        option.textContent = equipment.name;

        optgroup.appendChild(option);
    });

    return optgroup;
}